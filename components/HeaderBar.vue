<!-- 关于我们头部 -->
<template>
  <header ref="header" class="head">
    <slot name="ad"></slot>
    <div ref="nav" class="nav">
      <div class="nav-layout">
        <NuxtLink :to="`/${locale}`" class="logo">
          <ClientDynamicImage id="logo" :src="`/img/${theme}/logo.svg`" :default-src="`/img/light/logo.svg`" alt="DooTask,Logo" />
          <i class="dootask txt-7002027">DooTask</i>
        </NuxtLink>
        <ul class="nav-ul">
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-product"
              :to="`/${locale}/product`"
              :style="route.path.startsWith(`/${locale}/product`) ? getTabStyles() : {}"
              >{{ $t('navigation.product') }}</NuxtLink
            >
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-solutions"
              :to="`/${locale}/solutions`"
              :style="route.path.startsWith(`/${locale}/solutions`)? getTabStyles() : {}"
              >{{ $t('navigation.solution') }}</NuxtLink
            >
          </li>
          <!-- 支持部分 -->
          <li class="nav-ul-item">
            <i
              id="support-txt"
              class="txt-4001620 txt nav-support"
              @click="toggleMenuPopHandle"
            >
              {{ $t('navigation.support') }}
              <img
                id="drop-down-svg"
                src="/img/vector.svg"
                :alt="$t('navigation.support')"
                class="nav-vector"
                :style="isMenuPopVisisble ? 'transform: rotate(180deg)' : ''"
              />
            </i>
            <ol
              id="submenu-pop"
              class="submenu-pop"
              :style="isMenuPopVisisble ? 'display: block' : ''"
            >
              <li
                v-for="(item, index) in supportItems"
                :key="index"
                class="submenu-pop-item"
                @click="changeMenu()"
              >
                <NuxtLink
                  :to="item.link"
                  :target="item.target"
                  class="txt-4001418 txt-sub"
                >
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ol>
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-price"
              :to="`/${locale}/price`"
              :style="route.path.startsWith(`/${locale}/price`) ? getTabStyles() : {}"
              >{{ $t('navigation.pricing') }}</NuxtLink
            >
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-about"
              :to="`/${locale}/about`"
              :style="route.path.startsWith(`/${locale}/about`) ? getTabStyles() : {}"
              >{{ $t('navigation.about_us') }}</NuxtLink
            >
          </li>
        </ul>
        <div class="nav-r">
          <div id="lang-img" class="lang">
            <img
              src="/img/lang-select.svg"
              :alt="$t('navigation.lang_switch')"
              @click="showLangPopHandle"
            />
            <ul
              id="lang-pop"
              class="lang-pop"
              :style="{ display: isLangPopVisisble ? 'block' : 'none' }"
            >
              <li class="lang-pop-item" @click="switchLanguage('zh')">
                <i class="lang-txt">简体中文</i>
              </li>
              <li class="lang-pop-item" @click="switchLanguage('en')">
                <i class="lang-txt">English</i>
              </li>
            </ul>
          </div>
          <i
            v-show="theme === 'dark'"
            class="nav-r-icon"
            @click="setTheme('light')"
          >
            <img src="/img/light.svg" :alt="$t('theme.light')" />
          </i>
          <i
            v-show="theme === 'light'"
            class="nav-r-icon"
            @click="setTheme('dark')"
          >
            <img src="/img/drak.svg" :alt="$t('theme.dark')" />
          </i>
          <a href="https://github.com/kuaifan/dootask" target="_blank">
            <i class="nav-r-icon">
              <img src="/img/github.svg" alt="github" />
            </i>
          </a>
          <i class="line-1"></i>
          <span class="get-started">
            <a :href="`${siteUrl}/manage/dashboard`">
              <button class="btn btn-primary">
                {{ $t('common.try_now') }}
              </button>
            </a>
          </span>
        </div>
        <div class="menuBtn" @click="openDrawer">
          <img id="menuBtn" :src="`/img/menu.svg`" :alt="$t('navigation.menu')" />
        </div>
      </div>
    </div>
    <slot></slot>
    <!-- 抽屉导航 -->
    <div class="drawer" :class="{ 'open-drawer': isDrawerVisible }">
      <div class="drawer-t mb-36">
        <a href="/" class="logo">
          <ClientDynamicImage id="logo" :src="`/img/${theme}/logo.svg`" :default-src="`/img/light/logo.svg`" alt="DooTaskLogo" />
          <i class="dootask txt-7002027">DooTask</i>
        </a>
        <i class="close-drawer" @click="closeDrawer">✕</i>
      </div>
      <ul class="drawer-ul">
        <li class="drawer-item-t mb-16">
          <div
            v-for="(item, index) in mainMenuItems.slice(0, 2)"
            :key="index"
            class="drawer-item"
          >
            <a class="txt-4001620 txt" :href="item.link" @click="closeDrawer">{{
              item.text
            }}</a>
          </div>
          <div class="drawer-item" @click="expandMenuHandle('support')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.support') }}
              <img
                id="drawer-down-support-svg"
                src="/img/vector.svg"
                class="nav-vector"
                :alt="$t('navigation.support')"
                :style="isSupportMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol v-show="isSupportMenuOpen" id="support" class="drawer-active">
            <div
              v-for="(item, index) in supportItems"
              :key="index"
              class="drawer-item"
            >
              <NuxtLink
                class="txt-4001620 txt"
                :to="item.link"
                :target="item.target"
                @click="closeDrawer"
                >{{ item.text }}</NuxtLink
              >
            </div>
          </ol>
          <div
            v-for="(item, index) in mainMenuItems.slice(2, 5)"
            :key="index"
            class="drawer-item"
          >
            <a class="txt-4001620 txt" :href="item.link" @click="closeDrawer">{{
              item.text
            }}</a>
          </div>
        </li>
        <li class="drawer-item-c">
          <div class="drawer-item" @click.stop="expandMenuHandle('theme')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.theme') }}
              <img
                src="/img/vector.svg"
                :alt="$t('navigation.theme')"
                class="nav-vector"
                :style="isThemeMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol v-show="isThemeMenuOpen" id="theme" class="drawer-active">
            <div
              v-for="(item, index) in themeItems"
              :key="index"
              class="drawer-item"
            >
              <i class="txt-4001620 txt" @click="setTheme(item.value)">{{
                item.text
              }}</i>
            </div>
          </ol>
        </li>

        <li class="drawer-item-c">
          <div class="drawer-item" @click="expandMenuHandle('language')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.language') }}
              <img
                src="/img/vector.svg"
                :alt="$t('navigation.language')"
                class="nav-vector"
                :style="isLanguageMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol
            id="language"
            class="drawer-active"
            :style="{ display: isLanguageMenuOpen ? 'block' : 'none' }"
          >
            <div
              v-for="(item, index) in languageItems"
              :key="index"
              class="drawer-item"
            >
              <i class="txt-4001620 txt" @click="handleSetLocale(item.value)">{{
                item.text
              }}</i>
            </div>
          </ol>
        </li>
        <li class="drawer-item">
          <a
            class="txt-4001620 txt"
            :href="`${siteUrl}/manage/dashboard`"
            @click="closeDrawer"
            >{{ $t('common.try_now') }}</a
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';


