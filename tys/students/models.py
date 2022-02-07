from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.


class Student(AbstractBaseUser):
    SCHOOL_CHOICES = [
        ('Admiralty Secondary School', 'Admiralty Secondary School'),
        ('Anglican High School', 'Anglican High School'),
    ]
    SUBJECT_CHOICES = [
        ('Science (Physics)', 'Science (Physics)'),
        ('Science (Chemistry)', 'Science (Chemistry)'),
        ('Science (Biology)', 'Science (Biology)'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
    ]
    EXAM_CHOICES = [
        ('Normal (Academic)', 'Normal (Academic)'),
        ('Normal (Technical)', 'Normal (Technical)'),
        ('Express', 'Express'),
    ]

    last_login = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    contact = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES)
    subject = ArrayField(models.CharField(max_length=100, choices=SUBJECT_CHOICES))
    exams = ArrayField(models.CharField(max_length=100, choices=EXAM_CHOICES))
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class StudentPaper(models.Model):
    username = models.ForeignKey(Student, on_delete=models.PROTECT)
    paper_id = models.ForeignKey('papers.Paper', on_delete=models.PROTECT)
    completed = models.BooleanField(default=False)
    results = models.FloatField(default=0)
    duration = models.DurationField(default=0)
    reviewed = models.BooleanField(default=False)
