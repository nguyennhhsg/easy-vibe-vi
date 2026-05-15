<!--
  ResponsiveGridDemo.vue - Tủ quần áo phép thuật
  Dùng phép so sánh "quần áo tự gấp xếp" để giải thích bố cục responsive
-->
<template>
  <div class="magic-closet">
    <!-- Mở đầu câu chuyện -->
    <div class="story-box">
      <div class="story-emoji">
        👗✨🚪
      </div>
      <h4 class="story-title">
        Tủ quần áo phép thuật của Mai
      </h4>
      <p class="story-text">
        Mai có một chiếc tủ quần áo phép thuật! Dù bạn đặt nó trong phòng lớn hay phòng nhỏ,<br>
        <strong>quần áo bên trong sẽ tự gấp gọn, sắp xếp hoàn hảo theo kích thước không gian!</strong>
      </p>
    </div>

    <!-- Điều chỉnh độ rộng tủ -->
    <div class="closet-control">
      <div class="control-label">
        <span>🚪 Kéo thanh trượt để đặt tủ vào các phòng khác nhau:</span>
        <span class="room-label">{{ currentRoom.name }}</span>
      </div>

      <div class="slider-box">
        <span class="slider-emoji">🏠 Nhỏ</span>
        <input
          v-model="closetWidth"
          type="range"
          :min="280"
          :max="900"
          step="10"
          class="magic-slider"
        >
        <span class="slider-emoji">Lớn 🏰</span>
      </div>

      <div class="width-hint">
        Độ rộng tủ hiện tại: <strong>{{ closetWidth }}px</strong> | Mỗi hàng chứa được <strong>{{ clothesPerRow }}</strong> món đồ
      </div>
    </div>

    <!-- Hiển thị tủ phép thuật -->
    <div
      class="closet-display"
      :style="{ width: closetWidth + 'px' }"
    >
      <div class="closet-header">
        <span class="closet-icon">🚪</span>
        <span class="closet-title">Tủ quần áo phép thuật của Mai</span>
        <span class="closet-icon">🪄</span>
      </div>

      <div class="closet-interior">
        <div
          class="clothes-rack"
          :style="rackStyle"
        >
          <div
            v-for="(item, index) in clothes"
            :key="index"
            class="clothing-item"
            :class="{ 'folded': isSmallSpace }"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="item-hanger">
              🪝
            </div>
            <div class="item-emoji">
              {{ item.emoji }}
            </div>
            <div class="item-name">
              {{ item.name }}
            </div>
            <div
              v-if="isSmallSpace"
              class="fold-hint"
            >
              Đã gấp gọn!
            </div>
          </div>
        </div>
      </div>

      <div class="closet-footer">
        <span>✨ Số món đồ: {{ clothes.length }}</span>
        <span>📐 Cách sắp xếp: {{ arrangementMode }}</span>
      </div>
    </div>

    <!-- Giải thích nguyên lý phép thuật -->
    <div class="magic-explain">
      <div class="explain-title">
        🔮 Bí mật của phép thuật
      </div>
      <div class="explain-cards">
        <div class="explain-card">
          <div class="card-icon">
            📱
          </div>
          <div class="card-title">
            Phòng nhỏ (điện thoại)
          </div>
          <div class="card-desc">
            Tủ chỉ rộng 320px, quần áo tự gấp gọn, xếp <strong>1 cột</strong>
          </div>
        </div>
        <div class="explain-arrow">
          ➡️
        </div>
        <div class="explain-card">
          <div class="card-icon">
            📲
          </div>
          <div class="card-title">
            Phòng vừa (tablet)
          </div>
          <div class="card-desc">
            Tủ rộng 768px, quần áo mở rộng, xếp <strong>2 cột</strong>
          </div>
        </div>
        <div class="explain-arrow">
          ➡️
        </div>
        <div class="explain-card">
          <div class="card-icon">
            💻
          </div>
          <div class="card-title">
            Phòng lớn (máy tính)
          </div>
          <div class="card-desc">
            Tủ rộng 1200px, quần áo mở hết, xếp <strong>3 cột</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Hiển thị code -->
    <div class="code-section">
      <div class="code-header">
        <span>💻 Câu thần chú (mã CSS)</span>
        <span class="code-tag">CSS</span>
      </div>
      <pre class="code-content"><code>/* Mặc định: phòng nhỏ, quần áo xếp 1 cột */
.closet {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;  /* 1 cột */
}

/* Phòng vừa: quần áo xếp 2 cột */
@media (min-width: 640px) {
  .closet {
    grid-template-columns: repeat(2, 1fr);  /* 2 cột */
  }
}

/* Phòng lớn: quần áo xếp 3 cột */
@media (min-width: 1024px) {
  .closet {
    grid-template-columns: repeat(3, 1fr);  /* 3 cột */
  }
}</code></pre>
    </div>

    <!-- Tóm tắt -->
    <div class="summary-box">
      <div class="summary-icon">
        🎯
      </div>
      <div class="summary-content">
        <strong>Điểm rút ra:</strong>
        Bố cục responsive giống như tủ phép thuật của Mai, <strong>cùng một bộ quần áo (nội dung)</strong>
        sẽ tự điều chỉnh cách sắp xếp theo <strong>kích thước phòng (độ rộng màn hình)</strong>!
        Đó chính là phép màu của CSS Media Query!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Độ rộng tủ (mô phỏng độ rộng màn hình)
