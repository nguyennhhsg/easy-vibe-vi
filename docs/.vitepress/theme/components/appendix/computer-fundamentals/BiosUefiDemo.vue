<template>
  <div class="bios-demo">
    <div class="demo-header">
      <span class="demo-icon">📟</span>
      <span class="demo-title">Quy trình làm việc của BIOS/UEFI</span>
      <span class="demo-hint">Nhấp từng bước để xem chi tiết</span>
    </div>

    <div class="timeline">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="timeline-item"
        :class="{ active: active === i, done: active > i }"
        @click="active = active === i ? -1 : i"
      >
        <div class="marker-col">
          <div class="dot">
            <span v-if="active > i" class="check">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div v-if="i < steps.length - 1" class="line"></div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="step-icon">{{ step.icon }}</span>
            <div class="card-titles">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-brief">{{ step.brief }}</div>
            </div>
            <span class="expand-icon">{{ active === i ? '▾' : '▸' }}</span>
          </div>

          <transition name="slide">
            <div v-if="active === i" class="card-detail">
              <div class="detail-desc">{{ step.detail }}</div>
              <div class="detail-visual">
                <div
                  v-for="(item, j) in step.items"
                  :key="j"
                  class="visual-item"
                  :class="{ 'error-item': item.error }"
                >
                  <span class="vi-icon">{{ item.icon }}</span>
                  <div class="vi-text">
                    <span class="vi-label">{{ item.label }}</span>
                    <span class="vi-desc">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
              <div v-if="step.analogy" class="analogy">
                <span class="analogy-icon">💡</span>
                <span class="analogy-text">{{ step.analogy }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="beep-note">
      <span class="beep-icon">🔔</span>
      <div class="beep-content">
        <div class="beep-title">Mã lỗi qua tiếng bíp</div>
        <div class="beep-desc">Nếu POST phát hiện sự cố, bo mạch chủ sẽ phát ra tiếng bíp. Số lần bíp tương ứng với từng loại lỗi:</div>
        <div class="beep-codes">
          <div v-for="code in beepCodes" :key="code.beeps" class="beep-code">
            <span class="beep-count">{{ code.beeps }}</span>
            <span class="beep-meaning">{{ code.meaning }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(-1)

const steps = [
  {
    icon: '🔍',
    name: 'Tự kiểm tra phần cứng (POST)',
    brief: 'Kiểm tra RAM, card đồ họa, bàn phím và các thành phần khác',
    detail: 'Power-On Self-Test là đoạn chương trình đầu tiên chạy sau khi bật máy. Firmware BIOS/UEFI lần lượt kiểm tra các thành phần phần cứng quan trọng, đảm bảo chúng hoạt động bình thường; mọi sự cố đều được phát hiện ở bước này.',
    items: [
      { icon: '🧠', label: 'Kiểm tra RAM', desc: 'Ghi dữ liệu thử nghiệm vào RAM rồi đọc lại để xác nhận từng thanh hoạt động đúng' },
      { icon: '🎮', label: 'Kiểm tra card đồ họa', desc: 'Khởi tạo card và thử xuất hình; nếu thất bại, màn hình sẽ tối đen' },
      { icon: '⌨️', label: 'Kiểm tra bàn phím/chuột', desc: 'Quét cổng PS/2 hoặc USB, kiểm tra thiết bị nhập đã kết nối và phản hồi' },
      { icon: '💾', label: 'Kiểm tra thiết bị lưu trữ', desc: 'Nhận diện ổ cứng, SSD, ổ đĩa quang và đọc thông tin thiết bị' },
      { icon: '❌', label: 'Báo lỗi', desc: 'Khi kiểm tra thất bại, dùng tiếng bíp hoặc mã lỗi trên màn hình để báo người dùng', error: true }
    ],
    analogy: 'Giống như kiểm tra an toàn trước khi máy bay cất cánh — cơ trưởng phải xác nhận động cơ, thiết bị, nhiên liệu đều ổn; có bất kỳ vấn đề gì cũng không thể cất cánh.'
  },
  {
    icon: '⚙️',
    name: 'Khởi tạo phần cứng',
    brief: 'Cài chế độ làm việc cho phần cứng, cấu hình bảng vector ngắt',
    detail: 'Sau khi POST đạt, BIOS/UEFI bắt đầu cấu hình các tham số làm việc của phần cứng: đặt xung CPU, timing RAM, cấu hình bộ điều khiển ngắt, dựng cầu nối giao tiếp giữa phần cứng và phần mềm.',
    items: [
      { icon: '🔧', label: 'Thiết lập chế độ làm việc', desc: 'Cấu hình xung CPU, timing RAM (CAS Latency) và các tham số khác' },
      { icon: '📋', label: 'Bảng vector ngắt', desc: 'Lập bảng ánh xạ số ngắt với trình xử lý để các sự kiện phần cứng được phản hồi đúng' },
      { icon: '🔌', label: 'Liệt kê thiết bị PCI', desc: 'Quét bus PCI/PCIe, cấp phát tài nguyên cho card đồ họa, card mạng, card âm thanh' },
      { icon: '🕐', label: 'Khởi tạo đồng hồ', desc: 'Đọc đồng hồ thời gian thực (RTC) trong CMOS, đồng bộ thời gian hệ thống' }
    ],
    analogy: 'Giống như chỉnh nhạc cụ trước buổi hòa nhạc — mỗi nhạc cụ (phần cứng) phải được chỉnh đúng cao độ (chế độ làm việc), nhạc trưởng (bộ điều khiển ngắt) phải điều khiển được mọi bè.'
  },
  {
    icon: '🔎',
    name: 'Tìm thiết bị khởi động',
    brief: 'Tìm thiết bị có thể boot theo thứ tự, đọc boot sector',
    detail: 'BIOS/UEFI dựa theo thứ tự khởi động (Boot Order) do người dùng cấu hình, lần lượt kiểm tra ổ cứng, USB, mạng... và tìm thiết bị đầu tiên chứa boot record hợp lệ, đọc boot sector của nó rồi giao quyền điều khiển.',
    items: [
      { icon: '📑', label: 'Đọc thứ tự khởi động', desc: 'Đọc danh sách ưu tiên thiết bị do người dùng cấu hình từ CMOS/NVRAM' },
      { icon: '💿', label: 'Kiểm tra boot sector', desc: 'Đọc sector đầu tiên của thiết bị, xác minh chữ ký 0x55AA ở cuối' },
      { icon: '🔀', label: 'Thử nhiều thiết bị', desc: 'Nếu thiết bị đầu không boot được, tự động thử thiết bị kế tiếp (ổ cứng → USB → mạng)' },
      { icon: '🚀', label: 'Nhảy đến code thực thi', desc: 'Nạp code boot sector vào RAM ở 0x7C00, CPU nhảy đến địa chỉ này để thực thi' }
    ],
    analogy: 'Giống như buổi sáng tìm phương tiện đi lại — kiểm tra trong gara có xe không (ổ cứng), không có thì tìm xe đạp chung trước cửa (USB), nếu vẫn không thì gọi xe công nghệ (boot mạng).'
  }
]

const beepCodes = [
  { beeps: '1 bíp ngắn', meaning: 'Khởi động bình thường, mọi thứ OK' },
  { beeps: '1 dài 2 ngắn', meaning: 'Lỗi card đồ họa hoặc chưa gắn chắc' },
  { beeps: '1 dài 3 ngắn', meaning: 'Lỗi RAM hoặc chưa gắn chắc' },
  { beeps: 'Bíp dài liên tục', meaning: 'Không phát hiện được RAM' },
  { beeps: 'Bíp ngắn liên tục', meaning: 'Nguồn cấp điện bất thường' }
]
</script>

<style scoped>
.bios-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.demo-icon { font-size: 1.2rem; }
.demo-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.demo-hint {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.timeline { display: flex; flex-direction: column; }

.timeline-item {
  display: flex;
  gap: 0.8rem;
  cursor: pointer;
}

.marker-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2rem;
  flex-shrink: 0;
}
.dot {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  transition: all 0.3s;
}
.timeline-item.active .dot {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  transform: scale(1.15);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}
.timeline-item.done .dot {
  background: #10b981;
  border-color: #10b981;
  color: white;
}
.check { font-size: 0.65rem; }
.line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-divider);
  min-height: 0.8rem;
  transition: background 0.3s;
}
.timeline-item.done .line { background: #10b981; opacity: 0.5; }
.timeline-item.active .line { background: var(--vp-c-brand); opacity: 0.4; }

.card {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  margin-bottom: 0.5rem;
  transition: all 0.25s;
}
.timeline-item.active .card {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.step-icon { font-size: 1.2rem; }
.card-titles { flex: 1; }
.step-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.step-brief {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  line-height: 1.4;
}
.expand-icon {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.card-detail {
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.detail-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}
.detail-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}
.visual-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.45rem 0.55rem;
}
.visual-item.error-item {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
}
.vi-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 0.05rem; }
.vi-text { display: flex; flex-direction: column; }
.vi-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.vi-desc {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
  margin-top: 0.1rem;
}

.analogy {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.6rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}
.analogy-icon { font-size: 0.85rem; flex-shrink: 0; }
.analogy-text {
  font-size: 0.66rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-style: italic;
}

.beep-note {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.8rem;
  padding: 0.7rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}
.beep-icon { font-size: 1.1rem; flex-shrink: 0; }
.beep-content { flex: 1; }
.beep-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}
.beep-desc {
  font-size: 0.66rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}
.beep-codes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.beep-code {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
.beep-count {
  font-size: 0.62rem;
  font-weight: 700;
  color: #f59e0b;
  white-space: nowrap;
}
.beep-meaning {
  font-size: 0.62rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}
.slide-enter-to, .slide-leave-from {
  opacity: 1;
  max-height: 30rem;
}

@media (max-width: 640px) {
  .detail-visual { grid-template-columns: 1fr; }
  .demo-hint { display: none; }
  .beep-codes { flex-direction: column; }
}
</style>
