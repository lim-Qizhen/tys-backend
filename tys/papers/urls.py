from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.StudentPapers.as_view()),
    path('<str:paper_id>/', views.GenerateQuestions.as_view()),
]
