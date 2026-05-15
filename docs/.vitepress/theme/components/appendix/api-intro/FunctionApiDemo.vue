<!--
  FunctionApiDemo.vue - bản gọn
  Mục tiêu: cho thấy hàm chính là dạng API cơ bản nhất
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🔧</span>
      <span class="title">Hàm chính là API cơ bản nhất</span>
    </div>

    <div class="demo-layout">
      <div class="code-panel">
        <div class="code-title">📝 Code Python</div>
        <pre><code><span class="keyword">def</span> <span class="func">greet</span>(name, greeting=<span class="str">"Xin chào"</span>):
    <span class="keyword">return</span> <span class="str">f"{greeting}, {name}!"</span>

result = <span class="func">greet</span>(<span class="str">"An"</span>)</code></pre>
      </div>

      <div class="right-panel">
        <div class="api-structure">
          <div class="structure-item">
            <span class="label">📦 Đầu vào (tham số)</span>
            <code class="value">name="An"</code>
          </div>
          <div class="structure-item">
            <span class="label">⚙️ Xử lý</span>
            <span class="value">Hàm ghép chuỗi bên trong</span>
          </div>
          <div class="structure-item">
            <span class="label">📤 Đầu ra (trả về)</span>
            <code class="value highlight">"Xin chào, An!"</code>
          </div>
        </div>

        <div class="try-area">
          <div class="try-row">
            <input v-model="name" placeholder="Tên" class="input" />
            <select v-model="greeting" class="select">
              <option value="Xin chào">Xin chào</option>
              <option value="Hello">Hello</option>
              <option value="Chào buổi sáng">Chào buổi sáng</option>
            </select>
            <button class="btn" @click="callFunction">Gọi</button>
          </div>
          <div v-if="result" class="result">
            → <code>{{ result }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong>
      <span>Bạn không cần biết bên trong hàm cài đặt thế nào, chỉ cần biết cách gọi nó. Đó là bản chất của
        API.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('An')
const greeting = ref('Xin chào')
const result = ref('')

function callFunction() {
  result.value = `${greeting.value}, ${name.value}!`
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
  gap: 0;
}

.code-panel {
  flex: 1;
  background: #1e293b;
  padding: 12px 14px;
  border-right: 1px solid var(--vp-c-divider);
}

.code-title {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-bottom: 8px;
}

.code-panel pre {
  margin: 0;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-panel code {
  color: #e2e8f0;
}
.keyword {
  color: #c084fc;
}
.func {
  color: #60a5fa;
}
.str {
  color: #4ade80;
}

.right-panel {
  width: 260px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--vp-c-bg);
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .code-panel {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .right-panel {
    width: 100%;
  }
}

.api-structure {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.structure-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.structure-item .label {
  color: var(--vp-c-text-2);
}

.structure-item .value {
  font-family: monospace;
  font-size: 0.72rem;
}

.structure-item .highlight {
  background: #dcfce7;
  color: #166534;
  padding: 2px 6px;
  border-radius: 3px;
}

.try-area {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.try-row {
  display: flex;
  gap: 6px;
}

.input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.select {
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.btn {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.result {
  margin-top: 8px;
  padding: 6px 8px;
  background: #dcfce7;
  border-radius: 4px;
  font-size: 0.8rem;
}

.result code {
  color: #166534;
  font-weight: 600;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
