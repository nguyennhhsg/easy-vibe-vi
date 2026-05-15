<!--
  CgiQueueDemo.vue
  Demo hàng đợi và thời gian phản hồi thời máy chủ vật lý/CGI
-->
<template>
  <div class="cgi-demo">
    <div class="panel">
      <div class="panel-header">
        <div class="title">
          Xử lý tuần tự CGI: hiệu ứng xếp hàng
        </div>
        <div class="subtitle">
          Càng nhiều request, phản hồi càng chậm
        </div>
      </div>

      <div class="controls">
        <label>
          Người dùng đồng thời: <strong>{{ concurrentUsers }}</strong>
        </label>
        <input
          v-model="concurrentUsers"
          type="range"
          min="1"
          max="200"
          step="1"
        >

        <div class="toggles">
          <label class="toggle">
            <input
              v-model="staticCache"
              type="checkbox"
            >
            Bật cache tĩnh (giảm chi phí script)
          </label>
          <button
            class="burst"
            @click="simulateBurst"
          >
            Mô phỏng flash sale
          </button>
        </div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="label">
            Thời gian phản hồi trung bình
          </div>
          <div class="value">
            {{ avgResponse }} ms
          </div>
          <div class="meter">
            <div
              class="bar"
              :style="{ width: responseBar + '%' }"
            />
          </div>
        </div>
        <div class="stat">
          <div class="label">
            Số request đang xếp hàng
          </div>
          <div class="value">
            {{ queueLength }}
          </div>
          <div class="meter">
            <div
              class="bar warn"
              :style="{ width: queueBar + '%' }"
            />
          </div>
        </div>
      </div>

      <div class="note">
        <span
          class="dot"
          :class="statusClass"
        />
        <span>{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const concurrentUsers = ref(24)
const staticCache = ref(false)

const baseLatency = computed(() => (staticCache.value ? 40 : 80))
const perRequestCost = computed(() => (staticCache.value ? 25 : 60))

const avgResponse = computed(() =>
  Math.round(
    baseLatency.value + (concurrentUsers.value - 1) * perRequestCost.value
  )
)

const queueLength = computed(() => Math.max(0, concurrentUsers.value - 1))

const responseBar = computed(() =>
  Math.min(100, Math.round(avgResponse.value / 25))
)
const queueBar = computed(() =>
  Math.min(100, Math.round((queueLength.value / 200) * 100))
)

const statusClass = computed(() => {
  if (avgResponse.value < 800) return 'ok'
  if (avgResponse.value < 3000) return 'warn'
  return 'danger'
})

const statusText = computed(() => {
  if (avgResponse.value < 800) return 'Hệ thống vẫn chịu được, nhưng đã có xếp hàng'
  if (avgResponse.value < 3000) return 'Phản hồi chậm, người dùng bắt đầu phàn nàn'
  return 'Xếp hàng quá tải, website gần như không khả dụng'
})

const simulateBurst = () => {
  const original = concurrentUsers.value
  concurrentUsers.value = 160
  setTimeout(() => {
    concurrentUsers.value = original
  }, 800)
}
</script>

<style scoped>
.cgi-demo {
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.panel {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.controls label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.controls input[type='range'] {
  width: 100%;
}

.toggles {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.toggle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.burst {
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.stat .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stat .value {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
}

.meter {
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
}

.bar.warn {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
}

.dot.warn {
  background: #f59e0b;
}

.dot.danger {
  background: #ef4444;
}

@media (max-width: 720px) {
  .toggles {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
