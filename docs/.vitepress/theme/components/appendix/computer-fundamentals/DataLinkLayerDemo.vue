<template>
  <div class="data-link-demo">
    <div class="demo-header">
      <span class="title">Tầng liên kết dữ liệu: truyền frame</span>
      <span class="subtitle">Địa chỉ MAC định vị thiết bị như thế nào</span>
    </div>

    <div class="lan-scene">
      <div class="lan-title">Kịch bản mạng LAN</div>
      <div class="lan-devices">
        <div
          v-for="device in devices"
          :key="device.id"
          :class="[
            'lan-device',
            {
              active: activeDevice === device.id,
              sender: device.role === 'sender',
              receiver: device.role === 'receiver'
            }
          ]"
          @click="activeDevice = device.id"
        >
          <div class="device-icon">{{ device.icon }}</div>
          <div class="device-name">{{ device.name }}</div>
          <div class="device-mac">{{ device.mac }}</div>
          <div v-if="device.role" class="device-role">
            {{ device.roleText }}
          </div>
        </div>
      </div>

      <!-- Switch -->
      <div class="switch">
        <div class="switch-icon">🔄</div>
        <div class="switch-name">Switch</div>
        <div class="switch-desc">Chuyển tiếp frame dựa trên địa chỉ MAC</div>
      </div>
    </div>

    <!-- Cấu trúc frame -->
    <div class="frame-structure">
      <div class="frame-title">Cấu trúc frame Ethernet</div>
      <div class="frame-visual">
        <div class="frame-fields">
          <div
            v-for="(field, index) in frameFields"
            :key="index"
            :class="['frame-field', { highlighted: activeDevice !== null }]"
            :style="{ width: field.width }"
          >
            <div class="field-name">{{ field.name }}</div>
            <div class="field-value">{{ field.value }}</div>
            <div class="field-size">{{ field.size }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quá trình truyền -->
    <div class="transfer-process">
      <div class="process-title">Quá trình truyền frame</div>
      <div class="process-steps">
        <div
          v-for="(step, index) in transferSteps"
          :key="index"
          :class="['process-step', { active: activeStep === index }]"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Giao thức ARP -->
    <div class="arp-section">
      <div class="arp-title">ARP: ánh xạ địa chỉ IP sang địa chỉ MAC</div>
      <div class="arp-example">
        <div class="arp-question">
          <span class="question-icon">❓</span>
          <span class="question-text">Ai có địa chỉ IP 192.168.1.200?</span>
        </div>
        <div class="arp-arrow">↓ Phát tán (broadcast) trong LAN</div>
        <div class="arp-answer">
          <span class="answer-icon">✅</span>
          <span class="answer-text">Tôi đây! Địa chỉ MAC của tôi là 00:11:22:33:44:66</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeDevice = ref(null)
const activeStep = ref(0)

const devices = [
  {
    id: 'pc1',
    name: 'Máy tính A',
    icon: '💻',
    mac: '00:11:22:33:44:55',
    ip: '192.168.1.100',
    role: 'sender',
    roleText: 'Bên gửi'
  },
  {
    id: 'pc2',
    name: 'Máy tính B',
    icon: '🖥️',
    mac: '00:11:22:33:44:66',
    ip: '192.168.1.200',
    role: 'receiver',
    roleText: 'Bên nhận'
  },
  {
    id: 'printer',
    name: 'Máy in',
    icon: '🖨️',
    mac: '00:11:22:33:44:77',
    ip: '192.168.1.50'
  },
  {
    id: 'phone',
    name: 'Điện thoại',
    icon: '📱',
    mac: '00:11:22:33:44:88',
    ip: '192.168.1.150'
  }
]

const frameFields = [
  {
    name: 'MAC đích',
    value: '00:11:22:33:44:66',
    size: '6 byte',
    width: '18%'
  },
  {
    name: 'MAC nguồn',
    value: '00:11:22:33:44:55',
    size: '6 byte',
    width: '18%'
  },
  {
    name: 'Loại',
    value: '0x0800 (IPv4)',
    size: '2 byte',
    width: '12%'
  },
  {
    name: 'Dữ liệu',
    value: 'Gói IP...',
    size: '46-1500 byte',
    width: '44%'
  },
  {
    name: 'FCS',
    value: 'Mã kiểm tra',
    size: '4 byte',
    width: '8%'
  }
]

const transferSteps = [
  {
    title: 'Đóng gói thành frame',
    desc: 'Bên gửi đóng gói dữ liệu thành frame Ethernet, thêm địa chỉ MAC nguồn và MAC đích'
  },
  {
    title: 'Gửi đến switch',
    desc: 'Frame được truyền qua môi trường vật lý (cáp mạng hoặc Wi-Fi) đến switch'
  },
  {
    title: 'Switch chuyển tiếp',
    desc: 'Switch dựa vào MAC đích để chuyển frame đến cổng tương ứng'
  },
  {
    title: 'Bên nhận xử lý',
    desc: 'Bên nhận kiểm tra MAC đích, nếu khớp thì tiếp nhận và xử lý dữ liệu'
  }
]
</script>

<style scoped>
.data-link-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.lan-scene {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.lan-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.lan-devices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.lan-device {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.lan-device:hover {
  border-color: var(--vp-c-brand);
}

.lan-device.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.lan-device.sender {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.lan-device.receiver {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.device-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.device-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.device-mac {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.device-role {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 10px;
  display: inline-block;
}

.switch {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.switch-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.switch-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.switch-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.frame-structure {
  margin-bottom: 1.5rem;
}

.frame-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.frame-visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.frame-fields {
  display: flex;
  gap: 0.5rem;
}

.frame-field {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s;
}

.frame-field.highlighted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.field-name {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.field-value {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.field-size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.transfer-process {
  margin-bottom: 1.5rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.process-step {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.arp-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.arp-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.arp-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.arp-question,
.arp-answer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.arp-question {
  background: rgba(59, 130, 246, 0.1);
}

.arp-answer {
  background: rgba(16, 185, 129, 0.1);
  margin-bottom: 0;
}

.question-icon,
.answer-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.question-text,
.answer-text {
  font-size: 0.9rem;
}

.arp-arrow {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0.75rem 0;
}

@media (max-width: 768px) {
  .frame-fields {
    flex-wrap: wrap;
  }

  .frame-field {
    min-width: 100px;
  }
}
</style>
