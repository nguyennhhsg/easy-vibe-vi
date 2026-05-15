<template>
  <div class="config-drift-demo">
    <div class="demo-label">Demo tương tác ── Config drift: quả bom hẹn giờ thầm lặng</div>

    <div class="timeline">
      <div class="timeline-track">
        <div
          v-for="(event, i) in events"
          :key="i"
          :class="['timeline-node', event.type, { active: step >= i }]"
          @click="goToStep(i)"
        >
          <div class="node-dot"></div>
          <div class="node-label">{{ event.label }}</div>
        </div>
      </div>
    </div>

    <div class="scene-area">
      <div class="infra-visual">
        <div class="server-group">
          <div class="group-title">Trạng thái mong muốn (code định nghĩa)</div>
          <div class="server-cards">
            <div v-for="s in expectedServers" :key="s.name" class="server-card expected">
              <div class="server-icon">🖥️</div>
              <div class="server-name">{{ s.name }}</div>
              <div class="server-config">{{ s.config }}</div>
            </div>
          </div>
        </div>

        <div class="drift-indicator">
          <div :class="['drift-status', driftLevel]">
            <span class="drift-icon">{{ driftIcon }}</span>
            <span class="drift-text">{{ driftText }}</span>
          </div>
        </div>

        <div class="server-group">
          <div class="group-title">Trạng thái thực tế (môi trường production)</div>
          <div class="server-cards">
            <div
              v-for="s in actualServers"
              :key="s.name"
              :class="['server-card', 'actual', { drifted: s.drifted }]"
            >
              <div class="server-icon">{{ s.drifted ? '⚠️' : '🖥️' }}</div>
              <div class="server-name">{{ s.name }}</div>
              <div class="server-config">{{ s.config }}</div>
              <div v-if="s.driftReason" class="drift-reason">{{ s.driftReason }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="event-desc">
        <div class="event-title">{{ events[step].title }}</div>
        <p class="event-detail">{{ events[step].detail }}</p>
      </div>
    </div>

    <div class="controls">
      <button class="ctrl-btn" :disabled="step === 0" @click="goToStep(step - 1)">← Bước trước</button>
      <button class="ctrl-btn reset" @click="goToStep(0)">Reset</button>
      <button class="ctrl-btn primary" :disabled="step >= events.length - 1" @click="goToStep(step + 1)">
        Bước sau →
      </button>
    </div>

    <div class="lesson-box">
      <div class="lesson-title">Bài học then chốt</div>
      <div class="lesson-items">
        <div v-for="(lesson, i) in lessons" :key="i" class="lesson-item">
          <span class="lesson-icon">{{ lesson.icon }}</span>
          <span class="lesson-text">{{ lesson.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)

const events = [
  {
    label: 'Deploy ban đầu',
    type: 'good',
    title: 'Bước 0: Deploy ban đầu bằng IaC',
    detail: 'Team dùng Terraform deploy 3 web server, cấu hình giống hệt nhau: Nginx 1.24, port 443, 2GB memory. Code và trạng thái thực tế khớp hoàn hảo.'
  },
  {
    label: 'Sửa tay',
    type: 'warn',
    title: 'Bước 1: Sửa tay khẩn cấp lúc nửa đêm',
    detail: '3 giờ sáng, Server-B có vấn đề hiệu năng. Engineer trực SSH thẳng vào, nâng memory từ 2GB lên 4GB và sửa cấu hình Nginx. Không cập nhật code IaC.'
  },
  {
    label: 'Sửa tiếp',
    type: 'warn',
    title: 'Bước 2: Điều chỉnh "tạm" của đồng nghiệp khác',
    detail: 'Một tuần sau, engineer khác mở port 22 (SSH) trên Server-C để debug, và cài thêm công cụ debug. Cũng không cập nhật code.'
  },
  {
    label: 'Drift nặng',
    type: 'bad',
    title: 'Bước 3: Config drift đã mất kiểm soát',
    detail: 'Lúc này 3 server "giống nhau" thực tế đã khác nhau. Trạng thái mô tả trong code và trạng thái thật ngoài production khác nhau nghiêm trọng, không ai chắc chắn cấu hình thật trên production là gì.'
  },
  {
    label: 'IaC phát hiện',
    type: 'fix',
    title: 'Bước 4: terraform plan phát hiện drift',
    detail: 'Chạy terraform plan, Terraform so sánh file state với tài nguyên thực tế, liệt kê rõ mọi khác biệt. Team quyết định rollback các thay đổi tay, thống nhất quản lý qua code.'
  }
]

const expectedServers = [
  { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB' },
  { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB' },
  { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB' }
]

const actualServers = computed(() => {
  if (step.value === 0) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
    ]
  }
  if (step.value === 1) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.25 | 443 | 4GB', drifted: true, driftReason: 'Nâng memory và Nginx bằng tay' },
      { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
    ]
  }
  if (step.value === 2 || step.value === 3) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.25 | 443 | 4GB', drifted: true, driftReason: 'Nâng memory và Nginx bằng tay' },
      { name: 'Server-C', config: 'Nginx 1.24 | 22+443 | 2GB', drifted: true, driftReason: 'Mở port SSH' }
    ]
  }
  // step 4: fix
  return [
    { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
    { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
    { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
  ]
})

const driftLevel = computed(() => {
  if (step.value === 0 || step.value === 4) return 'ok'
  if (step.value <= 2) return 'warning'
  return 'danger'
})

const driftIcon = computed(() => {
  if (driftLevel.value === 'ok') return '✅'
  if (driftLevel.value === 'warning') return '⚠️'
  return '🔥'
})

const driftText = computed(() => {
  if (step.value === 0) return 'Trạng thái nhất quán'
  if (step.value === 4) return 'Đã sửa xong drift'
  if (step.value === 1) return '1 máy bị drift'
  if (step.value === 2) return '2 máy bị drift'
  return 'Drift nghiêm trọng!'
})

const lessons = [
  { icon: '🚫', text: 'Cấm sửa tay môi trường production, mọi thay đổi phải qua code' },
  { icon: '🔍', text: 'Chạy terraform plan định kỳ để phát hiện drift' },
  { icon: '🔒', text: 'Giới hạn quyền SSH ở production, giảm can thiệp thủ công' },
  { icon: '📋', text: 'Thiết lập quy trình duyệt thay đổi (PR → Review → Merge → Apply)' }
]

function goToStep(i) {
  step.value = Math.max(0, Math.min(i, events.length - 1))
}
</script>

<style scoped>
.config-drift-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}
.timeline { margin-bottom: 1rem; overflow-x: auto; }
.timeline-track {
  display: flex;
  align-items: flex-start;
  gap: 0;
  min-width: max-content;
  position: relative;
  padding: 0 0.5rem;
}
.timeline-node {
  flex: 1;
  min-width: 90px;
  text-align: center;
  cursor: pointer;
  position: relative;
  padding-top: 20px;
}
.timeline-node::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-divider);
}
.timeline-node:first-child::before { left: 50%; }
.timeline-node:last-child::before { right: 50%; }
.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  margin: 0 auto 4px;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}
.timeline-node.active .node-dot { transform: scale(1.3); }
.timeline-node.active.good .node-dot { background: #10b981; border-color: #10b981; }
.timeline-node.active.warn .node-dot { background: #f59e0b; border-color: #f59e0b; }
.timeline-node.active.bad .node-dot { background: #ef4444; border-color: #ef4444; }
.timeline-node.active.fix .node-dot { background: #3b82f6; border-color: #3b82f6; }
.node-label { font-size: 0.68rem; color: var(--vp-c-text-3); }
.timeline-node.active .node-label { font-weight: 600; color: var(--vp-c-text-1); }

.scene-area { margin-bottom: 1rem; }
.infra-visual {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}
.group-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  text-align: center;
}
.server-cards {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  flex-wrap: wrap;
}
.server-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  text-align: center;
  min-width: 120px;
  transition: all 0.3s;
  font-size: 0.73rem;
}
.server-card.expected { border-color: #10b981; }
.server-card.drifted {
  border-color: #ef4444;
  background: #fef2f210;
  box-shadow: 0 0 0 1px #fca5a540;
}
.server-icon { font-size: 1.2rem; }
.server-name { font-weight: 600; font-size: 0.75rem; }
.server-config { font-size: 0.68rem; color: var(--vp-c-text-2); }
.drift-reason {
  font-size: 0.62rem;
  color: #ef4444;
  margin-top: 2px;
  font-style: italic;
}
.drift-indicator { text-align: center; }
.drift-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  border-radius: 16px;
  font-size: 0.78rem;
  font-weight: 600;
}
.drift-status.ok { background: #d1fae5; color: #065f46; }
.drift-status.warning { background: #fef3c7; color: #92400e; }
.drift-status.danger { background: #fee2e2; color: #991b1b; }
:root.dark .drift-status.ok { background: #022c2240; color: #6ee7b7; }
:root.dark .drift-status.warning { background: #451a0340; color: #fcd34d; }
:root.dark .drift-status.danger { background: #450a0a40; color: #fca5a5; }

.event-desc {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.8rem;
  background: var(--vp-c-bg);
}
.event-title { font-weight: 600; font-size: 0.88rem; margin-bottom: 4px; }
.event-detail { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; }

.controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.ctrl-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.78rem;
  transition: all 0.2s;
}
.ctrl-btn:disabled { opacity: 0.4; cursor: default; }
.ctrl-btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.ctrl-btn.reset { color: var(--vp-c-text-3); }

.lesson-box {
  border: 1px solid #3b82f640;
  border-radius: 6px;
  padding: 0.8rem;
  background: #dbeafe10;
}
.lesson-title {
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
  color: #2563eb;
}
:root.dark .lesson-title { color: #93c5fd; }
.lesson-items { display: flex; flex-direction: column; gap: 0.3rem; }
.lesson-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
}
</style>
