<template>
  <div class="demo">
    <div class="title">⏱️ CPU đang chuyển ngữ cảnh điên cuồng, bạn không cảm nhận được</div>
    
    <div class="cpu-core">
      <div class="cpu-label">CPU</div>
      <div class="current-task" :class="{ switching: isSwitching }">
        <span class="task-icon">{{ currentTask.icon }}</span>
        <span class="task-name">{{ currentTask.name }}</span>
      </div>
      <div class="time-slice">Time slice: {{ timeLeft }}ms</div>
    </div>

    <div class="process-queue">
      <div
        v-for="(proc, idx) in processes"
        :key="proc.id"
        class="process"
        :class="{ 
          active: idx === currentIdx, 
          waiting: idx !== currentIdx,
          done: proc.progress >= 100
        }"
        :style="{ '--progress': proc.progress + '%' }"
      >
        <span class="p-icon">{{ proc.icon }}</span>
        <div class="p-info">
          <span class="p-name">{{ proc.name }}</span>
          <div class="p-bar">
            <div class="p-fill"></div>
          </div>
        </div>
        <span class="p-status">{{ idx === currentIdx ? 'Đang chạy' : (proc.progress >= 100 ? 'Xong' : 'Chờ') }}</span>
      </div>
    </div>

    <div class="explain">
      <strong>💡 Nguyên lý:</strong> CPU chuyển tiến trình mỗi {{ sliceTime }}ms, vì quá nhanh nên bạn cảm thấy chúng "chạy đồng thời". Thực ra mỗi tiến trình chỉ chạy ngắt quãng.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const processes = ref([
  { id: 1, name: 'Zalo', icon: '💬', progress: 0 },
  { id: 2, name: 'Nhạc', icon: '🎵', progress: 0 },
  { id: 3, name: 'Trình duyệt', icon: '🌐', progress: 0 }
])

const currentIdx = ref(0)
const timeLeft = ref(0)
const isSwitching = ref(false)
const sliceTime = 100 // Mỗi time slice 100ms (cho demo, thực tế khoảng 10ms)

let timer = null
let switchTimer = null

const switchTask = () => {
  isSwitching.value = true
  setTimeout(() => {
    currentIdx.value = (currentIdx.value + 1) % processes.value.length
    timeLeft.value = sliceTime
    isSwitching.value = false
  }, 200)
}

const tick = () => {
  const current = processes.value[currentIdx.value]
  
  // Tiến trình hiện tại chạy
  if (current.progress < 100) {
    current.progress = Math.min(100, current.progress + 5)
  }

  // Đếm ngược time slice
  timeLeft.value -= 10

  // Hết time slice thì chuyển
  if (timeLeft.value <= 0) {
    switchTask()
  }

  // Kiểm tra đã xong hết chưa
  if (processes.value.every(p => p.progress >= 100)) {
    // Reset demo
    setTimeout(() => {
      processes.value.forEach(p => p.progress = 0)
      currentIdx.value = 0
      timeLeft.value = sliceTime
    }, 2000)
  }
}

onMounted(() => {
  timeLeft.value = sliceTime
  timer = setInterval(tick, 10) // Cập nhật mỗi 10ms
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (switchTimer) clearTimeout(switchTimer)
})

const currentTask = computed(() => processes.value[currentIdx.value])
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.cpu-core {
  background: linear-gradient(135deg, #667eea22, #764ba222);
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  margin-bottom: 12px;
  position: relative;
}

.cpu-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.current-task {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
}

.current-task.switching {
  opacity: 0.3;
  transform: scale(0.9);
}

.task-icon {
  font-size: 24px;
}

.time-slice {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 10px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
}

.process-queue {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.process {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.3s;
}

.process.active {
  border-color: #667eea;
  background: #667eea11;
  box-shadow: 0 0 10px #667eea33;
}

.process.done {
  opacity: 0.6;
}

.process.done .p-fill {
  background: #10b981;
}

.p-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.p-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.p-name {
  font-size: 12px;
  font-weight: 600;
}

.p-bar {
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.p-fill {
  height: 100%;
  width: var(--progress);
  background: #667eea;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.p-status {
  font-size: 10px;
  color: var(--vp-c-text-3);
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.process.active .p-status {
  color: #667eea;
  background: #667eea22;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.explain strong { color: var(--vp-c-text-1); }
</style>
