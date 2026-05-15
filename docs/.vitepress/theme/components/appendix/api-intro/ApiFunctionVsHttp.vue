<template>
  <div class="api-compare-root">
    <div class="demo-header">
      <span class="title">📚 Function API vs HTTP API</span>
      <span class="subtitle">Gọi cục bộ vs request mạng, đọc tài liệu thế nào?</span>
    </div>

    <div class="control-panel">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="visualization-area">
      <!-- View so sánh -->
      <div v-if="activeTab === 'compare'" class="compare-view">
        <div class="compare-cards">
          <div class="compare-card">
            <div class="card-header function">
              <span class="card-icon">📦</span>
              <span class="card-title">Function API</span>
            </div>
            <div class="card-body">
              <div class="feature-list">
                <div class="feature-item">
                  <span class="feature-label">Cách gọi</span>
                  <span class="feature-value">Gọi hàm trực tiếp</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Truyền tham số</span>
                  <span class="feature-value">Truyền trong ngoặc</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Giá trị trả về</span>
                  <span class="feature-value">Nhận kết quả trực tiếp</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Xử lý lỗi</span>
                  <span class="feature-value">Exception/giá trị trả về</span>
                </div>
              </div>
              <div class="code-block">
                <div class="code-label">Ví dụ Python</div>
                <pre><code># Gọi hàm built-in
length = len("hello")      # trả về 5

# Gọi hàm thư viện
import math
result = math.sqrt(16)     # trả về 4.0

# Gọi hàm tự định nghĩa
def add(a, b):
    return a + b
sum = add(3, 5)            # trả về 8</code></pre>
              </div>
            </div>
          </div>

          <div class="vs-divider">
            <span class="vs-text">VS</span>
          </div>

          <div class="compare-card">
            <div class="card-header http">
              <span class="card-icon">🌐</span>
              <span class="card-title">HTTP API</span>
            </div>
            <div class="card-body">
              <div class="feature-list">
                <div class="feature-item">
                  <span class="feature-label">Cách gọi</span>
                  <span class="feature-value">Request qua mạng</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Truyền tham số</span>
                  <span class="feature-value">URL/Body/Header</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Giá trị trả về</span>
                  <span class="feature-value">Response JSON/XML</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">Xử lý lỗi</span>
                  <span class="feature-value">Kiểm tra status code</span>
                </div>
              </div>
              <div class="code-block">
                <div class="code-label">Ví dụ HTTP request</div>
                <pre><code>POST /v1/chat/completions HTTP/1.1
Host: api.deepseek.com
Authorization: Bearer sk-xxx
Content-Type: application/json

