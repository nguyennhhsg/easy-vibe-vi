<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="icon">⚙️</span>
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ description }}</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        Placeholder demo chính sách cache - chờ triển khai chi tiết tương tác
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Chính sách cache cân bằng hit rate và độ tươi của dữ liệu. TTL quá ngắn sẽ gây frequent origin fetch, quá dài thì nội dung bị cũ.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo chính sách cache')
const description = ref('Hiển thị cấu hình chính sách cache cho CDN và object storage: thời gian cache, cơ chế refresh...')
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
