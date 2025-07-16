# 📄 api/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Submission, Feedback, Quiz, QuizQuestion
from .serializers import UserSerializer, SubmissionSerializer, FeedbackSerializer, QuizSerializer, QuizQuestionSerializer
import requests

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    @action(detail=True, methods=['post'])
    def generate_feedback(self, request, pk=None):
        submission = self.get_object()

        # Example AI feedback generation (replace with Hugging Face or Ollama as needed)
        analysis = f"AI analysis of: {submission.content[:100]}..."

        feedback = Feedback.objects.create(
            submission=submission,
            content=analysis,
            score=85,
            suggestions=["Add more examples", "Consider expanding on the key points"],
            strengths=["Good clarity", "Well-structured"],
        )

        submission.status = 'reviewed'
        submission.score = feedback.score
        submission.save()

        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @action(detail=False, methods=['post'])
    def generate(self, request):
        user_id = request.data.get("user_id")
        topic = request.data.get("topic")
        user = User.objects.get(pk=user_id)

        quiz = Quiz.objects.create(
            user=user,
            title=f"{topic} Quiz",
            topic=topic
        )

        questions = [
            {
                "question": f"What is a key concept in {topic}?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": 2,
                "explanation": f"This is an explanation about {topic}."
            },
            {
                "question": f"Why is {topic} important?",
                "options": ["Option E", "Option F", "Option G", "Option H"],
                "correct_answer": 1,
                "explanation": f"This explains why {topic} is important."
            }
        ]

        for q in questions:
            QuizQuestion.objects.create(
                quiz=quiz,
                question=q["question"],
                options=q["options"],
                correct_answer=q["correct_answer"],
                explanation=q["explanation"]
            )

        serializer = QuizSerializer(quiz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
