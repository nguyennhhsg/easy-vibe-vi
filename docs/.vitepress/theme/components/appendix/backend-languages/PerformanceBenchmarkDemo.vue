<template>
  <div class="performance-benchmark-demo">
    <div class="demo-header">
      <span class="icon">🏁</span>
      <span class="title">Đường đua hiệu năng</span>
      <span class="subtitle">Test tốc độ các ngôn ngữ</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn ở <span class="highlight">trường đua</span>: xe F1 (C++, Rust) cực nhanh nhưng khó cầm lái, xe gia đình (Python, Ruby) êm ái nhưng chậm, xe thể thao (Go, Java) cân bằng giữa tốc độ và khả năng điều khiển.
    </div>

    <div class="control-panel">
      <div class="scenario-selector">
        <label>Chọn đường đua:</label>
        <select
          v-model="selectedScenario"
          @change="runBenchmark"
        >
          <option
            v-for="scenario in scenarios"
            :key="scenario.id"
            :value="scenario.id"
          >
            {{ scenario.label }}
          </option>
        </select>
      </div>
      <button
        class="run-btn"
        :disabled="isRunning"
        @click="runBenchmark"
      >
        {{ isRunning ? 'Đang test...' : '▶ Bắt đầu test' }}
      </button>
    </div>

    <div class="results-panel">
      <div class="panel-header">
        <span class="panel-title">Kết quả test (Requests/Second)</span>
      </div>
      <div class="bars-container">
        <div
          v-for="result in sortedResults"
          :key="result.language"
          class="bar-wrapper"
        >
          <div class="bar-label">
            {{ result.language }}
          </div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="getBarClass(result.rps)"
              :style="{ width: getBarWidth(result.rps) + '%' }"
            >
              <span class="bar-value">{{ formatRPS(result.rps) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <span>{{ getCurrentExplanation() }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref('hello')
const isRunning = ref(false)

const scenarios = [
  { id: 'hello', label: '🏁 HTTP đơn giản (Hello World)' },
  { id: 'json', label: '📦 Serialize JSON' },
  { id: 'db', label: '🗄️ Truy vấn database' },
  { id: 'compute', label: '⚙️ Tính toán CPU-intensive' }
]

const benchmarkData = {
  hello: [
    { language: 'C++', rps: 1500000 },
    { language: 'Rust', rps: 1200000 },
    { language: 'Go', rps: 1000000 },
    { language: 'Node.js', rps: 800000 },
    { language: 'Java', rps: 700000 },
    { language: 'Python', rps: 200000 },
    { language: 'Ruby', rps: 150000 }
  ],
  json: [
    { language: 'C++', rps: 800000 },
    { language: 'Rust', rps: 700000 },
    { language: 'Go', rps: 600000 },
    { language: 'Node.js', rps: 450000 },
    { language: 'Java', rps: 500000 },
    { language: 'Python', rps: 150000 },
    { language: 'Ruby', rps: 120000 }
  ],
  db: [
    { language: 'C++', rps: 300000 },
    { language: 'Rust', rps: 280000 },
    { language: 'Go', rps: 250000 },
    { language: 'Node.js', rps: 220000 },
    { language: 'Java', rps: 200000 },
    { language: 'Python', rps: 80000 },
    { language: 'Ruby', rps: 70000 }
  ],
  compute: [
    { language: 'C++', rps: 500000 },
    { language: 'Rust', rps: 480000 },
    { language: 'Go', rps: 400000 },
    { language: 'Java', rps: 350000 },
    { language: 'Node.js', rps: 50000 },
    { language: 'Python', rps: 30000 },
    { language: 'Ruby', rps: 25000 }
  ]
}

const explanations = {
  hello: 'Test phản hồi HTTP đơn giản. C++ và Rust thể hiện ưu thế hiệu năng gần phần cứng. Go và Node.js cũng rất tốt (HTTP stack đã được tối ưu sâu). Python và Ruby do overhead của trình thông dịch nên hiệu năng tương đối thấp.',
  json: 'Test serialize JSON. C++ và Rust vẫn dẫn đầu, V8 engine giúp Node.js cũng thể hiện khá. Module json chuẩn của Python tạm được, nhưng vẫn chậm hơn nhiều so với ngôn ngữ biên dịch.',
  db: 'Mô phỏng truy vấn database. Khoảng cách hiệu năng thu hẹp vì điểm nghẽn chủ yếu nằm ở I/O database. Tuy vậy ngôn ngữ biên dịch (C++, Rust, Go) vẫn có ưu thế rõ.',
  compute: 'Tính toán CPU-intensive (Fibonacci). Lộ điểm yếu của Node.js: single-thread + tối ưu V8 không bằng ngôn ngữ tĩnh. Python và Ruby kém nhất (ngôn ngữ thông dịch + giới hạn GIL).'
}

const currentResults = ref([])

const sortedResults = computed(() => {
  return [...currentResults.value].sort((a, b) => b.rps - a.rps)
})

const runBenchmark = () => {
  isRunning.value = true
  currentResults.value = []

  setTimeout(() => {
    currentResults.value = benchmarkData[selectedScenario.value]
    isRunning.value = false
  }, 800)
}

const getBarWidth = (rps) => {
  const max = 1500000
  return (rps / max) * 100
}

const getBarClass = (rps) => {
  if (rps >= 500000) return 'bar-high'
  if (rps >= 200000) return 'bar-medium'
  return 'bar-low'
}

const formatRPS = (rps) => {
  if (rps >= 1000000) return (rps / 1000000).toFixed(1) + 'M'
  if (rps >= 1000) return (rps / 1000).toFixed(0) + 'K'
  return rps.toString()
}

const getCurrentExplanation = () => {
  return explanations[selectedScenario.value]
}

runBenchmark()
</script>

<style scoped>
.performance-benchmark-demo {
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

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.scenario-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.scenario-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scenario-selector select {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}

.run-btn {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.results-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.panel-header {
  margin-bottom: 0.75rem;
}

.panel-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
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

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
