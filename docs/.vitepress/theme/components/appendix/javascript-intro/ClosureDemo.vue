<template>
  <div class="closure-demo">
    <div class="demo-header">
      <span class="icon">🎁</span>
      <span class="title">Hàm và closure</span>
      <span class="subtitle">Hiểu chuỗi scope và cơ chế closure</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn có một chiếc <span class="highlight">balo</span> (hàm), mỗi lần ra ngoài bạn bỏ
      <span class="highlight">phong cảnh</span> (biến bên ngoài) bạn nhìn thấy vào balo.
      <span class="highlight">Closure</span> chính là chiếc balo đó — dù đã rời khỏi nơi cũ, bạn vẫn lấy ra được phong cảnh đã bỏ vào.
    </div>

    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Cơ bản về hàm -->
    <div
      v-if="activeTab === 'basic'"
      class="tab-content"
    >
      <div class="function-showcase">
        <div class="code-panel">
          <div class="code-title">
            Các cách khai báo hàm
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // 1. Function declaration
            </div>
            <div class="code-line">
              function greet(name) {
            </div>
            <div class="code-line indent">
              return "Hello " + name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 2. Function expression
            </div>
            <div class="code-line">
              const greet = function(name) {
            </div>
            <div class="code-line indent">
              return "Hello " + name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 3. Arrow function (ES6)
            </div>
            <div class="code-line">
              const greet = (name) => {
            </div>
            <div class="code-line indent">
              return "Hello " + name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Rút gọn (một dòng có thể bỏ return)
            </div>
            <div class="code-line">
              const greet = name => "Hello " + name
            </div>
          </div>
        </div>

        <div class="playground">
          <div class="playground-title">
            Thử gọi hàm
          </div>
          <div class="input-group">
            <input
              v-model="functionName"
              placeholder="Nhập tên của bạn"
            >
            <button @click="callFunction">
              Gọi
            </button>
          </div>
          <div class="output">
            <span
              v-if="functionResult"
              class="result"
            >{{ functionResult }}</span>
            <span
              v-else
              class="placeholder"
            >Nhấp nút "Gọi" để xem kết quả...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo closure -->
    <div
      v-else-if="activeTab === 'closure'"
      class="tab-content"
    >
      <div class="closure-visual">
        <div class="scenario-selector">
          <button
            :class="{ active: closureScenario === 'counter' }"
            @click="closureScenario = 'counter'"
          >
            Counter
          </button>
          <button
            :class="{ active: closureScenario === 'config' }"
            @click="closureScenario = 'config'"
          >
            Config
          </button>
        </div>

        <div
          v-if="closureScenario === 'counter'"
          class="counter-demo"
        >
          <div class="code-panel small">
            <div class="code-line">
              function createCounter() {
            </div>
            <div class="code-line indent">
              let count = 0 <span class="comment">// Biến private</span>
            </div>
            <div class="code-line indent">
              return function() {
            </div>
            <div class="code-line indent indent">
              count++
            </div>
            <div class="code-line indent indent">
              return count
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              const counter = createCounter()
            </div>
          </div>

          <div class="closure-animation">
            <div class="closure-box">
              <div class="box-title">
                Môi trường closure
              </div>
              <div class="closure-var">
                <span class="var-label">count = </span>
                <span class="var-value">{{ counterValue }}</span>
              </div>
            </div>

            <div class="controls-area">
              <button
                class="action-btn primary"
                @click="incrementCounter"
              >
                Gọi counter()
              </button>
            </div>

            <div class="explanation">
              <p><strong>Chuyện gì đã xảy ra?</strong></p>
              <ul>
                <li>Sau khi <code>createCounter()</code> chạy xong, biến cục bộ <code>count</code> lẽ ra phải biến mất</li>
                <li>Nhưng hàm được trả về vẫn "nhớ" biến đó (đó là closure)</li>
                <li>Mỗi lần gọi <code>counter()</code> đều truy cập cùng một <code>count</code></li>
                <li>Bên ngoài không truy cập trực tiếp được <code>count</code> (data private)</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-else
          class="config-demo"
        >
          <div class="code-panel small">
            <div class="code-line">
              function makeMultiplier(times) {
            </div>
            <div class="code-line indent">
              return function(n) {
            </div>
            <div class="code-line indent indent">
              return n * times
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              const double = makeMultiplier(2)
            </div>
            <div class="code-line">
              const triple = makeMultiplier(3)
            </div>
          </div>

          <div class="multiplier-playground">
            <div class="function-list">
              <div
                class="func-item"
                :class="{ active: activeMultiplier === 'double' }"
                @click="activeMultiplier = 'double'"
              >
                <div class="func-name">
                  double = makeMultiplier(2)
                </div>
                <div class="func-desc">
                  Closure capture times = 2
                </div>
              </div>
              <div
                class="func-item"
                :class="{ active: activeMultiplier === 'triple' }"
                @click="activeMultiplier = 'triple'"
              >
                <div class="func-name">
                  triple = makeMultiplier(3)
                </div>
                <div class="func-desc">
                  Closure capture times = 3
                </div>
              </div>
            </div>

            <div class="multiplier-input">
              <input
                v-model.number="multiplyNumber"
                type="number"
                placeholder="Nhập số"
              >
              <button @click="doMultiply">
                Tính
              </button>
            </div>

            <div
              v-if="multiplyResult"
              class="multiply-result"
            >
              <span class="result-equation">{{ multiplyResult }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scope chain -->
    <div
      v-else
      class="tab-content"
    >
      <div class="scope-chain-demo">
        <div class="nested-visual">
          <div class="scope-level global">
            <div class="level-title">
              Global scope
            </div>
            <div class="level-vars">
              <span class="var-tag">globalVar = "global"</span>
            </div>

            <div class="scope-level outer">
              <div class="level-title">
                Scope hàm ngoài
              </div>
              <div class="level-vars">
                <span class="var-tag">outerVar = "outer"</span>
              </div>

              <div class="scope-level inner">
                <div class="level-title">
                  Scope hàm trong
                </div>
                <div class="level-vars">
                  <span class="var-tag">innerVar = "inner"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lookup-demo">
          <div class="lookup-title">
            Quá trình tìm biến (scope chain)
          </div>
          <div class="lookup-steps">
            <div
              v-for="(step, i) in lookupSteps"
              :key="i"
              class="lookup-step"
            >
              <div class="step-num">
                {{ i + 1 }}
              </div>
              <div class="step-content">
                {{ step }}
              </div>
            </div>
          </div>

          <div class="lookup-rule">
            <strong>Quy tắc tìm kiếm:</strong>
            Bắt đầu từ scope hiện tại, tìm dần ra ngoài cho tới global scope. Không tìm thấy thì báo lỗi ReferenceError.
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      <span v-if="activeTab === 'basic'">Hàm là first-class citizen trong JavaScript, có thể gán cho biến, truyền làm tham số, trả về như giá trị. Arrow function gọn hơn và không có this riêng.</span>
      <span v-else-if="activeTab === 'closure'">Closure là tổ hợp của hàm và môi trường lexical nơi nó được khai báo. Nó cho phép hàm truy cập biến của scope ngoài, ngay cả khi hàm ngoài đã thực thi xong. Closure thường dùng cho data private, function factory, module hóa, v.v.</span>
      <span v-else>Scope chain là cơ chế JavaScript tìm biến. Khi truy cập một biến, engine sẽ tìm ở scope hiện tại trước, không thấy thì ra scope ngoài, cho tới global. Cơ chế này giúp hàm trong truy cập biến của hàm ngoài, là nền tảng của closure.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('basic')
const functionName = ref('')
const functionResult = ref('')
const counterValue = ref(0)
const closureScenario = ref('counter')
const activeMultiplier = ref('double')
const multiplyNumber = ref(null)
const multiplyResult = ref('')

const tabs = [
  { id: 'basic', label: 'Hàm cơ bản' },
  { id: 'closure', label: 'Closure' },
  { id: 'scope', label: 'Scope chain' }
]

const lookupSteps = ref([
  'Hàm trong truy cập innerVar - tìm thấy ngay ở scope hiện tại',
  'Hàm trong truy cập outerVar - scope hiện tại không có, tìm ra ngoài thấy',
  'Hàm trong truy cập globalVar - tiếp tục ra ngoài, tìm thấy ở global scope',
  'Hàm trong truy cập unknownVar - không scope nào có, báo lỗi ReferenceError'
])

const callFunction = () => {
  if (functionName.value.trim()) {
    functionResult.value = `Hello ${functionName.value}`
  }
}

const incrementCounter = () => {
  counterValue.value++
}

const doMultiply = () => {
  if (multiplyNumber.value !== null) {
    const times = activeMultiplier.value === 'double' ? 2 : 3
    multiplyResult.value = `${multiplyNumber.value} × ${times} = ${multiplyNumber.value * times}`
  }
}
</script>

<style scoped>
.closure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.demo-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-content {
  min-height: 380px;
}

.function-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: #d4d4d4;
}

.code-panel.small {
  font-size: 0.75rem;
  padding: 0.5rem;
}

.code-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.code-line {
  padding: 0.1rem 0;
  line-height: 1.4;
}

.code-line.indent {
  padding-left: 1.5rem;
}

.code-line.indent.indent {
  padding-left: 3rem;
}

.code-line .comment {
  color: #6a9955;
}

.code-line :deep(code) {
  background: #333;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.playground {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.playground-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.input-group button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.output {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.output .result {
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 1.1rem;
}

.output .placeholder {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.scenario-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.scenario-selector button {
  flex: 1;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.scenario-selector button:hover {
  border-color: var(--vp-c-brand);
}

.scenario-selector button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.closure-visual {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.counter-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.closure-animation {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.closure-box {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.box-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.closure-var {
  font-size: 1.5rem;
  font-weight: bold;
}

.var-label {
  color: var(--vp-c-text-2);
}

.var-value {
  color: var(--vp-c-brand);
  font-size: 2rem;
}

.controls-area {
  display: flex;
  justify-content: center;
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
}

.explanation {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.85rem;
}

.explanation p {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.explanation ul {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.explanation code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
}

.config-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.multiplier-playground {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.function-list {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.func-item {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.func-item:hover {
  border-color: var(--vp-c-brand);
}

.func-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.func-name {
  font-weight: 600;
  font-family: monospace;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.func-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.multiplier-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.multiplier-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.multiplier-input button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.multiply-result {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
}

.result-equation {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.scope-chain-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nested-visual {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.scope-level {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  position: relative;
}

.scope-level.global {
  background: #f5f5f5;
}

.scope-level.outer {
  background: #e8f5e9;
  margin: 0.5rem 0 0.5rem 0.5rem;
  border-color: #c8e6c9;
}

.scope-level.inner {
  background: #e3f2fd;
  margin: 0.5rem 0 0 0.5rem;
  border-color: #bbdefb;
}

.level-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.level-vars {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.var-tag {
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: monospace;
  border: 1px solid var(--vp-c-divider);
}

.lookup-demo {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.lookup-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.lookup-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.lookup-step {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.step-num {
  background: var(--vp-c-brand);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.lookup-rule {
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
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

.info-box .icon { flex-shrink: 0; }

@media (max-width: 768px) {
  .function-showcase {
    grid-template-columns: 1fr;
  }

  .counter-demo {
    grid-template-columns: 1fr;
  }
}
</style>
