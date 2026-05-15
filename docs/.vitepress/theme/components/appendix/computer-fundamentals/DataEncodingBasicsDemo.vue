<template>
  <div class="data-encoding-basics-demo">
    <div class="demo-header">
      <span class="title">Cơ bản về mã hóa dữ liệu</span>
      <span class="subtitle">Thông tin được biểu diễn và lưu trữ như thế nào</span>
    </div>

    <div class="encoding-intro">
      Máy tính chỉ hiểu <strong>0 và 1</strong>, mọi dữ liệu đều phải chuyển sang nhị phân
    </div>

    <div class="bit-byte">
      <div class="bb-cards">
        <div class="bb-card">
          <div class="bb-title">Bit</div>
          <div class="bb-value">0 hoặc 1</div>
          <div class="bb-desc">Đơn vị dữ liệu nhỏ nhất</div>
        </div>
        <div class="bb-card">
          <div class="bb-title">Byte</div>
          <div class="bb-value">8 bit</div>
          <div class="bb-desc">Đơn vị lưu trữ thông dụng</div>
        </div>
      </div>
    </div>

    <div class="encoding-examples">
      <div class="example-title">Cách mã hóa các loại dữ liệu khác nhau</div>
      <div class="example-grid">
        <div class="example-card">
          <div class="card-icon">🔢</div>
          <div class="card-title">Số</div>
          <div class="card-encoding">
            <div class="encoding-label">Thập phân</div>
            <div class="encoding-value">25</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">Nhị phân</div>
            <div class="encoding-value">00011001</div>
          </div>
        </div>

        <div class="example-card">
          <div class="card-icon">🔤</div>
          <div class="card-title">Ký tự</div>
          <div class="card-encoding">
            <div class="encoding-label">Ký tự</div>
            <div class="encoding-value">A</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">ASCII</div>
            <div class="encoding-value">01000001</div>
          </div>
        </div>

        <div class="example-card">
          <div class="card-icon">🎨</div>
          <div class="card-title">Màu sắc</div>
          <div class="card-encoding">
            <div class="encoding-label">RGB</div>
            <div class="encoding-value">255,0,0</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">Hexa</div>
            <div class="encoding-value">#FF0000</div>
          </div>
        </div>
      </div>
    </div>

    <div class="encoding-standards">
      <div class="standards-title">Các chuẩn mã hóa phổ biến</div>
      <table class="standards-table">
        <thead>
          <tr>
            <th>Mã hóa</th>
            <th>Mô tả</th>
            <th>Dùng cho</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ASCII</td>
            <td>7 bit, 128 ký tự</td>
            <td>Ký tự tiếng Anh</td>
          </tr>
          <tr>
            <td>Unicode</td>
            <td>Mã hóa thống nhất, ký tự toàn cầu</td>
            <td>Văn bản đa ngôn ngữ</td>
          </tr>
          <tr>
            <td>UTF-8</td>
            <td>Mã hóa độ dài thay đổi, 1-4 byte</td>
            <td>Văn bản web</td>
          </tr>
          <tr>
            <td>Base64</td>
            <td>Chuyển nhị phân thành văn bản</td>
            <td>Email, ảnh</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.data-encoding-basics-demo {
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

.encoding-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.bit-byte {
  margin-bottom: 2rem;
}

.bb-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.bb-card {
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}

.bb-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.bb-value {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.bb-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.encoding-examples {
  margin-bottom: 2rem;
}

.example-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.example-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.card-encoding {
  margin-bottom: 0.75rem;
}

.encoding-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.encoding-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.encoding-standards {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.standards-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.standards-table {
  width: 100%;
  border-collapse: collapse;
}

.standards-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
}

.standards-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
</style>
