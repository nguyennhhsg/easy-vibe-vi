<!--
  SlidingWindowDemo.vue
  Mô phỏng cơ chế sliding window

  Mục đích:
  Cho thấy cách "Sliding Window" xử lý các cuộc hội thoại dài.
  Khi tin mới tới, tin cũ nhất sẽ bị đẩy khỏi context, minh hoạ cơ chế "quên".

  Tính năng tương tác:
  - Gửi tin: bạn có thể gửi tin, AI tự động trả lời.
  - Mô phỏng tự động: bấm một nút để xem cuộc hội thoại dài và quan sát cửa sổ trượt.
  - Phản hồi trực quan: chỉ rõ tin nào còn trong "cửa sổ" (đang dùng), tin nào ngoài "cửa sổ" (đã quên).
-->
<template>
  <div class="sliding-window-demo">
    <div class="control-panel">
      <div class="info-stat">
        <span class="label">Cửa sổ nhớ tối đa được bao nhiêu tin</span>
        <span class="value">Tối đa {{ windowSize }} tin</span>
      </div>
      <div class="actions">
        <button
          class="action-btn"
          :disabled="isAutoPlaying"
          @click="autoPlay"
        >
          ▶ Mô phỏng tự động
        </button>
        <button
          class="action-btn outline"
          @click="reset"
        >
          ↺ Bắt đầu lại
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="conversation-stream">
        <!-- Forgotten / History Zone -->
        <div class="zone history-zone">
          <div class="zone-label">
            <span class="icon">🗑️</span> Nội dung đã quên
          </div>
          <transition-group name="fade-list">
            <div
              v-for="msg in historyMessages"
              :key="msg.id"
              class="message-bubble history"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">
                {{ msg.role === 'User' ? '👤' : '🤖' }}
              </div>
              <div class="content">
                <div class="role-name">
                  {{ msg.role }}
                </div>
                <div class="text">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </transition-group>
          <div
            v-if="historyMessages.length === 0"
            class="empty-placeholder"
          >
            Chưa có tin nào bị "đẩy ra" cả
          </div>
        </div>

        <!-- Divider -->
        <div class="window-divider">
          <span>⬆ Ngoài cửa sổ (mô hình không thấy)</span>
          <div class="divider-line" />
          <span>⬇ Trong cửa sổ (mô hình vẫn nhìn thấy)</span>
        </div>

        <!-- Active Window Zone -->
        <div class="zone active-zone">
          <div class="zone-label">
            <span class="icon">🖼️</span> Các tin vẫn còn trong bộ nhớ
          </div>
          <transition-group name="slide-list">
            <div
              v-for="msg in activeMessages"
              :key="msg.id"
              class="message-bubble active"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">
                {{ msg.role === 'User' ? '👤' : '🤖' }}
              </div>
              <div class="content">
                <div class="role-name">
                  {{ msg.role }}
                </div>
                <div class="text">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </transition-group>
          <div
            v-if="activeMessages.length === 0"
            class="empty-placeholder"
          >
            Bạn bắt đầu chat từ đây, xem các tin cũ bị "đẩy ra" thế nào
          </div>
        </div>
      </div>
    </div>

    <div class="input-section">
      <input
        v-model="newMessage"
        placeholder="Bạn gõ một tin nhắn ở đây rồi nhấn gửi"
        :disabled="isAutoPlaying"
        @keyup.enter="sendMessage"
      >
      <button
        class="send-btn"
        :disabled="!newMessage.trim() || isAutoPlaying"
        @click="sendMessage"
      >
        Gửi
      </button>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Giải thích:</strong>
        Sliding window là cách quản lý bộ nhớ đơn giản nhất: tin mới vào, tin cũ ra.
        Ưu điểm là không bao giờ "vỡ não", cái giá phải trả là — một khi đã trượt khỏi cửa sổ (vùng xám phía trên), mô hình sẽ hoàn toàn quên tin đó từng tồn tại.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const windowSize = 4
const messages = ref([])
const newMessage = ref('')
const isAutoPlaying = ref(false)
let msgId = 0

const activeMessages = computed(() => {
  return messages.value.slice(-windowSize)
})

const historyMessages = computed(() => {
  return messages.value.slice(0, Math.max(0, messages.value.length - windowSize))
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  addMessage('User', newMessage.value)
  const userText = newMessage.value
  newMessage.value = ''

  // Simulate AI response
  setTimeout(() => {
    addMessage('AI', `I heard you say "${userText}". Interesting!`)
  }, 600)
}

const addMessage = (role, content) => {
  messages.value.push({
    id: msgId++,
    role,
    content
  })
}

const autoPlay = async () => {
  isAutoPlaying.value = true
  const script = [
    'Xin chào, mình là Nam.',
    'Chào bạn, mình là trợ lý AI của bạn đây.',
    'Hôm nay mình hơi mệt, ghi giúp mình mấy việc cần làm nhé.',
    'Không vấn đề, bạn gửi từng việc cho mình.',
    'Việc 1: gửi email cho khách hàng.',
    'OK, đã ghi lại rồi nhé.',
    'Việc 2: chiều đi chợ nấu cơm.',
    'Nhận rồi, mình cũng đã ghi nhớ.',
    'Việc 3: nhớ mua hoa tặng bạn gái.',
    'Tin này cũng đã được viết lên "bảng đen nhỏ" rồi.',
    'Bây giờ bạn còn nhớ câu đầu tiên mình nói không?',
    'Ơ... mình chỉ thấy được vài tin trong cửa sổ thôi, câu đầu tiên đã bị đẩy ra mất rồi.'
  ]

  for (const line of script) {
    if (!isAutoPlaying.value) break
    const role = messages.value.length % 2 === 0 ? 'User' : 'AI'
    addMessage(role, line)
    await new Promise((r) => setTimeout(r, 1500))
  }
  isAutoPlaying.value = false
}

const reset = () => {
  messages.value = []
  msgId = 0
  isAutoPlaying.value = false
}
</script>

<style scoped>
.sliding-window-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.info-stat {
  display: flex;
  flex-direction: column;
}

.info-stat .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.info-stat .value {
  font-weight: bold;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.visualization-area {
  margin-bottom: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.conversation-stream {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.zone {
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.history-zone {
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px dashed var(--vp-c-divider);
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.active-zone {
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  min-height: 100px;
}

.zone-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  margin: 0.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.message-bubble {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.5s ease;
}

.message-bubble.history {
  filter: grayscale(100%);
  opacity: 0.7;
}

.message-bubble.user .avatar {
  order: 1;
}

.message-bubble.user {
  flex-direction: row-reverse;
  text-align: right;
}

.message-bubble.user .content {
  align-items: flex-end;
}

.avatar {
  font-size: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 50%;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.role-name {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.text {
  font-size: 0.85rem;
  line-height: 1.3;
}

.empty-placeholder {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 0.5rem;
  font-size: 0.8rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.send-btn {
  padding: 0 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.9rem;
}

.send-btn:hover {
  background: var(--vp-c-brand-dark);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

/* Animations */
.slide-list-enter-active,
.slide-list-leave-active,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.slide-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-list-enter-from {
  opacity: 0;
}
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
