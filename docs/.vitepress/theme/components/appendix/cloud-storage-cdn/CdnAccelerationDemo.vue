<!--
  CdnAccelerationDemo.vue
  Demo nguyên lý tăng tốc CDN - minh họa khái niệm edge node, origin và origin fetch
-->
<template>
  <div class="cdn-acceleration-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">Nguyên lý tăng tốc CDN</span>
      <span class="subtitle">Edge node, origin và origin fetch phối hợp với nhau</span>
    </div>

    <div class="cdn-architecture">
      <!-- User layer -->
      <div class="layer users-layer">
        <div class="layer-title">
          <span class="icon">👥</span>
          <span>User toàn cầu</span>
        </div>
        <div class="users-map">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-marker"
            :class="{ active: activeUser === user.id, requesting: requestingUser === user.id }"
            :style="{ left: user.x + '%', top: user.y + '%' }"
            @click="selectUser(user)"
          >
            <div class="user-icon">
              {{ user.icon }}
            </div>
            <div class="user-label">
              {{ user.name }}
            </div>
          </div>

          <!-- Đường animation request -->
          <div
            v-if="requestAnimation"
            class="request-line"
            :style="requestLineStyle"
          />
        </div>
      </div>

      <!-- Edge node layer -->
      <div class="layer edge-layer">
        <div class="layer-title">
          <span class="icon">🌐</span>
          <span>Edge node CDN (Edge Nodes)</span>
          <span
            class="layer-status"
            :class="{ hit: cacheHit, miss: !cacheHit && showCacheStatus }"
          >
            {{ cacheStatusText }}
          </span>
        </div>

        <div class="edge-nodes">
          <div
            v-for="node in edgeNodes"
            :key="node.id"
            class="edge-node"
            :class="{ active: activeNode === node.id, serving: servingNode === node.id }"
            @click="selectNode(node)"
          >
            <div class="node-icon">
              {{ node.icon }}
            </div>
            <div class="node-info">
              <div class="node-name">
                {{ node.name }}
              </div>
              <div class="node-location">
                {{ node.location }}
              </div>
            </div>
            <div class="node-stats">
              <div class="stat">
                <span class="stat-label">Cache</span>
                <span class="stat-value">{{ node.cacheSize }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Hit</span>
                <span
                  class="stat-value"
                  :style="{ color: node.hitRate > 80 ? 'var(--vp-c-brand-1)' : 'var(--vp-c-brand)' }"
                >
                  {{ node.hitRate }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Origin layer -->
      <div class="layer origin-layer">
        <div class="layer-title">
          <span class="icon">🏢</span>
          <span>Origin (Origin Server)</span>
          <span
            class="layer-status"
            :class="{ active: showBackToSource }"
          >
            {{ backToSourceText }}
          </span>
        </div>

        <div class="origin-servers">
          <div class="origin-server">
            <div class="server-icon">
              🗄️
            </div>
            <div class="server-info">
              <div class="server-name">
                Object storage origin
              </div>
              <div class="server-address">
                bucket.oss-cn-beijing.aliyuncs.com
              </div>
            </div>
            <div class="server-status">
              <span class="status-dot active" />
              <span class="status-text">Healthy</span>
            </div>
          </div>

          <div
            v-if="showBackToSource"
            class="back-to-source-flow"
          >
            <div class="flow-arrow">
              <span>⬆️ Origin fetch</span>
            </div>
            <div class="flow-detail">
              <div class="flow-step">
                1. Edge node CDN cache miss
              </div>
              <div class="flow-step">
                2. Gửi yêu cầu fetch về origin
              </div>
              <div class="flow-step">
                3. Origin trả về nội dung file
              </div>
              <div class="flow-step">
                4. CDN cache lại và trả về cho user
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Khu vực điều khiển tương tác -->
    <div class="demo-controls">
      <div class="controls-title">
        🎮 Mô phỏng demo
      </div>
      <div class="controls-row">
        <button
          class="control-btn"
          @click="simulateCacheHit"
        >
          <span>✅</span>
          <span>Mô phỏng cache hit</span>
        </button>
        <button
          class="control-btn"
          @click="simulateCacheMiss"
        >
          <span>❌</span>
          <span>Mô phỏng cache miss (origin fetch)</span>
        </button>
        <button
          class="control-btn reset"
          @click="resetDemo"
        >
          <span>🔄</span>
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Thông tin thống kê -->
    <div class="stats-panel">
      <div class="stats-title">
        📊 Thống kê truy cập
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div
            class="stat-value"
            :style="{ color: 'var(--vp-c-brand-1)' }"
          >
            {{ stats.cacheHit }}
          </div>
          <div class="stat-label">
            Cache hit
          </div>
        </div>
        <div class="stat-card">
          <div
            class="stat-value"
            :style="{ color: 'var(--vp-c-brand-delta)' }"
          >
            {{ stats.cacheMiss }}
          </div>
          <div class="stat-label">
            Cache miss
          </div>
        </div>
        <div class="stat-card">
          <div
            class="stat-value"
            :style="{ color: stats.hitRate > 80 ? 'var(--vp-c-brand-1)' : 'var(--vp-c-brand)' }"
          >
            {{ stats.hitRate }}%
          </div>
          <div class="stat-label">
            Hit rate
          </div>
        </div>
        <div class="stat-card">
          <div
            class="stat-value"
            :style="{ color: 'var(--vp-c-brand)' }"
          >
            {{ stats.avgResponseTime }}ms
          </div>
          <div class="stat-label">
            Phản hồi trung bình
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> CDN giống như mở chi nhánh khắp toàn cầu — user truy cập chi nhánh gần nhất để lấy tài nguyên, không cần chạy đến cửa hàng chính, nên tự nhiên nhanh hơn.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Dữ liệu user
const users = [
  { id: 'user1', name: 'User Hà Nội', icon: '👤', x: 75, y: 35 },
  { id: 'user2', name: 'User TP.HCM', icon: '👤', x: 80, y: 55 },
  { id: 'user3', name: 'User Đà Nẵng', icon: '👤', x: 70, y: 75 },
  { id: 'user4', name: 'User Cần Thơ', icon: '👤', x: 50, y: 60 },
  { id: 'user5', name: 'User quốc tế', icon: '👤', x: 90, y: 25 }
]

// Dữ liệu edge node
const edgeNodes = [
  { id: 'node1', name: 'Node Hà Nội', icon: '🌐', location: 'Miền Bắc', cacheSize: '2.5 TB', hitRate: 92 },
  { id: 'node2', name: 'Node TP.HCM', icon: '🌐', location: 'Miền Nam', cacheSize: '3.1 TB', hitRate: 89 },
  { id: 'node3', name: 'Node Đà Nẵng', icon: '🌐', location: 'Miền Trung', cacheSize: '1.8 TB', hitRate: 87 },
  { id: 'node4', name: 'Node Cần Thơ', icon: '🌐', location: 'Tây Nam', cacheSize: '1.2 TB', hitRate: 85 }
]

// Trạng thái
const activeUser = ref(null)
const requestingUser = ref(null)
const activeNode = ref(null)
const servingNode = ref(null)
const cacheHit = ref(false)
const showCacheStatus = ref(false)
const showBackToSource = ref(false)
const requestAnimation = ref(false)

// Thống kê
const stats = reactive({
  cacheHit: 0,
  cacheMiss: 0,
  hitRate: 0,
  avgResponseTime: 0
})

// Computed
const requestLineStyle = computed(() => {
  if (!activeUser.value || !activeNode.value) return {}
  // Đơn giản hóa, thực tế cần tính đường nối từ user đến node
  return {}
})

const cacheStatusText = computed(() => {
  if (!showCacheStatus.value) return ''
  return cacheHit.value ? '✅ Cache hit' : '❌ Miss'
})

const backToSourceText = computed(() => {
  if (!showBackToSource.value) return ''
  return '📥 Đang fetch origin...'
})

// Methods
const selectUser = (user) => {
  activeUser.value = user.id
}

const selectNode = (node) => {
  activeNode.value = node.id
}

const simulateCacheHit = () => {
  resetDemo()
  stats.cacheHit++
  updateStats()

  // Mô phỏng luồng cache hit
  activeUser.value = 'user1'
  requestingUser.value = 'user1'
  activeNode.value = 'node1'
  servingNode.value = 'node1'

  setTimeout(() => {
    showCacheStatus.value = true
    cacheHit.value = true
  }, 500)
}

const simulateCacheMiss = () => {
  resetDemo()
  stats.cacheMiss++
  updateStats()

  // Mô phỏng luồng cache miss (origin fetch)
  activeUser.value = 'user3'
  requestingUser.value = 'user3'
  activeNode.value = 'node3'
  servingNode.value = 'node3'

  setTimeout(() => {
    showCacheStatus.value = true
    cacheHit.value = false
    showBackToSource.value = true
  }, 500)
}

const updateStats = () => {
  const total = stats.cacheHit + stats.cacheMiss
  stats.hitRate = total > 0 ? Math.round((stats.cacheHit / total) * 100) : 0
  // Mô phỏng thời gian phản hồi trung bình: hit ~20ms, miss ~200ms
  stats.avgResponseTime = total > 0
    ? Math.round((stats.cacheHit * 20 + stats.cacheMiss * 200) / total)
    : 0
}

const resetDemo = () => {
  activeUser.value = null
  requestingUser.value = null
  activeNode.value = null
  servingNode.value = null
  cacheHit.value = false
  showCacheStatus.value = false
  showBackToSource.value = false
  requestAnimation.value = false
}
</script>

<style scoped>
.cdn-acceleration-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.cdn-architecture {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.4rem;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
}

.layer-title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.layer-title .icon {
  font-size: 0.9rem;
}

.layer-status {
  margin-left: auto;
  font-size: 0.6rem;
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
  font-weight: 600;
}

.layer-status.hit {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.layer-status.miss {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
  color: var(--vp-c-brand-delta);
}

.layer-status.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.users-map {
  position: relative;
  height: 80px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  grid-column: 1 / -1;
}

.user-marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: translate(-50%, -50%);
}

.user-marker:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.user-marker.active {
  z-index: 10;
}

.user-marker.requesting .user-icon {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.user-icon {
  font-size: 1rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.user-label {
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-top: 0.15rem;
  white-space: nowrap;
  background: var(--vp-c-bg);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
}

.edge-nodes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.edge-node {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.edge-node:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.edge-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.edge-node.serving {
  animation: servingPulse 1s ease-in-out;
}

@keyframes servingPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  50% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3); }
}

.node-icon {
  font-size: 1rem;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-name {
  font-weight: 600;
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.node-location {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
}

.node-stats {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.6rem;
  min-width: 50px;
}

.stat {
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.origin-servers {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.origin-server {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.server-icon {
  font-size: 1.2rem;
}

.server-info {
  flex: 1;
  min-width: 0;
}

.server-name {
  font-weight: 600;
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.server-address {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.server-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  animation: statusPulse 2s infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.back-to-source-flow {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.3rem;
}

.flow-arrow {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-delta);
  margin-bottom: 0.3rem;
}

.flow-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
}

.flow-step {
  font-size: 0.6rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
  border-left: 2px solid var(--vp-c-brand);
}

.demo-controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  grid-column: 1 / -1;
}

.controls-title {
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.controls-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.control-btn.reset {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.1);
  border-color: var(--vp-c-brand-delta);
  color: var(--vp-c-brand-delta);
}

.control-btn.reset:hover {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
}

.stats-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 0.4rem;
  grid-column: 1 / -1;
}

.stats-title {
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}

.stat-card {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.4rem;
  text-align: center;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.1rem;
}

.stat-label {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.4rem;
  display: flex;
  gap: 0.2rem;
  grid-column: 1 / -1;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
