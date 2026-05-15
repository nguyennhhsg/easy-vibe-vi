<!--
 * Component: MemoryPalaceDemo.vue
 * Description: Visualizes the "Memory Palace" 4-layer context structure.
 * Features:
 *  - Step-by-step assembly of the context layers
 *  - Visual distinction between Static (Cached) and Dynamic parts
 *  - Explains the purpose of each layer
-->

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const steps = [
  {
    id: 'base',
    title: 'Tầng 1: Móng nhà (System)',
    desc: 'Cài đặt hệ thống, danh tính, nguyên tắc',
    detail: '✅ Không đổi, tận dụng KV Cache để "thuộc bài" gần như 0 chi phí',
    color: 'var(--vp-c-brand)',
    icon: '🏛️'
  },
  {
    id: 'task',
    title: 'Tầng 2: Cột trụ (Task)',
    desc: 'Mục tiêu nhiệm vụ hiện tại, hồ sơ người dùng',
    detail: '📌 "Đóng đinh" trong suốt nhiệm vụ, đảm bảo không lệch hướng',
    color: '#8e44ad',
    icon: '📌'
  },
  {
    id: 'chat',
    title: 'Tầng 3: Phòng khách (Chat)',
    desc: '5-10 lượt hội thoại gần nhất',
    detail: '🔄 Sliding window, lượt cũ tự nhường chỗ',
    color: '#e67e22',
    icon: '💬'
  },
  {
    id: 'rag',
    title: 'Tầng 4: Thư viện (RAG)',
    desc: 'Tri thức truy hồi theo nhu cầu',
    detail: '📚 Không chiếm bộ não, cần mới tra, mở rộng không giới hạn',
    color: '#27ae60',
    icon: '🔍'
  }
]

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    currentStep.value = 0
  }
}

const isComplete = computed(() => currentStep.value === 4)
</script>

