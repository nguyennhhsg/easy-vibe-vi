<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">Cách inject khóa bí mật ở môi trường production</span>
      <span class="subtitle">.env là công cụ dev, trên server không thể chỉ trông cậy vào nó</span>
    </div>

    <div class="tab-bar">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="tab-btn"
        :class="{ active: current === s.id }"
        @click="current = s.id"
      >
        {{ s.icon }} {{ s.label }}
      </button>
    </div>

    <div class="scenario-body">
      <div class="code-block">
        <div class="code-title">{{ currentScenario.codeTitle }}</div>
        <div class="code-area">
          <div
            v-for="(line, i) in currentScenario.lines"
            :key="i"
            class="code-line"
            :class="line.type"
          >
            <span class="line-content" v-html="line.text" />
          </div>
        </div>
      </div>

      <div class="tips">
        <div v-for="tip in currentScenario.tips" :key="tip.text" class="tip" :class="tip.level">
          <span class="tip-dot" />
          <span class="tip-text">{{ tip.text }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Nguyên tắc:</strong> File .env là công cụ tiện lợi cho dev local, ở production nên để nền tảng vận hành chịu trách nhiệm inject biến môi trường — code hoàn toàn không cần biết khóa nằm ở đâu hay đến từ đâu.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const current = ref('systemd')

const scenarios = [
  { id: 'systemd', icon: '🖥️', label: 'Server (systemd)' },
  { id: 'cloud', icon: '☁️', label: 'Nền tảng cloud (Vercel...)' },
  { id: 'docker', icon: '🐳', label: 'Docker' }
]

const scenarioData = {
  systemd: {
    codeTitle: '/etc/systemd/system/myapp.service',
    lines: [
      { type: 'comment', text: '# Khuyến nghị: dùng file khóa riêng, có thể kiểm soát quyền' },
      { type: 'normal', text: '[Service]' },
      { type: 'highlight', text: 'EnvironmentFile=/etc/myapp/secrets.env' },
      { type: 'normal', text: 'ExecStart=/usr/bin/node /app/index.js' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# Đặt quyền file: chỉ chủ sở hữu mới đọc được' },
      { type: 'good', text: 'sudo chmod 600 /etc/myapp/secrets.env' },
      { type: 'good', text: 'sudo chown deploy:deploy /etc/myapp/secrets.env' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# Áp dụng cấu hình rồi khởi động lại service' },
      { type: 'normal', text: 'sudo systemctl daemon-reload' },
      { type: 'normal', text: 'sudo systemctl restart myapp' }
    ],
    tips: [
      { level: 'safe', text: 'Sau khi chmod 600, chỉ user deploy đọc được file khóa, các tài khoản khác không truy cập được' },
      { level: 'safe', text: 'Khóa và code tách biệt hoàn toàn, đổi khóa không cần deploy lại code' },
      { level: 'warn', text: 'Đừng ghi trực tiếp Environment="KEY=val" trong file systemd — đổi phải reload và giá trị nằm dạng plain text trong cấu hình' }
    ]
  },
  cloud: {
    codeTitle: 'Dashboard nền tảng cloud (Vercel / Railway / Render / Netlify)',
    lines: [
      { type: 'comment', text: '# Thao tác trên giao diện dashboard, không cần viết file cấu hình' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# Nền tảng sẽ tự inject biến vào môi trường runtime' },
      { type: 'normal', text: '# Code không đổi, vẫn đọc như thường:' },
      { type: 'highlight', text: 'const key = process.env.OPENAI_API_KEY' },
      { type: 'highlight', text: 'api_key = os.environ.get("OPENAI_API_KEY")' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# Thường hỗ trợ đặt giá trị khác nhau theo môi trường:' },
      { type: 'normal', text: '# Preview  → OPENAI_API_KEY = sk-test-...' },
      { type: 'normal', text: '# Production → OPENAI_API_KEY = sk-prod-...' }
    ],
    tips: [
      { level: 'safe', text: 'Nền tảng lưu khóa được mã hóa, ngay cả bạn cũng không xem lại được giá trị gốc (chỉ có thể tạo mới)' },
      { level: 'safe', text: 'Hỗ trợ tách Preview / Production, test và production dùng khóa khác nhau' },
      { level: 'info', text: 'Đừng commit file .env vào Git rồi để nền tảng đọc — như vậy khóa lại lọt vào repository' }
    ]
  },
  docker: {
    codeTitle: 'docker run / docker-compose.yml',
    lines: [
      { type: 'comment', text: '# ❌ Sai: ghi vào ENV của Dockerfile sẽ bị cố định trong layer của image' },
      { type: 'bad', text: 'ENV OPENAI_API_KEY=sk-xxx  <span class="warn-inline">← Bất kỳ ai cũng có thể docker inspect để lấy</span>' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# ✅ Đúng: inject từ env của host khi runtime' },
      { type: 'highlight', text: 'docker run \\' },
      { type: 'highlight', text: '  -e OPENAI_API_KEY="$OPENAI_API_KEY" \\' },
      { type: 'highlight', text: '  -e DATABASE_URL="$DATABASE_URL" \\' },
      { type: 'highlight', text: '  myapp:latest' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# Hoặc dùng --env-file (file không commit vào Git)' },
      { type: 'good', text: 'docker run --env-file .env myapp:latest' }
    ],
    tips: [
      { level: 'safe', text: 'Bản thân image không chứa khóa nào, có thể an toàn upload lên Registry công khai' },
      { level: 'safe', text: '--env-file đọc khi runtime, file không cần đưa vào image' },
      { level: 'warn', text: 'docker history có thể xem nội dung mọi layer — ghi vào ENV trong Dockerfile là khóa bị lộ vĩnh viễn' }
    ]
  }
}

const currentScenario = computed(() => scenarioData[current.value])
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.tab-bar {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.28rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
  white-space: nowrap;
}

.tab-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.tab-btn.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: white; }

.scenario-body {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .scenario-body { grid-template-columns: 1fr; }
}

.code-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  min-width: 0;
}

.code-title {
  background: var(--vp-c-bg-alt);
  padding: 0.3rem 0.65rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-area {
  background: #1e1e2e;
  padding: 0.45rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line {
  padding: 0 0.7rem;
  min-width: max-content;
}

.code-line.highlight { background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent); }
.code-line.good { background: color-mix(in srgb, #4ade80 6%, transparent); }
.code-line.bad { background: color-mix(in srgb, #f87171 10%, transparent); }

.line-content { color: #cdd6f4; white-space: pre; }
.code-line.comment .line-content { color: #6c7086; font-style: italic; }
.code-line.bad .line-content { color: #f38ba8; }
.code-line.good .line-content { color: #a6e3a1; }

:deep(.warn-inline) { color: #f87171; font-size: 0.7em; }

.tips {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.tip {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 0.45rem 0.6rem;
  border-left: 3px solid;
}

.tip.safe { border-left-color: var(--vp-c-green-1); }
.tip.warn { border-left-color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info { border-left-color: var(--vp-c-brand); }

.tip-dot { flex-shrink: 0; margin-top: 5px; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.tip.safe .tip-dot { color: var(--vp-c-green-1); }
.tip.warn .tip-dot { color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info .tip-dot { color: var(--vp-c-brand); }

.tip-text {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: var(--vp-c-text-1); }
</style>
