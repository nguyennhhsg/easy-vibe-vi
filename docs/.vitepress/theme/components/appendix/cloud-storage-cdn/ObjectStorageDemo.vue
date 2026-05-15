<template>
  <div class="object-storage-demo">
    <div class="demo-header">
      <span class="icon">🗄️</span>
      <span class="title">Kiến trúc object storage</span>
      <span class="subtitle">Hiểu quan hệ giữa Bucket, Object và Metadata</span>
    </div>

    <div class="storage-architecture">
      <!-- Account layer -->
      <div class="account-layer">
        <div class="account-icon">
          👤
        </div>
        <div class="account-name">
          Cloud account
        </div>
        <div class="account-desc">
          Quản lý quyền, billing, cấu hình toàn cục
        </div>
      </div>

      <div class="connector">
        ▼
      </div>

      <!-- Bucket layer -->
      <div class="buckets-container">
        <div class="section-title">
          <span>📦</span>
          <span>Buckets</span>
          <span class="section-desc">Cô lập namespace, kiểm soát quyền</span>
        </div>

        <div class="buckets-row">
          <div
            v-for="bucket in buckets"
            :key="bucket.name"
            class="bucket-card"
            :class="{ active: selectedBucket === bucket.name }"
            @click="selectBucket(bucket.name)"
          >
            <div class="bucket-icon">
              {{ bucket.icon }}
            </div>
            <div class="bucket-name">
              {{ bucket.name }}
            </div>
            <div class="bucket-meta">
              {{ bucket.objects }} object
            </div>
            <div class="bucket-size">
              {{ bucket.size }}
            </div>
          </div>
        </div>
      </div>

      <div class="connector">
        ▼
      </div>

      <!-- Object layer -->
      <div class="objects-container">
        <div class="section-title">
          <span>📄</span>
          <span>Objects</span>
          <span class="section-desc">Dữ liệu file + metadata</span>
        </div>

        <div
          v-if="selectedBucket"
          class="objects-list"
        >
          <div
            v-for="obj in currentObjects"
            :key="obj.key"
            class="object-item"
            :class="{ selected: selectedObject === obj.key }"
            @click="selectObject(obj)"
          >
            <div class="object-icon">
              {{ getFileIcon(obj.type) }}
            </div>
            <div class="object-info">
              <div class="object-key">
                {{ obj.key }}
              </div>
              <div class="object-meta">
                {{ obj.size }} · {{ obj.lastModified }}
              </div>
            </div>
            <div class="object-arrow">
              ▶
            </div>
          </div>
        </div>

        <div
          v-else
          class="objects-placeholder"
        >
          Bấm vào bucket phía trên để xem danh sách object
        </div>
      </div>

      <div class="connector">
        ▼
      </div>

      <!-- Metadata layer -->
      <div class="metadata-container">
        <div class="section-title">
          <span>🏷️</span>
          <span>Metadata</span>
          <span class="section-desc">Metadata hệ thống + metadata custom</span>
        </div>

        <div
          v-if="selectedObject && currentMetadata"
          class="metadata-content"
        >
          <div class="metadata-section">
            <div class="metadata-section-title">
              Metadata hệ thống (System)
            </div>
            <div class="metadata-list">
              <div
                v-for="(value, key) in currentMetadata.system"
                :key="key"
                class="metadata-item"
              >
                <span class="metadata-key">{{ key }}:</span>
                <span class="metadata-value">{{ value }}</span>
              </div>
            </div>
          </div>

          <div class="metadata-section">
            <div class="metadata-section-title">
              Metadata custom (Custom)
            </div>
            <div class="metadata-list">
              <div
                v-for="(value, key) in currentMetadata.custom"
                :key="key"
                class="metadata-item"
              >
                <span class="metadata-key">{{ key }}:</span>
                <span class="metadata-value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="metadata-placeholder"
        >
          Bấm vào object bên trái để xem metadata chi tiết
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Object storage có kiến trúc 3 lớp: Account → Bucket → Object. Mỗi object đi kèm metadata phong phú phục vụ tra cứu và quản lý. Hiểu cấu trúc phân lớp này là bước đầu tiên khi học object storage.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dữ liệu bucket
const buckets = [
  {
    name: 'myapp-images-prod',
    icon: '🖼️',
    objects: 12543,
    size: '256 GB'
  },
  {
    name: 'myapp-videos-prod',
    icon: '🎬',
    objects: 892,
    size: '1.2 TB'
  },
  {
    name: 'myapp-backups',
    icon: '💾',
    objects: 3456,
    size: '500 GB'
  }
]

