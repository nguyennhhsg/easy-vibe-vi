<template>
  <div class="relation-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">Demo quan hệ foreign key</span>
      <span class="subtitle">Hiểu cách các bảng liên kết với nhau</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn quản lý một <span class="highlight">cây gia phả</span>: có bảng "gia phả" ghi từng người, có bảng "hôn nhân" ghi ai cưới ai. Hai bảng liên kết qua "tên người" - đây chính là vai trò của <span class="highlight">foreign key</span>.
    </div>

    <div class="tables-container">
      <div class="table-card users-table">
        <div class="table-header">
          <span class="table-icon">👥</span>
          <span class="table-name">Bảng users</span>
          <span class="table-badge">Bảng chính</span>
        </div>
        <div class="table-content">
          <div class="table-row header">
            <div class="cell primary-key">
              🔑 user_id
            </div>
            <div class="cell">
              name
            </div>
            <div class="cell">
              phone
            </div>
            <div class="cell">
              address
            </div>
          </div>
          <div
            v-for="user in users"
            :key="user.user_id"
            class="table-row"
            :class="{ highlighted: highlightedUserId === user.user_id }"
            @mouseenter="highlightedUserId = user.user_id"
            @mouseleave="highlightedUserId = null"
          >
            <div class="cell primary-key">
              {{ user.user_id }}
            </div>
            <div class="cell">
              {{ user.name }}
            </div>
            <div class="cell">
              {{ user.phone }}
            </div>
            <div class="cell">
              {{ user.address }}
            </div>
          </div>
        </div>
      </div>

      <div class="relation-arrow">
        <div class="arrow-line" />
        <div class="arrow-head">
          ➤
        </div>
        <div class="relation-label">
          user_id (foreign key) → user_id (primary key)
        </div>
      </div>

      <div class="table-card orders-table">
        <div class="table-header">
          <span class="table-icon">📦</span>
          <span class="table-name">Bảng orders</span>
          <span class="table-badge">Bảng phụ</span>
        </div>
        <div class="table-content">
          <div class="table-row header">
            <div class="cell primary-key">
              🔑 order_id
            </div>
            <div class="cell">
              book_name
            </div>
            <div class="cell foreign-key">
              🔗 user_id
            </div>
            <div class="cell">
              price
            </div>
          </div>
          <div
            v-for="order in filteredOrders"
            :key="order.order_id"
            class="table-row"
            :class="{ highlighted: highlightedUserId === order.user_id }"
          >
            <div class="cell primary-key">
              {{ order.order_id }}
            </div>
            <div class="cell">
              {{ order.book_name }}
            </div>
            <div class="cell foreign-key">
              {{ order.user_id }}
            </div>
            <div class="cell">
              {{ order.price }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation-box">
      <div class="explanation-title">
        💡 Khái niệm cốt lõi
      </div>
      <div class="explanation-content">
        <p><strong>Primary Key</strong>: <code>user_id</code> trong bảng users là primary key, định danh duy nhất mỗi user.</p>
        <p><strong>Foreign Key</strong>: <code>user_id</code> trong bảng orders là foreign key, trỏ tới primary key của bảng users.</p>
        <p><strong>Join</strong>: qua foreign key, database nhanh chóng biết "đơn 001 do user 101 đặt", rồi tra bảng users thấy "user 101 là Nguyen Van A".</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>Ưu điểm cốt lõi:</strong> Foreign key loại bỏ data redundancy. Địa chỉ của Nguyen Van A chỉ lưu một lần, dù anh ấy mua bao nhiêu sách. Khi sửa địa chỉ, chỉ cần sửa một dòng trong bảng users, mọi đơn hàng tự động liên kết tới địa chỉ mới.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const highlightedUserId = ref(null)

const users = ref([
  { user_id: 101, name: 'Nguyen Van A', phone: '090xxxx', address: 'Ha Noi' },
  { user_id: 102, name: 'Tran Van B', phone: '091xxxx', address: 'TP HCM' },
  { user_id: 103, name: 'Le Thi C', phone: '092xxxx', address: 'Da Nang' }
])

const orders = ref([
  { order_id: '001', book_name: 'Trăm năm cô đơn', user_id: 101, price: 59 },
  { order_id: '002', book_name: 'Sống', user_id: 101, price: 39 },
  { order_id: '003', book_name: 'Tam thể', user_id: 101, price: 99 },
  { order_id: '004', book_name: 'Trăm năm cô đơn', user_id: 102, price: 59 },
  { order_id: '005', book_name: 'Hồng lâu mộng', user_id: 102, price: 79 },
  { order_id: '006', book_name: 'Tây du ký', user_id: 103, price: 69 }
])

const filteredOrders = computed(() => {
  if (!highlightedUserId.value) {
    return orders.value
  }
  return orders.value.filter(order => order.user_id === highlightedUserId.value)
})
</script>

<style scoped>
.relation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.tables-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

@media (max-width: 960px) {
  .tables-container {
    grid-template-columns: 1fr;
  }
  .relation-arrow {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
}

.table-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.table-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-icon { font-size: 1rem; }
.table-name { font-weight: 600; font-size: 0.85rem; flex: 1; }
.table-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.table-content {
  max-height: 280px;
  
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table.row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.table-row.header .cell {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem 0.25rem;
}

.table-row .cell {
  font-size: 0.75rem;
  padding: 0.5rem 0.25rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-row.highlighted {
  background: rgba(34, 197, 94, 0.1);
}

.cell.primary-key {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.cell.foreign-key {
  color: #f59e0b;
  font-weight: 500;
}

.relation-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.arrow-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(to right, var(--vp-c-brand), #f59e0b);
  margin-bottom: 4px;
}

.arrow-head {
  color: #f59e0b;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.relation-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
}

.explanation-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.explanation-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.explanation-content p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
  line-height: 1.5;
}

.explanation-content code {
  background: var(--vp-c-bg-soft);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
