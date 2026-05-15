<template>
  <div class="prototype-demo">
    <div class="demo-header">
      <span class="icon">🧬</span>
      <span class="title">Prototype và kế thừa</span>
      <span class="subtitle">Hiểu cơ chế prototype chain của JavaScript</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn có một <span class="highlight">cuốn bí kíp</span> ghi nhiều chiêu thức chung. Khi cần một chiêu,
      bạn lật <span class="highlight">sổ tay của mình</span> trước, không có thì giở <span class="highlight">bí kíp của sư phụ</span>,
      vẫn không có thì đến <span class="highlight">bí kíp của sư phụ của sư phụ</span>... Chuỗi <span class="highlight">tìm kiếm</span> đó chính là prototype chain.
    </div>

    <div class="demo-tabs">
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

    <!-- Cơ bản về prototype -->
    <div
      v-if="activeTab === 'basic'"
      class="tab-content"
    >
      <div class="concept-explanation">
        <div class="code-panel">
          <div class="code-title">
            Cách tạo object
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // Cách 1: object literal
            </div>
            <div class="code-line">
              const obj1 = { name: "obj1" }
            </div>
            <div class="code-line">
              obj1.__proto__ === Object.prototype <span class="comment">// true</span>
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Cách 2: constructor function
            </div>
            <div class="code-line">
              function Person(name) {
            </div>
            <div class="code-line indent">
              this.name = name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line">
              const p = new Person("An")
            </div>
            <div class="code-line">
              p.__proto__ === Person.prototype <span class="comment">// true</span>
            </div>
          </div>
        </div>

        <div class="prototype-visual">
          <div class="prototype-chain">
            <div
              class="chain-node"
              :class="{ active: chainLevel >= 0 }"
              @click="chainLevel = 0"
            >
              <div class="node-title">
                Instance object (p)
              </div>
              <div class="node-content">
                <div class="property">
                  name: "An"
                </div>
                <div class="proto-link">
                  __proto__ →
                </div>
              </div>
            </div>

            <div
              v-if="chainLevel >= 0"
              class="chain-arrow"
            >
              Tìm xuống
            </div>

            <div
              class="chain-node constructor"
              :class="{ active: chainLevel >= 1 }"
              @click="chainLevel = 1"
            >
              <div class="node-title">
                Person.prototype
              </div>
              <div class="node-content">
                <div class="method">
                  constructor: Person
                </div>
                <div class="proto-link">
                  __proto__ →
                </div>
              </div>
            </div>

            <div
              v-if="chainLevel >= 1"
              class="chain-arrow"
            >
              Tìm xuống
            </div>

            <div
              class="chain-node object"
              :class="{ active: chainLevel >= 2 }"
              @click="chainLevel = 2"
            >
              <div class="node-title">
                Object.prototype
              </div>
              <div class="node-content">
                <div class="method">
                  toString()
                </div>
                <div class="method">
                  hasOwnProperty()
                </div>
                <div class="proto-link">
                  __proto__ → null
                </div>
              </div>
            </div>
          </div>

          <div class="chain-explanation">
            <div v-if="chainLevel === 0">
              <strong>Instance object</strong>
              <p>Khi truy cập p.name, tìm thấy trong property của object đó - trả về "An"</p>
            </div>
            <div v-else-if="chainLevel === 1">
              <strong>Prototype của Person</strong>
              <p>Khi truy cập p.toString(), instance không có - đi lên - Person.prototype cũng không có - đi tiếp lên</p>
            </div>
            <div v-else>
              <strong>Object prototype (đỉnh của chuỗi)</strong>
              <p>Tìm thấy method toString()! Đây là method do tổ tiên của mọi object cung cấp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kế thừa prototype -->
    <div
      v-else-if="activeTab === 'inheritance'"
      class="tab-content"
    >
      <div class="inheritance-demo">
        <div class="inheritance-code">
          <div class="code-title">
            Ví dụ kế thừa prototype
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // Constructor của parent class
            </div>
            <div class="code-line">
              function Animal(name) {
            </div>
            <div class="code-line indent">
              this.name = name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              Animal.prototype.eat = function() {
            </div>
            <div class="code-line indent">
              return this.name + " đang ăn"
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Constructor của child class
            </div>
            <div class="code-line">
              function Dog(name, breed) {
            </div>
            <div class="code-line indent">
              Animal.call(this, name) <span class="comment">// Kế thừa property</span>
            </div>
            <div class="code-line indent">
              this.breed = breed
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Kế thừa method
            </div>
            <div class="code-line">
              Dog.prototype = Object.create(Animal.prototype)
            </div>
            <div class="code-line">
              Dog.prototype.constructor = Dog
            </div>
          </div>
        </div>

        <div class="inheritance-visual">
          <div class="class-diagram">
            <div class="class-box parent">
              <div class="class-title">
                Animal (parent class)
              </div>
              <div class="class-content">
                <div class="class-section">
                  <div class="section-title">
                    Property
                  </div>
                  <div class="section-item">
                    name: String
                  </div>
                </div>
                <div class="class-section">
                  <div class="section-title">
                    Method (prototype)
                  </div>
                  <div class="section-item">
                    eat()
                  </div>
                </div>
              </div>
            </div>

            <div class="inherit-arrow">
              Kế thừa xuống
            </div>

            <div class="class-box child">
              <div class="class-title">
                Dog (child class)
              </div>
              <div class="class-content">
                <div class="class-section">
                  <div class="section-title">
                    Property
                  </div>
                  <div class="section-item">
                    name: String
                  </div>
                  <div class="section-item">
                    breed: String
                  </div>
                </div>
                <div class="class-section">
                  <div class="section-title">
                    Method (prototype)
                  </div>
                  <div class="section-item">
                    eat() <span class="inherited">[kế thừa]</span>
                  </div>
                  <div class="section-item">
                    bark() <span class="own">[mới]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="inheritance-playground">
            <div class="playground-title">
              Thử tạo instance
            </div>
            <div class="input-group">
              <input
                v-model="dogName"
                placeholder="Tên chó"
              >
              <input
                v-model="dogBreed"
                placeholder="Giống chó"
              >
              <button @click="createDog">
                Tạo
              </button>
            </div>
            <div
              v-if="dogInstance"
              class="instance-result"
            >
              <div class="result-item">
                <span class="label">Tên:</span>
                <span class="value">{{ dogInstance.name }}</span>
              </div>
              <div class="result-item">
                <span class="label">Giống:</span>
                <span class="value">{{ dogInstance.breed }}</span>
              </div>
              <div class="result-item">
                <span class="label">Gọi eat():</span>
                <button
                  class="action-btn"
                  @click="callEat"
                >
                  Gọi
                </button>
                <span
                  v-if="eatResult"
                  class="method-result"
                >{{ eatResult }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cú pháp class -->
    <div
      v-else
      class="tab-content"
    >
      <div class="class-syntax-demo">
        <div class="syntax-comparison">
          <div class="syntax-panel old">
            <div class="panel-title">
              Constructor ES5
            </div>
            <div class="code-block">
              <div class="code-line">
                function Person(name) {
              </div>
              <div class="code-line indent">
                this.name = name
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                Person.prototype.greet = function() {
              </div>
              <div class="code-line indent">
                return "Xin chào, tôi là " + this.name
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                const p = new Person("Minh")
              </div>
            </div>
          </div>

          <div class="syntax-panel new">
            <div class="panel-title">
              Cú pháp class ES6
            </div>
            <div class="code-block">
              <div class="code-line">
                class Person {
              </div>
              <div class="code-line indent">
                constructor(name) {
              </div>
              <div class="code-line indent indent">
                this.name = name
              </div>
              <div class="code-line indent">
                }
              </div>
              <div class="code-line" />
              <div class="code-line indent">
                greet() {
              </div>
              <div class="code-line indent indent">
                return "Xin chào, tôi là " + this.name
              </div>
              <div class="code-line indent">
                }
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                const p = new Person("Minh")
              </div>
            </div>
          </div>
        </div>

        <div class="class-features">
          <div class="feature-card">
            <div class="feature-icon">
              🎯
            </div>
            <div class="feature-title">
              Cú pháp rõ ràng hơn
            </div>
            <div class="feature-desc">
              Cú pháp class giúp OOP trực quan hơn, nhưng bản chất vẫn dựa trên prototype
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              🔗
            </div>
            <div class="feature-title">
              Kế thừa gọn hơn
            </div>
            <div class="feature-desc">
              Dùng keyword extends để kế thừa, code ngắn hơn
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              ⚠️
            </div>
            <div class="feature-title">
              Lưu ý
            </div>
            <div class="feature-desc">
              class chỉ là cú pháp đường, bên dưới vẫn là prototype chain
            </div>
          </div>
        </div>

        <div class="inheritance-example">
          <div class="code-title">
            Ví dụ kế thừa với class
          </div>
          <div class="code-block">
            <div class="code-line">
              class Animal {
            </div>
            <div class="code-line indent">
              constructor(name) {
            </div>
            <div class="code-line indent indent">
              this.name = name
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line indent">
              eat() {
            </div>
            <div class="code-line indent indent">
              return this.name + " đang ăn"
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              class Dog extends Animal {
            </div>
            <div class="code-line indent">
              constructor(name, breed) {
            </div>
            <div class="code-line indent indent">
              super(name) <span class="comment">// Gọi constructor của parent</span>
            </div>
            <div class="code-line indent indent">
              this.breed = breed
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line indent">
              bark() {
            </div>
            <div class="code-line indent indent">
              return "Gâu gâu!"
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="key-points">
      <div class="point-title">
        Điểm cốt lõi
      </div>
      <ul class="point-list">
        <li>Mỗi object có property <code>__proto__</code> trỏ tới <code>prototype</code> của constructor của nó</li>
        <li>Khi truy cập property, JS tìm trên chính object đó trước, không có thì leo dần lên prototype chain</li>
        <li>Đỉnh của prototype chain là <code>Object.prototype</code>, <code>__proto__</code> của nó là <code>null</code></li>
        <li><code>class</code> chỉ là cú pháp đường, bản chất vẫn là prototype inheritance</li>
      </ul>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong>
      <span v-if="activeTab === 'basic'">JavaScript dùng prototype chain để kế thừa, không dùng class như nhiều ngôn ngữ khác. Mỗi object có một prototype, lấy prototype làm khuôn để kế thừa method và property. Cơ chế "prototype inheritance" giúp JS rất linh hoạt.</span>
      <span v-else-if="activeTab === 'inheritance'">Prototype inheritance cho phép các object chia sẻ method, tiết kiệm bộ nhớ. Child class kế thừa method của parent qua prototype chain, đồng thời có thể thêm method riêng. Hiểu prototype chain là chìa khóa để nắm OOP trong JavaScript.</span>
      <span v-else>Cú pháp class ES6 giúp OOP gọn gàng dễ đọc, nhưng chỉ là cú pháp đường, bên dưới vẫn là prototype chain. Dùng class giúp code gần với phong cách OOP truyền thống, giảm chi phí học.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('basic')
const chainLevel = ref(0)
const dogName = ref('')
const dogBreed = ref('')
const dogInstance = ref(null)
const eatResult = ref('')

const tabs = [
  { id: 'basic', label: 'Prototype cơ bản' },
  { id: 'inheritance', label: 'Kế thừa prototype' },
  { id: 'class', label: 'Cú pháp class' }
]

const createDog = () => {
  if (dogName.value && dogBreed.value) {
    dogInstance.value = {
      name: dogName.value,
      breed: dogBreed.value
    }
    eatResult.value = ''
  }
}

const callEat = () => {
  if (dogInstance.value) {
    eatResult.value = `${dogInstance.value.name} đang ăn`
  }
}
</script>

<style scoped>
.prototype-demo {
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

.demo-tabs {
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

.tab-content {
  min-height: 380px;
}

.concept-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.code-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.code-block {
  line-height: 1.5;
}

.code-line {
  padding: 0.1rem 0;
}

.code-line.indent {
  padding-left: 1.5rem;
}

.code-line .comment {
  color: #6a9955;
}

.prototype-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prototype-chain {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chain-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.chain-node:hover {
  border-color: var(--vp-c-brand);
}

.chain-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.chain-node.constructor {
  border-color: #c8e6c9;
}

.chain-node.constructor.active {
  background: #e8f5e9;
}

.chain-node.object {
  border-color: #bbdefb;
}

.chain-node.object.active {
  background: #e3f2fd;
}

.node-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.node-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.property {
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.method {
  background: #e3f2fd;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  color: #1976d2;
}

.proto-link {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.chain-arrow {
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.85rem;
}

.chain-explanation {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.85rem;
}

.chain-explanation strong {
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 0.5rem;
}

.chain-explanation p {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.inheritance-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.inheritance-code {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
}

.inheritance-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.class-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.class-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.class-box.parent {
  border-color: #c8e6c9;
}

.class-box.child {
  border-color: var(--vp-c-brand);
}

.class-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.class-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.class-section {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.5rem;
}

.section-title {
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.section-item {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.15rem 0;
  color: var(--vp-c-text-2);
}

.inherited {
  color: #4caf50;
  font-size: 0.7rem;
}

.own {
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.inherit-arrow {
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.inheritance-playground {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.playground-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.input-group input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.input-group button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.instance-result {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.85rem;
}

.result-item .label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 4rem;
}

.result-item .value {
  color: var(--vp-c-text-1);
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.method-result {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.class-syntax-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.syntax-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.syntax-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.syntax-panel.new {
  border: 2px solid var(--vp-c-brand);
}

.panel-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.class-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.feature-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.inheritance-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.key-points {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.point-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.point-list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.6;
}

.point-list code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
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
  .concept-explanation,
  .inheritance-demo,
  .syntax-comparison,
  .class-features {
    grid-template-columns: 1fr;
  }
}
</style>
