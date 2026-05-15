<template>
  <div class="addition-rules">
    <div class="demo-header">
      <span class="title">Từ phép cộng thủ công đến cổng logic</span>
      <span class="subtitle">Máy tính làm toán bằng cách nào với chỉ 0 và 1? Hãy xem quy luật sau</span>
    </div>

    <!-- 1. So sánh với hệ thập phân -->
    <div class="section">
      <div class="section-title">Bước 1: ôn lại khái niệm "nhớ" trong hệ thập phân</div>
      <div class="decimal-analogy">
        <div class="math-column">
          <div class="math-row">
            <span class="digit carry-mark">1</span> <!-- ký hiệu nhớ -->
          </div>
          <div class="math-row">
            <span class="digit"></span>
            <span class="digit">7</span>
          </div>
          <div class="math-row">
            <span class="op">+</span>
            <span class="digit">5</span>
          </div>
          <div class="math-line"></div>
          <div class="math-row result-row">
            <span class="digit c-color">1</span>
            <span class="digit s-color">2</span>
          </div>
        </div>

        <div class="analogy-text">
          <p>
            Vì 7 + 5 = 12, vượt quá chữ số lớn nhất ở hàng đơn vị (9).
            Ta tách 12 thành "một số 10 đầy đủ" và "phần dư 2":
          </p>
          <ul>
            <li>
              Phần <span class="badge s-badge">2</span> ở lại được <strong>viết tại hàng đơn vị</strong>, gọi là <strong class="s-color">tổng tại bit (Sum)</strong>.
            </li>
            <li>
              "Số 10 đầy đủ" được <strong>nhớ 1</strong> lên hàng chục, gọi là <strong class="c-color">nhớ (Carry)</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. 4 trường hợp của phép cộng nhị phân -->
    <div class="section">
      <div class="section-title">Bước 2: 4 trường hợp của phép cộng nhị phân (hãy thử nhấp xem)</div>
      <div class="binary-demo">
        <div class="binary-calc">
          <button class="bit-btn" :class="{ on: inputA }" @click="inputA = !inputA">{{ inputA ? '1' : '0' }}</button>
          <span class="op">+</span>
          <button class="bit-btn" :class="{ on: inputB }" @click="inputB = !inputB">{{ inputB ? '1' : '0' }}</button>
          <span class="op">=</span>
          <span class="res-box">
            <span class="res-bit carry-bit" :class="{ lit: carry }">{{ carry ? '1' : '0' }}</span>
            <span class="res-bit sum-bit" :class="{ lit: sum }">{{ sum ? '1' : '0' }}</span>
          </span>
        </div>

        <div class="binary-explain">
          <p v-if="!inputA && !inputB">
            0 + 0 = 0. <br>Tổng tại bit là <strong>0</strong>, không nhớ.
          </p>
          <p v-if="(!inputA && inputB) || (inputA && !inputB)">
            {{ inputA ? '1' : '0' }} + {{ inputB ? '1' : '0' }} = 1. <br>Tổng tại bit là <strong>1</strong>, không nhớ.
          </p>
          <p v-if="inputA && inputB">
            1 + 1 = 10. <br>
            Nhị phân tuân theo quy tắc "đủ 2 thì nhớ 1". Vì vậy tổng tại bit là <strong class="s-color">0</strong>, nhớ <strong class="c-color">1</strong> sang trái.
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Đặt tên cho quy luật và ánh xạ sang cổng logic -->
    <div class="section mb-0">
      <div class="section-title">Bước 3: đặt tên cho quy luật (chuyển thành mạch điện)</div>
      
      <div class="rules-container">
        <!-- Bảng tổng hợp 4 trường hợp -->
        <div class="rules-table">
          <div class="rt-head">
            <span>A</span><span>B</span><span class="c-color">Nhớ</span><span class="s-color">Tổng</span>
          </div>
          <div class="rt-row" :class="{ active: !inputA && !inputB }"><span>0</span><span>0</span><span>0</span><span>0</span></div>
          <div class="rt-row" :class="{ active: !inputA && inputB }"> <span>0</span><span>1</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && !inputB }"> <span>1</span><span>0</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && inputB }">  <span>1</span><span>1</span><span>1</span><span>0</span></div>
        </div>

        <div class="rules-text">
          <div class="rule-card sum-rule" :class="{ active: sum }">
            <div class="rc-title"><span class="badge s-badge">Tổng</span> quy luật:</div>
            <div class="rc-desc">
              Chỉ khi đầu vào là (0,1) hoặc (1,0) thì tổng tại bit mới là 1.<br>
              <strong>Tóm lại:</strong> tổng là 1 chỉ khi hai đầu vào <strong>khác nhau</strong>.<br>
              <div class="rc-gate">Quy luật này trong mạch điện gọi là <strong>XOR (cổng đảo dấu, exclusive OR)</strong></div>
            </div>
          </div>

          <div class="rule-card carry-rule" :class="{ active: carry }">
            <div class="rc-title"><span class="badge c-badge">Nhớ</span> quy luật:</div>
            <div class="rc-desc">
              Chỉ khi đầu vào là (1,1) thì mới có nhớ bằng 1.<br>
              <strong>Tóm lại:</strong> nhớ là 1 chỉ khi cả hai đầu vào <strong>cùng bằng 1</strong>.<br>
              <div class="rc-gate">Quy luật này trong mạch điện gọi là <strong>AND (cổng AND)</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(false)
