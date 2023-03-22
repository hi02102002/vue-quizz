import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useQuestionsStore } from './questions'
export const useAnswersStore = defineStore('answers', () => {
  const answers = ref<
    Array<{
      questionId: string
      answer: string
    }>
  >([]) // contain list answer

  const results = ref<
    Array<{
      questionId: string
      answer: string
      isTrue: boolean
    }>
  >([])

  const isSubmitted = ref(false)

  const questionsStore = useQuestionsStore()

  const handelChooseAnswer = (answer: { questionId: string; answer: string }) => {
    if (isHaveQuestion(answer.questionId)) {
      if (isAnswerChose(answer.answer, answer.questionId)) {
        answers.value = answers.value.filter((a) => a.answer !== answer.answer)
      } else {
        answers.value = answers.value.map((a) => {
          if (a.questionId === answer.questionId) {
            return {
              ...a,
              ...answer
            }
          }
          return a
        })
      }
    } else {
      answers.value = answers.value.concat(answer)
    }
  }

  const isHaveQuestion = (questionId: string) => {
    return answers.value.some((a) => {
      return questionId === a.questionId
    })
  }

  const isAnswerChose = (answer: string, questionId: string) => {
    return answers.value.some((a) => {
      if (a.answer === answer && questionId === a.questionId) {
        return true
      }
      return false
    })
  }

  const isAnswerTrue = (answer: { questionId: string; answer: string }) => {
    return questionsStore.questions.some(
      (q) => q.id === answer.questionId && q.correctAnswer === answer.answer
    )
  }

  const answersComputed = computed(() => answers)

  const resultsComputed = computed(() => results)

  const numCorrect = computed(() => results.value.filter((r) => r.isTrue).length)

  const numIncorrect = computed(() => results.value.filter((r) => !r.isTrue).length)

  const handelSubmit = () => {
    results.value = answers.value.map((a) => {
      return {
        answer: a.answer,
        questionId: a.questionId,
        isTrue: isAnswerTrue(a)
      }
    })
    isSubmitted.value = true
  }

  const handelPlayAgain = () => {
    results.value = []
    isSubmitted.value = false
  }

  return {
    answers: answersComputed,
    isAnswerChose,
    handelChooseAnswer,
    isAnswerTrue,
    handelSubmit,
    results: resultsComputed,
    numCorrect,
    numIncorrect,
    handelPlayAgain,
    isSubmitted
  }
})
