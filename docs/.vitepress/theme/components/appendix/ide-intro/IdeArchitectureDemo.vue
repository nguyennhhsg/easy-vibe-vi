<script setup>
import { ref, computed } from 'vue'

const currentScenario = ref('editor') // 'editor' | 'extension' | 'full'
const isRunning = ref(false)
const logs = ref([])
const activeStep = ref('') // 'start' | 'error-editor' | 'extension' | 'error-env' | 'env' | 'result'

const scenarios = {
  editor: {
    tab: '1. Chỉ có editor',
    title: 'Tình huống 1: Chỉ có VS Code (chế độ plain text)',
    desc: 'Giống như dùng Notepad của Windows để viết code. Gõ chữ thì được nhưng nó không hiểu Python là gì.',
    result: '❌ Thất bại: VS Code coi code như văn bản thường, không biết chạy thế nào.'
  },
  extension: {
    tab: '2. + extension',
    title: 'Tình huống 2: Đã cài extension (thiếu môi trường)',
    desc: 'Bạn đã cài extension Python. Extension biết "run" nghĩa là phải tìm chương trình Python, nhưng máy bạn chưa cài Python.',
    result: '⚠️ Lỗi: extension đã tạo lệnh nhưng hệ thống không tìm thấy "python.exe".'
  },
  full: {
    tab: '3. + môi trường (đầy đủ)',
    title: 'Tình huống 3: Đầy đủ (IDE + extension + môi trường)',
    desc: 'Bạn đã cài Python interpreter. Extension tạo lệnh, interpreter nhận và chạy, phối hợp hoàn hảo.',
    result: '✅ Thành công: Hello World'
  }
}

const run = async () => {
  if (isRunning.value) return
  isRunning.value = true
  logs.value = []
  activeStep.value = 'start'

  await wait(600)

  if (currentScenario.value === 'editor') {
    logs.value.push('VS Code: "File gì đây? Mình không biết."')
    logs.value.push('VS Code: "Mình chỉ là máy gõ chữ, không chạy được."')
    activeStep.value = 'error-editor'
  } else {
    // Has extension
    activeStep.value = 'extension'
    await wait(800)

    if (currentScenario.value === 'extension') {
      logs.value.push('> python main.py')
      await wait(600)
      logs.value.push("Error: command 'python' not found")
      logs.value.push('Hệ thống: không tìm thấy Python interpreter')
      activeStep.value = 'error-env'
    } else {
      // Full
      logs.value.push('> python main.py')
      activeStep.value = 'env'
      await wait(1200)
      activeStep.value = 'result'
      logs.value.push('Hello World')
    }
  }

  isRunning.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const setScenario = (key) => {
  if (isRunning.value) return
  currentScenario.value = key
  logs.value = []
  activeStep.value = ''
}
</script>

<template>
  <div class="arch-demo">
    <div class="demo-header">
      <div class="title">
        🛠️ Trình mô phỏng cơ chế cốt lõi của IDE
      </div>
      <div class="subtitle">
        Click vào các tab bên dưới để xem kết quả với từng cấu hình, hiểu vì sao thiếu một thành phần là không chạy được.
      </div>
    </div>

    <!-- Tab Selection -->
    <div class="tabs">
      <div
        v-for="(conf, key) in scenarios"
        :key="key"
        class="tab"
        :class="{ active: currentScenario === key }"
        @click="setScenario(key)"
      >
        {{ conf.tab }}
      </div>
    </div>

    <div class="scenario-desc">
      <strong>{{ scenarios[currentScenario].title }}</strong>
      <p>{{ scenarios[currentScenario].desc }}</p>
    </div>

    <div class="diagram-container">
      <!-- Layer 1: VS Code -->
      <div
        class="component vscode"
        :class="{ dim: activeStep === 'env' }"
      >
        <div class="comp-label">
          1. Vỏ ngoài (VS Code)
        </div>
        <div class="editor-window">
          <div class="file-tab">
            main.py
          </div>
          <div class="code-area">
            <span style="color: #c586c0">print</span>(<span
              style="color: #ce9178"
            >"Hello"</span>)
          </div>
          <button
            class="run-btn-small"
            :disabled="isRunning"
            title="Click để chạy"
            @click="run"
          >
            {{ isRunning ? '...' : '▶ Run' }}
          </button>
        </div>
        <div
          v-if="activeStep === 'error-editor'"
          class="status-badge error"
        >
          🚫 Không biết cách chạy
        </div>
      </div>

      <!-- Connector 1 -->
      <div class="connector">
        <div
          class="line"
          :class="{
            active: ['extension', 'env', 'result', 'error-env'].includes(
              activeStep
            )
          }"
        />
        <div
          class="arrow-tip"
          :class="{
            active: ['extension', 'env', 'result', 'error-env'].includes(
              activeStep
            )
          }"
        >
          ⬇
        </div>
      </div>

      <!-- Layer 2: Extension -->
      <div
        class="component extension"
        :class="{
          missing: currentScenario === 'editor',
          active: activeStep === 'extension'
        }"
      >
        <div class="comp-label">
          2. Trung gian (extension)
        </div>
        <div class="comp-box">
          <div
            v-if="currentScenario === 'editor'"
            class="missing-content"
          >
            <span class="icon">❌</span> Chưa cài extension
          </div>
          <div
            v-else
            class="active-content"
          >
            <div class="icon">
              🧩
            </div>
            <div class="text">
              Extension Python
            </div>
            <div
              v-if="
                activeStep === 'extension' ||
                  activeStep === 'env' ||
                  activeStep === 'error-env'
              "
              class="action"
            >
              Tạo lệnh: <code>python main.py</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Connector 2 -->
      <div class="connector">
        <div
          class="line"
          :class="{ active: ['env', 'result'].includes(activeStep) }"
        />
        <div
          class="arrow-tip"
          :class="{ active: ['env', 'result'].includes(activeStep) }"
        >
          ⬇
        </div>
      </div>

      <!-- Layer 3: Environment -->
      <div
        class="component env"
        :class="{
          missing: currentScenario !== 'full',
          active: activeStep === 'env'
        }"
      >
        <div class="comp-label">
          3. Động cơ (môi trường)
        </div>
        <div class="comp-box">
          <div
            v-if="currentScenario !== 'full'"
            class="missing-content"
          >
            <span class="icon">❌</span> Chưa cài môi trường
          </div>
          <div
            v-else
            class="active-content"
          >
            <div class="icon">
              ⚙️
            </div>
            <div class="text">
              Python interpreter
            </div>
            <div
              v-if="activeStep === 'env'"
              class="action"
            >
              <span class="spin">⚙️</span> Đang tính toán...
            </div>
            <div
              v-if="activeStep === 'result'"
              class="action success"
            >
              ✅ Hoàn tất tính toán
            </div>
          </div>
        </div>
        <div
          v-if="activeStep === 'error-env'"
          class="status-badge error"
        >
          🚫 Không tìm thấy chương trình
        </div>
      </div>
    </div>

    <!-- Output Console -->
    <div class="terminal-box">
      <div class="term-header">
        <span class="term-icon">_</span> Terminal
      </div>
      <div class="term-body">
        <div
          v-for="(l, i) in logs"
          :key="i"
          class="log-line"
          :class="{ error: l.includes('Error') || l.includes('Thất bại') }"
        >
          {{ l }}
        </div>
        <div
          v-if="logs.length === 0"
          class="placeholder"
        >
          Click nút "Run" phía trên để bắt đầu...
        </div>
      </div>
    </div>

    <div
      v-if="!isRunning && logs.length > 0"
      class="result-bar"
      :class="{
        success: scenarios[currentScenario].result.includes('Thành công'),
        error: !scenarios[currentScenario].result.includes('Thành công')
      }"
    >
      {{ scenarios[currentScenario].result }}
    </div>
  </div>
