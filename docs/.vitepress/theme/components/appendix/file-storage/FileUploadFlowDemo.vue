<!--
  FileUploadFlowDemo.vue
  Demo luồng upload file: direct upload vs upload qua server
-->
<template>
  <div class="upload-flow-demo">
    <div class="header">
      <div class="title">So sánh các cách upload file</div>
      <div class="subtitle">Bấm để xem khác biệt giữa hai cách upload</div>
    </div>

    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'proxy' }]"
        @click="mode = 'proxy'; reset()"
      >Qua server</button>
      <button
        :class="['tab', { active: mode === 'direct' }]"
        @click="mode = 'direct'; reset()"
      >Client upload thẳng</button>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, i) in currentSteps"
        :key="i"
        :class="['step', { active: currentStep === i, done: currentStep > i }]"
      >
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="step.note" class="step-note">{{ step.note }}</div>
        </div>
      </div>
    </div>

    <button class="play-btn" @click="playFlow" :disabled="playing">
      {{ playing ? 'Đang chạy...' : 'Chạy luồng' }}
    </button>

    <div :class="['verdict', mode]" v-if="currentStep >= currentSteps.length">
      <template v-if="mode === 'proxy'">
        ⚠️ Upload qua server: file đi qua server của bạn, tốn băng thông và RAM, file lớn dễ bị timeout
      </template>
      <template v-else>
        ✅ Client upload thẳng: file đi thẳng lên object storage, server chỉ cấp credential, hiệu quả và tiết kiệm tài nguyên
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('proxy')
const currentStep = ref(-1)
const playing = ref(false)

const proxySteps = [
  { title: 'Client → Server', desc: 'User chọn file rồi upload lên backend của bạn', note: 'File lớn sẽ chiếm băng thông và RAM của server' },
  { title: 'Server nhận file', desc: 'Backend lưu tạm file vào disk hoặc RAM', note: 'Có thể đụng giới hạn body size của Nginx' },
  { title: 'Server → Object storage', desc: 'Backend forward file lên object storage', note: 'File truyền hai lần, kém hiệu quả' },
  { title: 'Object storage trả URL', desc: 'Object storage trả về địa chỉ truy cập file', note: '' },
  { title: 'Server → Client', desc: 'Backend trả URL file về cho frontend', note: '' }
]

const directSteps = [
  { title: 'Client → Server', desc: 'Frontend xin một credential upload tạm (Pre-signed URL)', note: 'Chỉ truyền vài JSON nhỏ, mất vài ms' },
  { title: 'Server cấp credential', desc: 'Backend dùng SDK của object storage để tạo URL upload có chữ ký', note: 'Credential thường có hạn 5-15 phút' },
  { title: 'Client → Object storage', desc: 'Frontend upload file thẳng lên object storage', note: 'File không đi qua server của bạn, tiết kiệm băng thông' },
  { title: 'Object storage callback', desc: 'Upload xong, object storage callback về server để xác nhận', note: 'Server ghi metadata file vào database' }
]

const currentSteps = computed(() => mode.value === 'proxy' ? proxySteps : directSteps)

function reset() {
  currentStep.value = -1
  playing.value = false
}

async function playFlow() {
  reset()
  playing.value = true
  for (let i = 0; i < currentSteps.value.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 800))
  }
  currentStep.value = currentSteps.value.length
  playing.value = false
}
</script>

<style scoped>
.upload-flow-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.flow-steps { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.step {
  display: flex; gap: 0.75rem; padding: 0.6rem 0.75rem; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.3s;
}
.step.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.step.done { border-color: #22c55e; background: rgba(34,197,94,0.03); }
.step-num {
  width: 28px; height: 28px; border-radius: 50%; background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); display: flex; align-items: center;
  justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0;
}
.step.active .step-num { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.step.done .step-num { border-color: #22c55e; color: #22c55e; }
.step-title { font-weight: 600; font-size: 0.9rem; }
.step-desc { font-size: 0.8rem; color: var(--vp-c-text-2); }
.step-note { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; margin-top: 0.2rem; }
.play-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
}
.play-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.verdict {
  margin-top: 1rem; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem;
}
.verdict.proxy { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); }
.verdict.direct { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); }
</style>
