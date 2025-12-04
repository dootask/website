<template>
  <div>
    <div class="scenario-app-layout">
      <h3 class="txt-5004455 app-h1 mb-16">
        {{ $t('ai.multi.title') }}
      </h3>
      <h6 class="txt-4001830 app-h6">
        {{ $t('ai.multi.desc') }}
      </h6>
      <div class="multi-box">
        <div class="feature-card" v-for="(item, index) in features" :key="index">
          <div class="card-icon">
            <ClientDynamicImage 
              :src="item.svg" 
              :default-src="`/img/light/ai_icon${index + 8}.svg`"
              :alt="item.title" 
              />
          </div>
          <div class="card-text">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, computed} from "vue";

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const features = computed(() => [
  {
    svg: `/img/${theme.value}/ai_icon8.svg`,
    title: t('ai.multi.card.title01'),
    desc: t('ai.multi.card.desc01'),
  },
  {
    svg: `/img/${theme.value}/ai_icon9.svg`,
    title: t('ai.multi.card.title02'),
    desc: t('ai.multi.card.desc02'),
  },
  {
    svg: `/img/${theme.value}/ai_icon10.svg`,
    title:t('ai.multi.card.title03'),
    desc: t('ai.multi.card.desc03'),
  }
]);
</script>
