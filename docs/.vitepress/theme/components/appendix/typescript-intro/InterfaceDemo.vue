<script setup>
import { ref } from 'vue'

// Dữ liệu người dùng
const user = ref({
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'vana@example.com',
  age: 25
})

// Hiển thị thông báo lỗi
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

// Thử thêm thuộc tính với kiểu sai
const addErrorProperty = () => {
  showError.value = true
  errorMessage.value = '❌ Lỗi TypeScript: Kiểu "string" không thể gán cho kiểu "number"'
  setTimeout(() => {
    showError.value = false
    errorMessage.value = ''
  }, 3000)
}

// Tạo người dùng mới
const addNewUser = () => {
  user.value = {
    id: 2,
    name: 'Trần Thị B',
    email: 'thib@example.com',
    age: 30
  }
  setMessage('✅ Tạo người dùng mới thành công! Kiểm tra kiểu đã qua', false)
}

// Sửa tuổi người dùng
const modifyAge = () => {
  user.value.age = user.value.age + 1
  setMessage(`✅ Tuổi cập nhật thành ${user.value.age}`, false)
}

// Đặt lại
const reset = () => {
  user.value = {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'vana@example.com',
    age: 25
  }
  errorMessage.value = ''
  showError.value = false
}
</script>

<template>
  <div class="interface-demo">
    <h3>🎯 Demo Interface</h3>

    <div class="demo-container">
      <!-- Định nghĩa interface -->
      <div class="interface-definition">
        <div class="code-header">
          <span class="typescript-logo">TS</span>
          <span>Định nghĩa User Interface</span>
        </div>
        <pre><code class="typescript">interface User {
  id: number
  name: string
  email: string
  age: number
}</code></pre>
      </div>

      <!-- Hiển thị đối tượng user -->
      <div class="user-display">
        <div class="user-card">
          <div class="card-header">
            <div class="avatar">
              👤
            </div>
            <div class="user-info">
              <div class="user-name">
                {{ user.name }}
              </div>
              <div class="user-email">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="user-details">
            <div class="detail-item">
              <span class="label">ID:</span>
              <span class="value">{{ user.id }}</span>
              <span class="type-badge">number</span>
            </div>
            <div class="detail-item">
              <span class="label">Tuổi:</span>
              <span class="value">{{ user.age }}</span>
              <span class="type-badge">number</span>
            </div>
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
          @click="modifyAge"
        >
          Tăng tuổi
        </button>
        <button
          class="btn-danger"
          @click="addErrorProperty"
        >
          Thử gán sai kiểu
        </button>
        <button
          class="btn-secondary"
          @click="addNewUser"
        >
          Tạo người dùng mới
        </button>
        <button
          class="btn-ghost"
          @click="reset"
        >
          Đặt lại
        </button>
      </div>

      <!-- Ví dụ mã -->
      <div class="code-examples">
        <div class="example-item">
          <div class="example-header">
            ✅ Dùng đúng
          </div>
          <pre><code class="typescript">const user: User = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "vana@example.com",
  age: 25
} // ✅ Kiểu hoàn toàn khớp</code></pre>
        </div>

        <div class="example-item error">
          <div class="example-header">
            ❌ Dùng sai
          </div>
          <pre><code class="typescript">const user: User = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "vana@example.com",
  age: "25"  // ❌ Lỗi: age phải là number, không phải string
}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interface-demo {
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

.interface-definition {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  border-left: 4px solid #3178c6;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.typescript-logo {
  background: #3178c6;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.interface-definition pre {
  margin: 0;
}

.interface-definition code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}

.user-display {
  margin-bottom: 20px;
}

.user-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  max-width: 400px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-border);
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.user-email {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 60px;
}

.value {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.type-badge {
  margin-left: auto;
  padding: 3px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
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

.code-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .code-examples {
    grid-template-columns: 1fr;
  }
}

.example-item {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.example-item.error {
  border-color: #ef4444;
}

.example-header {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.example-item.error .example-header {
  background: #fef2f2;
  color: #991b1b;
}

.example-item pre {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.example-item code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
