<template>
  <ClientOnly>
    <div>
      <!-- 更新日志抽屉 -->
      <div class="logs-drawer" :class="{ 'open-logs-drawer': drawerOpen }">
        <div class="drawer-t mb-36">
          <a :href="`/${locale}`" class="logo">
            <img id="logo" :src="`/img/${theme}/logo.svg`" alt="DooTask,Logo" />
            <i class="dootask txt-7002027">DooTask</i>
          </a>
          <i class="close-drawer" @click="closeLogsDrawer">✕</i>
        </div>
        <h5 class="logs-h5 mb-16" style="font-weight: 500">
          {{ $t('download.log.title') }}
        </h5>
        <ul class="logs-l-ul logs-l-768">
          <li
            v-for="(versionNumber, index) in versionsNumbers"
            :key="index"
            :data-id="`section-${index + 1}`"
            class="l-ul-item"
            @click="
              () => {
                closeLogsDrawer(), handleNavClick(index);
              }
            "
          >
            <a class="txt-4001620 txt"
              >v{{ versionNumber }} {{ t('download.log.new') }}</a
            >
          </li>
        </ul>
      </div>
      <main>
        <section>
          <!-- 主内容区 -->
          <article class="logs">
            <div class="logs-con">
              <div class="logs-t-768" @click="openLogsDrawer">
                <img class="logs-t-prev" src="/img/prev.svg" alt="logs" />
                <i class="logs-t-tit">{{ $t('download.log.title') }}</i>
              </div>
              <div class="logs-layout">
                <div class="logs-l logs-sticky">
                  <h5 class="logs-h5 mb-16" style="font-weight: 500">
                    {{ $t('download.log.title') }}
                  </h5>
                  <ul ref="LogsLULRef" class="logs-l-ul logs-l-1920">
                    <li
                      v-for="(versionNumber, index) in versionsNumbers"
                      :key="index"
                      :data-id="`section-${index + 1}`"
                      class="l-ul-item"
                      :class="{ active: index === activeTabIndex }"
                      @click="handleNavClick(index)"
                    >
                      <a class="txt-4001620 txt log-a"
                        >v{{ versionNumber }} {{ t('download.log.new') }}</a
                      >
                    </li>
                  </ul>
                  <ul class="logs-l-ul logs-l-768"></ul>
                </div>
                <div id="google_translate_element" class="logs-r">
                  <h1 class="txt-6003645 logs-h1 mb-36">
                    {{ $t('download.log.headline') }}
                  </h1>
                  <ul class="logs-r-ul">
                    <li
                      v-for="(updateLog, index) in updateLogs"
                      :key="index"
                      class="r-ul-item mb-36"
                    >
                      <ol class="logs-r-ol">
                        <li
                          :id="`section-${index + 1}`"
                          class="txt-4001624 r-ol-item mb-24"
                        >
                          <h4 class="logs-h4">
                            v{{ updateLog.versionNumber }}
                            {{ t('download.log.new') }}
                          </h4>
                        </li>
                        <div
                          v-for="(
                            htmlText, itemIndex
                          ) in updateLog.updatesHtmlText"
                          :key="itemIndex"
                          style="display: flex"
                        >
                          <i class="dots"></i>
                          <li class="r-ol-item">{{ htmlText }}</li>
                        </div>
                      </ol>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, toRefs } from 'vue';
import axios from 'axios';
import markdownIt from 'markdown-it';
import '@/assets/scss/log.scss';

import { useI18n } from 'vue-i18n';

definePageMeta({
  layoutClass: 'log-page',
});

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const { t, locale } = useI18n();

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);

// ul列表Ref
const LogsLULRef = ref<HTMLElement | null>(null);

// 响应式状态
const logsData = ref([]);
const drawerOpen = ref(false);
const activeTabIndex = ref(0); // 当前高亮的导航项索引

const versionsNumbers = ref<string[]>([]);
const updateLogs = ref<
  Array<{
    versionNumber: string;
    updateText: string;
    updatesHtmlText: string[];
  }>
>([]);

// 打开更新日志抽屉
const openLogsDrawer = () => {
  drawerOpen.value = true;
};

// 关闭更新日志抽屉
const closeLogsDrawer = () => {
  drawerOpen.value = false;
};

// 从 localStorage 获取缓存的数据
const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return;
  const record = JSON.parse(data);
  if (!record) return null;
  if (new Date().getTime() > record.expired) {
    localStorage.removeItem(key);
    return null;
  }
  return record.value;
};

// 将数据存入 localStorage
const setItem = (key: string, value: string) => {
  const record = {
    expired: new Date().getTime() + 30 * 60 * 1000, // 30分钟过期
    value,
  };
  localStorage.setItem(key, JSON.stringify(record));
};

