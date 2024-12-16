from django.apps import apps
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Student(models.Model):
    interested_categories = models.ManyToManyField( 'main.Course_category');
    student = models.OneToOneField('account.User', on_delete=models.CASCADE, null=True)
    first_name = models.CharField(max_length=25, default='')
    last_name = models.CharField(max_length=25, default='')
    about = models.CharField(max_length=200, null=True)
    mobile_number = models.CharField(null=True, max_length=15, blank=True)
    profile_img = models.ImageField(upload_to='student_profile_imgs/', null=True, blank=True)
    facebook_url = models.URLField(null=True)
    x_url = models.URLField(null=True) 
    instagram_url = models.URLField(null=True)
    website_url = models.URLField(null=True)

    class Meta:
       verbose_name_plural = "5. Student" 
    
    # #enrolled courses
    def username(self):
        user = apps.get_model('account', 'User').objects.get(id=self.student.id)
        return user.username

    def enrolled_courses(self):
        enrolled_courses = StudentCourseEnrolled.objects.filter(student=self).count()
        return enrolled_courses
    
    #favorite courses
    def favorite_courses(self):
        favorite_courses = StudentFavoriteCourse.objects.filter(student=self).count()
        return favorite_courses
    
    def all_instructors(self):
        enrolled_courses = StudentCourseEnrolled.objects.filter(student=self).select_related('course__instructor')

        instructors = []
        for enrollment in enrolled_courses:
            instructor = enrollment.course.instructor
            instructors.append({'id': instructor.id})
            return instructors

    def __str__(self):
        return str(self.student.email)

class StudentCourseProgress(models.Model):
    course = models.ForeignKey('main.Course', on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE) 
    progress = models.FloatField(default=0.0)

    def update_progress(self ):
        total_topics = self.course.topics.count()
        print("Total topics",total_topics)
        if total_topics == 0:
            self.progress = 100
        else:
            completed_topics = StudentTopicProgress.objects.filter(student=self.student, topic__course=self.course, completed=True).count()
            print('Completed topics', completed_topics)
            print("total")
            self.progress = (completed_topics / total_topics) * 100
        self.save()

    def __str__(self):
        return f"{self.student} progress on Course {self.course}"
    
class StudentTopicProgress(models.Model):
    topic = models.ForeignKey('main.Topic', on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('student', 'topic')

    def update_progress(self):
        total_notes = self.topic.notes.count()
        print('TOtal notes', total_notes)
        if total_notes == 0:
            self.completed = True
        else:
            completed_notes = StudentNoteProgress.objects.filter(student=self.student, note__topic=self.topic, completed=True).count()
            self.completed = completed_notes == total_notes
        self.save()
    
    def __str__(self):
        return f"{self.student} - progress on Topic {self.topic.title} - id:  {self.topic.id}"

class StudentNoteProgress(models.Model):
    note = models.ForeignKey('main.Note', on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('student', 'note')

    def __str__(self):
        return f"{self.student} progress on Note {self.note.id}"

@receiver(post_save, sender=StudentNoteProgress)
def update_topic_progress(sender, instance, **kwargs):
        topic_progress, created = StudentTopicProgress.objects.get_or_create(student=instance.student, topic=instance.note.topic)
        topic_progress.update_progress()

@receiver(post_save, sender=StudentTopicProgress)
def update_course_progress(sender, instance, **kwargs):
    course_progress, created = StudentCourseProgress.objects.get_or_create(student=instance.student, course=instance.topic.course)
    course_progress.update_progress()

#Enrolled Students
class StudentCourseEnrolled(models.Model):
    course=models.ForeignKey('main.Course', on_delete=models.CASCADE,related_name='enrolled_courses', null=True)
    student=models.ForeignKey(Student, on_delete=models.CASCADE,related_name='enrolled_student');
    enrolled_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural='6. Enrolled Courses'
        
    def __str__(self):
        return f"{self.student.first_name}-{self.course.title}"

#Students Favorite Course
class StudentFavoriteCourse(models.Model):
    course = models.ForeignKey('main.Course', on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural='7. Student Favorite Course'

    def __str__(self):
        return f"{self.course.title} - {self.student.first_name}"