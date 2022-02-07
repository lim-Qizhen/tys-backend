from django.urls import path
from . import views

urlpatterns = [
    # path('all/', views.AllQuestions.as_view()),
    path('all/', views.StudentPapers.as_view())
]
