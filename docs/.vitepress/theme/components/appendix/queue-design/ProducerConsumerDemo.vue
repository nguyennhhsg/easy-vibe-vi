<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>{{ title }}</h4>
      <p class="hint">
        {{ description }}
      </p>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        Placeholder demo pattern producer-consumer - chờ triển khai tương tác cụ thể
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo pattern producer-consumer')
const description = ref('Trình bày cách producer đẩy message vào queue và cách consumer lấy message từ queue ra để xử lý')
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
