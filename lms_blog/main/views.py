import json
import logging
from datetime import datetime, timezone

from django.apps import apps
from django.db.models import Q
from django.db import transaction
from django.http import JsonResponse, HttpResponse, Http404
from django.core.mail import EmailMessage
from django.views.decorators.csrf import csrf_exempt
from django.middleware import csrf
from django.contrib.flatpages.models import FlatPage
from django.core.files.storage import default_storage

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import generics, status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated

from .serializers import( 
    CategorySerializer, 
    CourseSerializer, 
    TopicSerializer, 
    StudentCourseEnrolledSerializer, CourseRatingSerializer, 
    FaqSerializer,
    FlatPageSerializer,
    ContactListSerializer,
    summarySerializer,
    noteSerializer,
    sideTopicSerializer, 
    AllTopicsSerializer, 
    DiscussionCommentSerializer, 
    DiscussionCommentSerializer2
)

from instructor.serializers import (
    IsInstructorOwner,
    InstructorDetailSerializer
)

from account.models import User
from .models import (
    DiscussionComment, 
    Course_category, 
    Course, 
    Note, 
    Topic, 
    CourseRating, 
    FAQ, 
    Contact, 
    Summary
)

from .utils import (
    send_otp
)

class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        
        return (
            request.user.is_authenticated and hasattr(request.user, 'instructor')
        ) 
    
    def has_object_permission(self, request, view, obj):
         return obj.instructor == request.user.instructor

#pagination views 
class StandardResultSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param="page_size"
    max_page_size = 8

class largeResultPagination(PageNumberPagination):
    page_size = 8
    page_query_param="page_size"
    max_page_size = 8

#Instructor permission view
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        req_id = view.kwargs.get('pk')
        print("pk: ",req_id)
        print("requested user.id: ",request.user.id)
        print("requested student_id: ",request.user.student.id)
        return bool(request.user and request.user.is_authenticated and request.user.id and request.user.student.id == req_id) 

    def has_object_permission(self, request, view, obj):
        print('--------------')
        print("obj.id == request.user.id: ", obj.id == request.user.student.id)
        if request.method in permissions.SAFE_METHODS:
            return True
        print(obj)
        print(request.user)
        return  obj.id == request.user.student.id
#Student permission view
class IsOwnerOrReadOnlyInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        req_id = view.kwargs.get('pk')
        print(view.kwargs)
        print('pk req_id:', req_id)
        is_permitted = bool(request.user and request.user.is_authenticated  and request.user.instructor.id == req_id)
        print("is_permitted", is_permitted) 
        return is_permitted

    def has_object_permission(self, request, view, obj):
        print("-------------------------------")
        print("obj.id == request.user.id: ", obj.id == request.user.id)
        print('obj', obj.instructor.id)
        print('request.user.instructor', request.user.id)
        if request.method in permissions.SAFE_METHODS:
            return True
        has_obj_permission = obj.instructor.id == request.user.id
        print("has_obj_permission", has_obj_permission)
        return has_obj_permission
    

class CourseList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class=StandardResultSetPagination

    def get_queryset(self):
        qs = super().get_queryset()
        limit= int(self.request.GET.get('result', 10))
        if 'result' in self.request.GET:
            qs = Course.objects.all().order_by('-id')[:limit]
        
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            category = Course_category.objects.filter(id=category).first()
            qs = Course.objects.filter(category=category)

        if 'searchstring' in self.kwargs:
            search=self.kwargs['searchstring']
            qs = Course.objects.filter(Q(tags__istartswith=search)|Q(title__istartswith=search))
            if search == '':
                qs = Course.objects.filter(Q(title__icontains=search))
            else:
                qs = Course.objects.all()

        elif 'studentId' in self.kwargs:
            pass
        return qs

