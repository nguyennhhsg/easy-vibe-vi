<!--
  PromptRobustnessDemo.vue
  Minh hoạ cách dùng "cho phép hỏi lại" và "tự kiểm tra" để output AI ổn định hơn.
  Kịch bản: lên kế hoạch hoạt động team building
-->
<template>
  <el-card
    class="robustness-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">
            Để AI "ổn định" hơn: từ chối đoán mò, học cách hỏi lại và tự kiểm tra
          </h3>
          <p class="subtitle">
            Trước chỉ thị mơ hồ, AI nên "không hiểu thì hỏi" thay vì "nghiêm túc nói nhảm".
          </p>
        </div>
      </div>
    </template>

    <div class="controls-section">
      <el-row
        :gutter="20"
        align="middle"
      >
        <el-col
          :span="12"
          :xs="24"
        >
          <div class="input-display">
            <span class="label">Chỉ thị của bạn:</span>
            <el-tag
              type="info"
              size="large"
              effect="plain"
            >
              "Lên kế hoạch giúp tôi một buổi team building."
            </el-tag>
          </div>
        </el-col>
        <el-col
          :span="12"
          :xs="24"
        >
          <div class="mode-switch">
            <el-radio-group
              v-model="mode"
              @change="resetState"
            >
              <el-radio-button label="raw">
                Sinh trực tiếp
              </el-radio-button>
              <el-radio-button label="clarify">
                Cho phép hỏi lại
              </el-radio-button>
              <el-radio-button label="verify">
                Yêu cầu tự kiểm tra
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="simulation-area">
      <!-- Chế độ 1: sinh trực tiếp -->
      <div
        v-if="mode === 'raw'"
        class="scenario raw"
      >
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content"
          >
            <p>Vâng! Tôi đề xuất các hoạt động sau:</p>
            <ol>
              <li>Tiệc du thuyền hạng sang (5 triệu/người)</li>
              <li>Ăn lẩu ở quán dưới văn phòng (100k/người)</li>
              <li>Trekking khu vực hoang vu (rủi ro cao)</li>
            </ol>
            <div class="note">
              (AI tự nhủ: bạn không nói ngân sách và số người, mình đoán bừa thôi...)
            </div>
          </el-card>
        </div>
        <el-alert
          title="Kết quả không kiểm soát được: AI chỉ đoán mò, kế hoạch có thể hoàn toàn không thực tế"
          type="error"
          show-icon
          :closable="false"
        />
      </div>

      <!-- Chế độ 2: hỏi lại để làm rõ -->
      <div
        v-if="mode === 'clarify'"
        class="scenario clarify"
      >
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content"
          >
            <p>Đã nhận. Để đưa ra đề xuất chính xác, mình cần xác nhận 3 điểm:</p>
            <el-form
              label-position="top"
              size="small"
              class="questions-form"
            >
              <el-row :gutter="12">
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item label="1. Quy mô số người?">
                    <el-select v-model="answers.count">
                      <el-option
                        label="Team nhỏ 10 người"
                        value="10"
                      />
                      <el-option
                        label="Công ty lớn 100 người"
                        value="100"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item label="2. Ngân sách / người?">
                    <el-select v-model="answers.budget">
                      <el-option
                        label="Thấp (<200k)"
                        value="low"
                      />
                      <el-option
                        label="Cao (>1tr)"
                        value="high"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item label="3. Sở thích?">
                    <el-select v-model="answers.type">
                      <el-option
                        label="Ăn uống nhẹ nhàng"
                        value="relax"
                      />
                      <el-option
                        label="Vận động ngoài trời"
                        value="active"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button
                type="primary"
                style="margin-top: 8px"
                @click="generatePlan"
              >
                Sinh kế hoạch
              </el-button>
            </el-form>
          </el-card>
        </div>
        
        <div
          v-if="planResult"
          class="chat-bubble ai result fade-in"
        >
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content plan-result"
          >
            <p>Dựa trên yêu cầu của bạn ({{ answerSummary }}), mình đề xuất phương án:</p>
            <div class="plan-card">
              <h3>{{ planResult.title }}</h3>
              <p>{{ planResult.desc }}</p>
            </div>
          </el-card>
        </div>
      </div>

      <!-- Chế độ 3: tự kiểm tra và sửa -->
      <div
        v-if="mode === 'verify'"
        class="scenario verify"
      >
        <el-alert
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 20px"
        >
          <template #title>
            Chỉ thị nâng cấp: lên kế hoạch một hoạt động, <strong>phải có lựa chọn món chay</strong>, và <strong>tổng ngân sách không quá 2tr</strong>.
          </template>
        </el-alert>
        
        <el-steps
          :active="verifyStep"
          align-center
          finish-status="success"
          style="margin-bottom: 24px"
        >
          <el-step
            title="Sinh nháp"
            :icon="Edit"
          />
          <el-step
            title="Tự kiểm tra"
            :icon="View"
          />
          <el-step
            title="Sửa và xuất"
            :icon="CircleCheck"
          />
        </el-steps>

        <div class="monitor-log">
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 1"
              class="log-item"
            >
              <el-tag
                size="small"
                type="info"
              >
                Bản nháp
              </el-tag>
              <span class="log-text">"Tiệc nướng toàn bò, ước tính chi phí 3tr..."</span>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 2"
              class="log-item check-fail"
            >
              <el-tag
                size="small"
                type="danger"
              >
                Tự kiểm tra phát hiện
              </el-tag>
              <div class="check-list">
                <div class="fail-item">
                  <el-icon color="#f56c6c">
                    <Close />
                  </el-icon> Có món chay? Không (toàn thịt)
                </div>
                <div class="fail-item">
                  <el-icon color="#f56c6c">
                    <Close />
                  </el-icon> Ngân sách &lt;2tr? Không (3tr vượt mức)
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 3"
              class="log-item success"
            >
              <el-tag
                size="small"
                type="success"
              >
                Sau khi sửa
              </el-tag>
              <span class="log-text">"Buffet rau củ kiểu vườn quê + một ít đồ nướng, ước tính 1.8tr." ✅</span>
            </div>
          </el-collapse-transition>
        </div>
        
        <div
          class="actions"
          style="text-align: center; margin-top: 20px;"
        >
          <el-button
            v-if="verifyStep === 0"
            type="primary"
            size="large"
            @click="runVerify"
          >
            Bắt đầu chạy
          </el-button>
          <el-button
            v-else-if="verifyStep === 3"
            @click="verifyStep = 0"
          >
            Reset demo
          </el-button>
          <el-button
            v-else
            loading
            disabled
          >
            Đang xử lý...
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Edit, View, CircleCheck, Close } from '@element-plus/icons-vue'

