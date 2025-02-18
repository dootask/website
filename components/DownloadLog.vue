<template>
  <article class="update">
    <div class="update-con">
      <div class="update-layout">
        <div class="update-l">
          <h1 class="txt-4003645 update-h1 mb-36">
            {{ $t('download.log.title') }}
          </h1>
          <ul class="update-ul">
            <li id="releases">
              <template v-if="loading">
                <li v-for="index in 5" :key="index" class="loading-item">
                  <div class="skeleton-text"></div>
                </li>
              </template>
              <template
                v-for="(release, index) in releases"
                v-else
                :key="index"
              >
                <li class="update-item" @click="handleReleaseClick(index)">
                  <h5 class="txt-4001624 update-h5">
                    DooTask {{ release.version }} {{ $t('download.log.new') }}
                  </h5>
                </li>
              </template>
            </li>
            <li v-show="!loading">
              <a class="more-item" @click="navigateTo('/log')">
                <h5 class="txt-4001624 more">{{ $t('download.log.more') }}</h5>
                <img class="icon" src="/img/dow_arrow.svg" :alt="$t('download.log.more')" />
              </a>
            </li>
          </ul>
        </div>
        <div class="update-r">
          <ClientDynamicImage
            id="dow_pic1"
            class="update-r-svg"
            :src="`/img/${theme}/${lang}_dow_pic1.png`"
            :default-src="`/img/light/zh_dow_pic1.png`"
            :alt="$t('download.alttips')"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue';
import axios from 'axios';
import { navigateTo } from '#app';

const themeStore = useThemeStore();

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const { theme, lang } = toRefs(themeStore);

interface ReleaseVersion {
  version: string;
  link: string;
}

const releases = ref<ReleaseVersion[]>([]);
const loading = ref(false);

const getLocalStorageItem = (key: string) => {
  const index = localStorage.getItem(key);
  if (!index) return null;
  const record = JSON.parse(index);
  if (!record) return null;
  if (new Date().getTime() > record.expired) {
    localStorage.removeItem(key);
    return null;
  }
  return record.value;
};

const handleReleaseClick = (index: number) => {
  // 直接使用下标跳转到日志页面
  localStorage.setItem('update_log_num', (index + 1).toString());
  navigateTo('/log');
};

const fetchReleases = async () => {
  // loading.value = true;
  try {
    const url = `${siteUrl}/api/system/get/updatelog`;
    const response = await axios.get(url);
    const changelog = response.data.data.updateLog;
    const regex = /## \[(.*?)\]\n([\s\S]*?)(?=\n\n## \[|$)/g;

    let match;
    const versions = [];
    while ((match = regex.exec(changelog)) !== null) {
      versions.push(match[1]);
    }

    releases.value = versions.slice(0, 5).map((version) => ({
      version,
      link: '/zh/log',
    }));

    const record = {
      value: releases.value,
      expired: new Date().getTime() + 30 * 60 * 1000,
    };
    localStorage.setItem('logs_dowmload_zh', JSON.stringify(record));
    loading.value = false;
  } catch (error) {
    console.error('Failed to fetch releases:', error);
  }
};

// 初始化并监听主题变化
onMounted(() => {
  const cachedReleases = getLocalStorageItem('logs_dowmload_zh');

  if (cachedReleases) {
    loading.value = true;

    releases.value = cachedReleases;
    loading.value = false;
  } else {
    fetchReleases();
  }
});
</script>

<style scoped>
.loading-item {
  background: #f0f0f0;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skeleton-text {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  padding: 16px 0;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
