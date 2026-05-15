<!--
  CAPTheoremDemo.vue
  Demo tương tác về định lý CAP: minh hoạ sự đánh đổi giữa consistency, availability, partition tolerance
-->
<template>
  <div class="cap-demo">
    <div class="header">
      <div class="title">Demo tương tác về CAP</div>
      <div class="subtitle">Bấm chọn hai thuộc tính để xem kiểu hệ thống tương ứng</div>
    </div>

    <div class="triangle">
      <div
        v-for="item in capItems"
        :key="item.key"
        :class="['cap-node', { active: selected.includes(item.key) }]"
        @click="toggle(item.key)"
      >
        <div class="cap-letter">{{ item.letter }}</div>
        <div class="cap-name">{{ item.name }}</div>
        <div class="cap-desc">{{ item.desc }}</div>
      </div>
    </div>

    <div v-if="result" class="result-panel">
      <div class="result-title">{{ result.type }}</div>
      <div class="result-desc">{{ result.desc }}</div>
      <div class="result-examples">
        <span class="label">Hệ thống điển hình:</span> {{ result.examples }}
      </div>
      <div class="result-tradeoff">
        <span class="label">Đánh đổi:</span> {{ result.sacrifice }}
      </div>
    </div>

    <div v-else class="hint">Chọn hai thuộc tính để xem kết quả</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref(['C', 'A'])

const capItems = [
  { key: 'C', letter: 'C', name: 'Consistency', desc: 'Mọi node đều thấy cùng dữ liệu' },
  { key: 'A', letter: 'A', name: 'Availability', desc: 'Mọi request đều được phản hồi' },
  { key: 'P', letter: 'P', name: 'Partition tolerance', desc: 'Hệ thống vẫn chạy khi mạng bị partition' }
]

const combinations = {
  'CA': {
    type: 'Hệ thống CA (hy sinh partition tolerance)',
    desc: 'Khi không có partition mạng thì vừa đảm bảo consistency vừa đảm bảo availability. Nhưng trong môi trường distributed, partition mạng là không tránh khỏi, nên hệ thống CA thuần tuý rất hiếm gặp ngoài thực tế.',
    examples: 'MySQL đơn máy, PostgreSQL (single node)',
    sacrifice: 'Partition tolerance (P) - khi mạng lỗi, hệ thống không khả dụng'
  },
  'CP': {
    type: 'Hệ thống CP (hy sinh availability)',
    desc: 'Khi có partition mạng, ưu tiên đảm bảo consistency và có thể từ chối một số request. Phù hợp khi yêu cầu tính đúng đắn dữ liệu cực cao.',
    examples: 'ZooKeeper, etcd, HBase, MongoDB (chế độ strong consistency)',
    sacrifice: 'Availability (A) - khi partition, một số request bị từ chối hoặc timeout'
  },
  'AP': {
    type: 'Hệ thống AP (hy sinh strong consistency)',
    desc: 'Khi có partition mạng, ưu tiên availability và chấp nhận dữ liệu tạm thời không nhất quán (eventual consistency). Phù hợp khi yêu cầu availability cao và chấp nhận lệch ngắn hạn.',
    examples: 'Cassandra, DynamoDB, DNS, CDN',
    sacrifice: 'Strong consistency (C) - các node có thể trả về dữ liệu khác nhau trong thời gian ngắn'
  }
}

function toggle(key) {
  const idx = selected.value.indexOf(key)
  if (idx >= 0) {
    selected.value = selected.value.filter(k => k !== key)
  } else {
    if (selected.value.length >= 2) {
      selected.value = [selected.value[1], key]
    } else {
      selected.value = [...selected.value, key]
    }
  }
}

const result = computed(() => {
  if (selected.value.length !== 2) return null
  const combo = [...selected.value].sort().join('')
  return combinations[combo] || null
})
</script>

<style scoped>
.cap-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.triangle { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; justify-content: center; }
.cap-node {
  flex: 1; min-width: 120px; max-width: 200px; padding: 0.75rem; border-radius: 8px;
  cursor: pointer; text-align: center; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); transition: all 0.2s;
}
.cap-node:hover { border-color: var(--vp-c-brand); }
.cap-node.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.08); }
.cap-letter { font-size: 1.5rem; font-weight: 800; color: var(--vp-c-brand); }
.cap-name { font-weight: 700; font-size: 0.9rem; margin: 0.2rem 0; }
.cap-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.result-panel {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.result-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; }
.result-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.result-examples, .result-tradeoff { font-size: 0.82rem; margin-bottom: 0.25rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
.hint { text-align: center; color: var(--vp-c-text-3); font-size: 0.85rem; padding: 1rem; }
</style>
