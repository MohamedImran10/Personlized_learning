"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Upload, 
  MessageSquare, 
  Brain, 
  BarChart3, 
  Menu, 
  X, 
  FileText, 
  Code, 
  Trophy, 
  Clock, 
  Star,
  ChevronRight,
  Plus,
  CheckCircle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const LearningPlatform = () => {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '/api/placeholder/40/40',
    level: 5,
    xp: 2450,
    streak: 12
  })

  const [submissions, setSubmissions] = useState([
    {
      id: '1',
      title: 'React Hooks Essay',
      type: 'essay',
      content: 'React Hooks have revolutionized...',
      createdAt: '2024-01-15',
      status: 'completed',
      score: 85
    },
    {
      id: '2',
      title: 'Binary Search Implementation',
      type: 'code',
      content: 'function binarySearch(arr, target) {...}',
      createdAt: '2024-01-14',
      status: 'reviewed',
      score: 92
    }
  ])

  const [feedbacks, setFeedbacks] = useState([
    {
      id: '1',
      submissionId: '1',
      content: 'Great understanding of React Hooks concepts. Your explanation is clear and well-structured.',
      score: 85,
      suggestions: ['Add more examples', 'Include performance considerations'],
      strengths: ['Clear explanations', 'Good structure', 'Practical examples'],
      createdAt: '2024-01-15'
    }
  ])

  const [quizzes, setQuizzes] = useState([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      topic: 'JavaScript',
      questions: [
        {
          id: '1',
          question: 'What is closure in JavaScript?',
          options: [
            'A function inside another function',
            'A way to close the browser',
            'A function that has access to outer scope',
            'A type of loop'
          ],
          correctAnswer: 2,
          explanation: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.'
        }
      ],
      score: 90,
      completedAt: '2024-01-15'
    }
  ])

  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    type: 'essay',
    content: ''
  })

  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizResults, setQuizResults] = useState([])

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'submit', label: 'Submit', icon: Upload },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  const handleSubmission = () => {
    const newSubmission = {
      id: Date.now().toString(),
      title: submissionForm.title,
      type: submissionForm.type,
      content: submissionForm.content,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    setSubmissions([newSubmission, ...submissions])
    setSubmissionForm({ title: '', type: 'essay', content: '' })
    
    // Simulate AI feedback generation
    setTimeout(() => {
      const feedback = {
        id: Date.now().toString(),
        submissionId: newSubmission.id,
        content: 'AI analysis complete. Your submission shows good understanding of the topic.',
        score: Math.floor(Math.random() * 30) + 70,
        suggestions: ['Consider adding more examples', 'Expand on key concepts'],
        strengths: ['Clear writing', 'Good structure'],
        createdAt: new Date().toISOString().split('T')[0]
      }
      setFeedbacks([feedback, ...feedbacks])
      setSubmissions(prev => prev.map(s => 
        s.id === newSubmission.id 
          ? { ...s, status: 'reviewed', score: feedback.score }
          : s
      ))
    }, 2000)
  }

  const startQuiz = (topic) => {
    const newQuiz = {
      id: Date.now().toString(),
      title: `${topic} Quiz`,
      topic,
      questions: [
        {
          id: '1',
          question: `What is a key concept in ${topic}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: 'This is the explanation for the correct answer.'
        },
        {
          id: '2',
          question: `Which best describes ${topic}?`,
          options: ['Description A', 'Description B', 'Description C', 'Description D'],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: 'This explains why this answer is correct.'
        }
      ]
    }
    setCurrentQuiz(newQuiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setQuizResults([])
  }

  const submitQuizAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return
    
    const newResults = [...quizResults, selectedAnswer]
    setQuizResults(newResults)
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      const correctAnswers = newResults.filter((answer, index) => 
        answer === currentQuiz.questions[index].correctAnswer
      ).length
      const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100)
      
      const completedQuiz = {
        ...currentQuiz,
        score,
        completedAt: new Date().toISOString().split('T')[0]
      }
      
      setQuizzes([completedQuiz, ...quizzes])
      setCurrentQuiz(null)
    }
  }

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total XP</p>
                <p className="text-3xl font-bold">{user.xp}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Streak</p>
                <p className="text-3xl font-bold">{user.streak} days</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Level</p>
                <p className="text-3xl font-bold">{user.level}</p>
              </div>
              <Target className="h-8 w-8 text-yellow-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.slice(0, 3).map((submission) => (
                <motion.div
                  key={submission.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {submission.type === 'essay' ? (
                      <FileText className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Code className="h-4 w-4 text-green-500" />
                    )}
                    <div>
                      <p className="font-medium">{submission.title}</p>
                      <p className="text-sm text-muted-foreground">{submission.createdAt}</p>
                    </div>
                  </div>
                  <Badge variant={submission.status === 'completed' ? 'default' : 'secondary'}>
                    {submission.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setCurrentPage('submit')}
                className="h-20 flex-col gap-2"
                variant="outline"
              >
                <Upload className="h-6 w-6" />
                Submit Work
              </Button>
              <Button
                onClick={() => startQuiz('JavaScript')}
                className="h-20 flex-col gap-2"
                variant="outline"
              >
                <Brain className="h-6 w-6" />
                Take Quiz
              </Button>
              <Button
                onClick={() => setCurrentPage('feedback')}
                className="h-20 flex-col gap-2"
                variant="outline"
              >
                <MessageSquare className="h-6 w-6" />
                View Feedback
              </Button>
              <Button
                onClick={() => setCurrentPage('profile')}
                className="h-20 flex-col gap-2"
                variant="outline"
              >
                <User className="h-6 w-6" />
                Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LearnAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => setCurrentPage(item.id)}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setIsMenuOpen(false)
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentPage === 'dashboard' && renderDashboard()}
          {/* Other pages will be added in next steps */}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default LearningPlatform
