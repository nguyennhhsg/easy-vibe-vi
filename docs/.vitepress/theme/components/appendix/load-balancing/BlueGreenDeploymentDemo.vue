<template>
  <div class="blue-green-deployment-demo">
    <div class="header">
      <div class="title">
        Blue-green deployment
      </div>
      <div class="subtitle">
        Chiến lược release zero-downtime kinh điển: hai môi trường, chuyển đổi tức thì
      </div>
    </div>

    <!-- Điều khiển trạng thái deploy -->
    <div class="deployment-control">
      <div class="status-display">
        <div
          class="status-item"
          :class="{ active: currentEnv === 'blue' }"
        >
          <div class="status-icon">
            🔵
          </div>
          <div class="status-label">
            Môi trường Blue
          </div>
          <div class="status-version">
            v{{ blueVersion }}
          </div>
          <div class="status-traffic">
            {{ currentEnv === 'blue' ? '100%' : '0%' }} traffic
          </div>
        </div>

        <div class="switch-control">
          <button
            class="switch-btn"
            :disabled="isSwitching"
            :class="{ switching: isSwitching }"
            @click="toggleEnvironment"
          >
            <span v-if="!isSwitching">
              {{ currentEnv === 'blue' ? 'Chuyển sang Green →' : '← Chuyển sang Blue' }}
            </span>
            <span
              v-else
              class="switching-text"
            >
              <span class="spinner" />
              Đang chuyển...
            </span>
          </button>

          <div
            v-if="isSwitching"
            class="progress-bar"
          >
            <div
              class="progress-fill"
              :style="{ width: switchProgress + '%' }"
            />
          </div>
        </div>

        <div
          class="status-item"
          :class="{ active: currentEnv === 'green' }"
        >
          <div class="status-icon">
            🟢
          </div>
          <div class="status-label">
            Môi trường Green
          </div>
          <div class="status-version">
            v{{ greenVersion }}
          </div>
          <div class="status-traffic">
            {{ currentEnv === 'green' ? '100%' : '0%' }} traffic
          </div>
        </div>
      </div>
    </div>

    <!-- Trực quan hoá kiến trúc -->
    <div class="architecture-view">
      <div class="layer users">
        <div class="layer-title">
          Traffic user
        </div>
        <div class="users-row">
          <div
            v-for="i in 5"
            :key="i"
            class="user-avatar"
            :class="{ active: isUserActive(i) }"
          >
            👤
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ↓
      </div>

      <div class="layer load-balancer">
        <div class="lb-box">
          <div class="lb-icon">
            ⚖️
          </div>
          <div class="lb-info">
            <div class="lb-title">
              Load balancer
            </div>
            <div class="lb-status">
              Hiện đang trỏ về:
              <span
                class="env-badge"
                :class="currentEnv"
              >
                {{ currentEnv === 'blue' ? '🔵 Blue' : '🟢 Green' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ↓
      </div>

      <div class="layer environments">
        <div class="env-row">
          <!-- Môi trường Blue -->
          <div
            class="env-box"
            :class="{ active: currentEnv === 'blue', standby: currentEnv === 'green' }"
          >
            <div class="env-header">
              <span class="env-icon">🔵</span>
              <span class="env-name">Môi trường Blue</span>
              <span class="env-badge version">v{{ blueVersion }}</span>
            </div>
            <div class="env-content">
              <div class="server-list">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="server-item"
                  :class="{ busy: isServerBusy('blue', i) }"
                >
                  <span class="server-icon">🖥️</span>
                  <span class="server-name">B{{ i }}</span>
                  <span
                    class="server-status"
                    :class="getServerStatus('blue', i)"
                  >
                    {{ getServerStatus('blue', i) === 'healthy' ? '●' : '○' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="env-footer">
              <div class="traffic-indicator">
                <span class="indicator-label">Traffic:</span>
                <span
                  class="indicator-value"
                  :class="{ active: currentEnv === 'blue' }"
                >
                  {{ currentEnv === 'blue' ? '100%' : '0%' }}
                </span>
              </div>
              <div
                class="status-badge"
                :class="currentEnv === 'blue' ? 'active' : 'standby'"
              >
                {{ currentEnv === 'blue' ? 'Production' : 'Standby' }}
              </div>
            </div>
          </div>

          <!-- Môi trường Green -->
          <div
            class="env-box"
            :class="{ active: currentEnv === 'green', standby: currentEnv === 'blue' }"
          >
            <div class="env-header">
              <span class="env-icon">🟢</span>
              <span class="env-name">Môi trường Green</span>
              <span class="env-badge version">v{{ greenVersion }}</span>
            </div>
            <div class="env-content">
              <div class="server-list">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="server-item"
                  :class="{ busy: isServerBusy('green', i) }"
                >
                  <span class="server-icon">🖥️</span>
                  <span class="server-name">G{{ i }}</span>
                  <span
                    class="server-status"
                    :class="getServerStatus('green', i)"
                  >
                    {{ getServerStatus('green', i) === 'healthy' ? '●' : '○' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="env-footer">
              <div class="traffic-indicator">
                <span class="indicator-label">Traffic:</span>
                <span
                  class="indicator-value"
                  :class="{ active: currentEnv === 'green' }"
                >
                  {{ currentEnv === 'green' ? '100%' : '0%' }}
                </span>
              </div>
              <div
                class="status-badge"
                :class="currentEnv === 'green' ? 'active' : 'standby'"
              >
                {{ currentEnv === 'green' ? 'Production' : 'Standby' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Luồng deployment -->
    <div class="deployment-process">
      <div class="process-title">
        Luồng blue-green deployment
      </div>
      <div class="process-steps">
        <div
          class="step"
          :class="{ active: deploymentStep >= 1 }"
        >
          <div class="step-number">
            1
          </div>
          <div class="step-content">
            <div class="step-title">
              Deploy môi trường Green
            </div>
            <div class="step-desc">
              Deploy bản mới vào Green, chạy smoke test
            </div>
          </div>
        </div>
        <div class="step-arrow">
          →
        </div>
        <div
          class="step"
          :class="{ active: deploymentStep >= 2 }"
        >
          <div class="step-number">
            2
          </div>
          <div class="step-content">
            <div class="step-title">
              Chuyển traffic
            </div>
            <div class="step-desc">
              Trỏ load balancer về Green, traffic chuyển tức thì
            </div>
          </div>
        </div>
        <div class="step-arrow">
          →
        </div>
        <div
          class="step"
          :class="{ active: deploymentStep >= 3 }"
        >
          <div class="step-number">
            3
          </div>
          <div class="step-content">
            <div class="step-title">
              Quan sát monitor
            </div>
            <div class="step-desc">
              Quan sát trạng thái chạy của Green, xác nhận không có bất thường
            </div>
          </div>
        </div>
        <div class="step-arrow">
          →
        </div>
        <div
          class="step"
          :class="{ active: deploymentStep >= 4 }"
        >
          <div class="step-number">
            4
          </div>
          <div class="step-content">
            <div class="step-title">
              Nâng cấp Blue
            </div>
            <div class="step-desc">
              Deploy bản mới vào Blue, chuẩn bị cho lần chuyển sau
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ưu điểm và nhược điểm -->
    <div class="pros-cons-analysis">
      <div class="analysis-title">
        Ưu điểm và nhược điểm của blue-green deployment
      </div>
      <div class="analysis-grid">
        <div class="analysis-card pros">
          <div class="card-header">
            <span class="header-icon">✅</span>
            <span class="header-title">Ưu điểm</span>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li class="feature-item">
                <span class="item-title">Zero downtime:</span>
                <span class="item-desc">Chuyển traffic chỉ vài millisecond, user không cảm nhận được</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Rollback nhanh:</span>
                <span class="item-desc">Phát hiện vấn đề là switch ngược về môi trường gốc, rủi ro kiểm soát được</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Test pre-release đầy đủ:</span>
                <span class="item-desc">Môi trường mới có thể test đầy đủ trước khi nhận traffic</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Nhất quán dữ liệu:</span>
                <span class="item-desc">Không phải xử lý vấn đề tương thích giữa bản cũ và bản mới chạy song song</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="analysis-card cons">
          <div class="card-header">
            <span class="header-icon">❌</span>
            <span class="header-title">Nhược điểm</span>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li class="feature-item">
                <span class="item-title">Chi phí tài nguyên cao:</span>
                <span class="item-desc">Phải duy trì đồng thời hai môi trường đầy đủ, chi phí server gấp đôi</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Thách thức tương thích database:</span>
                <span class="item-desc">Nếu có thay đổi schema database thì phải xử lý tương thích đặc biệt</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Vấn đề warm-up:</span>
                <span class="item-desc">Môi trường mới khởi động xong cần thời gian warm-up cache, connection pool, v.v.</span>
              </li>
              <li class="feature-item">
                <span class="item-title">Không phù hợp dịch vụ có state:</span>
                <span class="item-desc">Phức tạp với các tình huống yêu cầu giữ long connection, session</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const currentEnv = ref('blue')
const blueVersion = ref('1.0.0')
const greenVersion = ref('1.1.0')
const isSwitching = ref(false)
const switchProgress = ref(0)
const deploymentStep = ref(4)

// Dữ liệu server có trọng số
const weightedServers = ref([
  { id: 1, name: 'Server 1', specs: '16 core 64GB NVMe', ip: '10.0.1.10', weight: 5, status: 'healthy' },
  { id: 2, name: 'Server 2', specs: '8 core 32GB SSD', ip: '10.0.1.11', weight: 3, status: 'healthy' },
  { id: 3, name: 'Server 3', specs: '4 core 16GB SSD', ip: '10.0.1.12', weight: 2, status: 'healthy' }
])

const totalTraffic = ref(1000)

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

const isUserActive = (index) => {
  return index <= 3 || (currentEnv.value === 'green' && index > 3)
}

const isServerBusy = (env, index) => {
  return (currentEnv.value === env && index <= 2)
}

const getServerStatus = (env, index) => {
  return 'healthy'
}

const toggleEnvironment = async () => {
  if (isSwitching.value) return

  isSwitching.value = true
  switchProgress.value = 0

  // Mô phỏng tiến độ chuyển
  const interval = setInterval(() => {
    switchProgress.value += 10
    if (switchProgress.value >= 100) {
      clearInterval(interval)
      currentEnv.value = currentEnv.value === 'blue' ? 'green' : 'blue'
      isSwitching.value = false
      switchProgress.value = 0
    }
  }, 100)
}

onMounted(() => {
  generateTrafficFlows()
})
</script>

<style scoped>
.blue-green-deployment-demo {
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

/* Deployment Control */
.deployment-control {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.status-display {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 768px) {
  .status-display {
    grid-template-columns: 1fr;
  }
}

.status-item {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
  opacity: 0.6;
}

.status-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.status-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.status-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.status-version {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.status-traffic {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.switch-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.switch-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
}

.switch-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.switch-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.switch-btn.switching {
  background: linear-gradient(135deg, #6b7280, #9ca3af);
}

.switching-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  max-width: 200px;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #22c55e);
  border-radius: 3px;
  transition: width 0.1s;
}

/* Architecture View */
.architecture-view {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.layer {
  margin-bottom: 0.75rem;
}

.layer-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  font-size: 1.25rem;
  transition: all 0.3s;
  opacity: 0.5;
}

.user-avatar.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
  transform: scale(1.1);
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 0.25rem 0;
}

/* Load Balancer */
.load-balancer {
  display: flex;
  justify-content: center;
}

.lb-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.lb-icon {
  font-size: 2rem;
}

.lb-title {
  font-weight: 600;
  font-size: 1rem;
}

.lb-status {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}

.env-badge {
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.env-badge.blue {
  background: rgba(59, 130, 246, 0.3);
  color: #bfdbfe;
}

.env-badge.green {
  background: rgba(34, 197, 94, 0.3);
  color: #bbf7d0;
}

/* Environments */
.env-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .env-row {
    grid-template-columns: 1fr;
  }
}

.env-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  opacity: 0.7;
}

.env-box.active {
  border-color: var(--vp-c-brand);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.env-box.standby {
  border-color: var(--vp-c-text-3);
}

.env-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.env-icon {
  font-size: 1.25rem;
}

.env-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

.env-badge.version {
  font-size: 0.7rem;
  padding: 2px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
}

.env-content {
  padding: 0.75rem;
}

.server-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.server-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.server-item.busy {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.server-icon {
  font-size: 1rem;
}

.server-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
}

.server-status {
  font-size: 0.75rem;
}

.server-status.healthy {
  color: #22c55e;
}

.env-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.traffic-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.indicator-label {
  color: var(--vp-c-text-2);
}

.indicator-value {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.indicator-value.active {
  color: var(--vp-c-brand);
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.standby {
  background: #f3f4f6;
  color: #6b7280;
}

/* Deployment Process */
.deployment-process {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.process-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.3s;
}

.step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.step-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-text-3);
}

/* Pros Cons Analysis */
.pros-cons-analysis {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.analysis-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}

.analysis-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.analysis-card.pros {
  border-color: #22c55e;
}

.analysis-card.cons {
  border-color: #ef4444;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.analysis-card.pros .card-header {
  background: rgba(34, 197, 94, 0.1);
}

.analysis-card.cons .card-header {
  background: rgba(239, 68, 68, 0.1);
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 0.75rem;
}

.feature-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  line-height: 1.5;
}

.feature-item:last-child {
  border-bottom: none;
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.item-desc {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
</style>
