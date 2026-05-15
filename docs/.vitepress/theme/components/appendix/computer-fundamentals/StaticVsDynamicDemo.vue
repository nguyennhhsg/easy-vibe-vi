<template>
  <div class="static-vs-dynamic-demo">
    <h4>🔍 Kiểu tĩnh vs kiểu động: so sánh trực quan</h4>
    <p class="desc">Chọn một đoạn code và quan sát hành vi khác nhau của hai hệ kiểu</p>

    <div class="example-selector">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        :class="['ex-btn', { active: selected === i }]"
        @click="selected = i"
      >
        {{ ex.label }}
      </button>
    </div>

    <div class="comparison">
      <div class="panel static-panel">
        <div class="panel-header">
          <span class="badge">Kiểu tĩnh (TypeScript)</span>
          <span class="timing">⏱ Kiểm tra lúc biên dịch</span>
        </div>
        <pre class="code-block">{{ examples[selected].staticCode }}</pre>
        <div :class="['result', examples[selected].staticOk ? 'ok' : 'err']">
          {{ examples[selected].staticResult }}
        </div>
      </div>

      <div class="vs">VS</div>

      <div class="panel dynamic-panel">
        <div class="panel-header">
          <span class="badge dynamic">Kiểu động (JavaScript)</span>
          <span class="timing">⏱ Kiểm tra lúc chạy</span>
        </div>
        <pre class="code-block">{{ examples[selected].dynamicCode }}</pre>
        <div :class="['result', examples[selected].dynamicOk ? 'ok' : 'err']">
          {{ examples[selected].dynamicResult }}
        </div>
      </div>
    </div>

    <div class="insight">
      💡 {{ examples[selected].insight }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const examples = [
  {
    label: 'Gán biến',
    staticCode: `let name: string = "Alice"
name = 42  // ❌ Lỗi biên dịch`,
    dynamicCode: `let name = "Alice"
name = 42  // ✅ Không sao`,
    staticResult: '❌ Type "number" is not assignable to type "string"',
    dynamicResult: '✅ Chạy bình thường, name trở thành 42',
    staticOk: false,
    dynamicOk: true,
    insight: 'Kiểu tĩnh phát hiện lỗi ngay khi bạn viết code, kiểu động phải đợi đến lúc chạy mới biết.'
  },
  {
    label: 'Tham số hàm',
    staticCode: `function add(a: number, b: number) {
  return a + b
}
add("1", 2)  // ❌ Lỗi biên dịch`,
    dynamicCode: `function add(a, b) {
  return a + b
}
add("1", 2)  // ✅ Trả về "12"`,
    staticResult: '❌ Argument of type "string" is not assignable to parameter of type "number"',
    dynamicResult: '✅ Trả về "12" (nối chuỗi, không phải phép cộng!)',
    staticOk: false,
    dynamicOk: true,
    insight: 'Sự "linh hoạt" của kiểu động đôi khi là ổ bug — bạn mong 3 nhưng lại nhận "12".'
  },
  {
    label: 'Truy cập thuộc tính',
    staticCode: `interface User { name: string }
let user: User = { name: "Bob" }
console.log(user.age)  // ❌ Lỗi biên dịch`,
    dynamicCode: `let user = { name: "Bob" }
console.log(user.age)  // ✅ In ra undefined`,
    staticResult: '❌ Property "age" does not exist on type "User"',
    dynamicResult: '✅ In ra undefined (không lỗi, nhưng có thể làm logic sau sai)',
    staticOk: false,
    dynamicOk: true,
    insight: 'Kiểu tĩnh bắt được lỗi gõ nhầm và thuộc tính thiếu lúc biên dịch, kiểu động chỉ lặng lẽ trả về undefined.'
  }
]
</script>

<style scoped>
.static-vs-dynamic-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.example-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.ex-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.ex-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.comparison { display: flex; gap: 12px; align-items: stretch; }
.panel { flex: 1; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); overflow: hidden; }
.panel-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.badge { font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); }
.badge.dynamic { color: #e5a00d; }
.timing { font-size: 11px; color: var(--vp-c-text-3); }
.code-block { padding: 12px; margin: 0; font-size: 12px; line-height: 1.6; white-space: pre-wrap; overflow-x: auto; }
.result { padding: 8px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.result.ok { background: #f0fdf4; color: #166534; }
.result.err { background: #fef2f2; color: #991b1b; }
.vs { display: flex; align-items: center; font-weight: 700; color: var(--vp-c-text-3); font-size: 14px; }
.insight { margin-top: 12px; padding: 10px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; font-size: 13px; }
@media (max-width: 640px) {
  .comparison { flex-direction: column; }
  .vs { justify-content: center; padding: 4px 0; }
}
</style>
