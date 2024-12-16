# Create your views here.
from django.apps import apps
from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import generics

from .models import (
    Student, 
    StudentNoteProgress,
    StudentTopicProgress, 
    StudentFavoriteCourse, 
    StudentCourseEnrolled, 
    StudentCourseProgress, 
)

from .serializers import (
    UserSerializer,
    StudentSerializer,
    UserProfileSerializer,
    StudentDashboardSerializer, 
    StudentNoteProgressSerializer, StudentTopicProgressSerializer, 
    StudentFavoriteCourseSerialzer,
    StudentCourseEnrolledSerializer,   
    StudentCourseProgressSerializer,
    StudentCourseProgressSerializer,
    
)

from main.serializers import CourseSerializer

class StudentEnrolledCourse(APIView):
    queryset = apps.get_model('student', 'StudentCourseEnrolled')
    serializer_class = StudentCourseEnrolledSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        try:
            course = kwargs.get('course_id')
            student_id = request.user.student.id

            course = apps.get_model('main','course').objects.get(id=course)

            student = apps.get_model('student', 'Student').objects.get(id=student_id)

            enrolled_course = apps.get_model('student','StudentCourseEnrolled').objects.filter(course=course, student=student).exists()

            if enrolled_course:
                print("Enroll Exists")
                return Response({'message':'user already enrolled'})
            else:
                apps.get_model('student','StudentCourseEnrolled').objects.create(course=course, student=student)

                print('Enrolled Successfully')
            return Response({'message':'user enrolled successfully'})
        except:
            print('Something went wrong while processsing')

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = StudentFavoriteCourse.objects.all()
    serializer_class= StudentFavoriteCourseSerialzer

    def get_queryset(self):
            student_id=self.request.user.student.id

            student= Student.objects.get(id=student_id)
            return StudentFavoriteCourse.objects.filter(student=student)
    
    def perform_create(self, serializer):
        student_id = self.request.user.student.id
        student = Student.objects.get(id=student_id)
    
        serializer.save(student=student)

# class StudentFetchInstructor(APIView):
#     serializer_class = StudentSerializer
#     def get(self, request, *args, **kwargs):
#       student_id = request.user.student.id
#       student = Student.objects.filter(id=student_id)
#       print(student)

#       serializer = self.serializer_class(student, many=True)

#       print('Enrolled course:', serializer.data)

#       return Response({'instructor':serializer.data})

class StudentFetchInstructor(generics.ListAPIView):
    queryset = apps.get_model('main', 'Course').objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        student_id = self.request.user.student.id
        
        # if req_user_id == user_id:
        sql=f"""
        SELECT * FROM main_course AS c
        JOIN student_studentcourseenrolled 
        AS e ON c.id = e.course_id
        JOIN instructor_instructor AS i ON c.instructor_id = i.id
        WHERE e.student_id={student_id}
        GROUP BY c.instructor_id;
        """
        qs= apps.get_model('main', 'Course').objects.raw(sql)
        return qs