class CourseRatingList(APIView):
    queryset = CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

    def get(self, request, *args, **kwargs):
        course_id = kwargs.get('course_id')
        course = Course.objects.get(id=course_id)
        print('Course Review: ', course)
        reviewedCourse = CourseRating.objects.filter(course=course)

        serializer = self.serializer_class(reviewedCourse, many=True)
        print(serializer.data) 

        return Response({'course_review':serializer.data})    
        
    def post(self, request, *args, **kwargs):
        # try:
            #course that user is rating
            course_to_be_rated = request.POST['course']
            #user that is rating the course
            student = request.user.student.id
            #user review
            student_review = request.POST['reviews']
            #user rating
            student_rating = request.POST['rating']

            #rated courses
            course_rated = CourseRating.objects.filter(course=course_to_be_rated, student=student).exists()
            #rated course instance
            course_to_rate = Course.objects.get(id=course_to_be_rated)

            #rated user instance
            student = apps.get_model('student','Student').objects.get(id=student)
            
            #if a rated course exists there is no need or no user should be allowed to rate more than once
            if course_rated:
                return Response({"message":'User already rated'})
            else:
                CourseRating.objects.create(course=course_to_rate, student=student, reviews=student_review, rating=student_rating)
                return Response({"message":"Successfully rated"})
        # except:
        #         return Response({"message":"Something went wrong while rating"})

