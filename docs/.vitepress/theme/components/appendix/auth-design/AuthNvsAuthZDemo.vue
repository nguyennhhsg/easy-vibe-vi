<!--
  AuthNvsAuthZDemo.vue
  AuthN vs AuthZ (trình mô phỏng request)
-->
<template>
  <div class="authn-authz-demo">
    <div class="header">
      <div class="title">
        AuthN vs AuthZ: một request thực sự đi qua những bước gì?
      </div>
      <div class="subtitle">
        Chọn "ai đang request" và "muốn làm gì", xem xác thực/cấp quyền lần lượt phát huy tác dụng ở bước nào.
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          Chọn request
        </div>

        <label class="label">Danh tính (AuthN: bạn là ai)</label>
        <div class="row">
          <button
            v-for="u in users"
            :key="u.id"
            class="chip"
            :class="{ active: userId === u.id }"
            @click="userId = u.id"
          >
            {{ u.name }}
          </button>
        </div>

        <label class="label">Hành động (AuthZ: bạn có thể làm gì)</label>
        <div class="row">
          <button
            v-for="a in actions"
            :key="a.id"
            class="chip"
            :class="{ active: actionId === a.id }"
            @click="actionId = a.id"
          >
            {{ a.name }}
          </button>
        </div>

        <div class="hint">
          Trong hệ thống thực: xác thực diễn ra trước (parse cookie/JWT), cấp quyền diễn ra ở tầng route/business logic (RBAC/ABAC).
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          Kết quả mô phỏng
        </div>

        <div class="result">
          <div class="line">
            <span class="k">AuthN (Xác thực)</span>
            <span
              class="v"
              :class="authn.ok ? 'ok' : 'bad'"
            >
              {{ authn.ok ? 'Pass' : 'Fail' }}
            </span>
          </div>
          <div class="line">
            <span class="k">AuthZ (Cấp quyền)</span>
            <span
              class="v"
              :class="authz.ok ? 'ok' : 'bad'"
            >
              {{ authz.ok ? 'Allow' : 'Deny' }}
            </span>
          </div>
          <div class="line">
            <span class="k">HTTP</span>
            <span class="v mono">{{ finalStatus }}</span>
          </div>
        </div>

        <pre class="code"><code>{{ decisionLog }}</code></pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        Điểm cốt lõi
      </div>
      <ul class="list">
        <li><strong>Xác thực fail:</strong> chưa rõ bạn là ai -> thường trả về 401.</li>
        <li>
          <strong>Xác thực pass nhưng không có quyền:</strong> đã rõ bạn là ai, nhưng không được phép làm -> thường trả về 403.
        </li>
        <li>
          <strong>Quy tắc cấp quyền phải ở server:</strong> đừng tin "có hiển thị button hay không" ở frontend, đó chỉ là UX.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const users = [
  { id: 'anon', name: 'User ẩn danh' },
  { id: 'user', name: 'User thường' },
  { id: 'admin', name: 'Admin' }
]

const actions = [
  { id: 'view_profile', name: 'Xem hồ sơ cá nhân (/api/me)' },
  { id: 'create_post', name: 'Đăng bài (POST /posts)' },
  { id: 'delete_user', name: 'Xóa user (DELETE /users/:id)' }
]

const userId = ref('anon')
const actionId = ref('view_profile')

const authn = computed(() => {
  if (userId.value === 'anon')
    return { ok: false, reason: 'Thiếu credential hợp lệ (cookie/JWT)' }
  return { ok: true, reason: `Nhận diện là ${userId.value}` }
})

const authz = computed(() => {
  if (!authn.value.ok)
    return { ok: false, reason: 'Xác thực chưa pass, không thể quyết định cấp quyền' }
  if (actionId.value === 'delete_user') {
    return userId.value === 'admin'
      ? { ok: true, reason: 'admin được phép xóa user' }
      : { ok: false, reason: 'Chỉ admin mới được xóa user' }
  }
  return { ok: true, reason: 'Thao tác này mở cho user đã đăng nhập' }
})

const finalStatus = computed(() => {
  if (!authn.value.ok) return '401 Unauthorized'
  if (!authz.value.ok) return '403 Forbidden'
  return '200 OK'
})

const decisionLog = computed(() => {
  const lines = []
  lines.push(`Request: ${actionId.value}`)
  lines.push(
    `AuthN: ${authn.value.ok ? 'PASS' : 'FAIL'} - ${authn.value.reason}`
  )
  lines.push(
    `AuthZ: ${authz.value.ok ? 'ALLOW' : 'DENY'} - ${authz.value.reason}`
  )
  lines.push(`Result: ${finalStatus.value}`)
  return lines.join('\n')
})
</script>

<style scoped>
.authn-authz-demo {
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

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.result {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.line {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0;
}

.k {
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.v {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.v.ok {
  color: var(--vp-c-green-1, #22c55e);
}

.v.bad {
  color: var(--vp-c-red-1, #ef4444);
}

.mono {
  font-family: var(--vp-font-family-mono);
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
