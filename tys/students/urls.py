from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.StudentCreate.as_view()),
    path('login/', views.StudentLogin.as_view()),
    path('profile/<str:username>/', views.StudentProfile.as_view()),
    path('papers/<str:subjects>/<str:exams>/', views.StudentPapers.as_view()),
    path('papers/', views.StudentPapers.as_view()),
]
