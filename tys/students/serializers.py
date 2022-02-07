from rest_framework import serializers
from .models import Student
from django.apps import apps
Paper = apps.get_model('papers', 'Paper')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        hashed = self.Meta.model(**validated_data)
        hashed.set_password(password)
        hashed.save()
        return hashed


class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)


class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = '__all__'
