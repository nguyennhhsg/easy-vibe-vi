<template>
  <div class="est-demo">
    <div class="demo-header">
      <span class="title">Phối hợp giữa mã hóa, lưu trữ và truyền dữ liệu</span>
      <span class="subtitle">Ba hệ thống lớn xử lý dữ liệu cùng nhau như thế nào</span>
    </div>

    <div class="scenario-selector">
      <div class="selector-label">Chọn tình huống:</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-btn', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          {{ scenario.icon }} {{ scenario.name }}
        </button>
      </div>
    </div>

    <div class="collab-diagram">
      <div class="diagram-flow">
        <!-- Giai đoạn mã hóa -->
        <div class="flow-stage encoding-stage">
          <div class="stage-header">
            <span class="stage-icon">🔤</span>
            <span class="stage-title">Mã hóa</span>
          </div>
          <div class="stage-content">
            <div class="input-box">
              <div class="box-label">Dữ liệu gốc</div>
              <div class="box-value">{{ currentScenario.encoding.input }}</div>
            </div>
            <div class="arrow">↓</div>
            <div class="output-box">
              <div class="box-label">Sau mã hóa</div>
              <div class="box-value code">
                {{ currentScenario.encoding.output }}
              </div>
            </div>
          </div>
        </div>

        <!-- Giai đoạn lưu trữ -->
        <div class="flow-stage storage-stage">
          <div class="stage-header">
            <span class="stage-icon">💾</span>
            <span class="stage-title">Lưu trữ</span>
          </div>
          <div class="stage-content">
            <div class="storage-visual">
              <div class="storage-blocks">
                <div
                  v-for="(block, index) in currentScenario.storage.blocks"
                  :key="index"
                  class="storage-block"
                  :title="block"
                >
                  {{ block }}
                </div>
              </div>
            </div>
            <div class="storage-info">
              <div class="info-item">
                <span class="info-label">Vị trí:</span>
                <span class="info-value">{{
                  currentScenario.storage.location
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Kích thước:</span>
                <span class="info-value">{{
                  currentScenario.storage.size
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Giai đoạn truyền -->
        <div class="flow-stage transmission-stage">
          <div class="stage-header">
            <span class="stage-icon">📡</span>
            <span class="stage-title">Truyền</span>
          </div>
          <div class="stage-content">
            <div class="transmission-flow">
              <div class="transmission-packet">
                <div class="packet-header">Gói dữ liệu</div>
                <div class="packet-body">
                  <div
                    v-for="(layer, index) in currentScenario.transmission
                      .layers"
                    :key="index"
                    class="packet-layer"
                  >
                    <span class="layer-name">{{ layer.name }}:</span>
                    <span class="layer-value">{{ layer.value }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="transmission-info">
              <div class="info-item">
                <span class="info-label">Giao thức:</span>
                <span class="info-value">{{
                  currentScenario.transmission.protocol
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Đường đi:</span>
                <span class="info-value">{{
                  currentScenario.transmission.path
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quan hệ phối hợp -->
      <div class="collab-relationships">
        <div class="relationship-arrow encoding-to-storage">
          <span class="arrow-text">{{
            currentScenario.relationships.encodingToStorage
          }}</span>
          <span class="arrow-icon">→</span>
        </div>
        <div class="relationship-arrow storage-to-transmission">
          <span class="arrow-text">{{
            currentScenario.relationships.storageToTransmission
          }}</span>
          <span class="arrow-icon">→</span>
        </div>
      </div>
    </div>

    <!-- Điểm cốt lõi -->
    <div class="key-points">
      <div class="points-title">Điểm cốt lõi khi phối hợp</div>
      <div class="points-grid">
        <div
          v-for="(point, index) in currentScenario.points"
          :key="index"
          class="point-card"
        >
          <div class="point-icon">{{ point.icon }}</div>
          <div class="point-content">
            <div class="point-title">{{ point.title }}</div>
            <div class="point-desc">{{ point.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref('text-file')

const scenarios = [
  {
    id: 'text-file',
    name: 'Lưu file văn bản',
    icon: '📝'
  },
  {
    id: 'upload-image',
    name: 'Upload ảnh',
    icon: '🖼️'
  },
  {
    id: 'stream-video',
    name: 'Streaming video',
    icon: '🎬'
  },
  {
    id: 'send-message',
    name: 'Gửi tin nhắn',
    icon: '💬'
  }
]

const scenarioData = {
  'text-file': {
    encoding: {
      input: 'Xin chào',
      output: 'U+0058 U+0069 U+006E ...'
    },
    storage: {
      location: 'Thư mục Documents /hello.txt',
      size: '10 byte (UTF-8)',
      blocks: ['58', '69', '6E', '20', '63', '68', 'C3', 'A0', '6F']
    },
    transmission: {
      protocol: 'HTTP + TCP/IP',
      path: 'Client → Server → Cloud storage',
      layers: [
        { name: 'Tầng ứng dụng', value: 'HTTP POST' },
        { name: 'Tầng giao vận', value: 'TCP port 443' },
        { name: 'Tầng mạng', value: 'Gói IP' }
      ]
    },
    relationships: {
      encodingToStorage: 'Chuỗi byte UTF-8 được ghi xuống đĩa',
      storageToTransmission: 'Đọc file rồi gửi qua mạng'
    },
    points: [
      {
        icon: '🔤',
        title: 'Thống nhất mã hóa',
        desc: 'Dùng UTF-8 để đảm bảo ký tự được lưu và truyền đúng'
      },
      {
        icon: '📦',
        title: 'Đóng gói file',
        desc: 'Nội dung văn bản được gói vào file .txt để lưu'
      },
      {
        icon: '🔄',
        title: 'Chuyển đổi giao thức',
        desc: 'Khi lưu dùng giao thức file system, khi truyền dùng HTTP'
      }
    ]
  },
  'upload-image': {
    encoding: {
      input: 'Dữ liệu ảnh',
      output: 'Mã hóa nén JPEG'
    },
    storage: {
      location: 'Album /photo.jpg',
      size: '2.5 MB',
      blocks: ['FF', 'D8', 'FF', 'E0', '...', 'FF', 'D9']
    },
    transmission: {
      protocol: 'HTTPS + MIME multipart',
      path: 'Điện thoại → API Gateway → Object storage',
      layers: [
        { name: 'Tầng ứng dụng', value: 'HTTPS POST' },
        { name: 'Tầng giao vận', value: 'Mã hóa TLS' },
        { name: 'Tầng mạng', value: 'Phân mảnh IP' }
      ]
    },
    relationships: {
      encodingToStorage: 'Mã hóa nén JPEG giảm kích thước file',
      storageToTransmission: 'Tải dữ liệu nhị phân theo từng khối'
    },
    points: [
      {
        icon: '🗜️',
        title: 'Mã hóa nén',
        desc: 'Thuật toán nén JPEG giảm dung lượng ảnh, tiết kiệm bộ nhớ'
      },
      {
        icon: '🔐',
        title: 'Truyền an toàn',
        desc: 'HTTPS mã hóa bảo vệ dữ liệu ảnh khi truyền qua mạng'
      },
      {
        icon: '⚡',
        title: 'Upload theo khối',
        desc: 'File lớn chia khối để truyền, hỗ trợ tiếp tục khi đứt'
      }
    ]
  },
  'stream-video': {
    encoding: {
      input: 'Luồng video',
      output: 'Mã hóa H.264'
    },
    storage: {
      location: 'Node cache CDN',
      size: 'Tự điều chỉnh',
      blocks: ['Frame 1', 'Frame 2', 'Frame 3', '...']
    },
    transmission: {
      protocol: 'HLS + DASH',
      path: 'Server → CDN → Thiết bị người dùng',
      layers: [
        { name: 'Tầng ứng dụng', value: 'Danh sách HLS' },
        { name: 'Tầng giao vận', value: 'TCP streaming' },
        { name: 'Tầng mạng', value: 'Có thể dùng UDP' }
      ]
    },
    relationships: {
      encodingToStorage: 'Video chia đoạn lưu trên CDN',
      storageToTransmission: 'Điều chỉnh bitrate thích ứng theo mạng'
    },
    points: [
      {
        icon: '🎬',
        title: 'Mã hóa streaming',
        desc: 'H.264 nén video, phù hợp truyền qua mạng'
      },
      {
        icon: '🌐',
        title: 'Tăng tốc CDN',
        desc: 'Mạng phân phối nội dung cache video, phục vụ từ vị trí gần'
      },
      {
        icon: '📊',
        title: 'Bitrate thích ứng',
        desc: 'Tự động chỉnh chất lượng video theo tình trạng mạng'
      }
    ]
  },
  'send-message': {
    encoding: {
      input: 'Nội dung tin nhắn',
      output: 'Định dạng JSON'
    },
    storage: {
      location: 'CSDL local + Server',
      size: 'Khoảng 200 byte',
      blocks: ['JSON']
    },
    transmission: {
      protocol: 'WebSocket',
      path: 'Bên gửi → Server chat → Bên nhận',
      layers: [
        { name: 'Tầng ứng dụng', value: 'WebSocket frame' },
        { name: 'Tầng giao vận', value: 'TCP kết nối liên tục' },
        { name: 'Tầng mạng', value: 'Định tuyến IP' }
      ]
    },
    relationships: {
      encodingToStorage: 'Định dạng JSON tiện cho parse và lưu trữ',
      storageToTransmission: 'WebSocket duy trì kết nối realtime'
    },
    points: [
      {
        icon: '📨',
        title: 'Push realtime',
        desc: 'Kết nối WebSocket liên tục giúp tin nhắn tới ngay lập tức'
      },
      {
        icon: '💾',
        title: 'Lưu kép',
        desc: 'Local lưu tin offline, server lưu lịch sử'
      },
      {
        icon: '🔗',
        title: 'Mã hóa JSON',
        desc: 'Định dạng có cấu trúc, dễ parse và mở rộng'
      }
    ]
  }
}

const currentScenario = computed(() => scenarioData[activeScenario.value])
</script>

<style scoped>
.est-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.scenario-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.collab-diagram {
  position: relative;
  margin-bottom: 2rem;
}

.diagram-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 968px) {
  .diagram-flow {
    grid-template-columns: 1fr;
  }
}

.flow-stage {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-icon {
  font-size: 1.3rem;
}
.stage-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.stage-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-box,
.output-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.box-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.box-value {
  font-size: 0.9rem;
  font-weight: 500;
}

.box-value.code {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand);
}

.arrow {
  text-align: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.storage-visual {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.storage-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.storage-block {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.info-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.info-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.transmission-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.transmission-packet {
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  overflow: hidden;
}

.packet-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.packet-body {
  padding: 0.75rem;
}

.packet-layer {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.packet-layer:last-child {
  margin-bottom: 0;
}

.layer-name {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.layer-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.collab-relationships {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.relationship-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  text-align: center;
}

.arrow-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.arrow-icon {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.key-points {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.points-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.point-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.point-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.point-content {
  flex: 1;
}

.point-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.point-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
