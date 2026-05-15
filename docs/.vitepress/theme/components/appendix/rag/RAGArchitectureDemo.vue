<!--
  RAGArchitectureDemo.vue
  Demo tương tác về sự tiến hóa của kiến trúc RAG

  Mục đích:
  Hiển thị ba kiến trúc RAG: Naive RAG, Advanced RAG, Modular RAG.
  User có thể chuyển qua lại để xem sơ đồ và đặc điểm từng kiến trúc.

  Tính năng:
  - Chuyển giữa ba kiến trúc
  - Xem các node trong sơ đồ
  - So sánh ưu nhược điểm
-->
<template>
  <div class="rag-arch-demo">
    <div class="arch-tabs">
      <button
        v-for="(arch, i) in architectures"
        :key="i"
        :class="['arch-tab', { active: currentArch === i }]"
        @click="currentArch = i"
      >
        <span class="tab-badge">{{ arch.badge }}</span>
        <span class="tab-name">{{ arch.name }}</span>
      </button>
    </div>

    <div class="arch-desc">
      {{ activeArch.desc }}
    </div>

    <div class="flow-diagram">
      <div
        v-for="(node, j) in activeArch.nodes"
        :key="j"
        class="flow-node-wrapper"
      >
        <div
          :class="['flow-node', node.type]"
          @click="selectedNode = selectedNode === j ? null : j"
        >
          <div class="node-icon">{{ node.icon }}</div>
          <div class="node-label">{{ node.label }}</div>
        </div>
        <div
          v-if="j < activeArch.nodes.length - 1"
          class="flow-connector"
        >
          <span class="connector-arrow">→</span>
          <span
            v-if="node.connectorLabel"
            class="connector-label"
          >{{ node.connectorLabel }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="selectedNode !== null"
      class="node-detail"
    >
      <div class="node-detail-title">
        {{ activeArch.nodes[selectedNode].icon }}
        {{ activeArch.nodes[selectedNode].label }}
      </div>
      <div class="node-detail-desc">
        {{ activeArch.nodes[selectedNode].detail }}
      </div>
    </div>
    <div
      v-else
      class="node-hint"
    >
      Bấm vào node trong sơ đồ để xem chi tiết
    </div>

    <div class="arch-features">
      <div class="feature-title">Đặc điểm kiến trúc</div>
      <div class="feature-grid">
        <div
          v-for="(f, i) in activeArch.features"
          :key="i"
          class="feature-item"
        >
          <span class="feature-icon">{{ f.icon }}</span>
          <span class="feature-text">{{ f.text }}</span>
        </div>
      </div>
    </div>

    <div class="evolution-bar">
      <div class="evo-title">Lộ trình tiến hóa kiến trúc</div>
      <div class="evo-track">
        <div
          v-for="(arch, i) in architectures"
          :key="i"
          :class="['evo-node', { active: currentArch >= i }]"
        >
          <div class="evo-dot" />
          <div class="evo-label">{{ arch.name }}</div>
          <div class="evo-year">{{ arch.year }}</div>
        </div>
        <div class="evo-line">
          <div
            class="evo-line-fill"
            :style="{ width: (currentArch / (architectures.length - 1)) * 100 + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentArch = ref(0)
const selectedNode = ref(null)

watch(currentArch, () => { selectedNode.value = null })

const architectures = [
  {
    name: 'Naive RAG',
    badge: 'v1',
    year: '2023',
    desc: 'Kiến trúc RAG cơ bản nhất, quy trình đơn giản: index → retrieval → sinh. Phù hợp dựng prototype nhanh, nhưng hiệu quả hạn chế ở các tình huống phức tạp.',
    nodes: [
      { icon: '📄', label: 'Nạp tài liệu', type: 'input', detail: 'Nạp tài liệu gốc (PDF, web, database...) vào hệ thống, thực hiện trích xuất và làm sạch văn bản cơ bản.', connectorLabel: '' },
      { icon: '✂️', label: 'Chunking', type: 'process', detail: 'Cắt tài liệu dài thành các chunk có kích thước cố định, thường 200-500 token mỗi chunk.', connectorLabel: '' },
      { icon: '🔢', label: 'Vector hóa', type: 'process', detail: 'Dùng embedding model chuyển mỗi chunk thành vector, lưu vào vector database.', connectorLabel: '' },
      { icon: '🔍', label: 'Retrieval', type: 'process', detail: 'Khi user hỏi, vector hóa câu hỏi rồi tìm các chunk gần nhất trong vector database.', connectorLabel: '' },
      { icon: '🤖', label: 'Sinh', type: 'output', detail: 'Ghép chunk retrieve được với câu hỏi thành prompt, đưa cho LLM để sinh câu trả lời.' }
    ],
    features: [
      { icon: '✅', text: 'Triển khai đơn giản, dễ làm quen' },
      { icon: '✅', text: 'Phù hợp với kho tri thức có cấu trúc' },
      { icon: '⚠️', text: 'Chất lượng retrieval phụ thuộc cách chunking' },
      { icon: '❌', text: 'Không xử lý được truy vấn phức tạp' }
    ]
  },
  {
    name: 'Advanced RAG',
    badge: 'v2',
    year: '2024',
    desc: 'Trên nền Naive RAG, bổ sung tối ưu truy vấn và xử lý sau retrieval, giúp tăng đáng kể chất lượng retrieval và độ chính xác câu trả lời.',
    nodes: [
      { icon: '💬', label: 'Truy vấn user', type: 'input', detail: 'Nhận câu hỏi gốc của user.', connectorLabel: '' },
      { icon: '🔄', label: 'Viết lại truy vấn', type: 'enhance', detail: 'Dùng LLM để viết lại, mở rộng hoặc phân rã truy vấn gốc. Ví dụ chuyển câu hỏi mơ hồ thành truy vấn cụ thể hơn, hoặc tách thành nhiều câu con.', connectorLabel: '' },
      { icon: '🔍', label: 'Hybrid retrieval', type: 'process', detail: 'Dùng song song retrieval theo vector (ngữ nghĩa) và keyword (BM25), kết hợp kết quả để vừa hiểu ngữ nghĩa vừa khớp chính xác.', connectorLabel: '' },
      { icon: '📊', label: 'Rerank', type: 'enhance', detail: 'Dùng cross-encoder để sắp xếp lại kết quả retrieval một cách tinh hơn, loại bỏ đoạn không liên quan.', connectorLabel: '' },
      { icon: '📋', label: 'Nén context', type: 'enhance', detail: 'Trích phần liên quan nhất với câu hỏi từ các tài liệu retrieve được, bỏ phần dư thừa để tiết kiệm context window.', connectorLabel: '' },
      { icon: '🤖', label: 'Sinh', type: 'output', detail: 'Sinh câu trả lời chất lượng cao dựa trên context đã tối ưu.' }
    ],
    features: [
      { icon: '✅', text: 'Viết lại truy vấn tăng recall' },
      { icon: '✅', text: 'Hybrid retrieval cân bằng ngữ nghĩa & keyword' },
      { icon: '✅', text: 'Rerank tăng độ chính xác đáng kể' },
      { icon: '⚠️', text: 'Quy trình dài hơn, độ trễ tăng' }
    ]
  },
  {
    name: 'Modular RAG',
    badge: 'v3',
    year: '2025',
    desc: 'Tách RAG thành các module có thể cắm-tháo, hỗ trợ kết hợp và định tuyến linh hoạt. Có thể chọn quy trình tối ưu theo loại truy vấn.',
    nodes: [
      { icon: '💬', label: 'Truy vấn user', type: 'input', detail: 'Nhận câu hỏi gốc của user.', connectorLabel: '' },
      { icon: '🧭', label: 'Định tuyến', type: 'enhance', detail: 'Phân tích ý định truy vấn, quyết định đi nhánh nào: câu đơn giản trả lời thẳng, câu phức tạp đi retrieval, câu nhiều bước thì phân rã.', connectorLabel: '' },
      { icon: '🔀', label: 'Chuyển dạng truy vấn', type: 'enhance', detail: 'Dựa trên kết quả định tuyến để chọn chiến lược: HyDE (Hypothetical Document Embeddings), Step-back, phân rã truy vấn con...', connectorLabel: '' },
      { icon: '🔍', label: 'Adaptive retrieval', type: 'process', detail: 'Tự chọn chiến lược retrieval theo đặc điểm truy vấn: vector, graph, SQL hoặc kết hợp nhiều cách.', connectorLabel: '' },
      { icon: '🔄', label: 'Tự phản tỉnh', type: 'enhance', detail: 'LLM tự đánh giá xem kết quả retrieval đã đủ chưa, nếu chưa thì retrieval lần nữa hoặc đổi chiến lược (Self-RAG / CRAG).', connectorLabel: '' },
      { icon: '🤖', label: 'Sinh', type: 'output', detail: 'Sinh câu trả lời cuối dựa trên context đã kiểm chứng kỹ, kèm điểm tin cậy.' }
    ],
    features: [
      { icon: '✅', text: 'Thiết kế module hóa, dễ mở rộng' },
      { icon: '✅', text: 'Định tuyến thích ứng, chọn chiến lược thông minh' },
      { icon: '✅', text: 'Cơ chế tự phản tỉnh tăng độ tin cậy' },
      { icon: '⚠️', text: 'Độ phức tạp cao, cần tinh chỉnh kỹ' }
    ]
  }
]

const activeArch = computed(() => architectures[currentArch.value])
</script>

<style scoped>
.rag-arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.arch-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.arch-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}
.arch-tab.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.tab-badge {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  font-size: 11px;
  font-weight: 700;
}
.arch-tab.active .tab-badge {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.tab-name {
  font-weight: 600;
}
.arch-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.flow-diagram {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 12px;
}
.flow-node-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.flow-node {
  padding: 10px 14px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;
}
.flow-node:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.flow-node.input {
  border-color: #3b82f6;
  background: #eff6ff;
}
.flow-node.output {
  border-color: #10b981;
  background: #ecfdf5;
}
.flow-node.enhance {
  border-color: #f59e0b;
  background: #fffbeb;
}
.flow-node.process {
  border-color: #8b5cf6;
  background: #f5f3ff;
}
.node-icon {
  font-size: 20px;
  margin-bottom: 2px;
}
.node-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.flow-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 4px;
}
.connector-arrow {
  font-size: 16px;
  color: var(--vp-c-text-3);
}
.connector-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
}
.node-detail {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand-1);
  margin-bottom: 16px;
}
.node-detail-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.node-detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.node-hint {
  text-align: center;
  padding: 12px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin-bottom: 16px;
}
.feature-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
}
.feature-icon {
  flex-shrink: 0;
}
.feature-text {
  color: var(--vp-c-text-2);
}
.evolution-bar {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.evo-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 16px;
  text-align: center;
}
.evo-track {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
}
.evo-node {
  text-align: center;
  z-index: 1;
  opacity: 0.4;
  transition: opacity 0.3s;
}
.evo-node.active {
  opacity: 1;
}
.evo-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  margin: 0 auto 6px;
  transition: background 0.3s;
}
.evo-node.active .evo-dot {
  background: var(--vp-c-brand-1);
}
.evo-label {
  font-size: 12px;
  font-weight: 600;
}
.evo-year {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.evo-line {
  position: absolute;
  top: 6px;
  left: 20px;
  right: 20px;
  height: 2px;
  background: var(--vp-c-divider);
}
.evo-line-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.5s;
}
</style>
