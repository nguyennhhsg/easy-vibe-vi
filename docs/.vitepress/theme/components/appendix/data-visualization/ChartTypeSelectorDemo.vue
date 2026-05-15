<!--
  ChartTypeSelectorDemo.vue
  Bộ chọn loại chart: gợi ý loại chart phù hợp dựa trên đặc tính dữ liệu
-->
<template>
  <div class="chart-selector-demo">
    <div class="header">
      <div class="title">Bộ chọn loại chart</div>
      <div class="subtitle">Chọn mục đích của dữ liệu để xem chart phù hợp</div>
    </div>

    <div class="purposes">
      <div
        v-for="p in purposes"
        :key="p.key"
        :class="['purpose-card', { active: activePurpose === p.key }]"
        @click="activePurpose = p.key"
      >
        <div class="purpose-icon">{{ p.icon }}</div>
        <div class="purpose-name">{{ p.name }}</div>
      </div>
    </div>

    <div v-if="currentPurpose" class="charts-panel">
      <div class="panel-title">{{ currentPurpose.name }}: Chart gợi ý</div>
      <div class="chart-list">
        <div
          v-for="chart in currentPurpose.charts"
          :key="chart.name"
          class="chart-item"
        >
          <div class="chart-visual">{{ chart.visual }}</div>
          <div class="chart-info">
            <div class="chart-name">{{ chart.name }}</div>
            <div class="chart-desc">{{ chart.desc }}</div>
            <div class="chart-example">Ví dụ: {{ chart.example }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePurpose = ref('comparison')

const purposes = [
  {
    key: 'comparison',
    name: 'So sánh',
    icon: '📊',
    charts: [
      { name: 'Biểu đồ cột', visual: '▐▐▐', desc: 'So sánh giá trị giữa các nhóm khác nhau', example: 'Đối chiếu doanh số các phòng ban' },
      { name: 'Biểu đồ cột nhóm', visual: '▐▐ ▐▐', desc: 'So sánh đa chiều theo nhóm', example: 'Doanh thu các dòng sản phẩm theo từng quý' },
      { name: 'Biểu đồ radar', visual: '◇', desc: 'So sánh đa chiều tổng hợp', example: 'Đánh giá năng lực ứng viên' }
    ]
  },
  {
    key: 'trend',
    name: 'Xu hướng',
    icon: '📈',
    charts: [
      { name: 'Biểu đồ đường', visual: '╱╲╱', desc: 'Cho thấy dữ liệu thay đổi theo thời gian', example: 'Đường tăng trưởng user theo tháng' },
      { name: 'Biểu đồ vùng', visual: '▓▓▓', desc: 'Nhấn mạnh lượng tích luỹ theo xu hướng', example: 'Thay đổi tỉ trọng traffic theo kênh' },
      { name: 'Biểu đồ bậc thang', visual: '┐└┐', desc: 'Cho thấy thay đổi tại các mốc thời gian rời rạc', example: 'Lịch sử điều chỉnh giá' }
    ]
  },
  {
    key: 'proportion',
    name: 'Tỉ lệ',
    icon: '🍩',
    charts: [
      { name: 'Biểu đồ tròn', visual: '◔', desc: 'Cho thấy tỉ lệ từng phần trong tổng thể', example: 'Phân bổ thị phần' },
      { name: 'Biểu đồ vòng', visual: '◎', desc: 'Biến thể của pie, có thể đặt số ở giữa', example: 'Tỉ lệ sử dụng ngân sách' },
      { name: 'Biểu đồ cột chồng', visual: '▐▐▐', desc: 'Cho thấy cơ cấu các phần và tổng', example: 'Cơ cấu doanh số theo vùng và ngành hàng' }
    ]
  },
  {
    key: 'distribution',
    name: 'Phân bố',
    icon: '🔔',
    charts: [
      { name: 'Histogram', visual: '▁▃▇▃▁', desc: 'Cho thấy phân bố tần suất của dữ liệu', example: 'Phân bố độ tuổi người dùng' },
      { name: 'Scatter plot', visual: '· ·· ·', desc: 'Cho thấy mối quan hệ giữa hai biến', example: 'Chi phí quảng cáo vs doanh số' },
      { name: 'Box plot', visual: '├─┤', desc: 'Cho thấy median, tứ phân vị và outlier của dữ liệu', example: 'Phân bố giá nhà theo thành phố' }
    ]
  },
  {
    key: 'relation',
    name: 'Quan hệ',
    icon: '🕸️',
    charts: [
      { name: 'Sankey', visual: '≋≋≋', desc: 'Cho thấy dòng chảy của lưu lượng hoặc năng lượng', example: 'Phễu chuyển đổi user' },
      { name: 'Network graph', visual: '⊙─⊙', desc: 'Cho thấy quan hệ giữa các node', example: 'Mạng xã hội' },
      { name: 'Heatmap', visual: '▓▒░', desc: 'Dùng độ đậm nhạt màu sắc để biểu diễn giá trị', example: 'Lượt truy cập theo trang và khung giờ' }
    ]
  }
]

const currentPurpose = computed(() => purposes.find(p => p.key === activePurpose.value))
</script>

<style scoped>
.chart-selector-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.purposes { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.purpose-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
  padding: 0.6rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.2s;
}
.purpose-card:hover { border-color: var(--vp-c-brand); }
.purpose-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.purpose-icon { font-size: 1.3rem; }
.purpose-name { font-size: 0.8rem; font-weight: 600; }
.panel-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.charts-panel { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.chart-list { display: flex; flex-direction: column; gap: 0.5rem; }
.chart-item { display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.chart-visual { font-size: 1.2rem; min-width: 50px; display: flex; align-items: center; justify-content: center; font-family: var(--vp-font-family-mono); color: var(--vp-c-brand); }
.chart-name { font-weight: 600; font-size: 0.85rem; }
.chart-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
.chart-example { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; }
</style>
