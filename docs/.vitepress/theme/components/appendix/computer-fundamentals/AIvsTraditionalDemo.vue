<template>
  <div class="ai-vs-traditional-demo">
    <div class="demo-header">
      <span class="title">Kỹ sư AI vs Kỹ sư truyền thống</span>
      <span class="subtitle">Sự khác biệt trong phương pháp làm việc</span>
    </div>

    <div class="comparison-container">
      <div class="comparison-column traditional">
        <div class="column-header">Kỹ sư truyền thống</div>
        <div class="work-flow">
          <div v-for="(step, index) in traditionalSteps" :key="index" class="flow-step">
            <span class="step-num">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
        <div class="column-stats">
          <div class="stat-item">
            <span class="stat-label">Tỷ lệ thời gian viết code</span>
            <span class="stat-value">60-70%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Tỷ lệ thời gian suy nghĩ</span>
            <span class="stat-value">30-40%</span>
          </div>
        </div>
      </div>

      <div class="vs-divider">
        <span class="vs-text">VS</span>
      </div>

      <div class="comparison-column ai">
        <div class="column-header">Kỹ sư AI</div>
        <div class="work-flow">
          <div v-for="(step, index) in aiSteps" :key="index" class="flow-step">
            <span class="step-num">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
        <div class="column-stats">
          <div class="stat-item">
            <span class="stat-label">Tỷ lệ thời gian viết code</span>
            <span class="stat-value">20-30%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Tỷ lệ thời gian suy nghĩ</span>
            <span class="stat-value">70-80%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="skill-shift">
      <div class="shift-title">Sự dịch chuyển trọng tâm năng lực</div>
      <div class="shift-grid">
        <div v-for="item in skillShift" :key="item.from" class="shift-item">
          <div class="shift-from">
            <span class="arrow">↓</span>
            <span class="text">{{ item.from }}</span>
            <span class="trend down">Giảm tầm quan trọng</span>
          </div>
          <div class="shift-to">
            <span class="arrow">↑</span>
            <span class="text">{{ item.to }}</span>
            <span class="trend up">Tăng tầm quan trọng</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Năng lực cạnh tranh cốt lõi trong thời đại AI:</strong> không phải là "biết viết code", mà là "biết mô tả yêu cầu, biết đánh giá đúng sai, biết thiết kế giải pháp". AI là trợ lý lập trình của bạn, nhưng người ra quyết định luôn là bạn.
    </div>
  </div>
</template>

<script setup>
const traditionalSteps = [
  'Hiểu yêu cầu',
  'Tra cứu tài liệu, học cú pháp',
  'Tự tay viết code',
  'Debug và sửa Bug',
  'Tối ưu hiệu năng code',
  'Viết test case'
]

const aiSteps = [
  'Hiểu yêu cầu',
  'Mô tả bằng ngôn ngữ tự nhiên cho AI',
  'Rà soát code AI sinh ra',
  'Đánh giá có đúng kỳ vọng không',
  'Điều chỉnh yêu cầu và sinh lại',
  'Tích hợp vào dự án'
]

const skillShift = [
  { from: 'Ghi nhớ cú pháp', to: 'Năng lực mô tả yêu cầu' },
  { from: 'Tốc độ tự viết code', to: 'Năng lực rà soát code' },
  { from: 'Khả năng tra cứu tài liệu', to: 'Năng lực thiết kế kiến trúc' },
  { from: 'Kỹ năng debug', to: 'Năng lực xác định vấn đề' }
]
</script>

<style scoped>
.ai-vs-traditional-demo {
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

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.comparison-column {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.column-header {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.work-flow {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 600;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.traditional .step-num {
  background: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}

.ai .step-num {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.step-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.column-stats {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.stat-value {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
}

.skill-shift {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.shift-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.shift-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.shift-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.shift-from,
.shift-to {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.arrow {
  font-size: 0.78rem;
  font-weight: 700;
}

.shift-from .arrow {
  color: var(--vp-c-danger-1);
}

.shift-to .arrow {
  color: var(--vp-c-green-1);
}

.text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.trend {
  font-size: 0.62rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  margin-left: auto;
}

.trend.down {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.trend.up {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
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
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    padding: 0.35rem 0;
  }

  .shift-grid {
    grid-template-columns: 1fr;
  }
}
</style>
