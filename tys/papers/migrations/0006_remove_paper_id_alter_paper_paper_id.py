# Generated by Django 4.0.2 on 2022-02-07 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papers', '0005_question_remove_paper_answer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paper',
            name='id',
        ),
        migrations.AlterField(
            model_name='paper',
            name='paper_id',
            field=models.CharField(max_length=255, primary_key=True, serialize=False, unique=True),
        ),
    ]
