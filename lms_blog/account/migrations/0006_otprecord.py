# Generated by Django 3.2.21 on 2024-11-26 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_user_first_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='OTPRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=150)),
                ('otp_secret_key', models.CharField(max_length=150)),
                ('otp_valid_date', models.DateTimeField()),
            ],
        ),
    ]
