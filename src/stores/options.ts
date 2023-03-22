import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
export const useOptionsStore = defineStore('options', () => {
  const categories = ref<string[]>(JSON.parse(localStorage.getItem('categories') as string) || [])
  const tags = ref<string[]>(JSON.parse(localStorage.getItem('tags') as string) || [])
  const difficulty = ref<'medium' | 'easy' | 'hard'>(
    localStorage.getItem('difficulty')
      ? JSON.parse(localStorage.getItem('difficulty') || 'easy')
      : 'easy'
  )
  const limit = ref<number>((JSON.parse(localStorage.getItem('limit') as string) as number) || 10)

  const handelChooseCategory = (category: string) => {
    if (isCategoryChose(category)) {
      categories.value = categories.value.filter((c) => c !== category)
    } else {
      categories.value = categories.value.concat(category)
    }
  }

  const isCategoryChose = (category: string) => {
    return categories.value.some((c) => c === category)
  }

  const handelUpdateTags = (value: string[]) => {
    tags.value = value
  }

  const handelChoseDifficulty = (type: 'medium' | 'easy' | 'hard') => {
    difficulty.value = type
  }

  const isChoseDifficulty = (type: 'medium' | 'easy' | 'hard') => {
    return difficulty.value === type
  }

  const handelUpdateLimit = (l: number) => {
    limit.value = l
  }

  watch(categories, (categoriesVal) => {
    localStorage.setItem('categories', JSON.stringify(categoriesVal))
  })

  watch(tags, (tagsVal) => {
    localStorage.setItem('tags', JSON.stringify(tagsVal))
  })

  watch(difficulty, (difficultyVal) => {
    localStorage.setItem('difficulty', JSON.stringify(difficultyVal))
  })

  watch(limit, (limitVal) => {
    localStorage.setItem('limit', JSON.stringify(limitVal))
  })

  const tagsComputed = computed(() => tags)

  const categoriesComputed = computed(() => categories)

  const difficultyComputed = computed(() => difficulty)

  const limitComputed = computed(() => limit)

  return {
    categories: categoriesComputed,
    tags: tagsComputed,
    difficulty: difficultyComputed,
    limit: limitComputed,
    isCategoryChose,
    handelChooseCategory,
    handelUpdateTags,
    handelChoseDifficulty,
    isChoseDifficulty,
    handelUpdateLimit
  }
})
