<template>
  <div class="sync-demo">
    <div class="comparison-container">
      <div class="side manual-side">
        <div class="side-header">
          <span class="badge manual">Đồng bộ thủ công / phong cách jQuery</span>
        </div>

        <div class="cart-control">
          <button class="action-btn" @click="addManual">Thêm sản phẩm</button>
          <button class="action-btn outline" @click="resetManual">Reset</button>
        </div>

        <div class="sync-areas">
          <div
            v-for="area in manualAreas"
            :key="area.id"
            class="sync-area"
            :class="{ synced: area.synced, unsynced: !area.synced }"
          >
            <div class="area-header">
              <span class="area-icon">{{ area.icon }}</span>
              <span class="area-name">{{ area.name }}</span>
              <span class="sync-badge" :class="{ synced: area.synced }">
                {{ area.synced ? 'Đã đồng bộ' : 'Chưa đồng bộ' }}
              </span>
            </div>
            <div class="area-value">{{ area.synced ? area.actual : area.stale }}</div>
            <button
              v-if="!area.synced"
              class="sync-btn"
              @click="syncArea(area)"
            >
              Đồng bộ thủ công
            </button>
          </div>
        </div>

        <div class="miss-counter">
          <span class="miss-label">Số lần bỏ sót:</span>
          <span class="miss-value" :class="{ danger: missCount > 0 }">{{ missCount }}</span>
        </div>
      </div>

      <div class="vs-divider">
        <div class="vs-badge">VS</div>
      </div>

      <div class="side auto-side">
        <div class="side-header">
          <span class="badge auto">Đồng bộ tự động / phong cách framework</span>
        </div>

        <div class="cart-control">
          <button class="action-btn" @click="addAuto">Thêm sản phẩm</button>
          <button class="action-btn outline" @click="resetAuto">Reset</button>
        </div>

        <div class="sync-areas">
          <div
            v-for="area in autoAreas"
            :key="area.id"
            class="sync-area synced"
          >
            <div class="area-header">
              <span class="area-icon">{{ area.icon }}</span>
              <span class="area-name">{{ area.name }}</span>
              <span class="sync-badge synced">Đã đồng bộ</span>
            </div>
            <div class="area-value">{{ area.value }}</div>
          </div>
        </div>

        <div class="miss-counter">
          <span class="miss-label">Số lần bỏ sót:</span>
          <span class="miss-value">0</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong>
      <span>Giá trị bản chất của framework frontend nằm ở "đồng bộ tự động" - bạn chỉ cần sửa dữ liệu, framework đảm bảo mọi UI phụ thuộc dữ liệu đó được tự cập nhật, không bỏ sót chỗ nào.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const products = ['Tai nghe 99k', 'Bàn phím 199k', 'Chuột 59k', 'Màn hình 1299k', 'Webcam 149k', 'Loa 79k']
let productIndex = ref(0)

const manualCount = ref(0)
const manualItems = ref([])
const missCount = ref(0)
let pendingManualCount = 0

const manualAreas = reactive([
  {
    id: 'count',
    icon: '🔴',
    name: 'Số lượng giỏ hàng',
    synced: true,
    stale: '0 sản phẩm',
    actual: '0 sản phẩm'
  },
  {
    id: 'list',
    icon: '📋',
    name: 'Danh sách sản phẩm',
    synced: true,
    stale: '(trống)',
    actual: '(trống)'
  },
  {
    id: 'total',
    icon: '💰',
    name: 'Tổng tiền',
    synced: true,
    stale: '0k',
    actual: '0k'
  },
  {
    id: 'status',
    icon: '⚠️',
    name: 'Trạng thái',
    synced: true,
    stale: 'Bình thường',
    actual: 'Bình thường'
  }
])

