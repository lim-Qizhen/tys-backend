from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.TutorCreate.as_view()),
    path('login/', views.TutorLogin.as_view()),
]
