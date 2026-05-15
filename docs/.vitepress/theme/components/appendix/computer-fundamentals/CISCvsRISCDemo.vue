<template>
  <div class="cisc-risc-demo">
    <h4>⚔️ Hai triết lý thiết kế: CISC vs RISC</h4>
    <p class="desc">Nhấp vào chế độ so sánh để thấy điểm khác biệt cốt lõi của hai kiến trúc tập lệnh</p>

    <div class="arch-toggle">
      <button
        :class="['toggle-btn', { active: view === 'cisc' }]"
        @click="view = 'cisc'"
      >
        CISC (x86)
      </button>
      <button
        :class="['toggle-btn', { active: view === 'both' }]"
        @click="view = 'both'"
      >
        So sánh
      </button>
      <button
        :class="['toggle-btn', { active: view === 'risc' }]"
        @click="view = 'risc'"
      >
        RISC (ARM)
      </button>
    </div>

    <div v-if="view === 'both'" class="comparison-grid">
      <div v-for="dim in dimensions" :key="dim.label" class="dim-row">
        <div class="dim-cisc">{{ dim.cisc }}</div>
        <div class="dim-label">{{ dim.label }}</div>
        <div class="dim-risc">{{ dim.risc }}</div>
      </div>
    </div>

    <div v-else class="arch-detail">
      <div class="detail-card">
        <div class="card-header" :class="view">
          <span class="card-title">{{ archData[view].name }}</span>
          <span class="card-full">{{ archData[view].full }}</span>
        </div>
        <div class="card-philosophy">
          <span class="phi-label">Triết lý thiết kế:</span>
          <span>{{ archData[view].philosophy }}</span>
        </div>
        <div class="card-analogy">
          <span class="ana-label">Phép so sánh:</span>
          <span>{{ archData[view].analogy }}</span>
        </div>
        <div class="card-example">
          <div class="example-title">{{ archData[view].exampleTitle }}</div>
          <pre class="example-code">{{ archData[view].example }}</pre>
          <div class="example-note">{{ archData[view].exampleNote }}</div>
        </div>
        <div class="card-products">
          <span class="prod-label">Sản phẩm tiêu biểu:</span>
          <span v-for="p in archData[view].products" :key="p" class="prod-tag">{{ p }}</span>
        </div>
      </div>
    </div>

    <div class="real-world">
      <div class="rw-title">🌍 Lựa chọn trong thực tế</div>
      <div class="rw-items">
        <div class="rw-item">
          <span class="rw-device">💻 Máy tính của bạn</span>
          <span class="rw-arch">x86 (CISC)</span>
          <span class="rw-why">Tương thích với hệ sinh thái phần mềm hàng chục năm</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">📱 Điện thoại của bạn</span>
          <span class="rw-arch">ARM (RISC)</span>
          <span class="rw-why">Tiêu thụ ít điện, thời lượng pin lâu hơn</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">🍎 Apple Silicon</span>
          <span class="rw-arch">ARM (RISC)</span>
          <span class="rw-why">Hiệu năng cao tiêu thụ điện thấp, làm thay đổi cả thị trường laptop</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">🔬 Board RISC-V</span>
          <span class="rw-arch">RISC-V (RISC)</span>
          <span class="rw-why">Mã nguồn mở miễn phí, đang lên trong lĩnh vực IoT và giáo dục</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('both')

const dimensions = [
  { label: 'Số lượng lệnh', cisc: 'Hàng nghìn lệnh phức tạp', risc: 'Vài chục đến vài trăm lệnh tối giản' },
  { label: 'Từng lệnh đơn', cisc: 'Một lệnh làm được nhiều việc', risc: 'Một lệnh chỉ làm một việc' },
  { label: 'Độ dài lệnh', cisc: 'Thay đổi (1-15 byte)', risc: 'Cố định (thường 4 byte)' },
  { label: 'Tốc độ thực thi', cisc: 'Lệnh phức tạp nhiều chu kỳ', risc: 'Đa số thực thi trong một chu kỳ' },
  { label: 'Mức tiêu thụ điện', cisc: 'Khá cao', risc: 'Khá thấp' },
  { label: 'Pipeline', cisc: 'Khó tối ưu (độ dài lệnh không đều)', risc: 'Dễ tối ưu (lệnh đồng đều)' },
  { label: 'Gánh nặng cho trình biên dịch', cisc: 'Nhẹ (phần cứng làm nhiều hơn)', risc: 'Nặng (phần mềm phải tối ưu nhiều hơn)' }
]

