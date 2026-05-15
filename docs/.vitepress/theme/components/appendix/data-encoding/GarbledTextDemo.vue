<template>
  <div class="garbled-demo">
    <div class="demo-scenario">
      <div class="scenario-label">Nội dung file bạn nhận được (dòng byte)</div>
      <div class="bytes-display">
        <span v-for="(byte, i) in fileBytes" :key="i" class="byte-chip">0x{{ byte }}</span>
      </div>
    </div>

    <div class="decoder-panel">
      <div class="decoder-label">Bạn dùng luật nào để "đọc" nó?</div>
      <div class="encoding-buttons">
        <button
          v-for="enc in encodings"
          :key="enc.name"
          :class="['enc-btn', { active: selectedEncoding === enc.name }]"
          @click="selectedEncoding = enc.name"
        >
          {{ enc.label }}
        </button>
      </div>
    </div>

    <div class="result-panel" :class="currentEncoding.correct ? 'correct' : 'garbled'">
      <div class="result-label">
        <span v-if="currentEncoding.correct">Chuẩn ({{ selectedEncoding }})</span>
        <span v-else>Ký tự lỗi! (Dùng {{ selectedEncoding }} để đọc file UTF-8)</span>
      </div>
      <div class="result-text">{{ currentEncoding.result }}</div>
      <div class="result-explanation">{{ currentEncoding.explanation }}</div>
    </div>

    <div class="insight-box">
      <strong>Điểm cốt lõi</strong>: Bản thân byte không mang ý nghĩa gì, <strong>chính luật encoding mới quyết định byte hiện ra thành ký tự nào</strong>. Người gửi dùng UTF-8 để lưu, bạn lại dùng GBK để đọc thì tất nhiên ra một mớ ký tự lạ.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// "你好" in UTF-8 bytes (hex)
const fileBytes = ['E4', 'BD', 'A0', 'E5', 'A5', 'BD']

const encodings = [
  {
    name: 'UTF-8',
    label: 'UTF-8 (chuẩn)',
    result: '你好',
    correct: true,
    explanation: 'Người gửi đã dùng UTF-8 để lưu chữ "你好", bạn cũng dùng UTF-8 để đọc nên hiển thị đúng.'
  },
  {
    name: 'GBK',
    label: 'GBK (lỗi)',
    result: '浣犲ソ',
    correct: false,
    explanation: 'GBK dùng luật khác để giải mã cùng những byte đó nên ra một chuỗi ký tự khác hẳn, sinh ra lỗi font.'
  },
  {
    name: 'Latin-1',
    label: 'Latin-1 (lỗi)',
    result: 'ä½ å¥½',
    correct: false,
    explanation: 'Latin-1 (ISO-8859-1) chỉ biểu diễn được 256 ký tự, nó hiểu nhầm dãy nhiều byte của UTF-8 thành từng byte đơn lẻ nên hỏng hoàn toàn.'
  }
]

const selectedEncoding = ref('UTF-8')

const currentEncoding = computed(() =>
  encodings.find(e => e.name === selectedEncoding.value) || encodings[0]
)
</script>

<style scoped>
.garbled-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-scenario {
  background: var(--vp-c-bg);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.scenario-label,
.decoder-label {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.bytes-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.byte-chip {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 7px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.decoder-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.encoding-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.enc-btn {
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.enc-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.result-panel {
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid;
  transition: all 0.3s;
}

.result-panel.correct {
  border-color: var(--vp-c-green-1);
  background: rgba(16, 185, 129, 0.08);
}

.result-panel.garbled {
  border-color: #f87171;
  background: rgba(248, 113, 113, 0.08);
}

.result-label {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.result-text {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  font-family: sans-serif;
}

.result-explanation {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.insight-box {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
