<!--
  K8sWorkloadsDemo.vue
  Các tài nguyên cốt lõi của Kubernetes: Pod, Deployment, Service...
-->
<template>
  <div class="k8s-workloads-demo">
    <div class="header">
      <div class="title">Tài nguyên cốt lõi của K8s</div>
      <div class="subtitle">Bấm vào từng loại để xem mô tả và YAML mẫu</div>
    </div>

    <div class="resource-tabs">
      <button
        v-for="r in resources"
        :key="r.key"
        :class="['res-btn', { active: activeRes === r.key }]"
        @click="activeRes = r.key"
      >
        {{ r.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }}</div>
        <div class="detail-badge">{{ current.category }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="yaml-block">
        <div class="yaml-label">YAML mẫu</div>
        <pre class="yaml-code"><code>{{ current.yaml }}</code></pre>
      </div>
      <div v-if="current.tips" class="tips">
        <span class="tip-label">Lưu ý:</span> {{ current.tips }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeRes = ref('pod')

const resources = [
  {
    key: 'pod',
    name: 'Pod',
    category: 'Đơn vị schedule nhỏ nhất',
    desc: 'Pod là đơn vị deploy nhỏ nhất trong K8s, chứa một hoặc nhiều container gắn bó chặt chẽ. Các container trong cùng Pod share chung network và storage, có thể giao tiếp với nhau qua localhost.',
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:1.0
      ports:
        - containerPort: 3000`,
    tips: 'Trong production hiếm khi tạo Pod trực tiếp, thường quản lý qua Deployment.'
  },
  {
    key: 'deployment',
    name: 'Deployment',
    category: 'Workload',
    desc: 'Deployment quản lý số replica của Pod, rolling update và rollback. Bạn khai báo &quot;muốn 3 replica chạy v1.0&quot;, controller của Deployment sẽ đảm bảo luôn có 3 Pod khỏe đang chạy.',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:1.0`,
    tips: 'Sau khi đổi version image, Deployment tự rolling update, thay từng Pod cũ.'
  },
  {
    key: 'service',
    name: 'Service',
    category: 'Network',
    desc: 'Service cung cấp một entry ổn định cho một nhóm Pod. IP của Pod hay thay đổi, nhưng ClusterIP và DNS name của Service không đổi. Nó dùng label selector để tìm Pod tương ứng và làm load balancing.',
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP`,
    tips: 'ClusterIP (truy cập trong cluster), NodePort (port trên node), LoadBalancer (load balancer của cloud) là ba loại hay dùng.'
  },
  {
    key: 'configmap',
    name: 'ConfigMap',
    category: 'Cấu hình',
    desc: 'ConfigMap lưu cấu hình không nhạy cảm (địa chỉ database, feature flag...) và có thể mount vào Pod dưới dạng biến môi trường hoặc file. Sửa ConfigMap có thể cập nhật cấu hình mà không cần build lại image.',
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "db.example.com"
  LOG_LEVEL: "info"`,
    tips: 'Dữ liệu nhạy cảm (mật khẩu, key) nên dùng Secret thay vì ConfigMap.'
  },
  {
    key: 'ingress',
    name: 'Ingress',
    category: 'Network',
    desc: 'Ingress quản lý entry HTTP/HTTPS từ bên ngoài vào cluster, hỗ trợ routing theo domain và path. Nó là &quot;reverse proxy&quot; của cluster, thường dùng cùng Nginx Ingress Controller.',
    yaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app-svc
                port:
                  number: 80`,
    tips: 'Ingress cần Ingress Controller mới chạy được, bản thân nó chỉ là khai báo routing rule.'
  }
]

const current = computed(() => resources.find(r => r.key === activeRes.value))
</script>

<style scoped>
.k8s-workloads-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.resource-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.res-btn {
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
.res-btn:hover { border-color: var(--vp-c-brand); }
.res-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-badge {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.yaml-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
}
.yaml-label {
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.yaml-code {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}
.tips {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: rgba(245, 158, 11, 0.08);
  border-radius: 6px;
}
.tip-label { font-weight: 600; }
</style>
