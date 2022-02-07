from rest_framework import serializers
from .models import Tutor

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
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
