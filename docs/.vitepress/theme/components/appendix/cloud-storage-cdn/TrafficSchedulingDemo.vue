<template>
  <div class="traffic-scheduling-demo">
    <div class="demo-header">
      <span class="icon">🚦</span>
      <span class="title">Điều phối traffic</span>
      <span class="subtitle">Hiểu cơ chế điều phối thông minh và load balancing của CDN</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        Placeholder demo điều phối traffic - chờ triển khai chi tiết tương tác
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Điều phối thông minh kết hợp truy cập gần nhất, load balancing và failover để đạt tốc độ toàn cầu và tính sẵn sàng cao.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo điều phối traffic')
const description = ref('Hiển thị cơ chế điều phối traffic thông minh của CDN: load balancing, truy cập gần nhất, failover...')
</script>

<style scoped>
.traffic-scheduling-demo {
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
  margin-top:  0.75rem;
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
