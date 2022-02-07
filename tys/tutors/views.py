from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TutorSerializer, TokenSerializer
from .models import Tutor
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class TutorCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = TutorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        else:
            return Response('Error with creating tutor account.')

class TutorLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = Tutor.objects.filter(username= username).first()

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

class getUser(APIView):
    def get(self, request):
        pass
