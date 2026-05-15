<!--
  AgentWorkflowDemo.vue
  Vòng lặp cốt lõi của Agent (demo kiểu "chơi trước, giải thích sau"):
  - Click vào bước: xem Agent "đang làm gì" trong vòng này
  - Click "Vòng tiếp theo": xem nó lặp đi lặp lại cho đến khi xong
-->
<template>
  <div class="workflow">
    <div class="header">
      <div>
        <div class="title">
          Chơi thử trước: Agent không phải "chat", mà là "hành động theo vòng lặp"
        </div>
        <div class="subtitle">
          Nó sẽ lặp lại: Quan sát → Lập kế hoạch → Dùng tool → Kiểm tra kết quả.
        </div>
      </div>
      <div class="actions">
        <button
          class="btn"
          @click="reset"
        >
          Reset
        </button>
        <button
          class="btn primary"
          @click="nextRound"
        >
          Vòng tiếp theo ({{ round }}/3)
        </button>
      </div>
    </div>

    <div class="cycle">
      <button
        v-for="s in steps"
        :key="s.id"
        :class="['step', { active: currentStep === s.id }]"
        @click="currentStep = s.id"
      >
        <span class="icon">{{ s.icon }}</span>
        <span class="name">{{ s.name }}</span>
      </button>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panel-title">
          Task
        </div>
        <div class="panel-body">
          Tìm giúp tôi 3 bài giới thiệu về "Agent", output: tiêu đề + tóm tắt một câu.
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">
          Vòng này diễn ra điều gì?
        </div>
        <div class="panel-body">
          {{ detail }}
        </div>
      </div>
    </div>

    <div class="log">
      <div class="log-title">
        Log chạy của Agent (minh họa)
      </div>
      <pre><code>{{ logText }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const steps = [
  { id: 'observe', name: 'Quan sát', icon: '👀' },
  { id: 'plan', name: 'Kế hoạch', icon: '🧩' },
  { id: 'act', name: 'Hành động', icon: '🔧' },
  { id: 'check', name: 'Kiểm tra', icon: '✅' }
]

const round = ref(1)
const currentStep = ref('observe')

const scenarios = [
  {
    observe: 'Thấy mục tiêu của user: cần 3 bài giới thiệu + tóm tắt ngắn.',
    plan: 'Kế hoạch: 1) Search từ khóa 2) Mở vài link đầu 3) Trích tiêu đề và điểm chính.',
    act: 'Gọi tool: web_search(query="agent introduction").',
    check: 'Kiểm tra: kết quả có 3 link dùng được, còn thiếu "tóm tắt 1 câu cho từng link".'
  },
  {
    observe: 'Đã có danh sách link, chuẩn bị mở từng cái và trích điểm chính.',
    plan: 'Kế hoạch: read_page lần lượt 3 lần, nén nội dung thành 1 câu.',
    act: 'Gọi tool: read_page(url=...) × 3.',
    check: 'Kiểm tra: thông tin đủ rồi, nhưng format tiêu đề không thống nhất, cần sắp xếp lại output.'
  },
  {
    observe: 'Nguyên liệu đầy đủ: tiêu đề + điểm chính của bài đều đã trích.',
    plan: 'Kế hoạch: thống nhất format, output danh sách Markdown.',
    act: 'Tổ chức output: mỗi mục "tiêu đề - tóm tắt 1 câu".',
    check: 'Hoàn thành: đạt yêu cầu "3 mục + tóm tắt 1 câu + có thể copy ngay".'
  }
]

const current = computed(() => scenarios[round.value - 1])

const detail = computed(() => current.value[currentStep.value])

const logText = computed(() => {
  const logs = []
  for (let i = 0; i < round.value; i++) {
    logs.push(`--- Round ${i + 1} ---`)
    logs.push(`OBS: ${scenarios[i].observe}`)
    logs.push(`PLAN: ${scenarios[i].plan}`)
    logs.push(`ACT: ${scenarios[i].act}`)
    logs.push(`CHECK: ${scenarios[i].check}`)
    logs.push('')
  }
  return logs.join('\n')
})

const nextRound = () => {
  if (round.value >= 3) return
  round.value++
  currentStep.value = 'observe'
}

const reset = () => {
  round.value = 1
  currentStep.value = 'observe'
}
</script>

<style scoped>
.workflow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.btn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}
.btn.primary {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.cycle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}
.step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}
.step.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}
.icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.name {
  font-weight: 800;
}

.panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.panel-title {
  font-weight: 700;
  margin-bottom: 6px;
}
.panel-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.log {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.log-title {
  font-weight: 700;
  margin-bottom: 8px;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
