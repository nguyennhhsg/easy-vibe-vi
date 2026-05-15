<template>
  <div class="language-comparison-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">Cân nhắc giữa các ngôn ngữ</span>
      <span class="subtitle">Đánh đổi ưu/nhược điểm trên nhiều tiêu chí</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn <span class="highlight">đi siêu thị</span>: có hàng rẻ mà không bền, có hàng chất lượng mà giá cao. Chọn ngôn ngữ backend cũng vậy, phải cân đối nhiều tiêu chí như hiệu năng, hiệu suất phát triển, độ trưởng thành của hệ sinh thái.
    </div>

    <div class="dimension-selector">
      <div class="dimension-label">
        Chọn tiêu chí so sánh:
      </div>
      <div class="dimension-buttons">
        <button
          v-for="dim in dimensions"
          :key="dim.key"
          class="dimension-btn"
          :class="{ active: selectedDimension === dim.key }"
          @click="selectedDimension = dim.key"
        >
          <span class="dim-icon">{{ dim.icon }}</span>
          <span class="dim-label">{{ dim.label }}</span>
        </button>
      </div>
    </div>

    <div class="comparison-chart">
      <div class="chart-header">
        <span class="chart-title">{{ getDimensionInfo().title }}</span>
        <span class="chart-unit">{{ getDimensionInfo().unit }}</span>
      </div>
      <div class="bars-container">
        <div
          v-for="lang in sortedLanguages"
          :key="lang.name"
          class="bar-wrapper"
        >
          <div class="bar-label">
            {{ lang.name }}
          </div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="getBarClass(lang.score)"
              :style="{ width: lang.score + '%' }"
            >
              <span class="bar-value">{{ lang.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="insight-box">
      <span class="icon">🔍</span>
      <div class="insight-content">
        <strong>Phân tích sâu:</strong>
        <p>{{ getDimensionInfo().insight }}</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Không có "viên đạn bạc vạn năng". Hiệu năng cao thường kéo theo chi phí phát triển cao (C++, Rust), phát triển nhanh thường kèm theo hiệu năng giảm (Python, Ruby). Hãy đánh đổi theo nhu cầu cốt lõi của dự án, đừng theo đuổi "thứ gì cũng giỏi".
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedDimension = ref('performance')

const dimensions = [
  { key: 'performance', icon: '⚡', label: 'Hiệu năng' },
  { key: 'efficiency', icon: '🚀', label: 'Hiệu suất dev' },
  { key: 'ecosystem', icon: '📦', label: 'Hệ sinh thái' },
  { key: 'learning', icon: '📚', label: 'Đường cong học' },
  { key: 'concurrency', icon: '🔄', label: 'Concurrency' }
]

const dimensionInfo = {
  performance: {
    title: 'So sánh hiệu năng',
    unit: '(điểm càng cao càng nhanh)',
    insight: 'C++ và Rust dẫn đầu rất xa về hiệu năng, nhưng đường cong học tập cực dốc. Go và Java cân bằng tốt giữa hiệu năng và hiệu suất phát triển. Python và Ruby hiệu năng yếu nhất, nhưng tốc độ phát triển nhanh nhất.'
  },
  efficiency: {
    title: 'Hiệu suất phát triển',
    unit: '(điểm càng cao càng nhanh)',
    insight: 'Python và Ruby không đối thủ về phát triển nhanh, phù hợp prototype và startup. Go và Node.js ở giữa, cân đối giữa tốc độ và hiệu năng. Rust và C++ hiệu suất thấp nhất, chủ yếu do đường cong học tập.'
  },
  ecosystem: {
    title: 'Độ trưởng thành hệ sinh thái',
    unit: '(điểm càng cao thư viện càng nhiều)',
    insight: 'Java, Python, Node.js có hệ sinh thái trưởng thành nhất. Go và Rust còn trẻ nhưng phát triển nhanh. C++ hệ sinh thái trưởng thành nhưng chi phí học cao. Ruby chủ yếu tập trung vào phát triển web.'
  },
  learning: {
    title: 'Đường cong học tập',
    unit: '(điểm càng cao càng dễ)',
    insight: 'Python, Ruby, Go dễ bắt đầu nhất. Node.js cần hiểu khái niệm async. Java cần nắm OOP và framework. Rust và C++ có đường cong dốc nhất, cần hiểu sâu quản lý bộ nhớ.'
  },
  concurrency: {
    title: 'Khả năng concurrency',
    unit: '(điểm càng cao càng mạnh)',
    insight: 'Goroutine của Go là vua concurrency, nhẹ và đơn giản. Mô hình async của Rust mạnh nhưng phức tạp. Thread pool của Java trưởng thành ổn định. Event loop của Node.js phù hợp I/O-intensive. GIL của Python giới hạn hiệu năng multi-thread.'
  }
}

const languageScores = {
  performance: [
    { name: 'C++', score: 98 },
    { name: 'Rust', score: 95 },
    { name: 'Go', score: 90 },
    { name: 'Java', score: 75 },
    { name: 'Node.js', score: 70 },
    { name: 'Python', score: 30 },
    { name: 'Ruby', score: 25 }
  ],
  efficiency: [
    { name: 'Python', score: 95 },
    { name: 'Ruby', score: 90 },
    { name: 'Go', score: 85 },
    { name: 'Node.js', score: 85 },
    { name: 'Java', score: 60 },
    { name: 'Rust', score: 40 },
    { name: 'C++', score: 35 }
  ],
  ecosystem: [
    { name: 'Java', score: 95 },
    { name: 'Python', score: 95 },
    { name: 'Node.js', score: 95 },
    { name: 'C++', score: 90 },
    { name: 'Go', score: 75 },
    { name: 'Ruby', score: 70 },
    { name: 'Rust', score: 70 }
  ],
  learning: [
    { name: 'Python', score: 95 },
    { name: 'Ruby', score: 85 },
    { name: 'Go', score: 80 },
    { name: 'Node.js', score: 75 },
    { name: 'Java', score: 40 },
    { name: 'C++', score: 25 },
    { name: 'Rust', score: 20 }
  ],
  concurrency: [
    { name: 'Go', score: 95 },
    { name: 'Rust', score: 90 },
    { name: 'Node.js', score: 85 },
    { name: 'Java', score: 80 },
    { name: 'C++', score: 85 },
    { name: 'Python', score: 30 },
    { name: 'Ruby', score: 25 }
  ]
}

const sortedLanguages = computed(() => {
  const scores = languageScores[selectedDimension.value]
  return [...scores].sort((a, b) => b.score - a.score)
})

const getDimensionInfo = () => {
  return dimensionInfo[selectedDimension.value]
}

const getBarClass = (score) => {
  if (score >= 85) return 'bar-high'
  if (score >= 60) return 'bar-medium'
  return 'bar-low'
}
</script>

<style scoped>
.language-comparison-demo {
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

.dimension-selector {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.dimension-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.dimension-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dimension-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.dimension-btn:hover {
  border-color: var(--vp-c-brand);
}

.dimension-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.dim-icon {
  font-size: 1rem;
}

.comparison-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.chart-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.chart-unit {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.bars-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  min-width: 70px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bar-track {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.bar-high {
  background: var(--vp-c-green-1);
}

.bar-medium {
  background: var(--vp-c-yellow-1);
}

.bar-low {
  background: var(--vp-c-brand-1);
}

.insight-box {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  border-left: 3px solid var(--vp-c-brand);
}

.insight-box .icon {
  flex-shrink: 0;
}

.insight-content {
  flex: 1;
}

.insight-content strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.insight-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
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
</style>
