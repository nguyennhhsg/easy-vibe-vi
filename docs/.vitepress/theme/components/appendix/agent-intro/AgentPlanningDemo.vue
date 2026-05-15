<template>
  <div class="planning-demo">
    <div class="header">
      <div class="title">
        📋 Khả năng lập kế hoạch của Agent
      </div>
    </div>

    <!-- 任务选择 -->
    <div class="task-tabs">
      <button
        v-for="task in tasks"
        :key="task.id"
        :class="['task-btn', { active: currentTask === task.id }]"
        @click="selectTask(task.id)"
      >
        <span>{{ task.icon }}</span>
        <span>{{ task.name }}</span>
        <span
          class="complexity"
          :class="task.complexity"
        >{{ task.complexityLabel }}</span>
      </button>
    </div>

    <!-- 目标 -->
    <div class="goal-bar">
      <span class="label">🎯</span>
      <span class="text">{{ currentTaskData.goal }}</span>
    </div>

    <!-- 执行区域 -->
    <div class="execution-area">
      <!-- 步骤进度条 -->
      <div class="steps-progress">
        <div
          v-for="(step, index) in currentTaskData.steps"
          :key="index"
          class="step-node"
          :class="{ completed: stepStatus[index] === 'completed', running: stepStatus[index] === 'running' }"
        >
          <div class="node-circle">
            {{ index + 1 }}
          </div>
          <div class="node-name">
            {{ step.name }}
          </div>
          <div
            v-if="index < currentTaskData.steps.length - 1"
            class="node-line"
          />
        </div>
      </div>

      <!-- 日志和思考 -->
      <div class="info-row">
        <div class="log-box">
          <div class="box-header">
            <span>📝 Log thực thi</span>
            <span
              v-if="executionStatus === 'running'"
              class="status running"
            >Đang chạy</span>
            <span
              v-else-if="executionStatus === 'completed'"
              class="status completed"
            >Đã xong</span>
          </div>
          <div class="log-content">
            <div
              v-if="logs.length === 0"
              class="empty"
            >
              Click "Bắt đầu chạy" để xem quá trình
            </div>
            <div
              v-for="(log, i) in logs.slice(-4)"
              :key="i"
              class="log-line"
              :class="log.type"
            >
              <span class="time">{{ log.time }}</span>
              <span class="icon">{{ log.icon }}</span>
              <span
                class="msg"
                v-html="log.message"
              />
            </div>
          </div>
        </div>

        <div
          v-if="currentThought"
          class="thought-box"
        >
          <div class="box-header">
            🧠 Đang suy nghĩ
          </div>
          <div class="thought-content">
            {{ currentThought }}
          </div>
        </div>
      </div>
    </div>

    <!-- 控制栏 -->
    <div class="control-bar">
      <button
        v-if="executionStatus === 'idle'"
        class="ctrl-btn primary"
        @click="startExecution"
      >
        ▶ Bắt đầu chạy
      </button>
      <button
        v-else-if="executionStatus === 'running'"
        class="ctrl-btn"
        disabled
      >
        ⏳ Đang chạy...
      </button>
      <button
        v-else
        class="ctrl-btn"
        @click="reset"
      >
        🔄 Reset
      </button>

      <div
        v-if="executionStatus === 'completed'"
        class="stats"
      >
        <span class="stat">{{ currentTaskData.steps.length }} bước</span>
        <span class="stat">{{ executionTime }}s</span>
        <span class="stat">{{ toolCalls }} lượt gọi</span>
      </div>

      <div class="step-dots">
        <span
          v-for="n in currentTaskData.steps.length"
          :key="n"
          :class="['dot', { active: stepStatus[n-1] === 'completed' }]"
        />
      </div>
    </div>

    <!-- Tip -->
    <div class="tip-bar">
      <span>💡</span>
      <span>Cốt lõi của planning: chia task phức tạp thành <strong>thao tác nguyên tử</strong>, dựa vào kết quả bước trước để <strong>điều chỉnh động</strong> kế hoạch tiếp theo</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const tasks = [
  {
    id: 'simple',
    icon: '🌤️',
    name: 'Tra thời tiết',
    complexity: 'easy',
    complexityLabel: 'Đơn giản',
    goal: 'Tra thời tiết Hà Nội hôm nay',
    steps: [
      { name: 'Gọi API thời tiết', tool: 'weather_api' },
      { name: 'Format kết quả', tool: 'formatter' }
    ],
    logs: [
      { type: 'think', icon: '🧠', message: 'Cần tra thời tiết Hà Nội' },
      { type: 'action', icon: '🔧', message: 'weather_api(city="Hà Nội")' },
      { type: 'result', icon: '📥', message: 'Nắng, 25°C, chất lượng không khí tốt' },
      { type: 'complete', icon: '✅', message: 'Hà Nội hôm nay nắng đẹp' }
    ]
  },
  {
    id: 'medium',
    icon: '📊',
    name: 'Phân tích dữ liệu',
    complexity: 'medium',
    complexityLabel: 'Trung bình',
    goal: 'Phân tích CSV doanh thu, tìm tháng có doanh thu cao nhất',
    steps: [
      { name: 'Đọc CSV', tool: 'file_reader' },
      { name: 'Parse dữ liệu', tool: 'data_parser' },
      { name: 'Aggregate', tool: 'calculator' },
      { name: 'Sinh báo cáo', tool: 'report_generator' }
    ],
    logs: [
      { type: 'think', icon: '🧠', message: 'Đọc file dữ liệu doanh thu' },
      { type: 'action', icon: '🔧', message: 'file_reader(path="sales.csv")' },
      { type: 'result', icon: '📥', message: 'Đọc được 1200 dòng' },
      { type: 'think', icon: '🧠', message: 'Parse cấu trúc dữ liệu' },
      { type: 'action', icon: '🔧', message: 'data_parser(data)' },
      { type: 'result', icon: '📥', message: 'Parse xong' },
      { type: 'think', icon: '🧠', message: 'Aggregate doanh thu theo tháng' },
      { type: 'action', icon: '🔧', message: 'calculator.aggregate(by="month")' },
      { type: 'result', icon: '📥', message: 'Tháng 11 cao nhất 320K USD' },
      { type: 'complete', icon: '✅', message: 'Phân tích xong' }
    ]
  },
  {
    id: 'complex',
    icon: '🔬',
    name: 'Báo cáo nghiên cứu',
    complexity: 'hard',
    complexityLabel: 'Phức tạp',
    goal: 'Nghiên cứu tiến triển AI Agent, viết báo cáo hoàn chỉnh',
    steps: [
      { name: 'Search tin tức', tool: 'web_search' },
      { name: 'Đọc bài', tool: 'web_reader' },
      { name: 'Trích thông tin', tool: 'extractor' },
      { name: 'Search nhà cung cấp', tool: 'web_search' },
      { name: 'Sinh outline', tool: 'planner' },
      { name: 'Viết báo cáo', tool: 'writer' }
    ],
    logs: [
      { type: 'think', icon: '🧠', message: 'Tìm tin tức AI Agent mới nhất' },
      { type: 'action', icon: '🔧', message: 'web_search("AI Agent 2024")' },
      { type: 'result', icon: '📥', message: 'Tìm thấy 15 bài viết' },
      { type: 'action', icon: '🔧', message: 'web_reader(urls=[...])' },
      { type: 'result', icon: '📥', message: 'Đọc nội dung thành công' },
      { type: 'action', icon: '🔧', message: 'extractor(fields=[...])' },
      { type: 'result', icon: '📥', message: 'Trích 45 data point' },
      { type: 'action', icon: '🔧', message: 'web_search("AI Agent companies")' },
      { type: 'result', icon: '📥', message: 'OpenAI, Anthropic, Microsoft...' },
      { type: 'action', icon: '🔧', message: 'planner.generate_outline()' },
      { type: 'result', icon: '📥', message: 'Outline đã sinh xong' },
      { type: 'action', icon: '🔧', message: 'writer.generate_content()' },
      { type: 'complete', icon: '✅', message: 'Báo cáo đã sinh, 2500 từ' }
    ]
  }
]

