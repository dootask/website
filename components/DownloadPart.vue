<template>
  <div class="topics">
    <div class="topics-con">
      <div class="topics-layout">
        <div class="topics-tit mb-32">
          <span class="txt-6005670 topics-h1">{{ $t('download.title') }}</span>
        </div>
        <h4 class="txt-4001830 topics-h4 mb-64">
          {{ $t('download.desc') }}
        </h4>
        <ul class="download-ul">
          <li
            v-for="(platform, index) in platforms"
            :key="platform.id"
            class="download-ul-item dow-animate-box"
            :style="`--delay: ${index * 0.1}s`"
            @mouseover="handleMouseover(index)"
            @mouseout="handleMouseout(index)"
          >
            <template v-if="platform.id === 'ios'">
              <a
                id="ios"
                class="normal"
                :href="platform.normalLink"
                target="_blank"
              >
                <img
                  class="icon mb-8"
                  :src="platform.icon"
                  :alt="platform.name"
                />
                <i class="txt-4001624 txt">{{ platform.name }}</i>
              </a>
              <a class="hover" :href="platform.normalLink" target="_blank">
                <img
                  class="qr-code mb-8"
                  :src="platform.qrCode"
                  :alt="`扫描下载,${platform.name}`"
                />
                <i class="txt-4001624 txt">{{ $t('download.scan') }}</i>
              </a>
            </template>

            <template v-else-if="platform.id === 'android'">
              <a
                id="Android"
                class="normal"
                :href="platform.normalLink"
                target="_blank"
              >
                <img
                  class="icon mb-8"
                  :src="platform.icon"
                  :alt="platform.name"
                />
                <i class="txt-4001624 txt">{{ platform.name }}</i>
              </a>
              <a
                class="hover radius"
                :href="platform.normalLink"
                target="_blank"
              >
                <img
                  class="icon mb-8"
                  src="/img/dow_icon.svg"
                  alt="Android,下载"
                />
                <i class="txt-4001624 txt">{{ $t('download.load') }}</i>
              </a>
            </template>

            <template v-else-if="platform.id === 'mac'">
              <div class="normal">
                <img
                  class="icon mb-8"
                  :src="platform.icon"
                  :alt="platform.name"
                />
                <i class="txt-4001624 txt">{{ platform.name }}</i>
              </div>
              <div class="hover radius">
                <button
                  v-for="(chip, chipIndex) in platform.chips"
                  :key="chipIndex"
                  class="btn btn-green mb-12 btn-padding"
                  style="width: 70%"
                >
                  <a
                    class="chips-txt txt-4001418"
                    :href="chip.link"
                    target="_blank"
                  >
                    {{ chip.name }}
                  </a>
                </button>
              </div>
            </template>

            <template v-else-if="platform.id === 'windows'">
              <div class="normal">
                <img
                  class="icon mb-8"
                  :src="platform.icon"
                  :alt="platform.name"
                />
                <i class="txt-4001624 txt">{{ platform.name }}</i>
              </div>
              <div class="hover radius">
                <button
                  v-for="(normal, normalIndex) in platform.normalLinks"
                  :key="normalIndex"
                  class="btn btn-green mb-12 btn-padding"
                  style="width: 70%"
                >
                  <a
                    class="chips-txt txt-4001418"
                    :href="normal.link"
                    target="_blank"
                  >
                    {{ normal.name }}
                  </a>
                </button>
              </div>
            </template>


            <!-- <template v-else-if="platform.id === 'windows'">
              <p class="normal">
                <img
                  class="icon mb-8"
                  :src="platform.icon"
                  :alt="platform.name"
                />
                <i class="txt-4001624 txt">{{ platform.name }}</i>
              </p>
              <a
                class="hover radius"
                :href="platform.normalLink"
                target="_blank"
              >
                <img
                  class="icon mb-8"
                  src="/img/dow_icon.svg"
                  :alt="`${platform.name},下载`"
                />
                <i class="txt-4001624 txt">{{ $t('download.load') }}</i>
              </a>
            </template> -->
          </li>
        </ul>
        <a
          class="download-other-btn dow-animate-box"
          style="--delay: 0.5s"
          :href="`${siteUrl}/desktop/publish/latest`"
          target="_blank"
        >
          <span>{{ $t('download.other') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const platforms = ref([
  {
    id: 'ios',
    name: 'iOS',
    icon: '/img/dow_ios.svg',
    normalLink: 'https://apps.apple.com/cn/app/dootask/id1624855111',
    qrCode: '/img/ios_code.png',
  },
  {
    id: 'android',
    name: 'Android',
    icon: '/img/dow_android.svg',
    normalLink:
      `${siteUrl}/desktop/publish/latest?platform=android`,
  },
  {
    id: 'mac',
    name: 'macOS',
    icon: '/img/dow_mac.svg',
    chips: [
      {
        name: 'Apple Chips',
        link: `${siteUrl}/desktop/publish/latest?platform=mac&arch=arm64`,
      },
      {
        name: 'Intel Chips',
        link: `${siteUrl}/desktop/publish/latest?platform=mac&arch=x64`,
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: '/img/dow_window.svg',
    normalLinks: [
      {
        name: 'ARM64',
        link: `${siteUrl}/desktop/publish/latest?platform=win&arch=arm64`,
      },
      {
        name: 'X64',
        link: `${siteUrl}/desktop/publish/latest?platform=win&arch=x64`,
      },
    ],
  },
]);

const isMobile = ref(false);
const isIos = ref(false);
const isAndroid = ref(false);

const handleMouseover = (index: number) => {
  if (isIos.value || isAndroid.value) return;
  const downloadItems = document.querySelectorAll('.download-ul-item');
  (downloadItems[index].children[0] as HTMLElement).style.display = 'none';
  (downloadItems[index].children[1] as HTMLElement).style.display = 'flex';
};

const handleMouseout = (index: number) => {
  if (isIos.value || isAndroid.value) return;
  const downloadItems = document.querySelectorAll('.download-ul-item');
  (downloadItems[index].children[0] as HTMLElement).style.display = 'flex';
  (downloadItems[index].children[1] as HTMLElement).style.display = 'none';
};

onMounted(() => {
  isMobile.value = 'ontouchstart' in window;
  isIos.value = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  isAndroid.value = /Android/.test(window.navigator.userAgent);

  const animateBoxes = () => {
    const boxes = document.querySelectorAll('.dow-animate-box');
    boxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const boxBottom = box.getBoundingClientRect().bottom;
      if (boxTop < window.innerHeight && boxBottom > 0) {
        box.classList.add('animate');
      }
    });
  };

  window.addEventListener('scroll', animateBoxes);
  animateBoxes();
});

onUnmounted(() => {
  window.removeEventListener('scroll', () => {});
});
</script>

<style scoped>
.dow-animate-box {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s,
    transform 0.8s;
}

.dow-animate-box.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>

<style scoped>

</style>
