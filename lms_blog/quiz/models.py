import random
from django.db import models
# Create your models here.

DIFF_CHOICES = (
    ('B', 'Beginner'),
    ('I', 'Intermediate'),
    ('A', 'Advanced'),
)

class Quiz(models.Model):
    instructor = models.ForeignKey('instructor.Instructor', on_delete=models.CASCADE, related_name='quiz_instructor')
    course = models.ForeignKey('main.Course', on_delete=models.CASCADE)
    topic =  models.ForeignKey('main.Topic', on_delete=models.CASCADE, null=True, blank=True)
    name =  models.CharField(max_length=120)
    duration_time =  models.IntegerField(help_text='duration of the quiz in minutes')
    required_score_to_pass =  models.IntegerField()
    difficulty =  models.CharField(max_length=6, choices=DIFF_CHOICES)

    class Meta:
        verbose_name_plural = 'Quizes'
        
    def __str__(self):
        return f"{self.course.title} - {self.name}"
    
    def get_questions(self): 
         questions = list(self.question_set.all())
         return questions        
    
    def get_questions_no(self): 
         questions = self.question_set.count()
         return questions        

class Question(models.Model):
    text = models.CharField(max_length=120)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text}"
    
    def get_answers(self):
        return self.answer_set.all()

class Answer(models.Model):
    text = models.CharField(max_length=120)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    explanation = models.CharField(max_length=200, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"question: {self.question.text}, answer: {self.text}, correct: {self.correct}"    

class Results(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey('student.Student', on_delete=models.CASCADE)
    score = models.FloatField(default=0.0)
    completed_at = models.DateTimeField(auto_now_add=True, null=True)

    # def __str__(self):
    #     return f"{self.user.first_name} - {self.quiz.title} - Score: {self.score}"

    class Meta:
        unique_together = ('quiz', 'user')

class UserAnswer(models.Model):
    result = models.ForeignKey(Results, on_delete=models.CASCADE, related_name='user_answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.ForeignKey(Answer, on_delete=models.SET_NULL, null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    class Meta:
        unique_together = ('result', 'question')

    def save(self, *args, **kwargs):
        if self.selected_answer:
            self.is_correct = self.selected_answer.correct
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.result.user.first_name} - {self.question.text} - Selected: {self.selected_answer.text if self.selected_answer else 'None'}"
