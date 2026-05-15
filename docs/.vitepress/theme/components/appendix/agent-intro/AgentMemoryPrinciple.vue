<template>
  <div class="memory-principle">
    <div class="header">
      <div class="title">
        🧠 Nguyên lý hệ thống bộ nhớ Agent: làm sao để AI "nhớ" bạn
      </div>
      <div class="subtitle">
        Hiểu cách bộ nhớ ngắn hạn, working memory, và bộ nhớ dài hạn phối hợp với nhau
      </div>
    </div>

    <!-- 记忆类型概览 -->
    <div class="memory-overview">
      <div class="overview-title">
        📊 Kiến trúc bộ nhớ ba lớp
      </div>
      <div class="memory-cards">
        <div
          class="memory-card short-term"
          :class="{ active: activeTab === 'short' }"
          @click="activeTab = 'short'"
        >
          <div class="card-icon">
            ⏱️
          </div>
          <div class="card-name">
            Bộ nhớ ngắn hạn
          </div>
          <div class="card-desc">
            Context hội thoại hiện tại
          </div>
          <div class="card-lifetime">
            ⚡ Cấp session
          </div>
        </div>
        <div
          class="memory-card working"
          :class="{ active: activeTab === 'working' }"
          @click="activeTab = 'working'"
        >
          <div class="card-icon">
            📝
          </div>
          <div class="card-name">
            Working memory
          </div>
          <div class="card-desc">
            Biến liên quan đến task
          </div>
          <div class="card-lifetime">
            🔄 Cấp task
          </div>
        </div>
        <div
          class="memory-card long-term"
          :class="{ active: activeTab === 'long' }"
          @click="activeTab = 'long'"
        >
          <div class="card-icon">
            💾
          </div>
          <div class="card-name">
            Bộ nhớ dài hạn
          </div>
          <div class="card-desc">
            Sở thích người dùng & kiến thức
          </div>
          <div class="card-lifetime">
            ♾️ Persistent
          </div>
        </div>
      </div>
    </div>

    <!-- 交互演示区 -->
    <div class="demo-section">
      <div class="demo-title">
        🎮 Demo tương tác: quan sát bộ nhớ hoạt động thế nào
      </div>

      <!-- Khu vực hội thoại -->
      <div class="chat-area">
        <div class="chat-header">
          <span>💬 Cửa sổ hội thoại</span>
          <button
            class="reset-btn"
            @click="resetDemo"
          >
            🔄 Reset
          </button>
        </div>
        <div
          ref="messageContainer"
          class="messages"
        >
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="message"
            :class="msg.role"
          >
            <div class="avatar">
              {{ msg.role === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="bubble">
              <div class="msg-text">
                {{ msg.text }}
              </div>
              <div
                v-if="msg.memoryOps && msg.memoryOps.length"
                class="memory-ops"
              >
                <div
                  v-for="(op, i) in msg.memoryOps"
                  :key="i"
                  class="memory-op"
                  :class="op.type"
                >
                  <span class="op-icon">{{ op.icon }}</span>
                  <span class="op-text">{{ op.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 快捷输入 -->
        <div class="quick-inputs">
          <button 
            v-for="btn in quickButtons" 
            :key="btn.id"
            class="quick-btn"
            :disabled="isProcessing || btn.used"
            @click="sendMessage(btn)"
          >
            {{ btn.text }}
          </button>
        </div>
      </div>

      <!-- 记忆状态面板 -->
      <div class="memory-panels">
        <div class="panel-title">
          📂 Theo dõi trạng thái bộ nhớ realtime
        </div>

        <!-- Bộ nhớ ngắn hạn -->
        <div
          class="memory-panel"
          :class="{ highlight: activeTab === 'short' }"
          @click="activeTab = 'short'"
        >
          <div class="panel-header">
            <span class="panel-icon">⏱️</span>
            <span class="panel-name">Bộ nhớ ngắn hạn</span>
            <span class="panel-count">{{ shortTermMemory.length }} mục</span>
          </div>
          <div class="panel-content">
            <div
              v-if="shortTermMemory.length === 0"
              class="empty"
            >
              Chưa có lịch sử hội thoại
            </div>
            <div
              v-for="(item, idx) in shortTermMemory.slice(-5)"
              :key="idx"
              class="memory-item"
            >
              <span
                class="item-role"
                :class="item.role"
              >{{ item.role === 'user' ? 'U' : 'A' }}</span>
              <span class="item-text">{{ truncate(item.content, 25) }}</span>
            </div>
          </div>
          <div class="panel-footer">
            💡 Lưu các lượt hội thoại gần nhất, vượt context window sẽ bị quên
          </div>
        </div>

        <!-- Working memory -->
        <div
          class="memory-panel"
          :class="{ highlight: activeTab === 'working' }"
          @click="activeTab = 'working'"
        >
          <div class="panel-header">
            <span class="panel-icon">📝</span>
            <span class="panel-name">Working memory</span>
            <span class="panel-count">{{ Object.keys(workingMemory).length }} biến</span>
          </div>
          <div class="panel-content">
            <div
              v-if="Object.keys(workingMemory).length === 0"
              class="empty"
            >
              Chưa có biến task
            </div>
            <div
              v-for="(value, key) in workingMemory"
              :key="key"
              class="memory-item working-item"
            >
              <span class="item-key">{{ key }}:</span>
              <span class="item-value">{{ value }}</span>
            </div>
          </div>
          <div class="panel-footer">
            💡 Lưu tạm các biến liên quan đến task, xóa khi task kết thúc
          </div>
        </div>

        <!-- Bộ nhớ dài hạn -->
        <div
          class="memory-panel"
          :class="{ highlight: activeTab === 'long' }"
          @click="activeTab = 'long'"
        >
          <div class="panel-header">
            <span class="panel-icon">💾</span>
            <span class="panel-name">Bộ nhớ dài hạn</span>
            <span class="panel-count">{{ longTermMemory.length }} mục kiến thức</span>
          </div>
          <div class="panel-content">
            <div
              v-if="longTermMemory.length === 0"
              class="empty"
            >
              Chưa có kiến thức persistent
            </div>
            <div
              v-for="(item, idx) in longTermMemory"
              :key="idx"
              class="memory-item long-item"
            >
              <span
                class="item-type"
                :class="item.type"
              >{{ item.type }}</span>
              <span class="item-content">{{ item.key }} = {{ truncate(item.value, 20) }}</span>
            </div>
          </div>
          <div class="panel-footer">
            💡 Lưu xuyên session, cần ghi tường minh
          </div>
        </div>
      </div>
    </div>

    <!-- 记忆流转示意 -->
    <div class="memory-flow">
      <div class="flow-title">
        🔄 Cơ chế luân chuyển bộ nhớ
      </div>
      <div class="flow-diagram">
        <div class="flow-step">
          <div class="step-box user-input">
            <div class="step-icon">
              👤
            </div>
            <div class="step-text">
              Input của bạn
            </div>
          </div>
          <div class="step-arrow">
            ➡️
          </div>
        </div>

        <div class="flow-step">
          <div class="step-box">
            <div class="step-icon">
              ⏱️
            </div>
            <div class="step-text">
              Bộ nhớ ngắn hạn
            </div>
            <div class="step-desc">
              Tự ghi lại hội thoại
            </div>
          </div>
          <div class="step-arrow">
            ➡️
          </div>
        </div>

        <div class="flow-step">
          <div class="step-box">
            <div class="step-icon">
              🧠
            </div>
            <div class="step-text">
              LLM xử lý
            </div>
            <div class="step-desc">
              Hiểu + quyết định
            </div>
          </div>
          <div class="step-arrow">
            ➡️
          </div>
        </div>

        <div class="flow-branch">
          <div class="branch-option">
            <div class="branch-arrow">
              ⬇️
            </div>
            <div class="step-box small">
              <div class="step-icon">
                📝
              </div>
              <div class="step-text">
                Working memory
              </div>
              <div class="step-desc">
                Biến tạm thời
              </div>
            </div>
          </div>
          <div class="branch-option">
            <div class="branch-arrow">
              ⬇️
            </div>
            <div class="step-box small">
              <div class="step-icon">
                💾
              </div>
              <div class="step-text">
                Bộ nhớ dài hạn
              </div>
              <div class="step-desc">
                Lưu persistent
              </div>
            </div>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-arrow">
            ➡️
          </div>
          <div class="step-box agent-output">
            <div class="step-icon">
              🤖
            </div>
            <div class="step-text">
              Agent trả lời
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心机制解释 -->
    <div class="mechanism-section">
      <div class="mechanism-title">
        ⚙️ Chi tiết cơ chế cốt lõi
      </div>
      <div class="mechanism-grid">
        <div
          class="mechanism-card"
          :class="{ active: activeTab === 'short' }"
          @click="activeTab = 'short'"
        >
          <div class="card-header">
            <span class="card-icon">⏱️</span>
            <span class="card-title">Bộ nhớ ngắn hạn (Short-term)</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">Nội dung lưu:</span>
              <span class="item-value">Toàn bộ lịch sử hội thoại hiện tại</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Vòng đời:</span>
              <span class="item-value">Session hiện tại, đóng là mất</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Giới hạn dung lượng:</span>
              <span class="item-value">Giới hạn bởi context window của LLM (thường 4K-128K tokens)</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Cách cập nhật:</span>
              <span class="item-value">Tự động append mỗi lượt hội thoại</span>
            </div>
            <div class="code-example">
              <code>messages = [{role: "user", content: "..."}, {role: "assistant", content: "..."}]</code>
            </div>
          </div>
        </div>

        <div
          class="mechanism-card"
          :class="{ active: activeTab === 'working' }"
          @click="activeTab = 'working'"
        >
          <div class="card-header">
            <span class="card-icon">📝</span>
            <span class="card-title">Working memory</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">Nội dung lưu:</span>
              <span class="item-value">Biến và state tạm thời liên quan đến task</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Vòng đời:</span>
              <span class="item-value">Trong suốt một task/session</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Dùng điển hình:</span>
              <span class="item-value">Bước hiện tại, kết quả trung gian, sở thích người dùng</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Cách cập nhật:</span>
              <span class="item-value">Agent chủ động đọc/ghi</span>
            </div>
            <div class="code-example">
              <code>working_memory = {"step": 2, "user_name": "An", "topic": "Python"}</code>
            </div>
          </div>
        </div>

        <div
          class="mechanism-card"
          :class="{ active: activeTab === 'long' }"
          @click="activeTab = 'long'"
        >
          <div class="card-header">
            <span class="card-icon">💾</span>
            <span class="card-title">Bộ nhớ dài hạn (Long-term)</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">Nội dung lưu:</span>
              <span class="item-value">Chân dung người dùng, cài đặt sở thích, kiến thức lịch sử</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Vòng đời:</span>
              <span class="item-value">Lưu vĩnh viễn, dùng xuyên session</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Cách lưu:</span>
              <span class="item-value">Vector database, knowledge graph, key-value store</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">Cách cập nhật:</span>
              <span class="item-value">Ghi tường minh, định kỳ tổng kết chắt lọc</span>
            </div>
            <div class="code-example">
              <code>long_term_memory = [{"type": "preference", "key": "language", "value": "Python"}]</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <div class="practices-title">
        💡 Best practice cho hệ thống bộ nhớ
      </div>
      <div class="practices-list">
        <div class="practice-item">
          <div class="practice-icon">
            1️⃣
          </div>
          <div class="practice-content">
            <div class="practice-title">
              Tối ưu bộ nhớ ngắn hạn
            </div>
            <div class="practice-desc">
              Định kỳ dọn lịch sử không liên quan, giữ lại context then chốt; hội thoại dài dùng kỹ thuật tóm tắt để nén lại
            </div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">
            2️⃣
          </div>
          <div class="practice-content">
            <div class="practice-title">
              Quản lý working memory
            </div>
            <div class="practice-desc">
              Init khi task bắt đầu, dọn khi task kết thúc; tránh lưu quá nhiều kết quả trung gian
            </div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">
            3️⃣
          </div>
          <div class="practice-content">
            <div class="practice-title">
              Xây dựng bộ nhớ dài hạn
            </div>
            <div class="practice-desc">
              Định kỳ tổng kết hội thoại để chắt lọc kiến thức; dùng vector search để tìm theo ngữ nghĩa; phân biệt fact và preference
            </div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">
            4️⃣
          </div>
          <div class="practice-content">
            <div class="practice-title">
              Tính nhất quán của bộ nhớ
            </div>
            <div class="practice-desc">
              Verify trước khi cập nhật bộ nhớ dài hạn; xử lý thông tin mâu thuẫn; cho phép người dùng sửa bộ nhớ tường minh
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const activeTab = ref('short')
const isProcessing = ref(false)
const messageContainer = ref(null)

// Lưu trữ bộ nhớ
const messages = ref([])
const shortTermMemory = ref([])
const workingMemory = reactive({})
const longTermMemory = ref([])

// Nút truy cập nhanh
const quickButtons = ref([
  { id: 1, text: 'Tôi tên là An', used: false, action: 'setName' },
  { id: 2, text: 'Tôi thích Python', used: false, action: 'setPreference' },
  { id: 3, text: 'Gợi ý sách lập trình', used: false, action: 'recommend' },
  { id: 4, text: 'Tôi tên gì?', used: false, action: 'askName' },
  { id: 5, text: 'Tôi thích ngôn ngữ nào?', used: false, action: 'askPreference' }
])

const sendMessage = async (btn) => {
  if (isProcessing.value) return
  isProcessing.value = true
  btn.used = true

  // Tin nhắn của user
  messages.value.push({
    role: 'user',
    text: btn.text,
    memoryOps: []
  })

  // Thêm vào bộ nhớ ngắn hạn
  shortTermMemory.value.push({
    role: 'user',
    content: btn.text
  })

  await scrollToBottom()
  await wait(600)

  // Agent xử lý
  let response = {}

  switch (btn.action) {
    case 'setName':
      workingMemory.user_name = 'An'
      response = {
        text: 'Được rồi, tôi đã nhớ bạn tên là An.',
        memoryOps: [
          { icon: '📝', text: 'Working memory: user_name = An', type: 'working' },
          { icon: '💾', text: 'Bộ nhớ dài hạn: tên = An', type: 'long-term' }
        ]
      }
      // Mô phỏng ghi vào bộ nhớ dài hạn (dedup: nếu đã có thì cập nhật, không thì thêm mới)
      await wait(300)
      const existingNameIndex = longTermMemory.value.findIndex(m => m.key === 'Tên')
      if (existingNameIndex >= 0) {
        longTermMemory.value[existingNameIndex].value = 'An'
      } else {
        longTermMemory.value.push({ type: 'identity', key: 'Tên', value: 'An' })
      }
      break

    case 'setPreference':
      workingMemory.favorite_language = 'Python'
      response = {
        text: 'Đã nhận! Tôi đã nhớ bạn thích Python.',
        memoryOps: [
          { icon: '📝', text: 'Working memory: favorite_language = Python', type: 'working' },
          { icon: '💾', text: 'Bộ nhớ dài hạn: sở thích = Python', type: 'long-term' }
        ]
      }
      await wait(300)
      // Dedup: nếu đã có thì cập nhật, không thì thêm mới
      const existingPrefIndex = longTermMemory.value.findIndex(m => m.key === 'Ngôn ngữ lập trình')
      if (existingPrefIndex >= 0) {
        longTermMemory.value[existingPrefIndex].value = 'Python'
      } else {
        longTermMemory.value.push({ type: 'preference', key: 'Ngôn ngữ lập trình', value: 'Python' })
      }
      break

    case 'recommend':
      const lang = workingMemory.favorite_language || longTermMemory.value.find(m => m.key === 'Ngôn ngữ lập trình')?.value
      response = {
        text: lang
          ? `Dựa vào việc bạn thích ${lang}, mình gợi ý cuốn "${lang} Crash Course" và "Fluent ${lang}".`
          : 'Mình gợi ý "Code Complete" và "The Pragmatic Programmer", phù hợp với mọi ngôn ngữ.',
        memoryOps: [
          { icon: '🔍', text: `Truy xuất bộ nhớ dài hạn: sở thích = ${lang || 'không có'}`, type: 'retrieve' }
        ]
      }
      break

    case 'askName':
      const name = workingMemory.user_name || longTermMemory.value.find(m => m.key === 'Tên')?.value
      response = {
        text: name
          ? `Bạn tên là ${name}.`
          : 'Mình chưa biết tên bạn, hãy cho mình biết nhé.',
        memoryOps: name
          ? [{ icon: '🔍', text: 'Truy xuất bộ nhớ: tên', type: 'retrieve' }]
          : [{ icon: '❓', text: 'Thiếu bộ nhớ: không tìm thấy tên', type: 'missing' }]
      }
      break

    case 'askPreference':
      const pref = workingMemory.favorite_language || longTermMemory.value.find(m => m.key === 'Ngôn ngữ lập trình')?.value
      response = {
        text: pref
          ? `Bạn thích ${pref}.`
          : 'Mình chưa biết bạn thích ngôn ngữ lập trình nào.',
        memoryOps: pref
          ? [{ icon: '🔍', text: 'Truy xuất bộ nhớ: sở thích', type: 'retrieve' }]
          : [{ icon: '❓', text: 'Thiếu bộ nhớ: không tìm thấy sở thích', type: 'missing' }]
      }
      break
  }

  // Agent 回复
  messages.value.push({
    role: 'assistant',
    text: response.text,
    memoryOps: response.memoryOps
  })
  
  shortTermMemory.value.push({
    role: 'assistant',
    content: response.text
  })
  
  await scrollToBottom()
  isProcessing.value = false
}

const resetDemo = () => {
  messages.value = []
  shortTermMemory.value = []
  Object.keys(workingMemory).forEach(key => delete workingMemory[key])
  longTermMemory.value = []
  quickButtons.value.forEach(btn => btn.used = false)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
const truncate = (str, len) => str?.length > len ? str.slice(0, len) + '...' : str
</script>

<style scoped>
.memory-principle {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
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

/* 记忆概览 */
.memory-overview {
  margin-bottom: 20px;
}

.overview-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.memory-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .memory-cards {
    grid-template-columns: 1fr;
  }
}

.memory-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.memory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.memory-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.memory-card.short-term.active { border-color: #3b82f6; background: #dbeafe; }
.memory-card.working.active { border-color: #f59e0b; background: #fef3c7; }
.memory-card.long-term.active { border-color: #10b981; background: #d1fae5; }

.card-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.card-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.card-lifetime {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  display: inline-block;
}

/* 演示区 */
.demo-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.demo-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

/* 对话区 */
.chat-area {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
}

.reset-btn {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
}

.messages {
  max-height: 200px;
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.bubble {
  max-width: 75%;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.message.user .bubble {
  background: var(--vp-c-brand);
  color: white;
  border: none;
}

.msg-text {
  margin-bottom: 6px;
}

.memory-ops {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.memory-op {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.memory-op.working { background: #fef3c7; color: #92400e; }
.memory-op.long-term { background: #d1fae5; color: #065f46; }
.memory-op.retrieve { background: #dbeafe; color: #1e40af; }
.memory-op.missing { background: #fee2e2; color: #991b1b; }

/* 快捷输入 */
.quick-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.quick-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 记忆面板 */
.memory-panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .memory-panels {
    grid-template-columns: 1fr;
  }
}

.panel-title {
  grid-column: 1 / -1;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.memory-panel {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.memory-panel:hover {
  border-color: var(--vp-c-brand);
}

.memory-panel.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-icon {
  font-size: 16px;
}

.panel-name {
  flex: 1;
  font-size: 12px;
  font-weight: 600;
}

.panel-count {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.panel-content {
  padding: 10px;
  min-height: 80px;
  max-height: 120px;
  
}

.empty {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 20px 0;
}

.memory-item {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 11px;
}

.memory-item:last-child {
  margin-bottom: 0;
}

.item-role {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  flex-shrink: 0;
}

.item-role.user { background: var(--vp-c-brand); color: white; }
.item-role.assistant { background: #10b981; color: white; }

.item-text {
  color: var(--vp-c-text-2);
}

.item-key {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.item-value {
  color: var(--vp-c-text-1);
}

.item-type {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-type.identity { background: #dbeafe; color: #1e40af; }
.item-type.preference { background: #d1fae5; color: #065f46; }

.panel-footer {
  padding: 8px 10px;
  font-size: 10px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

/* 记忆流转 */
.memory-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px 20px;
  text-align: center;
  min-width: 100px;
}

.step-box.small {
  padding: 10px 14px;
  min-width: 80px;
}

.step-box.user-input {
  border-color: #3b82f6;
  background: #dbeafe;
}

.step-box.agent-output {
  border-color: #10b981;
  background: #d1fae5;
}

.step-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.step-box.small .step-icon {
  font-size: 16px;
}

.step-text {
  font-size: 12px;
  font-weight: 600;
}

.step-desc {
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.step-arrow {
  font-size: 16px;
  color: var(--vp-c-text-3);
}

.flow-branch {
  display: flex;
  gap: 40px;
}

.branch-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.branch-arrow {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

/* 核心机制 */
.mechanism-section {
  margin-bottom: 20px;
}

.mechanism-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.mechanism-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .mechanism-grid {
    grid-template-columns: 1fr;
  }
}

.mechanism-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.mechanism-card:hover {
  border-color: var(--vp-c-brand);
}

.mechanism-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 18px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
}

.card-body {
  padding: 12px;
}

.mechanism-item {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 11px;
}

.item-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.item-value {
  color: var(--vp-c-text-1);
}

.code-example {
  margin-top: 10px;
  padding: 8px;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.code-example code {
  font-size: 10px;
  color: #d4d4d4;
  font-family: monospace;
}

/* 最佳实践 */
.best-practices {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.practices-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.practice-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.practice-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.practice-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.practice-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
