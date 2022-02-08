from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StudentSerializer, TokenSerializer, PaperSerializer, StudentPaperSerializer, StudentCompletedPaperSerializer
from .models import Student, StudentPaper
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


class StudentProfile(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, username):
        student = Student.objects.filter(username=username)[0]
        serializer = StudentSerializer(student)
        return Response(serializer.data)


#get and save papers at registration
class StudentPapers(APIView):
    permission_classes = (permissions.AllowAny,)
    #read available papers for students
    def get(self, request, subjects, exams):
        papers = Paper.objects.filter(subject=subjects).filter(exams=exams)
        print(papers)
        serializers = PaperSerializer(papers, many=True)
        print(serializers.data)
        # serializers.is_valid()
        return Response(serializers.data)

    #create available papers for students
    def post(self, request):
        print(request.data)
        serializer = StudentPaperSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            # print(serializer.data)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response('Error with saving student papers.')

    #submit paper
    def put(self, request, username, paper_id):
        student_papers = StudentPaper.objects.filter(username=username)
        paper = student_papers.get(paper_id=paper_id)
        # serializers = StudentPaperSerializer(paper, many=True)
        # serializers.data[0]['completed'] = True
        # serializers.data[0]['completed'] = request.POST.get('results')
        print(paper)
        paper.completed = True
        # print(request.data['results'])
        paper.results = request.data['results']
        paper.save()
        # print(serializers.data[0]['completed'])
        # print(serializers.data.completed)
        # print(serializers.data.results)
        return Response("Submitted!")


#for login
class RelevantPapers(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, username):
        papers = StudentPaper.objects.filter(username=username)
        print(papers)
        serializers = StudentPaperSerializer(papers, many=True)
        print(serializers.data)
        # serializers.is_valid()
        return Response(serializers.data)



#for review
class ReviewPapers(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print(request.data)
        serializer = StudentCompletedPaperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response('Error with saving student work.')
