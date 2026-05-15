<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📋</span>
      <span class="title">Thiết kế cấu trúc API response</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'why'" class="section">
        <h4>Vì sao cần thống nhất định dạng response?</h4>
        <div class="problem-box">
          <div class="problem-title">❌ Vấn đề: các API trả về định dạng khác nhau</div>
          <pre class="code-sm">
// API A
{ "data": { "user": {...} } }

// API B
{ "result": { "user": {...} } }

// API C
{ "user": {...} }</pre>
          <div class="problem-desc">
            Frontend phải xử lý riêng cho từng API, code dư thừa và dễ bug
          </div>
        </div>
        <div class="solution-box">
          <div class="solution-title">✅ Giải pháp: thống nhất định dạng response</div>
          <pre class="code-sm">
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "request_id": "req-xxx"
}</pre>
        </div>
      </div>

      <div v-if="active === 'fields'" class="section">
        <h4>Mô tả các field response</h4>
        <div class="field-list">
          <div v-for="field in fields" :key="field.name" class="field-item">
            <div class="field-header">
              <code class="field-name">{{ field.name }}</code>
              <span class="field-type">{{ field.type }}</span>
              <span v-if="field.required" class="field-required">Bắt buộc</span>
            </div>
            <div class="field-desc">{{ field.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="active === 'codes'" class="section">
        <h4>Thiết kế mã trạng thái nghiệp vụ</h4>
        <div class="code-ranges">
          <div class="range-item">
            <span class="range-num">0</span>
            <span class="range-label">Thành công</span>
          </div>
          <div class="range-item">
            <span class="range-num">1xxxx</span>
            <span class="range-label">Lỗi client</span>
          </div>
          <div class="range-item">
            <span class="range-num">2xxxx</span>
            <span class="range-label">Lỗi nghiệp vụ</span>
          </div>
          <div class="range-item">
            <span class="range-num">3xxxx</span>
            <span class="range-label">Lỗi xác thực/quyền</span>
          </div>
          <div class="range-item">
            <span class="range-num">5xxxx</span>
            <span class="range-label">Lỗi hệ thống</span>
          </div>
        </div>
        <div class="code-examples">
          <div v-for="code in codeExamples" :key="code.code" class="code-row">
            <code class="code-value">{{ code.code }}</code>
            <span class="code-msg">{{ code.message }}</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'examples'" class="section">
        <h4>Ví dụ response trong các tình huống</h4>
        <div class="example-tabs">
          <button
            v-for="ex in examples"
            :key="ex.id"
            :class="['ex-tab', { active: exId === ex.id }]"
            @click="exId = ex.id"
          >
            {{ ex.name }}
          </button>
        </div>
        <div class="example-content">
          <pre class="code-block"><code>{{ currentExample.code }}</code></pre>
          <div class="example-note">{{ currentExample.note }}</div>
        </div>
      </div>

      <div v-if="active === 'pagination'" class="section">
        <h4>Thiết kế tham số phân trang</h4>
        <div class="pg-row">
          <div class="pg-col">
            <div class="pg-title">Tham số request</div>
            <div class="pg-params">
              <div class="pg-item">
                <code>page</code>
                <span>Số trang, bắt đầu từ 1</span>
              </div>
              <div class="pg-item">
                <code>page_size</code>
                <span>Số bản ghi mỗi trang, mặc định 20</span>
              </div>
              <div class="pg-item">
                <code>sort</code>
                <span>Sắp xếp, ví dụ created_desc</span>
              </div>
            </div>
          </div>
          <div class="pg-col">
            <div class="pg-title">Định dạng response</div>
            <pre class="code-sm">
"pagination": {
  "page": 1,
  "page_size": 20,
  "total": 156,
  "total_pages": 8,
  "has_next": true
}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">request_id dùng để truy vết, nên sinh bằng UUID v4 hoặc thuật toán snowflake</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('why')
const exId = ref('success')

const tabs = [
  { id: 'why', icon: '❓', name: 'Vì sao cần thống nhất' },
  { id: 'fields', icon: '📝', name: 'Mô tả field' },
  { id: 'codes', icon: '🔢', name: 'Mã trạng thái' },
  { id: 'examples', icon: '📄', name: 'Ví dụ' },
  { id: 'pagination', icon: '📑', name: 'Phân trang' }
]

const fields = [
  {
    name: 'code',
    type: 'number',
    required: true,
    desc: 'Mã trạng thái nghiệp vụ, 0 nghĩa là thành công'
  },
  { name: 'message', type: 'string', required: true, desc: 'Mô tả trạng thái' },
  {
    name: 'data',
    type: 'any',
    required: false,
    desc: 'Dữ liệu nghiệp vụ, có thể là null khi thất bại'
  },
  {
    name: 'request_id',
    type: 'string',
    required: true,
    desc: 'Định danh duy nhất của request, dùng để truy vết'
  },
  {
    name: 'timestamp',
    type: 'string',
    required: false,
    desc: 'Thời điểm response, định dạng ISO 8601'
  }
]

const codeExamples = [
  { code: 0, message: 'success - thành công' },
  { code: 10001, message: 'Sai tham số: thiếu field bắt buộc' },
  { code: 10002, message: 'Resource không tồn tại' },
  { code: 20001, message: 'Số dư không đủ' },
  { code: 30001, message: 'Chưa đăng nhập' },
  { code: 50001, message: 'Hệ thống bận, vui lòng thử lại sau' }
]

const examples = [
  {
    id: 'success',
    name: 'Thành công - object đơn',
    code: `{
  "code": 0,
  "message": "success",
  "data": {
    "id": 123,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com"
  },
  "request_id": "req-abc123"
}`,
    note: 'Response thành công: data chứa dữ liệu nghiệp vụ'
  },
  {
    id: 'list',
    name: 'Thành công - danh sách',
    code: `{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      { "id": 1, "name": "Sản phẩm A" },
      { "id": 2, "name": "Sản phẩm B" }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 156
    }
  },
  "request_id": "req-def456"
}`,
    note: 'Response dạng list: mảng items + thông tin pagination'
  },
  {
    id: 'error',
    name: 'Lỗi nghiệp vụ',
    code: `{
  "code": 20001,
  "message": "Số dư không đủ, hiện còn 50.000 đ",
  "data": null,
  "request_id": "req-ghi789"
}`,
    note: 'Lỗi nghiệp vụ: code khác 0, message giải thích lý do'
  },
  {
    id: 'validate',
    name: 'Kiểm tra tham số',
    code: `{
  "code": 10001,
  "message": "Kiểm tra tham số thất bại",
  "data": {
    "errors": [
      { "field": "email", "message": "Sai định dạng email" },
      { "field": "password", "message": "Mật khẩu tối thiểu 8 ký tự" }
    ]
  },
  "request_id": "req-jkl012"
}`,
    note: 'Lỗi tham số: data.errors liệt kê tất cả field lỗi'
  }
]

const currentExample = computed(() => {
  return examples.find((e) => e.id === exId.value) || examples[0]
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.problem-box,
.solution-box {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
}

.problem-box {
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #ef4444 20%, transparent);
}

.solution-box {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #22c55e 20%, transparent);
}

.problem-title,
.solution-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}

.problem-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.code-sm {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-item {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.field-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.field-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.field-type {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.field-required {
  font-size: 10px;
  color: #f59e0b;
  background: color-mix(in srgb, #f59e0b 15%, transparent);
  padding: 1px 5px;
  border-radius: 3px;
}

.field-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.code-ranges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.range-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.range-num {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.range-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.code-examples {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.code-value {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.code-msg {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.example-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.ex-tab {
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.ex-tab:hover {
  border-color: var(--vp-c-brand);
}

.ex-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.example-note {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  padding-left: 4px;
}

.pg-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .pg-row {
    grid-template-columns: 1fr;
  }
}

.pg-col {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.pg-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.pg-params {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pg-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.pg-item code {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  color: var(--vp-c-brand);
}

.pg-item span {
  color: var(--vp-c-text-2);
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.tips-icon {
  font-size: 14px;
}

.tips-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
