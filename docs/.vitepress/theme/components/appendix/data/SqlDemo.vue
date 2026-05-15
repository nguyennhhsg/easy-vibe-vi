<template>
  <div class="sql-root">
    <div class="sql-header">
      <span class="sql-icon">🗄️</span>
      <span class="sql-title">Demo SQL</span>
    </div>

    <div class="sql-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['sql-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="sql-content">
      <!-- Demo CRUD -->
      <div v-if="activeTab === 'crud'" class="sql-section">
        <div class="sql-editor">
          <div class="sql-editor-header">
            <span class="sql-editor-title">SQL editor</span>
          </div>
          <div class="sql-editor-body">
            <div class="sql-code" contenteditable="true" @blur="updateQuery">
              {{ currentQuery }}
            </div>
          </div>
          <div class="sql-editor-footer">
            <button class="sql-btn sql-btn-run" @click="runQuery">
              ▶ Chạy
            </button>
            <select
              v-model="selectedQuery"
              class="sql-select"
              @change="selectQuery"
            >
              <option value="">Chọn ví dụ...</option>
              <option value="select">SELECT (truy vấn)</option>
              <option value="insert">INSERT (chèn)</option>
              <option value="update">UPDATE (cập nhật)</option>
              <option value="delete">DELETE (xóa)</option>
            </select>
          </div>
        </div>

        <div class="sql-result">
          <div class="sql-result-header">
            <span class="sql-result-title">Kết quả query</span>
            <span class="sql-result-count">{{ result.length }} dòng</span>
          </div>
          <div class="sql-result-body">
            <table class="sql-table">
              <thead>
                <tr>
                  <th v-for="col in columns" :key="col">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in result" :key="i">
                  <td v-for="col in columns" :key="col">{{ row[col] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Demo JOIN -->
      <div v-else-if="activeTab === 'join'" class="sql-section">
        <div class="join-diagram">
          <div class="join-title">So sánh các loại JOIN</div>
          <div class="join-grid">
            <div
              v-for="join in joins"
              :key="join.type"
              class="join-card"
              :class="{ 'join-card-active': activeJoin === join.type }"
              @click="activeJoin = join.type"
            >
              <div class="join-name">{{ join.name }}</div>
              <div class="join-desc">{{ join.desc }}</div>
              <div class="join-viz">
                <div class="join-circle join-left"></div>
                <div class="join-circle join-right"></div>
                <div :class="['join-highlight', join.highlight]"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="join-result">
          <div class="join-sql">
            <div class="join-sql-title">SQL ví dụ</div>
            <pre class="join-code">{{ currentJoin.sql }}</pre>
          </div>
          <div class="join-table">
            <div class="join-table-title">Kết quả query</div>
            <table class="sql-table">
              <thead>
                <tr>
                  <th v-for="col in currentJoin.columns" :key="col">
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in currentJoin.data" :key="i">
                  <td v-for="col in currentJoin.columns" :key="col">
                    {{ row[col] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Demo index -->
      <div v-else-if="activeTab === 'index'" class="sql-section">
        <div class="index-demo">
          <div class="index-title">Nguyên lý index</div>
          <div class="index-comparison">
            <div class="index-side">
              <div class="index-side-title">Không có index</div>
              <div class="index-visual index-no-index">
                <div v-for="i in 8" :key="i" class="index-item">
                  {{ indexData[i - 1] }}
                </div>
              </div>
              <div class="index-stats">
                <div class="index-stat">
                  <span class="index-stat-label">Tìm ID=5:</span>
                  <span class="index-stat-value">Cần quét 5 lần</span>
                </div>
              </div>
            </div>

            <div class="index-side">
              <div class="index-side-title">Có index (B+ Tree)</div>
              <div class="index-visual index-tree">
                <div class="index-tree-level">
                  <div class="index-tree-node">1-8</div>
                </div>
                <div class="index-tree-level">
                  <div class="index-tree-node">1-4</div>
                  <div class="index-tree-node">5-8</div>
                </div>
                <div class="index-tree-level">
                  <div v-for="i in 8" :key="i" class="index-tree-node-small">
                    {{ i }}
                  </div>
                </div>
              </div>
              <div class="index-stats">
                <div class="index-stat">
                  <span class="index-stat-label">Tìm ID=5:</span>
                  <span class="index-stat-value index-fast">Chỉ cần 3 lần so sánh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="index-tips">
          <div class="index-tip-title">Khuyến nghị khi dùng index</div>
          <ul class="index-tips-list">
            <li>✓ Tạo index cho cột dùng trong WHERE, JOIN, ORDER BY</li>
            <li>✓ Cột có độ chọn lọc cao thì phù hợp đánh index (như số điện thoại, username)</li>
            <li>✗ Tránh đánh index trên cột chọn lọc thấp (như giới tính, trạng thái)</li>
            <li>✗ Index làm giảm hiệu năng ghi, không nên đánh quá nhiều</li>
          </ul>
        </div>
      </div>

      <!-- Demo transaction -->
      <div v-else-if="activeTab === 'transaction'" class="sql-section">
        <div class="transaction-demo">
          <div class="transaction-title">Đặc tính ACID</div>
          <div class="acid-grid">
            <div
              v-for="acid in acids"
              :key="acid.id"
              class="acid-card"
              :class="{ 'acid-card-active': activeAcid === acid.id }"
              @click="activeAcid = acid.id"
            >
              <div class="acid-letter">{{ acid.letter }}</div>
              <div class="acid-name">{{ acid.name }}</div>
              <div class="acid-desc">{{ acid.desc }}</div>
              <div class="acid-example">{{ acid.example }}</div>
            </div>
          </div>
        </div>

        <div class="transaction-flow">
          <div class="transaction-flow-title">Ví dụ chuyển khoản</div>
          <div class="transaction-steps">
            <div class="transaction-step">
              <div class="transaction-step-number">1</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">Bắt đầu transaction</div>
                <code>BEGIN;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">2</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">Trừ tiền</div>
                <code>UPDATE accounts SET balance = balance - 100 WHERE user_id =
                  1;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">3</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">Cộng tiền</div>
                <code>UPDATE accounts SET balance = balance + 100 WHERE user_id =
                  2;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">4</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">Commit transaction</div>
                <code>COMMIT;</code>
              </div>
            </div>
          </div>
          <div class="transaction-note">
            Nếu bước 2 hoặc 3 thất bại, toàn bộ transaction sẽ rollback (ROLLBACK) để đảm bảo tính nguyên tử
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('crud')
const activeJoin = ref('inner')
const activeAcid = ref('atomicity')
const selectedQuery = ref('')
const currentQuery = ref('SELECT * FROM users;')

const tabs = [
  { id: 'crud', name: 'Thao tác CRUD', icon: '📝' },
  { id: 'join', name: 'Truy vấn JOIN', icon: '🔗' },
  { id: 'index', name: 'Index', icon: '📇' },
  { id: 'transaction', name: 'Transaction', icon: '🔄' }
]

const queries = {
  select: 'SELECT id, name, email FROM users WHERE age > 18;',
  insert:
    "INSERT INTO users (name, email, age) VALUES ('Le Van C', 'levanc@example.com', 25);",
  update: 'UPDATE users SET age = 26 WHERE id = 1;',
  delete: 'DELETE FROM users WHERE id = 3;'
}

const indexData = ref([1, 2, 3, 4, 5, 6, 7, 8])

const columns = ref(['id', 'name', 'email', 'age'])
const result = ref([
  { id: 1, name: 'Nguyen Van A', email: 'nguyenvana@example.com', age: 28 },
  { id: 2, name: 'Tran Van B', email: 'tranvanb@example.com', age: 32 },
  { id: 3, name: 'Le Van C', email: 'levanc@example.com', age: 25 }
])

const joins = {
  inner: {
    type: 'inner',
    name: 'INNER JOIN',
    desc: 'Chỉ trả về các dòng khớp ở cả hai bảng',
    highlight: 'join-highlight-intersect',
    sql: `SELECT users.name, orders.order_id
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: 'Nguyen Van A', order_id: 'ORD001' },
      { name: 'Tran Van B', order_id: 'ORD002' }
    ]
  },
  left: {
    type: 'left',
    name: 'LEFT JOIN',
    desc: 'Trả về mọi dòng của bảng trái, bảng phải không khớp thì NULL',
    highlight: 'join-highlight-left',
    sql: `SELECT users.name, orders.order_id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: 'Nguyen Van A', order_id: 'ORD001' },
      { name: 'Tran Van B', order_id: 'ORD002' },
      { name: 'Le Van C', order_id: 'NULL' }
    ]
  },
  right: {
    type: 'right',
    name: 'RIGHT JOIN',
    desc: 'Trả về mọi dòng của bảng phải, bảng trái không khớp thì NULL',
    highlight: 'join-highlight-right',
    sql: `SELECT users.name, orders.order_id
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: 'Nguyen Van A', order_id: 'ORD001' },
      { name: 'Tran Van B', order_id: 'ORD002' },
      { name: 'NULL', order_id: 'ORD003' }
    ]
  },
  full: {
    type: 'full',
    name: 'FULL OUTER JOIN',
    desc: 'Trả về mọi dòng của cả hai bảng, không khớp thì NULL',
    highlight: 'join-highlight-full',
    sql: `SELECT users.name, orders.order_id
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: 'Nguyen Van A', order_id: 'ORD001' },
      { name: 'Tran Van B', order_id: 'ORD002' },
      { name: 'Le Van C', order_id: 'NULL' },
      { name: 'NULL', order_id: 'ORD003' }
    ]
  }
}

