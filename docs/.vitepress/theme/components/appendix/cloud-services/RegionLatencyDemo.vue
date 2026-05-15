<template>
  <div class="region-latency-demo">
    <div class="user-location">
      <label>Vị trí của bạn:</label>
      <div class="location-options">
        <button
          v-for="loc in locations"
          :key="loc.id"
          :class="{ active: userLocation === loc.id }"
          @click="userLocation = loc.id"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>

    <div class="latency-table">
      <div class="table-header">
        <div class="col region">
          Region
        </div>
        <div class="col latency">
          Độ trễ
        </div>
        <div class="col rating">
          Đề xuất
        </div>
      </div>
      <div
        v-for="item in latencyData"
        :key="item.region"
        class="table-row"
        :class="{ best: item.rating === '⭐⭐⭐' }"
      >
        <div class="col region">
          {{ item.region }}
        </div>
        <div class="col latency">
          <div class="latency-bar">
            <div
              class="bar-fill"
              :style="{ width: item.percent + '%' }"
            />
            <span class="latency-value">{{ item.latency }}ms</span>
          </div>
        </div>
        <div class="col rating">
          {{ item.rating }}
        </div>
      </div>
    </div>

    <div class="recommendation">
      <span class="rec-icon">💡</span>
      <span class="rec-text">{{ recommendation }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const userLocation = ref('beijing')

const locations = [
  { id: 'beijing', name: 'Beijing' },
  { id: 'shanghai', name: 'Shanghai' },
  { id: 'guangzhou', name: 'Guangzhou' },
  { id: 'chengdu', name: 'Chengdu' }
]

const latencyMap = {
  beijing: [
    { region: 'North China - Beijing', latency: 15, rating: '⭐⭐⭐' },
    { region: 'East China - Shanghai', latency: 35, rating: '⭐⭐' },
    { region: 'South China - Guangzhou', latency: 55, rating: '⭐' },
    { region: 'APAC - Singapore', latency: 85, rating: '⭐' }
  ],
  shanghai: [
    { region: 'East China - Shanghai', latency: 12, rating: '⭐⭐⭐' },
    { region: 'North China - Beijing', latency: 38, rating: '⭐⭐' },
    { region: 'South China - Guangzhou', latency: 45, rating: '⭐⭐' },
    { region: 'APAC - Singapore', latency: 75, rating: '⭐' }
  ],
  guangzhou: [
    { region: 'South China - Guangzhou', latency: 10, rating: '⭐⭐⭐' },
    { region: 'East China - Shanghai', latency: 42, rating: '⭐⭐' },
    { region: 'North China - Beijing', latency: 58, rating: '⭐' },
    { region: 'APAC - Singapore', latency: 45, rating: '⭐⭐' }
  ],
  chengdu: [
    { region: 'East China - Shanghai', latency: 40, rating: '⭐⭐' },
    { region: 'North China - Beijing', latency: 48, rating: '⭐⭐' },
    { region: 'South China - Guangzhou', latency: 52, rating: '⭐' },
    { region: 'Southwest - Chengdu', latency: 8, rating: '⭐⭐⭐' }
  ]
}

const latencyData = computed(() => {
  const data = latencyMap[userLocation.value] || latencyMap.beijing
  const maxLatency = Math.max(...data.map(d => d.latency))
  return data.map(d => ({
    ...d,
    percent: (d.latency / maxLatency) * 100
  }))
})

const recommendation = computed(() => {
  const best = latencyData.value.find(d => d.rating === '⭐⭐⭐')
  return `Khuyến nghị chọn ${best?.region}, độ trễ thấp nhất (${best?.latency}ms)`
})
</script>

<style scoped>
.region-latency-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.user-location {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.user-location label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.location-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.location-options button {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.location-options button:hover {
  border-color: var(--vp-c-brand);
}

.location-options button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.latency-table {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.table-header {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
}

.table-row {
  font-size: 0.85rem;
  background: var(--vp-c-bg);
}

.table-row.best {
  background: var(--vp-c-brand-soft);
}

.col.region {
  font-weight: 500;
}

.latency-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  overflow: hidden;
  padding: 2px;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 6px;
  transition: width 0.3s;
}

.latency-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 45px;
}

.recommendation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
}

.rec-icon {
  font-size: 1rem;
}

.rec-text {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .user-location {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-header,
  .table-row {
    grid-template-columns: 80px 1fr 50px;
    font-size: 0.75rem;
  }
}
</style>
