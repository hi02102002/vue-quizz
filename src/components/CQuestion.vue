<script setup lang="ts">
import type { Question } from '@/types'
import { NH4, NSpace } from 'naive-ui'
import CAnswer from './CAnswer.vue'

const props = defineProps<{
  question: Question
  index: number
}>()
</script>

<template>
  <div>
    <n-h4>Question {{ props.index + 1 }}: {{ props.question.question }}</n-h4>
    <n-space>
      <c-answer
        class="answer"
        :correct-answer="question.correctAnswer"
        :question-id="question.id"
        :index="index"
        :answer="answer"
        v-for="(answer, index) in props.question.answers"
        :key="answer"
      />
    </n-space>
  </div>
</template>

<style scoped>
.answer {
  min-height: 34px;
  height: unset;
  white-space: pre-wrap;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
