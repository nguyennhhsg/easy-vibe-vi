<template>
  <div class="sql-playground-demo">
    <div class="demo-header">
      <span class="icon">💻</span>
      <span class="title">Sân chơi SQL</span>
      <span class="subtitle">Trải nghiệm thao tác CRUD với SQL</span>
    </div>

    <div class="intro-text">
      SQL giống như <span class="highlight">trò chuyện</span> với database: bạn nói "tìm cho tôi tất cả user trên 25 tuổi", database sẽ thực hiện query và trả kết quả. Không cần biết lập trình bạn cũng có thể bắt đầu nhanh.
    </div>

    <div class="playground-container">
      <div class="operation-selector">
        <button
          v-for="op in operations"
          :key="op.key"
          class="op-btn"
          :class="{ active: currentOp === op.key }"
          @click="currentOp = op.key"
        >
          <span class="op-icon">{{ op.icon }}</span>
          <span class="op-name">{{ op.name }}</span>
          <span class="op-keyword">{{ op.keyword }}</span>
        </button>
      </div>

      <div class="content-area">
        <div class="example-section">
          <div class="section-title">
            📝 SQL ví dụ
          </div>
          <div class="code-block">
            <pre><code>{{ currentOperation.example }}</code></pre>
          </div>
        </div>

        <div class="explanation-section">
          <div class="section-title">
            💡 Dịch nghĩa từng phần
          </div>
          <div class="explanation-list">
            <div
              v-for="(item, i) in currentOperation.explanation"
              :key="i"
              class="explanation-item"
            >
              <span class="keyword">{{ item.keyword }}</span>
              <span class="meaning">{{ item.meaning }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">
          📊 Kết quả trả về
        </div>
        <div class="result-table">
          <div class="table-header">
            <div
              v-for="col in currentOperation.result.columns"
              :key="col"
              class="header-cell"
            >
              {{ col }}
            </div>
          </div>
          <div class="table-body">
            <div
              v-for="(row, i) in currentOperation.result.rows"
              :key="i"
              class="table-row"
            >
              <div
                v-for="(cell, j) in row"
                :key="j"
                class="table-cell"
              >
                {{ cell }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentOperation.warning"
      class="warning-box"
    >
      <span class="icon">⚠️</span>
      <span v-html="currentOperation.warning" />
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>Khái niệm cốt lõi:</strong> CRUD bao trùm mọi nhu cầu quản lý dữ liệu cơ bản. Dù là Shopee, Zalo hay TikTok, thao tác database về bản chất cũng chỉ có 4 loại: Create, Read, Update, Delete.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentOp = ref('SELECT')

const operations = {
  SELECT: {
    key: 'SELECT',
    name: 'Truy vấn',
    icon: '🔍',
    keyword: 'SELECT ... FROM',
    example: "SELECT name, age FROM users WHERE age > 25;",
    explanation: [
      { keyword: 'SELECT name, age', meaning: 'Chọn 2 cột name và age' },
      { keyword: 'FROM users', meaning: 'Từ bảng users' },
      { keyword: 'WHERE age > 25', meaning: 'Với điều kiện age lớn hơn 25' }
    ],
    result: {
      columns: ['name', 'age'],
      rows: [
        ['Tran Van B', 30],
        ['Le Thi C', 28]
      ]
    }
  },
  INSERT: {
    key: 'INSERT',
    name: 'Thêm',
    icon: '➕',
    keyword: 'INSERT INTO',
    example: "INSERT INTO users (name, age, city) VALUES ('Pham Van D', 35, 'Da Nang');",
    explanation: [
      { keyword: 'INSERT INTO users', meaning: 'Chèn vào bảng users' },
      { keyword: '(name, age, city)', meaning: 'Các cột này' },
      { keyword: "VALUES ('Pham Van D', 35, 'Da Nang')", meaning: 'Giá trị tương ứng...' }
    ],
    result: {
      columns: ['Kết quả'],
      rows: [['✅ Đã chèn thành công 1 dòng']]
    },
    warning: '<strong>Lưu ý:</strong> Chuỗi phải đặt trong dấu nháy đơn, số thì không cần.'
  },
  UPDATE: {
    key: 'UPDATE',
    name: 'Cập nhật',
    icon: '✏️',
    keyword: 'UPDATE ... SET',
    example: "UPDATE users SET age = age + 1 WHERE city = 'Ha Noi';",
    explanation: [
      { keyword: 'UPDATE users', meaning: 'Cập nhật bảng users' },
      { keyword: 'SET age = age + 1', meaning: 'Đặt age thành age + 1' },
      { keyword: "WHERE city = 'Ha Noi'", meaning: 'Chỉ sửa các dòng có thành phố là Hà Nội' }
    ],
    result: {
      columns: ['Kết quả'],
      rows: [['✅ Đã cập nhật thành công 2 dòng']]
    },
    warning: '<strong>Cảnh báo quan trọng:</strong> Nếu quên viết WHERE sẽ sửa <strong>toàn bộ bảng</strong>! Đây là một trong những thao tác nguy hiểm nhất.'
  },
  DELETE: {
    key: 'DELETE',
    name: 'Xóa',
    icon: '🗑️',
    keyword: 'DELETE FROM',
    example: 'DELETE FROM users WHERE user_id = 4;',
    explanation: [
      { keyword: 'DELETE FROM users', meaning: 'Xóa từ bảng users' },
      { keyword: 'WHERE user_id = 4', meaning: 'Chỉ xóa dòng có user_id bằng 4' }
    ],
    result: {
      columns: ['Kết quả'],
      rows: [['✅ Đã xóa thành công 1 dòng']]
    },
    warning: '<strong>Cảnh báo quan trọng:</strong> Giống như UPDATE, nếu quên WHERE sẽ xóa <strong>toàn bộ bảng</strong>!'
  }
}

const currentOperation = computed(() => operations[currentOp.value])
</script>

<style scoped>
.sql-playground-demo {
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

.operation-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .operation-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}

.op-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0.75rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.op-btn:hover {
  background: var(--vp-c-bg-soft);
}

.op-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.op-icon { font-size: 1.25rem; }
.op-name { font-size: 0.8rem; font-weight: 500; }
.op-keyword { font-size: 0.65rem; color: var(--vp-c-text-3); font-family: monospace; }

.content-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .content-area {
    grid-template-columns: 1fr;
  }
}

.example-section, .explanation-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.75rem;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  line-height: 1.5;
}

.explanation-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.explanation-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.keyword {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  font-weight: 500;
  flex-shrink: 0;
}

.meaning {
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.result-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.result-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: grid;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-cell {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.warning-box {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.warning-box .icon {
  margin-right: 0.25rem;
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
