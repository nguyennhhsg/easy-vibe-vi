<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">Hard-code khóa bí mật vs dùng biến môi trường</span>
      <span class="subtitle">Cùng chức năng, hai cách viết, độ an toàn khác nhau một trời một vực</span>
    </div>

    <div class="two-col">
      <!-- Bad -->
      <div class="panel bad">
        <div class="panel-title">
          <span class="icon">❌</span> Cách viết nguy hiểm: khóa bí mật nằm trong code
        </div>
        <div class="code-area">
          <div class="code-line comment"># Python</div>
          <div class="code-line normal">import openai</div>
          <div class="code-line normal">&nbsp;</div>
          <div class="code-line highlight-bad">client = openai.OpenAI(</div>
          <div class="code-line highlight-bad">  api_key=<span class="key-literal">"sk-proj-abc123..."</span></div>
          <div class="code-line highlight-bad">)</div>
        </div>
        <div class="consequences">
          <div v-for="c in badConsequences" :key="c" class="consequence bad-item">
            <span class="ci">💀</span><span>{{ c }}</span>
          </div>
        </div>
      </div>

      <!-- Good -->
      <div class="panel good">
        <div class="panel-title">
          <span class="icon">✅</span> Cách viết đúng: đọc từ biến môi trường
        </div>
        <div class="code-area">
          <div class="code-line comment"># Python</div>
          <div class="code-line normal">import openai, os</div>
          <div class="code-line normal">&nbsp;</div>
          <div class="code-line highlight-good">client = openai.OpenAI(</div>
          <div class="code-line highlight-good">  api_key=<span class="key-env">os.environ.get(<span class="key-name">"OPENAI_API_KEY"</span>)</span></div>
          <div class="code-line highlight-good">)</div>
        </div>
        <div class="consequences">
          <div v-for="c in goodConsequences" :key="c" class="consequence good-item">
            <span class="ci">✅</span><span>{{ c }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Quy tắc vàng:</strong> Code có chứa chuỗi khóa bí mật = khóa đã bị lộ. Secret Scanner của GitHub quét trong vòng vài giây sau khi push, phát hiện tiền tố như <code>sk-</code> sẽ báo nhà cung cấp thu hồi ngay. Dù bạn xóa commit ngay lập tức, lịch sử Git vẫn lưu lại.
    </div>
  </div>
</template>

<script setup>
const badConsequences = [
  'Sau khi git push, khóa bí mật công khai trên GitHub',
  'Bot quét trong vài giây, khóa bị đánh cắp và phát sinh chi phí',
  'GitHub Secret Scanner tự động thu hồi khóa',
  'Xóa commit cũng vô ích, lịch sử Git vẫn còn'
]

const goodConsequences = [
  'Trong code không có thông tin khóa, có thể open source an toàn',
  'Mỗi môi trường (dev/test/prod) dùng khóa khác nhau',
  'Khi khóa bị lộ chỉ cần tạo lại, không cần sửa code',
  'Mỗi thành viên trong nhóm dùng khóa riêng, không ảnh hưởng nhau'
]
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 620px) {
  .two-col { grid-template-columns: 1fr; }
}

.panel {
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid;
  min-width: 0;
}

.panel.bad { border-color: #f87171; }
.panel.good { border-color: var(--vp-c-green-1); }

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  font-size: 0.82rem;
  font-weight: bold;
}

.panel.bad .panel-title { background: color-mix(in srgb, #f87171 15%, var(--vp-c-bg-alt)); color: #ef4444; }
.panel.good .panel-title { background: color-mix(in srgb, var(--vp-c-green-1) 12%, var(--vp-c-bg-alt)); color: var(--vp-c-green-1); }

.code-area {
  background: #1e1e2e;
  padding: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.77rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line {
  padding: 0 0.7rem;
  white-space: pre;
  min-width: max-content;
}

.code-line.comment { color: #6c7086; font-style: italic; }
.code-line.normal { color: #cdd6f4; }
.code-line.highlight-bad { background: color-mix(in srgb, #f87171 10%, transparent); color: #cdd6f4; }
.code-line.highlight-good { background: color-mix(in srgb, #4ade80 6%, transparent); color: #cdd6f4; }

.key-literal { color: #f38ba8; }
.key-env { color: #a6e3a1; }
.key-name { color: #89b4fa; }

.consequences {
  padding: 0.55rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: var(--vp-c-bg);
}

.consequence {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.76rem;
  line-height: 1.4;
}

.bad-item { color: color-mix(in srgb, #f87171 80%, var(--vp-c-text-2)); }
.good-item { color: var(--vp-c-text-2); }

.ci { flex-shrink: 0; font-size: 0.8rem; }

.info-box {
  display: block;
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-alt));
  border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: #ef4444; }

.info-box code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: #ef4444;
  font-size: 0.8rem;
}
</style>
