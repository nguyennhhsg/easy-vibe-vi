<template>
  <div class="sc-root">
    <div class="sc-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">Demo HTTP status code</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">&gt; </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">&gt; </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <div class="sc-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'sc-btn',
          { 'sc-btn--on': active === op.id, 'sc-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="sc-btn sc-btn--reset" :disabled="running" @click="reset">
        Đặt lại
      </button>
    </div>

    <div class="sc-codes">
      <div class="code-section">
        <div class="section-header success">
          <span class="section-icon">✅</span>
          <span class="section-title">2xx Thành công</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in successCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header client">
          <span class="section-icon">⚠️</span>
          <span class="section-title">4xx Lỗi client</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in clientCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header server">
          <span class="section-icon">🔴</span>
          <span class="section-title">5xx Lỗi server</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in serverCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="sc-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '// Nhấn nút để xem ý nghĩa các status code' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const activeCode = ref(null)
const hint = ref('Nhấn nút lệnh để tìm hiểu các HTTP status code phổ biến.')

const successCodes = ref([
  { code: 200, name: 'OK', desc: 'Request thành công' },
  { code: 201, name: 'Created', desc: 'Đã tạo thành công' },
  { code: 204, name: 'No Content', desc: 'Thành công, không có nội dung trả về' }
])

const clientCodes = ref([
  { code: 400, name: 'Bad Request', desc: 'Sai định dạng request' },
  { code: 401, name: 'Unauthorized', desc: 'Chưa xác thực' },
  { code: 403, name: 'Forbidden', desc: 'Không có quyền' },
  { code: 404, name: 'Not Found', desc: 'Resource không tồn tại' },
  { code: 422, name: 'Unprocessable', desc: 'Sai về mặt ngữ nghĩa' },
  { code: 429, name: 'Too Many', desc: 'Quá nhiều request' }
])

const serverCodes = ref([
  { code: 500, name: 'Server Error', desc: 'Lỗi nội bộ server' },
  { code: 502, name: 'Bad Gateway', desc: 'Lỗi gateway' },
  { code: 503, name: 'Unavailable', desc: 'Dịch vụ không khả dụng' }
])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: '200',
    cmd: '200 OK',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Status code thành công thường dùng nhất' },
      { kind: 'grn', text: 'HTTP/1.1 200 OK' },
      { kind: 'dim', text: 'Content-Type: application/json' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 0, "data": { ... } }' }
    ],
    hint: '200 nghĩa là request đã được xử lý thành công. Thường dùng cho GET query, PUT/PATCH update.',
    do: () => {
      activeCode.value = 200
    }
  },
  {
    id: '201',
    cmd: '201 Created',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Tạo resource thành công' },
      { kind: 'grn', text: 'HTTP/1.1 201 Created' },
      { kind: 'dim', text: 'Location: /api/users/123' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 0, "data": { "id": 123 } }' }
    ],
    hint: '201 nghĩa là tạo resource thành công. Header Location trỏ đến địa chỉ resource mới.',
    do: () => {
      activeCode.value = 201
    }
  },
  {
    id: '400',
    cmd: '400 Bad Request',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Request của client có vấn đề' },
      { kind: 'red', text: 'HTTP/1.1 400 Bad Request' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10001, "message": "Sai định dạng tham số" }' }
    ],
    hint: '400 nghĩa là sai cú pháp request. Ví dụ JSON sai định dạng, thiếu tham số bắt buộc.',
    do: () => {
      activeCode.value = 400
    }
  },
  {
    id: '401',
    cmd: '401 Unauthorized',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Cần đăng nhập xác thực' },
      { kind: 'red', text: 'HTTP/1.1 401 Unauthorized' },
      { kind: 'dim', text: 'WWW-Authenticate: Bearer' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10018, "message": "Vui lòng đăng nhập" }' }
    ],
    hint: '401 nghĩa là chưa xác thực. Trả về khi Token hết hạn hoặc chưa đăng nhập, client nên hướng dẫn người dùng đăng nhập.',
    do: () => {
      activeCode.value = 401
    }
  },
  {
    id: '403',
    cmd: '403 Forbidden',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Đã đăng nhập nhưng không có quyền' },
      { kind: 'red', text: 'HTTP/1.1 403 Forbidden' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10021, "message": "Cần quyền quản trị" }' }
    ],
    hint: '403 nghĩa là đã xác thực nhưng không có quyền. Trả về khi user thường truy cập endpoint dành cho admin.',
    do: () => {
      activeCode.value = 403
    }
  },
  {
    id: '404',
    cmd: '404 Not Found',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Resource không tồn tại' },
      { kind: 'red', text: 'HTTP/1.1 404 Not Found' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10002, "message": "Người dùng không tồn tại" }' }
    ],
    hint: '404 nghĩa là resource không tồn tại. URL sai hoặc resource đã bị xóa.',
    do: () => {
      activeCode.value = 404
    }
  },
  {
    id: '500',
    cmd: '500 Server Error',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// Lỗi nội bộ server' },
      { kind: 'red', text: 'HTTP/1.1 500 Internal Server Error' },
      { kind: 'dim', text: '' },
      {
        kind: 'red',
        text: '{ "code": 10000, "message": "Lỗi server, vui lòng liên hệ quản trị viên" }'
      }
    ],
    hint: '500 nghĩa là lỗi nội bộ server. Bug trong code, kết nối database fail v.v. Đừng bao giờ lộ stack trace!',
    do: () => {
      activeCode.value = 500
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  activeCode.value = null
  hint.value = ''
  typing.value = ''

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(18)
  }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: op.cmd })
  typing.value = ''
  await nextTick()
  scroll()
  await sleep(150)

  for (const l of op.output) {
    lines.value.push(l)
    await nextTick()
    scroll()
    await sleep(50)
  }

  op.do()
  await sleep(120)
  hint.value = op.hint
  running.value = false
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: '// Nhấn nút để xem ý nghĩa các status code' }]
  active.value = null
  activeCode.value = null
  hint.value = 'Nhấn nút lệnh để tìm hiểu các HTTP status code phổ biến.'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.sc-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.sc-terminal {
  background: #141420;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.term-title {
  margin-left: 8px;
  font-size: 0.72rem;
  color: #666;
  font-family: monospace;
}

