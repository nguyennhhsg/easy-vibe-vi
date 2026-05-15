<!--
  AgentTaskFlowDemo.vue
  Luồng thực thi task: như xem "replay" Agent hoàn thành một task từng bước.
-->
<template>
  <div class="flow">
    <div class="header">
      <div>
        <div class="title">
          Replay task: Agent hoàn thành từng bước thế nào?
        </div>
        <div class="subtitle">
          Click vào bước để xem "gọi tool" và "kết quả trung gian".
        </div>
      </div>
      <div class="actions">
        <button
          class="btn"
          :disabled="step === 0"
          @click="step = Math.max(0, step - 1)"
        >
          Bước trước
        </button>
        <button
          class="btn primary"
          :disabled="step === steps.length - 1"
          @click="step = Math.min(steps.length - 1, step + 1)"
        >
          Bước sau
        </button>
      </div>
    </div>

    <div class="timeline">
      <button
        v-for="(s, i) in steps"
        :key="s.title"
        :class="['t', { active: i === step }]"
        @click="step = i"
      >
        <span class="n">{{ i + 1 }}</span>
        <span class="txt">{{ s.title }}</span>
      </button>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">
          Bước hiện tại
        </div>
        <div class="panel-body">
          {{ steps[step].desc }}
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">
          Gọi tool (minh họa)
        </div>
        <pre><code>{{ steps[step].tool }}</code></pre>
      </div>
      <div class="panel">
        <div class="panel-title">
          Kết quả (minh họa)
        </div>
        <pre><code>{{ steps[step].result }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(0)

const steps = [
  {
    title: 'Hiểu mục tiêu',
    desc: 'Chia yêu cầu của bạn thành cấu trúc output "có thể bàn giao".',
    tool: 'LLM: parse_goal({ task, constraints, output_format })',
    result: 'Mục tiêu: tìm 3 bài; Output: tiêu đề + tóm tắt 1 câu (danh sách Markdown)'
  },
  {
    title: 'Tìm kiếm',
    desc: 'Dùng tool search để lấy các link ứng cử.',
    tool: 'tool:web_search({ query: \"agent introduction\" })',
    result: '- link1\n- link2\n- link3\n- link4 ...'
  },
  {
    title: 'Đọc trang',
    desc: 'Mở 3 link đầu, trích đoạn văn cốt lõi.',
    tool: 'tool:read_page({ url: link1/link2/link3 })',
    result: 'Đoạn cốt lõi của từng bài (đã trích)'
  },
  {
    title: 'Nén và sắp xếp',
    desc: 'Nén từng bài thành "tóm tắt 1 câu", thống nhất format.',
    tool: 'LLM: summarize_each({ paragraphs, max_len: 25 })',
    result: '- Tiêu đề A: một câu...\n- Tiêu đề B: một câu...\n- Tiêu đề C: một câu...'
  },
  {
    title: 'Tự check và bàn giao',
    desc: 'Kiểm tra có thỏa "3 mục + 1 câu + đúng format", rồi mới output.',
    tool: 'LLM: self_check({ checklist })',
    result: '✅ Đạt yêu cầu; output đã sẵn sàng'
  }
]
</script>

<style scoped>
.flow {
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
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}
.t {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}
.t.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}
.n {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-weight: 800;
}
.txt {
  font-weight: 800;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
