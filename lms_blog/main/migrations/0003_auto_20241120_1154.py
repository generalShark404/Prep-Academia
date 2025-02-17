# Generated by Django 3.2.21 on 2024-11-20 11:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
        ('instructor', '0002_instructor_instructor'),
        ('main', '0002_courserating_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='instructor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='instructor.instructor'),
        ),
        migrations.AddField(
            model_name='discussioncomment',
            name='created_by_instructor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='instructor.instructor'),
        ),
        migrations.AddField(
            model_name='discussioncomment',
            name='created_by_student',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='student.student'),
        ),
    ]
