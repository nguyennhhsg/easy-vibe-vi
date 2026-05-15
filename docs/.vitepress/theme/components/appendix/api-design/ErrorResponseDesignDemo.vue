<template>
  <div class="demo">
    <div class="header">
      <span class="icon">⚠️</span>
      <span class="title">Thiết kế response lỗi nâng cao</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'validate'" class="section">
        <h4>Lỗi kiểm tra tham số</h4>
        <pre class="code-block">
{
  "code": 10001,
  "message": "Kiểm tra tham số thất bại",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Sai định dạng email",
        "value": "invalid-email"
      },
      {
        "field": "password",
        "message": "Mật khẩu tối thiểu 8 ký tự",
        "value": "123"
      }
    ]
  }
}</pre>
        <div class="field-tips">
          <div class="tip-row">
            <code>field</code>
            <span>Tên field bị lỗi, frontend có thể định vị tới form</span>
          </div>
          <div class="tip-row">
            <code>message</code>
            <span>Mô tả lỗi thân thiện với người dùng</span>
          </div>
          <div class="tip-row">
            <code>value</code>
            <span>Giá trị client đã gửi (tùy chọn)</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'business'" class="section">
        <h4>Lỗi nghiệp vụ</h4>
        <pre class="code-block">
{
  "code": 20001,
  "message": "Số dư không đủ",
  "data": {
    "current_balance": 50.00,
    "required_amount": 99.00,
    "shortfall": 49.00,
    "suggestion": "Vui lòng nạp thêm rồi thử lại"
  }
}</pre>
        <div class="business-tips">
          <div class="b-tip">✓ Trả về dữ liệu trạng thái hiện tại, tiện hiển thị</div>
          <div class="b-tip">✓ Có suggestion gợi ý cách giải quyết</div>
          <div class="b-tip">✓ Dữ liệu có cấu trúc, frontend hiển thị linh hoạt</div>
        </div>
      </div>

      <div v-if="active === 'layers'" class="section">
        <h4>Thiết kế phân lớp mã lỗi</h4>
        <div class="layer-list">
          <div v-for="layer in layers" :key="layer.range" class="layer-item">
            <div class="layer-range">{{ layer.range }}</div>
            <div class="layer-info">
              <div class="layer-name">{{ layer.name }}</div>
              <div class="layer-example">Ví dụ: {{ layer.example }}</div>
            </div>
            <div class="layer-desc">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="layer-note">
          Mã lỗi từ ngoài vào trong: hệ thống → service → nghiệp vụ → xác thực → tham số
        </div>
      </div>

      <div v-if="active === 'http'" class="section">
        <h4>HTTP status code vs mã trạng thái nghiệp vụ</h4>
        <div class="http-compare">
          <div class="http-col">
            <div class="http-title">HTTP status code</div>
            <div class="http-desc">Trạng thái tầng truyền tải</div>
            <div class="http-codes">
              <div class="http-code">
                <span class="code-num">2xx</span>
                <span>Request thành công</span>
              </div>
              <div class="http-code">
                <span class="code-num">4xx</span>
                <span>Lỗi từ client</span>
              </div>
              <div class="http-code">
                <span class="code-num">5xx</span>
                <span>Lỗi từ server</span>
              </div>
            </div>
          </div>
          <div class="http-arrow">→</div>
          <div class="http-col">
            <div class="http-title">Mã trạng thái nghiệp vụ</div>
            <div class="http-desc">Trạng thái tầng nghiệp vụ</div>
            <div class="http-codes">
              <div class="http-code">
                <span class="code-num">0</span>
                <span>Nghiệp vụ thành công</span>
              </div>
              <div class="http-code">
                <span class="code-num">1xxxx</span>
                <span>Lỗi tham số</span>
              </div>
              <div class="http-code">
                <span class="code-num">2xxxx</span>
                <span>Lỗi nghiệp vụ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="http-note">HTTP 200 + mã lỗi nghiệp vụ là cách phổ biến trong ngành</div>
      </div>

      <div v-if="active === 'examples'" class="section">
        <h4>Ví dụ các mã lỗi thường gặp</h4>
        <div class="ex-tabs">
          <button
            v-for="ex in examples"
            :key="ex.id"
            :class="['ex-tab', { active: exId === ex.id }]"
            @click="exId = ex.id"
          >
            {{ ex.name }}
          </button>
        </div>
        <div class="ex-content">
          <div class="ex-list">
            <div
              v-for="item in currentExample.items"
              :key="item.code"
              class="ex-row"
            >
              <code class="ex-code">{{ item.code }}</code>
              <span class="ex-msg">{{ item.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">Thông tin lỗi cần "máy đọc được + thân thiện với người dùng" để frontend xử lý đồng nhất</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('validate')
const exId = ref('param')

const tabs = [
  { id: 'validate', icon: '🔍', name: 'Kiểm tra tham số' },
  { id: 'business', icon: '💼', name: 'Lỗi nghiệp vụ' },
  { id: 'layers', icon: '📊', name: 'Phân lớp' },
  { id: 'http', icon: '🌐', name: 'So sánh HTTP' },
  { id: 'examples', icon: '📋', name: 'Ví dụ thường gặp' }
]

const layers = [
  {
    range: '50001-59999',
    name: 'Lớp hệ thống',
    example: '50001 Lỗi database',
    desc: 'Vấn đề về hạ tầng'
  },
  {
    range: '40001-49999',
    name: 'Lớp service',
    example: '40001 Service bên thứ ba timeout',
    desc: 'Vấn đề về dependency bên ngoài'
  },
  {
    range: '30001-39999',
    name: 'Lớp xác thực',
    example: '30001 Chưa đăng nhập',
    desc: 'Vấn đề định danh, phân quyền'
  },
  {
    range: '20001-29999',
    name: 'Lớp nghiệp vụ',
    example: '20001 Số dư không đủ',
    desc: 'Kiểm tra quy tắc nghiệp vụ'
  },
  {
    range: '10001-19999',
    name: 'Lớp tham số',
    example: '10001 Thiếu tham số',
    desc: 'Vấn đề đầu vào của client'
  }
]

const examples = [
  {
    id: 'param',
    name: 'Lớp tham số',
    items: [
      { code: 10001, message: 'Thiếu tham số bắt buộc' },
      { code: 10002, message: 'Sai định dạng tham số' },
      { code: 10003, message: 'Tham số vượt giới hạn độ dài' },
      { code: 10004, message: 'Giá trị tham số không hợp lệ' }
    ]
  },
  {
    id: 'auth',
    name: 'Lớp xác thực',
    items: [
      { code: 30001, message: 'Chưa đăng nhập' },
      { code: 30002, message: 'Phiên đăng nhập đã hết hạn' },
      { code: 30003, message: 'Không có quyền truy cập' },
      { code: 30004, message: 'Tài khoản đã bị khóa' }
    ]
  },
  {
    id: 'biz',
    name: 'Lớp nghiệp vụ',
    items: [
      { code: 20001, message: 'Số dư không đủ' },
      { code: 20002, message: 'Sản phẩm đã ngừng bán' },
      { code: 20003, message: 'Đơn hàng đã bị hủy' },
      { code: 20004, message: 'Tồn kho không đủ' }
    ]
  },
  {
    id: 'sys',
    name: 'Lớp hệ thống',
    items: [
      { code: 50001, message: 'Lỗi database' },
      { code: 50002, message: 'Lỗi dịch vụ cache' },
      { code: 50003, message: 'Hệ thống bận, vui lòng thử lại sau' }
    ]
  }
]

const currentExample = computed(() => {
  return examples.find((e) => e.id === exId.value) || examples[0]
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.field-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.tip-row code {
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-brand);
  min-width: 70px;
}

.tip-row span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.business-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.b-tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

@media (max-width: 640px) {
  .layer-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.layer-range {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
}

.layer-name {
  font-size: 13px;
  font-weight: 600;
}

.layer-example {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.layer-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  padding: 4px 8px;
  border-radius: 4px;
}

.layer-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.http-compare {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

@media (max-width: 640px) {
  .http-compare {
    flex-direction: column;
  }

  .http-arrow {
    display: none;
  }
}

.http-col {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.http-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.http-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.http-arrow {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.http-codes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.http-code {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.code-num {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.http-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: color-mix(in srgb, #22c55e 10%, var(--vp-c-bg));
  border-radius: 6px;
}

.ex-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.ex-tab {
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.ex-tab:hover {
  border-color: var(--vp-c-brand);
}

.ex-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ex-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.ex-code {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
}

.ex-msg {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.tips-icon {
  font-size: 14px;
}

.tips-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
