import { darkTheme, lightTheme, type GlobalTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useThemeStore = defineStore('theme', () => {
  const theme = ref<GlobalTheme>(localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme)

  const themeComputed = computed(() => theme)

  const handelToggleTheme = () => {
    if (theme.value.name === 'dark') {
      theme.value = lightTheme
    } else {
      theme.value = darkTheme
    }

    localStorage.setItem('theme', theme.value.name)
  }

  return {
    theme: themeComputed,
    handelToggleTheme
  }
})
