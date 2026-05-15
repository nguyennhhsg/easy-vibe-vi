<template>
  <div class="rendering-demo">
    <div class="demo-title">Pipeline render của trình duyệt</div>
    <div class="pipeline">
      <div v-for="(stage, i) in stages" :key="stage.name" class="pipe-item">
        <div class="pipe-card">
          <div class="pipe-num">{{ i + 1 }}</div>
          <div class="pipe-info">
            <div class="pipe-name">{{ stage.name }}</div>
            <div class="pipe-desc">{{ stage.desc }}</div>
          </div>
        </div>
        <div v-if="i < stages.length - 1" class="pipe-arrow">↓</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stages = [
  { name: 'Phân tích HTML', desc: 'Phân tích văn bản HTML thành cây DOM (Document Object Model)' },
  { name: 'Phân tích CSS', desc: 'Phân tích quy tắc CSS thành stylesheet, tính style cuối của từng phần tử' },
  { name: 'Dựng cây render', desc: 'Cây DOM + quy tắc style = cây render (chỉ chứa phần tử hiển thị)' },
  { name: 'Tính layout', desc: 'Tính vị trí và kích thước chính xác của từng phần tử trên trang' },
  { name: 'Vẽ (paint)', desc: 'Vẽ chữ, màu, ảnh, viền của các phần tử vào buffer pixel' },
  { name: 'Tổng hợp hiển thị', desc: 'Ghép các layer thành ảnh cuối cùng, GPU xuất ra màn hình' }
]
</script>

<style scoped>
.rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.pipeline {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pipe-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.pipe-card {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.45rem 0.7rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  width: 100%;
}
.pipe-num {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.pipe-info { flex: 1; }
.pipe-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.pipe-desc {
  font-size: 0.63rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  line-height: 1.4;
}
.pipe-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  padding: 0.15rem 0;
}
</style>
