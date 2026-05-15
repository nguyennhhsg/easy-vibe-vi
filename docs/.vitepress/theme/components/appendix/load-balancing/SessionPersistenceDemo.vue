<template>
  <div class="session-persistence-demo">
    <div class="header">
      <div class="title">
        Cơ chế session persistence
      </div>
      <div class="subtitle">
        So sánh kỹ thuật giữa Cookie, IP hash và sticky session
      </div>
    </div>

    <!-- Chọn kịch bản -->
    <div class="scenario-selector">
      <div class="scenario-label">
        Tình huống ứng dụng:
      </div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.key"
          class="scenario-btn"
          :class="{ active: currentScenario === scenario.key }"
          @click="currentScenario = scenario.key"
        >
          {{ scenario.name }}
        </button>
      </div>
    </div>

    <!-- Bộ chọn cơ chế -->
    <div class="mechanism-selector">
      <button
        v-for="mech in mechanisms"
        :key="mech.key"
        class="mechanism-btn"
        :class="{ active: currentMechanism === mech.key }"
        @click="currentMechanism = mech.key"
      >
        <span class="mechanism-icon">{{ mech.icon }}</span>
        <span class="mechanism-name">{{ mech.name }}</span>
        <span class="mechanism-tag">{{ mech.tag }}</span>
      </button>
    </div>

    <!-- Khu demo trực quan -->
    <div class="demo-stage">
      <!-- Tầng user -->
      <div class="user-layer">
        <div class="user-avatars">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-avatar"
            :class="{ active: activeUser === user.id }"
            @click="activeUser = user.id"
          >
            <div class="avatar-icon">
              {{ user.avatar }}
            </div>
            <div class="user-name">
              {{ user.name }}
            </div>
            <div
              v-if="hasSessionCookie"
              class="cookie-badge"
            >
              🍪
            </div>
          </div>
        </div>
      </div>

      <!-- Luồng request -->
      <div class="request-flow">
        <div class="flow-step">
          <div class="step-label">
            Request
          </div>
          <div class="step-arrow">
            ↓
          </div>
        </div>

        <!-- Load balancer -->
        <div class="lb-box">
          <div class="lb-header">
            <span class="lb-icon">⚖️</span>
            <span class="lb-title">Load balancer</span>
          </div>
          <div class="lb-mechanism">
            <div class="mechanism-display">
              <span class="display-icon">{{ currentMechanismData.icon }}</span>
              <div class="display-info">
                <div class="display-name">
                  {{ currentMechanismData.name }}
                </div>
                <div class="display-desc">
                  {{ currentMechanismData.shortDesc }}
                </div>
              </div>
            </div>
          </div>
          <!-- Bảng session -->
          <div
            v-if="currentMechanism === 'cookie' || currentMechanism === 'sticky'"
            class="session-table"
          >
            <div class="table-title">
              Bảng ánh xạ session
            </div>
            <div class="table-rows">
              <div
                v-for="mapping in sessionMappings"
                :key="mapping.session"
                class="table-row"
              >
                <span class="session-id">{{ mapping.session }}</span>
                <span class="mapping-arrow">→</span>
                <span class="server-name">{{ mapping.server }}</span>
              </div>
            </div>
          </div>
          <!-- Vòng IP hash -->
          <div
            v-if="currentMechanism === 'iphash'"
            class="hash-ring"
          >
            <div class="ring-title">
              Vòng IP hash
            </div>
            <div class="ring-visual">
              <div
                v-for="(server, index) in hashRingServers"
                :key="index"
                class="ring-segment"
                :style="getSegmentStyle(index)"
                :title="server"
              >
                {{ server.slice(-1) }}
              </div>
            </div>
            <div class="hash-formula">
              <code>server = hash(client_ip) % server_count</code>
            </div>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-arrow">
            ↓
          </div>
        </div>

        <!-- Backend server -->
        <div class="backend-servers">
          <div
            v-for="server in backendServers"
            :key="server.id"
            class="backend-server"
            :class="{ target: isTargetServer(server.id) }"
          >
            <div class="server-icon">
              🖥️
            </div>
            <div class="server-info">
              <div class="server-name">
                {{ server.name }}
              </div>
              <div class="server-ip">
                {{ server.ip }}
              </div>
            </div>
            <div
              class="server-status"
              :class="server.status"
            >
              {{ server.status === 'healthy' ? '✓' : '✗' }}
            </div>
            <div
              v-if="isTargetServer(server.id)"
              class="selected-indicator"
            >
              Đã chọn
            </div>
          </div>
        </div>
      </div>

      <!-- Luồng response -->
      <div
        v-if="currentMechanism === 'cookie'"
        class="response-flow"
      >
        <div class="flow-step">
          <div class="step-arrow">
            ↑
          </div>
        </div>
        <div class="set-cookie-box">
          <div class="cookie-header">
            <span class="cookie-icon">🍪</span>
            <span class="cookie-title">Header Set-Cookie</span>
          </div>
          <div class="cookie-content">
            <code>SERVERID=srv001; Path=/; HttpOnly</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng so sánh -->
    <div class="mechanism-comparison">
      <div class="comparison-title">
        So sánh ba cơ chế session persistence
      </div>
      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">🍪</span>
            <span class="card-title">Cookie insertion</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Không bị ảnh hưởng khi IP client đổi</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Giữ session ngay từ request đầu tiên</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>Client phải hỗ trợ Cookie</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>Có rủi ro Cookie bị tắt</span>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">#️⃣</span>
            <span class="card-title">IP Hash</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Không cần client hỗ trợ cơ chế gì</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Stateless, LB restart không ảnh hưởng session</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>IP client đổi sẽ mất session</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>Khó cân bằng tải thật sự</span>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">📝</span>
            <span class="card-title">Sticky session</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Kết hợp ưu điểm của Cookie và IP</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>Hỗ trợ session replication và failover</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>Triển khai phức tạp, cần ứng dụng hỗ trợ</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>Session replication tốn hiệu năng</span>
              </div>
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
const currentScenario = ref('shopping')
const currentMechanism = ref('cookie')
const activeUser = ref(1)

