<!--
  ToolSelectionDemo.vue
  Gợi ý lựa chọn tool tracking - giúp chọn công cụ tracking phù hợp
-->
<template>
  <div class="tool-selection-demo">
    <div class="header">
      <div class="title">
        Lựa chọn tool tracking
      </div>
      <div class="subtitle">
        Chọn giải pháp phù hợp dựa trên quy mô team và nhu cầu của bạn
      </div>
    </div>

    <div class="selection-criteria">
      <div class="criteria-title">
        Vui lòng chọn tình huống của bạn
      </div>
      <div class="criteria-options">
        <div
          v-for="(option, key) in criteria"
          :key="key"
          class="criteria-option"
        >
          <div class="option-label">
            {{ option.label }}
          </div>
          <div class="option-buttons">
            <button
              v-for="(value, index) in option.values"
              :key="index"
              class="value-btn"
              :class="{ active: selectedCriteria[key] === value }"
              @click="selectedCriteria[key] = value"
            >
              {{ value }}
            </button>
          </div>
        </div>
      </div>

      <button
        class="recommend-btn"
        @click="getRecommendation"
      >
        Nhận giải pháp gợi ý
      </button>
    </div>

    <div
      v-if="recommendation"
      class="recommendation-result"
    >
      <div class="result-header">
        <div class="result-icon">
          🎯
        </div>
        <div class="result-title">
          Giải pháp được gợi ý
        </div>
      </div>

      <div class="result-card">
        <div class="result-name">
          {{ recommendation.name }}
        </div>
        <div class="result-desc">
          {{ recommendation.desc }}
        </div>

        <div class="result-details">
          <div class="detail-item">
            <span class="detail-label">Giai đoạn áp dụng:</span>
            <span class="detail-value">{{ recommendation.stage }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Chi phí ước tính:</span>
            <span class="detail-value">{{ recommendation.cost }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Độ khó triển khai:</span>
            <span class="detail-value">{{ recommendation.difficulty }}</span>
          </div>
        </div>

        <div class="result-pros">
          <div class="pros-title">
            ✅ Ưu điểm
          </div>
          <ul class="pros-list">
            <li
              v-for="(pro, i) in recommendation.pros"
              :key="i"
            >
              {{ pro }}
            </li>
          </ul>
        </div>

        <div class="result-cons">
          <div class="cons-title">
            ⚠️ Lưu ý
          </div>
          <ul class="cons-list">
            <li
              v-for="(con, i) in recommendation.cons"
              :key="i"
            >
              {{ con }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="tools-comparison">
      <div class="comparison-title">
        Bảng so sánh các tool
      </div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Phù hợp với</th>
            <th>Chỉ số đề xuất</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tool, index) in tools"
            :key="index"
          >
            <td class="tool-name">
              {{ tool.name }}
            </td>
            <td>{{ tool.type }}</td>
            <td>{{ tool.price }}</td>
            <td>{{ tool.scenario }}</td>
            <td>
              <span class="rating">
                {{ '⭐'.repeat(tool.rating) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCriteria = ref({
  teamSize: '',
  budget: '',
  technical: '',
  dataSecurity: ''
})

const criteria = {
  teamSize: {
    label: 'Quy mô team',
    values: ['1-5 người', '5-20 người', '20-100 người', '100+ người']
  },
  budget: {
    label: 'Ngân sách',
    values: ['Ưu tiên miễn phí', 'Ngân sách thấp', 'Ngân sách trung bình', 'Ngân sách dư dả']
  },
  technical: {
    label: 'Năng lực kỹ thuật',
    values: ['Không có team kỹ thuật', 'Có developer', 'Team kỹ thuật mạnh']
  },
  dataSecurity: {
    label: 'Yêu cầu bảo mật dữ liệu',
    values: ['Bình thường', 'Cao', 'Cực cao (cần private deployment)']
  }
}

const recommendation = ref(null)

const recommendations = {
  small: {
    name: 'Google Analytics',
    desc: 'Tool phân tích website miễn phí phổ biến nhất thế giới, mạnh mẽ và dễ dùng',
    stage: 'Giai đoạn 0-1 (khởi nghiệp)',
    cost: 'Miễn phí',
    difficulty: 'Thấp',
    pros: ['Hoàn toàn miễn phí', 'Tính năng đầy đủ', 'Tài liệu cộng đồng phong phú', 'Dễ bắt đầu'],
    cons: ['Dữ liệu trên server nước ngoài', 'Truy cập tại VN có thể không ổn định', 'Tính năng nâng cao cần VPN']
  },
  medium: {
    name: 'Sensors Data / GrowingIO',
    desc: 'Nền tảng phân tích hành vi user hàng đầu trong nước, hỗ trợ private deployment',
    stage: 'Giai đoạn 1-10 (tăng trưởng)',
    cost: '$5,000 - $20,000 /năm',
    difficulty: 'Trung bình',
    pros: ['Event analytics chuyên nghiệp', 'Hỗ trợ private deployment', 'Hỗ trợ kỹ thuật nội địa', 'Tuân thủ quy định trong nước'],
    cons: ['Giá khá cao', 'Cần team kỹ thuật để maintain', 'Chi phí customization cao']
  },
  large: {
    name: 'Self-built tracking system',
    desc: 'Xây dựng nền tảng tracking private dựa trên open source stack (Kafka + ClickHouse)',
    stage: 'Giai đoạn 10-100 (trưởng thành)',
    cost: '$50,000+ /năm (nhân lực + server)',
    difficulty: 'Cao',
    pros: ['Hoàn toàn tự chủ về dữ liệu', 'Customization linh hoạt', 'Chi phí dài hạn thấp hơn', 'Bảo mật dữ liệu cao nhất'],
    cons: ['Đầu tư ban đầu lớn', 'Cần team chuyên nghiệp', 'Chi phí maintain cao', 'Thời gian triển khai dài']
  }
}

const tools = [
  {
    name: 'Google Analytics',
    type: 'SaaS',
    price: 'Miễn phí',
    scenario: 'Dự án nhỏ, website cá nhân',
    rating: 5
  },
  {
    name: 'Umami',
    type: 'Open source',
    price: 'Chi phí server',
    scenario: 'Chú trọng privacy, cần private deployment',
    rating: 4
  },
  {
    name: 'Sensors Data',
    type: 'Commercial + private',
    price: '$10,000+/năm',
    scenario: 'Doanh nghiệp vừa và lớn',
    rating: 5
  },
  {
    name: 'GrowingIO',
    type: 'Commercial + SaaS',
    price: '$5,000+/năm',
    scenario: 'Growth team, tối ưu sản phẩm',
    rating: 4
  },
  {
    name: 'Mixpanel',
    type: 'SaaS',
    price: '$25,000+/năm',
    scenario: 'Phân tích dữ liệu sản phẩm',
    rating: 4
  }
]

const getRecommendation = () => {
  const { teamSize, budget, technical, dataSecurity } = selectedCriteria.value

  if (dataSecurity === 'Cực cao (cần private deployment)') {
    recommendation.value = recommendations.large
  } else if (teamSize === '1-5 người' || budget === 'Ưu tiên miễn phí') {
    recommendation.value = recommendations.small
  } else if (teamSize === '5-20 người' || teamSize === '20-100 người') {
    recommendation.value = recommendations.medium
  } else {
    recommendation.value = recommendations.large
  }
}
</script>

<style scoped>
.tool-selection-demo {
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

.selection-criteria {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.criteria-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.criteria-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.criteria-option {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.option-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.value-btn {
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.value-btn:hover {
  border-color: var(--vp-c-brand);
}

.value-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.recommend-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.recommend-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(60, 130, 246, 0.3);
}

.recommendation-result {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-icon {
  font-size: 2.5rem;
}

.result-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.result-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
}

.result-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.result-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.result-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.detail-item {
  text-align: center;
}

.detail-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
}

.result-pros,
.result-cons {
  margin-top: 1rem;
}

.pros-title,
.cons-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.pros-list,
.cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros-list li,
.cons-list li {
  padding: 0.25rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.85rem;
}

.pros-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: 700;
}

.cons-list li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
}

.tools-comparison {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.tool-name {
  font-weight: 600;
}

.rating {
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .result-details {
    grid-template-columns: 1fr;
  }

  .option-buttons {
    flex-direction: column;
  }

  .value-btn {
    width: 100%;
  }
}
</style>
