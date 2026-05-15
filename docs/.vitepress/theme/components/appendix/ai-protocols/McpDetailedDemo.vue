<template>
  <div class="mcp-detailed-demo">
    <div class="demo-header">
      <span class="title">Bên trong MCP</span>
      <span class="subtitle">Chi tiết giao tiếp trong kiến trúc client-server</span>
    </div>

    <div class="intro-section">
      <div class="section-title">Vì sao MCP lại hot đến vậy?</div>
      <p class="intro-text">
        Trước khi có MCP, AI chỉ "nhìn" và "nói" được. Có MCP, AI mới thực sự "ra tay" được. MCP cho phép AI điều khiển nhiều phần mềm khác nhau và làm việc thực sự giúp bạn.
      </p>
      <div class="popular-uses">
        <div class="use-item">
          <div class="use-title">AI editor như Cursor / Claude</div>
          <div class="use-desc">Trực tiếp đọc ghi file, chạy code, thao tác Git</div>
        </div>
        <div class="use-item">
          <div class="use-title">Tự động hoá trình duyệt</div>
          <div class="use-desc">AI tự mở trang web, bấm nút, điền form</div>
        </div>
        <div class="use-item">
          <div class="use-title">Truy vấn cơ sở dữ liệu</div>
          <div class="use-desc">Truy vấn / ghi DB trực tiếp, không cần export thủ công</div>
        </div>
        <div class="use-item">
          <div class="use-title">AI điều khiển máy tính</div>
          <div class="use-desc">Windows-MCP giúp AI điều khiển chuột và bàn phím</div>
        </div>
        <div class="use-item">
          <div class="use-title">Tự động triển khai</div>
          <div class="use-desc">Vercel-MCP giúp deploy website lên prod chỉ với một lệnh</div>
        </div>
        <div class="use-item">
          <div class="use-title">Chuyển bản vẽ thiết kế thành code</div>
          <div class="use-desc">Figma-MCP đọc thiết kế và sinh trang web tự động</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">Dùng MCP như thế nào?</div>
      <p class="usage-intro">
        Dùng MCP rất đơn giản, bạn chỉ cần cấu hình một file <code>mcp.json</code> là có thể dùng các tool MCP ngay trong IDE của mình.
      </p>

      <div class="usage-steps">
        <div class="usage-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">Tìm MCP Server</div>
            <div class="step-desc">
              Bạn tìm MCP Server cần dùng từ các trang tài nguyên MCP hoặc trên GitHub
            </div>
            <div class="mcp-resources">
              <div class="resource-item">
                <span class="resource-name">Danh sách Server chính thức</span>
                <a href="https://github.com/modelcontextprotocol/servers" target="_blank" class="resource-link">github.com/modelcontextprotocol/servers</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">MCP.so (tiếng Trung)</span>
                <a href="https://mcp.so" target="_blank" class="resource-link">mcp.so</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">Pulse MCP (tiếng Anh)</span>
                <a href="https://www.pulsemcp.com" target="_blank" class="resource-link">pulsemcp.com</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">Smithery (tiếng Anh)</span>
                <a href="https://smithery.ai" target="_blank" class="resource-link">smithery.ai</a>
              </div>
            </div>
          </div>
        </div>

        <div class="usage-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">Cấu hình mcp.json</div>
            <div class="step-desc">
              Bạn mở file cấu hình MCP trong AI editor (Cursor / Claude Desktop, ...) và thêm cấu hình Server vào
            </div>
            <pre class="config-example"><code>{{ mcpConfigExample }}</code></pre>
          </div>
        </div>

        <div class="usage-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">Khởi động lại IDE là dùng được</div>
            <div class="step-desc">
              Sau khi khởi động lại, AI sẽ tự phát hiện và nạp các tool MCP, từ đó bạn có thể nhờ AI dùng các tool này ngay
            </div>
          </div>
        </div>
      </div>

      <div class="skills-note">
        <div class="note-title">Skills đang dần thay thế MCP?</div>
        <div class="note-content">
          Khi <strong>Skills</strong> ngày càng phổ biến, nhiều tình huống đã bắt đầu dùng Skills thay cho giao thức MCP. Skills nhẹ hơn, dễ viết hơn, phù hợp cho phần lớn các tác vụ thông dụng. MCP phù hợp hơn với các kịch bản cần tích hợp tool phức tạp và dùng chung cho nhiều client. Nếu bạn chỉ muốn AI làm vài thao tác đơn giản, bạn nên ưu tiên thử Skills trước.
        </div>
      </div>

      <div class="config-locations">
        <div class="config-title">Vị trí file mcp.json trong các IDE phổ biến</div>
        <div class="config-list">
          <div class="config-item">
            <span class="config-name">Cursor</span>
            <span class="config-path">~/.cursor/mcp.json</span>
          </div>
          <div class="config-item">
            <span class="config-name">Claude Desktop</span>
            <span class="config-path">~/Library/Application Support/Claude/claude_desktop_config.json (macOS)</span>
          </div>
          <div class="config-item">
            <span class="config-name">Windsurf</span>
            <span class="config-path">~/.windsurf/mcp.json</span>
          </div>
        </div>
      </div>
    </div>

    <div class="implement-section">
      <div class="section-title">Làm sao hiện thực một MCP Server?</div>
      <p class="implement-intro">
        Giả sử bạn có một API thời tiết và muốn đóng gói nó thành MCP Server để AI gọi được. Ví dụ dưới đây dùng Node.js:
      </p>
      
      <div class="implement-code">
        <div class="code-title">weather-mcp-server.js</div>
        <pre class="code-block"><code>{{ weatherMcpCode }}</code></pre>
      </div>
      
      <div class="transport-compare">
        <div class="compare-title">So sánh phương thức truyền stdio vs HTTP+SSE</div>
        <div class="compare-grid">
          <div class="compare-item">
            <div class="compare-name">stdio (tiến trình local)</div>
            <div class="compare-desc">
              <p>MCP Server chạy như một tiến trình con, giao tiếp qua standard input/output</p>
              <p><strong>Ưu điểm:</strong> đơn giản, an toàn, hợp cho tool local</p>
              <p><strong>Nhược điểm:</strong> chỉ dùng được local, không hỗ trợ truy cập từ xa</p>
            </div>
          </div>
          <div class="compare-item">
            <div class="compare-name">HTTP + SSE (dịch vụ từ xa)</div>
            <div class="compare-desc">
              <p>MCP Server chạy như một HTTP service, hỗ trợ SSE để đẩy dữ liệu</p>
              <p><strong>Ưu điểm:</strong> truy cập từ xa, nhiều client cùng dùng được</p>
              <p><strong>Nhược điểm:</strong> cần triển khai server và cấu hình xác thực</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          Luồng giao tiếp (4 bước)
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in mcpFlowSteps"
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
          
          <span class="summary-text">Đào sâu kỹ thuật: định dạng message JSON-RPC 2.0</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">Cấu trúc message request</div>
            <pre class="tech-code"><code>{{ jsonRpcRequest }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">Cấu trúc message response</div>
            <pre class="tech-code"><code>{{ jsonRpcResponse }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>JSON-RPC 2.0 là giao thức stateless, mỗi request đều cần có <code>id</code> để khớp với response tương ứng</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: hai phương thức truyền</span>
        </summary>
        <div class="tech-content">
          <div class="transport-grid">
            <div class="transport-card">
              <div class="transport-header">
                
                <span class="transport-name">stdio (tiến trình local)</span>
              </div>
              <div class="transport-desc">
                Phù hợp cho tool local, giao tiếp qua standard input/output
              </div>
              <div class="transport-example">
                <pre><code>{{ stdioExample }}</code></pre>
              </div>
            </div>
            <div class="transport-card">
              <div class="transport-header">
                
                <span class="transport-name">HTTP + SSE (từ xa)</span>
              </div>
              <div class="transport-desc">
                Phù hợp cho dịch vụ từ xa, hỗ trợ long-connection để đẩy dữ liệu
              </div>
              <div class="transport-example">
                <pre><code>{{ httpExample }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">Đào sâu kỹ thuật: các API lõi của MCP</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="(api, index) in mcpApis" :key="index" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
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

const mcpFlowSteps = [
  {
    name: 'Bắt tay (initialize)',
    desc: 'Khi MCP Server khởi động, nó gửi request bắt tay tới Client để khai báo phiên bản giao thức và khả năng của mình',
    example: {
      title: 'Server → Client',
      code: `// Server gửi request initialize
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": {},
      "resources": {},
      "prompts": {}
    },
    "serverInfo": {
      "name": "filesystem",
      "version": "1.0.0"
    }
  }
}`
    }
  },
  {
    name: 'Liệt kê tool (tools/list)',
    desc: 'Client gọi Server để lấy danh sách tool sẵn có, nhờ đó AI biết có thể gọi những tính năng nào',
    example: {
      title: 'Client → Server',
      code: `// Client yêu cầu danh sách tool
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}

// Server trả về danh sách tool
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "read_file",
        "description": "Đọc nội dung file",
        "inputSchema": {
          "type": "object",
          "properties": {
            "path": { "type": "string" }
          },
          "required": ["path"]
        }
      },
      {
        "name": "write_file",
        "description": "Ghi nội dung file",
        "inputSchema": { ... }
      }
    ]
  }
}`
    }
  },
  {
    name: 'Gọi tool (tools/call)',
    desc: 'Khi AI quyết định dùng tool, Client gửi request gọi tool, Server thực thi và trả kết quả',
    example: {
      title: 'Client → Server',
      code: `// Client gọi tool
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "read_file",
    "arguments": {
      "path": "/home/user/project/README.md"
    }
  }
}

// Server trả kết quả
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "# My Project\\n\\nHello World"
      }
    ]
  }
}`
    }
  },
  {
    name: 'Trả kết quả',
    desc: 'Server thực thi xong và gửi kết quả về Client, Client lại đẩy kết quả vào ngữ cảnh cho AI',
    example: {
      title: 'Luồng kết quả',
      code: `Server thực thi → trả JSON-RPC response → Client phân tích →
       → đưa kết quả vào context của AI → AI tiếp tục xử lý`
    }
  }
]

const jsonRpcRequest = `{
  "jsonrpc": "2.0",           // Phiên bản giao thức
  "id": 1,                     // Request ID, dùng để khớp response
  "method": "tools/call",      // Tên method
  "params": { ... }            // Object tham số
}`

const jsonRpcResponse = `// Response thành công
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}

// Response lỗi
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32600,
    "message": "Invalid Request"
  }
}`

const stdioExample = `// Khởi động MCP Server như một tiến trình con
npx @modelcontextprotocol/server-filesystem ./project

// Giao tiếp qua stdio
// stdin: nhận request
// stdout: gửi response`

const httpExample = `// Truyền qua HTTP (Server-Sent Events)
POST /mcp HTTP/1.1
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { ... }
}

// SSE long-connection để server đẩy dữ liệu
GET /mcp/sse HTTP/1.1
// Liên tục nhận các bản cập nhật mà server đẩy về`

const mcpConfigExample = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      }
    }
  }
}`

const weatherMcpCode = `import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

