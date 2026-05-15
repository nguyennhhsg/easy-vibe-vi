<template>
  <div class="gcc-root">
    <p class="gcc-desc">Lưu bảng này lại, lúc nào quên lệnh thì xem ngay:</p>
    <div class="gcc-chart-wrap">
      <div class="chart-header">
        <span class="y-axis-label">Tần suất dùng</span>
        <div class="chart-area">
          <svg class="chart-svg" :viewBox="`0 0 ${chartWidth} ${height}`" preserveAspectRatio="none" :width="chartWidth" :height="height">
            <!-- Grid lines (horizontal) -->
            <line v-for="y in gridY" :key="y" :x1="padding.left" :y1="y" :x2="chartWidth - padding.right" :y2="y" class="grid-line" />
            <!-- Y axis labels (1-5) -->
            <text v-for="label in yLabels" :key="label.val" :x="padding.left - 8" :y="label.y" class="y-label">{{ label.val }}</text>
            <!-- Bars -->
            <rect v-for="(row, i) in rows" :key="i" :x="barX(i)" :y="barY(row)" :width="barW" :height="barHeight(row)" class="bar-rect">
              <title>{{ row.cmd }} — {{ row.freqLabel || levelLabel(row.level) }}</title>
            </rect>
            <!-- X axis: tên command + dòng mô tả ngắn bên dưới, xoay -45° -->
            <g v-for="(row, i) in rows" :key="'label-'+i">
              <text
                :x="barX(i) + barW / 2"
                :y="labelY"
                class="x-label"
                text-anchor="end"
                :transform="`rotate(-45, ${barX(i) + barW / 2}, ${labelY})`"
              >
                {{ row.cmd }}
              </text>
              <text
                :x="barX(i) + barW / 2"
                :y="labelY + 26"
                class="x-desc"
                text-anchor="end"
                :transform="`rotate(-45, ${barX(i) + barW / 2}, ${labelY + 26})`"
              >
                {{ row.desc }}
              </text>
            </g>
          </svg>
        </div>
        <div class="x-axis-label">Command <span class="scroll-hint">(có thể trượt ngang để xem)</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const rawRows = [
  { cmd: 'git init', desc: 'Khởi tạo Git repository trong thư mục hiện tại', level: 0, freqLabel: 'Một lần khi bắt đầu dự án' },
  { cmd: 'git status', desc: 'Xem trạng thái working area và staging area', level: 5, freqLabel: 'Cực kỳ thường xuyên' },
  { cmd: 'git add <file>', desc: 'Thêm file chỉ định vào staging area', level: 5, freqLabel: 'Mỗi lần trước khi commit' },
  { cmd: 'git add .', desc: 'Thêm tất cả thay đổi vào staging area', level: 5, freqLabel: '' },
  { cmd: 'git commit -m "..."', desc: 'Commit nội dung staging area kèm message', level: 5, freqLabel: '' },
  { cmd: 'git push', desc: 'Push lên remote repository', level: 5, freqLabel: '' },
  { cmd: 'git pull', desc: 'Pull nội dung mới nhất từ remote', level: 5, freqLabel: '' },
  { cmd: 'git log --oneline', desc: 'Xem lịch sử commit dạng rút gọn', level: 4, freqLabel: '' },
  { cmd: 'git checkout -b <branch>', desc: 'Tạo và chuyển sang branch mới', level: 4, freqLabel: '' },
  { cmd: 'git checkout <branch>', desc: 'Chuyển sang branch đã có', level: 4, freqLabel: '' },
  { cmd: 'git clone <url>', desc: 'Clone remote repository về máy', level: 4, freqLabel: '' },
  { cmd: 'git branch', desc: 'Xem tất cả branch local', level: 3, freqLabel: '' },
  { cmd: 'git merge <branch>', desc: 'Merge branch chỉ định vào branch hiện tại', level: 3, freqLabel: '' },
  { cmd: 'git stash', desc: 'Tạm lưu các thay đổi chưa commit (khi đổi task)', level: 3, freqLabel: '' },
  { cmd: 'git stash pop', desc: 'Khôi phục thay đổi đã stash trước đó', level: 3, freqLabel: '' },
  { cmd: 'git reset HEAD~1', desc: 'Hủy commit gần nhất (giữ thay đổi)', level: 3, freqLabel: '' },
  { cmd: 'git diff', desc: 'Xem khác biệt cụ thể giữa working area và staging', level: 3, freqLabel: '' },
  { cmd: 'git branch -d <branch>', desc: 'Xóa branch đã merge', level: 2, freqLabel: '' },
  { cmd: 'git remote add origin <url>', desc: 'Liên kết remote repository (chỉ một lần)', level: 0, freqLabel: 'Lúc khởi tạo dự án' },
]

const rows = computed(() => [...rawRows].sort((a, b) => b.level - a.level))

function levelLabel(level) {
  const map = { 5: 'Cực kỳ thường xuyên', 4: 'Thường xuyên', 3: 'Vừa', 2: 'Ít', 1: 'Rất ít', 0: 'Một lần' }
  return map[level] || ''
}

const barW = 24
const slotWidth = 88
const chartWidth = computed(() => rawRows.length * slotWidth + 44 + 24)
const height = 320
const padding = { top: 12, right: 24, bottom: 150, left: 44 }
const labelY = height - padding.bottom + 16

function barX(index) {
  return padding.left + index * slotWidth + (slotWidth - barW) / 2
}
function barHeight(row) {
  const plotHeight = height - padding.top - padding.bottom
  return Math.max(4, (row.level / 5) * plotHeight)
}
function barY(row) {
  const plotHeight = height - padding.top - padding.bottom
  return height - padding.bottom - barHeight(row)
}

const gridY = computed(() => {
  const plotHeight = height - padding.top - padding.bottom
  const step = plotHeight / 5
  return Array.from({ length: 6 }, (_, i) => padding.top + i * step)
})

const yLabels = computed(() => {
  const plotHeight = height - padding.top - padding.bottom
  const step = plotHeight / 5
  return Array.from({ length: 6 }, (_, i) => ({
    val: 5 - i,
    y: padding.top + i * step + 4,
  }))
})
</script>

<style scoped>
.gcc-root {
  margin: 1rem 0;
  font-size: 0.9rem;
}

.gcc-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.gcc-chart-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 8px 10px;
  margin-bottom: 1rem;
  max-width: 100%;
  overflow-x: auto;
}

.chart-header {
  position: relative;
}
.y-axis-label {
  position: absolute;
  left: -26px;
  top: 50%;
  transform: rotate(-90deg) translateX(50%);
  transform-origin: left center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.chart-area {
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 320px;
  -webkit-overflow-scrolling: touch;
}
.chart-svg {
  display: block;
}
.grid-line {
  stroke: var(--vp-c-divider);
  stroke-dasharray: 3 2;
  stroke-width: 1;
}
.y-label {
  font-size: 0.8rem;
  fill: var(--vp-c-text-3);
  text-anchor: end;
}
.bar-rect {
  fill: var(--vp-c-brand);
  rx: 2;
  transition: fill 0.2s;
  cursor: pointer;
}
.bar-rect:hover {
  fill: var(--vp-c-brand-2);
}
.x-label {
  font-size: 0.85rem;
  fill: var(--vp-c-text-2);
}
.x-desc {
  font-size: 0.72rem;
  fill: var(--vp-c-text-3);
}
.x-axis-label {
  margin-top: 0.25rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.scroll-hint {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
}
</style>
