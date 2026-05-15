<!--
  FewShotDemo.vue
  Hiểu nhanh Few-shot: không có ví dụ vs có ví dụ, "phong cách" của AI có ổn định không?

  Tương tác:
  - Chọn phong cách mong muốn (đời thường / trang trọng)
  - Bật/tắt việc cung cấp ví dụ
  - Quan sát prompt và output thay đổi thế nào
-->
<template>
  <el-card
    class="few-shot-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">
            Sức mạnh của ví dụ: để phong cách "đi theo bạn"
          </h3>
          <p class="subtitle">
            Bạn không làm AI thông minh hơn, mà làm cho nó giống mẫu bạn muốn hơn.
          </p>
        </div>
        <div class="controls">
          <el-select
            v-model="tone"
            style="width: 140px"
          >
            <el-option
              label="Đời thường, khẩu ngữ"
              value="casual"
            />
            <el-option
              label="Trang trọng, văn viết"
              value="formal"
            />
          </el-select>
          <el-switch
            v-model="withExamples"
            active-text="Có ví dụ"
            inactive-text="Không ví dụ"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </div>
      </div>
    </template>

    <div class="grid-layout">
      <el-card
        shadow="never"
        class="panel"
      >
        <template #header>
          <div class="panel-header">
            Prompt
          </div>
        </template>
        <div class="code-block">
          <pre><code>{{ prompt }}</code></pre>
        </div>
      </el-card>

      <el-card
        shadow="never"
        class="panel"
      >
        <template #header>
          <div class="panel-header">
            Output AI (minh hoạ)
          </div>
        </template>
        <div class="output-content">
          {{ output }}
        </div>
        <el-alert
          :title="hint"
          :type="withExamples ? 'success' : 'warning'"
          show-icon
          :closable="false"
          style="margin-top: 16px;"
        />
      </el-card>
    </div>

    <div
      v-if="withExamples"
      class="examples-section"
    >
      <el-divider content-position="left">
        Ví dụ (AI sẽ "học theo")
      </el-divider>
      <el-row :gutter="12">
        <el-col
          v-for="e in examples"
          :key="e.in"
          :span="8"
        >
          <el-card
            shadow="hover"
            class="example-item"
            :body-style="{ padding: '12px' }"
          >
            <div class="ex-in">
              Input: {{ e.in }}
            </div>
            <div class="ex-out">
              Output: {{ e.out }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'

const tone = ref('casual')
const withExamples = ref(true)

const examples = computed(() => {
  if (tone.value === 'casual') {
    return [
      { in: 'Xin chào', out: 'Hi~' },
      { in: 'Cảm ơn', out: 'Cảm ơn nhé!' },
      { in: 'Tạm biệt', out: 'Bye bye~' }
    ]
  }
  return [
    { in: 'Xin chào', out: 'Kính chào quý khách.' },
    { in: 'Cảm ơn', out: 'Xin chân thành cảm ơn.' },
    { in: 'Tạm biệt', out: 'Tạm biệt, chúc bạn mọi điều tốt lành.' }
  ]
})

const prompt = computed(() => {
  const base = 'Dịch tiếng Việt sang tiếng Anh.'
  const task = 'Input: Tôi khoẻ'
  if (!withExamples.value) return `${base}\n${task}`
  const lines = [base, 'Ví dụ:']
  for (const e of examples.value) {
    lines.push(`- ${e.in} -> ${e.out}`)
  }
  lines.push(task)
  return lines.join('\n')
})

const output = computed(() => {
  if (!withExamples.value) {
    return tone.value === 'casual' ? "I'm fine." : 'I am fine.'
  }
  return tone.value === 'casual' ? "I'm good!" : 'I am doing well.'
})

const hint = computed(() => {
  if (!withExamples.value) return 'Không có ví dụ: AI có thể chọn bừa một giọng văn.'
  return 'Có ví dụ: AI dễ "giữ cùng một giọng văn" hơn.'
})
</script>

<style scoped>
.few-shot-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.panel-header {
  font-weight: 600;
  font-size: 15px;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 12px;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid var(--vp-c-divider);
}

.output-content {
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
  min-height: 60px;
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.example-item {
  font-size: 13px;
  margin-bottom: 8px;
}

.ex-in {
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.ex-out {
  font-weight: 600;
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
  }
  
  .controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
