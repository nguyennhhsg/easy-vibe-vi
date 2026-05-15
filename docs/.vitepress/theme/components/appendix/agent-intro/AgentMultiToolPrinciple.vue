<template>
  <div class="multi-tool-principle">
    <div class="header">
      <div class="title">
        🔧 Nguyên lý gọi nhiều tool: Agent "nối chuỗi" tool để hoàn thành task thế nào
      </div>
      <div class="subtitle">
        Hiểu Chain-of-Thought và cơ chế orchestration tool của Agent
      </div>
    </div>

    <!-- 场景选择 -->
    <div class="scenario-tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['tab-btn', { active: currentScenario === s.id }]"
        @click="selectScenario(s.id)"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.name }}</span>
      </button>
    </div>

    <!-- Ý định của user -->
    <div class="intent-box">
      <div class="intent-label">
        👤 Ý định của bạn
      </div>
      <div class="intent-text">
        {{ currentData.intent }}
      </div>
    </div>

    <!-- Trực quan hóa luồng thực thi -->
    <div class="execution-flow">
      <div class="flow-title">
        🔄 Luồng thực thi gọi tool
      </div>

      <!-- Giai đoạn suy nghĩ -->
      <div
        class="phase thinking-phase"
        :class="{ active: currentPhase >= 0 }"
      >
        <div class="phase-header">
          <span class="phase-icon">🧠</span>
          <span class="phase-name">Suy nghĩ và lập kế hoạch</span>
          <span class="phase-status">{{ currentPhase > 0 ? '✅ Xong' : currentPhase === 0 ? '🔄 Đang xử lý' : '⏳ Chờ' }}</span>
        </div>
        <div
          v-if="currentPhase >= 0"
          class="phase-content"
        >
          <div class="thought-steps">
            <div
              v-for="(step, idx) in currentData.planningSteps"
              :key="idx"
              class="thought-step"
            >
              <span class="step-num">{{ idx + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Giai đoạn thực thi tool -->
      <div
        class="phase tools-phase"
        :class="{ active: currentPhase >= 1 }"
      >
        <div class="phase-header">
          <span class="phase-icon">🔧</span>
          <span class="phase-name">Thực thi tool</span>
          <span class="phase-status">{{ currentPhase > 1 ? '✅ Xong' : currentPhase === 1 ? '🔄 Đang xử lý' : '⏳ Chờ' }}</span>
        </div>
        <div
          v-if="currentPhase >= 1"
          class="phase-content"
        >
          <div class="tools-chain">
            <div 
              v-for="(tool, idx) in currentData.tools" 
              :key="idx"
              class="tool-node"
              :class="{ 
                completed: currentTool > idx, 
                executing: currentTool === idx,
                pending: currentTool < idx 
              }"
            >
              <div
                v-if="idx > 0"
                class="node-connector"
              >
                <div
                  class="connector-line"
                  :class="{ active: currentTool >= idx }"
                />
              </div>
              <div class="node-content">
                <div class="node-icon">
                  {{ tool.icon }}
                </div>
                <div class="node-name">
                  {{ tool.name }}
                </div>
                <div class="node-status">
                  <span
                    v-if="currentTool > idx"
                    class="status-done"
                  >✓</span>
                  <span
                    v-else-if="currentTool === idx"
                    class="status-running"
                  >
                    <span class="pulse" />
                  </span>
                  <span
                    v-else
                    class="status-wait"
                  >○</span>
                </div>
              </div>
              
              <!-- Chi tiết tool -->
              <div
                v-if="currentTool >= idx"
                class="tool-detail-popup"
              >
                <div class="detail-row">
                  <span class="detail-label">Input:</span>
                  <code class="detail-code">{{ tool.input }}</code>
                </div>
                <div
                  v-if="currentTool > idx"
                  class="detail-row"
                >
                  <span class="detail-label">Output:</span>
                  <span class="detail-output">{{ truncate(tool.output, 50) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sơ đồ luồng dữ liệu -->
          <div
            v-if="currentPhase === 1"
            class="data-flow-hint"
          >
            <div class="flow-arrow">
              ⬇️ Dữ liệu luân chuyển giữa các tool, output của bước trước trở thành input của bước sau
            </div>
          </div>
        </div>
      </div>

      <!-- Giai đoạn tổng hợp kết quả -->
      <div
        class="phase result-phase"
        :class="{ active: currentPhase >= 2 }"
      >
        <div class="phase-header">
          <span class="phase-icon">📝</span>
          <span class="phase-name">Tổng hợp kết quả</span>
          <span class="phase-status">{{ currentPhase > 2 ? '✅ Xong' : currentPhase === 2 ? '🔄 Đang xử lý' : '⏳ Chờ' }}</span>
        </div>
        <div
          v-if="currentPhase >= 2"
          class="phase-content"
        >
          <div class="integration-steps">
            <div
              class="integration-step"
              :class="{ done: integrationStep >= 0 }"
            >
              <span class="check">{{ integrationStep >= 0 ? '✓' : '○' }}</span>
              <span>Thu thập toàn bộ output của tool</span>
            </div>
            <div
              class="integration-step"
              :class="{ done: integrationStep >= 1 }"
            >
              <span class="check">{{ integrationStep >= 1 ? '✓' : '○' }}</span>
              <span>Dedup và verify</span>
            </div>
            <div
              class="integration-step"
              :class="{ done: integrationStep >= 2 }"
            >
              <span class="check">{{ integrationStep >= 2 ? '✓' : '○' }}</span>
              <span>Cấu trúc hóa nội dung</span>
            </div>
            <div
              class="integration-step"
              :class="{ done: integrationStep >= 3 }"
            >
              <span class="check">{{ integrationStep >= 3 ? '✓' : '○' }}</span>
              <span>Sinh câu trả lời tự nhiên</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Output cuối cùng -->
      <div
        class="phase output-phase"
        :class="{ active: currentPhase >= 3 }"
      >
        <div class="phase-header">
          <span class="phase-icon">💬</span>
          <span class="phase-name">Output cuối cùng</span>
          <span class="phase-status">{{ currentPhase >= 3 ? '✅ Xong' : '⏳ Chờ' }}</span>
        </div>
        <div
          v-if="currentPhase >= 3"
          class="phase-content"
        >
          <div class="final-output">
            <div class="output-bubble">
              {{ currentData.finalOutput }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nút điều khiển -->
    <div class="controls">
      <button
        v-if="!isRunning && currentPhase === -1"
        class="control-btn primary"
        @click="startDemo"
      >
        ▶ Bắt đầu demo
      </button>
      <button
        v-else-if="isRunning"
        class="control-btn"
        disabled
      >
        ⏳ Đang chạy...
      </button>
      <button
        v-else
        class="control-btn secondary"
        @click="reset"
      >
        🔄 Demo lại
      </button>
    </div>

    <!-- 原理说明 -->
    <div class="principle-explanation">
      <div class="explanation-title">
        📚 Nguyên lý cốt lõi
      </div>
      <div class="explanation-grid">
        <div class="explanation-card">
          <div class="card-icon">
            🧩
          </div>
          <div class="card-title">
            Phân rã task
          </div>
          <div class="card-desc">
            Agent chia task phức tạp thành các sub-task, mỗi sub-task ứng với một lần gọi tool
          </div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">
            🔗
          </div>
          <div class="card-title">
            Gọi chuỗi
          </div>
          <div class="card-desc">
            Các tool thực thi theo quan hệ phụ thuộc, output tool trước thành input tool sau
          </div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">
            🔄
          </div>
          <div class="card-title">
            Điều chỉnh động
          </div>
          <div class="card-desc">
            Dựa vào kết quả trung gian, Agent có thể quyết định động xem bước tiếp theo gọi tool nào
          </div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">
            🎯
          </div>
          <div class="card-title">
            Tổng hợp kết quả
          </div>
          <div class="card-desc">
            Gộp toàn bộ output của tool thành câu trả lời cuối mạch lạc và hữu ích
          </div>
        </div>
      </div>
    </div>

    <!-- 与 LLM 对比 -->
    <div class="comparison-section">
      <div class="comparison-title">
        ⚖️ Tại sao cần gọi nhiều tool?
      </div>
      <div class="comparison-table">
        <div class="comparison-row header">
          <div class="col scenario">
            Tình huống
          </div>
          <div class="col llm">
            LLM thường
          </div>
          <div class="col agent">
            Agent + nhiều tool
          </div>
        </div>
        <div
          v-for="(item, idx) in comparisons"
          :key="idx"
          class="comparison-row"
        >
          <div class="col scenario">
            {{ item.scenario }}
          </div>
          <div class="col llm">
            {{ item.llm }}
          </div>
          <div class="col agent">
            {{ item.agent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scenarios = [
  {
    id: 'travel',
    icon: '✈️',
    name: 'Lập kế hoạch du lịch',
    intent: 'Lập kế hoạch du lịch Tokyo 3 ngày 2 đêm, ngân sách 30 triệu',
    planningSteps: [
      'Phân tích yêu cầu: Tokyo, 3 ngày 2 đêm, ngân sách 30 triệu',
      'Xác định cần tra cứu: vé máy bay, khách sạn, điểm tham quan, lộ trình, ngân sách',
      'Lập thứ tự gọi tool: vé máy bay → khách sạn → điểm tham quan → lộ trình → tổng hợp ngân sách'
    ],
    tools: [
      { icon: '✈️', name: 'Tra vé máy bay', input: '{from:HCM, to:Tokyo, date:3.15}', output: 'Khứ hồi 9.500.000đ' },
      { icon: '🏨', name: 'Tra khách sạn', input: '{city:Tokyo, nights:2, budget:9tr}', output: 'KS Shinjuku 3.600.000đ/đêm' },
      { icon: '📍', name: 'Tra điểm tham quan', input: '{city:Tokyo, days:3}', output: 'Gợi ý 5 điểm' },
      { icon: '🗺️', name: 'Lập lộ trình', input: '{spots:[...], days:3}', output: 'Lộ trình 3 ngày' },
      { icon: '💰', name: 'Tính ngân sách', input: '{items:[...]}', output: 'Tổng 25.200.000đ' }
    ],
    finalOutput: '✈️ Lịch trình Tokyo 3 ngày 2 đêm đã sẵn sàng!\n• Vé máy bay: 9.500.000đ\n• Khách sạn: 7.200.000đ\n• Ăn uống & đi lại: 6.000.000đ\n• Vé tham quan & mua sắm: 3.000.000đ\n• Tổng: 25.700.000đ (dư 4.300.000đ)'
  },
  {
    id: 'research',
    icon: '📊',
    name: 'Nghiên cứu ngành',
    intent: 'Sinh báo cáo phân tích ngành xe điện 2024',
    planningSteps: [
      'Phân tích yêu cầu: báo cáo ngành cần dữ liệu thị trường, thông tin nhà sản xuất, xu hướng công nghệ, chính sách',
      'Xác định nguồn dữ liệu: cơ sở dữ liệu thị trường, thông tin công ty, tài liệu kỹ thuật, văn bản chính sách',
      'Lập gọi tool: dữ liệu thị trường → xếp hạng nhà sản xuất → xu hướng kỹ thuật → chính sách → trực quan hóa → sinh báo cáo'
    ],
    tools: [
      { icon: '📈', name: 'Dữ liệu thị trường', input: '{industry:NEV, year:2024}', output: 'Doanh số 17 triệu xe, +35%' },
      { icon: '🏢', name: 'Thông tin hãng', input: '{industry:NEV, top:10}', output: 'BYD 3.02M, Tesla 1.81M...' },
      { icon: '🔋', name: 'Xu hướng công nghệ', input: '{field:NEV, tech:[pin,tự lái]}', output: 'Pin thể rắn, L2+ tự lái phổ biến' },
      { icon: '📋', name: 'Tra cứu chính sách', input: '{region:toàn cầu, topic:NEV}', output: 'Trung Quốc miễn thuế đến 2027' },
      { icon: '📊', name: 'Trực quan hóa', input: '{type:biểu đồ tròn, data:thị phần}', output: 'Sinh 6 biểu đồ' },
      { icon: '📝', name: 'Sinh báo cáo', input: '{sections:[...]}', output: 'Báo cáo đầy đủ 12 trang' }
    ],
    finalOutput: '📊 Báo cáo phân tích ngành xe điện 2024 đã hoàn tất!\n• Doanh số toàn cầu 17 triệu xe (+35%)\n• BYD dẫn đầu (3.02 triệu xe)\n• Xu hướng: pin thể rắn, sạc nhanh 800V\n• Báo cáo: 12 trang, 6 biểu đồ'
  },
  {
    id: 'shopping',
    icon: '🛒',
    name: 'Mua sắm thông minh',
    intent: 'Mua laptop 20 triệu, lập trình + chơi game nhẹ',
    planningSteps: [
      'Phân tích yêu cầu: 20 triệu, lập trình, chơi game nhẹ',
      'Xác định tiêu chí đánh giá: model, cấu hình, giá, review, benchmark',
      'Lập gọi tool: search → tra cấu hình → so giá → xem review → so benchmark'
    ],
    tools: [
      { icon: '🔍', name: 'Tìm model', input: '{category:laptop, budget:20tr}', output: 'Tìm thấy 6 model ứng cử' },
      { icon: '⚙️', name: 'Tra cấu hình', input: '{products:[...]}', output: 'Thông số CPU/RAM/màn hình' },
      { icon: '💰', name: 'So giá', input: '{products:[...]}', output: 'Bảng so giá' },
      { icon: '⭐', name: 'Xem review', input: '{products:[...], source:e-commerce}', output: 'Tỷ lệ tốt 96% vs 94%' },
      { icon: '📊', name: 'So benchmark', input: '{products:[...], tests:[CPU,GPU]}', output: 'R7>i5, pin 8h vs 6.5h' }
    ],
    finalOutput: '💻 Kết quả gợi ý laptop\n🥇 Lựa chọn ưu tiên: Lenovo Slim Pro 16 (19.900.000đ)\n• R7-7840HS/16G/1TB/2.5K\n• Hiệu năng mạnh, màn hình đẹp, ổ lớn\n\n🥈 Phương án dự phòng: ThinkBook 14+ (21.000.000đ)\n• Gia công tốt, pin trâu, đầy đủ cổng'
  }
]

const comparisons = [
  { scenario: 'Tra thời tiết + gợi ý mặc đồ', llm: 'Chỉ đoán, không lấy được dữ liệu thời gian thực', agent: 'Gọi API thời tiết lấy dữ liệu realtime, rồi gợi ý mặc đồ' },
  { scenario: 'Phân tích chứng khoán', llm: 'Không lấy được giá, chỉ nói chung chung', agent: 'Giá + tin tức + phân tích kỹ thuật, 3 tool nối tiếp để phân tích sâu' },
  { scenario: 'Lập kế hoạch du lịch', llm: 'Chỉ gợi ý chung, không tra được giá realtime', agent: 'Vé máy bay + khách sạn + điểm tham quan + lộ trình + ngân sách, 5 tool cho kế hoạch trọn vẹn' },
  { scenario: 'Phân tích dữ liệu', llm: 'Không truy cập dữ liệu, chỉ nói phương pháp', agent: 'Query + group + tính toán + trực quan hóa, 6 tool cho phân tích trọn vẹn' }
]

const currentScenario = ref('travel')
const currentPhase = ref(-1)
const currentTool = ref(-1)
const integrationStep = ref(-1)
const isRunning = ref(false)

const currentData = computed(() => scenarios.find(s => s.id === currentScenario.value))

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const startDemo = async () => {
  isRunning.value = true
  currentPhase.value = 0
  currentTool.value = -1
  integrationStep.value = -1

  // Giai đoạn suy nghĩ
  await wait(1500)

  // Giai đoạn thực thi tool
  currentPhase.value = 1
  const tools = currentData.value.tools

  for (let i = 0; i < tools.length; i++) {
    currentTool.value = i
    await wait(1200)
  }
  currentTool.value = tools.length

  await wait(500)

  // Giai đoạn tổng hợp
  currentPhase.value = 2
  for (let i = 0; i < 4; i++) {
    integrationStep.value = i
    await wait(600)
  }

  // Output cuối
  await wait(300)
  currentPhase.value = 3

  isRunning.value = false
}

const reset = () => {
  currentPhase.value = -1
  currentTool.value = -1
  integrationStep.value = -1
  isRunning.value = false
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
const truncate = (str, len) => str.length > len ? str.slice(0, len) + '...' : str
</script>

<style scoped>
.multi-tool-principle {
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

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 场景标签 */
.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

/* 用户意图 */
.intent-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
}

.intent-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.intent-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

/* 执行流程 */
.execution-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

/* 阶段 */
.phase {
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  opacity: 0.5;
  transition: all 0.3s;
}

.phase.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.phase-icon {
  font-size: 16px;
}

.phase-name {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
}

.phase-status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.phase-content {
  padding: 14px;
}

/* 思考步骤 */
.thought-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thought-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background: #fef3c7;
  border-radius: 6px;
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  font-size: 12px;
  color: #92400e;
  line-height: 1.5;
}

/* 工具链 */
.tools-chain {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tool-node {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid transparent;
  transition: all 0.3s;
  position: relative;
}

.tool-node.completed {
  border-color: #86efac;
  background: #f0fdf4;
}

.tool-node.executing {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tool-node.pending {
  opacity: 0.5;
}

.node-connector {
  position: absolute;
  left: 24px;
  top: -14px;
  width: 2px;
  height: 14px;
}

.connector-line {
  width: 100%;
  height: 100%;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.connector-line.active {
  background: var(--vp-c-brand);
}

.node-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.node-icon {
  font-size: 20px;
}

.node-name {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
}

.node-status {
  font-size: 14px;
}

.status-done {
  color: #16a34a;
}

.status-running .pulse {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.status-wait {
  color: var(--vp-c-text-3);
}

/* 工具详情 */
.tool-detail-popup {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 11px;
}

.detail-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.detail-code {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.detail-output {
  color: #16a34a;
}

.data-flow-hint {
  text-align: center;
  margin-top: 12px;
  padding: 10px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-brand-dark);
}

/* 整合步骤 */
.integration-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.integration-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.3s;
}

.integration-step.done {
  background: #dcfce7;
  color: #166534;
}

.check {
  font-weight: 600;
}

/* 最终输出 */
.final-output {
  padding: 12px;
  background: #dcfce7;
  border-radius: 6px;
}

.output-bubble {
  font-size: 13px;
  color: #166534;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.control-btn {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.control-btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.control-btn.primary:hover {
  background: var(--vp-c-brand-dark);
}

.control-btn.secondary {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.control-btn.secondary:hover {
  background: var(--vp-c-bg-alt);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 原理解释 */
.principle-explanation {
  margin-bottom: 20px;
}

.explanation-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .explanation-grid {
    grid-template-columns: 1fr;
  }
}

.explanation-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 14px;
  text-align: center;
}

.card-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 对比表格 */
.comparison-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 14px;
}

.comparison-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.comparison-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.comparison-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  gap: 12px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  font-size: 12px;
  align-items: center;
}

.comparison-row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.col.scenario {
  font-weight: 500;
}

.col.llm {
  color: #6b7280;
}

.col.agent {
  color: var(--vp-c-brand-dark);
}
</style>
