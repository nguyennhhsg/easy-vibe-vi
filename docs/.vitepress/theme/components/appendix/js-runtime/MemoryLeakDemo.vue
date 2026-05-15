<script setup>
import { ref } from 'vue'

const activeScenario = ref('global-vars')

const scenarios = [
  { value: 'global-vars', label: 'Biến toàn cục', icon: '🌍' },
  { value: 'event-listeners', label: 'Event listener', icon: '🎯' },
  { value: 'closures', label: 'Closure tham chiếu', icon: '🔒' }
]

// Kịch bản biến toàn cục
const globalMemory = ref([])

// Kịch bản event listener
const eventListeners = ref([])
const eventCount = ref(0)

// Kịch bản closure
const closureItems = ref([])

const memoryUsage = ref(0)
const maxMemory = ref(100)

const addGlobalVariable = () => {
  const largeData = new Array(10000).fill(`Dữ liệu ${globalMemory.value.length}`)
  globalMemory.value.push({
    id: Date.now(),
    data: largeData,
    timestamp: new Date().toLocaleTimeString()
  })
  updateMemory()
}

const clearGlobalVariables = () => {
  globalMemory.value = []
  updateMemory()
}

// Kịch bản event listener
const addEventListener = () => {
  const handler = () => console.log('event listener')
  eventListeners.value.push({
    id: Date.now(),
    handler: handler,
    active: true
  })
  eventCount.value++
  updateMemory()
}

const removeAllListeners = () => {
  eventListeners.value = []
  eventCount.value = 0
  updateMemory()
}

// Kịch bản closure
const createClosure = () => {
  const largeData = new Array(10000).fill('Dữ liệu closure')
  const closure = () => {
    return largeData.length
  }
  closureItems.value.push({
    id: Date.now(),
    closure: closure,
    data: largeData,
    timestamp: new Date().toLocaleTimeString()
  })
  updateMemory()
}

const clearClosures = () => {
  closureItems.value = []
  updateMemory()
}

const updateMemory = () => {
  const total = globalMemory.value.length + eventListeners.value.length + closureItems.value.length
  memoryUsage.value = Math.min(total, maxMemory.value)
}

const resetAll = () => {
  globalMemory.value = []
  eventListeners.value = []
  eventCount.value = 0
  closureItems.value = []
  memoryUsage.value = 0
}
</script>

<template>
  <div class="memory-leak-demo">
    <h3>Demo memory leak (rò rỉ bộ nhớ)</h3>

    <!-- Chọn kịch bản -->
    <div class="scenario-tabs">
      <button
        v-for="scenario in scenarios"
        :key="scenario.value"
        :class="{ 'active': activeScenario === scenario.value }"
        class="scenario-tab"
        @click="activeScenario = scenario.value"
      >
        <span class="tab-icon">{{ scenario.icon }}</span>
        <span class="tab-label">{{ scenario.label }}</span>
      </button>
    </div>

    <!-- Tình trạng dùng bộ nhớ -->
    <div class="memory-monitor">
      <div class="monitor-header">
        <span class="monitor-title">Tình trạng dùng bộ nhớ</span>
        <span class="monitor-value">{{ memoryUsage }}%</span>
      </div>
      <div class="memory-bar">
        <div
          class="memory-fill"
          :class="{ 'warning': memoryUsage > 70, 'danger': memoryUsage > 90 }"
          :style="{ width: `${memoryUsage}%` }"
        >
          <span
            v-if="memoryUsage > 10"
            class="memory-text"
          >{{ memoryUsage }}%</span>
        </div>
      </div>
      <div
        v-if="memoryUsage > 90"
        class="memory-alert"
      >
        ⚠️ Bộ nhớ chiếm quá cao! Có thể gây giật hoặc crash trang
      </div>
    </div>

    <!-- Nội dung kịch bản -->
    <div class="scenario-content">
      <!-- Kịch bản biến toàn cục -->
      <div
        v-if="activeScenario === 'global-vars'"
        class="scenario-panel"
      >
        <h4>Rò rỉ biến toàn cục</h4>

        <div class="scenario-description">
          <p><strong>Vấn đề:</strong> Biến toàn cục không bị garbage collect, luôn chiếm bộ nhớ</p>
          <p><strong>Ví dụ:</strong> Liên tục thêm dữ liệu vào mảng toàn cục, không bao giờ dọn</p>
        </div>

        <div class="action-buttons">
          <button
            class="btn-add"
            @click="addGlobalVariable"
          >
            ➕ Thêm biến toàn cục
          </button>
          <button
            class="btn-clear"
            @click="clearGlobalVariables"
          >
            🗑️ Xóa biến toàn cục
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>Biến toàn cục ({{ globalMemory.length }} mục)</span>
          </div>
          <div class="preview-list">
            <div
              v-for="item in globalMemory.slice(-5)"
              :key="item.id"
              class="preview-item"
            >
              <span class="item-id">ID: {{ item.id }}</span>
              <span class="item-time">{{ item.timestamp }}</span>
              <span class="item-size">{{ item.data.length }} mục dữ liệu</span>
            </div>
            <div
              v-if="globalMemory.length === 0"
              class="empty-state"
            >
              Chưa có biến toàn cục
            </div>
            <div
              v-if="globalMemory.length > 5"
              class="more-items"
            >
              ... còn {{ globalMemory.length - 5 }} mục
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ Cách sai</h5>
          <pre><code>// Biến toàn cục không bị garbage collect
