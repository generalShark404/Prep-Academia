from django.urls import path
from .views import (
    QuizListView,
    Quiz_data,
    GetInstructorQuiz,
    AddQuizQuestionAndAnswer,
    GetStudentQuiz,
    GetQuizResults,
    GetUpdateDeleteQuiz,
    Result,
    submit_quiz
)

app_name = 'quizes'
urlpatterns = [
    path('quizes/<int:course_id>', QuizListView.as_view()),
    path('add-quiz/', QuizListView.as_view()),
    path('data/<pk>', Quiz_data.as_view()),
    path('instructor-quizes/', GetInstructorQuiz.as_view()),
    path('add/quiz-question-answer/<int:quiz_id>', AddQuizQuestionAndAnswer.as_view()),
    path('get/student/quiz/', GetStudentQuiz.as_view()),
    path('get/quiz-results/', GetQuizResults.as_view()),
    path('get-quiz/<int:quiz_id>', GetUpdateDeleteQuiz.as_view()),
    path('results/<pk>', Result.as_view()),
    path('edit-quiz/<int:quiz_id>', GetUpdateDeleteQuiz.as_view()),
    path('delete-quiz/<int:quiz_id>', GetUpdateDeleteQuiz.as_view()),
    path('submit-quiz/<int:quiz_id>', submit_quiz),
]