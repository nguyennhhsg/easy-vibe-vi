<!--
  SessionVsJWTDemo.vue
  Session vs JWT (hỗ trợ quyết định)
-->
<template>
  <div class="session-vs-jwt-demo">
    <div class="header">
      <div class="title">
        Session vs JWT: chọn cái nào?
      </div>
      <div class="subtitle">
        Chọn ràng buộc của bạn, nhận đề xuất phương án (kèm giải thích lý do). Cách này hữu ích hơn việc học thuộc kết luận.
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          Ngữ cảnh của bạn
        </div>

        <label class="label">Client chính</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: client === 'web' }"
            @click="client = 'web'"
          >
            Web trình duyệt
          </button>
          <button
            class="chip"
            :class="{ active: client === 'mobile' }"
            @click="client = 'mobile'"
          >
            Mobile App
          </button>
          <button
            class="chip"
            :class="{ active: client === 'server' }"
            @click="client = 'server'"
          >
            Service-to-service
          </button>
        </div>

        <label class="label">Có cần "logout/đá khỏi hệ thống ngay lập tức"?</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: revoke === 'yes' }"
            @click="revoke = 'yes'"
          >
            Có
          </button>
          <button
            class="chip"
            :class="{ active: revoke === 'no' }"
            @click="revoke = 'no'"
          >
            Không
          </button>
        </div>

        <label class="label">Có cần cross-domain (frontend/backend tách rời, nhiều domain)?</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: cors === 'yes' }"
            @click="cors = 'yes'"
          >
            Có
          </button>
          <button
            class="chip"
            :class="{ active: cors === 'no' }"
            @click="cors = 'no'"
          >
            Không
          </button>
        </div>

        <label class="label">Service có mở rộng ngang (multi-instance)?</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: scale === 'yes' }"
            @click="scale = 'yes'"
          >
            Có
          </button>
          <button
            class="chip"
            :class="{ active: scale === 'no' }"
            @click="scale = 'no'"
          >
            Không
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          Đề xuất
        </div>
        <div class="recommend">
          <div class="pill primary">
            {{ recommendation.title }}
          </div>
          <div class="desc">
            {{ recommendation.desc }}
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            Tại sao
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.reasons"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>

        <div class="box">
          <div class="box-title">
            Gợi ý triển khai
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.tips"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        Những hiểu nhầm phổ biến
      </div>
      <ul class="list">
        <li>
          <strong>JWT khác với "an toàn hơn":</strong> JWT chỉ là "stateless". Mức an toàn phụ thuộc vào secret, chính sách hết hạn, cách lưu trữ, thiết kế cấp quyền.
        </li>
        <li>
          <strong>Cookie không đồng nghĩa CSRF:</strong> SameSite + CSRF token có thể giảm rủi ro đáng kể.
        </li>
        <li>
          <strong>Đừng coi OAuth token bên thứ ba là token hệ thống của bạn:</strong> mục đích khác nhau.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const client = ref('web') // web | mobile | server
const revoke = ref('yes') // yes | no
const cors = ref('no') // yes | no
const scale = ref('yes') // yes | no

const recommendation = computed(() => {
  // Very simple heuristic: prefer session for same-site web + revoke requirement.
  const reasons = []
  const tips = []

  const isWeb = client.value === 'web'
  const needsRevoke = revoke.value === 'yes'
  const needsCors = cors.value === 'yes'
  const needsScale = scale.value === 'yes'

  if (isWeb && !needsCors && needsRevoke) {
    reasons.push('Web cùng domain + cần "logout/đá khỏi hệ thống ngay lập tức" -> Session trực quan và kiểm soát tốt hơn.')
    if (needsScale) reasons.push('Khi multi-instance, dùng shared Session store như Redis là đủ.')
    tips.push('Cookie: HttpOnly + Secure + SameSite=Lax/Strict (tùy business)')
    tips.push('CSRF: SameSite + CSRF Token (bảo hiểm kép)')
    tips.push('Session Store: Redis + TTL + chiến lược gia hạn (sliding expiration)')
    return {
      title: 'Session + Cookie',
      desc: 'Phương án ổn định nhất cho Web truyền thống',
      reasons,
      tips
    }
  }

  // Otherwise default to token approach.
  reasons.push('Cross-domain/Mobile/đa dịch vụ thường thiên về Token (Authorization Header).')
  if (needsRevoke)
    reasons.push(
      'Cần logout chủ động: dùng access token ngắn + refresh token + blacklist/version.'
    )
  if (!needsRevoke) reasons.push('Không bắt buộc "logout tức thì" thì ưu thế stateless của JWT rõ rệt hơn.')
  tips.push('Access Token: hết hạn ngắn (ví dụ 15m); Refresh Token: lưu riêng/có thể xoay')
  tips.push(
    'Lưu trữ: Web hạn chế localStorage; ưu tiên HttpOnly Cookie hoặc memory + cơ chế refresh (tùy business)'
  )
  tips.push('Cấp quyền: làm RBAC/ABAC ở server; đừng nhồi hết role vào JWT rồi không bao giờ đổi')
  return {
    title: 'JWT Access Token (kèm Refresh)',
    desc: 'Tổ hợp phổ biến cho API/Mobile hiện đại',
    reasons,
    tips
  }
})
</script>

<style scoped>
.session-vs-jwt-demo {
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

.label {
  display: block;
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin: 0.75rem 0 0.35rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.chip.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.recommend {
  margin-bottom: 0.75rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.pill.primary {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
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

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