const closetWidth = ref(375)

// Các loại phòng
const rooms = [
  { name: 'Phòng nhỏ (điện thoại)', min: 280, max: 639, cols: 1, icon: '📱' },
  { name: 'Phòng vừa (tablet)', min: 640, max: 1023, cols: 2, icon: '📲' },
  { name: 'Phòng lớn (máy tính)', min: 1024, max: 900, cols: 3, icon: '💻' }
]

// Phòng hiện tại
const currentRoom = computed(() => {
  const room = rooms.find(r => closetWidth.value >= r.min && closetWidth.value <= r.max)
  return room || rooms[0]
})

// Số quần áo mỗi hàng
const clothesPerRow = computed(() => currentRoom.value.cols)

// Có phải không gian nhỏ (cần gấp gọn)
const isSmallSpace = computed(() => closetWidth.value < 500)

// Mô tả cách sắp xếp
const arrangementMode = computed(() => {
  if (closetWidth.value < 640) return 'Chế độ không gian nhỏ (gấp gọn)'
  if (closetWidth.value < 1024) return 'Không gian vừa (mở rộng)'
  return 'Không gian lớn (mở hết)'
})

// Kiểu lưới của tủ
const rackStyle = computed(() => {
  const cols = currentRoom.value.cols
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '10px'
  }
})

// Danh sách quần áo
const clothes = [
  { emoji: '👗', name: 'Váy liền' },
  { emoji: '👔', name: 'Áo sơ mi' },
  { emoji: '👖', name: 'Quần jeans' },
  { emoji: '🧥', name: 'Áo khoác' },
  { emoji: '👘', name: 'Kimono' },
  { emoji: '🥻', name: 'Sari' }
]
</script>

<style scoped>
.magic-closet {
  border: 2px solid #e0d5c8;
  border-radius: 16px;
  background: linear-gradient(135deg, #faf6f0 0%, #f5ebe0 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* Khung câu chuyện */
.story-box {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff5e6, #ffecd2);
  border-radius: 16px;
  border: 2px dashed #ffb347;
}

.story-emoji {
  font-size: 48px;
  margin-bottom: 8px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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

/* Điều khiển tủ */
.closet-control {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
}

.room-label {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.slider-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.slider-emoji {
  font-size: 20px;
}

.magic-slider {
  flex: 1;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #ffb347, #ff6b6b, #4ecdc4);
  border-radius: 5px;
  outline: none;
}

.magic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  background: white;
  border: 4px solid #ff6b6b;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.width-hint {
  text-align: center;
  font-size: 13px;
  color: #666;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 6px;
}

/* Hiển thị tủ */
.closet-display {
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #8b4513, #a0522d);
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.closet-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #d2691e, #cd853f);
  border-radius: 12px 12px 0 0;
}

.closet-icon {
  font-size: 24px;
}

.closet-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.closet-interior {
  background: linear-gradient(135deg, #f5f5dc, #faf0e6);
  padding: 16px;
  min-height: 200px;
}

.clothes-rack {
  display: grid;
  gap: 12px;
}

.clothing-item {
  background: white;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: popIn 0.5s ease both;
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

.clothing-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.clothing-item.folded {
  padding: 8px;
}

.item-hanger {
  font-size: 20px;
  margin-bottom: 4px;
}

.item-emoji {
  font-size: 40px;
  margin-bottom: 4px;
  display: block;
}

.clothing-item.folded .item-emoji {
  font-size: 28px;
}

.item-name {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

.clothing-item.folded .item-name {
  font-size: 11px;
}

.fold-hint {
  font-size: 10px;
  color: #ff6b6b;
  margin-top: 4px;
  font-weight: bold;
}

.closet-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #d2691e, #cd853f);
  border-radius: 0 0 12px 12px;
  font-size: 12px;
  color: white;
}

/* Giải thích nguyên lý phép thuật */
.magic-explain {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px dashed #7e57c2;
}

.explain-title {
  font-size: 18px;
  font-weight: bold;
  color: #5e35b1;
  text-align: center;
  margin-bottom: 16px;
}

.explain-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.explain-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.explain-arrow {
  font-size: 24px;
  color: #7e57c2;
}

/* Khu vực code */
.code-section {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: bold;
}

.code-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.code-content {
  margin: 0;
  padding: 16px;
  background: #2d2d2d;
  color: #f8f8f2;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

/* Khung tóm tắt */
.summary-box {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.summary-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.summary-content {
  flex: 1;
  font-size: 14px;
  color: #155724;
  line-height: 1.6;
}

/* Điều chỉnh responsive */
@media (max-width: 768px) {
  .explain-cards {
    flex-direction: column;
  }

  .explain-arrow {
    transform: rotate(90deg);
  }

  .closet-display {
    transform: scale(0.9);
    transform-origin: top center;
  }
}
</style>
