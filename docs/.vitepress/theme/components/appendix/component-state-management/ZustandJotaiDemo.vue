<template>
  <div class="zustand-jotai-demo">
    <div class="demo-header">
      <span class="icon">🐻</span>
      <span class="title">Zustand & Jotai</span>
      <span class="subtitle">State management nhẹ cho React</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn làm trong <span class="highlight">cửa hàng tiện lợi</span>: Zustand giống như cả kho hàng quản lý tập trung, còn Jotai giống như chia hàng thành từng ô nhỏ (Atom), mỗi ô tự quản, lấy khi cần.
    </div>

    <div class="demo-content">
      <div class="demo-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-name">{{ tab.name }}</span>
        </button>
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="activeTab"
          class="tab-content"
        >
          <div
            v-if="activeTab === 'zustand'"
            class="feature-showcase"
          >
            <div class="feature-card">
              <span class="feature-icon">📦</span>
              <span class="feature-title">Một Store duy nhất</span>
              <span class="feature-desc">Tất cả state quản lý tập trung</span>
            </div>
            <div class="feature-card">
              <span class="feature-icon">⚡</span>
              <span class="feature-title">API cực gọn</span>
              <span class="feature-desc">Không cần Provider bao ngoài</span>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🎯</span>
              <span class="feature-title">Subscribe chi tiết</span>
              <span class="feature-desc">Chỉ re-render component cần thiết</span>
            </div>
          </div>

          <div
            v-if="activeTab === 'zustand'"
            class="code-example"
          >
            <pre class="code-block"><code>// Zustand Store
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({
    bears: state.bears + 1
  }))
}))

// Dùng trong component
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <div>{bears} bears around here</div>
}</code></pre>
          </div>

          <div
            v-if="activeTab === 'jotai'"
            class="feature-showcase"
          >
            <div class="feature-card">
              <span class="feature-icon">⚛️</span>
              <span class="feature-title">Phân nhỏ (Atomic)</span>
              <span class="feature-desc">Tách state thành các Atom độc lập</span>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🔗</span>
              <span class="feature-title">Auto dependency</span>
              <span class="feature-desc">State dẫn xuất tự được track</span>
            </div>
            <div class="feature-card">
              <span class="feature-icon">📝</span>
              <span class="feature-title">TypeScript</span>
              <span class="feature-desc">Hỗ trợ type native</span>
            </div>
          </div>

          <div
            v-if="activeTab === 'jotai'"
            class="code-example"
          >
            <pre class="code-block"><code>// Jotai Atom
import { atom } from 'jotai'

// Atom cơ bản
const countAtom = atom(0)

// Atom dẫn xuất
const doubleAtom = atom((get) => get(countAtom) * 2)

// Dùng trong component
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [double] = useAtom(doubleAtom)
  return (
    &lt;div&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;span&gt;{double}&lt;/span&gt;
    &lt;/div&gt;
  )
}</code></pre>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Gợi ý lựa chọn:</strong> Zustand hợp với project nhỏ và vừa, API gọn và trực quan. Jotai hợp khi cần điều khiển chi tiết, state mô-đun hơn. Cả hai đều hỗ trợ TypeScript, không cần Provider.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('zustand')

const tabs = [
  { id: 'zustand', name: 'Zustand', icon: '🐻' },
  { id: 'jotai', name: 'Jotai', icon: '⚛️' }
]
</script>

<style scoped>
.zustand-jotai-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.demo-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.75rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.tab-button.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1rem;
}

.tab-name {
  font-weight: 500;
}

.tab-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.feature-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
}

.feature-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
}

.code-block {
  margin: 0;
}

.code-block code {
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #d4d4d4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .demo-tabs {
    flex-direction: column;
  }

  .feature-showcase {
    grid-template-columns: 1fr;
  }
}
</style>
