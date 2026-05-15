<!--
  AgentArchitectureDemo.vue
  Kiến trúc Agent "bấm đâu xem đó": click vào module, bên phải hiện ra nó làm gì + input/output điển hình.
-->
<template>
  <div class="arch">
    <div class="header">
      <div>
        <div class="title">
          Agent được ghép từ những module nào?
        </div>
        <div class="subtitle">
          Click vào module để xem nó "phụ trách gì".
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="diagram">
        <button
          v-for="m in modules"
          :key="m.id"
          :class="['node', { active: current.id === m.id }]"
          @click="current = m"
        >
          <span class="icon">{{ m.icon }}</span>
          <span class="name">{{ m.name }}</span>
        </button>

        <div class="pipes">
          <div class="pipe">
            Mục tiêu của bạn → Kế hoạch → Gọi tool → Kết quả → Lập kế hoạch lại…
          </div>
          <div class="pipe small">
            (Bộ nhớ sẽ xuyên suốt toàn bộ quá trình)
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">
          {{ current.icon }} {{ current.name }}
        </div>
        <div class="panel-body">
          {{ current.desc }}
        </div>

        <div class="io">
          <div class="io-title">
            Input điển hình
          </div>
          <pre><code>{{ current.input }}</code></pre>
        </div>
        <div class="io">
          <div class="io-title">
            Output điển hình
          </div>
          <pre><code>{{ current.output }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modules = [
  {
    id: 'llm',
    icon: '🧠',
    name: 'LLM (Bộ não)',
    desc: 'Phụ trách hiểu mục tiêu, tạo kế hoạch, chọn hành động, tổ chức ngôn ngữ output.',
    input: 'Mục tiêu của bạn + trạng thái hiện tại + danh sách tool khả dụng',
    output: 'Kế hoạch bước tiếp theo / tham số gọi tool / câu trả lời cuối cùng'
  },
  {
    id: 'tools',
    icon: '🔧',
    name: 'Tools (Tay chân)',
    desc: 'Phụ trách thực sự "làm việc": tìm kiếm, đọc/ghi file, gọi API, chạy lệnh.',
    input: 'tool_name + tham số input_schema',
    output: 'Kết quả thực thi tool (text/data/thay đổi file)'
  },
  {
    id: 'memory',
    icon: '💾',
    name: 'Memory (Bộ nhớ)',
    desc: 'Lưu lại "đã làm gì, kết quả ra sao" để tránh lặp lại và lệch hướng.',
    input: 'Lịch sử hội thoại / kết quả tool / trạng thái task hiện tại',
    output: 'Context có thể truy xuất (ngắn hạn / dài hạn / working memory)'
  },
  {
    id: 'planner',
    icon: '🧩',
    name: 'Planning (Lập kế hoạch)',
    desc: 'Chia mục tiêu lớn thành các bước nhỏ, và sửa kế hoạch khi gặp lỗi (kế hoạch không cố định).',
    input: 'Mục tiêu + ràng buộc (ngân sách/thời gian/an toàn) + tiến độ hiện tại',
    output: 'Danh sách bước / hành động tiếp theo / điều kiện dừng'
  },
  {
    id: 'guard',
    icon: '🛡️',
    name: 'Guardrails (Hàng rào bảo vệ)',
    desc: 'Hạn chế rủi ro: whitelist quyền, giới hạn ngân sách, xác nhận thao tác nhạy cảm, chạy trong sandbox.',
    input: 'Hành động yêu cầu thực thi + chính sách an toàn',
    output: 'Cho phép / từ chối / yêu cầu xác nhận + log audit'
  }
]

const current = ref(modules[0])
</script>

<style scoped>
.arch {
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.diagram {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}

.node.active {
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

.pipes {
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}
.pipe {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}
.pipe.small {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.panel-title {
  font-weight: 800;
}
.panel-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.io-title {
  font-weight: 700;
  margin-bottom: 6px;
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
