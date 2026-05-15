<!--
  ReverseProxyDemo.vue
  Nguyên lý reverse proxy - Forward proxy vs Reverse proxy
-->
<template>
  <div class="reverse-proxy-demo">
    <div class="header">
      <div class="title">
        🔄 Reverse proxy vs Forward proxy
      </div>
      <div class="subtitle">
        Phân biệt một câu: forward proxy là "proxy của client", reverse proxy là "proxy của server"
      </div>
    </div>

    <div class="mode-selector">
      <button
        :class="['mode-btn', { active: mode === 'forward' }]"
        @click="mode = 'forward'"
      >
        🔓 Forward proxy (vượt tường lửa / ẩn danh)
      </button>
      <button
        :class="['mode-btn', { active: mode === 'reverse' }]"
        @click="mode = 'reverse'"
      >
        🛡️ Reverse proxy (cân bằng tải / bảo mật)
      </button>
    </div>

    <div class="flow-container">
      <div
        v-if="mode === 'forward'"
        class="flow-row"
      >
        <div class="flow-card client">
          <div class="icon">
            👤
          </div>
          <div class="label">
            User (muốn vượt tường lửa)
          </div>
        </div>
        <div class="arrow-box">
          <div class="arrow">
            →
          </div>
          <div class="note">
            Gửi tới proxy
          </div>
        </div>
        <div class="flow-card proxy forward">
          <div class="icon">
            🔓
          </div>
          <div class="label">
            Forward proxy (VPN/SS)
          </div>
          <div class="tag">
            Proxy của client
          </div>
        </div>
        <div class="arrow-box">
          <div class="arrow">
            →
          </div>
          <div class="note">
            Forward request
          </div>
        </div>
        <div class="flow-card target">
          <div class="icon">
            🌐
          </div>
          <div class="label">
            Website đích (Google)
          </div>
        </div>
      </div>

      <div
        v-if="mode === 'reverse'"
        class="flow-row"
      >
        <div class="flow-card client">
          <div class="icon">
            👤
          </div>
          <div class="label">
            User (browser)
          </div>
        </div>
        <div class="arrow-box">
          <div class="arrow">
            →
          </div>
          <div class="note">
            Truy cập domain
          </div>
        </div>
        <div class="flow-card proxy reverse">
          <div class="icon">
            🛡️
          </div>
          <div class="label">
            Reverse proxy (Nginx)
          </div>
          <div class="tag">
            Proxy của server
          </div>
        </div>
        <div class="arrow-box">
          <div class="arrow">
            →
          </div>
          <div class="note">
            Cân bằng tải
          </div>
        </div>
        <div class="flow-card server">
          <div class="icon">
            ⚙️
          </div>
          <div class="label">
            Cluster server backend
          </div>
          <div class="sub-label">
            Web1 | Web2 | Web3
          </div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-card">
        <div class="detail-title">
          {{ mode === 'forward' ? '🔓 Đặc điểm forward proxy' : '🛡️ Đặc điểm reverse proxy' }}
        </div>
        <ul class="detail-list">
          <li
            v-for="(item, index) in currentFeatures"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="detail-card">
        <div class="detail-title">
          💡 Tình huống sử dụng điển hình
        </div>
        <ul class="detail-list">
          <li
            v-for="(item, index) in currentScenarios"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="memory-trick">
      <div class="trick-title">
        🧠 Mẹo nhớ
      </div>
      <div class="trick-content">
        <p v-if="mode === 'forward'">
          <strong>"Forward proxy = proxy của client"</strong> — client biết về proxy, server chỉ biết IP của proxy
        </p>
        <p v-else>
          <strong>"Reverse proxy = proxy của server"</strong> — client không biết server thật, chỉ biết domain
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('reverse')

const forwardFeatures = [
  'Client phải chủ động cấu hình địa chỉ proxy',
  'Server chỉ thấy IP proxy, không biết IP client thật',
  'Chủ yếu dùng để vượt tường lửa, ẩn danh, vượt rào mạng',
  'Đại diện điển hình: VPN, Shadowsocks, V2Ray'
]

const reverseFeatures = [
  'Client không cần biết gì, chỉ cần truy cập domain',
  'Ẩn kiến trúc server thật, thống nhất interface ra ngoài',
  'Cung cấp cân bằng tải, bảo mật, SSL termination, v.v.',
  'Đại diện điển hình: Nginx, HAProxy, AWS ELB'
]

const forwardScenarios = [
  'Truy cập website bị chặn (Google, YouTube)',
  'Ẩn IP thật, bảo vệ quyền riêng tư',
  'Mạng nội bộ công ty truy cập tài nguyên bên ngoài',
  'Chương trình crawler dùng proxy pool để tránh bị ban IP'
]

const reverseScenarios = [
  'Website cần gánh lưu lượng đồng thời cao (cân bằng tải)',
  'Quản lý chứng chỉ HTTPS thống nhất (SSL termination)',
  'Phòng vệ tấn công DDoS và SQL injection',
  'Canary release, A/B test, blue-green deployment'
]

const currentFeatures = computed(() => mode.value === 'forward' ? forwardFeatures : reverseFeatures)
const currentScenarios = computed(() => mode.value === 'forward' ? forwardScenarios : reverseScenarios)
</script>

<style scoped>
.reverse-proxy-demo {
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
  line-height: 1.5;
}

.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.mode-btn {
  flex: 1;
  min-width: 200px;
  padding: 1rem 1.5rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.95rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.flow-container {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.flow-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  min-width: 100px;
  text-align: center;
  transition: all 0.3s;
}

.flow-card.client {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
}

.flow-card.proxy {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  position: relative;
}

.flow-card.proxy.forward {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #22c55e;
}

.flow-card.proxy.reverse {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  border-color: #ec4899;
}

.flow-card.target {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  border: 2px solid #6366f1;
}

.flow-card.server {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 2px solid #a855f7;
}

.flow-card .icon {
  font-size: 2rem;
}

.flow-card .label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.flow-card .sub-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.flow-card .tag {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
}

.arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.arrow .miss-text {
  font-size: 0.75rem;
  color: #ef4444;
}

.note {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.detail-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
}

.detail-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.detail-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.8;
}

.memory-trick {
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1), rgba(var(--vp-c-brand-rgb), 0.05));
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
}

.trick-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.trick-content {
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .flow-row {
    flex-direction: column;
    gap: 1rem;
  }

  .detail-section {
    grid-template-columns: 1fr;
  }

  .mode-btn {
    min-width: 100%;
  }
}
</style>
