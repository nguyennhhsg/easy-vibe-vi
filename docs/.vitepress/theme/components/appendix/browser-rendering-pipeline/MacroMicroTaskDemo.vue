<template>
  <div class="macro-micro-task-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">Macrotask và microtask</span>
      <span class="subtitle">Ưu tiên task trong event loop</span>
    </div>

    <div class="intro-text">
      JavaScript là single-threaded, nhưng có thể chạy async qua <span class="highlight">task queue</span>. Giống như một nhà hàng chỉ có một đầu bếp, nhưng anh ấy có thể xử lý nhiều đơn cùng lúc: làm đơn VIP trước (microtask), rồi mới làm đơn thường (macrotask).
    </div>

    <div class="demo-content">
      <div class="event-loop-flow">
        <div class="flow-container">
          <div class="flow-section main-thread">
            <div class="section-title">
              Main thread (call stack)
            </div>
            <div class="execution-box">
              <div
                class="exec-item"
                :class="{ active: currentStep === 'script' }"
              >
                <span class="exec-label">Code đồng bộ</span>
              </div>
            </div>
          </div>

          <div class="flow-section task-queues">
            <div class="section-title">
              Task queue
            </div>
            <div class="queues-container">
              <div class="queue-box micro">
                <div class="queue-title">
                  Microtask queue (ưu tiên cao)
                </div>
                <div class="queue-items">
                  <div
                    v-for="task in microTasks"
                    :key="task.id"
                    class="queue-item"
                    :class="{ active: task.isActive, processing: task.isProcessing }"
                  >
                    {{ task.name }}
                  </div>
                </div>
              </div>

              <div class="queue-box macro">
                <div class="queue-title">
                  Macrotask queue (ưu tiên thấp)
                </div>
                <div class="queue-items">
                  <div
                    v-for="task in macroTasks"
                    :key="task.id"
                    class="queue-item"
                    :class="{ active: task.isActive, processing: task.isProcessing }"
                  >
                    {{ task.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <div class="example-title">
          Ví dụ code
        </div>
        <pre class="code-block"><code>console.log('1')

setTimeout(() => console.log('2'), 0)  // Macrotask

Promise.resolve().then(() => console.log('3'))  // Microtask

console.log('4')

<span class="code-comment">// Thứ tự output: 1 -> 4 -> 3 -> 2</span></code></pre>
      </div>

      <div class="control-panel">
        <button
          class="run-btn"
          @click="runDemo"
        >
          {{ isRunning ? 'Đang chạy...' : 'Chạy demo' }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong> Sau khi mỗi macrotask chạy xong, runtime sẽ clear toàn bộ microtask rồi mới chạy macrotask kế tiếp. Đó là lý do Promise.then() chạy trước setTimeout().
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRunning = ref(false)
const currentStep = ref('script')

const microTasks = ref([
  { id: 1, name: 'Promise.then()', isActive: false, isProcessing: false },
  { id: 2, name: 'queueMicrotask()', isActive: false, isProcessing: false }
])

const macroTasks = ref([
  { id: 1, name: 'setTimeout()', isActive: false, isProcessing: false },
  { id: 2, name: 'setInterval()', isActive: false, isProcessing: false },
  { id: 3, name: 'I/O', isActive: false, isProcessing: false }
])

async function runDemo() {
  if (isRunning.value) return
  isRunning.value = true

  // Reset
  microTasks.value.forEach(t => {
    t.isActive = false
    t.isProcessing = false
  })
  macroTasks.value.forEach(t => {
    t.isActive = false
    t.isProcessing = false
  })

  // Step 1: Sync code
  currentStep.value = 'script'
  await sleep(800)

  // Step 2: Process microtasks
  microTasks.value[0].isActive = true
  await sleep(500)
  microTasks.value[0].isActive = false
  microTasks.value[0].isProcessing = true
  await sleep(600)
  microTasks.value[0].isProcessing = false

  microTasks.value[1].isActive = true
  await sleep(500)
  microTasks.value[1].isActive = false
  microTasks.value[1].isProcessing = true
  await sleep(600)
  microTasks.value[1].isProcessing = false

  // Step 3: Process one macrotask
  macroTasks.value[0].isActive = true
  await sleep(500)
  macroTasks.value[0].isActive = false
  macroTasks.value[0].isProcessing = true
  await sleep(600)
  macroTasks.value[0].isProcessing = false

  currentStep.value = ''
  isRunning.value = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<style scoped>
.macro-micro-task-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.event-loop-flow {
  margin-bottom: 1rem;
}

.flow-container {
  display: flex;
  gap: 1rem;
}

.flow-section {
  flex: 1;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-align: center;
}

.execution-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exec-item {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.exec-item.active {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.05);
}

.queues-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.queue-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.queue-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.queue-box.micro .queue-title {
  color: var(--vp-c-brand-1);
}

.queue-box.macro .queue-title {
  color: var(--vp-c-text-3);
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.queue-item {
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.queue-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.queue-item.processing {
  background: var(--vp-c-success);
  color: white;
  border-color: var(--vp-c-success);
}

.code-example {
  margin-bottom: 1rem;
}

.example-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.code-comment {
  color: var(--vp-c-text-3);
}

.control-panel {
  display: flex;
  justify-content: center;
}

.run-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.run-btn:hover {
  background: var(--vp-c-brand-dark);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
