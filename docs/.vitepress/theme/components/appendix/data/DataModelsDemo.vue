<template>
  <div class="data-models-demo">
    <div class="demo-header">
      <span class="icon">🗂️</span>
      <span class="title">Toàn cảnh các mô hình dữ liệu</span>
      <span class="subtitle">So sánh 4 mô hình dữ liệu phổ biến</span>
    </div>

    <div class="intro-text">
      Không phải dữ liệu nào cũng hợp với <span class="highlight">bảng quan hệ</span>. Quan hệ bạn bè trong mạng xã hội, dòng thời gian từ thiết bị IoT, vector ngữ nghĩa cho AI search... mỗi loại dữ liệu cần <span class="highlight">cách mô hình hóa</span> khác nhau.
    </div>

    <div v-if="!props.tab" class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: active === t.id }]"
        @click="active = t.id"
      >
        {{ t.name }}
      </button>
    </div>

    <!-- Document model -->
    <div v-if="active === 'document'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">📄</span>
        <span class="panel-title">Document model</span>
        <span class="panel-badge">MongoDB / DynamoDB</span>
      </div>
      <div class="panel-desc">Dữ liệu lưu dưới dạng JSON document, mỗi bản ghi có thể có cấu trúc field khác nhau, hợp với dữ liệu <strong>lồng nhau, bán cấu trúc</strong>.</div>
      <div class="code-block">
        <pre><code>{
  "_id": "user_1001",
  "name": "Nguyen Van A",
  "tags": ["VIP", "Active"],
  "address": {
    "city": "Ha Noi",
    "district": "Cau Giay"
  },
  "orders": [
    { "id": "o1", "amount": 299 },
    { "id": "o2", "amount": 599 }
  ]
}</code></pre>
      </div>
      <div class="traits">
        <div class="trait good">Không cần khai báo schema trước, field mở rộng linh hoạt</div>
        <div class="trait good">Dữ liệu lồng nhau đọc một lần, không cần JOIN</div>
        <div class="trait bad">Liên kết qua nhiều document yếu</div>
      </div>
      <div class="use-cases">
        <span class="use-label">Tình huống điển hình:</span>
        <span class="use-tag">User profile</span>
        <span class="use-tag">Nội dung CMS</span>
        <span class="use-tag">Catalog sản phẩm</span>
        <span class="use-tag">Trung tâm cấu hình</span>
      </div>
    </div>

    <!-- Graph model -->
    <div v-if="active === 'graph'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">🕸️</span>
        <span class="panel-title">Graph model</span>
        <span class="panel-badge">Neo4j / Neptune</span>
      </div>
      <div class="panel-desc">Dữ liệu gồm <strong>node</strong> và <strong>edge</strong>, chuyên để biểu diễn mạng quan hệ phức tạp giữa các thực thể.</div>
      <div class="graph-viz">
        <div class="graph-nodes">
          <div class="g-node user" style="grid-area: a">Anh</div>
          <div class="g-node user" style="grid-area: b">Binh</div>
          <div class="g-node user" style="grid-area: c">Cuong</div>
          <div class="g-node item" style="grid-area: d">iPhone</div>
        </div>
        <div class="graph-edges">
          <div class="g-edge">Anh —<span class="edge-label">follow</span>→ Binh</div>
          <div class="g-edge">Binh —<span class="edge-label">follow</span>→ Cuong</div>
          <div class="g-edge">Anh —<span class="edge-label">mua</span>→ iPhone</div>
          <div class="g-edge">Cuong —<span class="edge-label">mua</span>→ iPhone</div>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">Truy vấn nhiều cấp quan hệ rất nhanh (bạn của bạn)</div>
        <div class="trait good">Bản thân quan hệ có thể mang thuộc tính</div>
        <div class="trait bad">Không mạnh khi gộp/thống kê quy mô lớn</div>
      </div>
      <div class="use-cases">
        <span class="use-label">Tình huống điển hình:</span>
        <span class="use-tag">Mạng xã hội</span>
        <span class="use-tag">Hệ thống đề xuất</span>
        <span class="use-tag">Knowledge graph</span>
        <span class="use-tag">Phát hiện gian lận</span>
      </div>
    </div>

    <!-- Time-series model -->
    <div v-if="active === 'timeseries'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">📈</span>
        <span class="panel-title">Time-Series model</span>
        <span class="panel-badge">InfluxDB / TimescaleDB</span>
      </div>
      <div class="panel-desc">Lấy <strong>timestamp</strong> làm trục chính, tối ưu sâu cho ghi theo thứ tự thời gian và truy vấn theo khoảng thời gian.</div>
      <div class="ts-table">
        <div class="ts-row ts-header">
          <span>timestamp</span>
          <span>device</span>
          <span>cpu_usage</span>
          <span>memory</span>
        </div>
        <div v-for="row in tsData" :key="row.ts" class="ts-row">
          <span class="ts-time">{{ row.ts }}</span>
          <span>{{ row.device }}</span>
          <span :class="row.cpu > 80 ? 'val-high' : 'val-normal'">{{ row.cpu }}%</span>
          <span>{{ row.mem }}GB</span>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">Throughput ghi cực cao (triệu điểm/giây)</div>
        <div class="trait good">Tích hợp sẵn downsampling và TTL tự động</div>
        <div class="trait bad">Không hỗ trợ truy vấn JOIN phức tạp</div>
      </div>
      <div class="use-cases">
        <span class="use-label">Tình huống điển hình:</span>
        <span class="use-tag">Monitoring server</span>
        <span class="use-tag">Cảm biến IoT</span>
        <span class="use-tag">Giá tài chính</span>
        <span class="use-tag">Phân tích log</span>
      </div>
    </div>

    <!-- Vector model -->
    <div v-if="active === 'vector'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">🧠</span>
        <span class="panel-title">Vector model</span>
        <span class="panel-badge">Pinecone / Milvus / pgvector</span>
      </div>
      <div class="panel-desc">Chuyển dữ liệu phi cấu trúc như văn bản, ảnh thành <strong>vector nhiều chiều</strong>, tìm kiếm theo độ tương đồng ngữ nghĩa qua khoảng cách vector.</div>
      <div class="vector-viz">
        <div class="vec-query">
          <div class="vec-label">Truy vấn: "đồ Nhật ngon"</div>
          <div class="vec-arrow">→ Embedding →</div>
          <div class="vec-nums">[0.82, 0.15, 0.91, ...]</div>
        </div>
        <div class="vec-results">
          <div class="vec-result" v-for="r in vecResults" :key="r.text">
            <span class="vec-score" :style="{ opacity: r.score }">{{ (r.score * 100).toFixed(0) }}%</span>
            <span class="vec-text">{{ r.text }}</span>
          </div>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">Semantic search, hiểu "ý nghĩa" thay vì keyword</div>
        <div class="trait good">Hỗ trợ multimodal (text, ảnh, audio)</div>
        <div class="trait bad">Chất lượng vector phụ thuộc embedding model</div>
      </div>
      <div class="use-cases">
        <span class="use-label">Tình huống điển hình:</span>
        <span class="use-tag">RAG</span>
        <span class="use-tag">Tìm bằng ảnh</span>
        <span class="use-tag">Semantic search</span>
        <span class="use-tag">Hệ thống đề xuất</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Nguyên tắc chọn lựa:</strong> Không có database vạn năng. RDBMS (MySQL/PostgreSQL) vẫn là nền cho phần lớn nghiệp vụ, nhưng khi dữ liệu thiên hẳn về document, graph, time-series hay vector, chọn model chuyên dụng có thể đem lại <span class="highlight">cải thiện hiệu năng cả bậc</span>.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ tab: { type: String, default: '' } })
