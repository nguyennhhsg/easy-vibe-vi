<template>
  <div class="framework-motivation">
    <div class="card">
      <div class="card-title">
        Vấn đề
      </div>
      <ul>
        <li>Khi dữ liệu thay đổi, cập nhật DOM thủ công dễ bị sót</li>
        <li>Trang càng phức tạp, càng nhiều nơi cần đồng bộ, càng dễ phát sinh bug</li>
        <li>Khi nhiều người cộng tác, thao tác DOM rải rác khắp nơi, chi phí bảo trì cao</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-title">
        Nguyên nhân gốc
      </div>
      <ul>
        <li>Trình duyệt không biết mối quan hệ giữa "dữ liệu" và "giao diện"</li>
        <li>DOM API native chỉ cung cấp thao tác cấp thấp, không có khả năng "dữ liệu thay đổi thì tự cập nhật UI"</li>
        <li>Lập trình viên buộc phải làm "máy đồng bộ bằng tay"</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-title">
        Cách giải của framework
      </div>
      <ul>
        <li>Thiết lập ánh xạ từ dữ liệu đến UI (UI = f(State))</li>
        <li>Tự động phát hiện thay đổi dữ liệu (hệ thống reactivity)</li>
        <li>Tự động tính toán cập nhật DOM tối thiểu (virtual DOM / tối ưu compile)</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.framework-motivation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.card-title {
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
  .framework-motivation {
    grid-template-columns: 1fr;
  }
}
</style>
