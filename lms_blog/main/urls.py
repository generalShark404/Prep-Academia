from django.urls import path
from .views import (
    IsAuthenticated, 
    CourseList, 
    CourseDetail, 
    CourseTags, 
    DeleteCourse, 
    DiscussionCommentView, 
    DiscussionCommentView2, 
    CourseChapterList, 
    SearchView, 
    UpdateCourse, 
    PopularCourses, 
    CourseRatingList, 
    RemoveFavoriteCourse, 
    sideChapters, 
    CategoryList, 
    GetCategory, 
    TopicList, 
    GetCategoryList,
    GetTopicNotes, 
    GetUpdateDeleteTopic, 
    FetchEnrollStatus, 
    EnrolledStudentList, 
    FetchRatingStatus, 
    FetchFavoriteCourseStatus, 
    NoteList, 
    uploadNoteImage, 
    SummaryList, 
    AllTopics, 
    FaqList, 
    FlatPagesList, 
    FlatPagesDetail, 
    ContactList, ContactUs, 
    StudentInstructorList,
    PopularInstructors
)

urlpatterns = [  
    #General
    # path('popular-teachers/',StudentInstructorList.as_view()),
    path('is-authenticated', IsAuthenticated.as_view()), 


    #course
    path('course/', CourseList.as_view()),
    # path('add-course/', AddCourseList.as_view()),
    path('course/<int:pk>', CourseDetail.as_view()),
    path('course-tags/<tag>', CourseTags.as_view()),
    path('delete/course/<int:course_id>', DeleteCourse.as_view()),
    path('course-discussions/<int:course_id>', DiscussionCommentView.as_view()),
    path('course-discussions2/<int:course_id>', DiscussionCommentView2.as_view()),
    path('search-courses/<str:searchstring>', CourseList.as_view()),
    path('course-chapters/<int:chapter_id>', CourseChapterList.as_view()),
    path('search-course/', SearchView.as_view()),
    path('update-course/<int:course_id>/', UpdateCourse.as_view()),
    path('popular_courses', PopularCourses.as_view()),
    path('popular-instructors/', PopularInstructors.as_view()),
    path('fetch-recommended-courses/<int:studentId>', CourseList.as_view()),
    path('get-course-review/<int:course_id>', CourseRatingList.as_view()),
    path('course-rating', CourseRatingList.as_view()),
    path('user-remove-favorite-course/<int:course_id>', RemoveFavoriteCourse.as_view()),
    path('side-chapters/<int:course_id>', sideChapters.as_view()),      
    

    path('get-category/', CategoryList.as_view(), name="category"),
    path('get-category/<category>', GetCategory.as_view()),
    path('category/', CategoryList.as_view(), name="category"),
    path('category/<int:category_id>', CategoryList.as_view()),


    path('topic/<int:course_id>/', TopicList.as_view()),
    path('get/topic/notes/<int:topic_id>', GetTopicNotes.as_view()),
    path('get/topic/<int:topic_id>/', GetUpdateDeleteTopic.as_view()),
    path('update/topic/<int:topic_id>/', GetUpdateDeleteTopic.as_view()),
    path('delete/topic/<int:topic_id>/', GetUpdateDeleteTopic.as_view()),


    path('fetch-enroll-status/<int:course_id>', FetchEnrollStatus.as_view()),
    path('fetch-enrolled-students/', EnrolledStudentList.as_view()),
    path('fetch-rating-status/<int:course_id>', FetchRatingStatus.as_view()),
    path('fetch-favorite-status/<int:course_id>', FetchFavoriteCourseStatus.as_view()),


    path('note/<int:note_id>', NoteList.as_view()),
    path('upload-note-image/', uploadNoteImage, name='upload-note-image'),
    path('summary/<int:topic_id>', SummaryList.as_view()),
    path('note/<int:topic_id>/<int:note_id>', NoteList.as_view()),
    path('all-topics/<int:course_id>', AllTopics.as_view(), name='all-topics'),
    # path('upload-note-image/', UploadNoteImage.as_view(), name='upload-note-image'),


    # path('update-view/<int:course_id>', update_view),
    path('faq/', FaqList.as_view()),
    path('page/', FlatPagesList.as_view()),
    path('page/<int:pk>/<str:page_slug>/', FlatPagesDetail.as_view()), 
    path('contact/', ContactList.as_view()),
    path('contact-us', ContactUs.as_view()),
    # path('verify-student/<int:student_id>', St),    
]
# #google ad 
# firewall software loads last