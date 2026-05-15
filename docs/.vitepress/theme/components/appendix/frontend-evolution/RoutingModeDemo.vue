<!--
  RoutingModeDemo.vue - So sánh chế độ định tuyến MPA và SPA
  Dùng ẩn dụ "lật sách vs đổi trang" để giải thích khác biệt giữa MPA và SPA
-->
<template>
  <div class="routing-demo">
    <!-- Khu tiêu đề -->
    <div class="demo-header">
      <span class="icon">📖</span>
      <span class="title">So sánh chế độ định tuyến</span>
      <span class="subtitle">MPA (multi-page app) vs SPA (single-page app)</span>
    </div>

    <!-- Nội dung chính -->
    <div class="demo-content">
      <!-- Giới thiệu câu chuyện -->
      <div class="story-box">
        <p class="story-text">
          <strong>Nói nôm na:</strong> Minh thích đọc sách và có hai cách đọc:<br>
          <strong>Cách MPA (như lật sách)</strong>: mỗi lần lật trang phải đổi sang một quyển khác<br>
          <strong>Cách SPA (như đổi trang)</strong>: thay nội dung ngay trong cùng một quyển sách
        </p>
      </div>

      <!-- Chọn chế độ -->
      <div class="mode-selector">
        <div
          class="mode-card"
          :class="{ active: mode === 'mpa' }"
          @click="switchMode('mpa')"
        >
          <div class="mode-icon">
            📚
          </div>
          <div class="mode-name">
            MPA - multi-page app
          </div>
          <div class="mode-sub">
            Nói nôm na: như lật sách
          </div>
          <div class="mode-desc">
            Mỗi lần bấm link, trình duyệt xin server một trang mới
          </div>
        </div>

        <div class="vs-divider">
          VS
        </div>

        <div
          class="mode-card"
          :class="{ active: mode === 'spa' }"
          @click="switchMode('spa')"
        >
          <div class="mode-icon">
            📄
          </div>
          <div class="mode-name">
            SPA - single-page app
          </div>
          <div class="mode-sub">
            Nói nôm na: như đổi trang
          </div>
          <div class="mode-desc">
            Chỉ tải một lần, sau đó chỉ đổi nội dung
          </div>
        </div>
      </div>

      <!-- Demo có animation -->
      <div class="demo-area">
        <div class="demo-header">
          <span>Chế độ hiện tại:</span>
          <span
            class="mode-badge"
            :class="mode"
          >{{ mode === 'mpa' ? 'MPA - multi-page app' : 'SPA - single-page app' }}</span>
        </div>

        <!-- Mô phỏng tình huống -->
        <div class="scene-container">
          <!-- Kệ sách (server) -->
          <div class="server-side">
            <div class="server-icon">
              📚
            </div>
            <div class="server-label">
              Kệ sách (server)
            </div>
            <div class="books-shelf">
              <div
                v-for="page in pages"
                :key="page.id"
                class="book-item"
                :class="{
                  active: currentPage === page.id,
                  loading: mode === 'mpa' && isLoading && page.id === targetPage
                }"
              >
                {{ page.emoji }}
              </div>
            </div>
          </div>

          <!-- Quá trình truyền -->
          <div class="transfer-area">
            <div
              v-if="mode === 'mpa' && isLoading"
              class="transfer-animation"
            >
              <div class="transfer-icon">
                {{ pages.find(p => p.id === targetPage)?.emoji }}
              </div>
              <div class="transfer-arrow">
                →
              </div>
            </div>
            <div
              v-else
              class="transfer-placeholder"
            >
              <span>{{ mode === 'mpa' ? 'Bấm để truyền trang' : 'Không cần truyền' }}</span>
            </div>
          </div>

          <!-- Khu đọc (trình duyệt) -->
          <div class="browser-side">
            <div class="browser-icon">
              📖
            </div>
            <div class="browser-label">
              Khu đọc (trình duyệt)
            </div>
            <div class="reading-paper">
              <Transition
                :name="mode === 'mpa' ? 'page-flip' : 'content-fade'"
                mode="out-in"
              >
                <div
                  :key="currentPage"
                  class="page-content"
                >
                  <div class="page-emoji">
                    {{ getCurrentPage.emoji }}
                  </div>
                  <div class="page-title">
                    {{ getCurrentPage.title }}
                  </div>
                  <div class="page-text">
                    {{ getCurrentPage.content }}
                  </div>
                </div>
              </Transition>

              <!-- Kiểm thử giữ state -->
              <div class="state-test">
                <div class="test-label">
                  ✏️ Kiểm thử giữ state:
                </div>
                <input
                  v-model="userInput"
                  type="text"
                  placeholder="Nhập gì đó ở đây rồi chuyển trang..."
                  class="test-input"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Điều khiển điều hướng -->
        <div class="navigation-controls">
          <div class="nav-label">
            Chuyển trang:
          </div>
          <div class="nav-buttons">
            <button
              v-for="page in pages"
              :key="page.id"
              class="nav-btn"
              :class="{ active: currentPage === page.id }"
              :disabled="isLoading"
              @click="navigateTo(page.id)"
            >
              {{ page.emoji }} {{ page.title }}
            </button>
          </div>
        </div>

        <!-- Trạng thái -->
        <div class="status-indicator">
          <div
            v-if="mode === 'mpa'"
            class="status-text mpa"
          >
            <span class="status-icon">📚</span>
            <span>Mỗi lần chuyển trang đều phải lấy sách mới từ kệ (request lên server)</span>
          </div>
          <div
            v-else
            class="status-text spa"
          >
            <span class="status-icon">⚡</span>
            <span>Nội dung đã tải sẵn rồi, chuyển trang không cần lấy lại (định tuyến phía client)</span>
          </div>
        </div>
      </div>

      <!-- Bảng so sánh -->
      <div class="comparison-table">
        <div class="table-title">
          📊 So sánh MPA và SPA
        </div>
        <div class="table-content">
          <div class="comparison-row header">
            <div class="col-feature">
              Đặc điểm
            </div>
            <div class="col-mpa">
              MPA - multi-page app
            </div>
            <div class="col-spa">
              SPA - single-page app
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Ẩn dụ
            </div>
            <div class="col-mpa">
              Lật sách: mỗi lần lật là một quyển mới
            </div>
            <div class="col-spa">
              Đổi trang: thay nội dung trong cùng quyển sách
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Chuyển trang
            </div>
            <div class="col-mpa">
              Mỗi lần đều tải lại toàn bộ trang
            </div>
            <div class="col-spa">
              Chỉ tải một lần, sau đó chỉ đổi nội dung
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Cảm giác về tốc độ
            </div>
            <div class="col-mpa">
              Mỗi lần đều có pha "trắng màn hình - tải lại"
            </div>
            <div class="col-spa">
              Chuyển trang mượt, không trắng màn hình
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Giữ state
            </div>
            <div class="col-mpa">
              Chuyển trang xong, nội dung đã nhập mất hết
            </div>
            <div class="col-spa">
              Chuyển trang xong, nội dung đã nhập vẫn còn
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Công cụ tìm kiếm
            </div>
            <div class="col-mpa">
              Dễ được index (thân thiện SEO)
            </div>
            <div class="col-spa">
              Cần xử lý thêm mới được index
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              First screen
            </div>
            <div class="col-mpa">
              Server trả HTML trực tiếp, first screen nhanh
            </div>
            <div class="col-spa">
              Phải tải JS trước, first screen có thể chậm
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              Tình huống phù hợp
            </div>
            <div class="col-mpa">
              Blog, tin tức, website doanh nghiệp
            </div>
            <div class="col-spa">
              Sàn TMĐT, ứng dụng nghe nhạc, hệ thống quản trị
            </div>
          </div>
        </div>
      </div>

      <!-- Điểm cốt lõi -->
      <div class="info-box">
        <span class="icon">💡</span>
        <strong>Ý chính:</strong>
        <strong>MPA</strong> mỗi lần chuyển trang đều "refresh cả trang", giống lật sách, hợp với các trang thiên về nội dung;
        <strong>SPA</strong> chỉ tải một lần rồi "cập nhật cục bộ", giống đổi trang, hợp với các app có tương tác phức tạp.
        Mấu chốt nằm ở: <strong>state có bị mất hay không</strong>.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Chọn chế độ
