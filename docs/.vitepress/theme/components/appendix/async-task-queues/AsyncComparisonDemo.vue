<!--
  AsyncComparisonDemo.vue
  Demo so sánh các framework async task
-->
<template>
  <div class="comparison-demo">
    <div class="header">
      <div class="title">So sánh các framework async task phổ biến</div>
      <div class="subtitle">Nhấn vào để xem chi tiết từng framework</div>
    </div>

    <div class="framework-grid">
      <div
        v-for="fw in frameworks"
        :key="fw.name"
        :class="['fw-card', { active: selected === fw.name }]"
        @click="selected = fw.name"
      >
        <div class="fw-name">{{ fw.name }}</div>
        <div class="fw-lang">{{ fw.lang }}</div>
        <div class="fw-stars">
          <span v-for="n in 5" :key="n" :class="n <= fw.rating ? 'star-filled' : 'star-empty'">★</span>
        </div>
      </div>
    </div>

    <div v-if="currentFw" class="detail-panel">
      <div class="detail-header">
        <span class="detail-name">{{ currentFw.name }}</span>
        <span class="detail-lang-tag">{{ currentFw.lang }}</span>
      </div>
      <div class="detail-desc">{{ currentFw.desc }}</div>
      <div class="detail-features">
        <div class="feature-title">Đặc tính cốt lõi:</div>
        <div class="feature-list">
          <span v-for="f in currentFw.features" :key="f" class="feature-tag">{{ f }}</span>
        </div>
      </div>
      <div class="detail-usecase">
        <div class="usecase-title">Use case tiêu biểu:</div>
        <div class="usecase-text">{{ currentFw.usecase }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('Celery')

const frameworks = [
  {
    name: 'Celery',
    lang: 'Python',
    rating: 5,
    desc: 'Distributed task queue phổ biến nhất trong hệ sinh thái Python, hỗ trợ nhiều message broker (RabbitMQ, Redis), tính năng đầy đủ và community sôi nổi.',
    features: ['Scheduled task', 'Task chain', 'Lưu kết quả', 'Auto retry', 'Priority queue', 'Task routing'],
    usecase: 'Pipeline xử lý dữ liệu, gửi email, tạo báo cáo, task training machine learning'
  },
  {
    name: 'Sidekiq',
    lang: 'Ruby',
    rating: 5,
    desc: 'Background task processor hiệu năng cao trong hệ sinh thái Ruby, dựa trên Redis, dùng mô hình đa luồng, tiết kiệm RAM cực tốt.',
    features: ['Đa luồng', 'Web UI', 'Scheduled task', 'Xử lý batch', 'Rate limit', 'Task unique'],
    usecase: 'Email, thông báo, import/export dữ liệu cho ứng dụng Rails'
  },
  {
    name: 'Bull',
    lang: 'Node.js',
    rating: 4,
    desc: 'Thư viện task queue trưởng thành nhất trong hệ sinh thái Node.js, dựa trên Redis, hỗ trợ priority, delayed task, repeat task. BullMQ là phiên bản kế tiếp.',
    features: ['Priority', 'Delayed task', 'Rate limit', 'Kiểm soát concurrency', 'Event-driven', 'Dashboard'],
    usecase: 'Xử lý background API, chuyển đổi file, task crawler, push thông báo'
  },
  {
    name: 'RQ',
    lang: 'Python',
    rating: 3,
    desc: 'Task queue Python nhẹ, dựa trên Redis, API đơn giản dễ dùng. Phù hợp dự án vừa và nhỏ không cần đủ tính năng của Celery.',
    features: ['API đơn giản', 'Phụ thuộc task', 'Quản lý worker', 'Retry khi thất bại', 'Dashboard'],
    usecase: 'Xử lý task background cho ứng dụng web vừa và nhỏ'
  },
  {
    name: 'Kafka Streams',
    lang: 'Java/JVM',
    rating: 4,
    desc: 'Framework stream processing dựa trên Kafka, phù hợp use case xử lý dữ liệu realtime throughput cao, hỗ trợ phân tán và fault tolerance bẩm sinh.',
    features: ['Stream processing', 'Exactly-once semantics', 'Lưu trữ state', 'Thao tác window', 'Throughput cao', 'Fault tolerance'],
    usecase: 'Pipeline dữ liệu realtime, kiến trúc event-driven, gom phân tích log'
  }
]

const currentFw = computed(() => frameworks.find(f => f.name === selected.value))
</script>

<style scoped>
.comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.framework-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem; margin-bottom: 1rem;
}
.fw-card {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center;
  transition: all 0.2s;
}
.fw-card:hover { border-color: var(--vp-c-brand); }
.fw-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.fw-name { font-weight: 700; font-size: 0.95rem; }
.fw-lang { font-size: 0.8rem; color: var(--vp-c-text-2); margin: 0.25rem 0; }
.fw-stars { font-size: 0.85rem; }
.star-filled { color: #f59e0b; }
.star-empty { color: var(--vp-c-divider); }
.detail-panel {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.detail-name { font-weight: 700; font-size: 1rem; }
.detail-lang-tag {
  padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: rgba(var(--vp-c-brand-rgb), 0.1); color: var(--vp-c-brand);
}
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.feature-title, .usecase-title { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem; }
.feature-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.feature-tag {
  padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
}
.usecase-text { font-size: 0.85rem; color: var(--vp-c-text-2); }
</style>
