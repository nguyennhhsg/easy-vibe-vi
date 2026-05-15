<!--
  DataQualityDemo.vue
  Demo các chiều của data quality: minh hoạ 6 chiều cốt lõi của chất lượng dữ liệu
-->
<template>
  <div class="data-quality-demo">
    <div class="header">
      <div class="title">Trình kiểm chất lượng dữ liệu</div>
      <div class="subtitle">Bấm vào các chiều khác nhau để xem ví dụ về vấn đề chất lượng dữ liệu</div>
    </div>

    <div class="dimensions">
      <div
        v-for="dim in dimensions"
        :key="dim.key"
        :class="['dim-card', { active: activeDim === dim.key }]"
        @click="activeDim = dim.key"
      >
        <div class="dim-icon">{{ dim.icon }}</div>
        <div class="dim-name">{{ dim.name }}</div>
      </div>
    </div>

    <div v-if="currentDim" class="detail-panel">
      <div class="detail-header">
        <span class="detail-icon">{{ currentDim.icon }}</span>
        <span class="detail-title">{{ currentDim.name }}</span>
        <span class="detail-desc">{{ currentDim.desc }}</span>
      </div>

      <div class="example-section">
        <div class="example bad">
          <div class="example-label bad-label">Dữ liệu lỗi</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.badData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.badData.rows" :key="i">
                <td
                  v-for="(cell, j) in row"
                  :key="j"
                  :class="{ 'cell-error': cell.error }"
                >{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example good">
          <div class="example-label good-label">Sau khi xử lý</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.goodData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.goodData.rows" :key="i">
                <td v-for="(cell, j) in row" :key="j">{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="quality-score">
        <div class="score-label">Điểm chất lượng</div>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: currentDim.score + '%', background: scoreColor(currentDim.score) }"
          ></div>
        </div>
        <div class="score-value">{{ currentDim.score }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDim = ref('completeness')

const dimensions = [
  {
    key: 'completeness', name: 'Tính đầy đủ', icon: '📋',
    desc: 'Dữ liệu có bị thiếu giá trị hay không',
    score: 72,
    badData: {
      cols: ['User ID', 'Họ tên', 'Email', 'SĐT'],
      rows: [
        [{ value: '001' }, { value: 'An' }, { value: 'an@mail.com' }, { value: '090xxxx1234' }],
        [{ value: '002' }, { value: 'Bình' }, { value: '', error: true }, { value: '', error: true }],
        [{ value: '003' }, { value: '', error: true }, { value: 'cuong@mail.com' }, { value: '091xxxx5678' }]
      ]
    },
    goodData: {
      cols: ['User ID', 'Họ tên', 'Email', 'SĐT'],
      rows: [
        [{ value: '001' }, { value: 'An' }, { value: 'an@mail.com' }, { value: '090xxxx1234' }],
        [{ value: '002' }, { value: 'Bình' }, { value: 'binh@mail.com' }, { value: '093xxxx9012' }],
        [{ value: '003' }, { value: 'Cường' }, { value: 'cuong@mail.com' }, { value: '091xxxx5678' }]
      ]
    }
  },
  {
    key: 'accuracy', name: 'Độ chính xác', icon: '🎯',
    desc: 'Giá trị dữ liệu có phản ánh đúng thực tế không',
    score: 65,
    badData: {
      cols: ['Order ID', 'Số tiền', 'Ngày', 'Trạng thái'],
      rows: [
        [{ value: 'ORD-101' }, { value: '-50.00', error: true }, { value: '2025-01-15' }, { value: 'Hoàn tất' }],
        [{ value: 'ORD-102' }, { value: '299.00' }, { value: '2025-13-01', error: true }, { value: 'Đã giao' }],
        [{ value: 'ORD-103' }, { value: '1500.00' }, { value: '2025-02-28' }, { value: 'Đã hoàn tiền', error: true }]
      ]
    },
    goodData: {
      cols: ['Order ID', 'Số tiền', 'Ngày', 'Trạng thái'],
      rows: [
        [{ value: 'ORD-101' }, { value: '50.00' }, { value: '2025-01-15' }, { value: 'Hoàn tất' }],
        [{ value: 'ORD-102' }, { value: '299.00' }, { value: '2025-01-13' }, { value: 'Đã giao' }],
        [{ value: 'ORD-103' }, { value: '1500.00' }, { value: '2025-02-28' }, { value: 'Hoàn tất' }]
      ]
    }
  },
  {
    key: 'consistency', name: 'Tính nhất quán', icon: '🔗',
    desc: 'Cùng một dữ liệu ở các hệ thống khác nhau có khớp không',
    score: 58,
    badData: {
      cols: ['Nguồn', 'Tên user', 'SĐT', 'Địa chỉ'],
      rows: [
        [{ value: 'CRM' }, { value: 'Nguyễn An' }, { value: '0938123412' }, { value: 'Quận 1, TP.HCM' }],
        [{ value: 'Hệ thống Order' }, { value: 'Nguyễn Văn An', error: true }, { value: '0938123412' }, { value: 'Q.1 HCM', error: true }],
        [{ value: 'Hệ thống CSKH' }, { value: 'Nguyễn An' }, { value: '0939999999', error: true }, { value: 'Quận 1, TP.HCM' }]
      ]
    },
    goodData: {
      cols: ['Nguồn', 'Tên user', 'SĐT', 'Địa chỉ'],
      rows: [
        [{ value: 'CRM' }, { value: 'Nguyễn An' }, { value: '0938123412' }, { value: 'Quận 1, TP.HCM' }],
        [{ value: 'Hệ thống Order' }, { value: 'Nguyễn An' }, { value: '0938123412' }, { value: 'Quận 1, TP.HCM' }],
        [{ value: 'Hệ thống CSKH' }, { value: 'Nguyễn An' }, { value: '0938123412' }, { value: 'Quận 1, TP.HCM' }]
      ]
    }
  },
  {
    key: 'timeliness', name: 'Tính kịp thời', icon: '⏰',
    desc: 'Dữ liệu có được cập nhật kịp thời không',
    score: 80,
    badData: {
      cols: ['SKU ID', 'Giá', 'Tồn kho', 'Cập nhật lúc'],
      rows: [
        [{ value: 'SKU-001' }, { value: '299k' }, { value: '50' }, { value: '2024-06-01', error: true }],
        [{ value: 'SKU-002' }, { value: '599k' }, { value: '0', error: true }, { value: '2024-03-15', error: true }],
        [{ value: 'SKU-003' }, { value: '199k' }, { value: '200' }, { value: '2025-02-20' }]
      ]
    },
    goodData: {
      cols: ['SKU ID', 'Giá', 'Tồn kho', 'Cập nhật lúc'],
      rows: [
        [{ value: 'SKU-001' }, { value: '259k' }, { value: '35' }, { value: '2025-02-25' }],
        [{ value: 'SKU-002' }, { value: '549k' }, { value: '12' }, { value: '2025-02-25' }],
        [{ value: 'SKU-003' }, { value: '199k' }, { value: '180' }, { value: '2025-02-25' }]
      ]
    }
  },
  {
    key: 'uniqueness', name: 'Tính duy nhất', icon: '🔑',
    desc: 'Dữ liệu có bị trùng lặp bản ghi không',
    score: 70,
    badData: {
      cols: ['User ID', 'Họ tên', 'Email', 'Đăng ký lúc'],
      rows: [
        [{ value: '001' }, { value: 'An' }, { value: 'an@mail.com' }, { value: '2025-01-01' }],
        [{ value: '005' }, { value: 'An', error: true }, { value: 'an@mail.com', error: true }, { value: '2025-01-15', error: true }],
        [{ value: '002' }, { value: 'Bình' }, { value: 'binh@mail.com' }, { value: '2025-01-10' }]
      ]
    },
    goodData: {
      cols: ['User ID', 'Họ tên', 'Email', 'Đăng ký lúc'],
      rows: [
        [{ value: '001' }, { value: 'An' }, { value: 'an@mail.com' }, { value: '2025-01-01' }],
        [{ value: '002' }, { value: 'Bình' }, { value: 'binh@mail.com' }, { value: '2025-01-10' }]
      ]
    }
  },
  {
    key: 'validity', name: 'Tính hợp lệ', icon: '✅',
    desc: 'Dữ liệu có tuân thủ định dạng và quy tắc đã định sẵn không',
    score: 75,
    badData: {
      cols: ['Field', 'Giá trị', 'Quy tắc'],
      rows: [
        [{ value: 'Email' }, { value: 'not-an-email', error: true }, { value: 'Phải chứa @' }],
        [{ value: 'Tuổi' }, { value: '-5', error: true }, { value: '0~150' }],
        [{ value: 'SĐT' }, { value: '1234', error: true }, { value: '10 chữ số' }]
      ]
    },
    goodData: {
      cols: ['Field', 'Giá trị', 'Quy tắc'],
      rows: [
        [{ value: 'Email' }, { value: 'user@mail.com' }, { value: 'Phải chứa @' }],
        [{ value: 'Tuổi' }, { value: '28' }, { value: '0~150' }],
        [{ value: 'SĐT' }, { value: '0938123456' }, { value: '10 chữ số' }]
      ]
    }
  }
]

const currentDim = computed(() => dimensions.find(d => d.key === activeDim.value))

function scoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}
</script>

<style scoped>
.data-quality-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.dimensions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.dim-card {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
}
.dim-card:hover { border-color: var(--vp-c-brand); }
.dim-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.dim-icon { font-size: 1.1rem; }
.dim-name { font-weight: 600; }
.detail-panel {
  padding: 1rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); margin-bottom: 1rem;
}
.detail-header { margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.detail-icon { font-size: 1.2rem; }
.detail-title { font-weight: 700; font-size: 1rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; }
.example-section { display: flex; gap: 1rem; margin-bottom: 1rem; }
.example { flex: 1; }
.example-label { font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; }
.bad-label { background: rgba(239,68,68,0.1); color: #ef4444; }
.good-label { background: rgba(34,197,94,0.1); color: #22c55e; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.data-table th { background: var(--vp-c-bg-soft); padding: 0.3rem 0.4rem; text-align: left; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.data-table td { padding: 0.3rem 0.4rem; border-bottom: 1px solid var(--vp-c-divider); }
.cell-error { background: rgba(239,68,68,0.1); color: #ef4444; font-weight: 600; }
.quality-score { display: flex; align-items: center; gap: 0.75rem; }
.score-label { font-weight: 600; font-size: 0.85rem; white-space: nowrap; }
.score-bar-bg { flex: 1; height: 10px; background: var(--vp-c-bg-soft); border-radius: 5px; overflow: hidden; }
.score-bar-fill { height: 100%; border-radius: 5px; transition: width 0.4s; }
.score-value { font-weight: 700; font-size: 0.9rem; font-family: var(--vp-font-family-mono); min-width: 40px; }
@media (max-width: 640px) { .example-section { flex-direction: column; } }
</style>
