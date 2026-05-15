<!--
  ImperativeVsDeclarativeDemo.vue - So sánh lập trình mệnh lệnh và khai báo
  Dùng ẩn dụ "hai cách vẽ tranh" để giải thích khác biệt giữa jQuery và Vue/React
-->
<template>
  <div class="imperative-declarative-demo">
    <!-- Khu tiêu đề -->
    <div class="demo-header">
      <span class="icon">🎨</span>
      <span class="title">So sánh hai phong cách lập trình</span>
      <span class="subtitle">Chỉ "cách làm" vs nói "muốn gì"</span>
    </div>

    <!-- Nội dung chính -->
    <div class="demo-content">
      <!-- Chuyển view -->
      <div class="toggle-group">
        <button
          v-for="view in views"
          :key="view.id"
          :class="['toggle-btn', { active: currentView === view.id }]"
          @click="currentView = view.id"
        >
          {{ view.label }}
        </button>
      </div>

      <div class="comparison-container">
        <!-- Imperative Side (jQuery) -->
        <div class="side imperative-side">
          <div class="side-header">
            <span class="badge imperative">jQuery / Mệnh lệnh</span>
            <span class="sub-label">Nói nôm na: chỉ ra cách làm</span>
          </div>

          <div class="demo-area">
            <!-- The UI -->
            <div class="counter-ui">
              <div
                id="jq-display"
                class="display-value"
              >
                {{ jqCount }}
              </div>
              <div class="meters">
                <div class="meter-label">
                  Progress:
                </div>
                <div class="meter-bar">
                  <div
                    id="jq-meter"
                    class="meter-fill"
                    :style="{ width: jqProgress + '%' }"
                  />
                </div>
                <div
                  id="jq-status"
                  class="status-text"
                >
                  {{ jqStatus }}
                </div>
              </div>
              <div class="controls">
                <button
                  class="btn-decrement"
                  @click="updateJq(-1)"
                >
                  -
                </button>
                <button
                  class="btn-increment"
                  @click="updateJq(1)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- The Code -->
            <div
              v-show="currentView === 'code'"
              class="code-panel"
            >
              <div class="code-block imperative-code">
                <pre><code>function updateCounter(change) {
  // 1. Get current value
  var count = parseInt($('#counter').text());

  // 2. Calculate new value
  var newCount = count + change;

  // 3. Update DOM element 1
  $('#counter').text(newCount);

  // 4. Update DOM element 2
  var progress = (newCount / 10) * 100;
  $('#progress-bar').css('width', progress + '%');

  // 5. Update DOM element 3
  if (newCount > 5) {
    $('#status').text('High!').addClass('warning');
  } else {
    $('#status').text('Normal').removeClass('warning');
  }

  // 6. Update DOM element 4...
  // Oops! Forgot to update the color indicator!
}</code></pre>
              </div>
            </div>
          </div>

          <div
            v-if="showAnalysis"
            class="pain-points"
          >
            <div class="pain-point">
              <span class="icon">⚠️</span>
              <span>Phải thao tác thủ công nhiều phần tử DOM</span>
            </div>
            <div class="pain-point">
              <span class="icon">🐛</span>
              <span>Dễ quên cập nhật, khiến giao diện thiếu nhất quán</span>
            </div>
            <div class="pain-point">
              <span class="icon">🍝</span>
              <span>Logic rải rác, code khó bảo trì</span>
            </div>
          </div>
        </div>

        <!-- VS Divider -->
        <div class="vs-divider">
          <div class="vs-badge">
            VS
          </div>
        </div>

        <!-- Declarative Side (Vue) -->
        <div class="side declarative-side">
          <div class="side-header">
            <span class="badge declarative">Vue / Khai báo</span>
            <span class="sub-label">Nói nôm na: nói rõ bạn muốn gì</span>
          </div>

          <div class="demo-area">
            <!-- The UI -->
            <div class="counter-ui">
              <div class="display-value">
                {{ vueCount }}
              </div>
              <div class="meters">
                <div class="meter-label">
                  Progress:
                </div>
                <div class="meter-bar">
                  <div
                    class="meter-fill"
                    :style="{ width: vueProgress + '%' }"
                  />
                </div>
                <div
                  class="status-text"
                  :class="{ warning: vueCount > 5 }"
                >
                  {{ vueStatus }}
                </div>
              </div>
              <div class="controls">
                <button
                  class="btn-decrement"
                  @click="vueCount--"
                >
                  -
                </button>
                <button
                  class="btn-increment"
                  @click="vueCount++"
                >
                  +
                </button>
              </div>
            </div>

            <!-- The Code -->
            <div
              v-show="currentView === 'code'"
              class="code-panel"
            >
              <div class="code-block declarative-code">
                <pre><code>export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    // Automatically updates when count changes
    progress() {
      return (this.count / 10) * 100;
    },
    status() {
      return this.count > 5 ? 'High!' : 'Normal';
    },
    isWarning() {
      return this.count > 5;
    }
  }
}