const acids = {
  atomicity: {
    id: 'atomicity',
    letter: 'A',
    name: 'Nguyên tử',
    desc: 'Các thao tác trong transaction hoặc cùng thành công hoặc cùng thất bại',
    example: 'Chuyển khoản: cùng thành công hoặc cùng rollback'
  },
  consistency: {
    id: 'consistency',
    letter: 'C',
    name: 'Nhất quán',
    desc: 'Trước và sau transaction, trạng thái database nhất quán, thỏa ràng buộc',
    example: 'Trước và sau chuyển khoản, tổng số dư không đổi'
  },
  isolation: {
    id: 'isolation',
    letter: 'I',
    name: 'Cô lập',
    desc: 'Các transaction đồng thời không ảnh hưởng lẫn nhau',
    example: 'Hai người dùng cùng chuyển khoản, không can thiệp lẫn nhau'
  },
  durability: {
    id: 'durability',
    letter: 'D',
    name: 'Bền vững',
    desc: 'Transaction đã commit thì lưu vĩnh viễn, dù hệ thống sự cố',
    example: 'Chuyển khoản thành công thì mất điện cũng không mất dữ liệu'
  }
}

const currentJoin = computed(() => joins[activeJoin.value])

function updateQuery(e) {
  currentQuery.value = e.target.textContent
}

