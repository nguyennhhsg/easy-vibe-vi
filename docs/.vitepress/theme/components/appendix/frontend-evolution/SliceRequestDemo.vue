<!--
  SliceRequestDemo.vue - So sánh tối ưu request HTTP
  Dùng ẩn dụ "chuyển nhà" để giải thích sprite vs cắt nhỏ request
-->
<template>
  <div class="slice-request-demo">
    <!-- Khu tiêu đề -->
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">Tối ưu request HTTP</span>
      <span class="subtitle">Sprite gộp ảnh vs request độc lập</span>
    </div>

    <!-- Nội dung chính -->
    <div class="demo-content">
      <!-- Giới thiệu câu chuyện -->
      <div class="story-box">
        <p class="story-text">
          <strong>Nói nôm na:</strong> giống như chuyển nhà —<br>
          <strong>Chế độ cắt nhỏ</strong>: mỗi thùng đi một chuyến, cần 6 chuyến (6 request HTTP)<br>
          <strong>Chế độ sprite</strong>: đóng gói chở một chuyến, chỉ cần 1 chuyến (1 request HTTP)
        </p>
      </div>

      <!-- Chọn chế độ -->
      <div class="mode-selector">
        <div
          class="mode-card"
          :class="{ active: mode === 'separate' }"
          @click="mode = 'separate'"
        >
          <div class="mode-icon">
            🛵
          </div>
          <div class="mode-name">
            Chế độ cắt nhỏ
          </div>
          <div class="mode-desc">
            Nói nôm na: mỗi thùng một chuyến
          </div>
          <div class="mode-detail">
            Cần 6 chuyến
          </div>
        </div>

        <div class="vs-divider">
          VS
        </div>

        <div
          class="mode-card"
          :class="{ active: mode === 'packed' }"
          @click="mode = 'packed'"
        >
          <div class="mode-icon">
            🚚
          </div>
          <div class="mode-name">
            Chế độ sprite
          </div>
          <div class="mode-desc">
            Nói nôm na: đóng gói chở 1 chuyến
          </div>
          <div class="mode-detail">
            Chỉ cần 1 chuyến
          </div>
        </div>
      </div>

      <!-- Khu animation -->
      <div class="animation-area">
        <!-- Điểm xuất phát -->
        <div class="location start">
          <div class="location-icon">
            🏠
          </div>
          <div class="location-label">
            Nhà cũ
          </div>
          <div class="boxes-remaining">
            Còn lại: <span class="count">{{ remainingBoxes }}</span>
          </div>
        </div>

        <!-- Con đường -->
        <div class="road">
          <div class="road-line" />

          <!-- Phương tiện vận chuyển -->
          <div
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            class="vehicle"
            :class="{ 'moving': vehicle.isMoving }"
            :style="{ left: vehicle.position + '%' }"
          >
            <div class="vehicle-body">
              {{ mode === 'separate' ? '🛵' : '🚚' }}
            </div>
            <div
              v-if="vehicle.cargo > 0"
              class="vehicle-cargo"
            >
              {{ mode === 'separate' ? '📦' : '📦×' + vehicle.cargo }}
            </div>
          </div>
        </div>

        <!-- Điểm đến -->
        <div class="location end">
          <div class="location-icon">
            🏡
          </div>
          <div class="location-label">
            Nhà mới
          </div>
          <div class="boxes-delivered">
            Đã giao: <span class="count">{{ deliveredBoxes }}</span>/6
          </div>
        </div>
      </div>

      <!-- Bảng thống kê -->
      <div class="stats-panel">
        <div class="stat-item">
          <div class="stat-label">
            Số chuyến
          </div>
          <div
            class="stat-value"
            :class="{ 'good': trips <= 2, 'bad': trips > 2 }"
          >
            {{ trips }} chuyến
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">
            Tổng thời gian
          </div>
          <div class="stat-value">
            {{ totalTime.toFixed(1) }} giây
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">
            Điểm hiệu suất
          </div>
          <div
            class="stat-value"
            :class="efficiencyClass"
          >
            {{ efficiency }}
          </div>
        </div>
      </div>

      <!-- Nút điều khiển -->
      <div class="controls">
        <button
          class="btn btn-primary"
          :disabled="isRunning"
          @click="startSimulation"
        >
          {{ isRunning ? 'Đang vận chuyển...' : 'Bắt đầu chuyển nhà' }}
        </button>
        <button
          class="btn btn-secondary"
          @click="resetSimulation"
        >
          Đặt lại
        </button>
      </div>
    </div>

    <!-- Khung thông tin -->
    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      <span v-if="mode === 'separate'">Chế độ cắt nhỏ mỗi lần chỉ chở một thứ, cần 6 request HTTP, hiệu suất thấp.</span>
      <span v-else>Chế độ sprite đóng gói rồi gửi một lượt, chỉ cần 1 request HTTP, giảm đáng kể chi phí thiết lập kết nối.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Chọn chế độ
