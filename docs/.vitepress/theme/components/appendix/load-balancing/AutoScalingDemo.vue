<template>
  <div class="auto-scaling-demo">
    <div class="header">
      <div class="title">
        Auto scaling
      </div>
      <div class="subtitle">
        Co giãn linh hoạt thông minh dựa trên CPU, memory, QPS
      </div>
    </div>

    <!-- Bộ chọn metric -->
    <div class="metric-selector">
      <div class="selector-label">
        Metric scale:
      </div>
      <div class="selector-buttons">
        <button
          v-for="metric in metrics"
          :key="metric.key"
          class="metric-btn"
          :class="{ active: currentMetric === metric.key }"
          @click="currentMetric = metric.key"
        >
          <span class="btn-icon">{{ metric.icon }}</span>
          <span class="btn-name">{{ metric.name }}</span>
        </button>
      </div>
    </div>

    <!-- Dashboard giám sát -->
    <div class="monitoring-dashboard">
      <div class="dashboard-header">
        <span class="dashboard-title">Giám sát thời gian thực</span>
        <span class="refresh-indicator">
          <span class="live-dot" />
          Live
        </span>
      </div>

      <div class="metrics-grid">
        <!-- CPU usage -->
        <div
          class="metric-card"
          :class="{ warning: cpuUsage > 70, danger: cpuUsage > 90 }"
        >
          <div class="metric-header">
            <span class="metric-icon">💻</span>
            <span class="metric-name">CPU usage</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ cpuUsage }}</span>
            <span class="value-unit">%</span>
          </div>
          <div class="metric-progress">
            <div
              class="progress-bar"
              :style="{ width: cpuUsage + '%', background: getUsageColor(cpuUsage) }"
            />
          </div>
          <div class="metric-threshold">
            <span>Ngưỡng scale up: 70%</span>
            <span>Ngưỡng scale down: 30%</span>
          </div>
        </div>

        <!-- Memory usage -->
        <div
          class="metric-card"
          :class="{ warning: memoryUsage > 75, danger: memoryUsage > 90 }"
        >
          <div class="metric-header">
            <span class="metric-icon">🧠</span>
            <span class="metric-name">Memory usage</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ memoryUsage }}</span>
            <span class="value-unit">%</span>
          </div>
          <div class="metric-progress">
            <div
              class="progress-bar"
              :style="{ width: memoryUsage + '%', background: getUsageColor(memoryUsage) }"
            />
          </div>
          <div class="metric-threshold">
            <span>Ngưỡng scale up: 75%</span>
            <span>Ngưỡng scale down: 40%</span>
          </div>
        </div>

        <!-- QPS -->
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">⚡</span>
            <span class="metric-name">QPS</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ currentQPS }}</span>
            <span class="value-unit">req/s</span>
          </div>
          <div class="metric-chart">
            <svg
              viewBox="0 0 200 40"
              class="sparkline"
            >
              <polyline
                fill="none"
                stroke="var(--vp-c-brand)"
                stroke-width="2"
                :points="qpsSparklinePoints"
              />
            </svg>
          </div>
          <div class="metric-threshold">
            <span>Ngưỡng scale up: 1000/s</span>
            <span>Mục tiêu: 800/s</span>
          </div>
        </div>

        <!-- Số instance -->
        <div class="metric-card instances">
          <div class="metric-header">
            <span class="metric-icon">🖥️</span>
            <span class="metric-name">Instance đang chạy</span>
          </div>
          <div class="instances-display">
            <div class="instance-count">
              <span class="count-number">{{ currentInstances }}</span>
              <span class="count-label">instance</span>
            </div>
            <div class="instance-range">
              <span>Min: {{ minInstances }}</span>
              <span>Max: {{ maxInstances }}</span>
            </div>
          </div>
          <div class="instance-visual">
            <div
              v-for="i in maxInstances"
              :key="i"
              class="instance-dot"
              :class="{ active: i <= currentInstances, scaling: isScaling && i === currentInstances + 1 }"
            >
              {{ i }}
            </div>
          </div>
          <div
            v-if="scaleReason"
            class="scale-reason"
          >
            <span class="reason-icon">{{ scaleReason.includes('Scale up') ? '📈' : '📉' }}</span>
            <span class="reason-text">{{ scaleReason }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lịch sử scale -->
    <div class="scaling-history">
      <div class="history-header">
        <span class="history-title">Lịch sử scale</span>
        <span class="history-count">5 thao tác gần nhất</span>
      </div>
      <div class="history-list">
        <div
          v-for="(record, index) in scalingHistory"
          :key="index"
          class="history-item"
          :class="{ scaleOut: record.type === 'Scale down' }"
        >
          <div class="item-icon">
            {{ record.type === 'Scale up' ? '📈' : '📉' }}
          </div>
          <div class="item-details">
            <div class="item-action">
              {{ record.type }}: {{ record.from }} → {{ record.to }} instance
            </div>
            <div class="item-reason">
              {{ record.reason }}
            </div>
          </div>
          <div class="item-time">
            {{ record.time }}
          </div>
        </div>
      </div>
    </div>

    <!-- Best practice -->
    <div class="best-practices">
      <div class="practices-title">
        Best practice cho auto scaling
      </div>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">
            ⏱️
          </div>
          <div class="practice-title">
            Cooldown
          </div>
          <div class="practice-desc">
            Đặt cooldown hợp lý (thường 3-5 phút) để tránh thao tác scale quá thường xuyên gây dao động
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">
            📊
          </div>
          <div class="practice-title">
            Đa chỉ số tổng hợp
          </div>
          <div class="practice-desc">
            Đừng phụ thuộc một chỉ số đơn, hãy kết hợp CPU, memory, QPS, số connection và nhiều chiều khác để đánh giá tổng hợp
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">
            🎯
          </div>
          <div class="practice-title">
            Mức sử dụng mục tiêu
          </div>
          <div class="practice-desc">
            Đặt mức sử dụng tài nguyên mục tiêu hợp lý (ví dụ 70%), chừa đủ buffer để đỡ traffic đột biến
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">
            ⚡
          </div>
          <div class="practice-title">
            Scale up nhanh
          </div>
          <div class="practice-desc">
            Thao tác scale up nên quyết liệt hơn scale down, đảm bảo hệ thống đáp ứng nhanh khi traffic tăng
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const currentMetric = ref('cpu')
const cpuUsage = ref(45)
const memoryUsage = ref(60)
const currentQPS = ref(650)
const currentInstances = ref(3)
const minInstances = ref(2)
const maxInstances = ref(10)
const isScaling = ref(false)
const scaleReason = ref('')

const metrics = [
  { key: 'cpu', name: 'CPU usage', icon: '💻' },
  { key: 'memory', name: 'Memory usage', icon: '🧠' },
  { key: 'qps', name: 'QPS', icon: '⚡' }
]

// Lịch sử QPS
const qpsHistory = ref(Array(20).fill(650))

// Tính điểm sparkline QPS
const qpsSparklinePoints = computed(() => {
  const max = Math.max(...qpsHistory.value)
  const min = Math.min(...qpsHistory.value)
  const range = max - min || 1
  return qpsHistory.value.map((qps, index) => {
    const x = (index / (qpsHistory.value.length - 1)) * 200
    const y = 40 - ((qps - min) / range) * 35 - 2.5
    return `${x},${y}`
  }).join(' ')
})

// Lấy màu
const getUsageColor = (usage) => {
  if (usage > 90) return '#ef4444'
  if (usage > 70) return '#f59e0b'
  return '#22c55e'
}

// Lịch sử scale
const scalingHistory = ref([
  { type: 'Scale up', from: 2, to: 3, reason: 'CPU vượt 70%', time: '10:23' },
  { type: 'Scale down', from: 4, to: 3, reason: 'CPU dưới 30%', time: '09:15' },
  { type: 'Scale up', from: 3, to: 4, reason: 'QPS đạt 1000/s', time: '08:42' },
  { type: 'Scale up', from: 2, to: 3, reason: 'Memory vượt 75%', time: '07:30' },
  { type: 'Scale down', from: 5, to: 4, reason: 'Lưu lượng giảm', time: '06:20' }
])

// Mô phỏng biến động chỉ số
let simulationInterval
const startSimulation = () => {
  simulationInterval = setInterval(() => {
    // Mô phỏng dao động CPU
    const cpuChange = (Math.random() - 0.5) * 10
    cpuUsage.value = Math.max(20, Math.min(95, cpuUsage.value + cpuChange))

    // Mô phỏng dao động memory
    const memChange = (Math.random() - 0.5) * 8
    memoryUsage.value = Math.max(30, Math.min(90, memoryUsage.value + memChange))

    // Mô phỏng dao động QPS
    const qpsChange = Math.floor((Math.random() - 0.5) * 50)
    currentQPS.value = Math.max(200, Math.min(1200, currentQPS.value + qpsChange))
    qpsHistory.value.shift()
    qpsHistory.value.push(currentQPS.value)

    // Trigger logic scale theo chỉ số
    checkScalingLogic()
  }, 2000)
}

// Kiểm tra logic scale
const checkScalingLogic = () => {
  if (isScaling.value) return

  let shouldScale = false
  let newCount = currentInstances.value
  let reason = ''

  // Kiểm tra scale up
  if (cpuUsage.value > 75 || memoryUsage.value > 75 || currentQPS.value > 900) {
    if (currentInstances.value < maxInstances.value) {
      shouldScale = true
      newCount = currentInstances.value + 1
      if (cpuUsage.value > 75) reason = 'CPU vượt 75%'
      else if (memoryUsage.value > 75) reason = 'Memory vượt 75%'
      else reason = 'QPS vượt 900/s'
    }
  }
  // Kiểm tra scale down
  else if (cpuUsage.value < 35 && memoryUsage.value < 40 && currentQPS.value < 400) {
    if (currentInstances.value > minInstances.value) {
      shouldScale = true
      newCount = currentInstances.value - 1
      reason = 'Mức sử dụng tài nguyên dưới ngưỡng'
    }
  }

  if (shouldScale) {
    triggerScaling(newCount, reason)
  }
}

// Trigger scale
const triggerScaling = (newCount, reason) => {
  isScaling.value = true
  scaleReason.value = `${newCount > currentInstances.value ? 'Scale up' : 'Scale down'}: ${reason}`

  setTimeout(() => {
    currentInstances.value = newCount
    isScaling.value = false
    scaleReason.value = ''

    // Thêm vào lịch sử
    scalingHistory.value.unshift({
      type: newCount > currentInstances.value ? 'Scale up' : 'Scale down',
      from: newCount > currentInstances.value ? newCount - 1 : newCount + 1,
      to: newCount,
      reason,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    })
    scalingHistory.value = scalingHistory.value.slice(0, 5)
  }, 3000)
}

onMounted(() => {
  startSimulation()
})

onUnmounted(() => {
  clearInterval(simulationInterval)
})
</script>

<style scoped>
.auto-scaling-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Metric Selector */
.metric-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.selector-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.selector-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.metric-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.metric-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.metric-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.btn-icon {
  font-size: 1rem;
}

/* Monitoring Dashboard */
.monitoring-dashboard {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.dashboard-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.refresh-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.metric-card.warning {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.metric-card.danger {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.value-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.value-unit {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.metric-progress {
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: all 0.3s;
}

.metric-threshold {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.metric-chart {
  height: 40px;
  margin-bottom: 0.5rem;
}

.sparkline {
  width: 100%;
  height: 100%;
}

/* Instances Card */
.metric-card.instances {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .metric-card.instances {
    grid-column: span 1;
  }
}

.instances-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.instance-count {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.count-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.count-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.instance-range {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.instance-visual {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.instance-dot {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.instance-dot.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.instance-dot.scaling {
  animation: scaleIn 1s ease-in-out infinite;
}

@keyframes scaleIn {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

.scale-reason {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.reason-icon {
  font-size: 1rem;
}

/* Scaling History */
.scaling-history {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.history-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.history-item.scaleOut {
  border-left: 3px solid #22c55e;
}

.history-item:not(.scaleOut) {
  border-left: 3px solid #f59e0b;
}

.item-icon {
  font-size: 1.25rem;
}

.item-details {
  flex: 1;
}

.item-action {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.item-reason {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.item-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

/* Best Practices */
.best-practices {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.practices-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .practices-grid {
    grid-template-columns: 1fr;
  }
}

.practice-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.practice-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.practice-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.practice-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
