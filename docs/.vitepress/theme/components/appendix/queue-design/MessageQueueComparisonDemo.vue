<!--
  MessageQueueComparisonDemo.vue
  Demo tương tác so sánh các message queue phổ biến
-->
<template>
  <div class="mq-comparison-demo">
    <div class="header">
      <div class="title">
        So sánh các message queue phổ biến
      </div>
      <div class="subtitle">
        Chọn MQ khác nhau để xem so sánh đặc tính và use case phù hợp
      </div>
    </div>

    <div class="mq-selector">
      <button
        v-for="mq in messageQueues"
        :key="mq.name"
        class="mq-btn"
        :class="{ active: selectedMQ === mq.name }"
        @click="selectMQ(mq.name)"
      >
        {{ mq.label }}
      </button>
    </div>

    <div class="mq-details">
      <div class="mq-card">
        <div class="mq-header">
          <div class="mq-name">
            {{ currentMQ.label }}
          </div>
          <div class="mq-tag">
            {{ currentMQ.positioning }}
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric">
            <div class="metric-label">
              Throughput
            </div>
            <div class="metric-value">
              {{ currentMQ.throughput }}
            </div>
            <div class="metric-bar">
              <div
                class="bar-fill"
                :style="{ width: currentMQ.throughputPercent + '%' }"
              />
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">
              Latency
            </div>
            <div class="metric-value">
              {{ currentMQ.latency }}
            </div>
            <div class="metric-desc">
              {{ currentMQ.latencyDesc }}
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">
              Độ tin cậy
            </div>
            <div class="metric-value">
              {{ currentMQ.reliability }}
            </div>
            <div class="metric-desc">
              {{ currentMQ.reliabilityDesc }}
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">
              Đường cong học tập
            </div>
            <div class="metric-value">
              {{ currentMQ.learning }}
            </div>
            <div class="metric-bar">
              <div
                class="bar-fill learning"
                :style="{ width: currentMQ.learningPercent + '%' }"
              />
            </div>
          </div>
        </div>

        <div class="features">
          <div class="feature-title">
            Đặc tính cốt lõi
          </div>
          <div class="feature-list">
            <div
              v-for="feature in currentMQ.features"
              :key="feature"
              class="feature-item"
            >
              ✓ {{ feature }}
            </div>
          </div>
        </div>

        <div class="use-cases">
          <div class="use-case-title">
            ✅ Use case phù hợp
          </div>
          <ul class="use-case-list">
            <li
              v-for="useCase in currentMQ.useCases"
              :key="useCase"
            >
              {{ useCase }}
            </li>
          </ul>
        </div>

        <div class="not-recommended">
          <div class="not-title">
            ⚠️ Use case không khuyến nghị
          </div>
          <ul class="not-list">
            <li
              v-for="item in currentMQ.notRecommended"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        Bảng so sánh nhanh
      </div>
      <table>
        <thead>
          <tr>
            <th>Đặc tính</th>
            <th
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Throughput</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.throughput }}
            </td>
          </tr>
          <tr>
            <td>Latency</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.latency }}
            </td>
          </tr>
          <tr>
            <td>Thứ tự message</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.ordering }}
            </td>
          </tr>
          <tr>
            <td>Replay message</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.rewind }}
            </td>
          </tr>
          <tr>
            <td>Use case tốt nhất</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.bestScenario }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="recommendation">
      <div class="rec-title">
        💡 Gợi ý lựa chọn
      </div>
      <div class="rec-content">
        <div
          v-if="selectedMQ === 'rabbitmq'"
          class="rec-text"
        >
          <strong>RabbitMQ</strong>
          là lựa chọn an toàn nhất, phù hợp đa số nghiệp vụ truyền thống. Nếu đội nhóm bạn có kinh nghiệm AMQP
          hoặc cần routing rule phức tạp, ưu tiên chọn nó.
        </div>
        <div
          v-else-if="selectedMQ === 'kafka'"
          class="rec-text"
        >
          <strong>Kafka</strong> phù hợp use case dữ liệu lớn và stream processing. Nếu bạn cần xử lý TPS hàng triệu
          hoặc cần replay message, tích hợp big data, hãy chọn Kafka.
        </div>
        <div
          v-else-if="selectedMQ === 'rocketmq'"
          class="rec-text"
        >
          <strong>RocketMQ</strong>
          do Alibaba mã nguồn mở, đặc biệt phù hợp e-commerce, tài chính. Nếu bạn cần transactional message, ordered message, delayed message và các tính năng cao cấp khác, RocketMQ
          là lựa chọn tốt nhất.
        </div>
        <div
          v-else
          class="rec-text"
        >
          <strong>Redis Stream</strong> là nhẹ nhất, phù hợp team nhỏ và validate MVP. Nếu đã có sẵn hạ tầng Redis
          và yêu cầu độ tin cậy không quá cao, bạn có thể dùng
          Redis Stream để triển khai nhanh.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMQ = ref('rabbitmq')

