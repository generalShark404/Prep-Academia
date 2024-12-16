import logging

from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail
from django.http import HttpResponse
from django.core.validators import URLValidator
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.apps import apps

from rest_framework import serializers
from rest_framework.response import Response
from . import models
from rest_framework_simplejwt.tokens import Token, RefreshToken
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed

from .models import Course, Course_category, DiscussionComment, Topic, CourseRating, FAQ, Contact, Summary, Note

# from django.contrib.auth.models import User

from ckeditor.widgets import CKEditorWidget
   
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Course_category;
        fields = ["id","title","description","total_courses","category_thumbnail"]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course;
        fields = ["id", "category", "instructor", "title", "description", "featured_thumbnail", "tags", "topics","related_courses" , "total_enrolled_students", "course_rating","course_views", "get_instructor","difficulty", "date_created", "get_reviews",]
        
        depth=2
        
    category=serializers.PrimaryKeyRelatedField(queryset=Course_category.objects.all())
    instructor=serializers.PrimaryKeyRelatedField(queryset=apps.get_model('instructor', 'Instructor').objects.all(), required=False)

class DiscussionCommentSerializer2(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = DiscussionComment
        fields = ['id', 'course', 'content', 'created_by_student', 'created_by_instructor', 'reply_to', 'created_on', 'replies']

        depth = 2

    def get_replies(self, obj):
        # Recursive function to get all nested replies under a comment
        def fetch_replies(comment):
            replies = []
            for reply in comment.replies.all():
                replies.append(reply)
                replies.extend(fetch_replies(reply))  # Recursively fetch nested replies
            return replies

        return DiscussionCommentSerializer(fetch_replies(obj), many=True).data


class DiscussionCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()  # To handle nested replies

    class Meta:
        model = DiscussionComment
        fields = ['id', 'course', 'created_by_student','created_by_instructor', 'content', 'reply_to', 'created_on', 'replies']
        depth=2

    def get_replies(self, obj):
        # Fetching all replies to the current comment
        # replies = obj.replies.all()
        replies = DiscussionComment.objects.filter(reply_to=obj)
        return DiscussionCommentSerializer(replies, many=True).data

    def create(self, validated_data):
        return super().create(validated_data)

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic;
        fields = ["id","course", "title",  "description", "video"]
        extra_kwargs = {
            'course': {'required': True}
        }

class StudentCourseEnrolledSerializer(serializers.ModelSerializer):
    class Meta:
        model = apps.get_model('student','StudentCourseEnrolled') 
        fields = ["id",'course','student','enrolled_time']

        depth=2


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model =  CourseRating
        fields = ["id",'course','rating','reviews','review_time',"student", "student_username"]
        
    def __init__(self,*args,**kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=1
        if request and request.method == 'GET':
            self.Meta.depth=2

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["question","answer"]

class FlatPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatPage
        fields = ["id", "title", "content","url"]

class ContactListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "firstname", "lastname", "email", "message"]

class InstructorStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        # model = models.InstructorStudentChat
        fields=['id','instructor','student','msg_txt','msg_from','msg_time']

    def to_representation(self, instance):
        representation=super(InstructorStudentChatSerializer, self).to_representation(instance)
        representation['msg_time'] = instance.msg_time.strftime("%Y-%m-%d %H:%M")
        return representation
    
class summarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ["id",'title','topic','content']

        depth = 2

class noteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","topic", "content", "instructor_username"]
        
        depth=3

class summaryTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","topic"]
        
        depth=2

class noteTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","topic"]
        
        depth=2

class sideTopicSerializer(serializers.ModelSerializer):
    get_notes = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = ["id", "title", "get_notes"]

    def get_get_notes(self, obj):
        notes = obj.get_notes()
        return noteTitleSerializer(notes, many=True).data

        # depth=1

class AllTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id','title', 'course', 'description', 'video']
        
class NoteTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title']

class GetNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title']