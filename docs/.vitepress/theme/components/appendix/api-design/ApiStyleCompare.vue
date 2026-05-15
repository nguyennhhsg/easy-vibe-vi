<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🎨</span>
      <span class="title">So sánh bốn phong cách API</span>
    </div>

    <div class="tabs">
      <button
        v-for="style in styles"
        :key="style.id"
        :class="['tab', { active: active === style.id }]"
        @click="active = style.id"
      >
        {{ style.icon }} {{ style.name }}
      </button>
    </div>

    <div class="content">
      <div class="style-header">
        <h4>{{ currentStyle.name }}</h4>
        <span class="badge">{{ currentStyle.badge }}</span>
      </div>

      <p class="desc">{{ currentStyle.desc }}</p>

      <div class="example-section">
        <div class="example-label">Ví dụ: lấy thông tin người dùng</div>
        <pre class="code-block"><code>{{ currentStyle.example }}</code></pre>
      </div>

      <div class="features">
        <div class="features-title">Đặc điểm cốt lõi</div>
        <div class="features-grid">
          <div
            v-for="(f, i) in currentStyle.features"
            :key="i"
            class="feature-item"
          >
            <span class="check">✓</span>
            <span>{{ f }}</span>
          </div>
        </div>
      </div>

      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Tình huống áp dụng</span>
          <span class="meta-value">{{ currentStyle.scenarios }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Trang chính thức</span>
          <a :href="currentStyle.official" target="_blank" class="meta-link">{{
            currentStyle.official
          }}</a>
        </div>
      </div>
    </div>

    <div class="compare-section">
      <div class="compare-title">📊 So sánh nhanh các phong cách</div>
      <div class="compare-table">
        <div class="compare-row head">
          <div class="cell">Tiêu chí</div>
          <div class="cell">RPC</div>
          <div class="cell highlight">REST</div>
          <div class="cell">GraphQL</div>
          <div class="cell">gRPC</div>
        </div>
        <div class="compare-row">
          <div class="cell">Triết lý cốt lõi</div>
          <div class="cell">Hướng quá trình</div>
          <div class="cell highlight">Hướng resource</div>
          <div class="cell">Hướng dữ liệu</div>
          <div class="cell">Hướng method</div>
        </div>
        <div class="compare-row">
          <div class="cell">Phong cách URL</div>
          <div class="cell">Chủ yếu là động từ</div>
          <div class="cell highlight">Chủ yếu là danh từ</div>
          <div class="cell">Một endpoint duy nhất</div>
          <div class="cell">Không phụ thuộc URL</div>
        </div>
        <div class="compare-row">
          <div class="cell">Đường cong học</div>
          <div class="cell low">Thấp</div>
          <div class="cell">Trung bình</div>
          <div class="cell">Trung bình</div>
          <div class="cell high">Cao</div>
        </div>
        <div class="compare-row">
          <div class="cell">Hiệu năng</div>
          <div class="cell">Bình thường</div>
          <div class="cell">Bình thường</div>
          <div class="cell">Khá tốt</div>
          <div class="cell best">Xuất sắc</div>
        </div>
        <div class="compare-row">
          <div class="cell">Tỷ lệ sử dụng</div>
          <div class="cell">~30%</div>
          <div class="cell highlight">~50%</div>
          <div class="cell">~15%</div>
          <div class="cell">~5%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('rest')

const styles = [
  {
    id: 'rpc',
    icon: '📞',
    name: 'RPC',
    badge: 'Truyền thống nhất',
    desc: 'Remote Procedure Call - gọi thủ tục từ xa. Gọi service từ xa như gọi hàm local, hướng quá trình, đơn giản và trực tiếp. Hơn 50% API nội bộ dùng phong cách này.',
    example: `GET /getUserInfo?id=123
POST /createUser
POST /deleteOrder
GET /queryUserList`,
    features: [
      'URL thường được đặt theo động từ',
      'HTTP method gần như chỉ dùng GET/POST',
      'Thiết kế đơn giản, gần như không ràng buộc',
      'Cần tài liệu mô tả chi tiết'
    ],
    scenarios: 'API nội bộ, các nghiệp vụ nhạy cảm về hiệu năng hoặc khó trừu tượng thành resource',
    official: 'Không có chuẩn chính thức (chỉ là khái niệm)'
  },
  {
    id: 'rest',
    icon: '🌐',
    name: 'REST',
    badge: 'Phổ biến nhất',
    desc: 'Representational State Transfer. Do Roy Fielding đề xuất trong luận án tiến sĩ năm 2000. Hướng resource, dùng URL để định danh resource, dùng HTTP method để thao tác.',
    example: `GET    /users           # Lấy danh sách user
GET    /users/123       # Lấy một user
POST   /users           # Tạo user
PUT    /users/123       # Cập nhật toàn bộ
PATCH  /users/123       # Cập nhật một phần
DELETE /users/123       # Xóa user`,
    features: [
      'URL là danh từ, không phải động từ',
      'Dùng HTTP method để diễn đạt hành động',
      'Stateless, request chứa đủ thông tin',
      'Cache được, hỗ trợ kiến trúc phân lớp'
    ],
    scenarios: 'API công khai, thao tác CRUD, nghiệp vụ có ranh giới resource rõ ràng',
    official: 'https://restfulapi.net/'
  },
  {
    id: 'graphql',
    icon: '📊',
    name: 'GraphQL',
    badge: 'Linh hoạt nhất',
    desc: 'Được Facebook open-source năm 2015. Một ngôn ngữ query cho phép client chỉ định chính xác các field cần lấy, tránh over-fetching hoặc under-fetching.',
    example: `query {
  user(id: "123") {
    name
    email
    orders {
      id
      total
    }
  }
}`,
    features: [
      'Một endpoint duy nhất (/graphql)',
      'Client quyết định field trả về',
      'Schema chính là tài liệu',
      'Một request lấy nhiều resource'
    ],
    scenarios: 'Nhu cầu client thay đổi nhiều, dữ liệu liên kết phức tạp, app mobile',
    official: 'https://graphql.org/'
  },
  {
    id: 'grpc',
    icon: '⚡',
    name: 'gRPC',
    badge: 'Hiệu năng cao nhất',
    desc: 'Được Google open-source năm 2016. Framework RPC hiệu năng cao, dùng Protocol Buffers để serialize, chạy trên HTTP/2, hỗ trợ stream hai chiều.',
    example: `service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
}

message User {
  string id = 1;
  string name = 2;
}`,
    features: [
      'Truyền dạng nhị phân, hiệu năng rất cao',
      'Strong type, code được sinh tự động',
      'Dựa trên HTTP/2, stream hai chiều',
      'Hỗ trợ trên browser còn hạn chế'
    ],
    scenarios: 'Giao tiếp nội bộ microservice, tình huống cần hiệu năng cao, yêu cầu strong type',
    official: 'https://grpc.io/'
  }
]

const currentStyle = computed(() => {
  return styles.find((s) => s.id === active.value) || styles[1]
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
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
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
  padding: 20px;
}

.style-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.style-header h4 {
  margin: 0;
  font-size: 18px;
}

.badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
  color: var(--vp-c-brand);
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.example-section {
  margin-bottom: 16px;
}

.example-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px;
  border-radius: 8px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

.features {
  margin-bottom: 16px;
}

.features-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.check {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.meta {
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
}

.meta-label {
  color: var(--vp-c-text-3);
  min-width: 70px;
  flex-shrink: 0;
}

.meta-value {
  color: var(--vp-c-text-2);
}

.meta-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
}

.meta-link:hover {
  text-decoration: underline;
}

.compare-section {
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
}

.compare-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.compare-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.compare-row {
  display: grid;
  grid-template-columns: 1fr repeat(4, 1fr);
}

.compare-row:nth-child(odd) {
  background: var(--vp-c-bg-soft);
}

.compare-row:nth-child(even) {
  background: var(--vp-c-bg);
}

.compare-row.head {
  background: var(--vp-c-bg-alt);
}

.cell {
  padding: 10px 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
}

.cell:last-child {
  border-right: none;
}

.head .cell {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cell:first-child {
  text-align: left;
  font-weight: 500;
  color: var(--vp-c-text-1);
  padding-left: 12px;
}

.cell.highlight {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.cell.low {
  color: #22c55e;
}

.cell.high {
  color: #f59e0b;
}

.cell.best {
  color: #22c55e;
  font-weight: 600;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 70px repeat(4, 1fr);
  }
  .cell {
    padding: 8px 4px;
    font-size: 11px;
  }
}
</style>
