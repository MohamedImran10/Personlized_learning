# 📄 api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SubmissionViewSet, FeedbackViewSet, QuizViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'feedbacks', FeedbackViewSet)
router.register(r'quizzes', QuizViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
