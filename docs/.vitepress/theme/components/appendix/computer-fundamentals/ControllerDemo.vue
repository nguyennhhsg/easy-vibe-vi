<template>
  <div class="controller-demo">
    <div class="demo-header">
      <span class="title">Nguyên lý của bộ điều khiển</span>
      <span class="subtitle">Tín hiệu điều khiển phối hợp các thành phần của CPU như thế nào</span>
    </div>

    <div class="control-unit">
      <div class="cu-box">
        <div class="cu-title">Control Unit (CU)</div>
        <div class="cu-diagram">
          <div class="cu-internal">
            <div class="cu-component">Thanh ghi lệnh IR</div>
            <div class="cu-component">Bộ giải mã lệnh</div>
            <div class="cu-component">Bộ phát xung nhịp</div>
          </div>
          <div class="cu-output">
            <div class="output-label">Tín hiệu điều khiển xuất ra:</div>
            <div class="control-signals">
              <div v-for="sig in controlSignals" :key="sig.name" :class="['sig-box', sig.active ? 'active' : '']">
                {{ sig.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cpu-block-diagram">
      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'pc' }">
          <div class="block-name">PC</div>
          <div class="block-desc">Bộ đếm chương trình</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'pc' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'mar' }">
          <div class="block-name">MAR</div>
          <div class="block-desc">Thanh ghi địa chỉ</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mar' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'memory' }">
          <div class="block-name">Memory</div>
          <div class="block-desc">Bộ nhớ chính</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'mdr' }">
          <div class="block-name">MDR</div>
          <div class="block-desc">Thanh ghi dữ liệu</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mdr' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'ir' }">
          <div class="block-name">IR</div>
          <div class="block-desc">Thanh ghi lệnh</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'ir' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'decoder' }">
          <div class="block-name">ID</div>
          <div class="block-desc">Bộ giải mã</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'alu' }">
          <div class="block-name">ALU</div>
          <div class="block-desc">Đơn vị số học - logic</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'alu' }">↔</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'acc' }">
          <div class="block-name">ACC</div>
          <div class="block-desc">Thanh ghi tích lũy</div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="btn" @click="executeFetch">Chạy chu kỳ fetch</button>
      <button class="btn" @click="executeAdd">Chạy lệnh ADD</button>
      <button class="btn" @click="executeLoad">Chạy lệnh LOAD</button>
    </div>

    <div class="microinstruction-panel">
      <div class="panel-title">Vi lệnh hiện tại</div>
      <div class="micro-ops">
        <div v-for="(op, i) in microOps" :key="i" :class="['micro-op', op.active ? 'active' : '']">
          <span class="op-cycle">T{{ i + 1 }}</span>
          <span class="op-desc">{{ op.desc }}</span>
        </div>
      </div>
    </div>

    <div class="cu-explanation">
      <div class="exp-title">Khái niệm cốt lõi của bộ điều khiển</div>
      <div class="exp-content">
        <div class="exp-item">
          <strong>Tín hiệu điều khiển:</strong> Tín hiệu điện do bộ điều khiển phát ra, dùng để điều khiển hoạt động của các thành phần trên đường dữ liệu
        </div>
        <div class="exp-item">
          <strong>Định thời:</strong> CPU hoạt động theo nhịp xung clock, mỗi nhịp thực hiện một vi thao tác nhất định
        </div>
        <div class="exp-item">
          <strong>Hardwired vs Microprogram:</strong> Bộ điều khiển hardwired nhanh nhưng thiết kế phức tạp; bộ điều khiển microprogram linh hoạt nhưng hơi chậm
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeBlock = ref('')

const controlSignals = reactive([
  { name: 'PC→MAR', active: false },
  { name: 'MEM→MDR', active: false },
  { name: 'MDR→IR', active: false },
  { name: 'IR→ID', active: false },
  { name: 'ALU→ACC', active: false },
  { name: 'ACC→MDR', active: false },
])

const microOps = reactive([])

const clearSignals = () => {
  controlSignals.forEach(s => s.active = false)
  activeBlock.value = ''
}

const executeFetch = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: 'PC→MAR: Đưa địa chỉ trong PC sang MAR', active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: 'MEM→MDR: Đọc lệnh từ bộ nhớ vào MDR', active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: 'MDR→IR: Đưa lệnh vào IR', active: true })
  controlSignals[2].active = true
  activeBlock.value = 'mar'
  await wait(1000)

  microOps.push({ desc: 'IR→ID: Đưa lệnh sang bộ giải mã', active: true })
  controlSignals[3].active = true
  activeBlock.value = 'ir'
  await wait(1000)
}

const executeAdd = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: 'Giải mã lệnh: nhận diện là lệnh ADD', active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: 'ALU thực hiện phép cộng', active: true })
  controlSignals[4].active = true
  activeBlock.value = 'alu'
  await wait(1000)

  microOps.push({ desc: 'Ghi kết quả vào ACC', active: true })
  activeBlock.value = 'acc'
  await wait(1000)
}

const executeLoad = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: 'Giải mã lệnh: nhận diện là lệnh LOAD', active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: 'PC→MAR: Lấy địa chỉ toán hạng', active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: 'MEM→MDR: Đọc dữ liệu', active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: 'MDR→ACC: Đưa dữ liệu vào ACC', active: true })
  controlSignals[5].active = true
  activeBlock.value = 'mdr'
  await wait(1000)
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.controller-demo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.control-unit {
  margin-bottom: 20px;
}

.cu-box {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.cu-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  text-align: center;
}

.cu-diagram {
  display: flex;
  gap: 16px;
}

.cu-internal {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cu-component {
  padding: 8px 12px;
  background: #e0f2fe;
  border-radius: 6px;
  font-size: 12px;
  color: #0369a1;
  text-align: center;
}

.cu-output {
  flex: 1;
}

.output-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.control-signals {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sig-box {
  padding: 6px 10px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 11px;
  color: #64748b;
  font-family: monospace;
}

.sig-box.active {
  background: #3b82f6;
  color: white;
}

.cpu-block-diagram {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.block-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.cpu-block {
  padding: 10px 16px;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s;
}

.cpu-block.active {
  background: #dbeafe;
  border: 2px solid #3b82f6;
}

.block-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.block-desc {
  font-size: 10px;
  color: #64748b;
}

.arrow {
  font-size: 16px;
  color: #cbd5e1;
}

.arrow.active {
  color: #3b82f6;
}

.control-panel {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn:hover {
  background: #2563eb;
}

.microinstruction-panel {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.micro-ops {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.micro-op {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
}

.micro-op.active {
  background: #dbeafe;
}

.op-cycle {
  font-weight: 600;
  color: #3b82f6;
  min-width: 24px;
}

.op-desc {
  color: #475569;
}

.cu-explanation {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exp-item {
  font-size: 12px;
  color: #475569;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}
</style>
