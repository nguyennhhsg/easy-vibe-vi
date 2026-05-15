<template>
  <div class="boot-demo">
    <div class="demo-header">
      <span class="demo-title">Từ lúc bật nguồn đến khi hiện desktop</span>
    </div>

    <div class="main-layout">
      <!-- 左侧：模拟屏幕 -->
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <!-- Stage 0: tắt máy -->
              <div v-if="stage === 0" class="screen-off">
                <div class="power-icon">⏻</div>
                <div class="off-text">Nhấn nút nguồn để bắt đầu</div>
              </div>

              <!-- Stage 1: BIOS tự kiểm tra -->
              <div v-if="stage === 1" class="screen-bios">
                <div class="bios-line" v-for="(line, i) in biosLines" :key="i">{{ line }}</div>
                <div class="bios-cursor">_</div>
              </div>

              <!-- Stage 2: nạp kernel -->
              <div v-if="stage === 2" class="screen-kernel">
                <div class="kernel-logo">🐧</div>
                <div class="kernel-text">Loading kernel...</div>
                <div class="kernel-bar-wrap">
                  <div class="kernel-bar"></div>
                </div>
                <div class="kernel-modules">
                  <div v-for="m in kernelModules" :key="m">[ OK ] {{ m }}</div>
                </div>
              </div>

              <!-- Stage 3: khởi động các dịch vụ -->
              <div v-if="stage === 3" class="screen-services">
                <div class="svc-header">Starting system services...</div>
                <div class="svc-list">
                  <div v-for="s in services" :key="s.name" class="svc-item">
                    <span class="svc-status" :class="s.ok ? 'ok' : ''">{{ s.ok ? '●' : '○' }}</span>
                    <span>{{ s.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Stage 4: desktop -->
              <div v-if="stage === 4" class="screen-desktop">
                <div class="desktop-icons">
                  <div class="desktop-icon" v-for="ic in desktopIcons" :key="ic.label">
                    <span class="icon-emoji">{{ ic.icon }}</span>
                    <span class="icon-label">{{ ic.label }}</span>
                  </div>
                </div>
                <div class="taskbar">
                  <span class="taskbar-menu">☰</span>
                  <span class="taskbar-time">09:57</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chỉ báo tiến độ -->
        <div class="stage-dots">
          <div
            v-for="(s, i) in stages"
            :key="i"
            class="stage-dot"
            :class="{ active: stage === i, done: stage > i }"
          >
            <span class="dot-label">{{ s.short }}</span>
          </div>
        </div>

        <!-- Nút điều khiển -->
        <div class="controls">
          <button class="ctrl-btn" :disabled="stage <= 0" @click="prev">← Quay lại</button>
          <button class="ctrl-btn primary" v-if="stage === 0" @click="next">⏻ Bật máy</button>
          <button class="ctrl-btn primary" v-else-if="stage < 4" @click="next">Tiếp →</button>
          <button class="ctrl-btn" v-else @click="reset">↺ Khởi động lại</button>
        </div>
      </div>

      <!-- Bên phải: thông tin chi tiết -->
      <div class="info-panel">
        <div class="info-stage-header">
          <span class="info-stage-icon">{{ currentStage.icon }}</span>
          <div>
            <div class="info-stage-name">{{ currentStage.name }}</div>
            <div class="info-stage-desc">{{ currentStage.desc }}</div>
          </div>
        </div>

        <div class="info-operations">
          <div
            v-for="(op, i) in currentStage.operations"
            :key="i"
            class="op-card"
            :class="{ expanded: expandedOp === i }"
            @click="expandedOp = expandedOp === i ? -1 : i"
          >
            <div class="op-header">
              <span class="op-num">{{ i + 1 }}</span>
              <span class="op-icon">{{ op.icon }}</span>
              <span class="op-name">{{ op.name }}</span>
              <span class="op-toggle">{{ expandedOp === i ? '▾' : '▸' }}</span>
            </div>
            <transition name="expand">
              <div v-if="expandedOp === i" class="op-detail">
                <div class="op-what">{{ op.what }}</div>
                <div v-if="op.details" class="op-details">
                  <div v-for="(d, j) in op.details" :key="j" class="op-detail-item">
                    <span class="od-dot">•</span>
                    <span>{{ d }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div v-if="currentStage.analogy" class="info-analogy">
          <span class="analogy-icon">💡</span>
          <span>{{ currentStage.analogy }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stage = ref(0)
const expandedOp = ref(-1)

const biosLines = [
  'American Megatrends BIOS v2.20',
  'CPU: Intel Core i7 @ 3.60GHz ... OK',
  'Memory: 16384 MB ... OK',
  'GPU: NVIDIA GeForce RTX ... OK',
  'Keyboard ... OK',
  'Detecting drives ...',
  'SATA0: Samsung SSD 512GB',
  'Boot from Hard Disk ...'
]

const kernelModules = [
  'Started Memory Manager',
  'Started Process Scheduler',
  'Loaded disk driver',
  'Mounted root filesystem'
]

const services = [
  { name: 'Network Manager', ok: true },
  { name: 'Firewall (iptables)', ok: true },
  { name: 'Audio Service', ok: true },
  { name: 'SSH Server', ok: true },
  { name: 'Display Manager', ok: true },
  { name: 'System Logger', ok: true }
]

const desktopIcons = [
  { icon: '📁', label: 'Tệp' },
  { icon: '🌐', label: 'Trình duyệt' },
  { icon: '⚙️', label: 'Cài đặt' },
  { icon: '🗑️', label: 'Thùng rác' }
]

const stages = [
  {
    short: 'Tắt máy',
    icon: '⏻',
    name: 'Sẵn sàng',
    desc: 'Máy tính đang ở trạng thái tắt, nhấn nút nguồn để bắt đầu quy trình khởi động',
    operations: [
      {
        icon: '🔌', name: 'Cấp nguồn',
        what: 'Khi nhấn nút nguồn, bộ nguồn (PSU) chuyển điện xoay chiều thành điện một chiều, cấp điện cho bo mạch chủ, CPU, RAM...',
        details: ['Điện xoay chiều 220V → điện một chiều 12V/5V/3.3V', 'Bo mạch chủ nhận tín hiệu Power Good rồi mới bắt đầu hoạt động']
      },
      {
        icon: '⚡', name: 'Reset CPU',
        what: 'CPU nhận tín hiệu reset, xóa toàn bộ thanh ghi, nhảy đến địa chỉ cố định (0xFFFFFFF0) để thực thi lệnh đầu tiên.',
        details: ['Toàn bộ thanh ghi về 0', 'Con trỏ lệnh trỏ vào điểm vào của firmware BIOS/UEFI']
      }
    ],
    analogy: 'Giống như bạn bấm nút khởi động xe hơi — ắc-quy cấp điện, động cơ sẵn sàng đánh lửa.'
  },
  {
    short: 'BIOS POST',
    icon: '📟',
    name: 'BIOS/UEFI tự kiểm tra',
    desc: 'Firmware lần lượt kiểm tra phần cứng, sau khi đảm bảo mọi thứ ổn thì tìm thiết bị khởi động',
    operations: [
      {
        icon: '🧠', name: 'Kiểm tra RAM (POST)',
        what: 'Ghi dữ liệu test vào RAM rồi đọc lại để xác nhận từng thanh RAM hoạt động đúng.',
        details: ['Test ghi/đọc theo từng byte', 'Phát hiện dung lượng và tốc độ RAM', 'Lỗi sẽ phát tiếng bíp (1 dài 3 ngắn = lỗi RAM)']
      },
      {
        icon: '🎮', name: 'Kiểm tra card đồ họa',
        what: 'Khởi tạo card đồ họa, thử xuất hình. Nếu card lỗi, màn hình sẽ tối đen.',
        details: ['Nạp BIOS của card đồ họa', 'Đặt chế độ hiển thị cơ bản', 'Tiếng bíp lỗi: 1 dài 2 ngắn']
      },
      {
        icon: '⌨️', name: 'Kiểm tra thiết bị ngoại vi',
        what: 'Quét cổng USB/PS2, phát hiện bàn phím, chuột và các thiết bị nhập khác.',
        details: ['Liệt kê thiết bị USB', 'Kiểm tra phản hồi bàn phím', 'Không thiết yếu, thiếu cũng không cản trở khởi động']
      },
      {
        icon: '💾', name: 'Tìm thiết bị khởi động',
        what: 'Dựa theo thứ tự khởi động (Boot Order), lần lượt kiểm tra ổ cứng, USB, mạng để tìm thiết bị có thể boot.',
        details: ['Đọc cấu hình thứ tự khởi động trong CMOS', 'Kiểm tra chữ ký 0x55AA ở sector đầu của thiết bị', 'Khi tìm thấy thì nạp code boot vào RAM tại 0x7C00']
      }
    ],
    analogy: 'Giống kiểm tra an toàn trước khi máy bay cất cánh — cơ trưởng phải xác nhận động cơ, đồng hồ, nhiên liệu đều ổn; có vấn đề là không cất cánh.'
  },
  {
    short: 'Nạp kernel',
    icon: '⚙️',
    name: 'Nạp nhân hệ điều hành',
    desc: 'Bootloader tìm file kernel, nạp vào RAM, kernel tiếp quản toàn bộ máy tính',
    operations: [
      {
        icon: '📀', name: 'Bootloader',
        what: 'Bootloader trong sector đầu của ổ cứng (như GRUB, bootmgr) đọc bảng phân vùng và tìm vị trí file kernel.',
        details: ['Windows: bootmgr → đọc cấu hình BCD', 'Linux: GRUB → hiển thị menu chọn hệ điều hành', 'macOS: boot.efi → nạp thẳng kernel XNU']
      },
      {
        icon: '📦', name: 'Giải nén và nạp kernel',
        what: 'Kernel thường được lưu ở dạng nén, bootloader giải nén và copy vào vị trí xác định trong RAM.',
        details: ['Giải nén vmlinuz (Linux) hoặc nạp ntoskrnl.exe (Windows)', 'Kích thước kernel thường 5-15 MB']
      },
      {
        icon: '🧠', name: 'Khởi tạo quản lý bộ nhớ',
        what: 'Lập bảng trang bộ nhớ ảo, chia không gian kernel và không gian người dùng, để mỗi chương trình tưởng mình độc chiếm RAM.',
        details: ['Lập ánh xạ bảng trang', 'Không gian kernel: vùng địa chỉ cao', 'Không gian người dùng: vùng địa chỉ thấp, nơi chương trình chạy']
      },
      {
        icon: '📁', name: 'Mount root filesystem',
        what: 'Mount phân vùng ổ cứng làm thư mục gốc (/), từ đó hệ thống có thể đọc/ghi file.',
        details: ['Nhận diện loại filesystem (NTFS/ext4/APFS)', 'Mount thành / (Linux) hoặc C:\\ (Windows)', 'Nạp driver thiết bị']
      }
    ],
    analogy: 'Kernel giống như CEO mới nhậm chức — tiếp quản mọi phòng ban (phần cứng), bố trí nhân sự (tiến trình), tài chính (bộ nhớ), hậu cần (thiết bị) vào đúng vị trí.'
  },
  {
    short: 'Khởi động dịch vụ',
    icon: '🔧',
    name: 'Khởi động dịch vụ hệ thống',
    desc: 'Kernel khởi động tiến trình người dùng đầu tiên, lần lượt khởi chạy các dịch vụ nền theo thứ tự phụ thuộc',
    operations: [
      {
        icon: '🚀', name: 'Khởi động tiến trình init',
        what: 'Kernel khởi động tiến trình user-mode đầu tiên (PID=1), đây là "tổ tiên" của mọi tiến trình khác.',
        details: ['Linux: systemd hoặc init', 'Windows: smss.exe → csrss.exe → wininit.exe', 'Chịu trách nhiệm khởi chạy các dịch vụ theo cấu hình']
      },
      {
        icon: '🌐', name: 'Dịch vụ mạng',
        what: 'Khởi tạo driver card mạng, lấy địa chỉ IP qua DHCP, khởi động dịch vụ phân giải DNS.',
        details: ['Nạp driver card mạng', 'Gửi yêu cầu DHCP để lấy IP', 'Cấu hình địa chỉ máy chủ DNS']
      },
      {
        icon: '🔒', name: 'Dịch vụ bảo mật',
        what: 'Khởi động tường lửa, hệ thống xác thực người dùng để đảm bảo hệ thống an toàn.',
        details: ['Linux: tường lửa iptables/nftables', 'Windows: Windows Defender, Trung tâm bảo mật', 'Nạp trình quản lý đăng nhập, sẵn sàng xác thực người dùng']
      },
      {
        icon: '🔊', name: 'Đa phương tiện và dịch vụ khác',
        what: 'Khởi động dịch vụ âm thanh, in ấn, ghi log... để hệ thống có đầy đủ chức năng.',
        details: ['Bộ trộn âm thanh (PulseAudio/PipeWire)', 'Log hệ thống (journald/Event Log)', 'Tác vụ định kỳ (cron/Task Scheduler)']
      }
    ],
    analogy: 'Giống trung tâm thương mại trước giờ mở cửa — bảo vệ vào ca (bảo mật), điều hòa được bật (dịch vụ nền), quầy thu ngân online (mạng), tất cả sẵn sàng đón khách.'
  },
  {
    short: 'Sẵn sàng',
    icon: '🖥️',
    name: 'Hiển thị môi trường desktop',
    desc: 'Giao diện đồ họa khởi động xong, desktop quen thuộc của bạn xuất hiện',
    operations: [
      {
        icon: '🎮', name: 'Nạp driver card đồ họa',
        what: 'Khởi tạo GPU, thiết lập độ phân giải, tần số quét và độ sâu màu.',
        details: ['Nạp driver NVIDIA/AMD/Intel', 'Đặt độ phân giải (ví dụ 1920×1080)', 'Bật tăng tốc phần cứng']
      },
      {
        icon: '🪟', name: 'Khởi động display server',
        what: 'Hệ thống quản lý cửa sổ khởi động, chịu trách nhiệm vẽ, xếp lớp và tương tác cho mọi cửa sổ.',
        details: ['Windows: Desktop Window Manager (DWM)', 'Linux: X Server hoặc Wayland', 'macOS: WindowServer']
      },
      {
        icon: '🎨', name: 'Render môi trường desktop',
        what: 'Vẽ hình nền, biểu tượng desktop, thanh tác vụ, khay hệ thống và các thành phần giao diện khác.',
        details: ['Windows: explorer.exe vẽ desktop', 'Linux: môi trường GNOME/KDE/XFCE', 'macOS: Finder + Dock']
      },
      {
        icon: '👆', name: 'Chờ thao tác người dùng',
        what: 'Con trỏ chuột xuất hiện, bàn phím sẵn sàng, hệ thống đã vào trạng thái tương tác hoàn toàn.',
        details: ['Nạp cấu hình và tùy chọn của người dùng', 'Khôi phục phiên trước (nếu được thiết lập)', 'Các chương trình tự khởi động bắt đầu chạy']
      }
    ],
    analogy: 'Rèm sân khấu kéo lên, đèn bật sáng — sân khấu (cửa sổ) đã dựng xong, diễn viên (biểu tượng) đã vào vị trí, chờ khán giả (bạn) tương tác lần đầu.'
  }
]

const currentStage = computed(() => stages[stage.value])

function next() {
  if (stage.value < 4) {
    stage.value++
    expandedOp.value = -1
  }
}
function prev() {
  if (stage.value > 0) {
    stage.value--
    expandedOp.value = -1
  }
}
function reset() {
  stage.value = 0
  expandedOp.value = -1
}
</script>

<style scoped>
.boot-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header { margin-bottom: 1rem; }
.demo-title { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-1); }

/* 主布局 */
.main-layout { display: flex; gap: 1rem; }

/* ===== 左侧屏幕 ===== */
.screen-panel { flex: 0 0 280px; display: flex; flex-direction: column; gap: 0.6rem; }
.monitor { background: #222; border-radius: 10px; padding: 3px; }
.monitor-bezel { background: #111; border-radius: 8px; overflow: hidden; }
.screen {
  width: 100%; aspect-ratio: 4/3; display: flex;
  align-items: center; justify-content: center;
  font-family: 'Courier New', monospace; transition: background 0.5s;
  overflow: hidden; position: relative;
}

/* 关机 */
.stage-0 { background: #000; }
.screen-off { text-align: center; color: #555; }
.power-icon { font-size: 2.5rem; margin-bottom: 0.3rem; }
.off-text { font-size: 0.6rem; }

/* BIOS */
.stage-1 { background: #000; align-items: flex-start; justify-content: flex-start; padding: 0.5rem; flex-direction: column; }
.screen-bios { width: 100%; }
.bios-line { color: #aaa; font-size: 0.5rem; line-height: 1.5; }
.bios-cursor { color: #fff; animation: blink 1s infinite; font-size: 0.55rem; }

/* 内核 */
.stage-2 { background: #1a1a2e; flex-direction: column; padding: 0.6rem; }
.screen-kernel { text-align: center; width: 100%; }
.kernel-logo { font-size: 1.8rem; margin-bottom: 0.3rem; }
.kernel-text { color: #ccc; font-size: 0.55rem; margin-bottom: 0.4rem; }
.kernel-bar-wrap {
  width: 70%; height: 4px; background: #333; border-radius: 2px;
  margin: 0 auto 0.5rem; overflow: hidden;
}
.kernel-bar {
  width: 100%; height: 100%;
  background: linear-gradient(90deg, #4ade80, #22d3ee);
  animation: loading 2s ease-in-out infinite;
}
.kernel-modules { text-align: left; width: 100%; }
.kernel-modules div { color: #4ade80; font-size: 0.45rem; line-height: 1.6; }

/* 服务 */
.stage-3 { background: #0f172a; flex-direction: column; align-items: flex-start; padding: 0.6rem; }
.screen-services { width: 100%; }
.svc-header { color: #94a3b8; font-size: 0.55rem; margin-bottom: 0.4rem; }
.svc-list { display: flex; flex-direction: column; gap: 0.15rem; }
.svc-item { color: #cbd5e1; font-size: 0.48rem; display: flex; align-items: center; gap: 0.3rem; }
.svc-status { font-size: 0.5rem; color: #475569; }
.svc-status.ok { color: #4ade80; }

/* 桌面 */
.stage-4 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); flex-direction: column; justify-content: space-between; padding: 0; }
.screen-desktop { flex: 1; display: flex; flex-direction: column; justify-content: space-between; width: 100%; }
.desktop-icons {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem; padding: 0.8rem 0.5rem; justify-items: center;
}
.desktop-icon { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
.icon-emoji { font-size: 1.3rem; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
.icon-label { font-size: 0.45rem; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.taskbar {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.25rem 0.5rem;
}
.taskbar-menu { color: white; font-size: 0.7rem; }
.taskbar-time { color: white; font-size: 0.5rem; }

/* 进度点 */
.stage-dots { display: flex; justify-content: center; gap: 0.3rem; }
.stage-dot {
  padding: 0.15rem 0.4rem; border-radius: 10px;
  font-size: 0.55rem; color: var(--vp-c-text-3);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}
.stage-dot.active {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.stage-dot.done { background: #10b981; color: white; border-color: #10b981; }
.dot-label { white-space: nowrap; }

/* 控制按钮 */
.controls { display: flex; gap: 0.4rem; justify-content: center; }
.ctrl-btn {
  padding: 0.35rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 0.68rem;
  cursor: pointer; transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ctrl-btn.primary {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.ctrl-btn.primary:hover { opacity: 0.9; }

/* ===== 右侧信息 ===== */
.info-panel { flex: 1; min-width: 0; }
.info-stage-header { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.7rem; }
.info-stage-icon { font-size: 1.4rem; }
.info-stage-name { font-size: 0.82rem; font-weight: 700; color: var(--vp-c-text-1); }
.info-stage-desc { font-size: 0.68rem; color: var(--vp-c-text-3); margin-top: 0.1rem; line-height: 1.4; }

/* 操作卡片 */
.info-operations { display: flex; flex-direction: column; gap: 0.35rem; }
.op-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px; padding: 0.5rem 0.6rem; cursor: pointer;
  transition: all 0.2s;
}
.op-card.expanded { border-color: var(--vp-c-brand); box-shadow: 0 1px 8px rgba(0,0,0,0.05); }
.op-header { display: flex; align-items: center; gap: 0.4rem; }
.op-num {
  width: 1.2rem; height: 1.2rem; border-radius: 50%;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.58rem; font-weight: 700; flex-shrink: 0;
}
.op-icon { font-size: 0.9rem; }
.op-name { flex: 1; font-size: 0.72rem; font-weight: 600; color: var(--vp-c-text-1); }
.op-toggle { font-size: 0.65rem; color: var(--vp-c-text-3); }

.op-detail { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--vp-c-divider); }
.op-what { font-size: 0.66rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 0.3rem; }
.op-details { display: flex; flex-direction: column; gap: 0.15rem; }
.op-detail-item {
  display: flex; align-items: flex-start; gap: 0.3rem;
  font-size: 0.62rem; color: var(--vp-c-text-3); line-height: 1.4;
}
.od-dot { color: var(--vp-c-brand); flex-shrink: 0; }

/* 类比 */
.info-analogy {
  display: flex; align-items: flex-start; gap: 0.4rem;
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-brand-soft); border-radius: 6px;
  font-size: 0.64rem; color: var(--vp-c-text-2);
  line-height: 1.5; font-style: italic;
}
.analogy-icon { font-size: 0.85rem; flex-shrink: 0; }

/* 展开动画 */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
}
</style>
