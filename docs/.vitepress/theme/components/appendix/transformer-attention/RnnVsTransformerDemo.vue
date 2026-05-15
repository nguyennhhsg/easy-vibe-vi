<template>
  <div class="demo-card">
    <div class="comparison-grid">
      <div class="model-col">
        <div class="model-name">RNN / LSTM</div>
        <div class="model-desc">Xử lý tuần tự: từ 1 → từ 2 → từ 3</div>
        <div class="issues">
          <div class="issue">❌ Phụ thuộc xa bị suy giảm</div>
          <div class="issue">❌ Không thể train song song</div>
        </div>
      </div>
      <div class="model-col highlight">
        <div class="model-name">Transformer</div>
        <div class="model-desc">Xử lý song song: tính tất cả từ cùng lúc</div>
        <div class="benefits">
          <div class="benefit">✅ Attention toàn cục</div>
          <div class="benefit">✅ Song song hiệu quả</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
@media (max-width: 560px) { .comparison-grid { grid-template-columns: 1fr; } }
.model-col { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.model-col.highlight { border-color: var(--vp-c-brand); background: linear-gradient(135deg, var(--vp-c-bg), var(--vp-c-brand-soft)); }
.model-name { font-size: 0.85rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.4rem; }
.model-desc { font-size: 0.75rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.issues, .benefits { display: flex; flex-direction: column; gap: 0.25rem; }
.issue, .benefit { font-size: 0.7rem; }
.issue { color: #dc2626; }
.benefit { color: #059669; }
</style>
