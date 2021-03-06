# Generated by Django 4.0.2 on 2022-02-04 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papers', '0003_alter_paper_question_img_alter_paper_solution'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='exams',
            field=models.CharField(choices=[('NA', 'Normal (Academic)'), ('NT', 'Normal (Technical)'), ('E', 'Express')], max_length=2),
        ),
        migrations.AlterField(
            model_name='paper',
            name='subject',
            field=models.CharField(choices=[('Science (Physics)', 'Science (Physics)'), ('Science (Chemistry)', 'Science (Chemistry)'), ('Science (Biology)', 'Science (Biology)'), ('Physics', 'Physics'), ('Chemistry', 'Chemistry'), ('Biology', 'Biology')], max_length=100),
        ),
    ]
