<!--
  LoadBalancingDemo.vue
  Cân bằng tải - Round robin/Weighted/Least connection/IP hash
-->
<template>
  <div class="load-balancing-demo">
    <div class="header">
      <div class="title">
        ⚖️ Cân bằng tải: Chia đều "áp lực" sang nhiều server
      </div>
      <div class="subtitle">
        Hãy hình dung như hệ thống lấy số ở ngân hàng — chia khách đều cho các quầy, tránh một quầy bị xếp hàng dài
      </div>
    </div>

    <div class="strategy-selector">
      <div class="selector-title">
        Chọn chiến lược cân bằng tải
      </div>
      <div class="strategy-tabs">
        <button
          v-for="strategy in strategies"
          :key="strategy.id"
          :class="['strategy-tab', { active: currentStrategy === strategy.id }]"
          @click="changeStrategy(strategy.id)"
        >
          <span class="tab-icon">{{ strategy.icon }}</span>
          <span class="tab-name">{{ strategy.name }}</span>
          <span
            v-if="strategy.badge"
            class="tab-badge"
          >{{ strategy.badge }}</span>
        </button>
      </div>
    </div>

    <div class="simulation-area">
      <div class="sim-header">
        <div class="sim-title">
          🎮 Trình mô phỏng cân bằng tải
        </div>
        <div class="sim-controls">
          <button
            class="sim-btn"
            :disabled="isSimulating"
            @click="startSimulation"
          >
            {{ isSimulating ? 'Đang chạy...' : '▶ Bắt đầu mô phỏng' }}
          </button>
          <button
            class="sim-btn reset"
            @click="resetSimulation"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <div class="strategy-explanation">
        <div class="exp-icon">
          💡
        </div>
        <div class="exp-content">
          <div class="exp-title">
            {{ currentStrategyData.name }} - {{ currentStrategyData.shortDesc }}
          </div>
          <div class="exp-desc">
            {{ currentStrategyData.fullDesc }}
          </div>
        </div>
      </div>

      <div class="servers-pool">
        <div class="pool-header">
          <div class="pool-title">
            🏢 Cluster server backend
          </div>
          <div class="pool-config">
            <label>Số lượng server:</label>
            <input
              v-model="serverCount"
              type="range"
              min="2"
              max="6"
              :disabled="isSimulating"
            >
            <span>{{ serverCount }} máy</span>
          </div>
        </div>

        <div class="servers-grid">
          <div
            v-for="server in servers"
            :key="server.id"
            :class="['server-card', { active: server.active, overloaded: server.load > 80 }]"
            :style="{ borderColor: server.color }"
          >
            <div class="server-header">
              <div class="server-icon">
                🖥️
              </div>
              <div class="server-name">
                {{ server.name }}
              </div>
              <div
                class="server-status"
                :style="{ background: server.color }"
              >
                {{ server.load }}%
              </div>
            </div>

            <div class="server-metrics">
              <div class="metric">
                <span class="metric-label">Số request:</span>
                <span class="metric-value">{{ server.requests }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Trọng số:</span>
                <input
                  v-if="currentStrategy === 'weighted'"
                  v-model.number="server.weight"
                  type="number"
                  min="1"
                  max="10"
                  :disabled="isSimulating"
                  class="weight-input"
                >
                <span v-else>{{ server.weight }}</span>
              </div>
            </div>

            <div class="load-bar">
              <div
                class="load-fill"
                :style="{ width: server.load + '%', background: server.color }"
              />
            </div>

            <div class="recent-requests">
              <div class="req-label">
                Request gần đây:
              </div>
              <div class="req-list">
                <span
                  v-for="(req, idx) in server.recentRequests"
                  :key="idx"
                  class="req-badge"
                  :style="{ background: req.color }"
                >
                  {{ req.id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="request-queue">
        <div class="queue-header">
          <div class="queue-title">
            📨 Hàng đợi request
          </div>
          <div class="queue-stats">
            <span>Tổng request: {{ totalRequests }}</span>
            <span>Đang chờ: {{ pendingRequests.length }}</span>
          </div>
        </div>

        <div class="queue-items">
          <div
            v-for="req in displayedRequests"
            :key="req.id"
            :class="['queue-item', req.status]"
          >
            <span class="req-id">#{{ req.id }}</span>
            <span class="req-arrow">→</span>
            <span
              v-if="req.assignedServer"
              class="req-target"
              :style="{ color: req.serverColor }"
            >
              {{ req.assignedServer }}
            </span>
            <span
              v-else
              class="req-status"
            >{{ req.statusText }}</span>
          </div>
        </div>
      </div>

      <div class="strategy-stats">
        <div class="stats-title">
          📊 Thống kê phân bố tải
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">
              {{ avgLoad }}%
            </div>
            <div class="stat-label">
              Tải trung bình
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              {{ maxLoad }}%
            </div>
            <div class="stat-label">
              Tải cao nhất
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              {{ loadStdDev }}
            </div>
            <div class="stat-label">
              Độ lệch chuẩn tải
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              {{ mostBusyServer || '-' }}
            </div>
            <div class="stat-label">
              Server bận nhất
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'

// Các chiến lược cân bằng tải
const strategies = [
  {
    id: 'roundrobin',
    icon: '🔄',
    name: 'Round robin',
    badge: 'Mặc định',
    shortDesc: 'Chia tuần tự, đều khắp',
    fullDesc: 'Theo thứ tự danh sách server, lần lượt giao request cho từng server. Giống như ngân hàng gọi số: quầy 1 xong tới quầy 2, quầy 2 xong tới quầy 3, lần lượt theo vòng.'
  },
  {
    id: 'weighted',
    icon: '⚖️',
    name: 'Weighted round robin',
    badge: '',
    shortDesc: 'Server mạnh làm nhiều việc hơn',
    fullDesc: 'Gán trọng số cho mỗi server, server mạnh được trọng số cao hơn nên nhận nhiều request hơn. Giống trong team, người giỏi gánh phần việc nhiều hơn.'
  },
  {
    id: 'leastconn',
    icon: '🔌',
    name: 'Least connection',
    badge: '',
    shortDesc: 'Ai rảnh thì giao việc',
    fullDesc: 'Giao request mới cho server hiện đang có ít connection nhất. Giống đi ăn căng tin, thấy quầy nào ít người xếp hàng thì xếp vào đó.'
  },
  {
    id: 'iphash',
    icon: '🔢',
    name: 'IP hash',
    badge: '',
    shortDesc: 'Cùng user luôn về cùng một server',
    fullDesc: 'Tính hash từ IP client, request cùng IP luôn về cùng server. Phù hợp khi cần giữ session state (ví dụ giỏ hàng).'
  }
]

const currentStrategy = ref('roundrobin')
const isSimulating = ref(false)
const serverCount = ref(4)
const currentIndex = ref(0)

const currentStrategyData = computed(() => strategies.find(s => s.id === currentStrategy.value))

// Sinh danh sách server
const generateServers = (count) => {
  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  const names = ['Server-A', 'Server-B', 'Server-C', 'Server-D', 'Server-E', 'Server-F']

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: names[i] || `Server-${i + 1}`,
    color: colors[i % colors.length],
    requests: 0,
    load: Math.floor(Math.random() * 40) + 10,
    weight: Math.floor(Math.random() * 5) + 1,
    connections: Math.floor(Math.random() * 20),
    active: false,
    recentRequests: []
  }))
}

