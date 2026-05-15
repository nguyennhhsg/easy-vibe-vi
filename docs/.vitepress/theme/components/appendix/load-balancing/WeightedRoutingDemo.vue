<template>
  <div class="weighted-routing-demo">
    <div class="header">
      <div class="title">
        Chiến lược routing có trọng số
      </div>
      <div class="subtitle">
        Phân phối traffic thông minh theo hiệu năng, chi phí, vị trí địa lý
      </div>
    </div>

    <!-- Bộ chọn chiến lược -->
    <div class="strategy-selector">
      <div class="strategy-label">
        Chiến lược trọng số:
      </div>
      <div class="strategy-buttons">
        <button
          v-for="strategy in strategies"
          :key="strategy.key"
          class="strategy-btn"
          :class="{ active: currentStrategy === strategy.key }"
          @click="currentStrategy = strategy.key"
        >
          <span class="btn-icon">{{ strategy.icon }}</span>
          <span class="btn-name">{{ strategy.name }}</span>
        </button>
      </div>
    </div>

    <!-- Khu trực quan hoá -->
    <div class="visualization">
      <!-- Traffic vào -->
      <div class="traffic-incoming">
        <div class="traffic-label">
          Tổng traffic
        </div>
        <div class="traffic-value">
          {{ totalTraffic }} req/s
        </div>
        <div class="traffic-slider">
          <input
            v-model.number="totalTraffic"
            type="range"
            min="100"
            max="10000"
            step="100"
          >
          <div class="slider-labels">
            <span>100</span>
            <span>5000</span>
            <span>10000</span>
          </div>
        </div>
      </div>

      <!-- Trực quan hoá phân bổ trọng số -->
      <div class="weight-allocation">
        <div class="allocation-title">
          Phân bổ trọng số
        </div>
        <div class="allocation-bars">
          <div
            v-for="(server, index) in weightedServers"
            :key="server.id"
            class="allocation-item"
          >
            <div class="server-info">
              <div class="server-icon">
                🖥️
              </div>
              <div class="server-details">
                <div class="server-name">
                  {{ server.name }}
                </div>
                <div class="server-specs">
                  {{ server.specs }}
                </div>
              </div>
            </div>
            <div class="weight-bar-container">
              <div
                class="weight-bar"
                :style="{
                  width: getAllocationPercentage(server.weight) + '%',
                  background: getWeightColor(index)
                }"
              >
                <span class="weight-value">{{ Math.round(getAllocationPercentage(server.weight)) }}%</span>
              </div>
            </div>
            <div class="traffic-assigned">
              {{ Math.round((totalTraffic * server.weight) / getTotalWeight()) }} req/s
            </div>
            <div class="weight-control">
              <input
                v-model.number="server.weight"
                type="range"
                min="1"
                max="10"
                step="1"
                class="weight-slider"
              >
              <span class="weight-label">Trọng số: {{ server.weight }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Animation traffic thời gian thực -->
      <div class="traffic-animation">
        <div class="animation-title">
          Traffic thời gian thực
        </div>
        <div class="traffic-flows">
          <div
            v-for="(flow, index) in trafficFlows"
            :key="index"
            class="flow-item"
            :style="{ animationDelay: flow.delay + 's' }"
          >
            <div
              class="flow-packet"
              :style="{ background: flow.color }"
            />
          </div>
        </div>
        <div class="server-indicators">
          <div
            v-for="(server, index) in weightedServers"
            :key="server.id"
            class="indicator"
            :style="{ background: getWeightColor(index) }"
          >
            {{ server.name.slice(-1) }}
          </div>
        </div>
      </div>
    </div>

    <!-- So sánh chi tiết các chiến lược -->
    <div class="strategy-comparison">
      <div class="comparison-title">
        So sánh các chiến lược trọng số
      </div>
      <div class="comparison-grid">
        <div
          v-for="strategy in strategies"
          :key="strategy.key"
          class="strategy-card"
          :class="{ active: currentStrategy === strategy.key }"
        >
          <div class="card-header">
            <span class="card-icon">{{ strategy.icon }}</span>
            <span class="card-name">{{ strategy.name }}</span>
          </div>
          <div class="card-body">
            <p class="card-desc">
              {{ strategy.description }}
            </p>
            <div class="use-cases">
              <div class="use-case-title">
                Tình huống áp dụng:
              </div>
              <ul>
                <li
                  v-for="useCase in strategy.useCases"
                  :key="useCase"
                >
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const currentStrategy = ref('performance')
const totalTraffic = ref(1000)

const strategies = [
  {
    key: 'performance',
    name: 'Theo hiệu năng',
    icon: '⚡',
    description: 'Gán trọng số theo năng lực xử lý của backend (CPU, memory, I/O), server mạnh gánh nhiều traffic hơn.',
    useCases: [
      'Môi trường deploy hỗn hợp (server cũ và mới chạy chung)',
      'Môi trường phần cứng không đồng nhất',
      'Tình huống cần tối đa hoá throughput tổng thể'
    ]
  },
  {
    key: 'cost',
    name: 'Theo chi phí',
    icon: '💰',
    description: 'Gán trọng số theo chi phí server (on-demand vs reserved instance, chi phí khác giữa các vùng), ưu tiên tài nguyên chi phí thấp.',
    useCases: [
      'Tối ưu chi phí trong cloud',
      'Điều phối traffic giữa các vùng',
      'Dùng kết hợp reserved instance và on-demand'
    ]
  },
  {
    key: 'geo',
    name: 'Theo vị trí địa lý',
    icon: '🌍',
    description: 'Dựa vào vị trí địa lý của user, route request về data center gần nhất để giảm độ trễ mạng.',
    useCases: [
      'Dịch vụ ứng dụng toàn cầu',
      'Ứng dụng nhạy cảm với độ trễ (game, giao dịch tài chính)',
      'Routing thông minh giữa CDN và origin'
    ]
  }
]

const weightedServers = ref([
  {
    id: 1,
    name: 'Server 1',
    specs: '8 core 32GB SSD',
    ip: '10.0.1.10',
    weight: 5,
    status: 'healthy'
  },
  {
    id: 2,
    name: 'Server 2',
    specs: '4 core 16GB SSD',
    ip: '10.0.1.11',
    weight: 3,
    status: 'healthy'
  },
  {
    id: 3,
    name: 'Server 3',
    specs: '2 core 8GB HDD',
    ip: '10.0.1.12',
    weight: 2,
    status: 'healthy'
  }
])

const getTotalWeight = () => {
  return weightedServers.value.reduce((sum, s) => sum + s.weight, 0)
}

const getAllocationPercentage = (weight) => {
  const total = getTotalWeight()
  return total > 0 ? (weight / total) * 100 : 0
}

const getWeightColor = (index) => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
  return colors[index % colors.length]
}

