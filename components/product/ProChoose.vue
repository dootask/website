<template>
  <div>
    <div class="topics">
      <div class="topics-con">
        <div class="topics-layout">
          <div class="topics-tit mb-32">
            <span class="txt-6007290 topics-h1">{{
              $t('produpage.title')
            }}</span>
          </div>
          <h4 class="txt-4001830 topics-h4 mb-32" style="width: auto !important">
            {{ $t('produpage.desc') }}
          </h4>
          <div class="flex-cc topics-btn">
            <span class="mr-24 get-started">
              <NuxtLink :to="`/${locale}/price`">
                <button class="btn btn-primary mr-20">
                  {{ $t('common.get_started') }}
                </button>
              </NuxtLink>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="prooduct-con">
      <ul class="prooduct-list">
        <li>
          <i class="prev" @click="prevHandle">
            <img src="/img/prev.svg" :alt="$t('produpage.title')" />
          </i>
        </li>
        <li v-if="isMobile" class="prooduct-list-item active top">
          <img
            class="icon"
            :src="getProductIcon(currentIndex)"
            :alt="productItems[currentIndex].title"
          />
          <h3 class="txt-4002025 txt">
            {{ productItems[currentIndex].title }}
          </h3>
        </li>
        <li
          v-for="(item, index) in productItems"
          v-else
          :key="index"
          class="prooduct-list-item"
          :class="{
            active: index === currentIndex,
            top: index < 5,
            bot: index >= 5,
          }"
          :style="{ '--delay': `${(index * 0.1).toFixed(1)}s` }"
          @click="selectProductItem(index)"
        >
          <img class="icon" :src="getProductIcon(index)" :alt="item.title" />
          <h3 class="txt-4002025 txt">{{ item.title }}</h3>
        </li>

        <li>
          <i class="next" @click="nextHandle">
            <img src="/img/next.svg" :alt="$t('produpage.title')" />
          </i>
        </li>
      </ul>
      <ul class="prooduct-ul">
        <li
          v-for="(detail, index) in productDetails"
          :key="index"
          class="details"
          :class="{ active: index === currentIndex }"
        >
          <div class="details-con" :class="{ 'details-con-item4': detail.lg }">
            <ClientDynamicImage
              class="pic"
              :src="`/img/${theme}/product_pic${index + 1}.svg`"
              :default-src="`/img/light/product_pic${index + 1}.svg`"
              :alt="detail.alt"
            />
            <ul class="details-ul" :class="{'item4': detail.lg}">
              <li
                v-for="(item, itemIndex) in detail.items"
                :key="itemIndex"
                class="details-ul-item"
              >
                <h1 class="txt-7003645 serial-number mb-24">
                  {{ itemIndex + 1 < 10 ? `0${itemIndex + 1}` : itemIndex + 1 }}
                </h1>
                <h5 class="txt-5002025 mb-16 choose-con-item-h5">
                  {{ item.title }}
                </h5>
                <h6 class="txt-4001624 choose-con-item-h6">
                  {{ item.description }}
                </h6>
              </li>
            </ul>
          </div>
          <ul v-if="detail.lg" class="details-ul-1280 item4-1280">
            <li class="details-ul-item mb-40">
              <ClientDynamicImage
                :src="`/img/${theme}/product_pic${index + 1}.svg`"
                :default-src="`/img/light/product_pic${index + 1}.svg`"
                class="pic"
                :alt="detail.alt"
              />
            </li>
            <li
              v-for="(item, itemIndex) in detail.items"
              :key="itemIndex"
              class="details-ul-item"
            >
              <h1 class="txt-7003645 serial-number mb-24">
                {{ itemIndex + 1 < 10 ? `0${itemIndex + 1}` : itemIndex + 1 }}
              </h1>
              <h5 class="txt-5002025 mb-16 choose-con-item-h5">
                {{ item.title }}
              </h5>
              <h6 class="txt-4001624 choose-con-item-h6">
                {{ item.description }}
              </h6>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);

const currentIndex = ref(0);

const isMobile = ref(false);

// 检查屏幕尺寸
const checkMobileView = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobileView();
  window.addEventListener('resize', () => {
    checkMobileView();
    // startAutoPlay();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView);
});

// 监听 currentIndex 更新后，确保 DOM 渲染完成
// watch(
//   currentIndex,
//   async (newIndex) => {
//     // 等待 DOM 渲染完成
//     await nextTick();

//     const detailsItems = document.querySelectorAll('.details');
//     detailsItems.forEach((item, index) => {
//       if (index === newIndex) {
//         item.style.display = 'block';
//       } else {
//         item.style.display = 'none';
//       }
//     });
//   },
//   { immediate: true },
// );

