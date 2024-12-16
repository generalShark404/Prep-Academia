from django.db import models
from django.conf import settings
from django.apps import apps

# Create your models here.
class Instructor(models.Model):
    instructor = models.OneToOneField('account.User', on_delete=models.CASCADE, null=True, related_name="instructor")
    first_name = models.CharField(max_length=100, default='null');
    last_name = models.CharField(max_length=100, default='null');
    about = models.CharField(max_length=200, default='null');
    mobile_number = models.CharField(max_length=20, default='null');
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True)
    facebook_url = models.URLField(null=True , blank=True)
    twitter_url = models.URLField(null=True, blank=True)
    instagram_url = models.URLField(null=True, blank=True)
    website_url = models.URLField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "1. Instructor"

    def instructor_info(self):
        user = apps.get_model('account', 'User').objects.get(id=self.instructor.id)
        print("INS USER", user)
        return {
            'username':user.username,
            # 'email':user.email
        }
    
    def skill_list(self):
        pass
    
    def total_teacher_courses(self):
        total_courses = apps.get_model('main','Course')
        return total_courses.objects.filter(instructor=self).count()
    
    def total_teacher_chapters(self):
        total_topics = apps.get_model('main','Topic')
        return total_topics.objects.filter(course__instructor=self).count() 
    
    def total_teacher_students(self):
        total_students = apps.get_model('student','StudentCourseEnrolled')
        return total_students.objects.filter(course__instructor=self).count()
    
    def total_quiz_created(self):
        total_quiz = apps.get_model('quiz','Quiz').objects.filter(instructor=self).count()
        return total_quiz
        pass
    
    def __str__(self):
        return f"""{self.instructor.username}"""
    