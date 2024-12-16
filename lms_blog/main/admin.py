from django.contrib import admin;
from . import models;
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField 
# Register your models here.

class UserAdminConfig(UserAdmin):
    model = models.User
    search_fields = ('email', 'username', 'first_name',)
    list_filter = ('email', 'username', 'first_name', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('email', 'username', 'first_name', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields':('email','username', 'first_name',)}),
        ('Permissions', {'fields':('is_staff','is_active')}),
        ('Personal', {'fields':('bio',)}),
    )
    formfield_overrides = {
        models.RichTextField :{'widget':Textarea(attrs={'rows':20, 'cols':60})},
    }
    add_fieldsets = (
        (None, {
            'classes':('wide',),
            'fields':('email', 'username', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')
        }),
    )

admin.site.register(models.Course);
admin.site.register(models.Course_category);
admin.site.register(models.Topic);
admin.site.register(models.CourseRating);
admin.site.register(models.FAQ) 
admin.site.register(models.Contact) 
admin.site.register(models.Note)
admin.site.register(models.Summary)
admin.site.register(models.DiscussionComment)
# admin.site.register(models.InstructorStudentChat)
# admin.site.register(models.UserProfile, UserAdminConfig)
