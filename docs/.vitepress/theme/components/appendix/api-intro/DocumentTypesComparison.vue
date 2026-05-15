<template>
  <div class="doc-types-root">
    <div class="demo-header">
      <span class="title">📋 Đọc các loại tài liệu khác nhau như thế nào</span>
      <span class="subtitle">Tài liệu hàm, REST API và SDK đều có trọng tâm riêng</span>
    </div>

    <div class="control-panel">
      <button
        v-for="doc in docTypes"
        :key="doc.id"
        :class="['doc-tab', { active: activeDoc === doc.id }]"
        @click="activeDoc = doc.id"
      >
        <span class="tab-icon">{{ doc.icon }}</span>
        <span class="tab-name">{{ doc.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="doc-display">
        <!-- Thông tin tài liệu -->
        <div class="doc-info-bar">
          <div class="info-item">
            <span class="info-label">Loại tài liệu</span>
            <span class="info-value">{{ currentDoc.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Tình huống áp dụng</span>
            <span class="info-value">{{ currentDoc.scenario }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Độ khó đọc</span>
            <span class="info-value">
              <span class="difficulty-stars">{{ currentDoc.difficulty }}</span>
            </span>
          </div>
        </div>

        <!-- Khu thông tin then chốt -->
        <div class="key-points">
          <div class="point-section">
            <div class="point-title">🔍 Khi đọc cần chú ý</div>
            <div class="point-tags">
              <span v-for="(point, idx) in currentDoc.keyPoints" :key="idx" class="point-tag">
                {{ point }}
              </span>
            </div>
          </div>
        </div>

        <!-- Khu ví dụ tài liệu -->
        <div class="doc-example-area">
          <div class="example-header">
            <span class="example-icon">📝</span>
            <span class="example-title">Ví dụ tài liệu</span>
          </div>
          <div class="example-content">
            <pre><code>{{ currentDoc.example }}</code></pre>
          </div>
        </div>

        <!-- Mẹo đọc -->
        <div class="reading-tips">
          <div class="tips-header">
            <span class="tips-icon">💡</span>
            <span class="tips-title">Mẹo đọc</span>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, idx) in currentDoc.tips" :key="idx">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tổng kết so sánh -->
    <div class="comparison-summary">
      <div class="summary-header">
        <span class="summary-icon">📊</span>
        <span class="summary-title">So sánh nhanh ba loại tài liệu</span>
      </div>
      <div class="summary-table">
        <div class="summary-row header">
          <div class="summary-cell">Tiêu chí</div>
          <div class="summary-cell">Tài liệu hàm</div>
          <div class="summary-cell">Tài liệu REST API</div>
          <div class="summary-cell">Tài liệu SDK</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">Trọng tâm</div>
          <div class="summary-cell">Tham số, giá trị trả về</div>
          <div class="summary-cell">Endpoint, request body</div>
          <div class="summary-cell">Khởi tạo, chain method</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">Ví dụ code</div>
          <div class="summary-cell">Gọi hàm</div>
          <div class="summary-cell">HTTP request</div>
          <div class="summary-cell">Method object</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">Xử lý lỗi</div>
          <div class="summary-cell">Exception/giá trị trả về</div>
          <div class="summary-cell">Status code</div>
          <div class="summary-cell">Object exception</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">Đọc cái gì trước</div>
          <div class="summary-cell">Chữ ký hàm</div>
          <div class="summary-cell">Base URL + Auth</div>
          <div class="summary-cell">Quick Start</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Gợi ý đọc:</strong>Tài liệu hàm xem chữ ký, tài liệu API xem định dạng request, tài liệu SDK xem ví dụ. Khi không biết bắt đầu từ đâu, hãy tìm phần "Quick Start" hoặc "Getting Started".
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDoc = ref('function')

const docTypes = [
  {
    id: 'function',
    icon: '📦',
    name: 'Tài liệu hàm',
    scenario: 'Sử dụng hàm của thư viện chuẩn/thư viện bên thứ ba',
    difficulty: '⭐⭐',
    keyPoints: ['Chữ ký hàm', 'Kiểu tham số', 'Giá trị trả về', 'Mô tả exception', 'Ví dụ code'],
    example: `### json.loads(s, *, cls=None, object_hook=None...)

Parse chuỗi JSON thành object Python

**Tham số:**
- s (str): chuỗi JSON cần parse
- cls (JSONDecoder): class decoder tùy chỉnh
- object_hook (callable): hàm chuyển đổi tùy chọn

**Giá trị trả về:**
- dict | list: object Python sau khi parse

**Exception:**
- JSONDecodeError: chuỗi không đúng định dạng

**Ví dụ:**
>>> import json
>>> json.loads('{"name": "Alice"}')
{'name': 'Alice'}`,
    tips: [
      'Đọc chữ ký hàm trước, xem cần truyền tham số gì',
      'Chú ý kiểu của tham số và có bắt buộc hay không',
      'Xem kiểu giá trị trả về để xử lý tiếp',
      'Để ý các exception có thể bị ném ra để xử lý lỗi tốt'
    ]
  },
  {
    id: 'rest',
    icon: '🌐',
    name: 'Tài liệu REST API',
    scenario: 'Gọi interface HTTP từ xa',
    difficulty: '⭐⭐⭐',
    keyPoints: ['Base URL', 'Cách xác thực', 'Endpoint', 'Tham số request', 'Định dạng response', 'Mã lỗi'],
    example: `## POST /v1/chat/completions

Tạo request chat completion

### Xác thực
Authorization: Bearer {api_key}

### Tham số request
| Tham số | Kiểu | Bắt buộc | Mô tả |
|---------|------|----------|-------|
| model | string | Có | Tên model |
| messages | array | Có | Danh sách message |
| temperature | float | Không | Nhiệt độ sampling (0-2) |

### Ví dụ request
{
  "model": "deepseek-chat",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "temperature": 0.7
}

### Ví dụ response
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you?"
    }
  }]
}`,
    tips: [
      'Tìm Base URL và cách xác thực trước (thường là API Key)',
      'Xác nhận HTTP method (GET/POST/PUT/DELETE)',
      'Xem rõ tham số nằm ở URL, Header hay Body',
      'Để ý sự khác biệt giữa tham số bắt buộc và tùy chọn',
      'Xem danh sách mã lỗi để biết các tình huống bất thường'
    ]
  },
  {
    id: 'sdk',
    icon: '📚',
    name: 'Tài liệu SDK',
    scenario: 'Dùng bộ công cụ phát triển đã được đóng gói chính thức',
    difficulty: '⭐⭐',
    keyPoints: ['Cách cài đặt', 'Khởi tạo', 'Class/method cốt lõi', 'Tùy chọn cấu hình', 'Best practice'],
    example: `## OpenAI Python SDK

### Cài đặt
pip install openai

### Khởi tạo client
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com/v1"
)

### Tạo chat completion
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)

### Response dạng stream
stream = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`,
    tips: [
      'Đọc phần Quick Start / Getting Started trước',
      'Hiểu cách khởi tạo và cấu hình client',
      'Chú ý cách dùng các class và method cốt lõi',
      'Xem các tùy chọn cấu hình nâng cao (timeout, retry...)',
      'Tham khảo ví dụ chính thức để hiểu best practice'
    ]
  },
  {
    id: 'websocket',
    icon: '🔌',
    name: 'Tài liệu WebSocket',
    scenario: 'Giao tiếp hai chiều thời gian thực',
    difficulty: '⭐⭐⭐⭐',
    keyPoints: ['Địa chỉ kết nối', 'Thiết lập kết nối', 'Định dạng message', 'Xử lý event', 'Cơ chế heartbeat', 'Reconnect'],
    example: `## WebSocket API

### Địa chỉ kết nối
wss://api.example.com/v1/stream

### Luồng kết nối

1. **Thiết lập kết nối**
   - Gửi yêu cầu handshake
   - Server trả về xác nhận kết nối

2. **Gửi message**
   {
     "type": "subscribe",
     "channel": "price_updates",
     "symbol": "BTC-USD"
   }

3. **Nhận dữ liệu đẩy về**
   {
     "type": "update",
     "data": {
       "symbol": "BTC-USD",
       "price": "45000.00",
       "timestamp": 1703001600
     }
   }

### Cơ chế heartbeat
Client gửi ping mỗi 30 giây:
{"type": "ping"}

Server trả về pong:
{"type": "pong"}`,
    tips: [
      'Chú ý sự khác biệt giữa ws:// và wss:// (có mã hóa hay không)',
      'Hiểu khi nào kết nối được thiết lập và đóng',
      'Nắm rõ định dạng và kiểu của message',
      'Cài đặt heartbeat để giữ kết nối sống',
      'Xử lý tốt logic reconnect khi mất kết nối',
      'Chú ý giới hạn số kết nối đồng thời'
    ]
  }
]

const currentDoc = computed(() => {
  return docTypes.find(d => d.id === activeDoc.value) || docTypes[0]
})
</script>

<style scoped>
.doc-types-root {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.demo-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.doc-tab {
  flex: 1;
  padding: 14px 12px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.doc-tab:last-child {
  border-right: none;
}

.doc-tab:hover {
  background: var(--vp-c-bg-mute);
}

.doc-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.4rem;
}

.tab-name {
  font-size: 0.8rem;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

.doc-display {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.doc-info-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .doc-info-bar {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.info-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.difficulty-stars {
  color: #f59e0b;
}

.key-points {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.point-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.point-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.point-tag {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.doc-example-area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: #0a0a0a;
}

.example-header {
  padding: 12px 16px;
  background: #18181b;
  border-bottom: 1px solid #27272a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.example-icon {
  font-size: 1rem;
}

.example-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #a1a1aa;
}

.example-content pre {
  margin: 0;
  padding: 16px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.example-content code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.reading-tips {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tips-icon {
  font-size: 1rem;
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.comparison-summary {
  margin: 0 20px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.summary-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.summary-icon {
  font-size: 1.1rem;
}

.summary-table {
  display: flex;
  flex-direction: column;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr;
  gap: 1px;
  background: var(--vp-c-divider);
}

.summary-row:not(.header) {
  background: var(--vp-c-divider);
}

.summary-row.header {
  background: var(--vp-c-bg-alt);
}

.summary-row.header .summary-cell {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.summary-cell {
  padding: 12px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}

.summary-cell.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .summary-row {
    grid-template-columns: 1fr;
  }
  
  .summary-row.header {
    display: none;
  }
  
  .summary-cell {
    padding: 8px 12px;
  }
  
  .summary-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--vp-c-text-2);
    margin-right: 8px;
  }
}

.info-box {
  display: flex;
  gap: 0.5rem;
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
</style>
