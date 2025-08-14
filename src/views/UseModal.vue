<template>
  <div>
    <button @click="showModal = true">打开模态框</button>
    
    <Modal 
      v-model:visible="showModal"
      title="示例模态框"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    >
      <p>这是模态框的内容区域</p>
      <p>可以放入任何自定义内容</p>
      
      <!-- 可选：自定义底部按钮 -->
      <template #footer>
        <button class="modal-btn modal-btn--cancel" @click="showModal = false">
          再想想
        </button>
        <button class="modal-btn modal-btn--primary" @click="handleConfirm">
          确定执行
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const showModal = ref(false);

const handleConfirm = () => {
  console.log('用户点击了确认');
  showModal.value = false;
};

const handleCancel = () => {
  console.log('用户点击了取消');
};

const handleClose = ()=>{
    showModal.value = false
}
</script>