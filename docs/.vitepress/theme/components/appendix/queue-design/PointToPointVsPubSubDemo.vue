<!--
  PointToPointVsPubSubDemo.vue
  Demo so sánh point-to-point vs pub/sub
-->
<template>
  <div class="messaging-patterns-demo">
    <div class="header">
      <div class="title">
        Pattern message: point-to-point vs pub/sub
      </div>
      <div class="subtitle">
        Chọn pattern và quan sát cách message được phân phối
      </div>
    </div>

    <div class="mode-selector">
      <button
        class="mode-btn"
        :class="{ active: mode === 'p2p' }"
        @click="setMode('p2p')"
      >
        Point-to-point (P2P)
      </button>
      <button
        class="mode-btn"
        :class="{ active: mode === 'pubsub' }"
        @click="setMode('pubsub')"
      >
        Pub/Sub
      </button>
    </div>

    <div class="description">
      <div
        v-if="mode === 'p2p'"
        class="desc-text"
      >
        <strong>Pattern point-to-point:</strong> một message chỉ được <strong>một consumer</strong> consume. Phù hợp cho phân phối task, load balancing.
      </div>
      <div
        v-else
        class="desc-text"
      >
        <strong>Pattern pub/sub:</strong> một message có thể được <strong>nhiều consumer</strong> nhận cùng lúc. Phù hợp cho event notification, broadcast.
      </div>
    </div>

    <div class="demo-area">
      <div class="producer-section">
        <div class="section-title">
          Producer
        </div>
        <div class="producer-box">
          <div class="icon">
            📤
          </div>
          <div class="label">
            Service đơn hàng
          </div>
        </div>
        <button
          class="send-btn"
          :disabled="sending"
          @click="sendMessage"
        >
          {{ sending ? 'Đang gửi...' : 'Gửi message' }}
        </button>
      </div>

      <div class="broker-section">
        <div class="section-title">
          {{ mode === 'p2p' ? 'Queue' : 'Topic' }}
        </div>
        <div class="broker-box">
          <div class="broker-icon">
            {{ mode === 'p2p' ? '📦' : '📡' }}
          </div>
          <div class="broker-label">
            {{ mode === 'p2p' ? 'Message queue' : 'Topic publish' }}
          </div>
          <div
            v-if="lastMessage"
            class="message-indicator"
          >
            Message #{{ lastMessage }}
          </div>
        </div>
        <div class="mode-badge">
          {{ mode === 'p2p' ? 'Cạnh tranh consume' : 'Broadcast' }}
        </div>
      </div>

      <div class="consumer-section">
        <div class="section-title">
          Consumer
        </div>
        <div class="consumers-grid">
          <div
            v-for="consumer in consumers"
            :key="consumer.id"
            class="consumer-box"
            :class="{ active: consumer.active }"
          >
            <div class="consumer-icon">
              {{ consumer.active ? '⚙️' : '💤' }}
            </div>
            <div class="consumer-label">
              {{ consumer.name }}
            </div>
            <div class="consumer-count">
              Đã xử lý: {{ consumer.count }}
            </div>
            <div class="consumer-status">
              {{ consumer.active ? 'Đang xử lý' : 'Rảnh' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Đặc tính</th>
            <th>Point-to-point (P2P)</th>
            <th>Pub/Sub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Consume message</td>
            <td>Một consumer</td>
            <td>Nhiều consumer</td>
          </tr>
          <tr>
            <td>Use case tiêu biểu</td>
            <td>Phân phối task, load balancing</td>
            <td>Event notification, broadcast data</td>
          </tr>
          <tr>
            <td>Quan hệ consume</td>
            <td>Cạnh tranh consume</td>
            <td>Subscribe độc lập</td>
          </tr>
          <tr>
            <td>Ví dụ</td>
            <td>Phân phối task export Excel cho các worker node</td>
            <td>Sau khi user đăng ký, gửi email + SMS + voucher</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="example-scenario">
      <div class="scenario-title">
        📌 Use case thực tế
      </div>
      <div
        v-if="mode === 'p2p'"
        class="scenario-content"
      >
        <div>
          <strong>Phân phối task:</strong> import hàng loạt 10000 user, phân phối cho 3
          worker node xử lý song song
        </div>
        <div class="flow">
          Task enqueue → [Worker1, Worker2, Worker3] cạnh tranh giành task →
          mỗi task chỉ được xử lý một lần
        </div>
      </div>
      <div
        v-else
        class="scenario-content"
      >
        <div><strong>Event notification:</strong> sau khi user đặt đơn thành công, thông báo đồng thời nhiều hệ thống</div>
        <div class="flow">
          Publish event → [Service kho, service điểm thưởng, service thông báo, data warehouse] xử lý độc lập
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('p2p')
const sending = ref(false)
const lastMessage = ref(null)
let messageId = 0

const consumers = ref([
  { id: 1, name: 'Consumer A', count: 0, active: false },
  { id: 2, name: 'Consumer B', count: 0, active: false },
  { id: 3, name: 'Consumer C', count: 0, active: false }
])

const setMode = (newMode) => {
  mode.value = newMode
  consumers.value.forEach((c) => {
    c.count = 0
    c.active = false
  })
  lastMessage.value = null
}

const sendMessage = () => {
  if (sending.value) return

  sending.value = true
  messageId++
  lastMessage.value = messageId

  setTimeout(() => {
    if (mode.value === 'p2p') {
      // P2P: chọn ngẫu nhiên một consumer
      const availableConsumers = consumers.value.filter((c) => !c.active)
      if (availableConsumers.length > 0) {
        const consumer =
          availableConsumers[
            Math.floor(Math.random() * availableConsumers.length)
          ]
        processMessage(consumer)
      }
    } else {
      // Pub/Sub: tất cả consumer đều nhận
      consumers.value.forEach((consumer) => {
        setTimeout(() => {
          processMessage(consumer)
        }, Math.random() * 500)
      })
    }

    sending.value = false
  }, 500)
}

const processMessage = (consumer) => {
  consumer.active = true
  setTimeout(
    () => {
      consumer.count++
      consumer.active = false
    },
    1000 + Math.random() * 1000
  )
}
</script>

<style scoped>
.messaging-patterns-demo {
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
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.description {
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 6px;
}

.desc-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.demo-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.producer-section,
.broker-section,
.consumer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.producer-box,
.broker-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  min-width: 140px;
  margin-bottom: 0.75rem;
}

.icon,
.broker-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.label,
.broker-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.message-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.send-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-badge {
  padding: 0.4rem 0.8rem;
  background: rgba(59, 130, 246, 0.15);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.consumers-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.consumer-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.consumer-box.active {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.consumer-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.consumer-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consumer-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.consumer-status {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: var(--vp-c-text-3);
}

.comparison-table {
  margin: 1.5rem 0;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  background: var(--vp-c-bg);
  font-weight: 600;
}

tr:hover td {
  background: var(--vp-c-bg-soft);
}

.example-scenario {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.scenario-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.scenario-content > div:first-child {
  margin-bottom: 0.5rem;
}

.flow {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: monospace;
}
</style>
