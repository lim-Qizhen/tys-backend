# Generated by Django 4.0.2 on 2022-02-09 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papers', '0009_alter_question_paper_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='subject',
            field=models.CharField(choices=[('Science_(Physics)', 'Science (Physics)'), ('Science_(Chemistry)', 'Science (Chemistry)'), ('Science_(Biology)', 'Science (Biology)'), ('Physics', 'Physics'), ('Chemistry', 'Chemistry'), ('Biology', 'Biology'), ('Science', 'Science')], max_length=100),
        ),
    ]
