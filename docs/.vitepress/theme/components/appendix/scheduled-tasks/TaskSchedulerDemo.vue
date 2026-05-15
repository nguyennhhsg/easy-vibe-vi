<template>
  <div class="scheduler-demo">
    <div class="header">
      <div class="title">Mô phỏng task scheduler</div>
      <div class="subtitle">Quan sát thứ tự task được chạy theo chiến lược scheduling</div>
    </div>
    <div class="controls">
      <button @click="addTask" class="add-btn">Thêm task</button>
      <button @click="run" class="run-btn" :disabled="tasks.length === 0">Chạy scheduling</button>
      <button @click="reset" class="reset-btn">Reset</button>
    </div>
    <div class="queue-area">
      <div class="queue-label">Task queue</div>
      <div class="queue-list">
        <div v-for="(t, i) in tasks" :key="i" class="queue-item">
          <span class="task-name">{{ t.name }}</span>
          <span class="task-prio" :class="'p' + t.priority">Priority {{ t.priority }}</span>
        </div>
      </div>
    </div>
    <div class="log-area">
      <div class="log-label">Log thực thi</div>
      <div class="log-list">
        <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([])
const logs = ref([])
const taskNames = ['Đồng bộ dữ liệu', 'Tạo báo cáo', 'Dọn cache', 'Lưu trữ log', 'Health check']

function addTask() {
  if (tasks.value.length >= 5) return
  const name = taskNames[tasks.value.length] || `Task ${tasks.value.length + 1}`
  tasks.value.push({ name, priority: Math.floor(Math.random() * 3) + 1 })
}

function run() {
  logs.value = []
  const sorted = [...tasks.value].sort((a, b) => b.priority - a.priority)
  sorted.forEach((t, i) => logs.value.push(`[${i + 1}] Chạy: ${t.name} (priority ${t.priority})`))
}

function reset() {
  tasks.value = []
  logs.value = []
}
</script>

<style scoped>
.scheduler-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.add-btn, .run-btn, .reset-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.run-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.run-btn:disabled { opacity: 0.5; }
.queue-area, .log-area { margin-bottom: 1rem; }
.queue-label, .log-label { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
.queue-list, .log-list { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; min-height: 80px; }
.queue-item { display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider); }
.queue-item:last-child { border-bottom: none; }
.task-prio { font-size: 0.8rem; padding: 0.2rem 0.5rem; border-radius: 4px; }
.task-prio.p1 { background: #fee2e2; color: #dc2626; }
.task-prio.p2 { background: #fef3c7; color: #d97706; }
.task-prio.p3 { background: #dcfce7; color: #16a34a; }
.log-item { font-size: 0.85rem; padding: 0.3rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
