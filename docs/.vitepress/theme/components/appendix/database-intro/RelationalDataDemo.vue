<script setup>
import { ref } from 'vue'

const activeTab = ref('excel') // 'excel' or 'db'

// Excel Data (Flat, Redundant)
const excelData = [
  {
    id: 1,
    date: '2023-10-01',
    book: 'Nhập môn AI',
    price: 59,
    user: 'Nguyen Van A',
    phone: '0901234567'
  },
  {
    id: 2,
    date: '2023-10-02',
    book: 'Lập trình Python',
    price: 89,
    user: 'Tran Van B',
    phone: '0912345678'
  },
  {
    id: 3,
    date: '2023-10-03',
    book: 'Giáo trình thuật toán',
    price: 120,
    user: 'Nguyen Van A',
    phone: '0901234567'
  },
  {
    id: 4,
    date: '2023-10-03',
    book: 'Nguyên lý CSDL',
    price: 45,
    user: 'Le Thi C',
    phone: '0923456789'
  },
  {
    id: 5,
    date: '2023-10-04',
    book: 'Vue.js thực chiến',
    price: 78,
    user: 'Nguyen Van A',
    phone: '0901234567'
  }
]

// DB Data (Normalized)
const usersTable = [
  { id: 101, name: 'Nguyen Van A', phone: '0901234567' },
  { id: 102, name: 'Tran Van B', phone: '0912345678' },
  { id: 103, name: 'Le Thi C', phone: '0923456789' }
]

const ordersTable = [
  { id: 1, date: '2023-10-01', book: 'Nhập môn AI', price: 59, user_id: 101 },
  { id: 2, date: '2023-10-02', book: 'Lập trình Python', price: 89, user_id: 102 },
  { id: 3, date: '2023-10-03', book: 'Giáo trình thuật toán', price: 120, user_id: 101 },
  { id: 4, date: '2023-10-03', book: 'Nguyên lý CSDL', price: 45, user_id: 103 },
  { id: 5, date: '2023-10-04', book: 'Vue.js thực chiến', price: 78, user_id: 101 }
]

const hoveredUserId = ref(null)

const setHover = (id) => {
  hoveredUserId.value = id
}
</script>

<template>
  <div class="relational-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">Demo dữ liệu quan hệ</span>
      <span class="subtitle">Kiểu Excel vs kiểu database</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn quản lý <span class="highlight">đơn hàng của nhà sách</span>. Khi dùng Excel, mỗi đơn lặp lại thông tin khách. Khi dùng RDBMS, thông tin khách lưu một bảng riêng, bảng đơn chỉ lưu ID khách. Giống như <span class="highlight">tách danh bạ và sổ đơn</span> thay vì chép địa chỉ cho từng đơn.
    </div>

    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'excel' }"
        @click="activeTab = 'excel'"
      >
        📋 Kiểu Excel (bảng đơn)
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'db' }"
        @click="activeTab = 'db'"
      >
        🗄️ Kiểu database (đa bảng có liên kết)
      </button>
    </div>

    <div class="content-area">
      <!-- Excel Mode -->
      <div
        v-if="activeTab === 'excel'"
        class="excel-view"
      >
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Số đơn</th>
                <th>Ngày</th>
                <th>Tên sách</th>
                <th>Giá</th>
                <th class="highlight-col">
                  Người mua
                </th>
                <th class="highlight-col">
                  Điện thoại
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in excelData"
                :key="row.id"
              >
                <td>{{ row.id }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.book }}</td>
                <td>{{ row.price }}</td>
                <td class="highlight-cell">
                  {{ row.user }}
                </td>
                <td class="highlight-cell">
                  {{ row.phone }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="note error">
          <p>❌ <strong>Vấn đề:</strong> Thông tin của "Nguyen Van A" được lưu trùng lặp 3 lần.</p>
          <p>Nếu anh ấy đổi số điện thoại, bạn phải sửa 3 dòng dữ liệu, rất dễ sót! Đây gọi là <span class="highlight">data redundancy</span>.</p>
        </div>
      </div>

      <!-- DB Mode -->
      <div
        v-else
        class="db-view"
      >
        <div class="db-layout">
          <!-- Users Table -->
          <div class="db-table users-table">
            <div class="table-title">
              👥 Bảng Users
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID (primary key)</th>
                  <th>Tên</th>
                  <th>Điện thoại</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="u in usersTable"
                  :key="u.id"
                  :class="{ active: hoveredUserId === u.id }"
                  @mouseenter="setHover(u.id)"
                  @mouseleave="setHover(null)"
                >
                  <td class="primary-key">
                    {{ u.id }}
                  </td>
                  <td>{{ u.name }}</td>
                  <td>{{ u.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Connection Lines (Visual only, simplified) -->
          <div class="connector">
            <div class="arrow-label">
              🔗 Liên kết qua foreign key
            </div>
            <div class="arrow">
              ⬅️ Join ➡️
            </div>
          </div>

          <!-- Orders Table -->
          <div class="db-table orders-table">
            <div class="table-title">
              📦 Bảng Orders
            </div>
            <table>
              <thead>
                <tr>
                  <th>Số đơn</th>
                  <th>Tên sách</th>
                  <th>Giá</th>
                  <th class="highlight-col">
                    User ID (foreign key)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="o in ordersTable"
                  :key="o.id"
                  :class="{ active: hoveredUserId === o.user_id }"
                  @mouseenter="setHover(o.user_id)"
                  @mouseleave="setHover(null)"
                >
                  <td>{{ o.id }}</td>
                  <td>{{ o.book }}</td>
                  <td>{{ o.price }}</td>
                  <td class="highlight-cell foreign-key">
                    {{ o.user_id }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="note success">
          <p>✅ <strong>Lợi ích:</strong> Bảng đơn chỉ lưu "User ID", không lặp lại thông tin người dùng.</p>
          <p>
            Đưa chuột lên một dòng trong bảng Users hoặc Orders để xem chúng <span class="highlight">tự liên kết qua foreign key</span> như thế nào. Chỉ cần sửa bảng Users một lần, mọi đơn đều tự cập nhật!
          </p>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> RDBMS dùng <span class="highlight">tách bảng + foreign key</span> để loại bỏ redundancy. Giống như tách danh bạ và sổ ghi chép: sổ chỉ ghi "tên", khi cần thì tra danh bạ. Đổi số điện thoại một lần, mọi bản ghi đều cập nhật.
    </div>
  </div>
</template>

<style scoped>
.relational-demo {
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

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.tab:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-1);
}

.content-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.highlight-col {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.highlight-cell {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-weight: 500;
}

.primary-key {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.foreign-key {
  color: #f59e0b;
  font-weight: 500;
}

.excel-view .highlight-cell {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.db-layout {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.db-table {
  flex: 1;
  min-width: 280px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-title {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
}

.connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 100px;
}

.arrow-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.arrow {
  color: var(--vp-c-brand-1);
}

tr.active {
  background: rgba(34, 197, 94, 0.1);
}

.note {
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.5;
}

.note p {
  margin: 0.25rem 0;
}

.note.error {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--vp-c-text-2);
}

.note.success {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: var(--vp-c-text-2);
}

.note .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
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

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
