from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('new/', views.StudentCreate.as_view()),
    # path('login/', views.StudentLogin.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('papers/review/', views.ReviewPapers.as_view()),
    path('review_papers/<str:username>/<str:paper_id>/', views.ReviewPapers.as_view()),
    path('profile/<str:username>/', views.StudentProfile.as_view()),
    path('login_papers/<str:username>/', views.RelevantPapers.as_view()),
    path('papers/<str:subjects>/<str:exams>/', views.StudentPapers.as_view()),
    path('papers/', views.StudentPapers.as_view()),
    path('papers/submit/<str:username>/<str:paper_id>/', views.StudentPapers.as_view()),
    path('paper/score/<str:username>/<str:paper_id>/', views.StudentScore.as_view()),
]
