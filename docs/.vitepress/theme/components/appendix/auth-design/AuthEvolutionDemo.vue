<!--
  AuthEvolutionDemo.vue
  Sự tiến hóa của các phương án phân quyền (kèm gợi ý khi nào nên dùng)
-->
<template>
  <div class="auth-evolution-demo">
    <div class="header">
      <div class="title">
        Sự tiến hóa của các phương án phân quyền: từ Basic tới OAuth2
      </div>
      <div class="subtitle">
        Bấm vào từng card để nhanh chóng có trực giác "ngữ cảnh -> phương án".
      </div>
    </div>

    <div class="timeline">
      <button
        v-for="s in stages"
        :key="s.id"
        class="stage"
        :class="{ active: activeId === s.id }"
        @click="activeId = s.id"
      >
        <div class="stage-top">
          <span class="icon">{{ s.icon }}</span>
          <span class="name">{{ s.name }}</span>
        </div>
        <div class="stage-sub">
          {{ s.when }}
        </div>
      </button>
    </div>

    <div class="card">
      <div class="card-title">
        {{ active.icon }} {{ active.name }}
      </div>
      <div class="desc">
        {{ active.desc }}
      </div>

      <div class="grid">
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
            Rủi ro chính
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

      <pre class="code"><code>{{ active.example }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const stages = [
  {
    id: 'basic',
    icon: '🪪',
    name: 'HTTP Basic',
    when: 'Công cụ nội bộ/debug',
    desc: 'Phương án sớm nhất: mỗi request đều mang username/password (hoặc credential tương đương).',
    pros: ['Triển khai đơn giản nhất', 'Không cần thêm storage'],
    cons: ['Mỗi request đều mang "credential giá trị cao"', 'Không phù hợp production công khai', 'Khó cấp quyền chi tiết'],
    example: `GET /api/profile
Authorization: Basic <base64(username:password)>`
  },
  {
    id: 'session',
    icon: '🍪',
    name: 'Session + Cookie',
    when: 'Web truyền thống / SSR',
    desc: 'Server lưu Session, trình duyệt lưu cookie (session_id). Các request sau tự động đính kèm Cookie.',
    pros: ['Server có thể chủ động logout', 'Rất phù hợp SSR cùng domain', 'Đã trưởng thành về mặt kỹ thuật'],
    cons: [
      'Server có trạng thái, cần chia sẻ/mở rộng',
      'Rủi ro CSRF cao hơn (bắt buộc phòng chống)',
      'Cross-domain rắc rối hơn'
    ],
    example: `POST /login
-> Set-Cookie: session_id=abc; HttpOnly; Secure; SameSite=Lax

GET /api/profile
Cookie: session_id=abc`
  },
  {
    id: 'jwt',
    icon: '🎫',
    name: 'JWT Access Token',
    when: 'API / Mobile / Đa dịch vụ',
    desc: 'Server không lưu trạng thái, encode các claim vào token; request mang Authorization: Bearer.',
    pros: ['Stateless dễ mở rộng', 'Thân thiện cross-domain', 'Hay dùng cho hệ đa dịch vụ'],
    cons: [
      'Khó logout toàn cục (cần cơ chế bổ sung)',
      'Token có kích thước lớn',
      'Payload đọc được (đừng để thông tin nhạy cảm)'
    ],
    example: `GET /api/profile
Authorization: Bearer <access_token>`
  },
  {
    id: 'oauth2',
    icon: '🔑',
    name: 'OAuth2 / OIDC',
    when: 'Đăng nhập/cấp quyền cho bên thứ ba',
    desc: 'Giải quyết "cấp quyền/đăng nhập qua bên thứ ba", giúp ứng dụng không phải lưu username/password của bên thứ ba.',
    pros: [
      'Trải nghiệm tốt (quét mã/đăng nhập một chạm)',
      'Ranh giới bảo mật rõ ràng hơn',
      'Có thể mở rộng sang OIDC (đăng nhập)'
    ],
    cons: [
      'Độ phức tạp khi tích hợp cao hơn',
      'Bắt buộc xử lý đúng redirect_uri/state',
      'Thiết kế vòng đời của token rất quan trọng'
    ],
    example: `GET /authorize?response_type=code&client_id=...&redirect_uri=...&state=...`
  }
]

const activeId = ref(stages[1].id)
const active = computed(
  () => stages.find((s) => s.id === activeId.value) || stages[0]
)
</script>

<style scoped>
.auth-evolution-demo {
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

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.stage {
  text-align: left;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.stage.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.stage-top {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
}

.icon {
  font-size: 1.1rem;
}

.name {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.stage-sub {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.4;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
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

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .timeline {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
