from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
from datetime import timedelta

class StudentManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('User must have a valid email.')

        # normalize: change uppercase to lowercase automatically
        user = self.model(email=self.normalize_email(email),
                          **kwargs)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, name, surname, password):
        user = self.create_user(
            email=email,
            name=name,
            surname=surname,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)

        return user

class Student(AbstractBaseUser):
    SCHOOL_CHOICES = [
        ('Admiralty_Secondary_School', 'Admiralty Secondary School'),
        ('Anglican_High_School', 'Anglican High School'),
    ]
    SUBJECT_CHOICES = [
        ('Science_(Physics)', 'Science (Physics)'),
        ('Science_(Chemistry)', 'Science (Chemistry)'),
        ('Science_(Biology)', 'Science (Biology)'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
    ]
    EXAM_CHOICES = [
        ('Normal_(Academic)', 'Normal (Academic)'),
        ('Normal_(Technical)', 'Normal (Technical)'),
        ('Express', 'Express'),
    ]

    last_login = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True, primary_key=True)
    contact = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES)
    subject = ArrayField(models.CharField(max_length=100, choices=SUBJECT_CHOICES))
    exams = ArrayField(models.CharField(max_length=100, choices=EXAM_CHOICES))
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    objects = StudentManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class StudentPaper(models.Model):
    username = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    paper_id = models.ForeignKey('papers.Paper', on_delete=models.DO_NOTHING)
    completed = models.BooleanField(default=False)
    results = models.FloatField(default=0)
    duration = models.DurationField(default=timedelta(days=0, seconds=0))
    reviewed = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.username


#for review
class StudentCompletedPapers(models.Model):
    ANSWER_CHOICES = [
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D'),
    ]
    username = models.CharField(max_length=100)
    paper_id = models.CharField(max_length=255)
    question_number = models.IntegerField()
    question_img = models.CharField(max_length=255)
    answer = models.CharField(max_length=1, choices = ANSWER_CHOICES)
    student_answer = models.CharField(max_length=1, choices = ANSWER_CHOICES)
    accuracy = models.BooleanField()
    solution = models.CharField(max_length=255)
