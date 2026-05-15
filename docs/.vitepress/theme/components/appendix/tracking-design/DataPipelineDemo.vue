<!--
  DataPipelineDemo.vue
  Pipeline xử lý dữ liệu - thể hiện luồng đầy đủ từ thu thập đến phân tích
-->
<template>
  <div class="data-pipeline-demo">
    <div class="header">
      <div class="title">
        Pipeline xử lý dữ liệu
      </div>
      <div class="subtitle">
        Luồng đầy đủ từ hành vi user đến insight dữ liệu
      </div>
    </div>

    <div class="pipeline-container">
      <div class="pipeline-flow">
        <div
          v-for="(step, index) in pipelineSteps"
          :key="step.id"
          class="pipeline-step"
          :class="{
            active: currentStep === index,
            completed: currentStep > index
          }"
        >
          <div class="step-header">
            <div class="step-number">
              {{ index + 1 }}
            </div>
            <div class="step-info">
              <div class="step-name">
                {{ step.name }}
              </div>
              <div class="step-icon">
                {{ step.icon }}
              </div>
            </div>
          </div>

          <div class="step-content">
            <div class="step-description">
              {{ step.description }}
            </div>

            <div class="step-details">
              <div
                v-if="step.technologies"
                class="technologies"
              >
                <div class="tech-label">
                  Tech stack:
                </div>
                <div class="tech-list">
                  <span
                    v-for="(tech, i) in step.technologies"
                    :key="i"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                v-if="step.metrics"
                class="metrics"
              >
                <div
                  v-for="(metric, i) in step.metrics"
                  :key="i"
                  class="metric"
                >
                  <div class="metric-value">
                    {{ metric.value }}
                  </div>
                  <div class="metric-label">
                    {{ metric.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="index < pipelineSteps.length - 1"
            class="step-connector"
          >
            <div class="connector-line" />
            <div class="connector-arrow">
              ↓
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="play-controls">
      <button
        class="control-btn"
        :disabled="isPlaying"
        @click="startAnimation"
      >
        <span v-if="!isPlaying">▶️ Demo luồng dữ liệu</span>
        <span v-else>⏸️ Đang demo...</span>
      </button>
      <button
        class="control-btn secondary"
        @click="resetAnimation"
      >
        🔄 Reset
      </button>
    </div>

    <div class="data-flow-visualization">
      <div class="flow-title">
        Luồng dữ liệu realtime
      </div>
      <div class="flow-cards">
        <div
          v-for="(item, index) in dataFlow"
          :key="index"
          class="flow-card"
        >
          <div class="flow-icon">
            {{ item.icon }}
          </div>
          <div class="flow-content">
            <div class="flow-name">
              {{ item.name }}
            </div>
            <div class="flow-count">
              {{ formatNumber(item.count) }} {{ item.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <div class="practices-title">
        💡 Best practice cho data pipeline
      </div>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">
            🔄
          </div>
          <div class="practice-content">
            <div class="practice-name">
              Xử lý batch
            </div>
            <div class="practice-desc">
              Gộp các gói nhỏ thành khối lớn để xử lý, giảm chi phí I/O, tăng throughput
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">
            ⚡
          </div>
          <div class="practice-content">
            <div class="practice-name">
              Async non-blocking
            </div>
            <div class="practice-desc">
              Dùng message queue và async task để tránh chặn luồng business chính
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">
            🛡️
          </div>
          <div class="practice-content">
            <div class="practice-name">
              Cơ chế chịu lỗi
            </div>
            <div class="practice-desc">
              Retry, dead letter queue, chiến lược degrade để đảm bảo không mất dữ liệu
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">
            📊
          </div>
          <div class="practice-content">
            <div class="practice-name">
              Monitor & cảnh báo
            </div>
            <div class="practice-desc">
              Giám sát realtime lượng dữ liệu, độ trễ, error rate; bất thường thì cảnh báo ngay
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentStep = ref(-1)
const isPlaying = ref(false)

const pipelineSteps = [
  {
    id: 'collection',
    name: 'Thu thập dữ liệu',
    icon: '📡',
    description: 'SDK client, code tracking backend, log CDN thu thập dữ liệu hành vi user',
    technologies: ['JavaScript SDK', 'Python SDK', 'CDN Logs', 'Webhook'],
    metrics: [
      { label: 'Lượng thu thập', value: '10M+/ngày' },
      { label: 'Tỉ lệ thành công', value: '99.9%' }
    ]
  },
  {
    id: 'transmission',
    name: 'Truyền dữ liệu',
    icon: '🚚',
    description: 'Mã hoá, truyền batch, resume khi đứt mạng, đảm bảo dữ liệu đến nơi an toàn',
    technologies: ['HTTPS', 'Batch Upload', 'Retry Logic'],
    metrics: [
      { label: 'Lượng truyền', value: '5GB/ngày' },
      { label: 'Độ trễ', value: '<100ms' }
    ]
  },
  {
    id: 'cleaning',
    name: 'Làm sạch dữ liệu',
    icon: '🧹',
    description: 'Dedup, validate, format, bổ sung, đảm bảo chất lượng dữ liệu',
    technologies: ['ETL', 'Data Validation', 'Deduplication'],
    metrics: [
      { label: 'Tỉ lệ làm sạch', value: '95%' },
      { label: 'Độ chính xác', value: '99.99%' }
    ]
  },
  {
    id: 'storage',
    name: 'Lưu trữ dữ liệu',
    icon: '🗄️',
    description: 'Lưu phân tầng: hot/warm/cold data, tối ưu chi phí',
    technologies: ['ClickHouse', 'S3', 'Redis', 'Hive'],
    metrics: [
      { label: 'Dung lượng', value: '100TB' },
      { label: 'Truy vấn', value: '<1s' }
    ]
  },
  {
    id: 'analysis',
    name: 'Phân tích dữ liệu',
    icon: '📊',
    description: 'Báo cáo trực quan, phân nhóm user, funnel analysis, attribution',
    technologies: ['SQL', 'Python', 'Tableau', 'Metabase'],
    metrics: [
      { label: 'Số báo cáo', value: '500+' },
      { label: 'User', value: '10K+' }
    ]
  }
]

const dataFlow = ref([
  { icon: '📱', name: 'Event client', count: 158420, unit: 'lần/phút' },
  { icon: '📤', name: 'Request gửi lên', count: 15842, unit: 'lần/phút' },
  { icon: '✅', name: 'Lưu thành công', count: 15840, unit: 'bản ghi/phút' },
  { icon: '❌', name: 'Xử lý fail', count: 2, unit: 'bản ghi/phút' }
])

let animationInterval = null
let dataFlowInterval = null

const startAnimation = () => {
  if (isPlaying.value) return

  isPlaying.value = true
  currentStep.value = -1

  animationInterval = setInterval(() => {
    if (currentStep.value < pipelineSteps.length - 1) {
      currentStep.value++
    } else {
      clearInterval(animationInterval)
      isPlaying.value = false
    }
  }, 1000)
}

const resetAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  currentStep.value = -1
  isPlaying.value = false
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(() => {
  // Mô phỏng luồng dữ liệu realtime
  dataFlowInterval = setInterval(() => {
    dataFlow.value = dataFlow.value.map((item) => ({
      ...item,
      count: item.count + Math.floor(Math.random() * 100) - 50
    }))
  }, 2000)
})

onUnmounted(() => {
  if (dataFlowInterval) {
    clearInterval(dataFlowInterval)
  }
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style scoped>
.data-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.pipeline-container {
  margin-bottom: 2rem;
}

.pipeline-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s;
}

.pipeline-step.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(60, 130, 246, 0.1);
  transform: scale(1.02);
}

.pipeline-step.completed {
  border-color: #22c55e;
  opacity: 0.8;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
}

.pipeline-step.completed .step-number {
  background: #22c55e;
}

.step-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-name {
  font-size: 1.1rem;
  font-weight: 700;
}

.step-icon {
  font-size: 2rem;
}

.step-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.technologies {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.tech-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.metrics {
  display: flex;
  gap: 2rem;
}

.metric {
  text-align: center;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -0.5rem 0;
  position: relative;
  z-index: 1;
}

.connector-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.pipeline-step.active ~ .pipeline-step .connector-line,
.pipeline-step.completed + .pipeline-step .connector-line {
  background: var(--vp-c-brand);
}

.connector-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin-top: -5px;
}

.play-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.control-btn {
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(60, 130, 246, 0.3);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-divider);
}

.data-flow-visualization {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
}

.flow-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.flow-card {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.flow-icon {
  font-size: 2rem;
}

.flow-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.flow-count {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 700;
}

.best-practices {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
}

.practices-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.practice-card {
  background: white;
  padding: 0.75rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.practice-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.practice-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.practice-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .flow-cards,
  .practices-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .metrics {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
