<!--
  RenderingStrategyDemo.vue - So sánh các chiến lược render
  Dùng ẩn dụ "nhà hàng dọn món" để giải thích ba kiểu render CSR, SSR, SSG
-->
<template>
  <div class="rendering-demo">
    <!-- Giới thiệu câu chuyện -->
    <div class="story-box">
      <div class="story-emoji">
        🍽️👨‍🍳⚡
      </div>
      <h4 class="story-title">
        Nhà hàng của Mai
      </h4>
      <p class="story-text">
        Mai mở một nhà hàng với ba cách dọn món:<br>
        <strong>CSR (render phía client)</strong>: đưa bạn nguyên liệu sơ chế, bạn tự nấu <br>
        <strong>SSR (render phía server)</strong>: bếp nấu xong rồi bưng ra cho bạn <br>
        <strong>SSG (sinh trang tĩnh)</strong>: nấu sẵn tất cả món rồi cất trong tủ giữ ấm
      </p>
    </div>

    <!-- Chọn chế độ -->
    <div class="mode-tabs">
      <button
        v-for="strategy in strategies"
        :key="strategy.id"
        class="tab-btn"
        :class="{ active: activeStrategy === strategy.id }"
        @click="activeStrategy = strategy.id"
      >
        <span class="tab-icon">{{ strategy.icon }}</span>
        <span class="tab-name">{{ strategy.name }}</span>
        <span class="tab-sub">{{ strategy.sub }}</span>
      </button>
    </div>

    <!-- Khu vực mô phỏng -->
    <div class="demo-container">
      <!-- Khu khách -->
      <div class="customer-area">
        <div class="customer-icon">
          🧑‍🦰
        </div>
        <div class="customer-label">
          Người dùng (trình duyệt)
        </div>
        <div class="table">
          <div
            v-if="activeStrategy === 'csr'"
            class="table-content"
          >
            <div class="ingredients-pack">
              <div class="pack-label">
                📦 Túi nguyên liệu
              </div>
              <div class="pack-content">
                <div class="ingredient">
                  🥬 Rau
                </div>
                <div class="ingredient">
                  🥩 Thịt
                </div>
                <div class="ingredient">
                  🧂 Gia vị
                </div>
              </div>
              <div class="instruction">
                ↑ Bạn hãy tự nấu nhé
              </div>
            </div>
          </div>
          <div
            v-else
            class="table-content ready"
          >
            <div class="dish">
              {{ currentStrategy.dish }}
            </div>
            <div class="dish-status">
              {{ currentStrategy.readyStatus }}
            </div>
          </div>
        </div>
      </div>

      <!-- Khu vận chuyển -->
      <div class="transfer-area">
        <div
          v-if="isAnimating"
          class="transfer-animation"
        >
          <div class="transfer-content">
            {{ currentStrategy.transferItem }}
          </div>
          <div class="transfer-arrow">
            →
          </div>
        </div>
        <div
          v-else
          class="transfer-info"
        >
          <div class="info-label">
            {{ currentStrategy.transferLabel }}
          </div>
        </div>
      </div>

      <!-- Bếp / Server -->
      <div class="kitchen-area">
        <div class="kitchen-icon">
          👨‍🍳
        </div>
        <div class="kitchen-label">
          {{ currentStrategy.serverLabel }}
        </div>
        <div class="kitchen-content">
          <div
            v-if="activeStrategy === 'csr'"
            class="server-station"
          >
            <div class="station-icon">
              📡
            </div>
            <div class="station-label">
              Trạm giao hàng
            </div>
            <div class="station-desc">
              Chỉ giao đồ, không nấu
            </div>
          </div>
          <div
            v-else-if="activeStrategy === 'ssr'"
            class="server-kitchen"
          >
            <div class="chef-action">
              {{ chefAction }}
            </div>
            <div
              v-if="isCooking"
              class="cooking-pot"
            >
              🍳
            </div>
          </div>
          <div
            v-else
            class="server-cabinet"
          >
            <div class="cabinet-icon">
              🗄️
            </div>
            <div class="cabinet-label">
              Tủ giữ ấm
            </div>
            <div class="cabinet-desc">
              {{ currentStrategy.cabinetDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chỉ số hiệu năng -->
    <div class="metrics-panel">
      <div class="metric-item">
        <div class="metric-label">
          Tốc độ first screen
        </div>
        <div class="metric-bar">
          <div
            class="metric-fill"
            :style="{ width: currentStrategy.firstScreenScore + '%', background: currentStrategy.color }"
          />
        </div>
        <div
          class="metric-value"
          :style="{ color: currentStrategy.color }"
        >
          {{ currentStrategy.firstScreenText }}
        </div>
      </div>
      <div class="metric-item">
        <div class="metric-label">
          Trải nghiệm tương tác
        </div>
        <div class="metric-bar">
          <div
            class="metric-fill"
            :style="{ width: currentStrategy.interactionScore + '%', background: currentStrategy.color }"
          />
        </div>
        <div
          class="metric-value"
          :style="{ color: currentStrategy.color }"
        >
          {{ currentStrategy.interactionText }}
        </div>
      </div>
      <div class="metric-item">
        <div class="metric-label">
          Độ thân thiện SEO
        </div>
        <div class="metric-bar">
          <div
            class="metric-fill"
            :style="{ width: currentStrategy.seoScore + '%', background: currentStrategy.color }"
          />
        </div>
        <div
          class="metric-value"
          :style="{ color: currentStrategy.color }"
        >
          {{ currentStrategy.seoText }}
        </div>
      </div>
    </div>

    <!-- Nút thao tác -->
    <div class="controls">
      <button
        class="btn btn-primary"
        :disabled="isAnimating"
        @click="startDemo"
      >
        {{ isAnimating ? 'Đang chạy...' : 'Bắt đầu demo' }}
      </button>
      <button
        class="btn btn-secondary"
        @click="resetDemo"
      >
        Đặt lại
      </button>
    </div>

    <!-- Bảng so sánh chi tiết -->
    <div class="comparison-table">
      <div class="table-title">
        📊 So sánh chi tiết ba kiểu render
      </div>
      <div class="table-content">
        <div class="comparison-row header">
          <div class="col-feature">
            Đặc điểm
          </div>
          <div class="col-csr">
            CSR
          </div>
          <div class="col-ssr">
            SSR
          </div>
          <div class="col-ssg">
            SSG
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Ẩn dụ
          </div>
          <div class="col-csr">
            Nhận túi nguyên liệu rồi tự nấu
          </div>
          <div class="col-ssr">
            Bếp nấu xong bưng ra
          </div>
          <div class="col-ssg">
            Nấu sẵn để trong tủ giữ ấm
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Tốc độ first screen
          </div>
          <div class="col-csr">
            Chậm (phải đợi JS)
          </div>
          <div class="col-ssr">
            Nhanh (trả HTML ngay)
          </div>
          <div class="col-ssg">
            Nhanh nhất (trả HTML ngay)
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Trải nghiệm tương tác
          </div>
          <div class="col-csr">
            Mượt (đã ở trình duyệt)
          </div>
          <div class="col-ssr">
            Khá mượt (tương tác vẫn cần JS)
          </div>
          <div class="col-ssg">
            Khá mượt (tương tác vẫn cần JS)
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Độ thân thiện SEO
          </div>
          <div class="col-csr">
            Kém (không index được nội dung)
          </div>
          <div class="col-ssr">
            Tốt (HTML đầy đủ)
          </div>
          <div class="col-ssg">
            Tốt (HTML đầy đủ)
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Áp lực server
          </div>
          <div class="col-csr">
            Nhỏ (chỉ gửi JS)
          </div>
          <div class="col-ssr">
            Lớn (render mỗi lần)
          </div>
          <div class="col-ssg">
            Nhỏ nhất (đã prerender)
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Tình huống phù hợp
          </div>
          <div class="col-csr">
            Hệ thống nội bộ, ứng dụng công cụ
          </div>
          <div class="col-ssr">
            Trang tin tức, trang chủ TMĐT
          </div>
          <div class="col-ssg">
            Blog, trang tài liệu
          </div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">
            Framework tiêu biểu
          </div>
          <div class="col-csr">
            React SPA, Vue SPA
          </div>
          <div class="col-ssr">
            Next.js SSR, Nuxt SSR
          </div>
          <div class="col-ssg">
            Next.js SSG, Nuxt SSG
          </div>
        </div>
      </div>
    </div>

    <!-- Điểm cốt lõi -->
    <div class="key-takeaway">
      <div class="takeaway-icon">
        🎯
      </div>
      <div class="takeaway-content">
        <strong>Chọn kiểu nào?</strong><br>
        <strong>CSR</strong>: phù hợp các ứng dụng cần tương tác phức tạp, không quan tâm SEO (ví dụ trang quản trị)<br>
        <strong>SSR</strong>: phù hợp các trang nội dung động cần first screen nhanh và SEO tốt (tin tức, TMĐT)<br>
        <strong>SSG</strong>: phù hợp các trang tĩnh có nội dung cố định (blog, trang tài liệu)<br>
        <strong>Cách làm hiện đại</strong>: render lai (hybrid) — trang chủ dùng SSG/SSR, các trang sau dùng CSR, vừa nhanh vừa mượt.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStrategy = ref('ssg')
const isAnimating = ref(false)
const isCooking = ref(false)
const chefAction = ref('👨‍🍳 Đang chuẩn bị...')

const strategies = {
  csr: {
    id: 'csr',
    name: 'CSR',
    sub: 'Render phía client',
    icon: '📦',
    dish: '⚠️ Chưa nấu',
    readyStatus: 'Đợi người dùng tự nấu',
    transferItem: '📦 Túi nguyên liệu',
    transferLabel: 'Giao túi nguyên liệu',
    serverLabel: 'Server (trạm giao hàng)',
    firstScreenScore: 40,
    firstScreenText: 'Chậm',
    interactionScore: 100,
    interactionText: 'Mượt',
    seoScore: 20,
    seoText: 'Kém',
    color: '#f44336',
    cabinetDesc: ''
  },
  ssr: {
    id: 'ssr',
    name: 'SSR',
    sub: 'Render phía server',
    icon: '👨‍🍳',
    dish: '🍲 Món vừa nấu xong',
    readyStatus: 'Nóng hổi, ăn được ngay',
    transferItem: '🍲 Món đã nấu',
    transferLabel: 'Nấu xong giao ngay',
    serverLabel: 'Server (bếp)',
    firstScreenScore: 90,
    firstScreenText: 'Nhanh',
    interactionScore: 85,
    interactionText: 'Khá mượt',
    seoScore: 100,
    seoText: 'Tốt',
    color: '#2196f3',
    cabinetDesc: ''
  },
  ssg: {
    id: 'ssg',
    name: 'SSG',
    sub: 'Sinh trang tĩnh',
    icon: '🗄️',
    dish: '🍲 Món đã nấu sẵn',
    readyStatus: 'Đang giữ ấm, ăn được ngay',
    transferItem: '🍲 Món làm sẵn',
    transferLabel: 'Lấy luôn',
    serverLabel: 'Server (tủ giữ ấm)',
    firstScreenScore: 100,
    firstScreenText: 'Nhanh nhất',
    interactionScore: 85,
    interactionText: 'Khá mượt',
    seoScore: 100,
    seoText: 'Tốt',
    color: '#4caf50',
    cabinetDesc: 'Mọi món đều đã nấu sẵn'
  }
}

const currentStrategy = computed(() => strategies[activeStrategy.value])

// Bắt đầu demo
const startDemo = async () => {
  if (isAnimating.value) return

  isAnimating.value = true

  if (activeStrategy.value === 'csr') {
    // CSR: giao túi nguyên liệu
    await sleep(1000)
  } else if (activeStrategy.value === 'ssr') {
    // SSR: bếp nấu món
    isCooking.value = true
    chefAction.value = '👨‍🍳 Đang nấu món...'
    await sleep(800)
    chefAction.value = '🍳 Đang nấu...'
    await sleep(800)
    chefAction.value = '✅ Nấu xong!'
    isCooking.value = false
    await sleep(400)
  } else {
    // SSG: lấy món sẵn
    await sleep(600)
  }

  isAnimating.value = false
}

// Đặt lại demo
const resetDemo = () => {
  isAnimating.value = false
  isCooking.value = false
  chefAction.value = '👨‍🍳 Đang chuẩn bị...'
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.rendering-demo {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* Khung câu chuyện */
.story-box {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border-radius: 16px;
  border: 2px dashed #ffc107;
}

.story-emoji {
  font-size: 48px;
  margin-bottom: 8px;
}

.story-title {
  font-size: 20px;
  font-weight: bold;
  color: #8b4513;
  margin: 0 0 8px 0;
}

.story-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* Tab chọn chế độ */
.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: #f5f5f5;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.tab-icon {
  font-size: 32px;
}

.tab-name {
  font-size: 16px;
  font-weight: bold;
}

.tab-sub {
  font-size: 12px;
  opacity: 0.8;
}

/* Khung demo */
.demo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  min-height: 300px;
}

.customer-area,
.kitchen-area {
  flex: 1;
  text-align: center;
}

.customer-icon,
.kitchen-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.customer-label,
.kitchen-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.table,
.kitchen-content {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
  min-height: 160px;
}

/* Túi nguyên liệu */
.ingredients-pack {
  text-align: center;
}

.pack-label {
  font-size: 16px;
  font-weight: bold;
  color: #f44336;
  margin-bottom: 12px;
}

.pack-content {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
}

.ingredient {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.instruction {
  font-size: 12px;
  color: #f44336;
  font-weight: 500;
}

/* Món đã nấu */
.table-content.ready {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dish {
  font-size: 64px;
}

.dish-status {
  font-size: 14px;
  color: #4caf50;
  font-weight: bold;
}

/* Khu bếp */
.server-station,
.server-kitchen,
.server-cabinet {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.station-icon,
.cabinet-icon {
  font-size: 48px;
}

.station-label,
.cabinet-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.station-desc,
.cabinet-desc {
  font-size: 12px;
  color: #666;
}

.chef-action {
  font-size: 18px;
  font-weight: bold;
  color: #2196f3;
}

.cooking-pot {
  font-size: 64px;
  animation: cook 0.5s ease-in-out infinite;
}

@keyframes cook {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Khu vận chuyển */
.transfer-area {
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: slideRight 1s ease-in-out;
}

@keyframes slideRight {
  0% { transform: translateX(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(20px); opacity: 0; }
}

.transfer-content {
  font-size: 40px;
}

.transfer-arrow {
  font-size: 32px;
  color: #4caf50;
}

.transfer-info {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.info-label {
  padding: 8px 16px;
  background: #e0e0e0;
  border-radius: 6px;
}

/* Chỉ số hiệu năng */
.metrics-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.metric-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e0e0e0;
}

.metric-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  text-align: center;
}

.metric-bar {
  height: 12px;
  background: #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.metric-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 6px;
}

.metric-value {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

/* Nút điều khiển */
.controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

/* Bảng so sánh */
.comparison-table {
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  overflow: hidden;
  margin-bottom: 20px;
}

.table-title {
  padding: 16px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  font-size: 16px;
  font-weight: bold;
  color: #1565c0;
  text-align: center;
}

.table-content {
  padding: 0;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-row:last-child {
  border-bottom: none;
}

.comparison-row.header {
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.col-feature {
  color: #666;
  font-size: 13px;
  font-weight: 500;
}

.col-csr {
  color: #f44336;
  font-size: 12px;
}

.col-ssr {
  color: #2196f3;
  font-size: 12px;
}

.col-ssg {
  color: #4caf50;
  font-size: 12px;
}

.comparison-row.header .col-csr,
.comparison-row.header .col-ssr,
.comparison-row.header .col-ssg {
  color: #333;
  font-size: 13px;
}

/* Điểm cốt lõi */
.key-takeaway {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.takeaway-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.takeaway-content {
  flex: 1;
  font-size: 14px;
  color: #155724;
  line-height: 1.8;
}

/* Responsive */
@media (max-width: 768px) {
  .mode-tabs {
    flex-direction: column;
  }

  .demo-container {
    flex-direction: column;
    gap: 12px;
  }

  .transfer-area {
    transform: rotate(90deg);
  }

  .metrics-panel {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .comparison-row.header {
    display: none;
  }
}
</style>
