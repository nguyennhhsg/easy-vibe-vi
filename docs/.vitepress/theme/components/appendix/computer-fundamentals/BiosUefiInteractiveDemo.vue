<template>
  <div class="bios-demo">
    <div class="demo-header">
      <span class="demo-title">Quy trình làm việc của BIOS/UEFI</span>
    </div>

    <div class="main-layout">
      <!-- Bên trái: màn hình mô phỏng -->
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <!-- Stage 0: giới thiệu -->
              <div v-if="stage === 0" class="screen-intro">
                <div class="intro-icon">📟</div>
                <div class="intro-title">BIOS/UEFI</div>
                <div class="intro-desc">Nhấp để bắt đầu tìm hiểu<br>quy trình khởi động firmware</div>
              </div>

              <!-- Stage 1: POST tự kiểm tra -->
              <div v-if="stage === 1" class="screen-post">
                <div class="post-header">POST - Power On Self Test</div>
                <div class="post-list">
                  <div v-for="(item, i) in postItems" :key="i" class="post-item" :class="{ checking: currentCheck === i, done: currentCheck > i }">
                    <span class="post-icon">{{ currentCheck > i ? '✓' : (currentCheck === i ? '◐' : '○') }}</span>
                    <span class="post-name">{{ item.name }}</span>
                  </div>
                </div>
                <div v-if="currentCheck >= postItems.length" class="post-result">
                  <span class="result-ok">✓ Tất cả phần cứng đã được kiểm tra</span>
                </div>
              </div>

              <!-- Stage 2: khởi tạo phần cứng -->
              <div v-if="stage === 2" class="screen-init">
                <div class="init-header">Khởi tạo cấu hình phần cứng</div>
                <div class="init-visual">
                  <div class="hardware-grid">
                    <div v-for="(hw, i) in hardwareItems" :key="i" class="hw-item" :class="{ active: activeHw === i }">
                      <span class="hw-icon">{{ hw.icon }}</span>
                      <span class="hw-name">{{ hw.name }}</span>
                    </div>
                  </div>
                  <div class="init-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" :style="{ width: hwProgress + '%' }"></div>
                    </div>
                    <div class="progress-text">{{ hwProgress }}%</div>
                  </div>
                </div>
              </div>

              <!-- Stage 3: tìm thiết bị khởi động -->
              <div v-if="stage === 3" class="screen-boot">
                <div class="boot-header">Tìm thiết bị khởi động</div>
                <div class="boot-order">
                  <div class="order-label">Thứ tự khởi động:</div>
                  <div class="device-list">
                    <div v-for="(dev, i) in bootDevices" :key="i" class="device-item" :class="{ checking: currentDevice === i, found: foundDevice === i, skipped: foundDevice > i || (foundDevice === -1 && currentDevice > i) }">
                      <span class="device-num">{{ i + 1 }}</span>
                      <span class="device-icon">{{ dev.icon }}</span>
                      <span class="device-name">{{ dev.name }}</span>
                      <span class="device-status">{{ getDeviceStatus(i) }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="foundDevice >= 0" class="boot-result">
                  <span class="boot-ok">🚀 Khởi động từ {{ bootDevices[foundDevice].name }}</span>
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
          <button class="ctrl-btn primary" v-if="stage === 0" @click="next">Bắt đầu →</button>
          <button class="ctrl-btn primary" v-else-if="stage < 3" @click="next">Tiếp →</button>
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

        <!-- Mã lỗi tiếng bíp -->
        <div v-if="stage === 1" class="beep-codes">
          <div class="beep-header">
            <span class="beep-icon">🔔</span>
            <span class="beep-title">Mã lỗi qua tiếng bíp</span>
          </div>
          <div class="beep-list">
            <div v-for="code in beepCodes" :key="code.beeps" class="beep-item">
              <span class="beep-count">{{ code.beeps }}</span>
              <span class="beep-meaning">{{ code.meaning }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const stage = ref(0)
const expandedOp = ref(-1)
const currentCheck = ref(0)
const activeHw = ref(0)
const hwProgress = ref(0)
const currentDevice = ref(0)
const foundDevice = ref(-1)

const postItems = [
  { name: 'Kiểm tra RAM', icon: '🧠' },
  { name: 'Kiểm tra card đồ họa', icon: '🎮' },
  { name: 'Bàn phím/chuột', icon: '⌨️' },
  { name: 'Thiết bị lưu trữ', icon: '💾' }
]

const hardwareItems = [
  { name: 'CPU', icon: '🧠' },
  { name: 'RAM', icon: '💾' },
  { name: 'Card đồ họa', icon: '🎮' },
  { name: 'Card mạng', icon: '🌐' },
  { name: 'Card âm thanh', icon: '🔊' },
  { name: 'USB', icon: '🔌' }
]

const bootDevices = [
  { name: 'Ổ cứng', icon: '💿' },
  { name: 'USB', icon: '🔌' },
  { name: 'Mạng', icon: '🌐' }
]

const beepCodes = [
  { beeps: '1 ngắn', meaning: 'Khởi động bình thường' },
  { beeps: '1 dài 2 ngắn', meaning: 'Lỗi card đồ họa' },
  { beeps: '1 dài 3 ngắn', meaning: 'Lỗi RAM' },
  { beeps: 'Dài liên tục', meaning: 'Không phát hiện RAM' },
  { beeps: 'Ngắn liên tục', meaning: 'Nguồn bất thường' }
]

const stages = [
  {
    short: 'Giới thiệu',
    icon: '📟',
    name: 'BIOS/UEFI là gì?',
    desc: 'BIOS là chương trình đầu tiên chạy sau khi bật máy, lưu trong chip chỉ-đọc trên bo mạch chủ. UEFI là bản nâng cấp của BIOS — an toàn và hiện đại hơn.',
    operations: [
      {
        icon: '💾', name: 'BIOS (truyền thống)',
        what: 'Basic Input/Output System, giao diện firmware đã được dùng từ thập niên 1980.',
        details: ['Lưu trong chip ROM của bo mạch chủ', 'Chạy ở chế độ thực 16 bit', 'Hỗ trợ ổ cứng tối đa 2.2TB', 'Giao diện văn bản nền xanh']
      },
      {
        icon: '✨', name: 'UEFI (hiện đại)',
        what: 'Unified Extensible Firmware Interface, bản thay thế hiện đại cho BIOS.',
        details: ['Hỗ trợ chế độ 32/64 bit', 'Hỗ trợ ổ cứng lớn hơn 2.2TB', 'Giao diện cấu hình đồ họa', 'Khởi động an toàn (Secure Boot)']
      }
    ],
    analogy: 'BIOS/UEFI giống như "người gác cổng" của máy tính — thức dậy đầu tiên, kiểm tra mọi thứ rồi mới quyết định cho ai (hệ điều hành) bước vào.'
  },
  {
    short: 'POST',
    icon: '🔍',
    name: 'Tự kiểm tra phần cứng (POST)',
    desc: 'Power-On Self-Test, lần lượt kiểm tra các phần cứng quan trọng, đảm bảo chúng hoạt động bình thường.',
    operations: [
      {
        icon: '🧠', name: 'Kiểm tra RAM',
        what: 'Ghi dữ liệu test vào RAM rồi đọc lại để xác nhận từng thanh RAM hoạt động đúng.',
        details: ['Test ghi/đọc theo từng byte', 'Phát hiện dung lượng và tốc độ RAM', 'Lỗi sẽ phát tiếng bíp (1 dài 3 ngắn)']
      },
      {
        icon: '🎮', name: 'Kiểm tra card đồ họa',
        what: 'Khởi tạo card đồ họa, thử xuất hình. Nếu thất bại, màn hình sẽ tối đen.',
        details: ['Nạp BIOS của card đồ họa', 'Đặt chế độ hiển thị cơ bản', 'Tiếng bíp lỗi: 1 dài 2 ngắn']
      },
      {
        icon: '⌨️', name: 'Kiểm tra thiết bị ngoại vi',
        what: 'Quét cổng USB/PS2, phát hiện bàn phím, chuột và các thiết bị nhập khác.',
        details: ['Liệt kê thiết bị USB', 'Kiểm tra phản hồi bàn phím', 'Không phải thiết bị thiết yếu, thiếu cũng không ảnh hưởng khởi động']
      },
      {
        icon: '💾', name: 'Kiểm tra thiết bị lưu trữ',
        what: 'Nhận diện ổ cứng, SSD, ổ quang và đọc thông tin thiết bị.',
        details: ['Phát hiện thiết bị SATA/NVMe', 'Đọc model và dung lượng thiết bị', 'Chuẩn bị cho bước khởi động sau']
      }
    ],
    analogy: 'Giống kiểm tra an toàn trước khi máy bay cất cánh — cơ trưởng phải xác nhận động cơ, đồng hồ, nhiên liệu đều ổn; có vấn đề là không cất cánh.'
  },
  {
    short: 'Khởi tạo',
    icon: '⚙️',
    name: 'Khởi tạo phần cứng',
    desc: 'Sau khi POST đạt, cấu hình tham số làm việc của từng phần cứng, dựng cầu nối giao tiếp giữa phần cứng và phần mềm.',
    operations: [
      {
        icon: '🔧', name: 'Thiết lập chế độ làm việc',
        what: 'Cấu hình xung CPU, timing RAM (CAS Latency) và các tham số khác.',
        details: ['Đọc cấu hình người dùng trong CMOS', 'Áp dụng cấu hình ép xung (nếu có)', 'Đặt chế độ quản lý nguồn']
      },
      {
        icon: '📋', name: 'Bảng vector ngắt',
        what: 'Lập bảng ánh xạ số ngắt với trình xử lý để các sự kiện phần cứng được phản hồi đúng.',
        details: ['Cấu hình bộ điều khiển ngắt (PIC/APIC)', 'Cấp số ngắt IRQ', 'Đặt điểm vào trình xử lý ngắt']
      },
      {
        icon: '🔌', name: 'Liệt kê thiết bị PCI',
        what: 'Quét bus PCI/PCIe, cấp tài nguyên cho card đồ họa, card mạng, card âm thanh.',
        details: ['Phát hiện tất cả thiết bị PCI', 'Cấp địa chỉ I/O memory-mapped', 'Cấp tài nguyên ngắt']
      },
      {
        icon: '🕐', name: 'Khởi tạo đồng hồ',
        what: 'Đọc đồng hồ thời gian thực (RTC) trong CMOS, đồng bộ thời gian hệ thống.',
        details: ['Đọc đồng hồ phần cứng', 'Kiểm tra tính hợp lệ của thời gian', 'Cung cấp thời gian ban đầu cho hệ điều hành']
      }
    ],
    analogy: 'Giống chỉnh nhạc cụ trước buổi diễn — mỗi nhạc cụ (phần cứng) phải đúng cao độ (chế độ làm việc), nhạc trưởng (bộ điều khiển ngắt) phải điều khiển được mọi bè.'
  },
  {
    short: 'Khởi động',
    icon: '🔎',
    name: 'Tìm thiết bị khởi động',
    desc: 'Theo thứ tự khởi động, tìm thiết bị bootable, đọc boot sector, chuyển quyền điều khiển cho hệ điều hành.',
    operations: [
      {
        icon: '📑', name: 'Đọc thứ tự khởi động',
        what: 'Đọc danh sách ưu tiên thiết bị do người dùng đặt trong CMOS/NVRAM.',
        details: ['Ổ cứng → USB → mạng (thứ tự mặc định)', 'Người dùng có thể đổi trong BIOS', 'Lưu trên bộ nhớ không bay hơi']
      },
      {
        icon: '💿', name: 'Kiểm tra boot sector',
        what: 'Đọc sector đầu tiên của thiết bị, xác minh chữ ký 0x55AA ở cuối.',
        details: ['Đọc sector 0 (512 byte)', 'Kiểm tra byte 510-511 có bằng 0x55AA không', 'Xác minh tính hợp lệ của mã boot']
      },
      {
        icon: '🔀', name: 'Thử nhiều thiết bị',
        what: 'Nếu thiết bị đầu không khởi động được, tự động thử thiết bị tiếp theo.',
        details: ['Ổ cứng không có OS → thử USB', 'Không có USB → thử boot mạng', 'Tất cả thất bại → hiển thị thông báo lỗi']
      },
      {
        icon: '🚀', name: 'Nhảy đến code thực thi',
        what: 'Nạp code boot sector vào địa chỉ 0x7C00 trong RAM, CPU nhảy đến đây để thực thi.',
        details: ['Nạp 512 byte mã boot', 'Nhảy đến 0x7C00 để thực thi', 'Trao quyền điều khiển cho bootloader']
      }
    ],
    analogy: 'Giống buổi sáng tìm phương tiện — trước tiên ngó vào gara xem có xe không (ổ cứng), không có thì xem xe đạp ngoài cửa (USB), nếu vẫn không thì gọi xe công nghệ (boot mạng).'
  }
]

const currentStage = computed(() => stages[stage.value])

function getDeviceStatus(i) {
  if (foundDevice.value === i) return '✓ Có thể boot'
  if (foundDevice.value > i || (foundDevice.value === -1 && currentDevice.value > i)) return '✗ Bỏ qua'
  if (currentDevice.value === i) return 'Đang kiểm tra...'
  return 'Chờ'
}

const postTimer = ref(null)
const hwTimer = ref(null)
const bootTimer = ref(null)

onUnmounted(() => {
  if (postTimer.value) clearInterval(postTimer.value)
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (bootTimer.value) clearInterval(bootTimer.value)
})

// Animation tự kiểm tra POST
watch(() => stage.value, (newStage) => {
  if (postTimer.value) clearInterval(postTimer.value)
  if (newStage === 1) {
    currentCheck.value = 0
    postTimer.value = setInterval(() => {
      if (currentCheck.value < postItems.length) {
        currentCheck.value++
      } else {
        if (postTimer.value) clearInterval(postTimer.value)
      }
    }, 600)
  }
})

// Animation khởi tạo phần cứng
watch(() => stage.value, (newStage) => {
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (newStage === 2) {
    activeHw.value = 0
    hwProgress.value = 0
    hwTimer.value = setInterval(() => {
      if (hwProgress.value < 100) {
        hwProgress.value += 5
        activeHw.value = Math.floor(hwProgress.value / 20) % hardwareItems.length
      } else {
        if (hwTimer.value) clearInterval(hwTimer.value)
      }
    }, 100)
  }
})

// Animation tìm thiết bị khởi động
watch(() => stage.value, (newStage) => {
  if (bootTimer.value) clearInterval(bootTimer.value)
  if (newStage === 3) {
    currentDevice.value = 0
    foundDevice.value = -1
    let device = 0
    bootTimer.value = setInterval(() => {
      if (device < bootDevices.length) {
        currentDevice.value = device
        // Giả định thiết bị đầu tiên (ổ cứng) có thể boot
        if (device === 0) {
          setTimeout(() => {
            foundDevice.value = device
          }, 400)
          if (bootTimer.value) clearInterval(bootTimer.value)
        }
        device++
      } else {
        if (bootTimer.value) clearInterval(bootTimer.value)
      }
    }, 800)
  }
})

function next() {
  if (stage.value < 3) {
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
  currentCheck.value = 0
  activeHw.value = 0
  hwProgress.value = 0
  currentDevice.value = 0
  foundDevice.value = -1
  if (postTimer.value) clearInterval(postTimer.value)
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (bootTimer.value) clearInterval(bootTimer.value)
}
</script>

<style scoped>
.bios-demo {
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

/* 介绍 */
.stage-0 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
.screen-intro { text-align: center; color: #fff; }
.intro-icon { font-size: 2.5rem; margin-bottom: 0.3rem; }
.intro-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.3rem; }
.intro-desc { font-size: 0.6rem; color: #94a3b8; line-height: 1.5; }

/* POST */
.stage-1 { background: #000; flex-direction: column; padding: 0.6rem; align-items: flex-start; }
.screen-post { width: 100%; }
.post-header { color: #4ade80; font-size: 0.55rem; margin-bottom: 0.5rem; font-weight: 700; }
.post-list { display: flex; flex-direction: column; gap: 0.3rem; }
.post-item {
  display: flex; align-items: center; gap: 0.4rem;
  color: #64748b; font-size: 0.6rem;
  transition: all 0.3s;
}
.post-item.checking { color: #fbbf24; }
.post-item.done { color: #4ade80; }
.post-icon { width: 1rem; text-align: center; }
.post-result { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #333; }
.result-ok { color: #4ade80; font-size: 0.6rem; }

/* 初始化 */
.stage-2 { background: #0f172a; flex-direction: column; padding: 0.6rem; }
.screen-init { width: 100%; }
.init-header { color: #60a5fa; font-size: 0.55rem; margin-bottom: 0.5rem; font-weight: 700; }
.hardware-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem; margin-bottom: 0.6rem;
}
.hw-item {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.4rem; background: rgba(255,255,255,0.05);
  border-radius: 6px; transition: all 0.3s;
}
.hw-item.active { background: rgba(96, 165, 250, 0.3); transform: scale(1.05); }
.hw-icon { font-size: 1.2rem; margin-bottom: 0.1rem; }
.hw-name { font-size: 0.5rem; color: #94a3b8; }
.init-progress { display: flex; align-items: center; gap: 0.4rem; }
.progress-bar {
  flex: 1; height: 4px; background: #333; border-radius: 2px; overflow: hidden;
}
.progress-fill {
  height: 100%; background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transition: width 0.1s linear;
}
.progress-text { color: #60a5fa; font-size: 0.55rem; width: 2rem; text-align: right; }

/* 启动 */
.stage-3 { background: #1e1b4b; flex-direction: column; padding: 0.6rem; align-items: flex-start; }
.screen-boot { width: 100%; }
.boot-header { color: #a78bfa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.order-label { color: #94a3b8; font-size: 0.5rem; margin-bottom: 0.3rem; }
.device-list { display: flex; flex-direction: column; gap: 0.25rem; }
.device-item {
  display: flex; align-items: center; gap: 0.3rem;
  padding: 0.3rem 0.4rem; background: rgba(255,255,255,0.05);
  border-radius: 4px; font-size: 0.55rem; color: #64748b;
  transition: all 0.3s;
}
.device-item.checking { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
.device-item.found { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
.device-item.skipped { opacity: 0.5; }
.device-num {
  width: 1rem; height: 1rem; border-radius: 50%;
  background: rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; font-size: 0.5rem;
}
.device-icon { font-size: 0.8rem; }
.device-name { flex: 1; }
.device-status { font-size: 0.5rem; }
.boot-result { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(167, 139, 250, 0.3); }
.boot-ok { color: #4ade80; font-size: 0.6rem; }

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

/* 蜂鸣声错误码 */
.beep-codes {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.beep-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.beep-icon { font-size: 0.9rem; }
.beep-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.beep-list { display: flex; flex-direction: column; gap: 0.2rem; }
.beep-item {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.62rem;
}
.beep-count {
  padding: 0.1rem 0.3rem; background: var(--vp-c-brand-soft);
  border-radius: 4px; color: var(--vp-c-brand); font-weight: 600;
  min-width: 3rem; text-align: center;
}
.beep-meaning { color: var(--vp-c-text-2); }

/* 展开动画 */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
}
</style>