const productItems = computed(() => [
  { icon: '/img/product_icons0_h.svg', title: t('produpage.choose.cocre') },
  { icon: '/img/product_icons1.svg', title: t('produpage.choose.im') },
  { icon: '/img/product_icons2.svg', title: t('produpage.choose.proj') },
  { icon: '/img/product_icons3.svg', title: t('produpage.choose.dash') },
  { icon: '/img/product_icons4.svg', title: t('produpage.choose.calendar') },
  { icon: '/img/product_icons5.svg', title: t('produpage.choose.botass') },
  { icon: '/img/product_icons6.svg', title: t('produpage.choose.team') },
  { icon: '/img/product_icons7.svg', title: t('produpage.choose.e2e') },
  { icon: '/img/product_icons8.svg', title: t('produpage.choose.multi') },
]);

const productDetails = computed(() => [
  {
    alt: t('produpage.choose.cocre_de.title_one'),
    items: [
      {
        title: t('produpage.choose.cocre_de.title_one'),
        description: t('produpage.choose.cocre_de.desc_one'),
      },
      {
        title: t('produpage.choose.cocre_de.title_two'),
        description: t('produpage.choose.cocre_de.desc_two'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.im_de.title_one'),
    items: [
      {
        title: t('produpage.choose.im_de.title_one'),
        description: t('produpage.choose.im_de.desc_one'),
      },
      {
        title: t('produpage.choose.im_de.title_two'),
        description: t('produpage.choose.im_de.desc_two'),
      },
      {
        title: t('produpage.choose.im_de.title_three'),
        description: t('produpage.choose.im_de.desc_three'),
      },
      {
        title: t('produpage.choose.im_de.title_four'),
        description: t('produpage.choose.im_de.desc_four'),
      },
    ],
    lg: true,
  },
  {
    alt: t('produpage.choose.proj_de.title_one'),
    items: [
      {
        title: t('produpage.choose.proj_de.title_one'),
        description: t('produpage.choose.proj_de.desc_one'),
      },
      {
        title: t('produpage.choose.proj_de.title_two'),
        description: t('produpage.choose.proj_de.desc_two'),
      },
      {
        title: t('produpage.choose.proj_de.title_three'),
        description: t('produpage.choose.proj_de.desc_three'),
      },
      {
        title: t('produpage.choose.proj_de.title_four'),
        description: t('produpage.choose.proj_de.desc_four'),
      },
    ],
    lg: true,
  },
  {
    alt: t('produpage.choose.dash_de.title_one'),
    items: [
      {
        title: t('produpage.choose.dash_de.title_one'),
        description: t('produpage.choose.dash_de.desc_one'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.calendar_de.title_one'),
    items: [
      {
        title: t('produpage.choose.calendar_de.title_one'),
        description: t('produpage.choose.calendar_de.desc_one'),
      },
      {
        title: t('produpage.choose.calendar_de.title_two'),
        description: t('produpage.choose.calendar_de.desc_two'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.botass_de.title_one'),
    items: [
      {
        title: t('produpage.choose.botass_de.title_one'),
        description: t('produpage.choose.botass_de.desc_one'),
      },
      {
        title: t('produpage.choose.botass_de.title_two'),
        description: t('produpage.choose.botass_de.desc_two'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.team_de.title_one'),
    items: [
      {
        title: t('produpage.choose.team_de.title_one'),
        description: t('produpage.choose.team_de.desc_one'),
      },
      {
        title: t('produpage.choose.team_de.title_two'),
        description: t('produpage.choose.team_de.desc_two'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.e2e_de.title_one'),
    items: [
      {
        title: t('produpage.choose.e2e_de.title_one'),
        description: t('produpage.choose.e2e_de.desc_one'),
      },
      {
        title: t('produpage.choose.e2e_de.title_two'),
        description: t('produpage.choose.e2e_de.desc_two'),
      },
    ],
    lg: false,
  },
  {
    alt: t('produpage.choose.multi_de.title_one'),
    items: [
      {
        title: t('produpage.choose.multi_de.title_one'),
        description: t('produpage.choose.multi_de.desc_one'),
      },
    ],
    lg: false,
  },
]);

function selectProductItem(index: number) {
  currentIndex.value = index;
}

function prevHandle() {
  currentIndex.value =
    (currentIndex.value - 1 + productDetails.value.length) %
    productDetails.value.length;
}

function nextHandle() {
  currentIndex.value = (currentIndex.value + 1) % productDetails.value.length;
}

// 动态更改当前激活项的图标
function getProductIcon(index: number) {
  return index === currentIndex.value
    ? `/img/product_icons${index}_h.svg` // 激活状态下的图标
    : `/img/product_icons${index}.svg`; // 普通状态下的图标
}
</script>

<style scoped></style>
