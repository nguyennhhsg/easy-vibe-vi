<!--
  ContextWindowVisualizer.vue
  Component trực quan hoá context window

  Mục đích:
  Trình bày trực quan giới hạn context window của LLM.
  Mô phỏng cách Token lấp đầy cửa sổ và điều gì xảy ra khi vượt giới hạn (tràn / bị cắt).

  Tính năng tương tác:
  - Nhập văn bản: đếm Token theo thời gian thực.
  - Nút điền sẵn: nhanh chóng điền văn bản ngắn/dài để kích hoạt các trạng thái khác nhau.
  - Thanh tiến độ: trực quan hoá tỷ lệ Token đã dùng.
  - Cảnh báo tràn: hiển thị khi số Token vượt giới hạn.
-->
<template>
  <div class="context-visualizer">
    <div class="control-panel">
      <div class="stat-group">
        <div class="stat-item">
          <span
            class="value"
            :class="{ error: isOverflow }"
          >{{ usedTokens }}</span>
          <span class="label">Đã viết bao nhiêu token</span>
        </div>
        <div class="stat-divider">
          /
        </div>
        <div class="stat-item">
          <span class="value">{{ maxTokens }}</span>
          <span class="label">Bảng đen viết tối đa được bao nhiêu token</span>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar-bg">
          <div
            class="progress-bar-fill"
            :style="{
              width: `${Math.min(usagePercentage, 100)}%`,
              backgroundColor: progressBarColor
            }"
          />
        </div>
        <div class="percentage-label">
          {{ usagePercentage.toFixed(1) }}%
        </div>
      </div>
    </div>

    <div class="visualization-area">
      <div
        class="window-frame"
        :class="{ overflow: isOverflow }"
      >
        <div class="window-header">
          <span class="icon">🧠</span>
          <span>"Bảng đen nhỏ" mà mô hình nhìn thấy (context window)</span>
        </div>
        
        <div class="token-stream">
          <transition-group name="list">
            <span
              v-for="(token, index) in tokenizedText"
              :key="index"
              class="token-chip"
              :class="getTokenClass(index)"
            >
              {{ token }}
            </span>
          </transition-group>
        </div>

        <div
          v-if="isOverflow"
          class="overflow-indicator"
        >
          <div class="overflow-line" />
          <span class="overflow-text">⚠️ Đã chạm trần context window (bị cắt bớt)</span>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-header">
        <label>Nhập nội dung (xem bảng đen từ từ bị viết kín ra sao)</label>
        <div class="actions">
          <button
            class="action-btn"
            @click="fillLorem(10)"
          >
            Điền một đoạn ngắn
          </button>
          <button
            class="action-btn"
            @click="fillLorem(60)"
          >
            Nhồi đầy bảng đen luôn
          </button>
          <button
            class="action-btn outline"
            @click="clear"
          >
            Xoá hết
          </button>
        </div>
      </div>
      <textarea
        v-model="inputText"
        placeholder="Bạn gõ vài câu vào đây để xem bảng đen dần bị viết kín thế nào..."
        rows="4"
      />
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Giải thích:</strong>
        Bạn có thể hình dung context window như "bảng đen nhỏ" của mô hình. Bảng chỉ có chừng đó chỗ, viết đầy thì phải xoá phần cũ mới có chỗ viết tiếp.
        Một khi tràn, phần viết sớm nhất sẽ bị xoá đi và mô hình hoàn toàn không còn "nhìn thấy" chúng.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const maxTokens = 100
const inputText = ref('Context Engineering là việc tối ưu prompt cung cấp cho LLM.')

// Simple mock tokenizer: split by space for demonstration
// In reality, tokens are subwords, but space-split is good enough for concept
const tokenizedText = computed(() => {
  if (!inputText.value) return []
  // Improved tokenizer:
  // 1. Matches continuous English words/numbers ([a-zA-Z0-9]+)
  // 2. OR matches any other single character (including Chinese, punctuation)
  // This provides a better visual approximation for mixed Chinese/English text
  const matches = inputText.value.match(/[a-zA-Z0-9]+|./g) || []
  return matches.filter(t => t.trim().length > 0)
})

const usedTokens = computed(() => tokenizedText.value.length)
const isOverflow = computed(() => usedTokens.value > maxTokens)
const usagePercentage = computed(() => (usedTokens.value / maxTokens) * 100)

const progressBarColor = computed(() => {
  if (isOverflow.value) return 'var(--vp-c-danger-1)'
  if (usagePercentage.value > 80) return 'var(--vp-c-warning-1)'
  return 'var(--vp-c-success-1)'
})

const getTokenClass = (index) => {
  if (index >= maxTokens) return 'token-overflow'
  return `token-normal color-${index % 5}`
}

const fillLorem = (count) => {
  const words = [
    'AI', 'deep-learning', 'neural-network', 'LLM', 'Transformer', 'attention',
    'context-window', 'Token', 'Embedding', 'fine-tuning', 'pre-training', 'inference', 'generation', 'RAG'
  ]
  const newText = Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
  inputText.value = newText
}

const clear = () => {
  inputText.value = ''
}
</script>

<style scoped>
.context-visualizer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.stat-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .value {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;
}

.stat-item .value.error {
  color: var(--vp-c-danger-1);
}

.stat-item .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.stat-divider {
  font-size: 1.5rem;
  color: var(--vp-c-divider);
}

.progress-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar-bg {
  flex: 1;
  height: 12px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.percentage-label {
  font-size: 0.9rem;
  font-weight: bold;
  width: 4rem;
  text-align: right;
}

.visualization-area {
  margin-bottom: 1rem;
}

.window-frame {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  min-height: 100px;
  position: relative;
  transition: border-color 0.3s;
  overflow: hidden;
}

.window-frame.overflow {
  border-color: var(--vp-c-danger-1);
}

.window-header {
  background: var(--vp-c-bg-alt);
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.token-stream {
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 150px;
  
}

.token-chip {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.token-normal {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

/* Color cycling for tokens to show boundaries */
.color-0 { background-color: rgba(255, 99, 132, 0.15); color: #c0392b; }
.color-1 { background-color: rgba(54, 162, 235, 0.15); color: #2980b9; }
.color-2 { background-color: rgba(255, 206, 86, 0.15); color: #d35400; }
.color-3 { background-color: rgba(75, 192, 192, 0.15); color: #16a085; }
.color-4 { background-color: rgba(153, 102, 255, 0.15); color: #8e44ad; }

.token-overflow {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  text-decoration: line-through;
  opacity: 0.6;
}

.overflow-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(239, 68, 68, 0.1);
  border-top: 1px dashed var(--vp-c-danger-1);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-danger-1);
  font-weight: bold;
  font-size: 0.9rem;
}

.input-section {
  margin-bottom: 1rem;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.input-header label {
  font-size: 0.9rem;
  font-weight: bold;
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
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

.action-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.outline:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

/* Animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