function selectQuery() {
  if (selectedQuery.value && queries[selectedQuery.value]) {
    currentQuery.value = queries[selectedQuery.value]
  }
}

function runQuery() {
  // Mô phỏng thực thi query
  console.log('Running query:', currentQuery.value)
}
</script>

<style scoped>
.sql-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.sql-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.sql-icon {
  font-size: 20px;
}

.sql-title {
  font-weight: 600;
  font-size: 15px;
}

.sql-tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.sql-tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.sql-tab:hover {
  border-color: var(--vp-c-brand);
}

.sql-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sql-content {
  padding: 20px;
}

/* Demo CRUD */
.sql-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sql-editor,
.sql-result {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.sql-editor-header,
.sql-result-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sql-editor-title,
.sql-result-title {
  font-weight: 600;
  font-size: 13px;
}

.sql-result-count {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
}

.sql-editor-body,
.sql-result-body {
  padding: 12px;
}

.sql-code {
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
  min-height: 80px;
  white-space: pre-wrap;
  word-break: break-all;
}

.sql-editor-footer {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 10px;
}

.sql-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.sql-btn:hover {
  border-color: var(--vp-c-brand);
}

.sql-btn-run {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sql-select {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
}

.sql-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.sql-table th,
.sql-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sql-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sql-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

/* Demo JOIN */
.join-diagram {
  margin-bottom: 20px;
}

.join-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.join-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.join-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.join-card:hover,
.join-card-active {
  border-color: var(--vp-c-brand);
}

.join-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}

.join-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.join-viz {
  position: relative;
  height: 80px;
}

.join-circle {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  top: 10px;
}

.join-left {
  left: 10px;
}

.join-right {
  right: 10px;
}

.join-highlight {
  position: absolute;
  top: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
}

.join-highlight-intersect {
  left: 25px;
  width: 50px;
  height: 50px;
}

.join-highlight-left {
  left: 10px;
  width: 60px;
}

.join-highlight-right {
  right: 10px;
  width: 60px;
}

.join-highlight-full {
  left: 10px;
  width: calc(100% - 20px);
  border-radius: 8px;
}

.join-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.join-sql,
.join-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
}

.join-sql-title,
.join-table-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.join-code {
  margin: 0;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

/* Demo index */
.index-demo {
  margin-bottom: 16px;
}

.index-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.index-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.index-side {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.index-side-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
}

.index-visual {
  min-height: 120px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 12px;
}

.index-no-index {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.index-item {
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
}

.index-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.index-tree-level {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.index-tree-node {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.index-tree-node-small {
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Menlo', 'Monaco', monospace;
}

.index-stats {
  text-align: center;
}

.index-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.index-stat-label {
  color: var(--vp-c-text-3);
}

.index-stat-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.index-fast {
  color: #22c55e;
}

.index-tips {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.index-tip-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.index-tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.index-tips-list li {
  padding: 6px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* Demo transaction */
.transaction-demo {
  margin-bottom: 16px;
}

.transaction-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.acid-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.acid-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.acid-card:hover,
.acid-card-active {
  border-color: var(--vp-c-brand);
}

.acid-letter {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.acid-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.acid-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.acid-example {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.transaction-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.transaction-flow-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.transaction-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.transaction-step {
  display: flex;
  gap: 12px;
}

.transaction-step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.transaction-step-content {
  flex: 1;
}

.transaction-step-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.transaction-step-content code {
  display: block;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 8px;
  border-radius: 4px;
  margin-top: 4px;
  word-break: break-all;
}

.transaction-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

@media (max-width: 768px) {
  .join-result,
  .index-comparison {
    grid-template-columns: 1fr;
  }

  .acid-grid {
    grid-template-columns: 1fr;
  }

  .sql-editor-footer {
    flex-direction: column;
  }
}
</style>