const mode = ref('raw') // raw, clarify, verify
const answers = ref({
  count: '10',
  budget: 'low',
  type: 'relax'
})
const planResult = ref(null)
const verifyStep = ref(0)

const resetState = () => {
  planResult.value = null
  verifyStep.value = 0
}

const answerSummary = computed(() => {
  const m = {
    '10': '10 người', '100': '100 người',
    'low': 'ngân sách thấp', 'high': 'ngân sách cao',
    'relax': 'thư giãn', 'active': 'vận động'
  }
  return `${m[answers.value.count]} + ${m[answers.value.budget]} + ${m[answers.value.type]}`
})

const generatePlan = () => {
  const { count, budget, type } = answers.value
  let title = ''
  let desc = ''
  
  if (budget === 'high') {
    title = type === 'relax' ? 'Khách sạn 5 sao SPA & buffet tối' : 'Trải nghiệm golf hạng sang'
  } else {
    title = type === 'relax' ? 'Phòng board game & pizza giao tận nơi' : 'Chạy định hướng trong công viên'
  }

  desc = `Phù hợp đội ${count} người, ${budget === 'high' ? 'sang trọng đỉnh cao' : 'cực kỳ tối ưu chi phí'}.`
  planResult.value = { title, desc }
}

const runVerify = () => {
  verifyStep.value = 1
  setTimeout(() => verifyStep.value = 2, 1000)
  setTimeout(() => verifyStep.value = 3, 2500)
}
</script>

<style scoped>
.robustness-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.controls-section {
  margin-bottom: 24px;
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
}

.input-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mode-switch {
  display: flex;
  justify-content: flex-end;
}

.simulation-area {
  min-height: 250px;
}

.chat-bubble {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar-container {
  flex-shrink: 0;
}

.bubble-content {
  flex: 1;
  border-radius: 0 12px 12px 12px;
}

.note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  font-style: italic;
}

.questions-form {
  margin-top: 12px;
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
}

.plan-result {
  border-left: 4px solid var(--vp-c-brand);
}

.plan-card h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
}

.plan-card p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.monitor-log {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.log-item:last-child {
  margin-bottom: 0;
}

.log-text {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-top: 2px;
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.fail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-danger);
  font-size: 13px;
}

@media (max-width: 768px) {
  .mode-switch {
    justify-content: flex-start;
    margin-top: 12px;
  }
}
</style>