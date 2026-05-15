<template>
  <div class="iac-tool-comparison-demo">
    <div class="demo-label">Demo tương tác ── So sánh các công cụ IaC phổ biến</div>

    <div class="tool-selector">
      <span class="selector-hint">Chọn các công cụ để so sánh (chọn ít nhất 2):</span>
      <div class="tool-chips">
        <button
          v-for="tool in tools"
          :key="tool.name"
          :class="['tool-chip', { selected: selectedTools.includes(tool.name) }]"
          :style="selectedTools.includes(tool.name) ? { background: tool.color, borderColor: tool.color, color: '#fff' } : {}"
          @click="toggleTool(tool.name)"
        >
          {{ tool.icon }} {{ tool.name }}
        </button>
      </div>
    </div>

    <div v-if="selectedTools.length >= 2" class="comparison-grid">
      <table>
        <thead>
          <tr>
            <th class="feature-col">Đặc tính</th>
            <th v-for="name in selectedTools" :key="name" class="tool-col">
              <span class="tool-header-icon">{{ getToolByName(name).icon }}</span>
              <span>{{ name }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.key">
            <td class="feature-cell">{{ feature.label }}</td>
            <td v-for="name in selectedTools" :key="name" class="value-cell">
              <span :class="getCellClass(name, feature.key)">
                {{ getToolByName(name).features[feature.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-hint">
      Vui lòng chọn ít nhất 2 công cụ để so sánh
    </div>

    <Transition name="fade">
      <div v-if="selectedDetail" class="detail-card">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedDetail.icon }}</span>
          <span class="detail-name">{{ selectedDetail.name }}</span>
          <button class="close-btn" @click="detailName = ''">✕</button>
        </div>
        <p class="detail-desc">{{ selectedDetail.desc }}</p>
        <div class="detail-code">
          <div class="code-label">Đoạn code ví dụ:</div>
          <pre class="code-block"><code>{{ selectedDetail.example }}</code></pre>
        </div>
      </div>
    </Transition>

    <div class="detail-hint" v-if="selectedTools.length >= 2 && !detailName">
      Click vào tên công cụ bên dưới để xem giới thiệu chi tiết và code mẫu
    </div>
    <div class="tool-detail-btns" v-if="selectedTools.length >= 2">
      <button
        v-for="name in selectedTools"
        :key="name"
        :class="['detail-btn', { active: detailName === name }]"
        @click="detailName = detailName === name ? '' : name"
      >
        {{ getToolByName(name).icon }} {{ name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTools = ref(['Terraform', 'CloudFormation'])
const detailName = ref('')

const selectedDetail = computed(() => {
  if (!detailName.value) return null
  return tools.find(t => t.name === detailName.value)
})

const features = [
  { key: 'vendor', label: 'Hãng' },
  { key: 'language', label: 'Ngôn ngữ cấu hình' },
  { key: 'style', label: 'Khai báo / mệnh lệnh' },
  { key: 'multiCloud', label: 'Hỗ trợ đa cloud' },
  { key: 'stateManagement', label: 'Quản lý state' },
  { key: 'learning', label: 'Đường cong học' },
  { key: 'community', label: 'Hệ sinh thái' },
  { key: 'bestFor', label: 'Phù hợp nhất' }
]

const tools = [
  {
    name: 'Terraform',
    icon: '🟣',
    color: '#7c3aed',
    features: {
      vendor: 'HashiCorp',
      language: 'HCL',
      style: 'Khai báo',
      multiCloud: 'Đa cloud nguyên gốc',
      stateManagement: 'File state',
      learning: 'Trung bình',
      community: 'Rất sôi động',
      bestFor: 'Multi-cloud / hybrid cloud'
    },
    desc: 'Terraform là công cụ IaC open source phổ biến nhất hiện nay, do HashiCorp phát triển. Nó dùng ngôn ngữ HCL riêng, hỗ trợ gần như mọi cloud lớn qua cơ chế Provider.',
    example: `resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
  tags   = { Env = "prod" }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159"
  instance_type = "t3.micro"
}`
  },
  {
    name: 'CloudFormation',
    icon: '🟠',
    color: '#ea580c',
    features: {
      vendor: 'AWS',
      language: 'YAML / JSON',
      style: 'Khai báo',
      multiCloud: 'Chỉ AWS',
      stateManagement: 'AWS managed',
      learning: 'Trung bình - cao',
      community: 'Hệ sinh thái AWS',
      bestFor: 'Môi trường thuần AWS'
    },
    desc: 'CloudFormation là dịch vụ IaC nguyên gốc của AWS, tích hợp sâu với các dịch vụ AWS. State được AWS quản lý tự động, không cần tự duy trì file state.',
    example: `Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c55b159
      InstanceType: t3.micro
      Tags:
        - Key: Name
          Value: web-server`
  },
  {
    name: 'Pulumi',
    icon: '🔵',
    color: '#2563eb',
    features: {
      vendor: 'Pulumi',
      language: 'TypeScript/Python/Go',
      style: 'Mệnh lệnh + khai báo',
      multiCloud: 'Đa cloud nguyên gốc',
      stateManagement: 'Pulumi Cloud / tự quản',
      learning: 'Thấp (nếu quen lập trình)',
      community: 'Tăng trưởng nhanh',
      bestFor: 'Tình huống thân thiện với developer'
    },
    desc: 'Pulumi cho phép dùng các ngôn ngữ lập trình thật (TypeScript, Python, Go, v.v.) để định nghĩa hạ tầng, rất thân thiện developer, hỗ trợ if/else, loop và các tính năng lập trình khác.',
    example: `import * as aws from "@pulumi/aws"

const bucket = new aws.s3.Bucket("data", {
  tags: { Env: "prod" }
})

const server = new aws.ec2.Instance("web", {
  ami: "ami-0c55b159",
  instanceType: "t3.micro",
})`
  },
  {
    name: 'Ansible',
    icon: '🔴',
    color: '#dc2626',
    features: {
      vendor: 'Red Hat',
      language: 'YAML (Playbook)',
      style: 'Mệnh lệnh',
      multiCloud: 'Hỗ trợ qua module',
      stateManagement: 'Stateless (idempotent)',
      learning: 'Thấp',
      community: 'Rất sôi động',
      bestFor: 'Quản lý cấu hình + orchestration'
    },
    desc: 'Ansible là công cụ tự động hoá agentless, mạnh ở config management và deploy ứng dụng. Nó kết nối qua SSH để chạy task trên máy đích, không cần cài client.',
    example: `- name: Deploy web server
  hosts: webservers
  tasks:
    - name: Cài Nginx
      apt:
        name: nginx
        state: present
    - name: Khởi động dịch vụ
      service:
        name: nginx
        state: started`
  }
]

function getToolByName(name) {
  return tools.find(t => t.name === name)
}

function toggleTool(name) {
  const idx = selectedTools.value.indexOf(name)
  if (idx >= 0) {
    if (selectedTools.value.length > 2) {
      selectedTools.value.splice(idx, 1)
    }
  } else {
    selectedTools.value.push(name)
  }
}

function getCellClass(toolName, featureKey) {
  const val = getToolByName(toolName).features[featureKey]
  if (featureKey === 'multiCloud') {
    if (val.includes('Đa cloud nguyên gốc')) return 'cell-good'
    if (val.includes('Chỉ')) return 'cell-warn'
    return ''
  }
  if (featureKey === 'learning') {
    if (val.startsWith('Thấp')) return 'cell-good'
    if (val.includes('cao')) return 'cell-warn'
    return ''
  }
  return ''
}
</script>

<style scoped>
.iac-tool-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}
.selector-hint {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  display: block;
  margin-bottom: 0.5rem;
}
.tool-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.tool-chip {
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.tool-chip:hover { transform: scale(1.05); }
.comparison-grid { overflow-x: auto; margin-bottom: 1rem; }
.comparison-grid table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.comparison-grid th,
.comparison-grid td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.comparison-grid th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}
.feature-col { text-align: left; min-width: 80px; }
.feature-cell { font-weight: 600; text-align: left; }
.tool-header-icon { margin-right: 4px; }
.cell-good { color: #10b981; font-weight: 600; }
.cell-warn { color: #f59e0b; }
.empty-hint {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}
.detail-hint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}
.tool-detail-btns {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.detail-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.78rem;
  transition: all 0.2s;
}
.detail-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  margin-top: 0.5rem;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.5rem;
}
.detail-icon { font-size: 1.2rem; }
.detail-name { font-weight: 600; font-size: 1rem; flex: 1; }
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--vp-c-text-3);
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.code-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.code-block {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.73rem;
  font-family: 'Menlo', 'Consolas', monospace;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
