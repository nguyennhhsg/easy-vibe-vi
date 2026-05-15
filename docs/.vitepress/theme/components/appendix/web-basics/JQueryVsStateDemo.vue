<!--
  JQueryVsStateDemo.vue
  Trực quan: jQuery = sửa DOM thủ công; framework = sửa state, tự động đồng bộ
-->
<template>
  <div class="jq-demo">
    <div class="header">
      <div class="title">
        jQuery là gì? Hiểu ngay qua "số lượng giỏ hàng"
      </div>
      <div class="subtitle">
        Bên trái: như jQuery, sửa trang thủ công (dễ quên). Bên phải: như Vue/React,
        chỉ sửa state.
      </div>
    </div>

    <div class="panes">
      <!-- jQuery-like -->
      <div class="pane">
        <div class="pane-title">
          Tư duy jQuery: sửa DOM khắp nơi
        </div>
        <div class="mock-app">
          <div class="topbar">
            <span>🛒 Badge:</span>
            <span
              class="badge"
              :class="{ wrong: jqBadgeWrong }"
            >{{
              jqBadge
            }}</span>
          </div>
          <div class="content">
            <div class="row">
              Số lượng trong trang giỏ hàng:
              <span
                class="num"
                :class="{ wrong: jqPageWrong }"
              >{{
                jqPage
              }}</span>
            </div>
            <div class="row">
              Nút thanh toán:
              <button class="checkout">
                Thanh toán ({{ jqButtonLabel }})
              </button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">
            Mô phỏng "các lệnh bạn viết"
          </div>
          <div class="btns">
            <button @click="jqIncreaseData">
              Dữ liệu +1 (nhưng chưa sửa trang)
            </button>
            <button @click="jqUpdateBadge">
              Sửa badge
            </button>
            <button @click="jqUpdateCartPage">
              Sửa trang giỏ hàng
            </button>
            <button @click="jqUpdateCheckoutButton">
              Sửa nút thanh toán
            </button>
          </div>

          <div
            class="hint"
            :class="{ danger: jqInconsistent }"
          >
            {{ jqHint }}
          </div>

          <div class="log">
            <div class="log-title">
              Log lệnh
            </div>
            <div
              v-if="jqLogs.length === 0"
              class="log-empty"
            >
              (chưa có thao tác nào)
            </div>
            <div
              v-else
              class="log-list"
            >
              <div
                v-for="(l, idx) in jqLogs"
                :key="idx"
                class="log-item"
              >
                {{ l }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- State-driven -->
      <div class="pane">
        <div class="pane-title">
          Tư duy Vue/React: chỉ sửa State
        </div>
        <div class="mock-app">
          <div class="topbar">
            <span>🛒 Badge:</span>
            <span class="badge">{{ state }}</span>
          </div>
          <div class="content">
            <div class="row">
              Số lượng trong trang giỏ hàng: <span class="num">{{ state }}</span>
            </div>
            <div class="row">
              Nút thanh toán:
              <button class="checkout">
                Thanh toán ({{ state }} sản phẩm)
              </button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">
            Bạn chỉ cần làm một việc duy nhất
          </div>
          <div class="btns">
            <button
              class="primary"
              @click="state = state + 1"
            >
              state +1
            </button>
            <button
              class="secondary"
              @click="resetAll"
            >
              Reset
            </button>
          </div>
          <div class="hint ok">
            State đổi, ba chỗ trên giao diện tự đồng bộ, không cần bạn "tìm DOM để sửa thủ công".
          </div>

          <div class="mini">
            <div class="mini-title">
              Hai từ mới ở đây
            </div>
            <div class="mini-item">
              <strong>DOM</strong>: cấu trúc trang trong trình duyệt (nút, chữ, hình đều ở trong đó)
            </div>
            <div class="mini-item">
              <strong>State</strong>: dữ liệu của trang (ví dụ như số lượng giỏ hàng)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const state = ref(1)

// jQuery side: "real data" + "DOM" values displayed at multiple places
const jqData = ref(1)
const jqBadge = ref(1)
const jqPage = ref(1)
const jqButtonLabel = ref('1 sản phẩm')
const jqLogs = ref([])

const log = (txt) => {
  jqLogs.value.unshift(
    `${new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })} - ${txt}`
  )
  jqLogs.value = jqLogs.value.slice(0, 8)
}

const jqIncreaseData = () => {
  jqData.value += 1
  log(`Dữ liệu +1 (dữ liệu thật giờ = ${jqData.value})`)
}
const jqUpdateBadge = () => {
  jqBadge.value = jqData.value
  log(`Cập nhật DOM badge = ${jqBadge.value}`)
}
const jqUpdateCartPage = () => {
  jqPage.value = jqData.value
  log(`Cập nhật DOM trang giỏ hàng = ${jqPage.value}`)
}
const jqUpdateCheckoutButton = () => {
  jqButtonLabel.value = `${jqData.value} sản phẩm`
  log(`Cập nhật DOM nút thanh toán = ${jqButtonLabel.value}`)
}

const jqInconsistent = computed(() => {
  return (
    jqBadge.value !== jqData.value ||
    jqPage.value !== jqData.value ||
    jqButtonLabel.value !== `${jqData.value} sản phẩm`
  )
})

const jqBadgeWrong = computed(() => jqBadge.value !== jqData.value)
const jqPageWrong = computed(() => jqPage.value !== jqData.value)

const jqHint = computed(() => {
  if (!jqInconsistent.value) return '✅ Ba chỗ hiển thị đồng nhất (xin chúc mừng, bạn đã sửa hết)'
  return '⚠️ Dữ liệu và trang không khớp: có thể bạn quên cập nhật một chỗ DOM nào đó (trong dự án thật đây chính là bug)'
})

const resetAll = () => {
  state.value = 1
  jqData.value = 1
  jqBadge.value = 1
  jqPage.value = 1
  jqButtonLabel.value = '1 sản phẩm'
  jqLogs.value = []
}
</script>

<style scoped>
.jq-demo {
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

.panes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.pane {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 0.75rem;
}

.pane-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.mock-app {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.topbar {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2ch;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
  font-weight: 700;
}

.content {
  padding: 0.75rem;
}

.row {
  margin-bottom: 0.6rem;
  font-size: 0.92rem;
}

.num {
  font-weight: 800;
  padding: 0.05rem 0.25rem;
  border-radius: 6px;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.checkout {
  border: none;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.85rem;
}

.controls {
  margin-top: 0.9rem;
}

.control-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btns button {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.35rem 0.65rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btns button.primary {
  border: none;
  background: #22c55e;
  color: #fff;
}

.btns button.secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.hint {
  margin-top: 0.65rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.7rem;
  border-radius: 10px;
}

.hint.danger {
  color: #b91c1c;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
}

.hint.ok {
  color: #166534;
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.08);
}

.wrong {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #b91c1c !important;
}

.log {
  margin-top: 0.75rem;
}

.log-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.log-empty {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.log-list {
  display: grid;
  gap: 0.25rem;
}

.log-item {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
}

.mini {
  margin-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.mini-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.mini-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}
</style>
