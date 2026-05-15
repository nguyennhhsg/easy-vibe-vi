<template>
  <div class="provider-comparison">
    <div class="compare-table">
      <div class="table-header">
        <div class="col feature">
          Tiêu chí
        </div>
        <div class="col provider">
          AWS
        </div>
        <div class="col provider">
          Alibaba Cloud
        </div>
        <div class="col provider">
          Tencent Cloud
        </div>
      </div>
      <div 
        v-for="row in compareData" 
        :key="row.feature"
        class="table-row"
      >
        <div class="col feature">
          {{ row.feature }}
        </div>
        <div
          class="col provider"
          :class="{ highlight: row.awsHighlight }"
        >
          {{ row.aws }}
        </div>
        <div
          class="col provider"
          :class="{ highlight: row.aliyunHighlight }"
        >
          {{ row.aliyun }}
        </div>
        <div
          class="col provider"
          :class="{ highlight: row.tencentHighlight }"
        >
          {{ row.tencent }}
        </div>
      </div>
    </div>
    
    <div class="selection-guide">
      <div class="guide-title">
        💡 Gợi ý chọn
      </div>
      <div class="guide-items">
        <div class="guide-item">
          <span class="scenario">Business vươn ra quốc tế</span>
          <span class="recommend">→ AWS</span>
        </div>
        <div class="guide-item">
          <span class="scenario">E-commerce nội địa</span>
          <span class="recommend">→ Alibaba Cloud</span>
        </div>
        <div class="guide-item">
          <span class="scenario">Game/Mạng xã hội</span>
          <span class="recommend">→ Tencent Cloud</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const compareData = [
  {
    feature: 'Phủ sóng toàn cầu',
    aws: '⭐⭐⭐⭐⭐',
    aliyun: '⭐⭐⭐',
    tencent: '⭐⭐⭐',
    awsHighlight: true
  },
  {
    feature: 'Tốc độ nội địa',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    aliyunHighlight: true,
    tencentHighlight: true
  },
  {
    feature: 'Tài liệu tiếng Trung',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    aliyunHighlight: true,
    tencentHighlight: true
  },
  {
    feature: 'Ưu thế về giá',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    tencentHighlight: true
  },
  {
    feature: 'Hệ sinh thái',
    aws: '⭐⭐⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐',
    awsHighlight: true
  }
]
</script>

<style scoped>
.provider-comparison {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.compare-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.table-header {
  font-weight: 600;
  font-size: 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-row {
  font-size: 0.85rem;
  padding: 0.4rem 0;
}

.col {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}

.col.feature {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.col.provider {
  text-align: center;
  background: var(--vp-c-bg);
}

.col.provider.highlight {
  background: var(--vp-c-brand-soft);
  font-weight: 500;
}

.selection-guide {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.guide-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.guide-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.guide-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.guide-item .scenario {
  color: var(--vp-c-text-2);
}

.guide-item .recommend {
  font-weight: 500;
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .table-header,
  .table-row {
    grid-template-columns: 80px 1fr 1fr 1fr;
    font-size: 0.75rem;
  }
  
  .col {
    padding: 0.3rem 0.4rem;
  }
}
</style>
