<!--
  PromptComparisonDemo.vue
  So sánh "rõ ràng vs mơ hồ": tách một prompt thành bốn phần (task / context / yêu cầu / format output), và cho thấy thiếu phần nào sẽ khiến output lệch hướng.
-->
<template>
  <el-card
    class="cmp-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">
            Rõ ràng vs mơ hồ: vấn đề không phải "rườm rà" mà là "thiếu chi tiết"
          </h3>
          <p class="subtitle">
            Tích vào những thông tin bạn muốn bổ sung và xem output thay đổi ra sao.
          </p>
        </div>
        <div class="task-select">
          <el-select
            v-model="task"
            placeholder="Chọn tác vụ"
            style="width: 200px"
          >
            <el-option
              label="Viết mở đầu blog kỹ thuật"
              value="blog"
            />
            <el-option
              label="Xuất nội dung dạng JSON"
              value="json"
            />
          </el-select>
        </div>
      </div>
    </template>

    <div class="options-container">
      <el-checkbox
        v-model="useRole"
        label="Vai trò (bạn là ai)"
        border
      />
      <el-checkbox
        v-model="useAudience"
        label="Đối tượng (viết cho ai)"
        border
      />
      <el-checkbox
        v-model="useConstraints"
        label="Ràng buộc (độ dài / số ý chính)"
        border
      />
      <el-checkbox
        v-model="useFormat"
        label="Định dạng output (JSON / danh sách)"
        border
      />
    </div>

    <div class="grid-layout">
      <el-card
        shadow="never"
        class="panel input-panel"
      >
        <template #header>
          <div class="panel-header">
            Prompt bạn gửi cho AI
          </div>
        </template>
        <div class="code-block">
          <pre><code>{{ prompt }}</code></pre>
        </div>
        <div class="checklist">
          <div
            v-for="i in checklist"
            :key="i.text"
            class="check-item"
          >
            <el-tag
              :type="i.ok ? 'success' : 'danger'"
              size="small"
              effect="dark"
              style="margin-right: 8px; min-width: 60px; text-align: center;"
            >
              {{ i.ok ? 'OK' : 'MISSING' }}
            </el-tag>
            <span>{{ i.text }}</span>
          </div>
        </div>
      </el-card>

      <el-card
        shadow="never"
        class="panel output-panel"
      >
        <template #header>
          <div class="panel-header">
            Output AI (minh hoạ)
          </div>
        </template>
        <div class="output-content">
          {{ output }}
        </div>

        <div
          v-if="warnings.length"
          class="warnings-section"
        >
          <el-alert
            v-for="w in warnings"
            :key="w"
            :title="w"
            type="warning"
            show-icon
            :closable="false"
            style="margin-top: 8px"
          />
        </div>
        <el-empty
          v-else
          description="Tuyệt! Không có vấn đề rõ ràng nào."
          :image-size="60"
        />
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'

const task = ref('blog')
const useRole = ref(false)
const useAudience = ref(true)
const useConstraints = ref(true)
const useFormat = ref(false)

const prompt = computed(() => {
  if (task.value === 'blog') {
    const lines = []
    if (useRole.value) lines.push('Bạn là kỹ sư frontend kỳ cựu.')
    lines.push('Hãy viết một đoạn mở đầu blog kỹ thuật, chủ đề: prompt engineering.')
    if (useAudience.value) lines.push('Đối tượng đọc: người mới bắt đầu, chưa có nền tảng.')
    if (useConstraints.value)
      lines.push('Yêu cầu: 80-120 chữ, văn phong khẩu ngữ, kèm một phép so sánh đời thường.')
    if (useFormat.value) lines.push('Output: chỉ xuất một đoạn văn, không tiêu đề.')
    return lines.join('\n')
  }

  // json task
  const lines = []
  if (useRole.value) lines.push('Bạn là trợ lý trích xuất thông tin.')
  lines.push('Hãy trích xuất thông tin then chốt từ đoạn văn bên dưới.')
  if (useAudience.value) lines.push('Mục đích: cho product manager đọc nhanh.')
  if (useConstraints.value) lines.push('Yêu cầu: lấy 3-5 từ khoá + 1 câu tóm tắt.')
  if (useFormat.value) {
    lines.push('Định dạng output (JSON):')
    lines.push('{')
    lines.push('  "summary": "...",')
    lines.push('  "keywords": ["..."]')
    lines.push('}')
  }
  lines.push('Input:')
  lines.push('"Prompt engineering giúp cải thiện đáng kể chất lượng đầu ra của mô hình, nhưng cần tác vụ rõ ràng, ràng buộc và định dạng."')
  return lines.join('\n')
})