const servers = ref(generateServers(serverCount.value))

// Hàng đợi request
const requestQueue = ref([])
const totalRequests = ref(0)
const pendingRequests = computed(() => requestQueue.value.filter(r => r.status === 'pending'))
const displayedRequests = computed(() => requestQueue.value.slice(0, 10))

// Thuật toán chọn server
const selectServer = (requestId, clientIP) => {
  let selectedIndex = 0

  switch (currentStrategy.value) {
    case 'roundrobin':
      selectedIndex = currentIndex.value % servers.value.length
      currentIndex.value++
      break

    case 'weighted':
      const totalWeight = servers.value.reduce((sum, s) => sum + s.weight, 0)
      let random = Math.random() * totalWeight
      for (let i = 0; i < servers.value.length; i++) {
        random -= servers.value[i].weight
        if (random <= 0) {
          selectedIndex = i
          break
        }
      }
      break

    case 'leastconn':
      selectedIndex = servers.value.reduce((minIdx, s, i, arr) =>
        s.connections < arr[minIdx].connections ? i : minIdx, 0)
      break

    case 'iphash':
      const hash = clientIP.split('.').reduce((h, octet) => (h * 31 + parseInt(octet)) & 0xffffffff, 0)
      selectedIndex = hash % servers.value.length
      break
  }

  return servers.value[selectedIndex]
}

