<template>
  <div class="async-demo">
    <div class="demo-header">
      <span class="icon">⏳</span>
      <span class="title">Lập trình bất đồng bộ</span>
      <span class="subtitle">Promise, async/await và event loop</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang <span class="highlight">gọi món ở nhà hàng</span>:
      <span class="highlight">đồng bộ</span> là gọi xong cứ đứng đợi, không làm gì khác được;
      <span class="highlight">bất đồng bộ</span> là gọi xong được phát một <span class="highlight">máy báo gọi món</span>,
      bạn có thể lướt điện thoại trước, đến khi máy kêu thì ra lấy — đó chính là tư tưởng cốt lõi của lập trình bất đồng bộ trong JavaScript
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

    <!-- Callback -->
    <div
      v-if="activeTab === 'callback'"
      class="tab-content"
    >
      <div class="callback-demo">
        <div class="concept-card">
          <div class="concept-icon">
            🔄
          </div>
          <div class="concept-title">
            Hàm callback (Callback)
          </div>
          <div class="concept-desc">
            Truyền một function làm tham số cho function khác, sau khi thao tác hoàn tất thì gọi lại nó. Đây là cách xử lý bất đồng bộ sớm nhất.
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">
            Ví dụ callback
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // Mô phỏng thao tác async (như network request)
            </div>
            <div class="code-line">
              function fetchData(callback) {
            </div>
            <div class="code-line indent">
              setTimeout(() => {
            </div>
            <div class="code-line indent indent">
              const data = { id: 1, name: "data" }
            </div>
            <div class="code-line indent indent">
              callback(data)
            </div>
            <div class="code-line indent">
              }, 1000)
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Sử dụng callback
            </div>
            <div class="code-line">
              fetchData(function(data) {
            </div>
            <div class="code-line indent">
              console.log("Nhận được data:", data)
            </div>
            <div class="code-line">
              })
            </div>
          </div>
        </div>

        <div class="callback-problem">
          <div class="problem-title">
            ⚠️ Vấn đề callback hell
          </div>
          <div class="code-block bad">
            <div class="code-line">
              getData(function(a) {
            </div>
            <div class="code-line indent">
              getMoreData(a, function(b) {
            </div>
            <div class="code-line indent indent">
              getMoreData(b, function(c) {
            </div>
            <div class="code-line indent indent indent">
              getMoreData(c, function(d) {
            </div>
            <div class="code-line indent indent indent indent">
              // Lồng nhau vô tận...
            </div>
            <div class="code-line indent indent indent">
              })
            </div>
            <div class="code-line indent indent">
              })
            </div>
            <div class="code-line indent">
              })
            </div>
            <div class="code-line">
              })
            </div>
          </div>
          <div class="problem-desc">
            Nhiều thao tác async lồng vào nhau sẽ khiến code khó bảo trì, gọi là "callback hell".
          </div>
        </div>
      </div>
    </div>

    <!-- Promise -->
    <div
      v-else-if="activeTab === 'promise'"
      class="tab-content"
    >
      <div class="promise-demo">
        <div class="promise-states">
          <div class="state-title">
            Ba trạng thái của Promise
          </div>
          <div class="states-diagram">
            <div
              class="state-box pending"
              :class="{ active: promiseState === 'pending' }"
            >
              <div class="state-name">
                Pending
              </div>
              <div class="state-desc">
                Đang thực hiện
              </div>
            </div>
            <div
              v-if="promiseState === 'pending'"
              class="state-arrow"
            >
              ⏳
            </div>

            <div class="state-branch">
              <div class="branch-top">
                <div
                  class="state-box fulfilled"
                  :class="{ active: promiseState === 'fulfilled' }"
                >
                  <div class="state-name">
                    Fulfilled
                  </div>
                  <div class="state-desc">
                    Đã thành công
                  </div>
                </div>
                <div
                  v-if="promiseState === 'fulfilled'"
                  class="state-arrow"
                >
                  ✅
                </div>
              </div>

              <div class="branch-bottom">
                <div
                  class="state-box rejected"
                  :class="{ active: promiseState === 'rejected' }"
                >
                  <div class="state-name">
                    Rejected
                  </div>
                  <div class="state-desc">
                    Đã thất bại
                  </div>
                </div>
                <div
                  v-if="promiseState === 'rejected'"
                  class="state-arrow"
                >
                  ❌
                </div>
              </div>
            </div>
          </div>

          <div class="promise-actions">
            <button
              class="action-btn success"
              @click="simulatePromise('fulfilled')"
            >
              Mô phỏng thành công
            </button>
            <button
              class="action-btn error"
              @click="simulatePromise('rejected')"
            >
              Mô phỏng thất bại
            </button>
          </div>
        </div>

        <div class="promise-usage">
          <div class="code-title">
            Ví dụ sử dụng Promise
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // Tạo Promise
            </div>
            <div class="code-line">
              const promise = new Promise((resolve, reject) => {
            </div>
            <div class="code-line indent">
              const success = Math.random() > 0.5
            </div>
            <div class="code-line indent">
              if (success) {
            </div>
            <div class="code-line indent indent">
              resolve("Thao tác thành công!")
            </div>
            <div class="code-line indent">
              } else {
            </div>
            <div class="code-line indent indent">
              reject("Thao tác thất bại!")
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              })
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // Sử dụng then/catch
            </div>
            <div class="code-line">
              promise
            </div>
            <div class="code-line indent">
              .then(result => console.log(result))
            </div>
            <div class="code-line indent">
              .catch(error => console.error(error))
            </div>
          </div>

          <div class="promise-chain">
            <div class="chain-title">
              Gọi chuỗi (chaining)
            </div>
            <div class="chain-visual">
              <div class="chain-step">
                <div class="step-box">
                  Promise
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box then">
                  .then()
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box then">
                  .then()
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box catch">
                  .catch()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- async/await -->
    <div
      v-else-if="activeTab === 'async'"
      class="tab-content"
    >
      <div class="async-await-demo">
        <div class="comparison-view">
          <div class="compare-panel promise">
            <div class="panel-title">
              Promise chaining
            </div>
            <div class="code-block">
              <div class="code-line">
                function fetchUser() {
              </div>
              <div class="code-line indent">
                return fetch('/user')
              </div>
              <div class="code-line indent indent">
                .then(res => res.json())
              </div>
              <div class="code-line indent indent">
                .then(user => {
              </div>
              <div class="code-line indent indent indent">
                return fetch(`/posts/${user.id}`)
              </div>
              <div class="code-line indent indent">
                })
              </div>
              <div class="code-line indent indent">
                .then(res => res.json())
              </div>
              <div class="code-line indent indent">
                .then(posts => {
              </div>
              <div class="code-line indent indent indent">
                console.log(posts)
              </div>
              <div class="code-line indent indent">
                })
              </div>
              <div class="code-line">
                }
              </div>
            </div>
          </div>

          <div class="compare-panel async">
            <div class="panel-title">
              Cú pháp async/await
            </div>
            <div class="code-block">
              <div class="code-line">
                async function fetchUser() {
              </div>
              <div class="code-line indent">
                try {
              </div>
              <div class="code-line indent indent">
                const res = await fetch('/user')
              </div>
              <div class="code-line indent indent">
                const user = await res.json()
              </div>
              <div class="code-line indent indent">
                const postRes = await fetch(`/posts/${user.id}`)
              </div>
              <div class="code-line indent indent">
                const posts = await postRes.json()
              </div>
              <div class="code-line indent indent">
                console.log(posts)
              </div>
              <div class="code-line indent">
                } catch (error) {
              </div>
              <div class="code-line indent indent">
                console.error(error)
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

        <div class="async-playground">
          <div class="playground-title">
            Đặc điểm async/await
          </div>
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">
                📖
              </div>
              <div class="feature-name">
                Giống code đồng bộ hơn
              </div>
              <div class="feature-desc">
                Viết code async theo kiểu đồng bộ, dễ đọc hơn
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                🎯
              </div>
              <div class="feature-name">
                Xử lý lỗi đơn giản
              </div>
              <div class="feature-desc">
                Dùng try/catch để xử lý lỗi thay cho .catch()
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                ⚡
              </div>
              <div class="feature-name">
                Thân thiện khi debug
              </div>
              <div class="feature-desc">
                Có thể đặt breakpoint trong debugger
              </div>
            </div>
          </div>

          <div class="code-note">
            <strong>💡 Ghi nhớ:</strong>
            <ul>
              <li>Hàm async luôn trả về Promise</li>
              <li>await chỉ dùng được bên trong hàm async</li>
              <li>await sẽ tạm dừng hàm cho tới khi Promise trả về kết quả</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Event loop -->
    <div
      v-else
      class="tab-content"
    >
      <div class="event-loop-demo">
        <div class="loop-visual">
          <div class="loop-title">
            Event Loop
          </div>
          <div class="loop-diagram">
            <div class="diagram-section">
              <div class="section-title">
                Call Stack
              </div>
              <div class="stack-box">
                <div
                  v-for="(item, i) in callStack"
                  :key="i"
                  class="stack-item"
                >
                  {{ item }}
                </div>
                <div
                  v-if="callStack.length === 0"
                  class="stack-empty"
                >
                  Trống
                </div>
              </div>
            </div>

            <div class="diagram-arrows">
              <div class="arrow-right">
                Push →
              </div>
              <div class="arrow-left">
                ← Pop
              </div>
            </div>

            <div class="diagram-section">
              <div class="section-title">
                Task Queue
              </div>
              <div class="task-queues">
                <div class="queue-box">
                  <div class="queue-title">
                    Macro Tasks
                  </div>
                  <div class="queue-items">
                    <div
                      v-for="(task, i) in macroTasks"
                      :key="i"
                      class="task-item macro"
                    >
                      {{ task }}
                    </div>
                  </div>
                </div>
                <div class="queue-box">
                  <div class="queue-title">
                    Micro Tasks
                  </div>
                  <div class="queue-items">
                    <div
                      v-for="(task, i) in microTasks"
                      :key="i"
                      class="task-item micro"
                    >
                      {{ task }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="loop-rules">
            <div class="rule-title">
              Quy tắc thực thi
            </div>
            <ol class="rule-list">
              <li>Thực thi code đồng bộ (code trong call stack)</li>
              <li>Khi call stack rỗng, thực thi toàn bộ micro tasks trước</li>
              <li>Sau khi micro tasks hết, thực thi một macro task</li>
              <li>Lặp lại bước 2-3</li>
            </ol>
          </div>
        </div>

        <div class="code-challenge">
          <div class="challenge-title">
            🤔 Đoán xem thứ tự output là gì?
          </div>
          <div class="code-block">
            <div class="code-line">
              console.log("1")
            </div>
            <div class="code-line" />
            <div class="code-line">
              setTimeout(() => console.log("2"), 0) <span class="comment">// Macro task</span>
            </div>
            <div class="code-line" />
            <div class="code-line">
              Promise.resolve().then(() => console.log("3")) <span class="comment">// Micro task</span>
            </div>
            <div class="code-line" />
            <div class="code-line">
              console.log("4")
            </div>
          </div>

          <button
            class="answer-btn"
            @click="showEventLoopAnswer"
          >
            {{ showAnswer ? 'Ẩn đáp án' : 'Xem đáp án' }}
          </button>

          <div
            v-if="showAnswer"
            class="answer-reveal"
          >
            <div class="output-order">
              <div class="order-item">
                <span class="order-num">1</span>
                <span class="order-output">"1"</span>
                <span class="order-reason">Code đồng bộ</span>
              </div>
              <div class="order-item">
                <span class="order-num">2</span>
                <span class="order-output">"4"</span>
                <span class="order-reason">Code đồng bộ</span>
              </div>
              <div class="order-item">
                <span class="order-num">3</span>
                <span class="order-output">"3"</span>
                <span class="order-reason">Micro task (Promise.then)</span>
              </div>
              <div class="order-item">
                <span class="order-num">4</span>
                <span class="order-output">"2"</span>
                <span class="order-reason">Macro task (setTimeout)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong>
      <span v-if="activeTab === 'callback'">Callback là cách xử lý bất đồng bộ cơ bản nhất, nhưng rất dễ rơi vào "callback hell". JavaScript hiện đại cung cấp Promise và async/await để xử lý async một cách thanh lịch hơn.</span>
      <span v-else-if="activeTab === 'promise'">Promise là container cho thao tác async, có ba trạng thái: Pending (đang xử lý), Fulfilled (đã thành công), Rejected (đã thất bại). Một khi trạng thái đổi thì không đổi lại nữa. Promise hỗ trợ chaining, tránh được callback hell.</span>
      <span v-else-if="activeTab === 'async'">async/await là "syntactic sugar" của Promise, giúp code async trông như code đồng bộ. Hàm async trả về Promise, await sẽ tạm dừng hàm cho đến khi Promise trả kết quả. Đây hiện là cách viết async được khuyên dùng nhất.</span>
      <span v-else>Event loop là cơ chế thực thi của JavaScript. JavaScript chạy single-thread, dùng event loop để xử lý bất đồng bộ. Thứ tự thực thi: code đồng bộ → toàn bộ micro tasks → một macro task → toàn bộ micro tasks → lặp lại. Hiểu thứ tự này cực kỳ quan trọng khi debug code async.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('callback')
const promiseState = ref('pending')
const showAnswer = ref(false)

const callStack = ref(['main', 'console.log("1")'])
const macroTasks = ref(['setTimeout callback'])
const microTasks = ref(['Promise.then callback'])

const tabs = [
  { id: 'callback', label: 'Callback' },
  { id: 'promise', label: 'Promise' },
  { id: 'async', label: 'async/await' },
  { id: 'eventloop', label: 'Event Loop' }
]

const simulatePromise = (state) => {
  promiseState.value = state
  setTimeout(() => {
    promiseState.value = 'pending'
  }, 2000)
}

const showEventLoopAnswer = () => {
  showAnswer.value = !showAnswer.value
}
</script>

<style scoped>
.async-demo {
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

.callback-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.concept-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.concept-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.concept-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.concept-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.code-example {
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

.code-line.indent.indent {
  padding-left: 3rem;
}

.code-line.indent.indent.indent {
  padding-left: 4.5rem;
}

.code-line.indent.indent.indent.indent {
  padding-left: 6rem;
}

.code-line .comment {
  color: #6a9955;
}

.callback-problem {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.problem-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.code-block.bad {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.problem-desc {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.promise-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.promise-states {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.state-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.states-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.state-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.state-box.active {
  transform: scale(1.05);
}

.state-box.pending {
  border-color: #ff9800;
}

.state-box.pending.active {
  background: #fff3e0;
}

.state-box.fulfilled {
  border-color: #4caf50;
}

.state-box.fulfilled.active {
  background: #e8f5e9;
}

.state-box.rejected {
  border-color: #f44336;
}

.state-box.rejected.active {
  background: #ffebee;
}

.state-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.state-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.state-arrow {
  text-align: center;
  font-size: 1rem;
}

.state-branch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.branch-top, .branch-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.promise-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-btn.success {
  background: #4caf50;
  color: white;
}

.action-btn.error {
  background: #f44336;
  color: white;
}

.promise-usage {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.promise-chain {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.chain-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.chain-visual {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chain-step {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.step-box {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
}

.step-box.then {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.step-box.catch {
  background: #ffebee;
  border-color: #f44336;
  color: #c62828;
}

.step-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.async-await-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.compare-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
}

.compare-panel.async {
  border: 2px solid var(--vp-c-brand);
}

.panel-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.async-playground {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.playground-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.feature-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.code-note {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.code-note strong {
  color: var(--vp-c-brand);
}

.code-note ul {
  margin: 0.5rem 0 0 1.2rem;
  padding: 0;
  line-height: 1.5;
}

.event-loop-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.loop-visual {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.loop-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.loop-diagram {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.diagram-section {
  flex: 1;
}

.section-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stack-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 100px;
}

.stack-item {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.stack-empty {
  color: var(--vp-c-text-3);
  text-align: center;
  font-size: 0.8rem;
  padding: 0.5rem;
}

.diagram-arrows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.arrow-right, .arrow-left {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  text-align: center;
}

.task-queues {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
}

.queue-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.task-item {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.7rem;
}

.task-item.macro {
  background: #fff3e0;
  color: #e65100;
}

.task-item.micro {
  background: #e8f5e9;
  color: #2e7d32;
}

.loop-rules {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 0.5rem;
}

.rule-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.rule-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.code-challenge {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.challenge-title {
  color: #888;
  margin-bottom: 0.5rem;
}

.answer-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0.75rem 0;
  font-size: 0.85rem;
}

.answer-reveal {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.output-order {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.order-num {
  background: var(--vp-c-brand);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.order-output {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.order-reason {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
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
  .promise-demo,
  .comparison-view,
  .event-loop-demo,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
