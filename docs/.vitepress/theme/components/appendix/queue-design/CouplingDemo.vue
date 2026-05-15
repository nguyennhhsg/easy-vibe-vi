<!--
  CouplingDemo.vue
  Demo tách rời hệ thống - so sánh sync vs async
-->
<template>
  <div class="coupling-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">Tách rời hệ thống</span>
      <span class="subtitle">Từ tight coupling đến loose coupling</span>
    </div>

    <div class="mode-switch">
      <button
        class="mode-btn"
        :class="{ active: !useAsync }"
        @click="useAsync = false"
      >
        🔗 Tight coupling (sync)
      </button>
      <button
        class="mode-btn"
        :class="{ active: useAsync }"
        @click="useAsync = true"
      >
        🔓 Loose coupling (async)
      </button>
    </div>

    <div class="demo-content">
      <!-- Chế độ tight coupling -->
      <div
        v-if="!useAsync"
        class="synchronous-mode"
      >
        <div class="scenario">
          <div class="scenario-title">
            ❌ Vấn đề tight coupling
          </div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">
                Service đơn hàng
              </div>
              <div class="service-desc">
                Tạo đơn hàng
              </div>
            </div>

            <div class="arrows">
              <div
                v-for="call in syncCalls"
                :key="call.id"
                class="sync-call"
                :class="{ active: call.active }"
              >
                <div class="call-line" />
                <div class="call-label">
                  {{ call.service }}
                </div>
                <div
                  v-if="call.active"
                  class="call-status"
                >
                  {{ call.status }}
                </div>
              </div>
            </div>

            <div
              class="service-box notification"
              :class="{ failed: notificationFailed }"
            >
              <div class="service-name">
                Service thông báo
              </div>
              <div class="service-desc">
                Gửi SMS/email
              </div>
              <div
                v-if="notificationFailed"
                class="error-msg"
              >
                Service ngừng hoạt động ❌
              </div>
            </div>
          </div>

          <div class="problem-list">
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>Phụ thuộc mạnh:</strong> Service thông báo ngừng hoạt động khiến tạo đơn thất bại</span>
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>Phản hồi chậm:</strong> Tổng thời gian = 300ms + 500ms + 400ms =
                1200ms</span>
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>Mở rộng khó:</strong> Thêm service mới phải sửa code đơn hàng</span>
            </div>
          </div>

          <button
            class="test-btn fail"
            @click="testSyncCall"
          >
            Mô phỏng service thông báo lỗi
          </button>
        </div>
      </div>

      <!-- Chế độ loose coupling -->
      <div
        v-else
        class="asynchronous-mode"
      >
        <div class="scenario">
          <div class="scenario-title">
            ✅ Ưu điểm loose coupling
          </div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">
                Service đơn hàng
              </div>
              <div class="service-desc">
                Tạo đơn + gửi message
              </div>
            </div>

            <div class="mq-bridge">
              <div class="mq-box">
                <div class="mq-icon">
                  📨
                </div>
                <div class="mq-label">
                  Message queue
                </div>
                <div
                  v-if="messageInQueue"
                  class="msg-indicator"
                >
                  Đã gửi message
                </div>
              </div>
              <div class="flow-arrow">
                →
              </div>
            </div>

            <div class="consumers-group">
              <div
                class="consumer-box"
                :class="{ failed: consumerFailed }"
              >
                <div class="consumer-name">
                  Service SMS
                </div>
                <div class="consumer-status">
                  {{ consumerFailed ? 'Offline (không ảnh hưởng đơn)' : 'Đang chạy' }}
                </div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">
                  Service email
                </div>
                <div class="consumer-status">
                  Đang chạy
                </div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">
                  Service điểm thưởng
                </div>
                <div class="consumer-status">
                  Đang chạy
                </div>
              </div>
            </div>
          </div>

          <div class="benefit-list">
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>Chạy độc lập:</strong> Service thông báo hỏng không ảnh hưởng tạo đơn</span>
            </div>
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>Phản hồi nhanh:</strong> Service đơn hàng chỉ tốn 50ms (gửi message)</span>
            </div>
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>Dễ mở rộng:</strong> Thêm consumer mới không cần sửa code đơn hàng</span>
            </div>
          </div>

          <button
            class="test-btn success"
            @click="testAsyncCall"
          >
            Gửi message đơn hàng
          </button>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Gọi sync phụ thuộc mạnh, chậm; message async tách rời, nhanh, dễ mở rộng
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const useAsync = ref(false)
const notificationFailed = ref(false)
const consumerFailed = ref(false)
const messageInQueue = ref(false)

const syncCalls = ref([
  { id: 1, service: 'Gọi service kho', active: false, status: 'Đang xử lý...' },
  { id: 2, service: 'Gọi service điểm thưởng', active: false, status: 'Đang xử lý...' },
  { id: 3, service: 'Gọi service thông báo', active: false, status: 'Thất bại! Rollback đơn hàng' }
])

const testSyncCall = () => {
  notificationFailed.value = true

  syncCalls.value.forEach((call, index) => {
    setTimeout(() => {
      call.active = true
      if (index === syncCalls.value.length - 1) {
        setTimeout(() => {
          call.active = false
        }, 2000)
      }
    }, index * 800)
  })
}

const testAsyncCall = () => {
  messageInQueue.value = true
  setTimeout(() => {
    messageInQueue.value = false
  }, 2000)
}
</script>

<style scoped>
.coupling-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.mode-switch {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-content {
  margin-bottom: 0.75rem;
}

.scenario-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.service-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  min-width: 140px;
  transition: all 0.3s;
}

.service-box.failed {
  border-color: var(--vp-c-danger);
  background: var(--vp-c-danger-soft);
}

.service-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.service-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.error-msg {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-danger);
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 250px;
}

.sync-call {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.sync-call.active {
  background: var(--vp-c-danger-soft);
}

.call-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
}

.sync-call.active .call-line {
  background: var(--vp-c-danger);
}

.call-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  flex: 1;
}

.call-status {
  font-size: 0.7rem;
  color: var(--vp-c-danger);
  font-weight: 600;
}

.mq-bridge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mq-box {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  min-width: 120px;
}

.mq-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.mq-label {
  font-weight: 600;
  font-size: 0.85rem;
}

.msg-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-success);
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.flow-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-brand);
}

.consumers-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.consumer-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  transition: all 0.3s;
}

.consumer-box.failed {
  border-color: var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.consumer-name {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consumer-status {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.problem-list,
.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.problem-item,
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.4;
}

.problem-item {
  background: var(--vp-c-danger-soft);
}

.benefit-item {
  background: var(--vp-c-success-soft);
}

.icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.test-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.test-btn.fail {
  background: var(--vp-c-danger);
  color: white;
}

.test-btn.fail:hover {
  opacity: 0.9;
}

.test-btn.success {
  background: var(--vp-c-success);
  color: white;
}

.test-btn.success:hover {
  opacity: 0.9;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}
</style>