const mode = ref('spa')
const currentPage = ref(1)
const targetPage = ref(1)
const isLoading = ref(false)
const userInput = ref('')

// Dữ liệu các trang
const pages = [
  { id: 1, emoji: '🏠', title: 'Trang chủ', content: 'Chào mừng đến trang chủ! Đây là cổng vào của website.' },
  { id: 2, emoji: '🛍️', title: 'Sản phẩm', content: 'Khu trưng bày toàn bộ sản phẩm, bạn có thể xem và mua.' },
  { id: 3, emoji: '🛒', title: 'Giỏ hàng', content: 'Giỏ hàng chứa các món bạn đã chọn, có thể thanh toán.' },
  { id: 4, emoji: '👤', title: 'Tài khoản', content: 'Trang cá nhân, xem đơn hàng và thông tin của bạn.' }
]

// Lấy trang hiện tại
const getCurrentPage = computed(() => {
  return pages.find(p => p.id === currentPage.value) || pages[0]
})

// Đổi chế độ
const switchMode = (newMode) => {
  mode.value = newMode
  currentPage.value = 1
  userInput.value = ''
}

// Điều hướng đến trang chỉ định
const navigateTo = async (pageId) => {
  if (pageId === currentPage.value || isLoading.value) return

  targetPage.value = pageId

  if (mode.value === 'mpa') {
    // Chế độ MPA: mô phỏng độ trễ network
    isLoading.value = true
    await sleep(800)
    currentPage.value = pageId
    isLoading.value = false
  } else {
    // Chế độ SPA: chuyển ngay lập tức
    currentPage.value = pageId
  }
}

