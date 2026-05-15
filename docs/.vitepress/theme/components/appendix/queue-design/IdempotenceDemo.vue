<!--
  IdempotenceDemo.vue
  Demo tính idempotent - xử lý consume trùng lặp
-->
<template>
  <div class="idempotence-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">Demo tính idempotent</span>
      <span class="subtitle">Đảm bảo consume trùng lặp không gây tác dụng phụ</span>
    </div>

    <div class="scenario-switch">
      <button
        class="scenario-btn"
        :class="{ active: scenario === 'transfer' }"
        @click="scenario = 'transfer'"
      >
        💰 Chuyển khoản ngân hàng
      </button>
      <button
        class="scenario-btn"
        :class="{ active: scenario === 'elevator' }"
        @click="scenario = 'elevator'"
      >
        🛗 Nút thang máy
      </button>
    </div>

    <div class="demo-content">
      <!-- Kịch bản chuyển khoản -->
      <div
        v-if="scenario === 'transfer'"
        class="transfer-scenario"
      >
        <div class="scenario-header">
          <div class="title">
            ❌ Thao tác không idempotent: chuyển khoản ngân hàng
          </div>
          <div class="subtitle">
            Consume trùng sẽ dẫn đến trừ tiền nhiều lần
          </div>
        </div>

        <div class="account-system">
          <div class="account-card sender">
            <div class="account-name">
              Bên gửi
            </div>
            <div class="account-balance">
              Số dư: <span class="balance-amount">{{ senderBalance }}</span>đ
            </div>
          </div>

          <div class="transfer-flow">
            <div
              class="flow-animation"
              :class="{ active: isTransferring }"
            >
              <div class="money-icon">
                💰
              </div>
              <div class="flow-label">
                Chuyển 100đ
              </div>
            </div>
            <div
              v-if="retryCount > 0"
              class="retry-info"
            >
              <div class="retry-badge">
                Retry {{ retryCount }} lần
              </div>
            </div>
          </div>

          <div class="account-card receiver">
            <div class="account-name">
              Bên nhận
            </div>
            <div class="account-balance">
              Số dư: <span class="balance-amount">{{ receiverBalance }}</span>đ
            </div>
          </div>
        </div>

        <div class="control-panel">
          <div class="control-row">
            <div class="control-item">
              <label>Bảo vệ idempotent</label>
              <div class="toggle-switch">
                <button
                  class="toggle-btn"
                  :class="{ active: useIdempotence }"
                  @click="useIdempotence = !useIdempotence"
                >
                  <span class="toggle-slider" />
                </button>
                <span class="toggle-label">{{ useIdempotence ? 'Đã bật' : 'Chưa bật' }}</span>
              </div>
            </div>

            <button
              class="action-btn"
              :disabled="isTransferring"
              @click="simulateTransfer"
            >
              {{ isTransferring ? 'Đang xử lý...' : 'Mô phỏng consume trùng' }}
            </button>
          </div>

          <div
            v-if="useIdempotence"
            class="idempotence-info"
          >
            <div class="info-item">
              <span class="info-icon">🔑</span>
              <span class="info-text">Mỗi giao dịch có ID duy nhất, request lặp sẽ tự động bị lọc</span>
            </div>
          </div>
        </div>

        <div class="result-log">
          <div class="log-header">
            Log xử lý
          </div>
          <div class="log-list">
            <div
              v-for="(log, index) in logs"
              :key="index"
              class="log-item"
              :class="log.type"
            >
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
            <div
              v-if="logs.length === 0"
              class="log-empty"
            >
              Chưa có log, nhấn nút để bắt đầu mô phỏng
            </div>
          </div>
        </div>

        <div class="comparison-box">
          <div class="comparison-item bad">
            <div class="comp-header">
              ❌ Không có bảo vệ idempotent
            </div>
            <div class="comp-body">
              <div class="comp-result">
                Trừ {{ (retryCount + 1) * 100 }}đ
              </div>
              <div class="comp-desc">
                Consume trùng gây ra trừ tiền nhiều lần
              </div>
            </div>
          </div>
          <div class="comparison-item good">
            <div class="comp-header">
              ✅ Có bảo vệ idempotent
            </div>
            <div class="comp-body">
              <div class="comp-result">
                Trừ 100đ
              </div>
              <div class="comp-desc">
                Request lặp bị lọc, chỉ trừ một lần
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kịch bản nút thang máy -->
      <div
        v-else
        class="elevator-scenario"
      >
        <div class="scenario-header">
          <div class="title">
            ✅ Thao tác idempotent tự nhiên: nút thang máy
          </div>
          <div class="subtitle">
            Bấm bao nhiêu lần thì thang máy cũng chỉ phản hồi một lần
          </div>
        </div>

        <div class="elevator-system">
          <div class="elevator-panel">
            <div class="panel-title">
              Bảng nút thang máy
            </div>
            <div class="button-grid">
              <button
                v-for="floor in floors"
                :key="floor"
                class="floor-btn"
                :class="{ active: selectedFloor === floor }"
                @click="pressFloor(floor)"
              >
                Tầng {{ floor }}
              </button>
            </div>
            <div class="press-count">
              <span class="count-label">Đã bấm nút</span>
              <span class="count-value">{{ pressCount }}</span>
              <span class="count-label">lần</span>
            </div>
          </div>

          <div class="elevator-shaft">
            <div class="floor-marks">
              <div
                v-for="floor in floors"
                :key="floor"
                class="floor-mark"
                :class="{ current: elevatorFloor === floor }"
              >
                <span class="floor-num">Tầng {{ floor }}</span>
              </div>
            </div>
            <div
              class="elevator-car"
              :style="{ bottom: elevatorPosition }"
            >
              <div class="car-icon">
                🛗
              </div>
            </div>
          </div>
        </div>

        <div class="control-panel">
          <div class="control-item">
            <label>Bấm liên tục 3 lần</label>
            <button
              class="action-btn"
              @click="pressMultipleTimes"
            >
              🚀 Bấm liên tục
            </button>
          </div>
          <div class="info-text">
            <span class="info-icon">💡</span>
            Dù bấm {{ pressCount }} lần, thang máy chỉ phản hồi một request
          </div>
        </div>

        <div class="explanation-box">
          <div class="explanation-title">
            Vì sao nút thang máy mang tính idempotent?
          </div>
          <div class="explanation-list">
            <div class="explanation-item">
              <span class="icon">✅</span>
              <span>Trạng thái chỉ chuyển một lần: dừng → đã chọn</span>
            </div>
            <div class="explanation-item">
              <span class="icon">✅</span>
              <span>Request lặp không làm thay đổi tầng đích</span>
            </div>
            <div class="explanation-item">
              <span class="icon">✅</span>
              <span>Không cần cơ chế bảo vệ idempotent thêm</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="principle-box">
      <div class="principle-icon">
        🎯
      </div>
      <div class="principle-content">
        <strong>Nguyên tắc cốt lõi của idempotent:</strong>
        {{ scenario === 'transfer'
          ? 'Sinh ID duy nhất cho mỗi message, kiểm tra trước khi xử lý để tránh thao tác lặp'
          : 'Thiết kế thao tác sao cho chạy lặp và chạy một lần cho cùng kết quả' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Chuyển kịch bản
const scenario = ref('transfer')

// Kịch bản chuyển khoản
const senderBalance = ref(1000)
const receiverBalance = ref(500)
const isTransferring = ref(false)
const useIdempotence = ref(false)
const retryCount = ref(0)
const logs = ref([])

const addLog = (message, type = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ time, message, type })
}

