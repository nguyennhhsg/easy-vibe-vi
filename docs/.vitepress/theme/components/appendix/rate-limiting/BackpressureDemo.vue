<!--
  BackpressureDemo.vue
  Demo backpressure: cách xử lý khi producer nhanh hơn consumer
-->
<template>
  <div class="backpressure-demo">
    <div class="header">
      <div class="title">Backpressure</div>
      <div class="subtitle">Điều gì xảy ra khi tốc độ sản xuất vượt tốc độ tiêu thụ?</div>
    </div>

    <div class="controls">
      <div class="speed-control">
        <span class="ctrl-label">Tốc độ sản xuất:</span>
        <input type="range" min="1" max="10" v-model.number="produceRate" />
        <span class="ctrl-value">{{ produceRate }}/s</span>
      </div>
      <div class="speed-control">
        <span class="ctrl-label">Tốc độ tiêu thụ:</span>
        <input type="range" min="1" max="10" v-model.number="consumeRate" />
        <span class="ctrl-value">{{ consumeRate }}/s</span>
      </div>
      <div class="btn-group">
        <button class="ctrl-btn primary" @click="start" :disabled="running">Bắt đầu</button>
        <button class="ctrl-btn" @click="stop">Dừng</button>
      </div>
    </div>

    <div class="buffer-visual">
      <div class="producer-side">
        <div class="side-label">Producer</div>
        <div class="rate-indicator" :class="{ fast: produceRate > consumeRate }">
          {{ produceRate }}/s
        </div>
      </div>

      <div class="buffer-section">
        <div class="buffer-label">Buffer ({{ bufferSize }}/{{ maxBuffer }})</div>
        <div class="buffer-bar">
          <div
            class="buffer-fill"
            :style="{ width: (bufferSize / maxBuffer * 100) + '%' }"
            :class="bufferLevel"
          ></div>
        </div>
        <div class="buffer-status" :class="bufferLevel">{{ statusText }}</div>
      </div>

      <div class="consumer-side">
        <div class="side-label">Consumer</div>
        <div class="rate-indicator">{{ consumeRate }}/s</div>
      </div>
    </div>

    <div class="strategies">
      <div class="strat-title">Chiến lược xử lý backpressure:</div>
      <div class="strat-grid">
        <div v-for="s in strategies" :key="s.name" class="strat-card">
          <div class="strat-name">{{ s.name }}</div>
          <div class="strat-desc">{{ s.desc }}</div>
          <div class="strat-example">{{ s.example }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const produceRate = ref(6)
const consumeRate = ref(3)
const bufferSize = ref(0)
const maxBuffer = 20
const running = ref(false)
let timer = null

const bufferLevel = computed(() => {
  const ratio = bufferSize.value / maxBuffer
  if (ratio >= 0.9) return 'critical'
  if (ratio >= 0.6) return 'warning'
  return 'normal'
})

const statusText = computed(() => {
  const ratio = bufferSize.value / maxBuffer
  if (ratio >= 1) return 'Buffer tràn! Mất dữ liệu'
  if (ratio >= 0.8) return 'Sắp tràn, cần backpressure'
  if (ratio >= 0.5) return 'Áp lực buffer khá lớn'
  return 'Đang chạy bình thường'
})

function start() {
  running.value = true
  timer = setInterval(() => {
    const produced = produceRate.value
    const consumed = consumeRate.value
    bufferSize.value = Math.max(0, Math.min(maxBuffer, bufferSize.value + produced - consumed))
  }, 1000)
}

function stop() {
  running.value = false
  if (timer) clearInterval(timer)
  timer = null
  bufferSize.value = 0
}

const strategies = [
  { name: 'Drop', desc: 'Khi buffer đầy thì bỏ dữ liệu mới', example: 'Ví dụ: thu thập log, metrics realtime' },
  { name: 'Block', desc: 'Khi buffer đầy thì cho producer chờ', example: 'Ví dụ: Go channel, Java BlockingQueue' },
  { name: 'Sampling', desc: 'Chỉ xử lý một phần dữ liệu, bỏ phần còn lại', example: 'Ví dụ: lấy mẫu dữ liệu cảm biến tần số cao' },
  { name: 'Elastic scaling', desc: 'Tự động tăng số consumer', example: 'Ví dụ: K8s HPA auto scale' }
]

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.backpressure-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1.5rem; }
.speed-control { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
.ctrl-label { font-weight: 600; min-width: 70px; }
.ctrl-value { font-family: var(--vp-font-family-mono); min-width: 30px; }
.btn-group { display: flex; gap: 0.5rem; }
.ctrl-btn {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.ctrl-btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.5; }
.buffer-visual { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.producer-side, .consumer-side { text-align: center; min-width: 80px; }
.side-label { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem; }
.rate-indicator {
  padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
}
.rate-indicator.fast { border-color: #ef4444; color: #ef4444; }
.buffer-section { flex: 1; }
.buffer-label { font-size: 0.8rem; color: var(--vp-c-text-2); margin-bottom: 0.25rem; }
.buffer-bar {
  height: 24px; background: var(--vp-c-bg); border-radius: 6px;
  border: 1px solid var(--vp-c-divider); overflow: hidden;
}
.buffer-fill { height: 100%; border-radius: 5px; transition: width 0.5s, background 0.3s; }
.buffer-fill.normal { background: #22c55e; }
.buffer-fill.warning { background: #f59e0b; }
.buffer-fill.critical { background: #ef4444; }
.buffer-status { font-size: 0.8rem; margin-top: 0.25rem; }
.buffer-status.normal { color: #22c55e; }
.buffer-status.warning { color: #f59e0b; }
.buffer-status.critical { color: #ef4444; }
.strat-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
.strat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem; }
.strat-card {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.strat-name { font-weight: 700; font-size: 0.85rem; margin-bottom: 0.25rem; }
.strat-desc { font-size: 0.8rem; color: var(--vp-c-text-2); margin-bottom: 0.25rem; }
.strat-example { font-size: 0.75rem; color: var(--vp-c-text-3); }
@media (max-width: 640px) {
  .buffer-visual { flex-direction: column; }
  .strat-grid { grid-template-columns: 1fr; }
}
</style>