const messageQueues = [
  {
    name: 'rabbitmq',
    label: 'RabbitMQ',
    positioning: 'Message queue truyền thống',
    throughput: '10K/giây',
    throughputPercent: 10,
    latency: 'Cấp micro giây',
    latencyDesc: 'Latency cực thấp',
    reliability: 'Cao',
    reliabilityDesc: 'Hỗ trợ persist',
    learning: 'Trung bình',
    learningPercent: 40,
    ordering: 'Có (trong 1 queue)',
    rewind: 'Không hỗ trợ',
    bestScenario: 'Nghiệp vụ truyền thống',
    features: [
      'Chuẩn giao thức AMQP',
      'Routing rule linh hoạt',
      'Nhiều pattern message',
      'Giao diện quản trị thân thiện',
      'Hệ sinh thái trưởng thành'
    ],
    useCases: [
      'Hệ thống nghiệp vụ truyền thống',
      'Task queue',
      'Cần routing rule phức tạp',
      'Nhạy cảm với latency (cấp micro giây)',
      'Đội nhóm thông thạo AMQP'
    ],
    notRecommended: ['Cần throughput cấp triệu/giây', 'Cần tính năng replay message']
  },
  {
    name: 'kafka',
    label: 'Kafka',
    positioning: 'Hệ thống log phân tán',
    throughput: '1M/giây',
    throughputPercent: 100,
    latency: 'Cấp mili giây',
    latencyDesc: 'Tương đối cao',
    reliability: 'Cao',
    reliabilityDesc: 'Cơ chế đa replica',
    learning: 'Dốc',
    learningPercent: 80,
    ordering: 'Có (trong partition)',
    rewind: 'Hỗ trợ',
    bestScenario: 'Log/stream processing',
    features: [
      'Throughput siêu cao',
      'Khả năng replay message',
      'Kiến trúc phân tán',
      'Tích hợp hệ sinh thái big data',
      'Cơ chế partition'
    ],
    useCases: [
      'Thu thập log',
      'Stream processing',
      'Event sourcing',
      'Phân tích hành vi người dùng',
      'Use case TPS hàng triệu'
    ],
    notRecommended: ['Nhạy cảm cực với latency', 'Task queue đơn giản', 'Team nhỏ phát triển nhanh']
  },
  {
    name: 'rocketmq',
    label: 'RocketMQ',
    positioning: 'Message queue cấp e-commerce',
    throughput: '100K/giây',
    throughputPercent: 30,
    latency: 'Cấp mili giây',
    latencyDesc: 'Latency thấp',
    reliability: 'Cao',
    reliabilityDesc: 'Flush sync/async',
    learning: 'Dốc',
    learningPercent: 70,
    ordering: 'Có',
    rewind: 'Hỗ trợ',
    bestScenario: 'E-commerce/tài chính',
    features: ['Transactional message', 'Ordered message', 'Delayed message', 'Lọc message', 'Độ tin cậy cấp tài chính'],
    useCases: [
      'Hệ thống giao dịch e-commerce',
      'Thanh toán tài chính',
      'Xử lý đơn hàng',
      'Cần tính nhất quán giao dịch',
      'Cần message scheduled/delayed'
    ],
    notRecommended: ['Async task đơn giản', 'Team nhỏ validate nhanh', 'Không cần tính năng cao cấp']
  },
  {
    name: 'redis',
    label: 'Redis Stream',
    positioning: 'Queue nhẹ',
    throughput: '50K/giây',
    throughputPercent: 20,
    latency: 'Cấp mili giây',
    latencyDesc: 'Latency thấp',
    reliability: 'Trung bình',
    reliabilityDesc: 'Persist AOF',
    learning: 'Đơn giản',
    learningPercent: 15,
    ordering: 'Có',
    rewind: 'Hỗ trợ',
    bestScenario: 'Queue quy mô nhỏ',
    features: ['Nhẹ', 'Dựa trên Redis', 'Chi phí học thấp', 'Dễ deploy', 'Hiệu năng tốt'],
    useCases: [
      'Dự án team nhỏ',
      'Validate MVP nhanh',
      'Đã có sẵn hạ tầng Redis',
      'Nhu cầu queue đơn giản',
      'Yêu cầu độ tin cậy không quá cao'
    ],
    notRecommended: ['Yêu cầu độ tin cậy cực cao', 'Nhu cầu routing phức tạp', 'Cần transactional message']
  }
]

const currentMQ = computed(() => {
  return (
    messageQueues.find((mq) => mq.name === selectedMQ.value) || messageQueues[0]
  )
})

const selectMQ = (name) => {
  selectedMQ.value = name
}
</script>

<style scoped>
.mq-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.mq-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mq-btn {
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.mq-btn:hover {
  border-color: var(--vp-c-brand);
}

.mq-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.mq-details {
  margin-bottom: 1.5rem;
}

.mq-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.mq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mq-name {
  font-size: 1.3rem;
  font-weight: 700;
}

.mq-tag {
  padding: 0.4rem 0.8rem;
  background: rgba(59, 130, 246, 0.15);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.metric-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.metric-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.metric-bar {
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.5s ease;
}

.bar-fill.learning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.features {
  margin-bottom: 1.5rem;
}

.feature-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
}

.feature-item {
  padding: 0.5rem 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
  color: #166534;
}

.use-cases,
.not-recommended {
  margin-bottom: 1rem;
}

.use-case-title,
.not-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.use-case-list,
.not-list {
  margin: 0;
  padding-left: 1.5rem;
}

.use-case-list li,
.not-list li {
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.not-list li {
  color: var(--vp-c-text-2);
}

.comparison-table {
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  background: var(--vp-c-bg);
  font-weight: 600;
}

td.highlight,
th.highlight {
  background: rgba(59, 130, 246, 0.1);
  font-weight: 600;
}

.recommendation {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.rec-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.rec-text {
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
