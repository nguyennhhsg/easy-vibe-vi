<template>
  <div class="a2a-detailed-demo">
    <div class="demo-header">
      <span class="title">Bên trong A2A</span>
      <span class="subtitle">Chi tiết giao tiếp trong kiến trúc mạng ngang hàng</span>
    </div>

    <div class="intro-section">
      <div class="section-title">A2A có thể làm gì?</div>
      <p class="intro-text">
        A2A cho phép nhiều AI Agent cộng tác với nhau, không còn "đơn thương độc mã". Một nhiệm vụ phức tạp có thể được chia cho nhiều agent chuyên trách, mỗi agent làm việc mình giỏi nhất.
      </p>
      <div class="popular-uses">
        <div class="use-item">
          <div class="use-title">Pipeline phát triển phần mềm</div>
          <div class="use-desc">Agent phân tích yêu cầu → agent code → agent kiểm thử → agent triển khai</div>
        </div>
        <div class="use-item">
          <div class="use-title">Tích hợp agent đa nhà cung cấp</div>
          <div class="use-desc">Agent của Google, Anthropic, OpenAI có thể gọi lẫn nhau</div>
        </div>
        <div class="use-item">
          <div class="use-title">Quy trình doanh nghiệp</div>
          <div class="use-desc">Agent HR, agent tài chính, agent phê duyệt phối hợp xử lý quy trình nghiệp vụ</div>
        </div>
        <div class="use-item">
          <div class="use-title">Nâng cấp trợ lý CSKH</div>
          <div class="use-desc">Agent tiếp nhận → agent nghiệp vụ → agent chuyển nhân viên thật theo cấp</div>
        </div>
        <div class="use-item">
          <div class="use-title">Cộng tác nghiên cứu</div>
          <div class="use-desc">Agent tra cứu tài liệu → agent thí nghiệm → agent phân tích → agent viết báo cáo</div>
        </div>
        <div class="use-item">
          <div class="use-title">Vận hành tự động</div>
          <div class="use-desc">Agent giám sát → agent chẩn đoán → agent sửa lỗi → agent thông báo</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">Dùng A2A như thế nào?</div>
      <p class="usage-intro">
        A2A vẫn đang ở giai đoạn đầu, chủ yếu do Google thúc đẩy. Nếu bạn muốn thử A2A, bạn cần phát triển dịch vụ agent hỗ trợ giao thức A2A.
      </p>

      <div class="usage-steps">
        <div class="usage-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">Triển khai endpoint Agent Card</div>
            <div class="step-desc">
              Bạn mở endpoint <code>/.well-known/agent.json</code> trong dịch vụ agent để khai báo khả năng và phiên bản
            </div>
          </div>
        </div>

        <div class="usage-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">Triển khai A2A API</div>
            <div class="step-desc">
              Hiện thực các API lõi như <code>agents/get</code>, <code>tasks/send</code>, <code>tasks/get</code>
            </div>
          </div>
        </div>

        <div class="usage-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">Triển khai và đăng ký agent</div>
            <div class="step-desc">
              Bạn deploy agent lên server và đăng ký trong agent registry để các agent khác có thể phát hiện
            </div>
          </div>
        </div>
      </div>

      <div class="usage-note">
        <div class="note-title">Trạng thái hiện tại</div>
        <div class="note-content">
          Giao thức A2A được công bố tháng 4/2025 và đang phát triển rất nhanh. Google cung cấp implementation tham khảo, nhưng hệ sinh thái vẫn đang xây dựng. Bạn nên theo dõi <a href="https://google.github.io/A2A" target="_blank">tài liệu chính thức</a> để cập nhật tiến độ.
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          Luồng giao tiếp (5 bước)
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in a2aFlowSteps"
            :key="index"
            class="flow-step-item"
          >
            <div class="step-header" @click="toggleStep(index)">
              <span class="step-num">{{ index + 1 }}</span>
              <span class="step-name">{{ step.name }}</span>
              <span class="step-arrow">{{ expandedStep === index ? '▼' : '▶' }}</span>
            </div>
            <div v-if="expandedStep === index" class="step-detail">
              <div class="step-desc">{{ step.desc }}</div>
              <div class="step-example">
                <div class="example-title">{{ step.example.title }}</div>
                <pre class="example-code"><code>{{ step.example.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: định dạng "name card" Agent Card</span>
        </summary>
        <div class="tech-content">
          <div class="tech-intro">
            Agent Card là một file JSON, thường đặt ở đường dẫn <code>/.well-known/agent.json</code>
          </div>
          <div class="tech-section">
            <div class="tech-title">Ví dụ Agent Card</div>
            <pre class="tech-code"><code>{{ agentCardExample }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>Thông qua Agent Card, các agent có thể tìm thấy nhau, hiểu được khả năng và phiên bản của nhau để cùng vận hành</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: giao tiếp HTTP + SSE</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">Gửi nhiệm vụ (HTTP POST)</div>
            <pre class="tech-code"><code>{{ taskSendExample }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">Đẩy realtime (SSE)</div>
            <pre class="tech-code"><code>{{ sseExample }}</code></pre>
          </div>
          <div class="tech-note">
            <span>SSE (Server-Sent Events) cho phép server chủ động đẩy tin về client, phù hợp để cập nhật trạng thái cho các tác vụ dài</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: các API lõi của A2A</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="(api, index) in a2aApis" :key="index" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: cơ chế xác thực</span>
        </summary>
        <div class="tech-content">
          <div class="auth-grid">
            <div class="auth-card">
              <div class="auth-header">
                
                <span class="auth-name">API Key</span>
              </div>
              <div class="auth-desc">
                Cách xác thực đơn giản, phù hợp cho giao tiếp giữa các agent nội bộ
              </div>
              <pre class="auth-example"><code>{{ apiKeyExample }}</code></pre>
            </div>
            <div class="auth-card">
              <div class="auth-header">
                
                <span class="auth-name">OAuth 2.0</span>
              </div>
              <div class="auth-desc">
                Xác thực cấp doanh nghiệp, hỗ trợ refresh token và kiểm soát quyền
              </div>
              <pre class="auth-example"><code>{{ oauthExample }}</code></pre>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedStep = ref(0)

const toggleStep = (index) => {
  expandedStep.value = expandedStep.value === index ? -1 : index
}

const a2aFlowSteps = [
  {
    name: 'Khám phá (agents/get)',
    desc: 'Các agent gọi HTTP request để lấy Agent Card của nhau, từ đó biết khả năng và phiên bản của đối phương',
    example: {
      title: 'HTTP request',
      code: `// Agent A lấy Agent Card của Agent B
GET /.well-known/agent.json HTTP/1.1
Host: agent-b.company.com

// Phản hồi
{
  "name": "Code Agent",
  "description": "Agent sinh code chuyên nghiệp",
  "url": "https://agent-b.company.com",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {"id": "code-gen", "name": "Sinh code"},
    {"id": "code-review", "name": "Review code"}
  ]
}`
    }
  },
  {
    name: 'Gửi nhiệm vụ (tasks/send)',
    desc: 'Agent A gọi tasks/send để gửi nhiệm vụ cho Agent B, kèm theo task ID, mô tả, ngữ cảnh, ...',
    example: {
      title: 'HTTP POST',
      code: `// Agent A gửi nhiệm vụ cho Agent B
POST /tasks/send HTTP/1.1
Content-Type: application/json
Authorization: Bearer xxx

{
  "id": "task-12345",
  "sessionId": "session-001",
  "message": {
    "role": "user",
    "parts": [
      {
        "type": "text",
        "text": "Bạn giúp mình viết một API đăng nhập"
      },
      {
        "type": "resource",
        "resource": "file:///specs/login.yaml"
      }
    ]
  }
}`
    }
  },
  {
    name: 'Thực thi (Task Processing)',
    desc: 'Sau khi nhận nhiệm vụ, Agent B có thể gọi LLM nội bộ hoặc dùng công cụ qua MCP để thực thi',
    example: {
      title: 'Xử lý nội bộ tại Agent B',
      code: `// Luồng xử lý nội bộ của Agent B
1. Phân tích yêu cầu nhiệm vụ
2. Xác định kỹ năng cần dùng (khớp với skills)
3. Gọi LLM nội bộ để sinh code
4. Tuỳ chọn: gọi tool ngoài qua MCP để xác minh code
5. Sinh kết quả cuối cùng

// Cả quá trình có thể kéo dài, đẩy tiến độ qua SSE`
    }
  },
  {
    name: 'Đẩy realtime (SSE)',
    desc: 'Agent B dùng SSE (Server-Sent Events) để đẩy realtime tiến độ và kết quả trung gian',
    example: {
      title: 'Đẩy qua SSE',
      code: `// Server liên tục đẩy
event: taskProgress
data: {
  "taskId": "task-12345",
  "status": "processing",
  "progress": 30,
  "message": "Đang sinh logic đăng nhập..."
}

event: taskProgress
data: {
  "taskId": "task-12345",
  "status": "processing",
  "progress": 60,
  "message": "Đang sinh thao tác cơ sở dữ liệu..."
}

event: taskCompleted
data: {
  "taskId": "task-12345",
  "status": "completed",
  "result": { ... }
}`
    }
  },
  {
    name: 'Trả kết quả (tasks/get)',
    desc: 'Sau khi nhiệm vụ hoàn tất, Agent A gọi tasks/get để lấy kết quả cuối cùng',
    example: {
      title: 'HTTP GET',
      code: `// Agent A lấy kết quả nhiệm vụ
GET /tasks/task-12345 HTTP/1.1
Authorization: Bearer xxx

// Phản hồi
{
  "id": "task-12345",
  "status": "completed",
  "result": {
    "message": {
      "role": "agent",
      "parts": [
        {
          "type": "text",
          "text": "API đăng nhập đã được sinh xong..."
        },
        {
          "type": "file",
          "file": {
            "name": "login.py",
            "mimeType": "text/plain",
            "uri": "file:///generated/login.py"
          }
        }
      ]
    }
  }
}`
    }
  }
]

const agentCardExample = `{
  "name": "Agent sinh code",
  "description": "Agent chuyên sinh code cả frontend và backend",
  "url": "https://code-agent.company.com",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {
      "id": "frontend",
      "name": "Frontend",
      "description": "React/Vue/Angular"
    },
    {
      "id": "backend",
      "name": "Backend",
      "description": "Node/Python/Go"
    }
  ],
  "authentication": {
    "schemes": ["Bearer", "OAuth2"]
  }
}`

const taskSendExample = `POST /tasks/send HTTP/1.1
Host: agent-b.company.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "id": "task-001",
  "message": {
    "role": "user",
    "parts": [{ "type": "text", "text": "Viết một API đăng nhập giúp mình" }]
  }
}`

const sseExample = `GET /tasks/task-001/sse HTTP/1.1
Authorization: Bearer {token}

event: progress
data: {"status": "processing", "progress": 50}

event: completed  
data: {"status": "completed", "result": {...}}`

const a2aApis = [
  { method: 'GET', name: 'agents/get', desc: 'Lấy Agent Card của một agent cụ thể để biết khả năng của họ' },
  { method: 'POST', name: 'tasks/send', desc: 'Gửi nhiệm vụ cho agent đích, chờ kết quả đồng bộ' },
  { method: 'POST', name: 'tasks/sendSubscribe', desc: 'Gửi nhiệm vụ kèm subscribe SSE để lấy tiến độ realtime' },
  { method: 'GET', name: 'tasks/get', desc: 'Lấy trạng thái và kết quả nhiệm vụ theo task ID' },
  { method: 'GET', name: 'tasks/cancel', desc: 'Huỷ một nhiệm vụ đang chạy' }
]

const apiKeyExample = `Authorization: Bearer sk-xxxxx
# hoặc
Authorization: ApiKey sk-xxxxx`

const oauthExample = `Authorization: Bearer {access_token}
# Hỗ trợ refresh token
POST /oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "xxx"
}`
</script>

<style scoped>
.a2a-detailed-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.flow-section {
  margin-bottom: 1rem;
}

.flow-title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.title-icon {
  font-size: 1rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.flow-step-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  transition: background 0.2s;
}

.step-header:hover {
  background: var(--vp-c-bg-alt);
}

.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-name {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
}

.step-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.step-detail {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.example-title {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}

.example-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-details {
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tech-summary {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
  font-weight: 500;
  list-style: none;
}

.tech-summary::-webkit-details-marker {
  display: none;
}

.summary-icon {
  font-size: 0.9rem;
}

.tech-content {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tech-intro {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tech-intro code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.tech-section {
  margin-bottom: 0.75rem;
}

.tech-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.tech-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-note {
  display: flex;
  align-items: flex-start;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.note-icon {
  flex-shrink: 0;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.api-item {
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.api-method {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.2rem;
}

.method-badge {
  font-size: 0.6rem;
  background: #10b981;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
}

.method-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.api-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.auth-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.auth-icon {
  font-size: 0.9rem;
}

.auth-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.auth-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.auth-example pre {
  font-size: 0.65rem;
  background: var(--vp-c-bg);
  padding: 0.4rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.3;
}

@media (max-width: 640px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
}

.intro-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.intro-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.intro-section .intro-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.popular-uses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.use-item {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.use-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

@media (max-width: 640px) {
  .popular-uses {
    grid-template-columns: 1fr;
  }
}

.usage-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.usage-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.usage-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.usage-intro code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.usage-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.usage-step .step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-step .step-content {
  flex: 1;
}

.usage-step .step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.usage-step .step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-step .step-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.usage-note {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.note-content a {
  color: var(--vp-c-brand);
}
</style>
