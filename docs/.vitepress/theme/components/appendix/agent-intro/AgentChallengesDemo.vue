<!--
  AgentChallengesDemo.vue
  Thử thách không phải "liệt kê danh sách", mà là "cảm nhận được rủi ro":
  - Bật/tắt guardrails (giới hạn bước / ngân sách / xác nhận / sandbox)
  - Xem điểm rủi ro thay đổi thế nào
-->
<template>
  <div class="risk">
    <div class="header">
      <div>
        <div class="title">
          Thử thách của Agent: không có guardrails là dễ "lật xe"
        </div>
        <div class="subtitle">
          Bật những guardrails này, rủi ro sẽ giảm rõ rệt.
        </div>
      </div>
      <div
        class="score"
        :class="scoreClass"
      >
        Điểm rủi ro: {{ score }}/100
      </div>
    </div>

    <div class="controls">
      <label class="toggle"><input
        v-model="maxSteps"
        type="checkbox"
      >
        Số vòng lặp tối đa (chống vòng lặp vô tận)</label>
      <label class="toggle"><input
        v-model="budget"
        type="checkbox"
      > Giới hạn ngân sách (chống đốt tiền)</label>
      <label class="toggle"><input
        v-model="confirm"
        type="checkbox"
      > Xác nhận lại với thao tác nguy hiểm</label>
      <label class="toggle"><input
        v-model="sandbox"
        type="checkbox"
      > Chạy trong sandbox (cách ly hệ thống)</label>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">
          Rủi ro thường gặp
        </div>
        <ul>
          <li>Thử đi thử lại → vòng lặp vô tận</li>
          <li>Dùng tool lung tung → xóa nhầm / gửi nhầm</li>
          <li>Nội dung bên ngoài inject → bị dắt đi sai hướng</li>
          <li>Gọi quá nhiều → chi phí mất kiểm soát</li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          Bạn đang bật những gì?
        </div>
        <div class="v">
          {{ enabledList }}
        </div>
        <div class="note">
          Gợi ý: ít nhất nên có "Số bước tối đa + Xác nhận".
        </div>
      </div>
      <div class="card">
        <div class="k">
          Lời khuyên một câu
        </div>
        <div class="v">
          {{ advice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxSteps = ref(true)
const budget = ref(false)
const confirm = ref(true)
const sandbox = ref(false)

const score = computed(() => {
  let s = 85
  if (maxSteps.value) s -= 18
  if (budget.value) s -= 15
  if (confirm.value) s -= 22
  if (sandbox.value) s -= 18
  return Math.max(0, s)
})

const scoreClass = computed(() => {
  if (score.value <= 35) return 'good'
  if (score.value <= 60) return 'mid'
  return 'bad'
})

const enabledList = computed(() => {
  const items = []
  if (maxSteps.value) items.push('Số bước tối đa')
  if (budget.value) items.push('Giới hạn ngân sách')
  if (confirm.value) items.push('Xác nhận lại')
  if (sandbox.value) items.push('Sandbox')
  return items.length ? items.join(', ') : '(chưa bật cái nào)'
})

const advice = computed(() => {
  if (!maxSteps.value && !confirm.value)
    return 'Trước hết hãy thêm "Số bước tối đa" và "Xác nhận lại", đây là cảm giác an toàn rẻ nhất.'
  if (score.value <= 35)
    return 'Rất ổn: có thể bắt đầu làm các task phức tạp hơn, nhưng nhớ thêm log và monitoring.'
  if (score.value <= 60) return 'Tạm ổn: nên thêm ngân sách hoặc sandbox để tránh tình huống cực đoan.'
  return 'Rủi ro hơi cao: nên ưu tiên bổ sung guardrails trước khi cho Agent thực thi thật.'
})
</script>

<style scoped>
.risk {
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
  align-items: center;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.score {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 900;
}
.score.good {
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.4);
}
.score.mid {
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.4);
}
.score.bad {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.toggle {
  display: flex;
  gap: 8px;
  align-items: center;
}
input {
  accent-color: var(--vp-c-brand);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 900;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.note {
  margin-top: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
