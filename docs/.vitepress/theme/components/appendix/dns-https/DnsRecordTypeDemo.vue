<template>
  <div class="dns-record-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      📋 Tra cứu loại DNS record
    </h4>
    <div class="tab-row">
      <button
        v-for="rec in records"
        :key="rec.type"
        class="tab-btn"
        :class="{ active: selected === rec.type }"
        @click="selected = rec.type"
      >
        {{ rec.type }}
      </button>
    </div>

    <div v-if="current" class="detail-card">
      <div class="detail-header">
        <span class="type-badge">{{ current.type }}</span>
        <span class="type-name">{{ current.name }}</span>
      </div>
      <p class="type-desc">{{ current.desc }}</p>

      <div class="example-block">
        <div class="example-title">Record mẫu</div>
        <code class="example-code">{{ current.example }}</code>
      </div>

      <div class="usage-block">
        <div class="usage-title">Trường hợp dùng</div>
        <ul class="usage-list">
          <li v-for="(u, i) in current.usages" :key="i">{{ u }}</li>
        </ul>
      </div>
    </div>

    <div class="info-box">
      <strong>Mẹo nhỏ:</strong>
      DNS không chỉ dịch domain thành IP, nó còn lo định tuyến email, xác thực domain, load balancing... mọi thứ đều dựa vào các loại record khác nhau.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('A')

const records = [
  {
    type: 'A',
    name: 'Address record',
    desc: 'Map domain sang một địa chỉ IPv4. Đây là loại DNS record phổ biến nhất, cái mà trình duyệt cuối cùng cần khi truy cập web.',
    example: 'example.com.  IN  A  93.184.216.34',
    usages: [
      'Trỏ domain website tới IP server',
      'Subdomain trỏ về server khác nhau',
      'Trả nhiều IP để load balancing'
    ]
  },
  {
    type: 'AAAA',
    name: 'IPv6 Address record',
    desc: 'Map domain sang một địa chỉ IPv6. Khi IPv4 cạn dần, AAAA ngày càng quan trọng.',
    example: 'example.com.  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946',
    usages: [
      'Hỗ trợ thiết bị IPv6 truy cập',
      'Triển khai dual-stack (cấu hình cả A và AAAA)',
      'Kiến trúc mạng hướng tới tương lai'
    ]
  },
  {
    type: 'CNAME',
    name: 'Canonical Name record',
    desc: 'Trỏ một domain tới một domain khác (alias). Trình duyệt sẽ tiếp tục resolve domain đích cho tới khi gặp record A.',
    example: 'www.example.com.  IN  CNAME  example.com.',
    usages: [
      'Subdomain www trỏ về domain chính',
      'Tăng tốc CDN (trỏ tới domain CDN provider)',
      'Nhiều domain trỏ về cùng một dịch vụ'
    ]
  },
  {
    type: 'MX',
    name: 'Mail Exchange record',
    desc: 'Khai báo mail server nào sẽ nhận email cho domain này và mức độ ưu tiên. Số càng nhỏ ưu tiên càng cao.',
    example: 'example.com.  IN  MX  10 mail.example.com.',
    usages: [
      'Cấu hình email doanh nghiệp (Gmail, Outlook...)',
      'Đặt thứ tự ưu tiên mail server',
      'Backup mail và disaster recovery'
    ]
  },
  {
    type: 'TXT',
    name: 'Text record',
    desc: 'Lưu thông tin văn bản tùy ý. Hay dùng để verify quyền sở hữu domain, chính sách bảo mật email (SPF/DKIM/DMARC)...',
    example: 'example.com.  IN  TXT  "v=spf1 include:_spf.google.com ~all"',
    usages: [
      'SPF record chống giả mạo email',
      'Xác thực domain khi xin SSL certificate',
      'Xác nhận quyền sở hữu domain cho dịch vụ third-party'
    ]
  },
  {
    type: 'NS',
    name: 'Name Server record',
    desc: 'Khai báo các DNS server chịu trách nhiệm resolve domain này. Đây là cơ chế cốt lõi của ủy quyền DNS.',
    example: 'example.com.  IN  NS  ns1.exampledns.com.',
    usages: [
      'Host domain lên nhà cung cấp DNS chỉ định',
      'Ủy quyền subdomain cho team khác quản lý',
      'Chuyển dịch vụ DNS'
    ]
  }
]

const current = computed(() => records.find((r) => r.type === selected.value))
</script>

<style scoped>
.dns-record-demo {
  background: linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.tab-row {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 16px;
  border: 2px solid #ce93d8;
  border-radius: 20px;
  background: #fff;
  color: #7b1fa2;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #7b1fa2;
  color: #fff;
  border-color: #7b1fa2;
}

.tab-btn:hover:not(.active) {
  background: #f3e5f5;
}

.detail-card {
  background: #fff;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 14px;
  border: 1px solid #e1bee7;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.type-badge {
  background: #7b1fa2;
  color: #fff;
  padding: 3px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  font-family: monospace;
}

.type-name {
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

.type-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 14px 0;
}

.example-block {
  background: #263238;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 14px;
}

.example-title {
  font-size: 11px;
  color: #80cbc4;
  margin-bottom: 6px;
  font-weight: 600;
}

.example-code {
  color: #e0f7fa;
  font-size: 13px;
  font-family: 'Fira Code', monospace;
  word-break: break-all;
}

.usage-block {
  background: #f3e5f5;
  border-radius: 8px;
  padding: 12px 16px;
}

.usage-title {
  font-size: 12px;
  font-weight: 700;
  color: #7b1fa2;
  margin-bottom: 6px;
}

.usage-list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #444;
  line-height: 1.8;
}

.info-box {
  margin-top: 14px;
  padding: 10px 14px;
  background: #fff3e0;
  border-radius: 8px;
  font-size: 13px;
  color: #5d4037;
  line-height: 1.6;
}
</style>
