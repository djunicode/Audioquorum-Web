import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/quizzes'>Quizzes</Link>
      <Link to='/quiz/1'>Quiz</Link>
      <Link to='/annual-report'>AnnualReport</Link>
      <Link to='/add-quiz'>AddQuiz</Link>
      <Link to='/add-questions'>AddQuestions</Link>
    </div>
  )
}
