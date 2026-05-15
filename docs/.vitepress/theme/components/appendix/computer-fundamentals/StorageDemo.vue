<template>
  <div class="storage-demo">
    <div class="demo-header">
      <span class="title">Phân cấp bộ nhớ: từ thanh ghi đến cloud</span>
      <span class="subtitle">Đánh đổi giữa tốc độ và dung lượng</span>
    </div>

    <div class="demo-content">
      <div class="storage-pyramid">
        <div
          v-for="(level, i) in storageLevels"
          :key="level.name"
          class="level"
          :class="{ active: activeLevel === i }"
          :style="{ width: level.width }"
          @click="activeLevel = i"
        >
          <div class="level-name">
            {{ level.name }}
          </div>
          <div class="level-speed">
            {{ level.speed }}
          </div>
          <div class="level-size">
            {{ level.size }}
          </div>
        </div>
      </div>

      <div v-if="currentLevel" class="level-detail">
        <div class="detail-title">Chi tiết {{ currentLevel.name }}</div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">Tốc độ truy cập</span>
            <span class="value">{{ currentLevel.speed }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Dung lượng điển hình</span>
            <span class="value">{{ currentLevel.size }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Chi phí mỗi byte</span>
            <span class="value">{{ currentLevel.cost }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Tính dễ mất (volatile)</span>
            <span class="value">{{ currentLevel.volatile }}</span>
          </div>
        </div>
        <div class="detail-desc">
          {{ currentLevel.desc }}
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong> Bộ nhớ tuân theo nguyên tắc "kim tự tháp": càng nhanh thì càng đắt và càng ít dung lượng. Dữ liệu CPU cần được đặt ở bộ nhớ nhanh nhất (thanh ghi, cache), còn dữ liệu tạm thời chưa dùng đặt ở bộ nhớ chậm nhưng dung lượng lớn (disk, cloud).
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref(0)

const storageLevels = [
  {
    name: 'Thanh ghi',
    speed: '~1 nano giây',
    size: 'Vài trăm byte',
    width: '30%',
    cost: 'Cực cao',
    volatile: 'Có',
    desc: 'Bộ nhớ nhanh nhất bên trong CPU, tham gia trực tiếp vào phép tính. Số lượng hạn chế, do trình biên dịch tự quản lý.'
  },
  {
    name: 'Cache L1',
    speed: '~2 nano giây',
    size: '32-64 KB',
    width: '45%',
    cost: 'Rất cao',
    volatile: 'Có',
    desc: 'Cache tốc độ cao tích hợp trong CPU, lưu dữ liệu hay dùng nhất. Mỗi nhân CPU có riêng.'
  },
  {
    name: 'Cache L2/L3',
    speed: '~10 nano giây',
    size: 'Vài MB',
    width: '60%',
    cost: 'Cao',
    volatile: 'Có',
    desc: 'Cache lớn hơn nhưng chậm hơn, L3 thường được chia sẻ giữa các nhân.'
  },
  {
    name: 'RAM',
    speed: '~100 nano giây',
    size: '8-128 GB',
    width: '75%',
    cost: 'Trung bình',
    volatile: 'Có',
    desc: 'Vùng làm việc chính khi chương trình chạy. Mất điện là mất dữ liệu.'
  },
  {
    name: 'SSD',
    speed: '~100 micro giây',
    size: '256 GB - 4 TB',
    width: '90%',
    cost: 'Khá thấp',
    volatile: 'Không',
    desc: 'Nhanh hơn ổ HDD nhiều, không có bộ phận cơ. Mất điện vẫn giữ dữ liệu.'
  },
  {
    name: 'HDD',
    speed: '~10 mili giây',
    size: '1-20 TB',
    width: '100%',
    cost: 'Thấp',
    volatile: 'Không',
    desc: 'Dung lượng lớn, chi phí thấp, nhưng có độ trễ cơ học. Phù hợp lưu trữ dữ liệu lớn.'
  }
]

const currentLevel = computed(() => storageLevels[activeLevel.value])
</script>

<style scoped>
.storage-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
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

.demo-content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.storage-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 200px;
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.level:hover {
  background: var(--vp-c-bg-soft);
}

.level.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.level-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.level-speed {
  font-size: 0.75rem;
  color: var(--vp-c-success);
}

.level-size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.level-detail {
  flex: 1;
  min-width: 250px;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
}

.detail-item .label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.detail-item .value {
  font-weight: bold;
  font-size: 0.9rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}
</style>
