from django.apps import apps
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Instructor
# Create your views here.
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from rest_framework import (
    status,
    generics, 
    permissions,
)

from .serializers import (
    IsInstructorOwner,
    InstructorDetailSerializer, 
    InstructorDashboardSerializer
)

from main.views import (
    StandardResultSetPagination
)

from main.serializers import (
    NoteTopicSerializer,
    noteSerializer,
    TopicSerializer,
    CourseSerializer,
)

class GetInstructor(APIView):
    serializer_class = InstructorDetailSerializer

    def get(self, request, *args, **kwargs):
        instructor_id = kwargs.get('instructor_id')
        instructor = Instructor.objects.get(id=instructor_id)
        serializer = self.serializer_class(instructor)
        return Response(serializer.data)

class InstructorProfile(APIView):
    permission_classes = (permissions.IsAuthenticated, IsInstructorOwner)

    def get_queryset(self):
        '''
          Get queryset in this same class.
        '''
        return Instructor.objects.get(instructor=self.request.user.instructor.id)
        
    def get(self, request):
        try:
            instructor_id = request.user.instructor.id
            # instructor = Instructor.objects.get(id=instructor_id)
            instructor = self.get_queryset()
            instructor_profile = InstructorDashboardSerializer(instructor)
            return Response({"instructor":instructor_profile.data})
        except Instructor.DoesNotExist:
            return Response({'message':'Instructor does not exist or you do not have permission to access this profile.'}, status=status.HTTP_403_FORBIDDEN)

class InstructorDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Instructor.objects.all();
    serializer_class = InstructorDetailSerializer

    lookup_field = None

    def get_object(self):
        try:
            return Instructor.objects.get(id=self.request.user.instructor.id)
        except Instructor.DoesNotExist:
            return Response({'message':'Instructor does not exist or you do not have permission to access this.'}, status=status.HTTP_403_FORBIDDEN)
        
class InstructorCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = StandardResultSetPagination

    def get_queryset(self):
        instructor_id = self.request.user.instructor.id
        instructor = apps.get_model('instructor', 'Instructor').objects.get(pk=instructor_id)
        # print(models.Course.objects.filter(instructor=teacher))
        return apps.get_model('main', 'Course').objects.filter(instructor=instructor)

class AddCourseList(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = apps.get_model('main', 'Course').objects.all()
    serializer_class = CourseSerializer
    pagination_class=StandardResultSetPagination

    def perform_create(self, serializer):
        instructor_id = self.request.user.instructor.id
        instructor = Instructor.objects.get(id=instructor_id)
        
        serializer.save(instructor=instructor)

class TopicNotesView(APIView):
    serializer_class = NoteTopicSerializer

    def get(self, request, *args, **kwargs):
        topic_id = kwargs.get('topic_id')
        topic = apps.get_model('main','Topic').objects.get(id=topic_id)
        note = apps.get_model('main','note').objects.filter(topic=topic)
        serializer = self.serializer_class(note, many=True)
        return Response({'notes':serializer.data})

class GetDeleteUpdateNote(APIView):
    permission_classes = (permissions.IsAuthenticated, IsInstructorOwner)
    serializer_class = noteSerializer

    def get(self, request, *args, **kwargs):
        note_id = kwargs.get('note_id')
        note = apps.get_model('main', 'Note').objects.get(id=note_id)
        serializer = self.serializer_class(note)
        return Response({'note':serializer.data})
    
    def put(self, request, *args, **kwargs):
        title = request.data.get('title')
        content = request.data.get('content')
        note_id = kwargs.get('note_id')
        
        note = apps.get_model('main', 'Note').objects.filter(id=note_id).update(title=title, content=content)
        
        return Response(status=status.HTTP_200_OK)
    
    @csrf_exempt
    def delete(self, request, *args, **kwargs):
        note_id = kwargs.get('note_id')
        note = apps.get_model('main','Note').objects.get(id=note_id)
        note.delete()
        
        return Response({'':''}, status=status.HTTP_200_OK)