// Dữ liệu object
const objectsData = {
  'myapp-images-prod': [
    { key: 'avatars/user123.jpg', type: 'image/jpeg', size: '156 KB', lastModified: '2024-01-15' },
    { key: 'products/shoes-01.png', type: 'image/png', size: '2.3 MB', lastModified: '2024-01-14' },
    { key: 'banners/sale-2024.webp', type: 'image/webp', size: '456 KB', lastModified: '2024-01-13' }
  ],
  'myapp-videos-prod': [
    { key: 'tutorials/intro.mp4', type: 'video/mp4', size: '156 MB', lastModified: '2024-01-15' },
    { key: 'ads/promo-2024.mp4', type: 'video/mp4', size: '234 MB', lastModified: '2024-01-14' }
  ],
  'myapp-backups': [
    { key: 'db/daily-20240115.sql.gz', type: 'application/gzip', size: '456 MB', lastModified: '2024-01-15' },
    { key: 'logs/access-20240114.log.gz', type: 'application/gzip', size: '123 MB', lastModified: '2024-01-14' }
  ]
}

// Metadata
const metadataData = {
  'avatars/user123.jpg': {
    system: {
      'Content-Type': 'image/jpeg',
      'Content-Length': '159745',
      'Last-Modified': '2024-01-15T08:30:00Z',
      'ETag': '"abc123def456"',
      'x-oss-storage-class': 'Standard'
    },
    custom: {
      'x-oss-meta-owner': 'user123',
      'x-oss-meta-usage': 'avatar',
      'x-oss-meta-uploaded-by': 'web-upload'
    }
  },
  'products/shoes-01.png': {
    system: {
      'Content-Type': 'image/png',
      'Content-Length': '2412555',
      'Last-Modified': '2024-01-14T16:20:00Z',
      'ETag': '"xyz789ghi012"',
      'x-oss-storage-class': 'Standard'
    },
    custom: {
      'x-oss-meta-product-id': 'shoes-01',
      'x-oss-meta-category': 'footwear',
      'x-oss-meta-price': '199.99'
    }
  }
}

// Trạng thái
const selectedBucket = ref(null)
const selectedObject = ref(null)

// Computed
const currentObjects = computed(() => {
  if (!selectedBucket.value) return []
  return objectsData[selectedBucket.value] || []
})

const currentMetadata = computed(() => {
  if (!selectedObject.value) return null
  return metadataData[selectedObject.value] || null
})

// Methods
const selectBucket = (name) => {
  selectedBucket.value = name
  selectedObject.value = null
}

const selectObject = (obj) => {
  selectedObject.value = obj.key
}

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type.startsWith('video/')) return '🎬'
  if (type.startsWith('audio/')) return '🎵'
  if (type.includes('pdf')) return '📄'
  if (type.includes('zip') || type.includes('gzip')) return '📦'
  return '📄'
}
</script>

<style scoped>
.object-storage-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.demo-header .icon { font-size: 1rem; }
.demo-header .title { font-weight: bold; font-size: 0.9rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.75rem; margin-left: 0.4rem; }

.storage-architecture {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.4rem;
}

.account-layer {
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  border: 2px solid var(--vp-c-brand);
  grid-column: 1 / -1;
}

.account-icon {
  font-size: 1.2rem;
  margin-bottom: 0.15rem;
}

.account-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.1rem;
}

.account-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  margin-top: 0.1rem;
}

.connector {
  display: none;
}

.buckets-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.section-desc {
  font-size: 0.6rem;
  font-weight: normal;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.buckets-row {
  display: flex;
  gap: 0.4rem;
}

.bucket-card {
  flex: 1;
  min-width: 80px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.35rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.bucket-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.bucket-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 2px var(--vp-c-brand-dimm);
}

.bucket-icon { font-size: 1.1rem; margin-bottom: 0.1rem; }

.bucket-name {
  font-weight: 600;
  font-size: 0.65rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.bucket-meta {
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
  margin-top: 0.1rem;
}

.bucket-size {
  font-size: 0.6rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-top: 0.1rem;
}

.objects-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  min-height: 80px;
}

.objects-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.object-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}

.object-item:hover {
  background: var(--vp-c-bg-alt);
}

.object-item.selected {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.object-icon { font-size: 0.85rem; }

.object-info {
  flex: 1;
  min-width: 0;
}

.object-key {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.object-meta {
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
}

.object-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

.objects-placeholder,
.metadata-placeholder {
  text-align: center;
  padding: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.metadata-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  min-height: 80px;
}

.metadata-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

.metadata-section {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.35rem;
}

.metadata-section-title {
  font-weight: 600;
  font-size: 0.65rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.metadata-list {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 0;
  font-size: 0.6rem;
}

.metadata-key {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.metadata-value {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
  grid-column: 1 / -1;
}

.info-box .icon { flex-shrink: 0; }
</style>