// Hàm phụ trợ
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.routing-demo {
  border: 2px solid var(--vp-c-divider);
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

/* Chọn chế độ */
.mode-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.mode-card {
  flex: 1;
  min-width: 200px;
  max-width: 280px;
  background: white;
  border: 3px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: #4caf50;
  background: #e8f5e9;
}

.mode-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.mode-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.mode-sub {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.mode-desc {
  font-size: 12px;
  color: #999;
}

.vs-divider {
  font-size: 24px;
  font-weight: bold;
  color: #999;
  padding: 0 8px;
}

/* Khu demo */
.demo-area {
  background: white;
  border-radius: 16px;
  border: 2px solid var(--vp-c-divider);
  padding: 20px;
  margin-bottom: 24px;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 14px;
}

.mode-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.mode-badge.mpa {
  background: #fff3e0;
  color: #e65100;
}

.mode-badge.spa {
  background: #e3f2fd;
  color: #1565c0;
}

/* Mô phỏng tình huống */
.scene-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  min-height: 280px;
}

.server-side,
.browser-side {
  flex: 1;
  text-align: center;
}

.server-icon,
.browser-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.server-label,
.browser-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}

.books-shelf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 12px;
}

.book-item {
  width: 40px;
  height: 56px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.book-item.active {
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.book-item.loading {
  animation: pulse 0.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* Khu vận chuyển */
.transfer-area {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: slideRight 0.8s ease-in-out;
}

@keyframes slideRight {
  0% { transform: translateX(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(20px); opacity: 0; }
}

.transfer-icon {
  font-size: 32px;
}

.transfer-arrow {
  font-size: 24px;
  color: #4caf50;
}

.transfer-placeholder {
  font-size: 12px;
  color: #999;
}

/* Khu đọc */
.reading-paper {
  background: white;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 200px;
}

.page-content {
  text-align: center;
}

.page-emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.page-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.state-test {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px dashed var(--vp-c-divider);
}

.test-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  text-align: left;
}

.test-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;
}

.test-input:focus {
  outline: none;
  border-color: #667eea;
}

/* Điều khiển điều hướng */
.navigation-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.nav-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.nav-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.nav-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Hiển thị trạng thái */
.status-indicator {
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
}

.status-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.status-text.mpa {
  background: #fff3e0;
  color: #e65100;
  padding: 8px 16px;
  border-radius: 6px;
}

.status-text.spa {
  background: #e3f2fd;
  color: #1565c0;
  padding: 8px 16px;
  border-radius: 6px;
}

.status-icon {
  font-size: 18px;
}

/* Bảng so sánh */
.comparison-table {
  background: white;
  border-radius: 16px;
  border: 2px solid var(--vp-c-divider);
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
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
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
}

.col-mpa {
  color: #e65100;
  font-size: 13px;
}

.col-spa {
  color: #1565c0;
  font-size: 13px;
}

.comparison-row.header .col-mpa,
.comparison-row.header .col-spa {
  color: #333;
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
  line-height: 1.6;
}

/* Animation */
.page-flip-enter-active,
.page-flip-leave-active {
  transition: all 0.4s ease;
}

.page-flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg);
}

.page-flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .scene-container {
    flex-direction: column;
  }

  .transfer-area {
    transform: rotate(90deg);
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
