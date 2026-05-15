<!--
  MessageQueueDemo.vue
  Tổng quan message queue - trực quan hóa giao tiếp async
-->
<template>
  <div class="mq-demo">
    <div class="header">
      <div class="title">
        Message queue: "buffer" giao tiếp async
      </div>
      <div class="subtitle">
        Quan sát cách message được xử lý async qua queue
      </div>
    </div>

    <div class="flow-container">
      <div class="section producer">
        <div class="section-title">
          Producer
        </div>
        <div class="box producer-box">
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

      <div class="section broker">
        <div class="section-title">
          Broker
        </div>
        <div class="queue-container">
          <div class="queue-label">
            Message queue
          </div>
          <div class="queue-box">
            <transition-group name="message">
              <div
                v-for="msg in messages"
                :key="msg.id"
                class="message-item"
                :style="{ backgroundColor: msg.color }"
              >
                #{{ msg.id }}
              </div>
            </transition-group>
            <div
              v-if="messages.length === 0"
              class="empty-queue"
            >
              Queue trống
            </div>
          </div>
          <div class="queue-stats">
            <div class="stat">
              Số message: {{ messages.length }}
            </div>
            <div class="stat">
              Dung lượng: {{ queueCapacity }}
            </div>
          </div>
        </div>
      </div>

      <div class="section consumer">
        <div class="section-title">
          Consumer
        </div>
        <div
          class="box consumer-box"
          :class="{ processing: isProcessing }"
        >
          <div class="icon">
            {{ isProcessing ? '⚙️' : '📥' }}
          </div>
          <div class="label">
            {{ isProcessing ? 'Đang xử lý...' : 'Service kho' }}
          </div>
        </div>
        <div
          v-if="processedMessage"
          class="processed-msg"
        >
          Đã xử lý: #{{ processedMessage }}
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control">
        <label>
          <input
            v-model="autoConsume"
            type="checkbox"
          >
          Tự động consume
        </label>
      </div>
      <div class="control">
        <label>
          <input
            v-model="showSync"
            type="checkbox"
          >
          Hiển thị so sánh sync
        </label>
      </div>
    </div>

    <div
      v-if="showSync"
      class="comparison"
    >
      <div class="compare-col sync">
        <div class="compare-title">
          Gọi sync (synchronous)
        </div>
        <div class="compare-flow">
          <div class="flow-item">
            A gọi B
          </div>
          <div class="arrow">
            ⬇️
          </div>
          <div class="flow-item wait">
            B xử lý (block đợi)
          </div>
          <div class="arrow">
            ⬇️
          </div>
          <div class="flow-item">
            B trả về kết quả
          </div>
        </div>
        <div class="compare-desc">
          Tổng thời gian = 300ms + 500ms = 800ms
        </div>
      </div>

      <div class="compare-col async">
        <div class="compare-title">
          Gọi async (asynchronous)
        </div>
        <div class="compare-flow">
          <div class="flow-item">
            A gửi message
          </div>
          <div class="arrow">
            ⬇️
          </div>
          <div class="flow-item highlight">
            Buffer message queue
          </div>
          <div class="arrow">
            ⬇️
          </div>
          <div class="flow-item">
            B xử lý sau
          </div>
        </div>
        <div class="compare-desc">
          A chỉ cần 10ms, B xử lý từ từ ở background
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])
const isProcessing = ref(false)
const sending = ref(false)
const processedMessage = ref(null)
const autoConsume = ref(false)
const showSync = ref(false)
const queueCapacity = 10
let messageId = 0

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

const sendMessage = () => {
  if (messages.value.length >= queueCapacity) {
    return
  }

  sending.value = true
  messageId++

  messages.value.push({
    id: messageId,
    color: colors[messageId % colors.length]
  })

  setTimeout(() => {
    sending.value = false
    if (autoConsume.value && messages.value.length > 0) {
      consumeMessage()
    }
  }, 300)
}

const consumeMessage = () => {
  if (messages.value.length === 0 || isProcessing.value) return

  isProcessing.value = true
  const msg = messages.value.shift()

  setTimeout(() => {
    isProcessing.value = false
    processedMessage.value = msg.id
    setTimeout(() => {
      processedMessage.value = null
    }, 2000)

    if (autoConsume.value && messages.value.length > 0) {
      setTimeout(consumeMessage, 500)
    }
  }, 1500)
}
</script>

<style scoped>
.mq-demo {
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

.flow-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 1rem 0.75rem;
  text-align: center;
  min-width: 140px;
  transition: all 0.3s ease;
}

.box.processing {
  border-color: #f59e0b;
  animation: pulse 1.5s infinite;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.9rem;
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

.queue-container {
  width: 100%;
  min-width: 200px;
}

.queue-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.queue-box {
  background: var(--vp-c-bg);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 10px;
  min-height: 200px;
  max-height: 280px;
  
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message-item {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  animation: slideIn 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-queue {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  padding: 2rem 0;
}

.queue-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.processed-msg {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
}

.controls {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.control label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.compare-col {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.compare-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.compare-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.flow-item {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  width: 100%;
}

.flow-item.wait {
  color: #f59e0b;
  font-weight: 600;
}

.flow-item.highlight {
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand);
  font-weight: 600;
  border: 1px solid var(--vp-c-brand);
}

.arrow {
  font-size: 0.75rem;
}

.compare-desc {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.5;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