globalCache = []
function addItem() {
  globalCache.push(largeData)
}</code></pre>
        </div>
      </div>

      <!-- Kịch bản event listener -->
      <div
        v-if="activeScenario === 'event-listeners'"
        class="scenario-panel"
      >
        <h4>Rò rỉ event listener</h4>

        <div class="scenario-description">
          <p><strong>Vấn đề:</strong> Event listener không được gỡ, tiếp tục chiếm bộ nhớ</p>
          <p><strong>Ví dụ:</strong> Tạo phần tử động và thêm listener, nhưng không bao giờ gỡ</p>
        </div>

        <div class="action-buttons">
          <button
            class="btn-add"
            @click="addEventListener"
          >
            ➕ Thêm event listener
          </button>
          <button
            class="btn-clear"
            @click="removeAllListeners"
          >
            🗑️ Gỡ tất cả listener
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>Listener đang hoạt động: {{ eventCount }}</span>
          </div>
          <div class="listener-list">
            <div
              v-for="listener in eventListeners.slice(-5)"
              :key="listener.id"
              class="listener-item"
            >
              <div class="listener-icon">
                🎯
              </div>
              <div class="listener-info">
                <span class="listener-id">Listener #{{ listener.id }}</span>
                <span class="listener-status">Đang hoạt động</span>
              </div>
            </div>
            <div
              v-if="eventListeners.length === 0"
              class="empty-state"
            >
              Chưa có event listener
            </div>
            <div
              v-if="eventListeners.length > 5"
              class="more-items"
            >
              ... còn {{ eventListeners.length - 5 }} listener
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ Cách sai</h5>
          <pre><code>// Listener không bị gỡ
button.addEventListener('click', handler)
// Khi phần tử bị xóa listener vẫn còn!</code></pre>

          <h5>✅ Cách đúng</h5>
          <pre><code>// Lưu tham chiếu listener
const handler = () => { ... }
button.addEventListener('click', handler)

// Khi không cần thì gỡ
button.removeEventListener('click', handler)</code></pre>
        </div>
      </div>

      <!-- Kịch bản closure -->
      <div
        v-if="activeScenario === 'closures'"
        class="scenario-panel"
      >
        <h4>Rò rỉ do closure tham chiếu</h4>

        <div class="scenario-description">
          <p><strong>Vấn đề:</strong> Closure giữ tham chiếu đến đối tượng lớn, khiến đối tượng không thể bị thu hồi</p>
          <p><strong>Ví dụ:</strong> Hàm closure luôn tham chiếu mảng lớn</p>
        </div>

        <div class="action-buttons">
          <button
            class="btn-add"
            @click="createClosure"
          >
            ➕ Tạo closure
          </button>
          <button
            class="btn-clear"
            @click="clearClosures"
          >
            🗑️ Xóa closure
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>Closure đang hoạt động: {{ closureItems.length }}</span>
          </div>
          <div class="closure-list">
            <div
              v-for="item in closureItems.slice(-5)"
              :key="item.id"
              class="closure-item"
            >
              <div class="closure-icon">
                🔒
              </div>
              <div class="closure-info">
                <span class="closure-id">Closure #{{ item.id }}</span>
                <span class="closure-time">{{ item.timestamp }}</span>
                <span class="closure-size">Giữ {{ item.data.length }} mục dữ liệu</span>
              </div>
            </div>
            <div
              v-if="closureItems.length === 0"
              class="empty-state"
            >
              Chưa có closure
            </div>
            <div
              v-if="closureItems.length > 5"
              class="more-items"
            >
              ... còn {{ closureItems.length - 5 }} closure
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ Cách sai</h5>
          <pre><code>// Closure giữ tham chiếu đối tượng lớn
