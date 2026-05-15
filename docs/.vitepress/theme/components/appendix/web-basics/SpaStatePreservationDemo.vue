<!--
  SpaStatePreservationDemo.vue
  SPA vs MPA: demo xem state có được giữ lại khi chuyển trang hay không
-->
<template>
  <div class="spa-state-demo">
    <div class="header">
      <div class="title">
        Khi chuyển trang, dữ liệu nhập có bị mất không?
      </div>
      <div class="subtitle">
        Cùng bấm "chuyển trang", MPA sẽ giống như refresh và xoá hết; SPA thì giữ lại state
      </div>
    </div>

    <div class="mode-switch">
      <button
        class="mode"
        :class="{ active: mode === 'mpa' }"
        @click="switchMode('mpa')"
      >
        MPA (refresh toàn trang)
      </button>
      <button
        class="mode"
        :class="{ active: mode === 'spa' }"
        @click="switchMode('spa')"
      >
        SPA (chuyển từng phần)
      </button>
      <button
        class="reset"
        @click="resetAll"
      >
        Reset
      </button>
    </div>

    <div class="app">
      <div class="nav">
        <button
          v-for="p in pages"
          :key="p"
          class="nav-btn"
          :class="{ active: page === p }"
          @click="go(p)"
        >
          {{ p }}
        </button>
      </div>

      <div class="screen">
        <div
          v-if="loading"
          class="loading"
        >
          Đang tải...
        </div>
        <div
          v-else
          class="content"
        >
          <div class="row">
            Trang hiện tại: <strong>{{ page }}</strong>
          </div>

          <div class="form">
            <label>
              Ghi chú (giả lập form nhập):
              <input
                v-model="note"
                type="text"
                placeholder="Nhập thử cái gì đó"
              >
            </label>
            <div class="help">
              Gợi ý: chuyển sang trang khác rồi quay lại, xem đoạn này còn không nha.
            </div>
          </div>

          <div class="row">
            Số lượng giỏ hàng (state giả lập):
            <button
              class="small"
              @click="cart = Math.max(0, cart - 1)"
            >
              -
            </button>
            <strong class="num">{{ cart }}</strong>
            <button
              class="small"
              @click="cart = cart + 1"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div class="explain">
        <div class="card">
          <div class="label">
            Hiện tượng bạn đang thấy
          </div>
          <div class="value">
            {{ explainText }}
          </div>
        </div>
        <div class="card">
          <div class="label">
            Lý do phía sau (một câu)
          </div>
          <div class="value">
            {{ reasonText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pages = ['Trang chủ', 'Sản phẩm', 'Giỏ hàng']
const mode = ref('mpa')
const page = ref('Trang chủ')
const loading = ref(false)

// Giả lập input của user / state của trang
const note = ref('Mình muốn mua hai ly trà sữa')
const cart = ref(1)

const switchMode = (next) => {
  mode.value = next
  // Khi đổi chế độ, mô phỏng việc "quay lại trang chủ"
  go('Trang chủ')
}

const resetAll = () => {
  mode.value = 'mpa'
  page.value = 'Trang chủ'
  note.value = 'Mình muốn mua hai ly trà sữa'
  cart.value = 1
  loading.value = false
}

const go = (nextPage) => {
  loading.value = true

  // MPA: chuyển trang = giống refresh, mất state
  if (mode.value === 'mpa') {
    note.value = ''
    cart.value = 0
  }

  const delay = mode.value === 'mpa' ? 650 : 150
  setTimeout(() => {
    page.value = nextPage
    loading.value = false
  }, delay)
}

const explainText = computed(() =>
  mode.value === 'mpa'
    ? 'MPA: chuyển trang giống refresh, dữ liệu nhập và state thường bị mất'
    : 'SPA: chuyển trang chỉ đổi vùng nội dung, dữ liệu nhập và state dễ được giữ lại'
)

const reasonText = computed(() =>
  mode.value === 'mpa'
    ? 'Vì trình duyệt đã load "trang mới", state trong bộ nhớ của trang cũ bị xoá đi'
    : 'Vì vẫn là "cùng một trang", chỉ là JavaScript đổi nội dung bên trong thôi'
)
</script>

<style scoped>
.spa-state-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.mode-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.mode {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.mode.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.reset {
  border: none;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.app {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 0.75rem;
}

.nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.nav-btn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.nav-btn.active {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.screen {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.9rem;
  min-height: 120px;
}

.loading {
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.content .row {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
}

.form input {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
  font-size: 0.9rem;
}

.help {
  margin-top: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.small {
  border: none;
  background: rgba(99, 102, 241, 0.15);
  color: #4338ca;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 0.35rem;
}

.num {
  display: inline-block;
  min-width: 2ch;
  text-align: center;
}

.explain {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.9rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  margin-top: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
}
</style>
