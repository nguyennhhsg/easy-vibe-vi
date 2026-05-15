<!--
  NetworkArchitectureDemo.vue
  Demo so sánh các kiến trúc neural network
-->
<template>
  <div class="net-arch-demo">
    <div class="header">
      <div class="title">Các kiến trúc neural network phổ biến</div>
      <div class="subtitle">Bấm để xem đặc điểm và ứng dụng của từng kiến trúc</div>
    </div>

    <div class="arch-tabs">
      <button
        v-for="arch in architectures"
        :key="arch.key"
        :class="['arch-btn', { active: activeArch === arch.key }]"
        @click="activeArch = arch.key"
      >
        {{ arch.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }} ({{ current.abbr }})</div>
        <div class="detail-year">{{ current.year }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>

      <div class="structure">
        <div class="struct-label">Cấu trúc mạng</div>
        <div class="struct-visual">
          <span v-for="(layer, i) in current.layers" :key="i" class="layer-tag">
            {{ layer }}
            <span v-if="i < current.layers.length - 1" class="layer-arrow">→</span>
          </span>
        </div>
      </div>

      <div class="apps">
        <div class="apps-label">Ứng dụng điển hình</div>
        <div class="apps-list">
          <span v-for="(app, i) in current.applications" :key="i" class="app-tag">{{ app }}</span>
        </div>
      </div>

      <div class="key-idea">
        <span class="idea-label">Ý tưởng cốt lõi:</span> {{ current.keyIdea }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeArch = ref('ffn')

const architectures = [
  {
    key: 'ffn',
    name: 'Mạng feed-forward',
    abbr: 'FNN',
    year: '1958',
    desc: 'Kiến trúc neural network cơ bản nhất: dữ liệu chảy một chiều từ tầng đầu vào qua tầng ẩn đến tầng đầu ra, không có vòng lặp. Mỗi neuron của một tầng nối với mọi neuron của tầng tiếp theo (fully-connected).',
    layers: ['Input layer', 'Hidden layer ×N', 'Output layer'],
    applications: ['Phân loại', 'Hồi quy', 'Xấp xỉ hàm'],
    keyIdea: 'Qua nhiều biến đổi phi tuyến nhiều tầng, ánh xạ đầu vào sang đầu ra. Càng nhiều tầng càng biểu diễn được hàm phức tạp.'
  },
  {
    key: 'cnn',
    name: 'Convolutional neural network',
    abbr: 'CNN',
    year: '1998',
    desc: 'Thiết kế riêng cho dữ liệu dạng lưới (như ảnh). Kernel trượt trên đầu vào để trích đặc trưng cục bộ, pooling giảm chiều, cuối cùng fully-connected để phân loại. Chia sẻ tham số giúp giảm mạnh số lượng tham số.',
    layers: ['Input', 'Conv layer', 'Pooling', '...', 'FC layer', 'Output'],
    applications: ['Phân loại ảnh', 'Object detection', 'Nhận diện khuôn mặt', 'Ảnh y tế'],
    keyIdea: 'Vùng tiếp nhận cục bộ + chia sẻ tham số. Kernel chỉ tập trung một vùng nhỏ, cùng một kernel chia sẻ tham số trên toàn ảnh.'
  },
  {
    key: 'rnn',
    name: 'Recurrent neural network',
    abbr: 'RNN/LSTM',
    year: '1997',
    desc: 'Thiết kế cho dữ liệu chuỗi. Trạng thái ẩn truyền sang bước thời gian kế tiếp, cho mạng khả năng "ghi nhớ". LSTM dùng cơ chế cổng để giải quyết vấn đề gradient biến mất trên chuỗi dài.',
    layers: ['Chuỗi đầu vào', 'Recurrent layer (có nhớ)', '...', 'Chuỗi đầu ra'],
    applications: ['Dịch máy', 'Nhận dạng giọng nói', 'Dự báo chuỗi thời gian', 'Sinh văn bản'],
    keyIdea: 'Thêm kết nối hồi tiếp theo chiều thời gian, cho mạng xử lý chuỗi độ dài thay đổi và giữ context.'
  },
  {
    key: 'transformer',
    name: 'Transformer',
    abbr: 'Transformer',
    year: '2017',
    desc: 'Thay cấu trúc hồi tiếp bằng self-attention, có thể xử lý song song toàn bộ chuỗi. Mỗi vị trí có thể chú ý trực tiếp tới mọi vị trí khác trong chuỗi, giải quyết vấn đề phụ thuộc xa của RNN. Là nền tảng cho GPT, BERT.',
    layers: ['Input embedding', 'Positional encoding', 'Multi-head attention', 'Feed-forward', '...×N', 'Output'],
    applications: ['ChatGPT', 'BERT', 'Dịch máy', 'Sinh code', 'Sinh ảnh'],
    keyIdea: 'Self-attention: mỗi phần tử trong chuỗi có thể "nhìn thấy" mọi phần tử khác và tính trọng số liên quan.'
  },
  {
    key: 'gan',
    name: 'Generative adversarial network',
    abbr: 'GAN',
    year: '2014',
    desc: 'Gồm hai mạng đối kháng nhau: generator và discriminator. Generator cố sinh dữ liệu giả như thật, discriminator cố phân biệt thật/giả. Kết quả của cuộc đua là generator ngày càng mạnh.',
    layers: ['Nhiễu ngẫu nhiên', 'Generator', 'Dữ liệu sinh', 'Discriminator', 'Thật / Giả'],
    applications: ['Sinh ảnh', 'Chuyển phong cách', 'Siêu phân giải', 'Tăng cường dữ liệu'],
    keyIdea: 'Adversarial training: generator và discriminator đối đầu, cùng tiến hóa; cuối cùng generator tạo ra dữ liệu chân thực.'
  }
]

const current = computed(() => architectures.find(a => a.key === activeArch.value))
</script>

<style scoped>
.net-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.arch-btn {
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
.arch-btn:hover { border-color: var(--vp-c-brand); }
.arch-btn.active {
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
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-year {
  font-size: 0.72rem;
  padding: 0.1rem 0.4rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.structure, .apps {
  margin-bottom: 0.5rem;
}
.struct-label, .apps-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.struct-visual {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem;
}
.layer-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-weight: 600;
}
.layer-arrow {
  color: var(--vp-c-text-3);
  margin: 0 0.1rem;
}
.apps-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.app-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: rgba(34, 197, 94, 0.1);
  color: var(--vp-c-text-1);
  border-radius: 4px;
}
.key-idea {
  font-size: 0.8rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  line-height: 1.5;
}
.idea-label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
