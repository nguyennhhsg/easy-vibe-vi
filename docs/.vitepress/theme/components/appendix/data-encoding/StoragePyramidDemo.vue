<template>
  <div class="storage-pyramid-demo">
    <div class="pyramid-area">
      <div
        v-for="(layer, i) in layers"
        :key="layer.name"
        class="pyramid-layer"
        :class="[layer.colorClass, { active: selectedLayer === i }]"
        :style="{ width: (40 + i * 15) + '%' }"
        @click="selectedLayer = i"
      >
        <span class="layer-icon">{{ layer.icon }}</span>
        <span class="layer-name">{{ layer.name }}</span>
        <span class="layer-speed">{{ layer.speedLabel }}</span>
      </div>
    </div>

    <div v-if="currentLayer" class="detail-panel">
      <div class="detail-header">
        <span class="detail-icon">{{ currentLayer.icon }}</span>
        <span class="detail-name">{{ currentLayer.name }}</span>
        <span class="detail-badge" :class="currentLayer.colorClass">{{ currentLayer.speedLabel }}</span>
      </div>

      <div class="detail-stats">
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>Tốc độ truy cập</span>
            <span class="stat-val">{{ currentLayer.speed }}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" :class="currentLayer.colorClass" :style="{ width: currentLayer.speedPct + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>Dung lượng điển hình</span>
            <span class="stat-val">{{ currentLayer.capacity }}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill cap-bar" :style="{ width: currentLayer.capacityPct + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>Giá mỗi GB</span>
            <span class="stat-val">{{ currentLayer.price }}</span>
          </div>
        </div>
      </div>

      <div class="analogy-box">
        <div>
          <strong>Ví von đời thường:</strong> {{ currentLayer.analogy }}
        </div>
      </div>

      <div class="use-case-box">
        <strong>Dùng thực tế:</strong> {{ currentLayer.useCase }}
      </div>
    </div>

    <div class="insight-bar">
      <strong>Mẹo:</strong> Càng nhanh càng đắt, càng chậm càng to. CPU cache cực nhanh nhưng chỉ vài MB, ổ HDD cơ học tuy chậm nhưng rẻ và chứa được tới TB. Hệ điều hành sẽ tự động đưa dữ liệu qua lại giữa các tầng, đó là <strong>kiến trúc phân tầng lưu trữ (storage hierarchy)</strong>.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const layers = [
  {
    name: 'Thanh ghi CPU',
    icon: 'L0',
    speedLabel: 'Cực nhanh',
    colorClass: 'tier-0',
    speed: '< 1 nano giây',
    speedPct: 98,
    capacity: 'Vài trăm byte',
    capacityPct: 2,
    price: 'Cực đắt (tích hợp trong CPU)',
    analogy: 'Như con số bạn đang "nghĩ" trong đầu, lấy ra dùng tức thì, nhưng chỉ nhớ được một hai cái.',
    useCase: 'Dùng tạm thời để chứa toán hạng và lệnh khi CPU tính toán, lập trình viên gần như không cần quản lý trực tiếp.'
  },
  {
    name: 'CPU Cache',
    icon: 'L1',
    speedLabel: 'Rất nhanh',
    colorClass: 'tier-1',
    speed: '5-50 nano giây',
    speedPct: 82,
    capacity: 'Vài KB đến vài chục MB',
    capacityPct: 5,
    price: 'Đắt',
    analogy: 'Như tờ giấy note trên bàn làm việc, đặt mấy thứ vừa dùng gần đây, lấy ra cực nhanh, nhưng diện tích bàn có hạn.',
    useCase: 'Cache lại dữ liệu RAM truy cập thường xuyên gần đây, giảm thời gian CPU phải chờ. Hầu hết chương trình nhạy về hiệu năng đều quan tâm cách viết "thân thiện với cache".'
  },
  {
    name: 'RAM',
    icon: 'L2',
    speedLabel: 'Nhanh',
    colorClass: 'tier-2',
    speed: 'Vài chục đến 100 nano giây',
    speedPct: 60,
    capacity: 'Vài GB đến vài trăm GB',
    capacityPct: 25,
    price: 'Trung bình (khoảng 100k VND/GB)',
    analogy: 'Như mấy tab trình duyệt đang mở, mất điện là bay hết, nhưng toàn bộ công việc hiện tại đều ở đây.',
    useCase: 'Các chương trình đang chạy, hệ điều hành, file đang mở đều nằm trong RAM. Hết RAM thì chương trình lag, thậm chí crash.'
  },
  {
    name: 'SSD',
    icon: 'L3',
    speedLabel: 'Khá nhanh',
    colorClass: 'tier-3',
    speed: '~100 micro giây',
    speedPct: 35,
    capacity: 'Vài trăm GB đến vài TB',
    capacityPct: 60,
    price: 'Rẻ (khoảng 2k VND/GB)',
    analogy: 'Như thư mục trong máy tính của bạn, tắt máy đi dữ liệu vẫn còn, nhưng chậm hơn RAM cả nghìn lần.',
    useCase: 'Lưu hệ điều hành, ứng dụng, file người dùng. NVMe SSD hiện nay đã rất nhanh rồi.'
  },
  {
    name: 'Ổ cứng HDD',
    icon: 'L4',
    speedLabel: 'Chậm',
    colorClass: 'tier-4',
    speed: '~10 mili giây',
    speedPct: 15,
    capacity: 'Vài TB đến vài chục TB',
    capacityPct: 90,
    price: 'Rẻ nhất (khoảng 400 VND/GB)',
    analogy: 'Như tủ hồ sơ trong kho, dung lượng to, rẻ, nhưng tìm gì cũng phải đi tới lục, chậm.',
    useCase: 'Lưu dữ liệu lạnh số lượng lớn, backup, file video giám sát. Đa số laptop hiện nay đã chuyển sang dùng SSD.'
  }
]

const selectedLayer = ref(2)  // default: RAM

const currentLayer = computed(() => layers[selectedLayer.value])
</script>

<style scoped>
.storage-pyramid-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pyramid-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.pyramid-layer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  user-select: none;
}

.pyramid-layer:hover { filter: brightness(1.05); transform: scaleX(1.01); }
.pyramid-layer.active { border-color: var(--vp-c-text-1); filter: brightness(1.08); }

.tier-0 { background: linear-gradient(90deg, #7c3aed22, #7c3aed44); border-left: 4px solid #7c3aed; }
.tier-1 { background: linear-gradient(90deg, #2563eb22, #2563eb44); border-left: 4px solid #2563eb; }
.tier-2 { background: linear-gradient(90deg, #059669 22, #05966944); border-left: 4px solid #059669; }
.tier-3 { background: linear-gradient(90deg, #d97706 22, #d9770644); border-left: 4px solid #d97706; }
.tier-4 { background: linear-gradient(90deg, #dc262622, #dc262644); border-left: 4px solid #dc2626; }

.tier-0.active, .tier-0:hover { background: #7c3aed22; }
.tier-1.active, .tier-1:hover { background: #2563eb22; }

.layer-icon { font-size: 1.1rem; }
.layer-name { font-weight: bold; font-size: 0.88rem; flex: 1; margin-left: 0.5rem; }
.layer-speed { font-size: 0.75rem; color: var(--vp-c-text-2); }

/* Detail Panel */
.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon { font-size: 1.4rem; }
.detail-name { font-size: 1rem; font-weight: bold; flex: 1; }

.detail-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}
.tier-0.detail-badge { background: #7c3aed; }
.tier-1.detail-badge { background: #2563eb; }
.tier-2.detail-badge { background: #059669; }
.tier-3.detail-badge { background: #d97706; }
.tier-4.detail-badge { background: #dc2626; }

.detail-stats { display: flex; flex-direction: column; gap: 0.5rem; }

.stat-item { display: flex; flex-direction: column; gap: 0.2rem; }

.stat-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-val { font-weight: bold; color: var(--vp-c-text-1); }

.stat-bar-bg {
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.tier-0.stat-bar-fill { background: #7c3aed; }
.tier-1.stat-bar-fill { background: #2563eb; }
.tier-2.stat-bar-fill { background: #059669; }
.tier-3.stat-bar-fill { background: #d97706; }
.tier-4.stat-bar-fill { background: #dc2626; }
.cap-bar { background: var(--vp-c-text-3); }

.analogy-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  line-height: 1.6;
}

.analogy-icon { font-size: 1.1rem; flex-shrink: 0; }

.use-case-box {
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.insight-bar {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
