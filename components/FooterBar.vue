<template>
  <footer>
    <div class="footer-con">
      <div class="footer-layout">
        <div class="footer-l">
          <NuxtLink :to="`/${locale}`" class="logo">
            <ClientDynamicImage id="logo" :src="`/img/${theme}/logo.svg`" :default-src="`/img/light/logo.svg`" alt="DooTask,Logo" />
            <i class="dootask txt-7002027">DooTask</i>
          </NuxtLink>
          <i class="txt txt-4001624">{{ $t('footer.title') }}</i>
        </div>
        <div class="footer-r">
          <ul class="footer-r-ul">
            <li class="footer-r-item">
              <ol class="footer-r-ol">
                <li class="footer-ol-item txt-5001624 mb-24">
                  {{ $t('footer.links') }}
                </li>
                <li class="footer-ol-item mb-16">
                  <NuxtLink class="txt-4001624 txt" :to="`/${locale}/product`">{{
                    $t('footer.product')
                  }}</NuxtLink>
                </li>
                <li class="footer-ol-item mb-16">
                  <NuxtLink class="txt-4001624 txt" :to="`/${locale}/solutions`">{{
                    $t('footer.solution')
                  }}</NuxtLink>
                </li>
                <li class="footer-ol-item mb-16">
                  <NuxtLink class="txt-4001624 txt" :to="`/${locale}/price`">{{
                    $t('footer.pricing')
                  }}</NuxtLink>
                </li>
                <li class="footer-ol-item">
                  <NuxtLink class="txt-4001624 txt" :to="`/${locale}/about`">{{
                    $t('footer.about')
                  }}</NuxtLink>
                </li>
              </ol>
            </li>
            <li class="footer-r-item">
              <ol class="footer-r-ol">
                <li class="footer-ol-item txt-5001624 mb-24">
                  {{ $t('footer.support') }}
                </li>
                <li class="footer-ol-item mb-16">
                  <NuxtLink class="txt-4001624 txt" :to="`/${locale}/download`">{{
                    $t('footer.download')
                  }}</NuxtLink>
                </li>
                <li class="footer-ol-item mb-16">
                  <a :href="`${siteUrl}/help/basic/quick-start`" target="_blank" class="txt-4001624 txt external-link-icon">{{$t('footer.help')}}</a>
                </li>
                <li class="footer-ol-item mb-16">
                  <NuxtLink
                    class="txt-4001624 txt external-link-icon"
                    :to="`/${locale}/privacy`"
                    target="_blank"
                    >{{ $t('footer.privacy') }}</NuxtLink
                  >
                </li>
                <li class="footer-ol-item">
                  <a
                    class="txt-4001624 txt external-link-icon"
                    :href="`${siteUrl}/docs/index.html`"
                    target="_blank"
                    >{{ $t('footer.api_docs') }}</a
                  >
                </li>
              </ol>
            </li>
            <li class="footer-r-item">
              <ul class="footer-r-ol">
                <li class="footer-ol-item txt-5001624 mb-24">
                  {{ $t('footer.community') }}
                </li>
                <li class="footer-ol-item">
                  <div class="footer-ol-item mb-16">
                    <i
                      class="txt-4001624 txt external-link-icon"
                      @click="
                        openInNewTab('https://github.com/kuaifan/dootask')
                      "
                      >Github</i
                    >
                  </div>
                  <div class="footer-ol-item mb-16">
                    <i
                      class="txt-4001624 txt external-link-icon"
                      @click="openInNewTab('https://gitee.com/aipaw/dootask')"
                      >Gitee </i
                    >
                  </div>
                  <div id="qq_group" class="footer-ol-item">
                    <i class="txt-4001624 txt">{{ $t('footer.QQ') }}</i>
                    <div class="group_code">
                      <img
                        id="home_code"
                        class="code-svg"
                        src="/img/qq_code.jpg"
                        :alt="$t('footer.QQ_alt')"
                      />
                      <i class="group_num"
                        >{{ $t('social.group') }}：546574618</i
                      >
                      <i class="lower_triangle"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="txt-4001624 filings footer_copyright">
        <span>
          Copyright © 2022-{{ year }} DooTask. All rights reserved.
        </span>
        <div class="footer_beian" style="display: flex">
          <img src="/img/beian.png" alt="" /><span style="padding-left: 3px"
            >桂公网安备 45010802000393号</span
          >
        </div>
        <a class="footer_beian_a" href="http://beian.miit.gov.cn"
          >桂ICP备2021003642号-5</a
        >
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { openInNewTab } from '../utils/common';
import { useI18n } from 'vue-i18n';

const themeStore = useThemeStore();

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const { locale } = useI18n();

const { theme } = toRefs(themeStore);

const year = new Date().getFullYear();
</script>
