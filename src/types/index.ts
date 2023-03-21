export type Category = {
  [key: string]: string[]
}

export type Question = {
  category: string
  correctAnswer: string
  difficulty: string
  id: string
  incorrectAnswers: string[]
  question: string
  tags: string[]
  answers: string[]
}
