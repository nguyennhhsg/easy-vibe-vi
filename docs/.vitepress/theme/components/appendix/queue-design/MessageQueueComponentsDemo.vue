<!--
  MessageQueueComponentsDemo.vue
  Trực quan hóa 3 thành phần của message queue - producer/broker/consumer
-->
<template>
  <div class="mq-components-demo">
    <div class="header">
      <div class="title">
        Ba thành phần của message queue
      </div>
      <div class="subtitle">
        Mối quan hệ giữa producer, broker và consumer
      </div>
    </div>

    <div class="components-flow">
      <div class="component producer">
        <div class="comp-header">
          <div class="comp-icon">
            📤
          </div>
          <div class="comp-name">
            Producer
          </div>
        </div>
        <div class="comp-content">
          <div class="comp-desc">
            Bên gửi message
          </div>
          <div class="comp-example">
            Ví dụ: service đơn hàng
          </div>
          <button
            class="action-btn"
            :disabled="producing"
            @click="produceMessage"
          >
            {{ producing ? 'Đang gửi...' : 'Gửi message' }}
          </button>
        </div>
      </div>

      <div
        class="arrow"
        :class="{ active: messageInTransit }"
      >
        {{ messageInTransit ? '📨' : '→' }}
      </div>

      <div class="component broker">
        <div class="comp-header">
          <div class="comp-icon">
            📦
          </div>
          <div class="comp-name">
            Broker
          </div>
        </div>
        <div class="comp-content">
          <div class="comp-desc">
            Lưu trữ và chuyển tiếp message
          </div>
          <div class="comp-example">
            Ví dụ: RabbitMQ, Kafka
          </div>
          <div class="broker-storage">
            <div class="storage-label">
              Lưu trữ message
            </div>
            <div class="storage-box">
              <transition-group name="message">
                <div
                  v-for="msg in brokerMessages"
                  :key="msg.id"
                  class="broker-msg"
                >
                  Message #{{ msg.id }}
                </div>
              </transition-group>
              <div
                v-if="brokerMessages.length === 0"
                class="empty"
              >
                Chưa có message
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="arrow"
        :class="{ active: consuming }"
      >
        {{ consuming ? '📨' : '→' }}
      </div>

      <div class="component consumer">
        <div class="comp-header">
          <div class="comp-icon">
            📥
          </div>
          <div class="comp-name">
            Consumer
          </div>
        </div>
        <div class="comp-content">
          <div class="comp-desc">
            Nhận và xử lý message
          </div>
          <div class="comp-example">
            Ví dụ: service kho
          </div>
          <button
            class="action-btn consume"
            :disabled="brokerMessages.length === 0 || consuming"
            @click="consumeMessage"
          >
            {{ consuming ? 'Đang xử lý...' : 'Consume message' }}
          </button>
          <div
            v-if="lastConsumed"
            class="last-consumed"
          >
            Đã xử lý: #{{ lastConsumed }}
          </div>
        </div>
      </div>
    </div>

    <div class="component-details">
      <div class="detail-card producer">
        <div class="detail-title">
          📤 Producer
        </div>
        <div class="detail-content">
          <div class="detail-item">
            <strong>Trách nhiệm:</strong> tạo và gửi message đến broker
          </div>
          <div class="detail-item">
            <strong>Đặc tính:</strong> gửi xong trả về ngay, không đợi xử lý xong
          </div>
          <div class="detail-item">
            <strong>Ví dụ:</strong>
            <ul>
              <li>Service đơn hàng: gửi message sau khi đặt đơn thành công</li>
              <li>Service người dùng: gửi message sau khi đăng ký user</li>
              <li>Service thanh toán: gửi message sau khi thanh toán xong</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="detail-card broker">
        <div class="detail-title">
          📦 Broker
        </div>
        <div class="detail-content">
          <div class="detail-item">
            <strong>Trách nhiệm:</strong> lưu trữ, chuyển tiếp, quản lý message
          </div>
          <div class="detail-item">
            <strong>Đặc tính:</strong>
            <ul>
              <li>Persist message (tránh mất)</li>
              <li>Cơ chế xác nhận message (ACK)</li>
              <li>Hỗ trợ nhiều pattern message</li>
            </ul>
          </div>
          <div class="detail-item">
            <strong>Hiện thực phổ biến:</strong>
            RabbitMQ, Kafka, RocketMQ, Redis Stream
          </div>
        </div>
      </div>

      <div class="detail-card consumer">
        <div class="detail-title">
          📥 Consumer
        </div>
        <div class="detail-content">
          <div class="detail-item">
            <strong>Trách nhiệm:</strong> nhận và xử lý message từ broker
          </div>
          <div class="detail-item">
            <strong>Đặc tính:</strong>
            <ul>
              <li>Có thể deploy single hoặc cluster</li>
              <li>Xử lý thất bại có thể retry</li>
              <li>Xử lý xong gửi ACK</li>
            </ul>
          </div>
          <div class="detail-item">
            <strong>Ví dụ:</strong>
            <ul>
              <li>Service kho: trừ tồn kho</li>
              <li>Service SMS: gửi thông báo</li>
              <li>Service điểm thưởng: cộng điểm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="message-flow">
      <div class="flow-title">
        🔄 Luồng message đầy đủ
      </div>
      <div class="flow-steps">
        <div class="flow-step">
          <div class="step-num">
            1
          </div>
          <div class="step-content">
            <div class="step-title">
              Producer gửi message
            </div>
            <div class="step-desc">
              Service đơn hàng sau khi tạo đơn sẽ gửi message "tạo đơn hàng"
            </div>
          </div>
        </div>
        <div class="flow-arrow">
          →
        </div>
        <div class="flow-step">
          <div class="step-num">
            2
          </div>
          <div class="step-content">
            <div class="step-title">
              Broker lưu message
            </div>
            <div class="step-desc">
              Message queue nhận và lưu trữ message (persist xuống đĩa)
            </div>
          </div>
        </div>
        <div class="flow-arrow">
          →
        </div>
        <div class="flow-step">
          <div class="step-num">
            3
          </div>
          <div class="step-content">
            <div class="step-title">
              Consumer pull message
            </div>
            <div class="step-desc">
              Service kho pull message từ queue
            </div>
          </div>
        </div>
        <div class="flow-arrow">
          →
        </div>
        <div class="flow-step">
          <div class="step-num">
            4
          </div>
          <div class="step-content">
            <div class="step-title">
              Xử lý logic nghiệp vụ
            </div>
            <div class="step-desc">
              Trừ tồn kho, tạo bản ghi xuất kho
            </div>
          </div>
        </div>
        <div class="flow-arrow">
          →
        </div>
        <div class="flow-step">
          <div class="step-num">
            5
          </div>
          <div class="step-content">
            <div class="step-title">
              Gửi ACK
            </div>
            <div class="step-desc">
              Báo cho broker rằng message đã xử lý thành công, có thể xóa
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const producing = ref(false)
const consuming = ref(false)
const messageInTransit = ref(false)
const brokerMessages = ref([])
const lastConsumed = ref(null)
let messageId = 0