const currentTask = ref('simple')
const executionStatus = ref('idle')
const stepStatus = ref([])
const logs = ref([])
const currentThought = ref('')
const executionTime = ref(0)
const toolCalls = ref(0)

const currentTaskData = computed(() => tasks.find(t => t.id === currentTask.value))

const selectTask = (id) => {
  currentTask.value = id
  reset()
}

const reset = () => {
  executionStatus.value = 'idle'
  stepStatus.value = new Array(currentTaskData.value.steps.length).fill('pending')
  logs.value = []
  currentThought.value = ''
  executionTime.value = 0
  toolCalls.value = 0
}

const startExecution = async () => {
  executionStatus.value = 'running'
  stepStatus.value = new Array(currentTaskData.value.steps.length).fill('pending')
  logs.value = []
  toolCalls.value = 0

  const startTime = Date.now()
  const taskLogs = currentTaskData.value.logs

  for (let i = 0; i < taskLogs.length; i++) {
    const log = taskLogs[i]

    if (log.type === 'think') currentThought.value = log.message
    if (log.type === 'action') {
      const stepIndex = Math.min(toolCalls.value, currentTaskData.value.steps.length - 1)
      stepStatus.value = stepStatus.value.map((s, idx) => {
        if (idx < stepIndex) return 'completed'
        if (idx === stepIndex) return 'running'
        return 'pending'
      })
      toolCalls.value++
    }
    if (log.type === 'complete') currentThought.value = ''

    logs.value.push({ ...log, time: new Date().toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) })
    await wait(700)
  }

  stepStatus.value = stepStatus.value.map(() => 'completed')
  executionTime.value = ((Date.now() - startTime) / 1000).toFixed(1)
  executionStatus.value = 'completed'
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
reset()
</script>

