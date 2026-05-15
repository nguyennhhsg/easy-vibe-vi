<template>
  <div class="domain-demo">
    <div class="header">
      <div class="title">Tầng Domain: thiết kế domain model</div>
      <div class="subtitle">Domain là vật mang khái niệm nghiệp vụ, là nền tảng phụ thuộc của mọi tầng</div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs" :key="t.id"
        :class="['tab', { active: current === t.id }]"
        @click="current = t.id"
      >{{ t.name }}</button>
    </div>

    <div v-if="current === 'comparison'" class="cards">
      <div class="card bad">
        <div class="card-head">
          <span class="card-title">Anemic Model</span>
          <span class="card-badge bad">Cách làm truyền thống</span>
        </div>
        <pre class="code"><code>{{ anemicEntity }}</code></pre>
        <pre class="code"><code>{{ anemicService }}</code></pre>
        <div class="result-box bad">
          <strong>Vấn đề của anemic model</strong>
          <ul>
            <li>Trái với OOP: object chỉ có dữ liệu, không có hành vi</li>
            <li>Logic phân tán: cùng một quy tắc có thể lặp ở nhiều Service</li>
            <li>Khó bảo trì: sửa một quy tắc phải đi tìm tất cả nơi dùng</li>
          </ul>
        </div>
      </div>

      <div class="card good">
        <div class="card-head">
          <span class="card-title">Rich Domain Model</span>
          <span class="card-badge good">Cách làm được khuyến nghị</span>
        </div>
        <pre class="code"><code>{{ richEntity }}</code></pre>
        <pre class="code"><code>{{ richService }}</code></pre>
        <div class="result-box good">
          <strong>Ưu điểm của rich domain model</strong>
          <ul>
            <li>Hợp với OOP: dữ liệu và hành vi được đóng gói cùng nhau</li>
            <li>Nghiệp vụ cô đọng: quy tắc đi theo object, sửa một chỗ là có hiệu lực mọi nơi</li>
            <li>Dễ test: domain object thuần trong bộ nhớ, không cần database</li>
            <li>Diễn đạt tốt: order.cancel() tự nhiên hơn orderService.cancel(order)</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="vo-section">
      <div class="vo-intro">
        <strong>Value Object là gì?</strong>
        <p>Object không có định danh duy nhất, bất biến, mô tả một đặc điểm hoặc thuộc tính. Hai value object có tất cả thuộc tính bằng nhau được coi là cùng một.</p>
      </div>
      <div class="vo-examples">
        <div class="vo-card">
          <div class="vo-name">Address</div>
          <pre class="code"><code>{{ addressVO }}</code></pre>
        </div>
        <div class="vo-card">
          <div class="vo-name">Money</div>
          <pre class="code"><code>{{ moneyVO }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref('comparison')
const tabs = [
  { id: 'comparison', name: 'Anemic vs Rich' },
  { id: 'valueobject', name: 'Thiết kế Value Object' }
]

const anemicEntity = `@Entity
public class Order {
    @Id private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;
    // Chỉ có getter/setter, không có business logic
    public Long getId() { return id; }
    public void setStatus(OrderStatus s) { this.status = s; }
}`

const anemicService = `@Service
public class OrderService {
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        // Anemic model: business logic nằm rải rác trong Service
        if (order.getStatus() == OrderStatus.SHIPPED)
            throw new IllegalStateException("Da giao hang khong huy duoc");
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}`

const richEntity = `@Entity
public class Order {
    @Id private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;

    // Hành vi nghiệp vụ được đóng gói trong entity
    public void cancel() {
        if (this.status == OrderStatus.SHIPPED)
            throw new IllegalStateException("Da giao hang khong huy duoc");
        this.status = OrderStatus.CANCELLED;
        registerEvent(new OrderCancelledEvent(this.id));
    }

    public void pay(Payment payment) {
        if (this.status != OrderStatus.PENDING_PAYMENT)
            throw new IllegalStateException("Trang thai khong dung");
        this.status = OrderStatus.PAID;
    }
}`

const richService = `@Service
public class OrderService {
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.cancel(); // Gọi method nghiệp vụ trên domain object
        orderRepository.save(order);
    }
}`

const addressVO = `// Value object: bất biến, không có ID
public record Address(String province, String city, String district, String street) {
    public String toDisplayString() {
        return String.format("%s%s%s%s", province, city, district, street);
    }
}
// Hai địa chỉ bằng nhau chỉ cần các thuộc tính giống nhau
Address a1 = new Address("Ha Noi", "Cau Giay", "Dich Vong", "Pham Hung");
Address a2 = new Address("Ha Noi", "Cau Giay", "Dich Vong", "Pham Hung");
a1.equals(a2); // true`

const moneyVO = `public record Money(BigDecimal amount, Currency currency) {
    public static Money vnd(BigDecimal amount) {
        return new Money(amount, Currency.getInstance("VND"));
    }
    // Phép toán trả về value object mới (bất biến)
    public Money add(Money other) {
        if (!this.currency.equals(other.currency))
            throw new IllegalArgumentException("Cannot add different currencies");
        return new Money(this.amount.add(other.amount), this.currency);
    }
}
Money price = Money.vnd(new BigDecimal("199000"));
Money shipping = Money.vnd(new BigDecimal("10000"));
Money total = price.add(shipping); // 209000 VND`
</script>

<style scoped>
.domain-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.tab.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.card.bad { border-left: 3px solid var(--vp-c-danger-1); }
.card.good { border-left: 3px solid var(--vp-c-green-1); }

.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.card-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.card-badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.card-badge.bad { background: var(--vp-c-danger-1); }
.card-badge.good { background: var(--vp-c-green-1); }

.code {
  margin: 0 0 12px; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 10px; line-height: 1.5;
}
.code code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 12px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 16px; }
.result-box li { margin: 3px 0; color: var(--vp-c-text-2); }

.vo-section { background: var(--vp-c-bg); border-radius: 10px; padding: 18px; border: 1px solid var(--vp-c-divider); }
.vo-intro { margin-bottom: 16px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }
.vo-intro strong { color: var(--vp-c-text-1); }
.vo-intro p { margin: 6px 0 0; }
.vo-examples { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.vo-card { background: var(--vp-c-bg-soft); border-radius: 8px; padding: 14px; }
.vo-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }

@media (max-width: 1024px) {
  .cards, .vo-examples { grid-template-columns: 1fr; }
}
</style>
