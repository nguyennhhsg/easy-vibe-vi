<!--
  FrameworkSelectionDemo.vue
  Wizard chọn framework: trả lời 3 câu hỏi, nhận gợi ý + lý do phù hợp + lưu ý.
-->
<template>
  <div class="sel">
    <div class="header">
      <div>
        <div class="title">
          3 câu hỏi chọn framework
        </div>
        <div class="subtitle">
          Mục tiêu: chạy được một Agent tối thiểu trước, rồi mở rộng dần.
        </div>
      </div>
    </div>

    <div class="q">
      <div class="q-title">
        1) Bạn quan tâm điều gì nhất?
      </div>
      <div class="opts">
        <button
          v-for="o in q1"
          :key="o.id"
          :class="['opt', { active: a1 === o.id }]"
          @click="a1 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="q">
      <div class="q-title">
        2) Task của bạn giống loại nào?
      </div>
      <div class="opts">
        <button
          v-for="o in q2"
          :key="o.id"
          :class="['opt', { active: a2 === o.id }]"
          @click="a2 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="q">
      <div class="q-title">
        3) Có cần phân công nhiều Agent không?
      </div>
      <div class="opts">
        <button
          v-for="o in q3"
          :key="o.id"
          :class="['opt', { active: a3 === o.id }]"
          @click="a3 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="result">
      <div class="r-title">
        Gợi ý: {{ rec.name }}
      </div>
      <div class="r-body">
        {{ rec.reason }}
      </div>
      <div class="r-note">
        <strong>Lưu ý: </strong>{{ rec.note }}
      </div>
      <div class="r-next">
        <strong>Bước tiếp: </strong>{{ rec.next }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const q1 = [
  { id: 'easy', label: 'Học nhanh' },
  { id: 'stable', label: 'Kiểm soát & deploy được' },
  { id: 'team', label: 'Hợp tác nhóm' }
]
const q2 = [
  { id: 'workflow', label: 'Có flow rõ ràng (bước/sơ đồ)' },
  { id: 'chat', label: 'Thiên về hội thoại & đàm phán' },
  { id: 'explore', label: 'Thử nghiệm theo kiểu khám phá' }
]
const q3 = [
  { id: 'no', label: 'Không cần' },
  { id: 'maybe', label: 'Có thể cần' },
  { id: 'yes', label: 'Bắt buộc cần' }
]

const a1 = ref('stable')
const a2 = ref('workflow')
const a3 = ref('maybe')

const rec = computed(() => {
  // Multi-agent first
  if (a3.value === 'yes' || a1.value === 'team') {
    if (a2.value === 'chat') {
      return {
        name: 'AutoGen',
        reason: 'Hội thoại và hợp tác multi-Agent là điểm mạnh, phù hợp khi cần "thảo luận với nhau, chia việc".',
        note: 'Định nghĩa ranh giới vai trò trước, nếu không dễ trùng việc hoặc cãi nhau.',
        next: 'Bắt đầu với 2 Agent: Researcher + Executor.'
      }
    }
    return {
      name: 'CrewAI',
      reason: 'Mô hình vai trò + task rất trực quan, phù hợp với workflow nhóm "phân công rõ ràng".',
      note: 'Cố định format input/output trước, tránh khó gộp output từ nhiều người.',
      next: 'Bắt đầu với 2-3 vai trò: Researcher/Writer/Reviewer.'
    }
  }

  // Single-agent / controllable workflow
  if (a1.value === 'stable' || a2.value === 'workflow') {
    return {
      name: 'LangChain / LangGraph',
      reason: 'Phù hợp viết Agent thành "flow có kiểm soát", dễ debug, deploy, thêm guardrails.',
      note: 'Đừng làm hệ thống lớn ngay, hãy chạy thông 1 lượt gọi tool trước.',
      next: 'Vẽ một sơ đồ nhỏ 3-5 node bằng LangGraph.'
    }
  }

  // Easy start
  return {
    name: 'CrewAI',
    reason: 'Học nhanh, khái niệm trực quan, phù hợp để làm ra một demo "chạy được" trước.',
    note: 'Demo chạy được không có nghĩa deploy được, cần bổ sung bảo mật và observability sau.',
    next: 'Làm một team tối thiểu "Nghiên cứu + Viết" trước.'
  }
})
</script>

<style scoped>
.sel {
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

.q {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.q-title {
  font-weight: 800;
  margin-bottom: 8px;
}
.opts {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.opt {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.opt.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.result {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.r-title {
  font-weight: 900;
  margin-bottom: 6px;
}
.r-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 6px;
}
.r-note,
.r-next {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
