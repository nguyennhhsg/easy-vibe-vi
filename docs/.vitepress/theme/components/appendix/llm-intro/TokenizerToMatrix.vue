<!--
  TokenizerToMatrix.vue
  Minh hoạ quá trình chuyển từ tokenizer sang ma trận đầu vào

  Mục đích:
  Trình bày chi tiết bước đầu tiên LLM xử lý văn bản:
  Text (văn bản) -> Tokens (sau khi tokenize) -> IDs (chỉ số số) -> One-hot encoding / Embedding Lookup (tra bảng) -> Matrix (ma trận đầu vào)

  Tính năng tương tác:
  - Điều hướng theo bước: trình bày từng giai đoạn biến đổi.
  - Nhập động: bạn có thể nhập cụm từ và xem kết quả ngay.
  - Trực quan ma trận: hiển thị ma trận số cuối cùng được tạo ra.
-->
<template>
  <div class="matrix-demo">
    <div class="control-bar">
      <input
        v-model="inputText"
        type="text"
        placeholder="Nhập một đoạn văn bản..."
        class="text-input"
        :disabled="currentStep > 0"
      >
      <div class="step-controls">
        <button
          class="step-btn prev"
          :disabled="currentStep === 0"
          @click="currentStep--"
        >
          ← Bước trước
        </button>
        <div class="step-indicator">
          Step {{ currentStep + 1 }} / 4
        </div>
        <button
          class="step-btn next"
          :disabled="currentStep === 3"
          @click="currentStep++"
        >
          Bước tiếp →
        </button>
      </div>
    </div>

    <div class="visualization-stage">
      <!-- Step 1: Tokenization -->
      <div
        v-if="currentStep === 0"
        class="stage-content"
      >
        <h3 class="stage-title">
          Step 1: Tokenization (cắt token)
        </h3>
        <p class="stage-desc">
          Máy tính trước tiên cắt văn bản thành các đơn vị ngữ nghĩa nhỏ nhất (token).
          <span
            style="
              font-size: 0.85em;
              color: var(--vp-c-text-2);
              display: block;
              margin-top: 4px;
            "
          >
            (Lưu ý: demo này đơn giản hoá bằng cách cắt theo ký tự; mô hình thực tế thường dùng BPE,
            ví dụ "人工智能" có thể được gộp thành một token)
          </span>
        </p>
        <div class="token-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="token-box"
            :style="{ borderColor: getTokenColor(idx) }"
          >
            <span class="token-val">{{ token.text }}</span>
          </div>
        </div>
      </div>

      <!-- Step 2: ID Mapping -->
      <div
        v-if="currentStep === 1"
        class="stage-content"
      >
        <h3 class="stage-title">
          Step 2: ID Mapping (ánh xạ chỉ số)
        </h3>
        <p class="stage-desc">
          Tra cứu trong vocabulary để tìm số ID duy nhất tương ứng với mỗi token.
        </p>
        <div class="mapping-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="mapping-row"
          >
            <div
              class="token-box sm"
              :style="{ borderColor: getTokenColor(idx) }"
            >
              {{ token.text }}
            </div>
            <div class="arrow">
              →
            </div>
            <div class="vocab-lookup">
              <span class="vocab-label">Vocab Lookup</span>
            </div>
            <div class="arrow">
              →
            </div>
            <div class="id-box">
              {{ token.id }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Embedding Lookup -->
      <div
        v-if="currentStep === 2"
        class="stage-content"
      >
        <h3 class="stage-title">
          Step 3: Embedding Lookup (tra bảng vector)
        </h3>
        <p class="stage-desc">
          Mỗi ID tương ứng với một vector cao chiều đã được train trước (ở đây rút gọn còn 4 chiều).
        </p>
        <div class="lookup-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="lookup-row"
          >
            <div class="id-box">
              {{ token.id }}
            </div>
            <div class="arrow">
              →
            </div>
            <div class="vector-row">
              <span class="bracket">[</span>
              <span
                v-for="(val, vIdx) in token.vector"
                :key="vIdx"
                class="vector-val"
              >
                {{ val.toFixed(2) }}
              </span>
              <span class="bracket">]</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Input Matrix -->
      <div
        v-if="currentStep === 3"
        class="stage-content"
      >
        <h3 class="stage-title">
          Step 4: Matrix Construction (dựng ma trận)
        </h3>
        <p class="stage-desc">
          Toàn bộ vector được xếp chồng lại, tạo thành ma trận đầu vào (Shape: [Batch, Seq_Len,
          Dim]). Đây mới chính là thứ LLM thực sự "nhìn thấy".
        </p>
        <div class="matrix-container">
          <div class="matrix-bracket left" />
          <div class="matrix-grid">
            <div
              v-for="(token, rIdx) in tokens"
              :key="rIdx"
              class="matrix-row"
            >
              <div
                v-for="(val, cIdx) in token.vector"
                :key="cIdx"
                class="matrix-cell"
                :style="{ backgroundColor: getHeatmapColor(val) }"
                :title="val.toFixed(4)"
              >
                {{ val.toFixed(1) }}
              </div>
            </div>
          </div>
          <div class="matrix-bracket right" />
          <div class="matrix-label">
            Shape: ({{ tokens.length }}, 4)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('我爱人工智能')
const currentStep = ref(0)

const colors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa']

// Mô phỏng tokenizer và embedding
const tokens = computed(() => {
  const text = inputText.value || ''
  // Cắt đơn giản theo ký tự/từ để mô phỏng
  const rawTokens = text.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|./g) || []

  return rawTokens.map((t, i) => {
    // Sinh ID và vector kiểu pseudo-random nhưng deterministic
    let hash = 0
    for (let j = 0; j < t.length; j++)
      hash = t.charCodeAt(j) + ((hash << 5) - hash)
    const id = Math.abs(hash) % 10000

    // Sinh vector 4 chiều
    const vector = []
    for (let k = 0; k < 4; k++) {
      const val = Math.sin(id * (k + 1)) // giá trị giả ngẫu nhiên trong khoảng -1 ~ 1
      vector.push(val)
    }

    return { text: t, id, vector }
  })
})