class CourseDetail(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseTags(APIView):
    serializer_class = CourseSerializer
    pagination_class = StandardResultSetPagination

    def get(self, request, *args, **kwargs):
        tag = kwargs.get('tag')
        
        if tag:
            course = Course.objects.filter(tags__icontains=tag)
            serializer = self.serializer_class(course, many=True)
            return Response({'data':serializer.data}, status=status.HTTP_200_OK)

class CourseChapterList(generics.ListAPIView):
    serializer_class = TopicSerializer
    def get_queryset(self):
        # course_id=self.kwargs['course_id']
        # course=models.Course.objects.get(pk=course_id)
        # return models.Chapter.objects.filter(course=course)
        chapter_id = self.kwargs['chapter_id']
        return Topic.objects.filter(pk=chapter_id)

class CourseTopicMethods(APIView):
    queryset = Topic.objects.all()
    serializer_class = AllTopicsSerializer

    #Update / Edit
    def put(self, request, *args, **kwargs):
        topic_id = self.kwargs.get('topic_id', None)

    #Delete
    def delete(self, request, *args, **kwargs):
        topic_id = self.kwargs.get('topic_id', None)
        topic = Topic.get(id=topic_id)
        return Response({'message':'Topic deleted successfully'}) 

class PopularCourses(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CourseSerializer
    # queryset = models.Course.objects.all()

    def get_queryset(self):
            return Course.objects.order_by("-course_views")[:4]

class FetchFavoriteCourseStatus(APIView):
    def get_queryset(self, course):
        if self.request.user.student:
            return apps.get_model('student', 'StudentFavoriteCourse').objects.filter(student=self.request.user.student, course=course)
        else:
            return Response({'message':'user not a student.'}, status=status.HTTP_403_FORBIDDEN)

    def get(self, request, *args, **kwargs):
        if request.user.is_student:
            course_id = kwargs.get('course_id')
            course = Course.objects.get(id=course_id)
            try:
                favoriteCourse = self.get_queryset(course=course)

                print('favorite status: ', favoriteCourse)
                if favoriteCourse :
                    return JsonResponse({'bool':True})
                else:
                    return JsonResponse({'bool':False})
            except apps.get_model('student', 'StudentFavoriteCourse').DoesNotExist:
                return Response({'message':' favorite course does not exist'},status=status.HTTP_403_FORBIDDEN)
            except apps.get_model('student', 'Student').DoesNotExist:
                return Response({'message':'Student does not exist.'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'message':' user a student.'},status=status.HTTP_403_FORBIDDEN)

class RemoveFavoriteCourse(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        student_id = request.user.student.id
        course_id = kwargs.get('course_id')
        print("REMOVE request:", request)
        student = apps.get_model('student', 'Student').objects.filter(id=student_id).first()
        course = Course.objects.filter(id=course_id).first()
        favoriteStatus = apps.get_model('student', 'StudentFavoriteCourse').objects.filter(course=course,student=student).delete()
        if favoriteStatus :
            return JsonResponse({'bool':True})
        else:
            return JsonResponse({'bool':False})

class  UpdateCourse(APIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, IsInstructor)

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user.instructor)

    def get(self, request, course_id):
      try:
        course = self.get_queryset().get(id=course_id)
        serializer = self.serializer_class(course)
        return Response(serializer.data)
      except Course.DoesNotExist:
          return Response({'message':'Course not found or you don not have permission to access.'}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, course_id):
        try:
            data =  request.data
            course = Course.objects.get(id=course_id)
            instructor_id = request.user.instructor.id
            
            if data.get('category'):
                category = Course_category.objects.get(id=data['category'])
                course.category = category
            if data.get('instructor'):
                instructor = apps.get_model('instructor','Instructor').objects.get(id=instructor_id)
                course.instructor = instructor
            if data.get('title'):
                course.title = data['title']
            if data.get('description'):
                course.description = data['description']
            if data.get('featured_thumbnail'):
                course.featured_thumbnail = data['featured_thumbnail']
            if data.get('tags'):
                course.tags = data['tags']
            if data.get('difficulty'):
                course.difficulty = data['difficulty']
            try:
                with transaction.atomic():
                    course.save()
            except Exception as e:
                logging.error(e)
                return Response({
                    'message':'Error updating course',
                    'error':str(e)
                }, status=status.HTTP_403_FORBIDDEN)
            return Response({'message':'Updated Successfully'})
        except Course.DoesNotExist:
            return Response({
                'message':'Course not found or you do not have permission to update.'
            }, status=status.HTTP_403_FORBIDDEN)

class DeleteCourse(APIView):
    permission_classes = (permissions.IsAuthenticated, IsInstructor)

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user.instructor)
    
    def delete(self, request, *args, **kwargs):
        course_id = kwargs.get('course_id')
        try:
            # course = self.get_queryset().g
            course = self.get_queryset().get(id=course_id)
            course.delete()
            return Response({'message':'Course Deleted Successfully'}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({
                'message':'Course not found or you do not have permission to delete.'
            }, status=status.HTTP_403_FORBIDDEN)



class GetCategory(APIView):
    queryset = Course_category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = largeResultPagination


    def get(self,request, *args, **kwargs):
        category_name = kwargs.get('category')
        category = Course_category.objects.filter(title__icontains=category_name)
        print('Category:', category)

        serializer = self.serializer_class(category, many=True)
        return Response({'results':serializer.data})
        
class CategoryList(generics.ListCreateAPIView):
    queryset = Course_category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = largeResultPagination

    NO_PAGINATION_URLS = ['/api/get-category/', '']

    def get_queryset(self):
        print(self.kwargs)

        print("self.request.path", self.request.path)
        if self.request.path == '/api/get-category/':
            print("Path = True")
            return Course_category.objects.all()
        else:
            qs = super().get_queryset()
            limit = int(self.request.GET.get('result', 10))
            if 'result' in self.request.GET:
                qs = Course_category.objects.all()[:4]
            if 'category_id' in self.kwargs:
                category_id =  self.kwargs['category_id']
                qs = Course_category.objects.filter(id=category_id)
                print("Yes")
            print(qs)
            return qs
        
    def get_paginated_response(self, data):
        if self.request.path == '/api/get-category/':
            return Response(data)
        else:
            return super().get_paginated_response(data)

class GetCategoryList(generics.ListAPIView):
    queryset = Course_category.objects.all()
    serializer_class = CategorySerializer
# class GetUserView(APIView):
    # def get(self, request):
    #     serializer = UserSerializer(request.user)
    #     return Response({'user':serializer.data}, status=status.HTTP_200_OK)
#All data 
#get specific data 
    

class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (permissions.IsAuthenticated, IsInstructor)

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'instructor'):
            return Topic.objects.filter(course__instructor=user.instructor)
        return Topic.objects.none()
    
    def perform_create(self, serializer):
        user = self.request.user
        course = serializer.validated_data['course']

        if course.instructor != user.instructor:
            raise PermissionError('You can only create topics for your own courses.')
        serializer.save()
    

class GetTopicNotes(APIView):
     serializer_class = noteSerializer
     def get(self, request, *args, **kwargs):
          topic_id = kwargs.get('topic_id')

          if topic_id:
               try:
                    note = Note.objects.filter(topic=topic_id)
                    serializer = self.serializer_class(note, many=True)
                    return Response(serializer.data)
               except Note.DoesNotExist:
                    return Response({'error':'something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)
               except Exception as e:
                   print('Error', str(e))

class AllTopics(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = AllTopicsSerializer
    permission_classes = (IsAuthenticated, IsInstructor)

    def get_queryset(self):
        course_id = self.kwargs.get('course_id', None)
        user = self.request.user.instructor

        return Topic.objects.filter(course_id=course_id, course__instructor=user)
    

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     course_id = self.kwargs.get('course_id', None)

    #     all_topics = Topic.objects.filter(course=course_id)

    #     serializer = self.serializer_class(all_topics, many=True)
    #     data = serializer.data
    #     print(course_id)
    #     return Response(data)

class GetUpdateDeleteTopic(APIView):
    permission_classes = (permissions.IsAuthenticated, IsInstructorOwner)
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

    def get(self, request, *args, **kwargs):
        topic_id = kwargs.get('topic_id')
        topic = Topic.objects.get(id=topic_id)
        serializer = self.serializer_class(topic)
        return Response({'topic': serializer.data})
    
    def put(self, request, *args, **kwargs):
        topic_id = kwargs.get('topic_id')
        topic = Topic.objects.get(id=topic_id)
        data = request.data
        instructor = request.user.instructor.id

        if data.get('title'):
            topic.title = data['title']
        if data.get('description'):
            topic.description = data['description']
        if data.get('title'):
            topic.video = data['video']
            
        if topic.course.instructor.id ==  instructor: 
            try:
                with transaction.atomic:   
                    topic.save()
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                print(e)

    def delete(self, request, *args, **kwargs):
        topic_id = kwargs.get('topic_id')
        topic = Topic.objects.get(id=topic_id)
        instructor = request.user.instructor.id

        if topic.course.instructor.id ==  instructor: 
            topic.delete()
            return Response(status=status.HTTP_200_OK)

class sideChapters(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = sideTopicSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            
            course_topics = Topic.objects.filter(course=course_id)
            print(course_topics)
            return course_topics
        #     sql = f"SELECT id,title FROM main_chapter WHERE course_id={chapter_id}";
        # chapters = models.Topic.objects.raw(sql);
        # return chapters

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class IsAuthenticated(APIView):
    def get(self, request):
        is_authenticated = request.user.is_authenticated
        # try:     
        print('Authentciated Out',is_authenticated)      
        if is_authenticated:
            print('Authentciated',is_authenticated)
            if request.user.is_instructor:
                return Response({
                    "authenticated":f"{is_authenticated}",
                    "user":"instructor"
                })
            elif request.user.is_student:
                return Response({
                    "authenticated":f"{is_authenticated}",
                    "user":"student"
                })
            else:
                return Response({
                    "authenticated":f"{is_authenticated}",
                })
        else:
                return Response({
                    "message":f"Not Authenticated",
                })
    # except:
        #     print("Something is wrong")
        #     return Response({
        #        "message":f"Something went wrong",
        #     })


    # @csrf_exempt
    # def post(self, request, *args, **kwargs):
    #     email = request.data.get('email')

    #     # Generate OTP secret key
    #     otp_secret_key = pyotp.random_base32()
    #     otp_created_at = datetime.now()

    #     # Store OTP details in the database
    #     user_profile = models.Student.objects.create(
    #         email=email,
    #         otp_secret_key=otp_secret_key,
    #         otp_created_at=otp_created_at
    #     )
        
    #     # Create an OTP instance
    #     totp = pyotp.TOTP(otp_secret_key)
        
    #     # Generate OTP
    #     otp_code = totp.now()
        
    #     # Send the OTP to the user (you can use email or any other method)
    #     # Here, we'll just print it for demonstration purposes
    #     print(f"Generated OTP for user {email}: {otp_code} {user_profile.pk}")


    #     return Response({"message": "User registered successfully. Check your OTP."})

#enroll status
class FetchEnrollStatus(APIView):
    def get_queryset(self, course):
        return apps.get_model('student','StudentCourseEnrolled').objects.filter(course=course, student=self.request.user.student)

    def get(self, request, *args, **kwargs):
        if request.user.is_student:
            course_id = kwargs.get('course_id')

            course = Course.objects.filter(id=course_id).first()
            
            enrollStatus = self.get_queryset(course=course).count()

            if enrollStatus:
                return JsonResponse({'bool':True})
            else:
                return JsonResponse({'bool':False})
        else:
            return Response({'message':'user not a student.'}, status=status.HTTP_403_FORBIDDEN)

class FetchRatingStatus(APIView):
    def get_queryset(self, course):
        return CourseRating.objects.filter(student=self.request.user.student, course=course)
        pass

    def get(self, request, *args, **kwargs):
        if request.user.is_student:
            try:
                course_id = kwargs.get('course_id')
                course = Course.objects.get(id=course_id)
                
                ratingStatus = self.get_queryset(course=course)

                if ratingStatus:
                    return JsonResponse({'bool':True})
                else:
                    return JsonResponse({'bool':False})
            except CourseRating.DoesNotExist:
                return Response({'message':'Rated Course does not exist'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'message':'user not student'}, status=status.HTTP_403_FORBIDDEN)
        


class EnrolledStudentList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = apps.get_model('student', 'StudentCourseEnrolled').objects.all();
    serializer_class=StudentCourseEnrolledSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return apps.get_model('student', 'StudentCourseEnrolled').objects.filter(course=course)
        
        instructor_id = self.request.user.instructor.id
        instructor = apps.get_model('instructor', 'Instructor').objects.get(pk=instructor_id)
        return apps.get_model('student', 'StudentCourseEnrolled').objects.filter(course__instructor=instructor)
    
       

    # def get(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     requested_user_id=self.kwargs['user_id']
    #     user_id = self.request.user.student.id
    #     print(f"req_user_id:{requested_user_id} | user_id {user_id}")
    #     print("queryset", queryset)
    #     if requested_user_id != user_id:
    #             return Response(status=status.HTTP_403_FORBIDDEN)
    #     return Response({"message":queryset})
                
class FaqList(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class=FaqSerializer

class FlatPagesList(generics.ListAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPageSerializer

class FlatPagesDetail(generics.RetrieveAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPageSerializer

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class=ContactListSerializer  

class StudentInstructorList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        student_id = self.request.user.student.id
        
        # if req_user_id == user_id:
        sql=f"""
        SELECT * FROM main_course AS c
        JOIN main_studentcourseenrolled 
        AS e ON c.id = e.course_id
        JOIN main_instructor AS i ON c.instructor_id = i.id
        WHERE e.student_id={student_id}
        GROUP BY c.instructor_id;
        """
        qs = Course.objects.raw(sql)
        return qs
        # else:
        #     print('Unauthorized Access')


class NoteList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Note.objects.all()
    serializer_class = noteSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        note_id = self.kwargs.get('note_id', None)
        topic_id = self.kwargs.get('topic_id', None)
        
        if note_id and topic_id:
            notes = Note.objects.filter(id=note_id, topic_id=topic_id)
            return notes 
        return Note.objects.filter(id=topic_id)
    
    def perform_create(self, serializer):
        topic_id = self.request.data['topic']
        topic = Topic.objects.get(id=topic_id)
        title = self.request.data['title']
        content = self.request.data['content']
    
        serializer.save(topic=topic, title=title, content=content)

class SummaryList(generics.ListCreateAPIView):
    queryset = Summary.objects.all()
    serializer_class = summarySerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        summary_id = self.kwargs['summary_id']
        return Topic.objects.filter(pk=summary_id)
    
    def perform_create(self, serializer):
        topic_id = self.request.data['topic']
        topic = Topic.objects.get(id=topic_id)
        title = self.request.data['title']
        content = self.request.data['content']

        serializer.save(topic=topic, title=title, content=content)

def uploadNoteImage(request, *args, **kwargs):
        file = request.FILES.get('upload')
        if file:
            file_name = default_storage.save(f"notes_imgs/{file.name}", file)
            file_url = default_storage.url(file_name)
            return JsonResponse({'url': file_url})
        return JsonResponse({'error':'No file Uploaded'}, status=400)

class UploadNoteImage(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny, )
    parser_classes = (MultiPartParser, FormParser)
   
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('upload')
        if file:
            file_name = default_storage.save(f"notes_imgs/{file.name}", file)
            file_url = default_storage.url(file_name)
            return JsonResponse({'url': file_url})
        return JsonResponse({'error':'No file Uploaded'}, status=400)

    

#Contact
class ContactUs(APIView):
    def post(self, request):
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        from_email = request.data['email']
        message = request.data['message']
        our_email  = 'alaminhaidaraliyu@gmail.com'

        email = EmailMessage(
            subject=f'Contact Us',
            body=f'''
            from: {from_email} 
            Name:{first_name} {last_name}

            {message}
            ''',
            from_email=f'{from_email}',
            to=[our_email]
        )
        email.send()
        return Response({'message':'Email sent successfully'})

class SearchView(APIView):
    serializer_class = CourseSerializer
    pagination_class = largeResultPagination
    
    def get(self, request, *args, **kwargs):
        query = request.data
        print(query)
        return Response({'message':'Search >VIew'})

    def post(self, request, *args, **kwargs):
        query = request.data['course']
        if query:
            results = Course.objects.filter(title__icontains=query)
            print('Results:', results)
            serializer = self.serializer_class(results, many=True)

            return Response({'results':serializer.data})
        else:
            return Response({'message':'No course like that.'})

class DiscussionCommentView(APIView):
    # permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def post(self, request, course_id):
        # Create a new discussion comment or reply
        data = request.data 
        content = data.get('content')
        user = data.get('user')
        instructor = data.get('instructor')
        reply = data.get('reply')
        course = Course.objects.get(id=course_id)
        created_comment = None
    
        if user is not None and reply is None:
            student_id = request.user.student.id
            student = apps.get_model('student','Student').objects.get(id=student_id)
            
            created_comment = DiscussionComment.objects.create(
                course=course, content=content, created_by_student=student
            )

        elif instructor is not None and reply is None:
            instructor_id = request.user.instructor.id
            instructor = apps.get_model('instructor', 'Instructor').objects.get(id=instructor_id)
            created_comment = DiscussionComment.objects.create(
                course=course, content=content, created_by_instructor=instructor
            )

        elif reply:

            discussion_id = data.get('discussion_id')
            reply_content = data.get('reply_content')
            discussion = DiscussionComment.objects.get(id=discussion_id)
                
    
            if user and hasattr(request.user, 'student'):
                student_id = request.user.student.id                
                student = apps.get_model('student', 'Student').objects.get(id=student_id)
                
                created_comment = DiscussionComment.objects.create(course=course, created_by_student=student, content=reply_content, reply_to=discussion)


            elif instructor and hasattr(request.user, 'instructor'):
                instructor_id = request.user.instructor.id
                instructor = apps.get_model('instructor', 'Instructor').Instructor.objects.get(id=instructor_id)

                created_comment = DiscussionComment.objects.create(
                    course=course, content=reply_content, reply_to=discussion, created_by_instructor=instructor
                )

        if created_comment:
            serializer = DiscussionCommentSerializer2(created_comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # serializer = DiscussionCommentSerializer(data=data)

        # if serializer.is_valid():
        #     serializer.save(created_by=request.user.student)  # Ensure created_by is set to the current user
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiscussionCommentView2(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        # Fetch top-level comments for the course
        top_level_comments = DiscussionComment.objects.filter(course_id=course_id, reply_to__isnull=True)
        serializer = DiscussionCommentSerializer2(top_level_comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PopularInstructors(generics.ListCreateAPIView):
    instructor = apps.get_model('instructor','Instructor').objects
    queryset = instructor.all();
    serializer_class = InstructorDetailSerializer;
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql = 'SELECT *,COUNT(c.id) as total_course FROM instructor_instructor as t INNER JOIN main_course as c ON c.instructor_id=t.id GROUP BY t.id ORDER BY total_course desc'
            # return instr.objects.raw(sql)
            return self.instructor.raw(sql) 

#unless you're strong you can't protect anything let alone everything that is precious to you 
    
#it is only in the group of like minded men that one can become truly free of any fear or reprisal