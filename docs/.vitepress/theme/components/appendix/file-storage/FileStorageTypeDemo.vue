<!--
  StorageTypeDemo.vue (file-storage)
  Demo so sánh các kiểu file storage
-->
<template>
  <div class="storage-type-demo">
    <div class="header">
      <div class="title">So sánh các kiểu storage</div>
      <div class="subtitle">Bấm vào để xem đặc điểm từng kiểu storage</div>
    </div>

    <div class="type-cards">
      <div
        v-for="t in types"
        :key="t.key"
        :class="['type-card', { active: selected === t.key }]"
        @click="selected = t.key"
      >
        <div class="type-icon">{{ t.icon }}</div>
        <div class="type-name">{{ t.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-grid">
        <div class="detail-item">
          <div class="item-label">Cách truy cập</div>
          <div class="item-value">{{ current.access }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">Tình huống điển hình</div>
          <div class="item-value">{{ current.scenario }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">Sản phẩm tiêu biểu</div>
          <div class="item-value">{{ current.products }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">Khả năng mở rộng</div>
          <div class="item-value">{{ current.scalability }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('object')

const types = [
  {
    key: 'block', icon: '🧱', name: 'Block storage',
    desc: 'Chia dữ liệu thành các "block" có kích thước cố định, cung cấp không gian lưu trữ thô giống ổ cứng. Hệ điều hành có thể tạo file system bên trên. Hiệu năng cao nhất nhưng không chia sẻ trực tiếp qua mạng được.',
    access: 'Giao thức iSCSI / FC, mount như thiết bị đĩa',
    scenario: 'Lưu database, đĩa máy ảo',
    products: 'AWS EBS, Google Persistent Disk, Ceph RBD',
    scalability: 'Mỗi volume có dung lượng tối đa, cần mở rộng thủ công'
  },
  {
    key: 'file', icon: '📁', name: 'File storage',
    desc: 'Cung cấp giao diện file system truyền thống (thư mục + file), hỗ trợ nhiều máy chủ cùng mount và đọc/ghi. Giống một thư mục chia sẻ qua mạng.',
    access: 'Giao thức NFS / SMB / CIFS, mount như thư mục',
    scenario: 'Chia sẻ file config, media của CMS, thu thập log',
    products: 'AWS EFS, Azure Files, NFS Server',
    scalability: 'Dung lượng co giãn được, nhưng hiệu năng bị giới hạn bởi overhead của giao thức'
  },
  {
    key: 'object', icon: '☁️', name: 'Object storage',
    desc: 'Lưu/lấy file (object) qua HTTP API, mỗi object có một key duy nhất. Cấu trúc phẳng, không có cây thư mục. Dung lượng gần như vô hạn, chi phí thấp nhất, là lựa chọn ưu tiên cho ứng dụng internet.',
    access: 'HTTP/HTTPS RESTful API (PUT/GET/DELETE)',
    scenario: 'Hình ảnh, video, backup, hosting site tĩnh, data lake',
    products: 'AWS S3, Google Cloud Storage, MinIO, Cloudflare R2',
    scalability: 'Mở rộng gần như vô hạn, tự động phân tán'
  }
]

const current = computed(() => types.find(t => t.key === selected.value))
</script>

<style scoped>
.storage-type-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.type-cards { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
.type-card {
  flex: 1; padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center; transition: all 0.2s;
}
.type-card:hover { border-color: var(--vp-c-brand); }
.type-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.type-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.type-name { font-weight: 700; font-size: 0.95rem; }
.detail {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 1rem; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.detail-item { padding: 0.5rem 0.75rem; background: var(--vp-c-bg-soft); border-radius: 6px; }
.item-label { font-weight: 600; font-size: 0.8rem; color: var(--vp-c-text-3); margin-bottom: 0.25rem; }
.item-value { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.5; }
@media (max-width: 640px) {
  .type-cards { flex-direction: column; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
