<!--
  DataLineageDemo.vue
  Demo data lineage: minh hoạ đường đi của dữ liệu từ nguồn đến nơi tiêu thụ
-->
<template>
  <div class="lineage-demo">
    <div class="header">
      <div class="title">Theo dõi Data Lineage</div>
      <div class="subtitle">Bấm vào một node bất kỳ để xem quan hệ upstream/downstream</div>
    </div>

    <div class="lineage-graph">
      <div v-for="(layer, li) in layers" :key="li" class="layer">
        <div class="layer-label">{{ layer.label }}</div>
        <div class="layer-nodes">
          <div
            v-for="node in layer.nodes"
            :key="node.id"
            :class="['node', { active: activeNode === node.id, upstream: upstreamIds.includes(node.id), downstream: downstreamIds.includes(node.id) }]"
            @click="selectNode(node.id)"
          >
            <div class="node-icon">{{ node.icon }}</div>
            <div class="node-name">{{ node.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeNode && activeInfo" class="info-panel">
      <div class="info-title">{{ activeInfo.name }}</div>
      <div class="info-row"><span class="info-label">Phụ thuộc upstream:</span> {{ activeInfo.upstreamNames || 'Không có (nguồn gốc dữ liệu)' }}</div>
      <div class="info-row"><span class="info-label">Tiêu thụ downstream:</span> {{ activeInfo.downstreamNames || 'Không có (đích cuối)' }}</div>
      <div class="info-row"><span class="info-label">Người phụ trách:</span> {{ activeInfo.owner }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeNode = ref(null)

const nodes = {
  mysql_user: { name: 'MySQL bảng user', icon: '🗄️', upstream: [], downstream: ['ods_user'], owner: 'Nhóm dev business' },
  mysql_order: { name: 'MySQL bảng order', icon: '🗄️', upstream: [], downstream: ['ods_order'], owner: 'Nhóm dev business' },
  log_click: { name: 'Log click', icon: '📝', upstream: [], downstream: ['ods_click'], owner: 'Team frontend' },
  ods_user: { name: 'ODS user', icon: '📥', upstream: ['mysql_user'], downstream: ['dwd_user'], owner: 'Data engineer' },
  ods_order: { name: 'ODS order', icon: '📥', upstream: ['mysql_order'], downstream: ['dwd_order'], owner: 'Data engineer' },
  ods_click: { name: 'ODS click', icon: '📥', upstream: ['log_click'], downstream: ['dwd_click'], owner: 'Data engineer' },
  dwd_user: { name: 'DWD chi tiết user', icon: '🔧', upstream: ['ods_user'], downstream: ['dws_user_profile'], owner: 'Data dev' },
  dwd_order: { name: 'DWD chi tiết order', icon: '🔧', upstream: ['ods_order'], downstream: ['dws_gmv'], owner: 'Data dev' },
  dwd_click: { name: 'DWD chi tiết click', icon: '🔧', upstream: ['ods_click'], downstream: ['dws_user_profile'], owner: 'Data dev' },
  dws_user_profile: { name: 'DWS user profile', icon: '📊', upstream: ['dwd_user', 'dwd_click'], downstream: ['ads_report'], owner: 'Data analyst' },
  dws_gmv: { name: 'DWS tổng hợp GMV', icon: '📊', upstream: ['dwd_order'], downstream: ['ads_report'], owner: 'Data analyst' },
  ads_report: { name: 'ADS báo cáo kinh doanh', icon: '📈', upstream: ['dws_user_profile', 'dws_gmv'], downstream: [], owner: 'Data product' }
}

const layers = [
  { label: 'Nguồn', nodes: [{ id: 'mysql_user', ...nodes.mysql_user }, { id: 'mysql_order', ...nodes.mysql_order }, { id: 'log_click', ...nodes.log_click }] },
  { label: 'Tầng ODS', nodes: [{ id: 'ods_user', ...nodes.ods_user }, { id: 'ods_order', ...nodes.ods_order }, { id: 'ods_click', ...nodes.ods_click }] },
  { label: 'Tầng DWD', nodes: [{ id: 'dwd_user', ...nodes.dwd_user }, { id: 'dwd_order', ...nodes.dwd_order }, { id: 'dwd_click', ...nodes.dwd_click }] },
  { label: 'Tầng DWS', nodes: [{ id: 'dws_user_profile', ...nodes.dws_user_profile }, { id: 'dws_gmv', ...nodes.dws_gmv }] },
  { label: 'Tầng ADS', nodes: [{ id: 'ads_report', ...nodes.ads_report }] }
]

function getAllUpstream(id, visited = new Set()) {
  if (visited.has(id)) return []
  visited.add(id)
  const node = nodes[id]
  if (!node) return []
  let result = [...node.upstream]
  node.upstream.forEach(uid => { result = result.concat(getAllUpstream(uid, visited)) })
  return result
}

function getAllDownstream(id, visited = new Set()) {
  if (visited.has(id)) return []
  visited.add(id)
  const node = nodes[id]
  if (!node) return []
  let result = [...node.downstream]
  node.downstream.forEach(did => { result = result.concat(getAllDownstream(did, visited)) })
  return result
}

const upstreamIds = computed(() => activeNode.value ? getAllUpstream(activeNode.value) : [])
const downstreamIds = computed(() => activeNode.value ? getAllDownstream(activeNode.value) : [])

const activeInfo = computed(() => {
  if (!activeNode.value || !nodes[activeNode.value]) return null
  const n = nodes[activeNode.value]
  return {
    ...n,
    upstreamNames: n.upstream.map(id => nodes[id]?.name).join(', '),
    downstreamNames: n.downstream.map(id => nodes[id]?.name).join(', ')
  }
})

function selectNode(id) {
  activeNode.value = activeNode.value === id ? null : id
}
</script>

<style scoped>
.lineage-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.lineage-graph { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.layer { display: flex; align-items: center; gap: 0.75rem; }
.layer-label {
  min-width: 60px; font-size: 0.75rem; font-weight: 700;
  color: var(--vp-c-text-3); text-align: right;
}
.layer-nodes { display: flex; gap: 0.5rem; flex-wrap: wrap; flex: 1; }
.node {
  display: flex; align-items: center; gap: 0.3rem; padding: 0.4rem 0.6rem;
  border-radius: 6px; cursor: pointer; font-size: 0.78rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.2s;
}
.node:hover { border-color: var(--vp-c-brand); }
.node.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.1); font-weight: 700; }
.node.upstream { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
.node.downstream { border-color: #22c55e; background: rgba(34,197,94,0.08); }
.node-icon { font-size: 1rem; }
.node-name { white-space: nowrap; }
.info-panel {
  background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.info-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; }
.info-row { font-size: 0.82rem; margin-bottom: 0.25rem; }
.info-label { font-weight: 600; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .layer { flex-direction: column; align-items: flex-start; } .layer-label { text-align: left; } }
</style>
