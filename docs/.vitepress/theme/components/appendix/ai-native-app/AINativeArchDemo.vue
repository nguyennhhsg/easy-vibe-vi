<template>
  <div class="arch-demo">
    <div class="header">
      <div class="title">Ứng dụng truyền thống vs ứng dụng AI-native</div>
      <div class="subtitle">Bạn chuyển chế độ để so sánh hai kiến trúc về mặt cốt lõi</div>
    </div>

    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: mode === 'traditional' }]"
        @click="mode = 'traditional'"
      >
        <span>🏗️</span>
        <span>Ứng dụng truyền thống</span>
      </button>
      <button
        :class="['toggle-btn', { active: mode === 'ai-native' }]"
        @click="mode = 'ai-native'"
      >
        <span>🤖</span>
        <span>Ứng dụng AI-native</span>
      </button>
    </div>

    <div class="arch-grid">
      <div class="stack">
        <div class="stack-title">{{ currentArch.label }}</div>
        <div
          v-for="(layer, idx) in currentArch.layers"
          :key="idx"
          :class="['layer', { highlight: selectedLayer === idx }]"
          :style="{ borderLeftColor: layer.color }"
          @click="selectedLayer = idx"
        >
          <div class="layer-icon">{{ layer.icon }}</div>
          <div class="layer-info">
            <div class="layer-name">{{ layer.name }}</div>
            <div class="layer-desc">{{ layer.brief }}</div>
          </div>
        </div>
      </div>

      <div class="detail-panel">
        <div v-if="selectedLayer !== null" class="detail-content">
          <div class="detail-title">
            {{ currentArch.layers[selectedLayer].icon }}
            {{ currentArch.layers[selectedLayer].name }}
          </div>
          <div class="detail-desc">
            {{ currentArch.layers[selectedLayer].detail }}
          </div>
          <div class="detail-example">
            <div class="example-label">Công nghệ tiêu biểu</div>
            <div class="tech-tags">
              <span
                v-for="t in currentArch.layers[selectedLayer].techs"
                :key="t"
                class="tech-tag"
              >{{ t }}</span>
            </div>
          </div>
        </div>
        <div v-else class="detail-placeholder">
          👆 Bạn bấm vào tầng bên trái để xem chi tiết
        </div>
      </div>
    </div>

    <div class="comparison-bar">
      <span class="compare-label">💡 Khác biệt cốt lõi:</span>
      <span class="compare-text">{{ mode === 'traditional'
        ? 'Ứng dụng truyền thống: logic do lập trình viên hard-code bằng if/else, hành vi hoàn toàn xác định.'
        : 'Ứng dụng AI-native: logic cốt lõi do mô hình điều khiển, hành vi mang tính xác suất và đòi hỏi tư duy thiết kế hoàn toàn mới.' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('traditional')
const selectedLayer = ref(0)

const architectures = {
  traditional: {
    label: 'Kiến trúc ứng dụng truyền thống',
    layers: [
      {
        icon: '🖥️', name: 'Frontend UI', color: '#3b82f6',
        brief: 'Giao diện và tương tác người dùng',
        detail: 'Dựa trên form, nút bấm, page routing có tính xác định. Thao tác của người dùng kích hoạt luồng nghiệp vụ cố định, mọi đường tương tác đã được định nghĩa lúc phát triển.',
        techs: ['React', 'Vue', 'HTML/CSS']
      },
      {
        icon: '⚙️', name: 'Tầng business logic', color: '#8b5cf6',
        brief: 'Rule engine hard-code',
        detail: 'Lập trình viên viết toàn bộ quy tắc nghiệp vụ bằng if/else, switch/case. Mọi nhánh đều phải khai báo sẵn, không xử lý được tình huống nằm ngoài quy tắc.',
        techs: ['Node.js', 'Java', 'Python']
      },
      {
        icon: '🗄️', name: 'Lưu trữ dữ liệu', color: '#06b6d4',
        brief: 'Quản lý dữ liệu có cấu trúc',
        detail: 'Cơ sở dữ liệu quan hệ lưu dữ liệu có cấu trúc, schema cố định. Việc đọc/ghi tuân theo mô hình CRUD nghiêm ngặt.',
        techs: ['MySQL', 'PostgreSQL', 'Redis']
      },
      {
        icon: '🔌', name: 'API', color: '#10b981',
        brief: 'Request/response cố định',
        detail: 'Mỗi API endpoint trả về kết quả xác định. Cùng đầu vào luôn cho ra cùng đầu ra, hành vi hoàn toàn dự đoán được.',
        techs: ['REST', 'GraphQL', 'gRPC']
      }
    ]
  },
  'ai-native': {
    label: 'Kiến trúc ứng dụng AI-native',
    layers: [
      {
        icon: '💬', name: 'Tầng tương tác ngôn ngữ tự nhiên', color: '#f59e0b',
        brief: 'Hội thoại + streaming output',
        detail: 'Người dùng dùng ngôn ngữ tự nhiên để bày tỏ ý định, hệ thống trả lời theo dạng streaming. Tương tác không còn là form cố định mà là một cuộc đối thoại mở.',
        techs: ['Streaming UI', 'Markdown render', 'SSE']
      },
      {
        icon: '🧠', name: 'Tầng suy luận mô hình', color: '#ef4444',
        brief: 'Decision engine do LLM điều khiển',
        detail: 'Logic cốt lõi không còn là if/else mà là LLM suy luận dựa trên prompt và ngữ cảnh. Đầu ra có tính xác suất, cùng đầu vào có thể cho ra kết quả khác nhau.',
        techs: ['GPT-4', 'Claude', 'Prompt engineering']
      },
      {
        icon: '🔗', name: 'Tầng điều phối & công cụ', color: '#8b5cf6',
        brief: 'Điều phối agent + gọi tool',
        detail: 'Mô hình có thể gọi tool ngoài (search, database, API) để lấy thông tin thời gian thực. Tầng điều phối quản lý suy luận nhiều bước, chọn tool và hợp nhất kết quả.',
        techs: ['LangChain', 'Function Calling', 'RAG']
      },
      {
        icon: '📦', name: 'Tầng quản lý context', color: '#06b6d4',
        brief: 'Vector DB + hệ thống bộ nhớ',
        detail: 'Dùng vector database để lưu và truy hồi tri thức phi cấu trúc. Embedding chuyển văn bản thành vector ngữ nghĩa, giúp tìm theo ý nghĩa thay vì khớp từ khoá.',
        techs: ['Pinecone', 'ChromaDB', 'Embedding']
      },
      {
        icon: '🛡️', name: 'Tầng an toàn & guardrail', color: '#10b981',
        brief: 'Lọc đầu ra + phát hiện ảo giác',
        detail: 'Không thể tin tưởng tuyệt đối đầu ra của AI, cần các guardrail: lọc nội dung, kiểm chứng sự thật, phát hiện ảo giác, ẩn thông tin nhạy cảm, v.v. Đây là tầng hoàn toàn mới mà ứng dụng truyền thống không cần.',
        techs: ['Guardrails', 'Kiểm duyệt nội dung', 'Kiểm chứng sự thật']
      }
    ]
  }
}

const currentArch = computed(() => architectures[mode.value])
</script>

<style scoped>
.arch-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.toggle-bar {
  display: flex; gap: 8px; justify-content: center; margin-bottom: 16px;
}
.toggle-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 18px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.toggle-btn:hover { background: var(--vp-c-bg-alt); }
.toggle-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.stack {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.stack-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }

.layer {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s;
}
.layer:hover { background: var(--vp-c-bg-alt); }
.layer.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.layer-icon { font-size: 20px; flex-shrink: 0; }
.layer-name { font-weight: 600; font-size: 13px; }
.layer-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 2px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
.detail-desc { color: var(--vp-c-text-2); line-height: 1.7; font-size: 13px; margin-bottom: 12px; }
.example-label { font-weight: 600; font-size: 12px; margin-bottom: 6px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-tag {
  padding: 3px 10px; border-radius: 12px; font-size: 11px;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark);
  border: 1px solid var(--vp-c-brand-dimm);
}
.detail-placeholder {
  color: var(--vp-c-text-3); text-align: center; padding: 40px 0; font-size: 13px;
}

.comparison-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.compare-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.compare-text { color: var(--vp-c-text-1); }
</style>
