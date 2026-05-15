<!--
  DashboardLayoutDemo.vue
  Demo bố cục dashboard: minh hoạ các kiểu layout dashboard thường gặp
-->
<template>
  <div class="dashboard-demo">
    <div class="header">
      <div class="title">Các kiểu bố cục dashboard</div>
      <div class="subtitle">Bấm vào để xem các kiểu layout dashboard khác nhau</div>
    </div>

    <div class="layout-tabs">
      <div
        v-for="layout in layouts"
        :key="layout.key"
        :class="['tab', { active: activeLayout === layout.key }]"
        @click="activeLayout = layout.key"
      >
        {{ layout.name }}
      </div>
    </div>

    <div v-if="current" class="layout-preview">
      <div class="preview-title">{{ current.name }}</div>
      <div class="preview-desc">{{ current.desc }}</div>
      <div :class="['mock-dashboard', current.key]">
        <div
          v-for="(widget, i) in current.widgets"
          :key="i"
          :class="['widget', widget.type]"
        >
          <div class="widget-label">{{ widget.label }}</div>
        </div>
      </div>
      <div class="use-case">Tình huống áp dụng: {{ current.useCase }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayout = ref('overview')

const layouts = [
  {
    key: 'overview',
    name: 'Tổng quan',
    desc: 'KPI card ở trên + chart xu hướng ở giữa + bảng chi tiết ở dưới',
    useCase: 'Báo cáo hàng ngày cho ban lãnh đạo, dashboard vận hành',
    widgets: [
      { type: 'kpi', label: 'DAU 125k' },
      { type: 'kpi', label: 'Doanh thu 850tr' },
      { type: 'kpi', label: 'Conversion 3.2%' },
      { type: 'kpi', label: 'AOV 268k' },
      { type: 'chart-wide', label: 'Chart xu hướng' },
      { type: 'table', label: 'Bảng chi tiết' }
    ]
  },
  {
    key: 'comparison',
    name: 'So sánh',
    desc: 'Bố cục đối chiếu trái-phải, hợp với A/B test hoặc phân tích YoY/MoM',
    useCase: 'Báo cáo A/B test, phân tích đối thủ',
    widgets: [
      { type: 'half', label: 'Chỉ số nhóm thí nghiệm' },
      { type: 'half', label: 'Chỉ số nhóm đối chứng' },
      { type: 'chart-wide', label: 'Chart so sánh chênh lệch' },
      { type: 'table', label: 'Kiểm định ý nghĩa thống kê' }
    ]
  },
  {
    key: 'drill',
    name: 'Drill-down',
    desc: 'Khoan từ tổng hợp xuống chi tiết theo từng lớp, hỗ trợ khám phá tương tác',
    useCase: 'Phân tích bán hàng, phân tích hành vi user',
    widgets: [
      { type: 'chart-wide', label: 'Bản đồ doanh số toàn quốc (bấm tỉnh để drill)' },
      { type: 'half', label: 'Chart xếp hạng theo tỉnh' },
      { type: 'half', label: 'Pie chi tiết theo thành phố' },
      { type: 'table', label: 'Bảng chi tiết cấp cửa hàng' }
    ]
  },
  {
    key: 'realtime',
    name: 'Giám sát real-time',
    desc: 'Hiển thị màn hình lớn, dữ liệu tự refresh, hợp để chiếu lên TV',
    useCase: 'Màn hình sự kiện sale lớn, giám sát server',
    widgets: [
      { type: 'big-number', label: 'GMV real-time 12 tỷ' },
      { type: 'half', label: 'Đường cong lượng đơn real-time' },
      { type: 'half', label: 'Heatmap theo khu vực' },
      { type: 'kpi', label: 'Tỉ lệ thanh toán thành công' },
      { type: 'kpi', label: 'Response time trung bình' },
      { type: 'kpi', label: 'Số user online' }
    ]
  }
]

const current = computed(() => layouts.find(l => l.key === activeLayout.value))
</script>

<style scoped>
.dashboard-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layout-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.layout-preview { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.preview-title { font-weight: 700; font-size: 0.95rem; }
.preview-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.mock-dashboard { display: grid; gap: 0.4rem; margin-bottom: 0.75rem; grid-template-columns: repeat(4, 1fr); }
.widget {
  padding: 0.5rem; border-radius: 6px; text-align: center;
  font-size: 0.75rem; font-weight: 600; border: 1px dashed var(--vp-c-divider);
}
.widget.kpi { background: rgba(var(--vp-c-brand-rgb), 0.06); grid-column: span 1; }
.widget.chart-wide { background: rgba(34,197,94,0.06); grid-column: span 4; min-height: 50px; }
.widget.table { background: rgba(245,158,11,0.06); grid-column: span 4; }
.widget.half { background: rgba(99,102,241,0.06); grid-column: span 2; min-height: 40px; }
.widget.big-number { background: rgba(239,68,68,0.06); grid-column: span 4; min-height: 40px; font-size: 0.9rem; }
.widget-label { color: var(--vp-c-text-2); }
.use-case { font-size: 0.82rem; color: var(--vp-c-text-3); }
</style>
