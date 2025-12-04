<template>
  <div class="app-store-section">
    <h2 class="app-store-title">{{ $t('appstore.development.title') }}</h2>
    <ClientOnly>
    <div class="space-y-12">
      <!-- 目录结构与配置文件（横向分栏） -->
      <div class="dev-directory-layout">
        <div class="dev-directory-info">
          <div class="dev-directory-icon"><i class="i-heroicons-folder-open"></i></div>
          <div class="dev-directory-title">{{ $t('appstore.development.structure.title') }}</div>
          <ul>
            <li v-for="(item, index) in structureList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="dev-directory-block">
          <pre><code>{{ structure }}</code></pre>
        </div>
      </div>
      <!-- 三栏横向卡片区块 -->
      <div class="dev-section-row">
        <!-- 开发建议 -->
        <div class="dev-section-card">
          <div class="dev-section-title">{{ $t('appstore.development.suggest.title') }}</div>
          <ul>
            <li v-for="(item, index) in suggestList" :key="index">{{ item }}</li>
          </ul>
          <div class="dev-section-card-footer"></div>
        </div>
        <!-- 打包与发布流程 -->
        <div class="dev-section-card">
          <div class="dev-section-title">{{ $t('appstore.development.build.title') }}</div>
          <ul>
            <li v-for="(item, index) in buildList" :key="index">{{ item }}</li>
          </ul>
          <div class="dev-section-card-footer"></div>
        </div>
        <!-- 支持与社区 -->
        <div class="dev-section-card">
          <div class="dev-section-title">{{ $t('appstore.development.support.title') }}</div>
          <ul>
            <li v-for="(item, index) in supportList" :key="index">{{ item }}</li>
          </ul>
          <div class="dev-section-card-footer"></div>
        </div>
      </div>
    </div>
  </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const structure = `├── AppDirectory
    ├── 1.0.0
        ├── config.yml
        ├── docker-compose.yml
        └── nginx.conf
    ├── config.yml
    ├── logo.png
    └── README.md`;

const structureList = computed(() => [
  t('appstore.development.structure.li01'),
  t('appstore.development.structure.li02'),
  t('appstore.development.structure.li03'),
  t('appstore.development.structure.li04')
]);

const suggestList = computed(() => [
  t('appstore.development.suggest.li01'),
  t('appstore.development.suggest.li02') + '@' + t('appstore.development.suggest.li002'),
  t('appstore.development.suggest.li03'),
  t('appstore.development.suggest.li04'),
  t('appstore.development.suggest.li05'),
  t('appstore.development.suggest.li06')
]);

const buildList = computed(() => [
  t('appstore.development.build.li01'),
  t('appstore.development.build.li02'),
  t('appstore.development.build.li03'),
  t('appstore.development.build.li04'),
  t('appstore.development.build.li05'),
  t('appstore.development.build.li06')
]);

const supportList = computed(() => [
  t('appstore.development.support.li01'),
  t('appstore.development.support.li02'),
  t('appstore.development.support.li03'),
  t('appstore.development.support.li04'),
  t('appstore.development.support.li05'),
  t('appstore.development.support.li06')
]);
</script> 