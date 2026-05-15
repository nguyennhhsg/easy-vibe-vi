<template>
  <div class="strong-vs-weak-demo">
    <h4>⚡ Kiểu mạnh vs kiểu yếu: phòng thí nghiệm chuyển kiểu ngầm</h4>
    <p class="desc">Nhập một biểu thức và xem cách mỗi ngôn ngữ xử lý</p>

    <div class="expr-selector">
      <button
        v-for="(ex, i) in expressions"
        :key="i"
        :class="['expr-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <code>{{ ex.expr }}</code>
      </button>
    </div>

    <div class="results-grid">
      <div v-for="lang in expressions[selected].langs" :key="lang.name" class="lang-card">
        <div class="lang-header">
          <span class="lang-name">{{ lang.name }}</span>
          <span :class="['lang-type', lang.strong ? 'strong' : 'weak']">
            {{ lang.strong ? 'Kiểu mạnh' : 'Kiểu yếu' }}
          </span>
        </div>
        <pre class="lang-code">{{ lang.code }}</pre>
        <div :class="['lang-result', lang.error ? 'error' : 'success']">
          {{ lang.result }}
        </div>
      </div>
    </div>

    <div class="takeaway">
      📌 {{ expressions[selected].takeaway }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const expressions = [
  {
    expr: '"1" + 1',
    langs: [
      { name: 'JavaScript', strong: false, code: '"1" + 1', result: '→ "11" (nối chuỗi)', error: false },
      { name: 'Python', strong: true, code: '"1" + 1', result: '→ TypeError: can only concatenate str to str', error: true },
      { name: 'Java', strong: false, code: '"1" + 1', result: '→ "11" (nối chuỗi)', error: false },
      { name: 'Rust', strong: true, code: '"1" + 1', result: '→ Lỗi biên dịch: kiểu không khớp', error: true }
    ],
    takeaway: 'Ngôn ngữ kiểu mạnh từ chối đoán ý bạn, thà báo lỗi còn hơn ngầm chuyển kiểu. Ngôn ngữ kiểu yếu sẽ "tốt bụng" chuyển giúp bạn, nhưng kết quả có thể không như bạn muốn.'
  },
  {
    expr: 'true + 1',
    langs: [
      { name: 'JavaScript', strong: false, code: 'true + 1', result: '→ 2 (true được chuyển thành 1)', error: false },
      { name: 'Python', strong: true, code: 'True + 1', result: '→ 2 (Python: bool là lớp con của int)', error: false },
      { name: 'Java', strong: false, code: 'true + 1', result: '→ Lỗi biên dịch', error: true },
      { name: 'C', strong: false, code: '1 + 1 // true=1', result: '→ 2 (C không có bool, dùng 0/1)', error: false }
    ],
    takeaway: 'Quan hệ giữa bool và số khác nhau ở mỗi ngôn ngữ. Python là kiểu mạnh nhưng bool kế thừa từ int, đó là lựa chọn thiết kế chứ không phải kiểu yếu.'
  },
  {
    expr: '"5" == 5',
    langs: [
      { name: 'JavaScript', strong: false, code: '"5" == 5', result: '→ true (chuyển kiểu ngầm rồi so sánh)', error: false },
      { name: 'Python', strong: true, code: '"5" == 5', result: '→ False (khác kiểu thì False luôn)', error: false },
      { name: 'TypeScript', strong: false, code: '"5" == 5', result: '→ true (nhưng TSLint sẽ cảnh báo)', error: false },
      { name: 'PHP', strong: false, code: '"5" == 5', result: '→ true (kiểu so sánh lỏng khét tiếng)', error: false }
    ],
    takeaway: 'Toán tử == của JavaScript làm chuyển kiểu ngầm, nguồn gốc của vô vàn bug. Cộng đồng khuyến nghị luôn dùng === để so sánh nghiêm ngặt.'
  }
]
</script>

<style scoped>
.strong-vs-weak-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.expr-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.expr-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.expr-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.expr-btn code { font-size: 13px; }
.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.lang-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); overflow: hidden; }
.lang-header { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.lang-name { font-weight: 600; font-size: 13px; }
.lang-type { font-size: 11px; padding: 2px 6px; border-radius: 4px; }
.lang-type.strong { background: #dbeafe; color: #1e40af; }
.lang-type.weak { background: #fef3c7; color: #92400e; }
.lang-code { padding: 8px 10px; margin: 0; font-size: 12px; }
.lang-result { padding: 6px 10px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.lang-result.success { background: #f0fdf4; color: #166534; }
.lang-result.error { background: #fef2f2; color: #991b1b; }
.takeaway { margin-top: 12px; padding: 10px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; font-size: 13px; }
@media (max-width: 640px) { .results-grid { grid-template-columns: 1fr; } }
</style>
