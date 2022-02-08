from django.urls import path
from . import views

urlpatterns = [
    path('<str:paper_id>/', views.GenerateQuestions.as_view()),
]
