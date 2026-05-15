<template>
  <div class="sand-demo">
    <div class="demo-label">Từ cát đến trí tuệ ── mỗi lớp là một lớp bao bọc cho lớp dưới</div>

    <div class="layers">
      <div
        v-for="(layer, i) in layers"
        :key="i"
        class="layer-row"
        :class="{ active: activeLayer === i }"
        @mouseenter="activeLayer = i"
        @mouseleave="activeLayer = null"
      >
        <div class="layer-num">{{ i + 1 }}</div>
        <div class="layer-icon">{{ layer.icon }}</div>
        <div class="layer-body">
          <div class="layer-name">{{ layer.name }}</div>
          <div class="layer-desc">{{ layer.desc }}</div>
        </div>
        <div class="layer-scale">{{ layer.scale }}</div>
        <div v-if="i < layers.length - 1" class="arrow-down">
          <span class="arrow-label">{{ layer.arrow }}</span>
        </div>
      </div>
    </div>

    <div class="demo-caption">
      Trừu tượng hóa qua từng lớp, vật liệu vật lý ở đáy cuối cùng trở thành nền tảng tính toán đa năng
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref(null)

const layers = [
  {
    icon: '🏖️',
    name: 'Cát (silicon)',
    desc: 'Một trong những nguyên tố giàu nhất Trái Đất, tinh luyện thành silicon tinh khiết cao',
    scale: 'Nguyên liệu thô',
    arrow: 'Tinh luyện → cắt'
  },
  {
    icon: '💿',
    name: 'Wafer silicon',
    desc: 'Tấm silicon đơn tinh thể đường kính khoảng 30cm, bề mặt cực kỳ mịn',
    scale: 'Đế nền',
    arrow: 'Quang khắc → ăn mòn → pha tạp'
  },
  {
    icon: '🔌',
    name: 'Transistor (công tắc)',
    desc: 'Gate=1 thông, Gate=0 ngắt, dùng điện áp điều khiển dòng điện',
    scale: 'Hàng chục tỷ / chip',
    arrow: 'Ghép thành mạch logic'
  },
  {
    icon: '🔲',
    name: 'Cổng logic',
    desc: 'AND / OR / NOT / XOR, thực hiện phép toán Boolean cơ bản',
    scale: 'Hàng tỷ',
    arrow: 'Ghép thành module chức năng'
  },
  {
    icon: '⚙️',
    name: 'Khối chức năng',
    desc: 'Bộ cộng, thanh ghi, bộ chọn đa kênh... mỗi khối một nhiệm vụ',
    scale: 'Hàng trăm',
    arrow: 'Tích hợp thành bộ xử lý'
  },
  {
    icon: '🧠',
    name: 'Nhân CPU',
    desc: 'ALU + bộ điều khiển + tập thanh ghi, fetch → decode → execute → write back',
    scale: '1–128 nhân',
    arrow: 'Lập trình phần mềm'
  },
  {
    icon: '🚀',
    name: 'Ứng dụng phần mềm',
    desc: 'Hệ điều hành / AI / game / web... tất cả đều là chỉ thị',
    scale: 'Vô hạn khả năng',
    arrow: ''
  }
]
</script>

<style scoped>
.sand-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.layers {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.layer-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 6px;
  position: relative;
  transition: all 0.15s;
  cursor: default;
}

.layer-row:hover,
.layer-row.active {
  background: var(--vp-c-bg);
}

.layer-num {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.layer-row.active .layer-num {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.layer-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.layer-body {
  flex: 1;
  min-width: 0;
}

.layer-name {
  font-size: 0.88rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.layer-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.layer-scale {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  flex-shrink: 0;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

/* ── arrow between layers ── */
.arrow-down {
  position: absolute;
  left: 1.1rem;
  bottom: -0.55rem;
  z-index: 1;
}

.arrow-label {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0 0.3rem;
  white-space: nowrap;
}

.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  text-align: center;
}

@media (max-width: 600px) {
  .layer-scale {
    display: none;
  }
}
</style>
