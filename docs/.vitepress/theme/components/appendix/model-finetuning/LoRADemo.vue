<template>
  <div class="lora-demo">
    <div class="demo-header">
      <h4>Demo nguyên lý LoRA (Low-Rank Adaptation)</h4>
      <p class="subtitle">Hiểu cách LoRA fine-tuning hiệu quả với rất ít tham số</p>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <!-- 核心原理 -->
    <div v-if="activeTab === 'principle'" class="tab-content">
      <div class="matrix-visual">
        <div class="matrix-row">
          <div class="matrix-box frozen">
            <div class="matrix-label">Trọng số gốc W</div>
            <div class="matrix-size">{{ matrixSize }}x{{ matrixSize }}</div>
            <div class="matrix-grid">
              <div v-for="i in 16" :key="i" class="cell frozen-cell"></div>
            </div>
            <div class="param-count">{{ (matrixSize * matrixSize).toLocaleString() }} tham số</div>
            <div class="status-badge frozen-badge">Đóng băng</div>
          </div>

          <div class="plus-sign">+</div>

          <div class="matrix-box trainable">
            <div class="matrix-label">LoRA adapter</div>
            <div class="lora-decompose">
              <div class="small-matrix a-matrix">
                <div class="sm-label">A</div>
                <div class="sm-size">{{ matrixSize }}x{{ loraRank }}</div>
                <div class="sm-grid">
                  <div v-for="i in 8" :key="i" class="cell a-cell"></div>
                </div>
              </div>
              <div class="multiply-sign">x</div>
              <div class="small-matrix b-matrix">
                <div class="sm-label">B</div>
                <div class="sm-size">{{ loraRank }}x{{ matrixSize }}</div>
                <div class="sm-grid">
                  <div v-for="i in 8" :key="i" class="cell b-cell"></div>
                </div>
              </div>
            </div>
            <div class="param-count lora-count">{{ loraParams.toLocaleString() }} tham số</div>
            <div class="status-badge train-badge">Huấn luyện được</div>
          </div>
        </div>
      </div>

      <div class="savings-bar">
        <div class="savings-label">Tỷ lệ tiết kiệm tham số</div>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: savingsPercent + '%' }"></div>
        </div>
        <div class="savings-value">Tiết kiệm {{ savingsPercent.toFixed(1) }}% tham số</div>
      </div>

      <div class="rank-control">
        <label>LoRA rank: <strong>{{ loraRank }}</strong></label>
        <input type="range" min="1" max="64" v-model.number="loraRank" />
        <div class="rank-hints">
          <span>Rank nhỏ = ít tham số, train nhanh</span>
          <span>Rank lớn = biểu diễn mạnh, chất lượng tốt hơn</span>
        </div>
      </div>
    </div>

    <!-- 直觉类比 -->
    <div v-if="activeTab === 'analogy'" class="tab-content">
      <div class="analogy-card">
        <div class="analogy-icon">🎨</div>
        <div class="analogy-text">
          <p><strong>Hãy tưởng tượng bạn có một bức tranh sơn dầu khổng lồ (mô hình pre-trained).</strong></p>
          <p>Fine-tuning truyền thống giống như vẽ lại toàn bộ bức tranh — vừa mất công vừa có thể phá hỏng tinh túy của bản gốc.</p>
          <p>Cách LoRA làm là: <strong>phủ lên bức tranh một lớp decal trong suốt mỏng</strong>, chỉ chỉnh sửa trên lớp decal. Tranh gốc còn nguyên, decal mỏng nhẹ, có thể thay bất cứ lúc nào.</p>
        </div>
      </div>

      <div class="comparison-table">
        <div class="comp-row header">
          <div class="comp-cell">Tiêu chí</div>
          <div class="comp-cell">Full fine-tuning</div>
          <div class="comp-cell highlight">LoRA fine-tuning</div>
        </div>
        <div v-for="row in comparisonRows" :key="row.dim" class="comp-row">
          <div class="comp-cell dim">{{ row.dim }}</div>
          <div class="comp-cell">{{ row.full }}</div>
          <div class="comp-cell highlight">{{ row.lora }}</div>
        </div>
      </div>
    </div>

    <!-- 实际应用 -->
    <div v-if="activeTab === 'usage'" class="tab-content">
      <div class="usage-steps">
        <div v-for="(step, i) in usageSteps" :key="i" class="usage-step">
          <div class="usage-num">{{ i + 1 }}</div>
          <div class="usage-body">
            <div class="usage-title">{{ step.title }}</div>
            <div class="usage-code">
              <code>{{ step.code }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('principle')
const matrixSize = ref(4096)
const loraRank = ref(8)

const tabs = [
  { id: 'principle', label: 'Nguyên lý cốt lõi' },
  { id: 'analogy', label: 'Liên hệ trực quan' },
  { id: 'usage', label: 'Ứng dụng thực tế' }
]

const loraParams = computed(() => {
  return matrixSize.value * loraRank.value + loraRank.value * matrixSize.value
})

const fullParams = computed(() => matrixSize.value * matrixSize.value)

const savingsPercent = computed(() => {
  return ((1 - loraParams.value / fullParams.value) * 100)
})

const comparisonRows = [
  { dim: 'Số tham số huấn luyện', full: '100% (hàng tỷ)', lora: '0.1%~1% (vài triệu)' },
  { dim: 'Yêu cầu VRAM', full: '4x A100 80GB', lora: '1x RTX 4090 24GB' },
  { dim: 'Thời gian huấn luyện', full: 'Vài ngày ~ vài tuần', lora: 'Vài giờ ~ 1 ngày' },
  { dim: 'Dung lượng lưu trữ', full: 'Bản sao đầy đủ (~14GB)', lora: 'File adapter (~vài chục MB)' },
  { dim: 'Chuyển task', full: 'Cần nhiều bản model riêng', lora: 'Dùng chung base + đổi adapter' },
  { dim: 'Chất lượng', full: 'Trần lý thuyết cao nhất', lora: 'Gần full fine-tuning (90%+)' }
]

const usageSteps = [
  {
    title: 'Cấu hình tham số LoRA',
    code: `lora_config = LoraConfig(\n  r=8,              # rank\n  lora_alpha=16,    # hệ số scale\n  target_modules=["q_proj", "v_proj"],\n  lora_dropout=0.05\n)`
  },
  {
    title: 'Áp dụng vào mô hình',
    code: `model = get_peft_model(base_model, lora_config)\nmodel.print_trainable_parameters()\n# Tham số có thể train: 4,194,304 / 6,738,415,616 (0.06%)`
  },
  {
    title: 'Merge sau khi huấn luyện xong',
    code: `merged_model = model.merge_and_unload()\nmerged_model.save_pretrained("my-model")`
  }
]
</script>

<style scoped>
.lora-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.matrix-visual {
  margin-bottom: 20px;
}

.matrix-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.matrix-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  border: 2px solid var(--vp-c-divider);
  min-width: 160px;
}

