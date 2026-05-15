<!--
  VueReactComparisonDemo.vue
  So sánh trực quan Vue vs React: cú pháp, cập nhật state, mental model render
-->
<template>
  <div class="vr-demo">
    <div class="header">
      <div class="title">
        Vue vs React: chúng giống và khác nhau ở đâu?
      </div>
      <div class="subtitle">
        Chọn một tab, rồi bấm "+1" để xem điều gì xảy ra phía sau (minh hoạ).
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ active: currentTab === t.key }"
        @click="currentTab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">
          Vue
        </div>
        <div class="preview">
          <div class="row">
            count: <strong>{{ count }}</strong>
          </div>
          <button
            class="btn vue"
            @click="inc('vue')"
          >
            +1
          </button>
        </div>
        <div class="code">
          <div class="code-title">
            Cách viết tiêu biểu (minh hoạ)
          </div>
          <pre><code class="language-vue">{{ vueCode }}</code></pre>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">
          React
        </div>
        <div class="preview">
          <div class="row">
            count: <strong>{{ count }}</strong>
          </div>
          <button
            class="btn react"
            @click="inc('react')"
          >
            +1
          </button>
        </div>
        <div class="code">
          <div class="code-title">
            Cách viết tiêu biểu (minh hoạ)
          </div>
          <pre><code class="language-jsx">{{ reactCode }}</code></pre>
        </div>
      </div>
    </div>

    <div class="what">
      <div class="what-title">
        Khi bấm "+1" thì điều gì xảy ra?
      </div>
      <div class="steps">
        <div
          v-for="(s, idx) in steps"
          :key="idx"
          class="step"
          :class="{ highlight: idx === lastStepIndex }"
        >
          <span class="num">{{ idx + 1 }}</span>
          <span class="text">{{ s }}</span>
        </div>
      </div>
      <div class="note">
        Lưu ý: đây là <strong>minh hoạ đơn giản hoá</strong> để giúp bạn xây dựng mental model, framework thật bên trong phức tạp hơn nhiều.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { key: 'syntax', label: 'Cú pháp (Template vs JSX)' },
  { key: 'state', label: 'Cập nhật state (ref vs useState)' },
  { key: 'render', label: 'Mental model render' }
]

const currentTab = ref('syntax')
const count = ref(1)
const lastClicked = ref('vue')
const lastStepIndex = ref(-1)

const inc = (who) => {
  lastClicked.value = who
  count.value += 1
  // Hiệu ứng đơn giản: làm nổi bước cuối cùng
  lastStepIndex.value = 2
  setTimeout(() => (lastStepIndex.value = -1), 600)
}

const vueCode = computed(() => {
  if (currentTab.value === 'syntax') {
    // NOTE: Avoid literal closing script tag inside a script block (HTML parser would terminate early).
    return [
      `<template>`,
      `  <button @click="count++">+1</button>`,
      `  <div>count: {{ count }}</div>`,
      `</template>`,
      ``,
      `<script setup>`,
      `import { ref } from 'vue'`,
      `const count = ref(1)`,
      `</scr` + `ipt>`
    ].join('\n')
  }
  if (currentTab.value === 'state') {
    return `import { ref } from 'vue'

const count = ref(1)

function inc() {
  count.value++
}`
  }
  return `// Vue: hệ thống reactivity sẽ "theo dõi dependency"
// count thay đổi -> nơi nào dùng count sẽ tự cập nhật`
})

const reactCode = computed(() => {
  if (currentTab.value === 'syntax') {
    return `function App() {
  const [count, setCount] = useState(1)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <div>count: {count}</div>
    </>
  )
}`
  }
  if (currentTab.value === 'state') {
    return `const [count, setCount] = useState(1)

function inc() {
  setCount(count + 1)
}`
  }
  return `// React: state thay đổi -> hàm component chạy lại (re-render)
// Sau đó React quyết định DOM nào cần cập nhật`
})

const steps = computed(() => {
  if (currentTab.value === 'syntax') {
    return [
      'Cách bạn viết UI: Vue thường dùng Template; React thường dùng JSX',
      'Bấm nút sẽ kích hoạt hàm xử lý sự kiện',
      'Sau khi count cập nhật, giao diện thay đổi theo'
    ]
  }
  if (currentTab.value === 'state') {
    return [
      'Vue: dùng ref/ reactive để lưu state; React: dùng useState để lưu state',
      lastClicked.value === 'vue'
        ? 'Bạn sửa count.value'
        : 'Bạn gọi setCount(...)',
      'Framework đưa thay đổi lên giao diện'
    ]
  }
  return [
    'Vue: thiên về "theo dõi dependency", chỗ nào dùng count thì cập nhật chỗ đó',
    'React: thiên về "chạy lại hàm component" để lấy mô tả UI mới',
    'Cuối cùng cả hai chỉ cập nhật DOM cần thay đổi (tránh vẽ lại toàn bộ)'
  ]
})
</script>

<style scoped>
.vr-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.tab.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.panel {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 0.75rem;
}

.panel-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.preview {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.9rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.row {
  font-size: 0.95rem;
}

.btn {
  border: none;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
}

.btn.vue {
  background: #22c55e;
}

.btn.react {
  background: #0ea5e9;
}

.code {
  margin-top: 0.9rem;
}

.code-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

pre {
  margin: 0;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: auto;
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.what {
  margin-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1rem;
}

.what-title {
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.steps {
  display: grid;
  gap: 0.5rem;
}

.step {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.55rem 0.65rem;
}

.step.highlight {
  border-color: rgba(34, 197, 94, 0.5);
  background: rgba(34, 197, 94, 0.08);
}

.num {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.15);
  color: #4338ca;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  flex: 0 0 auto;
}

.text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.35;
}

.note {
  margin-top: 0.7rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
