<script setup>
import { ref, computed } from 'vue'

const round = ref(1)
const maxRound = 20
const windowLimit = 4000 

// Cấu hình dữ liệu mô phỏng
const systemPromptTokens = 1000
const tokensPerRound = 300
const costPer1kTokens = 0.002

// Computed properties
const historyTokens = computed(() => (round.value - 1) * tokensPerRound)
const currentInputTokens = 200
const totalTokens = computed(() => systemPromptTokens + historyTokens.value + currentInputTokens)

// Kiểm tra tràn cửa sổ
const isOverflow = computed(() => totalTokens.value > windowLimit)
const overflowAmount = computed(() => Math.max(0, totalTokens.value - windowLimit))
const forgottenRounds = computed(() => Math.floor(overflowAmount.value / tokensPerRound))

// Tính chi phí
const currentCost = computed(() => (totalTokens.value / 1000 * costPer1kTokens).toFixed(4))

// Tính chiều cao (tương đối so với windowLimit)
const systemHeight = computed(() => (systemPromptTokens / windowLimit) * 100)
const inputHeight = computed(() => (currentInputTokens / windowLimit) * 100)
// Logic hiển thị chiều cao History:
// Chúng ta muốn hiển thị "tổng chiều cao", ngay cả khi vượt 100%.
// Container cha sẽ giới hạn vùng hiển thị, phần tràn được biểu thị bằng hình ảnh.
const historyHeight = computed(() => (historyTokens.value / windowLimit) * 100)
</script>

<template>
  <div class="agent-context-flow">
    <!-- 1. Thanh thống kê đầu trang -->
    <div class="control-panel">
      <div class="stat-group">
        <div class="stat-item">
          <span class="value">{{ round }}</span>
          <span class="label">Lượt hiện tại</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span
            class="value"
            :class="{ error: isOverflow }"
          >{{ totalTokens }}</span>
          <span class="label">Token đang dùng</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="value">${{ currentCost }}</span>
          <span class="label">Chi phí lượt này</span>
        </div>
      </div>
    </div>

    <!-- 2. Khu vực trực quan -->
    <div class="visualization-area">
      <!-- Chừa khoảng trống phía trên cho thông báo tràn -->
      <div class="overflow-zone">
        <transition name="fade">
          <div
            v-if="isOverflow"
            class="overflow-badge"
          >
            <span class="icon">🗑️</span>
            <span>Tràn cửa sổ: {{ forgottenRounds }} lượt hội thoại đầu đã bị quên!</span>
          </div>
          <div
            v-else
            class="safe-badge"
          >
            <span class="icon">✅</span>
            <span>Trí nhớ còn nguyên</span>
          </div>
        </transition>
      </div>

      <!-- Khung context window -->
      <div class="window-frame">
        <div class="limit-line">
          <span>Context Window Limit ({{ windowLimit }})</span>
        </div>

        <!-- Container xếp chồng nội dung -->
        <!-- Dùng flex-direction: column-reverse để căn đáy -->
        <div class="stack-container">
          <!-- System (lớp nền) -->
          <div
            class="block system"
            :style="{ height: `${systemHeight}%` }"
          >
            <span class="block-text">System Prompt ({{ systemPromptTokens }})</span>
          </div>

          <!-- History (ở giữa) -->
          <div
            class="block history"
            :style="{ height: `${historyHeight}%` }"
          >
            <span
              v-if="historyHeight > 10"
              class="block-text"
            >
              History ({{ round - 1 }} rounds)
            </span>
            <!-- Mặt nạ tràn: khi tràn, phần đáy của History thực ra bị "đẩy ra ngoài" -->
            <!-- Nhưng để trực quan đơn giản, ta cho phần đỉnh tràn. Hoặc đẩy cả stack lên? -->
            <!-- Logic chuẩn: Context Window chỉ có vậy. Nội dung vào trước, ra trước. -->
            <!-- Nên System luôn còn. Phần cũ của History bị đẩy ra. New ở trên cùng. -->
            <!-- Trực quan ở đây: nếu không tràn, xếp từ dưới lên. -->
            <!-- Nếu tràn, System ở đáy, New ở đỉnh, phần History ở giữa bị ép/tràn? -->
            <!-- Không, LLM thật là sliding window. System thường được ghim. -->
            <!-- Hãy minh hoạ "tổng dung lượng" vượt "kích thước cửa sổ". -->
          </div>

          <!-- Input (mới nhất) -->
          <div
            class="block input"
            :style="{ height: `${inputHeight}%` }"
          >
            <span class="block-text">New Input</span>
          </div>
        </div>
        
        <!-- Lớp mặt nạ tràn: nếu totalHeight > 100%, hiển thị một lớp phủ đỏ ở phía trên để cho thấy phần đó đã sinh ra nhưng không nhét được, hoặc phần cũ bị đẩy đi. -->
        <!-- Cho đơn giản, ta cho phép chiều cao của stack-container vượt 100%, rồi đặt window-frame overflow: hidden. -->
        <!-- Nhưng như vậy người dùng không thấy bị tràn bao nhiêu. -->
        <!-- Cách tốt hơn: window-frame là viewport, stack-container đặt position: absolute. -->
      </div>
    </div>

    <!-- 3. Khu vực điều khiển phía dưới -->
    <div class="input-section">
      <div class="slider-wrapper">
        <span class="slider-hint">Bạn kéo thanh trượt để tăng số lượt hội thoại:</span>
        <input 
          v-model.number="round" 
          type="range" 
          min="1" 
          :max="maxRound" 
          class="custom-slider"
        >
        <div class="slider-labels">
          <span>Lượt 1</span>
          <span>Lượt {{ maxRound }}</span>
        </div>
      </div>
      
      <div class="info-box">
        <p v-if="!isOverflow">
          💡 <strong>Vẫn ổn nhé bạn</strong>: tổng số Token hiện tại ({{ totalTokens }}) chưa vượt context window. Mô hình vẫn nhớ trọn vẹn mọi chi tiết của cuộc hội thoại.
        </p>
        <p
          v-else
          class="warning-text"
        >
          ⚠️ <strong>Đã xảy ra "quên"</strong>: tổng số Token ({{ totalTokens }}) đã vượt context window ({{ windowLimit }}).
          Để nhồi thêm hội thoại mới, hệ thống buộc phải bỏ đi <strong>{{ forgottenRounds }}</strong> lượt lịch sử cũ nhất.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-context-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