.matrix-box.frozen {
  border-color: #94a3b8;
}

.matrix-box.trainable {
  border-color: var(--vp-c-brand-1);
}

.matrix-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.matrix-size {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin: 0 auto 8px;
  max-width: 80px;
}

.cell {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.frozen-cell {
  background: #cbd5e1;
}

.param-count {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.lora-count {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.frozen-badge {
  background: #e2e8f0;
  color: #64748b;
}

.train-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.plus-sign, .multiply-sign {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.lora-decompose {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
}

.small-matrix {
  text-align: center;
}

.sm-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.sm-size {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.sm-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin: 4px auto;
  max-width: 40px;
}

.a-cell {
  background: #818cf8;
}

.b-cell {
  background: #f472b6;
}

.savings-bar {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.savings-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.bar-track {
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), #10b981);
  border-radius: 4px;
  transition: width 0.3s;
}

.savings-value {
  font-size: 13px;
  font-weight: 600;
  color: #10b981;
}

.rank-control {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px 16px;
}

.rank-control label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.rank-control input[type="range"] {
  width: 100%;
  margin: 8px 0;
}

.rank-hints {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.analogy-card {
  display: flex;
  gap: 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.analogy-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.analogy-text p {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.comparison-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.comp-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
}

.comp-row.header {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 13px;
}

.comp-cell {
  padding: 10px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.comp-cell.dim {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.comp-cell.highlight {
  background: var(--vp-c-brand-soft);
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.usage-step {
  display: flex;
  gap: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
}

.usage-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.usage-code {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 10px;
}

.usage-code code {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  white-space: pre-wrap;
}
</style>
