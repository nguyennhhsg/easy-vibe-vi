<!--
  RAGPipelineDemo.vue
  Demo trực quan toàn bộ quy trình RAG

  Mục đích:
  Hiển thị quy trình RAG cốt lõi: user hỏi → retrieval → ghép context → LLM sinh → trả kết quả.
  User có thể bấm từng bước để quan sát luồng dữ liệu qua từng giai đoạn.

  Tính năng:
  - Bấm "Bước kế" để đi tới từng giai đoạn
  - Mỗi giai đoạn được highlight và giải thích
  - Có thể chọn câu hỏi mẫu khác nhau
-->
<template>
  <div class="rag-pipeline-demo">
    <div class="query-selector">
      <span class="label">Chọn câu hỏi:</span>
      <button
        v-for="(q, i) in queries"
        :key="i"
        :class="['query-btn', { active: currentQuery === i }]"
        @click="selectQuery(i)"
      >
        {{ q.short }}
      </button>
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="i"
        :class="['stage', { active: currentStep >= i, current: currentStep === i }]"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div
          v-if="currentStep >= i"
          class="stage-content"
        >
          {{ getStageContent(i) }}
        </div>
        <div
          v-if="i < stages.length - 1"
          :class="['arrow', { active: currentStep > i }]"
        >
          →
        </div>
      </div>
    </div>

    <div class="detail-panel">
      <div class="detail-title">{{ stages[currentStep]?.name }} — Mô tả chi tiết</div>
      <div class="detail-desc">{{ stages[currentStep]?.desc }}</div>
      <div
        v-if="currentStep >= 1 && currentStep <= 2"
        class="retrieved-docs"
      >
        <div class="doc-title">Các đoạn tài liệu retrieve được:</div>
        <div
          v-for="(doc, i) in queries[currentQuery].docs"
          :key="i"
          :class="['doc-item', { visible: currentStep >= 2 }]"
        >
          <span class="doc-score">Liên quan {{ doc.score }}</span>
          <span class="doc-text">{{ doc.text }}</span>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="ctrl-btn"
        :disabled="currentStep <= 0"
        @click="prevStep"
      >
        ← Bước trước
      </button>
      <span class="step-indicator">{{ currentStep + 1 }} / {{ stages.length }}</span>
      <button
        class="ctrl-btn primary"
        :disabled="currentStep >= stages.length - 1"
        @click="nextStep"
      >
        Bước kế →
      </button>
      <button
        class="ctrl-btn"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stages = [
  {
    name: 'User hỏi',
    icon: '💬',
    desc: 'User đưa cho hệ thống một câu hỏi bằng ngôn ngữ tự nhiên. Câu hỏi sẽ được chuyển thành vector để phục vụ retrieval ngữ nghĩa ở bước sau.'
  },
  {
    name: 'Retrieval ngữ nghĩa',
    icon: '🔍',
    desc: 'Hệ thống encode câu hỏi thành vector, tìm trong vector database các đoạn tài liệu có nghĩa gần nhất. Thường dùng cosine similarity hoặc dot product để đo độ liên quan.'
  },
  {
    name: 'Ghép context',
    icon: '📋',
    desc: 'Ghép Top-K đoạn tài liệu retrieve được với câu hỏi gốc thành một prompt hoàn chỉnh. Prompt này nói với LLM: "Hãy trả lời dựa trên tài liệu tham khảo sau".'
  },
  {
    name: 'LLM sinh',
    icon: '🤖',
    desc: 'LLM nhận prompt đã ghép và sinh câu trả lời dựa trên context được retrieve. Nhờ có tài liệu tham khảo thực, câu trả lời chính xác và đáng tin hơn.'
  },
  {
    name: 'Trả kết quả',
    icon: '✅',
    desc: 'Hệ thống trả câu trả lời của LLM về cho user. Các hệ thống nâng cao còn kèm trích dẫn nguồn để user kiểm chứng độ tin cậy.'
  }
]

const queries = [
  {
    short: 'Chính sách nghỉ phép',
    question: 'Chính sách nghỉ phép năm của công ty mình thế nào?',
    docs: [
      { score: '0.95', text: 'Nhân viên đủ 1 năm thâm niên được 10 ngày phép có lương, đủ 5 năm tăng lên 15 ngày.' },
      { score: '0.87', text: 'Nghỉ phép cần đăng ký trước 3 ngày làm việc, có duyệt của quản lý trực tiếp.' },
      { score: '0.72', text: 'Phép chưa dùng có thể chuyển sang quý I năm sau, quá hạn sẽ bị hủy.' }
    ],
    answer: 'Theo quy định, đủ 1 năm thâm niên được 10 ngày phép có lương, đủ 5 năm là 15 ngày. Cần đăng ký trước 3 ngày làm việc và được quản lý duyệt; phép chưa dùng có thể chuyển sang quý I năm sau.'
  },
  {
    short: 'Quy tắc rate limit API',
    question: 'Quy tắc rate limit của API bên mình ra sao?',
    docs: [
      { score: '0.93', text: 'User miễn phí giới hạn 60 request/phút, user trả phí giới hạn 600.' },
      { score: '0.85', text: 'Vượt giới hạn sẽ trả HTTP 429, cần đợi 60 giây mới thử lại.' },
      { score: '0.68', text: 'User Enterprise có thể xin quota tùy chỉnh, tối đa 10000 request/phút.' }
    ],
    answer: 'User miễn phí giới hạn 60 request/phút, trả phí 600. Vượt giới hạn trả 429, cần đợi 60 giây. Enterprise có thể xin tối đa 10000 request/phút.'
  }
]

const currentQuery = ref(0)
const currentStep = ref(0)

function selectQuery(i) {
  currentQuery.value = i
  currentStep.value = 0
}

function getStageContent(i) {
  const q = queries[currentQuery.value]
  if (i === 0) return q.question
  if (i === 1) return `Tìm thấy ${q.docs.length} đoạn liên quan`
  if (i === 2) return 'Câu hỏi + tài liệu → Prompt'
  if (i === 3) return 'Đang sinh câu trả lời dựa trên context...'
  if (i === 4) return q.answer
  return ''
}

function nextStep() {
  if (currentStep.value < stages.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}
function reset() {
  currentStep.value = 0
}
</script>

<style scoped>
.rag-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.query-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.query-selector .label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.query-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.query-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow-x: auto;
  padding: 12px 0;
}
.stage {
  flex: 1;
  min-width: 100px;
  text-align: center;
  padding: 12px 8px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  opacity: 0.5;
  transition: all 0.3s;
  position: relative;
}
.stage.active {
  opacity: 1;
}
.stage.current {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1-rgb, 100, 108, 255), 0.15);
}
.stage-icon {
  font-size: 24px;
  margin-bottom: 4px;
}
.stage-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.stage-content {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 6px;
  line-height: 1.4;
}
.arrow {
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--vp-c-divider);
  z-index: 1;
  transition: color 0.3s;
}
.arrow.active {
  color: var(--vp-c-brand-1);
}
.detail-panel {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--vp-c-brand-1);
}
.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.retrieved-docs {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
}
.doc-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}
.doc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  margin-bottom: 4px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}
.doc-item.visible {
  opacity: 1;
}
.doc-score {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
}
.doc-text {
  color: var(--vp-c-text-2);
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.ctrl-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.ctrl-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.step-indicator {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
