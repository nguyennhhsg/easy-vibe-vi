<!--
  K8sArchitectureDemo.vue
  Kiến trúc Kubernetes: Control Plane và Worker Node
-->
<template>
  <div class="k8s-arch-demo">
    <div class="header">
      <div class="title">Kiến trúc Kubernetes</div>
      <div class="subtitle">Bấm vào từng component để xem chi tiết</div>
    </div>

    <div class="arch-layout">
      <div class="plane control-plane">
        <div class="plane-title">Control Plane</div>
        <div class="components">
          <div
            v-for="c in controlPlane"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>

      <div class="plane worker-plane">
        <div class="plane-title">Worker Node × N</div>
        <div class="components">
          <div
            v-for="c in workerNode"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-analogy">
        <span class="label">Hình dung:</span> {{ current.analogy }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('api-server')

const controlPlane = [
  {
    key: 'api-server',
    name: 'API Server',
    desc: '&quot;Cửa chính&quot; của Kubernetes - mọi thao tác (kubectl, Dashboard, component nội bộ) đều đi qua API Server. Nó lo authentication, authorization, admission control và là điểm vào duy nhất của cluster.',
    analogy: 'Quầy lễ tân của công ty, mọi khách và bưu kiện đều phải qua đây đăng ký'
  },
  {
    key: 'etcd',
    name: 'etcd',
    desc: 'Key-value store phân tán, lưu mọi trạng thái cluster: thông tin Pod, cấu hình Service, Secret... Đây là &quot;ký ức&quot; của cluster, mất etcd coi như mất luôn cluster.',
    analogy: 'Phòng lưu trữ hồ sơ - lưu thông tin nhân viên và mọi quy định công ty'
  },
  {
    key: 'scheduler',
    name: 'Scheduler',
    desc: 'Lo việc xếp Pod mới tạo vào node phù hợp. Nó cân nhắc nhu cầu tài nguyên, affinity, taint/toleration... để ra quyết định scheduling tối ưu.',
    analogy: 'Phòng HR - dựa vào yêu cầu vị trí để xếp người mới vào đúng bộ phận'
  },
  {
    key: 'controller',
    name: 'Controller Manager',
    desc: 'Chạy các controller (Deployment, ReplicaSet, Job...), liên tục theo dõi trạng thái cluster để đảm bảo trạng thái thực tế khớp trạng thái mong muốn. Pod chết thì controller tự dựng lại.',
    analogy: 'Các trưởng bộ phận - đảm bảo nhân sự mỗi phòng đủ theo biên chế'
  }
]

const workerNode = [
  {
    key: 'kubelet',
    name: 'kubelet',
    desc: 'Agent trên mỗi node, quản lý vòng đời Pod cục bộ. Nó nhận lệnh từ API Server, gọi container runtime để tạo/hủy container và báo cáo trạng thái node lên.',
    analogy: 'Trưởng nhóm ngồi ngay tại chỗ làm, quản lý công việc hằng ngày của nhóm'
  },
  {
    key: 'kube-proxy',
    name: 'kube-proxy',
    desc: 'Triển khai network rule của Service, chuyển traffic tới Pod tương ứng. Nó duy trì rule iptables/IPVS trên node để load balance.',
    analogy: 'Tổng đài điện thoại - chuyển cuộc gọi từ ngoài vào đúng máy nhánh'
  },
  {
    key: 'runtime',
    name: 'Container runtime',
    desc: 'Component thực sự chạy container, ví dụ containerd, CRI-O. kubelet trao đổi với nó qua CRI (Container Runtime Interface) để pull image, tạo và quản lý container.',
    analogy: 'Công nhân làm việc thực sự, theo chỉ thị mà hoàn thành nhiệm vụ'
  }
]

const allComponents = [...controlPlane, ...workerNode]
const current = computed(() => allComponents.find(c => c.key === active.value))
</script>

<style scoped>
.k8s-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .arch-layout { grid-template-columns: 1fr; }
}
.plane {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.control-plane { background: rgba(59, 130, 246, 0.06); }
.worker-plane { background: rgba(34, 197, 94, 0.06); }
.plane-title {
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}
.components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.comp-card {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all 0.2s;
}
.comp-card:hover { border-color: var(--vp-c-brand); }
.comp-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.detail-analogy {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
