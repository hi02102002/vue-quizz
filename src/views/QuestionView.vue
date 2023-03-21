<template>
  <n-layout>
    <n-layout-header class="header">
      <NH3 class="title">Questions</NH3>
    </n-layout-header>
    <n-layout-content class="layout-content">
      <n-space class="loading-spin" v-if="isLoading" :align="'center'" :justify="'center'">
        <n-spin />
      </n-space>
      <n-empty
        description="You can't find anything"
        v-if="questionsStore.questions.length === 0 && !isLoading"
        :align="'center'"
        :justify="'center'"
      >
      </n-empty>
      <n-space v-if="!isLoading" vertical :size="[18, 18]">
        <n-space vertical :size="[18, 18]">
          <c-question
            v-for="(question, index) in questionsStore.questions"
            :key="question.id"
            :index="index"
            :question="question"
          />
        </n-space>
        <n-space vertical :size="[18, 18]">
          <n-space v-if="isSubmitted" :justify="'center'" :align="'center'">
            <n-text>Your scored  {{ answersStore.numCorrect }} / {{ questionsStore.questions.length }} correct answer.</n-text>
          </n-space>
            <n-space :justify="'center'" :align="'center'">
              <n-button :type="'primary'" @click="() => router.push('/')" tertiary
                >Back to home</n-button
              >
              <n-button
                @click="answersStore.handelSubmit"
                v-if="questionsStore.questions.length > 0 && !isSubmitted"
                :type="'success'"
                >Submit your answers</n-button
              >
              <n-button v-if="isSubmitted" @click="handelPlayAgain" :type="'success'"
                >Play again</n-button
              >
            
          </n-space>
         </n-space>
      </n-space>
    
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import CQuestion from '@/components/CQuestion.vue'
import { useAnswersStore } from '@/stores/answers'
import { useQuestionsStore } from '@/stores/questions'
import {
NButton,
NEmpty,
NH3,
NLayout,
NLayoutContent,
NLayoutHeader,
NSpace,
NSpin,
NText
} from 'naive-ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const questionsStore = useQuestionsStore()
const answersStore = useAnswersStore()
const isLoading = ref(false)

const isSubmitted = computed(() => answersStore.isSubmitted)

const handelPlayAgain = () => {
  answersStore.handelPlayAgain()
  handelFetch()
}

const handelFetch = async () => {
  isLoading.value = true
  questionsStore
    .handelFetchQuestions()
    .then(() => {
      isLoading.value = false
    })
    .catch((e) => {
      console.log(e)
      isLoading.value = false
    })
}

onMounted(handelFetch)

onUnmounted(handelPlayAgain)
</script>

<style scoped>
.header {
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
}
.title {
  margin: 0;
  font-weight: 700;
  font-size: 1.75rem;
  color: var(--n-bar-color);
}

.layout-content {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
  min-height: calc(100vh - 3.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spin {
  overflow: hidden;
}
</style>