// Template - just declare what the UI should look like
&lt;template&gt;
  &lt;div class="status" :class="{ warning: isWarning }"&gt;
    {{ status }}
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
              </div>
            </div>
          </div>

          <div
            v-if="showAnalysis"
            class="benefits"
          >
            <div class="benefit">
              <span class="icon">✅</span>
              <span>Chỉ quan tâm tới dữ liệu, không cần thao tác DOM thủ công</span>
            </div>
            <div class="benefit">
              <span class="icon">🔄</span>
              <span>Dữ liệu đổi sẽ tự đồng bộ tới mọi view liên quan</span>
            </div>
            <div class="benefit">
              <span class="icon">🧩</span>
              <span>Cấu trúc code rõ ràng, dễ bảo trì</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Điều khiển ở dưới -->
      <div class="demo-controls">
        <button
          class="toggle-btn"
          @click="showAnalysis = !showAnalysis"
        >
          {{ showAnalysis ? 'Ẩn' : 'Hiện' }} phân tích so sánh
        </button>
      </div>
    </div>

    <!-- Khung thông tin -->
    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      Lập trình mệnh lệnh phải chỉ trình duyệt "làm từng bước thế nào", còn lập trình khai báo chỉ cần nói "tôi muốn kết quả gì", framework sẽ tự lo phần còn lại.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentView = ref('ui')
const showAnalysis = ref(false)
const jqCount = ref(0)
const vueCount = ref(0)

const views = [
  { id: 'ui', label: 'Chỉ hiện giao diện' },
  { id: 'code', label: 'Hiện code' }
]

const jqProgress = computed(() => Math.min((jqCount.value / 10) * 100, 100))
const vueProgress = computed(() => Math.min((vueCount.value / 10) * 100, 100))

const jqStatus = computed(() => (jqCount.value > 5 ? 'High!' : 'Normal'))
const vueStatus = computed(() => (vueCount.value > 5 ? 'High!' : 'Normal'))

function updateJq(change) {
  jqCount.value += change
}
</script>

<style scoped>
.imperative-declarative-demo {
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
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
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

.demo-content {
  margin-bottom: 0.5rem;
}

.toggle-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.side-header {
  text-align: center;
  margin-bottom: 1rem;
}

.side-header .badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.side-header .sub-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.side-header h4 {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.counter-ui {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.display-value {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: var(--vp-c-brand);
}

.meters {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meter-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.meter-bar {
  height: 8px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background-color: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.status-text {
  font-size: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.status-text.warning {
  color: var(--vp-c-warning);
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.controls button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.controls button:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.code-panel {
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.code-block {
  margin: 0;
  padding: 0.75rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
}

.imperative-code {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.imperative-code code {
  font-family: 'Fira Code', 'Menlo', monospace;
}

.declarative-code {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.declarative-code code {
  font-family: 'Fira Code', 'Menlo', monospace;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.pain-points,
.benefits {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pain-point,
.benefit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
}

.pain-point {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-danger);
}

.benefit {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-success);
}

.demo-controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
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
  margin-top: 0.75rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .vs-divider {
    display: none;
  }
}
</style>
