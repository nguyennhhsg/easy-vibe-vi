<template>
  <div class="subnet-calculator">
    <div class="calculator-input">
      <div class="input-group">
        <label class="input-label">Địa chỉ IP</label>
        <input
          v-model="ipAddress"
          type="text"
          placeholder="Ví dụ: 192.168.1.0"
          class="ip-input"
        >
      </div>

      <div class="input-group">
        <label class="input-label">Subnet mask</label>
        <select
          v-model="cidr"
          class="cidr-select"
        >
          <option
            v-for="n in 32"
            :key="n"
            :value="n"
          >
            /{{ n }}
          </option>
        </select>
      </div>

      <button
        class="calculate-btn"
        @click="calculate"
      >
        Tính toán
      </button>
    </div>

    <div
      v-if="results"
      class="results"
    >
      <div class="result-section">
        <div class="section-title">
          Thông tin cơ bản
        </div>
        <div class="result-grid">
          <div class="result-item">
            <div class="result-label">
              Network address
            </div>
            <div class="result-value">
              {{ results.network }}
            </div>
          </div>
          <div class="result-item">
            <div class="result-label">
              Broadcast address
            </div>
            <div class="result-value">
              {{ results.broadcast }}
            </div>
          </div>
          <div class="result-item">
            <div class="result-label">
              Subnet mask
            </div>
            <div class="result-value">
              {{ results.mask }}
            </div>
          </div>
          <div class="result-item">
            <div class="result-label">
              Số host khả dụng
            </div>
            <div class="result-value">
              {{ results.hosts }}
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">
          Dải IP
        </div>
        <div class="range-display">
          <div class="range-item">
            <div class="range-label">
              IP đầu
            </div>
            <div class="range-value">
              {{ results.firstHost }}
            </div>
          </div>
          <div class="range-arrow">
            →
          </div>
          <div class="range-item">
            <div class="range-label">
              IP cuối
            </div>
            <div class="range-value">
              {{ results.lastHost }}
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">
          Biểu diễn nhị phân
        </div>
        <div class="binary-display">
          <div class="binary-row">
            <div class="binary-label">
              Địa chỉ IP
            </div>
            <div class="binary-value">
              {{ results.binaryIp }}
            </div>
          </div>
          <div class="binary-row">
            <div class="binary-label">
              Subnet mask
            </div>
            <div class="binary-value">
              {{ results.binaryMask }}
            </div>
          </div>
          <div class="binary-row">
            <div class="binary-label">
              Network address
            </div>
            <div class="binary-value">
              {{ results.binaryNetwork }}
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">
          Loại subnet
        </div>
        <div class="subnet-info">
          <div
            class="info-tag"
            :class="getSubnetClass(cidr)"
          >
            {{ getSubnetType(cidr) }}
          </div>
          <div class="info-desc">
            {{ getSubnetDescription(cidr) }}
          </div>
        </div>
      </div>
    </div>

    <div class="example-presets">
      <div class="presets-title">
        Ví dụ subnet thường gặp
      </div>
      <div class="presets-grid">
        <button
          v-for="(preset, index) in presets"
          :key="index"
          class="preset-btn"
          @click="applyPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <div class="info-title">
        💡 Kiến thức về subnetting
      </div>
      <div class="info-content">
        <div class="info-item">
          <strong>Subnet là gì?</strong>
          Chia một mạng lớn thành các mạng nhỏ hơn để nâng cao hiệu suất sử dụng địa chỉ và hiệu năng mạng.
        </div>
        <div class="info-item">
          <strong>Ký hiệu CIDR</strong>
          /24 nghĩa là 24 bit đầu là phần network, 8 bit sau là phần host.
        </div>
        <div class="info-item">
          <strong>Subnet mask thường gặp</strong>
          <br>
          /8 = 255.0.0.0 (mạng lớp A)
          <br>
          /16 = 255.255.0.0 (mạng lớp B)
          <br>
          /24 = 255.255.255.0 (mạng lớp C)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ipAddress = ref('192.168.1.0')
const cidr = ref(24)
const results = ref(null)

const presets = [
  { name: 'Mạng nhỏ /24', ip: '192.168.1.0', cidr: 24 },
  { name: 'Mạng gia đình /26', ip: '192.168.1.0', cidr: 26 },
  { name: 'Mạng lớn /16', ip: '192.168.0.0', cidr: 16 },
  { name: 'Mạng siêu lớn /8', ip: '10.0.0.0', cidr: 8 }
]

