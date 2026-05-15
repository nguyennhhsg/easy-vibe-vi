<template>
  <div class="api-types-demo">
    <div class="switch-bar">
      <button
        v-for="type in types"
        :key="type.id"
        :class="{ active: active === type.id }"
        @click="active = type.id"
      >
        {{ type.icon }} {{ type.name }}
      </button>
    </div>

    <div class="display-area">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Đối tượng gọi</span>
          <span class="value">{{ currentType.target }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cách giao tiếp</span>
          <span class="value">{{ currentType.comm }}</span>
        </div>
        <div class="info-item">
          <span class="label">Độ trễ</span>
          <span class="value">{{ currentType.latency }}</span>
        </div>
        <div class="info-item">
          <span class="label">Tình huống điển hình</span>
          <span class="value">{{ currentType.scenarios }}</span>
        </div>
      </div>

      <div class="code-preview">
        <div class="code-header">Ví dụ {{ currentType.name }}</div>
        <pre><code>{{ currentType.example }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('function')

const types = [
  {
    id: 'function',
    icon: '📦',
    name: 'Function API',
    target: 'Thư viện code cục bộ',
    comm: 'Gọi hàm',
    latency: 'Cấp nano giây',
    scenarios: 'Xử lý dữ liệu, thao tác file',
    example: `len("hello")           # trả về 5
max([1, 5, 3])         # trả về 5
open("file.txt").read() # đọc file`
  },
  {
    id: 'system',
    icon: '⚙️',
    name: 'API hệ điều hành',
    target: 'Kernel hệ điều hành',
    comm: 'System call',
    latency: 'Cấp micro giây',
    scenarios: 'Thao tác file, quản lý tiến trình',
    example: `with open("file.txt", "r") as f:
    content = f.read()

subprocess.run(["ls", "-l"])`
  },
  {
    id: 'web',
    icon: '🌐',
    name: 'Web API',
    target: 'Server từ xa',
    comm: 'HTTP request',
    latency: 'Cấp mili giây',
    scenarios: 'Gọi AI, lấy dữ liệu',
    example: `requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    json={"model": "deepseek-chat", "messages": [...]}
)`
  }
]

const currentType = computed(() => {
  return types.find((t) => t.id === active.value) || types[0]
})
</script>

<style scoped>
.api-types-demo {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.switch-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.switch-bar button {
  flex: 1;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--vp-c-text-2);
}

.switch-bar button:last-child {
  border-right: none;
}

.switch-bar button:hover {
  background: var(--vp-c-bg-mute);
}

.switch-bar button.active {
  background: var(--vp-c-brand);
  color: white;
}

.display-area {
  padding: 16px;
  background: var(--vp-c-bg);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-preview {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 11px;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-preview pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Menlo', 'Monaco', monospace;
}
</style>
