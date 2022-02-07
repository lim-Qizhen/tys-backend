from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PaperSerializer
from .models import Paper
from rest_framework import permissions

# Create your views here.
class AllQuestions(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        papers = Paper.objects.all()
        serializer = PaperSerializer(papers, many=True)

        return Response(serializer.data)

class StudentPapers(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        # subjects = request.data['subjects']
        # exams = request.data['exams']
        #
        # papers = Paper.objects.filter(subject=subjects).filter(exams=exams)
        papers = Paper.objects.all()
        print(papers)
        serializers = PaperSerializer(papers, many=True)
        return Response(serializers.data)
