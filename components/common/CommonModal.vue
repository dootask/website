<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="common-modal-overlay" :class="{ dark: theme === 'dark' }" @click.self="handleOverlayClick">
      <div class="common-modal" :style="modalStyle">
        <button v-if="showClose" class="common-modal-close" @click="close">×</button>
        <slot name="header">
          <div v-if="title" class="common-modal-title">{{ title }}</div>
        </slot>
        <div class="common-modal-body">
          <slot />
        </div>
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CommonModalProps, CommonModalEmits } from '../../types/component';

const props = withDefaults(defineProps<CommonModalProps>(), {
  title: '',
  width: '400px',
  showClose: true,
  closeOnOverlay: true,
});
const emit = defineEmits<CommonModalEmits>();
const modalStyle = computed(() => ({ width: typeof props.width === 'number' ? props.width + 'px' : props.width }))
// const { t } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function handleOverlayClick() {
  if (props.closeOnOverlay) close()
}
</script>

<style scoped>
.common-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.common-modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  padding: 24px;
  min-width: 260px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  box-sizing: border-box;
}
.dark .common-modal {
  background: #1a1a1a;
  color: #fff;
}
.common-modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 18px;
  text-align: left;
}
.common-modal-body {
  font-size: 16px;
  color: #333;
  text-align: left;
}
.common-modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.2s;
}
.common-modal-close:hover {
  color: #333;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.2s;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>