import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('@/views/HomeView.vue')
    },
    {
      path: '/questions',
      component: import('@/views/QuestionView.vue')
    }
  ]
})

export default router
