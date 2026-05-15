<!--
  ArchEvolutionDemo.vue
  Demo tiến hoá kiến trúc: từ monolith đến microservice
-->
<template>
  <div class="arch-evolution-demo">
    <div class="header">
      <div class="title">Lộ trình tiến hoá kiến trúc</div>
      <div class="subtitle">Bấm vào để xem đặc điểm kiến trúc từng giai đoạn</div>
    </div>

    <div class="stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-card', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-num">{{ i + 1 }}</div>
        <div class="stage-name">{{ stage.name }}</div>
      </div>
    </div>

    <div v-if="current" class="stage-detail">
      <div class="detail-name">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>

      <div class="arch-visual">
        <div
          v-for="(box, i) in current.boxes"
          :key="i"
          :class="['arch-box', box.type]"
        >
          {{ box.label }}
        </div>
      </div>

      <div class="detail-row">
        <span class="label">Quy mô phù hợp:</span> {{ current.scale }}
      </div>
      <div class="detail-row">
        <span class="label">Thách thức cốt lõi:</span> {{ current.challenge }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('monolith')

const stages = [
  {
    key: 'monolith',
    name: 'Kiến trúc monolith',
    desc: 'Toàn bộ chức năng đóng gói trong một ứng dụng, chia sẻ một database. Đơn giản, phù hợp cho giai đoạn đầu cần iterate nhanh.',
    scale: 'Team < 10 người, DAU < 100k',
    challenge: 'Code coupling nặng, bug ở một module có thể kéo sập cả hệ thống',
    boxes: [
      { label: 'Module user', type: 'module' },
      { label: 'Module order', type: 'module' },
      { label: 'Module payment', type: 'module' },
      { label: 'Module product', type: 'module' },
      { label: 'Monolith app (1 process)', type: 'container' },
      { label: 'MySQL', type: 'db' }
    ]
  },
  {
    key: 'modular',
    name: 'Modular monolith',
    desc: 'Chia module trong monolith theo business domain, giao tiếp giữa các module qua interface. Là bước đệm để chuyển sang microservice.',
    scale: 'Team 10-30 người',
    challenge: 'Ranh giới module dễ bị phá vỡ, đòi hỏi kỷ luật cao',
    boxes: [
      { label: 'Domain user', type: 'domain' },
      { label: 'Domain order', type: 'domain' },
      { label: 'Domain payment', type: 'domain' },
      { label: 'Ranh giới API nội bộ', type: 'boundary' },
      { label: 'MySQL', type: 'db' }
    ]
  },
  {
    key: 'soa',
    name: 'Service oriented (SOA)',
    desc: 'Tách thành các service độc lập theo năng lực business, giao tiếp qua ESB hoặc API gateway. Mỗi service có thể deploy độc lập.',
    scale: 'Team 30-100 người',
    challenge: 'Chuỗi gọi giữa các service dài thêm, cần service governance',
    boxes: [
      { label: 'User service', type: 'service' },
      { label: 'Order service', type: 'service' },
      { label: 'Payment service', type: 'service' },
      { label: 'API gateway', type: 'gateway' },
      { label: 'Database riêng từng service', type: 'db' }
    ]
  },
  {
    key: 'microservices',
    name: 'Kiến trúc microservice',
    desc: 'Tách service mịn hơn, mỗi service phát triển, deploy, scale độc lập. Kết hợp containerization và K8s.',
    scale: 'Team 100+ người, DAU vài triệu trở lên',
    challenge: 'Sự phức tạp của distributed, đồng nhất dữ liệu, chi phí vận hành',
    boxes: [
      { label: 'User service', type: 'service' },
      { label: 'Auth service', type: 'service' },
      { label: 'Order service', type: 'service' },
      { label: 'Inventory service', type: 'service' },
      { label: 'Payment service', type: 'service' },
      { label: 'Notification service', type: 'service' },
      { label: 'API Gateway + Service Mesh', type: 'gateway' },
      { label: 'Database riêng x N', type: 'db' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.arch-evolution-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.stages { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stage-card {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-card:hover { border-color: var(--vp-c-brand); }
.stage-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.stage-num {
  width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand);
  color: white; font-size: 0.7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.stage-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-name { font-weight: 700; font-size: 0.95rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.arch-visual { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.arch-box {
  padding: 0.35rem 0.6rem; border-radius: 4px; font-size: 0.72rem; font-weight: 600;
  border: 1px dashed var(--vp-c-divider);
}
.arch-box.module { background: rgba(var(--vp-c-brand-rgb), 0.06); }
.arch-box.domain { background: rgba(99,102,241,0.06); }
.arch-box.service { background: rgba(34,197,94,0.06); }
.arch-box.gateway { background: rgba(245,158,11,0.06); width: 100%; text-align: center; }
.arch-box.container { background: rgba(239,68,68,0.06); width: 100%; text-align: center; }
.arch-box.boundary { background: rgba(156,163,175,0.06); width: 100%; text-align: center; }
.arch-box.db { background: rgba(139,92,246,0.06); }
.detail-row { font-size: 0.82rem; margin-bottom: 0.25rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
