<!--
  DataCollectionDemo.vue
  So sánh phương án thu thập dữ liệu - Client / Server / log CDN
-->
<template>
  <div class="data-collection-demo">
    <div class="header">
      <div class="title">
        Phương án thu thập dữ liệu
      </div>
      <div class="subtitle">
        So sánh 3 cách thu thập: client, server và log CDN
      </div>
    </div>

    <div class="collection-methods">
      <div
        v-for="method in methods"
        :key="method.id"
        class="method-card"
        :class="{ active: selectedMethod === method.id }"
        @click="selectedMethod = method.id"
      >
        <div class="method-icon">
          {{ method.icon }}
        </div>
        <div class="method-name">
          {{ method.name }}
        </div>
        <div class="method-desc">
          {{ method.desc }}
        </div>

        <div
          v-if="selectedMethod === method.id"
          class="method-details"
        >
          <div class="detail-section">
            <div class="section-title">
              ✅ Ưu điểm
            </div>
            <ul class="detail-list">
              <li
                v-for="(pro, i) in method.pros"
                :key="i"
              >
                {{ pro }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <div class="section-title">
              ❌ Nhược điểm
            </div>
            <ul class="detail-list">
              <li
                v-for="(con, i) in method.cons"
                :key="i"
              >
                {{ con }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <div class="section-title">
              🎯 Tình huống áp dụng
            </div>
            <ul class="detail-list">
              <li
                v-for="(use, i) in method.useCases"
                :key="i"
              >
                {{ use }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        So sánh các phương án
      </div>
      <table class="comparison">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Độ chính xác dữ liệu</td>
            <td
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.accuracy }}
            </td>
          </tr>
          <tr>
            <td>Tính realtime</td>
            <td
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.realtime }}
            </td>
          </tr>
          <tr>
            <td>Chi phí phát triển</td>
            <td
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.cost }}
            </td>
          </tr>
          <tr>
            <td>Chi phí bảo trì</td>
            <td
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.maintenance }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('client')

const methods = [
  {
    id: 'client',
    name: 'Tracking client',
    icon: '📱',
    desc: 'Tích hợp SDK tracking vào code frontend Web, App',
    pros: ['Realtime tốt', 'Thu được thông tin thiết bị', 'Cache offline'],
    cons: ['Dữ liệu có thể bị giả mạo', 'Tốn pin/data', 'App crash có thể mất dữ liệu'],
    useCases: ['Page view', 'Click nút', 'Submit form'],
    accuracy: '★★★☆☆',
    realtime: '★★★★★',
    cost: '★★★☆☆',
    maintenance: '★★★☆☆'
  },
  {
    id: 'server',
    name: 'Tracking server',
    icon: '⚙️',
    desc: 'Thêm code tracking vào business logic phía server',
    pros: ['Dữ liệu chính xác', 'Không thể giả mạo', 'Thu được dữ liệu riêng của server'],
    cons: ['Không lấy được thông tin client', 'Phải xen vào code business'],
    useCases: ['Thanh toán thành công', 'Tạo đơn hàng', 'Gọi API'],
    accuracy: '★★★★★',
    realtime: '★★★★☆',
    cost: '★★★☆☆',
    maintenance: '★★★☆☆'
  },
  {
    id: 'cdn',
    name: 'Thu từ log CDN',
    icon: '🌐',
    desc: 'Phân tích hành vi user qua access log của CDN',
    pros: ['Zero xâm nhập code', 'Bao phủ mọi user', 'Chi phí thấp'],
    cons: ['Số chiều dữ liệu giới hạn', 'Không lấy được dữ liệu business'],
    useCases: ['Thống kê PV/UV', 'Hiệu năng load tài nguyên', 'Giám sát lỗi'],
    accuracy: '★★★☆☆',
    realtime: '★★★☆☆',
    cost: '★★★★★',
    maintenance: '★★★★★'
  }
]
</script>

<style scoped>
.data-collection-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.collection-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.method-card:hover,
.method-card.active {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.method-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.method-name {
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.method-desc {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.method-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-section {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: var(--vp-c-text-1);
}

.detail-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: 700;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
}

.comparison th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison td:first-child {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .collection-methods {
    grid-template-columns: 1fr;
  }
}
</style>
