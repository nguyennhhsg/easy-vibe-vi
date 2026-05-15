<script setup>
import { ref, computed } from 'vue'

const name = ref('An')
const age = ref(25)
const isActive = ref(true)
const showError = ref(false)
const errorMessage = ref('')

const setMessage = (msg, isError = false) => {
  errorMessage.value = msg
  showError.value = isError
  setTimeout(() => {
    errorMessage.value = ''
    showError.value = false
  }, 3000)
}

const modifyName = () => {
  // TypeScript sẽ kiểm tra lỗi kiểu lúc compile
  // name.value = 123 // Dòng này sẽ báo lỗi khi dùng TypeScript
  name.value = 'Bình'
  setMessage('✅ Sửa thành công! Type check thông qua', false)
}

const modifyAgeError = () => {
  // Mô phỏng lỗi kiểu
  showError.value = true
  errorMessage.value = '❌ TypeScript error: không thể gán giá trị kiểu "string" cho biến kiểu "number"'
  setTimeout(() => {
    showError.value = false
    errorMessage.value = ''
  }, 3000)
}

const toggleActive = () => {
  isActive.value = !isActive.value
  setMessage(`✅ Trạng thái đổi thành ${isActive.value}`, false)
}

const reset = () => {
  name.value = 'An'
  age.value = 25
  isActive.value = true
  errorMessage.value = ''
  showError.value = false
}
</script>

<template>
  <div class="type-annotation-demo">
    <h3>📝 Demo type annotation trong TypeScript</h3>

    <div class="demo-container">
      <div class="variables-grid">
        <!-- Kiểu String -->
        <div class="variable-card string-card">
          <div class="card-header">
            <span class="type-badge string">string</span>
            <span class="var-name">name</span>
          </div>
          <div class="card-value">
            {{ name }}
          </div>
          <div class="card-code">
            <code>const name: string = "{{ name }}"</code>
          </div>
        </div>

        <!-- Kiểu Number -->
        <div class="variable-card number-card">
          <div class="card-header">
            <span class="type-badge number">number</span>
            <span class="var-name">age</span>
          </div>
          <div class="card-value">
            {{ age }}
          </div>
          <div class="card-code">
            <code>const age: number = {{ age }}</code>
          </div>
        </div>

        <!-- Kiểu Boolean -->
        <div class="variable-card boolean-card">
          <div class="card-header">
            <span class="type-badge boolean">boolean</span>
            <span class="var-name">isActive</span>
          </div>
          <div class="card-value">
            <span :class="['status-dot', isActive ? 'active' : 'inactive']" />
            {{ isActive ? 'true' : 'false' }}
          </div>
          <div class="card-code">
            <code>const isActive: boolean = {{ isActive }}</code>
          </div>
        </div>
      </div>

      <!-- Hiển thị thông báo lỗi -->
      <div
        v-if="errorMessage"
        :class="['message-box', showError ? 'error' : 'success']"
      >
        {{ errorMessage }}
      </div>

      <!-- Nút thao tác -->
      <div class="controls">
        <button
          class="btn-primary"
          @click="modifyName"
        >
          Sửa name (đúng)
        </button>
        <button
          class="btn-danger"
          @click="modifyAgeError"
        >
          Gán kiểu sai
        </button>
        <button
          class="btn-secondary"
          @click="toggleActive"
        >
          Đảo isActive
        </button>
        <button
          class="btn-ghost"
          @click="reset"
        >
          Reset
        </button>
      </div>

      <!-- So sánh code -->
      <div class="code-comparison">
        <div class="code-panel javascript">
          <div class="panel-header">
            JavaScript (không kiểm tra kiểu)
          </div>
          <pre><code>let name = "An"
name = 123  // ✅ Tới runtime mới báo lỗi (có thể phát hiện rất muộn)</code></pre>
        </div>
        <div class="code-panel typescript">
          <div class="panel-header">
            TypeScript (kiểm tra lúc compile)
          </div>
          <pre><code>let name: string = "An"
name = 123  // ❌ Báo lỗi ngay lúc compile (phát hiện khi đang code)</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.type-annotation-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
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

.demo-container {
  max-width: 900px;
  margin: 0 auto;
}

.variables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.variable-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.variable-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.type-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.type-badge.string {
  background: #dbeafe;
  color: #1e40af;
}

.type-badge.number {
  background: #d1fae5;
  color: #065f46;
}

.type-badge.boolean {
  background: #fef3c7;
  color: #92400e;
}

.var-name {
  font-size: 14px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.status-dot.inactive {
  background: #ef4444;
}

.card-code {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  overflow-x: auto;
}

.card-code code {
  font-family: 'Courier New', monospace;
  color: #d4d4d4;
  line-height: 1.5;
}

.message-box {
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-box.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.message-box.success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 24px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.btn-ghost:hover {
  background: var(--vp-c-bg-soft-hover);
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.code-panel.javascript {
  border-color: #f59e0b;
}

.code-panel.typescript {
  border-color: #3178c6;
}

.panel-header {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: white;
}

.code-panel.javascript .panel-header {
  background: #f59e0b;
}

.code-panel.typescript .panel-header {
  background: #3178c6;
}

.code-panel pre {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.code-panel code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
