# 📄 api/models.py
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    avatar = models.URLField(blank=True, null=True)
    level = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=[('essay', 'Essay'), ('code', 'Code')])
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('reviewed', 'Reviewed'), ('completed', 'Completed')], default='pending')
    score = models.IntegerField(blank=True, null=True)

class Feedback(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE, related_name='feedback')
    content = models.TextField()
    score = models.IntegerField()
    suggestions = models.JSONField(default=list)
    strengths = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    score = models.IntegerField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)

class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    options = models.JSONField()
    correct_answer = models.IntegerField()
    explanation = models.TextField()











