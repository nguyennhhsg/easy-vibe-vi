<template>
  <div class="ds-selector-demo">
    <div class="demo-header">
      <span class="title">Chọn cấu trúc dữ liệu phù hợp như thế nào?</span>
      <span class="subtitle">Đưa ra lựa chọn tốt nhất dựa trên nhu cầu thực tế</span>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">Tình huống bạn đang gặp là gì?</div>
      <div class="scenario-grid">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-card', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          <div class="scenario-icon">{{ scenario.icon }}</div>
          <div class="scenario-name">{{ scenario.name }}</div>
          <div class="scenario-desc">{{ scenario.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Kết quả gợi ý -->
    <div v-if="activeScenario" class="recommendation">
      <div class="rec-header">
        <span class="rec-title">Gợi ý dùng: {{ currentScenario.recommendation }}</span>
      </div>

      <div class="rec-reason">
        <div class="reason-title">Vì sao?</div>
        <div class="reason-list">
          <div
            v-for="(reason, index) in currentScenario.reasons"
            :key="index"
            class="reason-item"
          >
            <span class="reason-bullet">✓</span>
            <span class="reason-text">{{ reason }}</span>
          </div>
        </div>
      </div>

      <div class="rec-example">
        <div class="example-title">Ví dụ thực tế</div>
        <div class="example-content">{{ currentScenario.example }}</div>
      </div>
    </div>

    <!-- Bảng tra nhanh -->
    <div class="quick-reference">
      <div class="ref-title">Bảng tra nhanh</div>
      <table class="ref-table">
        <thead>
          <tr>
            <th>Tình huống</th>
            <th>Cấu trúc dữ liệu gợi ý</th>
            <th>Độ phức tạp thời gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in referenceTable" :key="index">
            <td>{{ row.scenario }}</td>
            <td>{{ row.structure }}</td>
            <td class="complexity">{{ row.complexity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Quy trình ra quyết định -->
    <div class="decision-flow">
      <div class="flow-title">Quy trình chọn lựa</div>
      <div class="flow-diagram">
        <div class="flow-step question">
          <div class="step-icon">❓</div>
          <div class="step-text">Cần truy cập phần tử nhanh không?</div>
        </div>
        <div class="flow-branch">
          <div class="branch-yes">
            <div class="branch-label">Có</div>
            <div class="flow-result">Mảng / Hash Table</div>
          </div>
          <div class="branch-no">
            <div class="branch-label">Không</div>
            <div class="flow-step question">
              <div class="step-text">Cần chèn/xóa thường xuyên không?</div>
            </div>
            <div class="flow-branch">
              <div class="branch-yes">
                <div class="branch-label">Có</div>
                <div class="flow-result">Linked List</div>
              </div>
              <div class="branch-no">
                <div class="branch-label">Không</div>
                <div class="flow-step question">
                  <div class="step-text">Cần giữ thứ tự không?</div>
                </div>
                <div class="flow-branch">
                  <div class="branch-yes">
                    <div class="branch-label">Có</div>
                    <div class="flow-result">Stack / Queue</div>
                  </div>
                  <div class="branch-no">
                    <div class="branch-label">Không</div>
                    <div class="flow-result">Cây / Đồ thị</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref(null)

const scenarios = [
  {
    id: 'lookup',
    icon: '🔍',
    name: 'Tìm kiếm nhanh',
    desc: 'Tìm dữ liệu nhanh theo từ khóa',
    recommendation: 'Hash Table',
    reasons: [
      'Thời gian tìm trung bình O(1), gần như tức thời',
      'Lưu dạng key-value, ngữ nghĩa rõ ràng',
      'Không cần duyệt toàn bộ dữ liệu'
    ],
    example: 'Tra thông tin user theo ID, tra từ điển, hệ thống cache'
  },
  {
    id: 'ordered',
    icon: '📊',
    name: 'Giữ thứ tự',
    desc: 'Dữ liệu cần lưu theo thứ tự thêm vào hoặc thứ tự cụ thể',
    recommendation: 'Mảng hoặc Linked List',
    reasons: [
      'Mảng cho phép truy cập trực tiếp theo index',
      'Linked List có thể thay đổi kích thước linh hoạt',
      'Truy cập theo vị trí nhanh'
    ],
    example: 'Danh sách điểm học sinh, dữ liệu chuỗi thời gian, bảng xếp hạng'
  },
  {
    id: 'lifo',
    icon: '🥞',
    name: 'Vào sau ra trước',
    desc: 'Cái vào sau cùng được xử lý trước',
    recommendation: 'Stack',
    reasons: ['Chỉ thao tác ở đỉnh stack', 'Push/pop đều O(1)', 'Phù hợp truy vết và Undo'],
    example: 'Nút Back trình duyệt, Undo trình soạn thảo, call stack của hàm'
  },
  {
    id: 'fifo',
    icon: '🚶',
    name: 'Vào trước ra trước',
    desc: 'Ai đến trước xử lý trước',
    recommendation: 'Queue',
    reasons: ['Một đầu vào, đầu kia ra', 'Enqueue/dequeue đều O(1)', 'Cách lên lịch công bằng'],
    example: 'Hàng đợi in, lên lịch tác vụ, message queue'
  },
  {
    id: 'hierarchy',
    icon: '🌳',
    name: 'Quan hệ phân cấp',
    desc: 'Dữ liệu có quan hệ cha-con',
    recommendation: 'Cây',
    reasons: ['Diễn tả cấu trúc phân cấp rõ ràng', 'Tìm kiếm O(log n)', 'Hỗ trợ nhiều cách duyệt'],
    example: 'Hệ thống file, sơ đồ tổ chức, HTML DOM'
  },
  {
    id: 'relationship',
    icon: '🕸️',
    name: 'Quan hệ phức tạp',
    desc: 'Dữ liệu có kết nối nhiều-nhiều phức tạp',
    recommendation: 'Đồ thị',
    reasons: ['Biểu diễn được mọi quan hệ', 'Hỗ trợ thuật toán tìm đường', 'Phù hợp mạng lưới và quan hệ xã hội'],
    example: 'Mạng xã hội, định tuyến bản đồ, liên kết web'
  }
]

const referenceTable = [
  { scenario: 'Truy cập ngẫu nhiên', structure: 'Mảng', complexity: 'O(1)' },
  { scenario: 'Tìm kiếm nhanh', structure: 'Hash Table', complexity: 'O(1)' },
  { scenario: 'Tìm kiếm có thứ tự', structure: 'Cây tìm kiếm nhị phân', complexity: 'O(log n)' },
  { scenario: 'Chèn/xóa thường xuyên', structure: 'Linked List', complexity: 'O(1)' },
  { scenario: 'Thao tác Undo', structure: 'Stack', complexity: 'O(1)' },
  { scenario: 'Lên lịch tác vụ', structure: 'Queue', complexity: 'O(1)' }
]

const currentScenario = computed(() => {
  return scenarios.find((s) => s.id === activeScenario.value)
})
</script>

<style scoped>
.ds-selector-demo {
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

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.scenario-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.scenario-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.recommendation {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.rec-icon {
  font-size: 1.5rem;
}

.rec-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.rec-reason {
  margin-bottom: 1.5rem;
}

.reason-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.reason-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.reason-bullet {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.reason-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.rec-example {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.example-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.example-content {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.quick-reference {
  margin-bottom: 2rem;
}

.ref-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.ref-table {
  width: 100%;
  border-collapse: collapse;
}

.ref-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
}

.ref-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.complexity {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.decision-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-step {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.flow-step.question {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.flow-branch {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.branch-yes,
.branch-no {
  flex: 1;
}

.branch-label {
  text-align: center;
  padding: 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.flow-result {
  text-align: center;
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
