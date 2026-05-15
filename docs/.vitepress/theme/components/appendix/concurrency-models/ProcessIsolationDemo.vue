<template>
  <div class="demo-container">
    <h4>Demo cô lập bộ nhớ process</h4>

    <div class="controls">
      <el-button
        type="primary"
        size="small"
        :disabled="processes.length >= 4"
        @click="addProcess"
      >
        Tạo process
      </el-button>
      <el-button
        type="danger"
        size="small"
        :disabled="processes.length === 0"
        @click="killProcess"
      >
        Kết thúc process
      </el-button>
      <el-button
        size="small"
        @click="simulateCrash"
      >
        Mô phỏng process crash
      </el-button>
      <el-button
        size="small"
        @click="reset"
      >
        Reset
      </el-button>
    </div>

    <div class="memory-view">
      <div class="memory-label">
        Bộ nhớ hệ thống
      </div>
      <div class="memory-blocks">
        <div
          v-for="process in processes"
          :key="process.id"
          class="process-block"
          :class="{ crashed: process.crashed, active: process.active }"
          :style="{ width: process.size + '%', backgroundColor: process.color }"
        >
          <div class="process-header">
            <span class="process-name">Process {{ process.id }}</span>
            <span class="process-pid">PID: {{ process.pid }}</span>
          </div>
          <div class="process-memory">
            <div class="memory-section code">
              <span class="section-label">Code segment</span>
              <span class="section-size">{{ process.codeSize }}MB</span>
            </div>
            <div class="memory-section data">
              <span class="section-label">Data segment</span>
              <span class="section-size">{{ process.dataSize }}MB</span>
            </div>
            <div class="memory-section heap">
              <span class="section-label">Heap</span>
              <span class="section-size">{{ process.heapSize }}MB</span>
            </div>
            <div class="memory-section stack">
              <span class="section-label">Stack</span>
              <span class="section-size">{{ process.stackSize }}MB</span>
            </div>
          </div>
          <div
            v-if="process.crashed"
            class="crash-overlay"
          >
            <span class="crash-text">💥 Đã crash</span>
            <span class="crash-info">Không ảnh hưởng các process khác</span>
          </div>
        </div>
      </div>

      <div
        v-if="showSharedMemory"
        class="shared-memory"
      >
        <div class="shared-label">
          Vùng shared memory (IPC)
        </div>
        <div class="shared-content">
          <div
            v-for="process in processes"
            :key="process.id"
            class="shared-access"
          >
            <span
              class="access-indicator"
              :style="{ backgroundColor: process.color }"
            />
            <span>Process {{ process.id }} có thể truy cập</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <el-alert
        :title="currentInfo.title"
        :type="currentInfo.type"
        :description="currentInfo.description"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const processes = ref([])
const showSharedMemory = ref(false)
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
let pidCounter = 1000

const currentInfo = computed(() => {
  if (processes.value.length === 0) {
    return {
      title: 'Cô lập process',
      type: 'info',
      description: 'Mỗi process có không gian địa chỉ ảo riêng, một process crash không ảnh hưởng các process khác. Nhấn "Tạo process" để bắt đầu demo.'
    }
  }

  const crashed = processes.value.filter(p => p.crashed).length
  if (crashed > 0) {
    return {
      title: 'Xác thực tính cô lập',
      type: 'success',
      description: `Process đã crash nhưng các process khác vẫn chạy bình thường, chứng minh cô lập bộ nhớ giữa các process là hiệu quả. Process bị crash sẽ được hệ điều hành thu hồi tài nguyên.`
    }
  }

  return {
    title: 'Bố cục bộ nhớ',
    type: 'info',
    description: `Hiện có ${processes.value.length} process đang chạy. Bộ nhớ mỗi process chia thành code segment, data segment, heap và stack, cô lập với nhau và không thể truy cập chéo.`
  }
})

function killProcess() {
  if (processes.value.length === 0) return
  processes.value.pop()
}

function simulateCrash() {
  if (processes.value.length === 0) return

  // Cho một process chưa crash crash ngẫu nhiên
  const candidates = processes.value.filter(p => !p.crashed)
  if (candidates.length > 0) {
    const victim = candidates[Math.floor(Math.random() * candidates.length)]
    victim.crashed = true
    victim.active = false
  }
}

function reset() {
  processes.value = []
  showSharedMemory.value = false
  pidCounter = 1000
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
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.memory-view {
  background: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.memory-label {
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
}

.memory-blocks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.process-block {
  border-radius: 6px;
  padding: 12px;
  color: white;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.process-block.crashed {
  opacity: 0.5;
}

.process-block.active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.process-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.process-name {
  font-weight: bold;
}

.process-pid {
  opacity: 0.8;
  font-size: 12px;
}

.process-memory {
  display: flex;
  gap: 8px;
  font-size: 11px;
}

.memory-section {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-label {
  opacity: 0.7;
  font-size: 10px;
}

.section-size {
  font-weight: bold;
}

.crash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.crash-text {
  font-size: 24px;
  margin-bottom: 8px;
}

.crash-info {
  font-size: 12px;
  opacity: 0.8;
}

.shared-memory {
  margin-top: 16px;
  padding: 12px;
  background: #f4f4f5;
  border-radius: 6px;
  border: 2px dashed #c0c4cc;
}

.shared-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 8px;
}

.shared-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.shared-access {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606266;
}

.access-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.info-panel {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .process-memory {
    flex-wrap: wrap;
  }

  .cpu-cores {
    grid-template-columns: 1fr;
  }
}
</style>
