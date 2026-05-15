<template>
  <div class="cpu-registers-demo">
    <div class="demo-header">
      <span class="title">Tập thanh ghi CPU</span>
      <span class="subtitle">Đơn vị lưu trữ tốc độ cao bên trong CPU</span>
    </div>

    <div class="registers-layout">
      <!-- Thanh ghi chuyên dụng -->
      <div class="reg-section special-regs">
        <div class="section-title">Thanh ghi chuyên dụng (Special Registers)</div>
        <div class="reg-grid">
          <div v-for="reg in specialRegisters" :key="reg.name" class="reg-card" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Thanh ghi đa dụng -->
      <div class="reg-section general-regs">
        <div class="section-title">Thanh ghi đa dụng (General Purpose Registers)</div>
        <div class="reg-grid">
          <div v-for="reg in generalRegisters" :key="reg.name" class="reg-card small" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Thanh ghi trạng thái -->
      <div class="reg-section status-reg">
        <div class="section-title">Từ trạng thái chương trình (PSW / FLAGS)</div>
        <div class="flags-container">
          <div v-for="flag in statusFlags" :key="flag.name" class="flag-bit" :class="{ set: flag.value === 1 }">
            <span class="flag-name">{{ flag.name }}</span>
            <span class="flag-value">{{ flag.value }}</span>
            <span class="flag-desc">{{ flag.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chi tiết thanh ghi -->
    <div class="reg-details" v-if="selectedReg">
      <div class="details-header">
        <span class="details-title">Thanh ghi {{ selectedReg.name }}</span>
        <span class="details-type">{{ selectedReg.type }}</span>
      </div>
      <div class="details-content">{{ selectedReg.detail }}</div>
    </div>

    <!-- Giải thích về thanh ghi -->
    <div class="register-explanation">
      <div class="exp-title">Thanh ghi vs RAM</div>
      <div class="exp-table">
        <table>
          <thead>
            <tr>
              <th>Đặc điểm</th>
              <th>Thanh ghi</th>
              <th>RAM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vị trí</td>
              <td>Bên trong CPU</td>
              <td>Bên ngoài CPU</td>
            </tr>
            <tr>
              <td>Tốc độ truy cập</td>
              <td>Nhanh nhất (&lt; 1ns)</td>
              <td>Chậm hơn (50-100ns)</td>
            </tr>
            <tr>
              <td>Dung lượng</td>
              <td>Cực nhỏ (Bytes)</td>
              <td>Lớn (GB)</td>
            </tr>
            <tr>
              <td>Vai trò</td>
              <td>Lưu tạm chỉ thị/toán hạng/kết quả</td>
              <td>Lưu chương trình và dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeReg = ref('')
const selectedReg = ref(null)

const specialRegisters = ref([
  { name: 'PC', value: '0x00401000', desc: 'Bộ đếm chương trình', type: 'Thanh ghi chuyên dụng', detail: 'Program Counter, lưu địa chỉ chỉ thị kế tiếp sẽ thực thi. Mỗi khi thực thi xong, PC tự tăng 4 (32-bit) hoặc 8 (64-bit) để trỏ tới chỉ thị tiếp theo.' },
  { name: 'IR', value: '0x8B450008', desc: 'Thanh ghi chỉ thị', type: 'Thanh ghi chuyên dụng', detail: 'Instruction Register, lưu chỉ thị đang thực thi. CPU đọc chỉ thị từ bộ nhớ vào IR rồi đưa qua bộ giải mã để phân tích.' },
  { name: 'MAR', value: '0x00401000', desc: 'Thanh ghi địa chỉ bộ nhớ', type: 'Thanh ghi chuyên dụng', detail: 'Memory Address Register, lưu địa chỉ bộ nhớ cần truy cập. CPU dùng nó để gửi vị trí bộ nhớ qua bus địa chỉ.' },
  { name: 'MDR', value: '0x00000000', desc: 'Thanh ghi dữ liệu bộ nhớ', type: 'Thanh ghi chuyên dụng', detail: 'Memory Data Register, lưu tạm dữ liệu cần ghi vào hoặc đọc từ bộ nhớ. Là cầu nối trao đổi dữ liệu giữa CPU và RAM.' },
  { name: 'ACC', value: '0x0000001A', desc: 'Bộ tích lũy', type: 'Thanh ghi chuyên dụng', detail: 'Accumulator, thanh ghi quan trọng nhất trong CPU truyền thống, lưu kết quả trung gian của phép toán số học và logic.' },
])

const generalRegisters = ref([
  { name: 'RAX', value: '0x00000000', desc: 'Giá trị trả về', type: 'Thanh ghi đa dụng', detail: 'Thanh ghi 64-bit, dùng lưu giá trị trả về của hàm. 32-bit thấp là EAX, 16-bit thấp là AX, 8-bit thấp là AL.' },
  { name: 'RBX', value: '0x00000000', desc: 'Thanh ghi cơ sở', type: 'Thanh ghi đa dụng', detail: 'Thanh ghi đa dụng 64-bit, có thể lưu dữ liệu hoặc địa chỉ bộ nhớ.' },
  { name: 'RCX', value: '0x00000000', desc: 'Thanh ghi đếm', type: 'Thanh ghi đa dụng', detail: 'Thanh ghi đa dụng 64-bit, thường dùng cho đếm vòng lặp. 32-bit thấp là ECX.' },
  { name: 'RDX', value: '0x00000000', desc: 'Thanh ghi dữ liệu', type: 'Thanh ghi đa dụng', detail: 'Thanh ghi đa dụng 64-bit, dùng để lưu dữ liệu, cũng dùng trong các lệnh nhân chia.' },
  { name: 'RSI', value: '0x00000000', desc: 'Chỉ số nguồn', type: 'Thanh ghi đa dụng', detail: 'Source Index, đóng vai trò con trỏ địa chỉ nguồn trong các thao tác chuỗi.' },
  { name: 'RDI', value: '0x00000000', desc: 'Chỉ số đích', type: 'Thanh ghi đa dụng', detail: 'Destination Index, đóng vai trò con trỏ địa chỉ đích trong các thao tác chuỗi.' },
  { name: 'RBP', value: '0x00000000', desc: 'Con trỏ khung stack', type: 'Thanh ghi đa dụng', detail: 'Base Pointer, trỏ tới cơ sở của khung stack hàm, dùng để truy cập biến cục bộ và tham số.' },
  { name: 'RSP', value: '0x7FFDE000', desc: 'Con trỏ stack', type: 'Thanh ghi đa dụng', detail: 'Stack Pointer, trỏ tới đỉnh stack hiện tại. Push giảm 4, Pop tăng 4.' },
])

const statusFlags = ref([
  { name: 'CF', value: 0, desc: 'Cờ nhớ (carry)' },
  { name: 'PF', value: 0, desc: 'Cờ chẵn lẻ' },
  { name: 'AF', value: 0, desc: 'Cờ nhớ phụ' },
  { name: 'ZF', value: 0, desc: 'Cờ zero' },
  { name: 'SF', value: 0, desc: 'Cờ dấu' },
  { name: 'OF', value: 0, desc: 'Cờ tràn' },
])

const selectReg = (reg) => {
  selectedReg.value = reg
  activeReg.value = reg.name
}
</script>

<style scoped>
.cpu-registers-demo {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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

.registers-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reg-section {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.reg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.reg-card {
  padding: 10px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.reg-card:hover {
  border-color: #3b82f6;
}

.reg-card.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.reg-card.small {
  padding: 8px;
}

.reg-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.reg-value {
  font-size: 11px;
  font-family: monospace;
  color: #0369a1;
  margin: 4px 0;
}

.reg-desc {
  font-size: 10px;
  color: #64748b;
}

.status-reg {
  margin-top: 0;
}

.flags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.flag-bit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 4px;
  min-width: 60px;
}

.flag-bit.set {
  background: #dbeafe;
  border: 1px solid #3b82f6;
}

.flag-name {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.flag-value {
  font-size: 16px;
  font-weight: 700;
  color: #64748b;
}

.flag-bit.set .flag-value {
  color: #3b82f6;
}

.flag-desc {
  font-size: 9px;
  color: #64748b;
  text-align: center;
}

.reg-details {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.details-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.details-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.details-type {
  font-size: 11px;
  padding: 2px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  color: #0369a1;
}

.details-content {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}

.register-explanation {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.exp-table th,
.exp-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.exp-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.exp-table td {
  color: #475569;
}
</style>
