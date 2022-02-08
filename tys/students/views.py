from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StudentSerializer, TokenSerializer, PaperSerializer
from .models import Student
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.apps import apps
Paper = apps.get_model('papers', 'Paper')


# Create your views here.
class StudentCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating student account.')


class StudentLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = Student.objects.filter(username= username).first()

        if user is None:
            raise AuthenticationFailed('This account does not exist, please register first!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        refresh = RefreshToken.for_user(user)
        serializer = TokenSerializer(data={
            "token": str(refresh.access_token)
            })
        serializer.is_valid()
        return Response(serializer.data)

    # def get(self, request):
    #     print(request.data)
    #     username = request.data['username']
    #     student = Student.objects.filter(username=username)[0]
    #     serializer = StudentSerializer(student)
    #     return Response(serializer.data)


class StudentProfile(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, username):
        student = Student.objects.filter(username=username)[0]
        serializer = StudentSerializer(student)
        return Response(serializer.data)


class StudentPapers(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, subjects, exams):
        papers = Paper.objects.filter(subject=subjects).filter(exams=exams)
        print(papers)
        serializers = PaperSerializer(papers, many=True)
        print(serializers.data)
        # serializers.is_valid()
        return Response(serializers.data)
