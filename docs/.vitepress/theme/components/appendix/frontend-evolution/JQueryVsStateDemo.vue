<!--
  JQueryVsStateDemo.vue - So sánh hai mô hình phát triển frontend
  Dùng ẩn dụ "ghi sổ tay vs quản gia thông minh" để so sánh jQuery với Vue/React
-->
<template>
  <div class="jquery-vs-state-demo">
    <!-- Khu tiêu đề -->
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">Mô hình phát triển frontend</span>
      <span class="subtitle">Thao tác DOM thủ công vs quản lý state</span>
    </div>

    <!-- Nội dung chính -->
    <div class="demo-content">
      <!-- Chọn chế độ -->
      <div class="mode-tabs">
        <button
          class="tab-btn"
          :class="{ active: mode === 'manual' }"
          @click="mode = 'manual'"
        >
          <span class="tab-icon">✍️</span>
          <span class="tab-text">Ghi sổ tay</span>
          <span class="tab-sub">Nói nôm na: jQuery</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: mode === 'smart' }"
          @click="mode = 'smart'"
        >
          <span class="tab-icon">🤖</span>
          <span class="tab-text">Quản gia thông minh</span>
          <span class="tab-sub">Nói nôm na: Vue/React</span>
        </button>
      </div>

      <!-- Khu so sánh -->
      <div class="comparison-showcase">
        <!-- Bên trái: mô tả tình huống -->
        <div class="scenario-panel">
          <div class="scenario-header">
            <span class="scenario-icon">{{ mode === 'manual' ? '👨‍🍳' : '🤖' }}</span>
            <span class="scenario-title">{{ mode === 'manual' ? 'Ghi sổ tay' : 'Quản gia thông minh' }}</span>
          </div>

          <div class="scenario-content">
            <div class="step-list">
              <div
                v-for="(step, index) in currentSteps"
                :key="index"
                class="step-item"
                :class="{ active: index === currentStep }"
              >
                <div class="step-number">
                  {{ index + 1 }}
                </div>
                <div class="step-text">
                  {{ step }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bên phải: sổ sách -->
        <div class="ledger-panel">
          <div class="ledger-header">
            <span class="ledger-icon">📒</span>
            <span class="ledger-title">Sổ sách hôm nay</span>
            <span
              class="ledger-status"
              :class="mode"
            >{{ ledgerStatus }}</span>
          </div>

          <div class="ledger-content">
            <!-- Danh sách đơn -->
            <div class="order-list">
              <div
                v-for="order in orders"
                :key="order.id"
                class="order-item"
                :class="{ completed: order.completed }"
              >
                <div class="order-info">
                  <span class="order-name">{{ order.name }}</span>
                  <span class="order-price">{{ order.price }}k</span>
                </div>
                <div class="order-status">
                  {{ order.completed ? '✓' : '○' }}
                </div>
              </div>
            </div>

            <!-- Tổng kết -->
            <div class="total-section">
              <div class="total-row">
                <span>Số món:</span>
                <span class="total-value">{{ completedCount }}/{{ orders.length }} món</span>
              </div>
              <div class="total-row total-final">
                <span>Doanh thu hôm nay:</span>
                <span class="total-amount">{{ totalRevenue }}k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nút thao tác -->
      <div class="action-buttons">
        <button
          class="btn btn-primary"
          :disabled="isProcessing || allCompleted"
          @click="processOrder"
        >
          {{ isProcessing ? 'Đang xử lý...' : allCompleted ? 'Xong hết rồi!' : 'Món tiếp theo' }}
        </button>
        <button
          class="btn btn-secondary"
          @click="resetDemo"
        >
          Bắt đầu lại
        </button>
      </div>
    </div>

    <!-- Khung thông tin -->
    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      <span v-if="mode === 'manual'">jQuery cần bạn tự tìm và sửa DOM, giống ghi sổ tay, dễ sai sót.</span>
      <span v-else>Vue/React tự động cập nhật UI dựa trên state, như quản gia thông minh: đổi dữ liệu thì giao diện tự đổi theo.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Chế độ hiện tại
const mode = ref('manual')

// Trạng thái xử lý
const isProcessing = ref(false)
const currentStep = ref(0)

// Dữ liệu đơn hàng
const orders = ref([
  { id: 1, name: 'Gà xào hạt điều', price: 88, completed: false },
  { id: 2, name: 'Thịt xào chua ngọt', price: 72, completed: false },
  { id: 3, name: 'Đậu hũ Tứ Xuyên', price: 48, completed: false },
  { id: 4, name: 'Sườn xào chua ngọt', price: 108, completed: false }
])

// Các bước ghi sổ tay
const manualSteps = [
  'Mở sổ ra, tìm đúng món',
  'Tự tính giá rồi ghi vào sổ',
  'Tính lại tổng để khỏi sai số',
  'Đánh dấu món đã xong'
]

// Các bước quản gia thông minh
const smartSteps = [
  'Báo cho quản gia: món này đã xong',
  'Quản gia tự cập nhật sổ sách',
  'Tổng tự tính, không sai được',
  'Mọi dữ liệu đồng bộ tức thì'
]

// Danh sách bước hiện tại
const currentSteps = computed(() => {
  return mode.value === 'manual' ? manualSteps : smartSteps
})

// Các thuộc tính tính toán
const completedCount = computed(() => orders.value.filter(o => o.completed).length)
const totalRevenue = computed(() => orders.value.filter(o => o.completed).reduce((sum, o) => sum + o.price, 0))
const allCompleted = computed(() => orders.value.every(o => o.completed))

const ledgerStatus = computed(() => {
  if (allCompleted.value) return 'Đã xong'
  return mode.value === 'manual' ? 'Đang tính tay...' : 'Đang đồng bộ tự động...'
})

// Xử lý món tiếp theo
const processOrder = async () => {
  if (isProcessing.value || allCompleted.value) return

  isProcessing.value = true
  currentStep.value = 0

  // Tìm đơn chưa hoàn thành đầu tiên
  const orderIndex = orders.value.findIndex(o => !o.completed)

  // Mô phỏng chạy lần lượt các bước
  for (let i = 0; i < currentSteps.value.length; i++) {
    currentStep.value = i
    await sleep(400)
  }

  // Hoàn thành đơn
  if (orderIndex !== -1) {
    orders.value[orderIndex].completed = true
  }

  isProcessing.value = false
  currentStep.value = 0
}

// Đặt lại demo
const resetDemo = () => {
  isProcessing.value = false
  currentStep.value = 0
  orders.value.forEach(o => o.completed = false)
}

// Hàm phụ trợ
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.jquery-vs-state-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

/* Khu tiêu đề */
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
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* Nội dung chính */
.demo-content {
  margin-bottom: 0.75rem;
}

/* Tab chọn chế độ */
.mode-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.5rem;
}

