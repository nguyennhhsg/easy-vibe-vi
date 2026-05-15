<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📦</span>
      <span class="title">Quy chuẩn thiết kế field data</span>
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
      <div v-if="active === 'structure'" class="section">
        <h4>Object đơn vs Danh sách</h4>
        <div class="compare-row">
          <div class="compare-col">
            <div class="compare-title">Object đơn</div>
            <pre class="code-sm">
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "Nguyễn Văn A"
  }
}</pre>
          </div>
          <div class="compare-col">
            <div class="compare-title">Danh sách</div>
            <pre class="code-sm">
{
  "code": 0,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "total": 100
    }
  }
}</pre>
          </div>
        </div>
        <div class="note">
          Dữ liệu danh sách bọc trong mảng items, thông tin phân trang đặt trong object pagination
        </div>
      </div>

      <div v-if="active === 'naming'" class="section">
        <h4>Quy ước đặt tên field</h4>
        <div class="rule-list">
          <div v-for="rule in namingRules" :key="rule.name" class="rule-item">
            <div class="rule-header">
              <span class="rule-icon">{{ rule.icon }}</span>
              <span class="rule-name">{{ rule.name }}</span>
            </div>
            <div class="rule-examples">
              <code class="good">{{ rule.good }}</code>
              <span v-if="rule.bad" class="vs">vs</span>
              <code v-if="rule.bad" class="bad">{{ rule.bad }}</code>
            </div>
            <div class="rule-desc">{{ rule.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="active === 'datetime'" class="section">
        <h4>Thiết kế định dạng thời gian</h4>
        <div class="time-example">
          <pre class="code-block">
{
  "created_at": "2024-01-15T09:30:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z",
  "expired_at": "2025-01-15T00:00:00.000Z"
}</pre>
        </div>
        <div class="time-rules">
          <div class="time-rule">
            <span class="rule-label">Định dạng</span>
            <span class="rule-value">ISO 8601</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">Múi giờ</span>
            <span class="rule-value">UTC (hậu tố Z) hoặc offset rõ ràng</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">Độ chính xác</span>
            <span class="rule-value">Mili giây .000Z</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">Cách đặt tên</span>
            <span class="rule-value">xxx_at là mốc thời gian, xxx_duration là khoảng thời gian</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'null'" class="section">
        <h4>Xử lý giá trị rỗng</h4>
        <div class="compare-row">
          <div class="compare-col good-col">
            <div class="compare-title">✅ Khuyến nghị</div>
            <pre class="code-sm">
{
  "name": "Nguyễn Văn A",
  "nickname": null,
  "avatar": null
}</pre>
            <div class="compare-desc">Field tồn tại nhưng không có giá trị thì trả về null</div>
          </div>
          <div class="compare-col bad-col">
            <div class="compare-title">❌ Không khuyến nghị</div>
            <pre class="code-sm">
{
  "name": "Nguyễn Văn A"
}</pre>
            <div class="compare-desc">Bỏ field đi, frontend phải kiểm tra tồn tại</div>
          </div>
        </div>
        <div class="null-tips">
          <div class="tip-item">Mảng rỗng trả về <code>[]</code></div>
          <div class="tip-item">Object rỗng trả về <code>{}</code></div>
          <div class="tip-item">Frontend xử lý đồng nhất, không cần kiểm tra field có tồn tại không</div>
        </div>
      </div>

      <div v-if="active === 'relation'" class="section">
        <h4>Thiết kế dữ liệu liên kết</h4>
        <div class="relation-tabs">
          <button
            v-for="r in relations"
            :key="r.id"
            :class="['r-tab', { active: rId === r.id }]"
            @click="rId = r.id"
          >
            {{ r.name }}
          </button>
        </div>
        <div class="relation-content">
          <div class="relation-desc">{{ currentRelation.desc }}</div>
          <pre class="code-block"><code>{{ currentRelation.code }}</code></pre>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">Tham khảo chuẩn thời gian ISO 8601, đặt tên field theo phong cách snake_case</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('structure')
const rId = ref('embed')

const tabs = [
  { id: 'structure', icon: '📐', name: 'Thiết kế cấu trúc' },
  { id: 'naming', icon: '📝', name: 'Quy ước tên' },
  { id: 'datetime', icon: '🕐', name: 'Định dạng thời gian' },
  { id: 'null', icon: '∅', name: 'Xử lý giá trị rỗng' },
  { id: 'relation', icon: '🔗', name: 'Dữ liệu liên kết' }
]

const namingRules = [
  {
    icon: '🔡',
    name: 'Dùng snake_case',
    good: 'created_at',
    bad: 'createdAt',
    desc: 'Tên field JSON thống nhất dùng dấu gạch dưới'
  },
  {
    icon: '📖',
    name: 'Tránh viết tắt',
    good: 'user_id',
    bad: 'uid',
    desc: 'Giữ khả năng dễ đọc'
  },
  {
    icon: '✅',
    name: 'Boolean có prefix',
    good: 'is_active, has_permission',
    bad: 'active, permission',
    desc: 'Nhìn là biết kiểu boolean'
  },
  {
    icon: '📅',
    name: 'Thời gian có hậu tố',
    good: 'created_at, expired_at',
    bad: 'created, expired',
    desc: 'Cho biết rõ là field thời gian'
  },
  {
    icon: '🔢',
    name: 'Số lượng có hậu tố',
    good: 'total_count, page_size',
    bad: 'total, size',
    desc: 'Cho biết rõ là kiểu số'
  }
]

const relations = [
  {
    id: 'embed',
    name: 'Nhúng (embed)',
    desc: 'Phù hợp với dữ liệu liên kết nhỏ, hay truy cập',
    code: `{
  "id": 123,
  "name": "Nguyễn Văn A",
  "department": {
    "id": 1,
    "name": "Phòng kỹ thuật"
  }
}`
  },
  {
    id: 'foreign',
    name: 'Khóa ngoại',
    desc: 'Phù hợp với dữ liệu lớn, tải theo nhu cầu',
    code: `{
  "id": 123,
  "name": "Nguyễn Văn A",
  "department_id": 1
}`
  },
  {
    id: 'expand',
    name: 'Tham số expand',
    desc: 'Phong cách Stripe, client mở rộng theo nhu cầu',
    code: `// GET /users/123?expand=department
{
  "id": 123,
  "name": "Nguyễn Văn A",
  "department": {
    "id": 1,
    "name": "Phòng kỹ thuật"
  }
}`
  }
]

const currentRelation = computed(() => {
  return relations.find((r) => r.id === rId.value) || relations[0]
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

.compare-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 1fr;
  }
}

.compare-col {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.compare-col.good-col {
  border-color: color-mix(in srgb, #22c55e 30%, transparent);
  background: color-mix(in srgb, #22c55e 5%, var(--vp-c-bg));
}

.compare-col.bad-col {
  border-color: color-mix(in srgb, #ef4444 30%, transparent);
  background: color-mix(in srgb, #ef4444 5%, var(--vp-c-bg));
}

.compare-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.compare-desc {
  font-size: 11px;
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

.note {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rule-icon {
  font-size: 16px;
}

.rule-name {
  font-size: 13px;
  font-weight: 600;
}

.rule-examples {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.rule-examples code {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.rule-examples .good {
  background: color-mix(in srgb, #22c55e 15%, transparent);
  color: #16a34a;
}

.rule-examples .bad {
  background: color-mix(in srgb, #ef4444 15%, transparent);
  color: #dc2626;
  text-decoration: line-through;
}

.rule-examples .vs {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.rule-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.time-example {
  margin-bottom: 12px;
}

.time-rules {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.time-rule {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.rule-value {
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.null-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.tip-item code {
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 11px;
}

.relation-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.r-tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.r-tab:hover {
  border-color: var(--vp-c-brand);
}

.r-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.relation-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
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