const renderLogs = (html: string) => {
  // const route = useRoute();
  // 解析渲染后的 HTML 结构
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 提取所有 <h2>, <h3>, <ul> 标签
  const h2Tags = Array.from(doc.querySelectorAll('h2')).slice(0, 15); // 只取前 15 个 <h2>
  const ulTags = Array.from(doc.querySelectorAll('ul')).slice(0, 15); // 只取前 15 个 <ul>

  // 合并并按出现的顺序排列这些标签
  const sections: HTMLElement[] = [];
  const maxLength = Math.max(h2Tags.length, ulTags.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < h2Tags.length) sections.push(h2Tags[i]);
    if (i < ulTags.length) sections.push(ulTags[i]);
  }

  // 提取所有 <h2> 标签中的版本号，并限制最多提取前 15 个版本号
  const versions: string[] = html.match(/<h2>(.*?)<\/h2>/g)?.slice(0, 15) || [];
  versionsNumbers.value = versions.map(
    (str) =>
      str
        .replace(/<\/?h2>/g, '')
        .split('[')[1]
        ?.split(']')[0],
  ); // 提取版本号并清理HTML标签

  // 渲染右侧日志条目 通过版本号获取更新内容并渲染
  updateLogs.value = versionsNumbers.value.map((versionNumber) => {
    const updateText = t('download.log.new'); // 这里直接使用翻译字符串
    const updatesHtmlText =
      html
        .split(versionNumber)[1]
        .split('<h2>')[0]
        .match(/<li>(.*?)<\/li>/g)
        ?.map((str) => str.split('<li>')[1].split('</li>')[0]) || [];

    return {
      versionNumber,
      updateText,
      updatesHtmlText,
    };
  });

  // 处理从 DownloadLog 跳转的逻辑
  setTimeout(() => {
    const storedLogIndex = localStorage.getItem('update_log_num');
    if (storedLogIndex) {
      if (storedLogIndex === '-1') {
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const index = parseInt(storedLogIndex, 10) - 1;
        if (index >= 0 && index < versionsNumbers.value.length) {
          // 直接设置活跃版本
          activeTabIndex.value = index;

          // 滚动到对应版本
          scrollToSection(index);
        }
      }
      // 清除存储的索引
      localStorage.removeItem('update_log_num');
    }
  }, 100);
};

// 获取更新日志数据
const fetchLogsData = async () => {
  try {
    const cachedLogs = getItem('changelog');
    if (cachedLogs) {
      logsData.value = cachedLogs;
      renderLogs(cachedLogs);
    } else {
      const url = `${siteUrl}/api/system/get/updatelog`;
      const response = await axios.get(url);
      const markdown = response.data.data.updateLog;
      const html = markdownIt().render(markdown);
      setItem('changelog', html);
      renderLogs(html);
    }
  } catch (error) {
    console.error('Error fetching changelog data:', error);

    // 提供默认日志
    const defaultLogs = `## [1.0.0]
          - 初始版本发布
          - 基础功能上线`;
    const html = markdownIt().render(defaultLogs);
    renderLogs(html);
  }
};

// 获取是否存在广告条
const adjustLogPageHeight = () => {
  nextTick(() => {
    const adBar = document.getElementById('ad');
    const logPage = document.querySelector('.logs') as HTMLElement;

    if (adBar && adBar.style.display !== 'none' && logPage) {
      // 如果广告条存在且可见，向下调整 30px
      if (isMobile.value) {
        logPage.setAttribute('style', 'margin-top: 120px !important;');
      } else {
        logPage.style.marginTop = '150px';
      }
    } else if (logPage) {
      // 如果广告条不存在或不可见，重置高度
      logPage.setAttribute('style', 'margin-top: 90px;');
    }
  });
};

const adjustStickyNavPosition = () => {
  const adBar = document.getElementById('ad');
  const logsStickyEl = document.querySelector('.logs-sticky') as HTMLElement;

  if (!logsStickyEl) return;

  // 延迟检测，确保DOM完全渲染
  nextTick(() => {
    if (adBar) {
      const computedStyle = window.getComputedStyle(adBar);
      const isAdBarVisible =
        computedStyle.display !== 'none' &&
        computedStyle.visibility !== 'hidden';

      if (isAdBarVisible) {
        const adBarHeight = window.innerWidth <= 768 ? 48 : 64;
        logsStickyEl.style.top = `${80 + adBarHeight}px`;
      } else {
        logsStickyEl.style.top = '80px';
      }
    } else {
      // 如果没有找到广告条，保持默认位置
      logsStickyEl.style.top = '80px';
    }
  });
};

//公共滚动方法
const adjustNavBarScroll = (ulElement: HTMLElement, liElement: HTMLElement) => {
  const liTop = liElement.offsetTop;
  const liHeight = liElement.offsetHeight;
  const ulScrollTop = ulElement.scrollTop;
  const ulHeight = ulElement.offsetHeight;

  if (liTop > ulScrollTop + ulHeight) {
    ulElement.scrollTop += liHeight;
  } else if (liTop - ulScrollTop <= 40) {
    ulElement.scrollTop -= liHeight;
  }
};