const mode = ref('separate')

// Trạng thái chạy
const isRunning = ref(false)
const trips = ref(0)
const totalTime = ref(0)
const remainingBoxes = ref(6)
const deliveredBoxes = ref(0)

// Animation phương tiện
const vehicles = ref([])

// Tính điểm hiệu suất
const efficiency = computed(() => {
  if (mode.value === 'packed') {
    return trips.value <= 1 ? 'Xuất sắc' : 'Tốt'
  } else {
    return trips.value <= 3 ? 'Trung bình' : 'Kém hiệu quả'
  }
})

const efficiencyClass = computed(() => {
  const score = efficiency.value
  if (score === 'Xuất sắc') return 'excellent'
  if (score === 'Tốt') return 'good'
  if (score === 'Trung bình') return 'average'
  return 'poor'
})

// Bắt đầu mô phỏng
const startSimulation = async () => {
  if (isRunning.value) return

  isRunning.value = true
  resetStats()

  if (mode.value === 'separate') {
    // Vận chuyển tách rời: mỗi thùng một chuyến
    for (let i = 0; i < 6; i++) {
      await runTrip(1)
      trips.value++
    }
  } else {
    // Đóng gói vận chuyển: 6 thùng một chuyến
    await runTrip(6)
    trips.value = 1
  }

  isRunning.value = false
}

// Animation một chuyến đi
const runTrip = (cargoCount) => {
  return new Promise((resolve) => {
    // Tạo phương tiện
    const vehicle = {
      id: Date.now(),
      position: 0,
      cargo: cargoCount,
      isMoving: true
    }
    vehicles.value = [vehicle]

    // Cập nhật số thùng còn lại
    remainingBoxes.value = Math.max(0, remainingBoxes.value - cargoCount)

    // Animation: lượt đi
    const goTrip = setInterval(() => {
      vehicle.position += 2
      if (vehicle.position >= 100) {
        clearInterval(goTrip)

        // Đã giao
        deliveredBoxes.value += cargoCount

        // Animation: lượt về
        setTimeout(() => {
          const returnTrip = setInterval(() => {
            vehicle.position -= 2
            if (vehicle.position <= 0) {
              clearInterval(returnTrip)
              vehicles.value = []
              resolve()
            }
          }, 20)
        }, 300)
      }
    }, 20)

    // Cộng dồn thời gian
    totalTime.value += 2.5
  })
}

// Đặt lại mô phỏng
const resetSimulation = () => {
  isRunning.value = false
  vehicles.value = []
  resetStats()
}

const resetStats = () => {
  trips.value = 0
  totalTime.value = 0
  remainingBoxes.value = 6
  deliveredBoxes.value = 0
}
</script>

<style scoped>
.slice-request-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

/* Khu tiêu đề */
.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* Nội dung chính */
.demo-content {
  margin-bottom: 0.75rem;
}

/* Khung câu chuyện */
.story-box {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.story-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

/* Chọn chế độ */
.mode-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 160px;
  flex: 1;
  max-width: 220px;
}

.mode-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.mode-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.mode-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.mode-detail {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  display: inline-block;
}

.vs-divider {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
  padding: 0 0.5rem;
}

/* Khu animation */
.animation-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.location {
  text-align: center;
  min-width: 80px;
}

.location-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.location-label {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.boxes-remaining,
.boxes-delivered {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.count {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
}

.road {
  flex: 1;
  position: relative;
  height: 60px;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.road-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    var(--vp-c-brand) 0px,
    var(--vp-c-brand) 20px,
    transparent 20px,
    transparent 40px
  );
  transform: translateY(-50%);
}

.vehicle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: none;
}

.vehicle-body {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.vehicle-cargo {
  font-size: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.125rem 0.375rem;
  border-radius: 6px;
  margin-top: 0.125rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: var(--vp-c-brand);
}

/* Bảng thống kê */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  border: 2px solid var(--vp-c-divider);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.stat-value.good {
  color: var(--vp-c-success);
}

.stat-value.bad {
  color: var(--vp-c-danger);
}

.stat-value.excellent {
  color: var(--vp-c-brand);
}

.stat-value.poor {
  color: var(--vp-c-warning);
}

/* Nút điều khiển */
.controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* Khung thông tin */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

/* Responsive */
@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .animation-area {
    flex-direction: column;
    gap: 0.75rem;
  }

  .road {
    width: 100%;
    height: 60px;
  }

  .stats-panel {
    grid-template-columns: 1fr;
  }
}
</style>
