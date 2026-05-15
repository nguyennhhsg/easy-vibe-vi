<template>
  <div class="demo-card">
    <div class="demo-header">
      <span class="title">Tóm tắt lộ trình phát triển chính</span>
    </div>
    <div class="path-flow">
      <div v-for="(item, i) in path" :key="i" class="path-item">
        <div class="path-card" :style="{ borderLeftColor: item.color }">
          <div class="path-top">
            <span class="path-icon" :style="{ background: item.color }">{{ i + 1 }}</span>
            <div>
              <div class="path-name">{{ item.name }}</div>
              <div class="path-years">{{ item.years }}</div>
            </div>
          </div>
          <div class="path-desc">{{ item.desc }}</div>
        </div>
        <div v-if="i < path.length - 1" class="path-connector">
          <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0 L10 18 L5 13 M10 18 L15 13" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" stroke-linecap="round" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const path = [
  { name: 'Đặt nền móng lý thuyết', years: '1940s-1950s', desc: 'Turing Test, hội nghị Dartmouth, ra đời chủ nghĩa biểu tượng', color: '#3b82f6' },
  { name: 'Chủ nghĩa biểu tượng chi phối', years: '1960s-1980s', desc: 'Hệ chuyên gia trỗi dậy và hai mùa đông AI', color: '#059669' },
  { name: 'Chuyển sang Machine Learning', years: '1990s-2000s', desc: 'Phương pháp thống kê thay thế rule, connectionism hồi sinh', color: '#d97706' },
  { name: 'Cách mạng Deep Learning', years: '2010s', desc: 'AlexNet, AlphaGo, kiến trúc Transformer; connectionism trở thành chủ đạo', color: '#dc2626' },
  { name: 'Kỷ nguyên mô hình lớn', years: '2018 đến nay', desc: 'Dòng GPT, multimodal, hé lộ AGI', color: '#7c3aed' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.demo-header { margin-bottom: 1rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.path-flow { display: flex; flex-direction: column; align-items: stretch; }
.path-item { display: flex; flex-direction: column; align-items: center; }
.path-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-left: 4px solid; border-radius: 0 8px 8px 0; padding: 0.8rem 1rem; width: 100%; }
.path-top { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.35rem; }
.path-icon { width: 24px; height: 24px; border-radius: 50%; color: white; font-size: 0.72rem; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.path-name { font-weight: bold; font-size: 0.9rem; color: var(--vp-c-text-1); }
.path-years { font-size: 0.72rem; color: var(--vp-c-text-3); font-weight: bold; }
.path-desc { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.4; padding-left: 2.2rem; }
.path-connector { display: flex; justify-content: center; padding: 0.15rem 0; }
</style>
