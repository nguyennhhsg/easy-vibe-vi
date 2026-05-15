<template>
  <div class="intro-prs">
    <div class="prs-item">
      <div class="prs-title">
        Vấn đề
      </div>
      <ul>
        <li><strong>Context khó giữ nhất quán</strong>: hội thoại càng dài, ngữ nghĩa trước sau càng dễ lệch.</li>
        <li><strong>Thông tin quan trọng dễ thất lạc</strong>: dữ kiện đưa ra ở đầu khó được trích đúng trong các lượt sau.</li>
        <li><strong>Chi phí gọi tăng liên tục</strong>: mỗi lượt đều phải xử lý lại nhiều lịch sử.</li>
      </ul>
    </div>
    <div class="prs-item">
      <div class="prs-title">
        Nguyên nhân khả dĩ
      </div>
      <ul>
        <li><strong>Tầm nhìn chỉ giới hạn trong lần gọi hiện tại</strong>: mô hình chỉ dựa vào context lượt này.</li>
        <li><strong>Thông tin thiếu tổ chức cấu trúc</strong>: cái quan trọng và cái phụ trộn lẫn, khó tạo bộ nhớ ổn định.</li>
        <li><strong>Lịch sử bị tính lại nhiều lần</strong>: nhiều prefix cố định bị xử lý đi xử lý lại qua các lượt.</li>
      </ul>
    </div>
    <div class="prs-item">
      <div class="prs-title">
        Hệ quả
      </div>
      <ul>
        <li><strong>Chất lượng trả lời không ổn định</strong>: hội thoại càng dài, mô hình càng khó giữ tính nhất quán và truy vết.</li>
        <li><strong>Chi phí khó dự đoán</strong>: kích thước context mỗi lượt biến động lớn, chi phí không kiểm soát được.</li>
        <li><strong>Khó đưa vào sản xuất</strong>: thiếu chiến lược quản lý context rõ ràng, hệ thống khó bảo trì và mở rộng.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.intro-prs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.prs-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.prs-title {
  font-weight: 600;
  margin-bottom: 0.4rem;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

li + li {
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .intro-prs {
    grid-template-columns: 1fr;
  }
}
</style>
