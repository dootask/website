<template>
  <div class="app-store-section">
    <div class="install-padding">
    <h2 class="app-store-title">{{ $t('appstore.installation.title') }}</h2>
    <div class="app-store-install-list">
      <div v-for="(method, idx) in methods" :key="idx" class="app-store-install-card">
        <div class="install-icon-bar">
          <i :class="method.icon"></i>
        </div>
        <div class="install-content">
          <div class="install-title">{{ method.title }}</div>
          <div class="install-desc">{{ method.desc }}</div>
          <ul class="install-steps">
            <li v-for="(step, sidx) in method.steps" :key="sidx">{{ step }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {  computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const methods  = computed(() => [
  {
    icon: 'i-heroicons-computer-desktop',
    title: t('appstore.installation.localins.title'),
    desc: t('appstore.installation.localins.desc'),
    steps: [
      t('appstore.installation.localins.li01'),
      t('appstore.installation.localins.li02'),
      t('appstore.installation.localins.li03'),
    ]
  },
  {
    icon: 'i-heroicons-link',
    title: t('appstore.installation.urlins.title'),
    desc: t('appstore.installation.urlins.desc'),
    steps: [
      t('appstore.installation.urlins.li01'),
      t('appstore.installation.urlins.li02'),
      t('appstore.installation.urlins.li03'),
      t('appstore.installation.urlins.li04'),
    ]
  },
  {
    icon: 'i-heroicons-code-bracket',
    title: t('appstore.installation.gitins.title'),
    desc: t('appstore.installation.gitins.desc'),
    steps: [
      t('appstore.installation.gitins.li01'),
      t('appstore.installation.gitins.li02'),
      t('appstore.installation.gitins.li03'),
      t('appstore.installation.gitins.li04'),
    ]
  }
]);
</script>
