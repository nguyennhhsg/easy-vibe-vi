<template>
  <div class="refactoring-demo">
    <div class="demo-label">Demo so sánh kỹ thuật refactor ── chọn kỹ thuật để xem so sánh trước/sau</div>

    <div class="tabs">
      <button
        v-for="(item, i) in techniques"
        :key="i"
        :class="['tab-btn', { active: activeTab === i }]"
        @click="selectTab(i)"
      >
        {{ item.name }}
      </button>
    </div>

    <div class="desc">{{ current.description }}</div>

    <div class="compare-area">
      <div class="compare-panel before">
        <div class="panel-header">
          <span class="dot red"></span> Trước refactor
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.before"
          :key="'b'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>

      <div class="arrow-col">
        <span class="arrow-icon">→</span>
      </div>

      <div class="compare-panel after">
        <div class="panel-header">
          <span class="dot green"></span> Sau refactor
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.after"
          :key="'a'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>
    </div>

    <div class="tip-box">
      <strong>Điểm chính:</strong> {{ current.tip }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const showHighlight = ref(false)

function selectTab(i) {
  activeTab.value = i
  showHighlight.value = false
  setTimeout(() => { showHighlight.value = true }, 300)
}

// Khởi tạo highlight
setTimeout(() => { showHighlight.value = true }, 500)

const techniques = [
  {
    name: 'Extract Function',
    description: 'Extract Function: tách một đoạn code khỏi hàm lớn, đưa vào một hàm mới có tên rõ ràng.',
    before: [
      { text: 'function printReport(invoice) {\n  console.log("=== Bill ===")\n' },
      { text: '  // Tính tổng\n  let total = 0\n  for (let item of invoice.items) {\n    total += item.price * item.qty\n  }\n', changed: true },
      { text: '  console.log(`Total: ${total}`)\n}' }
    ],
    after: [
      { text: 'function printReport(invoice) {\n  console.log("=== Bill ===")\n' },
      { text: '  const total = calcTotal(invoice.items)\n', changed: true },
      { text: '  console.log(`Total: ${total}`)\n}\n\n' },
      { text: 'function calcTotal(items) {\n  return items.reduce(\n    (s, i) => s + i.price * i.qty, 0\n  )\n}', changed: true }
    ],
    tip: 'Extract Function là kỹ thuật refactor được dùng nhiều nhất. Tên hàm tốt chính là comment tốt nhất - nếu bạn cần comment để giải thích một đoạn code làm gì, thì đoạn đó nên được extract thành function.'
  },
  {
    name: 'Rename Variable',
    description: 'Rename Variable: thay tên biến mơ hồ bằng tên rõ ràng, có ý nghĩa, để code tự giải thích.',
    before: [
      { text: 'function calc(', changed: true },
      { text: 'a, b, c', changed: true },
      { text: ') {\n' },
      { text: '  const d = a * b\n  const e = d * (1 - c)\n  return e\n}', changed: true }
    ],
    after: [
      { text: 'function calcOrderTotal(', changed: true },
      { text: 'price, quantity, discountRate', changed: true },
      { text: ') {\n' },
      { text: '  const subtotal = price * quantity\n  const total = subtotal * (1 - discountRate)\n  return total\n}', changed: true }
    ],
    tip: 'Đặt tên biến là một trong những kỹ năng cơ bản quan trọng nhất của programmer. Đặt tên tốt làm code đọc như văn xuôi, đặt tên kém làm code khó hiểu như mật mã.'
  },
  {
    name: 'Remove Duplication',
    description: 'Remove Duplication: extract logic lặp lại thành function/template dùng chung, tuân theo nguyên tắc DRY.',
    before: [
      { text: '// Employee report\nfunction empReport(emp) {\n' },
      { text: '  return `${emp.name} | ${emp.dept} | ${emp.salary}`', changed: true },
      { text: '\n}\n\n// Manager report\nfunction mgrReport(mgr) {\n' },
      { text: '  return `${mgr.name} | ${mgr.dept} | ${mgr.salary}`', changed: true },
      { text: '\n}' }
    ],
    after: [
      { text: '' },
      { text: 'function formatReport(person) {\n  return `${person.name} | ${person.dept} | ${person.salary}`\n}', changed: true },
      { text: '\n\n// Gọi thống nhất\n' },
      { text: 'formatReport(employee)\nformatReport(manager)', changed: true }
    ],
    tip: 'DRY (Don\'t Repeat Yourself) là nguyên tắc cơ bản của software engineering. Mỗi chỗ trùng lặp là ổ bug trong tương lai - sửa chỗ này quên chỗ kia là sự cố code lặp điển hình.'
  },
  {
    name: 'Simplify Conditional',
    description: 'Simplify Conditional: dùng guard clause, strategy pattern... thay cho if-else nested sâu, giảm cyclomatic complexity.',
    before: [
      { text: 'function getDiscount(user) {\n' },
      { text: '  if (user.type === "vip") {\n    if (user.years > 5) {\n      return 0.3\n    } else {\n      return 0.2\n    }\n  } else {\n    if (user.years > 3) {\n      return 0.1\n    } else {\n      return 0\n    }\n  }', changed: true },
      { text: '\n}' }
    ],
    after: [
      { text: 'function getDiscount(user) {\n' },
      { text: '  if (user.type === "vip" && user.years > 5) return 0.3\n  if (user.type === "vip") return 0.2\n  if (user.years > 3) return 0.1\n  return 0', changed: true },
      { text: '\n}' }
    ],
    tip: 'Guard Clause loại bỏ nested bằng cách return sớm. Cấu trúc code phẳng dễ hiểu và maintain hơn so với nested sâu.'
  }
]

const current = computed(() => techniques[activeTab.value])
</script>

<style scoped>
.refactoring-demo {
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
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.compare-area {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

@media (max-width: 640px) {
  .compare-area {
    flex-direction: column;
  }
  .arrow-col {
    transform: rotate(90deg);
  }
}

.compare-panel {
  flex: 1;
  min-width: 0;
}

.panel-header {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red { background: #ef4444; }
.dot.green { background: #22c55e; }

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
  white-space: pre;
  font-family: 'Fira Code', 'Consolas', monospace;
  min-height: 140px;
}

.highlight {
  background: rgba(34, 197, 94, 0.15);
  border-radius: 2px;
  transition: background 0.6s ease;
}

.before .highlight {
  background: rgba(239, 68, 68, 0.12);
}

.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--vp-c-text-3);
  padding: 0 0.2rem;
}

.tip-box {
  margin-top: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(59, 130, 246, 0.08);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 6px 6px 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
