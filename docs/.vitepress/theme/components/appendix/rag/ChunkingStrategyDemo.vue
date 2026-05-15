<!--
  ChunkingStrategyDemo.vue
  Demo tương tác các chiến lược chunking văn bản

  Mục đích:
  Trình bày các chiến lược chunking khác nhau (fixed-size, theo câu, semantic, recursive),
  user có thể nhập văn bản và quan sát cách mỗi chiến lược cắt.

  Tính năng:
  - Nhập văn bản tùy ý hoặc dùng mẫu có sẵn
  - Chuyển giữa các chiến lược chunking
  - Trực quan hóa kết quả và ranh giới các chunk
-->
<template>
  <div class="chunking-demo">
    <div class="input-section">
      <div class="section-header">
        <span class="section-title">Văn bản đầu vào</span>
        <button
          class="preset-btn"
          @click="usePreset"
        >
          Dùng văn bản mẫu
        </button>
      </div>
      <textarea
        v-model="inputText"
        class="text-input"
        rows="4"
        placeholder="Nhập văn bản cần chunking, hoặc bấm 'Dùng văn bản mẫu'..."
      />
    </div>

    <div class="strategy-selector">
      <button
        v-for="s in strategies"
        :key="s.id"
        :class="['strategy-btn', { active: currentStrategy === s.id }]"
        @click="currentStrategy = s.id"
      >
        <span class="strategy-icon">{{ s.icon }}</span>
        <span class="strategy-name">{{ s.name }}</span>
      </button>
    </div>

    <div class="strategy-info">
      <div class="info-title">{{ activeStrategy.name }}</div>
      <div class="info-desc">{{ activeStrategy.desc }}</div>
      <div class="info-params">
        <span
          v-for="(p, i) in activeStrategy.params"
          :key="i"
          class="param-tag"
        >
          {{ p }}
        </span>
      </div>
    </div>

    <div class="result-section">
      <div class="result-header">
        Kết quả chunking
        <span class="chunk-count">Tổng {{ chunks.length }} chunk</span>
      </div>
      <div class="chunks-container">
        <div
          v-for="(chunk, i) in chunks"
          :key="i"
          class="chunk-item"
          :style="{ borderLeftColor: chunkColors[i % chunkColors.length] }"
        >
          <div class="chunk-meta">
            <span
              class="chunk-index"
              :style="{ background: chunkColors[i % chunkColors.length] }"
            >
              #{{ i + 1 }}
            </span>
            <span class="chunk-size">{{ chunk.length }} ký tự</span>
          </div>
          <div class="chunk-text">{{ chunk }}</div>
        </div>
        <div
          v-if="chunks.length === 0"
          class="empty-hint"
        >
          Hãy nhập văn bản để xem kết quả chunking
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Chiến lược</th>
            <th>Ưu điểm</th>
            <th>Nhược điểm</th>
            <th>Tình huống phù hợp</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in strategies"
            :key="s.id"
            :class="{ highlight: currentStrategy === s.id }"
          >
            <td class="strategy-cell">{{ s.icon }} {{ s.name }}</td>
            <td>{{ s.pros }}</td>
            <td>{{ s.cons }}</td>
            <td>{{ s.useCase }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chunkColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const presetText = 'AI (Trí tuệ nhân tạo) là một nhánh của khoa học máy tính, hướng tới xây dựng các hệ thống mô phỏng được trí tuệ con người. Machine learning là một trong những phương pháp cốt lõi của AI, cho phép máy tính học quy luật từ dữ liệu. Deep learning là tập con của machine learning, dùng neural network nhiều tầng để xử lý các bài toán phức tạp. NLP (Natural Language Processing) giúp máy tính hiểu và sinh ngôn ngữ con người. Các LLM như GPT và Claude được huấn luyện trên khối lượng văn bản khổng lồ, có khả năng hiểu và sinh ngôn ngữ rất mạnh. Kỹ thuật RAG (Retrieval-Augmented Generation) cải thiện rõ rệt độ chính xác và tính thời sự của câu trả lời LLM bằng cách retrieve tài liệu liên quan trước khi sinh. Vector database là thành phần then chốt của hệ thống RAG, lưu và tìm kiếm hiệu quả các vector biểu diễn văn bản.'

const inputText = ref('')
const currentStrategy = ref('fixed')

const strategies = [
  {
    id: 'fixed',
    name: 'Kích thước cố định',
    icon: '📏',
    desc: 'Cắt văn bản theo số ký tự cố định, là cách chunking đơn giản nhất. Thường có vùng overlap để tránh mất context tại ranh giới cắt.',
    params: ['Chunk size: 80 ký tự', 'Overlap: 20 ký tự'],
    pros: 'Đơn giản, kích thước đều',
    cons: 'Có thể cắt giữa câu',
    useCase: 'Văn bản dài, ít cấu trúc'
  },
  {
    id: 'sentence',
    name: 'Theo câu',
    icon: '📝',
    desc: 'Dùng dấu chấm, hỏi, cảm thán... làm dấu phân tách, cắt theo câu hoàn chỉnh. Mỗi chunk là tập hợp các câu trọn vẹn về nghĩa.',
    params: ['2-3 câu mỗi chunk', 'Dấu phân tách: .?!'],
    pros: 'Giữ nguyên câu',
    cons: 'Kích thước chunk không đều',
    useCase: 'Bài viết, báo cáo và văn bản tự nhiên'
  },
  {
    id: 'semantic',
    name: 'Semantic chunking',
    icon: '🧠',
    desc: 'Chunking dựa trên độ tương đồng ngữ nghĩa. Khi sự khác biệt ngữ nghĩa giữa các câu liền kề vượt ngưỡng thì cắt. Giữ tính liền mạch chủ đề tốt hơn.',
    params: ['Ngưỡng tương đồng: 0.7', 'Chunk tối thiểu: 50 ký tự'],
    pros: 'Liền mạch chủ đề, trọn nghĩa',
    cons: 'Chi phí tính cao, cần embedding model',
    useCase: 'Tài liệu phức tạp, nhiều chủ đề trộn lẫn'
  },
  {
    id: 'recursive',
    name: 'Recursive chunking',
    icon: '🔄',
    desc: 'Cắt đệ quy qua nhiều mức dấu phân tách: trước hết theo đoạn, đoạn quá dài thì theo câu, câu quá dài thì theo kích thước cố định. Là chiến lược mặc định của LangChain.',
    params: ['Dấu cắt: \\n\\n → . → cố định', 'Mục tiêu: 80 ký tự'],
    pros: 'Cân bằng giữa cấu trúc và kích thước',
    cons: 'Triển khai phức tạp hơn',
    useCase: 'Tình huống chung, lựa chọn mặc định khuyến nghị'
  }
]

const activeStrategy = computed(() => strategies.find((s) => s.id === currentStrategy.value))

const chunks = computed(() => {
  const text = inputText.value.trim()
  if (!text) return []

  switch (currentStrategy.value) {
    case 'fixed':
      return chunkFixed(text, 80, 20)
    case 'sentence':
      return chunkBySentence(text, 3)
    case 'semantic':
      return chunkSemantic(text)
    case 'recursive':
      return chunkRecursive(text, 80)
    default:
      return []
  }
})

function chunkFixed(text, size, overlap) {
  const result = []
  let start = 0
  while (start < text.length) {
    result.push(text.slice(start, start + size))
    start += size - overlap
  }
  return result
}

function chunkBySentence(text, perChunk) {
  const sentences = text.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
  const result = []
  for (let i = 0; i < sentences.length; i += perChunk) {
    result.push(sentences.slice(i, i + perChunk).join(''))
  }
  return result
}

function chunkSemantic(text) {
  const sentences = text.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
  const result = []
  let current = ''
  const keywords = ['AI', 'LLM', 'RAG', 'NLP', 'machine learning', 'deep learning', 'vector']
  let prevKeywords = new Set()

  for (const s of sentences) {
    const curKeywords = new Set(keywords.filter((k) => s.includes(k)))
    const overlap = [...curKeywords].filter((k) => prevKeywords.has(k)).length
    const similarity = prevKeywords.size > 0 ? overlap / Math.max(prevKeywords.size, curKeywords.size) : 1

    if (current && similarity < 0.5 && current.length > 50) {
      result.push(current)
      current = s
    } else {
      current += s
    }
    prevKeywords = curKeywords
  }
  if (current) result.push(current)
  return result
}

function chunkRecursive(text, target) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim())
  const result = []
  for (const para of paragraphs) {
    if (para.length <= target) {
      result.push(para)
    } else {
      const sentences = para.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
      let current = ''
      for (const s of sentences) {
        if ((current + s).length > target && current) {
          result.push(current)
          current = s
        } else {
          current += s
        }
      }
      if (current) result.push(current)
    }
  }
  return result
}

function usePreset() {
  inputText.value = presetText
}
</script>

<style scoped>
.chunking-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.section-title {
  font-weight: 600;
  font-size: 14px;
}
.preset-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 12px;
}
.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  box-sizing: border-box;
}
.strategy-selector {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
}
.strategy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}
.strategy-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.strategy-icon {
  font-size: 16px;
}
.strategy-info {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.info-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.info-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 8px;
}
.info-params {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.param-tag {
  padding: 2px 10px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: monospace;
}
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}
.chunk-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-weight: 400;
}
.chunks-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chunk-item {
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid;
}
.chunk-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.chunk-index {
  padding: 1px 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}
.chunk-size {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.chunk-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  word-break: break-all;
}
.empty-hint {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}
.comparison-table {
  margin-top: 16px;
  overflow-x: auto;
}
.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.comparison-table th,
.comparison-table td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.comparison-table th {
  background: var(--vp-c-bg);
  font-weight: 600;
}
.comparison-table tr.highlight {
  background: var(--vp-c-brand-soft);
}
.strategy-cell {
  white-space: nowrap;
}
</style>
