<template>
  <div class="demo-card">
    <div class="demo-label">{{ label }}</div>
    <div class="code-block">
      <div v-for="(line, i) in foundationLines" :key="i" class="code-line" :class="{ indent: line.indent }">
        <template v-for="(p, j) in line.parts" :key="j">
          <span v-if="p.kw" class="kw">{{ p.kw }}</span>
          <span v-else-if="p.str" class="str">{{ p.str }}</span>
          <template v-else>{{ p.text }}</template>
        </template>
      </div>
      <div class="code-line comment">{{ comment }}</div>
    </div>
    <div class="demo-caption">{{ caption }}</div>
  </div>
</template>

<script setup>
const label = 'Tư tưởng cốt lõi của chủ nghĩa ký hiệu — viết tri thức thành quy tắc'

const foundationLines = [
  {
    parts: [
      { kw: 'IF' },
      { text: '  nhiệt độ cơ thể > 38.5°C  ' },
      { kw: 'AND' },
      { text: '  số lượng bạch cầu > 11000' }
    ]
  },
  {
    indent: true,
    parts: [{ kw: 'THEN' }, { text: '  chẩn đoán = ' }, { str: '"nhiễm khuẩn"' }]
  },
  {
    parts: [
      { kw: 'IF' },
      { text: '  chẩn đoán = ' },
      { str: '"nhiễm khuẩn"' },
      { text: '  ' },
      { kw: 'AND' },
      { text: '  không dị ứng với penicillin' }
    ]
  },
  {
    indent: true,
    parts: [
      { kw: 'THEN' },
      { text: '  phác đồ điều trị = ' },
      { str: '"penicillin 400mg / 2 lần mỗi ngày"' }
    ]
  }
]

const comment = '// Hệ chuyên gia y tế thời kỳ đầu (MYCIN, 1977) được tạo thành từ hơn 450 quy tắc kiểu này'
const caption = 'Chuyên gia con người dịch kinh nghiệm thành từng quy tắc IF-THEN, máy khớp và thực thi từng quy tắc'
</script>

<style scoped>
.demo-card {
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
  margin-bottom: 0.6rem;
  letter-spacing: 0.2px;
}
.code-block {
  background: #1e1e2e;
  border-radius: 6px;
  padding: 0.9rem 1.1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.85;
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}
.code-line { color: #cdd6f4; white-space: nowrap; overflow-x: auto; }
.code-line.indent { padding-left: 2rem; }
.kw { color: #89b4fa; font-weight: bold; }   /* blue – keywords */
.str { color: #a6e3a1; }                       /* green – strings */
.comment { color: #585b70; font-size: 0.75rem; margin-top: 0.4rem; font-style: italic; }
.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  text-align: center;
}
</style>
