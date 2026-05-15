<template>
  <div class="demo-card">
    <div class="arch-layout">
      <!-- Phía Encoder -->
      <div class="side-col">
        <div class="side-header encoder-header">Encoder</div>
        <div class="layer-block">
          <div class="block-label">× N lớp</div>
          <div class="component-box">
            <div class="comp-name">Multi-Head Self-Attention</div>
            <div class="comp-desc">Bắt phụ thuộc trong chuỗi đầu vào</div>
          </div>
          <div class="norm-box">Add & Norm</div>
          <div class="component-box">
            <div class="comp-name">Feed Forward Network</div>
            <div class="comp-desc">Biến đổi phi tuyến theo từng vị trí</div>
          </div>
          <div class="norm-box">Add & Norm</div>
        </div>
        <div class="input-box">
          <div class="input-label">Input</div>
          <div class="input-desc">Token Embedding + Positional Encoding</div>
        </div>
      </div>

      <!-- Phía Decoder -->
      <div class="side-col">
        <div class="side-header decoder-header">Decoder</div>
        <div class="output-box">
          <div class="output-label">Output</div>
          <div class="output-desc">Linear + Softmax → phân phối xác suất</div>
        </div>
        <div class="layer-block">
          <div class="block-label">× N lớp</div>
          <div class="component-box">
            <div class="comp-name">Masked Self-Attention</div>
            <div class="comp-desc">Chỉ thấy các vị trí trước vị trí hiện tại</div>
          </div>
          <div class="norm-box">Add & Norm</div>
          <div class="component-box cross">
            <div class="comp-name">Cross-Attention</div>
            <div class="comp-desc">Chú ý vào output của Encoder</div>
          </div>
          <div class="norm-box">Add & Norm</div>
          <div class="component-box">
            <div class="comp-name">Feed Forward Network</div>
            <div class="comp-desc">Biến đổi phi tuyến theo từng vị trí</div>
          </div>
          <div class="norm-box">Add & Norm</div>
        </div>
        <div class="input-box">
          <div class="input-label">Output (đã dịch chỗ)</div>
          <div class="input-desc">Token Embedding + Positional Encoding</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.arch-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 720px) { .arch-layout { grid-template-columns: 1fr; } }
.side-col { display: flex; flex-direction: column; gap: 0.6rem; }
.side-header { font-size: 0.85rem; font-weight: bold; text-align: center; padding: 0.5rem; border-radius: 6px; color: white; }
.encoder-header { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.decoder-header { background: linear-gradient(135deg, #7c3aed, #6366f1); }
.layer-block { background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider); border-radius: 6px; padding: 0.7rem; position: relative; }
.block-label { position: absolute; top: 0.3rem; right: 0.3rem; font-size: 0.65rem; color: var(--vp-c-text-3); background: var(--vp-c-bg-soft); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; }
.component-box { background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0.5rem; margin-bottom: 0.4rem; }
.component-box.cross { border-color: #d97706; background: linear-gradient(135deg, var(--vp-c-bg-alt), #fef3c7); }
.comp-name { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.comp-desc { font-size: 0.68rem; color: var(--vp-c-text-2); }
.norm-box { font-size: 0.68rem; color: var(--vp-c-text-3); text-align: center; padding: 0.25rem; background: var(--vp-c-bg-soft); border-radius: 3px; margin-bottom: 0.4rem; }
.input-box, .output-box { background: var(--vp-c-brand-soft); border: 1px solid var(--vp-c-brand); border-radius: 4px; padding: 0.5rem; text-align: center; }
.input-label, .output-label { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-brand); margin-bottom: 0.2rem; }
.input-desc, .output-desc { font-size: 0.68rem; color: var(--vp-c-text-2); }
</style>