const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);

// 获取当前路由信息
const route = useRoute();

// 在 setup 顶部立即调用 useI18n()
const { t, setLocale, locale } = useI18n();

// 抽屉相关状态和方法
// const isDrawerOpen = ref(false);

//控制菜单三个选项的展开
const isSupportMenuOpen = ref(false);
const isThemeMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);

// 语言切换方法
const switchLanguage = async (lang: 'zh' | 'en') => {
  setLocale(lang);
  // 更新 themeStore
  themeStore.lang = lang;
  // 保存到 localStorage
  localStorage.setItem('language', lang);
};

// 背景显示状态
const showBackground = ref(true);

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const getTabStyles = () => {
  return {
    backgroundColor: 'var(--bg-hover-color)', // 设置背景色
    color: 'var(--text-color)', // 设置文本颜色
    borderRadius: '6px', // 设置圆角
  };
};

onMounted(() => {
  const supportTxt = document.getElementById('support-txt');
  const submenuPop = document.getElementById('submenu-pop');
  const langImg = document.getElementById('lang-img');
  const langPop = document.getElementById('lang-pop');

  // 点击菜单外部关闭各种弹出菜单
  window.addEventListener('click', (e) => {
    // 关闭支持菜单弹窗
    if (
      submenuPop &&
      !submenuPop.contains(e.target as Node) &&
      e.target !== supportTxt
    ) {
      isMenuPopVisisble.value = false;
    }

    // 关闭语言选择弹窗
    if (
      langPop &&
      !langPop.contains(e.target as Node) &&
      e.target !== langImg
    ) {
      isLangPopVisisble.value = false;
    }
  });

  showBackground.value = true;

  const navbar = document.querySelector('.nav') as HTMLElement;
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 30) {
        // 当滚动距离大于30px时，添加navbar-white类，remove后导航栏背景色为白色
        navbar.classList.add('navbar-white');
      } else {
        navbar.classList.remove('navbar-white');
      }
    });
  }
});

