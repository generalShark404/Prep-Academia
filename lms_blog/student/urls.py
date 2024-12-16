from django.urls import path
from .views import (
    GetStudentProfile, 
    StudentCourseEnrolled, 
    StudentEnrolledCourse, StudentCourses,StudentFetchInstructor, StudentFavoriteCourseList, StudentUpdateProfile,GetUserProfileDetails, StudentTopicProgress, StudentCourseProgressListView, StudentCourseProgressUpdateView, StudentTopicProgressListView, StudentTopicProgressUpdateView, StudentNoteProgressListView, StudentNoteProgressUpdateView, StudentNoteProgressStatus, StudentList, UserList, StudentDashboard
)
urlpatterns = [
    path('student-profile/', GetStudentProfile.as_view()),
    path('student-enroll-course/<int:course_id>', StudentEnrolledCourse.as_view()),
    path ('fetch-enrolled-courses/', StudentCourses.as_view()),
    path('student-add-favorite-course/<int:course_id>', StudentFavoriteCourseList.as_view()),
    path('fetch-favorite-courses/', StudentFavoriteCourseList.as_view()),
    path('fetch-instructor/', StudentFetchInstructor.as_view()),
    path('student-update-profile/', StudentUpdateProfile.as_view()),

    path('student-course-progress', StudentCourseProgressListView.as_view(), name="student-course-progress-list"),
    path('student-course-progress/<int:pk>', StudentCourseProgressUpdateView.as_view(), name='student-course-progress-update'),
    path('student-topic-progress', StudentTopicProgressListView.as_view(), name='student-topic-progress-list'),
    path('student-topic-progress/<int:pk>', StudentTopicProgressUpdateView.as_view(), name='student-topic-progress-update'),
    path('student-note-progress', StudentNoteProgressListView.as_view(), name='student-note-progress-list'),
    path('student-note-progress/<int:pk>', StudentNoteProgressUpdateView.as_view(), name='student-note-progress-update'),
    path('student-note-progress-status/<int:note_id>', StudentNoteProgressStatus.as_view(), name='student-note-progress-status'),
    path('student/', StudentList.as_view()),
    path("student/dashboard/<int:pk>", StudentDashboard.as_view()),
    path("student/dashboard/<int:pk>", GetUserProfileDetails.as_view()),
    path('user/<int:user_id>', UserList.as_view()),
]