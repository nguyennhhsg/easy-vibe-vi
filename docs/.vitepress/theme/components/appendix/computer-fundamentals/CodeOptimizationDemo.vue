<template>
  <div class="code-optimization-demo">
    <h4>⚡ Tối ưu compiler: giúp code tự động chạy nhanh hơn</h4>
    <p class="desc">Chọn một kỹ thuật tối ưu để xem compiler tự cải thiện code của bạn như thế nào</p>

    <div class="opt-selector">
      <button
        v-for="(opt, i) in optimizations"
        :key="i"
        :class="['opt-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="opt-icon">{{ opt.icon }}</span>
        <span>{{ opt.name }}</span>
      </button>
    </div>

    <div class="opt-detail">
      <div class="code-panel before">
        <div class="panel-header">📝 Trước tối ưu</div>
        <pre class="code-block">{{ optimizations[selected].before }}</pre>
      </div>
      <div class="arrow-col">
        <div class="arrow-box">
          <span class="arrow-icon">→</span>
          <span class="arrow-label">Compiler tối ưu</span>
        </div>
      </div>
      <div class="code-panel after">
        <div class="panel-header">🚀 Sau tối ưu</div>
        <pre class="code-block">{{ optimizations[selected].after }}</pre>
      </div>
    </div>

    <div class="opt-explain">
      <div class="explain-header">Nguyên lý của {{ optimizations[selected].name }}</div>
      <div class="explain-text">{{ optimizations[selected].explain }}</div>
      <div class="perf-gain">
        <span class="gain-label">Mức tăng hiệu năng:</span>
        <div class="gain-bar-bg">
          <div
            class="gain-bar"
            :style="{ width: optimizations[selected].gain + '%' }"
          ></div>
        </div>
        <span class="gain-value">{{ optimizations[selected].gain }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const optimizations = [
  {
    icon: '🧮',
    name: 'Gấp hằng số',
    before: `const width = 10
const height = 20
const area = width * height  // Tính khi chạy
console.log(area)`,
    after: `const area = 200  // Compiler tính sẵn lúc biên dịch
console.log(200)`,
    explain:
      'Compiler nhận ra width và height đều là hằng số, nên tính ngay 10 * 20 = 200 tại bước biên dịch. Khi chạy không cần thực hiện phép nhân nữa. Đây là tối ưu cơ bản và phổ biến nhất.',
    gain: 30
  },
  {
    icon: '💀',
    name: 'Loại bỏ code chết',
    before: `function process(x) {
  const result = x * 2
  return result

  // Đoạn code dưới không bao giờ chạy
  console.log("debug info")
  const unused = x + 1
  return unused
}`,
    after: `function process(x) {
  return x * 2  // Chỉ giữ lại code có ích
}`,
    explain:
      'Compiler phân tích luồng điều khiển, thấy code sau return không bao giờ chạy nên xóa luôn. Đồng thời nhận ra biến result chỉ được gán rồi trả về ngay, nên inline biểu thức.',
    gain: 20
  },
  {
    icon: '🔄',
    name: 'Đưa bất biến ra ngoài vòng lặp',
    before: `const arr = [1, 2, 3, ..., 10000]
for (let i = 0; i < arr.length; i++) {
  // arr.length đọc lại ở mỗi lần lặp
  process(arr[i])
}`,
    after: `const arr = [1, 2, 3, ..., 10000]
const len = arr.length  // Đưa ra ngoài, chỉ đọc một lần
for (let i = 0; i < len; i++) {
  process(arr[i])
}`,
    explain:
      'Trong vòng lặp, arr.length bị truy cập mỗi vòng nhưng giá trị không đổi. Compiler đưa phép tính bất biến này ra ngoài, tránh việc đọc lại 10000 lần.',
    gain: 45
  },
  {
    icon: '📦',
    name: 'Inline hàm',
    before: `function square(x) {
  return x * x
}

// Gọi 10000 lần
for (let i = 0; i < 10000; i++) {
  result += square(i)  // Mỗi lần đều có chi phí gọi hàm
}`,
    after: `// Loại bỏ chi phí gọi hàm
for (let i = 0; i < 10000; i++) {
  result += i * i  // Trải code thẳng vào, không còn chi phí gọi
}`,
    explain:
      'Gọi hàm có chi phí (lưu thanh ghi, nhảy, trở về). Với hàm nhỏ, compiler dán thẳng thân hàm vào nơi gọi để loại bỏ chi phí này. Compiler JIT (như V8) đặc biệt giỏi tối ưu kiểu này.',
    gain: 55
  },
  {
    icon: '🔗',
    name: 'Truyền hằng số',
    before: `const x = 10
const y = x + 5      // y = 15
const z = y * 2      // z = 30
console.log(z + 1)   // 31`,
    after: `console.log(31)  // Compiler theo dấu mọi giá trị hằng số
// x, y, z đều bị loại bỏ`,
    explain:
      'Compiler theo dấu giá trị từng biến: x=10 → y=15 → z=30 → z+1=31. Khi mọi biến trung gian đều là hằng số, cả chuỗi tính toán được hoàn tất tại bước biên dịch, lúc chạy chỉ cần in kết quả.',
    gain: 40
  }
]
</script>

<style scoped>
.code-optimization-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 {
  margin: 0 0 4px;
}
.desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin: 0 0 16px;
}
.opt-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.opt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.opt-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.opt-icon {
  font-size: 16px;
}
.opt-detail {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  margin-bottom: 14px;
  align-items: stretch;
}
.code-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.panel-header {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.code-block {
  padding: 10px 12px;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.arrow-icon {
  font-size: 24px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.arrow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.opt-explain {
  padding: 12px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
}
.explain-header {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}
.explain-text {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.perf-gain {
  display: flex;
  align-items: center;
  gap: 8px;
}
.gain-label {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.gain-bar-bg {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}
.gain-bar {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  transition: width 0.4s ease;
}
.gain-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
@media (max-width: 640px) {
  .opt-detail {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