.tab-text {
  font-size: 0.85rem;
  font-weight: bold;
}

.tab-sub {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* Khu so sánh */
.comparison-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .comparison-showcase {
    grid-template-columns: 1fr;
  }
}

/* Khung tình huống */
.scenario-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 2px solid var(--vp-c-divider);
}

.scenario-icon {
  font-size: 1.5rem;
}

.scenario-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scenario-content {
  padding: 0.75rem;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  transition: all 0.2s;
}

.step-item.active {
  background: var(--vp-c-brand);
  color: white;
  transform: translateX(4px);
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.step-item.active .step-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.step-text {
  font-size: 0.85rem;
  flex: 1;
}

/* Khung sổ sách */
.ledger-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.ledger-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 2px solid var(--vp-c-divider);
}

.ledger-icon {
  font-size: 1.5rem;
}

.ledger-title {
  flex: 1;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.ledger-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.ledger-status.manual {
  background: var(--vp-c-warning);
  color: white;
}

.ledger-status.smart {
  background: var(--vp-c-success);
  color: white;
}

.ledger-content {
  padding: 0.75rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  transition: all 0.2s;
}

.order-item.completed {
  background: var(--vp-c-success);
  border-left: 4px solid var(--vp-c-brand);
  opacity: 0.3;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-name {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.order-price {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.order-status {
  font-size: 1rem;
}

.total-section {
  border-top: 2px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.total-row.total-final {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  border-top: 2px solid var(--vp-c-divider);
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

.total-amount {
  color: var(--vp-c-success);
  font-size: 1.1rem;
}

/* Nút thao tác */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* Khung thông tin */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
