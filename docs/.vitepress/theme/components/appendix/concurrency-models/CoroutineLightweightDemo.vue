<template>
  <div class="demo-container">
    <h4>Demo so sánh tính nhẹ của coroutine</h4>

    <div class="controls">
      <el-radio-group
        v-model="comparisonMode"
        size="small"
      >
        <el-radio-button label="memory">
          So sánh dùng RAM
        </el-radio-button>
        <el-radio-button label="switch">
          So sánh chi phí chuyển ngữ cảnh
        </el-radio-button>
        <el-radio-button label="creation">
          So sánh tốc độ tạo
        </el-radio-button>
      </el-radio-group>

      <el-slider
        v-model="coroutineCount"
        :min="100"
        :max="10000"
        :step="100"
        show-input
        style="width: 300px;"
      />
      <span class="slider-label">{{ coroutineCount }} coroutine</span>
    </div>

    <div class="comparison-view">
      <div class="comparison-column">
        <h5>Mô hình thread</h5>
        <div class="resource-visualization">
          <div class="resource-bar">
            <div class="bar-label">
              Dùng RAM
            </div>
            <div class="bar-container">
              <div
                class="bar-fill thread-bar"
                :style="{ width: threadMemoryPercent + '%', backgroundColor: '#e6a23c' }"
              >
                {{ threadMemory }} MB
              </div>
            </div>
          </div>

          <div class="resource-bar">
            <div class="bar-label">
              Thời gian tạo
            </div>
            <div class="bar-container">
              <div
                class="bar-fill thread-bar"
                :style="{ width: threadCreationPercent + '%', backgroundColor: '#e6a23c' }"
              >
                {{ threadCreationTime }} ms
              </div>
            </div>
          </div>

          <div class="resource-bar">
            <div class="bar-label">
              Context switch
            </div>
            <div class="bar-container">
              <div
                class="bar-fill thread-bar"
                :style="{ width: 100 + '%', backgroundColor: '#e6a23c' }"
              >
                ~1-10 μs
              </div>
            </div>
          </div>
        </div>

        <div class="thread-visualization">
          <div class="memory-blocks">
            <div
              v-for="n in Math.min(coroutineCount / 100, 50)"
              :key="n"
              class="thread-block"
              :style="{ backgroundColor: '#e6a23c', opacity: 0.6 + Math.random() * 0.4 }"
            />
            <div
              v-if="coroutineCount / 100 > 50"
              class="more-indicator"
            >
              +{{ Math.floor(coroutineCount / 100 - 50) }} thêm...
            </div>
          </div>
        </div>
      </div>

      <div class="vs-divider">
        <div class="vs-circle">
          VS
        </div>
      </div>

      <div class="comparison-column">
        <h5>Mô hình coroutine</h5>
        <div class="resource-visualization">
          <div class="resource-bar">
            <div class="bar-label">
              Dùng RAM
            </div>
            <div class="bar-container">
              <div
                class="bar-fill coroutine-bar"
                :style="{ width: Math.max(coroutineMemoryPercent, 5) + '%', backgroundColor: '#67c23a' }"
              >
                {{ coroutineMemory }} MB
              </div>
            </div>
          </div>

          <div class="resource-bar">
            <div class="bar-label">
              Thời gian tạo
            </div>
            <div class="bar-container">
              <div
                class="bar-fill coroutine-bar"
                :style="{ width: Math.max(coroutineCreationPercent, 5) + '%', backgroundColor: '#67c23a' }"
              >
                {{ coroutineCreationTime }} ms
              </div>
            </div>
          </div>

          <div class="resource-bar">
            <div class="bar-label">
              Context switch
            </div>
            <div class="bar-container">
              <div
                class="bar-fill coroutine-bar"
                :style="{ width: 15 + '%', backgroundColor: '#67c23a' }"
              >
                ~100 ns
              </div>
            </div>
          </div>
        </div>

        <div class="coroutine-visualization">
          <div class="coroutine-grid">
            <div
              v-for="n in Math.min(coroutineCount / 10, 100)"
              :key="n"
              class="coroutine-cell"
              :style="{ backgroundColor: '#67c23a', opacity: 0.5 + Math.random() * 0.5 }"
            />
            <div
              v-if="coroutineCount / 10 > 100"
              class="more-indicator"
            >
              +{{ Math.floor(coroutineCount / 10 - 100) }} thêm...
            </div>
          </div>
        </div>

        <div
          v-if="coroutineCount >= 1000"
          class="efficiency-badge"
        >
          <el-tag
            type="success"
            effect="dark"
            size="large"
          >
            🚀 Tiết kiệm {{ savingsPercent }}% RAM
          </el-tag>
        </div>
      </div>
    </div>

    <div class="insight-panel">
      <el-alert
        :title="insightTitle"
        :type="insightType"
        :description="insightDescription"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const comparisonMode = ref('memory')