const getTokenColor = (idx) => colors[idx % colors.length]

const getHeatmapColor = (val) => {
  // val is -1 to 1
  // Map to blue (negative) -> white (0) -> red (positive)
  // Reduce max opacity to avoid confusion with "selection" or "special token"
  const opacity = Math.abs(val) * 0.6 + 0.1
  if (val > 0) return `rgba(239, 68, 68, ${opacity})` // Red
  return `rgba(59, 130, 246, ${opacity})` // Blue
}
</script>

<style scoped>
.matrix-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.control-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.text-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.step-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.step-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.visualization-stage {
  padding: 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stage-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.stage-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 80%;
}

/* Step 1 Styles */
.token-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.token-box {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.token-box.sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
}

/* Step 2 Styles */
.mapping-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mapping-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vocab-lookup {
  padding: 0.25rem 0.5rem;
  background-color: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.id-box {
  font-family: monospace;
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Step 3 Styles */
.lookup-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lookup-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vector-row {
  display: flex;
  gap: 0.25rem;
  font-family: monospace;
}

.vector-val {
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
}

/* Step 4 Styles */
.matrix-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Add centering */
  margin-top: 1rem;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.matrix-row {
  display: flex;
  gap: 2px;
}

.matrix-cell {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff; /* text always white for contrast on colored bg */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.matrix-bracket {
  width: 10px;
  border: 2px solid var(--vp-c-text-1);
  position: absolute;
  top: -5px;
  bottom: -5px;
}

.matrix-bracket.left {
  left: -15px;
  border-right: none;
}

.matrix-bracket.right {
  right: -15px;
  border-left: none;
}

.matrix-label {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .control-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .text-input {
    width: auto;
    flex: 1;
    max-width: 300px;
  }
}
</style>