// Animation luồng traffic
const trafficFlows = ref([])

const generateTrafficFlows = () => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b']
  trafficFlows.value = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)]
  }))
}

// Tính server đích
const isTargetServer = (serverId) => {
  // Mô phỏng chọn server theo trọng số
  const server = weightedServers.value.find(s => s.id === serverId)
  if (!server) return false
  return server.weight >= 4
}

// Cập nhật cấu hình và trọng số theo chiến lược
const updateServersByStrategy = () => {
  if (currentStrategy.value === 'performance') {
    weightedServers.value = [
      { id: 1, name: 'Server 1', specs: '16 core 64GB NVMe', ip: '10.0.1.10', weight: 8, status: 'healthy' },
      { id: 2, name: 'Server 2', specs: '8 core 32GB SSD', ip: '10.0.1.11', weight: 4, status: 'healthy' },
      { id: 3, name: 'Server 3', specs: '4 core 16GB SSD', ip: '10.0.1.12', weight: 2, status: 'healthy' }
    ]
  } else if (currentStrategy.value === 'cost') {
    weightedServers.value = [
      { id: 1, name: 'Server 1', specs: 'Reserved instance (chi phí thấp)', ip: '10.0.1.10', weight: 7, status: 'healthy' },
      { id: 2, name: 'Server 2', specs: 'Reserved instance (chi phí thấp)', ip: '10.0.1.11', weight: 7, status: 'healthy' },
      { id: 3, name: 'Server 3', specs: 'On-demand instance (chi phí cao)', ip: '10.0.1.12', weight: 2, status: 'healthy' }
    ]
  } else if (currentStrategy.value === 'geo') {
    weightedServers.value = [
      { id: 1, name: 'Node Hà Nội', specs: 'Phục vụ user miền Bắc', ip: '10.0.1.10', weight: 5, status: 'healthy' },
      { id: 2, name: 'Node Đà Nẵng', specs: 'Phục vụ user miền Trung', ip: '10.0.1.11', weight: 5, status: 'healthy' },
      { id: 3, name: 'Node TP HCM', specs: 'Phục vụ user miền Nam', ip: '10.0.1.12', weight: 5, status: 'healthy' }
    ]
  }
}

onMounted(() => {
  generateTrafficFlows()
  // Lắng nghe thay đổi chiến lược để cập nhật server
  watch(currentStrategy, () => {
    updateServersByStrategy()
  }, { immediate: true })
})
</script>

<style scoped>
.weighted-routing-demo {
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

/* Strategy Selector */
.strategy-selector {
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

.strategy-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.strategy-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.strategy-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.strategy-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.strategy-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.btn-icon {
  font-size: 1rem;
}

.btn-name {
  font-weight: 500;
}

/* Visualization */
.visualization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Traffic Incoming */
.traffic-incoming {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.traffic-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.traffic-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.75rem;
}

.traffic-slider {
  max-width: 300px;
  margin: 0 auto;
}

.traffic-slider input {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  outline: none;
}

.traffic-slider input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

/* Weight Allocation */
.weight-allocation {
  margin-bottom: 1.5rem;
}

.allocation-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.allocation-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.allocation-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
}

.server-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.server-icon {
  font-size: 1.5rem;
}

.server-details {
  flex: 1;
}

.server-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.server-specs {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.weight-bar-container {
  height: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.weight-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.75rem;
  transition: width 0.3s ease;
  min-width: 40px;
}

.weight-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.traffic-assigned {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  text-align: center;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.weight-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.weight-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--vp-c-bg);
  border-radius: 3px;
  outline: none;
}

.weight-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  cursor: pointer;
}

.weight-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 60px;
  text-align: right;
}

/* Traffic Animation */
.traffic-animation {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
}

.animation-title {
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.traffic-flows {
  height: 40px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.flow-item {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  animation: flowMove 2s linear infinite;
}

@keyframes flowMove {
  0% {
    left: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.flow-packet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.server-indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.indicator {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Strategy Comparison */
.strategy-comparison {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.strategy-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
}

.strategy-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.25rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 0.75rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.use-cases {
  font-size: 0.75rem;
}

.use-case-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.use-cases ul {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--vp-c-text-2);
}

.use-cases li {
  margin-bottom: 0.15rem;
}
</style>
