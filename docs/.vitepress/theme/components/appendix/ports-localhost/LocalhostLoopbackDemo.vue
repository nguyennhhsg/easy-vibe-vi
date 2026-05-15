<script setup>
import { ref, reactive } from 'vue'

const requestUrl = ref('http://localhost:3000/api/hello')
const isRequesting = ref(false)
const requestStep = ref(0)
const responseText = ref('')

const steps = [
  { label: 'Trình duyệt', desc: 'Bạn gõ URL vào thanh địa chỉ', icon: '🌐' },
  { label: 'DNS resolve', desc: 'localhost → 127.0.0.1 (không ra mạng)', icon: '📖' },
  { label: 'Tầng network', desc: 'Gói tin gửi tới 127.0.0.1 (loopback interface)', icon: '🔄' },
  { label: 'Dịch vụ local', desc: 'Tiến trình ở port 3000 nhận request', icon: '⚙️' },
  { label: 'Trả response', desc: '{ "message": "Hello!" }', icon: '📨' }
]

const aliases = reactive([
  { name: 'localhost', ip: '127.0.0.1', desc: 'Alias tên miền chuẩn', active: false },
  { name: '127.0.0.1', ip: '127.0.0.1', desc: 'Loopback IPv4', active: false },
  { name: '::1', ip: '::1', desc: 'Loopback IPv6', active: false },
  { name: '0.0.0.0', ip: '0.0.0.0', desc: 'Listen trên mọi NIC', active: false }
])

const selectedAlias = ref(0)

async function simulateRequest() {
  if (isRequesting.value) return
  isRequesting.value = true
  requestStep.value = 0
  responseText.value = ''

  for (let i = 0; i < steps.length; i++) {
    requestStep.value = i + 1
    await new Promise(r => setTimeout(r, 700))
  }

  responseText.value = '{ "message": "Hello from localhost!" }'
  await new Promise(r => setTimeout(r, 500))
  isRequesting.value = false
}

function selectAlias(index) {
  selectedAlias.value = index
  aliases.forEach((a, i) => { a.active = i === index })
}
</script>

<template>
  <div class="localhost-demo">
    <div class="control-panel">
      <div class="url-bar">
        <span class="url-icon">🔗</span>
        <input
          v-model="requestUrl"
          type="text"
          class="url-input"
          readonly
        >
        <button
          class="action-btn"
          :disabled="isRequesting"
          @click="simulateRequest"
        >
          {{ isRequesting ? 'Đang gửi...' : 'Gửi request' }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="flow-container">
        <div
          v-for="(step, i) in steps"
          :key="i"
          :class="['flow-step', {
            active: requestStep > i,
            current: requestStep === i + 1
          }]"
        >
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-info">
            <span class="step-label">{{ step.label }}</span>
            <span class="step-desc">{{ step.desc }}</span>
          </div>
          <div v-if="i < steps.length - 1" :class="['step-arrow', { active: requestStep > i }]">→</div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="responseText" class="response-box">
          <span class="response-label">Kết quả response:</span>
          <code>{{ responseText }}</code>
        </div>
      </transition>

      <div class="loopback-explain">
        <div class="loopback-diagram">
          <div class="loopback-node app">
            <span>App của bạn</span>
            <span class="small">(Trình duyệt)</span>
          </div>
          <div class="loopback-arrow">
            <span class="arrow-text">Request không ra khỏi máy</span>
            <svg width="80" height="60" viewBox="0 0 80 60">
              <path d="M10 10 Q40 55 70 10" stroke="var(--vp-c-brand)" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill="var(--vp-c-brand)" />
                </marker>
              </defs>
            </svg>
          </div>
          <div class="loopback-node server">
            <span>Dịch vụ local</span>
            <span class="small">(:3000)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="alias-section">
      <div class="alias-title">Các &quot;biệt danh&quot; của localhost (bấm để xem giải thích)</div>
      <div class="alias-grid">
        <div
          v-for="(alias, i) in aliases"
          :key="i"
          :class="['alias-card', { active: selectedAlias === i }]"
          @click="selectAlias(i)"
        >
          <code class="alias-name">{{ alias.name }}</code>
          <span class="alias-ip">→ {{ alias.ip }}</span>
        </div>
      </div>
      <div class="alias-desc">
        {{ aliases[selectedAlias].desc }}:
        <template v-if="selectedAlias === 0">
          Đây là mapping được ghi trong file <code>/etc/hosts</code> trên máy của bạn. Khi trình duyệt thấy <code>localhost</code>, nó resolve thẳng thành <code>127.0.0.1</code>, không hỏi DNS server.
        </template>
        <template v-else-if="selectedAlias === 1">
          <code>127.0.0.1</code> là địa chỉ loopback của IPv4. Gói tin gửi tới đây không bao giờ rời máy, hệ điều hành quay vòng nội bộ luôn.
        </template>
        <template v-else-if="selectedAlias === 2">
          <code>::1</code> là phiên bản IPv6 của loopback, chức năng y hệt <code>127.0.0.1</code> chỉ khác định dạng IPv6.
        </template>
        <template v-else>
          <code>0.0.0.0</code> không phải &quot;một địa chỉ&quot; mà là &quot;mọi địa chỉ&quot;. Khi dịch vụ listen <code>0.0.0.0:3000</code>, mọi NIC (kể cả IP LAN và 127.0.0.1) đều truy cập được.
        </template>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý chính:</strong> localhost chính là &quot;máy tự gọi chính nó&quot;. Gói tin đi qua loopback interface và quay vòng trong máy, không qua dây mạng, không qua router, cực nhanh và rất an toàn.
    </div>
  </div>
</template>

<style scoped>
.localhost-demo {
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
}

.url-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.url-icon { font-size: 1rem; }

.url-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  outline: none;
}

.action-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visualization-area {
  padding: 1rem;
}

.flow-container {
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  opacity: 0.4;
  transition: all 0.3s;
  flex-shrink: 0;
}

.flow-step.active {
  opacity: 1;
}

.flow-step.current {
  opacity: 1;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 8px rgba(100, 108, 255, 0.3);
}

.step-icon { font-size: 1.2rem; }

.step-info {
  display: flex;
  flex-direction: column;
}

.step-label {
  font-weight: 600;
  font-size: 0.82rem;
}

.step-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.step-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-divider);
  transition: color 0.3s;
  margin: 0 0.1rem;
  flex-shrink: 0;
}

.step-arrow.active {
  color: var(--vp-c-brand);
}

.response-box {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--vp-c-green-1);
  border-radius: 6px;
  font-size: 0.85rem;
}

.response-label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.response-box code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
}

.loopback-explain {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.loopback-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loopback-node {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 0.88rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.loopback-node .small {
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.loopback-node.app {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid #3b82f6;
  color: #3b82f6;
}

.loopback-node.server {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  color: #10b981;
}

.loopback-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-text {
  font-size: 0.72rem;
  color: var(--vp-c-brand);
  font-weight: 500;
}

.alias-section {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.alias-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.alias-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.alias-card {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.alias-card:hover {
  border-color: var(--vp-c-brand);
}

.alias-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(100, 108, 255, 0.08);
}

.alias-name {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
}

.alias-ip {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.alias-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  line-height: 1.6;
}

.alias-desc code {
  font-size: 0.8rem;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .alias-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .flow-container {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .step-arrow {
    display: none;
  }
  .loopback-diagram {
    flex-direction: column;
  }
}
</style>
