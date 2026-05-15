<!--
  RAGvsFineTuningDemo.vue
  Demo so sánh RAG vs fine-tuning

  Mục đích:
  So sánh song song ưu nhược điểm của RAG và fine-tuning,
  giúp user hiểu khi nào nên chọn cách nào.

  Tính năng:
  - Chuyển giữa các góc so sánh
  - Chọn tình huống để được gợi ý phương án
-->
<template>
  <div class="rag-vs-ft-demo">
    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: view === 'compare' }]"
        @click="view = 'compare'"
      >
        So sánh theo tiêu chí
      </button>
      <button
        :class="['toggle-btn', { active: view === 'scenario' }]"
        @click="view = 'scenario'"
      >
        Gợi ý theo tình huống
      </button>
    </div>

    <div
      v-if="view === 'compare'"
      class="compare-view"
    >
      <div class="compare-header">
        <div class="col-label rag-label">RAG (Retrieval-Augmented Generation)</div>
        <div class="col-label vs-label">VS</div>
        <div class="col-label ft-label">Fine-tuning</div>
      </div>

      <div
        v-for="(dim, i) in dimensions"
        :key="i"
        class="compare-row"
      >
        <div class="dim-name">{{ dim.name }}</div>
        <div class="dim-content">
          <div class="rag-side">
            <div class="score-bar">
              <div
                class="score-fill rag-fill"
                :style="{ width: dim.ragScore + '%' }"
              />
            </div>
            <div class="side-text">{{ dim.ragText }}</div>
          </div>
          <div class="dim-icon">{{ dim.icon }}</div>
          <div class="ft-side">
            <div class="score-bar">
              <div
                class="score-fill ft-fill"
                :style="{ width: dim.ftScore + '%' }"
              />
            </div>
            <div class="side-text">{{ dim.ftText }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="view === 'scenario'"
      class="scenario-view"
    >
      <div class="scenario-question">Nhu cầu của bạn là gì?</div>
      <div class="scenario-grid">
        <div
          v-for="(s, i) in scenarios"
          :key="i"
          :class="['scenario-card', { selected: selectedScenario === i }]"
          @click="selectedScenario = i"
        >
          <div class="scenario-icon">{{ s.icon }}</div>
          <div class="scenario-name">{{ s.name }}</div>
          <div class="scenario-desc">{{ s.desc }}</div>
          <div :class="['recommendation', s.recommend]">
            {{ s.recommend === 'rag' ? 'Nên dùng RAG' : s.recommend === 'ft' ? 'Nên fine-tuning' : 'Kết hợp cả hai' }}
          </div>
        </div>
      </div>

      <div
        v-if="selectedScenario !== null"
        class="scenario-detail"
      >
        <div class="detail-title">{{ scenarios[selectedScenario].name }} — Phân tích chi tiết</div>
        <div class="detail-reason">{{ scenarios[selectedScenario].reason }}</div>
      </div>
    </div>

    <div class="summary-box">
      <div class="summary-title">Tóm lại một câu</div>
      <div class="summary-text">
        RAG giống như cho mô hình một <strong>tủ sách tham khảo được cập nhật liên tục</strong>, phù hợp khi tri thức thay đổi thường xuyên;
        Fine-tuning giống như cho mô hình <strong>học một môn chuyên ngành</strong>, phù hợp khi cần phong cách riêng hoặc chuyên sâu lĩnh vực.
        Trong thực tế, hai cách này thường được kết hợp.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('compare')
const selectedScenario = ref(null)

const dimensions = [
  {
    name: 'Tốc độ cập nhật tri thức',
    icon: '⚡',
    ragScore: 95,
    ragText: 'Cập nhật ngay, sửa tài liệu là có hiệu lực',
    ftScore: 25,
    ftText: 'Phải huấn luyện lại, chu kỳ dài'
  },
  {
    name: 'Chi phí triển khai',
    icon: '💰',
    ragScore: 80,
    ragText: 'Dựng hệ thống retrieval, chi phí vừa phải',
    ftScore: 35,
    ftText: 'Cần GPU và dữ liệu đã gán nhãn'
  },
  {
    name: 'Kiểm soát phong cách trả lời',
    icon: '🎨',
    ragScore: 40,
    ragText: 'Phụ thuộc prompt engineering',
    ftScore: 90,
    ftText: 'Có thể tùy biến sâu phong cách đầu ra'
  },
  {
    name: 'Kiểm soát ảo giác (hallucination)',
    icon: '🎯',
    ragScore: 85,
    ragText: 'Có nguồn để kiểm chứng, truy vết được',
    ftScore: 50,
    ftText: 'Vẫn có thể sinh ảo giác'
  },
  {
    name: 'Độ trễ inference',
    icon: '⏱️',
    ragScore: 55,
    ragText: 'Cần thêm bước retrieval',
    ftScore: 85,
    ftText: 'Sinh trực tiếp, không có overhead thêm'
  },
  {
    name: 'An toàn dữ liệu riêng',
    icon: '🔒',
    ragScore: 90,
    ragText: 'Dữ liệu nằm ở local, không vào mô hình',
    ftScore: 45,
    ftText: 'Dữ liệu được nhúng vào trọng số mô hình'
  }
]

const scenarios = [
  {
    icon: '📚',
    name: 'Hỏi đáp kho tri thức doanh nghiệp',
    desc: 'Tài liệu nội bộ, chính sách, FAQ thường xuyên thay đổi',
    recommend: 'rag',
    reason: 'Nội dung kho tri thức doanh nghiệp cập nhật thường xuyên; dùng RAG sẽ có hiệu lực ngay sau khi sửa tài liệu, không cần huấn luyện lại. Dữ liệu cũng nằm ở local, đáp ứng yêu cầu an toàn.'
  },
  {
    icon: '🏥',
    name: 'Sinh báo cáo y tế',
    desc: 'Văn bản chuyên ngành cần tuân thủ nghiêm format và thuật ngữ',
    recommend: 'ft',
    reason: 'Báo cáo y tế có yêu cầu nghiêm về format và thuật ngữ chuyên ngành; fine-tuning giúp mô hình học sâu các mẫu này và sinh nội dung đúng chuẩn ngành.'
  },
  {
    icon: '💬',
    name: 'Hệ thống chatbot CSKH',
    desc: 'Vừa trả lời chính xác về sản phẩm, vừa giữ tone thương hiệu',
    recommend: 'both',
    reason: 'Hệ thống CSKH cần RAG để tra cứu thông tin sản phẩm và giải pháp mới nhất, đồng thời cần fine-tuning để giữ tone và phong cách hội thoại nhất quán. Kết hợp cả hai là tốt nhất.'
  },
  {
    icon: '📰',
    name: 'Tóm tắt tin tức thời gian thực',
    desc: 'Cần sinh tóm tắt dựa trên thông tin mới nhất',
    recommend: 'rag',
    reason: 'Nội dung tin tức thay đổi liên tục; RAG có thể retrieve nguồn tin mới và sinh tóm tắt, còn fine-tuning không kịp tốc độ cập nhật.'
  },
  {
    icon: '✍️',
    name: 'Viết theo phong cách cụ thể',
    desc: 'Bắt chước phong cách của tác giả hoặc thương hiệu',
    recommend: 'ft',
    reason: 'Phong cách viết là một dạng mẫu nội tại; fine-tuning với nhiều mẫu phong cách giúp mô hình mô phỏng tự nhiên hơn, RAG khó đạt được sự chuyển phong cách sâu này.'
  },
  {
    icon: '🔬',
    name: 'Trợ lý nghiên cứu khoa học',
    desc: 'Trả lời câu hỏi học thuật dựa trên kho paper khổng lồ',
    recommend: 'rag',
    reason: 'Số lượng paper khoa học lớn và tăng liên tục; RAG có thể retrieve động các đoạn paper liên quan và đưa nguồn trích dẫn để nhà nghiên cứu kiểm chứng.'
  }
]
</script>

<style scoped>
.rag-vs-ft-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.toggle-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.toggle-btn {
  padding: 8px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.toggle-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.compare-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}
.col-label {
  font-weight: 600;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 6px;
}
.rag-label {
  background: #dbeafe;
  color: #2563eb;
}
.vs-label {
  color: var(--vp-c-text-3);
  font-size: 16px;
}
.ft-label {
  background: #fce7f3;
  color: #db2777;
}
.compare-row {
  margin-bottom: 14px;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.dim-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  text-align: center;
}
.dim-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rag-side,
.ft-side {
  flex: 1;
}
.dim-icon {
  font-size: 20px;
  flex-shrink: 0;
}
.score-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  margin-bottom: 4px;
  overflow: hidden;
}
.score-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}
.rag-fill {
  background: #3b82f6;
}
.ft-fill {
  background: #ec4899;
}
.side-text {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.scenario-question {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
}
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}
.scenario-card {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.scenario-card.selected {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.15);
}
.scenario-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.scenario-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}
.scenario-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  line-height: 1.4;
}
.recommendation {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.recommendation.rag {
  background: #dbeafe;
  color: #2563eb;
}
.recommendation.ft {
  background: #fce7f3;
  color: #db2777;
}
.recommendation.both {
  background: #f0fdf4;
  color: #16a34a;
}
.scenario-detail {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.detail-reason {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.summary-box {
  margin-top: 16px;
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
}
.summary-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.summary-text {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
