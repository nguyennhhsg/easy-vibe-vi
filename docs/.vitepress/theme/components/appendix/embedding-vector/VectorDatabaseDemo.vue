<!--
  VectorDatabaseDemo.vue
  Component so sánh vector database

  Mục đích:
  So sánh tương tác đặc điểm, tình huống sử dụng và kiến trúc của các vector database phổ biến.

  Tính năng:
  - Bấm card để xem chi tiết
  - So sánh các chỉ số chính giữa các database
  - Gợi ý theo tình huống
-->
<template>
  <div class="vdb-demo">
    <div class="demo-header">
      <h4>So sánh các vector database phổ biến</h4>
      <p class="desc">Bấm vào card để xem chi tiết, hiểu đặc điểm và tình huống dùng của từng vector database</p>
    </div>

    <div class="db-grid">
      <div
        v-for="db in databases"
        :key="db.name"
        class="db-card"
        :class="{ active: selected === db.name }"
        @click="selected = selected === db.name ? null : db.name"
      >
        <div class="card-header">
          <span class="db-icon" :style="{ background: db.color }">{{ db.icon }}</span>
          <div>
            <div class="db-name">{{ db.name }}</div>
            <div class="db-type">{{ db.type }}</div>
          </div>
        </div>

        <div class="card-tags">
          <span
            v-for="tag in db.tags"
            :key="tag"
            class="tag"
          >{{ tag }}</span>
        </div>

        <div v-if="selected === db.name" class="card-detail">
          <div class="detail-row">
            <span class="detail-label">Giấy phép</span>
            <span class="detail-val">{{ db.license }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Thuật toán index</span>
            <span class="detail-val">{{ db.index }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Số chiều tối đa</span>
            <span class="detail-val">{{ db.maxDim }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tình huống phù hợp</span>
            <span class="detail-val">{{ db.useCase }}</span>
          </div>
          <p class="detail-desc">{{ db.description }}</p>
        </div>

        <div class="card-metrics">
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.perf + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">Hiệu năng</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.ease + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">Dễ dùng</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.scale + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">Mở rộng</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-section">
      <h5>Gợi ý theo tình huống</h5>
      <div class="scenario-grid">
        <div
          v-for="s in scenarios"
          :key="s.title"
          class="scenario-card"
        >
          <div class="scenario-icon">{{ s.icon }}</div>
          <div class="scenario-title">{{ s.title }}</div>
          <div class="scenario-rec">{{ s.recommend }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const databases = [
  {
    name: 'Pinecone',
    type: 'Cloud quản lý hoàn toàn',
    icon: 'P',
    color: '#3b82f6',
    tags: ['Cloud-native', 'Serverless'],
    license: 'Thương mại',
    index: 'Proprietary ANN',
    maxDim: '20,000',
    useCase: 'Ứng dụng AI cần lên nhanh',
    description: 'Vector database quản lý hoàn toàn, không cần vận hành, tính theo lượng dùng. Phù hợp startup và prototype nhanh.',
    perf: 85,
    ease: 95,
    scale: 80
  },
  {
    name: 'Milvus',
    type: 'Mã nguồn mở, phân tán',
    icon: 'M',
    color: '#10b981',
    tags: ['Open source', 'Phân tán', 'Hiệu năng cao'],
    license: 'Apache 2.0',
    index: 'IVF / HNSW / DiskANN',
    maxDim: '32,768',
    useCase: 'Retrieval quy mô lớn cấp doanh nghiệp',
    description: 'Database phân tán hỗ trợ hàng tỷ vector, đa dạng kiểu index và truy vấn hybrid.',
    perf: 95,
    ease: 65,
    scale: 95
  },
  {
    name: 'Weaviate',
    type: 'Mã nguồn mở, AI-native',
    icon: 'W',
    color: '#8b5cf6',
    tags: ['Open source', 'GraphQL', 'Modular'],
    license: 'BSD-3',
    index: 'HNSW',
    maxDim: '65,536',
    useCase: 'Tìm kiếm ngữ nghĩa và đa phương thức',
    description: 'Có sẵn module vector hóa, hỗ trợ tự embedding và retrieval cho dữ liệu đa phương thức như văn bản, ảnh.',
    perf: 80,
    ease: 85,
    scale: 80
  },
  {
    name: 'Chroma',
    type: 'Nhẹ, embedded',
    icon: 'C',
    color: '#f59e0b',
    tags: ['Open source', 'Gọn nhẹ', 'Python'],
    license: 'Apache 2.0',
    index: 'HNSW',
    maxDim: 'Không giới hạn',
    useCase: 'Phát triển local và prototype RAG',
    description: 'API cực gọn, vài dòng code là tích hợp xong. Rất hợp hệ sinh thái LangChain / LlamaIndex.',
    perf: 60,
    ease: 98,
    scale: 40
  },
  {
    name: 'pgvector',
    type: 'Extension cho PostgreSQL',
    icon: 'pg',
    color: '#ef4444',
    tags: ['SQL', 'PostgreSQL', 'Extension'],
    license: 'PostgreSQL',
    index: 'IVFFlat / HNSW',
    maxDim: '16,000',
    useCase: 'Đội đã có sẵn hạ tầng PostgreSQL',
    description: 'Bổ sung khả năng vector vào PostgreSQL có sẵn mà không cần thêm database mới. Hỗ trợ truy vấn SQL hybrid.',
    perf: 65,
    ease: 80,
    scale: 60
  }
]

const scenarios = [
  { icon: '&#x1F680;', title: 'Prototype nhanh', recommend: 'Chroma / Pinecone' },
  { icon: '&#x1F3E2;', title: 'Triển khai doanh nghiệp', recommend: 'Milvus / Weaviate' },
  { icon: '&#x1F4BE;', title: 'Đã có PostgreSQL', recommend: 'pgvector' },
  { icon: '&#x1F916;', title: 'Ứng dụng RAG', recommend: 'Chroma / Weaviate' }
]
</script>

<style scoped>
.vdb-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.db-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.db-card:hover {
  border-color: var(--vp-c-text-3);
}

.db-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.db-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.db-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.db-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 0.6rem;
}

.tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.card-detail {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.6rem;
  margin-bottom: 0.6rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 3px 0;
}

.detail-label {
  color: var(--vp-c-text-3);
}

.detail-val {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-align: right;
}

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

.card-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 6px;
}

.metric-bar-wrap {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.metric-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  width: 40px;
  text-align: right;
}

.scenario-section h5 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.scenario-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.scenario-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.scenario-rec {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 500;
}

@media (max-width: 640px) {
  .db-grid {
    grid-template-columns: 1fr;
  }

  .scenario-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vdb-demo {
    padding: 1rem;
  }
}
</style>
