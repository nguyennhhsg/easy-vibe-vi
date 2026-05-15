<template>
  <div class="demo-card">
    <div class="heads-grid">
      <div v-for="head in heads" :key="head.id" class="head-card">
        <div class="head-name">{{ head.name }}</div>
        <div class="head-desc">{{ head.desc }}</div>
      </div>
    </div>
    <div class="summary">8 head hiểu ngữ nghĩa từ nhiều góc nhìn khác nhau, cuối cùng concat lại để hợp nhất</div>
  </div>
</template>

<script setup>
const heads = [
  { id: 1, name: 'Head ngữ pháp', desc: 'Quan hệ chủ-vị-tân' },
  { id: 2, name: 'Head ngữ nghĩa', desc: 'Liên kết nghĩa từ' },
  { id: 3, name: 'Head vị trí', desc: 'Quan hệ khoảng cách' },
  { id: 4, name: 'Head chỉ định', desc: 'Giải mã đại từ' },
  { id: 5, name: 'Head cảm xúc', desc: 'Khuynh hướng cảm xúc' },
  { id: 6, name: 'Head thực thể', desc: 'Named Entity' },
  { id: 7, name: 'Head bổ ngữ', desc: 'Định ngữ / trạng ngữ / bổ ngữ' },
  { id: 8, name: 'Head toàn cục', desc: 'Bối cảnh tổng thể' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.heads-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.6rem; }
@media (max-width: 720px) { .heads-grid { grid-template-columns: repeat(2, 1fr); } }
.head-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0.5rem; text-align: center; }
.head-name { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.head-desc { font-size: 0.68rem; color: var(--vp-c-text-2); }
.summary { font-size: 0.75rem; color: var(--vp-c-text-2); text-align: center; font-style: italic; }
</style>