// Mô phỏng request
const simulateRequest = async () => {
  const reqId = totalRequests.value + 1
  const clientIP = `192.168.1.${Math.floor(Math.random() * 255) + 1}`

  const request = {
    id: reqId,
    clientIP,
    status: 'pending',
    statusText: 'Đang chờ phân phối...',
    assignedServer: null,
    serverColor: null
  }

  requestQueue.value.unshift(request)
  totalRequests.value++

  // Mô phỏng độ trễ phân phối
  await new Promise(resolve => setTimeout(resolve, 300))

  const server = selectServer(reqId, clientIP)
  request.assignedServer = server.name
  request.serverColor = server.color
  request.status = 'assigned'
  request.statusText = 'Đã phân phối'

  // Cập nhật trạng thái server
  server.requests++
  server.connections++
  server.load = Math.min(100, server.load + Math.floor(Math.random() * 10) + 5)
  server.active = true

  server.recentRequests.unshift({ id: reqId, color: '#22c55e' })
  if (server.recentRequests.length > 5) server.recentRequests.pop()

  setTimeout(() => {
    server.connections = Math.max(0, server.connections - 1)
    if (server.connections === 0) server.active = false
  }, 2000)
}

// Bắt đầu mô phỏng
const startSimulation = async () => {
  isSimulating.value = true

  for (let i = 0; i < 20; i++) {
    if (!isSimulating.value) break
    simulateRequest()
    await new Promise(resolve => setTimeout(resolve, 400))
  }

  isSimulating.value = false
}

// Reset mô phỏng
const resetSimulation = () => {
  isSimulating.value = false
  servers.value = generateServers(serverCount.value)
  requestQueue.value = []
  totalRequests.value = 0
  currentIndex.value = 0
}

// Đổi chiến lược
const changeStrategy = (id) => {
  currentStrategy.value = id
  resetSimulation()
}

// Tính thống kê
const avgLoad = computed(() => {
  if (servers.value.length === 0) return 0
  return Math.round(servers.value.reduce((sum, s) => sum + s.load, 0) / servers.value.length)
})

const maxLoad = computed(() => {
  if (servers.value.length === 0) return 0
  return Math.max(...servers.value.map(s => s.load))
})

const loadStdDev = computed(() => {
  if (servers.value.length === 0) return 0
  const avg = avgLoad.value
  const variance = servers.value.reduce((sum, s) => sum + Math.pow(s.load - avg, 2), 0) / servers.value.length
  return Math.sqrt(variance).toFixed(1)
})

const mostBusyServer = computed(() => {
  if (servers.value.length === 0) return null
  return servers.value.reduce((max, s) => s.load > max.load ? s : max, servers.value[0]).name
})

// Lắng nghe thay đổi số lượng server
watch(serverCount, (newVal) => {
  if (!isSimulating.value) {
    servers.value = generateServers(newVal)
  }
})
</script>

<style scoped>
.load-balancing-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.strategy-selector {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.selector-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.strategy-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.strategy-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.strategy-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.strategy-tab.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.tab-icon {
  font-size: 1.75rem;
}

.tab-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.tab-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #22c55e;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
}

.simulation-area {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.sim-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.sim-controls {
  display: flex;
  gap: 0.5rem;
}

.sim-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.sim-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.sim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sim-btn.reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.strategy-explanation {
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1), rgba(var(--vp-c-brand-rgb), 0.05));
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.exp-icon {
  font-size: 1.5rem;
}

.exp-content {
  flex: 1;
}

.exp-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.exp-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.servers-pool {
  margin-bottom: 1.5rem;
}

.pool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.pool-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.pool-config {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.pool-config input[type="range"] {
  width: 120px;
}

.pool-config span {
  min-width: 50px;
  font-weight: 600;
}

.servers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.server-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.server-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.server-card.active {
  box-shadow: 0 0 0 3px currentColor;
}

.server-card.overloaded {
  background: #fef2f2;
  border-color: #ef4444;
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

.server-name {
  flex: 1;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.server-status {
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.server-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.metric-label {
  color: var(--vp-c-text-2);
}

.metric-value {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.weight-input {
  width: 50px;
  padding: 0.1rem 0.25rem;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.load-bar {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.load-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.recent-requests {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.req-label {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.req-list {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.req-badge {
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
}

.request-queue {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.queue-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.queue-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 200px;
  
}

.queue-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: white;
  border-radius: 5px;
  font-size: 0.8rem;
  border-left: 3px solid var(--vp-c-divider);
}

.queue-item.pending {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.queue-item.assigned {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.req-id {
  font-weight: 700;
  color: var(--vp-c-text-1);
  min-width: 40px;
}

.req-arrow {
  color: var(--vp-c-text-2);
}

.req-target {
  font-weight: 700;
}

.req-status {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.strategy-stats {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.stats-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.stat-card {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .strategy-tabs {
    grid-template-columns: 1fr;
  }

  .auth-tabs {
    grid-template-columns: 1fr;
  }

  .servers-grid {
    grid-template-columns: 1fr;
  }

  .server-metrics {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
