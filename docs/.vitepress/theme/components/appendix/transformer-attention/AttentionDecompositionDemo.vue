<template>
  <div class="demo-card">
    <div class="decomp-title">Bóc tách từng lớp cơ chế attention</div>

    <!-- Lớp 1: Multi-Head Attention -->
    <div class="level-section">
      <div class="level-label">Lớp 1: Multi-Head Attention</div>
      <div class="level-content">
        <div class="multi-head-box">
          <div class="head-row">
            <div v-for="i in 8" :key="i" class="head-item">Head {{ i }}</div>
          </div>
          <div class="arrow-down">↓ Bóc tách</div>
        </div>
      </div>
    </div>

    <!-- Lớp 2: Single Head -->
    <div class="level-section">
      <div class="level-label">Lớp 2: một Attention Head</div>
      <div class="level-content">
        <div class="single-head-box">
          <div class="step-flow">
            <div class="step">Input X</div>
            <div class="arrow">→</div>
            <div class="step">Phép biến đổi tuyến tính</div>
            <div class="arrow">→</div>
            <div class="step">Q, K, V</div>
            <div class="arrow">→</div>
            <div class="step">Scaled Dot-Product</div>
            <div class="arrow">→</div>
            <div class="step">Output</div>
          </div>
          <div class="arrow-down">↓ Bóc tách</div>
        </div>
      </div>
    </div>

    <!-- Lớp 3: Scaled Dot-Product Attention -->
    <div class="level-section">
      <div class="level-label">Lớp 3: Scaled Dot-Product Attention (cốt lõi)</div>
      <div class="level-content">
        <div class="dot-product-box">
          <div class="formula-steps">
            <div class="formula-step">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-name">Tính độ tương tự</div>
                <div class="step-formula">Score = Q · K<sup>T</sup></div>
              </div>
            </div>
            <div class="formula-step">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-name">Scale</div>
                <div class="step-formula">Score / √d<sub>k</sub></div>
              </div>
            </div>
            <div class="formula-step">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-name">Chuẩn hoá (Normalize)</div>
                <div class="step-formula">Attention Weights = Softmax(Score)</div>
              </div>
            </div>
            <div class="formula-step">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-name">Tổng có trọng số</div>
                <div class="step-formula">Output = Weights · V</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hướng dẫn ráp -->
    <div class="assembly-note">
      <div class="note-title">🔧 Quá trình ráp lại</div>
      <div class="note-content">
        <span class="note-item">Scaled Dot-Product</span>
        <span class="note-arrow">→</span>
        <span class="note-item">Một Head</span>
        <span class="note-arrow">→</span>
        <span class="note-item">Multi-Head (8 head song song)</span>
        <span class="note-arrow">→</span>
        <span class="note-item">Concat + Linear</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.decomp-title { font-size: 0.9rem; font-weight: bold; color: var(--vp-c-text-1); text-align: center; margin-bottom: 1rem; }
.level-section { margin-bottom: 0.8rem; }
.level-label { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-brand); background: var(--vp-c-brand-soft); padding: 0.3rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; display: inline-block; }
.level-content { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.multi-head-box { text-align: center; }
.head-row { display: flex; gap: 0.3rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.5rem; }
.head-item { font-size: 0.7rem; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); padding: 0.3rem 0.5rem; border-radius: 3px; color: var(--vp-c-text-2); }
.arrow-down { font-size: 0.75rem; color: var(--vp-c-brand); font-weight: bold; margin-top: 0.3rem; }
.single-head-box { text-align: center; }
.step-flow { display: flex; align-items: center; justify-content: center; gap: 0.3rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.step { font-size: 0.7rem; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); padding: 0.3rem 0.5rem; border-radius: 3px; color: var(--vp-c-text-1); font-weight: 600; }
.arrow { font-size: 0.75rem; color: var(--vp-c-text-3); }
.dot-product-box { }
.formula-steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
@media (max-width: 560px) { .formula-steps { grid-template-columns: 1fr; } }
.formula-step { display: flex; gap: 0.4rem; background: var(--vp-c-bg-alt); padding: 0.5rem; border-radius: 4px; }
.step-num { width: 24px; height: 24px; background: var(--vp-c-brand); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; flex-shrink: 0; }
.step-content { flex: 1; }
.step-name { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.step-formula { font-size: 0.7rem; font-family: 'Courier New', monospace; color: var(--vp-c-brand); }
.assembly-note { background: var(--vp-c-bg); border: 2px dashed var(--vp-c-brand); border-radius: 6px; padding: 0.8rem; margin-top: 1rem; }
.note-title { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.5rem; text-align: center; }
.note-content { display: flex; align-items: center; justify-content: center; gap: 0.3rem; flex-wrap: wrap; }
.note-item { font-size: 0.7rem; background: var(--vp-c-brand-soft); color: var(--vp-c-brand); padding: 0.25rem 0.5rem; border-radius: 3px; font-weight: 600; }
.note-arrow { font-size: 0.75rem; color: var(--vp-c-brand); font-weight: bold; }
</style>
