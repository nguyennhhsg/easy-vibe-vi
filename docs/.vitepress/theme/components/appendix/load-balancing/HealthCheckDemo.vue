<template>
  <div class="health-check-demo">
    <div class="header">
      <div class="title">
        Cơ chế health check
      </div>
      <div class="subtitle">
        Probe chủ động, observe bị động và ngưỡng thông minh
      </div>
    </div>

    <!-- Bộ chọn mode -->
    <div class="mode-selector">
      <button
        v-for="mode in modes"
        :key="mode.key"
        class="mode-btn"
        :class="{ active: currentMode === mode.key }"
        @click="currentMode = mode.key"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span class="mode-name">{{ mode.name }}</span>
      </button>
    </div>

    <!-- Khu trực quan hoá -->
    <div class="visualization-area">
      <!-- Load balancer -->
      <div class="lb-node">
        <div class="lb-icon">
          ⚖️
        </div>
        <div class="lb-label">
          Load balancer
        </div>
        <div class="lb-status">
          {{ currentModeData.label }}
        </div>
      </div>

      <!-- Đường nối và marker health check -->
      <div class="connections-layer">
        <div
          v-for="(server, index) in servers"
          :key="index"
          class="connection-line"
          :class="{
            healthy: server.status === 'healthy',
            unhealthy: server.status === 'unhealthy',
            checking: server.status === 'checking'
          }"
        >
          <div
            v-if="server.showPacket"
            class="health-packet"
          >
            {{ server.packetType }}
          </div>
          <div class="health-indicator">
            <span v-if="server.status === 'healthy'">✅</span>
            <span v-else-if="server.status === 'unhealthy'">❌</span>
            <span v-else>🔄</span>
          </div>
        </div>
      </div>

      <!-- Server backend -->
      <div class="servers-grid">
        <div
          v-for="(server, index) in servers"
          :key="index"
          class="server-card"
          :class="{
            healthy: server.status === 'healthy',
            unhealthy: server.status === 'unhealthy',
            checking: server.status === 'checking'
          }"
        >
          <div class="server-header">
            <div class="server-icon">
              🖥️
            </div>
            <div class="server-info">
              <div class="server-name">
                Server {{ index + 1 }}
              </div>
              <div class="server-ip">
                {{ server.ip }}
              </div>
            </div>
            <div
              class="status-badge"
              :class="server.status"
            >
              {{ server.status === 'healthy' ? 'Healthy' : server.status === 'unhealthy' ? 'Unhealthy' : 'Đang check' }}
            </div>
          </div>

          <div class="server-metrics">
            <div class="metric">
              <div class="metric-label">
                Response time
              </div>
              <div
                class="metric-value"
                :class="{ warning: server.responseTime > 100 }"
              >
                {{ server.responseTime }}ms
              </div>
            </div>
            <div class="metric">
              <div class="metric-label">
                Error rate
              </div>
              <div
                class="metric-value"
                :class="{ danger: server.errorRate > 5 }"
              >
                {{ server.errorRate }}%
              </div>
            </div>
            <div class="metric">
              <div class="metric-label">
                Success streak
              </div>
              <div class="metric-value">
                {{ server.consecutiveSuccess }}/3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chi tiết cơ chế -->
    <div class="mechanism-details">
      <div class="detail-card">
        <div class="card-header">
          <span class="card-icon">{{ currentModeData.icon }}</span>
          <span class="card-title">{{ currentModeData.name }}</span>
        </div>
        <div class="card-body">
          <p class="description">
            {{ currentModeData.description }}
          </p>

          <div class="config-section">
            <div class="section-title">
              Tham số cấu hình then chốt
            </div>
            <div class="config-grid">
              <div
                v-for="param in currentModeData.params"
                :key="param.name"
                class="config-item"
              >
                <div class="config-name">
                  {{ param.name }}
                </div>
                <div class="config-value">
                  {{ param.value }}
                </div>
                <div class="config-desc">
                  {{ param.desc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <div class="pros-cons-title">
                ✅ Ưu điểm
              </div>
              <ul>
                <li
                  v-for="pro in currentModeData.pros"
                  :key="pro"
                >
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons">
              <div class="pros-cons-title">
                ❌ Nhược điểm
              </div>
              <ul>
                <li
                  v-for="con in currentModeData.cons"
                  :key="con"
                >
                  {{ con }}
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentMode = ref('active')

const modes = [
  {
    key: 'active',
    name: 'Health check chủ động',
    icon: '🔍',
    label: 'Probing'
  },
  {
    key: 'passive',
    name: 'Health check bị động',
    icon: '👁️',
    label: 'Observing'
  },
  {
    key: 'threshold',
    name: 'Đánh giá theo ngưỡng',
    icon: '📊',
    label: 'Threshold'
  }
]

const modeDetails = {
  active: {
    name: 'Health check chủ động',
    icon: '🔍',
    label: 'Probe chủ động định kỳ',
    description: 'Load balancer chủ động gửi request probe tới backend server (như HTTP /health, TCP handshake, v.v.), dựa vào response để đánh giá tình trạng. Đây là cách health check phổ biến nhất.',
    params: [
      { name: 'Interval check', value: '5s', desc: 'Khoảng thời gian giữa hai lần check' },
      { name: 'Timeout', value: '3s', desc: 'Thời gian tối đa chờ response' },
      { name: 'Healthy threshold', value: '2', desc: 'Số lần thành công liên tiếp để xác định healthy' },
      { name: 'Unhealthy threshold', value: '3', desc: 'Số lần fail liên tiếp để xác định unhealthy' }
    ],
    pros: [
      'Kết quả chính xác đáng tin cậy, phản ánh thật tình trạng dịch vụ',
      'Có thể cấu hình tham số và ngưỡng chính xác',
      'Không phụ thuộc traffic thật, không có traffic vẫn check được'
    ],
    cons: [
      'Sinh thêm traffic probe và chi phí hệ thống',
      'Sự cố trong khoảng giữa hai lần check không phát hiện ngay được',
      'Yêu cầu backend phải cung cấp endpoint health check'
    ]
  },
  passive: {
    name: 'Health check bị động',
    icon: '👁️',
    label: 'Quan sát traffic thật',
    description: 'Load balancer giám sát tình trạng response của traffic thật để đánh giá tình trạng backend. Không gửi probe request bổ sung, mà phân tích response time, status code của request thật.',
    params: [
      { name: 'Cửa sổ sample', value: '60s', desc: 'Cửa sổ thời gian thống kê response time' },
      { name: 'Ngưỡng lỗi', value: '10%', desc: 'Error rate tối đa chấp nhận được' },
      { name: 'Ngưỡng latency', value: '500ms', desc: 'Latency trung bình tối đa chấp nhận được' },
      { name: 'Sample tối thiểu', value: '100', desc: 'Số request tối thiểu để đánh giá' }
    ],
    pros: [
      'Không sinh thêm traffic probe',
      'Phản ánh tình trạng dịch vụ trong môi trường nghiệp vụ thật',
      'Vẫn hiệu quả với dịch vụ không có endpoint health check'
    ],
    cons: [
      'Cần đủ sample traffic mới đánh giá được',
      'Khi traffic thấp khó phát hiện vấn đề kịp thời',
      'Kết quả bị ảnh hưởng nhiều bởi đặc tính traffic nghiệp vụ'
    ]
  },
  threshold: {
    name: 'Cơ chế đánh giá theo ngưỡng',
    icon: '📊',
    label: 'Ngưỡng đa chiều',
    description: 'Kết hợp nhiều chỉ số (response time, error rate, số connection, CPU/memory, v.v.) đặt ngưỡng và đánh giá tổng hợp. Hỗ trợ điều chỉnh ngưỡng động theo tình huống tải khác nhau.',
    params: [
      { name: 'Response time P99', value: '200ms', desc: 'Ngưỡng response time của 99% request' },
      { name: 'Error rate', value: '1%', desc: 'Tỉ lệ lỗi tối đa chấp nhận được' },
      { name: 'Số connection', value: '1000', desc: 'Giới hạn số connection đồng thời' },
      { name: 'CPU usage', value: '80%', desc: 'Ngưỡng CPU usage của server' }
    ],
    pros: [
      'Đánh giá đa chiều tổng hợp, kết quả toàn diện và chính xác hơn',
      'Có thể cấu hình ngưỡng linh hoạt theo đặc thù nghiệp vụ',
      'Hỗ trợ điều chỉnh ngưỡng động, thích nghi biến động tải'
    ],
    cons: [
      'Cấu hình phức tạp, cần hiểu sâu các chỉ số',
      'Đặt ngưỡng không hợp lý dễ dẫn tới đánh giá sai',
      'Cần liên tục tinh chỉnh để đạt hiệu quả tốt nhất'
    ]
  }
}

const currentModeData = computed(() => modeDetails[currentMode.value])

// Dữ liệu server mô phỏng
const servers = ref([
  { ip: '10.0.1.10', status: 'healthy', responseTime: 25, errorRate: 0.1, consecutiveSuccess: 5, showPacket: false, packetType: '' },
  { ip: '10.0.1.11', status: 'healthy', responseTime: 30, errorRate: 0.2, consecutiveSuccess: 4, showPacket: false, packetType: '' },
  { ip: '10.0.1.12', status: 'unhealthy', responseTime: 3500, errorRate: 15, consecutiveSuccess: 0, showPacket: false, packetType: '' }
])

// Animation mô phỏng health check
let healthCheckInterval
let packetInterval

const simulateHealthCheck = () => {
  // Chọn ngẫu nhiên một server để gửi probe
  const serverIndex = Math.floor(Math.random() * servers.value.length)
  const server = servers.value[serverIndex]

  server.showPacket = true
  server.packetType = currentMode.value === 'active' ? 'GET /health' : currentMode.value === 'passive' ? 'Observing' : 'Metrics'

  setTimeout(() => {
    server.showPacket = false

    // Mô phỏng kết quả check
    if (server.status === 'healthy') {
      server.consecutiveSuccess = Math.min(server.consecutiveSuccess + 1, 5)
      server.responseTime = Math.floor(Math.random() * 50) + 20
    } else if (server.status === 'unhealthy') {
      server.consecutiveSuccess = 0
      server.responseTime = 3000 + Math.floor(Math.random() * 2000)
    }
  }, 500)
}

onMounted(() => {
  // Khởi động mô phỏng health check
  healthCheckInterval = setInterval(() => {
    simulateHealthCheck()
  }, 2000)

  // Luân phiên hiển thị server đang active
  packetInterval = setInterval(() => {
    const healthyServers = servers.value.filter(s => s.status === 'healthy')
    if (healthyServers.length > 0) {
      const randomServer = healthyServers[Math.floor(Math.random() * healthyServers.length)]
      activeServer.value = servers.value.indexOf(randomServer)
    }
  }, 1500)
})

onUnmounted(() => {
  clearInterval(healthCheckInterval)
  clearInterval(packetInterval)
})

const activeServer = ref(0)
</script>

<style scoped>
.health-check-demo {
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

/* Mode Selector */
.mode-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .mode-selector {
    grid-template-columns: 1fr;
  }
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-size: 1.2rem;
}

.mode-name {
  font-weight: 600;
}

/* Visualization Area */
.visualization-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.lb-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.lb-icon {
  font-size: 1.5rem;
}

.lb-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.lb-status {
  font-size: 0.75rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Connections Layer */
.connections-layer {
  display: flex;
  gap: 2rem;
}

.connection-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s;
  min-width: 80px;
}

.connection-line.healthy {
  background: rgba(34, 197, 94, 0.1);
}

.connection-line.unhealthy {
  background: rgba(239, 68, 68, 0.1);
}

.connection-line.checking {
  background: rgba(245, 158, 11, 0.1);
}

.health-packet {
  position: absolute;
  top: -20px;
  font-size: 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  animation: packetMove 1s ease-in-out;
}

@keyframes packetMove {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(30px); opacity: 0; }
}

.health-indicator {
  font-size: 1.25rem;
}

/* Servers Grid */
.servers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 800px;
}

@media (max-width: 768px) {
  .servers-grid {
    grid-template-columns: 1fr;
  }
}

.server-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.server-card.healthy {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.server-card.unhealthy {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.server-card.checking {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.server-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.server-icon {
  font-size: 1.25rem;
}

.server-info {
  flex: 1;
}

.server-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.server-ip {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge.healthy {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.unhealthy {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.checking {
  background: #fef3c7;
  color: #d97706;
}

.server-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.metric {
  text-align: center;
}

.metric-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2px;
}

.metric-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.metric-value.warning {
  color: #f59e0b;
}

.metric-value.danger {
  color: #ef4444;
}

/* Mechanism Details */
.mechanism-details {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.detail-card {
  padding: 0.75rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
}

.description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.config-section {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}

.config-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.config-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.config-value {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.config-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-cons-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.pros ul,
.cons ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.pros li,
.cons li {
  margin-bottom: 0.25rem;
}
</style>
