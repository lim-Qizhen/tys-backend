# Generated by Django 4.0.2 on 2022-02-07 05:20

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('contact', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('school', models.CharField(choices=[('Admiralty Secondary School', 'Admiralty Secondary School'), ('Anglican High School', 'Anglican High School')], max_length=100)),
                ('subject', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('Science (Physics)', 'Science (Physics)'), ('Science (Chemistry)', 'Science (Chemistry)'), ('Science (Biology)', 'Science (Biology)'), ('Physics', 'Physics'), ('Chemistry', 'Chemistry'), ('Biology', 'Biology')], max_length=100), size=None)),
                ('exams', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('Normal (Academic)', 'Normal (Academic)'), ('Normal (Technical)', 'Normal (Technical)'), ('Express', 'Express')], max_length=100), size=None)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
