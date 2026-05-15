<!--
  NetworkLayersDemo.vue
  Demo tương tác các loại layer trong neural network
-->
<template>
  <div class="layers-demo">
    <div class="header">
      <div class="title">Các loại layer phổ biến trong neural network</div>
      <div class="subtitle">Bấm để xem vai trò và tham số của từng layer</div>
    </div>

    <div class="layer-tabs">
      <button v-for="l in layers" :key="l.key"
        :class="['tab-btn', { active: activeLayer === l.key }]"
        @click="activeLayer = activeLayer === l.key ? null : l.key">
        {{ l.name }}
      </button>
    </div>

    <div v-if="current" class="layer-detail">
      <div class="detail-name">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-section">
        <span class="section-label">Tham số chính:</span>
        <code v-for="(p, i) in current.params" :key="i" class="param-tag">{{ p }}</code>
      </div>
      <div class="detail-section">
        <span class="section-label">Ứng dụng điển hình:</span>
        <span class="usage-text">{{ current.usage }}</span>
      </div>
      <div class="detail-code">
        <code>{{ current.code }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayer = ref('dense')

const layers = [
  {
    key: 'dense',
    name: 'Fully-connected layer',
    desc: 'Mỗi neuron nối tới mọi neuron của tầng trước. Loại layer cơ bản nhất, học các tổ hợp đặc trưng đầu vào.',
    params: ['units (số neuron)', 'activation (hàm kích hoạt)'],
    usage: 'Tầng đầu ra cho classification, regression, và trích đặc trưng đơn giản',
    code: 'Dense(128, activation="relu")'
  },
  {
    key: 'conv',
    name: 'Convolutional layer',
    desc: 'Dùng cửa sổ trượt (kernel) quét đầu vào để trích đặc trưng cục bộ. Chia sẻ tham số giúp giảm mạnh số lượng tham số, là cốt lõi của xử lý ảnh.',
    params: ['filters (số kernel)', 'kernel_size (kích thước kernel)', 'stride (bước)'],
    usage: 'Phân loại ảnh, object detection, phân vùng ảnh',
    code: 'Conv2D(64, kernel_size=3, stride=1, padding=1)'
  },
  {
    key: 'rnn',
    name: 'Recurrent layer',
    desc: 'Có "trí nhớ", xử lý được dữ liệu chuỗi. Đầu ra mỗi bước thời gian được dùng làm đầu vào bước kế, tạo thành vòng lặp.',
    params: ['hidden_size (chiều ẩn)', 'num_layers (số tầng)'],
    usage: 'Sinh văn bản, nhận dạng giọng nói, dự đoán chuỗi thời gian',
    code: 'LSTM(hidden_size=256, num_layers=2)'
  },
  {
    key: 'attention',
    name: 'Attention layer',
    desc: 'Cho mô hình học cách "chú ý" tới phần quan trọng nhất của đầu vào. Là cốt lõi của transformer, đã thay đổi hoàn toàn lĩnh vực NLP.',
    params: ['embed_dim (chiều embedding)', 'num_heads (số attention head)'],
    usage: 'Các LLM như GPT, BERT, dịch máy',
    code: 'MultiHeadAttention(embed_dim=512, num_heads=8)'
  },
  {
    key: 'norm',
    name: 'Normalization layer',
    desc: 'Chuẩn hóa dữ liệu về khoảng hợp lý, tăng tốc hội tụ khi huấn luyện, giảm hiện tượng gradient biến mất / bùng nổ.',
    params: ['num_features (số đặc trưng)'],
    usage: 'Gần như mọi mạng sâu đều dùng, thường đặt sau convolutional hoặc fully-connected',
    code: 'BatchNorm2d(64) / LayerNorm(512)'
  },
  {
    key: 'dropout',
    name: 'Dropout layer',
    desc: 'Khi huấn luyện sẽ ngẫu nhiên "tắt" một phần neuron, tránh mạng phụ thuộc quá mức vào vài đặc trưng. Là biện pháp regularization phổ biến nhất.',
    params: ['p (xác suất bỏ, thường 0.1~0.5)'],
    usage: 'Chống overfitting, tăng khả năng tổng quát hóa',
    code: 'Dropout(p=0.3)'
  }
]

const current = computed(() => layers.find(l => l.key === activeLayer.value))
</script>

<style scoped>
.layers-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layer-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab-btn {
  padding: 0.35rem 0.7rem; border-radius: 6px; cursor: pointer;
  font-size: 0.8rem; font-weight: 600; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s;
  color: var(--vp-c-text-2);
}
.tab-btn:hover { border-color: var(--vp-c-brand); }
.tab-btn.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); color: var(--vp-c-text-1); }
.layer-detail {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-name { font-weight: 700; font-size: 0.95rem; color: var(--vp-c-brand); margin-bottom: 0.3rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.6rem; line-height: 1.5; }
.detail-section { font-size: 0.8rem; margin-bottom: 0.4rem; display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; }
.section-label { font-weight: 600; color: var(--vp-c-text-2); }
.param-tag {
  background: rgba(var(--vp-c-brand-rgb), 0.08); padding: 0.15rem 0.4rem;
  border-radius: 4px; font-size: 0.72rem;
}
.usage-text { color: var(--vp-c-text-2); }
.detail-code {
  margin-top: 0.5rem; padding: 0.5rem 0.7rem; background: var(--vp-c-bg-soft);
  border-radius: 6px; font-family: var(--vp-font-family-mono); font-size: 0.75rem;
  color: var(--vp-c-brand);
}
</style>
