import secrets 
from typing import Any
from pyotp import TOTP

from django.db import models
from django.core import serializers
from django.core.mail import send_mail
from ckeditor.fields import RichTextField
from django.http import JsonResponse, HttpResponse
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from account.models import User
from django.conf import settings
from django.apps import apps
# from quiz.models import Quiz

#  Course category 
class Course_category(models.Model):
    title = models.CharField(max_length=150)
    description= models.TextField()
    category_thumbnail = models.ImageField(upload_to="category_thumbnail_imgs/", null=True)
    class Meta:
        verbose_name_plural = "2. Course Categories";
    def __str__(self):
        return self.title
    def total_courses(self):
        return Course.objects.filter(category=self).count()

# Instructor / Teacher Model

DIFFICULTY_CHOICES = [
    ('B','Beginner'),
    ('I','Intermediate'),
    ('A','Advanced'),
]

class Course(models.Model):
    instructor = models.ForeignKey('instructor.Instructor', on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Course_category, on_delete=models.CASCADE, related_name="category_courses")
    title = models.CharField(max_length=150)
    description = models.TextField()
    difficulty = models.CharField(max_length=3, choices=DIFFICULTY_CHOICES, null=True)
    featured_thumbnail = models.ImageField(upload_to='course_imgs/', null=True)
    tags = models.TextField(null=True)
    course_views=models.BigIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    

    class Meta:
        verbose_name_plural = "3. Course";
    
    def __str__(self):
        return self.title
    
    
    def get_reviews(self):
        reviews = CourseRating.objects.filter(course=self)
        for review in reviews:
            return {
                'reviews':reviews.count(),
                'rating':review.rating
            }
        
    def related_courses(self):
        related_courses=Course.objects.filter(tags__icontains=self.tags)
        return serializers.serialize('json', related_courses)
   
    def get_instructor(self):
        instructors = serializers.serialize("json", {self.instructor})
        return instructors

    def tech_list(self):
        tag_list=self.tags.split(',')
        return tag_list
   
    def total_enrolled_students(self):
        total_enrolled_courses = apps.get_model('student','StudentCourseEnrolled')
        # return total_enrolled_courses.objects.filter(course=self).count()
        # total_enrolled_students= StudentCourseEnrolled.objects.filter(course=self).count()
        # return total_enrolled_students
   
    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']


class DiscussionComment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='discussion_comments', null=True)
    created_by_student = models.ForeignKey('student.Student', on_delete=models.CASCADE, null=True, blank=True)
    created_by_instructor = models.ForeignKey('instructor.Instructor', on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Discussion {self.course}: {self.content[:30]}"

    class Meta:
        ordering = ['created_on']


class Topic(models.Model):
    topic_image = models.ImageField(upload_to='topic_imgs/', null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='topics')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "4. Topic";

    def __str__(self):
        return self.title
    
    def get_notes_id(self):
        return self.notes.all().id
    
    def get_notes(self):
        return self.notes.all()
    
class Note(models.Model):
    title = models.CharField(max_length=120, null=True)
    topic = models.ForeignKey(Topic, related_name='notes', on_delete=models.CASCADE)
    content = models.TextField()

    class Meta:
        verbose_name_plural = "18. Notes"

    def __str__(self):
        return f"Note for - {self.title} - {self.topic.title}"
    
    def instructor_username(self):
        instructor_id = self.topic.course.instructor.id
        return apps.get_model('account', 'User').objects.get(id=instructor_id).username


class Summary(models.Model):
    title = models.CharField(max_length=120, null=True)
    topic = models.ForeignKey(Topic, related_name='summaries', on_delete=models.CASCADE)
    content = RichTextField()

    class Meta:
        verbose_name_plural = "19. Summary"

    def __str__(self):
        return f"Summary for {self.topic.title}"

    

#Course Rating
class CourseRating(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    student=models.ForeignKey('student.Student', on_delete=models.CASCADE, null=True)
    rating=models.PositiveBigIntegerField(default=0)
    reviews=models.TextField(null=True)
    review_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural='8. Course Rating'
    
    def student_username(self):
        return self.student.username()

    def __str__(self):
        return f"{self.course.title} - {self.student.first_name} - {self.rating}"
    
#FAQ
class FAQ(models.Model):
    question=models.CharField(max_length=300)
    answer=models.TextField()

    class Meta:
        verbose_name_plural="16. FAQ"
    def __str__(self):
        return self.question 

#Contact Us Page
class Contact(models.Model):
    firstname=models.CharField(max_length=60)
    lastname=models.CharField(max_length=60)
    email=models.EmailField(max_length=60)
    message=models.TextField()
    add_time=models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural="17. Contact Queries"

    def __str__(self):
        return f"{self.firstname} - {self.email}"
    
    def save(self, *args, **kwargs):
        send_mail(
            #Subject
            'Contact Query',
            #Subject
            'Here is the message',
            #To
            'alaminhaidaraliyu@gmail.com',
            [self.email],
            fail_silently=False,
            html_message=f"<p>{self.email} - {self.message}</p>"
        )

        return super().save(*args, **kwargs)

#remember death, nothing matters but your goals and mission to accomplish.