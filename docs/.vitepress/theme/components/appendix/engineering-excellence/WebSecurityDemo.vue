<template>
  <div class="web-security-demo">
    <div class="demo-label">Demo lỗ hổng bảo mật Web (mục đích giáo dục) ── Bấm để chuyển loại lỗ hổng</div>

    <div class="tabs">
      <button
        v-for="(v, i) in vulns"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ v.icon }} {{ v.name }}</button>
    </div>

    <div class="vuln-card">
      <div class="attack-flow">
        <div class="flow-title">Luồng tấn công</div>
        <div class="flow-steps">
          <div v-for="(s, j) in vulns[current].flow" :key="j" class="flow-step">
            <span class="step-num">{{ j + 1 }}</span>
            <span class="step-text">{{ s }}</span>
          </div>
        </div>
      </div>

      <div class="code-compare">
        <div class="code-col bad">
          <div class="col-title">Code có lỗ hổng</div>
          <pre><code>{{ vulns[current].bad }}</code></pre>
        </div>
        <div class="code-col good">
          <div class="col-title">Code đã fix</div>
          <pre><code>{{ vulns[current].good }}</code></pre>
        </div>
      </div>

      <div class="defense-tip">
        <strong>Cách phòng thủ:</strong> {{ vulns[current].defense }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)

const vulns = [
  {
    name: 'XSS',
    icon: '💉',
    flow: [
      'Attacker gửi script độc hại qua input',
      'Server không filter mà lưu thẳng vào database',
      'User khác truy cập trang, script được thực thi',
      'Cookie/dữ liệu user bị đánh cắp'
    ],
    bad: '// Chen truc tiep input user (nguy hiem!)\nel.innerHTML = userInput\n// Neu userInput = \'<scr\' + \'ipt>steal(cookie)</scr\' + \'ipt>\'\n// Script se duoc thuc thi!',
    good: `// Dung textContent de chen an toan
el.textContent = userInput
// Hoac dung framework tu dong escape
// Vue: {{ userInput }}  tu dong escape
// React: {userInput}    tu dong escape`,
    defense: 'Không bao giờ tin tưởng input của user. Dùng cơ chế escape sẵn có của framework, tránh innerHTML, encode khi output.'
  },
  {
    name: 'SQL Injection',
    icon: '🗄️',
    flow: [
      'Attacker nhập chuỗi đặc biệt vào form login',
      'Chuỗi được ghép vào câu lệnh SQL',
      'Database thực thi truy vấn đã bị thay đổi',
      'Attacker bypass xác thực hoặc lấy dữ liệu'
    ],
    bad: `// Ghep noi chuoi SQL (nguy hiem!)
const sql = "SELECT * FROM users " +
  "WHERE name='" + username + "'" +
  " AND pass='" + password + "'"
// Input: admin' OR '1'='1
// Tro thanh: WHERE name='admin' OR '1'='1'`,
    good: `// Dung parameterized query (an toan)
const sql = "SELECT * FROM users " +
  "WHERE name = ? AND pass = ?"
db.query(sql, [username, password])
// Tham so duoc escape an toan, khong the inject`,
    defense: 'Luôn dùng parameterized query hoặc ORM, không bao giờ ghép chuỗi SQL.'
  },
  {
    name: 'CSRF',
    icon: '🎭',
    flow: [
      'User đã login website ngân hàng (có Cookie)',
      'User truy cập website độc hại',
      'Website độc hại tự động gửi request chuyển tiền',
      'Browser tự động đính kèm Cookie, request thành công'
    ],
    bad: '<!-- Form an cua website doc hai -->\n<form action="https://bank.com/transfer"\n      method="POST" id="evil">\n  <input name="to" value="attacker" />\n  <input name="amount" value="10000" />\n</form>\n<scr' + 'ipt>document.getElementById(\'evil\')\n  .submit()</scr' + 'ipt>',
    good: `// Server: sinh va verify CSRF Token
app.post('/transfer', (req, res) => {
  if (req.body.token !== req.session.csrf) {
    return res.status(403).send('Tu choi')
  }
  // Thuc hien chuyen tien...
})
// Dong thoi set thuoc tinh SameSite Cookie`,
    defense: 'Dùng CSRF Token, đặt thuộc tính SameSite Cookie, kiểm tra header Referer/Origin.'
  }
]
</script>

<style scoped>
.web-security-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.attack-flow { margin-bottom: 12px; }
.flow-title { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); margin-bottom: 6px; }
.flow-steps { display: flex; gap: 4px; flex-wrap: wrap; }
.flow-step { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; padding: 4px 8px; background: var(--vp-c-bg); border-radius: 4px; }
.flow-step::after { content: '→'; color: var(--vp-c-text-3); margin-left: 4px; }
.flow-step:last-child::after { content: ''; }
.step-num { width: 18px; height: 18px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.code-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .code-compare { grid-template-columns: 1fr; } }
.code-col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.code-col.bad .col-title { background: #fef2f2; color: #991b1b; }
.code-col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .code-col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .code-col.good .col-title { background: #031c14; color: #6ee7b7; }
.code-col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.defense-tip { font-size: 0.83rem; padding: 8px; background: var(--vp-c-bg); border-radius: 4px; border-left: 3px solid var(--vp-c-brand); }
</style>
