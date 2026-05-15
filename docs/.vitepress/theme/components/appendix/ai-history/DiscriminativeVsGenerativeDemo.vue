<template>
  <div class="demo-card">
    <div class="schools-grid">
      <div v-for="(s, i) in schoolStyles" :key="i" class="school-card" :style="{ borderTopColor: s.color }">
        <div class="card-head">
          <span class="school-icon">{{ s.icon }}</span>
          <span class="school-name" :style="{ color: s.color }">{{ schools[i]?.name }}</span>
        </div>
        <div class="school-idea">{{ schools[i]?.idea }}</div>
        <div class="school-rep">{{ repLabel }}: {{ schools[i]?.rep }}</div>
        <div class="school-status">{{ schools[i]?.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const repLabel = 'Đại diện'

const schools = [
  {
    name: 'Chủ nghĩa ký hiệu (Symbolism)',
    idea: 'Trí tuệ = Suy luận ký hiệu / Quy tắc If-Then',
    rep: 'hệ chuyên gia, Deep Blue',
    status: 'Hợp nhất với chủ nghĩa liên kết (Neural-Symbolic AI)'
  },
  {
    name: 'Chủ nghĩa liên kết (Connectionism)',
    idea: 'Trí tuệ = Mạng nơ-ron + Lượng dữ liệu khổng lồ',
    rep: 'AlphaGo, dòng GPT',
    status: 'Chi phối kỷ nguyên LLM, là chủ đạo hiện nay'
  },
  {
    name: 'Chủ nghĩa hành vi (Behaviorism)',
    idea: 'Trí tuệ = Tương tác với môi trường / Reinforcement Learning',
    rep: 'AlphaGo (phần RL)',
    status: 'Hợp nhất với chủ nghĩa liên kết (Deep Reinforcement Learning)'
  }
]

const schoolStyles = [
  { icon: 'S', color: '#059669' },
  { icon: 'C', color: '#7c3aed' },
  { icon: 'B', color: '#d97706' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.schools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
@media (max-width: 640px) { .schools-grid { grid-template-columns: 1fr; } }
.school-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 3px solid; border-radius: 6px; padding: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; }
.card-head { display: flex; align-items: center; gap: 0.5rem; }
.school-icon { font-size: 1.3rem; font-weight: bold; }
.school-name { font-weight: bold; font-size: 0.9rem; }
.school-idea { font-size: 0.78rem; color: var(--vp-c-text-1); background: var(--vp-c-bg-alt); padding: 0.35rem 0.5rem; border-radius: 4px; }
.school-rep { font-size: 0.72rem; color: var(--vp-c-text-3); }
.school-status { font-size: 0.72rem; color: var(--vp-c-text-2); border-top: 1px dashed var(--vp-c-divider); padding-top: 0.35rem; }
</style>