const simulateTransfer = () => {
  if (isTransferring.value) return

  isTransferring.value = true
  retryCount.value = 0
  logs.value = []

  const originalSenderBalance = senderBalance.value
  const originalReceiverBalance = receiverBalance.value

  addLog('Nhận request chuyển khoản: 100đ', 'info')

  // Mô phỏng consume trùng
  const processTransfer = (attempt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        retryCount.value = attempt

        if (useIdempotence.value) {
          if (attempt === 0) {
            senderBalance.value = originalSenderBalance - 100
            receiverBalance.value = originalReceiverBalance + 100
            addLog(`Lần xử lý thứ ${attempt + 1}: chuyển khoản thành công 100đ`, 'success')
            addLog('Kiểm tra idempotent: ID duy nhất đã được ghi, request sau bị lọc', 'info')
          } else {
            addLog(`Lần xử lý thứ ${attempt + 1}: request lặp, đã bỏ qua`, 'warning')
          }
        } else {
          senderBalance.value -= 100
          receiverBalance.value += 100
          addLog(`Lần xử lý thứ ${attempt + 1}: chuyển khoản 100đ`, attempt === 0 ? 'success' : 'error')
        }

        if (attempt < 2) {
          setTimeout(() => processTransfer(attempt + 1), 1000)
        } else {
          setTimeout(() => {
            isTransferring.value = false
          }, 500)
        }

        resolve()
      }, 1000)
    })
  }

  processTransfer(0)
}

