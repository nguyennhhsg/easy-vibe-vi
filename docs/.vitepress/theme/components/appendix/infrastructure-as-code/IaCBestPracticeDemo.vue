<template>
  <div class="iac-best-practice-demo">
    <div class="demo-label">Demo tương tác ── Best practice cho IaC</div>

    <div class="practice-tabs">
      <button
        v-for="(tab, i) in practices"
        :key="tab.key"
        :class="['practice-tab', { active: activeTab === i }]"
        @click="activeTab = i"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-name">{{ tab.name }}</span>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="activeTab" class="practice-content">
        <div class="practice-header">
          <span class="practice-icon">{{ currentPractice.icon }}</span>
          <div>
            <div class="practice-title">{{ currentPractice.title }}</div>
            <div class="practice-subtitle">{{ currentPractice.subtitle }}</div>
          </div>
        </div>

        <div class="do-dont-grid">
          <div class="do-card">
            <div class="card-label good-label">✅ Khuyến nghị nên làm</div>
            <div class="card-items">
              <div v-for="(item, i) in currentPractice.dos" :key="i" class="card-item">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="dont-card">
            <div class="card-label bad-label">❌ Anti-pattern không nên làm</div>
            <div class="card-items">
              <div v-for="(item, i) in currentPractice.donts" :key="i" class="card-item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentPractice.code" class="code-example">
          <div class="code-header">
            <span>{{ currentPractice.codeTitle }}</span>
          </div>
          <pre class="code-body"><code>{{ currentPractice.code }}</code></pre>
        </div>

        <div class="maturity-bar">
          <div class="maturity-label">Mức độ trưởng thành của practice</div>
          <div class="maturity-track">
            <div
              v-for="(level, i) in maturityLevels"
              :key="i"
              :class="['maturity-segment', { filled: i <= currentPractice.maturity }]"
            >
              <span class="maturity-text">{{ level }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const maturityLevels = ['Mới bắt đầu', 'Cơ bản', 'Nâng cao', 'Trưởng thành', 'Xuất sắc']

const practices = [
  {
    key: 'vcs', icon: '📂', name: 'Version control',
    title: 'Practice 1: Đưa code hạ tầng vào version control',
    subtitle: 'Quản lý code hạ tầng giống như quản lý code ứng dụng',
    dos: [
      'Commit mọi file .tf vào Git repo',
      'Dùng chiến lược branch (main / dev / feature)',
      'Code review qua Pull Request',
      'Tự động chạy terraform plan trong CI'
    ],
    donts: [
      'Chạy apply local rồi không commit code',
      'Sửa thẳng trên branch main',
      'Commit file .tfstate lên Git',
      'Bỏ qua code review rồi deploy thẳng'
    ],
    codeTitle: 'Ví dụ .gitignore',
    code: `# Bỏ qua file state local
*.tfstate
*.tfstate.backup
.terraform/

# Bỏ qua file biến nhạy cảm
*.tfvars
!example.tfvars`,
    maturity: 1
  },
  {
    key: 'modules', icon: '🧩', name: 'Module hoá',
    title: 'Practice 2: Dùng module để tái sử dụng code',
    subtitle: 'Tránh copy-paste, đóng gói pattern hạ tầng chung thành module',
    dos: [
      'Tách pattern chung thành module tái sử dụng',
      'Module dùng version number theo semver',
      'Viết README và ví dụ sử dụng cho module',
      'Expose tham số cấu hình được qua variables'
    ],
    donts: [
      'Copy-paste cùng đoạn code giữa nhiều project',
      'Tạo module "vạn năng" quá đồ sộ',
      'Hard-code giá trị riêng cho môi trường trong module',
      'Phát hành module không có tài liệu'
    ],
    codeTitle: 'Ví dụ gọi module',
    code: `module "web_server" {
  source  = "./modules/ec2-instance"
  version = "2.1.0"

  instance_type = "t3.micro"
  environment   = "production"
  app_name      = "my-web-app"
}`,
    maturity: 2
  },
  {
    key: 'state', icon: '💾', name: 'Quản lý state',
    title: 'Practice 3: Lưu state từ xa và lock',
    subtitle: 'File state là trái tim của IaC, phải quản lý an toàn và đáng tin cậy',
    dos: [
      'Dùng remote backend (S3 + DynamoDB)',
      'Bật mã hoá cho file state',
      'Cấu hình state lock để tránh xung đột đồng thời',
      'Tách state theo môi trường / project'
    ],
    donts: [
      'Lưu state trên filesystem local',
      'Nhiều người chia sẻ cùng một state mà không có cơ chế lock',
      'Sửa tay terraform.tfstate',
      'Mọi môi trường dùng chung một file state'
    ],
    codeTitle: 'Cấu hình remote backend',
    code: `terraform {
  backend "s3" {
    bucket         = "my-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-lock"
  }
}`,
    maturity: 2
  },
  {
    key: 'env', icon: '🌍', name: 'Quản lý môi trường',
    title: 'Practice 4: Đảm bảo nhất quán giữa các môi trường',
    subtitle: 'Dev, staging, prod dùng cùng code, chỉ khác tham số',
    dos: [
      'Dùng Workspace hoặc thư mục để tách môi trường',
      'Dùng file .tfvars để phân biệt tham số môi trường',
      'Giữ cấu trúc code y hệt giữa các môi trường',
      'Verify ở dev trước rồi mới promote sang prod'
    ],
    donts: [
      'Duy trì bản code riêng cho mỗi môi trường',
      'Hard-code tên môi trường trong code',
      'Bỏ qua môi trường test, deploy thẳng prod',
      'Các môi trường dùng version module khác nhau'
    ],
    codeTitle: 'Cấu trúc thư mục đa môi trường',
    code: `environments/
├── dev/
│   ├── main.tf        # Gọi cùng module
│   └── dev.tfvars     # Tham số môi trường dev
├── staging/
│   ├── main.tf
│   └── staging.tfvars
└── prod/
    ├── main.tf
    └── prod.tfvars`,
    maturity: 3
  }
]

const currentPractice = computed(() => practices[activeTab.value])
</script>

<style scoped>
.iac-best-practice-demo {
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
.practice-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  justify-content: center;
}
.practice-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.practice-tab.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.practice-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}
.practice-icon { font-size: 1.5rem; }
.practice-title { font-weight: 600; font-size: 0.95rem; }
.practice-subtitle { font-size: 0.78rem; color: var(--vp-c-text-3); }

.do-dont-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
@media (max-width: 540px) {
  .do-dont-grid { grid-template-columns: 1fr; }
}
.do-card, .dont-card {
  border-radius: 6px;
  padding: 0.7rem;
  border: 1px solid var(--vp-c-divider);
}
.do-card { background: #d1fae508; border-color: #6ee7b740; }
.dont-card { background: #fee2e208; border-color: #fca5a540; }
.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.good-label { color: #10b981; }
.bad-label { color: #ef4444; }
.card-items { display: flex; flex-direction: column; gap: 0.25rem; }
.card-item {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.code-example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.code-header {
  background: var(--vp-c-bg-alt);
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}
.code-body {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 0.8rem;
  font-size: 0.73rem;
  font-family: 'Menlo', 'Consolas', monospace;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.maturity-bar { margin-top: 0.5rem; }
.maturity-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.maturity-track {
  display: flex;
  gap: 2px;
}
.maturity-segment {
  flex: 1;
  height: 24px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}
.maturity-segment.filled {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
