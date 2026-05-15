<template>
  <div class="storage-hierarchy-demo">
    <div class="demo-header">
      <span class="title">Phân cấp bộ nhớ</span>
      <span class="subtitle">Nhanh đến chậm, nhỏ đến lớn</span>
    </div>

    <div class="hierarchy-pyramid">
      <div class="pyramid-level register">
        <div class="level-name">Thanh ghi</div>
        <div class="level-speed">Nhanh nhất</div>
        <div class="level-size">Nhỏ nhất (KB)</div>
      </div>
      <div class="pyramid-level cache">
        <div class="level-name">Cache</div>
        <div class="level-speed">Rất nhanh</div>
        <div class="level-size">Nhỏ (MB)</div>
      </div>
      <div class="pyramid-level ram">
        <div class="level-name">RAM</div>
        <div class="level-speed">Nhanh</div>
        <div class="level-size">Vừa (GB)</div>
      </div>
      <div class="pyramid-level disk">
        <div class="level-name">Ổ cứng</div>
        <div class="level-speed">Chậm</div>
        <div class="level-size">Lớn (TB)</div>
      </div>
      <div class="pyramid-level network">
        <div class="level-name">Mạng / Cloud</div>
        <div class="level-speed">Chậm nhất</div>
        <div class="level-size">Vô hạn</div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">So sánh chi tiết</div>
      <table class="hierarchy-table">
        <thead>
          <tr>
            <th>Tầng lưu trữ</th>
            <th>Thời gian truy cập</th>
            <th>Dung lượng điển hình</th>
            <th>Chi phí</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Thanh ghi</td>
            <td>&lt; 1 ns</td>
            <td>Vài KB</td>
            <td>Cao nhất</td>
          </tr>
          <tr>
            <td>Cache L1</td>
            <td>~1 ns</td>
            <td>64 KB</td>
            <td>Rất cao</td>
          </tr>
          <tr>
            <td>Cache L2</td>
            <td>~3 ns</td>
            <td>256 KB</td>
            <td>Cao</td>
          </tr>
          <tr>
            <td>Cache L3</td>
            <td>~10 ns</td>
            <td>8 MB</td>
            <td>Trung bình</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>~100 ns</td>
            <td>8-32 GB</td>
            <td>Trung bình thấp</td>
          </tr>
          <tr>
            <td>SSD</td>
            <td>~100 μs</td>
            <td>256 GB-2 TB</td>
            <td>Thấp</td>
          </tr>
          <tr>
            <td>HDD</td>
            <td>~10 ms</td>
            <td>1-10 TB</td>
            <td>Thấp nhất</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="principle">
      <div class="principle-title">Nguyên lý cục bộ (locality)</div>
      <div class="principle-content">
        <div class="principle-text">
          Chương trình thường truy cập <strong>vị trí vừa truy cập gần đây</strong> (cục bộ thời gian)
          và <strong>vị trí lân cận</strong> (cục bộ không gian)
        </div>
        <div class="principle-example">
          Tận dụng nguyên lý cục bộ, cache có thể tăng hiệu năng đáng kể
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.storage-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.hierarchy-pyramid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.pyramid-level {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: white;
}

.pyramid-level.register {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.pyramid-level.cache {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.pyramid-level.ram {
  background: linear-gradient(135deg, #10b981, #059669);
}

.pyramid-level.disk {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.pyramid-level.network {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.level-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.level-speed {
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.level-size {
  font-size: 0.8rem;
}

.comparison-table {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.hierarchy-table {
  width: 100%;
  border-collapse: collapse;
}

.hierarchy-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.hierarchy-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

.principle {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.principle-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.principle-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.principle-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.principle-example {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
