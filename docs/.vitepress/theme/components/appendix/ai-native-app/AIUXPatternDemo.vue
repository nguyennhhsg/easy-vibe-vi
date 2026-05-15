<template>
  <div class="ux-demo">
    <div class="header">
      <div class="title">Mẫu tương tác AI-native</div>
      <div class="subtitle">Bạn bấm vào từng thẻ để trải nghiệm hiệu ứng của từng mẫu tương tác AI</div>
    </div>

    <div class="pattern-grid">
      <div
        v-for="p in patterns"
        :key="p.id"
        :class="['pattern-card', { active: activePattern === p.id }]"
        @click="activatePattern(p.id)"
      >
        <div class="card-icon">{{ p.icon }}</div>
        <div class="card-name">{{ p.name }}</div>
        <div class="card-desc">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="activePattern" class="preview-area">
      <div class="preview-header">
        <span>{{ currentPattern.icon }} Demo: {{ currentPattern.name }}</span>
        <button class="replay-btn" @click="replayDemo">🔄 Phát lại</button>
      </div>

      <!-- Demo streaming output -->
      <div v-if="activePattern === 'streaming'" class="demo-box">
        <div class="chat-bubble ai">
          <span class="stream-text">{{ streamText }}</span>
          <span v-if="isStreaming" class="cursor-blink">|</span>
        </div>
        <div class="demo-note">Sinh từng chữ một, người dùng không phải chờ trả lời đầy đủ</div>
      </div>

      <!-- Demo trạng thái loading -->
      <div v-if="activePattern === 'loading'" class="demo-box">
        <div class="loading-stages">
          <div
            v-for="(s, idx) in loadingStages"
            :key="idx"
            :class="['stage', { done: loadingStep > idx, current: loadingStep === idx }]"
          >
            <span class="stage-icon">
              {{ loadingStep > idx ? '✅' : loadingStep === idx ? '⏳' : '⬜' }}
            </span>
            <span>{{ s }}</span>
          </div>
        </div>
        <div class="demo-note">Hiển thị tiến độ theo từng giai đoạn thay vì chỉ ghi "đang tải"</div>
      </div>

      <!-- Demo confidence indicator -->
      <div v-if="activePattern === 'confidence'" class="demo-box">
        <div class="confidence-list">
          <div v-for="c in confidenceItems" :key="c.text" class="conf-item">
            <div class="conf-bar-wrap">
              <div
                class="conf-bar"
                :style="{ width: c.score + '%', background: c.color }"
              />
            </div>
            <div class="conf-score">{{ c.score }}%</div>
            <div class="conf-label">{{ c.level }}</div>
            <div class="conf-text">{{ c.text }}</div>
          </div>
        </div>
        <div class="demo-note">Cho người dùng biết AI "tự tin" với câu trả lời của mình đến đâu</div>
      </div>

      <!-- Demo xử lý suy giảm -->
      <div v-if="activePattern === 'fallback'" class="demo-box">
        <div class="fallback-flow">
          <div :class="['fb-step', { active: fallbackStep >= 0 }]">
            <span class="fb-icon">🤖</span>
            <span>AI cố gắng trả lời...</span>
          </div>
          <div class="fb-arrow" v-if="fallbackStep >= 1">↓ Phát hiện không chắc chắn</div>
          <div :class="['fb-step warn', { active: fallbackStep >= 1 }]">
            <span class="fb-icon">⚠️</span>
            <span>Báo người dùng: câu trả lời này có thể chưa chính xác</span>
          </div>
          <div class="fb-arrow" v-if="fallbackStep >= 2">↓ Cung cấp phương án thay thế</div>
          <div :class="['fb-step safe', { active: fallbackStep >= 2 }]">
            <span class="fb-icon">🔄</span>
            <span>Chuyển sang nhân viên thật / gợi ý tài liệu / mời người dùng hỏi lại theo cách khác</span>
          </div>
        </div>
        <div class="demo-note">Khi AI không chắc, hãy suy giảm khéo léo thay vì trả lời gượng ép</div>
      </div>

      <div class="pattern-detail">
        <div class="detail-label">Điểm thiết kế quan trọng</div>
        <div class="detail-text">{{ currentPattern.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const patterns = [
  {
    id: 'streaming', icon: '💬', name: 'Streaming output',
    brief: 'Sinh từng chữ, phản hồi tức thì',
    detail: 'Streaming output cho phép người dùng thấy ngay phần kết quả khi AI vẫn đang nghĩ, giúp giảm mạnh thời gian chờ cảm nhận. Về kỹ thuật thường dùng SSE (Server-Sent Events) hoặc WebSocket, frontend render Markdown dần dần.'
  },
  {
    id: 'loading', icon: '⏳', name: 'Loading thông minh',
    brief: 'Hiển thị tiến độ theo giai đoạn',
    detail: 'Một request AI thường mất vài giây, vòng quay loading truyền thống dễ làm người dùng sốt ruột. Loading thông minh chia tiến trình thành các bước nhìn thấy được (hiểu yêu cầu → truy hồi tri thức → sinh câu trả lời), giúp thời gian chờ trở nên dễ đoán.'
  },
  {
    id: 'confidence', icon: '📊', name: 'Hiển thị độ tin cậy',
    brief: 'Cho thấy AI tự tin tới đâu',
    detail: 'Đầu ra của AI mang tính xác suất, mỗi câu trả lời có mức độ tin cậy khác nhau. Confidence indicator giúp người dùng biết thông tin nào dùng được ngay, thông tin nào cần kiểm chứng lại. Đây là biểu hiện cốt lõi của tính minh bạch trong ứng dụng AI-native.'
  },
  {
    id: 'fallback', icon: '🛡️', name: 'Suy giảm khéo léo',
    brief: 'Chiến lược "đỡ" khi không chắc',
    detail: 'Khi AI không thể đưa ra câu trả lời đáng tin cậy, đừng cố nặn ra một đáp án. Chiến lược suy giảm khéo léo gồm: thẳng thắn báo độ không chắc chắn, gợi ý nguồn thông tin thay thế, chuyển sang nhân viên thật, hoặc mời người dùng hỏi lại theo cách khác.'
  }
]

const activePattern = ref('')
const currentPattern = computed(() => patterns.find(p => p.id === activePattern.value) || {})

// Streaming demo
const streamText = ref('')
const isStreaming = ref(false)
const fullText = 'React là thư viện JavaScript để xây dựng giao diện người dùng. Nó dùng mô hình phát triển component, giúp bạn tách UI phức tạp thành các module nhỏ độc lập và có thể tái sử dụng.'

// Loading demo
const loadingStages = ['Hiểu ý định người dùng...', 'Truy hồi tri thức liên quan...', 'Sắp xếp nội dung trả lời...', 'Sinh phản hồi cuối']
const loadingStep = ref(-1)

// Confidence demo
const confidenceItems = [
  { text: 'React do Meta phát triển', score: 98, level: 'Tin cậy cao', color: '#10b981' },
  { text: 'Khoảng 40% website trên thế giới dùng React', score: 72, level: 'Tin cậy vừa', color: '#f59e0b' },
  { text: 'React 19 sẽ ra mắt tháng tới', score: 35, level: 'Tin cậy thấp', color: '#ef4444' }
]

// Fallback demo
const fallbackStep = ref(-1)

let timer = null

const clearTimers = () => {
  if (timer) { clearInterval(timer); timer = null }
}

const activatePattern = (id) => {
  clearTimers()
  activePattern.value = id
  replayDemo()
}

const replayDemo = () => {
  clearTimers()
  if (activePattern.value === 'streaming') {
    streamText.value = ''
    isStreaming.value = true
    let i = 0
    timer = setInterval(() => {
      if (i < fullText.length) {
        streamText.value += fullText[i]
        i++
      } else {
        isStreaming.value = false
        clearTimers()
      }
    }, 50)
  } else if (activePattern.value === 'loading') {
    loadingStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      loadingStep.value = step
      if (step >= loadingStages.length) clearTimers()
    }, 900)
  } else if (activePattern.value === 'fallback') {
    fallbackStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      fallbackStep.value = step
      if (step >= 2) clearTimers()
    }, 1000)
  }
}
</script>

