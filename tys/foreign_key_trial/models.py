from django.db import models

# Create your models here.
class Trial(models.Model):
    paper = models.ForeignKey('papers.Paper', on_delete=models.PROTECT)