onUnmounted(() => {});

// 语言选择
const isLangPopVisisble = ref(false);

const showLangPopHandle = (e: Event) => {
  // 阻止事件冒泡
  e.stopPropagation();
  // 切换语言弹窗的可见性
  isLangPopVisisble.value = !isLangPopVisisble.value;
};

// 设置主题
const setTheme = (newTheme: 'light' | 'dark' | string) => {
  try {
    themeStore.setTheme(newTheme);
  } catch (error) {
    console.error('切换主题时出错:', error);
  }
};

// 导航下拉菜单
const isMenuPopVisisble = ref(false);

const toggleMenuPopHandle = () => {
  isMenuPopVisisble.value = !isMenuPopVisisble.value;
};

const changeMenu = () => {
  isMenuPopVisisble.value = false;
};

// 状态管理
const isDrawerVisible = ref(false);
// const drawerRef = ref<HTMLElement | null>(null);

// 创建带语言前缀的路径
const localizedRoutes = computed(() => ({
  product: `/${locale.value}/product`,
  solutions: `/${locale.value}/solutions`,
  pricing: `/${locale.value}/price`,
  about: `/${locale.value}/about`,
  download: `/${locale.value}/download`,
  // help: `/${locale.value}/help`,
  privacy: `/${locale.value}/privacy`,
}));

// 菜单项数据
const mainMenuItems = computed(() => [
  { text: t('navigation.product'), link: localizedRoutes.value.product },
  { text: t('navigation.solution'), link: localizedRoutes.value.solutions },
  { text: t('navigation.pricing'), link: localizedRoutes.value.pricing },
  { text: t('navigation.about_us'), link: localizedRoutes.value.about },
]);

const supportItems = computed(() => [
  { text: t('navigation.download'), link: localizedRoutes.value.download },
  {
    text: t('navigation.help_center'),
    link: `${siteUrl}/help/basic/quick-start`,
    target: '_blank',
  },
  {
    text: t('navigation.privacy_policy'),
    link: localizedRoutes.value.privacy,
    target: '_blank',
  },
  {
    text: t('navigation.api_docs'),
    link: `${siteUrl}/docs/index.html`,
    target: '_blank',
  },
]);



const themeItems = computed(() => [
  { text: t('theme.light'), value: 'light' },
  { text: t('theme.dark'), value: 'dark' },
]);

interface LanguageItem {
  text: string;
  value: 'zh' | 'en';
}

const languageItems: LanguageItem[] = [
  { text: t('common.lang_zh'), value: 'zh' },
  { text: t('common.lang_en'), value: 'en' },
];

const openDrawer = () => {
  isDrawerVisible.value = true;
};

const closeDrawer = () => {
  isDrawerVisible.value = false;
};

const expandMenuHandle = (val: string) => {
  if (val === 'support') {
    isSupportMenuOpen.value = !isSupportMenuOpen.value;
  } else if (val === 'language') {
    isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
    // 关闭其他可能打开的菜单
    isSupportMenuOpen.value = false;
    isThemeMenuOpen.value = false;
  } else if (val === 'theme') {
    isThemeMenuOpen.value = !isThemeMenuOpen.value; // 切换主题菜单的显示状态
  }
};

//语言选择
const handleSetLocale = (newLocale: 'zh' | 'en') => {
  switchLanguage(newLocale);
  isLangPopVisisble.value = false;
};
</script>
