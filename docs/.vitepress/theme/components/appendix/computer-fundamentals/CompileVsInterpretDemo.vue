<template>
  <div class="compile-vs-interpret-demo">
    <h4>🔄 Biên dịch vs Thông dịch vs JIT</h4>
    <p class="desc">Bấm vào các chế độ thực thi khác nhau để xem code đi từ source đến lúc chạy như thế nào</p>

    <div class="mode-selector">
      <button
        v-for="(m, i) in modes"
        :key="i"
        :class="['mode-btn', { active: selected === i }]"
        @click="selectMode(i)"
      >
        {{ m.name }}
      </button>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, j) in modes[selected].steps"
        :key="j"
        :class="['pipe-step', { visible: visibleSteps > j }]"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
        <div v-if="j < modes[selected].steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric" v-for="m in modes[selected].metrics" :key="m.label">
        <span class="metric-label">{{ m.label }}</span>
        <div class="metric-bar-bg">
          <div class="metric-bar" :style="{ width: m.value + '%', background: m.color }"></div>
        </div>
        <span class="metric-val">{{ m.text }}</span>
      </div>
    </div>

    <div class="examples">
      <span class="ex-label">Ngôn ngữ tiêu biểu:</span>
      <span class="ex-lang" v-for="l in modes[selected].langs" :key="l">{{ l }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const selected = ref(0)
const visibleSteps = ref(0)
let timer = null

onMounted(() => {
  // Khởi động animation sau khi mount, tránh khởi tạo timer lúc load module làm treo build
  selectMode(0)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function selectMode(i) {
  selected.value = i
  visibleSteps.value = 0
  clearInterval(timer)
  timer = setInterval(() => {
    if (visibleSteps.value < modes[i].steps.length) {
      visibleSteps.value++
    } else {
      clearInterval(timer)
    }
  }, 300)
}

const modes = [
  {
    name: 'Biên dịch',
    steps: [
      { icon: '📝', name: 'Source code', desc: 'main.c' },
      { icon: '⚙️', name: 'Compiler', desc: 'Biên dịch toàn bộ' },
      { icon: '📦', name: 'Machine code', desc: 'File thực thi nhị phân' },
      { icon: '🚀', name: 'Chạy trực tiếp', desc: 'CPU chạy thẳng' }
    ],
    metrics: [
      { label: 'Tốc độ chạy', value: 95, text: 'Cực nhanh', color: '#22c55e' },
      { label: 'Tốc độ khởi động', value: 30, text: 'Chậm (cần biên dịch)', color: '#ef4444' },
      { label: 'Đa nền tảng', value: 20, text: 'Phải biên dịch lại', color: '#ef4444' }
    ],
    langs: ['C', 'C++', 'Rust', 'Go']
  },
  {
    name: 'Thông dịch',
    steps: [
      { icon: '📝', name: 'Source code', desc: 'app.py' },
      { icon: '🔍', name: 'Interpreter', desc: 'Đọc từng dòng' },
      { icon: '🔄', name: 'Chạy từng dòng', desc: 'Vừa dịch vừa chạy' }
    ],
    metrics: [
      { label: 'Tốc độ chạy', value: 30, text: 'Khá chậm', color: '#ef4444' },
      { label: 'Tốc độ khởi động', value: 90, text: 'Nhanh (chạy ngay)', color: '#22c55e' },
      { label: 'Đa nền tảng', value: 90, text: 'Đa nền tảng tự nhiên', color: '#22c55e' }
    ],
    langs: ['Python', 'Ruby', 'PHP', 'Bash']
  },
  {
    name: 'JIT - Biên dịch tức thời',
    steps: [
      { icon: '📝', name: 'Source code', desc: 'app.js' },
      { icon: '🔍', name: 'Thông dịch', desc: 'Chạy thông dịch trước' },
      { icon: '🔥', name: 'Phát hiện hotspot', desc: 'Tìm code chạy nhiều' },
      { icon: '⚡', name: 'Biên dịch JIT', desc: 'Dịch sang machine code' },
      { icon: '🚀', name: 'Chạy tốc độ cao', desc: 'Gần bằng native' }
    ],
    metrics: [
      { label: 'Tốc độ chạy', value: 75, text: 'Nhanh (hotspot gần native)', color: '#22c55e' },
      { label: 'Tốc độ khởi động', value: 60, text: 'Trung bình (cần warm-up)', color: '#eab308' },
      { label: 'Đa nền tảng', value: 85, text: 'Đa nền tảng', color: '#22c55e' }
    ],
    langs: ['JavaScript (V8)', 'Java (JVM)', 'C# (.NET)']
  }
]
</script>

<style scoped>
.compile-vs-interpret-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.mode-selector { display: flex; gap: 8px; margin-bottom: 16px; }
.mode-btn {
  padding: 8px 18px; border-radius: 8px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 14px; font-weight: 500;
  transition: all 0.2s;
}
.mode-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.pipeline { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 16px; }
.pipe-step {
  display: flex; align-items: center; gap: 4px; opacity: 0;
  transform: translateY(8px); transition: all 0.3s;
}
.pipe-step.visible { opacity: 1; transform: translateY(0); }
.step-icon { font-size: 24px; }
.step-name { font-size: 12px; font-weight: 600; }
.step-desc { font-size: 11px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 18px; margin: 0 4px; }
.metrics { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.metric { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.metric-label { width: 70px; text-align: right; color: var(--vp-c-text-2); }
.metric-bar-bg { flex: 1; height: 10px; background: var(--vp-c-divider); border-radius: 5px; overflow: hidden; }
.metric-bar { height: 100%; border-radius: 5px; transition: width 0.5s; }
.metric-val { width: 130px; font-size: 12px; color: var(--vp-c-text-3); }
.examples { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ex-label { font-size: 13px; color: var(--vp-c-text-2); }
.ex-lang {
  padding: 3px 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 4px; font-size: 12px;
}
@media (max-width: 640px) { .metric-val { width: auto; } }
</style>
