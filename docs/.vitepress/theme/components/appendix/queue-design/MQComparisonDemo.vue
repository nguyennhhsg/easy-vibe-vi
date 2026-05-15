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
        Placeholder demo so sánh message queue - chờ triển khai tương tác cụ thể
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo so sánh message queue')
const description = ref('So sánh các sản phẩm message queue phổ biến (RabbitMQ, Kafka, RocketMQ...) về đặc tính, use case phù hợp và khác biệt hiệu năng')
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
