<!--
  DockerLifecycleDemo.vue
  Vòng đời Docker: từ build image tới container chạy
-->
<template>
  <div class="docker-lifecycle-demo">
    <div class="header">
      <div class="title">Vòng đời Docker</div>
      <div class="subtitle">Bấm vào từng giai đoạn để xem chi tiết</div>
    </div>

    <div class="stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-card', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="command-block">
        <div class="cmd-label">Lệnh hay dùng</div>
        <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-item">
          <code>{{ cmd.cmd }}</code>
          <span class="cmd-desc">{{ cmd.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('write')

const stages = [
  {
    key: 'write',
    name: 'Viết Dockerfile',
    icon: '📝',
    desc: 'Dockerfile là &quot;công thức&quot; để build image, mô tả từ base image cách bạn dựng lên môi trường ứng dụng từng bước. Mỗi chỉ thị tạo một lớp image (layer), Docker cache các lớp này để build lần sau nhanh hơn.',
    commands: [
      { cmd: 'FROM node:18-alpine', desc: 'Chỉ định base image' },
      { cmd: 'WORKDIR /app', desc: 'Đặt thư mục làm việc' },
      { cmd: 'COPY package*.json ./', desc: 'Copy file dependency (tận dụng cache)' },
      { cmd: 'RUN npm install', desc: 'Cài dependency' },
      { cmd: 'COPY . .', desc: 'Copy code ứng dụng' },
      { cmd: 'EXPOSE 3000', desc: 'Khai báo port' },
      { cmd: 'CMD ["node", "server.js"]', desc: 'Lệnh khởi động' }
    ]
  },
  {
    key: 'build',
    name: 'Build image',
    icon: '🔨',
    desc: 'Lệnh docker build đọc Dockerfile, chạy từng chỉ thị theo layer rồi sinh ra một image bất biến. Image là template chỉ đọc, chứa mọi thứ cần để chạy app: code, runtime, library, biến môi trường.',
    commands: [
      { cmd: 'docker build -t myapp:1.0 .', desc: 'Build và gắn tag' },
      { cmd: 'docker images', desc: 'Xem danh sách image local' },
      { cmd: 'docker image prune', desc: 'Dọn image không dùng' }
    ]
  },
  {
    key: 'push',
    name: 'Push lên registry',
    icon: '☁️',
    desc: 'Đẩy image đã build lên registry (Docker Hub, Aliyun ACR, AWS ECR...). Thành viên trong team và môi trường deploy đều kéo image từ registry, đúng tinh thần &quot;build một lần, chạy khắp nơi&quot;.',
    commands: [
      { cmd: 'docker tag myapp:1.0 registry/myapp:1.0', desc: 'Gắn tag remote cho image' },
      { cmd: 'docker push registry/myapp:1.0', desc: 'Đẩy lên registry' },
      { cmd: 'docker pull registry/myapp:1.0', desc: 'Kéo về từ registry' }
    ]
  },
  {
    key: 'run',
    name: 'Chạy container',
    icon: '▶️',
    desc: 'Container là một instance đang chạy của image. Một image có thể bật nhiều container, mỗi container có filesystem, network và process space riêng. Container rất nhẹ, khởi động chỉ tính bằng giây.',
    commands: [
      { cmd: 'docker run -d -p 3000:3000 myapp:1.0', desc: 'Chạy nền và map port' },
      { cmd: 'docker ps', desc: 'Xem container đang chạy' },
      { cmd: 'docker logs <container>', desc: 'Xem log container' },
      { cmd: 'docker exec -it <container> sh', desc: 'Vào terminal trong container' }
    ]
  },
  {
    key: 'manage',
    name: 'Quản lý container',
    icon: '⚙️',
    desc: 'Sau khi chạy, container cần được monitor, stop, restart hay xóa. Docker Compose giúp bạn orchestrate nhiều container, mô tả dependency và network giữa các service.',
    commands: [
      { cmd: 'docker stop <container>', desc: 'Dừng container' },
      { cmd: 'docker restart <container>', desc: 'Restart container' },
      { cmd: 'docker rm <container>', desc: 'Xóa container' },
      { cmd: 'docker compose up -d', desc: 'Bật nhiều service bằng Compose' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.docker-lifecycle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.stages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.stage-card {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-card:hover { border-color: var(--vp-c-brand); }
.stage-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.stage-icon { font-size: 1.1rem; }
.stage-name { font-size: 0.8rem; font-weight: 600; }
.arrow { color: var(--vp-c-text-3); font-size: 0.9rem; margin: 0 0.1rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.command-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
}
.cmd-label { font-weight: 600; font-size: 0.78rem; margin-bottom: 0.4rem; color: var(--vp-c-text-2); }
.cmd-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.78rem;
}
.cmd-item code {
  background: var(--vp-c-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  color: var(--vp-c-brand);
}
.cmd-desc { color: var(--vp-c-text-3); }
</style>
