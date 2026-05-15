<!--
  TrackingTypesDemo.vue
  So sánh các loại tracking - frontend, backend, full-funnel
-->
<template>
  <div class="tracking-types-demo">
    <div class="header">
      <div class="title">
        So sánh các loại tracking
      </div>
      <div class="subtitle">
        Ưu nhược điểm và tình huống áp dụng của 3 cách tracking
      </div>
    </div>

    <div class="type-tabs">
      <button
        v-for="type in trackingTypes"
        :key="type.id"
        class="type-tab"
        :class="{ active: selectedType === type.id }"
        @click="selectType(type.id)"
      >
        {{ type.name }}
      </button>
    </div>

    <div class="type-content">
      <div class="type-info">
        <div class="type-header">
          <div class="type-icon">
            {{ currentType.icon }}
          </div>
          <div class="type-title">
            <div class="name">
              {{ currentType.name }}
            </div>
            <div class="subtitle">
              {{ currentType.subtitle }}
            </div>
          </div>
        </div>

        <div class="type-description">
          {{ currentType.description }}
        </div>

        <div class="characteristics">
          <div class="characteristics-title">
            Đặc điểm chính
          </div>
          <div class="characteristics-list">
            <div
              v-for="(char, index) in currentType.characteristics"
              :key="index"
              class="characteristic-item"
            >
              <span class="check">✓</span>
              <span>{{ char }}</span>
            </div>
          </div>
        </div>

        <div class="use-cases">
          <div class="use-cases-title">
            Tình huống điển hình
          </div>
          <div class="use-cases-list">
            <div
              v-for="(useCase, index) in currentType.useCases"
              :key="index"
              class="use-case-item"
            >
              <div class="use-case-icon">
                {{ useCase.icon }}
              </div>
              <div class="use-case-info">
                <div class="use-case-name">
                  {{ useCase.name }}
                </div>
                <div class="use-case-desc">
                  {{ useCase.desc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="type-architecture">
        <div class="architecture-title">
          Sơ đồ kiến trúc
        </div>
        <div class="architecture-diagram">
          <div class="diagram-layer">
            <div class="layer-label">
              User
            </div>
            <div class="layer-icon">
              👤
            </div>
          </div>
          <div class="diagram-arrow">
            ↓
          </div>
          <div class="diagram-layer client">
            <div class="layer-label">
              Client
            </div>
            <div class="layer-content">
              <div
                v-if="selectedType === 'frontend'"
                class="layer-box frontend"
              >
                <div>Frontend tracking SDK</div>
                <div class="layer-detail">
                  Thu thập tương tác user
                </div>
              </div>
              <div
                v-if="selectedType === 'backend'"
                class="layer-box backend"
              >
                <div>Business code</div>
                <div class="layer-detail">
                  Gọi backend tracking
                </div>
              </div>
              <div
                v-if="selectedType === 'full'"
                class="layer-box full"
              >
                <div>Frontend tracking SDK</div>
                <div>Backend tracking</div>
                <div class="layer-detail">
                  Full-funnel tracing
                </div>
              </div>
            </div>
          </div>
          <div class="diagram-arrow">
            ↓
          </div>
          <div
            v-if="selectedType === 'backend' || selectedType === 'full'"
            class="diagram-layer server"
          >
            <div class="layer-label">
              Server
            </div>
            <div class="layer-content">
              <div class="layer-box server">
                <div>Tracking service</div>
                <div class="layer-detail">
                  Xử lý request tracking
                </div>
              </div>
            </div>
          </div>
          <div class="diagram-arrow">
            ↓
          </div>
          <div class="diagram-layer data">
            <div class="layer-label">
              Data platform
            </div>
            <div class="layer-content">
              <div class="layer-box data">
                <div>Data warehouse
                </div>
                <div class="layer-detail">
                  Lưu trữ và phân tích
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="comparison-title">
        So sánh chi tiết
      </div>
      <table class="comparison">
        <thead>
          <tr>
            <th>Tiêu chí so sánh</th>
            <th
              v-for="type in trackingTypes"
              :key="type.id"
            >
              {{ type.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in comparisonData"
            :key="index"
          >
            <td class="dimension">
              {{ row.dimension }}
            </td>
            <td
              v-for="type in trackingTypes"
              :key="type.id"
              class="value"
              :class="{ best: row.best === type.id }"
            >
              {{ row.values[type.id] }}
              <span
                v-if="row.best === type.id"
                class="best-badge"
              >Tốt nhất</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedType = ref('frontend')

const trackingTypes = [
  {
    id: 'frontend',
    name: 'Frontend tracking',
    subtitle: 'Client-side Tracking',
    icon: '💻',
    description:
      'Tích hợp tracking SDK vào code frontend của Web, App, mini-program để thu thập trực tiếp tương tác của user với giao diện. Data realtime tốt, lấy được thông tin device, nhưng có thể bị tampered.',
    characteristics: [
      'Thu thập hành vi user realtime',
      'Lấy được thông tin device, network',
      'Thu thập dữ liệu visual',
      'Cache offline, gửi lại khi có mạng',
      'Hỗ trợ A/B test và heatmap'
    ],
    useCases: [
      { icon: '📱', name: 'Pageview', desc: 'Ghi nhận user đã xem những trang nào' },
      { icon: '👆', name: 'Button click', desc: 'Thống kê user đã click button nào' },
      { icon: '📝', name: 'Form submit', desc: 'Theo dõi việc điền và submit form' },
      { icon: '🎯', name: 'Conversion funnel', desc: 'Phân tích lộ trình conversion' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend tracking',
    subtitle: 'Server-side Tracking',
    icon: '⚙️',
    description:
      'Thêm code tracking vào business logic phía server để thu thập sự kiện server-side. Dữ liệu chính xác, không thể tampered, nhưng không lấy được thông tin client.',
    characteristics: [
      'Dữ liệu chính xác, không bị tampered',
      'Thu thập event nghiệp vụ cốt lõi',
      'Không bị ảnh hưởng bởi network của client',
      'Thu thập được data đặc thù của server',
      'Privacy compliance tốt hơn'
    ],
    useCases: [
      { icon: '💰', name: 'Payment success', desc: 'Ghi nhận thanh toán đơn hàng thành công' },
      { icon: '📦', name: 'Order creation', desc: 'Theo dõi việc tạo đơn hàng' },
      { icon: '🔐', name: 'User registration', desc: 'Ghi nhận đăng ký tài khoản' },
      { icon: '📊', name: 'API calls', desc: 'Thống kê số lần gọi API' }
    ]
  },
  {
    id: 'full',
    name: 'Full-funnel tracking',
    subtitle: 'Full-funnel Tracking',
    icon: '🔗',
    description:
      'Kết hợp frontend + backend tracking để theo dõi end-to-end từ hành vi user đến hoàn thành nghiệp vụ. Dữ liệu đầy đủ nhất, nhưng chi phí triển khai cao nhất.',
    characteristics: [
      'Theo dõi end-to-end đầy đủ',
      'Cross-validation dữ liệu',
      'Kết nối data frontend-backend',
      'Funnel analysis chính xác hơn',
      'Localize lỗi nhanh hơn'
    ],
    useCases: [
      { icon: '🛒', name: 'Shopping flow', desc: 'Toàn bộ chain từ browse đến mua' },
      { icon: '📈', name: 'User journey', desc: 'Phân tích hành vi full lifecycle của user' },
      { icon: '🔍', name: 'Troubleshooting', desc: 'Định vị lỗi frontend và backend' },
      { icon: '💎', name: 'Data governance', desc: 'Nâng cao chất lượng và độ chính xác data' }
    ]
  }
]

const comparisonData = [
  {
    dimension: 'Độ chính xác data',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★★★',
      full: '★★★★★'
    },
    best: 'backend'
  },
  {
    dimension: 'Tính realtime',
    values: {
      frontend: '★★★★★',
      backend: '★★★★☆',
      full: '★★★★★'
    },
    best: 'frontend'
  },
  {
    dimension: 'Chi phí phát triển',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★☆☆☆☆'
    },
    best: 'frontend'
  },
  {
    dimension: 'Chi phí maintain',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★★☆☆☆'
    },
    best: 'frontend'
  },
  {
    dimension: 'Tính đầy đủ data',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★★★★★'
    },
    best: 'full'
  },
  {
    dimension: 'Privacy compliance',
    values: {
      frontend: '★★☆☆☆',
      backend: '★★★★★',
      full: '★★★★☆'
    },
    best: 'backend'
  }
]

const currentType = computed(() => {
  return trackingTypes.find((t) => t.id === selectedType.value)
})

const selectType = (typeId) => {
  selectedType.value = typeId
}
</script>

<style scoped>
.tracking-types-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.type-tab {
  padding: 0.75rem 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.type-tab:hover {
  border-color: var(--vp-c-brand);
}

.type-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.type-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.type-info {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.type-icon {
  font-size: 3rem;
}

.type-title .name {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.type-title .subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.type-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.characteristics,
.use-cases {
  margin-bottom: 1.5rem;
}

.characteristics-title,
.use-cases-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.characteristics-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.characteristic-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.check {
  color: #22c55e;
  font-weight: 700;
}

.use-cases-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.use-case-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.use-case-icon {
  font-size: 1.5rem;
}

.use-case-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.type-architecture {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.architecture-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.diagram-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  min-width: 200px;
}

.diagram-layer.client,
.diagram-layer.server,
.diagram-layer.data {
  width: 100%;
}

.layer-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.layer-icon {
  font-size: 2rem;
}

.layer-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-box {
  background: white;
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.layer-box.frontend {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
}

.layer-box.backend {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: #f59e0b;
}

.layer-box.full {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #22c55e;
}

.layer-box.server {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  border-color: #ec4899;
}

.layer-box.data {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  border-color: #6366f1;
}

.layer-detail {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.diagram-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
}

.comparison th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.comparison .dimension {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.comparison .value {
  position: relative;
}

.comparison .value.best {
  background: #dcfce7;
  font-weight: 600;
}

.best-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.15rem 0.5rem;
  background: #22c55e;
  color: white;
  font-size: 0.7rem;
  border-radius: 4px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .type-content {
    grid-template-columns: 1fr;
  }

  .type-tabs {
    flex-direction: column;
  }
}
</style>
