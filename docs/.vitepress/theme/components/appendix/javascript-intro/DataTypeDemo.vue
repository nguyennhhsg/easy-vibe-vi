<template>
  <div class="data-type-demo">
    <div class="demo-header">
      <span class="icon">🏷️</span>
      <span class="title">Kiểu dữ liệu JavaScript</span>
      <span class="subtitle">Kiểu nguyên thủy vs kiểu tham chiếu</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn <span class="highlight">thuê một tủ đồ ngoài trời</span>:
      <span class="highlight">Kiểu nguyên thủy</span> giống như mang đồ về tận nhà (copy một bản);
      <span class="highlight">Kiểu tham chiếu</span> giống như chỉ cầm về một mảnh giấy ghi địa chỉ (cùng trỏ tới một chỗ).
    </div>

    <div class="type-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content-area">
      <!-- Kiểu nguyên thủy -->
      <div
        v-if="activeTab === 'primitive'"
        class="primitive-types"
      >
        <div class="type-grid">
          <div
            v-for="type in primitiveTypes"
            :key="type.name"
            class="type-card"
            :class="{ selected: selectedType?.name === type.name }"
            @click="selectedType = type"
          >
            <div class="type-icon">
              {{ type.icon }}
            </div>
            <div class="type-name">
              {{ type.name }}
            </div>
            <div class="type-example">
              {{ type.example }}
            </div>
          </div>
        </div>

        <div
          v-if="selectedType"
          class="type-detail"
        >
          <div class="detail-title">
            Chi tiết về {{ selectedType.name }}
          </div>
          <div class="detail-desc">
            {{ selectedType.description }}
          </div>
          <div class="detail-note">
            <strong>Đặc điểm chính:</strong> {{ selectedType.note }}
          </div>
        </div>
      </div>

      <!-- Kiểu tham chiếu -->
      <div
        v-else-if="activeTab === 'reference'"
        class="reference-types"
      >
        <div class="comparison-box">
          <div class="compare-side">
            <div class="side-title">
              Gán kiểu nguyên thủy
            </div>
            <div class="code-example">
              <div class="code-line">
                let a = 10
              </div>
              <div class="code-line">
                let b = a
              </div>
              <div class="code-line">
                b = 20
              </div>
              <div class="code-line result">
                // a = 10 (không đổi)
              </div>
            </div>
            <div class="visual-box">
              <div class="value-box">
                a = 10
              </div>
              <div class="arrow">
                Copy
              </div>
              <div class="value-box">
                b = 20
              </div>
            </div>
          </div>

          <div class="compare-side">
            <div class="side-title">
              Gán kiểu tham chiếu
            </div>
            <div class="code-example">
              <div class="code-line">
                let obj1 = {x: 10}
              </div>
              <div class="code-line">
                let obj2 = obj1
              </div>
              <div class="code-line">
                obj2.x = 20
              </div>
              <div class="code-line result">
                // obj1.x = 20 (đã đổi!)
              </div>
            </div>
            <div class="visual-box ref-visual">
              <div class="ref-boxes">
                <div class="ref-var-box">
                  <div class="ref-var-name">
                    obj1
                  </div>
                  <div class="ref-var-arrow">
                    →
                  </div>
                </div>
                <div class="ref-var-box">
                  <div class="ref-var-name">
                    obj2
                  </div>
                  <div class="ref-var-arrow">
                    →
                  </div>
                </div>
              </div>
              <div class="arrow down-arrow">
                Cùng trỏ vào một chỗ
              </div>
              <div class="memory-box">
                {x: 20}
              </div>
            </div>
          </div>
        </div>

        <div class="ref-types-list">
          <div
            v-for="type in referenceTypes"
            :key="type.name"
            class="ref-type-item"
          >
            <div class="ref-icon">
              {{ type.icon }}
            </div>
            <div class="ref-info">
              <div class="ref-name">
                {{ type.name }}
              </div>
              <div class="ref-desc">
                {{ type.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Type conversion -->
      <div
        v-else
        class="type-conversion"
      >
        <div class="conversion-playground">
          <div class="input-section">
            <label>Nhập một giá trị:</label>
            <input
              v-model="inputValue"
              type="text"
              placeholder="Thử nhập '123' hoặc 'hello'"
              @keyup.enter="convertType"
            >
            <button
              class="convert-btn"
              @click="convertType"
            >
              Chuyển kiểu
            </button>
          </div>

          <div class="results-section">
            <div class="result-row">
              <span class="result-label">String():</span>
              <span class="result-value">{{ conversionResults.string }}</span>
            </div>
            <div class="result-row">
              <span class="result-label">Number():</span>
              <span
                class="result-value"
                :class="{ error: conversionResults.number === 'NaN' }"
              >
                {{ conversionResults.number }}
              </span>
            </div>
            <div class="result-row">
              <span class="result-label">Boolean():</span>
              <span class="result-value">{{ conversionResults.boolean }}</span>
            </div>
          </div>

          <div class="falsy-values">
            <div class="falsy-title">
              Các giá trị chuyển thành false (falsy values):
            </div>
            <div class="falsy-list">
              <span
                v-for="val in falsyValues"
                :key="val"
                class="falsy-item"
              >{{ val }}</span>
            </div>
            <div class="falsy-note">
              Mọi giá trị khác (kể cả mảng rỗng [], object rỗng {}) đều chuyển thành true
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      <span v-if="activeTab === 'primitive'">Kiểu nguyên thủy lưu giá trị thật, khi gán thì copy giá trị. Chúng là immutable, mọi thay đổi tạo ra giá trị mới.</span>
      <span v-else-if="activeTab === 'reference'">Kiểu tham chiếu lưu một reference tới địa chỉ bộ nhớ, khi gán thì copy reference. Nhiều biến có thể trỏ tới cùng một object, sửa một biến sẽ ảnh hưởng mọi tham chiếu khác.</span>
      <span v-else>Type conversion là nguồn bug phổ biến trong JS. Hiểu falsy values và quy tắc chuyển kiểu ngầm sẽ giúp tránh nhiều rắc rối. Dùng === thay vì == để tránh chuyển kiểu tự động.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('primitive')
const selectedType = ref(null)
const inputValue = ref('')
const conversionResults = ref({
  string: '-',
  number: '-',
  boolean: '-'
})

const tabs = [
  { id: 'primitive', label: 'Kiểu nguyên thủy' },
  { id: 'reference', label: 'Kiểu tham chiếu' },
  { id: 'conversion', label: 'Type conversion' }
]

const primitiveTypes = [
  {
    name: 'Number',
    icon: '🔢',
    example: '42, 3.14, NaN',
    description: 'Kiểu số, bao gồm số nguyên và số thập phân. NaN nghĩa là "Not a Number".',
    note: 'Mọi số đều là float, không có kiểu integer riêng. Giá trị đặc biệt: Infinity, -Infinity, NaN'
  },
  {
    name: 'String',
    icon: '📝',
    example: '"hello", \'xin chào\'',
    description: 'Kiểu chuỗi, là văn bản bọc trong dấu nháy đơn hoặc nháy kép.',
    note: 'String là immutable, mọi thao tác đều trả về string mới.'
  },
  {
    name: 'Boolean',
    icon: '✅',
    example: 'true, false',
    description: 'Kiểu boolean, chỉ có hai giá trị: true hoặc false.',
    note: 'Thường dùng cho điều kiện và phép toán logic.'
  },
  {
    name: 'Undefined',
    icon: '❓',
    example: 'let x; // x là undefined',
    description: 'Giá trị mặc định khi biến đã khai báo nhưng chưa gán giá trị.',
    note: 'Mang nghĩa "thiếu giá trị". Tự gán undefined không có nhiều ý nghĩa.'
  },
  {
    name: 'Null',
    icon: '🕳️',
    example: 'let x = null;',
    description: 'Biểu thị "giá trị rỗng" hoặc "không có object".',
    note: 'typeof null === "object" là bug lịch sử của JS.'
  },
  {
    name: 'Symbol',
    icon: '🔑',
    example: 'Symbol("id")',
    description: 'Thêm vào từ ES6, biểu thị giá trị duy nhất.',
    note: 'Thường dùng làm key cho object, tránh trùng tên property.'
  },
  {
    name: 'BigInt',
    icon: '🔢',
    example: '9007199254740991n',
    description: 'Thêm vào từ ES2020, biểu thị số nguyên rất lớn.',
    note: 'Hậu tố n sau số. Dùng để xử lý số nguyên cực lớn.'
  }
]

const referenceTypes = [
  {
    name: 'Object',
    icon: '📦',
    description: 'Tập hợp key-value, kiểu tham chiếu phổ biến nhất. Array và function cũng là object.'
  },
  {
    name: 'Array',
    icon: '📚',
    description: 'Tập hợp dữ liệu có thứ tự, thực chất là object đặc biệt.'
  },
  {
    name: 'Function',
    icon: '⚙️',
    description: 'Khối code có thể chạy được, cũng là object và có thể gán cho biến.'
  },
  {
    name: 'Date',
    icon: '📅',
    description: 'Object ngày giờ.'
  },
  {
    name: 'RegExp',
    icon: '🔍',
    description: 'Object regex, dùng cho khớp pattern.'
  }
]

const falsyValues = ['false', '0', '""', 'null', 'undefined', 'NaN']

const convertType = () => {
  const val = inputValue.value
  conversionResults.value = {
    string: String(val),
    number: Number(val).toString(),
    boolean: Boolean(val).toString()
  }
}
</script>

<style scoped>
.data-type-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.type-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.content-area {
  min-height: 350px;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.type-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.type-card.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.type-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.type-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.type-detail {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.detail-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-note {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.comparison-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.compare-side {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.side-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.code-example {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.code-line {
  padding: 0.15rem 0;
  color: #d4d4d4;
}

.code-line.result {
  color: #6a9955;
  margin-top: 0.25rem;
}

.visual-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.value-box {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px solid var(--vp-c-brand);
}

.ref-box {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.memory-box {
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px solid var(--vp-c-brand);
}

.arrow {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  text-align: center;
}

/* Sửa hiển thị của reference type */
.ref-visual {
  flex-direction: column;
  gap: 0.75rem;
}

.ref-boxes {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.ref-var-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ref-var-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.ref-var-arrow {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.down-arrow {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
}

.ref-types-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ref-type-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  align-items: center;
}

.ref-icon {
  font-size: 1.5rem;
}

.ref-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ref-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.conversion-playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-section label {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.input-section input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.convert-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.results-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-row:last-child {
  border-bottom: none;
}

.result-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.result-value {
  font-family: monospace;
  color: var(--vp-c-brand);
}

.result-value.error {
  color: #f48771;
}

.falsy-values {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.falsy-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.falsy-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.falsy-item {
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.falsy-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }

@media (max-width: 768px) {
  .comparison-box {
    grid-template-columns: 1fr;
  }
}
</style>
