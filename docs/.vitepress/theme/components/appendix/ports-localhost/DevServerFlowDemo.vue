<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const isPlaying = ref(false)

const steps = [
  {
    title: '1. Bạn chạy npm run dev',
    terminal: '$ npm run dev\n\n> vite\n\n  Đang chuẩn bị...',
    desc: 'Bạn gõ lệnh khởi động trong terminal',
    highlight: 'terminal'
  },
  {
    title: '2. Vite khởi động HTTP server',
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/',
    desc: 'Vite mở một HTTP server ở port 5173 trên máy, chờ kết nối',
    highlight: 'server'
  },
  {
    title: '3. Bạn mở trình duyệt và truy cập',
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/',
    browser: 'http://localhost:5173',
    desc: 'Trình duyệt gửi HTTP request tới localhost:5173',
    highlight: 'browser'
  },
  {
    title: '4. Server trả về trang',
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/\n\n  10:30:01 [200] /\n  10:30:01 [200] /src/main.js\n  10:30:01 [200] /src/App.vue',
    browser: 'http://localhost:5173',
    page: '🎉 Trang của bạn đã xuất hiện!',
    desc: 'Vite xử lý request, trả về HTML/JS/CSS, trình duyệt render trang',
    highlight: 'page'
  },
  {
    title: '5. Hot reload (HMR)',
    terminal: '$ npm run dev\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n\n  10:30:01 [200] /\n  10:35:22 [vite] hmr update /src/App.vue',
    browser: 'http://localhost:5173',
    page: '🔄 Trang đã tự cập nhật!',
    desc: 'Khi bạn sửa code, Vite báo cho trình duyệt qua WebSocket và trang tự cập nhật',
    highlight: 'hmr'
  }
]

async function playAll() {
  if (isPlaying.value) return
  isPlaying.value = true
  currentStep.value = 0
  for (let i = 0; i < steps.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 1800))
  }
  isPlaying.value = false
}

function goStep(i) {
  currentStep.value = i
}

function reset() {
  currentStep.value = 0
  isPlaying.value = false
}
</script>

<template>
  <div class="devserver-flow-demo">
    <div class="control-panel">
      <div class="step-indicators">
        <div
          v-for="(s, i) in steps"
          :key="i"
          :class="['step-dot', { active: currentStep >= i, current: currentStep === i }]"
          @click="goStep(i)"
        >
          {{ i + 1 }}
        </div>
      </div>
      <div class="control-btns">
        <button class="action-btn" :disabled="isPlaying" @click="playAll">
          {{ isPlaying ? 'Đang chạy...' : '▶ Tự chạy demo' }}
        </button>
        <button class="action-btn ghost" @click="reset">Reset</button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="step-title">{{ steps[currentStep].title }}</div>

      <div class="flow-layout">
        <div :class="['panel terminal-panel', { highlight: steps[currentStep].highlight === 'terminal' }]">
          <div class="panel-header">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="panel-title">Terminal</span>
          </div>
          <pre class="terminal-content">{{ steps[currentStep].terminal }}</pre>
        </div>

        <div class="arrow-col">
          <div :class="['flow-arrow', { active: currentStep >= 1 }]">
            <span class="arrow-label">Listen</span>
            <span class="arrow-char">↕</span>
          </div>
        </div>

        <div :class="['panel browser-panel', {
          highlight: steps[currentStep].highlight === 'browser' || steps[currentStep].highlight === 'page' || steps[currentStep].highlight === 'hmr'
        }]"
>
          <div class="panel-header">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="panel-title">Trình duyệt</span>
          </div>
          <div class="browser-content">
            <div v-if="steps[currentStep].browser" class="browser-url-bar">
              {{ steps[currentStep].browser }}
            </div>
            <div v-else class="browser-empty">Đang chờ bạn mở trình duyệt...</div>
            <div v-if="steps[currentStep].page" class="browser-page">
              {{ steps[currentStep].page }}
            </div>
          </div>
        </div>
      </div>

      <div class="step-desc">
        💡 {{ steps[currentStep].desc }}
      </div>
    </div>

    <div class="http-explain">
      <div class="http-title">HTTP server là gì?</div>
      <div class="http-analogy">
        <div class="analogy-item">
          <span class="analogy-icon">🏪</span>
          <div class="analogy-text">
            <strong>Hình dung như một quầy lễ tân</strong>
            <span>HTTP server giống &quot;một quầy luôn mở cửa&quot; - nó đợi sẵn ở đó, ai hỏi thì trả lời, không có ai thì lặng lẽ chờ.</span>
          </div>
        </div>
        <div class="analogy-item">
          <span class="analogy-icon">📋</span>
          <div class="analogy-text">
            <strong>Chỉ hiểu một loại &quot;mật mã&quot;</strong>
            <span>Quầy này chỉ hiểu format request của giao thức HTTP (ví dụ <code>GET /index.html</code>), rồi trả lại nội dung file tương ứng.</span>
          </div>
        </div>
        <div class="analogy-item">
          <span class="analogy-icon">⚙️</span>
          <div class="analogy-text">
            <strong>Dev server = quầy phiên bản nâng cấp</strong>
            <span>Dev server của Vite, Webpack không chỉ &quot;trả file thô&quot; mà còn compile code của bạn ngay lập tức (Vue → JS, TS → JS, Sass → CSS) rồi mới trả về trình duyệt.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Tóm lại:</strong> dev server = một HTTP server chạy trên localhost + bộ compile code on-the-fly. Nó listen một port, trình duyệt request, nó trả code đã compile xong.
    </div>
  </div>
</template>

<style scoped>
.devserver-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step-indicators {
  display: flex;
  gap: 0.4rem;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  transition: all 0.2s;
}

.step-dot.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-dot.current {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.control-btns {
  display: flex;
  gap: 0.4rem;
}

.action-btn {
  padding: 0.35rem 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.visualization-area {
  padding: 1rem;
}

.step-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.flow-layout {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: stretch;
}

.panel {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.panel.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 12px rgba(100, 108, 255, 0.2);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.panel-title {
  font-size: 0.78rem;
  font-weight: 600;
  margin-left: 0.3rem;
  color: var(--vp-c-text-2);
}

.terminal-content {
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 0;
  min-height: 140px;
  white-space: pre-wrap;
  word-break: break-all;
}

.browser-content {
  padding: 0.75rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.browser-url-bar {
  background: var(--vp-c-bg-alt);
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.browser-empty {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  text-align: center;
  padding: 2rem 0;
}

.browser-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.flow-arrow.active {
  opacity: 1;
}

.arrow-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  writing-mode: vertical-rl;
}

.arrow-char {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.step-desc {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.http-explain {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.http-title {
  font-weight: 700;
  font-size: 0.92rem;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.http-analogy {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.analogy-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.analogy-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.analogy-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.analogy-text strong {
  font-size: 0.85rem;
}

.analogy-text span {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.analogy-text code {
  font-size: 0.78rem;
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.info-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .flow-layout {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    transform: rotate(90deg);
    padding: 0.3rem 0;
  }
  .arrow-label {
    writing-mode: horizontal-tb;
  }
}
</style>