const archData = {
  cisc: {
    name: 'CISC',
    full: 'Complex Instruction Set Computer',
    philosophy: 'Làm phần cứng mạnh nhất có thể, một lệnh hoàn thành thao tác phức tạp, giảm gánh nặng cho trình biên dịch',
    analogy: 'Giống như dao đa năng Thụy Sĩ — có nhiều chức năng nhưng từng chức năng chưa chắc tốt nhất',
    exampleTitle: 'Dùng một lệnh để làm "phép cộng tại bộ nhớ"',
    example: 'ADD [0x1000], R1\n; Một lệnh hoàn thành: đọc bộ nhớ → cộng → ghi lại bộ nhớ\n; Bên trong CPU được chia thành nhiều vi thao tác',
    exampleNote: 'CISC cho phép lệnh tác động trực tiếp lên bộ nhớ, một lệnh có thể tương ứng 5-6 vi thao tác',
    products: ['Intel Core', 'AMD Ryzen', 'Máy chủ x86']
  },
  risc: {
    name: 'RISC',
    full: 'Reduced Instruction Set Computer',
    philosophy: 'Mỗi lệnh đơn giản và nhanh nhất có thể, thao tác phức tạp được tạo thành từ nhiều lệnh đơn giản',
    analogy: 'Giống một bộ dụng cụ chuyên dụng — mỗi dụng cụ chỉ làm một việc nhưng làm rất nhanh và tốt',
    exampleTitle: 'Dùng ba lệnh để làm cùng "phép cộng tại bộ nhớ"',
    example: 'LOAD  R2, [0x1000]  ; Bước 1: đọc dữ liệu từ bộ nhớ vào thanh ghi\nADD   R2, R2, R1    ; Bước 2: cộng giữa các thanh ghi\nSTORE R2, [0x1000]  ; Bước 3: ghi kết quả về bộ nhớ',
    exampleNote: 'RISC yêu cầu dữ liệu phải được nạp vào thanh ghi trước, phép toán chỉ thực hiện giữa các thanh ghi, kết quả sau đó được ghi lại bộ nhớ',
    products: ['Apple chip M', 'Qualcomm Snapdragon', 'AWS Graviton', 'RISC-V']
  }
}
</script>

<style scoped>
.cisc-risc-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }

.arch-toggle { display: flex; gap: 4px; margin-bottom: 16px; background: var(--vp-c-bg); border-radius: 8px; padding: 4px; }
.toggle-btn {
  flex: 1; padding: 8px; border: none; border-radius: 6px;
  background: transparent; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s;
}
.toggle-btn.active { background: var(--vp-c-brand-1); color: #fff; }

.comparison-grid { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.dim-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; }
.dim-cisc, .dim-risc {
  padding: 8px 12px; border-radius: 6px; font-size: 12px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.dim-cisc { text-align: right; }
.dim-label {
  padding: 4px 10px; background: var(--vp-c-brand-1); color: #fff;
  border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap;
}

.arch-detail { margin-bottom: 16px; }
.detail-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); overflow: hidden; }
.card-header { padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.card-header.cisc { background: #dbeafe; }
.card-header.risc { background: #dcfce7; }
.card-title { font-size: 16px; font-weight: 700; }
.card-full { font-size: 12px; color: var(--vp-c-text-3); }
.card-philosophy, .card-analogy { padding: 8px 14px; font-size: 13px; border-bottom: 1px solid var(--vp-c-divider); }
.phi-label, .ana-label { font-weight: 600; font-size: 12px; color: var(--vp-c-text-3); margin-right: 6px; }
.card-example { padding: 12px 14px; border-bottom: 1px solid var(--vp-c-divider); }
.example-title { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.example-code { padding: 8px 10px; margin: 0; font-size: 12px; line-height: 1.5; background: var(--vp-c-bg-soft); border-radius: 4px; white-space: pre-wrap; }
.example-note { font-size: 11px; color: var(--vp-c-text-3); margin-top: 6px; }
.card-products { padding: 10px 14px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.prod-label { font-size: 12px; color: var(--vp-c-text-3); font-weight: 600; }
.prod-tag { font-size: 11px; padding: 2px 8px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); border-radius: 4px; }

.real-world { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.rw-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.rw-items { display: flex; flex-direction: column; gap: 6px; }
.rw-item { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 6px 8px; background: var(--vp-c-bg); border-radius: 6px; }
.rw-device { font-weight: 600; min-width: 110px; }
.rw-arch { padding: 2px 8px; background: var(--vp-c-brand-soft); border-radius: 4px; font-weight: 500; white-space: nowrap; }
.rw-why { color: var(--vp-c-text-2); }

@media (max-width: 640px) {
  .dim-row { grid-template-columns: 1fr; gap: 4px; }
  .dim-cisc { text-align: left; }
  .dim-label { justify-self: start; }
  .rw-item { flex-wrap: wrap; }
}
</style>
