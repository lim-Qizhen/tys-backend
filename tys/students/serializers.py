from rest_framework import serializers
from .models import Student, StudentPaper, StudentCompletedPapers
from django.apps import apps
Paper = apps.get_model('papers', 'Paper')


class StudentSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Student
    #     fields = '__all__'
    #     extra_kwargs = {
    #         'password': {'write_only': True}
    #     }
    #
    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     hashed = self.Meta.model(**validated_data)
    #     hashed.set_password(password)
    #     hashed.save()
    #     return hashed
    class Meta:
        model = Student
        fields="__all__"

    def create(self, data):
        StudentModel = Student
        student = StudentModel.objects.create_user(**data)
        student.save()
        return student


class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)


class StudentPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPaper
        fields = '__all__'


class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = '__all__'


class StudentCompletedPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCompletedPapers
        fields = '__all__'