{
  "model": "deepseek-chat",
  "messages": [
    {"role": "user", "content": "Xin chào"}
  ]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View so sánh tài liệu -->
      <div v-if="activeTab === 'docs'" class="docs-view">
        <div class="docs-cards">
          <div class="doc-card">
            <div class="doc-header">
              <span class="doc-icon">📖</span>
              <span class="doc-title">Đọc tài liệu hàm thế nào</span>
            </div>
            <div class="doc-content">
              <div class="doc-section">
                <div class="doc-section-title">🔍 Điểm cần chú ý</div>
                <ul class="doc-list">
                  <li><strong>Chữ ký hàm</strong>: tên hàm và danh sách tham số</li>
                  <li><strong>Kiểu tham số</strong>: mỗi tham số cần kiểu gì</li>
                  <li><strong>Giá trị trả về</strong>: hàm trả về cái gì</li>
                  <li><strong>Mô tả exception</strong>: có thể ném ra lỗi nào</li>
                </ul>
              </div>
              <div class="doc-example">
                <div class="doc-example-label">Ví dụ tài liệu Python</div>
                <pre><code>def open(file: str, mode: str = 'r') -> TextIO:
    """
    Mở file và trả về file object

    Args:
        file: đường dẫn file
        mode: chế độ mở ('r', 'w', 'a')

    Returns:
        file object

    Raises:
        FileNotFoundError: file không tồn tại
    """</code></pre>
              </div>
            </div>
          </div>

          <div class="doc-card">
            <div class="doc-header">
              <span class="doc-icon">📡</span>
              <span class="doc-title">Đọc tài liệu HTTP API thế nào</span>
            </div>
            <div class="doc-content">
              <div class="doc-section">
                <div class="doc-section-title">🔍 Điểm cần chú ý</div>
                <ul class="doc-list">
                  <li><strong>Endpoint</strong>: URL path và HTTP method</li>
                  <li><strong>Cách xác thực</strong>: API Key / Token truyền thế nào</li>
                  <li><strong>Tham số request</strong>: Body / Query / Header</li>
                  <li><strong>Định dạng response</strong>: thành công và lỗi trả về gì</li>
                </ul>
              </div>
              <div class="doc-example">
                <div class="doc-example-label">Ví dụ tài liệu API</div>
                <pre><code>POST /v1/chat/completions

Headers:
  Authorization: Bearer {api_key}
  Content-Type: application/json

Body:
{
  "model": "deepseek-chat",
  "messages": [...],
  "temperature": 0.7
}

Response:
{
  "choices": [{
    "message": {"content": "..."}
  }]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View nhận diện nhanh -->
      <div v-if="activeTab === 'quick'" class="quick-view">
        <div class="quick-cards">
          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">⚡</span>
              <span class="quick-title">Hướng dẫn nhận diện nhanh</span>
            </div>
            <div class="quick-content">
              <div class="decision-tree">
                <div class="decision-item">
                  <div class="decision-question">Thấy trong code có gọi <code>()</code>?</div>
                  <div class="decision-answer">→ Đây là <strong>Function API</strong></div>
                  <div class="decision-example">VD: len(), print(), requests.get()</div>
                </div>
                <div class="decision-arrow">↓</div>
                <div class="decision-item">
                  <div class="decision-question">Thấy URL và HTTP method?</div>
                  <div class="decision-answer">→ Đây là <strong>HTTP API</strong></div>
                  <div class="decision-example">VD: POST /api/users, GET https://...</div>
                </div>
                <div class="decision-arrow">↓</div>
                <div class="decision-item">
                  <div class="decision-question">Thấy object SDK/Client?</div>
                  <div class="decision-answer">→ Đây là <strong>HTTP API đã được đóng gói</strong></div>
                  <div class="decision-example">VD: client.chat.completions.create()</div>
                </div>
              </div>
            </div>
          </div>

          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">🎯</span>
              <span class="quick-title">So sánh tình huống sử dụng</span>
            </div>
            <div class="quick-content">
              <div class="scenario-table">
                <div class="scenario-row header">
                  <div class="scenario-cell">Tình huống</div>
                  <div class="scenario-cell">Đề xuất</div>
                  <div class="scenario-cell">Lý do</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">Xử lý dữ liệu cục bộ</div>
                  <div class="scenario-cell"><span class="badge function">Function API</span></div>
                  <div class="scenario-cell">Nhanh, không cần mạng</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">Gọi model AI</div>
                  <div class="scenario-cell"><span class="badge http">HTTP API</span></div>
                  <div class="scenario-cell">Model ở server từ xa</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">Lấy dữ liệu thời tiết</div>
                  <div class="scenario-cell"><span class="badge http">HTTP API</span></div>
                  <div class="scenario-cell">Dữ liệu ở nhà cung cấp</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">Đọc/ghi file</div>
                  <div class="scenario-cell"><span class="badge function">Function API</span></div>
                  <div class="scenario-cell">Thao tác trực tiếp file cục bộ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong>Function API là "làm việc tại chỗ", HTTP API là "giao tiếp từ xa". Khi đọc tài liệu, với function thì chú ý tham số và giá trị trả về; với HTTP API thì chú ý Endpoint, cách xác thực và định dạng request/response.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('compare')

const tabs = [
  { id: 'compare', name: 'Khác biệt cốt lõi', icon: '🔍' },
  { id: 'docs', name: 'So sánh tài liệu', icon: '📚' },
  { id: 'quick', name: 'Nhận diện nhanh', icon: '⚡' }
]
</script>

<style scoped>
.api-compare-root {
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

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn:hover {
  background: var(--vp-c-bg-mute);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

/* View so sánh */
.compare-view {
  width: 100%;
}

.compare-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .compare-cards {
    grid-template-columns: 1fr;
  }
  .vs-divider {
    display: none;
  }
}

.compare-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.card-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
}

.card-header.function {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.card-header.http {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.card-icon {
  font-size: 1.2rem;
}

.card-body {
  padding: 16px;
}

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.feature-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-block {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-block pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

/* View tài liệu */
.docs-view {
  width: 100%;
}

.docs-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .docs-cards {
    grid-template-columns: 1fr;
  }
}

.doc-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.doc-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.doc-icon {
  font-size: 1.2rem;
}

.doc-content {
  padding: 16px;
}

.doc-section {
  margin-bottom: 16px;
}

.doc-section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-list li {
  padding: 6px 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px dashed var(--vp-c-divider);
}

.doc-list li:last-child {
  border-bottom: none;
}

.doc-list strong {
  color: var(--vp-c-brand);
}

.doc-example {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 12px;
}

.doc-example-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.doc-example pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
}

.doc-example code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

/* View nhận diện nhanh */
.quick-view {
  width: 100%;
}

.quick-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .quick-cards {
    grid-template-columns: 1fr;
  }
}

.quick-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.quick-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.quick-icon {
  font-size: 1.2rem;
}

.quick-content {
  padding: 16px;
}

.decision-tree {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.decision-item {
  padding: 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.decision-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.decision-question code {
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.decision-answer {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.decision-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
}

.decision-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1.2rem;
}

.scenario-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.scenario-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  align-items: center;
}

.scenario-row.header {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario-cell {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.function {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.badge.http {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

/* Info Box */
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