const coroutineCount = ref(1000)

// 基础参数
const THREAD_STACK_SIZE = 1024 * 1024 // 1MB 线程栈
const COROUTINE_STACK_SIZE = 2 * 1024 // 2KB 协程栈
const THREAD_CREATION_TIME = 100 // 10us * 10000 = 100ms
const COROUTINE_CREATION_TIME = 10 // 10ns * 10000 = 100us

// 计算值
const threadMemory = computed(() => {
  return Math.round((coroutineCount.value * THREAD_STACK_SIZE) / (1024 * 1024))
})

const coroutineMemory = computed(() => {
  return Math.round((coroutineCount.value * COROUTINE_STACK_SIZE) / (1024))
})

const threadCreationTime = computed(() => {
  return Math.round((coroutineCount.value * THREAD_CREATION_TIME) / 1000)
})

const coroutineCreationTime = computed(() => {
  return Math.round((coroutineCount.value * COROUTINE_CREATION_TIME) / 1000)
})

// 百分比计算
const threadMemoryPercent = computed(() => {
  const max = threadMemory.value
  return max > 0 ? 100 : 0
})

const coroutineMemoryPercent = computed(() => {
  if (threadMemory.value === 0) return 0
  return (coroutineMemory.value / threadMemory.value) * 100
})

const threadCreationPercent = computed(() => {
  const max = threadCreationTime.value
  return max > 0 ? 100 : 0
})

const coroutineCreationPercent = computed(() => {
  if (threadCreationTime.value === 0) return 0
  return (coroutineCreationTime.value / threadCreationTime.value) * 100
})

const savingsPercent = computed(() => {
  if (threadMemory.value === 0) return 0
  return Math.round((1 - coroutineMemory.value / threadMemory.value) * 100)
})

// Thông tin insight
const insightTitle = computed(() => {
  if (coroutineCount.value < 100) {
    return 'Use case quy mô nhỏ'
  } else if (coroutineCount.value < 5000) {
    return 'Use case quy mô trung bình'
  } else {
    return 'Use case concurrency cao quy mô lớn'
  }
})

const insightType = computed(() => {
  if (coroutineCount.value >= 5000) return 'success'
  if (coroutineCount.value >= 1000) return 'warning'
  return 'info'
})

const insightDescription = computed(() => {
  const savings = savingsPercent.value
  const memSaved = threadMemory.value - coroutineMemory.value

  if (coroutineCount.value < 100) {
    return `Hiện ${coroutineCount.value} đơn vị concurrent, khác biệt thread vs coroutine chưa rõ. Nên tăng lên 1000+ để thấy rõ.`
  } else if (coroutineCount.value < 5000) {
    return `Dùng coroutine tiết kiệm ${savings}% RAM (khoảng ${memSaved}MB), tốc độ tạo nhanh ${Math.round(threadCreationTime.value / coroutineCreationTime.value)} lần.`
  } else {
    return `🚀 Trong use case concurrency cao, coroutine có lợi thế lớn! Tiết kiệm ${savings}% RAM (${memSaved}MB), ${threadMemory.value}MB vs ${coroutineMemory.value}MB. Đây là giải pháp then chốt cho bài toán C10K/C10M.`
  }
})

// 方法
function reset() {
  coroutineCount.value = 1000
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 6px;
}

h4 {
  margin: 0 0 16px 0;
  color: #303133;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.slider-label {
  font-size: 14px;
  color: #606266;
  min-width: 80px;
}

.comparison-view {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.comparison-column {
  background: white;
  border-radius: 6px;
  padding: 16px;
}

.comparison-column h5 {
  margin: 0 0 16px 0;
  color: #303133;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 2px solid #e4e7ed;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.resource-visualization {
  margin-bottom: 16px;
}

.resource-bar {
  margin-bottom: 12px;
}

.bar-label {
  font-size: 12px;
  color: #606266;
  margin-bottom: 4px;
}

.bar-container {
  height: 24px;
  background: #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  color: white;
  font-size: 11px;
  font-weight: bold;
  transition: width 0.3s ease;
}

.thread-visualization,
.coroutine-visualization {
  margin-bottom: 16px;
}

.memory-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  min-height: 80px;
  align-content: flex-start;
}

.thread-block {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.coroutine-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.coroutine-cell {
  aspect-ratio: 1;
  border-radius: 2px;
}

.more-indicator {
  grid-column: 1 / -1;
  text-align: center;
  color: #909399;
  font-size: 12px;
  padding: 4px;
}

.efficiency-badge {
  text-align: center;
  margin-top: 12px;
}

.insight-panel {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .comparison-view {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    order: -1;
  }

  .vs-circle {
    transform: rotate(90deg);
  }
}
</style>
