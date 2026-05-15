<template>
  <div class="conflict-demo">
    <div class="header">
      <div class="title">Demo xung đột scheduling</div>
      <div class="subtitle">Nhiều task được lên lịch chạy cùng một thời điểm</div>
    </div>
    <div class="controls">
      <button @click="addTask" class="add-btn">Thêm task</button>
      <button @click="detectConflicts" class="detect-btn">Phát hiện xung đột</button>
      <button @click="resolve" class="resolve-btn">Giải quyết xung đột</button>
    </div>
    <div class="schedule">
      <div class="time-axis">
        <div v-for="h in 24" :key="h" class="time-slot">{{ h - 1 }}:00</div>
      </div>
      <div class="tasks-area">
        <div v-for="(task, i) in tasks" :key="i" class="task-bar" :style="{ left: (task.start / 24 * 100) + '%', width: ((task.end - task.start) / 24 * 100) + '%' }">
          <span class="task-label">{{ task.name }}</span>
        </div>
      </div>
    </div>
    <div class="conflicts" v-if="conflicts.length > 0">
      <div class="conflict-title">Phát hiện xung đột:</div>
      <div v-for="(c, i) in conflicts" :key="i" class="conflict-item">
        {{ c }}
      </div>
    </div>
    <div class="log-area">
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  { name: 'Backup', start: 2, end: 4 },
  { name: 'Báo cáo', start: 3, end: 5 },
])
const conflicts = ref([])
const logs = ref([])
let taskId = 3

function addTask() {
  const names = ['Đồng bộ', 'Làm sạch', 'Phân tích', 'Thông báo']
  const name = names[taskId - 3] || `Task ${taskId}`
  const start = Math.floor(Math.random() * 20)
  const end = start + Math.floor(Math.random() * 3) + 1
  tasks.value.push({ name, start: Math.min(start, 23), end: Math.min(end, 24) })
  taskId++
  logs.value.unshift(`Thêm task: ${name} (${start}:00 - ${end}:00)`)
}

function detectConflicts() {
  conflicts.value = []
  for (let i = 0; i < tasks.value.length; i++) {
    for (let j = i + 1; j < tasks.value.length; j++) {
      const a = tasks.value[i]
      const b = tasks.value[j]
      if (a.start < b.end && b.start < a.end) {
        conflicts.value.push(`${a.name} và ${b.name} xung đột thời gian!`)
      }
    }
  }
  if (conflicts.value.length === 0) {
    logs.value.unshift('Không phát hiện xung đột')
  } else {
    logs.value.unshift(`Phát hiện ${conflicts.value.length} xung đột`)
  }
}

function resolve() {
  tasks.value.sort((a, b) => a.start - b.start)
  for (let i = 1; i < tasks.value.length; i++) {
    if (tasks.value[i].start < tasks.value[i - 1].end) {
      tasks.value[i].start = tasks.value[i - 1].end
      tasks.value[i].end = Math.max(tasks.value[i].end, tasks.value[i].start + 1)
      logs.value.unshift(`Điều chỉnh ${tasks.value[i].name} bắt đầu lúc ${tasks.value[i].start}:00`)
    }
  }
  conflicts.value = []
  logs.value.unshift('Đã giải quyết xung đột')
}
</script>

<style scoped>
.conflict-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.add-btn, .detect-btn, .resolve-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.detect-btn { background: #f59e0b; color: #fff; border-color: #f59e0b; }
.resolve-btn { background: #22c55e; color: #fff; border-color: #22c55e; }
.schedule { margin-bottom: 1rem; }
.time-axis { display: flex; border-bottom: 1px solid var(--vp-c-divider); margin-bottom: 0.5rem; }
.time-slot { flex: 1; text-align: center; font-size: 0.7rem; color: var(--vp-c-text-2); }
.tasks-area { position: relative; height: 80px; background: var(--vp-c-bg); border-radius: 8px; }
.task-bar { position: absolute; top: 20px; height: 40px; background: var(--vp-c-brand); border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.task-label { font-size: 0.75rem; color: #fff; white-space: nowrap; }
.conflicts { padding: 0.75rem; background: #fee2e2; border-radius: 8px; margin-bottom: 1rem; }
.conflict-title { font-weight: 600; color: #dc2626; margin-bottom: 0.5rem; }
.conflict-item { font-size: 0.85rem; color: #dc2626; padding: 0.25rem 0; }
.log-area { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; max-height: 100px; overflow-y: auto; }
.log-item { font-size: 0.8rem; padding: 0.25rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