const modes = [
  { key: 'active', name: 'Check chủ động', icon: '🔍' },
  { key: 'passive', name: 'Quan sát bị động', icon: '👁️' },
  { key: 'threshold', name: 'Đánh giá ngưỡng', icon: '📊' }
]

const scenarios = [
  { key: 'shopping', name: 'Giỏ hàng' },
  { key: 'login', name: 'Trạng thái login' },
  { key: 'websocket', name: 'Truyền tin real-time' }
]

const mechanisms = [
  { key: 'cookie', name: 'Cookie insertion', icon: '🍪', tag: 'Application' },
  { key: 'iphash', name: 'IP hash', icon: '#️⃣', tag: 'Transport' },
  { key: 'sticky', name: 'Sticky session', icon: '📝', tag: 'Session' }
]

const currentMechanismData = computed(() => {
  const data = {
    cookie: {
      name: 'Cookie insertion',
      icon: '🍪',
      label: 'Set-Cookie',
      shortDesc: 'Giữ session qua HTTP Cookie',
      description: 'Load balancer đặt Cookie cho client ở response đầu tiên (ví dụ SERVERID=srv001), các request sau mang theo Cookie này, LB dựa vào giá trị Cookie để route request về đúng backend server.'
    },
    iphash: {
      name: 'IP hash',
      icon: '#️⃣',
      label: 'IP Hash',
      shortDesc: 'Hash dựa vào IP client',
      description: 'Tính hash từ địa chỉ IP client (ví dụ hash(client_ip) % server_count), xác định request sẽ về backend nào. Request cùng IP luôn về cùng server.'
    },
    sticky: {
      name: 'Sticky session',
      icon: '📝',
      label: 'Sticky Session',
      shortDesc: 'Server giữ bảng map session',
      description: 'Load balancer giữ bảng map session trong memory (session_id -> server), request đầu thiết lập map, các request sau cùng session ID đều route về cùng server. Hỗ trợ session replication để có high availability.'
    }
  }
  return data[currentMechanism.value]
})

const users = [
  { id: 1, name: 'User A', avatar: '👤', ip: '192.168.1.100' },
  { id: 2, name: 'User B', avatar: '👥', ip: '192.168.1.101' },
  { id: 3, name: 'User C', avatar: '👨‍💼', ip: '192.168.1.102' }
]

const sessionMappings = [
  { session: 'sess_abc123', server: 'Server 1' },
  { session: 'sess_def456', server: 'Server 2' },
  { session: 'sess_ghi789', server: 'Server 1' }
]

