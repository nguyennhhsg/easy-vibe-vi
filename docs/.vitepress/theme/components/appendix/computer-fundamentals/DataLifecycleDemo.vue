<template>
  <div class="data-lifecycle-demo">
    <div class="demo-header">
      <span class="title">Vòng đời dữ liệu</span>
      <span class="subtitle">Toàn bộ hành trình từ nhập vào, lưu trữ, truyền tải đến xuất ra</span>
    </div>

    <div class="lifecycle-flow">
      <div v-for="(stage, index) in stages" :key="stage.id" class="flow-stage">
        <div class="stage-header" @click="activeStage = index">
          <span class="stage-number">{{ index + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-icon">{{ stage.icon }}</span>
        </div>

        <Transition name="slide">
          <div v-if="activeStage === index" class="stage-detail">
            <div class="detail-content">
              <h4>{{ stage.title }}</h4>
              <p>{{ stage.description }}</p>

              <div class="stage-example">
                <div class="example-label">Ví dụ: {{ stage.example.label }}</div>
                <div class="example-content">
                  <div
                    v-for="(item, i) in stage.example.items"
                    :key="i"
                    class="example-item"
                  >
                    <span class="item-label">{{ item.label }}:</span>
                    <span class="item-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>

              <div class="stage-encoding">
                <div class="encoding-label">Cách mã hóa:</div>
                <div class="encoding-value">{{ stage.encoding }}</div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="index < stages.length - 1" class="flow-arrow">↓</div>
      </div>
    </div>

    <div class="lifecycle-summary">
      <div class="summary-title">Điểm then chốt khi chuyển đổi dữ liệu</div>
      <div class="summary-grid">
        <div
          v-for="(point, index) in keyPoints"
          :key="index"
          class="summary-card"
        >
          <div class="card-icon">{{ point.icon }}</div>
          <div class="card-text">
            <div class="card-title">{{ point.title }}</div>
            <div class="card-desc">{{ point.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStage = ref(0)

const stages = [
  {
    id: 'input',
    name: 'Nhập dữ liệu',
    icon: '⌨️',
    title: 'Giai đoạn 1: Nhập dữ liệu',
    description:
      'Người dùng nhập thông tin vào hệ thống thông qua các thiết bị nhập (bàn phím, chuột, màn hình cảm ứng, micro,...).',
    example: {
      label: 'Người dùng gõ chữ',
      items: [
        { label: 'Thao tác gốc', value: 'Nhấn phím A trên bàn phím' },
        { label: 'Tín hiệu phần cứng', value: 'Mã quét bàn phím' },
        { label: 'OS', value: 'Ngắt bàn phím' }
      ]
    },
    encoding: 'ASCII: 01000001 (65)'
  },
  {
    id: 'processing',
    name: 'Xử lý dữ liệu',
    icon: '🔄',
    title: 'Giai đoạn 2: Xử lý dữ liệu',
    description:
      'CPU thực hiện tính toán, chuyển đổi, định dạng dữ liệu được nhập vào, ứng dụng xử lý theo logic nghiệp vụ.',
    example: {
      label: 'Trình soạn thảo xử lý',
      items: [
        { label: 'Ứng dụng', value: 'Nhận ký tự "A"' },
        { label: 'Lưu vào bộ nhớ', value: 'Unicode: U+0041' },
        { label: 'Chuẩn bị hiển thị', value: 'Render font' }
      ]
    },
    encoding: 'UTF-8: 0x41 (1 byte)'
  },
  {
    id: 'storage',
    name: 'Lưu trữ dữ liệu',
    icon: '💾',
    title: 'Giai đoạn 3: Lưu trữ dữ liệu',
    description:
      'Dữ liệu sau khi xử lý được lưu vào thiết bị lưu trữ (RAM, HDD, SSD, cloud,...) để dùng về sau.',
    example: {
      label: 'Lưu tài liệu',
      items: [
        { label: 'Dữ liệu RAM', value: 'Nội dung văn bản' },
        { label: 'Hệ thống file', value: 'Tạo file .txt' },
        { label: 'Ghi đĩa', value: 'Dữ liệu nhị phân' }
      ]
    },
    encoding: 'Đĩa: chuỗi bit nhị phân'
  },
  {
    id: 'transmission',
    name: 'Truyền dữ liệu',
    icon: '📡',
    title: 'Giai đoạn 4: Truyền dữ liệu',
    description:
      'Dữ liệu được truyền từ nơi này sang nơi khác qua mạng (LAN, Internet) hoặc bus nội bộ.',
    example: {
      label: 'Upload file',
      items: [
        { label: 'Đọc file', value: 'Tải từ đĩa lên' },
        { label: 'Đóng gói mạng', value: 'Gói TCP/IP' },
        { label: 'Truyền vật lý', value: 'Tín hiệu điện/quang' }
      ]
    },
    encoding: 'Mạng: định dạng frame'
  },
  {
    id: 'output',
    name: 'Xuất dữ liệu',
    icon: '🖥️',
    title: 'Giai đoạn 5: Xuất dữ liệu',
    description:
      'Dữ liệu được hiển thị tới người dùng thông qua thiết bị xuất (màn hình, máy in, loa,...), hoặc truyền cho hệ thống khác.',
    example: {
      label: 'Hiển thị trang web',
      items: [
        { label: 'Trình duyệt nhận', value: 'Dữ liệu HTML' },
        { label: 'Render engine', value: 'Phân tích style, layout' },
        { label: 'Hiển thị màn hình', value: 'Lưới điểm ảnh' }
      ]
    },
    encoding: 'Hiển thị: giá trị pixel RGB'
  }
]

const keyPoints = [
  {
    icon: '🔤',
    title: 'Chuyển đổi mã hóa',
    desc: 'Dữ liệu dùng các kiểu mã hóa khác nhau ở mỗi giai đoạn (ASCII, Unicode, nhị phân,...)'
  },
  {
    icon: '📦',
    title: 'Định dạng đóng gói',
    desc: 'Khi truyền và lưu cần đóng gói theo định dạng riêng (file, packet, frame,...)'
  },
  {
    icon: '🎯',
    title: 'Chuẩn giao thức',
    desc: 'Mỗi mắt xích đều tuân theo giao thức và chuẩn tương ứng (TCP/IP, USB, HDMI,...)'
  },
  {
    icon: '⚡',
    title: 'Tối ưu hiệu năng',
    desc: 'Nén, cache, pipeline,... giúp tăng tốc xử lý dữ liệu'
  }
]
</script>

<style scoped>
.data-lifecycle-demo {
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

.lifecycle-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.flow-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  max-width: 500px;
}

.stage-header:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(5px);
}

.stage-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
}

.stage-name {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
}

.stage-icon {
  font-size: 1.5rem;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

.stage-detail {
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;
}

.detail-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.detail-content h4 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.detail-content > p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.stage-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.example-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.example-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.example-item:last-child {
  margin-bottom: 0;
}

.item-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.item-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.stage-encoding {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}

.encoding-label {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.encoding-value {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
}

.lifecycle-summary {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.summary-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.summary-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.card-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>
