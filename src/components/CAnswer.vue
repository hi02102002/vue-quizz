<script setup lang="ts">
import { useAnswersStore } from '@/stores/answers';
import { NButton, type ButtonProps } from 'naive-ui';
import { computed } from 'vue';
const props = defineProps<{
  answer: string
  index: number
  questionId: string
  correctAnswer: string
}>()
const answersStore = useAnswersStore()

const isSubmitted = computed(() => answersStore.isSubmitted)

const isTrue =
  computed(() =>
    answersStore.isAnswerTrue({ answer: props.answer, questionId: props.questionId })
  ) || props.correctAnswer === props.answer

const isChose = computed(() => answersStore.isAnswerChose(props.answer, props.questionId))

const type = computed((): ButtonProps['type'] => {
  if (isChose.value) {
    if (isTrue.value) {
      return 'primary'
    }
    if (isSubmitted.value && !isTrue.value) {
      return 'error'
    }
    return 'primary'
  } else {
    if (props.correctAnswer === props.answer && isSubmitted.value) {
      return 'info'
    }
    return 'default'
  }
})
</script>
<template>
  <n-button
    :ghost="!isSubmitted"
    :type="type"
    :disabled="!!isSubmitted"
    @click="
      () => answersStore.handelChooseAnswer({ answer: props.answer, questionId: props.questionId })
    "
  >
    {{ props.answer }}
  </n-button>
</template>

<style scoped></style>
