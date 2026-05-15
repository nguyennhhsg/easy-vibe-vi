<!--
  SystemDesignStepsDemo.vue
  Demo các bước system design: minh hoạ quy trình chuẩn cho phỏng vấn/thực tế
-->
<template>
  <div class="design-steps-demo">
    <div class="header">
      <div class="title">Quy trình 4 bước system design</div>
      <div class="subtitle">Bấm vào từng bước để xem chi tiết</div>
    </div>

    <div class="steps">
      <div
        v-for="(step, i) in steps"
        :key="step.key"
        :class="['step-card', { active: activeStep === step.key }]"
        @click="activeStep = step.key"
      >
        <div class="step-number">{{ i + 1 }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-time">{{ step.time }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="checklist">
        <div v-for="(item, i) in current.checklist" :key="i" class="check-item">
          <span class="check-icon">✓</span>
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="detail-example">
        <span class="label">Ví dụ (thiết kế dịch vụ short link):</span>
        <div class="example-text">{{ current.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStep = ref('requirements')

const steps = [
  {
    key: 'requirements',
    name: 'Làm rõ yêu cầu',
    time: '~5 phút',
    desc: 'Đừng vội vẽ kiến trúc. Trước hết hãy hiểu rõ: hệ thống giải quyết vấn đề gì? Quy mô user bao nhiêu? Có những chức năng cốt lõi nào? Yêu cầu phi chức năng nào?',
    checklist: [
      'Có những chức năng cốt lõi nào (phạm vi MVP)?',
      'Quy mô user? Ước tính DAU/QPS',
      'Tỉ lệ đọc/ghi? Đọc nhiều hay ghi nhiều?',
      'Quy mô dữ liệu? Cần lưu bao nhiêu?',
      'Yêu cầu availability? Mấy số 9?',
      'Yêu cầu latency? P99 bao nhiêu ms?'
    ],
    example: 'Dịch vụ short link: tạo short link (ghi) + redirect (đọc), tỉ lệ đọc/ghi khoảng 100:1, trung bình 100 triệu lượt redirect/ngày, short link không hết hạn.'
  },
  {
    key: 'estimation',
    name: 'Ước lượng capacity',
    time: '~5 phút',
    desc: 'Dùng kiểu "back-of-the-envelope estimation" để ước tính nhanh các con số tài nguyên hệ thống cần, làm cơ sở cho quyết định kiến trúc sau này.',
    checklist: [
      'Ước tính QPS: request/ngày / 86400',
      'Ước tính storage: kích thước 1 bản ghi × tổng số',
      'Ước tính băng thông: QPS × kích thước response',
      'Ước tính cache: lượng dữ liệu nóng (thường 20% dữ liệu gánh 80% request)',
      'Ước tính đỉnh: QPS trung bình × peak factor (thường 2-5 lần)'
    ],
    example: '100 triệu/ngày ≈ 1200 QPS, đỉnh ≈ 3600 QPS. Mỗi short link 100 byte, 5 năm = 180 triệu bản ghi ≈ 18GB. Cache hot 20% ≈ 3.6GB, một Redis là đủ.'
  },
  {
    key: 'design',
    name: 'Thiết kế kiến trúc',
    time: '~15 phút',
    desc: 'Vẽ các thành phần cốt lõi và dòng dữ liệu. Bắt đầu phiên bản đơn giản nhất (đơn máy), rồi mở rộng dần theo yêu cầu (thêm cache, sharding, CDN...).',
    checklist: [
      'Thiết kế API: định nghĩa input/output các endpoint chính',
      'Data model: thiết kế cấu trúc bảng cốt lõi',
      'Thành phần cốt lõi: web service, database, cache, message queue',
      'Data flow: đường đi đầy đủ của request từ user đến database',
      'Tách đọc/ghi: cân nhắc đường đọc và đường ghi riêng'
    ],
    example: 'Đường ghi: client → API → tạo short code (Base62) → ghi vào MySQL + Redis. Đường đọc: client → CDN → API → query Redis → redirect 302.'
  },
  {
    key: 'deep-dive',
    name: 'Tối ưu sâu',
    time: '~10 phút',
    desc: 'Bàn sâu vào các nút thắt và vấn đề then chốt của hệ thống. Đây là lúc thể hiện chiều sâu kỹ thuật.',
    checklist: [
      'Làm sao đảm bảo short code là duy nhất (xử lý hash collision)?',
      'Làm sao chống hot key (cache, CDN)?',
      'Làm sao scale ngang (chiến lược sharding)?',
      'Làm sao đảm bảo HA (active-standby, multi-AZ)?',
      'Làm sao giám sát và cảnh báo (các chỉ số quan trọng)?',
      'Bảo mật như nào (chống spam, phát hiện link độc)?'
    ],
    example: 'Tạo short code: dùng bộ sinh ID distributed (Snowflake) + Base62 encoding để tránh hash collision. Short link hot dùng cache đa tầng (local cache + Redis + CDN).'
  }
]

const current = computed(() => steps.find(s => s.key === activeStep.value))
</script>

<style scoped>
.design-steps-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
}
.step-card {
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.step-card:hover { border-color: var(--vp-c-brand); }
.step-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.step-number {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vp-c-brand);
}
.step-name { font-weight: 600; font-size: 0.85rem; }
.step-time {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}
.check-item {
  font-size: 0.8rem;
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}
.check-icon {
  color: var(--vp-c-brand);
  font-weight: 700;
  flex-shrink: 0;
}
.detail-example {
  font-size: 0.82rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.example-text {
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
