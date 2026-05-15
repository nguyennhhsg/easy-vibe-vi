<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <span class="icon">🔍</span> 
      <span>So sánh hai góc nhìn Accessibility Object Model (AOM)</span>
    </div>

    <div class="intro-text">
      Hãy thử dùng <strong>chỉ bàn phím (Tab và Enter)</strong> để thao tác với các phần tử ở hai panel bên dưới, rồi quan sát kết quả parse AOM mà "screen reader" bắt được ở bên phải.
    </div>

    <div class="comparison-container">
      <!-- Case A: chỉ trông giống button -->
      <div class="case-panel bad-case">
        <h3 class="case-title">Case A: chỉ giống về mặt thị giác</h3>
        <p class="case-desc">Dùng <code>&lt;div&gt;</code> kết hợp CSS để vẽ. Trên render tree thì đẹp, nhưng trong AOM tree lại thiếu semantic.</p>

        <div class="interactive-area">
          <div class="label">Xác nhận thao tác:</div>
          <!-- input giả -->
          <div
            class="fake-input"
            @click="simulateFocus('bad', 'Text: nhập mã xác thực')"
          >
            Nhập mã xác thực
          </div>
          <!-- button giả -->
          <div
            class="fake-button"
            @mouseenter="simulateFocus('bad', 'Text: xác nhận gửi')"
            @mouseleave="clearFocus('bad')"
            @click="handleClick('bad')"
          >
            Xác nhận gửi
          </div>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">Screen reader parse (AOM):</div>
          <div class="monitor-screen" :class="{ 'has-content': badCaseOutput }">
            {{ badCaseOutput || '(người dùng khiếm thị không thể dùng Tab để chọn bất kỳ phần tử nào ở đây)' }}
          </div>
        </div>
      </div>

      <!-- Case B: semantic + ARIA -->
      <div class="case-panel good-case">
        <h3 class="case-title">Case B: semantic + ARIA</h3>
        <p class="case-desc">Dùng các thẻ native như <code>&lt;input&gt;</code>, <code>&lt;button&gt;</code> kết hợp <code>aria-label</code>. Trong AOM tree sẽ có đầy đủ thuộc tính tương tác.</p>

        <div class="interactive-area">
          <label for="a11y-input" class="label">Xác nhận thao tác:</label>
          <input
            id="a11y-input"
            type="text"
            placeholder="Nhập mã xác thực"
            @focus="simulateFocus('good', 'Input: xác nhận thao tác, nhập mã xác thực')"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', 'Input: xác nhận thao tác, nhập mã xác thực')"
            @mouseleave="clearFocus('good')"
          />
          <button
            type="button"
            class="real-button"
            aria-label="Gửi mã xác thực"
            @focus="simulateFocus('good', 'Nút: gửi mã xác thực. Bấm Enter để kích hoạt.')"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', 'Nút: gửi mã xác thực.')"
            @mouseleave="clearFocus('good')"
            @click="handleClick('good')"
          >
            Xác nhận gửi
          </button>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">Screen reader parse (AOM):</div>
          <div class="monitor-screen" :class="{ 'has-content': goodCaseOutput }">
            {{ goodCaseOutput || '(hover hoặc Tab vào để xem kết quả parse)' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const badCaseOutput = ref('')
const goodCaseOutput = ref('')
let timerBad = null
let timerGood = null

const simulateFocus = (type, text) => {
  if (type === 'bad') {
    if (timerBad) clearTimeout(timerBad)
    badCaseOutput.value = text
  } else {
    if (timerGood) clearTimeout(timerGood)
    goodCaseOutput.value = 'Đang đọc: ' + text
  }
}

const clearFocus = (type) => {
  if (type === 'bad') {
    timerBad = setTimeout(() => { badCaseOutput.value = '' }, 400)
  } else {
    timerGood = setTimeout(() => { goodCaseOutput.value = '' }, 400)
  }
}

const handleClick = (type) => {
  if (type === 'bad') {
    alert('[Thông báo] div thường có thể gắn click event, nhưng người dùng bàn phím không Tab focus được, cũng không kích hoạt được bằng Enter. Với người khuyết tật vận động thì đây là thảm hoạ.')
  } else {
    alert('[Thông báo] Nút native đã trigger thành công! Dù bạn click chuột hay bấm Enter trên bàn phím, đều chạy đúng.')
  }
}
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.8rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.8rem;
}

.intro-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .comparison-container {
    flex-direction: row;
  }
  .case-panel {
    flex: 1;
    min-width: 0;
  }
}

.case-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.bad-case {
  border-top: 4px solid var(--vp-c-danger-1);
}

.good-case {
  border-top: 4px solid var(--vp-c-brand-1);
}

.case-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.case-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  min-height: 2.5rem;
}

.case-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.interactive-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border: 1px dashed var(--vp-c-divider);
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Style cho các phần tử giả */
.fake-input {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: #888;
  cursor: text;
  border-radius: 4px;
}
.fake-button {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-soft);
}
/* Lưu ý: cố tình không viết style :focus để mô phỏng cách code cẩu thả thông thường */

/* Style cho các phần tử native thật */
#a11y-input {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: all 0.2s;
}
#a11y-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}
.real-button {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.real-button:hover {
  background: var(--vp-c-brand-2);
}
.real-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

/* Panel mô phỏng screen reader */
.aom-monitor {
  margin-top: auto;
  background: #1e293b;
  border-radius: 6px;
  padding: 1rem;
  border-left: 4px solid #475569;
}

.monitor-header {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.monitor-screen {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  color: #64748b;
  min-height: 2.5rem;
  line-height: 1.4;
}

.monitor-screen.has-content {
  color: #34d399; /* sáng lên màu xanh, biểu thị đã đọc đúng semantic */
  font-weight: bold;
}

.dark .fake-input { background: #333; border-color: #555; }
</style>
