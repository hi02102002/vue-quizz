<script setup lang="ts">
import { lightTheme, NBackTop, NConfigProvider, NMessageProvider, type GlobalTheme } from 'naive-ui'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const theme = ref<GlobalTheme>(lightTheme)
</script>

<template>
  <n-config-provider
    :theme-overrides="{
      common: {
        primaryColor: '#41b883'
      }
    }"
    :theme="theme"
  >
    <n-message-provider>
      <router-view />
      <n-back-top />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