/* 1. Thanh thống kê đầu */
.control-panel {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.stat-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-item .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.stat-item .value.error {
  color: var(--vp-c-red);
}

.stat-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background-color: var(--vp-c-divider);
}

/* 2. Khu vực trực quan */
.visualization-area {
  padding: 1rem 2rem;
  background-color: var(--vp-c-bg-alt); /* Nền hơi đậm hơn một chút */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.overflow-zone {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overflow-badge {
  color: var(--vp-c-red);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-red-dimm);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.safe-badge {
  color: var(--vp-c-green);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-frame {
  width: 100%;
  max-width: 300px; /* Giới hạn chiều rộng cho giống màn hình điện thoại */
  height: 300px;
  border: 2px solid var(--vp-c-divider);
  border-top: 2px dashed var(--vp-c-red); /* Đường nét đứt phía trên biểu thị Limit */
  border-radius: 0 0 8px 8px;
  background: var(--vp-c-bg);
  position: relative;
  display: flex;
  flex-direction: column-reverse; /* Căn theo đáy */
  overflow: visible; /* Cho phép hiển thị phần tràn */
}

.limit-line {
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.limit-line span {
  background: var(--vp-c-red);
  color: white;
  font-size: 0.75rem;
  padding: 0 8px;
  border-radius: 10px;
}

.stack-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse; /* Để System nằm dưới cùng */
  /* Không đặt overflow: hidden ở đây, để nó tràn tự nhiên, ta kiểm soát qua chiều cao */
}

.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.block-text {
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.block.system {
  background-color: #10b981; /* Green */
  flex-shrink: 0; /* System không bao giờ bị nén */
}

.block.history {
  background-color: #3b82f6; /* Blue */
  /* Logic tràn: khi chiều cao tăng, history sẽ bị đẩy lên trên */
}

.block.input {
  background-color: #f59e0b; /* Amber */
  flex-shrink: 0;
}

/* Xử lý style khi tràn */
/* Khi tổng chiều cao vượt 100%, stack-container sẽ tràn ra ngoài window-frame */
/* Mong muốn phần tràn được tô đỏ hoặc mờ đi */

/* 3. Khu vực điều khiển phía dưới */
.input-section {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-hint {
  font-size: 0.9rem;
  font-weight: 600;
}

.custom-slider {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box p {
  margin: 0;
}

.warning-text {
  color: var(--vp-c-red-text);
}

/* Tương thích thiết bị di động */
@media (max-width: 640px) {
  .stat-group {
    gap: 0.5rem;
  }
  .stat-item .value {
    font-size: 1.2rem;
  }
  .window-frame {
    height: 250px;
  }
}
</style>