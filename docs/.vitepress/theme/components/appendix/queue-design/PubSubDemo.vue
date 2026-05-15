<!--
  PubSubDemo.vue
  Demo pattern pub/sub - một message nhiều consumer
-->
<template>
  <div class="pubsub-demo">
    <div class="header">
      <div class="title">
        Pattern pub/sub: một message, nhiều nơi consume
      </div>
      <div class="subtitle">
        Publish một event, nhiều subscriber xử lý độc lập
      </div>
    </div>

    <div class="main-flow">
      <div class="publisher-section">
        <div class="section-title">
          📤 Publisher
        </div>
        <div class="event-selector">
          <label>Chọn event:</label>
          <select
            v-model="selectedEvent"
            @change="onEventChange"
          >
            <option value="order.created">
              Tạo đơn thành công
            </option>
            <option value="user.registered">
              Đăng ký user thành công
            </option>
            <option value="product.updated">
              Cập nhật thông tin sản phẩm
            </option>
          </select>
        </div>
        <div class="event-details">
          <div class="event-name">
            {{ eventDetails.name }}
          </div>
          <div class="event-desc">
            {{ eventDetails.description }}
          </div>
        </div>
        <button
          class="publish-btn"
          :disabled="publishing"
          @click="publishEvent"
        >
          {{ publishing ? 'Đang publish...' : '🚀 Publish event' }}
        </button>
      </div>

      <div class="topic-section">
        <div class="section-title">
          📡 Topic
        </div>
        <div
          class="topic-box"
          :class="{ active: hasMessage }"
        >
          <div class="topic-icon">
            📨
          </div>
          <div class="topic-name">
            {{ selectedEvent }}
          </div>
          <div
            v-if="hasMessage"
            class="message-indicator"
          >
            Đã publish message
          </div>
        </div>
        <div class="topic-desc">
          Tất cả subscriber đều nhận được message này
        </div>
      </div>

      <div class="subscribers-section">
        <div class="section-title">
          📥 Subscriber
        </div>
        <div class="subscribers-grid">
          <div
            v-for="sub in currentSubscribers"
            :key="sub.id"
            class="subscriber-card"
            :class="{ processing: sub.processing, completed: sub.completed }"
          >
            <div class="sub-icon">
              {{ sub.icon }}
            </div>
            <div class="sub-name">
              {{ sub.name }}
            </div>
            <div class="sub-action">
              {{ sub.action }}
            </div>
            <div class="sub-status">
              <span v-if="sub.processing">⏳ Đang xử lý...</span>
              <span v-else-if="sub.completed">✅ Đã xong</span>
              <span v-else>💤 Đợi message</span>
            </div>
            <div class="sub-count">
              Đã xử lý: {{ sub.count }} msg
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="real-time-log">
      <div class="log-header">
        <div class="log-title">
          📋 Log realtime
        </div>
        <button
          class="clear-btn"
          @click="clearLog"
        >
          Xóa
        </button>
      </div>
      <div class="log-content">
        <div
          v-if="logs.length === 0"
          class="log-empty"
        >
          Chưa có log
        </div>
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="log-entry"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <div class="use-cases">
      <div class="case-title">
        💡 Use case tiêu biểu
      </div>
      <div class="case-grid">
        <div class="case-card">
          <div class="case-icon">
            🛒
          </div>
          <div class="case-name">
            Đơn hàng e-commerce
          </div>
          <div class="case-desc">
            Tạo đơn → service kho, service điểm thưởng, service thông báo, data warehouse xử lý đồng thời
          </div>
        </div>
        <div class="case-card">
          <div class="case-icon">
            👤
          </div>
          <div class="case-name">
            Đăng ký user
          </div>
          <div class="case-desc">
            User đăng ký → email chào mừng, SMS xác thực, phát voucher, tạo user profile
          </div>
        </div>
        <div class="case-card">
          <div class="case-icon">
            📊
          </div>
          <div class="case-name">
            Phân tích dữ liệu
          </div>
          <div class="case-desc">
            Hành vi user → hệ thống đề xuất, thống kê realtime, data warehouse, hệ thống quản trị rủi ro
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent = ref('order.created')
const publishing = ref(false)
const hasMessage = ref(false)
const logs = ref([])

