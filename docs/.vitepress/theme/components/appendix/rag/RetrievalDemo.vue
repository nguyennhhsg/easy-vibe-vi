<!--
  RetrievalDemo.vue
  Trực quan hóa quá trình retrieval

  Mục đích:
  Trình bày luồng retrieval trong RAG: encode query → vector search → rerank → chọn Top-K.
  User chọn câu hỏi mẫu để quan sát quá trình.

  Tính năng:
  - Chọn câu hỏi mẫu
  - Quan sát quá trình tính độ tương đồng vector
  - Xem hiệu quả của rerank
-->
<template>
  <div class="retrieval-demo">
    <div class="query-section">
      <span class="label">Chọn câu hỏi:</span>
      <div class="query-options">
        <button
          v-for="(q, i) in queries"
          :key="i"
          :class="['q-btn', { active: currentQuery === i }]"
          @click="selectQuery(i)"
        >
          {{ q.text }}
        </button>
      </div>
    </div>

    <div class="process-steps">
      <div
        v-for="(step, i) in steps"
        :key="i"
        :class="['step', { active: currentStep >= i, current: currentStep === i }]"
        @click="currentStep = i"
      >
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-name">{{ step.name }}</div>
      </div>
    </div>

    <div class="step-detail">
      <div class="step-title">{{ steps[currentStep].name }}</div>
      <div class="step-desc">{{ steps[currentStep].desc }}</div>
    </div>

    <!-- Step 1: Query Embedding -->
    <div v-if="currentStep === 0" class="embedding-viz">
      <div class="embed-label">Văn bản truy vấn</div>
      <div class="embed-text">{{ queries[currentQuery].text }}</div>
      <div class="embed-arrow">↓ Encode bằng embedding model</div>
      <div class="embed-label">Vector truy vấn</div>
      <div class="vector-display">
        <span
          v-for="(v, i) in queries[currentQuery].vector"
          :key="i"
          class="vector-val"
        >{{ v }}</span>
      </div>
    </div>

    <!-- Step 2: Vector Search -->
    <div v-if="currentStep === 1" class="search-viz">
      <div class="doc-list">
        <div
          v-for="(doc, i) in activeQuery.candidates"
          :key="i"
          class="doc-row"
        >
          <div class="doc-text-col">{{ doc.text }}</div>
          <div class="similarity-col">
            <div class="sim-bar-bg">
              <div
                class="sim-bar-fill"
                :style="{
                  width: (doc.similarity * 100) + '%',
                  background: getSimColor(doc.similarity)
                }"
              />
            </div>
            <span class="sim-value">{{ doc.similarity.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Re-ranking -->
    <div v-if="currentStep === 2" class="rerank-viz">
      <div class="rerank-columns">
        <div class="rerank-col">
          <div class="col-title">Sắp xếp ban đầu (theo vector similarity)</div>
          <div
            v-for="(doc, i) in sortedBySimilarity"
            :key="'init-' + i"
            class="rerank-item"
          >
            <span class="rank-badge">#{{ i + 1 }}</span>
            <span class="rerank-text">{{ doc.text }}</span>
            <span class="rerank-score">{{ doc.similarity.toFixed(2) }}</span>
          </div>
        </div>
        <div class="rerank-arrow-col">→</div>
        <div class="rerank-col">
          <div class="col-title">Sau rerank (cross-encoder)</div>
          <div
            v-for="(doc, i) in reranked"
            :key="'re-' + i"
            class="rerank-item"
          >
            <span class="rank-badge highlight">#{{ i + 1 }}</span>
            <span class="rerank-text">{{ doc.text }}</span>
            <span class="rerank-score">{{ doc.rerankScore.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Top-K Selection -->
    <div v-if="currentStep === 3" class="topk-viz">
      <div class="topk-setting">
        <span>Giá trị Top-K:</span>
        <button
          v-for="k in [1, 2, 3]"
          :key="k"
          :class="['k-btn', { active: topK === k }]"
          @click="topK = k"
        >
          K = {{ k }}
        </button>
      </div>
      <div class="topk-results">
        <div
          v-for="(doc, i) in topKResults"
          :key="i"
          :class="['topk-item', { selected: i < topK }]"
        >
          <span class="topk-rank">#{{ i + 1 }}</span>
          <span class="topk-text">{{ doc.text }}</span>
          <span
            v-if="i < topK"
            class="topk-badge"
          >Đã chọn</span>
        </div>
      </div>
    </div>

    <div class="nav-controls">
      <button
        class="nav-btn"
        :disabled="currentStep <= 0"
        @click="currentStep--"
      >
        ← Bước trước
      </button>
      <button
        class="nav-btn primary"
        :disabled="currentStep >= steps.length - 1"
        @click="currentStep++"
      >
        Bước kế →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentQuery = ref(0)
const currentStep = ref(0)
const topK = ref(2)

const steps = [
  { name: 'Encode query', desc: 'Đưa câu hỏi tự nhiên của user qua embedding model (ví dụ text-embedding-ada-002) để biến thành vector chiều cao, mang theo thông tin ngữ nghĩa của câu hỏi.' },
  { name: 'Vector search', desc: 'Trong vector database, tính cosine similarity giữa vector query và tất cả vector tài liệu để tìm các ứng viên gần nghĩa nhất.' },
  { name: 'Rerank', desc: 'Dùng cross-encoder để sắp xếp các ứng viên một cách tinh hơn. Cross-encoder xét tương tác giữa query và tài liệu cùng lúc nên xếp chính xác hơn.' },
  { name: 'Chọn Top-K', desc: 'Chọn K đoạn liên quan nhất sau rerank để làm context cho LLM sinh câu trả lời. Giá trị K cần cân bằng giữa độ chính xác và độ dài context.' }
]

const queries = [
  {
    text: 'Làm thế nào để xin nghỉ phép?',
    vector: [0.12, -0.45, 0.78, 0.33, -0.21, 0.56, 0.89, -0.14],
    candidates: [
      { text: 'Đơn xin nghỉ phép cần gửi vào quy trình duyệt trước 3 ngày làm việc', similarity: 0.94, rerankScore: 0.97 },
      { text: 'Số ngày nghỉ phép tính theo thâm niên: 1-5 năm 10 ngày, trên 5 năm 15 ngày', similarity: 0.88, rerankScore: 0.91 },
      { text: 'Nghỉ ốm cần giấy chứng nhận của bệnh viện', similarity: 0.62, rerankScore: 0.35 },
      { text: 'Phép chưa dùng có thể quy đổi thành tiền', similarity: 0.79, rerankScore: 0.82 },
      { text: 'Phòng pantry công ty có cà phê và đồ ăn nhẹ miễn phí', similarity: 0.15, rerankScore: 0.05 }
    ]
  },
  {
    text: 'Cache penetration trong Redis xử lý sao?',
    vector: [0.67, 0.23, -0.89, 0.45, 0.11, -0.34, 0.72, 0.56],
    candidates: [
      { text: 'Cache penetration có thể chặn bằng bloom filter để loại key không tồn tại', similarity: 0.96, rerankScore: 0.98 },
      { text: 'Cache cả giá trị null với TTL ngắn', similarity: 0.89, rerankScore: 0.93 },
      { text: 'Cache avalanche là khi nhiều key hết hạn cùng lúc, dồn áp lực lên DB', similarity: 0.71, rerankScore: 0.42 },
      { text: 'Redis hỗ trợ master-slave và sentinel để đạt high availability', similarity: 0.58, rerankScore: 0.28 },
      { text: 'API rate limit có thể dùng token bucket hoặc leaky bucket', similarity: 0.43, rerankScore: 0.15 }
    ]
  }
]

const activeQuery = computed(() => queries[currentQuery.value])

const sortedBySimilarity = computed(() =>
  [...activeQuery.value.candidates].sort((a, b) => b.similarity - a.similarity)
)

const reranked = computed(() =>
  [...activeQuery.value.candidates].sort((a, b) => b.rerankScore - a.rerankScore)
)

const topKResults = computed(() => reranked.value)

function selectQuery(i) {
  currentQuery.value = i
  currentStep.value = 0
}

function getSimColor(sim) {
  if (sim >= 0.8) return '#10b981'
  if (sim >= 0.5) return '#f59e0b'
  return '#ef4444'
}
</script>

<style scoped>
.retrieval-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.query-section {
  margin-bottom: 16px;
}
.query-section .label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 8px;
}
.query-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.q-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.q-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.process-steps {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
}
.step.active { opacity: 1; }
.step.current {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}
.step.current .step-num {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.step-name { font-size: 12px; }
.step-detail {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.step-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
}
.step-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
/* Embedding visualization */
.embedding-viz {
  text-align: center;
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.embed-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.embed-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}
.embed-arrow {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 8px 0;
}
.vector-display {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}
.vector-val {
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  font-family: monospace;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
/* Search visualization */
.search-viz { margin-bottom: 16px; }
.doc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.doc-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.doc-text-col {
  flex: 1;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
.similarity-col {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
}
.sim-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}
.sim-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s;
}
.sim-value {
  font-family: monospace;
  font-size: 12px;
  color: var(--vp-c-text-2);
  min-width: 32px;
}
/* Reranking visualization */
.rerank-viz { margin-bottom: 16px; }
.rerank-columns {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.rerank-col { flex: 1; }
.rerank-arrow-col {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: var(--vp-c-brand-1);
  padding-top: 40px;
}
.col-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}
.rerank-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin-bottom: 4px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 12px;
}
.rank-badge {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}
.rank-badge.highlight {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.rerank-text {
  flex: 1;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rerank-score {
  font-family: monospace;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}
/* Top-K visualization */
.topk-viz { margin-bottom: 16px; }
.topk-setting {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
}
.k-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}
.k-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.topk-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.topk-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  font-size: 13px;
  transition: all 0.3s;
  opacity: 0.5;
}
.topk-item.selected {
  border-color: var(--vp-c-brand-1);
  opacity: 1;
  background: var(--vp-c-brand-soft);
}
.topk-rank {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.topk-text {
  flex: 1;
  color: var(--vp-c-text-1);
}
.topk-badge {
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 11px;
}
/* Navigation */
.nav-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.nav-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.nav-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
</style>
