<template>
  <div class="prompt-demo">
    <div class="header">
      <div class="title">Phòng thí nghiệm Prompt Engineering</div>
      <div class="subtitle">Bạn chỉnh cấu trúc prompt và quan sát chất lượng đầu ra thay đổi ra sao</div>
    </div>

    <div class="template-tabs">
      <button
        v-for="t in templates"
        :key="t.id"
        :class="['tab-btn', { active: currentTemplate === t.id }]"
        @click="selectTemplate(t.id)"
      >
        <span>{{ t.icon }}</span>
        <span>{{ t.name }}</span>
      </button>
    </div>

    <div class="editor-grid">
      <div class="editor-panel">
        <div class="panel-label">System Prompt (chỉ thị hệ thống)</div>
        <textarea
          v-model="systemPrompt"
          class="prompt-input"
          rows="3"
          placeholder="Bạn đặt vai trò và quy tắc hành vi cho AI..."
        />

        <div class="panel-label">User Prompt (đầu vào người dùng)</div>
        <textarea
          v-model="userPrompt"
          class="prompt-input"
          rows="3"
          placeholder="Câu hỏi hoặc chỉ thị cụ thể của người dùng..."
        />

        <button class="run-btn" @click="runPrompt">
          ▶ Mô phỏng sinh
        </button>
      </div>

      <div class="output-panel">
        <div class="panel-label">Đầu ra mô phỏng</div>
        <div class="output-box">
          <div v-if="isGenerating" class="generating">
            <span class="dot-anim">●●●</span> Đang sinh...
          </div>
          <div v-else-if="output" class="output-text">
            {{ output }}
          </div>
          <div v-else class="output-placeholder">
            Bạn nhấn "Mô phỏng sinh" để xem kết quả
          </div>
        </div>

        <div v-if="output" class="quality-bar">
          <div class="quality-label">Đánh giá chất lượng đầu ra</div>
          <div class="quality-metrics">
            <div
              v-for="m in currentQuality"
              :key="m.name"
              class="metric"
            >
              <div class="metric-name">{{ m.name }}</div>
              <div class="meter">
                <div
                  class="meter-fill"
                  :style="{ width: m.score + '%', background: m.color }"
                />
              </div>
              <div class="metric-score">{{ m.score }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips-bar">
      <span class="tips-label">💡 Mẹo viết prompt:</span>
      <span class="tips-text">{{ currentTip }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const templates = [
  { id: 'bad', icon: '❌', name: 'Câu hỏi mơ hồ' },
  { id: 'basic', icon: '📝', name: 'Cấu trúc cơ bản' },
  { id: 'good', icon: '✅', name: 'Best practice' }
]

const currentTemplate = ref('bad')
const systemPrompt = ref('')
const userPrompt = ref('')
const output = ref('')
const isGenerating = ref(false)

const templateData = {
  bad: {
    system: '',
    user: 'Viết giúp mình một đoạn giới thiệu',
    output: 'Được rồi, đây là phần giới thiệu:\n\nXin chào, mình là một con người, mình thích nhiều thứ. Mình thấy cuộc sống thú vị. Cảm ơn mọi người.\n\n(Đầu ra mơ hồ, thiếu định hướng, không có giá trị thực tế)',
    quality: [
      { name: 'Liên quan', score: 20, color: '#ef4444' },
      { name: 'Cụ thể', score: 10, color: '#ef4444' },
      { name: 'Hữu dụng', score: 15, color: '#ef4444' }
    ],
    tip: 'Không có System Prompt, không có ngữ cảnh, câu hỏi quá mơ hồ — AI chỉ có thể đoán ý của bạn.'
  },
  basic: {
    system: 'Bạn là một technical writer.',
    user: 'Viết giúp mình một đoạn giới thiệu về React, khoảng 100 chữ.',
    output: 'React là thư viện JavaScript mã nguồn mở do Meta (trước là Facebook) phát triển, dùng để xây dựng giao diện người dùng. Nó sử dụng mô hình component và Virtual DOM để cập nhật và render trang hiệu quả. Phong cách lập trình khai báo của React giúp lập trình viên mô tả trạng thái UI một cách trực quan và được dùng rộng rãi trong phát triển web hiện đại.',
    quality: [
      { name: 'Liên quan', score: 70, color: '#f59e0b' },
      { name: 'Cụ thể', score: 65, color: '#f59e0b' },
      { name: 'Hữu dụng', score: 60, color: '#f59e0b' }
    ],
    tip: 'Có vai trò và ràng buộc cơ bản (số chữ), chất lượng đầu ra đã tốt hơn rõ rệt nhưng vẫn thiếu định nghĩa về format và đối tượng đọc.'
  },
  good: {
    system: 'Bạn là một blogger frontend kỳ cựu. Phong cách viết: ngắn gọn, chuyên nghiệp, giỏi dùng phép so sánh. Đối tượng đọc: người mới học lập trình. Format đầu ra: bắt đầu bằng một câu tóm tắt, sau đó triển khai chi tiết, cuối cùng đưa ra một phép so sánh đời thường.',
    user: 'Bạn giới thiệu giúp mình React là gì và vì sao nó phổ biến đến vậy. Giới hạn trong khoảng 150 chữ.',
    output: 'Tóm tắt một câu: React là một thư viện JavaScript giúp bạn dựng giao diện web nhanh và hiệu quả.\n\nTriển khai chi tiết: React do team Meta phát triển, ý tưởng cốt lõi là "component hoá" — tách trang phức tạp thành các viên gạch độc lập, mỗi viên tự quản lý state và giao diện của mình. Cơ chế Virtual DOM của nó tính toán phạm vi cập nhật nhỏ nhất, tránh việc render lại không cần thiết.\n\nSo sánh đời thường: nếu trang web là một bức tường Lego, React giống như bộ Lego chuẩn hoá — bạn có thể thay từng viên gạch độc lập mà không phải đập đi xây lại từ đầu.',
    quality: [
      { name: 'Liên quan', score: 95, color: '#10b981' },
      { name: 'Cụ thể', score: 90, color: '#10b981' },
      { name: 'Hữu dụng', score: 95, color: '#10b981' }
    ],
    tip: 'Vai trò + phong cách + đối tượng + format + ràng buộc = đầu ra chất lượng cao. Một prompt tốt chính là một bản đặc tả yêu cầu tốt.'
  }
}

const currentQuality = ref([])
const currentTip = computed(() => templateData[currentTemplate.value].tip)

const selectTemplate = (id) => {
  currentTemplate.value = id
  const data = templateData[id]
  systemPrompt.value = data.system
  userPrompt.value = data.user
  output.value = ''
  currentQuality.value = []
}

const runPrompt = async () => {
  isGenerating.value = true
  output.value = ''
  currentQuality.value = []
  await new Promise(r => setTimeout(r, 1200))
  const data = templateData[currentTemplate.value]
  output.value = data.output
  currentQuality.value = data.quality
  isGenerating.value = false
}

// Initialize
selectTemplate('bad')
</script>

<style scoped>
.prompt-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #8b5cf6, var(--vp-c-brand));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.template-tabs {
  display: flex; gap: 8px; justify-content: center;
  margin-bottom: 16px; flex-wrap: wrap;
}
.tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.tab-btn:hover { background: var(--vp-c-bg-alt); }
.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.editor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
.editor-panel, .output-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 14px;
}
.panel-label {
  font-weight: 600; font-size: 12px; margin-bottom: 6px;
  color: var(--vp-c-text-2);
}
.prompt-input {
  width: 100%; padding: 10px; border: 1px solid var(--vp-c-divider);
  border-radius: 8px; background: var(--vp-c-bg-soft);
  font-size: 13px; line-height: 1.5; resize: vertical;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1); margin-bottom: 10px;
  box-sizing: border-box;
}
.prompt-input:focus {
  outline: none; border-color: var(--vp-c-brand);
}
.run-btn {
  width: 100%; padding: 10px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.run-btn:hover { background: var(--vp-c-brand-dark); }

.output-box {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  border-radius: 8px; padding: 14px; min-height: 120px;
  font-size: 13px; line-height: 1.7;
}
.output-text { white-space: pre-wrap; color: var(--vp-c-text-1); }
.output-placeholder { color: var(--vp-c-text-3); text-align: center; padding: 30px 0; }
.generating { color: var(--vp-c-brand); text-align: center; padding: 30px 0; }
.dot-anim { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.3; } }

.quality-bar { margin-top: 12px; }
.quality-label { font-weight: 600; font-size: 12px; margin-bottom: 8px; }
.quality-metrics { display: flex; flex-direction: column; gap: 6px; }
.metric { display: flex; align-items: center; gap: 8px; }
.metric-name { font-size: 11px; width: 50px; color: var(--vp-c-text-2); }
.meter {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.meter-fill {
  height: 100%; border-radius: 4px;
  transition: width 0.6s ease;
}
.metric-score { font-size: 11px; font-weight: 600; width: 36px; text-align: right; }

.tips-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.tips-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.tips-text { color: var(--vp-c-text-1); }
</style>
