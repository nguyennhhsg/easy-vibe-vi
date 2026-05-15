<template>
  <div class="mobx-reactivity-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">Nguyên lý reactive của MobX</span>
      <span class="subtitle">Phép màu tự động theo dõi dependency</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn đang ở một <span class="highlight">buổi diễn ảo thuật</span>: ảo thuật gia (Observable) thay đổi đồ vật, mọi khán giả đang chú ý (Reaction) đều tự nhận ra thay đổi mà không cần thông báo từng người.
    </div>

    <div class="demo-content">
      <div class="state-display">
        <div class="state-header">
          <span class="state-icon">📦</span>
          <span class="state-title">State Observable</span>
        </div>
        <div class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed, changed: recentlyChanged === todo.id }"
            @click="toggleTodo(todo.id)"
          >
            <span class="todo-status">{{ todo.completed ? '✓' : '○' }}</span>
            <span class="todo-text">{{ todo.text }}</span>
          </div>
        </div>
      </div>

      <div class="reaction-display">
        <div class="reaction-header">
          <span class="reaction-icon">🔄</span>
          <span class="reaction-title">Tự phản hồi (Reaction)</span>
        </div>
        <div class="reaction-stats">
          <div class="stat-item">
            <span class="stat-label">Tổng:</span>
            <span class="stat-value">{{ todos.length }} mục</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Đã xong:</span>
            <span class="stat-value completed">{{ completedCount }} mục</span>
          </div>
        </div>
      </div>

      <div class="interaction-area">
        <input
          v-model="newTodoText"
          placeholder="Nhập việc cần làm..."
          class="todo-input"
          @keyup.enter="addTodo"
        >
        <button
          class="add-btn"
          @click="addTodo"
        >
          Thêm
        </button>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong> MobX tự động theo dõi quan hệ giữa state và reaction, khi state đổi thì các phần liên quan tự cập nhật. Giống như ảo thuật, bạn chỉ cần thay dữ liệu là UI tự update.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const todos = ref([
  { id: 1, text: 'Học MobX', completed: false },
  { id: 2, text: 'Hiểu nguyên lý reactive', completed: true }
])

const newTodoText = ref('')
const recentlyChanged = ref(null)

const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length
})

const addTodo = () => {
  if (!newTodoText.value.trim()) return

  const newTodo = {
    id: Date.now(),
    text: newTodoText.value,
    completed: false
  }

  todos.value.push(newTodo)
  recentlyChanged.value = newTodo.id
  newTodoText.value = ''

  setTimeout(() => {
    recentlyChanged.value = null
  }, 500)
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    recentlyChanged.value = id
    setTimeout(() => {
      recentlyChanged.value = null
    }, 500)
  }
}
</script>

<style scoped>
.mobx-reactivity-demo {
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

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.state-display,
.reaction-display {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.state-header,
.reaction-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.state-icon,
.reaction-icon {
  font-size: 1.25rem;
}

.state-title,
.reaction-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.todo-item:hover {
  background: var(--vp-c-bg);
  transform: translateX(4px);
}

.todo-item.completed {
  background: #f0fdf4;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.todo-item.changed {
  animation: highlight 0.5s ease;
}

@keyframes highlight {
  0%, 100% { background: var(--vp-c-bg-soft); }
  50% { background: #fef3c7; }
}

.todo-status {
  font-size: 1.25rem;
  color: var(--vp-c-brand);
}

.todo-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.reaction-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.stat-value.completed {
  color: #22c55e;
}

.interaction-area {
  display: flex;
  gap: 0.75rem;
}

.todo-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.todo-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.add-btn {
  padding: 0.6rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .interaction-area {
    flex-direction: column;
  }

  .reaction-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