const calculate = () => {
  const ip = ipAddress.value.split('.').map(Number)
  const mask = cidr.value

  // Tính subnet mask
  const maskBits = Array(32)
    .fill(0)
    .map((_, i) => (i < mask ? 1 : 0))
  const maskBytes = []
  for (let i = 0; i < 4; i++) {
    maskBytes.push(
      maskBits.slice(i * 8, (i + 1) * 8).reduce((acc, bit) => acc * 2 + bit, 0)
    )
  }

  // Tính network address
  const networkBytes = ip.map((byte, i) => byte & maskBytes[i])

  // Tính broadcast address
  const hostBits = 32 - mask
  const broadcastBytes = [...networkBytes]
  if (hostBits <= 8) {
    broadcastBytes[3] |= (1 << hostBits) - 1
  } else if (hostBits <= 16) {
    broadcastBytes[2] |= (1 << (hostBits - 8)) - 1
    broadcastBytes[3] = 255
  } else if (hostBits <= 24) {
    broadcastBytes[1] |= (1 << (hostBits - 16)) - 1
    broadcastBytes[2] = 255
    broadcastBytes[3] = 255
  } else {
    broadcastBytes[0] |= (1 << (hostBits - 24)) - 1
    broadcastBytes[1] = 255
    broadcastBytes[2] = 255
    broadcastBytes[3] = 255
  }

  // Tính dải host khả dụng
  const firstHost = [...broadcastBytes]
  firstHost[3] = networkBytes[3] + 1

  const lastHost = [...broadcastBytes]
  lastHost[3] = broadcastBytes[3] - 1

  // Số host khả dụng
  const hosts = Math.pow(2, hostBits) - 2

  // Biểu diễn nhị phân
  const toBinary = (bytes) =>
    bytes.map((b) => b.toString(2).padStart(8, '0')).join('.')

  results.value = {
    network: networkBytes.join('.'),
    broadcast: broadcastBytes.join('.'),
    mask: maskBytes.join('.'),
    hosts: hosts > 0 ? hosts : 0,
    firstHost: firstHost.join('.'),
    lastHost: lastHost.join('.'),
    binaryIp: toBinary(ip),
    binaryMask: toBinary(maskBytes),
    binaryNetwork: toBinary(networkBytes)
  }
}

const applyPreset = (preset) => {
  ipAddress.value = preset.ip
  cidr.value = preset.cidr
  calculate()
}

const getSubnetType = (mask) => {
  if (mask <= 8) return 'Mạng lớp A'
  if (mask <= 16) return 'Mạng lớp B'
  if (mask <= 24) return 'Mạng lớp C'
  return 'Subnet nhỏ'
}

const getSubnetClass = (mask) => {
  if (mask <= 8) return 'class-a'
  if (mask <= 16) return 'class-b'
  if (mask <= 24) return 'class-c'
  return 'class-small'
}

const getSubnetDescription = (mask) => {
  if (mask <= 8) return 'Mạng siêu lớn, phù hợp cho nhà cung cấp dịch vụ internet'
  if (mask <= 16) return 'Mạng lớn, phù hợp cho công ty hoặc tổ chức'
  if (mask <= 24) return 'Mạng chuẩn, phù hợp cho doanh nghiệp nhỏ hoặc gia đình'
  return 'Subnet nhỏ, phù hợp cho phòng ban hoặc mục đích cụ thể'
}

// Tính lần đầu
calculate()
</script>

<style scoped>
.subnet-calculator {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.calculator-input {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.input-group {
  flex: 1;
  min-width: 200px;
}

.input-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  display: block;
}

.ip-input,
.cidr-select {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.ip-input:focus,
.cidr-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.calculate-btn {
  padding: 10px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.calculate-btn:hover {
  background: var(--vp-c-brand-dark);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.result-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
}

.section-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
}

.result-item {
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
}

.result-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 5px;
}

.result-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.range-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.range-item {
  flex: 1;
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.range-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 5px;
}

.range-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.range-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.binary-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.binary-row {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.binary-label {
  width: 100px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.binary-value {
  flex: 1;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.subnet-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.info-tag.class-a {
  background: #fee2e2;
  color: #dc2626;
}

.info-tag.class-b {
  background: #fef3c7;
  color: #d97706;
}

.info-tag.class-c {
  background: #dbeafe;
  color: #2563eb;
}

.info-tag.class-small {
  background: #d1fae5;
  color: #059669;
}

.info-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.example-presets {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
}

.presets-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 768px) {
  .presets-grid {
    grid-template-columns: 1fr;
  }
}

.preset-btn {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.info-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
