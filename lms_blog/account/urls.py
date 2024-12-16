from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView, 
    LoginUserView, 
    LogoutUserView, 
    PasswordResetRequestView, 
    SetNewPassword,
    ChangePassword, 
    OtpView
)

urlpatterns = [
    path('instructor/register/', RegisterView.as_view()),
    path('student/register/', RegisterView.as_view()),

    path('user/login/', LoginUserView.as_view()),
    path('user/logout/', LogoutUserView.as_view()),

    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('password-reset/', PasswordResetRequestView.as_view()),
    
    path('set-new-password/<uidb64>/<token>', SetNewPassword.as_view()),
    path('user/change-password/', ChangePassword.as_view()),

    # path('verify/otp', OtpView),

]