const active = ref(props.tab || 'document')

const tabs = [
  { id: 'document', name: '📄 Document' },
  { id: 'graph', name: '🕸️ Graph' },
  { id: 'timeseries', name: '📈 Time-series' },
  { id: 'vector', name: '🧠 Vector' }
]

const tsData = [
  { ts: '10:00:01', device: 'server-01', cpu: 45, mem: 12.3 },
  { ts: '10:00:02', device: 'server-01', cpu: 67, mem: 12.5 },
  { ts: '10:00:03', device: 'server-01', cpu: 92, mem: 14.1 },
  { ts: '10:00:04', device: 'server-02', cpu: 23, mem: 8.2 },
  { ts: '10:00:05', device: 'server-02', cpu: 85, mem: 9.7 }
]

const vecResults = [
  { text: 'Sushi cao cấp Ginza — omakase đỉnh cao', score: 0.96 },
  { text: 'Phố ramen Shinjuku — nước dùng tonkotsu đậm đà', score: 0.82 },
  { text: 'Izakaya quán đêm — xiên nướng và sake', score: 0.75 },
  { text: 'Pizza thủ công Ý — margherita lò củi', score: 0.31 }
]
</script>

<style scoped>
.data-models-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  text-align: center;
  transition: all 0.2s;
}

.tab:hover { background: var(--vp-c-bg-soft); }
.tab.active { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }

@media (max-width: 640px) {
  .tabs { grid-template-columns: repeat(2, 1fr); }
}

/* Panel */
.model-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.panel-icon { font-size: 1.25rem; }
.panel-title { font-weight: 600; font-size: 0.9rem; flex: 1; }
.panel-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.panel-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

/* Code block */
.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  line-height: 1.5;
}

/* Traits */
.traits {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 0.75rem;
}

.trait {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1.4;
}

.trait.good {
  background: rgba(34, 197, 94, 0.08);
  color: #16a34a;
}

.trait.good::before { content: '✓ '; font-weight: 600; }

.trait.bad {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
}

.trait.bad::before { content: '✗ '; font-weight: 600; }

/* Use cases */
.use-cases {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.use-label { color: var(--vp-c-text-3); }

.use-tag {
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

/* Graph viz */
.graph-viz {
  margin-bottom: 0.75rem;
}

.graph-nodes {
  display: grid;
  grid-template-areas: 'a . b' '. d .' 'c . .';
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.g-node {
  padding: 6px 12px;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
}

.g-node.user {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand);
}

.g-node.item {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  border: 1px solid #f59e0b;
}

.graph-edges {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

@media (max-width: 640px) {
  .graph-edges { grid-template-columns: 1fr; }
}

.g-edge {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.edge-label {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  margin: 0 2px;
}

/* Time-series table */
.ts-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.ts-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.8fr 0.8fr;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.ts-row:last-child { border-bottom: none; }

.ts-row span {
  padding: 4px 8px;
}

.ts-header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.ts-time {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}

.val-high { color: #ef4444; font-weight: 600; }
.val-normal { color: #22c55e; }

/* Vector viz */
.vector-viz {
  margin-bottom: 0.75rem;
}

.vec-query {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.vec-label { font-size: 0.8rem; color: var(--vp-c-text-1); font-weight: 500; }
.vec-arrow { font-size: 0.75rem; color: var(--vp-c-text-3); }
.vec-nums { font-family: var(--vp-font-family-mono); font-size: 0.7rem; color: var(--vp-c-brand-1); }

.vec-results {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vec-result {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.vec-score {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  min-width: 36px;
  text-align: right;
}

.vec-text { color: var(--vp-c-text-2); }

/* Info box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
