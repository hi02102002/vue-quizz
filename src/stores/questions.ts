import { API_URL } from '@/constants'
import type { Question } from '@/types'
import shuffleArray from '@/utils/shuffleArray'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useOptionsStore } from './options'
export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<Question[]>([])
  const optionsStore = useOptionsStore()

  const handelFetchQuestions = async () => {
    const res: Question[] = await axios
      .get(`${API_URL}/questions`, {
        params: {
          categories:
            optionsStore.categories.value.length > 0
              ? optionsStore.categories.value.join(',')
              : undefined,
          difficulty: optionsStore.difficulty.value,
          tags: optionsStore.tags.value.length > 0 ? optionsStore.tags.value.join(',') : undefined,
          limit: optionsStore.limit.value
        }
      })
      .then((v) => v.data)
    questions.value = res
  }

  const questionsComputed = computed(() => {
    return questions.value.map((question) => {
      return {
        ...question,
        answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer])
      }
    })
  })

  return {
    handelFetchQuestions,
    questions: questionsComputed
  }
})
