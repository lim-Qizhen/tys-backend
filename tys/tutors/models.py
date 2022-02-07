from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class Tutor(AbstractBaseUser):
    SCHOOL_CHOICES = [
        ('Admiralty Secondary School', 'Admiralty Secondary School'),
        ('Anglican High School', 'Anglican High School'),
    ]
    SUBJECT_CHOICES = [
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
    ]
    last_login = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    contact = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES)
    subject = ArrayField(models.CharField(max_length=100, choices=SUBJECT_CHOICES))
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username
