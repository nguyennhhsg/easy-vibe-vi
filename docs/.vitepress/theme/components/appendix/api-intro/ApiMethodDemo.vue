<!--
  ApiMethodDemo.vue - bản gọn
  Mục tiêu: minh họa ý nghĩa của các HTTP method
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">📋</span>
      <span class="title">HTTP method: nói với server bạn muốn làm gì</span>
    </div>

    <div class="demo-layout">
      <div class="methods-grid">
        <div
          v-for="m in methods"
          :key="m.name"
          class="method-card"
          :class="{ active: selected === m.name }"
          @click="selected = m.name"
        >
          <div class="m-badge" :class="m.color">
            {{ m.name }}
          </div>
          <div class="m-desc">
            {{ m.desc }}
          </div>
          <div class="m-example">
            {{ m.example }}
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="compare-header">So sánh: tính idempotent</div>
        <div class="compare-row">
          <span class="c-label">GET</span>
          <span class="c-val">Query 10 lần = query 1 lần ✓</span>
        </div>
        <div class="compare-row">
          <span class="c-label">DELETE</span>
          <span class="c-val">Xóa 10 lần = xóa 1 lần ✓</span>
        </div>
        <div class="compare-row warn">
          <span class="c-label">POST</span>
          <span class="c-val">Đặt hàng 10 lần = 10 đơn ✗</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong>
      <span>HTTP method chính là động từ: GET là "hỏi", POST là "làm", PUT/PATCH là "sửa", DELETE
        là "xóa".</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('GET')

const methods = [
  { name: 'GET', desc: 'Lấy dữ liệu', example: 'GET /users', color: 'green' },
  { name: 'POST', desc: 'Tạo dữ liệu', example: 'POST /users', color: 'blue' },
  { name: 'PUT', desc: 'Thay thế dữ liệu', example: 'PUT /users/1', color: 'orange' },
  {
    name: 'PATCH',
    desc: 'Sửa một phần',
    example: 'PATCH /users/1',
    color: 'yellow'
  },
  { name: 'DELETE', desc: 'Xóa dữ liệu', example: 'DELETE /users/1', color: 'red' }
]
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
}

.methods-grid {
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 12px;
  overflow-x: auto;
}

.right-panel {
  width: 200px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .methods-grid {
    flex-wrap: wrap;
  }
  .right-panel {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

.method-card {
  flex: 1;
  min-width: 100px;
  padding: 10px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.method-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.m-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 6px;
}

.m-badge.green {
  background: #dcfce7;
  color: #166534;
}
.m-badge.blue {
  background: #dbeafe;
  color: #1e40af;
}
.m-badge.orange {
  background: #ffedd5;
  color: #9a3412;
}
.m-badge.yellow {
  background: #fef9c3;
  color: #854d0e;
}
.m-badge.red {
  background: #fee2e2;
  color: #991b1b;
}

.m-desc {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.m-example {
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.compare-header {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.compare-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 0.75rem;
}

.compare-row.warn {
  background: #fef2f2;
}

.c-label {
  font-weight: bold;
  min-width: 50px;
}

.c-val {
  color: var(--vp-c-text-2);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
