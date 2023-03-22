<script setup lang="ts">
import { NBackTop, NConfigProvider, NMessageProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider
    :theme-overrides="{
      common: {
        primaryColor: '#41b883'
      }
    }"
    :theme="themeStore.theme.value"
  >
    <n-message-provider>
      <router-view />
      <n-back-top />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
