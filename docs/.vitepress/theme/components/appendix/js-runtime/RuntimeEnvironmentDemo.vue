<script setup>
import { ref } from 'vue'

const activeTab = ref('browser')

const tabs = [
  { value: 'browser', label: 'Môi trường Browser', icon: '🌐' },
  { value: 'nodejs', label: 'Môi trường Node.js', icon: '🟢' }
]

const browserApis = [
  { name: 'window', description: 'Global object của browser', example: 'window.location.href' },
  { name: 'document', description: 'Thao tác DOM', example: 'document.querySelector("h1")' },
  { name: 'localStorage', description: 'Lưu trữ cục bộ', example: 'localStorage.setItem("key", "value")' },
  { name: 'fetch', description: 'Network request', example: 'fetch("/api/data")' },
  { name: 'setTimeout', description: 'Timer', example: 'setTimeout(() => {}, 1000)' }
]

const nodeApis = [
  { name: 'global', description: 'Global object của Node.js', example: 'global.process' },
  { name: 'process', description: 'Thông tin process', example: 'process.env.NODE_ENV' },
  { name: 'fs', description: 'File system', example: 'fs.readFile("./data.txt")' },
  { name: 'http', description: 'HTTP server', example: 'http.createServer((req, res) => {})' },
  { name: 'path', description: 'Xử lý đường dẫn', example: 'path.join("/a", "b")' }
]

const tryCode = ref('console.log(typeof window)')

const browserResult = ref('')
const nodeResult = ref('')

const runInBrowser = () => {
  const code = tryCode.value.trim()
  const presets = {
    'window.location.href': 'undefined (không khả dụng trong ví dụ)',
    'window': 'undefined',
    'document.querySelector': 'function querySelector() { [native code] }',
    'document': 'undefined',
    'localStorage': 'undefined',
    'localStorage.setItem': 'function setItem() { [native code] }',
    'fetch': 'function fetch() { [native code] }',
    'setTimeout': 'function setTimeout() { [native code] }',
    'console.log(typeof window)': 'undefined',
    'console.log(1+1)': '2',
    'typeof fetch': 'function',
    'typeof localStorage': 'object'
  }

  if (presets[code]) {
    browserResult.value = presets[code]
  } else if (code.startsWith('console.log')) {
    browserResult.value = 'Đã thực thi (in ra console)'
  } else {
    browserResult.value = `Kết quả: ${code}`
  }
  nodeResult.value = 'Chạy trong Node.js...'
}

const runInNode = () => {
  const code = tryCode.value.trim()
  const presets = {
    'global': 'undefined (Node hiện đại dùng globalThis)',
    'globalThis': '{}',
    'process.env.NODE_ENV': '"development"',
    'process': '{...}',
    'fs': '{ readFile: [Function], writeFile: [Function] }',
    'http': '{ createServer: [Function] }',
    'path': '{ join: [Function], resolve: [Function] }',
    'typeof process': 'object',
    'typeof fs': 'object',
    'console.log(1+1)': '2'
  }

  if (presets[code]) {
    nodeResult.value = presets[code]
  } else if (code.startsWith('console.log')) {
    nodeResult.value = 'Đã thực thi (in ra console)'
  } else {
    nodeResult.value = `Kết quả: ${code}`
  }
  browserResult.value = 'Không thể chạy trực tiếp code Node.js trên browser'
}

const reset = () => {
  browserResult.value = ''
  nodeResult.value = ''
  tryCode.value = 'console.log(typeof window)'
}
</script>

