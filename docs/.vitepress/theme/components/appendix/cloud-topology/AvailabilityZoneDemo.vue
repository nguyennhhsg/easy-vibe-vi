<template>
  <div class="availability-zone-demo">
    <!-- Bảng điều khiển -->
    <div class="control-panel">
      <el-radio-group
        v-model="viewMode"
        size="small"
      >
        <el-radio-button label="normal">
          Hoạt động bình thường
        </el-radio-button>
        <el-radio-button label="az-failure">
          Sự cố 1 AZ
        </el-radio-button>
        <el-radio-button label="maintenance">
          Bảo trì
        </el-radio-button>
        <el-radio-button label="scaling">
          Auto scaling
        </el-radio-button>
      </el-radio-group>

      <el-switch
        v-model="showTraffic"
        active-text="Hiện traffic"
        style="margin-left: 20px"
      />
    </div>

    <!-- Sơ đồ kiến trúc -->
    <div class="architecture-container">
      <!-- Lớp entry traffic -->
      <div class="layer entry-layer">
        <div class="layer-title">
          🚪 Lớp entry traffic
        </div>
        <div class="entry-components">
          <div class="component dns">
            <div class="component-icon">
              📖
            </div>
            <div class="component-name">
              DNS resolution
            </div>
          </div>

          <div class="arrow">
            →
          </div>

          <div class="component cdn">
            <div class="component-icon">
              🌐
            </div>
            <div class="component-name">
              CDN tăng tốc
            </div>
          </div>

          <div class="arrow">
            →
          </div>

          <div class="component waf">
            <div class="component-icon">
              🛡️
            </div>
            <div class="component-name">
              WAF bảo vệ
            </div>
          </div>
        </div>
      </div>

      <!-- Lớp phân phối traffic -->
      <div class="layer distribution-layer">
        <div class="layer-title">
          ⚖️ Lớp phân phối traffic (SLB)
        </div>
        <div
          class="slb-cluster"
          :class="{ 'failover-active': viewMode === 'az-failure' }"
        >
          <div
            class="slb-instance primary"
            :class="{ failed: viewMode === 'az-failure' }"
          >
            <div class="instance-header">
              <span
                class="status-indicator"
                :class="viewMode === 'az-failure' ? 'offline' : 'online'"
              />
              <span class="instance-name">SLB-A (primary)</span>
            </div>
            <div class="instance-meta">
              AZ A
            </div>

            <!-- Animation traffic -->
            <div
              v-if="showTraffic && viewMode !== 'az-failure'"
              class="traffic-flow"
            >
              <div class="flow-dot" />
            </div>
          </div>

          <div
            v-if="viewMode === 'az-failure'"
            class="failover-arrow"
          >
            <span class="failover-text">Failover</span>
            <div class="arrow-line" />
          </div>

          <div
            class="slb-instance secondary"
            :class="{ 'taking-over': viewMode === 'az-failure' }"
          >
            <div class="instance-header">
              <span
                class="status-indicator"
                :class="viewMode === 'az-failure' ? 'online' : 'standby'"
              />
              <span class="instance-name">SLB-B (standby)</span>
            </div>
            <div class="instance-meta">
              AZ B
            </div>

            <div
              v-if="showTraffic && viewMode === 'az-failure'"
              class="traffic-flow"
            >
              <div class="flow-dot" />
            </div>
          </div>
        </div>
      </div>

      <!-- Lớp Availability Zone -->
      <div class="layer azs-layer">
        <div class="layer-title">
          🏢 Lớp AZ (Multi-AZ)
        </div>
        <div class="azs-grid">
          <div
            v-for="az in availabilityZones"
            :key="az.id"
            class="az-card"
            :class="{
              'az-a': az.id === 'az-a',
              'az-b': az.id === 'az-b',
              'az-c': az.id === 'az-c',
              'degraded': viewMode === 'az-failure' && az.id === 'az-a',
              'scaling': viewMode === 'scaling'
            }"
          >
            <div class="az-header">
              <div class="az-title">
                <span class="az-name">{{ az.name }}</span>
                <span class="az-id">{{ az.id }}</span>
              </div>
              <div class="az-status">
                <span
                  class="status-badge"
                  :class="getAzStatusClass(az)"
                >
                  {{ getAzStatusText(az) }}
                </span>
              </div>
            </div>

            <div class="az-resources">
              <div
                v-for="resource in az.resources"
                :key="resource.type"
                class="resource-item"
              >
                <span class="resource-icon">{{ resource.icon }}</span>
                <span class="resource-name">{{ resource.name }}</span>
                <span class="resource-count">{{ resource.count }}</span>
              </div>
            </div>

            <!-- Lớp phủ bảo trì -->
            <div
              v-if="viewMode === 'maintenance' && az.id === 'az-a'"
              class="maintenance-overlay"
            >
              <div class="overlay-content">
                <div class="overlay-icon">
                  🔧
                </div>
                <div class="overlay-text">
                  Đang bảo trì
                </div>
              </div>
            </div>

            <!-- Animation auto scaling -->
            <div
              v-if="viewMode === 'scaling'"
              class="scaling-indicator"
            >
              <div class="scaling-dot" />
              <div class="scaling-text">
                Đang scale
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chú thích trạng thái -->
    <div class="status-legend">
      <div class="legend-title">
        Chú thích trạng thái:
      </div>
      <div class="legend-items">
        <div class="legend-item">
          <span class="legend-dot healthy" />
          <span>Healthy</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot standby" />
          <span>Standby</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot degraded" />
          <span>Degraded/Failed</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot maintenance" />
          <span>Đang bảo trì</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('normal')