const inputB = ref(false)

const sum = computed(() => inputA.value !== inputB.value)
const carry = computed(() => inputA.value && inputB.value)
</script>

<style scoped>
.addition-rules {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1.5rem 0;
}

.demo-header {
  margin-bottom: 1.2rem;
}
.title {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.mb-0 { margin-bottom: 0; }

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

/* Các màu hằng số */
.s-color { color: #16a34a; font-weight: bold; }
.c-color { color: #d97706; font-weight: bold; }
.badge { padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
.s-badge { background: #dcfce7; color: #166534; }
.c-badge { background: #fef3c7; color: #92400e; }

/* 1. So sánh với hệ thập phân */
.decimal-analogy {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.math-column {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: monospace;
  font-size: 1.5rem;
  background: var(--vp-c-bg-alt);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  position: relative;
}
.math-row {
  display: flex;
  gap: 0.5rem;
  line-height: 1.2;
}
.digit { width: 1.2rem; text-align: center; }
.op { font-weight: bold; color: var(--vp-c-text-3); margin-right: 0.2rem; }
.math-line {
  width: 100%;
  height: 2px;
  background: var(--vp-c-text-2);
  margin: 0.2rem 0;
}
.carry-mark {
  color: #d97706;
  font-size: 0.8rem;
  line-height: 1;
  transform: translateY(10px);
}
.analogy-text {
  flex: 1;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.analogy-text ul { padding-left: 1.2rem; margin-top: 0.5rem; }

/* 2. 4 trường hợp của phép cộng nhị phân */
.binary-demo {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.binary-calc {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
}
.bit-btn {
  width: 3rem; height: 3rem; font-size: 1.5rem; font-weight: bold; font-family: monospace;
  border-radius: 6px; background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider);
  cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.bit-btn.on { background: #dbeafe; color: #1d4ed8; border-color: #3b82f6; }
.res-box { display: flex; gap: 0.2rem; margin-left: 0.5rem; }
.res-bit {
  width: 3rem; height: 3rem; border-radius: 6px; border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg); font-size: 1.5rem; font-weight: bold; font-family: monospace;
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-text-3); transition: all 0.2s;
}
.carry-bit.lit { background: #fef3c7; color: #d97706; border-color: #d97706; }
.sum-bit.lit   { background: #dcfce7; color: #16a34a; border-color: #16a34a; }

.binary-explain {
  flex: 1;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  min-width: 200px;
}
.binary-explain p { margin: 0; }

/* 3. Tìm ra quy luật */
.rules-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.rules-table {
  flex: 0 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  font-family: monospace;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
}
.rt-head, .rt-row {
  display: grid;
  grid-template-columns: 2rem 2rem 3rem 3rem;
  text-align: center;
  padding: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.rt-row:last-child { border-bottom: none; }
.rt-head { font-weight: bold; font-family: system-ui; font-size: 0.75rem; background: var(--vp-c-bg); }
.rt-row.active { background: #dbeafe; font-weight: bold; }

.rules-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 250px;
}
.rule-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem;
  transition: all 0.2s;
  background: var(--vp-c-bg-alt);
}
.sum-rule.active { border-color: #16a34a; background: #f0fdf4; }
.carry-rule.active { border-color: #d97706; background: #fffbeb; }

.rc-title { font-size: 0.8rem; font-weight: bold; margin-bottom: 0.4rem; color: var(--vp-c-text-1); }
.rc-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.5; }
.rc-gate {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .decimal-analogy, .binary-demo, .rules-container { flex-direction: column; align-items: stretch; }
  .math-column, .rules-table { align-self: center; }
}
</style>
