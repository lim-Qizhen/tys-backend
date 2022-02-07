from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TrialSerializer
from .models import Trial

# Create your views here.
class Trial(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        trial = Trial.objects.all()
        serializer = TrialSerializer(trial, many=True)

        return Response(serializer.data)