const showTraffic = ref(false)

const availabilityZones = [
  {
    id: 'az-a',
    name: 'AZ A',
    resources: [
      { type: 'ecs', name: 'ECS instance', icon: '🖥️', count: 8 },
      { type: 'rds', name: 'RDS primary', icon: '🗄️', count: 1 },
      { type: 'redis', name: 'Redis primary', icon: '📦', count: 1 },
      { type: 'slb', name: 'SLB primary', icon: '⚖️', count: 1 }
    ]
  },
  {
    id: 'az-b',
    name: 'AZ B',
    resources: [
      { type: 'ecs', name: 'ECS instance', icon: '🖥️', count: 6 },
      { type: 'rds', name: 'RDS standby', icon: '🗄️', count: 1 },
      { type: 'redis', name: 'Redis standby', icon: '📦', count: 1 },
      { type: 'slb', name: 'SLB standby', icon: '⚖️', count: 1 }
    ]
  },
  {
    id: 'az-c',
    name: 'AZ C',
    resources: [
      { type: 'ecs', name: 'ECS instance', icon: '🖥️', count: 4 },
      { type: 'slb', name: 'SLB standby', icon: '⚖️', count: 1 }
    ]
  }
]

const getAzStatusClass = (az) => {
  switch (viewMode.value) {
    case 'az-failure':
      return az.id === 'az-a' ? 'degraded' : 'healthy'
    case 'maintenance':
      return az.id === 'az-a' ? 'maintenance' : 'standby'
    default:
      return 'healthy'
  }
}

const getAzStatusText = (az) => {
  switch (viewMode.value) {
    case 'az-failure':
      return az.id === 'az-a' ? 'Đang lỗi' : 'Đang takeover'
    case 'maintenance':
      return az.id === 'az-a' ? 'Đang bảo trì' : 'Standby'
    default:
      return 'Hoạt động bình thường'
  }
}
</script>

<style scoped>
.availability-zone-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 6px;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 6px;
}

.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.layer-title {
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Entry Layer */
.entry-components {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 6px;
  min-width: 80px;
}

.component-icon {
  font-size: 24px;
}

.component-name {
  font-size: 12px;
  color: #606266;
  font-weight: 500;
}

.arrow {
  font-size: 20px;
  color: #c0c4cc;
  font-weight: bold;
}

/* AZs Layer */
.azs-layer {
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.azs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.az-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e4e7ed;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.az-card.az-a {
  border-left: 4px solid #409eff;
}

.az-card.az-b {
  border-left: 4px solid #67c23a;
}

.az-card.az-c {
  border-left: 4px solid #e6a23c;
}

.az-card.degraded {
  border-color: #f56c6c;
  background: #fef0f0;
}

.az-card.maintenance {
  border-color: #909399;
  background: #f4f4f5;
}

.az-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.az-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.az-name {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.az-id {
  font-size: 11px;
  padding: 2px 6px;
  background: #f0f2f5;
  border-radius: 4px;
  color: #909399;
}

.status-badge {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.status-badge.healthy {
  background: #e1f3d8;
  color: #67c23a;
}

.status-badge.standby {
  background: #f4f4f5;
  color: #909399;
}

.status-badge.degraded {
  background: #fde2e2;
  color: #f56c6c;
}

.status-badge.maintenance {
  background: #e9e9eb;
  color: #909399;
}

.az-resources {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #f5f7fa;
  border-radius: 6px;
  transition: all 0.2s;
}

.resource-item:hover {
  background: #ecf5ff;
}

.resource-icon {
  font-size: 16px;
}

.resource-name {
  flex: 1;
  font-size: 13px;
  color: #606266;
}

.resource-count {
  font-size: 12px;
  padding: 2px 8px;
  background: #409eff;
  color: white;
  border-radius: 10px;
  font-weight: 500;
}

/* Maintenance Overlay */
.maintenance-overlay {
  position: absolute;
  inset: 0;
  background: rgba(144, 147, 153, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.overlay-text {
  font-size: 18px;
  font-weight: 600;
}

/* Scaling Indicator */
.scaling-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #e6a23c;
  border-radius: 12px;
}

.scaling-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

.scaling-text {
  font-size: 11px;
  color: white;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

/* Status Legend */
.status-legend {
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #606266;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.healthy {
  background: #67c23a;
}

.legend-dot.standby {
  background: #909399;
}

.legend-dot.degraded {
  background: #f56c6c;
}

.legend-dot.maintenance {
  background: #c0c4cc;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .entry-components {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .slb-cluster {
    flex-direction: column;
  }

  .failover-arrow {
    transform: rotate(90deg);
    margin: 12px 0;
  }
}
</style>
