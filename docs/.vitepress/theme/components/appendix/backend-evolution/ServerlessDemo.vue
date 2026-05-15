<template>
  <div class="serverless-demo">
    <div class="demo-header">
      <h4>⚡ Demo kiến trúc Serverless</h4>
      <p>Quan sát cách Serverless thực thi hàm theo nhu cầu và auto scale</p>
    </div>

    <div class="serverless-visualization">
      <div class="function-grid">
        <div
          v-for="func in functions"
          :key="func.name"
          class="function-card"
          :class="{ active: func.state === 'running', cold: func.state === 'cold', warming: func.state === 'warming' }"
          @click="triggerFunction(func.name)"
        >
          <div class="function-icon">
            {{ func.icon }}
          </div>
          <div class="function-name">
            {{ func.name }}
          </div>
          <div
            class="function-state"
            :class="func.state"
          >
            {{ stateText(func.state) }}
          </div>
          <div
            v-if="func.invocations > 0"
            class="function-metrics"
          >
            <span>Số lần gọi: {{ func.invocations }}</span>
            <span>TB: {{ func.avgDuration }}ms</span>
          </div>
        </div>
      </div>

      <div class="auto-scaling-panel">
        <div class="scaling-title">
          Trạng thái auto scale
        </div>
        <div class="scaling-metrics">
          <div class="metric">
            <span class="metric-label">Concurrent request:</span>
            <span class="metric-value">{{ concurrentRequests }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Instance đang chạy:</span>
            <span class="metric-value">{{ runningInstances }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Cold start:</span>
            <span class="metric-value">{{ coldStarts }}</span>
          </div>
        </div>
        <div class="scaling-chart">
          <div
            v-for="(point, idx) in scalingHistory"
            :key="idx"
            class="chart-bar"
            :style="{ height: point + '%' }"
            :class="{ high: point > 70 }"
          />
        </div>
      </div>
    </div>

    <div class="traffic-simulator">
      <div class="simulator-title">
        Trình mô phỏng traffic
      </div>
      <div class="traffic-patterns">
        <button
          v-for="pattern in trafficPatterns"
          :key="pattern.name"
          class="pattern-btn"
          :class="{ active: currentPattern === pattern.name }"
          @click="applyPattern(pattern)"
        >
          <span class="pattern-icon">{{ pattern.icon }}</span>
          <span class="pattern-name">{{ pattern.name }}</span>
          <span class="pattern-desc">{{ pattern.desc }}</span>
        </button>
      </div>
    </div>

    <div class="demo-explanation">
      <h5>💡 Đặc trưng cốt lõi của Serverless</h5>
      <ul>
        <li><strong>Thực thi theo yêu cầu</strong>: hàm chỉ chạy khi được gọi, không gọi không tốn phí</li>
        <li><strong>Auto scale</strong>: tự động mở rộng từ 0 đến hàng nghìn instance, không cần can thiệp thủ công</li>
        <li><strong>Cold start</strong>: lần gọi đầu sau thời gian dài không dùng sẽ có độ trễ, cần chiến lược warm-up</li>
        <li><strong>Event-driven</strong>: phản hồi nhiều nguồn sự kiện như HTTP request, message queue, scheduled task</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const functions = reactive([
  { name: 'Đăng nhập user', icon: '🔐', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: 'Xử lý đơn hàng', icon: '📦', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: 'Xử lý ảnh', icon: '🖼️', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: 'Backup dữ liệu', icon: '💾', state: 'cold', invocations: 0, avgDuration: 0 }
])

const concurrentRequests = ref(0)
const runningInstances = ref(0)
const coldStarts = ref(0)
const scalingHistory = ref([10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20, 15])
const currentPattern = ref(null)
const isFlowRunning = ref(false)

const trafficPatterns = [
  { name: 'Traffic bình thường', icon: '📊', desc: 'Tốc độ request ổn định' },
  { name: 'Traffic đột biến', icon: '🚀', desc: 'Traffic tăng đột ngột' },
  { name: 'Traffic theo chu kỳ', icon: '🌊', desc: 'Cao điểm/thấp điểm tuần hoàn' }
]

const stateText = (state) => {
  const map = { cold: 'Trạng thái lạnh', warming: 'Đang khởi động', running: 'Đang chạy' }
  return map[state] || state
}

const triggerFunction = async (name) => {
  const fn = functions.find(f => f.name === name)
  if (!fn) return

  if (fn.state === 'cold') {
    fn.state = 'warming'
    coldStarts.value++
    await new Promise(r => setTimeout(r, 800))
  }

  fn.state = 'running'
  fn.invocations++
  concurrentRequests.value++
  runningInstances.value++

  const duration = Math.floor(Math.random() * 150) + 50
  fn.avgDuration = Math.floor((fn.avgDuration * (fn.invocations - 1) + duration) / fn.invocations)

  await new Promise(r => setTimeout(r, duration))

  concurrentRequests.value--
  if (concurrentRequests.value === 0) {
    runningInstances.value = 0
  }

  setTimeout(() => {
    if (fn.invocations > 0) {
      fn.state = 'cold'
    }
  }, 3000)
}

const applyPattern = (pattern) => {
  currentPattern.value = pattern.name
  // Mô phỏng pattern traffic
  if (pattern.name === 'Traffic đột biến') {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const fn = functions[Math.floor(Math.random() * functions.length)]
        triggerFunction(fn.name)
      }, i * 200)
    }
  } else if (pattern.name === 'Traffic theo chu kỳ') {
    const interval = setInterval(() => {
      const fn = functions[Math.floor(Math.random() * functions.length)]
      triggerFunction(fn.name)
    }, 500)
    setTimeout(() => clearInterval(interval), 3000)
  }
}

