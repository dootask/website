<template>
  <section class="welfare">
    <div class="welfare-con">
      <div class="welfare-layout">
        <h2 class="txt-5004455 welfare-title mb-16">
          {{ $t('pricing.welfare.title') }}
        </h2>
        <h5 class="txt-4001830 welfare-desc mb-80">
          {{ $t('pricing.welfare.desc') }}
        </h5>

        <div class="welfare-cards">
          <div 
            v-for="card in welfareCards" 
            :key="card.type"
            :class="`welfare-card welfare-card-${card.type}`"
          >
            <div class="welfare-card-badge">
              <span :class="card.badgeClass">{{ card.badgeText }}</span>
            </div>
            <div class="welfare-card-icon">
              <img :src="card.icon" :alt="card.alt" />
            </div>
            <div class="welfare-card-content">
              <h3 class="txt-5002024 welfare-card-title">
                {{ $t(card.titleKey) }}
              </h3>
              <p class="txt-4001616 welfare-card-desc">
                {{ $t(card.descKey) }}
              </p>
            </div>
            <div class="welfare-card-footer">
              <button
                class="btn welfare-btn-outline welfare-card-btn"
                @click="handleApply(card.type)"
              >
                {{ $t('pricing.welfare.apply') }}
                <svg
                  class="welfare-btn-arrow-svg"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.025 4.94165L17.0833 9.99998L12.025 15.0583"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.91666 10H16.9417"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonModal
      v-model="showApplyModal"
      :width="312"
      :show-close="false"
      :close-on-overlay="true"
      class="welfare-modal"
    >
      <div class="welfare-apply-image">
        <img src="/img/side_nav_wechat.png" alt="" />
      </div>
      <div class="welfare-apply-text">
        {{ $t('pricing.welfare.dialog_qr_code_tip') }}
      </div>
      <div class="welfare-apply-actions">
        <button class="welfare-btn-confirm btn" @click="closeModal">
          {{ $t('pricing.btn') }}
        </button>
      </div>
    </CommonModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import '@/assets/scss/components/pricewelfare.scss';
const { t } = useI18n();
const showApplyModal = ref(false);

// 福利卡片配置数据
const welfareCards = computed(() => [
  {
    type: 'education',
    icon: '/img/welfare_icon1.svg',
    alt: 'Education Discount',
    titleKey: 'pricing.welfare.education.title',
    descKey: 'pricing.welfare.education.desc',
    badgeClass: 'badge-discount',
    badgeText: '50%'
  },
  {
    type: 'nonprofit',
    icon: '/img/welfare_icon2.svg',
    alt: 'Nonprofit Program',
    titleKey: 'pricing.welfare.nonprofit.title',
    descKey: 'pricing.welfare.nonprofit.desc',
    badgeClass: 'badge-discount',
    badgeText: '50%'
  },
  {
    type: 'influence',
    icon: '/img/welfare_icon3.svg',
    alt: 'Influence Rewards',
    titleKey: 'pricing.welfare.influence.title',
    descKey: 'pricing.welfare.influence.desc',
    badgeClass: 'badge-discount',
    badgeText: t('pricing.welfare.free')
  }
]);

const handleApply = (type: string) => {
  switch (type) {
    case 'education':
      break;
    case 'nonprofit':
      break;
    case 'influence':
      break;
  }
  showApplyModal.value = true;
};

const closeModal = () => {
  showApplyModal.value = false;
};
</script>