class StudentCourses(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class=StudentCourseEnrolledSerializer

    def get(self, request, *args, **kwargs):
        student_id = self.request.user.student.id
        student_enrolled_courses = StudentCourseEnrolled.objects.filter(student_id=student_id)
        serializer = self.serializer_class(student_enrolled_courses, many=True)
        return Response(serializer.data)

class StudentDashboard(generics.RetrieveAPIView):
    # permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    queryset = Student.objects.all()
    serializer_class = StudentDashboardSerializer

class StudentCourseProgressListView(generics.ListAPIView):
    serializer_class = StudentCourseProgressSerializer

    def get_queryset(self):
        return StudentCourseProgress.objects.filter(student=self.request.user.student.id)

class StudentCourseProgressUpdateView(generics.UpdateAPIView):
    queryset = StudentCourseProgress.objects.all()
    serializer_class = StudentCourseProgressSerializer

    def get_queryset(self):
        return self.queryset.filter(student=self.request.user)
    
    def perform_update(self, serializer):
        instance = serializer.save()
        instance.update_progress()

class StudentTopicProgressListView(generics.ListAPIView):
    serializer_class = StudentTopicProgressSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return StudentTopicProgress.objects.filter(student=self.request.user.id)
    
class StudentTopicProgressUpdateView(generics.CreateAPIView):
    queryset = StudentTopicProgress.objects.all()
    serializer_class = StudentTopicProgressSerializer

    def get_queryset(self):
        print("self.request.user.student: ",self.request.user.student.id)
        return self.queryset.filter(student=self.request.user.student)
    
    def perform_create(self, serializer):
        print("serializer", serializer)
        instance = serializer.save()
        instance.completed = True
        instance.save()
        instance.update_progress()

class StudentNoteProgressListView(generics.ListAPIView):
    serializer_class = StudentNoteProgressSerializer

    def get_queryset(self):
        student = Student.objects.get(student=self.request.user.id)
        return StudentNoteProgress.objects.filter(student=student)

class StudentNoteProgressUpdateView(generics.CreateAPIView):
    queryset = StudentNoteProgress.objects.all()
    serializer_class = StudentNoteProgressSerializer

    def get_queryset(self):
        return self.queryset.filter(student=self.request.user.id)
    
    def perform_update(self, serializer):
        instance = serializer.save()
        topic_progress, created = StudentTopicProgress.objects.get_or_create(student=instance.student, topic=instance.note.topic)
        topic_progress.update_progress()

        course_progress, created = StudentCourseProgress.objects.get_or_create(student=instance.student, course=instance.note.topic.course)
        course_progress.update_progress()

class StudentNoteProgressStatus(generics.ListAPIView):
   queryset = StudentNoteProgress.objects.all()
   serializer_class = StudentNoteProgressSerializer

   def list(self, request, *args, **kwargs):
       queryset = self.get_queryset()
       note_id = self.kwargs['note_id']

       try:
           obj = get_object_or_404(queryset, note=note_id)
       except Http404:
           data = [{'message':f'Note not {note_id} done found'}]
           return Response(data)
       serializer = self.get_serializer(queryset, many=True)
       data = serializer.data
       return Response(data)

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all();
    serializer_class = UserProfileSerializer;
    permission_classes = (permissions.IsAuthenticated,); 
    
    def get_queryset(self):
            student_id = self.request.user.student.id
            student = Student.objects.filter(id=student_id)
            return student

class GetStudentProfile(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = StudentSerializer
    
    def get(self, request):
        is_authenticated = request.user.is_authenticated
        student_id = request.user.student.id

        user_id = request.user.id
        username = apps.get_model('account', 'User').objects.get(id=user_id).username

        if is_authenticated: 
            student= Student.objects.get(id=student_id)
            student_profile = self.serializer_class(student)
            return Response({"student":student_profile.data})


class GetUserProfileDetails(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    _ = StudentDashboardSerializer

class GetUserProfile(APIView):
    def get(self, request, format=None):
        user = self.request.user
        username = user.username
        user = Student.objects.get(id=user.id)
        
        user_profile = Student.objects.get(user=user)
        user_profile = UserProfileSerializer(user_profile)

        return Response({'profile':user_profile.data, 'username':str(username)})

class UpdateUserProfile(APIView):
    def put(self, request, format=None):
        user = self.request.user
        username = user.username

        data = self.request.data
        first_name = data['first_name']
        last_name = data['last_name']
        phone = data['phone']
        city = data['city']

        user = Student.objects.get(id=user.id)
        Student.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city)
        user_profile = Student.objects.get(user=user)
        user_profile = UserProfileSerializer(user_profile)
        return Response({'profile':user_profile.data, 'username':str(username)})

class StudentUpdateProfile(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Student.objects.all();
    serializer_class = StudentSerializer

    lookup_field = None

    def get_object(self):
        return Student.objects.get(id=self.request.user.student.id)

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = Student.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)

class UserList(generics.ListCreateAPIView):
    queryset = Student.objects.all();
    serializer_class = UserSerializer;
    # permission_classes = [permissions.IsAuthenticated]; 
    
    def get_queryset(self):
        if 'user_id' in self.kwargs:
            user_id = self.kwargs['user_id']
            user = Student.objects.get(pk=user_id)
            z = Student.objects.filter(id=user_id)
            print("user id:", user_id)
            print(z)
            print(z[0].id)
            # print(z[0].user_id)
            Response({'userId':z[0].id})
            return z