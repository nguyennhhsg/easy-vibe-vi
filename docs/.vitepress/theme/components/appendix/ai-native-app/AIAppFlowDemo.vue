<template>
  <div class="flow-demo">
    <div class="header">
      <div class="title">Luồng xử lý request của ứng dụng AI</div>
      <div class="subtitle">Bạn bấm "Gửi request" để quan sát toàn bộ vòng đời của một request AI</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, idx) in steps"
        :key="step.id"
        :class="['pipe-step', {
          active: currentStep === idx,
          done: currentStep > idx
        }]"
      >
        <div class="step-icon">{{ currentStep > idx ? '✅' : step.icon }}</div>
        <div class="step-info">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-en">{{ step.en }}</div>
        </div>
        <div v-if="idx < steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="control-bar">
      <button
        v-if="!isRunning && currentStep < 0"
        class="action-btn"
        @click="startFlow"
      >
        ▶ Gửi request
      </button>
      <button
        v-else-if="!isRunning && currentStep >= steps.length"
        class="action-btn reset"
        @click="resetFlow"
      >
        🔄 Reset
      </button>
      <div v-else-if="isRunning" class="running-hint">
        ⏳ Đang xử lý...
      </div>
    </div>

    <div v-if="currentStep >= 0" class="detail-area">
      <div class="detail-card">
        <div class="detail-title">
          {{ activeStep.icon }} {{ activeStep.name }}
        </div>
        <div class="detail-desc">{{ activeStep.detail }}</div>

        <div class="io-section">
          <div class="io-block">
            <div class="io-label">Đầu vào</div>
            <pre class="io-code"><code>{{ activeStep.input }}</code></pre>
          </div>
          <div class="io-block">
            <div class="io-label">Đầu ra</div>
            <pre class="io-code"><code>{{ activeStep.output }}</code></pre>
          </div>
        </div>

        <div class="latency-bar">
          <span class="latency-label">Thời gian</span>
          <div class="latency-track">
            <div
              class="latency-fill"
              :style="{ width: activeStep.latencyPct + '%' }"
            />
          </div>
          <span class="latency-val">{{ activeStep.latency }}</span>
        </div>
      </div>
    </div>

    <div class="insight-bar">
      <span class="insight-label">💡 Insight quan trọng:</span>
      <span class="insight-text">
        Chuỗi xử lý request của ứng dụng AI dài hơn ứng dụng truyền thống, riêng phần model inference thường chiếm 60-80% tổng thời gian.
        Bạn nên tập trung tối ưu vào: cache prompt, streaming output và xử lý bất đồng bộ.
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const steps = [
  {
    id: 'input', icon: '👤', name: 'Đầu vào người dùng', en: 'User Input',
    detail: 'Người dùng nhập yêu cầu bằng ngôn ngữ tự nhiên. Hệ thống phải xử lý nhiều dạng đầu vào: văn bản, giọng nói chuyển sang text, mô tả ảnh, v.v. Khác với form trong ứng dụng truyền thống, đầu vào ở đây mở và phi cấu trúc.',
    input: '"Tóm tắt giúp mình các ý chính của bài viết này"',
    output: '{ text: "Tóm tắt giúp mình...", type: "text", lang: "vi" }',
    latency: '~0ms', latencyPct: 2
  },
  {
    id: 'preprocess', icon: '🔧', name: 'Tiền xử lý', en: 'Preprocessing',
    detail: 'Làm sạch và bổ sung đầu vào: nhận diện ý định, trích xuất từ khoá, ghép ngữ cảnh, RAG để lấy đoạn tài liệu liên quan, dựng prompt hoàn chỉnh. Bước này quyết định mô hình nhận được bao nhiêu thông tin hữu ích.',
    input: '{ text: "Tóm tắt giúp mình...", context: [...lịch sử hội thoại] }',
    output: '{ system_prompt: "Bạn là...", user_prompt: "...", retrieved_docs: [...] }',
    latency: '~200ms', latencyPct: 15
  },
  {
    id: 'model', icon: '🧠', name: 'Suy luận mô hình', en: 'Model Inference',
    detail: 'Gửi prompt đã dựng cho LLM để suy luận. Đây là khâu tốn thời gian nhất trong toàn bộ chuỗi. Mô hình sẽ sinh câu trả lời dựa vào chỉ thị trong prompt, ngữ cảnh và tri thức đã truy hồi.',
    input: '{ messages: [...], model: "gpt-4", temperature: 0.7 }',
    output: '{ content: "Bài viết có ba ý chính...", tokens: 256 }',
    latency: '~2-8s', latencyPct: 75
  },
  {
    id: 'postprocess', icon: '🛡️', name: 'Hậu xử lý', en: 'Post-processing',
    detail: 'Kiểm tra an toàn và định dạng đầu ra của mô hình: kiểm duyệt nội dung, phát hiện ảo giác, chuyển đổi định dạng (render Markdown), gắn nguồn trích dẫn, ẩn thông tin nhạy cảm, v.v.',
    input: '{ raw_output: "Bài viết có ba ý chính..." }',
    output: '{ safe: true, formatted: "## Ý chính\\n1. ...", sources: [...] }',
    latency: '~100ms', latencyPct: 8
  },
  {
    id: 'response', icon: '💬', name: 'Trả response', en: 'Response',
    detail: 'Trả kết quả đã xử lý cho người dùng theo dạng streaming. Frontend render Markdown dần dần và hiển thị thêm nguồn trích dẫn, mức độ tin cậy. Người dùng có thể ngắt hoặc hỏi tiếp ngay khi mô hình đang sinh.',
    input: '{ formatted: "## Ý chính\\n1. ...", stream: true }',
    output: 'Người dùng thấy câu trả lời hiện dần kèm trích dẫn nguồn',
    latency: '~50ms (TTFB)', latencyPct: 5
  }
]

