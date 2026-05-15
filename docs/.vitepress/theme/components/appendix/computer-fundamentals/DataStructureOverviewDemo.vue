<template>
  <div class="ds-overview-demo">
    <div class="demo-header">
      <span class="title">Toàn cảnh các cấu trúc dữ liệu</span>
      <span class="subtitle">Mỗi tình huống chọn cách tổ chức dữ liệu khác nhau</span>
    </div>

    <div class="structure-map">
      <div class="map-intro">
        Cấu trúc dữ liệu giống như cách dọn phòng: quần áo cho vào tủ, sách lên kệ, đồ linh tinh vào ngăn kéo
      </div>

      <div class="structure-categories">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="['category-card', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-desc">{{ category.desc }}</div>
          <div class="category-examples">
            <span
              v-for="example in category.examples"
              :key="example"
              class="example-tag"
            >
              {{ example }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mô tả chi tiết -->
    <div class="category-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentCategory.icon }}</span>
        <span class="detail-title">{{ currentCategory.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">Đặc điểm</div>
          <div class="feature-grid">
            <div
              v-for="(feature, index) in currentCategory.features"
              :key="index"
              class="feature-item"
            >
              <span class="feature-icon">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Trường hợp áp dụng</div>
          <div class="scenario-list">
            <div
              v-for="(scenario, index) in currentCategory.scenarios"
              :key="index"
              class="scenario-card"
            >
              <div class="scenario-icon">{{ scenario.icon }}</div>
              <div class="scenario-content">
                <div class="scenario-title">{{ scenario.title }}</div>
                <div class="scenario-desc">{{ scenario.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Độ phức tạp thao tác</div>
          <div class="complexity-table">
            <div class="table-header">
              <span class="header-cell">Thao tác</span>
              <span class="header-cell">Thời gian trung bình</span>
            </div>
            <div
              v-for="(op, index) in currentCategory.complexity"
              :key="index"
              class="table-row"
            >
              <span class="data-cell">{{ op.operation }}</span>
              <span class="data-cell highlight">{{ op.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phép so sánh -->
    <div class="analogy-section">
      <div class="analogy-title">Liên hệ thực tế</div>
      <div class="analogy-content">
        <div class="analogy-text">{{ currentCategory.analogy.text }}</div>
        <div class="analogy-example">{{ currentCategory.analogy.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('linear')

const categories = [
  {
    id: 'linear',
    name: 'Cấu trúc tuyến tính',
    icon: '📚',
    desc: 'Dữ liệu xếp theo thứ tự, giống một hàng sách',
    examples: ['Mảng', 'Linked List', 'Stack', 'Queue'],
    features: [
      'Các phần tử dữ liệu có quan hệ 1-1',
      'Có thứ tự trước sau rõ ràng',
      'Có thể lưu trữ liên tục hoặc dạng liên kết'
    ],
    scenarios: [
      {
        icon: '📝',
        title: 'Mảng: dữ liệu dạng danh sách',
        desc: 'Lưu điểm học sinh, giá hàng hóa và các dữ liệu có thứ tự'
      },
      {
        icon: '🔄',
        title: 'Stack: thao tác Undo',
        desc: 'Chức năng Undo của trình soạn thảo, vào sau ra trước'
      },
      {
        icon: '🎫',
        title: 'Queue: lên lịch tác vụ',
        desc: 'Hàng đợi in, hàng đợi task, vào trước ra trước'
      }
    ],
    complexity: [
      { operation: 'Truy cập phần tử', time: 'O(1)' },
      { operation: 'Chèn/xóa', time: 'O(n)' }
    ],
    analogy: {
      text: 'Giống một đoàn tàu, các toa nối nhau theo thứ tự',
      example: 'Muốn đến toa số 5 thì đếm từ đầu; muốn chèn toa mới phải tách rời các nối'
    }
  },
  {
    id: 'hash',
    name: 'Cấu trúc băm',
    icon: '🗂️',
    desc: 'Tìm nhanh qua từ khóa',
    examples: ['Hash Table', 'Dictionary', 'Set'],
    features: ['Lưu dữ liệu dạng key-value', 'Tốc độ tìm cực nhanh', 'Dữ liệu không có thứ tự'],
    scenarios: [
      {
        icon: '📖',
        title: 'Từ điển: tra từ',
        desc: 'Tra nghĩa nhanh theo từ tiếng Anh'
      },
      {
        icon: '👤',
        title: 'Thông tin user: tra theo ID',
        desc: 'Lấy thông tin user nhanh theo ID'
      },
      {
        icon: '🛒',
        title: 'Giỏ hàng: quản lý sản phẩm',
        desc: 'Ghi ID sản phẩm và số lượng, thanh toán nhanh'
      }
    ],
    complexity: [
      { operation: 'Tìm kiếm', time: 'O(1)' },
      { operation: 'Chèn/xóa', time: 'O(1)' }
    ],
    analogy: {
      text: 'Giống thẻ tra cứu trong thư viện',
      example: 'Không cần lùng khắp kệ sách, tra thẻ là biết ngay vị trí'
    }
  },
  {
    id: 'tree',
    name: 'Cấu trúc cây',
    icon: '🌳',
    desc: 'Quan hệ phân cấp, giống cây gia phả',
    examples: ['Cây nhị phân', 'B-Tree', 'Heap'],
    features: ['Quan hệ phân cấp 1-nhiều', 'Có node gốc rõ ràng', 'Phù hợp biểu diễn phân loại và phân cấp'],
    scenarios: [
      {
        icon: '📁',
        title: 'Hệ thống file: cây thư mục',
        desc: 'Tổ chức phân cấp của thư mục và file'
      },
      {
        icon: '🏢',
        title: 'Sơ đồ tổ chức: cây quản lý',
        desc: 'Quan hệ phân cấp quản lý của công ty'
      },
      {
        icon: '💻',
        title: 'HTML: cây DOM',
        desc: 'Cấu trúc lồng nhau của các phần tử web'
      }
    ],
    complexity: [
      { operation: 'Tìm kiếm', time: 'O(log n)' },
      { operation: 'Chèn/xóa', time: 'O(log n)' }
    ],
    analogy: {
      text: 'Giống cây gia phả hoặc sơ đồ tổ chức công ty',
      example: 'Từ gốc (tổ tiên) lần xuống từng tầng, đường đi là duy nhất'
    }
  },
  {
    id: 'graph',
    name: 'Cấu trúc đồ thị',
    icon: '🕸️',
    desc: 'Mạng lưới quan hệ phức tạp',
    examples: ['Đồ thị có hướng', 'Đồ thị vô hướng', 'Đồ thị mạng'],
    features: ['Quan hệ nhiều-nhiều phức tạp', 'Các node có thể nối tùy ý', 'Biểu diễn được mạng lưới phức tạp'],
    scenarios: [
      {
        icon: '🗺️',
        title: 'Bản đồ: tìm đường',
        desc: 'Kết nối các thành phố, hệ thống dẫn đường'
      },
      {
        icon: '👥',
        title: 'Mạng xã hội: quan hệ bạn bè',
        desc: 'Quan hệ theo dõi, kết bạn giữa các user'
      },
      {
        icon: '🔗',
        title: 'Web: liên kết',
        desc: 'Mạng lưới hyperlink giữa các trang'
      }
    ],
    complexity: [
      { operation: 'Duyệt', time: 'O(V + E)' },
      { operation: 'Đường ngắn nhất', time: 'O(E + V log V)' }
    ],
    analogy: {
      text: 'Giống sơ đồ tàu điện ngầm hoặc mạng lưới hàng không',
      example: 'Nhiều ga, nhiều tuyến, giữa các ga có nhiều cách nối khác nhau'
    }
  }
]

const currentCategory = computed(() =>
  categories.find((c) => c.id === activeCategory.value)
)
</script>

<style scoped>
.ds-overview-demo {
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

.structure-map {
  margin-bottom: 2rem;
}

.map-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.structure-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.category-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.category-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.category-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.category-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.category-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.category-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example-tag {
  padding: 0.25rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 0.75rem;
}

.category-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
  align-items: start;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.feature-icon {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.feature-text {
  font-size: 0.85rem;
  line-height: 1.5;
}

.scenario-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.scenario-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.scenario-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.scenario-content {
  flex: 1;
}

.scenario-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.scenario-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.complexity-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--vp-c-brand);
  color: white;
}

.header-cell {
  padding: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--vp-c-divider);
}

.data-cell {
  padding: 0.6rem;
  font-size: 0.85rem;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.data-cell.highlight {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.analogy-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.analogy-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.analogy-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.analogy-text {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.analogy-example {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-left: 3px solid var(--vp-c-brand);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
