<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">Bản đồ hệ sinh thái package manager</span>
      <span class="subtitle">Chọn một hệ sinh thái ngôn ngữ để khám phá các công cụ quản lý package của nó</span>
    </div>

    <div class="control-panel">
      <button
        v-for="eco in ecosystems"
        :key="eco.id"
        :class="['eco-btn', { active: activeEco === eco.id }]"
        @click="selectEco(eco.id)"
      >
        <span class="eco-icon">{{ eco.icon }}</span>
        <span class="eco-name">{{ eco.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="managers-grid">
        <div
          v-for="pm in currentManagers"
          :key="pm.id"
          :class="['pm-card', { active: activePm === pm.id }]"
          @click="selectPm(pm.id)"
        >
          <div class="pm-badge" :style="{ background: pm.color }">{{ pm.name }}</div>
          <div class="pm-tagline">{{ pm.tagline }}</div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="currentPm" class="pm-detail">
          <div class="detail-top">
            <span class="detail-name" :style="{ color: currentPm.color }">{{ currentPm.name }}</span>
            <span class="detail-full">{{ currentPm.fullName }}</span>
          </div>

          <div class="detail-sections">
            <div class="detail-section">
              <div class="section-label">Lệnh cài đặt</div>
              <div class="cmd-list">
                <div v-for="(cmd, i) in currentPm.commands" :key="i" class="cmd-row">
                  <span class="cmd-op">{{ cmd.op }}</span>
                  <code class="cmd-code">{{ cmd.cmd }}</code>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">File cấu hình</div>
              <div class="file-list">
                <div v-for="f in currentPm.files" :key="f.name" class="file-row">
                  <code class="file-name">{{ f.name }}</code>
                  <span class="file-desc">{{ f.desc }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">Đặc điểm cốt lõi</div>
              <div class="feature-list">
                <div v-for="feat in currentPm.features" :key="feat" class="feature-tag">{{ feat }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pm-placeholder">
          ← Click vào thẻ phía trên để xem chi tiết
        </div>
      </transition>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong> Package manager = app store, giúp bạn tải về, cài đặt, quản lý code do người khác viết sẵn (thư viện/package), và tự xử lý vấn đề tương thích version.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeEco = ref('js')
const activePm = ref('npm')


const ecosystems = [
  { id: 'js', icon: '🟨', name: 'JavaScript' },
  { id: 'python', icon: '🐍', name: 'Python' },
  { id: 'rust', icon: '🦀', name: 'Rust' },
  { id: 'go', icon: '🐹', name: 'Go' },
  { id: 'mac', icon: '🍎', name: 'macOS/Linux' },
  { id: 'windows', icon: '🪟', name: 'Windows' }
]

const allManagers = {
  js: [
    {
      id: 'npm',
      name: 'npm',
      fullName: 'Node Package Manager',
      tagline: 'Phổ biến nhất, đi kèm Node.js',
      color: '#cc3534',
      commands: [
        { op: 'Cài dependency', cmd: 'npm install lodash' },
        { op: 'Cài dev dependency', cmd: 'npm install -D typescript' },
        { op: 'Chạy script', cmd: 'npm run build' },
        { op: 'Xem đã cài', cmd: 'npm list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: 'File khai báo dự án, ghi dependency và script' },
        { name: 'package-lock.json', desc: 'Khóa version chính xác, đảm bảo môi trường nhất quán' },
        { name: 'node_modules/', desc: 'Thư mục chứa package đã cài thực tế' }
      ],
      features: ['Đi kèm Node.js', 'Hệ sinh thái lớn nhất (2 triệu+ package)', 'Hỗ trợ workspaces', 'npx chạy trực tiếp']
    },
    {
      id: 'yarn',
      name: 'Yarn',
      fullName: 'Yet Another Resource Negotiator',
      tagline: 'Tải song song nhanh, Plug\'n\'Play khỏi cần node_modules',
      color: '#2c8ebb',
      commands: [
        { op: 'Cài dependency', cmd: 'yarn add lodash' },
        { op: 'Cài dev dependency', cmd: 'yarn add -D typescript' },
        { op: 'Chạy script', cmd: 'yarn build' },
        { op: 'Xem đã cài', cmd: 'yarn list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: 'File khai báo dự án, tương thích với npm' },
        { name: 'yarn.lock', desc: 'Lock file riêng của Yarn, định dạng dễ đọc hơn' },
        { name: '.yarnrc.yml', desc: 'File cấu hình của Yarn Berry' }
      ],
      features: ['Cài song song nhanh hơn', 'Plug\'n\'Play không cần node_modules', 'Hỗ trợ Workspace gốc', 'Cache offline']
    },
    {
      id: 'pnpm',
      name: 'pnpm',
      fullName: 'Performant npm',
      tagline: 'Dùng hard link chung, tiết kiệm ổ đĩa, tốc độ nhanh nhất',
      color: '#f9ad00',
      commands: [
        { op: 'Cài dependency', cmd: 'pnpm add lodash' },
        { op: 'Cài dev dependency', cmd: 'pnpm add -D typescript' },
        { op: 'Chạy script', cmd: 'pnpm run build' },
        { op: 'Xem đã cài', cmd: 'pnpm list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: 'File khai báo dự án, tương thích với npm' },
        { name: 'pnpm-lock.yaml', desc: 'Lock file riêng của pnpm' },
        { name: '.pnpm-store/', desc: 'Kho lưu trữ toàn cục theo nội dung, chia sẻ giữa nhiều dự án' }
      ],
      features: ['Tiết kiệm ổ đĩa nhất', 'Cài nhanh nhất', 'Cách ly nghiêm ngặt, chống phantom dependency', 'Thân thiện với monorepo']
    }
  ],
  python: [
    {
      id: 'pip',
      name: 'pip',
      fullName: 'Pip Installs Packages',
      tagline: 'Chuẩn chính thức của Python, đơn giản và trực tiếp',
      color: '#3776ab',
      commands: [
        { op: 'Cài package', cmd: 'pip install requests' },
        { op: 'Cài version cụ thể', cmd: 'pip install requests==2.28.0' },
        { op: 'Export dependency', cmd: 'pip freeze > requirements.txt' },
        { op: 'Cài hàng loạt', cmd: 'pip install -r requirements.txt' }
      ],
      files: [
        { name: 'requirements.txt', desc: 'Danh sách dependency, mỗi dòng một package và version' },
        { name: 'setup.py / pyproject.toml', desc: 'Metadata và cấu hình đóng gói dự án' }
      ],
      features: ['Đi kèm Python', 'Được dùng nhiều nhất', 'Kết hợp venv để cách ly môi trường', 'Đơn giản trực tiếp']
    },
    {
      id: 'conda',
      name: 'conda',
      fullName: 'Conda Package Manager',
      tagline: 'Công cụ mạnh cho tính toán khoa học, đồng thời quản lý version Python',
      color: '#44a833',
      commands: [
        { op: 'Tạo môi trường', cmd: 'conda create -n myenv python=3.11' },
        { op: 'Kích hoạt môi trường', cmd: 'conda activate myenv' },
        { op: 'Cài package', cmd: 'conda install numpy' },
        { op: 'Export môi trường', cmd: 'conda env export > env.yml' }
      ],
      files: [
        { name: 'environment.yml', desc: 'Cấu hình môi trường đầy đủ, bao gồm version Python' },
        { name: '.condarc', desc: 'File cấu hình toàn cục của conda' }
      ],
      features: ['Quản lý version Python', 'Hỗ trợ package non-Python (CUDA, ...)', 'Lựa chọn hàng đầu cho khoa học tính toán', 'Tái tạo môi trường đa nền tảng']
    },
    {
      id: 'uv',
      name: 'uv',
      fullName: 'Ultra-fast Python Package Manager',
      tagline: 'Viết bằng Rust, nhanh hơn pip 10-100 lần',
      color: '#7c3aed',
      commands: [
        { op: 'Cài package', cmd: 'uv pip install requests' },
        { op: 'Tạo virtual env', cmd: 'uv venv' },
        { op: 'Đồng bộ dependency', cmd: 'uv pip sync requirements.txt' },
        { op: 'Chạy script', cmd: 'uv run python script.py' }
      ],
      files: [
        { name: 'requirements.txt', desc: 'File dependency tương thích hoàn toàn với pip' },
        { name: 'pyproject.toml', desc: 'Chuẩn cấu hình dự án Python hiện đại' }
      ],
      features: ['Viết bằng Rust cực nhanh', 'Tương thích hoàn toàn với pip', 'Quản lý virtual env tích hợp', 'Tân binh năm 2024']
    }
  ],
  rust: [
    {
      id: 'cargo',
      name: 'Cargo',
      fullName: 'Rust\'s Package Manager & Build System',
      tagline: 'Công cụ chính thức của Rust, gói gọn build/test/publish trong một',
      color: '#dea584',
      commands: [
        { op: 'Thêm dependency', cmd: 'cargo add serde' },
        { op: 'Build dự án', cmd: 'cargo build --release' },
        { op: 'Chạy dự án', cmd: 'cargo run' },
        { op: 'Chạy test', cmd: 'cargo test' }
      ],
      files: [
        { name: 'Cargo.toml', desc: 'Manifest dự án, khai báo dependency và metadata' },
        { name: 'Cargo.lock', desc: 'Khóa version chính xác, bắt buộc commit với dự án ứng dụng' }
      ],
      features: ['Chuẩn duy nhất chính thức', 'Build system tích hợp', 'Package = Crate', 'Hệ sinh thái crates.io']
    }
  ],
  go: [
    {
      id: 'gomod',
      name: 'Go Modules',
      fullName: 'Hệ thống module chính thức của Go (go mod)',
      tagline: 'Tích hợp sẵn trong toolchain Go, không cần cài thêm',
      color: '#00acd7',
      commands: [
        { op: 'Khởi tạo module', cmd: 'go mod init github.com/user/project' },
        { op: 'Thêm dependency', cmd: 'go get github.com/gin-gonic/gin' },
        { op: 'Dọn dependency', cmd: 'go mod tidy' },
        { op: 'Tải về máy', cmd: 'go mod download' }
      ],
      files: [
        { name: 'go.mod', desc: 'File khai báo module, ghi đường dẫn và version dependency' },
        { name: 'go.sum', desc: 'File kiểm tra hash, ngăn dependency bị giả mạo' }
      ],
      features: ['Tích hợp trong toolchain Go', 'Đường dẫn chính là tên package', 'Tự kiểm tra tính toàn vẹn', 'Hệ sinh thái pkg.go.dev']
    }
  ],
  mac: [
    {
      id: 'brew',
      name: 'Homebrew',
      fullName: 'The Missing Package Manager for macOS',
      tagline: 'Cần có trên macOS/Linux, lựa chọn hàng đầu để cài công cụ dev',
      color: '#fbb040',
      commands: [
        { op: 'Cài phần mềm', cmd: 'brew install git' },
        { op: 'Update tất cả', cmd: 'brew upgrade' },
        { op: 'Tìm phần mềm', cmd: 'brew search node' },
        { op: 'Xem đã cài', cmd: 'brew list' }
      ],
      files: [
        { name: 'Brewfile', desc: 'Danh sách cài hàng loạt, có thể quản lý version' }
      ],
      features: ['Dùng được trên macOS/Linux', 'Quản lý công cụ cấp hệ thống', 'Cask để cài app GUI', 'Cộng đồng driven']
    },
    {
      id: 'apt',
      name: 'apt',
      fullName: 'Advanced Package Tool',
      tagline: 'Package manager hệ thống của Ubuntu/Debian',
      color: '#e95420',
      commands: [
        { op: 'Cập nhật danh sách', cmd: 'sudo apt update' },
        { op: 'Cài phần mềm', cmd: 'sudo apt install nginx' },
        { op: 'Update hệ thống', cmd: 'sudo apt upgrade' },
        { op: 'Gỡ phần mềm', cmd: 'sudo apt remove nginx' }
      ],
      files: [
        { name: '/etc/apt/sources.list', desc: 'File cấu hình nguồn phần mềm' }
      ],
      features: ['Chính thức của Ubuntu/Debian', 'Quyền cấp hệ thống', 'Tự phân giải dependency', 'Cần thiết cho devops server']
    },
    {
      id: 'dnf',
      name: 'dnf / yum',
      fullName: 'Dandified YUM (Fedora / RHEL / CentOS)',
      tagline: 'Package manager hệ thống cho dòng Linux Red Hat',
      color: '#e00',
      commands: [
        { op: 'Cài phần mềm', cmd: 'sudo dnf install git' },
        { op: 'Update hệ thống', cmd: 'sudo dnf upgrade' },
        { op: 'Tìm phần mềm', cmd: 'dnf search nginx' },
        { op: 'Gỡ phần mềm', cmd: 'sudo dnf remove nginx' }
      ],
      files: [
        { name: '/etc/dnf/dnf.conf', desc: 'File cấu hình toàn cục của dnf' }
      ],
      features: ['Chính thức của Fedora/RHEL/CentOS', 'Hỗ trợ module stream', 'DNF5 tăng tốc mạnh', 'Lựa chọn hàng đầu cho Linux doanh nghiệp']
    }
  ],
  windows: [
    {
      id: 'winget',
      name: 'winget',
      fullName: 'Windows Package Manager',
      tagline: 'Sản phẩm chính thức của Microsoft, có sẵn trong Win 10/11',
      color: '#0078d4',
      commands: [
        { op: 'Cài phần mềm', cmd: 'winget install Git.Git' },
        { op: 'Update tất cả', cmd: 'winget upgrade --all' },
        { op: 'Tìm phần mềm', cmd: 'winget search nodejs' },
        { op: 'Gỡ phần mềm', cmd: 'winget uninstall Git.Git' }
      ],
      files: [
        { name: 'winget-packages.json', desc: 'Danh sách phần mềm xuất ra, dùng để khôi phục hàng loạt' }
      ],
      features: ['Có sẵn trong Windows 10/11', 'Tích hợp Microsoft Store', 'Xác thực chữ ký package', 'Đang được Microsoft cập nhật liên tục']
    },
    {
      id: 'choco',
      name: 'Chocolatey',
      fullName: 'Chocolatey Package Manager',
      tagline: 'Package manager bên thứ ba trưởng thành nhất trên Windows',
      color: '#4a154b',
      commands: [
        { op: 'Cài phần mềm', cmd: 'choco install git' },
        { op: 'Update tất cả', cmd: 'choco upgrade all' },
        { op: 'Tìm phần mềm', cmd: 'choco search nodejs' },
        { op: 'Gỡ phần mềm', cmd: 'choco uninstall git' }
      ],
      files: [
        { name: 'packages.config', desc: 'Danh sách phần mềm dạng XML, dùng để cài hàng loạt' }
      ],
      features: ['Hệ sinh thái trưởng thành nhất (10000+ package)', 'Bản doanh nghiệp hỗ trợ thương mại', 'Tích hợp PowerShell', 'Hỗ trợ cài không cần giám sát']
    },
    {
      id: 'scoop',
      name: 'Scoop',
      fullName: 'Scoop — A command-line installer for Windows',
      tagline: 'Không cần quyền admin, thiết kế riêng cho developer',
      color: '#1a73e8',
      commands: [
        { op: 'Cài phần mềm', cmd: 'scoop install git' },
        { op: 'Update tất cả', cmd: 'scoop update *' },
        { op: 'Tìm phần mềm', cmd: 'scoop search nodejs' },
        { op: 'Gỡ phần mềm', cmd: 'scoop uninstall git' }
      ],
      files: [
        { name: 'Scoopfile / apps.json', desc: 'Danh sách app, dùng để khôi phục môi trường' }
      ],
      features: ['Không cần quyền admin', 'Cài vào thư mục user', 'Tồn tại song song nhiều version', 'Lựa chọn hàng đầu cho công cụ dev']
    }
  ]
}

const currentManagers = computed(() => allManagers[activeEco.value] || [])

const currentPm = computed(() => {
  const list = currentManagers.value
  return list.find(p => p.id === activePm.value) || null
})

function selectEco(id) {
  activeEco.value = id
  activePm.value = allManagers[id]?.[0]?.id || null
}

function selectPm(id) {
  activePm.value = id
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem 0.7rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.eco-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}

.eco-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.eco-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.eco-icon {
  font-size: 1rem;
}

.visualization-area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.managers-grid {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pm-card {
  flex: 1;
  min-width: 100px;
  padding: 0.6rem 0.8rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--vp-c-bg-soft);
}

.pm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.pm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand) 20%, transparent);
}

.pm-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.pm-tagline {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.pm-detail {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.9rem 1rem;
}

.pm-placeholder {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.detail-top {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-name {
  font-size: 1.05rem;
  font-weight: 700;
}

.detail-full {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.detail-sections {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.8rem;
}

@media (max-width: 640px) {
  .detail-sections {
    grid-template-columns: 1fr;
  }
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cmd-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.cmd-op {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.cmd-code {
  font-size: 0.76rem;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.file-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.file-name {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  width: fit-content;
}

.file-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.feature-tag {
  font-size: 0.73rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.info-box {
  display: block;
  padding: 0.65rem 1rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box strong {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
