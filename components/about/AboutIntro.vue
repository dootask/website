<template>
  <div class="about-intro">
    <div class="topics">
      <div class="topics-con">
        <div class="topics-layout">
          <div class="topics-tit mb-32">
            <span class="txt-6007290 topics-h1">{{ $t('about.title') }}</span>
          </div>
          <h4 class="txt-4001830 topics-h4 mb-32">
            {{ $t('about.desc') }}
          </h4>
          <ul class="company-ul">
            <li class="company-ul-item">
              <h2
                ref="YearRef"
                class="txt-5003636 company-h2 mb-8 company-year"
              >
                2020
              </h2>
              <h6 class="txt-4001624 company-h6">{{ $t('about.founded') }}</h6>
            </li>
            <li class="company-ul-item">
              <div class="flex-sc">
                <h2
                  ref="AreaRef"
                  class="txt-5003636 company-h2 mb-8 company-area"
                >
                  10
                </h2>
                <i class="company-sup">+</i>
              </div>
              <h6 class="txt-4001624 company-h6">
                {{ $t('about.expertise') }}
              </h6>
            </li>
            <li class="company-ul-item">
              <div class="flex-sc">
                <h2
                  ref="SizeRef"
                  class="txt-5003636 company-h2 mb-8 company-size"
                >
                  99
                </h2>
                <i class="company-sup">%</i>
              </div>
              <h6 class="txt-4001624 company-h6">
                {{ $t('about.clientsatis') }}
              </h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <article class="company-profile">
      <div class="company-profile-con">
        <div class="company-profile-layout">
          <ClientDynamicImage
            class="company-profile-l"
            :src="`/img/${theme}/about_pic1.png`"
            :default-src="`/img/light/about_pic1.png`"
            :alt="$t('about.profile.alt')"
          />
          
          <div class="company-profile-r">
            <h1 class="txt-5004455 company-profile-h1 mb-80">
              {{ $t('about.profile.title') }}
              <svg
                style="bottom: -15px !important"
                class="company-profile-arcs"
                width="312"
                height="23"
                viewBox="0 0 312 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="arc"
                  opacity="0.5"
                  d="M3 20C47.4822 7.1714 170.957 -10.7886 309 20"
                  stroke="#8BCF70"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-dasharray="600, 600"
                  stroke-dashoffset="0"
                />
              </svg>
            </h1>
            <h6 class="txt-4001830 company-profile-h6">
              {{ $t('about.profile.desc') }}
            </h6>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, toRefs } from 'vue';

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);

const companyYear = ref(999);
const companyArea = ref(0);
const companySize = ref(0);

const YearRef = ref<HTMLElement | null>(null);
const AreaRef = ref<HTMLElement | null>(null);
const SizeRef = ref<HTMLElement | null>(null);

let yearTimerId: number | NodeJS.Timeout | undefined = undefined;
let areaTimerId: number | NodeJS.Timeout | undefined = undefined;
let sizeTimerId: number | NodeJS.Timeout | undefined = undefined;

const updateYearNumber = () => {
  const increment = Math.ceil((2020 - companyYear.value) / 50);
  companyYear.value += increment;
  if (companyYear.value >= 2020) {
    clearInterval(yearTimerId);
    companyYear.value = 2020;
  }
  if (YearRef.value) {
    YearRef.value.textContent = companyYear.value.toString();
  }
};

const updateAreaNumber = () => {
  companyArea.value += 0.05;
  if (companyArea.value >= 10) {
    clearInterval(areaTimerId);
    companyArea.value = 10;
  }
  if (AreaRef.value) {
    AreaRef.value.textContent = Number(companyArea.value.toFixed(1)).toString();
  }
};

const updateSizeNumber = () => {
  companySize.value += 0.5;
  if (companySize.value >= 99) {
    clearInterval(sizeTimerId);
    companySize.value = 99;
  }
  if (SizeRef.value) {
    SizeRef.value.textContent = companySize.value.toString();
  }
};

onMounted(() => {
  const isMobile = window.matchMedia(
    'only screen and (max-width: 768px)',
  ).matches;
  if (!isMobile) {
    yearTimerId = setInterval(updateYearNumber, 1);
    areaTimerId = setInterval(updateAreaNumber, 1);
    sizeTimerId = setInterval(updateSizeNumber, 1);
  }
});

onUnmounted(() => {
  if (yearTimerId) clearInterval(yearTimerId);
  if (areaTimerId) clearInterval(areaTimerId);
  if (sizeTimerId) clearInterval(sizeTimerId);
});
</script>

<style scoped>

</style>
