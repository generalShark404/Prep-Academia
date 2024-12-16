from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .manager import UserManager, CustomUserManager
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.models import BaseUserManager
# Create your models here.

AUTH_PROVIDERS = {'email':'email', 'google':'google', 'facebook':'facebook'}
 

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, verbose_name=('Email Address'))
    first_name = models.CharField(max_length=100, verbose_name=('First Name'), null=True, blank=True)
    last_name = models.CharField(max_length=100, verbose_name=('Last Name'), null=True, blank=True)
    username = models.CharField(max_length=30, unique=True, null=True)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_datejoined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_student = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, related_name="account_user_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="account_user_permissions")
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = CustomUserManager()

    def __str__(self):
        return f"""{self.email}"""
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def user_status(self):
        return {
            'is_student':self.is_student,
            'is_instructor':self.is_instructor,
        }
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access_token":str(refresh.access_token)
        }

class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user} - otp code"
    