let interval
onMounted(() => {
  interval = setInterval(() => {
    scalingHistory.value.shift()
    const last = scalingHistory.value[scalingHistory.value.length - 1]
    const variation = Math.floor(Math.random() * 20) - 10
    const next = Math.max(10, Math.min(90, last + variation))
    scalingHistory.value.push(next)
  }, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.serverless-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.serverless-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.function-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.function-card:hover {
  border-color: var(--vp-c-brand);
}

.function-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.function-card.cold {
  opacity: 0.7;
}

.function-card.warming {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.function-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.function-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.function-state {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.function-state.cold {
  background: rgba(156, 163, 175, 0.2);
  color: var(--vp-c-text-2);
}

.function-state.warming {
  background: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.function-state.running {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.function-metrics {
  display: flex;
  justify-content: space-around;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.5rem;
}

.auto-scaling-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.scaling-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  text-align: center;
}

.scaling-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.metric-label {
  color: var(--vp-c-text-2);
}

.metric-value {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.scaling-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 60px;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.chart-bar {
  flex: 1;
  background: var(--vp-c-brand);
  border-radius: 1px;
  transition: height 0.3s;
  min-height: 2px;
}

.chart-bar.high {
  background: var(--vp-c-warning);
}

.traffic-simulator {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
}

.simulator-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  text-align: center;
}

.traffic-patterns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.pattern-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pattern-btn:hover {
  border-color: var(--vp-c-brand);
}

.pattern-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
}

.pattern-icon {
  font-size: 1.5rem;
}

.pattern-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.pattern-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.demo-explanation {
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.demo-explanation h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem 0;
}

.demo-explanation ul {
  margin: 0;
  padding-left: 1.25rem;
}

.demo-explanation li {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.4rem;
}

.demo-explanation li strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .serverless-visualization {
    grid-template-columns: 1fr;
  }

  .function-grid {
    grid-template-columns: 1fr;
  }

  .traffic-patterns {
    grid-template-columns: 1fr;
  }
}
</style>
