<template>
  <div class="addressing-mode-demo">
    <div class="demo-header">
      <span class="title">Phương thức định địa chỉ</span>
      <span class="subtitle">Cách tìm vị trí của toán hạng</span>
    </div>

    <div class="mode-selector">
      <button 
        v-for="mode in addressingModes" 
        :key="mode.name"
        :class="['mode-btn', { active: selectedMode === mode.name }]"
        @click="selectMode(mode)"
      >
        {{ mode.name }}
      </button>
    </div>

    <div class="mode-details" v-if="selectedModeData">
      <div class="detail-header">
        <span class="mode-name">{{ selectedModeData.name }}</span>
        <span class="mode-english">{{ selectedModeData.english }}</span>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">Định nghĩa</div>
          <div class="section-content">{{ selectedModeData.definition }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">Định dạng lệnh</div>
          <div class="instruction-example">
            <code>{{ selectedModeData.format }}</code>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Ví dụ</div>
          <div class="example-code">
            <div class="code-line">{{ selectedModeData.example.assembly }}</div>
            <div class="code-desc">{{ selectedModeData.example.description }}</div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Quá trình thực thi</div>
          <div class="execution-flow">
            <div v-for="(step, i) in selectedModeData.steps" :key="i" class="flow-step">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Đặc điểm</div>
          <div class="characteristics">
            <div class="char-item" :class="selectedModeData.fast ? 'fast' : 'slow'">
              <span class="char-label">Tốc độ</span>
              <span class="char-value">{{ selectedModeData.fast ? 'Nhanh' : 'Chậm' }}</span>
            </div>
            <div class="char-item">
              <span class="char-label">Tính linh hoạt</span>
              <span class="char-value">{{ selectedModeData.flexibility }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">So sánh các phương thức định địa chỉ</div>
      <table>
        <thead>
          <tr>
            <th>Phương thức</th>
            <th>Định dạng</th>
            <th>Tốc độ</th>
            <th>Mục đích sử dụng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in addressingModes" :key="mode.name">
            <td>{{ mode.name }}</td>
            <td><code>{{ mode.format }}</code></td>
            <td :class="mode.fast ? 'fast' : 'slow'">{{ mode.fast ? 'Nhanh nhất' : 'Khá nhanh' }}</td>
            <td>{{ mode.usage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMode = ref('Định địa chỉ tức thời')
const selectedModeData = ref(null)

const addressingModes = ref([
  {
    name: 'Định địa chỉ tức thời',
    english: 'Immediate Addressing',
    definition: 'Toán hạng được nhúng trực tiếp trong lệnh, có thể dùng ngay như một phần của lệnh',
    format: 'MOV R1, #100',
    usage: 'Gán hằng số, khởi tạo',
    fast: true,
    flexibility: 'Thấp',
    example: {
      assembly: 'MOV R1, #100  ; R1 = 100',
      description: 'Số tức thời 100 nằm thẳng trong lệnh, không cần truy cập thanh ghi hay bộ nhớ'
    },
    steps: [
      'CPU đọc trực tiếp số tức thời 100 từ lệnh',
      'Ghi số tức thời vào thanh ghi đích R1',
      'Thực thi xong, không cần truy cập bộ nhớ thêm'
    ]
  },
  {
    name: 'Định địa chỉ thanh ghi',
    english: 'Register Addressing',
    definition: 'Toán hạng nằm trong thanh ghi bên trong CPU',
    format: 'MOV R1, R2',
    usage: 'Truyền dữ liệu giữa các thanh ghi',
    fast: true,
    flexibility: 'Trung bình',
    example: {
      assembly: 'MOV R1, R2  ; R1 = R2',
      description: 'Đọc dữ liệu từ thanh ghi nguồn R2, ghi vào thanh ghi đích R1'
    },
    steps: [
      'CPU đọc giá trị của R2 từ tập thanh ghi',
      'Ghi giá trị vào thanh ghi đích R1',
      'Thực thi xong, không cần truy cập bộ nhớ'
    ]
  },
  {
    name: 'Định địa chỉ trực tiếp',
    english: 'Direct Addressing',
    definition: 'Lệnh chứa trực tiếp địa chỉ bộ nhớ của toán hạng',
    format: 'MOV R1, [100]',
    usage: 'Truy cập biến toàn cục',
    fast: false,
    flexibility: 'Cao',
    example: {
      assembly: 'MOV R1, [0x1000]  ; R1 = M[0x1000]',
      description: 'Lệnh chứa địa chỉ bộ nhớ 0x1000, đọc dữ liệu từ địa chỉ này'
    },
    steps: [
      'CPU giải mã địa chỉ 0x1000 từ lệnh',
      'Đưa địa chỉ vào MAR (thanh ghi địa chỉ bộ nhớ)',
      'Truy cập bộ nhớ, đọc dữ liệu từ 0x1000 vào MDR',
      'Ghi dữ liệu từ MDR vào thanh ghi đích R1'
    ]
  },
  {
    name: 'Định địa chỉ gián tiếp',
    english: 'Indirect Addressing',
    definition: 'Lệnh chỉ ra một thanh ghi, thanh ghi này lưu địa chỉ của toán hạng',
    format: 'MOV R1, [R2]',
    usage: 'Thao tác con trỏ, duyệt mảng',
    fast: false,
    flexibility: 'Cao',
    example: {
      assembly: 'MOV R1, [R2]  ; R1 = M[R2]',
      description: 'R2 chứa địa chỉ, đọc dữ liệu từ địa chỉ đó'
    },
    steps: [
      'CPU đọc địa chỉ từ thanh ghi R2',
      'Đưa địa chỉ vào MAR',
      'Truy cập bộ nhớ, đọc dữ liệu vào MDR',
      'Ghi dữ liệu vào thanh ghi đích R1'
    ]
  },
  {
    name: 'Định địa chỉ chỉ số',
    english: 'Indexed Addressing',
    definition: 'Lệnh cho địa chỉ cơ sở cộng với giá trị thanh ghi chỉ số để tạo địa chỉ toán hạng',
    format: 'MOV R1, [R2 + R3]',
    usage: 'Truy cập mảng, vòng lặp',
    fast: false,
    flexibility: 'Cao',
    example: {
      assembly: 'MOV R1, [R2 + R3]  ; R1 = M[R2+R3]',
      description: 'Địa chỉ hiệu dụng = R2 + R3, dùng để truy cập phần tử mảng'
    },
    steps: [
      'CPU đọc giá trị thanh ghi địa chỉ cơ sở R2',
      'CPU đọc giá trị thanh ghi chỉ số R3',
      'ALU tính địa chỉ hiệu dụng = R2 + R3',
      'Đưa địa chỉ hiệu dụng vào MAR',
      'Truy cập bộ nhớ, đọc dữ liệu vào MDR',
      'Ghi dữ liệu vào thanh ghi đích R1'
    ]
  },
  {
    name: 'Định địa chỉ cơ sở',
    english: 'Based Addressing',
    definition: 'Lệnh cho thanh ghi cơ sở cộng với độ lệch để tạo địa chỉ toán hạng',
    format: 'MOV R1, [R2 + 100]',
    usage: 'Truy cập struct, tham số hàm',
    fast: false,
    flexibility: 'Cao',
    example: {
      assembly: 'MOV R1, [RBP - 8]  ; Truy cập biến cục bộ trong khung stack',
      description: 'Địa chỉ hiệu dụng = RBP - 8, dùng để truy cập biến trong stack frame của hàm'
    },
    steps: [
      'CPU đọc giá trị thanh ghi cơ sở RBP',
      'Tính địa chỉ hiệu dụng = RBP - 8',
      'Đưa địa chỉ hiệu dụng vào MAR',
      'Truy cập bộ nhớ, đọc dữ liệu'
    ]
  },
  {
    name: 'Định địa chỉ tương đối',
    english: 'Relative Addressing',
    definition: 'Địa chỉ toán hạng bằng địa chỉ lệnh hiện hành cộng một độ lệch',
    format: 'JMP LABEL',
    usage: 'Vòng lặp, nhảy có điều kiện',
    fast: true,
    flexibility: 'Cao',
    example: {
      assembly: 'JMP LOOP  ; Nhảy đến nhãn LOOP',
      description: 'Địa chỉ đích nhảy = PC + độ lệch, dùng cho vòng lặp và rẽ nhánh'
    },
    steps: [
      'CPU tính địa chỉ đích = PC hiện tại + độ lệch',
      'Ghi địa chỉ đích vào PC',
      'Lệnh kế tiếp được thực thi từ địa chỉ mới'
    ]
  }
])

const selectMode = (mode) => {
  selectedMode.value = mode.name
  selectedModeData.value = mode
}
</script>

<style scoped>
.addressing-mode-demo {
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

.mode-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  padding: 8px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.mode-btn.active {
  border-color: #f59e0b;
  background: #fef3c7;
}

.mode-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.mode-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.mode-english {
  font-size: 13px;
  color: #64748b;
}

.detail-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.section-content {
  font-size: 14px;
  color: #1e293b;
  line-height: 1.6;
}

.instruction-example {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.instruction-example code {
  font-family: monospace;
  font-size: 14px;
  color: #0369a1;
}

.example-code {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.code-line {
  font-family: monospace;
  font-size: 13px;
  color: #0369a1;
  margin-bottom: 4px;
}

.code-desc {
  font-size: 12px;
  color: #64748b;
}

.execution-flow {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 4px;
}

.step-num {
  width: 24px;
  height: 24px;
  background: #f59e0b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.step-text {
  font-size: 13px;
  color: #475569;
}

.characteristics {
  display: flex;
  gap: 16px;
}

.char-item {
  padding: 8px 16px;
  background: #f8fafc;
  border-radius: 6px;
}

.char-label {
  font-size: 11px;
  color: #64748b;
  display: block;
}

.char-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.char-item.fast .char-value {
  color: #16a34a;
}

.char-item.slow .char-value {
  color: #ea580c;
}

.comparison-table {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.table-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.comparison-table th,
.comparison-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.comparison-table td {
  color: #475569;
}

.comparison-table code {
  font-size: 11px;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 2px;
}

.fast {
  color: #16a34a;
}

.slow {
  color: #ea580c;
}
</style>
