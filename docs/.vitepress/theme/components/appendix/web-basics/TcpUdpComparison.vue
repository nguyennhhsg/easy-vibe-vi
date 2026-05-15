<template>
  <div class="tcp-udp-comparison">
    <div class="comparison-grid">
      <div class="protocol-card tcp">
        <div class="protocol-header">
          <div class="protocol-icon">
            🔒
          </div>
          <div class="protocol-title">
            TCP
          </div>
          <div class="protocol-subtitle">
            Transmission Control Protocol
          </div>
        </div>

        <div class="protocol-features">
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Truyền tin cậy
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Hướng kết nối
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Kiểm soát luồng
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Kiểm soát tắc nghẽn
            </div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">
              ✗
            </div>
            <div class="feature-text">
              Tốc độ chậm hơn
            </div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">
              ✗
            </div>
            <div class="feature-text">
              Chi phí cao hơn
            </div>
          </div>
        </div>

        <div class="protocol-example">
          <div class="example-title">
            Trường hợp sử dụng
          </div>
          <div class="example-tags">
            <span class="tag">Duyệt web</span>
            <span class="tag">Truyền file</span>
            <span class="tag">Gửi email</span>
          </div>
        </div>

        <div class="handshake-demo">
          <div class="demo-title">
            Bắt tay ba bước
          </div>
          <div class="handshake-steps">
            <div
              class="step"
              :class="{ active: tcpStep >= 1 }"
            >
              <div class="step-arrow">
                →
              </div>
              <div class="step-text">
                SYN
              </div>
            </div>
            <div
              class="step"
              :class="{ active: tcpStep >= 2 }"
            >
              <div class="step-arrow">
                ←
              </div>
              <div class="step-text">
                SYN-ACK
              </div>
            </div>
            <div
              class="step"
              :class="{ active: tcpStep >= 3 }"
            >
              <div class="step-arrow">
                →
              </div>
              <div class="step-text">
                ACK
              </div>
            </div>
          </div>
          <button
            class="demo-btn"
            @click="startTcpHandshake"
          >
            {{ tcpStep === 0 ? 'Demo bắt tay' : 'Chạy lại demo' }}
          </button>
        </div>
      </div>

      <div class="protocol-card udp">
        <div class="protocol-header">
          <div class="protocol-icon">
            ⚡
          </div>
          <div class="protocol-title">
            UDP
          </div>
          <div class="protocol-subtitle">
            User Datagram Protocol
          </div>
        </div>

        <div class="protocol-features">
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Truyền nhanh
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Chi phí thấp
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Không cần kết nối
            </div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">
              ✓
            </div>
            <div class="feature-text">
              Hỗ trợ multicast
            </div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">
              ✗
            </div>
            <div class="feature-text">
              Không tin cậy
            </div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">
              ✗
            </div>
            <div class="feature-text">
              Có thể mất gói
            </div>
          </div>
        </div>

        <div class="protocol-example">
          <div class="example-title">
            Trường hợp sử dụng
          </div>
          <div class="example-tags">
            <span class="tag">Live stream</span>
            <span class="tag">Game online</span>
            <span class="tag">Gọi thoại</span>
          </div>
        </div>

        <div class="handshake-demo">
          <div class="demo-title">
            Gửi thẳng
          </div>
          <div class="handshake-steps">
            <div class="step direct">
              <div class="step-arrow">
                →
              </div>
              <div class="step-text">
                Gửi dữ liệu trực tiếp
              </div>
            </div>
          </div>
          <button
            class="demo-btn"
            @click="sendUdpData"
          >
            {{ udpSent ? 'Gửi lại lần nữa' : 'Gửi dữ liệu' }}
          </button>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Đặc điểm</th>
            <th>TCP</th>
            <th>UDP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kết nối</td>
            <td>Hướng kết nối</td>
            <td>Không kết nối</td>
          </tr>
          <tr>
            <td>Độ tin cậy</td>
            <td>Tin cậy (ACK và gửi lại)</td>
            <td>Không tin cậy (best-effort)</td>
          </tr>
          <tr>
            <td>Tốc độ</td>
            <td>Chậm hơn</td>
            <td>Rất nhanh</td>
          </tr>
          <tr>
            <td>Chi phí</td>
            <td>Cao (header 20 byte)</td>
            <td>Thấp (header 8 byte)</td>
          </tr>
          <tr>
            <td>Kiểm soát luồng</td>
            <td>Có (sliding window)</td>
            <td>Không có</td>
          </tr>
          <tr>
            <td>Ứng dụng</td>
            <td>HTTP, FTP, SMTP, SSH</td>
            <td>DNS, DHCP, video stream</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="real-world-example">
      <div class="example-title">
        🎬 Ví dụ ứng dụng thực tế
      </div>
      <div class="scenario-grid">
        <div class="scenario">
          <div class="scenario-icon">
            📺
          </div>
          <div class="scenario-name">
            Live stream video
          </div>
          <div class="scenario-desc">
            Dùng <strong>UDP</strong>, vì: <br>• Mất vài frame không sao, quan trọng là realtime
            <br>• Truyền lại sẽ gây trễ và giật lag
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">
            🌐
          </div>
          <div class="scenario-name">
            Duyệt web
          </div>
          <div class="scenario-desc">
            Dùng <strong>TCP</strong>, vì: <br>• Nội dung phải toàn vẹn và chính xác <br>•
            Không chấp nhận mất bất kỳ dữ liệu nào
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">
            🎮
          </div>
          <div class="scenario-name">
            Game online
          </div>
          <div class="scenario-desc">
            Dùng <strong>UDP</strong>, vì: <br>• Tốc độ phản hồi quan trọng hơn độ chính xác
            <br>• Đồng bộ vị trí người chơi theo thời gian thực
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">
            📧
          </div>
          <div class="scenario-name">
            Gửi email
          </div>
          <div class="scenario-desc">
            Dùng <strong>TCP</strong>, vì: <br>• Nội dung email không được phép mất <br>•
            Độ tin cậy là ưu tiên số một
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tcpStep = ref(0)
const udpSent = ref(false)

const startTcpHandshake = () => {
  tcpStep.value = 0
  setTimeout(() => (tcpStep.value = 1), 500)
  setTimeout(() => (tcpStep.value = 2), 1200)
  setTimeout(() => (tcpStep.value = 3), 1900)
  setTimeout(() => {
    tcpStep.value = 0
  }, 4000)
}

const sendUdpData = () => {
  udpSent.value = true
  setTimeout(() => {
    udpSent.value = false
  }, 1000)
}
</script>

<style scoped>
.tcp-udp-comparison {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.protocol-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
}

.protocol-card.tcp {
  border-color: #e34c26;
}

.protocol-card.udp {
  border-color: #264de4;
}

.protocol-header {
  text-align: center;
  margin-bottom: 20px;
}

.protocol-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.protocol-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 5px;
}

.protocol-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.protocol-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.feature-item.good {
  border-left: 3px solid #22c55e;
}

.feature-item.bad {
  border-left: 3px solid #ef4444;
}

.feature-icon {
  font-weight: bold;
  font-size: 1rem;
}

.feature-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.protocol-example {
  margin-bottom: 20px;
}

.example-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
}

.handshake-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 15px;
}

.demo-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  text-align: center;
}

.handshake-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step.direct {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.demo-btn {
  width: 100%;
  padding: 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.demo-btn:hover {
  background: var(--vp-c-brand-dark);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

td {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

tr:last-child td {
  border-bottom: none;
}

.real-world-example {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
}

.example-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .scenario-grid {
    grid-template-columns: 1fr;
  }
}

.scenario {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 15px;
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.scenario-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
