<template>
  <div class="tech-writing-demo">
    <div class="demo-label">So sánh technical writing ── Bấm để chuyển case</div>

    <div class="tabs">
      <button
        v-for="(c, i) in cases"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ c.icon }} {{ c.name }}</button>
    </div>

    <div class="compare">
      <div class="col bad">
        <div class="col-title">Cách viết tệ</div>
        <pre><code>{{ cases[current].bad }}</code></pre>
      </div>
      <div class="col good">
        <div class="col-title">Cách viết tốt</div>
        <pre><code>{{ cases[current].good }}</code></pre>
      </div>
    </div>

    <div class="tips">
      <strong>Điểm cải thiện:</strong>
      <span v-for="(t, i) in cases[current].tips" :key="i" class="tip-tag">{{ t }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)

const cases = [
  {
    name: 'Comment cho hàm',
    icon: '💬',
    bad: `// xu ly du lieu
function process(d) {
  // ...
}`,
    good: `/**
 * Chuyen du lieu don hang thanh dinh dang hoa don
 * @param {Order} order - Doi tuong don hang goc
 * @returns {Invoice} Hoa don da format
 * @throws {ValidationError} Khi du lieu don hang khong day du
 */
function toInvoice(order) {
  // ...
}`,
    tips: ['Giải thích "tại sao" thay vì "là gì"', 'Ghi rõ kiểu tham số và giá trị trả về', 'Mô tả trường hợp lỗi']
  },
  {
    name: 'Mô tả API',
    icon: '🔌',
    bad: `POST /api/users
Gui du lieu user de tao user.`,
    good: `POST /api/users
Tao tai khoan user moi.

Request body:
{
  "name": "Nguyen Van A",  // bat buoc, 2-50 ky tu
  "email": "a@b.com"        // bat buoc, email hop le
}

Response thanh cong 201:
{ "id": "u_123", "name": "Nguyen Van A" }

Response loi 400:
{ "error": "Email khong hop le" }`,
    tips: ['Cung cấp ví dụ request/response đầy đủ', 'Đánh dấu bắt buộc/tùy chọn', 'Liệt kê các tình huống lỗi']
  },
  {
    name: 'Changelog',
    icon: '📝',
    bad: `v2.1 - sua mot so bug, them tinh nang moi`,
    good: `## v2.1.0 (2025-01-15)

### Them moi
- Ho tro xuat hang loat bao cao dinh dang PDF

### Sua loi
- Sua loi trang login bi trang tren Safari (#234)

### Thay doi
- Yeu cau Node.js toi thieu nang tu 16 len 18`,
    tips: ['Phân loại theo nhóm (Thêm mới/Sửa lỗi/Thay đổi)', 'Liên kết số Issue', 'Ghi rõ phiên bản và ngày tháng']
  }
]
</script>

<style scoped>
.tech-writing-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .compare { grid-template-columns: 1fr; } }
.col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.col.bad .col-title { background: #fef2f2; color: #991b1b; }
.col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .col.good .col-title { background: #031c14; color: #6ee7b7; }
.col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.tips { font-size: 0.83rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.tip-tag { padding: 2px 8px; border-radius: 10px; background: var(--vp-c-brand-soft); font-size: 0.75rem; }
</style>