const checklist = computed(() => [
  { text: 'Task rõ ràng (làm gì)', ok: true },
  { text: 'Định nghĩa vai trò (bạn là ai)', ok: useRole.value },
  { text: 'Context / đối tượng (viết cho ai)', ok: useAudience.value },
  { text: 'Ràng buộc cụ thể (làm thế nào)', ok: useConstraints.value },
  { text: 'Yêu cầu định dạng (output trông ra sao)', ok: useFormat.value }
])

const output = computed(() => {
  if (task.value === 'blog') {
    if (!useConstraints.value && !useAudience.value) {
      return 'Prompt Engineering là kỹ thuật tối ưu phần văn bản đầu vào cho mô hình ngôn ngữ lớn để dẫn dắt mô hình sinh ra output chính xác và chất lượng hơn. Nó đòi hỏi bạn hiểu cách mô hình vận hành, thiết kế cấu trúc chỉ thị hiệu quả và liên tục lặp lại để kiểm thử.'
    }
    if (useAudience.value && !useConstraints.value) {
      return 'Chào các bạn! Hôm nay chúng ta cùng nói về "prompt engineering". Đơn giản là, nó dạy bạn cách trò chuyện với một con robot siêu thông minh. Chỉ cần nói đúng, nó sẽ giúp bạn làm chuyện lớn!'
    }
    return 'Chào các bạn! Đã nghe tới "prompt engineering" chưa? Nó giống như đặt món ăn vậy — bạn phải nói với đầu bếp (AI) mình muốn cay vừa hay cay khủng (ràng buộc), món cho trẻ con hay người lớn (đối tượng). Nói càng rõ thì món được mang ra (câu trả lời) càng đúng khẩu vị! Hôm nay cùng học cách "gọi món" nhé.'
  }

  // json
  if (!useFormat.value) {
    return 'Đoạn này chủ yếu nói về vai trò của prompt engineering, cùng ba yếu tố cần có: task rõ ràng, ràng buộc và định dạng. Từ khoá bao gồm prompt engineering, chất lượng output...'
  }
  return `{
  "summary": "Prompt engineering nâng cao output của mô hình thông qua task, ràng buộc và định dạng rõ ràng.",
  "keywords": ["prompt engineering", "chất lượng output", "task rõ ràng", "ràng buộc", "định dạng"]
}`
})

const warnings = computed(() => {
  const w = []
  if (!useRole.value) w.push('Thiếu vai trò: giọng văn của AI có thể thiếu chuyên nghiệp hoặc thiếu nhất quán.')
  if (!useAudience.value)
    w.push('Không nêu đối tượng: AI có thể không biết nên dùng thuật ngữ chuyên sâu hay ngôn ngữ phổ thông.')
  if (!useConstraints.value) w.push('Thiếu ràng buộc: AI dễ viết lan man hoặc quá ngắn.')
  if (!useFormat.value) w.push('Chưa định dạng: chương trình phía sau khó parse kết quả tự động.')
  return w
})
</script>

<style scoped>
.cmp-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel-header {
  font-weight: 600;
  font-size: 15px;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: var(--vp-font-family-mono);
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.output-content {
  background-color: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 80px;
}

.warnings-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .task-select {
    width: 100%;
  }

  .task-select .el-select {
    width: 100% !important;
  }
}
</style>