function createHandler() {
  const largeData = new Array(1000000)
  return function() {
    // largeData luôn bị tham chiếu, không bị thu hồi
    console.log('đang xử lý')
  }
}
const handler = createHandler()</code></pre>

          <h5>✅ Cách đúng</h5>
          <pre><code>// Dùng xong thì giải phóng tham chiếu
let handler = createHandler()
handler()  // Sử dụng
handler = null  // Giải phóng tham chiếu</code></pre>
        </div>
      </div>
    </div>

    <!-- Nút đặt lại -->
    <div class="global-actions">
      <button
        class="btn-reset"
        @click="resetAll"
      >
        🔄 Đặt lại tất cả kịch bản
      </button>
    </div>

    <!-- Tổng kết -->
    <div class="summary-box">
      <h4>Cách tránh memory leak</h4>
      <ul>
        <li><strong>Tránh biến toàn cục:</strong> Dùng const/let thay var, ưu tiên biến cục bộ</li>
        <li><strong>Dọn listener kịp thời:</strong> Khi component bị hủy thì gỡ hết event listener</li>
        <li><strong>Giải phóng tham chiếu closure:</strong> Khi không cần thì set biến closure về null</li>
        <li><strong>Dùng WeakMap/WeakSet:</strong> Tự động dọn các đối tượng không còn tham chiếu</li>
        <li><strong>Kiểm tra định kỳ:</strong> Dùng bảng Memory trong DevTools để kiểm tra rò rỉ bộ nhớ</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.memory-leak-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h5 {
  margin: 12px 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.scenario-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.scenario-tab {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.scenario-tab:hover {
  color: var(--vp-c-brand-1);
}

.scenario-tab.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-icon {
  font-size: 18px;
  margin-right: 8px;
}

.tab-label {
  font-size: 14px;
}

.memory-monitor {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 20px;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.monitor-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.monitor-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.memory-bar {
  height: 32px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.memory-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memory-fill.warning {
  background: #ed8936;
}

.memory-fill.danger {
  background: #f56565;
}

.memory-text {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.memory-alert {
  margin-top: 12px;
  padding: 12px;
  background: rgba(245, 101, 101, 0.1);
  border-left: 4px solid #f56565;
  border-radius: 6px;
  font-size: 13px;
  color: #f56565;
  font-weight: 500;
}

.scenario-content {
  margin-bottom: 20px;
}

.scenario-panel {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.scenario-description {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.scenario-description p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.scenario-description p:last-child {
  margin-bottom: 0;
}

.scenario-description strong {
  color: var(--vp-c-text-1);
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-add {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-add:hover {
  background: var(--vp-c-brand-2);
}

.btn-clear {
  background: #ed8936;
  color: white;
}

.btn-clear:hover {
  background: #dd6b20;
}

.btn-reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-border);
}

.btn-reset:hover {
  background: var(--vp-c-bg-soft-hover);
  border-color: var(--vp-c-brand-1);
}

.data-preview {
  margin-bottom: 20px;
}

.preview-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.preview-list,
.listener-list,
.closure-list {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  min-height: 150px;
}

.preview-item,
.listener-item,
.closure-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin-bottom: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 13px;
}

.preview-item {
  justify-content: space-between;
}

.listener-icon,
.closure-icon {
  font-size: 20px;
}

.listener-info,
.closure-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.listener-id,
.closure-id {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.listener-status {
  font-size: 12px;
  color: #68d391;
}

.item-id,
.item-time,
.item-size,
.closure-time,
.closure-size {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.more-items {
  text-align: center;
  padding: 8px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-style: italic;
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 16px;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}

.global-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.summary-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.summary-box h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--vp-c-brand-1);
}

.summary-box ul {
  margin: 0;
  padding-left: 20px;
}

.summary-box li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.summary-box strong {
  color: var(--vp-c-text-1);
}
</style>
