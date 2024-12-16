from rest_framework import serializers
from rest_framework.permissions import BasePermission

from .models import (
    Instructor
)

from django.core.validators import URLValidator


class IsInstructorOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        print('Is Instructor Owner')
        return obj.instructor.user == request.user

class InstructorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id','first_name', 'last_name', 'about', 'mobile_number','profile_img', 'facebook_url', 'instagram_url', 'twitter_url', 'total_teacher_courses', 'total_teacher_students', 'instructor_info']

        def __init__(self, *args, **kwargs):
            super(InstructorDetailSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0

            if request and request.method == 'GET':
                self.Meta.depth = 1

        def validate_facebook_url(self, value):
            print('Value', value)
            if value is None or value == '':
                return value
            
            try:
                URLValidator()(value)
                return value
            except:
                raise serializers.ValidationError('Enter a valid URL')
            
        def validate_twitter_url(self, value):
            if value is None or value == '':
                return value
            
            try:
                URLValidator()(value)
            except:
                raise serializers.ValidationError('Enter a valid URL')
            
        def validate_instagram_url(self, value):
            if value is None or value == '':
                return value
            
            try:
                URLValidator()(value)
            except:
                raise serializers.ValidationError('Enter a valid insta URL')
            
class InstructorDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Instructor;
        fields=["total_teacher_courses","total_teacher_chapters","total_teacher_students","first_name","profile_img", "about","instructor_info"]
