<template>
  <div class="cert-chain-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      🔗 Trực quan chain of trust chứng chỉ
    </h4>
    <p class="intro-text">
      Bấm vào từng tầng chứng chỉ để xem chi tiết và vai trò của nó trong chain of trust.
    </p>

    <div class="chain-container">
      <div
        v-for="(cert, idx) in certs"
        :key="idx"
        class="cert-node"
        :class="{ selected: selectedIdx === idx }"
        :style="{ '--level-color': cert.color }"
        @click="selectedIdx = idx"
      >
        <div class="cert-icon">{{ cert.icon }}</div>
        <div class="cert-title">{{ cert.title }}</div>
        <div class="cert-subtitle">{{ cert.subtitle }}</div>
        <div v-if="idx < certs.length - 1" class="chain-arrow">
          <span class="arrow-text">Ký phát</span>
          <span class="arrow-symbol">↓</span>
        </div>
      </div>
    </div>

    <div v-if="selectedIdx >= 0" class="detail-panel">
      <div
        class="detail-header"
        :style="{ borderColor: certs[selectedIdx].color }"
      >
        <span class="detail-icon">{{ certs[selectedIdx].icon }}</span>
        <span class="detail-name">{{ certs[selectedIdx].title }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-row" v-for="(item, i) in certs[selectedIdx].details" :key="i">
          <span class="detail-label">{{ item.label }}</span>
          <span class="detail-value">{{ item.value }}</span>
        </div>
      </div>
      <div class="detail-explain">
        {{ certs[selectedIdx].explain }}
      </div>
    </div>

    <div class="verify-box">
      <div class="verify-title">🔍 Quy trình xác thực của trình duyệt</div>
      <div class="verify-steps">
        <div v-for="(s, i) in verifySteps" :key="i" class="verify-step">
          <span class="verify-num">{{ i + 1 }}</span>
          <span class="verify-text">{{ s }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedIdx = ref(0)

const certs = [
  {
    icon: '🏛️',
    title: 'Chứng chỉ gốc (Root CA)',
    subtitle: 'Điểm neo niềm tin',
    color: '#c62828',
    explain:
      'Root CA là điểm neo của toàn bộ chain of trust. Nó được CA gốc tự ký và preinstall sẵn trong hệ điều hành, trình duyệt. Trên thế giới chỉ có vài chục root CA, độ an toàn được bảo đảm bằng audit nghiêm ngặt và các biện pháp bảo vệ vật lý. Private key của root CA thường được lưu offline trong HSM.',
    details: [
      { label: 'Người ký', value: 'DigiCert Global Root G2 (tự ký)' },
      { label: 'Thời hạn', value: '25 năm (2013 - 2038)' },
      { label: 'Độ dài khóa', value: 'RSA 2048 bit' },
      { label: 'Nơi lưu', value: 'Trust store sẵn trong OS / trình duyệt' },
      { label: 'Số lượng', value: 'Trên thế giới có khoảng 150 root CA được tin' }
    ]
  },
  {
    icon: '🏢',
    title: 'Chứng chỉ trung gian (Intermediate CA)',
    subtitle: 'Cầu nối niềm tin',
    color: '#e65100',
    explain:
      'Intermediate CA do root CA ký, đóng vai trò cầu nối giữa root và server certificate. Lợi ích của thiết kế phân tầng: nếu intermediate bị lộ vẫn có thể revoke riêng mà không ảnh hưởng root. Intermediate lo cấp chứng chỉ hằng ngày, còn private key của root có thể luôn ở trạng thái offline.',
    details: [
      { label: 'Người ký', value: 'DigiCert Global Root G2' },
      { label: 'Chủ sở hữu', value: 'DigiCert SHA2 Extended Validation Server CA' },
      { label: 'Thời hạn', value: '10 năm' },
      { label: 'Mục đích', value: 'Ký phát chứng chỉ end-entity (server)' },
      { label: 'Có thể revoke', value: 'Có (qua CRL hoặc OCSP)' }
    ]
  },
  {
    icon: '🌐',
    title: 'Chứng chỉ server',
    subtitle: 'CMND của website',
    color: '#1565c0',
    explain:
      'Server certificate là thứ website dùng để chứng minh danh tính với trình duyệt. Nó do intermediate CA ký, chứa domain, public key và thời hạn của website. Khi trình duyệt nhận được certificate, nó lần ngược chain để xác thực cho tới khi gặp một root certificate đã tin cậy.',
    details: [
      { label: 'Người ký', value: 'DigiCert SHA2 Extended Validation Server CA' },
      { label: 'Chủ sở hữu', value: 'www.example.com' },
      { label: 'Thời hạn', value: '1 năm (chuẩn ngành)' },
      { label: 'Public key', value: 'Public key ECDSA P-256' },
      { label: 'Mức xác thực', value: 'EV (Extended Validation) / DV (Domain Validation)' }
    ]
  }
]

const verifySteps = [
  'Trình duyệt nhận server certificate, đọc thông tin người ký',
  'Tìm intermediate certificate, dùng public key của intermediate CA để verify chữ ký của server cert',
  'Tiếp tục dùng public key của root CA để verify chữ ký của intermediate cert',
  'Xác nhận root cert có trong trust store local → cả chain hợp lệ'
]
</script>

<style scoped>
.cert-chain-demo {
  background: linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.intro-text {
  font-size: 13px;
  color: #666;
  margin: 0 0 16px 0;
}

.chain-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 18px;
}

.cert-node {
  position: relative;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  width: 280px;
  max-width: 100%;
}

.cert-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cert-node.selected {
  border-color: var(--level-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
}

.cert-icon {
  font-size: 30px;
}

.cert-title {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a2e;
  margin-top: 4px;
}

.cert-subtitle {
  font-size: 12px;
  color: #888;
}

.chain-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  color: #999;
}

.arrow-text {
  font-size: 11px;
}

.arrow-symbol {
  font-size: 20px;
  line-height: 1;
}

.detail-panel {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 3px solid;
}

.detail-icon {
  font-size: 24px;
}

.detail-name {
  font-weight: 700;
  font-size: 16px;
  color: #1a1a2e;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.detail-label {
  color: #888;
  min-width: 80px;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  font-weight: 500;
  word-break: break-all;
}

.detail-explain {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
  background: #f5f5f5;
  padding: 10px 14px;
  border-radius: 8px;
}

.verify-box {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 14px 18px;
}

.verify-title {
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 10px;
  font-size: 14px;
}

.verify-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.verify-step {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #333;
}

.verify-num {
  background: #4caf50;
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.verify-text {
  line-height: 1.5;
  padding-top: 1px;
}
</style>
