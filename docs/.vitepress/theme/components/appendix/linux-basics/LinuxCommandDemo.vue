<!--
  LinuxCommandDemo.vue
  Tra cứu các lệnh Linux phổ biến theo nhóm
-->
<template>
  <div class="linux-cmd-demo">
    <div class="header">
      <div class="title">Tra cứu lệnh Linux</div>
      <div class="subtitle">Chọn nhóm để xem các lệnh hay dùng và ví dụ</div>
    </div>

    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['cat-btn', { active: activeCat === cat.key }]"
        @click="activeCat = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <div v-if="current" class="cmd-list">
      <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-card">
        <div class="cmd-header">
          <code class="cmd-name">{{ cmd.name }}</code>
          <span class="cmd-brief">{{ cmd.brief }}</span>
        </div>
        <div class="cmd-example">
          <code>{{ cmd.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCat = ref('file')

const categories = [
  {
    key: 'file',
    label: 'Thao tác file',
    commands: [
      { name: 'ls', brief: 'Liệt kê file và thư mục', example: 'ls -la /home' },
      { name: 'cd', brief: 'Chuyển thư mục', example: 'cd /var/log' },
      { name: 'cp', brief: 'Copy file', example: 'cp -r src/ backup/' },
      { name: 'mv', brief: 'Di chuyển/đổi tên', example: 'mv old.txt new.txt' },
      { name: 'rm', brief: 'Xóa file', example: 'rm -rf dist/' },
      { name: 'mkdir', brief: 'Tạo thư mục', example: 'mkdir -p src/components' },
      { name: 'find', brief: 'Tìm file', example: 'find . -name "*.js" -type f' }
    ]
  },
  {
    key: 'text',
    label: 'Xử lý văn bản',
    commands: [
      { name: 'cat', brief: 'Xem nội dung file', example: 'cat config.json' },
      { name: 'grep', brief: 'Tìm trong nội dung', example: 'grep -rn "ERROR" /var/log/' },
      { name: 'head/tail', brief: 'Xem đầu/cuối file', example: 'tail -f app.log' },
      { name: 'awk', brief: 'Xử lý văn bản theo cột', example: "awk '{print $1, $3}' data.txt" },
      { name: 'sed', brief: 'Thay thế văn bản kiểu stream', example: "sed -i 's/old/new/g' file.txt" },
      { name: 'wc', brief: 'Đếm dòng/từ/ký tự', example: 'wc -l *.js' },
      { name: 'sort | uniq', brief: 'Sắp xếp và loại trùng', example: 'sort data.txt | uniq -c' }
    ]
  },
  {
    key: 'process',
    label: 'Quản lý tiến trình',
    commands: [
      { name: 'ps', brief: 'Xem tiến trình', example: 'ps aux | grep node' },
      { name: 'top/htop', brief: 'Monitor real-time', example: 'top -o %CPU' },
      { name: 'kill', brief: 'Kết thúc tiến trình', example: 'kill -9 12345' },
      { name: 'nohup', brief: 'Chạy nền', example: 'nohup node app.js &' },
      { name: 'lsof', brief: 'Xem file đang mở', example: 'lsof -i :3000' },
      { name: 'systemctl', brief: 'Quản lý dịch vụ hệ thống', example: 'systemctl restart nginx' }
    ]
  },
  {
    key: 'network',
    label: 'Công cụ mạng',
    commands: [
      { name: 'curl', brief: 'Gửi HTTP request', example: 'curl -X POST -d "data" url' },
      { name: 'ping', brief: 'Kiểm tra kết nối', example: 'ping -c 4 google.com' },
      { name: 'ss/netstat', brief: 'Xem kết nối mạng', example: 'ss -tlnp' },
      { name: 'dig', brief: 'Truy vấn DNS', example: 'dig example.com' },
      { name: 'ssh', brief: 'Đăng nhập từ xa', example: 'ssh user@server -p 22' },
      { name: 'scp', brief: 'Copy file qua mạng', example: 'scp file.txt user@server:/tmp/' }
    ]
  }
]

const current = computed(() => categories.find(c => c.key === activeCat.value))
</script>

<style scoped>
.linux-cmd-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.cat-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.cat-btn:hover { border-color: var(--vp-c-brand); }
.cat-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.cmd-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
}
.cmd-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.cmd-name {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
.cmd-brief {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.cmd-example code {
  font-size: 0.73rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}
</style>
