import random
import logging
from datetime import datetime, timedelta

from django.apps import apps
from django.db import transaction
from django.contrib.auth import authenticate
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_bytes, force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from .utils import send_email_with_otp, send_email

class UserRegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True, default="")
    last_name = serializers.CharField(required=False, allow_blank=True, default="")
    password = serializers.CharField(max_length=70, min_length=7, write_only=True)
    confirm_password = serializers.CharField(max_length=70, min_length=7, write_only=True)


    class Meta:
        model = User
        fields = ['email', 'username','first_name', 'last_name', 'password', 'confirm_password','is_student', 'is_instructor']

    def validate(self, attrs):
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')

        if password != confirm_password:
            raise serializers.ValidationError('passwords do not match')
        return attrs
    
    def create(self, validated_data):
        is_student = validated_data.pop('is_student')
        is_instructor = validated_data.pop('is_instructor')
        print(validated_data)


        with transaction.atomic():
            user = User.objects.create_user(
                email = validated_data['email'],
                username = validated_data['username'],
                password = validated_data['password'],
            )

            user.is_student = is_student
            user.is_instructor = is_instructor
            user.save()

            if is_student:
                student = apps.get_model('student', 'Student')
                student.objects.create(
                    student=user
                )
            if is_instructor:
                instructor = apps.get_model('instructor', 'Instructor')
                instructor.objects.create(
                    instructor=user
                )
        return user
    

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'get_full_name', 'password','access_token', 'refresh_token', "user_status"]

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')

        user = authenticate(request, email=email, password=password)
        print('Request', request)
        print(f'Authenticating {email} {password}')
       

        if not user:
            raise AuthenticationFailed('Invalid credentials try again')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        
        user_token = user.tokens()

        return {
            'email':user.email,
            'get_full_name': user.get_full_name,
            'access_token':str(user_token.get('access_token')),
            'refresh_token':str(user_token.get('refresh')),
            'user_status':user.user_status,
        }


class UserLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_messages = {
        'bad_token':('Token is Invalid or has expired')
    }
    
    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad token')
        
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
       fields = ['email']
    
    def validate(self, attrs):
        email = attrs.get('email')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain = get_current_site(request).domain            
            # relative_link = reverse('password-reset-confirm', kwargs={'uidb64':uidb64, 'token':token})
            relative_link = f'password-reset/{uidb64}/{token}'
            
            abslink = f"http://localhost:3000/{relative_link}"
            email_body = f"Hi use the link below to reset your password \n {abslink}"

            data = {
                'email_body':email_body,
                'email_subject':'Reset your password',
                'to_email':user.email
            }
            send_email(data)
            # print("Abs Link: ", abslink)
            # print("Site Domain: ", site_domain)
            # print("TOKEN: ",token)
            # print("UIDB64: ", uidb64)
        else:
            logging.error(f' {email} Email does not exist!')


        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        fields = ["password", "confrim_password", "uidb64", "token"]

    def validate(self, attrs):
        try:
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')
            password = attrs.get('password')
            confirm_password = attrs.get('confirm_password')

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            print('uidb64: ', uidb64)
            print('decoded uidb64: ', user_id)
            print('Token: ', token)
            
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('reset link is invalid or has expired!', 401)
            if password != confirm_password:
                raise AuthenticationFailed('passwords do not match')
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            logging.error(f" e as Exception: {e}")
            raise AuthenticationFailed(f'{e}', 401)

