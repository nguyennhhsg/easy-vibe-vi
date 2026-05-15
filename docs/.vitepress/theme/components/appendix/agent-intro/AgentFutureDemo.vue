<!--
  AgentFutureDemo.vue
  Hướng tương lai của Agent: click một xu hướng, xem "sẽ mang lại thay đổi gì" và "ngay bây giờ bạn có thể chuẩn bị gì".
-->
<template>
  <div class="future">
    <div class="header">
      <div>
        <div class="title">
          Tương lai của Agent: ổn định hơn, mạnh hơn, hợp tác hơn
        </div>
        <div class="subtitle">
          Click một xu hướng để xem nó có ý nghĩa gì.
        </div>
      </div>
    </div>

    <div class="chips">
      <button
        v-for="t in trends"
        :key="t.id"
        :class="['chip', { active: current.id === t.id }]"
        @click="current = t"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="panel">
      <div class="p-title">
        {{ current.label }}
      </div>
      <div class="p-body">
        {{ current.desc }}
      </div>
      <div class="grid">
        <div class="card">
          <div class="k">
            Sẽ mang lại điều gì?
          </div>
          <div class="v">
            {{ current.impact }}
          </div>
        </div>
        <div class="card">
          <div class="k">
            Bây giờ bạn có thể chuẩn bị gì?
          </div>
          <div class="v">
            {{ current.prepare }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trends = [
  {
    id: 'planning',
    label: 'Planning mạnh hơn',
    desc: 'Chia mục tiêu lớn thành sub-task hợp lý hơn, và có thể đổi kế hoạch linh hoạt.',
    impact: 'Ít lệch chủ đề hơn, ít sót bước hơn, tỷ lệ thành công của task phức tạp cao hơn.',
    prepare: 'Học cách viết "kế hoạch/checkpoint", chia task thành các phần nhỏ có thể nghiệm thu.'
  },
  {
    id: 'memory',
    label: 'Bộ nhớ tốt hơn',
    desc: 'Ghi nhớ lâu dài sở thích, sự kiện và trạng thái dự án, tái sử dụng xuyên task.',
    impact: 'Giống như đồng nghiệp lâu năm: càng dùng càng hiểu bạn, ít việc lặp lại.',
    prepare: 'Thiết kế cấu trúc bộ nhớ: ngắn hạn / dài hạn / working memory, kèm bảo mật và che dữ liệu nhạy cảm.'
  },
  {
    id: 'multi',
    label: 'Multi-Agent hợp tác',
    desc: 'Nhiều vai trò xử lý song song, sau đó coordinator gộp output lại.',
    impact: 'Task lớn được parallelize, chất lượng ổn định hơn (nghiên cứu / hiện thực hóa / review chia việc).',
    prepare: 'Định nghĩa rõ "ranh giới vai trò" và "format bàn giao" trước.'
  },
  {
    id: 'safety',
    label: 'Guardrails an toàn mạnh hơn',
    desc: 'Phân quyền, xác nhận và audit chi tiết hơn, giảm rủi ro lạm dụng tool.',
    impact: 'Dễ đưa lên môi trường nghiệp vụ thật hơn, giảm sự cố.',
    prepare: 'Mặc định bật: số bước tối đa, giới hạn ngân sách, xác nhận thao tác nguy hiểm, sandbox.'
  }
]

const current = ref(trends[0])
</script>

<style scoped>
.future {
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

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chip {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.p-title {
  font-weight: 900;
  margin-bottom: 6px;
}
.p-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 10px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
}
.card {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px;
}
.k {
  font-weight: 900;
  margin-bottom: 4px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