function addManual() {
  const name = products[productIndex.value % products.length]
  productIndex.value++
  manualCount.value++
  manualItems.value.push(name)
  pendingManualCount = manualCount.value

  const price = parseInt(name.match(/(\d+)k$/)[1])
  const totalPrice = manualItems.value.reduce((sum, item) => {
    return sum + parseInt(item.match(/(\d+)k$/)[1])
  }, 0)

  manualAreas[0].actual = `${manualCount.value} sản phẩm`
  manualAreas[0].synced = false

  manualAreas[1].actual = manualItems.value.join(', ')
  manualAreas[1].synced = false

  manualAreas[2].actual = `${totalPrice}k`
  manualAreas[2].synced = false

  manualAreas[3].actual = manualCount.value > 5 ? '⚠️ Quá nhiều sản phẩm!' : 'Bình thường'
  manualAreas[3].synced = false

  const unsyncedBefore = manualAreas.filter(a => !a.synced).length
  if (unsyncedBefore > 0 && manualCount.value > 1) {
    missCount.value++
  }
}

function syncArea(area) {
  area.synced = true
  area.stale = area.actual
}

function resetManual() {
  manualCount.value = 0
  manualItems.value = []
  missCount.value = 0
  pendingManualCount = 0
  manualAreas.forEach(a => {
    a.synced = true
    a.stale = a.id === 'count' ? '0 sản phẩm' : a.id === 'list' ? '(trống)' : a.id === 'total' ? '0k' : 'Bình thường'
    a.actual = a.stale
  })
}

const autoCount = ref(0)
const autoItems = ref([])

const autoAreas = computed(() => {
  const totalPrice = autoItems.value.reduce((sum, item) => {
    return sum + parseInt(item.match(/(\d+)k$/)[1])
  }, 0)
  return [
    { id: 'count', icon: '🔴', name: 'Số lượng giỏ hàng', value: `${autoCount.value} sản phẩm` },
    { id: 'list', icon: '📋', name: 'Danh sách sản phẩm', value: autoItems.value.length ? autoItems.value.join(', ') : '(trống)' },
    { id: 'total', icon: '💰', name: 'Tổng tiền', value: `${totalPrice}k` },
    { id: 'status', icon: '⚠️', name: 'Trạng thái', value: autoCount.value > 5 ? '⚠️ Quá nhiều sản phẩm!' : 'Bình thường' }
  ]
})

function addAuto() {
  const name = products[productIndex.value % products.length]
  productIndex.value++
  autoCount.value++
  autoItems.value.push(name)
}

function resetAuto() {
  autoCount.value = 0
  autoItems.value = []
}
</script>

<style scoped>
.sync-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: start;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.side-header {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.manual {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.badge.auto {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

.cart-control {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  padding: 0.35rem 0.75rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.85;
}

.action-btn.outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.outline:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.sync-areas {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sync-area {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
}

.sync-area.synced {
  border-color: var(--vp-c-green-1);
}

.sync-area.unsynced {
  border-color: var(--vp-c-danger-1);
  background: rgba(239, 68, 68, 0.05);
}

.area-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}

.area-icon {
  font-size: 0.85rem;
}

.area-name {
  font-size: 0.82rem;
  font-weight: 600;
}

.sync-badge {
  margin-left: auto;
  font-size: 0.65rem;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  background: var(--vp-c-danger-1);
  color: white;
}

.sync-badge.synced {
  background: var(--vp-c-green-1);
}

.area-value {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sync-btn {
  margin-top: 0.35rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.72rem;
  border: 1px solid var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.sync-btn:hover {
  background: var(--vp-c-danger-1);
  color: white;
}

.miss-counter {
  text-align: center;
  font-size: 0.82rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.miss-label {
  color: var(--vp-c-text-2);
}

.miss-value {
  font-weight: bold;
  color: var(--vp-c-green-1);
}

.miss-value.danger {
  color: var(--vp-c-danger-1);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
}

.vs-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .vs-divider {
    padding-top: 0;
  }
}
</style>
