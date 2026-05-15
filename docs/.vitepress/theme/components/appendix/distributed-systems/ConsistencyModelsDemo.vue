<!--
  ConsistencyModelsDemo.vue
  Demo các mô hình consistency: minh hoạ khác biệt giữa strong, eventual, causal consistency
-->
<template>
  <div class="consistency-demo">
    <div class="header">
      <div class="title">So sánh các mô hình consistency</div>
      <div class="subtitle">Bấm vào để xem khác biệt giữa các mô hình consistency</div>
    </div>

    <div class="model-tabs">
      <div
        v-for="m in models"
        :key="m.key"
        :class="['tab', { active: activeModel === m.key }]"
        @click="activeModel = m.key"
      >
        {{ m.name }}
      </div>
    </div>

    <div v-if="current" class="model-detail">
      <div class="model-name">{{ current.name }}</div>
      <div class="model-desc">{{ current.desc }}</div>

      <div class="timeline">
        <div v-for="(step, i) in current.steps" :key="i" class="step">
          <div class="step-time">T{{ i + 1 }}</div>
          <div class="step-nodes">
            <div
              v-for="(node, ni) in step.nodes"
              :key="ni"
              :class="['node', node.status]"
            >
              <div class="node-label">{{ node.name }}</div>
              <div class="node-value">{{ node.value }}</div>
            </div>
          </div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>

      <div class="model-tradeoff">
        <span class="label">Đánh đổi:</span> {{ current.tradeoff }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeModel = ref('strong')

const models = [
  {
    key: 'strong',
    name: 'Strong consistency',
    desc: 'Sau khi ghi thành công, mọi node trả về ngay giá trị mới nhất. Trải nghiệm giống như database đơn máy.',
    tradeoff: 'Latency cao (phải chờ mọi node xác nhận), availability thấp (node lỗi có thể bị block)',
    steps: [
      { nodes: [{ name: 'Node A', value: 'v1', status: 'ok' }, { name: 'Node B', value: 'v1', status: 'ok' }, { name: 'Node C', value: 'v1', status: 'ok' }], desc: 'Trạng thái ban đầu, dữ liệu mọi node đồng nhất' },
      { nodes: [{ name: 'Node A', value: 'v2 ✍️', status: 'writing' }, { name: 'Node B', value: 'Đang đồng bộ...', status: 'syncing' }, { name: 'Node C', value: 'Đang đồng bộ...', status: 'syncing' }], desc: 'Client ghi v2, chờ tất cả node xác nhận' },
      { nodes: [{ name: 'Node A', value: 'v2', status: 'ok' }, { name: 'Node B', value: 'v2', status: 'ok' }, { name: 'Node C', value: 'v2', status: 'ok' }], desc: 'Mọi node xác nhận xong mới trả về thành công, đọc node nào cũng ra v2' }
    ]
  },
  {
    key: 'eventual',
    name: 'Eventual consistency',
    desc: 'Sau khi ghi không cần đợi mọi node đồng bộ, cuối cùng dữ liệu sẽ đồng nhất nhưng giai đoạn giữa có thể đọc trúng giá trị cũ.',
    tradeoff: 'Latency thấp, availability cao, nhưng có thể đọc trúng dữ liệu cũ trong thời gian ngắn',
    steps: [
      { nodes: [{ name: 'Node A', value: 'v1', status: 'ok' }, { name: 'Node B', value: 'v1', status: 'ok' }, { name: 'Node C', value: 'v1', status: 'ok' }], desc: 'Trạng thái ban đầu' },
      { nodes: [{ name: 'Node A', value: 'v2 ✍️', status: 'writing' }, { name: 'Node B', value: 'v1', status: 'stale' }, { name: 'Node C', value: 'v1', status: 'stale' }], desc: 'Ghi vào A xong là trả thành công ngay, B/C vẫn còn giá trị cũ' },
      { nodes: [{ name: 'Node A', value: 'v2', status: 'ok' }, { name: 'Node B', value: 'v2', status: 'ok' }, { name: 'Node C', value: 'v1→v2', status: 'syncing' }], desc: 'Đồng bộ bất đồng bộ ở background, dần đạt đồng nhất' }
    ]
  },
  {
    key: 'causal',
    name: 'Causal consistency',
    desc: 'Các thao tác có quan hệ nhân quả thì đảm bảo thứ tự, các thao tác không liên quan thì có thể xen kẽ. Nằm giữa strong và eventual.',
    tradeoff: 'Latency thấp hơn strong consistency, dễ đoán hơn eventual consistency',
    steps: [
      { nodes: [{ name: 'User A', value: 'Đăng bài: "Xin chào"', status: 'ok' }, { name: 'User B', value: 'Thấy bài', status: 'ok' }, { name: 'User C', value: 'Thấy bài', status: 'ok' }], desc: 'User A đăng bài' },
      { nodes: [{ name: 'User A', value: 'Đăng bài: "Xin chào"', status: 'ok' }, { name: 'User B', value: 'Trả lời: "Hi!"', status: 'writing' }, { name: 'User C', value: 'Thấy bài', status: 'ok' }], desc: 'User B trả lời (phụ thuộc nhân quả vào bài của A)' },
      { nodes: [{ name: 'User A', value: 'Thấy reply', status: 'ok' }, { name: 'User B', value: 'Trả lời: "Hi!"', status: 'ok' }, { name: 'User C', value: 'Thấy bài rồi mới thấy reply', status: 'ok' }], desc: 'Ai cũng thấy bài trước rồi mới thấy reply (đảm bảo thứ tự nhân quả)' }
    ]
  }
]

const current = computed(() => models.find(m => m.key === activeModel.value))
</script>

<style scoped>
.consistency-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.model-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.model-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.model-name { font-weight: 700; font-size: 0.95rem; }
.model-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.timeline { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; }
.step { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.step-time { font-weight: 700; font-size: 0.8rem; color: var(--vp-c-brand); min-width: 28px; }
.step-nodes { display: flex; gap: 0.4rem; flex: 1; }
.node {
  padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.72rem;
  border: 1px solid var(--vp-c-divider); flex: 1; text-align: center;
}
.node.ok { background: rgba(34,197,94,0.08); border-color: #22c55e; }
.node.writing { background: rgba(var(--vp-c-brand-rgb),0.08); border-color: var(--vp-c-brand); }
.node.syncing { background: rgba(245,158,11,0.08); border-color: #f59e0b; }
.node.stale { background: rgba(239,68,68,0.08); border-color: #ef4444; }
.node-label { font-weight: 600; }
.node-value { color: var(--vp-c-text-2); }
.step-desc { font-size: 0.75rem; color: var(--vp-c-text-3); width: 100%; margin-top: 0.15rem; }
.model-tradeoff { font-size: 0.82rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .step { flex-direction: column; } .step-nodes { width: 100%; } }
</style>
