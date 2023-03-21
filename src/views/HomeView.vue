<template>
  <n-layout class="home-page">
    <n-layout-header class="header" :position="'absolute'">
      <router-link :to="'/'">
        <n-space :align="'end'" :justify="'center'" :wrapItem="false" :size="[2, 2]">
          <logo-icon :height="36" :width="36" />
          <n-text class="logo-text"> ue Quizz </n-text>
        </n-space>
      </router-link>
    </n-layout-header>
    <n-layout-content class="home-page-content">
      <n-space :vertical="true" :size="[16, 16]">
        <n-alert :type="'info'" class="">
          <n-text> Select your options to create quizz </n-text>
        </n-alert>
        <n-space vertical :size="[0, 0]">
          <NH4>
            <n-text>Difficulty</n-text>
          </NH4>
          <n-space :size="[8, 8]">
            <div
              @click="() => handelChoseDifficulty(d)"
              v-for="(d, index) in DIFFICULTIES"
              :key="index"
            >
              <n-tag
                class="tag-choose"
                :color="
                  isChoseDifficulty(d)
                    ? {
                        borderColor: '#41b883',
                        textColor: '#41b883',
                        color: '#fff'
                      }
                    : undefined
                "
              >
                {{ d.toLocaleUpperCase() }}
              </n-tag>
            </div>
          </n-space>
        </n-space>
        <n-space vertical :size="[0, 0]">
          <NH4>
            <n-text>Categories</n-text>
          </NH4>
          <n-space :size="[8, 8]">
            <div
              @click="() => handelChooseCategory(getValueCategory(key))"
              v-for="key in Object.keys(CATEGORIES)"
              :key="getValueCategory(key)"
            >
              <n-tag
                class="tag-choose"
                :color="
                  isCategoryChose(getValueCategory(key))
                    ? {
                        borderColor: '#41b883',
                        textColor: '#41b883',
                        color: '#fff'
                      }
                    : undefined
                "
              >
                {{ key }}
              </n-tag>
            </div>
          </n-space>
        </n-space>
        <n-space vertical :size="[0, 0]">
          <NH4>
            <n-text>Tags</n-text>
          </NH4>
          <n-select
            :value="tags.value"
            :onUpdate:value="handelUpdateTags"
            :options="
              TAGS.map((tag) => ({
                key: tag,
                label: tag,
                value: tag
              }))
            "
            :multiple="true"
            clearable
            :maxTagCount="10"
            :placement="'bottom'"
          />
        </n-space>
        <n-space :align="'center'" :justify="'center'">
          <router-link to="/questions">
            <n-button :type="'primary'">Create your quizz</n-button>
          </router-link>
        </n-space>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue'
import { CATEGORIES, DIFFICULTIES, TAGS } from '@/constants'
import { useOptionsStore } from '@/stores/options'
import {
  NAlert,
  NButton,
  NH4,
  NLayout,
  NLayoutContent,
  NSelect,
  NSpace,
  NTag,
  NText
} from 'naive-ui'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
const {
  handelChooseCategory,
  handelChoseDifficulty,
  handelUpdateTags,
  isCategoryChose,
  isChoseDifficulty,
  ...store
} = useOptionsStore()

const tags = computed(() => store.tags)
const getValueCategory = (category: string) => {
  return category.replace(' & ', '_and_').replace(' ', '_').toLocaleLowerCase()
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 3.75rem;
}

.logo-text {
  font-size: 1.75rem;
  display: inline-block;
  font-weight: 700;
  line-height: 1;
}

.home-page-content {
  min-height: calc(100vh - 3.75rem);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 768px;
  margin: 0 auto;
}

.tag-choose {
  cursor: pointer;
}
</style>
