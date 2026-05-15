<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)
const currentStep = ref(0)
const syncCode = ref([
  { id: 1, code: 'console.log("1")', type: 'sync', output: '1' },
  { id: 2, code: 'setTimeout(() => console.log("2"), 0)', type: 'macro', output: '2' },
  { id: 3, code: 'Promise.resolve().then(() => console.log("3"))', type: 'micro', output: '3' },
  { id: 4, code: 'console.log("4")', type: 'sync', output: '4' },
  { id: 5, code: 'setTimeout(() => console.log("5"), 0)', type: 'macro', output: '5' }
])
const microTaskQueue = ref([])
const macroTaskQueue = ref([])
const outputLog = ref([])

const executionSteps = [
  { description: 'Thực thi console.log("1")', action: 'execute', output: '1', source: 'Sync' },
  { description: 'Gặp setTimeout, đưa callback vào macrotask queue', action: 'add-macro', task: 'console.log("2")' },
  { description: 'Gặp Promise.then, đưa callback vào microtask queue', action: 'add-micro', task: 'console.log("3")' },
  { description: 'Thực thi console.log("4")', action: 'execute', output: '4', source: 'Sync' },
  { description: 'Gặp setTimeout, đưa callback vào macrotask queue', action: 'add-macro', task: 'console.log("5")' },
  { description: 'Code sync chạy xong, kiểm tra microtask queue', action: 'check-micro' },
  { description: 'Thực thi microtask: console.log("3")', action: 'execute-micro', output: '3', source: 'Microtask' },
  { description: 'Microtask queue rỗng, kiểm tra macrotask queue', action: 'check-macro' },
  { description: 'Thực thi macrotask: console.log("2")', action: 'execute-macro', output: '2', source: 'Macrotask' },
  { description: 'Kiểm tra microtask queue (rỗng)', action: 'check-micro' },
  { description: 'Thực thi macrotask: console.log("5")', action: 'execute-macro', output: '5', source: 'Macrotask' },
  { description: 'Tất cả task đã chạy xong', action: 'done' }
]

const reset = () => {
  currentStep.value = 0
  microTaskQueue.value = []
  macroTaskQueue.value = []
  outputLog.value = []
  isAnimating.value = false
}

const nextStep = () => {
  if (currentStep.value >= executionSteps.length) return

  const step = executionSteps[currentStep.value]

  switch (step.action) {
    case 'execute':
      outputLog.value.push({ output: step.output, source: step.source })
      break
    case 'add-macro':
      macroTaskQueue.value.push({ code: step.task, status: 'pending' })
      break
    case 'add-micro':
      microTaskQueue.value.push({ code: step.task, status: 'pending' })
      break
    case 'check-micro':
      if (microTaskQueue.value.length > 0) {
        microTaskQueue.value[0].status = 'ready'
      }
      break
    case 'execute-micro':
      if (microTaskQueue.value.length > 0) {
        outputLog.value.push({ output: step.output, source: step.source })
        microTaskQueue.value.shift()
      }
      break
    case 'check-macro':
      if (macroTaskQueue.value.length > 0) {
        macroTaskQueue.value[0].status = 'ready'
      }
      break
    case 'execute-macro':
      if (macroTaskQueue.value.length > 0) {
        outputLog.value.push({ output: step.output, source: step.source })
        macroTaskQueue.value.shift()
      }
      break
  }

  currentStep.value++
}

const play = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  reset()

  while (currentStep.value < executionSteps.length && isAnimating.value) {
    nextStep()
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  isAnimating.value = false
}

const stop = () => {
  isAnimating.value = false
}
</script>