const hashRingServers = ['Server 1', 'Server 2', 'Server 3', 'Server 4']

const backendServers = [
  { id: 1, name: 'Server 1', ip: '10.0.1.10', status: 'healthy' },
  { id: 2, name: 'Server 2', ip: '10.0.1.11', status: 'healthy' },
  { id: 3, name: 'Server 3', ip: '10.0.1.12', status: 'unhealthy' }
]

const hasSessionCookie = computed(() => {
  return currentMechanism.value === 'cookie' && activeUser.value > 0
})

const isTargetServer = (serverId) => {
  // Mô phỏng chọn server đích theo cơ chế
  if (currentMechanism.value === 'iphash') {
    return serverId === ((activeUser.value + serverId) % 3) + 1
  }
  return serverId === 1 || (activeUser.value === serverId)
}

const getSegmentStyle = (index) => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']
  const rotation = index * 90
  return {
    background: colors[index],
    transform: `rotate(${rotation}deg) translateY(-20px)`
  }
}

// Demo luân phiên
let demoInterval
onMounted(() => {
  demoInterval = setInterval(() => {
    activeUser.value = (activeUser.value % 3) + 1
  }, 3000)
})

onUnmounted(() => {
  clearInterval(demoInterval)
})
</script>

<style scoped>
.session-persistence-demo {
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
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Scenario Selector */
.scenario-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.scenario-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.scenario-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.scenario-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* Mechanism Selector */
.mechanism-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .mechanism-selector {
    grid-template-columns: 1fr;
  }
}

.mechanism-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.mechanism-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.mechanism-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mechanism-icon {
  font-size: 1.5rem;
}

.mechanism-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mechanism-tag {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 1px 4px;
  border-radius: 3px;
}

/* Demo Stage */
.demo-stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* User Layer */
.user-layer {
  margin-bottom: 1.5rem;
}

.user-avatars {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.user-avatar:hover {
  background: var(--vp-c-bg-soft);
}

.user-avatar.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.avatar-icon {
  font-size: 2rem;
}

.user-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cookie-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 1rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Request Flow */
.request-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  line-height: 1;
}

/* LB Box */
.lb-box {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.lb-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.lb-icon {
  font-size: 1.25rem;
}

.lb-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lb-mechanism {
  margin-bottom: 1rem;
}

.mechanism-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.display-icon {
  font-size: 1.5rem;
}

.display-info {
  flex: 1;
}

.display-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.display-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Session Table */
.session-table {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
}

.table-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.table-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-family: monospace;
}

.session-id {
  color: #3b82f6;
}

.mapping-arrow {
  color: #94a3b8;
}

.server-name {
  color: #22c55e;
}

/* Hash Ring */
.hash-ring {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
}

.ring-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  text-align: center;
}

.ring-visual {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.ring-segment {
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

.hash-formula {
  text-align: center;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
}

.hash-formula code {
  font-size: 0.75rem;
  color: #3b82f6;
}

/* Backend Servers */
.backend-servers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}

@media (max-width: 768px) {
  .backend-servers {
    grid-template-columns: 1fr;
  }
}

.backend-server {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: all 0.3s;
  position: relative;
}

.backend-server.target {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.server-icon {
  font-size: 1.5rem;
}

.server-info {
  text-align: center;
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

.server-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.7rem;
}

.server-status.healthy {
  background: #dcfce7;
  color: #16a34a;
}

.server-status.unhealthy {
  background: #fee2e2;
  color: #dc2626;
}

.selected-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Response Flow - Set Cookie */
.response-flow {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.set-cookie-box {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.cookie-icon {
  font-size: 1.25rem;
}

.cookie-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #92400e;
}

.cookie-content {
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  border-radius: 4px;
  color: #78350f;
}

/* Mechanism Comparison */
.mechanism-comparison {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0.75rem;
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

.comparison-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.comparison-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison-card .card-icon {
  font-size: 1.25rem;
}

.comparison-card .card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.comparison-card .card-body {
  padding: 0.75rem;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.feature-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: bold;
  margin-top: 2px;
}

.feature-icon.good {
  background: #dcfce7;
  color: #16a34a;
}

.feature-icon.bad {
  background: #fee2e2;
  color: #dc2626;
}
</style>
