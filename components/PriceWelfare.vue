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
          <div class="welfare-card welfare-card-education">
            <div class="welfare-card-badge">
              <span class="badge-discount">50%</span>
            </div>
            <div class="welfare-card-icon">
              <img src="/img/welfare_icon1.svg" alt="Education Discount" />
            </div>
            <div class="welfare-card-content">
              <h3 class="txt-5002024 welfare-card-title">
                {{ $t('pricing.welfare.education.title') }}
              </h3>
              <p class="txt-4001616 welfare-card-desc">
                {{ $t('pricing.welfare.education.desc') }}
              </p>
            </div>
            <div class="welfare-card-footer">
              <button class="btn btn-outline welfare-card-btn" @click="handleApply('education')">
                {{ $t('pricing.welfare.apply') }}
              </button>
            </div>
          </div>

          <div class="welfare-card welfare-card-nonprofit">
            <div class="welfare-card-badge">
              <span class="badge-discount">50%</span>
            </div>
            <div class="welfare-card-icon">
              <img src="/img/welfare_icon2.svg" alt="Nonprofit Program" />
            </div>
            <div class="welfare-card-content">
              <h3 class="txt-5002024 welfare-card-title">
                {{ $t('pricing.welfare.nonprofit.title') }}
              </h3>
              <p class="txt-4001616 welfare-card-desc">
                {{ $t('pricing.welfare.nonprofit.desc') }}
              </p>
            </div>
            <div class="welfare-card-footer">
              <button class="btn btn-outline welfare-card-btn" @click="handleApply('nonprofit')">
                {{ $t('pricing.welfare.apply') }}
              </button>
            </div>
          </div>

          <div class="welfare-card welfare-card-influence">
            <div class="welfare-card-badge">
              <span class="badge-free">{{ $t('pricing.welfare.free') }}</span>
            </div>
            <div class="welfare-card-icon">
              <img src="/img/welfare_icon3.svg" alt="Influence Rewards" />
            </div>
            <div class="welfare-card-content">
              <h3 class="txt-5002024 welfare-card-title">
                {{ $t('pricing.welfare.influence.title') }}
              </h3>
              <p class="txt-4001616 welfare-card-desc">
                {{ $t('pricing.welfare.influence.desc') }}
              </p>
            </div>
            <div class="welfare-card-footer">
              <button class="btn btn-outline welfare-card-btn" @click="handleApply('influence')">
                {{ $t('pricing.welfare.apply') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 申请模态框 -->    
    <div
      v-if="showApplyModal"
      :class="{ dark: theme === 'dark' }"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <h3>{{ modalTitle }}</h3>
        <br />
        <div class="modal-body">
          <p>{{ modalDesc }}</p>
          <p>{{ $t('pricing.welfare.modal.contact') }}</p>
          <p>{{ $t('pricing.welfare.modal.email') }}</p>
        </div>
        <div class="modal-actions">
          <button class="btn-confirm" @click="closeModal">
            {{ $t('pricing.btn') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const showApplyModal = ref(false);
const modalTitle = ref('');
const modalDesc = ref('');

const handleApply = (type: string) => {
  switch (type) {
    case 'education':
      modalTitle.value = t('pricing.welfare.education.title');
      modalDesc.value = t('pricing.welfare.education.modal');
      break;
    case 'nonprofit':
      modalTitle.value = t('pricing.welfare.nonprofit.title');
      modalDesc.value = t('pricing.welfare.nonprofit.modal');
      break;
    case 'influence':
      modalTitle.value = t('pricing.welfare.influence.title');
      modalDesc.value = t('pricing.welfare.influence.modal');
      break;
  }
  showApplyModal.value = true;
};

const closeModal = () => {
  showApplyModal.value = false;
};
</script>

<style scoped>
.welfare {
  padding: 120px 0 80px 0;
  background: var(--bg-color);
}

.welfare-con {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.welfare-layout {
  text-align: center;
}

.welfare-title {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
}

.welfare-desc {
  font-size: 18px;
  margin-bottom: 80px;
  opacity: 0.8;
}

.welfare-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.welfare-card {
  border-radius: 16px;
  padding: 40px 32px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  overflow: hidden;
}

.welfare-card-education,
.welfare-card-nonprofit,
.welfare-card-influence {
  background: linear-gradient(to top, rgba(139, 207, 112, 0.08) 0%, rgba(139, 207, 112, 0.02) 40%, transparent 100%);
}

.welfare-card-education:hover,
.welfare-card-nonprofit:hover,
.welfare-card-influence:hover {
  background: linear-gradient(to top, rgba(139, 207, 112, 0.15) 0%, rgba(139, 207, 112, 0.05) 40%, transparent 100%);
}

.welfare-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.welfare-card-badge {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}

.badge-discount {
  background: linear-gradient(135deg, #FFA726 0%, #FF8F00 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 0 16px 0 14px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 167, 38, 0.3);
}

.badge-free {
  background: linear-gradient(135deg, #8BCF70 0%, #66BB6A 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 0 16px 0 14px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(139, 207, 112, 0.3);
}

.welfare-card-icon {
  margin-bottom: 24px;
  text-align: left;
}

.welfare-card-icon img {
  width: 56px;
  height: 56px;
}

.welfare-card-content {
  flex: 1;
  text-align: left;
}

.welfare-card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: left;
}

.welfare-card-desc {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  text-align: left;
}

.welfare-card-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
}

.welfare-card-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 40%;
  min-width: 120px;
}

.btn-outline {
  background: transparent;
  border: 2px solid #8BCF70;
  color: #8BCF70;
}

.btn-outline:hover {
  background: #8BCF70;
  color: white;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
  text-align: left;
}

.modal-body p {
  margin-bottom: 12px;
  line-height: 1.6;
}

.modal-actions {
  margin-top: 30px;
}

.btn-confirm {
  background: #8BCF70;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-confirm:hover {
  background: #7AB85F;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welfare {
    padding: 60px 0;
  }
  
  .welfare-cards {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .welfare-card {
    padding: 30px 24px;
  }
  
  .welfare-title {
    font-size: 28px;
  }
  
  .welfare-desc {
    font-size: 16px;
    margin-bottom: 60px;
  }
}
</style>