//统一滚动和高亮逻辑
const scrollToSection = (index: number, smooth = true) => {
  const id = `section-${index + 1}`;
  const content = document.getElementById(id);

  if (content) {
    // const offset = 90; // 上偏移量
    const adBar = document.getElementById('ad');
    const isAdBarVisible = adBar && adBar.style.display !== 'none';

    // 根据广告条是否存在调整额外偏移量
    const additionalOffset = isAdBarVisible ? 150 : 90; // 增加额外的偏移量
    const targetPosition = content.getBoundingClientRect().top + window.scrollY;

    // 滚动到目标位置，并考虑上偏移量
    window.scrollTo({
      top: targetPosition - additionalOffset,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
};

const safelyExecute = <T,>(element: T | null, callback: (el: T) => void) => {
  if (element) {
    callback(element);
  }
};

// 点击左侧导航项时触发
const handleNavClick = (index: number) => {
  activeTabIndex.value = index;
  // 滚动到对应的内容区域
  scrollToSection(index);
  // 处理左侧导航栏滚动
  safelyExecute(LogsLULRef.value, (ulElement) => {
    const liElement = ulElement.children[index] as HTMLElement;
    safelyExecute(liElement, (li) => {
      adjustNavBarScroll(ulElement, li);
    });
  });
};

// 监听滚动，更新导航高亮
const scrollHandler = () => {
  const adBar = document.getElementById('ad');
  const isAdBarVisible = adBar && adBar.style.display !== 'none';

  // 根据广告条是否存在调整额外偏移量
  const additionalOffset = isAdBarVisible ? 150 : 90;

  const sections: HTMLHeadingElement[] = Array.from(
    document.querySelectorAll('.logs-r-ul li h4'), // 获取所有版本号的标题
  );
  const currentScrollPosition = window.scrollY;

  // 遍历所有标题元素
  sections.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY; // 获取当前标题的屏幕位置

    // 当标题进入视口范围时
    if (
      sectionTop <= currentScrollPosition + additionalOffset &&
      sectionTop > currentScrollPosition - additionalOffset
    ) {
      activeTabIndex.value = index;

      safelyExecute(LogsLULRef.value, (ulElement) => {
        const liElement = ulElement.children[index] as HTMLElement;
        safelyExecute(liElement, (li) => {
          adjustNavBarScroll(ulElement, li);
        });
      });
    }
  });
};

// 在页面加载时同步左侧导航栏的位置
const syncLeftNav = () => {
  // 使用 safelyExecute 处理 activeTabIndex 可能为 null 的情况
  safelyExecute(activeTabIndex.value, (index) => {
    safelyExecute(LogsLULRef.value, (ulElement) => {
      if (ulElement.children && ulElement.children.length > index) {
        const liElement = ulElement.children[index] as HTMLElement;

        safelyExecute(liElement, (li) => {
          adjustNavBarScroll(ulElement, li);
        });
      }
    });
  });
};

//实现左导航滚动位置和版本的保存与恢复
const saveScrollState = () => {
  const state = {
    scrollPosition: window.scrollY, // 保存右侧滚动位置
    activeVersion: activeTabIndex.value, // 保存左侧导航的版本
  };
  localStorage.setItem('log_page_state', JSON.stringify(state));
};

const restoreScrollState = () => {
  const savedState = localStorage.getItem('log_page_state');
  if (savedState) {
    const { scrollPosition, activeVersion } = JSON.parse(savedState);

    // 恢复活跃版本
    if (activeVersion !== undefined && activeVersion !== null) {
      activeTabIndex.value = activeVersion;
    }

    // 延迟滚动，确保 DOM 渲染完成
    nextTick(() => {
      if (scrollPosition !== undefined) {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto',
        });
      }
    });

    // 清除保存的状态，防止重复使用
    localStorage.removeItem('log_page_state');
  }
};

// 在组件挂载时设置头部标题
useHead({
  title: t('log.headtitle'),
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: 'description',
      content: t('log.description') || 'DooTask 更新日志',
    },
    {
      name: 'keywords',
      content: t('seo.keywords'),
    },
  ],
});
const isMobile = ref(false);
// 检查屏幕尺寸
const checkMobileView = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 生命周期钩子
onMounted(() => {
  checkMobileView();
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('beforeunload', saveScrollState);
  window.addEventListener('resize', checkMobileView);
  //调整左侧导航粘性高度
  adjustStickyNavPosition();
  // 添加高度调整
  adjustLogPageHeight();

  const adBarObserver = new MutationObserver(() => {
    adjustStickyNavPosition();
    adjustLogPageHeight();
  });
  const adBar = document.getElementById('ad');

  if (adBar) {
    adBarObserver.observe(adBar, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  fetchLogsData().then(() => {
    adjustStickyNavPosition();
    syncLeftNav(); // 页面加载完成后同步左侧导航栏的滚动
    restoreScrollState();
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
  window.removeEventListener('beforeunload', saveScrollState);
  window.removeEventListener('resize', checkMobileView);
});
</script>

<style>
.logs-l-ul {
  height: calc(100% - 36px);
}
</style>
