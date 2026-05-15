<template>
  <div class="network-layers">
    <div class="layers-stack">
      <div
        v-for="(layer, index) in layers"
        :key="layer.name"
        class="layer-card"
        :class="{ active: selectedLayer === index }"
        @click="selectedLayer = index"
      >
        <div class="layer-number">
          {{ index + 1 }}
        </div>
        <div class="layer-content">
          <div class="layer-name">
            {{ layer.name }}
          </div>
          <div class="layer-english">
            {{ layer.english }}
          </div>
          <div class="layer-protocols">
            {{ layer.protocols }}
          </div>
        </div>
        <div class="layer-icon">
          {{ layer.icon }}
        </div>
      </div>
    </div>

    <div
      v-if="selectedLayer !== null"
      class="layer-detail"
    >
      <div class="detail-title">
        {{ layers[selectedLayer].name }}
      </div>
      <div class="detail-desc">
        {{ layers[selectedLayer].description }}
      </div>
      <div class="detail-functions">
        <div class="function-title">
          Chức năng chính
        </div>
        <div class="function-list">
          <div
            v-for="(func, index) in layers[selectedLayer].functions"
            :key="index"
            class="function-item"
          >
            ✓ {{ func }}
          </div>
        </div>
      </div>
      <div class="detail-examples">
        <div class="example-title">
          Thiết bị thường gặp
        </div>
        <div class="example-list">
          <div
            v-for="(device, index) in layers[selectedLayer].devices"
            :key="index"
            class="example-item"
          >
            📡 {{ device }}
          </div>
        </div>
      </div>
    </div>

    <div class="data-flow">
      <div class="flow-title">
        Quá trình đóng gói dữ liệu (khi gửi)
      </div>
      <div class="flow-steps">
        <div
          v-for="(step, index) in 5"
          :key="index"
          class="flow-step"
        >
          <div class="step-label">
            {{ layers[4 - index].name }}
          </div>
          <div class="step-box">
            <span class="box-label">{{ layers[4 - index].dataUnit }}</span>
          </div>
          <div
            v-if="index < 4"
            class="step-arrow"
          >
            ↓ Thêm header
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLayer = ref(0)

const layers = [
  {
    name: 'Tầng ứng dụng',
    english: 'Application Layer',
    protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, SSH',
    icon: '📱',
    dataUnit: 'Data',
    description:
      'Cung cấp interface dịch vụ mạng trực tiếp cho các chương trình của người dùng (trình duyệt, email client...).',
    functions: [
      'Cung cấp interface mạng cho ứng dụng',
      'Định nghĩa giao thức giao tiếp giữa các ứng dụng',
      'Xử lý định dạng và mã hoá dữ liệu',
      'Xác thực và phân quyền người dùng'
    ],
    devices: ['Gateway', 'Firewall', 'Proxy server']
  },
  {
    name: 'Tầng giao vận',
    english: 'Transport Layer',
    protocols: 'TCP, UDP',
    icon: '🚚',
    dataUnit: 'Segment / Datagram',
    description: 'Đảm nhận giao tiếp đầu cuối, đảm bảo dữ liệu được truyền tin cậy từ nguồn đến đích.',
    functions: [
      'Phân đoạn và gom lại dữ liệu',
      'Đánh địa chỉ port (giao tiếp giữa các process)',
      'Kiểm soát luồng và tắc nghẽn',
      'Phát hiện và sửa lỗi (TCP)'
    ],
    devices: ['Firewall', 'Load balancer']
  },
  {
    name: 'Tầng mạng',
    english: 'Network Layer',
    protocols: 'IP, ICMP, IGMP, ARP',
    icon: '🌐',
    dataUnit: 'Packet',
    description: 'Đảm nhận việc định tuyến gói tin, đưa dữ liệu từ máy nguồn đến máy đích qua mạng.',
    functions: [
      'Định địa chỉ logic (địa chỉ IP)',
      'Định tuyến và chuyển tiếp',
      'Chuyển mạch gói',
      'Kiểm soát tắc nghẽn'
    ],
    devices: ['Router', 'Switch lớp 3']
  },
  {
    name: 'Tầng liên kết dữ liệu',
    english: 'Data Link Layer',
    protocols: 'Ethernet, Wi-Fi, PPP',
    icon: '🔗',
    dataUnit: 'Frame',
    description: 'Đảm nhận truyền dữ liệu giữa hai node nối trực tiếp, xử lý lỗi của tầng vật lý.',
    functions: [
      'Định địa chỉ vật lý (địa chỉ MAC)',
      'Đóng và mở frame',
      'Phát hiện lỗi (CRC)',
      'Kiểm soát luồng',
      'Điều khiển truy cập đường truyền (MAC)'
    ],
    devices: ['Switch', 'Bridge', 'Card mạng']
  },
  {
    name: 'Tầng vật lý',
    english: 'Physical Layer',
    protocols: 'Ethernet PHY, Wi-Fi Radio, USB',
    icon: '⚡',
    dataUnit: 'Bit',
    description: 'Đảm nhận truyền dòng bit thô (0 và 1) trên môi trường vật lý.',
    functions: [
      'Định nghĩa chuẩn thiết bị vật lý',
      'Quy cách môi trường truyền',
      'Truyền bit và đồng bộ',
      'Đặc tính điện và cơ học'
    ],
    devices: ['Repeater', 'Hub', 'Dây mạng', 'Cáp quang']
  }
]
</script>

<style scoped>
.network-layers {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.layers-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
}

.layer-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.layer-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(5px);
}

.layer-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.layer-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.layer-content {
  flex: 1;
}

.layer-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.layer-english {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.layer-protocols {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.layer-icon {
  font-size: 2rem;
}

.layer-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid var(--vp-c-brand);
}

.detail-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.detail-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin-bottom: 20px;
}

.detail-functions,
.detail-examples {
  margin-bottom: 15px;
}

.function-title,
.example-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.function-list,
.example-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.function-item,
.example-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding-left: 10px;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
}

.flow-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  text-align: center;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step-label {
  width: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: right;
}

.step-box {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  position: relative;
}

.box-label {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.step-arrow {
  width: 100px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
</style>