const currentStep = ref(-1)
const isRunning = ref(false)

const activeStep = computed(() => {
  const idx = Math.min(currentStep.value, steps.length - 1)
  return idx >= 0 ? steps[idx] : steps[0]
})

const startFlow = async () => {
  isRunning.value = true
  for (let i = 0; i < steps.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 1200))
  }
  currentStep.value = steps.length
  isRunning.value = false
}

const resetFlow = () => {
  currentStep.value = -1
  isRunning.value = false
}
</script>

<style scoped>
.flow-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #10b981, #3b82f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pipeline {
  display: flex; align-items: center; justify-content: center;
  gap: 4px; flex-wrap: wrap; margin-bottom: 16px;
}
.pipe-step {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); transition: all 0.3s;
  font-size: 12px;
}
.pipe-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.pipe-step.done {
  border-color: #86efac; background: #f0fdf4;
}
.step-icon { font-size: 18px; }
.step-name { font-weight: 600; font-size: 12px; }
.step-en { font-size: 10px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 14px; margin: 0 2px; }

.control-bar { text-align: center; margin-bottom: 16px; }
.action-btn {
  padding: 10px 28px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.action-btn:hover { background: var(--vp-c-brand-dark); }
.action-btn.reset { background: #6b7280; }
.action-btn.reset:hover { background: #4b5563; }
.running-hint { color: var(--vp-c-brand); font-size: 13px; }

.detail-area { margin-bottom: 16px; }
.detail-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 12px;
}

.io-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px; margin-bottom: 12px;
}
.io-label { font-weight: 600; font-size: 11px; margin-bottom: 4px; color: var(--vp-c-text-2); }
.io-code {
  margin: 0; background: #0b1221; color: #e5e7eb;
  border-radius: 8px; padding: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px; overflow-x: auto; white-space: pre-wrap;
}

.latency-bar {
  display: flex; align-items: center; gap: 10px;
}
.latency-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.latency-track {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.latency-fill {
  height: 100%; border-radius: 4px;
  background: var(--vp-c-brand); transition: width 0.5s;
}
.latency-val { font-size: 11px; font-weight: 600; min-width: 80px; text-align: right; }

.insight-bar {
  padding: 12px 16px; background: var(--vp-c-brand-soft);
  border-radius: 6px; font-size: 13px;
}
.insight-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.insight-text { color: var(--vp-c-text-1); }
</style>