const produceMessage = () => {
  if (producing.value) return

  producing.value = true
  messageInTransit.value = true

  setTimeout(() => {
    messageId++
    brokerMessages.value.push({ id: messageId })

    producing.value = false
    messageInTransit.value = false
  }, 500)
}

const consumeMessage = () => {
  if (consuming.value || brokerMessages.value.length === 0) return

  consuming.value = true
  const msg = brokerMessages.value.shift()

  setTimeout(() => {
    consuming.value = false
    lastConsumed.value = msg.id

    setTimeout(() => {
      lastConsumed.value = null
    }, 2000)
  }, 1000)
}
</script>

<style scoped>
.mq-components-demo {
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

.components-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.component {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.component.producer {
  border-color: #3b82f6;
}

.component.broker {
  border-color: #8b5cf6;
}

.component.consumer {
  border-color: #22c55e;
}

.comp-header {
  margin-bottom: 0.75rem;
}

.comp-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.comp-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.comp-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.comp-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn {
  background: #3b82f6;
  color: white;
}

.action-btn.consume {
  background: #22c55e;
  color: white;
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  text-align: center;
  transition: all 0.3s;
}

.arrow.active {
  color: var(--vp-c-brand);
  animation: bounce 0.5s ease;
}

.broker-storage {
  margin-top: 0.75rem;
}

.storage-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.storage-box {
  min-height: 80px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.broker-msg {
  padding: 0.35rem 0.5rem;
  background: white;
  border-radius: 4px;
  font-size: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.3s ease;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  padding: 1rem 0;
}

.last-consumed {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.component-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-card.producer {
  border-left: 4px solid #3b82f6;
}

.detail-card.broker {
  border-left: 4px solid #8b5cf6;
}

.detail-card.consumer {
  border-left: 4px solid #22c55e;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.detail-content {
  font-size: 0.85rem;
  line-height: 1.6;
}

.detail-item {
  margin-bottom: 0.75rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item ul {
  margin: 0.35rem 0 0 1rem;
  padding: 0;
}

.detail-item li {
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-2);
}

.message-flow {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-start;
}

.flow-step {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  min-width: 150px;
}

.step-num {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.flow-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-text-3);
  align-self: center;
  padding: 0 0.25rem;
}

.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
