<template>
  <div class="demo-card">
    <div class="attention-demo">
      <div class="demo-title">Ví dụ self-attention: "anh ấy" chú ý đến "Minh"</div>
      <div class="sentence">Minh đưa quả táo cho <span class="focus">anh ấy</span> của mẹ</div>
      <div class="attention-bar">
        <div class="bar-item" v-for="item in weights" :key="item.word">
          <span class="word">{{ item.word }}</span>
          <div class="bar" :style="{ width: item.w * 100 + '%', background: getColor(item.w) }"></div>
          <span class="pct">{{ Math.round(item.w * 100) }}%</span>
        </div>
      </div>
      <div class="caption">"anh ấy" dồn 65% attention vào "Minh", nhờ đó nhận diện được đại từ chỉ đến ai</div>
    </div>
  </div>
</template>

<script setup>
const weights = [
  { word: 'Minh', w: 0.65 },
  { word: 'đưa', w: 0.05 },
  { word: 'quả táo', w: 0.10 },
  { word: 'cho', w: 0.10 },
  { word: 'anh ấy', w: 0.05 },
  { word: 'của', w: 0.03 },
  { word: 'mẹ', w: 0.02 },
]

const getColor = (v) => v > 0.5 ? '#dc2626' : v > 0.15 ? '#d97706' : '#059669'
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.attention-demo { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.demo-title { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.sentence { font-size: 0.9rem; color: var(--vp-c-text-1); margin-bottom: 0.6rem; text-align: center; }
.sentence .focus { color: var(--vp-c-brand); font-weight: bold; background: var(--vp-c-brand-soft); padding: 0.1rem 0.3rem; border-radius: 3px; }
.attention-bar { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.5rem; }
.bar-item { display: flex; align-items: center; gap: 0.3rem; }
.word { width: 35px; text-align: right; font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-2); }
.bar { height: 10px; border-radius: 5px; min-width: 2px; }
.pct { font-size: 0.65rem; color: var(--vp-c-text-3); width: 30px; }
.caption { font-size: 0.7rem; color: var(--vp-c-text-3); text-align: center; font-style: italic; }
</style>
