<template>
  <div class="backend-demo">
    <div class="demo-header">
      <span class="title">Khái niệm cốt lõi của backend</span>
      <span class="subtitle">Trách nhiệm chính của phía máy chủ</span>
    </div>

    <div class="core-grid">
      <div v-for="core in coreConcepts" :key="core.name" class="core-card">
        <div class="core-name">{{ core.name }}</div>
        <div class="core-desc">{{ core.desc }}</div>
        <div class="core-examples">
          <span v-for="ex in core.examples" :key="ex" class="example-tag">{{ ex }}</span>
        </div>
      </div>
    </div>

    <div class="flow-section">
      <div class="flow-title">Luồng xử lý yêu cầu</div>
      <div class="flow-steps">
        <span v-for="(step, i) in flowSteps" :key="step">
          <span class="flow-step">{{ step }}</span>
          <span v-if="i < flowSteps.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
    </div>

    <div class="info-box">
      <strong>Giá trị cốt lõi của backend:</strong> không phải là viết code, mà là thiết kế hệ thống. Làm cho hệ thống ổn định, an toàn, hiệu quả và có thể mở rộng mới chính là năng lực thật sự của một kỹ sư backend.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const coreConcepts = ref([
  { name: 'Thiết kế API', desc: 'Định nghĩa cách client tương tác với server', examples: ['RESTful', 'GraphQL'] },
  { name: 'Logic nghiệp vụ', desc: 'Xử lý các quy tắc và quy trình kinh doanh cốt lõi', examples: ['Xử lý đơn hàng', 'Quy trình thanh toán'] },
  { name: 'Lưu trữ dữ liệu', desc: 'Lưu trữ và truy vấn dữ liệu lâu dài', examples: ['MySQL', 'Redis'] },
  { name: 'Xác thực và phân quyền', desc: 'Xác thực danh tính người dùng và kiểm soát quyền hạn', examples: ['JWT', 'OAuth'] },
  { name: 'Tối ưu hiệu năng', desc: 'Cache, bất đồng bộ, xử lý song song', examples: ['Cache', 'Hàng đợi tin nhắn'] },
  { name: 'Bảo mật', desc: 'Phòng chống tấn công và rò rỉ dữ liệu', examples: ['Chống SQL injection', 'HTTPS'] }
])

const flowSteps = ref(['Nhận yêu cầu', 'Phân tích route', 'Xử lý nghiệp vụ', 'Thao tác dữ liệu', 'Trả phản hồi'])
</script>

<style scoped>
.backend-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.core-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.core-card {
  padding: 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.core-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.core-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}

.core-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.example-tag {
  font-size: 0.65rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.flow-section {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.flow-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
}

.flow-step {
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .core-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