</template>

<style scoped>
.arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* Tabs */
.tabs {
  display: flex;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 16px;
  gap: 4px;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  font-weight: 500;
}
.tab:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.scenario-desc {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
}
.scenario-desc strong {
  display: block;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}
.scenario-desc p {
  margin: 0;
  color: var(--vp-c-text-2);
}

/* Diagram */
.diagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
}

.component {
  width: 100%;
  max-width: 320px;
  position: relative;
  transition: all 0.3s;
}

.comp-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* VS Code Style */
.vscode .editor-window {
  background: #1e1e1e;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #333;
}
.vscode .file-tab {
  background: #2d2d2d;
  color: #fff;
  padding: 4px 12px;
  font-size: 12px;
  border-bottom: 1px solid #1e1e1e;
  width: fit-content;
}
.vscode .code-area {
  padding: 12px;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  color: #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.run-btn-small {
  background: #007acc;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}
.run-btn-small:hover {
  background: #0062a3;
}
.run-btn-small:disabled {
  background: #444;
  cursor: not-allowed;
}

/* Extension & Env Box Style */
.comp-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.component.missing .comp-box {
  border-style: dashed;
  background: var(--vp-c-bg-alt);
  opacity: 0.7;
}
.component.active .comp-box {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.2);
}

.missing-content {
  color: var(--vp-c-text-3);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.active-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
}
.active-content .icon {
  font-size: 20px;
}
.active-content .text {
  font-weight: 600;
  font-size: 14px;
}
.active-content .action {
  font-size: 12px;
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 4px;
  font-family: monospace;
  animation: fadeIn 0.3s;
}
.active-content .action.success {
  color: var(--vp-c-green);
  background: var(--vp-c-green-dimm);
}

/* Connectors */
.connector {
  height: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.line {
  width: 2px;
  height: 100%;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}
.line.active {
  background: var(--vp-c-brand);
}
.arrow-tip {
  position: absolute;
  bottom: -4px;
  font-size: 12px;
  color: var(--vp-c-divider);
  transition: color 0.3s;
  background: var(--vp-c-bg-soft);
}
.arrow-tip.active {
  color: var(--vp-c-brand);
}

/* Status Badges */
.status-badge {
  position: absolute;
  top: 50%;
  right: -100px;
  transform: translateY(-50%);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  animation: slideIn 0.3s;
}
.status-badge.error {
  background: #ffe6e6;
  color: #d93025;
  border: 1px solid #ffcdd2;
}

/* Terminal */
.terminal-box {
  background: #1e1e1e;
  border-radius: 6px;
  overflow: hidden;
  font-family: 'Consolas', monospace;
  border: 1px solid #333;
}
.term-header {
  background: #2d2d2d;
  color: #ccc;
  padding: 4px 12px;
  font-size: 12px;
  border-bottom: 1px solid #333;
}
.term-body {
  padding: 12px;
  min-height: 80px;
  font-size: 13px;
  color: #fff;
}
.log-line {
  margin-bottom: 4px;
}
.log-line.error {
  color: #ff6b68;
}
.placeholder {
  color: #666;
  font-style: italic;
}

.result-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}
.result-bar.success {
  background: var(--vp-c-green-dimm);
  color: var(--vp-c-green-dark);
}
.result-bar.error {
  background: var(--vp-c-red-dimm);
  color: var(--vp-c-red-dark);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-10px, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%);
  }
}
.spin {
  display: inline-block;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .status-badge {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    margin-top: 8px;
    display: inline-block;
    width: 100%;
    text-align: center;
  }
}
</style>
