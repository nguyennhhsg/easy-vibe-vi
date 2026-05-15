<!--
  NginxArchitectureDemo.vue
  Kiến trúc Nginx - Master-Worker / event-driven
-->
<template>
  <div class="nginx-architecture-demo">
    <div class="header">
      <div class="title">
        ⚡ Mổ xẻ kiến trúc Nginx: vì sao gánh được triệu connection đồng thời?
      </div>
      <div class="subtitle">
        Mô hình process Master-Worker + event-driven = bí quyết hiệu năng cao
      </div>
    </div>

    <div class="architecture-diagram">
      <div class="diagram-title">
        Sơ đồ kiến trúc process Nginx
      </div>

      <div class="process-layer master-layer">
        <div class="process master">
          <div class="process-icon">
            👑
          </div>
          <div class="process-info">
            <div class="process-name">
              Process Master
            </div>
            <div class="process-desc">
              Quản lý mọi Worker, phụ trách load config, upgrade mượt
            </div>
          </div>
        </div>
      </div>

      <div class="connections">
        <div
          v-for="n in workerCount"
          :key="n"
          class="connection-line"
        />
      </div>

      <div class="process-layer worker-layer">
        <div class="worker-controls">
          <button
            class="control-btn"
            :disabled="workerCount <= 1"
            @click="decreaseWorker"
          >
            -
          </button>
          <span class="worker-count">{{ workerCount }} Worker</span>
          <button
            class="control-btn"
            :disabled="workerCount >= 8"
            @click="increaseWorker"
          >
            +
          </button>
        </div>

        <div class="workers">
          <div
            v-for="n in workerCount"
            :key="n"
            class="process worker"
            :class="{ active: activeWorker === n, processing: processingWorkers.includes(n) }"
            @click="activateWorker(n)"
          >
            <div class="process-icon">
              ⚙️
            </div>
            <div class="process-info">
              <div class="process-name">
                Worker {{ n }}
              </div>
              <div class="process-desc">
                Xử lý {{ requestCounts[n] || 0 }} request
              </div>
            </div>
            <div class="status-indicator" />
          </div>
        </div>
      </div>

      <div class="epoll-layer">
        <div class="epoll-box">
          <div class="epoll-title">
            📡 epoll (Linux) / kqueue (macOS)
          </div>
          <div class="epoll-desc">
            Event-driven: một Worker xử lý đồng thời hàng chục nghìn connection
          </div>
          <div class="epoll-comparison">
            <div class="compare-item old">
              <div class="compare-title">
                Apache truyền thống
              </div>
              <div class="compare-detail">
                Một connection = một process/thread
              </div>
              <div class="compare-result">
                ❌ Vấn đề C10K
              </div>
            </div>
            <div class="vs">
              VS
            </div>
            <div class="compare-item new">
              <div class="compare-title">
                Nginx
              </div>
              <div class="compare-detail">
                Event-driven + async non-blocking
              </div>
              <div class="compare-result">
                ✅ Triệu connection đồng thời
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="simulation-panel">
      <div class="panel-title">
        🎮 Mô phỏng xử lý request
      </div>
      <div class="sim-controls">
        <button
          class="sim-btn"
          :disabled="isSimulating"
          @click="simulateRequests"
        >
          {{ isSimulating ? 'Đang xử lý...' : 'Gửi 20 request đồng thời' }}
        </button>
        <button
          class="sim-btn secondary"
          @click="resetSimulation"
        >
          Reset
        </button>
      </div>
      <div
        v-if="totalRequests > 0"
        class="sim-stats"
      >
        <div class="stat-item">
          <div class="stat-value">
            {{ totalRequests }}
          </div>
          <div class="stat-label">
            Tổng số request
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-value">
            {{ mostActiveWorker }}
          </div>
          <div class="stat-label">
            Worker bận nhất
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-value">
            {{ avgRequests.toFixed(1) }}
          </div>
          <div class="stat-label">
            Trung bình/Worker
          </div>
        </div>
      </div>
    </div>

    <div class="config-tip">
      <div class="tip-title">
        💡 Khuyến nghị cho môi trường production
      </div>
      <div class="tip-content">
        <strong>Số Worker = số core CPU</strong> (thường để auto để Nginx tự nhận)
        <br>
        Quá nhiều thì chi phí context switch lớn, quá ít thì không tận dụng được đa nhân.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const workerCount = ref(4)
const activeWorker = ref(1)
const requestCounts = ref({})
const isSimulating = ref(false)
const processingWorkers = ref([])

const totalRequests = computed(() => {
  return Object.values(requestCounts.value).reduce((a, b) => a + b, 0)
})

const mostActiveWorker = computed(() => {
  let max = 0
  let worker = '-'
  Object.entries(requestCounts.value).forEach(([k, v]) => {
    if (v > max) {
      max = v
      worker = k
    }
  })
  return worker
})

const avgRequests = computed(() => {
  if (workerCount.value === 0) return 0
  return totalRequests.value / workerCount.value
})

const increaseWorker = () => {
  if (workerCount.value < 8) {
    workerCount.value++
  }
}

const decreaseWorker = () => {
  if (workerCount.value > 1) {
    workerCount.value--
  }
}

const activateWorker = (n) => {
  activeWorker.value = n
}

const simulateRequests = async () => {
  isSimulating.value = true
  const requests = 20

  for (let i = 0; i < requests; i++) {
    const worker = Math.floor(Math.random() * workerCount.value) + 1
    processingWorkers.value.push(worker)

    await new Promise(resolve => setTimeout(resolve, 100))

    requestCounts.value[worker] = (requestCounts.value[worker] || 0) + 1
    processingWorkers.value = processingWorkers.value.filter(w => w !== worker)
  }

  isSimulating.value = false
}

const resetSimulation = () => {
  requestCounts.value = {}
  processingWorkers.value = []
  isSimulating.value = false
}
</script>

<style scoped>
.nginx-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.architecture-diagram {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.diagram-title {
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.process-layer {
  margin-bottom: 1.5rem;
}

.process {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.process.master {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
}

.process.worker {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
}

.process.worker:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.process.worker.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.process.worker.processing {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.process-icon {
  font-size: 2rem;
}

.process-info {
  flex: 1;
}

.process-name {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.process-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
}

.worker-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.worker-count {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.workers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.epoll-layer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--vp-c-divider);
}

.epoll-box {
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1), rgba(var(--vp-c-brand-rgb), 0.05));
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 1.5rem;
}

.epoll-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.epoll-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.epoll-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.compare-item {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
}

.compare-item.old {
  border: 2px solid #ef4444;
}

.compare-item.new {
  border: 2px solid #22c55e;
}

.compare-title {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.compare-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.compare-result {
  font-weight: 700;
  font-size: 1.1rem;
}

.old .compare-result {
  color: #ef4444;
}

.new .compare-result {
  color: #22c55e;
}

.vs {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.simulation-panel {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.sim-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.sim-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.sim-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.sim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sim-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.sim-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.stat-value {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.config-tip {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 1.25rem;
}

.tip-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #15803d;
}

.tip-content {
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .epoll-comparison {
    grid-template-columns: 1fr;
  }

  .vs {
    text-align: center;
  }

  .sim-stats {
    grid-template-columns: 1fr;
  }

  .workers {
    grid-template-columns: 1fr;
  }
}
</style>