<style scoped>
.ux-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.pattern-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.pattern-card:hover { background: var(--vp-c-bg-alt); }
.pattern-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.card-icon { font-size: 24px; margin-bottom: 6px; }
.card-name { font-weight: 600; font-size: 13px; }
.card-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.preview-area {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.preview-header {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 14px; margin-bottom: 12px;
}
.replay-btn {
  padding: 4px 12px; border: 1px solid var(--vp-c-divider);
  border-radius: 6px; background: var(--vp-c-bg-soft);
  cursor: pointer; font-size: 12px;
}

.demo-box {
  background: var(--vp-c-bg-soft); border-radius: 8px;
  padding: 16px; margin-bottom: 12px;
}
.demo-note {
  font-size: 11px; color: var(--vp-c-text-3);
  text-align: center; margin-top: 10px;
}

/* Streaming */
.chat-bubble.ai {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 12px; font-size: 13px; line-height: 1.7;
}
.cursor-blink { animation: blink 0.8s infinite; color: var(--vp-c-brand); }
@keyframes blink { 50% { opacity: 0; } }

/* Loading */
.loading-stages { display: flex; flex-direction: column; gap: 8px; }
.stage {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 6px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.4; transition: all 0.3s;
}
.stage.current { opacity: 1; border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }
.stage.done { opacity: 1; border-color: #86efac; background: #f0fdf4; }

/* Confidence */
.confidence-list { display: flex; flex-direction: column; gap: 10px; }
.conf-item {
  display: grid; grid-template-columns: 1fr 40px 60px 1fr;
  align-items: center; gap: 8px; font-size: 12px;
}
.conf-bar-wrap {
  height: 8px; background: var(--vp-c-bg);
  border-radius: 4px; overflow: hidden;
}
.conf-bar { height: 100%; border-radius: 4px; transition: width 0.6s; }
.conf-score { font-weight: 600; text-align: right; }
.conf-label { font-size: 11px; color: var(--vp-c-text-2); }
.conf-text { color: var(--vp-c-text-1); }

/* Fallback */
.fallback-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.fb-step {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 10px 14px; border-radius: 8px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.3; transition: all 0.4s;
}
.fb-step.active { opacity: 1; }
.fb-step.warn.active { border-color: #fbbf24; background: #fef3c7; }
.fb-step.safe.active { border-color: #86efac; background: #f0fdf4; }
.fb-arrow { font-size: 12px; color: var(--vp-c-text-3); }

.pattern-detail { margin-top: 12px; }
.detail-label { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
.detail-text { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.7; }
</style>