.term-body {
  min-height: 90px;
  max-height: 140px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.6;
  color: #cdd6f4;
}
.t-line {
  display: flex;
  min-width: min-content;
}
.t-ps {
  color: #89b4fa;
  flex-shrink: 0;
}
.t-cmd {
  color: #cdd6f4;
}
.t-dim {
  color: #585b70;
}
.t-grn {
  color: #a6e3a1;
}
.t-red {
  color: #f38ba8;
}
.t-typing {
  color: #cdd6f4;
}
.t-cur {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.sc-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.sc-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sc-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.sc-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.sc-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.sc-btn--on code {
  color: var(--vp-c-brand);
}
.sc-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.sc-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.sc-btn--reset code {
  display: none;
}
.sc-btn--reset::after {
  content: 'Đặt lại';
  font-size: 0.7rem;
  color: #585b70;
}

.sc-codes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.code-section {
  border-right: 1px solid var(--vp-c-divider);
}
.code-section:last-child {
  border-right: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  font-weight: 700;
  font-size: 0.8rem;
}
.section-header.success {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg-alt));
  color: #22c55e;
}
.section-header.client {
  background: color-mix(in srgb, #f59e0b 8%, var(--vp-c-bg-alt));
  color: #d97706;
}
.section-header.server {
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-alt));
  color: #ef4444;
}

.section-icon {
  font-size: 0.9rem;
}
.section-title {
  font-size: 0.75rem;
}

.section-body {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
}
.code-item.active {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 8%, var(--vp-c-bg));
}

.code-num {
  font-family: monospace;
  font-weight: 700;
  font-size: 0.75rem;
  min-width: 28px;
}
.code-item.active .code-num {
  color: var(--vp-c-brand);
}

.code-name {
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.code-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.sc-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .sc-codes {
    grid-template-columns: 1fr;
  }
  .code-section {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .code-section:last-child {
    border-bottom: none;
  }
}
</style>