<template>
  <div class="runtime-environment-demo">
    <h3>So sánh môi trường runtime</h3>

    <div class="tab-container">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="{ 'active': activeTab === tab.value }"
          class="tab-btn"
          @click="activeTab = tab.value"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>

      <div class="tab-content">
        <!-- Môi trường Browser -->
        <div
          v-if="activeTab === 'browser'"
          class="environment-content"
        >
          <h4>Môi trường Browser</h4>

          <div class="api-grid">
            <div
              v-for="api in browserApis"
              :key="api.name"
              class="api-card"
            >
              <div class="api-name">
                {{ api.name }}
              </div>
              <div class="api-description">
                {{ api.description }}
              </div>
              <div class="api-example">
                {{ api.example }}
              </div>
            </div>
          </div>

          <div class="environment-note">
            <strong>Đặc điểm:</strong>
            <ul>
              <li>Có DOM và BOM API, có thể thao tác trang web</li>
              <li>Có Web Storage (localStorage, sessionStorage)</li>
              <li>Có fetch và XMLHttpRequest để gọi network request</li>
              <li>Không có quyền truy cập file system</li>
              <li>Không thể tạo HTTP server trực tiếp</li>
            </ul>
          </div>
        </div>

        <!-- Môi trường Node.js -->
        <div
          v-if="activeTab === 'nodejs'"
          class="environment-content"
        >
          <h4>Môi trường Node.js</h4>

          <div class="api-grid">
            <div
              v-for="api in nodeApis"
              :key="api.name"
              class="api-card"
            >
              <div class="api-name">
                {{ api.name }}
              </div>
              <div class="api-description">
                {{ api.description }}
              </div>
              <div class="api-example">
                {{ api.example }}
              </div>
            </div>
          </div>

          <div class="environment-note">
            <strong>Đặc điểm:</strong>
            <ul>
              <li>Có quyền truy cập file system</li>
              <li>Có thể tạo HTTP server</li>
              <li>Có thể thao tác process và tài nguyên hệ thống</li>
              <li>Không có DOM và BOM</li>
              <li>Không thể thao tác trực tiếp với phần tử trang web</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo so sánh code -->
    <div class="code-comparison-section">
      <h4>Demo code: khác biệt giữa các môi trường</h4>

      <div class="code-input">
        <label>Thử chạy đoạn code này:</label>
        <input
          v-model="tryCode"
          type="text"
          placeholder="Nhập code JavaScript"
          class="code-input-field"
        >
      </div>

      <div class="result-grid">
        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">🌐</span>
            <span class="result-title">Kết quả trên Browser</span>
          </div>
          <div class="result-content">
            {{ browserResult || 'Bấm "Chạy trên Browser" để xem kết quả' }}
          </div>
          <button
            class="run-btn"
            @click="runInBrowser"
          >
            Chạy trên Browser
          </button>
        </div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">🟢</span>
            <span class="result-title">Kết quả trên Node.js</span>
          </div>
          <div class="result-content">
            {{ nodeResult || 'Cần chạy trong môi trường Node.js' }}
          </div>
          <button
            class="run-btn"
            disabled
            @click="runInNode"
          >
            Cần chạy trên terminal
          </button>
        </div>
      </div>

      <button
        class="reset-btn"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <!-- Tổng kết -->
    <div class="summary-box">
      <p><strong>Khác biệt cốt lõi:</strong></p>
      <p>Runtime Browser tập trung vào giao diện và tương tác trên web, cung cấp DOM, BOM, fetch và các API frontend chuyên dụng.</p>
      <p>Runtime Node.js tập trung vào phát triển phía server, cung cấp file system, HTTP server, quản lý process và các API backend chuyên dụng.</p>
      <p class="highlight">
        Cùng cú pháp JavaScript nhưng API có thể dùng lại khác nhau hoàn toàn - đó là lý do "xét môi trường" lại quan trọng.
      </p>
    </div>
  </div>
</template>

<style scoped>
.runtime-environment-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tab-container {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: var(--vp-c-brand-1);
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-icon {
  font-size: 18px;
  margin-right: 8px;
}

.tab-label {
  font-size: 14px;
}

.tab-content {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.api-card {
  padding: 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.2s ease;
}

.api-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.api-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
  font-family: 'Courier New', monospace;
}

.api-description {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.api-example {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: 'Courier New', monospace;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.environment-note {
  padding: 16px;
  background: rgba(62, 175, 124, 0.1);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
}

.environment-note strong {
  display: block;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.environment-note ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.environment-note li {
  padding: 4px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.code-comparison-section {
  border-top: 2px solid var(--vp-c-border);
  padding-top: 24px;
}

.code-input {
  margin-bottom: 20px;
}

.code-input label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.code-input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s ease;
}

.code-input-field:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
}

.result-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-border);
}

.result-icon {
  font-size: 20px;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-content {
  min-height: 60px;
  padding: 12px;
  margin-bottom: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.run-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.run-btn:disabled {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
}

.reset-btn {
  padding: 10px 24px;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.summary-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
}

.summary-box p {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.summary-box p:last-child {
  margin-bottom: 0;
}

.summary-box strong {
  color: var(--vp-c-brand-1);
}

.summary-box .highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
</style>
