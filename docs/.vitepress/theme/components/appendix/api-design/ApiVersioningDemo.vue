<template>
  <div class="av-root">
    <div class="av-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">Demo quản lý version API</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">$ </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">$ </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <div class="av-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'av-btn',
          { 'av-btn--on': active === op.id, 'av-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="av-btn av-btn--reset" :disabled="running" @click="reset">
        Đặt lại
      </button>
    </div>

    <div class="av-versions">
      <div class="version-col" :class="{ active: activeVersion === 'v1' }">
        <div class="version-header v1">
          <span class="version-name">v1 (bản cũ)</span>
          <span class="version-status">Tương thích client cũ</span>
        </div>
        <div class="version-body">
          <div class="api-item">
            <code>GET /v1/users</code>
            <span class="api-desc">Trả về name, email</span>
          </div>
          <div class="api-item">
            <code>POST /v1/orders</code>
            <span class="api-desc">Nhận mảng items</span>
          </div>
        </div>
      </div>

      <div class="version-arrow">
        <span class="arrow-text">Nâng cấp</span>
        <span class="arrow-symbol">→</span>
      </div>

      <div class="version-col" :class="{ active: activeVersion === 'v2' }">
        <div class="version-header v2">
          <span class="version-name">v2 (bản mới)</span>
          <span class="version-status">Tính năng mới ở đây</span>
        </div>
        <div class="version-body">
          <div class="api-item">
            <code>GET /v2/users</code>
            <span class="api-desc">Trả về name, email, avatar, phone</span>
          </div>
          <div class="api-item">
            <code>POST /v2/orders</code>
            <span class="api-desc">Nhận items + coupons</span>
          </div>
          <div class="api-item new">
            <code>POST /v2/orders/batch</code>
            <span class="api-desc">🆕 Đặt hàng hàng loạt</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="av-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '# Quản lý version API: giúp interface cũ và mới cùng tồn tại' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const activeVersion = ref('')
const hint = ref('Nhấn nút để tìm hiểu chiến lược và best practice cho việc quản lý version API.')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: 'why',
    cmd: 'Vì sao cần version?',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Tình huống: App của bạn có 1 triệu người dùng' },
      { kind: 'dim', text: '' },
      { kind: 'yel', text: 'Vấn đề: cần đổi interface đơn hàng, thêm field mới, bỏ field cũ' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '❌ Nếu không quản lý version:' },
      { kind: 'red', text: '   App mới gọi interface mới → bình thường' },
      { kind: 'red', text: '   App cũ gọi interface mới → thiếu field, crash!' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '✅ Cách làm đúng:' },
      { kind: 'grn', text: '   /v1/orders - interface cũ, tiếp tục phục vụ app cũ' },
      { kind: 'grn', text: '   /v2/orders - interface mới, tính năng mới ở đây' }
    ],
    hint: 'Versioning giúp client cũ và mới đều chạy ổn. Người dùng app cũ có thời gian từ từ nâng cấp mà không bị crash đột ngột.',
    do: () => {
      activeVersion.value = ''
    }
  },
  {
    id: 'url',
    cmd: 'Cách 1: version trong URL path',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Cách phổ biến nhất' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /v1/users' },
      { kind: 'grn', text: 'GET /v2/users' },
      { kind: 'grn', text: 'GET /v3/users' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Ưu điểm: trực quan, dễ cache, thân thiện với browser' },
      { kind: 'dim', text: 'Nhược điểm: URL dài hơn' }
    ],
    hint: 'Version trong URL path là cách phổ biến nhất. GitHub, Twitter, Stripe đều dùng cách này.',
    do: () => {
      activeVersion.value = 'v1'
    }
  },
  {
    id: 'header',
    cmd: 'Cách 2: version qua Header',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Chỉ định version qua request header' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /users' },
      { kind: 'grn', text: 'Accept: application/vnd.myapi.v2+json' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Hoặc:' },
      { kind: 'grn', text: 'GET /users' },
      { kind: 'grn', text: 'X-API-Version: 2' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Ưu điểm: URL gọn' },
      { kind: 'dim', text: 'Nhược điểm: khó debug, cache phức tạp' }
    ],
    hint: 'Version qua Header giúp URL gọn nhưng khi debug phải set thêm Header, không trực quan bằng URL.',
    do: () => {
      activeVersion.value = 'v2'
    }
  },
  {
    id: 'query',
    cmd: 'Cách 3: version qua query param',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Chỉ định version qua query parameter' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /users?version=1' },
      { kind: 'grn', text: 'GET /users?version=2' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Ưu điểm: đơn giản, dễ tương thích ngược' },
      { kind: 'dim', text: 'Nhược điểm: dễ bị bỏ quên, không chuẩn RESTful' }
    ],
    hint: 'Version qua query parameter đơn giản nhưng không "chuẩn" lắm. Hợp với API nội bộ hoặc dự án iterate nhanh.',
    do: () => {
      activeVersion.value = ''
    }
  },
  {
    id: 'best',
    cmd: 'Best practice',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Best practice cho versioning' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '1. Thêm version /v1/ ngay từ đầu' },
      { kind: 'grn', text: '2. Tính năng mới ở version mới, version cũ giữ ổn định' },
      { kind: 'grn', text: '3. Đặt timeline ngừng hỗ trợ (vd v1 sẽ ngừng 2025-06)' },
      { kind: 'grn', text: '4. Response header báo version hiện tại và thông tin deprecated' },
      { kind: 'grn', text: '5. Tài liệu ghi rõ các thay đổi giữa các version' }
    ],
    hint: 'Versioning không phải việc "để sau", cần lên kế hoạch ngay từ ngày đầu. Khi deprecate version cũ phải cho người dùng đủ thời gian di chuyển.',
    do: () => {
      activeVersion.value = 'v2'
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
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
  lines.value = [{ kind: 'dim', text: '# Quản lý version API: giúp interface cũ và mới cùng tồn tại' }]
  active.value = null
  activeVersion.value = ''
  hint.value = 'Nhấn nút để tìm hiểu chiến lược và best practice cho việc quản lý version API.'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.av-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.av-terminal {
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
  min-height: 100px;
  max-height: 180px;
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
  color: #a6e3a1;
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
.t-yel {
  color: #f9e2af;
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

.av-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.av-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.av-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.av-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.av-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.av-btn--on code {
  color: var(--vp-c-brand);
}
.av-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.av-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.av-btn--reset code {
  display: none;
}
.av-btn--reset::after {
  content: 'Đặt lại';
  font-size: 0.7rem;
  color: #585b70;
}

.av-versions {
  display: flex;
  align-items: stretch;
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.version-col {
  flex: 1;
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-left: none;
  transition: all 0.3s;
}
.version-col:last-child {
  border-right: none;
}
.version-col.active {
  background: color-mix(in srgb, var(--vp-c-brand) 4%, var(--vp-c-bg));
}

.version-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 0.85rem;
}
.version-header.v1 {
  background: color-mix(in srgb, #64748b 10%, var(--vp-c-bg-alt));
  color: #64748b;
}
.version-header.v2 {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg-alt));
  color: var(--vp-c-brand);
}
.version-status {
  font-size: 0.7rem;
  font-weight: 400;
  opacity: 0.8;
}

.version-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.api-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}
.api-item.new {
  border-left: 3px solid #22c55e;
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg-soft));
}
.api-item code {
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
}
.api-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.version-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: var(--vp-c-text-3);
}
.arrow-text {
  font-size: 0.7rem;
}
.arrow-symbol {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.av-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .av-versions {
    flex-direction: column;
  }
  .version-col {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .version-arrow {
    flex-direction: row;
    padding: 8px 0;
  }
}
</style>
