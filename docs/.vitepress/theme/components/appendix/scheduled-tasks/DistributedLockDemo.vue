<template>
  <div class="lock-demo">
    <div class="header">
      <div class="title">Demo distributed lock</div>
      <div class="subtitle">Nhiều node truy cập độc quyền tài nguyên dùng chung</div>
    </div>
    <div class="controls">
      <button @click="acquire" class="acquire-btn">Acquire lock</button>
      <button @click="release" class="release-btn">Release lock</button>
    </div>
    <div class="nodes">
      <div v-for="n in nodes" :key="n.id" :class="['node', { active: n.hasLock, waiting: n.waiting }]">
        <div class="node-name">{{ n.name }}</div>
        <div class="node-status">{{ n.hasLock ? 'Đang giữ lock' : n.waiting ? 'Đang đợi' : 'Rảnh' }}</div>
      </div>
    </div>
    <div class="resource">
      <div class="resource-label">Tài nguyên dùng chung</div>
      <div :class="['resource-status', { locked: locked }]">{{ locked ? '🔒 Đang bị chiếm' : '✅ Có thể truy cập' }}</div>
    </div>
    <div class="log-area">
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const nodes = ref([
  { id: 1, name: 'Node A', hasLock: false, waiting: false },
  { id: 2, name: 'Node B', hasLock: false, waiting: false },
  { id: 3, name: 'Node C', hasLock: false, waiting: false },
])
const locked = ref(false)
const logs = ref([])
let timer = null

function acquire() {
  const idleNode = nodes.value.find(n => !n.hasLock && !n.waiting)
  if (!idleNode) return
  
  if (locked.value) {
    idleNode.waiting = true
    logs.value.unshift(`${idleNode.name} đang đợi lấy lock...`)
  } else {
    idleNode.hasLock = true
    locked.value = true
    logs.value.unshift(`${idleNode.name} acquire lock thành công!`)
  }
}

function release() {
  const holder = nodes.value.find(n => n.hasLock)
  if (holder) {
    holder.hasLock = false
    locked.value = false
    logs.value.unshift(`${holder.name} đã release lock`)

    const waiter = nodes.value.find(n => n.waiting)
    if (waiter) {
      waiter.waiting = false
      waiter.hasLock = true
      locked.value = true
      logs.value.unshift(`${waiter.name} đã acquire được lock`)
    }
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.lock-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.acquire-btn, .release-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.acquire-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.release-btn { background: #ef4444; color: #fff; border-color: #ef4444; }
.nodes { display: flex; gap: 1rem; margin-bottom: 1rem; }
.node { flex: 1; padding: 1rem; border-radius: 8px; background: var(--vp-c-bg); text-align: center; border: 2px solid var(--vp-c-divider); transition: all 0.3s; }
.node.active { border-color: #22c55e; background: #dcfce7; }
.node.waiting { border-color: #f59e0b; background: #fef3c7; }
.node-name { font-weight: 600; margin-bottom: 0.25rem; }
.node-status { font-size: 0.85rem; }
.resource { padding: 1rem; background: var(--vp-c-bg); border-radius: 8px; text-align: center; margin-bottom: 1rem; }
.resource-label { font-size: 0.9rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.resource-status { font-weight: 600; font-size: 1.1rem; }
.resource-status.locked { color: #22c55e; }
.log-area { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; max-height: 100px; overflow-y: auto; }
.log-item { font-size: 0.8rem; padding: 0.25rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
