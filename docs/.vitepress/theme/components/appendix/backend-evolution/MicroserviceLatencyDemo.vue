<!--
  MicroserviceLatencyDemo.vue
  Demo độ trễ mạng tích lũy trong kiến trúc microservice
-->
<template>
  <div class="microservice-latency-demo">
    <div class="header">
      <div class="title">
        Độ trễ microservice: cái giá của lời gọi qua mạng
      </div>
      <div class="subtitle">
        Mỗi lần gọi giữa các dịch vụ đều thêm độ trễ mạng, tích lũy lại làm thời gian phản hồi tăng lên
      </div>
    </div>

    <div class="controls">
      <label>Số lần gọi giữa các dịch vụ: <strong>{{ callCount }}</strong></label>
      <input
        v-model="callCount"
        type="range"
        min="1"
        max="10"
        step="1"
      >

      <label>Độ trễ mạng: <strong>{{ networkLatency }} ms</strong></label>
      <input
        v-model="networkLatency"
        type="range"
        min="1"
        max="50"
        step="1"
      >
    </div>

    <div class="comparison">
      <div class="architecture monolith">
        <div class="arch-title">
          Kiến trúc monolith
        </div>
        <div class="arch-box">
          <div class="single-process">
            <div class="module">
              User
            </div>
            <div class="module">
              Order
            </div>
            <div class="module">
              Payment
            </div>
          </div>
        </div>
        <div class="latency">
          <div class="latency-value">
            {{ monolithLatency }} ms
          </div>
          <div class="latency-label">
            Gọi trong bộ nhớ (~0ms)
          </div>
        </div>
      </div>

      <div class="architecture microservices">
        <div class="arch-title">
          Kiến trúc microservice
        </div>
        <div class="arch-box">
          <div class="services">
            <div class="service">
              User Svc
            </div>
            <div
              v-if="callCount > 1"
              class="network-arrow"
            >
              ⇄ {{ networkLatency }}ms
            </div>
            <div class="service">
              Order Svc
            </div>
            <div
              v-if="callCount > 2"
              class="network-arrow"
            >
              ⇄ {{ networkLatency }}ms
            </div>
            <div class="service">
              Payment Svc
            </div>
          </div>
        </div>
        <div class="latency">
          <div class="latency-value high">
            {{ microLatency }} ms
          </div>
          <div class="latency-label">
            Tích lũy do gọi qua mạng
          </div>
        </div>
      </div>
    </div>

    <div class="insight">
      <div
        class="insight-icon"
        v-html="insightIcon"
      />
      <div class="insight-text">
        {{ insight }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const callCount = ref(3)
const networkLatency = ref(15)

const baseLatency = 10
const monolithLatency = computed(() => baseLatency)

const microLatency = computed(() =>
  Math.round(baseLatency + callCount.value * networkLatency.value * 2)
)

const insight = computed(() => {
  const ratio = Math.round(microLatency.value / monolithLatency.value)
  if (ratio <= 2) return 'Độ trễ của kiến trúc microservice còn chấp nhận được, nhưng chậm hơn monolith'
  if (ratio <= 5) return 'Càng tách nhiều dịch vụ, độ trễ mạng tích lũy càng rõ rệt'
  return 'Quá nhiều lời gọi giữa các dịch vụ sẽ khiến hiệu năng suy giảm nghiêm trọng!'
})

const insightIcon = computed(() => {
  const ratio = Math.round(microLatency.value / monolithLatency.value)
  if (ratio <= 2) return '✅'
  if (ratio <= 5) return '⚠️'
  return '🚨'
})
</script>

<style scoped>
.microservice-latency-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  margin-bottom: 1.5rem;
}

.controls label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.controls input[type='range'] {
  width: 100%;
  margin-bottom: 0.75rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.architecture {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.arch-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-align: center;
}

.arch-box {
  min-height: 120px;
}

.single-process {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #eff6ff;
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px dashed #93c5fd;
}

.module {
  background: #dbeafe;
  padding: 6px;
  border-radius: 3px;
  font-size: 0.85rem;
  text-align: center;
}

.services {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service {
  background: #fef3c7;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  text-align: center;
  border: 1px solid #fbbf24;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.network-arrow {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
}

.latency {
  margin-top: 1rem;
  text-align: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.latency-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.latency-value.high {
  color: #ef4444;
}

.latency-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.insight {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.insight-icon {
  font-size: 1.5rem;
}

.insight-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}
</style>
