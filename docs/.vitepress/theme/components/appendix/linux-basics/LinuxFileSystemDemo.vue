<!--
  LinuxFileSystemDemo.vue
  Cây thư mục Linux
-->
<template>
  <div class="linux-fs-demo">
    <div class="header">
      <div class="title">Cây thư mục Linux</div>
      <div class="subtitle">Bấm vào thư mục để xem mô tả</div>
    </div>

    <div class="tree">
      <div
        v-for="dir in dirs"
        :key="dir.path"
        :class="['dir-item', { active: activeDir === dir.path }]"
        @click="activeDir = dir.path"
      >
        <span class="dir-icon">{{ dir.icon }}</span>
        <span class="dir-path">{{ dir.path }}</span>
        <span class="dir-brief">{{ dir.brief }}</span>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.path }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div v-if="current.examples.length" class="examples">
        <div class="ex-label">Thường gặp:</div>
        <div class="ex-list">
          <span v-for="(ex, i) in current.examples" :key="i" class="ex-tag">{{ ex }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDir = ref('/')

const dirs = [
  { path: '/', icon: '📁', brief: 'Thư mục gốc', desc: 'Điểm bắt đầu của toàn bộ filesystem, mọi thư mục và file đều bắt nguồn từ đây. Trong Linux mọi thứ đều là file - thiết bị và thông tin tiến trình đều xuất hiện dưới dạng file trong cây thư mục này.', examples: [] },
  { path: '/bin', icon: '⚙️', brief: 'Lệnh cơ bản', desc: 'Chứa binary của các lệnh cơ bản cần thiết khi boot và ở chế độ single user. Mọi user đều dùng được.', examples: ['ls', 'cp', 'mv', 'cat', 'grep', 'chmod'] },
  { path: '/etc', icon: '📋', brief: 'File cấu hình', desc: 'Chứa file cấu hình của hệ thống và ứng dụng. Gần như mọi phần mềm đặt cấu hình ở đây, sửa cấu hình là việc hằng ngày của Linux admin.', examples: ['nginx.conf', 'hosts', 'passwd', 'ssh/sshd_config', 'crontab'] },
  { path: '/home', icon: '🏠', brief: 'Home user', desc: 'Thư mục home của user thường. Mỗi user có một thư mục con đặt theo tên user để chứa file và cấu hình cá nhân.', examples: ['/home/alice', '/home/bob', '~/.bashrc', '~/.ssh/'] },
  { path: '/var', icon: '📊', brief: 'Dữ liệu biến đổi', desc: 'Chứa dữ liệu thay đổi khi chạy: log, cache, mail, file database... Khi debug bạn rất hay phải xem log ở đây.', examples: ['/var/log/', '/var/cache/', '/var/lib/mysql/', '/var/www/'] },
  { path: '/tmp', icon: '🗑️', brief: 'File tạm', desc: 'Chứa file tạm, thường bị xóa khi reboot. Mọi user đều có quyền ghi, thích hợp lưu file trung gian không cần giữ lại.', examples: ['File trung gian khi build', 'Cache tải về', 'Dữ liệu tạm của session'] },
  { path: '/usr', icon: '📦', brief: 'Chương trình user', desc: 'Chứa chương trình, library và tài liệu do user cài. Hiểu là "Unix System Resources", một trong những thư mục lớn nhất.', examples: ['/usr/bin/', '/usr/lib/', '/usr/local/', '/usr/share/'] },
  { path: '/proc', icon: '🔍', brief: 'Thông tin tiến trình', desc: 'Filesystem ảo, không chiếm disk. Kernel phơi thông tin tiến trình và hệ thống dưới dạng file ở đây, là nguồn dữ liệu quan trọng để monitor và debug.', examples: ['/proc/cpuinfo', '/proc/meminfo', '/proc/[pid]/status'] },
  { path: '/dev', icon: '🔌', brief: 'File thiết bị', desc: 'Chứa file thiết bị. Trong Linux phần cứng cũng là file, bạn đọc/ghi vào file này để giao tiếp với phần cứng.', examples: ['/dev/sda', '/dev/null', '/dev/zero', '/dev/tty'] }
]

const current = computed(() => dirs.find(d => d.path === activeDir.value))
</script>

<style scoped>
.linux-fs-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.tree {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.dir-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 0.82rem;
}
.dir-item:hover { border-color: var(--vp-c-divider); }
.dir-item.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.dir-icon { font-size: 0.9rem; }
.dir-path { font-weight: 700; font-family: var(--vp-font-family-mono); min-width: 60px; }
.dir-brief { color: var(--vp-c-text-3); font-size: 0.78rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  font-family: var(--vp-font-family-mono);
  margin-bottom: 0.4rem;
}
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; line-height: 1.6; }
.examples { margin-top: 0.4rem; }
.ex-label { font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 0.3rem; }
.ex-list { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.ex-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}
</style>
