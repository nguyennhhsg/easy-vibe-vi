<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)
const currentStep = ref(0)
const callStack = ref([])
const output = ref([])

const codeSteps = [
  { action: 'push', function: 'main', description: 'Gọi main()', code: 'main()' },
  { action: 'push', function: 'a', description: 'main() gọi a()', code: 'function a() {' },
  { action: 'push', function: 'b', description: 'a() gọi b()', code: 'function b() {' },
  { action: 'push', function: 'c', description: 'b() gọi c()', code: 'function c() {' },
  { action: 'log', function: 'c', description: 'c() chạy console.log', code: 'console.log("Hoàn tất")', output: 'Hoàn tất' },
  { action: 'pop', function: 'c', description: 'c() chạy xong, pop ra khỏi stack', code: '}' },
  { action: 'pop', function: 'b', description: 'b() chạy xong, pop ra khỏi stack', code: '}' },
  { action: 'pop', function: 'a', description: 'a() chạy xong, pop ra khỏi stack', code: '}' },
  { action: 'pop', function: 'main', description: 'main() chạy xong, pop ra khỏi stack', code: '}' }
]

const reset = () => {
  currentStep.value = 0
  callStack.value = []
  output.value = []
  isAnimating.value = false
}

const nextStep = () => {
  if (currentStep.value >= codeSteps.length) return

  const step = codeSteps[currentStep.value]

  if (step.action === 'push') {
    callStack.value.push({
      function: step.function,
      code: step.code,
      active: true
    })
    // Đánh dấu các phần tử trước là không hoạt động
    callStack.value.forEach((item, index) => {
      if (index < callStack.value.length - 1) {
        item.active = false
      }
    })
  } else if (step.action === 'pop') {
    callStack.value.pop()
    // Đánh dấu phần tử top mới là đang hoạt động
    if (callStack.value.length > 0) {
      callStack.value[callStack.value.length - 1].active = true
    }
  } else if (step.action === 'log') {
    output.value.push(step.output)
  }

  currentStep.value++
}

const play = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  reset()

  while (currentStep.value < codeSteps.length && isAnimating.value) {
    nextStep()
    await new Promise(resolve => setTimeout(resolve, 1200))
  }

  isAnimating.value = false
}

const stop = () => {
  isAnimating.value = false
}
</script>

<template>
  <div class="call-stack-demo">
    <h3>Call stack: dấu chân thực thi của các function</h3>

    <div class="demo-layout">
      <!-- Hiển thị code -->
      <div class="code-section">
        <h4>Code</h4>
        <div class="code-display">
          <div
            v-for="(step, index) in codeSteps"
            :key="index"
            class="code-line"
            :class="{
              'current': currentStep === index,
              'executed': currentStep > index
            }"
          >
            <span class="line-number">{{ index + 1 }}</span>
            <span class="line-code">{{ step.code }}</span>
          </div>
        </div>
      </div>

      <!-- Visualize call stack -->
      <div class="stack-section">
        <h4>Call Stack</h4>
        <div class="stack-container">
          <div class="stack-base">
            <div class="stack-label">
              Đáy stack
            </div>
          </div>

          <div class="stack-frames">
            <transition-group name="stack-frame">
              <div
                v-for="(frame, index) in callStack"
                :key="`${frame.function}-${index}`"
                class="stack-frame"
                :class="{ 'active': frame.active }"
                :style="{ bottom: `${index * 60}px` }"
              >
                <div class="frame-function">
                  {{ frame.function }}()
                </div>
                <div class="frame-code">
                  {{ frame.code }}
                </div>
              </div>
            </transition-group>

            <div
              v-if="callStack.length === 0"
              class="empty-stack"
            >
              Stack đang trống
            </div>
          </div>

          <div class="stack-top">
            <div class="stack-label">
              Đỉnh stack
            </div>
          </div>
        </div>

        <div class="stack-explanation">
          <p><strong>Trạng thái hiện tại:</strong></p>
          <p v-if="currentStep < codeSteps.length">
            {{ codeSteps[currentStep]?.description }}
          </p>
          <p v-else>
            Đã chạy xong
          </p>
        </div>
      </div>
    </div>

    <!-- Hiển thị output -->
    <div class="output-section">
      <h4>Output</h4>
      <div class="output-container">
        <div
          v-if="output.length === 0"
          class="empty-output"
        >
          Đang đợi output...
        </div>
        <transition-group name="output">
          <div
            v-for="(log, index) in output"
            :key="`log-${index}`"
            class="output-line"
          >
            {{ log }}
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Nút điều khiển -->
    <div class="controls">
      <button
        :disabled="isAnimating"
        class="btn-play"
        @click="play"
      >
        {{ isAnimating ? 'Đang chạy...' : '▶ Chạy tự động' }}
      </button>
      <button
        :disabled="isAnimating || currentStep >= codeSteps.length"
        class="btn-step"
        @click="nextStep"
      >
        ⏭ Chạy từng bước
      </button>
      <button
        :disabled="!isAnimating"
        class="btn-stop"
        @click="stop"
      >
        ⏸ Dừng
      </button>
      <button
        :disabled="isAnimating"
        class="btn-reset"
        @click="reset"
      >
        🔄 Reset
      </button>
    </div>

    <!-- Giải thích -->
    <div class="explanation-box">
      <p><strong>Nguyên lý hoạt động của call stack:</strong></p>
      <ul>
        <li>Mỗi lần gọi function, một "stack frame" mới sẽ được "push" lên stack</li>
        <li>Stack frame chứa trạng thái thực thi, biến local v.v. của function</li>
        <li>Function chạy xong thì stack frame sẽ được "pop" khỏi stack</li>
        <li>Stack là cấu trúc dữ liệu "vào sau ra trước" (LIFO)</li>
        <li>Nếu đệ quy quá sâu sẽ gây lỗi "stack overflow"</li>
      </ul>
      <p class="highlight">
        Call stack giống như một chồng đĩa: đĩa đặt cuối cùng sẽ được lấy ra đầu tiên. Mỗi function là một chiếc đĩa, chạy xong là lấy đi, rồi tiếp tục chạy function bên dưới.
      </p>
    </div>
  </div>
