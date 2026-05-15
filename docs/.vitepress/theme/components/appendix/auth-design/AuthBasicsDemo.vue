<!--
  AuthBasicsDemo.vue
  Cơ bản về phân quyền: bạn đang "truyền cái gì" để chứng minh danh tính?
-->
<template>
  <div class="auth-basics-demo">
    <div class="header">
      <div class="title">
        4 loại "credential" thường gặp trong phân quyền
      </div>
      <div class="subtitle">
        Chọn một phương án để xem request trông như thế nào, ưu/nhược điểm và những "bẫy" hay gặp.
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="m in methods"
        :key="m.id"
        class="tab"
        :class="{ active: current === m.id }"
        @click="current = m.id"
      >
        {{ m.name }}
        <span class="tag">{{ m.bestFor }}</span>
      </button>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          Request trông như thế nào
        </div>
        <pre class="code"><code>{{ active.example }}</code></pre>
        <div class="hint">
          {{ active.note }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          Khi nào nên dùng / không nên dùng
        </div>
        <div class="two">
          <div class="box">
            <div class="box-title">
              Phù hợp
            </div>
            <ul class="list">
              <li
                v-for="(x, i) in active.pros"
                :key="i"
              >
                {{ x }}
              </li>
            </ul>
          </div>
          <div class="box">
            <div class="box-title">
              Không phù hợp / Rủi ro
            </div>
            <ul class="list">
              <li
                v-for="(x, i) in active.cons"
                :key="i"
              >
                {{ x }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        Câu thần chú một dòng
      </div>
      <div class="desc">
        <strong>Xác thực trước (bạn là ai)</strong>, rồi cấp quyền (bạn có thể làm gì). Credential chỉ là "cách chứng minh danh tính", còn việc cấp quyền luôn phải thực hiện ở server.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const methods = [
  {
    id: 'basic',
    name: 'HTTP Basic',
    bestFor: 'Công cụ nội bộ',
    example: `GET /api/profile
Authorization: Basic <base64(username:password)>`,
    note: 'Base64 không phải mã hóa; bắt buộc dùng cùng HTTPS, và không khuyến nghị cho production công khai.',
    pros: ['Đơn giản nhất, mọi client đều hỗ trợ', 'Phù hợp công cụ debug nội bộ/tạm thời'],
    cons: [
      'Mỗi request đều đính kèm password (rủi ro lớn)',
      'Không thể "logout" (trừ khi server đổi mật khẩu)',
      'Không phù hợp business hiện đại'
    ]
  },
  {
    id: 'cookie',
    name: 'Session + Cookie',
    bestFor: 'Web truyền thống',
    example: `POST /login
-> 200 OK
Set-Cookie: session_id=abc; HttpOnly; Secure; SameSite=Lax

GET /api/profile
Cookie: session_id=abc`,
    note: 'Trình duyệt tự động đính kèm Cookie; do đó bắt buộc phải phòng chống CSRF (SameSite / CSRF Token).',
    pros: ['Server kiểm soát được (có thể chủ động logout)', 'Phù hợp SSR/Web cùng domain', 'Triển khai trực quan'],
    cons: ['Server có trạng thái (cần chia sẻ session)', 'Cross-domain phức tạp', 'Dễ bị ảnh hưởng bởi CSRF']
  },
  {
    id: 'jwt',
    name: 'JWT Bearer',
    bestFor: 'API/Mobile',
    example: `POST /login
-> { "access_token": "..." }

GET /api/profile
Authorization: Bearer <access_token>`,
    note: 'Payload của JWT có thể decode; đừng đặt thông tin nhạy cảm. Khuyến nghị access token ngắn + refresh token.',
    pros: ['Stateless, dễ mở rộng', 'Thân thiện cross-domain', 'Hay dùng cho mobile/đa dịch vụ'],
    cons: [
      'Khó logout toàn cục (cần cơ chế bổ sung)',
      'Token to lên, mỗi request đều phải gửi',
      'Thiết kế không tốt sẽ mất kiểm soát quyền hạn'
    ]
  },
  {
    id: 'apikey',
    name: 'API Key',
    bestFor: 'Service-to-service',
    example: `GET /api/metrics
X-API-Key: <your_api_key>`,
    note: 'API Key giống "thẻ ra vào", cần kết hợp rate limit, IP whitelist, xoay vòng, quyền tối thiểu.',
    pros: ['Triển khai đơn giản', 'Phù hợp truy cập giữa service/script', 'Dễ xoay vòng (nếu thiết kế tốt)'],
    cons: ['Thường thiếu user context', 'Lộ ra ảnh hưởng lớn', 'Cần quản lý quyền/xoay vòng/audit']
  }
]

const current = ref(methods[0].id)
const active = computed(
  () => methods.find((m) => m.id === current.value) || methods[0]
)
</script>

<style scoped>
.auth-basics-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.tab.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }
}
</style>