// Kịch bản thang máy
const floors = [1, 2, 3, 4, 5]
const selectedFloor = ref(null)
const elevatorFloor = ref(1)
const pressCount = ref(0)

const elevatorPosition = computed(() => {
  return ((elevatorFloor.value - 1) / 4) * 100 + '%'
})

const pressFloor = (floor) => {
  pressCount.value++
  selectedFloor.value = floor

  setTimeout(() => {
    elevatorFloor.value = floor
  }, 500)
}

const pressMultipleTimes = () => {
  const targetFloor = Math.floor(Math.random() * 5) + 1
  let count = 0
  const interval = setInterval(() => {
    pressFloor(targetFloor)
    count++
    if (count >= 3) {
      clearInterval(interval)
    }
  }, 200)
}
</script>

<style scoped>
.idempotence-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.demo-header .icon {
  font-size: 24px;
}

.demo-header .title {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-left: 8px;
}

.scenario-switch {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.scenario-btn {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.scenario-header {
  text-align: center;
  margin-bottom: 20px;
}

.scenario-header .title {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.scenario-header .subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.account-system {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}

.account-card {
  flex: 1;
  max-width: 200px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  text-align: center;
}

.account-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
}

.account-balance {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.balance-amount {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-brand);
}

.transfer-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.flow-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.flow-animation.active {
  background: rgba(59, 130, 246, 0.1);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.money-icon {
  font-size: 32px;
}

.flow-label {
  font-weight: 600;
  font-size: 13px;
}

.retry-info {
  display: flex;
  justify-content: center;
}

.retry-badge {
  padding: 4px 10px;
  background: var(--vp-c-warning);
  color: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-item label {
  font-weight: 600;
  font-size: 14px;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-btn {
  position: relative;
  width: 48px;
  height: 26px;
  background: var(--vp-c-divider);
  border: none;
  border-radius: 13px;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
}

.toggle-btn.active {
  background: var(--vp-c-brand);
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s;
}

.toggle-btn.active .toggle-slider {
  left: 25px;
}

.toggle-label {
  font-size: 13px;
  font-weight: 600;
}

.action-btn {
  padding: 10px 20px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.idempotence-info {
  margin-top: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  font-size: 13px;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  flex: 1;
}

.result-log {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.log-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}

.log-list {
  max-height: 200px;
  
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 6px;
}

.log-item.success {
  background: rgba(34, 197, 94, 0.1);
}

.log-item.error {
  background: rgba(239, 68, 68, 0.1);
}

.log-item.warning {
  background: rgba(245, 158, 11, 0.1);
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-message {
  flex: 1;
}

.log-empty {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.comparison-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.comparison-item {
  padding: 16px;
  border-radius: 6px;
  text-align: center;
}

.comparison-item.bad {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.comparison-item.good {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.comp-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}

.comp-result {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;
}

.comp-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.elevator-system {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}

.elevator-panel {
  flex: 1;
  max-width: 250px;
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.floor-btn {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.floor-btn:hover {
  border-color: var(--vp-c-brand);
}

.floor-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.press-count {
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.count-label {
  font-size: 12px;
}

.count-value {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-brand);
}

.elevator-shaft {
  flex: 1;
  position: relative;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
}

.floor-marks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.floor-mark {
  display: flex;
  align-items: center;
  gap: 8px;
}

.floor-num {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.floor-mark.current .floor-num {
  color: var(--vp-c-brand);
  font-weight: 700;
}

.elevator-car {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.5s ease;
}

.car-icon {
  font-size: 32px;
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.info-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.explanation-box {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
}

.explanation-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.explanation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.explanation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.explanation-item .icon {
  flex-shrink: 0;
}

.principle-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-top: 16px;
}

.principle-icon {
  font-size: 24px;
}

.principle-content {
  flex: 1;
}
</style>
