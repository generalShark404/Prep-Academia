from django.urls import path

from.views import (
    GetInstructor, 
    InstructorDetail, 
    InstructorProfile,
    InstructorCourseList,
    AddCourseList,
    TopicNotesView,
    GetDeleteUpdateNote
)

urlpatterns = [
    path('instructor/', InstructorDetail.as_view()),
    path('instructor/<int:instructor_id>', GetInstructor.as_view()),
    path('instructor-profile/',InstructorProfile.as_view()),
    path('get-instructor/<int:instructor_id>', GetInstructor.as_view()),
    # path('popular-teachers/',InstructorList.as_view()),
    path('instructor-courses/', InstructorCourseList.as_view()),
    path('add-course/', AddCourseList.as_view()), 
    path('all/notes/topic/<int:topic_id>', TopicNotesView.as_view()),
    path('get/note/<int:note_id>', GetDeleteUpdateNote.as_view()), 
    path('update/note/<int:note_id>', GetDeleteUpdateNote.as_view()),
    path('delete/note/<int:note_id>', GetDeleteUpdateNote.as_view()),
]