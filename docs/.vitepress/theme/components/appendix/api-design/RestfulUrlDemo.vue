<template>
  <div class="ru-root">
    <div class="ru-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">Quy tắc thiết kế URL RESTful</span>
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

    <div class="ru-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'ru-btn',
          { 'ru-btn--on': active === op.id, 'ru-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="ru-btn ru-btn--reset" :disabled="running" @click="reset">
        Đặt lại
      </button>
    </div>

    <div class="ru-compare">
      <div class="compare-col compare-bad">
        <div class="compare-header">
          <span class="compare-icon">❌</span>
          <span class="compare-title">Ví dụ sai</span>
        </div>
        <div class="compare-body">
          <div
            v-for="(item, i) in badExamples"
            :key="i"
            class="url-row"
            :class="{ highlight: item.active }"
          >
            <code class="url-text">{{ item.url }}</code>
            <span class="url-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>

      <div class="compare-col compare-good">
        <div class="compare-header">
          <span class="compare-icon">✅</span>
          <span class="compare-title">Ví dụ đúng</span>
        </div>
        <div class="compare-body">
          <div
            v-for="(item, i) in goodExamples"
            :key="i"
            class="url-row"
            :class="{ highlight: item.active }"
          >
            <code class="url-text">{{ item.url }}</code>
            <span class="url-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="ru-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([
  { kind: 'dim', text: '# So sánh cách viết URL RESTful đúng và sai' }
])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('Nhấn nút lệnh để xem so sánh thiết kế URL trong các tình huống.')

const badExamples = ref([
  { url: 'GET /getUsers', reason: 'URL chứa động từ', active: false },
  { url: 'GET /user', reason: 'Dạng số ít', active: false },
  { url: 'GET /UserProfiles', reason: 'Có chữ in hoa', active: false },
  { url: 'GET /user_profiles', reason: 'Dùng gạch dưới', active: false },
  {
    url: 'GET /users/123/orders/456/items/789',
    reason: 'Lồng quá sâu',
    active: false
  },
  {
    url: 'GET /products/category/phone/price/5000',
    reason: 'Bộ lọc trong path',
    active: false
  }
])

const goodExamples = ref([
  { url: 'GET /users', reason: 'Danh từ + số nhiều', active: false },
  { url: 'GET /users', reason: 'Dạng số nhiều', active: false },
  { url: 'GET /user-profiles', reason: 'Chữ thường + gạch nối', active: false },
  { url: 'GET /user-profiles', reason: 'Nối bằng gạch nối', active: false },
  { url: 'GET /users/123/orders', reason: 'Tối đa 3 cấp', active: false },
  {
    url: 'GET /products?category=phone&price_max=5000',
    reason: 'Bộ lọc dùng query param',
    active: false
  }
])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: 'rule1',
    cmd: 'Quy tắc 1: dùng danh từ, không dùng động từ',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# URL là địa chỉ của resource, không phải hành động' },
      { kind: 'red', text: '❌ GET /getUsers' },
      { kind: 'red', text: '❌ GET /fetchUserInfo' },
      { kind: 'red', text: '❌ POST /createOrder' },
      { kind: 'grn', text: '✅ GET /users' },
      { kind: 'grn', text: '✅ GET /users/123' },
      { kind: 'grn', text: '✅ POST /orders' }
    ],
    hint: 'URL là "địa chỉ" của resource, HTTP method đã thể hiện "hành động". Đừng lặp lại "làm gì" trong URL.',
    do: () => {
      badExamples.value[0].active = true
      goodExamples.value[0].active = true
    }
  },
  {
    id: 'rule2',
    cmd: 'Quy tắc 2: dùng dạng số nhiều',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Số nhiều thể hiện collection, thống nhất phong cách' },
      { kind: 'red', text: '❌ GET /user' },
      { kind: 'red', text: '❌ GET /order' },
      { kind: 'grn', text: '✅ GET /users' },
      { kind: 'grn', text: '✅ GET /orders' },
      { kind: 'grn', text: '✅ GET /users/123  (lấy một item)' }
    ],
    hint: 'Thống nhất dùng số nhiều, tránh lẫn lộn /user và /users. Khi lấy một resource thì dùng /users/123.',
    do: () => {
      badExamples.value[1].active = true
      goodExamples.value[1].active = true
    }
  },
  {
    id: 'rule3',
    cmd: 'Quy tắc 3: chữ thường + gạch nối',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# URL phân biệt hoa thường, thống nhất chữ thường tránh nhầm lẫn' },
      { kind: 'red', text: '❌ GET /UserProfiles' },
      { kind: 'red', text: '❌ GET /user_profiles' },
      { kind: 'grn', text: '✅ GET /user-profiles' },
      { kind: 'grn', text: '✅ GET /order-items' }
    ],
    hint: 'URL phân biệt hoa thường, dùng chữ thường + gạch nối (-) là cách an toàn nhất.',
    do: () => {
      badExamples.value[2].active = true
      badExamples.value[3].active = true
      goodExamples.value[2].active = true
      goodExamples.value[3].active = true
    }
  },
  {
    id: 'rule4',
    cmd: 'Quy tắc 4: tránh lồng quá sâu',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Lồng quá sâu = coupling cao, khó bảo trì' },
      { kind: 'red', text: '❌ /users/123/orders/456/items/789/status' },
      { kind: 'grn', text: '✅ /users/123/orders  (đơn của user)' },
      { kind: 'grn', text: '✅ /orders/456/items  (sản phẩm trong đơn)' },
      { kind: 'grn', text: '✅ /order-items/789  (truy cập trực tiếp)' }
    ],
    hint: 'Quá 3 cấp thì cân nhắc refactor. Có thể dùng path phẳng hoặc query parameter thay vì lồng sâu.',
    do: () => {
      badExamples.value[4].active = true
      goodExamples.value[4].active = true
    }
  },
  {
    id: 'rule5',
    cmd: 'Quy tắc 5: filter dùng query param',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# Điều kiện filter hay đổi, không hợp đặt trong path' },
      { kind: 'red', text: '❌ /products/category/phone/price/5000' },
      { kind: 'grn', text: '✅ /products?category=phone&price_max=5000' },
      { kind: 'grn', text: '✅ /products?status=active&sort=created_desc' },
      { kind: 'grn', text: '✅ /products?category=phone,electronics' }
    ],
    hint: 'Query parameter có thể kết hợp linh hoạt, còn path thì cố định. Filter, sort, paging đều nên dùng query parameter.',
    do: () => {
      badExamples.value[5].active = true
      goodExamples.value[5].active = true
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''

  badExamples.value.forEach((e) => (e.active = false))
  goodExamples.value.forEach((e) => (e.active = false))

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
  lines.value = [{ kind: 'dim', text: '# So sánh cách viết URL RESTful đúng và sai' }]
  badExamples.value.forEach((e) => (e.active = false))
  goodExamples.value.forEach((e) => (e.active = false))
  active.value = null
  hint.value = 'Nhấn nút lệnh để xem so sánh thiết kế URL trong các tình huống.'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.ru-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.ru-terminal {
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
  max-height: 160px;
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

.ru-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.ru-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.ru-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.ru-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.ru-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.ru-btn--on code {
  color: var(--vp-c-brand);
}
.ru-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.ru-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.ru-btn--reset code {
  display: none;
}
.ru-btn--reset::after {
  content: 'Đặt lại';
  font-size: 0.7rem;
  color: #585b70;
}

.ru-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.compare-col {
  padding: 12px;
}
.compare-bad {
  background: color-mix(in srgb, #ef4444 4%, var(--vp-c-bg));
  border-right: 1px solid var(--vp-c-divider);
}
.compare-good {
  background: color-mix(in srgb, #22c55e 4%, var(--vp-c-bg));
}

.compare-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}
.compare-icon {
  font-size: 1rem;
}
.compare-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.compare-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.url-row {
  padding: 6px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.url-row.highlight {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 8%, var(--vp-c-bg));
}
.url-text {
  display: block;
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}
.url-reason {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.ru-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .ru-compare {
    grid-template-columns: 1fr;
  }
  .compare-bad {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
