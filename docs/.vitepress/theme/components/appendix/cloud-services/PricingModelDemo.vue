<template>
  <div class="pricing-model-demo">
    <div class="demo-header">
      <h4>Trình tính chi phí mô hình giá Cloud Server</h4>
      <p class="demo-desc">
        Nhập use case của bạn, so sánh chi phí giữa các mô hình giá khác nhau
      </p>
    </div>

    <div class="calculator-inputs">
      <div class="input-section">
        <h5>Cấu hình cơ bản</h5>
        <div class="input-grid">
          <div class="input-group">
            <label>Instance spec</label>
            <select v-model="config.instanceType">
              <option
                v-for="type in instanceTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label>Số lượng</label>
            <input
              v-model.number="config.quantity"
              type="number"
              min="1"
              max="100"
            >
          </div>
        </div>
      </div>

      <div class="input-section">
        <h5>Pattern sử dụng</h5>
        <div class="input-grid">
          <div class="input-group">
            <label>Số giờ chạy mỗi ngày</label>
            <input
              v-model.number="config.dailyHours"
              type="range"
              min="1"
              max="24"
            >
            <span class="range-value">{{ config.dailyHours }} giờ</span>
          </div>
          <div class="input-group">
            <label>Số ngày chạy mỗi tháng</label>
            <input
              v-model.number="config.monthlyDays"
              type="range"
              min="1"
              max="31"
            >
            <span class="range-value">{{ config.monthlyDays }} ngày</span>
          </div>
        </div>
      </div>

      <div class="input-section">
        <h5>Mô hình giá mong muốn</h5>
        <div class="billing-options">
          <label
            v-for="option in billingOptions"
            :key="option.value"
            class="option-card"
            :class="{ active: config.billingType === option.value }"
          >
            <input
              v-model="config.billingType"
              type="radio"
              :value="option.value"
            >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-name">{{ option.label }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="cost-comparison">
      <h5>Phân tích so sánh chi phí</h5>
      <div class="comparison-chart">
        <div
          v-for="model in costComparison"
          :key="model.type"
          class="chart-bar"
          :class="{ recommended: model.recommended }"
        >
          <div class="bar-label">
            {{ model.label }}
          </div>
          <div class="bar-visual">
            <div
              class="bar-fill"
              :style="{ height: model.percentage + '%' }"
              :class="model.type"
            />
          </div>
          <div class="bar-value">
            <span class="amount">{{ model.cost }}</span>
            <span
              v-if="model.savings"
              class="savings"
            >Tiết kiệm {{ model.savings }}</span>
          </div>
          <div
            v-if="model.recommended"
            class="recommend-badge"
          >
            Đề xuất
          </div>
        </div>
      </div>
    </div>

    <div class="recommendation-panel">
      <div class="rec-header">
        <span class="rec-icon">💡</span>
        <span class="rec-title">Đề xuất tối ưu</span>
      </div>
      <div class="rec-content">
        <div
          v-for="(tip, index) in optimizationTips"
          :key="index"
          class="tip-item"
        >
          <span class="tip-num">{{ index + 1 }}</span>
          <span class="tip-text">{{ tip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = ref({
  instanceType: 'medium',
  quantity: 2,
  dailyHours: 12,
  monthlyDays: 22,
  billingType: 'ondemand'
})

const instanceTypes = [
  { value: 'small', label: 'Small (2 core 4G)' },
  { value: 'medium', label: 'Medium (4 core 8G)' },
  { value: 'large', label: 'Large (8 core 16G)' },
  { value: 'xlarge', label: 'XLarge (16 core 32G)' }
]

const billingOptions = [
  { value: 'ondemand', label: 'On-demand', icon: '⚡', desc: 'Tính phí theo thời gian dùng thực tế, linh hoạt nhất' },
  { value: 'reserved', label: 'Reserved Instance', icon: '📅', desc: 'Trả trước để có đơn giá thấp hơn, phù hợp workload ổn định dài hạn' },
  { value: 'spot', label: 'Spot', icon: '💰', desc: 'Dùng tài nguyên nhàn rỗi, giá cực thấp nhưng có thể bị thu hồi' }
]

const hourlyRates = {
  small: { ondemand: 0.05, reserved: 0.03, spot: 0.015 },
  medium: { ondemand: 0.10, reserved: 0.06, spot: 0.03 },
  large: { ondemand: 0.20, reserved: 0.12, spot: 0.06 },
  xlarge: { ondemand: 0.40, reserved: 0.24, spot: 0.12 }
}

const costComparison = computed(() => {
  const rate = hourlyRates[config.value.instanceType]
  const monthlyHours = config.value.dailyHours * config.value.monthlyDays * config.value.quantity

  const costs = [
    { type: 'ondemand', label: 'On-demand', rate: rate.ondemand },
    { type: 'reserved', label: 'Reserved Instance', rate: rate.reserved },
    { type: 'spot', label: 'Spot', rate: rate.spot }
  ]

  const maxCost = Math.max(...costs.map(c => c.rate * monthlyHours))

  return costs.map(c => {
    const cost = c.rate * monthlyHours
    const percentage = (cost / maxCost) * 100
    const isRecommended = c.type === config.value.billingType
    const savings = c.type === 'ondemand' ? null :
      Math.round(((rate.ondemand - c.rate) / rate.ondemand) * 100) + '%'

    return {
      type: c.type,
      label: c.label,
      cost: '$' + cost.toFixed(2) + '/tháng',
      percentage,
      recommended: isRecommended,
      savings
    }
  })
})

const optimizationTips = computed(() => {
  const tips = []

  if (config.value.dailyHours < 8) {
    tips.push('Số giờ chạy mỗi ngày ít, cân nhắc dùng Spot Instance để giảm chi phí')
  }

  if (config.value.monthlyDays > 25) {
    tips.push('Số ngày chạy gần cả tháng, Reserved Instance tiết kiệm 30-60% chi phí')
  }

  if (config.value.quantity > 5) {
    tips.push('Số lượng instance lớn, nên kết hợp Reserved Instance và On-demand')
  }

  if (config.value.billingType === 'ondemand' && config.value.monthlyDays > 20) {
    tips.push('Đang dùng On-demand nhưng workload ổn định, chuyển sang Reserved Instance sẽ giảm chi phí đáng kể')
  }

  if (tips.length === 0) {
    tips.push('Cấu hình hiện tại khá hợp lý, nên theo dõi mức sử dụng thực tế định kỳ để tối ưu')
  }

  return tips
})
</script>

<style scoped>
/* Add styles here */
</style>
