<script setup>
import { computed } from 'vue'

const steps = [
  { name: 'Vào trang sản phẩm', count: 10000 },
  { name: 'Thêm vào giỏ hàng', count: 6000 },
  { name: 'Vào trang thanh toán', count: 4000 },
  { name: 'Hoàn tất thanh toán', count: 2500 }
]

const total = steps[0].count

function stepRate(i) {
  if (i === 0) return '100%'
  return ((steps[i].count / steps[i - 1].count) * 100).toFixed(1) + '%'
}

function overallRate(i) {
  return ((steps[i].count / total) * 100).toFixed(1) + '%'
}

function barWidth(i) {
  return Math.max(30, (steps[i].count / total) * 100) + '%'
}

const worstIdx = computed(() => {
  let min = 100
  let idx = 1
  for (let i = 1; i < steps.length; i++) {
    const r = (steps[i].count / steps[i - 1].count) * 100
    if (r < min) {
      min = r
      idx = i
    }
  }
  return idx
})

const overallConversion = computed(() =>
  ((steps[steps.length - 1].count / total) * 100).toFixed(1)
)
</script>

<template>
  <div class="funnel-demo">
    <div class="demo-header">
      <span class="icon">🔻</span>
      <span class="title">Demo phân tích funnel</span>
      <span class="subtitle">Tìm "điểm rò" trong chuỗi chuyển đổi</span>
    </div>

    <div class="intro-text">
      Hành trình người dùng từ lúc vào đến khi đạt mục tiêu là một quá trình sàng lọc dần. Mô hình funnel không chỉ nhìn tỉ lệ chuyển đổi cuối, mà cần tìm
      <span class="hl">chỗ rớt người</span>
      - tối ưu ở chỗ hẹp nhất thường mang lại lợi ích lớn nhất.
    </div>

    <div class="funnel-body">
      <div
        v-for="(step, i) in steps"
        :key="step.name"
        :class="['funnel-step', { worst: i === worstIdx }]"
        :style="{ width: barWidth(i) }"
      >
        <div class="step-top">
          <span class="step-name">{{ step.name }}</span>
          <span class="step-count">{{ step.count.toLocaleString() }} người</span>
        </div>
        <div class="step-bar"></div>
        <div class="step-rates">
          <span>Tỉ lệ tổng {{ overallRate(i) }}</span>
          <span v-if="i > 0" class="step-conv">
            Tỉ lệ giữa bước {{ stepRate(i) }}
          </span>
        </div>
      </div>
    </div>

    <div class="insights">
      <div class="insight-title">Nhận xét</div>
      <div class="insight-items">
        <div class="insight-item">
          Bước có tỉ lệ chuyển đổi thấp nhất:
          <strong>{{ steps[worstIdx].name }}</strong>
          ({{ stepRate(worstIdx) }})
        </div>
        <div class="insight-item">
          Tỉ lệ chuyển đổi tổng thể: <strong>{{ overallConversion }}%</strong>
        </div>
        <div class="insight-item">
          Đề xuất: ưu tiên tối ưu bước
          <strong>{{ steps[worstIdx].name }}</strong>
          , giảm friction trải nghiệm
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.funnel-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.demo-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.intro-text {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hl {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.funnel-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.funnel-step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.3s;
}

.funnel-step.worst {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.step-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.step-name {
  font-weight: 600;
  font-size: 13px;
}

.step-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.step-bar {
  height: 20px;
  background: linear-gradient(90deg, var(--vp-c-brand), #60a5fa);
  border-radius: 4px;
  margin-bottom: 6px;
}

.worst .step-bar {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.step-rates {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.step-conv {
  font-weight: 600;
}

.worst .step-conv {
  color: #ef4444;
}

.insights {
  padding: 16px 20px 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.insight-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.insight-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.insight-item {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .funnel-step {
    width: 100% !important;
  }
}
</style>