<style scoped>
.planning-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 任务标签 */
.task-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.task-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.task-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.complexity {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
}

.complexity.easy { background: #dcfce7; color: #166534; }
.complexity.medium { background: #fef3c7; color: #92400e; }
.complexity.hard { background: #fee2e2; color: #991b1b; }

/* 目标 */
.goal-bar {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
}

.goal-bar .label { margin-right: 8px; }
.goal-bar .text { font-weight: 600; }

/* 步骤进度 */
.steps-progress {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 100px;
}

.node-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  transition: all 0.3s;
}

.step-node.running .node-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  animation: pulse 1.5s infinite;
}

.step-node.completed .node-circle {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.node-name {
  font-size: 11px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.step-node.completed .node-name,
.step-node.running .node-name {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.node-line {
  position: absolute;
  top: 16px;
  right: -16px;
  width: 24px;
  height: 2px;
  background: var(--vp-c-divider);
}

.step-node.completed + .step-node .node-line {
  background: #22c55e;
}

/* 信息行 */
.info-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 600px) {
  .info-row { grid-template-columns: 1fr; }
}

.log-box, .thought-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.status.running { background: #fef3c7; color: #92400e; }
.status.completed { background: #dcfce7; color: #166534; }

.log-content {
  padding: 10px 12px;
  min-height: 100px;
  max-height: 140px;
  
}

.empty {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 30px 0;
  font-size: 12px;
}

.log-line {
  display: flex;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 6px;
  align-items: flex-start;
}

.log-line .time {
  color: var(--vp-c-text-3);
  font-size: 10px;
  min-width: 55px;
}

.log-line .icon {
  font-size: 11px;
}

.log-line .msg {
  color: var(--vp-c-text-1);
  flex: 1;
}

.log-line.think .msg { color: #3b82f6; }
.log-line.action .msg { color: #f59e0b; }
.log-line.result .msg { color: #10b981; }
.log-line.complete .msg { color: #8b5cf6; font-weight: 600; }

.thought-content {
  padding: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-style: italic;
  line-height: 1.5;
}

/* 控制栏 */
.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.ctrl-btn {
  padding: 8px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.stats {
  display: flex;
  gap: 12px;
}

.stat {
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.step-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}

.dot.active { background: #22c55e; }

/* 提示 */
.tip-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
</style>
