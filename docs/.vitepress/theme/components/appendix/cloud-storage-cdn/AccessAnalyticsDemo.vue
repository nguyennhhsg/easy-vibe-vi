<template>
  <div class="access-analytics-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">Phân tích truy cập</span>
      <span class="subtitle">Hiểu thống kê truy cập CDN và phân tích log</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        Placeholder demo phân tích truy cập - chờ triển khai chi tiết tương tác
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Qua phân tích log bạn biết được ai đã truy cập tài nguyên gì vào lúc nào, giúp phát hiện pattern truy cập bất thường và sự cố bảo mật.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo phân tích truy cập')
const description = ref('Hiển thị thống kê truy cập CDN và object storage: traffic, băng thông, điểm nóng truy cập...')
</script>

<style scoped>
.access-analytics-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 1rem;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
