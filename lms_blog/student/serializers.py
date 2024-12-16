from django.apps import apps
from django.core.validators import URLValidator

from rest_framework import serializers

# from main.serializers import InstructorSerializer
# from instructor.serializers import Ins

from .models import StudentCourseEnrolled, Student, StudentFavoriteCourse, StudentCourseProgress, StudentTopicProgress, StudentNoteProgress

class StudentCourseEnrolledSerializer(serializers.ModelSerializer):
    class Meta:
        model =  StudentCourseEnrolled;
        fields = ["id",'course','student','enrolled_time']

        depth=2

class StudentFavoriteCourseSerialzer(serializers.ModelSerializer):
    student =  serializers.ReadOnlyField(source='student.id')
    class Meta:
        model = StudentFavoriteCourse
        fields = ["id", "course", "student", "status"]

    def __init__(self, *args,**kwargs):
        super(StudentFavoriteCourseSerialzer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method == 'GET':
            self.Meta.depth=2

class StudentCourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseProgress
        fields = '__all__'

        depth = 1 

class StudentTopicProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTopicProgress
        fields = '__all__'
        
class StudentNoteProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentNoteProgress
        fields = ['id', 'note', 'student', 'completed']

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["enrolled_courses", "favorite_courses", "username"]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Student;
        fields = ["id",'mobile_number',"enrolled_courses","favorite_courses","about","profile_img", "first_name","last_name", 'instagram_url', 'x_url', 'facebook_url', 'all_instructors', 'username']

    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=1
            
    def validate_facebook_url(self, value):
    #    print("Value: ", value)
       if value is None or value == '':
          return value
       
       try:
         URLValidator()(value)
         return value
       except:
         raise serializers.ValidationError('Enter a valid URL')
    
    def validate_instagram_url(self, value):
    #    print("Value: ", value)
       if value is None or value == '':
          return value
    
       try:
         URLValidator()(value)
         return value
       except:
         raise serializers.ValidationError('Enter a valid URL')
    
    def validate_x_url(self, value):
    #    print("Value: ", value)
       if value is None or value == '':
          return value
    
       try:
         URLValidator()(value)
         return value
       except:
         raise serializers.ValidationError('Enter a valid URL')
       
    def validate_email(self, value):
        pass 
    
    # def create(self, validated_data):
    #     email=self.validated_data['email']        
        # instance=super(StudentSerializer, self).create(validated_data)

        # send_mail(
        #     #Subject
        #     'Verify Account',
        #     #Subject
        #     'Please verify your account',
        #     #To
        #     'alaminhaidaraliyu@gmail.com',
        #     [email],
        #     fail_silently=False,
        #     html_message=f"<p>Your OTP is</p><p>{otp_digit}</p>"
        # )
        # return instance


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['about','first_name','last_name', 'mobile_number','profile_img', 'instagram_url', 'x_url', 'facebook_url']

        # def __init__(self, *args, **kwargs):
        # #    super(InstructorSerializer, self).__init__(*args, **kwargs)
        #    request = self.context.get('request')
        #    self.Meta.depth = 0
        #    if request and request.method == 'GET':
        #      self.Meta.depth=1

# class StudentUserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Student
#         fields = ['id','student','first_name','last_name','about','mobile_number','profile_img','enrolled_courses','favorite_courses', 'all_instructors']
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'student','profile_img']
        def __init__(self, *args, **kwargs):
        #   super(InstructorSerializer, self).__init__(*args, **kwargs)
          request = self.context.get('request')
          self.Meta.depth = 0
          if request and request.method == 'GET':
            self.Meta.depth=1
  