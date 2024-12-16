import json
import pyotp
import base64
import logging
from datetime import datetime

from django.views import View
from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import authenticate, login

from rest_framework import viewsets
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.decorators import action
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework import status, permissions 
from rest_framework.generics import GenericAPIView

from .serializers import (
    UserLoginSerializer, 
    UserLogoutSerializer,
    PasswordResetSerializer,
    SetNewPasswordSerializer,
    UserRegistrationSerializer, 
)

from .models import (
    User, 
)

from .utils import (
    send_otp,
)

class RegisterView(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    
    def post(self, request, *args, **kwargs):
        user_data = request.data
        path = request.path
        is_student = 'student' in path
        is_instructor = 'instructor' in path

        append_user_data = user_data.__copy__()
        append_user_data.update({'is_student':is_student, 'is_instructor':is_instructor})

        serializer = self.serializer_class(data=append_user_data)
        try:

            if serializer.is_valid(raise_exception=True):

                # send_otp(request)
                # request.session['email'] = append_user_data['email'] 
                user = serializer.save()
                
                user.save()

                return Response({
                    'user':serializer.data,
                    'message':'Hi Thank you for signing up an otp code has been sent to your email account to verify your account'
                }, status=status.HTTP_201_CREATED)        
        except serializer.ValidationError as ve:        
            return Response(ve.detail, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            if User.objects.filter(email=user_data['email']).exists():
                return Response({'error':'Email address already exists. Please try again with another.'}, status=status.HTTP_400_BAD_REQUEST)
            elif User.objects.filter(username=user_data['username']).exists():
                return Response({'error':'Username not available. Please try again with another.'}, status=status.HTTP_400_BAD_REQUEST)
            logging.error(e)
            error_message = {'error': [str(e)]}
            return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

class OtpView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    
    @action(detail=True, methods=["POST"])
    def verify_otp(self, request, pk=None):
        instance = self.get_object()

        if(
            not instance.is_active
            and instance.otp == request.data.get('otp')
            and instance.otp_expiry
            and timezone.now() < instance.otp_expiry
        ):
            instance.is_active = True
            instance.is_otp_verify = None
            instance.save()
            return Response("Sucessfully verified the user.", status=status.HTTP_200_OK)
            
        return Response("user active or incorrect otp", status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(GenericAPIView):
    serializer_class = UserLoginSerializer
    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutUserView(GenericAPIView):
    permissions = [permissions.IsAuthenticated] 
    serializer_class = UserLogoutSerializer 

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)


class PasswordResetRequestView(APIView):
   serializer_class = PasswordResetSerializer

   def post(self, request, *args, **kwargs):
        email = request.data['email']
        clean_email = email.replace('@gmail.com', '')

        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)

        return Response({'message':f'Hi {clean_email} a password reset link has been sent to your email address.'}, status=status.HTTP_200_OK)

class SetNewPassword(APIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message':'password reset successfull'}, status=status.HTTP_200_OK)
    
class ChangePassword(APIView):
    def patch(self, request, *args, **kwargs):
        user_id = request.user.id

        old_password = request.data['old_password']
        new_password = request.data['new_password']
        confirm_password = request.data['confirm_password']

        user = User.objects.get(id=user_id)
        
        if user.check_password(raw_password=old_password):
            if new_password == confirm_password:
                if len(new_password) < 8:
                    return Response({'message':"password length can't be less than 8."}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(new_password)
                user.save()
                return Response({'message':'password changed successfully !'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message':'password incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
def change_passoword(request):
    
    print('Passowrd changed')