// 1. Tạo MCP Server
const server = new Server({
  name: 'weather-server',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
})

// 2. Khai báo danh sách tool
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'get_weather',
    description: 'Lấy thông tin thời tiết của một thành phố',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'Tên thành phố' }
      },
      required: ['city']
    }
  }]
}))

// 3. Hiện thực logic gọi tool
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params

  if (name === 'get_weather') {
    // Gọi API thời tiết của bạn
    const response = await fetch(
      \`https://api.weather.com/v1/current?city=\${args.city}\`
    )
    const data = await response.json()

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(data)
      }]
    }
  }
})

// 4. Khởi động dịch vụ (qua stdio)
const transport = new StdioServerTransport()
await server.connect(transport)`

const mcpApis = [
  { method: 'initialize', name: 'Khởi tạo', desc: 'Server khai báo phiên bản giao thức và khả năng với Client' },
  { method: 'tools/list', name: 'Danh sách tool', desc: 'Lấy tất cả tool mà Server cung cấp' },
  { method: 'tools/call', name: 'Gọi tool', desc: 'Thực sự gọi một tool và lấy kết quả' },
  { method: 'resources/list', name: 'Danh sách resource', desc: 'Lấy danh sách tài nguyên có thể truy cập (file, database, ...)' },
  { method: 'resources/read', name: 'Đọc resource', desc: 'Đọc nội dung của một tài nguyên' },
  { method: 'prompts/list', name: 'Prompt template', desc: 'Lấy các prompt template đã định nghĩa sẵn' }
]
</script>

<style scoped>
.mcp-detailed-demo {
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
  background: #3b82f6;
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

.tech-note code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.7rem;
}

.transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.transport-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.transport-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.transport-icon {
  font-size: 0.9rem;
}

.transport-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.transport-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.transport-example pre {
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
  background: #3b82f6;
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

@media (max-width: 640px) {
  .transport-grid {
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

.usage-step .step-desc a {
  color: var(--vp-c-brand);
}

.config-example {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow-x: auto;
}

.config-example code {
  font-size: 0.7rem;
  line-height: 1.4;
}

.config-locations {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.config-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.config-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 100px;
}

.config-path {
  color: var(--vp-c-text-2);
  font-family: monospace;
  font-size: 0.7rem;
}

.mcp-resources {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.resource-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 120px;
}

.resource-link {
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.skills-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}

.skills-note .note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.skills-note .note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.implement-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.implement-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.implement-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.implement-code {
  margin-bottom: 1rem;
}

.code-title {
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.code-block {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow-x: auto;
}

.code-block code {
  font-size: 0.65rem;
  line-height: 1.4;
}

.transport-compare {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.compare-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.compare-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.compare-desc p {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
  margin: 0.2rem 0;
}

.compare-desc strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }
}
</style>
