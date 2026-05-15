<template>
  <div class="iam-structure">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">5 khái niệm cốt lõi của IAM</span>
      <span class="subtitle">Khối nền tảng quản lý quyền trên cloud</span>
    </div>

    <div class="main-area">
      <div class="layers-list">
        <div
          v-for="(layer, index) in layers"
          :key="index"
          class="layer"
          :class="{ active: selectedLayer === index }"
          @click="selectLayer(index)"
        >
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-desc">{{ layer.shortDesc }}</span>
        </div>
      </div>

      <div class="layer-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedLayerData.icon }}</span>
          <span class="detail-name">{{ selectedLayerData.name }}</span>
        </div>
        <div class="detail-desc">
          {{ selectedLayerData.description }}
        </div>
        <div class="detail-examples">
          <span class="example-label">Ví dụ:</span>
          <span
            v-for="(example, i) in selectedLayerData.examples.slice(0, 2)"
            :key="i"
            class="example-tag"
          >{{ example }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> IAM giống hệ thống kiểm soát ra vào của công ty — tài khoản root là sếp, user là nhân viên, role là thẻ khách tạm thời, còn policy là quy tắc "ai được vào cửa nào".
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedLayer = ref(0)

const layers = [
  {
    icon: '👑',
    name: 'Tài khoản root',
    shortDesc: 'Quyền cao nhất',
    description: 'Chủ sở hữu tài khoản cloud, nắm toàn quyền với mọi tài nguyên. Khuyến nghị chỉ dùng cho cấu hình ban đầu.',
    examples: ['Tạo/xóa IAM user', 'Quản lý billing và payment']
  },
  {
    icon: '👤',
    name: 'IAM user',
    shortDesc: 'Danh tính cá nhân',
    description: 'Credential dài hạn được tạo cho từng người, dùng để đăng nhập và thao tác cloud hằng ngày.',
    examples: ['Tài khoản dev', 'Tài khoản ops']
  },
  {
    icon: '👥',
    name: 'User group',
    shortDesc: 'Quản lý theo nhóm',
    description: 'Gom nhiều user vào một nhóm, cấp quyền đồng nhất, đơn giản hóa quản lý.',
    examples: ['Nhóm dev', 'Nhóm ops']
  },
  {
    icon: '🎭',
    name: 'Role',
    shortDesc: 'Cấp quyền tạm thời',
    description: 'Một danh tính tạm thời có thể switch sang hoặc gán cho tài khoản/dịch vụ khác, có thời hạn nên an toàn hơn.',
    examples: ['Cross-account role', 'Service role']
  },
  {
    icon: '📋',
    name: 'Policy',
    shortDesc: 'Quy tắc quyền',
    description: 'Tài liệu quy tắc định nghĩa "ai có thể thao tác gì trên tài nguyên nào", viết bằng định dạng JSON.',
    examples: ['Cho phép truy cập S3', 'Cấm xóa EC2']
  }
]

const selectedLayerData = computed(() => layers[selectedLayer.value])

function selectLayer(index) {
  selectedLayer.value = index
}
</script>

<style scoped>
.iam-structure {
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

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.layers-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.layer:hover { border-color: var(--vp-c-brand); }
.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon { font-size: 1rem; }
.layer-name { font-weight: 600; font-size: 0.85rem; }
.layer-desc { font-size: 0.75rem; color: var(--vp-c-text-2); margin-left: auto; }

.layer-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-icon { font-size: 1.25rem; }
.detail-name { font-weight: 600; font-size: 0.95rem; }

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.example-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.example-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
