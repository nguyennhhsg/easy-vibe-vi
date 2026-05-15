<!--
  TrackingMethodsComparisonDemo.vue
  So sánh tracking methods - code tracking, visual tracking, auto tracking
-->
<template>
  <div class="tracking-methods-comparison-demo">
    <div class="header">
      <div class="title">
        So sánh các tracking method
      </div>
      <div class="subtitle">
        So sánh chi tiết 3 cách triển khai tracking phổ biến nhất
      </div>
    </div>

    <div class="methods-grid">
      <div
        v-for="method in methods"
        :key="method.id"
        class="method-card"
        :class="{ selected: selectedMethod === method.id }"
        @click="selectMethod(method.id)"
      >
        <div class="method-header">
          <div class="method-icon">
            {{ method.icon }}
          </div>
          <div class="method-info">
            <div class="method-name">
              {{ method.name }}
            </div>
            <div class="method-english">
              {{ method.english }}
            </div>
          </div>
          <div
            v-if="selectedMethod === method.id"
            class="selected-badge"
          >
            Đã chọn
          </div>
        </div>

        <div class="method-body">
          <div class="method-description">
            {{ method.description }}
          </div>

          <div class="method-features">
            <div class="feature-category">
              <div class="category-title">
                ✅ Ưu điểm
              </div>
              <ul class="feature-list pros">
                <li
                  v-for="(pro, index) in method.pros"
                  :key="index"
                >
                  {{ pro }}
                </li>
              </ul>
            </div>

            <div class="feature-category">
              <div class="category-title">
                ❌ Nhược điểm
              </div>
              <ul class="feature-list cons">
                <li
                  v-for="(con, index) in method.cons"
                  :key="index"
                >
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div class="method-code">
            <div class="code-title">
              Code example
            </div>
            <pre class="code-block"><code>{{ method.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-matrix">
      <div class="matrix-title">
        Ma trận so sánh tổng hợp
      </div>
      <table class="matrix">
        <thead>
          <tr>
            <th>Tiêu chí đánh giá</th>
            <th
              v-for="method in methods"
              :key="method.id"
            >
              {{ method.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in matrixData"
            :key="index"
          >
            <td class="dimension">
              {{ row.dimension }}
            </td>
            <td
              v-for="method in methods"
              :key="method.id"
              class="score"
              :class="{ best: row.best === method.id }"
            >
              <div class="score-bar">
                <div
                  class="score-fill"
                  :style="{ width: row.scores[method.id] + '%' }"
                />
              </div>
              <div class="score-value">
                {{ row.scores[method.id] }}%
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="recommendation">
      <div class="recommendation-title">
        💡 Gợi ý lựa chọn
      </div>
      <div class="recommendation-content">
        <div class="recommendation-item">
          <div class="rec-scenario">
            Chỉ số kinh doanh cốt lõi
          </div>
          <div class="rec-method">
            Đề xuất: Code tracking
          </div>
          <div class="rec-reason">
            Lý do: Độ chính xác cao nhất, có thể custom thuộc tính, phù hợp cho các nghiệp vụ quan trọng như thanh toán, đăng ký
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">
            Tracking cho campaign vận hành
          </div>
          <div class="rec-method">
            Đề xuất: Visual tracking
          </div>
          <div class="rec-reason">
            Lý do: Triển khai nhanh, product manager có thể tự thao tác, phù hợp để verify hiệu quả campaign nhanh
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">
            Dữ liệu pageview
          </div>
          <div class="rec-method">
            Đề xuất: Auto tracking
          </div>
          <div class="rec-reason">
            Lý do: Không tốn công sức dev, thu thập 1 lần, phù hợp cho các chỉ số cơ bản như PV/UV
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">
            Ứng dụng enterprise quy mô lớn
          </div>
          <div class="rec-method">
            Đề xuất: Giải pháp lai
          </div>
          <div class="rec-reason">
            Lý do: Nghiệp vụ cốt lõi dùng code tracking, campaign vận hành dùng visual tracking, data cơ bản dùng auto tracking
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('code')

const methods = [
  {
    id: 'code',
    name: 'Code tracking',
    english: 'Code-based Tracking',
    icon: '💻',
    description: 'Gọi SDK tracking trực tiếp trong code, developer tự thêm code thu thập dữ liệu',
    pros: [
      'Dữ liệu chính xác, kiểm soát được thời điểm',
      'Linh hoạt cao, có thể custom thuộc tính',
      'Có thể thu thập business logic phức tạp',
      'Phù hợp với mọi tình huống'
    ],
    cons: ['Cần nguồn lực dev', 'Thêm tracking phải release version mới', 'Chi phí maintain cao', 'Phụ thuộc team dev'],
    code: `// Tracking khi click button "Mua"
function onBuyButtonClick() {
  // Business logic
  addToCart(product)

  // Tracking
  track('click_buy_button', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    page: 'product_detail'
  })
}`
  },
  {
    id: 'visual',
    name: 'Visual tracking',
    english: 'Visual Tracking',
    icon: '🎨',
    description: 'Khoanh chọn các element trên trang bằng tool visual, tự động generate code tracking',
    pros: ['Không cần code', 'Product manager có thể tự làm', 'Triển khai nhanh', 'WYSIWYG'],
    cons: [
      'Chỉ thu thập được event chuẩn',
      'Khả năng custom thuộc tính yếu',
      'Dễ hỏng khi redesign trang',
      'Tính năng tương đối đơn điệu'
    ],
    code: `// Visual tracking management backend
// 1. Mở tool visual tracking
// 2. Khoanh chọn button "Mua ngay" trên trang
// 3. Cấu hình tên event: click_buy_button
// 4. Cấu hình thuộc tính: product_id, price
// 5. Publish bằng 1 click

// SDK tự động generate code tracking
// Không cần viết code thủ công`
  },
  {
    id: 'auto',
    name: 'Auto tracking',
    english: 'Auto Tracking',
    icon: '🤖',
    description: 'SDK tự động thu thập mọi hành vi user, không cần thêm code thủ công',
    pros: ['Không tốn công dev', 'Thu thập tất cả dữ liệu trong 1 lần', 'Hỗ trợ phân tích hồi tố', 'Triển khai đơn giản'],
    cons: [
      'Lượng data lớn, nhiều nhiễu',
      'Không custom được thuộc tính',
      'Rủi ro privacy compliance',
      'Chất lượng data tương đối thấp'
    ],
    code: `// Khởi tạo SDK (chỉ cần 1 dòng code)
const tracker = new AutoTracker({
  serverUrl: 'https://analytics.example.com',
  autoTrack: true  // Bật auto tracking
})

// SDK tự động thu thập:
// - Tất cả pageview
// - Tất cả click element
// - Tất cả form submit
// - Tất cả scroll trang`
  }
]

const matrixData = [
  {
    dimension: 'Tính linh hoạt',
    scores: { code: 95, visual: 70, auto: 30 },
    best: 'code'
  },
  {
    dimension: 'Chi phí phát triển',
    scores: { code: 30, visual: 80, auto: 100 },
    best: 'auto'
  },
  {
    dimension: 'Chi phí maintain',
    scores: { code: 40, visual: 60, auto: 90 },
    best: 'auto'
  },
  {
    dimension: 'Chất lượng dữ liệu',
    scores: { code: 100, visual: 75, auto: 60 },
    best: 'code'
  },
  {
    dimension: 'Tốc độ triển khai',
    scores: { code: 40, visual: 85, auto: 100 },
    best: 'auto'
  },
  {
    dimension: 'Khả năng custom',
    scores: { code: 100, visual: 50, auto: 20 },
    best: 'code'
  }
]

const selectMethod = (methodId) => {
  selectedMethod.value = methodId
}
</script>

<style scoped>
.tracking-methods-comparison-demo {
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

.methods-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.method-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.method-card.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(60, 130, 246, 0.1);
}

.method-header {
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.method-icon {
  font-size: 2.5rem;
}

.method-info {
  flex: 1;
}

.method-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.method-english {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.selected-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.method-body {
  padding: 1.25rem;
}

.method-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.method-features {
  margin-bottom: 1rem;
}

.feature-category {
  margin-bottom: 1rem;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.feature-list.pros li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: 700;
}

.feature-list.cons li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #ef4444;
  font-weight: 700;
}

.method-code {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.code-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
}

.comparison-matrix {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.matrix-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.matrix {
  width: 100%;
  border-collapse: collapse;
}

.matrix th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.matrix td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.matrix .dimension {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.score {
  position: relative;
}

.score.best {
  background: #dcfce7;
}

.score-bar {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #3b82f6);
  border-radius: 4px;
  transition: width 0.5s;
}

.score-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.recommendation {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
}

.recommendation-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.recommendation-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.recommendation-item {
  background: white;
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid #f59e0b;
}

.rec-scenario {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.rec-method {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.rec-reason {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-content {
    grid-template-columns: 1fr;
  }
}
</style>