const eventConfigs = {
  'order.created': {
    name: 'Tạo đơn thành công',
    description: 'User thanh toán xong, đơn hàng được tạo thành công',
    subscribers: [
      {
        id: 1,
        name: 'Service kho',
        icon: '📦',
        action: 'Trừ tồn kho',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: 'Service điểm thưởng',
        icon: '💎',
        action: 'Cộng điểm',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: 'Service SMS',
        icon: '📱',
        action: 'Gửi SMS',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 4,
        name: 'Service email',
        icon: '📧',
        action: 'Gửi email',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 5,
        name: 'Data warehouse',
        icon: '📊',
        action: 'Ghi dữ liệu đơn',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  },
  'user.registered': {
    name: 'Đăng ký user thành công',
    description: 'User mới hoàn tất quy trình đăng ký',
    subscribers: [
      {
        id: 1,
        name: 'Email chào mừng',
        icon: '📧',
        action: 'Gửi email chào mừng',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: 'SMS xác thực',
        icon: '📱',
        action: 'Gửi SMS xác thực',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: 'Service voucher',
        icon: '🎫',
        action: 'Phát voucher cho user mới',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 4,
        name: 'User profile',
        icon: '👤',
        action: 'Tạo hồ sơ user',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  },
  'product.updated': {
    name: 'Cập nhật thông tin sản phẩm',
    description: 'Người bán cập nhật thông tin sản phẩm',
    subscribers: [
      {
        id: 1,
        name: 'Service tìm kiếm',
        icon: '🔍',
        action: 'Cập nhật search index',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: 'Service đề xuất',
        icon: '⭐',
        action: 'Cập nhật danh sách đề xuất',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: 'Service cache',
        icon: '⚡',
        action: 'Refresh cache',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  }
}

const subscribers = ref(
  JSON.parse(JSON.stringify(eventConfigs['order.created'].subscribers))
)

const eventDetails = computed(() => {
  return eventConfigs[selectedEvent.value]
})

const currentSubscribers = computed(() => {
  return subscribers.value
})

const onEventChange = () => {
  subscribers.value = JSON.parse(
    JSON.stringify(eventConfigs[selectedEvent.value].subscribers)
  )
  hasMessage.value = false
}

const publishEvent = () => {
  if (publishing.value) return

  publishing.value = true
  hasMessage.value = true

  addLog('info', `📤 Publish event: ${eventDetails.value.name}`)

  // Tất cả subscriber đều nhận message
  subscribers.value.forEach((sub, index) => {
    setTimeout(() => {
      sub.processing = true
      sub.completed = false
      addLog('info', `📥 ${sub.name} bắt đầu xử lý`)

      // Mô phỏng thời gian xử lý
      setTimeout(
        () => {
          sub.processing = false
          sub.completed = true
          sub.count++
          addLog('success', `✅ ${sub.name} xử lý xong: ${sub.action}`)

          setTimeout(() => {
            sub.completed = false
          }, 2000)
        },
        1500 + Math.random() * 1000
      )
    }, index * 200)
  })

  setTimeout(() => {
    publishing.value = false
    setTimeout(() => {
      hasMessage.value = false
    }, 1000)
  }, 3000)
}

const addLog = (type, message) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ type, time, message })
  logs.value = logs.value.slice(0, 20)
}

const clearLog = () => {
  logs.value = []
}
</script>

<style scoped>
.pubsub-demo {
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
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.main-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

.publisher-section,
.topic-section,
.subscribers-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-selector {
  width: 100%;
  margin-bottom: 1rem;
}

.event-selector label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.event-selector select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 0.9rem;
}

.event-details {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  width: 100%;
}

.event-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.event-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.publish-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.publish-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.publish-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.topic-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  min-width: 160px;
  transition: all 0.3s;
}

.topic-box.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
  animation: pulse 2s infinite;
}

.topic-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.topic-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.message-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.topic-desc {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.subscribers-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.subscriber-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.subscriber-card.processing {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.subscriber-card.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.sub-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.sub-name {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.25rem;
}

.sub-action {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.35rem;
}

.sub-status {
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 0.25rem;
}

.sub-count {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.real-time-log {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.log-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.clear-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--vp-c-divider);
}

.log-content {
  max-height: 250px;
  
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.8rem;
}

.log-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 0.75rem;
}

.log-entry {
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 0.5rem;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-message {
  flex: 1;
}

.log-entry.info .log-message {
  color: var(--vp-c-text-1);
}

.log-entry.success .log-message {
  color: #16a34a;
}

.use-cases {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.case-title {
  font-weight: 600;
  margin-bottom: 1rem;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.case-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.case-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.case-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
  }
}
</style>
