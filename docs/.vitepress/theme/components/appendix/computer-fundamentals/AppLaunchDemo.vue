<template>
  <div class="launch-demo">
    <div class="demo-header">
      <span class="demo-icon">🌐</span>
      <span class="demo-title">Quá trình khởi động trình duyệt</span>
      <span class="demo-hint">Nhấn từng bước để xem chi tiết</span>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(-1)

const steps = [
  {
    icon: '👆',
    name: 'Nhấp đúp vào biểu tượng',
    brief: 'Người dùng kích hoạt yêu cầu khởi động, hệ điều hành bắt đầu phản hồi',
    detail: 'Khi bạn nhấp đúp vào biểu tượng trình duyệt trên desktop, trình quản lý cửa sổ của OS bắt được sự kiện chuột này, rồi tra bảng liên kết file để tìm đường dẫn tới file thực thi tương ứng.',
    items: [
      { icon: '🖱️', label: 'Bắt sự kiện chuột', desc: 'Trình quản lý cửa sổ phát hiện thao tác nhấp đúp và xác định mục tiêu' },
      { icon: '🔗', label: 'Phân giải shortcut', desc: 'Đọc đường dẫn đích trong file .lnk (Windows) hoặc .desktop (Linux)' },
      { icon: '📂', label: 'Tra liên kết file', desc: 'Tìm file thực thi tương ứng trong registry hoặc cơ sở dữ liệu MIME' }
    ],
    analogy: 'Giống như khi bạn bấm nút nguồn trên điều khiển TV, TV phải nhận diện bạn vừa bấm nút nào rồi mới quyết định hành động.'
  },
  {
    icon: '🔍',
    name: 'Tìm file thực thi',
    brief: 'Dựa vào liên kết file, định vị file .exe hoặc file thực thi của trình duyệt',
    detail: 'Hệ điều hành dùng đường dẫn để định vị file thực thi của trình duyệt trên ổ cứng (ví dụ chrome.exe), kiểm tra toàn vẹn và quyền truy cập, chuẩn bị nạp.',
    items: [
      { icon: '📋', label: 'Phân giải đường dẫn', desc: 'Chuyển đường dẫn trong shortcut thành vị trí thực tế trên ổ cứng' },
      { icon: '🔒', label: 'Kiểm tra quyền', desc: 'Xác nhận người dùng hiện tại có quyền chạy file này' },
      { icon: '✅', label: 'Xác thực chữ ký', desc: 'Kiểm tra chữ ký số để chắc file chưa bị sửa đổi (UAC trên Windows)' }
    ],
    analogy: 'Giống như khi bạn tìm một quyển sách: tra mục lục thư viện trước (đường dẫn), kiểm tra bạn có quyền mượn (quyền), rồi xác nhận sách không bị hỏng (chữ ký).'
  },
  {
    icon: '📋',
    name: 'Tạo tiến trình trình duyệt',
    brief: 'Tạo một tiến trình mới cho trình duyệt và cấp phát process ID',
    detail: 'Kernel OS gọi fork()+exec() (Linux) hoặc CreateProcess() (Windows), tạo mục mới trong bảng tiến trình, cấp một PID duy nhất và lập khối điều khiển tiến trình (PCB).',
    items: [
      { icon: '🆔', label: 'Cấp PID', desc: 'Cấp định danh tiến trình duy nhất cho tiến trình mới' },
      { icon: '📊', label: 'Tạo PCB', desc: 'Ghi nhận trạng thái, độ ưu tiên, ngữ cảnh thanh ghi cùng các metadata' },
      { icon: '🧠', label: 'Cấp không gian địa chỉ ảo', desc: 'Tạo không gian bộ nhớ ảo 4GB (32 bit) độc lập cho tiến trình' },
      { icon: '📑', label: 'Khởi tạo file descriptor', desc: 'Mở ba kênh I/O chuẩn stdin/stdout/stderr' }
    ],
    analogy: 'Giống như em bé mới sinh đi làm giấy khai sinh — cấp số chứng minh (PID), lập hồ sơ (PCB), cấp chỗ ở (bộ nhớ).'
  },
  {
    icon: '💾',
    name: 'Nạp code vào bộ nhớ',
    brief: 'Đọc mã chương trình trình duyệt từ ổ cứng vào bộ nhớ',
    detail: 'Bộ nạp (Loader) của OS phân tích định dạng file thực thi (PE/ELF), ánh xạ các đoạn code, data vào bộ nhớ ảo và nạp các thư viện liên kết động cần thiết (DLL/SO).',
    items: [
      { icon: '📦', label: 'Phân tích định dạng file', desc: 'Đọc header PE (Windows) hoặc ELF (Linux) để xác định vị trí các đoạn' },
      { icon: '🗺️', label: 'Ánh xạ bộ nhớ', desc: 'Ánh xạ các đoạn .text (code), .data (dữ liệu), .bss vào địa chỉ ảo' },
      { icon: '🔗', label: 'Liên kết động', desc: 'Nạp các thư viện chia sẻ DLL/SO, phân giải tham chiếu hàm' },
      { icon: '📍', label: 'Định vị lại', desc: 'Sửa các tham chiếu địa chỉ tuyệt đối trong code cho phù hợp vị trí nạp thực tế' }
    ],
    analogy: 'Giống chuyển nhà — bê đồ đạc (code) từ kho (ổ cứng) sang nhà mới (RAM), rồi đấu nối điện nước (thư viện liên kết).'
  },
  {
    icon: '🚀',
    name: 'Khởi tạo các module',
    brief: 'Khởi động main thread, engine render, engine mạng, JS engine...',
    detail: 'Hàm main() của trình duyệt bắt đầu chạy, lần lượt khởi tạo các module cốt lõi của kiến trúc đa tiến trình: tiến trình Browser chính, tiến trình GPU, tiến trình mạng...',
    items: [
      { icon: '🧵', label: 'Khởi động main thread', desc: 'Khởi tạo vòng lặp sự kiện (Event Loop), xử lý sự kiện UI và lập lịch tác vụ' },
      { icon: '🎨', label: 'Engine render', desc: 'Khởi tạo Blink/Gecko, sẵn sàng phân tích HTML/CSS' },
      { icon: '🌐', label: 'Module mạng', desc: 'Khởi động network stack, khởi tạo DNS cache, connection pool, quản lý cookie' },
      { icon: '⚡', label: 'JS engine', desc: 'Khởi tạo V8/SpiderMonkey, biên dịch mã JavaScript tích hợp sẵn' }
    ],
    analogy: 'Giống như một nhà hàng trước giờ khai trương — bếp (render), tiếp tân (UI), giao hàng (mạng), thu ngân (JS) cùng lúc sẵn sàng.'
  },
  {
    icon: '🖼️',
    name: 'Hiển thị cửa sổ trình duyệt',
    brief: 'Tất cả module sẵn sàng, giao diện trình duyệt xuất hiện trên màn hình',
    detail: 'Trình duyệt yêu cầu OS tạo cửa sổ, tiến trình GPU hợp thành và rasterize giao diện, cuối cùng đẩy pixel xuống card đồ họa và cửa sổ trình duyệt hiện ra trên màn hình.',
    items: [
      { icon: '🪟', label: 'Tạo cửa sổ', desc: 'Gọi API hệ thống để tạo cửa sổ native, đặt kích thước và vị trí' },
      { icon: '🎨', label: 'Vẽ UI', desc: 'Render thanh địa chỉ, tab, toolbar và các phần Chrome khác của trình duyệt' },
      { icon: '🖥️', label: 'GPU hợp thành', desc: 'Hợp thành các layer thành ảnh cuối, gửi xuống card đồ họa xuất ra' },
      { icon: '✨', label: 'Tải trang chủ', desc: 'Mở tab mới hoặc khôi phục phiên trước, trình duyệt sẵn sàng sử dụng' }
    ],
    analogy: 'Rèm sân khấu kéo lên, đèn bật sáng — sân khấu (cửa sổ) đã dựng xong, diễn viên (thành phần UI) đã vào vị trí, chờ khán giả (bạn) tương tác lần đầu.'
  }
]
</script>

<style scoped>
.launch-demo {
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
  transition: transform 0.2s;
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
}
</style>
