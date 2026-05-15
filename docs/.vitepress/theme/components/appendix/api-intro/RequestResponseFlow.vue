<!--
  RequestResponseFlow.vue - bản đơn giản
  Mục tiêu: dùng animation đơn giản minh họa luồng request-response
-->
<template>
  <div class="demo">
    <div class="title">🔄 Luồng một lần gọi API</div>
    <p class="subtitle">Nhấn nút và xem request bay đi rồi bay về</p>

    <div class="flow-container">
      <div class="side you">
        <div class="window">
          <div class="window-header">👤 Phía bạn</div>
          <div class="window-body">
            <div class="message">Mình muốn gọi API</div>
          </div>
        </div>
      </div>

      <div class="middle">
        <div class="arrow" :class="{ animating: isAnimating }">➔</div>
        <button class="send-btn" :disabled="isAnimating" @click="send">
          {{ isAnimating ? 'Đang gửi...' : '🚀 Gửi request' }}
        </button>
      </div>

      <div class="side server">
        <div class="window">
          <div class="window-header">🖥️ Server đối phương</div>
          <div class="window-body">
            <div class="message">
              {{ serverMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="result" class="result">
      <div class="result-box" :class="result.type">
        {{ result.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)
const serverMessage = ref('Đang chờ request...')
const result = ref(null)

function send() {
  isAnimating.value = true
  serverMessage.value = 'Đã nhận request, đang xử lý...'
  result.value = null

  // Giả lập luồng request
  setTimeout(() => {
    serverMessage.value = 'Xử lý xong!'
    result.value = {
      type: 'success',
      text: '✅ Request thành công! Server đã trả về dữ liệu'
    }
    isAnimating.value = false
  }, 1500)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.side {
  flex: 1;
}

.window {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.window-header {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
}

.window-body {
  padding: 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message {
  font-size: 14px;
  color: var(--vp-c-text-1);
  text-align: center;
}

.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.arrow {
  font-size: 32px;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s;
}

.arrow.animating {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.send-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  margin-top: 16px;
}

.result-box {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}

.result-box.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.result-box.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

@media (max-width: 720px) {
  .flow-container {
    flex-direction: column;
  }

  .middle {
    flex-direction: row;
  }
}
</style>
