import React from 'react'
import { useParams } from 'react-router-dom'

export const Quiz = () => {
  const { quizId } = useParams()
  return (
    <div>Quiz {quizId}</div>
  )
}
