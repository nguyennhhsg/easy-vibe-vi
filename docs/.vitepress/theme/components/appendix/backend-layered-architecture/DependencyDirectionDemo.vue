<template>
  <div class="dep-demo">
    <div class="header">
      <div class="title">Hướng phụ thuộc: quy tắc cốt lõi của Layered Architecture</div>
      <div class="subtitle">Hiểu hướng phụ thuộc mới thực sự nắm được Layered Architecture</div>
    </div>

    <div class="content-box">
      <div class="layers">
        <div class="layer outer">
          <div class="layer-label">Tầng ngoài (UI / hệ thống ngoài)</div>
          <div class="layer-box">Controller</div>
        </div>
        <div class="dep-arrow">↓ Phụ thuộc</div>
        <div class="layer middle">
          <div class="layer-label">Tầng giữa (Application)</div>
          <div class="layer-box">Service</div>
        </div>
        <div class="dep-arrow">↓ Phụ thuộc</div>
        <div class="layer inner">
          <div class="layer-label">Tầng trong (Domain)</div>
          <div class="layer-box">Domain / Repository</div>
        </div>
      </div>

      <div class="principle-box">
        <div class="p-title">Nguyên tắc cốt lõi: Dependency Inversion (DIP)</div>
        <p>Module tầng trên không nên phụ thuộc vào implementation cụ thể của tầng dưới, mà phải phụ thuộc vào abstraction.</p>
        <div class="rules">
          <div v-for="r in rules" :key="r.title" class="rule">
            <strong>{{ r.title }}</strong>
            <div class="rule-desc">{{ r.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const rules = [
  { title: 'Controller → Interface của Service', desc: 'Controller chỉ phụ thuộc interface của Service, không phụ thuộc lớp cài đặt' },
  { title: 'Service → Interface của Repository', desc: 'Service chỉ phụ thuộc interface Repository, không quan tâm dữ liệu được lưu thế nào' },
  { title: 'Mọi tầng phụ thuộc Domain', desc: 'Domain là lõi, được mọi tầng trên phụ thuộc vào, nhưng Domain không phụ thuộc tầng nào' }
]
</script>

<style scoped>
.dep-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.content-box {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.layers { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.layer-label { font-size: 11px; color: var(--vp-c-text-3); margin-bottom: 4px; }
.layer-box {
  padding: 14px; border-radius: 6px; text-align: center;
  font-weight: 500; color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.layer.outer .layer-box { border-left-color: #10b981; }
.layer.middle .layer-box { border-left-color: #f59e0b; }
.layer.inner .layer-box { border-left-color: #3b82f6; }
.dep-arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.principle-box {
  padding: 16px; border-radius: 8px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
}
.p-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px; }
.principle-box p { margin: 0 0 12px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }

.rules { display: flex; flex-direction: column; gap: 8px; }
.rule {
  padding: 10px; border-radius: 6px;
  background: var(--vp-c-bg); font-size: 13px; color: var(--vp-c-text-1);
}
.rule-desc { font-size: 12px; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
