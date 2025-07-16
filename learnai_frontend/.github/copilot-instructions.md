# Copilot Instructions for LearnAI Frontend

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js frontend application for a personalized learning platform that integrates with a Django REST API backend. The platform provides AI-powered feedback on student submissions, interactive quizzes, and progress tracking.

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios for API calls
- **State Management**: React hooks and context

## Code Style Guidelines
- Use functional components with hooks
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with consistent design system
- Implement responsive design (mobile-first approach)
- Use semantic HTML elements
- Follow accessibility best practices

## File Organization
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable UI components
- `/src/components/ui/` - Base UI components (buttons, cards, etc.)
- `/src/lib/` - Utility functions and API calls
- `/src/styles/` - Global styles and Tailwind configurations

## API Integration
- Backend API base URL: `http://localhost:8000/api/`
- All API calls should handle errors gracefully
- Use proper loading states and user feedback
- Implement proper authentication handling

## Key Features to Implement
1. User dashboard with statistics and progress tracking
2. Submission forms for essays and code
3. AI feedback display with suggestions and scores
4. Interactive quiz system with multiple choice questions
5. User profile management
6. Responsive navigation with mobile menu
7. Modern animations and transitions

## Component Patterns
- Use composition over inheritance
- Implement proper prop validation
- Use custom hooks for shared logic
- Follow the single responsibility principle
- Implement proper error boundaries
