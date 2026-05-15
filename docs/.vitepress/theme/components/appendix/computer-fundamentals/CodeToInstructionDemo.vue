<template>
  <div class="code-to-instruction-demo">
    <h4>🔗 Từ code đến lệnh: hành trình dịch một dòng code</h4>
    <p class="desc">Bấm vào mỗi giai đoạn để xem code bạn viết được biến thành lệnh CPU như thế nào</p>

    <div class="example-selector">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        :class="['ex-btn', { active: selectedExample === i }]"
        @click="selectedExample = i"
      >
        <code>{{ ex.code }}</code>
      </button>
    </div>

    <div class="translation-chain">
      <div
        v-for="(stage, j) in examples[selectedExample].stages"
        :key="j"
        :class="['stage-card', { active: activeStage === j }]"
        @click="activeStage = j"
      >
        <div class="stage-header">
          <span class="stage-num">{{ j + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
        </div>
        <pre class="stage-code">{{ stage.content }}</pre>
        <div v-if="activeStage === j" class="stage-explain">
          {{ stage.explain }}
        </div>
      </div>

      <div
        v-for="j in examples[selectedExample].stages.length - 1"
        :key="'arrow-' + j"
        class="chain-arrow"
        :style="{ order: j * 2 }"
      >
        ↓
      </div>
    </div>

    <div class="key-insight">
      <div class="insight-title">💡 Điểm cốt lõi</div>
      <div class="insight-text">
        Tập lệnh chính là "API" của CPU — nó định nghĩa mọi lệnh mà CPU có thể hiểu.
        Việc của compiler là "dịch" ngôn ngữ bậc cao mà bạn viết thành chuỗi gọi của bộ API này.
        CPU khác nhau (x86, ARM) có tập lệnh khác nhau, giống như các dịch vụ khác nhau thì có API khác nhau.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedExample = ref(0)
const activeStage = ref(0)

const examples = [
  {
    code: 'int a = 10 + 5;',
    stages: [
      {
        name: 'Code bạn viết',
        content: 'int a = 10 + 5;',
        explain:
          'Đây là code ngôn ngữ bậc cao bạn viết trong editor. Con người đọc rất dễ hiểu, nhưng CPU hoàn toàn không hiểu nổi — nó không biết int là gì, cũng không biết dấu + là gì.'
      },
      {
        name: 'Compiler dịch sang Assembly',
        content: 'MOV  R1, #10    ; Đưa 10 vào thanh ghi R1\nMOV  R2, #5     ; Đưa 5 vào thanh ghi R2\nADD  R3, R1, R2 ; R3 = R1 + R2\nSTORE R3, [a]   ; Lưu kết quả vào địa chỉ của biến a',
        explain:
          'Compiler tách một dòng code bậc cao thành 4 lệnh assembly. Mỗi lệnh chỉ làm một việc đơn giản nhất: chuyển dữ liệu, cộng, lưu kết quả. Đó chính là "độ mịn năng lực" của CPU.'
      },
      {
        name: 'Assembler chuyển thành machine code',
        content: '0001 0001 0000 1010  → MOV R1, #10\n0001 0010 0000 0101  → MOV R2, #5\n0010 0011 0001 0010  → ADD R3, R1, R2\n0100 0011 1000 0000  → STORE R3, [a]',
        explain:
          'Assembler mã hóa mỗi lệnh assembly thành con số nhị phân. Opcode (vài bit đầu) bảo CPU "làm gì", còn operand (các bit sau) bảo CPU "làm với cái nào". Đây mới là thứ CPU thực sự chạy.'
      },
      {
        name: 'CPU chạy từng lệnh',
        content: 'Clock 1: Fetch → Decode → Execute MOV R1, #10\nClock 2: Fetch → Decode → Execute MOV R2, #5\nClock 3: Fetch → Decode → Execute ADD R3, R1, R2\nClock 4: Fetch → Decode → Execute STORE R3, [a]',
        explain:
          'CPU lần lượt nạp lệnh từ bộ nhớ, giải mã rồi thực thi. Mỗi chu kỳ clock xử lý một lệnh (mô hình đơn giản). Sau 4 lệnh, giá trị của biến a sẽ là 15.'
      }
    ]
  },
  {
    code: 'if (x > 0) y = 1;',
    stages: [
      {
        name: 'Code bạn viết',
        content: 'if (x > 0) y = 1;',
        explain:
          'Một phép kiểm tra điều kiện đơn giản. Con người nhìn là hiểu ngay, nhưng CPU không có khái niệm "if" — nó chỉ biết so sánh và nhảy.'
      },
      {
        name: 'Compiler dịch sang Assembly',
        content: 'LOAD R1, [x]     ; Đọc giá trị x từ bộ nhớ\nCMP  R1, #0       ; So sánh R1 với 0\nBLE  skip         ; Nếu ≤ 0 thì nhảy qua\nMOV  R2, #1       ; R2 = 1\nSTORE R2, [y]     ; Lưu 1 vào y\nskip:             ; Nhãn nhảy đến',
        explain:
          'Compiler tách câu if thành "so sánh + nhảy có điều kiện". Lệnh CMP so sánh hai giá trị và đặt cờ trạng thái, BLE dựa vào cờ để quyết định có bỏ qua đoạn gán hay không. Đó là cách CPU triển khai logic điều kiện.'
      },
      {
        name: 'Assembler chuyển thành machine code',
        content: '0011 0001 1000 0000  → LOAD R1, [x]\n0101 0001 0000 0000  → CMP R1, #0\n0110 0000 0000 0011  → BLE +3 (nhảy qua 3 lệnh)\n0001 0010 0000 0001  → MOV R2, #1\n0100 0010 1000 0001  → STORE R2, [y]',
        explain:
          'Để ý operand của lệnh BLE là "+3" — đó là độ lệch địa chỉ tương đối, bảo CPU nhảy về phía trước 3 lệnh. Đây là ứng dụng thực tế của "định địa chỉ tương đối".'
      },
      {
        name: 'CPU chạy từng lệnh',
        content: 'Giả sử x = 5 (lớn hơn 0):\n→ LOAD: Đọc x=5 vào R1\n→ CMP:  So sánh 5 > 0, đặt cờ\n→ BLE:  Điều kiện không thỏa, không nhảy\n→ MOV:  R2 = 1\n→ STORE: y = 1 ✅',
        explain:
          'Vì x=5 lớn hơn 0 nên điều kiện BLE không thỏa, CPU tiếp tục chạy đoạn gán bên dưới. Nếu x=0 thì BLE sẽ nhảy qua đoạn gán, đi thẳng đến nhãn skip.'
      }
    ]
  }
]
</script>

<style scoped>
.code-to-instruction-demo {
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
.ex-btn code { font-size: 13px; }

.translation-chain {
  display: flex; flex-direction: column; gap: 0; margin-bottom: 16px;
}
.stage-card {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden; cursor: pointer;
  transition: all 0.2s; order: 0;
}
.stage-card:nth-child(1) { order: 0; }
.stage-card:nth-child(3) { order: 2; }
.stage-card:nth-child(5) { order: 4; }
.stage-card:nth-child(7) { order: 6; }
.stage-card.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 1px var(--vp-c-brand-1); }
.stage-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.stage-num {
  width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand-1);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
}
.stage-name { font-size: 13px; font-weight: 600; }
.stage-code {
  padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5;
  white-space: pre-wrap; max-height: 120px; overflow-y: auto;
}
.stage-explain {
  padding: 8px 12px; font-size: 12px; line-height: 1.6;
  background: var(--vp-c-brand-soft); border-top: 1px solid var(--vp-c-divider);
}
.chain-arrow {
  text-align: center; font-size: 18px; color: var(--vp-c-brand-1);
  font-weight: 700; padding: 4px 0;
}

.key-insight {
  padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px;
}
.insight-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.insight-text { font-size: 13px; line-height: 1.6; }
</style>
