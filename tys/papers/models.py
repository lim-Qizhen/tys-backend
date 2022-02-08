from django.db import models

# Create your models here.


class Paper(models.Model):
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
    year = models.IntegerField()
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES)
    exams = models.CharField(max_length=100, choices=EXAM_CHOICES)
    paper_id = models.CharField(max_length=255, unique=True, primary_key=True)

    def __str__(self):
        return self.paper_id

class Question(models.Model):
    ANSWER_CHOICES = [
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D'),
    ]
    paper_id = models.CharField(max_length=7)
    question_number = models.IntegerField()
    question_img = models.CharField(max_length=255)
    answer = models.CharField(max_length=1, choices = ANSWER_CHOICES)
    solution = models.CharField(max_length=255)

    def __str__(self):
        return self.subject, self.year
