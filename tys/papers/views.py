from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PaperSerializer, QuestionSerializer
from .models import Paper, Question
from rest_framework import permissions

# Create your views here.
#for students exam page
class GenerateQuestions(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, paper_id):
        papers = Question.objects.filter(paper_id=paper_id).order_by('question_number')
        serializers = QuestionSerializer(papers, many=True)
        # serializers.is_valid()
        return Response(serializers.data)
