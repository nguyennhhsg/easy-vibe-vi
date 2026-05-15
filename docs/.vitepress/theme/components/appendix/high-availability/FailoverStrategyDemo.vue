<!--
  FailoverStrategyDemo.vue
  Demo các chiến lược failover: minh hoạ kiến trúc HA active-standby, active-active, multi-AZ, multi-region
-->
<template>
  <div class="failover-demo">
    <div class="header">
      <div class="title">So sánh các chiến lược failover</div>
      <div class="subtitle">Bấm vào để xem cách hoạt động của các kiến trúc HA khác nhau</div>
    </div>

    <div class="strategy-tabs">
      <div
        v-for="s in strategies"
        :key="s.key"
        :class="['tab', { active: activeStrategy === s.key }]"
        @click="activeStrategy = s.key"
      >
        {{ s.name }}
      </div>
    </div>

    <div v-if="current" class="strategy-detail">
      <div class="strategy-name">{{ current.name }}</div>
      <div class="strategy-desc">{{ current.desc }}</div>

      <div class="arch-visual">
        <div
          v-for="(node, i) in current.nodes"
          :key="i"
          :class="['arch-node', node.role]"
        >
          <div class="node-role">{{ node.label }}</div>
          <div class="node-status">{{ node.status }}</div>
        </div>
      </div>

      <div class="pros-cons">
        <div class="pros">
          <div class="pc-title">Ưu điểm</div>
          <div v-for="p in current.pros" :key="p" class="pc-item good">{{ p }}</div>
        </div>
        <div class="cons">
          <div class="pc-title">Nhược điểm</div>
          <div v-for="c in current.cons" :key="c" class="pc-item bad">{{ c }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStrategy = ref('active-standby')

const strategies = [
  {
    key: 'active-standby',
    name: 'Active-Standby',
    desc: 'Một node master xử lý mọi request, node standby chờ sẵn. Khi master lỗi, standby tiếp quản.',
    nodes: [
      { label: 'Master', status: 'Xử lý request', role: 'primary' },
      { label: 'Standby', status: 'Chờ và đồng bộ', role: 'standby' }
    ],
    pros: ['Kiến trúc đơn giản, dễ hiểu', 'Consistency dữ liệu dễ đảm bảo'],
    cons: ['Standby lãng phí tài nguyên', 'Lúc chuyển đổi có downtime ngắn (vài giây)']
  },
  {
    key: 'active-active',
    name: 'Active-Active',
    desc: 'Cả hai node đều xử lý request, đồng bộ dữ liệu cho nhau. Node nào lỗi thì node kia vẫn tiếp tục phục vụ.',
    nodes: [
      { label: 'Node A', status: 'Xử lý request', role: 'primary' },
      { label: 'Node B', status: 'Xử lý request', role: 'primary' }
    ],
    pros: ['Tận dụng tài nguyên cao', 'Không bị downtime khi chuyển đổi'],
    cons: ['Xử lý xung đột dữ liệu phức tạp', 'Phải giải quyết write conflict']
  },
  {
    key: 'multi-az',
    name: 'Multi-AZ',
    desc: 'Triển khai ở nhiều data center khác nhau trong cùng một khu vực, phòng khi một data center bị lỗi.',
    nodes: [
      { label: 'AZ-1 master', status: 'Đọc/ghi', role: 'primary' },
      { label: 'AZ-2 replica', status: 'Chỉ đọc', role: 'secondary' },
      { label: 'AZ-3 replica', status: 'Chỉ đọc', role: 'secondary' }
    ],
    pros: ['Chống chịu lỗi cấp data center', 'Hiệu năng đọc có thể scale'],
    cons: ['Latency cross-AZ (1-2ms)', 'Chi phí tăng']
  },
  {
    key: 'multi-region',
    name: 'Multi-region',
    desc: 'Triển khai dịch vụ hoàn chỉnh ở nhiều khu vực địa lý, mỗi vùng xử lý lưu lượng cục bộ độc lập.',
    nodes: [
      { label: 'Hà Nội', status: 'Dịch vụ độc lập', role: 'primary' },
      { label: 'Đà Nẵng', status: 'Dịch vụ độc lập', role: 'primary' },
      { label: 'TP.HCM', status: 'Dịch vụ độc lập', role: 'primary' }
    ],
    pros: ['Chống chịu lỗi cấp vùng', 'Truy cập gần, latency thấp'],
    cons: ['Kiến trúc cực kỳ phức tạp', 'Đồng bộ dữ liệu là thách thức lớn']
  }
]

const current = computed(() => strategies.find(s => s.key === activeStrategy.value))
</script>

<style scoped>
.failover-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.strategy-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.strategy-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.strategy-name { font-weight: 700; font-size: 0.95rem; }
.strategy-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.arch-visual { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; justify-content: center; }
.arch-node {
  padding: 0.5rem 0.75rem; border-radius: 6px; text-align: center;
  border: 1px dashed var(--vp-c-divider); min-width: 90px;
}
.arch-node.primary { background: rgba(var(--vp-c-brand-rgb), 0.08); border-color: var(--vp-c-brand); }
.arch-node.standby { background: rgba(245,158,11,0.08); border-color: #f59e0b; }
.arch-node.secondary { background: rgba(99,102,241,0.08); border-color: #6366f1; }
.node-role { font-weight: 700; font-size: 0.82rem; }
.node-status { font-size: 0.72rem; color: var(--vp-c-text-2); }
.pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.pc-title { font-weight: 700; font-size: 0.82rem; margin-bottom: 0.3rem; }
.pc-item { font-size: 0.78rem; padding: 0.2rem 0; }
.pc-item.good::before { content: '+ '; color: #22c55e; font-weight: 700; }
.pc-item.bad::before { content: '- '; color: #ef4444; font-weight: 700; }
</style>
