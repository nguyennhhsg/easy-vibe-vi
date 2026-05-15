<template>
  <div class="algorithm-overview-demo">
    <div class="demo-header">
      <span class="title">Nhập môn tư duy thuật toán</span>
      <span class="subtitle">Bộ các bước và phương pháp để giải quyết vấn đề</span>
    </div>

    <div class="analogy-box">
      <div class="analogy-content">
        <div class="analogy-icon">📖</div>
        <div class="analogy-text">
          <strong>Thuật toán giống như công thức nấu ăn:</strong><br />
          Nguyên liệu = Dữ liệu<br />
          Các bước nấu = Thuật toán<br />
          Món ngon = Kết quả
        </div>
      </div>
    </div>

    <div class="algorithm-categories">
      <div class="category-title">Các loại thuật toán thường gặp</div>
      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="['category-card', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <div class="card-icon">{{ category.icon }}</div>
          <div class="card-name">{{ category.name }}</div>
          <div class="card-desc">{{ category.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Giải thích chi tiết thuật toán -->
    <div v-if="activeCategory" class="algorithm-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentCategory.icon }}</span>
        <span class="detail-title">{{ currentCategory.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">Ý tưởng cốt lõi</div>
          <div class="section-text">{{ currentCategory.idea }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">Ví dụ đời thường</div>
          <div class="analogy-card">
            <div class="analogy-scenario">
              {{ currentCategory.analogy.scenario }}
            </div>
            <div class="analogy-explanation">
              {{ currentCategory.analogy.explanation }}
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Độ phức tạp thời gian</div>
          <div class="complexity-display">
            <div class="complexity-bigO">{{ currentCategory.complexity }}</div>
            <div class="complexity-desc">
              {{ currentCategory.complexityDesc }}
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Ứng dụng tiêu biểu</div>
          <div class="app-list">
            <div
              v-for="(app, index) in currentCategory.applications"
              :key="index"
              class="app-tag"
            >
              {{ app }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- So sánh độ phức tạp -->
    <div class="complexity-comparison">
      <div class="comparison-title">So sánh độ phức tạp các thuật toán thường gặp</div>
      <div class="comparison-chart">
        <div
          v-for="(item, index) in complexityChart"
          :key="index"
          class="chart-item"
        >
          <div class="chart-label">{{ item.name }}</div>
          <div class="chart-bar-container">
            <div
              class="chart-bar"
              :style="{ width: item.width, backgroundColor: item.color }"
            ></div>
          </div>
          <div class="chart-value">{{ item.complexity }}</div>
        </div>
      </div>
    </div>

    <!-- Gợi ý học tập -->
    <div class="learning-tips">
      <div class="tips-title">Gợi ý học thuật toán</div>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">📚</div>
          <div class="tip-title">Hiểu trước</div>
          <div class="tip-desc">Hiểu tư tưởng thuật toán trước, rồi mới quan tâm cách viết code</div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">✏️</div>
          <div class="tip-title">Thực hành</div>
          <div class="tip-desc">Tự cài đặt một lần để hiểu sâu hơn</div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🔄</div>
          <div class="tip-title">Luyện tập nhiều lần</div>
          <div class="tip-desc">Áp dụng cùng một thuật toán cho nhiều tình huống khác nhau</div>
        </div>
        <div class="tip-card">
          <div class="tip-title">Phân tích và tối ưu</div>
          <div class="tip-desc">Suy nghĩ về độ phức tạp thời gian, không gian và tìm cách tối ưu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('search')

const categories = [
  {
    id: 'search',
    name: 'Thuật toán tìm kiếm',
    icon: '🔍',
    desc: 'Tìm mục tiêu trong một tập dữ liệu',
    idea: 'Quá trình tìm phần tử cụ thể trong một tập dữ liệu',
    analogy: {
      scenario: 'Tra từ trong từ điển',
      explanation:
        'Tìm tuần tự = lật từ trang đầu đến trang cuối; tìm nhị phân = mở thẳng vào giữa rồi xét nửa trước hay nửa sau'
    },
    complexity: 'O(log n)',
    complexityDesc: 'Tìm nhị phân rất nhanh, mỗi bước loại bỏ một nửa dữ liệu',
    applications: ['Công cụ tìm kiếm', 'Truy vấn cơ sở dữ liệu', 'Tự động hoàn thành']
  },
  {
    id: 'sort',
    name: 'Thuật toán sắp xếp',
    icon: '📊',
    desc: 'Sắp xếp dữ liệu theo thứ tự',
    idea: 'Sắp xếp lại dữ liệu hỗn loạn thành dãy có thứ tự',
    analogy: {
      scenario: 'Sắp xếp bộ bài',
      explanation:
        'Sắp xếp chèn = mỗi lần lấy một lá bài chèn vào đúng vị trí; quicksort = chia bài thành hai đống lớn/nhỏ rồi sắp xếp đệ quy'
    },
    complexity: 'O(n log n)',
    complexityDesc: 'Quicksort, merge sort là các thuật toán sắp xếp tổng quát hiệu quả nhất',
    applications: ['Bảng xếp hạng', 'Sắp xếp file', 'Trực quan hóa dữ liệu']
  },
  {
    id: 'recursive',
    name: 'Thuật toán đệ quy',
    icon: '🔄',
    desc: 'Hàm tự gọi chính nó',
    idea: 'Chia bài toán lớn thành những bài toán nhỏ cùng dạng',
    analogy: {
      scenario: 'Búp bê matryoshka',
      explanation:
        'Mở con búp bê lớn ra, bên trong là một con nhỏ hơn, mở tiếp lại có con nhỏ hơn nữa... cho đến con nhỏ nhất'
    },
    complexity: 'O(log n) đến O(2ⁿ)',
    complexityDesc: 'Tùy bài toán: đệ quy tìm nhị phân rất nhanh, đệ quy Fibonacci khá chậm',
    applications: ['Duyệt cây', 'Chia để trị', 'Quy hoạch động']
  },
  {
    id: 'greedy',
    name: 'Thuật toán tham lam',
    icon: '🎯',
    desc: 'Mỗi bước chọn phương án tối ưu hiện tại',
    idea: 'Tại mỗi bước, chọn phương án tốt nhất theo trạng thái hiện tại',
    analogy: {
      scenario: 'Trả tiền thừa',
      explanation:
        'Trả 37 đồng tiền thừa: lấy trước một tờ 20 (lớn nhất có thể), rồi 10, 5, 1, 1, mỗi lần chọn mệnh giá lớn nhất'
    },
    complexity: 'O(n) hoặc O(n log n)',
    complexityDesc: 'Thường rất nhanh nhưng có thể không cho lời giải tối ưu toàn cục',
    applications: ['Đường đi ngắn nhất', 'Bài toán cái túi', 'Lập lịch tác vụ']
  },
  {
    id: 'dynamic',
    name: 'Quy hoạch động',
    icon: '📈',
    desc: 'Lưu kết quả trung gian để tránh tính lại',
    idea: 'Chia bài toán phức tạp thành các bài toán con, lưu lời giải của chúng',
    analogy: {
      scenario: 'Leo cầu thang',
      explanation:
        'Để lên bậc thứ n, có thể từ bậc n-1 bước 1 hoặc từ bậc n-2 bước 2; ghi nhớ kết quả trước đó để khỏi tính lại'
    },
    complexity: 'O(n²) hoặc O(n³)',
    complexityDesc: 'Đánh đổi không gian lấy thời gian, nhanh hơn đệ quy nhiều',
    applications: ['Đường đi ngắn nhất', 'Bài toán cái túi', 'So khớp chuỗi']
  }
]

const complexityChart = [
  { name: 'Tìm nhị phân', complexity: 'O(log n)', width: '10%', color: '#10b981' },
  {
    name: 'Quicksort',
    complexity: 'O(n log n)',
    width: '25%',
    color: '#3b82f6'
  },
  { name: 'Sắp xếp chèn', complexity: 'O(n²)', width: '50%', color: '#f59e0b' },
  { name: 'Đệ quy thô', complexity: 'O(2ⁿ)', width: '100%', color: '#ef4444' }
]

const currentCategory = computed(() =>
  categories.find((c) => c.id === activeCategory.value)
)
</script>

<style scoped>
.algorithm-overview-demo {
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

.analogy-box {
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.analogy-content {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.analogy-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: 1rem;
  line-height: 1.8;
}

.algorithm-categories {
  margin-bottom: 2rem;
}

.category-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.category-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
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

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.algorithm-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.analogy-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.analogy-scenario {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.analogy-explanation {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.complexity-display {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.complexity-bigO {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.complexity-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.app-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.app-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.complexity-comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-chart {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.chart-item {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-item:last-child {
  margin-bottom: 0;
}

.chart-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.chart-bar-container {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  height: 24px;
  overflow: hidden;
}

.chart-bar {
  height: 100%;
  transition: width 0.5s ease-out;
  border-radius: 4px;
}

.chart-value {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.learning-tips {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.tips-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tip-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.tip-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.tip-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.tip-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