</template>

<style scoped>
.call-stack-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
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

h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.code-section,
.stack-section {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.code-display {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Courier New', monospace;
}

.code-line {
  display: flex;
  gap: 12px;
  padding: 6px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.code-line.current {
  background: rgba(62, 175, 124, 0.2);
  border-left: 3px solid var(--vp-c-brand-1);
}

.code-line.executed {
  opacity: 0.5;
}

.line-number {
  color: #858585;
  font-size: 12px;
  min-width: 20px;
  text-align: right;
  user-select: none;
}

.line-code {
  color: #d4d4d4;
  font-size: 13px;
}

.stack-container {
  position: relative;
  height: 350px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
}

.stack-base,
.stack-top {
  display: flex;
  justify-content: center;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 8px;
}

.stack-top {
  margin-top: 8px;
  margin-bottom: 0;
}

.stack-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.stack-frames {
  position: relative;
  flex: 1;
}

.stack-frame {
  position: absolute;
  left: 12px;
  right: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  transition: all 0.4s ease;
}

.stack-frame.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(62, 175, 124, 0.1);
  box-shadow: 0 0 0 3px rgba(62, 175, 124, 0.1);
}

.stack-frame-enter-active,
.stack-frame-leave-active {
  transition: all 0.4s ease;
}

.stack-frame-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.stack-frame-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.frame-function {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
  font-family: 'Courier New', monospace;
}

.frame-code {
  font-size: 11px;
  color: var(--vp-c-text-2);
  font-family: 'Courier New', monospace;
}

.empty-stack {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.stack-explanation {
  margin-top: 12px;
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
}

.stack-explanation p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.stack-explanation strong {
  color: var(--vp-c-brand-1);
}

.output-section {
  margin-bottom: 20px;
}

.output-container {
  min-height: 60px;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.empty-output {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.output-line {
  padding: 8px 12px;
  margin-bottom: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.output-enter-active,
.output-leave-active {
  transition: all 0.3s ease;
}

.output-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.output-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-play {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-play:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn-step {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-step:hover:not(:disabled) {
  background: var(--vp-c-bg-soft-hover);
}

.btn-stop {
  background: #ed8936;
  color: white;
}

.btn-stop:hover:not(:disabled) {
  background: #dd6b20;
}

.btn-reset {
  background: #f56565;
  color: white;
}

.btn-reset:hover:not(:disabled) {
  background: #e53e3e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.explanation-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.explanation-box p {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.explanation-box p:last-child {
  margin-bottom: 0;
}

.explanation-box strong {
  color: var(--vp-c-brand-1);
}

.explanation-box ul {
  margin: 12px 0;
  padding-left: 20px;
}

.explanation-box li {
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.explanation-box .highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
</style>
