<template>
<!-- 
 核心功能：
    1. 显示、隐藏控制
    2. 组定义标题、内容、底部按钮（基于插槽 slot 完全自定义内容）
    3. 事件：关闭、取消、确认
    4. 点击遮罩层 关闭模态框


增强用户体验的：
    1. 显示时禁止背景滚动


-->
  <div 
    v-if="visible" 
    class="modal-overlay modal-overlay--enter"
    @click.self="handleOverlayClick"
  >
    <div 
      class="modal-container"
     
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`modal-title-${id}`"
    >
      <!-- 头部区域 -->
      <div class="modal-header" v-if="showHeader || title">
        <h3 
          class="modal-title" 
          :id="`modal-title-${id}`"
          v-if="title"
        >
          {{ title }}
        </h3>
        <button 
          class="modal-close" 
          v-if="closable"
          @click="handleClose"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div class="modal-body">
        <slot>默认模态框内容</slot>
      </div>
      
      <!-- TODO:slot用法？ -->
      <!-- 底部区域 -->  
      <div class="modal-footer" v-if="showFooter || $slots.footer">
        <slot name="footer">
          <button 
            class="modal-btn modal-btn--cancel" 
            @click="handleCancel"
          >
            取消
          </button>
          <button 
            class="modal-btn modal-btn--primary" 
            @click="handleConfirm"
          >
            确认
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

// 定义 props
const props = defineProps({
  // 控制模态框显示/隐藏
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  // 是否显示头部
  showHeader: {
    type: Boolean,
    default: true
  },
  // 是否显示底部
  showFooter: {
    type: Boolean,
    default: true
  },
  // 是否可关闭
  closable: {
    type: Boolean,
    default: true
  },
  // 点击遮罩层是否关闭
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  // 动画持续时间(ms)
  animationDuration: {
    type: Number,
    // default: 300
    default: 30000
  },
  // 唯一标识，用于无障碍访问
  id: {
    type: String,
    default: () => `modal-${Date.now()}`
  }
});

// 定义 emits
const emit = defineEmits(['close', 'cancel', 'confirm', 'update:visible']);

// 处理ESC键关闭
function handleKeydown(e) {
    console.log('esc', e)
  if (e.key === 'Escape' && props.visible && props.closable) {
    console.log('关闭')
    handleClose();
  }
}

// 点击关闭按钮
function handleClose() {
  if(props.visible){
    console.log('close')
    emit('close');
    emit('update:visible', false);
  }
}

// 点击取消按钮
function handleCancel() {
  emit('cancel');
  handleClose();
}

// 点击确认按钮
function handleConfirm() {
  emit('confirm');
  handleClose();
}

// 点击遮罩层
function handleOverlayClick() {
  if (props.closeOnOverlayClick) {
    handleClose();
  }
}

// 监听visible变化，控制动画
watch(
  () => props.visible,
  (newVal, oldVal) => {
    console.log('watch ', newVal, oldVal)
    if (newVal && !oldVal) {
     
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else if (!newVal && oldVal) {
      // 恢复背景滚动
      document.body.style.overflow = '';
    }
  }
);

// 挂载时添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

// 卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* 遮罩层样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity v-bind(animationDuration)ms ease;
}

/* 进入动画 */
.modal-overlay--enter {
  opacity: 1;
}

/* 离开动画 */
.modal-overlay--leave {
  opacity: 0;
}

/* 模态框容器 */
.modal-container {
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  /* transform: translateY(-20px); */
  transition: transform v-bind(animationDuration)ms ease;
}


/* 头部样式 */
.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* 关闭按钮 */
.modal-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: #f5f5f5;
  color: #333;
}

/* 内容区域 */
.modal-body {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

/* 底部区域 */
.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 按钮样式 */
.modal-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.modal-btn--cancel {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
}

.modal-btn--cancel:hover {
  background-color: #e9e9e9;
}

.modal-btn--primary {
  background-color: #409eff;
  border: 1px solid #409eff;
  color: white;
}

.modal-btn--primary:hover {
  background-color: #66b1ff;
}
</style>
