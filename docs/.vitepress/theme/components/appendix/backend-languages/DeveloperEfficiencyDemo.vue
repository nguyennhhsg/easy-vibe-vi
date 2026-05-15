<template>
  <div class="developer-efficiency-demo">
    <div class="demo-header">
      <span class="icon">⏱️</span>
      <span class="title">Hiệu suất phát triển</span>
      <span class="subtitle">Chi phí thời gian khi các ngôn ngữ hoàn thành cùng một tác vụ</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn <span class="highlight">đang sửa nhà</span>: có đội thi công nhanh nhưng chất lượng trung bình (Python, Ruby), có đội chậm mà tỉ mỉ (Rust, C++), có đội vừa nhanh vừa chất lượng (Go, Node.js).
    </div>

    <div class="task-selector">
      <label>Chọn tác vụ:</label>
      <select v-model="selectedTask">
        <option value="rest">
          REST API
        </option>
        <option value="web">
          Ứng dụng web
        </option>
        <option value="script">
          Script xử lý dữ liệu
        </option>
      </select>
    </div>

    <div class="efficiency-chart">
      <div class="chart-header">
        <span>Thời gian phát triển (giờ)</span>
      </div>
      <div class="bars">
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
              :style="{ width: (lang.time / maxTime * 100) + '%' }"
            >
              <span class="bar-value">{{ lang.time }}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Startup chọn Python/Ruby để kiểm chứng ý tưởng nhanh, công ty lớn chọn Java/Go để cân bằng giữa tốc độ và chất lượng. Hiệu suất phát triển không chỉ là tốc độ viết code, mà còn gồm chi phí debug, test, bảo trì.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTask = ref('rest')

const taskData = {
  rest: [
    { name: 'Python', time: 4 },
    { name: 'Ruby', time: 3.5 },
    { name: 'Go', time: 5 },
    { name: 'Node.js', time: 4.5 },
    { name: 'Java', time: 8 },
    { name: 'Rust', time: 10 }
  ],
  web: [
    { name: 'Ruby', time: 9 },
    { name: 'Python', time: 10 },
    { name: 'Node.js', time: 11 },
    { name: 'Go', time: 12 },
    { name: 'Java', time: 20 },
    { name: 'Rust', time: 25 }
  ],
  script: [
    { name: 'Python', time: 1 },
    { name: 'Ruby', time: 1 },
    { name: 'Node.js', time: 1.5 },
    { name: 'Go', time: 2 },
    { name: 'Java', time: 4 },
    { name: 'Rust', time: 4 }
  ]
}

const sortedLanguages = computed(() => {
  return [...taskData[selectedTask.value]].sort((a, b) => a.time - b.time)
})

const maxTime = computed(() => {
  return Math.max(...taskData[selectedTask.value].map(l => l.time))
})
</script>

<style scoped>
.developer-efficiency-demo {
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

.task-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.task-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.task-selector select {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}

.efficiency-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bars {
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
  background: var(--vp-c-green-1);
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
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
