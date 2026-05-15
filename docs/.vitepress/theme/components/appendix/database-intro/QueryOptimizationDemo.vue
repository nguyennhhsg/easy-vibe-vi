<template>
  <div class="optimization-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">Demo tối ưu truy vấn</span>
      <span class="subtitle">So sánh sai lầm thường gặp và cách viết đúng</span>
    </div>

    <div class="intro-text">
      Phần lớn trường hợp, query chậm không phải do <span class="highlight">database yếu</span>, mà do SQL viết sai. Những lỗi dưới đây có thể bạn vẫn mắc hàng ngày.
    </div>

    <div class="pitfalls-list">
      <div
        v-for="(pitfall, index) in pitfalls"
        :key="index"
        class="pitfall-card"
        :class="{ expanded: expandedIndex === index }"
      >
        <div
          class="pitfall-header"
          @click="expandedIndex = expandedIndex === index ? null : index"
        >
          <div class="pitfall-number">
            {{ index + 1 }}
          </div>
          <div class="pitfall-title">
            {{ pitfall.title }}
          </div>
          <div class="expand-icon">
            {{ expandedIndex === index ? '▼' : '▶' }}
          </div>
        </div>

        <Transition name="expand">
          <div
            v-if="expandedIndex === index"
            class="pitfall-content"
          >
            <div class="code-comparison">
              <div class="code-section wrong">
                <div class="section-label">
                  ❌ Cách viết sai
                </div>
                <pre><code>{{ pitfall.wrong }}</code></pre>
                <div class="impact">
                  ⚠️ {{ pitfall.impact }}
                </div>
              </div>
              <div class="code-section correct">
                <div class="section-label">
                  ✅ Cách viết đúng
                </div>
                <pre><code>{{ pitfall.correct }}</code></pre>
                <div class="benefit">
                  💡 {{ pitfall.benefit }}
                </div>
              </div>
            </div>
            <div class="explanation">
              <strong>Nguyên lý:</strong> {{ pitfall.explanation }}
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="tips-box">
      <div class="tips-title">
        📝 Checklist gợi ý tối ưu
      </div>
      <div class="tips-list">
        <div
          v-for="(tip, i) in tips"
          :key="i"
          class="tip-item"
        >
          <span class="tip-icon">✓</span>
          <span class="tip-text">{{ tip }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>Nguyên tắc cốt lõi:</strong> Đừng bắt database làm "việc thừa". Index mất tác dụng, full table scan, trả về dữ liệu thừa - đây là những kẻ giết hiệu năng phổ biến nhất. Bí quyết viết SQL hiệu quả là <span class="highlight">hiểu database thực thi query của bạn như thế nào</span>.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedIndex = ref(0)

const pitfalls = ref([
  {
    title: 'Dùng hàm trên cột index',
    wrong: "SELECT * FROM users WHERE YEAR(created_at) = 2024;",
    correct: "SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';",
    impact: 'Index mất tác dụng, full table scan',
    benefit: 'Dùng được index, query nhanh hơn 1000 lần',
    explanation: 'Khi áp hàm lên cột, database phải tính giá trị hàm cho từng dòng, không dùng được index. Hãy chuyển hàm sang vế phải hoặc dùng range query.'
  },
  {
    title: 'Implicit type conversion',
    wrong: "SELECT * FROM users WHERE user_id = '123';  -- user_id là int",
    correct: "SELECT * FROM users WHERE user_id = 123;",
    impact: 'Index mất tác dụng, mỗi lần phải convert type',
    benefit: 'Dùng được index trực tiếp',
    explanation: 'Khi so sánh chuỗi với số, database sẽ implicit convert, khiến index mất tác dụng. Đảm bảo type so sánh khớp với type cột.'
  },
  {
    title: 'LIKE bắt đầu bằng %',
    wrong: "SELECT * FROM users WHERE name LIKE '%Nguyen%';",
    correct: "SELECT * FROM users WHERE name LIKE 'Nguyen%';",
    impact: 'Không dùng được index, full table scan',
    benefit: 'Dùng được index cho prefix matching',
    explanation: 'Index lưu theo thứ tự, LIKE bắt đầu bằng % không tận dụng được. Nếu chỉ cần prefix match, đặt % ở cuối.'
  },
  {
    title: 'SELECT * trả về mọi cột',
    wrong: "SELECT * FROM users WHERE user_id = 1;",
    correct: "SELECT user_id, name, email FROM users WHERE user_id = 1;",
    impact: 'Tăng dữ liệu truyền và RAM, không dùng được covering index',
    benefit: 'Giảm dữ liệu truyền, có thể dùng covering index',
    explanation: 'Chỉ select cột cần thiết. Nếu index đã chứa mọi cột cần, database có thể trả dữ liệu trực tiếp từ index (covering index), không cần đọc bảng.'
  }
])

const tips = ref([
  'Tạo index cho các cột trong WHERE, JOIN, ORDER BY',
  'Tránh dùng hàm hoặc biểu thức trên cột index',
  'Dùng EXPLAIN để phân tích execution plan',
  'Chỉ select cột cần dùng, tránh SELECT *',
  'Thao tác hàng loạt thay cho từng record',
  'Cân nhắc dùng covering index để giảm lookup bảng'
])
</script>

<style scoped>
.optimization-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.pitfalls-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pitfall-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.pitfall-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.pitfall-header:hover {
  background: var(--vp-c-bg-soft);
}

.pitfall-number {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.pitfall-title {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.expand-icon {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.pitfall-content {
  padding: 0 0.75rem 0.75rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.code-section {
  border-radius: 6px;
  overflow: hidden;
}

.code-section.wrong {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.code-section.correct {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.section-label {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.code-section.wrong .section-label {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.code-section.correct .section-label {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.code-section pre {
  margin: 0;
  padding: 0.75rem;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.02);
}

.code-section code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
}

.impact, .benefit {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.impact {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.benefit {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.explanation {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.tips-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .tips-list {
    grid-template-columns: 1fr;
  }
}

.tip-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.tip-icon {
  color: #22c55e;
  font-weight: bold;
  flex-shrink: 0;
}

.tip-text {
  line-height: 1.4;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
