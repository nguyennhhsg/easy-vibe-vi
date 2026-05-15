<!--
  RealWorldApiDemo.vue - bản gọn
  Mục tiêu: so sánh gọi HTTP và gọi qua SDK
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">HTTP vs SDK: tự chạy việc hay nhờ "quản gia" lo?</span>
    </div>

    <div class="demo-layout">
      <div class="tabs">
        <button
          :class="['tab', { active: mode === 'http' }]"
          @click="mode = 'http'"
        >
          HTTP API
        </button>
        <button
          :class="['tab', { active: mode === 'sdk' }]"
          @click="mode = 'sdk'"
        >
          SDK
        </button>
      </div>

      <div class="code-area">
        <div class="code-header">
          <span>{{
            mode === 'http' ? 'Tự lo mọi chi tiết' : '"Quản gia" lo giúp bạn'
          }}</span>
        </div>
        <pre
          class="code"
        ><code>{{ mode === 'http' ? httpCode : sdkCode }}</code></pre>
      </div>

      <div class="compare-panel">
        <div class="compare-title">So sánh</div>
        <div class="compare-list">
          <div class="compare-item">
            <span class="ci-label">Khối lượng code</span>
            <span class="ci-val">{{ mode === 'http' ? 'Nhiều' : 'Ít' }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">Xử lý lỗi</span>
            <span class="ci-val">{{
              mode === 'http' ? 'Tự viết' : 'Tự động'
            }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">Logic retry</span>
            <span class="ci-val">{{
              mode === 'http' ? 'Tự viết' : 'Có sẵn'
            }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">Gợi ý kiểu</span>
            <span class="ci-val">{{ mode === 'http' ? 'Không' : 'Có' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong>
      <span>Có SDK thì dùng SDK, giao việc khó cho thư viện, giữ thời gian cho mình.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('sdk')

const httpCode = `import requests

response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer sk-xxx",
        "Content-Type": "application/json"
    },
    json={
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "Xin chào"}]
    }
)

if response.status_code == 200:
    result = response.json()
    content = result["choices"][0]["message"]["content"]
else:
    # Xử lý lỗi...
    pass`

const sdkCode = `from openai import OpenAI

client = OpenAI(
    api_key="sk-xxx",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "Xin chào"}]
)

content = response.choices[0].message.content`
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
  flex-direction: column;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
}

.tab {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.code-area {
  background: #1e293b;
}

.code-header {
  padding: 6px 12px;
  font-size: 0.75rem;
  color: #94a3b8;
  border-bottom: 1px solid #334155;
}

.code {
  margin: 0;
  padding: 12px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.72rem;
  line-height: 1.5;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre;
}

.compare-panel {
  padding: 12px;
  background: var(--vp-c-bg);
}

.compare-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.compare-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.compare-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.ci-label {
  color: var(--vp-c-text-2);
}

.ci-val {
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
