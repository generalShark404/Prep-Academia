from django.contrib import admin
from .models import Student, StudentTopicProgress, StudentNoteProgress, StudentCourseProgress, StudentCourseEnrolled, StudentFavoriteCourse

# Register your models here.
admin.site.register(Student)
admin.site.register(StudentTopicProgress)
admin.site.register(StudentNoteProgress)
admin.site.register(StudentCourseProgress)
admin.site.register(StudentCourseEnrolled);
admin.site.register(StudentFavoriteCourse);