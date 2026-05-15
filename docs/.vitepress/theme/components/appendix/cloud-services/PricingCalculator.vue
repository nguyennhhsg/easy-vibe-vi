<template>
  <div class="pricing-calculator">
    <div class="config-section">
      <div class="config-row">
        <span class="label">Instance spec</span>
        <select v-model="config.spec">
          <option value="small">
            1 core 2G (entry)
          </option>
          <option value="medium">
            2 core 4G (standard)
          </option>
          <option value="large">
            4 core 8G (high-performance)
          </option>
        </select>
      </div>
      <div class="config-row">
        <span class="label">Thời gian chạy</span>
        <input
          v-model.number="config.hours"
          type="range"
          min="1"
          max="24"
        >
        <span class="value">{{ config.hours }} giờ/ngày</span>
      </div>
      <div class="config-row">
        <span class="label">Số ngày chạy</span>
        <input
          v-model.number="config.days"
          type="range"
          min="1"
          max="31"
        >
        <span class="value">{{ config.days }} ngày/tháng</span>
      </div>
    </div>

    <div class="result-section">
      <div class="result-header">
        So sánh chi phí hàng tháng
      </div>
      <div class="result-cards">
        <div class="result-card">
          <div class="model">
            On-demand
          </div>
          <div class="price">
            ${{ costs.ondemand }}/tháng
          </div>
        </div>
        <div class="result-card recommended">
          <div class="model">
            Reserved Instance
          </div>
          <div class="price">
            ${{ costs.reserved }}/tháng
          </div>
          <div class="saving">
            Tiết kiệm {{ savings }}%
          </div>
        </div>
        <div class="result-card">
          <div class="model">
            Spot
          </div>
          <div class="price">
            ${{ costs.spot }}/tháng
          </div>
        </div>
      </div>
    </div>

    <div class="tip-box">
      <span class="tip-icon">💡</span>
      <span class="tip-text">{{ recommendation }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = ref({
  spec: 'medium',
  hours: 12,
  days: 22
})

const specPrices = {
  small: { ondemand: 0.08, reserved: 45, spot: 0.024 },
  medium: { ondemand: 0.16, reserved: 89, spot: 0.048 },
  large: { ondemand: 0.32, reserved: 179, spot: 0.096 }
}

const costs = computed(() => {
  const price = specPrices[config.value.spec]
  const monthlyHours = config.value.hours * config.value.days

  return {
    ondemand: Math.round(price.ondemand * monthlyHours),
    reserved: price.reserved,
    spot: Math.round(price.spot * monthlyHours)
  }
})

const savings = computed(() => {
  const save = costs.value.ondemand - costs.value.reserved
  return Math.round((save / costs.value.ondemand) * 100)
})

const recommendation = computed(() => {
  if (config.value.days < 15) {
    return 'Tần suất sử dụng thấp, nên chọn on-demand'
  } else if (savings.value > 30) {
    return `Workload ổn định, chuyển sang Reserved Instance tiết kiệm ${savings.value}%`
  } else {
    return 'Theo cấu hình hiện tại, Reserved Instance có lợi thế chi phí hơn'
  }
})
</script>

<style scoped>
.pricing-calculator {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: var(--vp-c-bg-soft);
}

.config-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.config-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.config-row:last-child {
  margin-bottom: 0;
}

.config-row .label {
  width: 70px;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.config-row select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.85rem;
}

.config-row input[type="range"] {
  flex: 1;
  min-width: 80px;
}

.config-row .value {
  width: 85px;
  text-align: right;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.result-header {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.result-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.result-card.recommended {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.result-card .model {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.result-card .price {
  font-size: 1.1rem;
  font-weight: 600;
}

.result-card .saving {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  margin-top: 0.25rem;
}

.tip-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
}

.tip-icon {
  font-size: 1rem;
}

.tip-text {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .result-cards {
    grid-template-columns: 1fr;
  }

  .config-row {
    flex-wrap: wrap;
  }

  .config-row .label {
    width: 100%;
  }

  .config-row .value {
    width: auto;
  }
}
</style>
