<template>
  <div class="concurrency-model-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">Mô hình concurrency</span>
      <span class="subtitle">Cách các ngôn ngữ xử lý đa tác vụ</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn <span class="highlight">làm việc trong nhà hàng</span>: có quán nhiều phục vụ cùng phục vụ (multi-thread), có quán chỉ một phục vụ nhưng làm cực nhanh (event loop), có quán phân công như dây chuyền (coroutine).
    </div>

    <div class="models-grid">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
        :class="{ active: selectedModel === model.name }"
        @click="selectedModel = model.name"
      >
        <div class="model-icon">
          {{ model.icon }}
        </div>
        <div class="model-name">
          {{ model.name }}
        </div>
        <div class="model-lang">
          {{ model.language }}
        </div>
        <div class="model-desc">
          {{ model.description }}
        </div>
      </div>
    </div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="selectedModel"
        :key="selectedModel"
        class="model-detail"
      >
        <div class="detail-header">
          <h6>{{ getModelInfo().title }}</h6>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Khả năng concurrency</span>
            <div class="stat-bar">
              <div
                class="stat-fill"
                :style="{ width: getModelInfo().concurrency + '%' }"
              />
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-label">Chi phí bộ nhớ</span>
            <div class="stat-bar">
              <div
                class="stat-fill memory"
                :style="{ width: getModelInfo().memory + '%' }"
              />
            </div>
          </div>
        </div>

        <div class="code-example">
          <code>{{ getModelInfo().code }}</code>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <strong>✅ Ưu điểm</strong>
            <ul>
              <li
                v-for="pro in getModelInfo().pros"
                :key="pro"
              >
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <strong>❌ Nhược điểm</strong>
            <ul>
              <li
                v-for="con in getModelInfo().cons"
                :key="con"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Coroutine của Go phù hợp I/O concurrency cao, thread pool của Java phù hợp ứng dụng enterprise ổn định, event loop của Node.js phù hợp các tác vụ I/O đơn giản. Hãy chọn theo tình huống, đừng chạy theo "số concurrency" một cách mù quáng.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedModel = ref('Goroutine')

const models = [
  {
    name: 'Goroutine',
    icon: '🐹',
    language: 'Go',
    description: 'Coroutine nhẹ'
  },
  {
    name: 'Thread Pool',
    icon: '🧵',
    language: 'Java',
    description: 'Pool luồng'
  },
  {
    name: 'Event Loop',
    icon: '⚡',
    language: 'Node.js',
    description: 'Vòng lặp sự kiện'
  },
  {
    name: 'Async/Await',
    icon: '🦀',
    language: 'Rust',
    description: 'Async runtime'
  }
]

const modelInfo = {
  Goroutine: {
    title: 'Go Goroutine (coroutine)',
    concurrency: 95,
    memory: 90,
    code: 'go func() { /* tác vụ */ }()',
    pros: ['Nhẹ (stack 2KB)', 'Có thể tạo hàng triệu coroutine', 'Cú pháp gọn'],
    cons: ['Cần quản lý vòng đời thủ công', 'Xử lý lỗi rườm rà']
  },
  'Thread Pool': {
    title: 'Java Thread Pool (pool luồng)',
    concurrency: 70,
    memory: 40,
    code: 'executor.submit(() -> { /* tác vụ */ });',
    pros: ['Trưởng thành, ổn định', 'Xử lý exception đầy đủ', 'Công cụ phong phú'],
    cons: ['Luồng nặng (stack 1-2MB)', 'Chi phí context-switch lớn']
  },
  'Event Loop': {
    title: 'Node.js Event Loop (vòng lặp sự kiện)',
    concurrency: 85,
    memory: 75,
    code: 'async function task() { /* tác vụ */ }',
    pros: ['Phù hợp I/O-intensive', 'Single-thread, không tranh chấp khóa', 'Cú pháp đẹp'],
    cons: ['Hiệu năng CPU-intensive kém', 'Không tận dụng multi-core']
  },
  'Async/Await': {
    title: 'Rust Async/Await (zero-cost abstraction)',
    concurrency: 90,
    memory: 95,
    code: 'task::spawn(async move { /* tác vụ */ });',
    pros: ['Zero-cost abstraction', 'Memory safety', 'Hiệu năng gần như quản lý thủ công'],
    cons: ['Đường cong học tập dốc', 'Cần runtime']
  }
}

const getModelInfo = () => {
  return modelInfo[selectedModel.value] || modelInfo.Goroutine
}
</script>

<style scoped>
.concurrency-model-demo {
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

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.model-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.model-card:hover {
  border-color: var(--vp-c-brand);
}

.model-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.model-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.model-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.model-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.model-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.model-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.detail-header h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.5s ease;
}

.stat-fill.memory {
  background: var(--vp-c-green-1);
}

.code-example {
  background: #1e1e1e;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.code-example code {
  color: #4ec9b0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.pros strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-green-1);
}

.cons strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-red-1);
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros li,
.cons li {
  padding: 0.15rem 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
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
  margin-top: 0.75rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