<template>
  <div class="task-queue-demo">
    <h3>Task queue: macrotask vs microtask</h3>

    <!-- Hiển thị code -->
    <div class="code-section">
      <h4>Ví dụ code</h4>
      <div class="code-display">
        <div
          v-for="(item, index) in syncCode"
          :key="item.id"
          class="code-item"
          :class="{
            'current': currentStep === index,
            'executed': currentStep > index && index < 4
          }"
        >
          <span class="item-number">{{ item.id }}</span>
          <span
            class="item-code"
            :class="`type-${item.type}`"
          >{{ item.code }}</span>
          <span
            v-if="item.type === 'sync'"
            class="item-tag"
          >Sync</span>
          <span
            v-else-if="item.type === 'micro'"
            class="item-tag micro"
          >Microtask</span>
          <span
            v-else-if="item.type === 'macro'"
            class="item-tag macro"
          >Macrotask</span>
        </div>
      </div>
    </div>

    <!-- Trực quan hoá quá trình thực thi -->
    <div class="visualization">
      <!-- Call stack -->
      <div class="stack-panel">
        <h4>Call stack (đang thực thi)</h4>
        <div class="stack-content">
          <div
            v-if="currentStep < executionSteps.length"
            class="current-action"
          >
            {{ executionSteps[currentStep]?.description }}
          </div>
          <div
            v-else
            class="current-action done"
          >
            Đã thực thi xong
          </div>
        </div>
      </div>

      <!-- Microtask queue -->
      <div class="queue-panel micro">
        <h4>
          Microtask queue
          <span class="badge">Microtask</span>
        </h4>
        <div class="queue-content">
          <transition-group name="task-item">
            <div
              v-for="(task, index) in microTaskQueue"
              :key="`micro-${index}`"
              class="task-item micro"
              :class="{ 'ready': task.status === 'ready' }"
            >
              <div class="task-code">
                {{ task.code }}
              </div>
              <div
                v-if="task.status === 'ready'"
                class="task-status"
              >
                Sẵn sàng
              </div>
              <div
                v-else
                class="task-status"
              >
                Đang chờ
              </div>
            </div>
          </transition-group>
          <div
            v-if="microTaskQueue.length === 0"
            class="empty-queue"
          >
            Hàng đợi rỗng
          </div>
        </div>
      </div>

      <!-- Macrotask queue -->
      <div class="queue-panel macro">
        <h4>
          Macrotask queue
          <span class="badge">Macrotask</span>
        </h4>
        <div class="queue-content">
          <transition-group name="task-item">
            <div
              v-for="(task, index) in macroTaskQueue"
              :key="`macro-${index}`"
              class="task-item macro"
              :class="{ 'ready': task.status === 'ready' }"
            >
              <div class="task-code">
                {{ task.code }}
              </div>
              <div
                v-if="task.status === 'ready'"
                class="task-status"
              >
                Sẵn sàng
              </div>
              <div
                v-else
                class="task-status"
              >
                Đang chờ
              </div>
            </div>
          </transition-group>
          <div
            v-if="macroTaskQueue.length === 0"
            class="empty-queue"
          >
            Hàng đợi rỗng
          </div>
        </div>
      </div>
    </div>

    <!-- Output log -->
    <div class="output-section">
      <h4>Output log (thứ tự thực thi)</h4>
      <div class="output-log">
        <div
          v-if="outputLog.length === 0"
          class="empty-log"
        >
          Đang chờ output...
        </div>
        <transition-group name="output">
          <div
            v-for="(log, index) in outputLog"
            :key="`log-${index}`"
            class="log-entry"
          >
            <span class="log-output">{{ log.output }}</span>
            <span class="log-source">({{ log.source }})</span>
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
        {{ isAnimating ? 'Đang chạy...' : 'Tự chạy demo' }}
      </button>
      <button
        :disabled="isAnimating || currentStep >= executionSteps.length"
        class="btn-step"
        @click="nextStep"
      >
        Chạy từng bước
      </button>
      <button
        :disabled="!isAnimating"
        class="btn-stop"
        @click="stop"
      >
        Dừng
      </button>
      <button
        :disabled="isAnimating"
        class="btn-reset"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <!-- Quy tắc thực thi -->
    <div class="rules-box">
      <h4>Quy tắc thứ tự thực thi</h4>
      <div class="rule-list">
        <div class="rule-item">
          <span class="rule-number">1</span>
          <span class="rule-text">Chạy hết code đồng bộ (sync)</span>
        </div>
        <div class="rule-item">
          <span class="rule-number">2</span>
          <span class="rule-text">Chạy hết các task trong microtask queue</span>
        </div>
        <div class="rule-item">
          <span class="rule-number">3</span>
          <span class="rule-text">Chạy một macrotask</span>
        </div>
        <div class="rule-item">
          <span class="rule-number">4</span>
          <span class="rule-text">Lặp lại bước 2-3</span>
        </div>
      </div>
      <p class="highlight">
        <strong>Điểm cốt lõi:</strong> Microtask có ưu tiên cao hơn macrotask. Sau khi chạy xong một macrotask, runtime sẽ kiểm tra và chạy hết microtask trước khi sang macrotask tiếp theo.
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-queue-demo {
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

.code-section {
  margin-bottom: 20px;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Courier New', monospace;
}

.code-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.code-item.current {
  background: rgba(62, 175, 124, 0.2);
  border-left: 3px solid var(--vp-c-brand-1);
}

.code-item.executed {
  opacity: 0.5;
}

.item-number {
  color: #858585;
  font-size: 12px;
  min-width: 20px;
}

.item-code {
  flex: 1;
  color: #d4d4d4;
  font-size: 13px;
}

.item-code.type-micro {
  color: #68d391;
}

.item-code.type-macro {
  color: #f687b3;
}

.item-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.item-tag.micro {
  background: rgba(104, 217, 145, 0.2);
  color: #68d391;
}

.item-tag.macro {
  background: rgba(246, 135, 179, 0.2);
  color: #f687b3;
}

.visualization {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .visualization {
    grid-template-columns: 1fr;
  }
}

.stack-panel,
.queue-panel {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  min-height: 250px;
}

.queue-panel.micro {
  border-color: #68d391;
}

.queue-panel.macro {
  border-color: #f687b3;
}

.badge {
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.stack-content,
.queue-content {
  min-height: 200px;
}

.current-action {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.current-action.done {
  border-color: #48bb78;
  text-align: center;
  font-weight: 600;
}

.task-item {
  padding: 12px;
  margin-bottom: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.task-item.micro {
  border-color: #68d391;
}

.task-item.macro {
  border-color: #f687b3;
}

.task-item.ready {
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(104, 217, 145, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(104, 217, 145, 0); }
}

.task-code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.task-status {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.task-item-enter-active,
.task-item-leave-active {
  transition: all 0.3s ease;
}

.task-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.task-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.empty-queue {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.output-section {
  margin-bottom: 20px;
}

.output-log {
  min-height: 60px;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.empty-log {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.log-entry {
  padding: 8px 12px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
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

.log-output {
  font-family: 'Courier New', monospace;
}

.log-source {
  margin-left: 8px;
  font-size: 12px;
  opacity: 0.8;
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

.rules-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rule-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.rule-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin: 0;
}

.highlight strong {
  color: var(--vp-c-brand-1);
}
</style>
