<template>
  <div class="compiler-analogy-demo">
    <div class="demo-header">
      <span class="title">Nguyên lý biên dịch: nghệ thuật phiên dịch</span>
      <span class="subtitle">Dịch code thành lệnh máy như thế nào</span>
    </div>

    <div class="analogy-intro">
      <div class="analogy-box">
        <div class="analogy-text">
          Compiler giống như <strong>thông dịch viên</strong>, dịch code mà con người đọc hiểu thành lệnh mà máy hiểu được
        </div>
      </div>
    </div>

    <!-- Quy trình phiên dịch -->
    <div class="translation-process">
      <div class="process-title">Quy trình dịch code đầy đủ</div>
      <div class="process-flow">
        <div
          v-for="(step, index) in translationSteps"
          :key="index"
          class="process-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div class="step-example">{{ step.example }}</div>
          </div>
          <div v-if="index < translationSteps.length - 1" class="step-arrow">
            →
          </div>
        </div>
      </div>
    </div>

    <!-- Phân tích từ vựng -->
    <div class="analyzer-section">
      <div class="analyzer-title">Phân tích từ vựng: tách token</div>
      <div class="lexical-demo">
        <div class="source-code">
          <code>int age = 25;</code>
        </div>
        <div class="token-arrow">↓</div>
        <div class="tokens-list">
          <div v-for="(token, index) in tokens" :key="index" class="token-item">
            <span class="token-type">{{ token.type }}</span>
            <span class="token-value">{{ token.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Phân tích cú pháp -->
    <div class="analyzer-section">
      <div class="analyzer-title">Phân tích cú pháp: dựng cây</div>
      <div class="syntax-demo">
        <div class="syntax-tree">
          <div class="tree-node root">
            <span class="node-label">Câu lệnh gán</span>
            <div class="node-children">
              <div class="tree-node">
                <span class="node-label">Biến</span>
                <span class="node-value">age</span>
              </div>
              <div class="tree-node">
                <span class="node-label">Toán tử</span>
                <span class="node-value">=</span>
              </div>
              <div class="tree-node">
                <span class="node-label">Số</span>
                <span class="node-value">25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Biên dịch vs Thông dịch -->
    <div class="comparison">
      <div class="comparison-title">Biên dịch vs Thông dịch</div>
      <div class="comparison-box">
        <div class="compare-side compile">
          <div class="side-header">Ngôn ngữ biên dịch</div>
          <div class="side-content">
            <div class="side-step">Source code → Compiler → Machine code</div>
            <div class="side-example">C, Go, Rust</div>
            <div class="side-features">
              <div class="feature">✓ Chạy nhanh</div>
              <div class="feature">✓ Biên dịch một lần, chạy nhiều lần</div>
              <div class="feature">✗ Biên dịch chậm</div>
            </div>
          </div>
        </div>

        <div class="compare-side interpret">
          <div class="side-header">Ngôn ngữ thông dịch</div>
          <div class="side-content">
            <div class="side-step">Source code → Interpreter → Chạy từng dòng</div>
            <div class="side-example">Python, JavaScript, PHP</div>
            <div class="side-features">
              <div class="feature">✓ Phát triển nhanh</div>
              <div class="feature">✓ Đa nền tảng</div>
              <div class="feature">✗ Chạy chậm</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tối ưu hóa -->
    <div class="optimization">
      <div class="optimization-title">Tối ưu hóa của compiler</div>
      <div class="optimization-content">
        <div class="opt-examples">
          <div class="opt-item">
            <div class="opt-before">Trước tối ưu:</div>
            <div class="opt-code">x = 5 + 3 + 2</div>
          </div>
          <div class="opt-arrow">⬇️</div>
          <div class="opt-item">
            <div class="opt-after">Sau tối ưu:</div>
            <div class="opt-code">x = 10</div>
          </div>
        </div>
        <div class="opt-note">Compiler tự động tối ưu code, nâng cao hiệu năng khi chạy</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const translationSteps = [
  {
    name: 'Phân tích từ vựng',
    desc: 'Tách code thành từng từ (token)',
    example: 'int age = 25 → [int, age, =, 25]'
  },
  {
    name: 'Phân tích cú pháp',
    desc: 'Kiểm tra code có đúng cú pháp không, dựng cây cú pháp',
    example: 'Xác minh cấu trúc câu lệnh có hợp lệ không'
  },
  {
    name: 'Phân tích ngữ nghĩa',
    desc: 'Kiểm tra ý nghĩa của code có hợp lý không',
    example: 'Kiểm tra biến đã khai báo chưa, kiểu có khớp không'
  },
  {
    name: 'Sinh mã trung gian',
    desc: 'Sinh ra biểu diễn trung gian không phụ thuộc máy',
    example: 'Sinh bytecode hoặc biểu diễn trung gian'
  },
  {
    name: 'Tối ưu hóa',
    desc: 'Cải thiện code để chạy hiệu quả hơn',
    example: 'Gấp hằng số, loại bỏ code chết'
  },
  {
    name: 'Sinh mã đích',
    desc: 'Sinh machine code hoặc mã đích',
    example: 'Sinh lệnh máy x86, ARM,...'
  }
]

const tokens = [
  { type: 'Từ khóa', value: 'int' },
  { type: 'Định danh', value: 'age' },
  { type: 'Toán tử', value: '=' },
  { type: 'Số', value: '25' },
  { type: 'Dấu phân cách', value: ';' }
]
</script>

<style scoped>
.compiler-analogy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.analogy-intro {
  margin-bottom: 2rem;
}

.analogy-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.analogy-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.translation-process {
  margin-bottom: 2rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

.analyzer-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.analyzer-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.lexical-demo {
  text-align: center;
}

.source-code {
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.source-code code {
  color: #d4d4d4;
  font-size: 1rem;
}

.token-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.tokens-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.token-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  min-width: 100px;
}

.token-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.token-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.syntax-demo {
  display: flex;
  justify-content: center;
}

.syntax-tree {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tree-node {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.tree-node.root {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.node-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.node-value {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.node-children {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .comparison-box {
    grid-template-columns: 1fr;
  }
}

.compare-side {
  padding: 1.5rem;
  border-radius: 8px;
}

.side-header {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.compile .side-header {
  color: #10b981;
}

.interpret .side-header {
  color: #3b82f6;
}

.side-step {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.side-example {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.side-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.85rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.optimization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.optimization-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.optimization-content {
  text-align: center;
}

.opt-examples {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.opt-item {
  text-align: center;
}

.opt-before,
.opt-after {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.opt-code {
  font-family: 'Courier New', monospace;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
}

.opt-arrow {
  font-size: 1.5rem;
}

.opt-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