<template>
  <div class="memory-palace-demo">
    <!-- Visual Area -->
    <div class="palace-container">
      <div class="palace-stack">
        <!-- Layer 4: RAG (Top/Side) -->
        <div 
          class="layer-block rag-layer" 
          :class="{ visible: currentStep >= 4 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[3].icon }}</span>
            <div class="text">
              <div class="layer-title">
                {{ steps[3].title }}
              </div>
              <div class="layer-desc">
                {{ steps[3].desc }}
              </div>
            </div>
          </div>
          <div
            v-if="currentStep >= 4"
            class="layer-detail"
          >
            {{ steps[3].detail }}
          </div>
        </div>

        <!-- Layer 3: Chat -->
        <div 
          class="layer-block chat-layer" 
          :class="{ visible: currentStep >= 3 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[2].icon }}</span>
            <div class="text">
              <div class="layer-title">
                {{ steps[2].title }}
              </div>
              <div class="layer-desc">
                {{ steps[2].desc }}
              </div>
            </div>
          </div>
          <div
            v-if="currentStep >= 3"
            class="layer-detail"
          >
            {{ steps[2].detail }}
          </div>
        </div>

        <!-- Layer 2: Task -->
        <div 
          class="layer-block task-layer" 
          :class="{ visible: currentStep >= 2 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[1].icon }}</span>
            <div class="text">
              <div class="layer-title">
                {{ steps[1].title }}
              </div>
              <div class="layer-desc">
                {{ steps[1].desc }}
              </div>
            </div>
          </div>
          <div
            v-if="currentStep >= 2"
            class="layer-detail"
          >
            {{ steps[1].detail }}
          </div>
        </div>

        <!-- Layer 1: Base -->
        <div 
          class="layer-block base-layer" 
          :class="{ visible: currentStep >= 1 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[0].icon }}</span>
            <div class="text">
              <div class="layer-title">
                {{ steps[0].title }}
              </div>
              <div class="layer-desc">
                {{ steps[0].desc }}
              </div>
            </div>
          </div>
          <div
            v-if="currentStep >= 1"
            class="layer-detail"
          >
            {{ steps[0].detail }}
          </div>
        </div>
        
        <!-- Empty State Placeholder -->
        <div
          v-if="currentStep === 0"
          class="empty-placeholder"
        >
          🚧 Đất trống: bạn nhấn nút phía dưới để bắt đầu xây Memory Palace
        </div>
      </div>
    </div>

    <!-- Control Area -->
    <div class="control-area">
      <div class="step-indicator">
        Tiến độ hiện tại: {{ currentStep }}/4
      </div>
      <button
        class="build-btn"
        :class="{ 'reset-mode': isComplete }"
        @click="nextStep"
      >
        {{ isComplete ? '🔄 Reset và xây lại' : (currentStep === 0 ? '🏗️ Bắt đầu xây' : '➕ Thêm tầng tiếp') }}
      </button>
    </div>

    <!-- Explanation Box -->
    <div
      v-if="currentStep > 0"
      class="explanation-box"
    >
      <div class="exp-title">
        Vì sao thiết kế thế này?
      </div>
      <div
        v-if="currentStep === 1"
        class="exp-content"
      >
        **Móng vững nhất**: bạn đặt System Prompt ngay phía trên cùng, tận dụng cơ chế KV Cache để AI "thuộc lòng", các request sau **vừa nhanh vừa miễn phí**.
      </div>
      <div
        v-if="currentStep === 2"
        class="exp-content"
      >
        **Mục tiêu rõ ràng**: dù chat hăng đến đâu, mục tiêu nhiệm vụ (ví dụ "viết một con crawler Python") cũng phải **đóng đinh** lại để AI không bị lệch chủ đề.
      </div>
      <div
        v-if="currentStep === 3"
        class="exp-content"
      >
        **Luôn tươi mới**: các lượt hội thoại gần đây quan trọng nhất, ta dùng sliding window để giữ lại, **phần cũ tự động quên đi** để nhường chỗ cho thông tin mới.
      </div>
      <div
        v-if="currentStep === 4"
        class="exp-content"
      >
        **Bộ não ngoại mở rộng**: gặp gì không biết thì đừng "phịa", hãy ghé "thư viện" tra tài liệu. **Dùng xong là đi**, không chiếm dung lượng não quý giá.
      </div>
    </div>
  </div>
</template>

<style scoped>
.memory-palace-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  margin: 1.5rem 0;
  overflow: hidden;
}

.palace-container {
  padding: 2rem;
  min-height: 320px;
  display: flex;
  align-items: flex-end; /* Stack from bottom */
  justify-content: center;
  background: linear-gradient(to top, var(--vp-c-bg-alt), var(--vp-c-bg));
}

.palace-stack {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column-reverse; /* Stack from bottom */
  gap: 8px;
  position: relative;
}

.layer-block {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-block.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Layer Specific Styles */
.base-layer {
  border-color: var(--vp-c-brand);
  border-bottom-width: 6px; /* Heavy foundation */
  background: var(--vp-c-brand-dimm);
}

.task-layer {
  border-color: #8e44ad;
  background: rgba(142, 68, 173, 0.1);
  margin: 0 10px; /* Slightly narrower */
}

.chat-layer {
  border-color: #e67e22;
  background: rgba(230, 126, 34, 0.1);
  margin: 0 20px; /* Narrower */
}

.rag-layer {
  border-color: #27ae60;
  border-style: dashed;
  background: rgba(39, 174, 96, 0.1);
  margin: 0 30px; /* Narrowest */
}

.layer-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.layer-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.layer-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.layer-detail {
  font-size: 0.75rem;
  background: rgba(255,255,255,0.5);
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  display: inline-block;
  align-self: flex-start;
}
.dark .layer-detail {
  background: rgba(0,0,0,0.3);
}

.empty-placeholder {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 6px;
}

/* Controls */
.control-area {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-indicator {
  font-family: var(--vp-font-mono);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.build-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

.build-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.build-btn.reset-mode {
  background: var(--vp-c-text-3);
}

/* Explanation */
.explanation-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
}

.exp-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.exp-content {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
