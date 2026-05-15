<!--
  ServerlessCostAutoScaleDemo.vue
  Demo so sánh chi phí và độ co giãn của Serverless
-->
<template>
  <div class="serverless-demo">
    <div class="header">
      <div class="title">
        Serverless: trả phí theo nhu cầu + auto scale
      </div>
      <div class="subtitle">
        Điều chỉnh số lần gọi và thời gian, so sánh với chi phí server cố định
      </div>
    </div>

    <div class="controls">
      <div class="control">
        <label>
          Số request/ngày: <strong>{{ dailyRequests.toLocaleString() }}</strong>
        </label>
        <input
          v-model="dailyRequests"
          type="range"
          min="0"
          max="5000000"
          step="50000"
        >
      </div>
      <div class="control">
        <label>
          Thời gian xử lý trung bình: <strong>{{ durationMs }} ms</strong>
        </label>
        <input
          v-model="durationMs"
          type="range"
          min="20"
          max="800"
          step="10"
        >
      </div>
      <div class="control">
        <label>
          Concurrency đỉnh: <strong>{{ peakRps }}</strong> rps
        </label>
        <input
          v-model="peakRps"
          type="range"
          min="10"
          max="8000"
          step="50"
        >
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-title">
          Ước tính Serverless
        </div>
        <div class="card-value">
          ${{ serverlessCost }}
        </div>
        <div class="card-desc">
          Tính phí theo lượng dùng (minh họa)
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          Server cố định
        </div>
        <div class="card-value">
          ${{ serverCost }}
        </div>
        <div class="card-desc">
          Cần dự trữ {{ requiredServers }} server
        </div>
      </div>
    </div>

    <div class="autoscale">
      <div class="label">
        Trạng thái auto scale
      </div>
      <div class="scale-bar">
        <div
          class="scale"
          :style="{ width: scalePercent + '%' }"
        />
      </div>
      <div class="scale-text">
        {{ scaleHint }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dailyRequests = ref(1200000)
const durationMs = ref(120)
const peakRps = ref(800)

const serverlessCost = computed(() => {
  const perMillion = 0.25
  const requestCost = (dailyRequests.value / 1_000_000) * perMillion
  const computeCost =
    ((dailyRequests.value * durationMs.value) / 1_000_000_000) * 0.9
  return (requestCost + computeCost).toFixed(2)
})

const requiredServers = computed(() =>
  Math.max(1, Math.ceil(peakRps.value / 1000))
)
const serverCost = computed(() => (requiredServers.value * 8).toFixed(2))

const scalePercent = computed(() =>
  Math.min(100, Math.round((peakRps.value / 8000) * 100))
)

const scaleHint = computed(() => {
  if (peakRps.value < 500) return 'Traffic thấp: gần như không cần tài nguyên thường trực'
  if (peakRps.value < 2500) return 'Traffic vừa: auto scale tiết kiệm hơn'
  return 'Traffic cao: Serverless vẫn co giãn linh hoạt được'
})
</script>

<style scoped>
.serverless-demo {
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.control label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.control input[type='range'] {
  width: 100%;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.card-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.card-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.35rem 0 0.25rem;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.autoscale {
  margin-top: 1rem;
}

.autoscale .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.scale-bar {
  height: 10px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.scale {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.scale-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
