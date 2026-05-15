<script setup>
const retentionData = [
  { date: '2024-01-01', users: 1000, day1: 45, day7: 32, day30: 18 },
  { date: '2024-01-02', users: 1200, day1: 42, day7: 28, day30: 15 },
  { date: '2024-01-03', users: 950, day1: 40, day7: 25, day30: 12 },
  { date: '2024-01-04', users: 1100, day1: 38, day7: 30, day30: 14 },
  { date: '2024-01-05', users: 1050, day1: 41, day7: 33, day30: 16 },
  { date: '2024-01-06', users: 1300, day1: 43, day7: 29, day30: 13 },
  { date: '2024-01-07', users: 1150, day1: 40, day7: 31, day30: 15 }
]

const curves = [
  {
    label: 'Retention D1',
    color: '#3b82f6',
    data: retentionData.map((r) => r.day1)
  },
  {
    label: 'Retention D7',
    color: '#22c55e',
    data: retentionData.map((r) => r.day7)
  },
  {
    label: 'Retention D30',
    color: '#f59e0b',
    data: retentionData.map((r) => r.day30)
  }
]

function points(data) {
  return data.map((v, i) => `${60 + i * 50},${180 - v * 1.6}`).join(' ')
}

function rateClass(rate) {
  if (rate >= 40) return 'high'
  if (rate >= 25) return 'mid'
  return 'low'
}
</script>

<template>
  <div class="retention-demo">
    <div class="demo-header">
      <span class="icon">📈</span>
      <span class="title">Demo phân tích retention</span>
      <span class="subtitle">Khám sức khỏe "cốt lõi" của sản phẩm</span>
    </div>

    <div class="intro-text">
      Acquisition là đổ nước vào thùng, retention là xem thùng có rò không. Đường cong retention
      <span class="hl">phẳng dần</span> cho thấy sản phẩm đã đạt PMF;
      <span class="hl">rớt liên tục về 0</span> nghĩa là giá trị cốt lõi chưa được xác thực.
    </div>

    <!-- Bảng dữ liệu retention -->
    <div class="section">
      <div class="section-label">Dữ liệu retention</div>
      <div class="table-wrap">
        <table class="r-table">
          <thead>
            <tr>
              <th>Ngày đăng ký</th>
              <th>Số người đăng ký</th>
              <th>Retention D1</th>
              <th>Retention D7</th>
              <th>Retention D30</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in retentionData" :key="r.date">
              <td>{{ r.date }}</td>
              <td>{{ r.users }}</td>
              <td :class="rateClass(r.day1)">{{ r.day1 }}%</td>
              <td :class="rateClass(r.day7)">{{ r.day7 }}%</td>
              <td :class="rateClass(r.day30)">{{ r.day30 }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Đường cong retention -->
    <div class="section">
      <div class="section-label">Đường cong retention</div>
      <div class="chart-wrap">
        <svg viewBox="0 0 400 210" class="curve-svg">
          <!-- Trục tọa độ -->
          <line x1="40" y1="180" x2="380" y2="180" stroke="#666" stroke-width="1" />
          <line x1="40" y1="20" x2="40" y2="180" stroke="#666" stroke-width="1" />

          <!-- Nhãn trục Y -->
          <text x="12" y="30" font-size="10" fill="#999">100%</text>
          <text x="17" y="100" font-size="10" fill="#999">50%</text>
          <text x="25" y="183" font-size="10" fill="#999">0</text>

          <!-- Đường cong -->
          <template v-for="c in curves" :key="c.label">
            <polyline
              :points="points(c.data)"
              fill="none"
              :stroke="c.color"
              stroke-width="2"
            />
            <circle
              v-for="(v, i) in c.data"
              :key="i"
              :cx="60 + i * 50"
              :cy="180 - v * 1.6"
              r="3.5"
              :fill="c.color"
            />
          </template>

          <!-- Nhãn trục X -->
          <text
            v-for="(d, i) in ['D1','D2','D3','D4','D5','D6','D7']"
            :key="d"
            :x="60 + i * 50"
            y="196"
            font-size="10"
            fill="#999"
            text-anchor="middle"
          >{{ d }}</text>
        </svg>

        <div class="legend">
          <div v-for="c in curves" :key="c.label" class="legend-item">
            <span class="legend-dot" :style="{ background: c.color }"></span>
            <span class="legend-text">{{ c.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.retention-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.demo-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon { font-size: 18px; }
.title { font-weight: 600; font-size: 15px; }
.subtitle { font-size: 12px; color: var(--vp-c-text-3); margin-left: auto; }

.intro-text {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hl { color: var(--vp-c-brand); font-weight: 600; }

.section { padding: 16px 20px; }
.section-label { font-weight: 600; font-size: 13px; margin-bottom: 10px; }

.table-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.r-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.r-table th,
.r-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.r-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}

.r-table tbody tr:hover { background: var(--vp-c-bg-soft); }

.high { color: #22c55e; font-weight: 600; }
.mid  { color: #f59e0b; font-weight: 600; }
.low  { color: #ef4444; font-weight: 600; }

.chart-wrap {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.curve-svg { width: 100%; height: auto; }

.legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-text { color: var(--vp-c-text-2); }
</style>
