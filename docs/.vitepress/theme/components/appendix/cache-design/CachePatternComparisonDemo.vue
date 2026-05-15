<template>
  <div class="cache-pattern-comparison-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">Các mô hình đọc/ghi cache</span>
      <span class="subtitle">Cache-Aside vs Read-Through vs Write-Behind</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang <span class="highlight">nấu ăn</span>: Cache-Aside giống như bạn tự quyết định khi nào lấy đồ trong tủ lạnh;
      Read-Through giống như có một trợ lý, bạn cần gì là họ lấy giúp; Write-Behind giống như ghi vào danh sách mua sắm trước, sau đó mới đi mua.
    </div>

    <div class="pattern-tabs">
      <button
        v-for="pattern in patterns"
        :key="pattern.id"
        class="tab-btn"
        :class="{ active: activePattern === pattern.id }"
        @click="activePattern = pattern.id"
      >
        <span class="tab-icon">{{ pattern.icon }}</span>
        <span class="tab-name">{{ pattern.name }}</span>
      </button>
    </div>

    <div class="pattern-content">
      <div
        v-if="activePattern === 'cache-aside'"
        class="pattern-detail"
      >
        <div class="pattern-header">
          <h3>Cache-Aside (cache đi bên cạnh)</h3>
          <p class="pattern-desc">
            Mô hình phổ biến nhất, code ứng dụng tự kiểm soát cache
          </p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step read">
            <div class="step-icon">
              📖
            </div>
            <div class="step-content">
              <strong>Đọc:</strong> Tra cache trước → nếu không có thì truy vấn database → ghi vào cache
            </div>
          </div>
          <div class="flow-step write">
            <div class="step-icon">
              ✏️
            </div>
            <div class="step-content">
              <strong>Cập nhật:</strong> Cập nhật database trước → <span class="highlight">xóa</span> cache (không phải cập nhật!)
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">
              ✅ Ưu điểm
            </div>
            <div class="list-item">
              Linh hoạt, kiểm soát chi tiết
            </div>
            <div class="list-item">
              Phù hợp với hầu hết trường hợp
            </div>
          </div>
          <div class="cons">
            <div class="list-title">
              ❌ Nhược điểm
            </div>
            <div class="list-item">
              Code khá phức tạp
            </div>
            <div class="list-item">
              Phải tự duy trì tính nhất quán
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activePattern === 'read-through'"
        class="pattern-detail"
      >
        <div class="pattern-header">
          <h3>Read-Through (đọc xuyên qua)</h3>
          <p class="pattern-desc">
            Thư viện cache chịu trách nhiệm load dữ liệu từ database
          </p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step">
            <div class="step-icon">
              📖
            </div>
            <div class="step-content">
              <strong>Đọc:</strong> Ứng dụng chỉ gọi cache.get(), thư viện cache sẽ truy vấn database
            </div>
          </div>
          <div class="flow-step">
            <div class="step-icon">
              ✏️
            </div>
            <div class="step-content">
              <strong>Ghi:</strong> Thường kết hợp với Write-Through, ghi đồng bộ vào cache và database
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">
              ✅ Ưu điểm
            </div>
            <div class="list-item">
              Code gọn gàng
            </div>
            <div class="list-item">
              Tính nhất quán tốt hơn
            </div>
          </div>
          <div class="cons">
            <div class="list-title">
              ❌ Nhược điểm
            </div>
            <div class="list-item">
              Cần thư viện cache chuyên dụng
            </div>
            <div class="list-item">
              Ít linh hoạt hơn
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activePattern === 'write-behind'"
        class="pattern-detail"
      >
        <div class="pattern-header">
          <h3>Write-Behind (ghi trễ bất đồng bộ)</h3>
          <p class="pattern-desc">
            Khi ghi chỉ ghi vào cache, sau đó ghi vào database theo lô và bất đồng bộ
          </p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step">
            <div class="step-icon">
              ⚡
            </div>
            <div class="step-content">
              <strong>Ghi:</strong> Ghi cache ngay lập tức → ghi database theo lô bất đồng bộ
            </div>
          </div>
          <div class="flow-step">
            <div class="step-icon">
              ⚠️
            </div>
            <div class="step-content">
              <strong>Rủi ro:</strong> Cache sập sẽ làm mất dữ liệu
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">
              ✅ Ưu điểm
            </div>
            <div class="list-item">
              Ghi cực nhanh
            </div>
            <div class="list-item">
              Phù hợp với tình huống ghi nhiều
            </div>
          </div>
          <div class="cons">
            <div class="list-title">
              ❌ Nhược điểm
            </div>
            <div class="list-item">
              Có thể mất dữ liệu
            </div>
            <div class="list-item">
              Tính nhất quán kém
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        So sánh ba mô hình
      </div>
      <table>
        <thead>
          <tr>
            <th>Mô hình</th>
            <th>Độ phức tạp</th>
            <th>Hiệu năng</th>
            <th>Tính nhất quán</th>
            <th>Trường hợp dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ active: activePattern === 'cache-aside' }">
            <td>Cache-Aside</td>
            <td>Trung bình</td>
            <td>Cao</td>
            <td>Trung bình</td>
            <td>Hầu hết các tình huống</td>
          </tr>
          <tr :class="{ active: activePattern === 'read-through' }">
            <td>Read-Through</td>
            <td>Thấp</td>
            <td>Trung bình</td>
            <td>Cao</td>
            <td>Đọc nhiều, ghi ít</td>
          </tr>
          <tr :class="{ active: activePattern === 'write-behind' }">
            <td>Write-Behind</td>
            <td>Cao</td>
            <td>Cực cao</td>
            <td>Thấp</td>
            <td>Ghi nhiều, chấp nhận mất</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Gợi ý lựa chọn:</strong> 90% trường hợp dùng Cache-Aside; nếu muốn code gọn gàng dùng Read-Through; nếu là tình huống "chấp nhận mất dữ liệu" như flash sale, like thì mới dùng Write-Behind.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePattern = ref('cache-aside')

const patterns = [
  { id: 'cache-aside', name: 'Cache-Aside', icon: '🔧' },
  { id: 'read-through', name: 'Read-Through', icon: '📖' },
  { id: 'write-behind', name: 'Write-Behind', icon: '⚡' }
]
</script>

<style scoped>
.cache-pattern-comparison-demo {
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

.pattern-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 140px;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-name {
  font-size: 0.9rem;
}

.pattern-content {
  min-height: 300px;
}

.pattern-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pattern-header {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.pattern-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.pattern-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.flow-step {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.5;
}

.step-content .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.pros, .cons {
  padding: 0.75rem;
  border-radius: 6px;
}

.pros {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.cons {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.list-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.list-item {
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.comparison-table {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

tr.active {
  background: #eff6ff;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
