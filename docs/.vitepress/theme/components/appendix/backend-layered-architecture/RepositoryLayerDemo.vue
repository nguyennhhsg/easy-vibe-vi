<template>
  <div class="repo-demo">
    <div class="header">
      <div class="title">Tầng Repository: "thủ kho" của dữ liệu</div>
      <div class="subtitle">Repository đóng gói logic truy cập dữ liệu, để tầng trên không cần quan tâm chi tiết database</div>
    </div>

    <div class="toggle-group">
      <button :class="['toggle', { active: view === 'bad' }]" @click="view = 'bad'">Cách làm dở</button>
      <button :class="['toggle', { active: view === 'good' }]" @click="view = 'good'">Cách làm hay</button>
    </div>

    <div :class="['panel', view]">
      <div class="panel-head">
        <span class="panel-title">{{ view === 'bad' ? 'Viết SQL trực tiếp trong Service' : 'Dùng Repository đóng gói truy cập dữ liệu' }}</span>
        <span class="panel-badge">{{ view === 'bad' ? 'Coupling cao' : 'Tách bạch rõ ràng' }}</span>
      </div>

      <pre class="code-block"><code>{{ view === 'bad' ? badCode : goodCode }}</code></pre>

      <div :class="['result-box', view]">
        <strong>{{ view === 'bad' ? 'Vấn đề của cách này' : 'Lợi ích của cách này' }}</strong>
        <ul>
          <li v-for="item in (view === 'bad' ? problems : benefits)" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="compare-table">
      <div class="table-title">So sánh các cách triển khai Repository</div>
      <table>
        <thead>
          <tr><th>Cách triển khai</th><th>Ưu điểm</th><th>Nhược điểm</th><th>Tình huống áp dụng</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in repos" :key="r.name">
            <td><strong>{{ r.name }}</strong><br><span class="tag" :class="r.tagClass">{{ r.tag }}</span></td>
            <td>{{ r.pros }}</td>
            <td>{{ r.cons }}</td>
            <td>{{ r.scene }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('good')

const badCode = `@Service
public class OrderService {
    @Autowired private JdbcTemplate jdbcTemplate;

    public List<Order> getUserOrders(Long userId) {
        // SQL hard-code trong Service
        // Đổi database phải sửa code business
        // Không unit test được, buộc phải nối database thật
        String sql = "SELECT * FROM orders WHERE user_id = ? AND deleted = 0";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            order.setUserId(rs.getLong("user_id"));
            return order;
        }, userId);
    }
}`

const goodCode = `// Định nghĩa interface Repository
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Tự sinh query từ tên method
    List<Order> findByUserIdAndDeletedFalse(Long userId);

    // JPQL tùy biến
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    List<Order> findByDateRange(@Param("start") LocalDateTime start,
                                @Param("end") LocalDateTime end);
}

// Tầng Service (business logic thuần)
@Service
public class OrderService {
    @Autowired private OrderRepository orderRepository; // Phụ thuộc interface

    public List<OrderDTO> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdAndDeletedFalse(userId);
        return orders.stream().map(OrderDTO::from).collect(Collectors.toList());
    }
}`

const problems = [
  'Coupling với database: SQL rải khắp code business, đổi DB như viết lại',
  'Khó test: phải nối DB thật, unit test thành integration test',
  'Code trùng lặp: cùng một điều kiện query lặp trong nhiều method',
  'Rủi ro bảo mật: viết SQL tay dễ bỏ sót chống SQL injection'
]

const benefits = [
  'Tách bạch mối quan tâm: Service lo nghiệp vụ, Repository lo dữ liệu',
  'Khả năng test cao: unit test có thể mock thay cho DB thật',
  'Tái sử dụng code: method query chung định nghĩa một lần, dùng mọi nơi',
  'Chi phí đổi thấp: đổi DB chỉ cần sửa implementation Repository'
]

const repos = [
  { name: 'Spring Data JPA', tag: 'Phổ biến nhất', tagClass: '', pros: 'Suy luận tên method, paging tích hợp', cons: 'Query phức tạp hiệu năng trung bình', scene: 'Phát triển nhanh, CRUD chuẩn' },
  { name: 'MyBatis / MyBatis-Plus', tag: 'Phổ biến tại Châu Á', tagClass: 'blue', pros: 'Kiểm soát SQL hoàn toàn, dynamic SQL mạnh', cons: 'Phải viết SQL tay', scene: 'Query phức tạp, nhạy cảm hiệu năng' },
  { name: 'Spring Data JDBC', tag: 'Nhẹ', tagClass: 'green', pros: 'Đơn giản, nhẹ, khởi động nhanh', cons: 'Không hỗ trợ mapping phức tạp', scene: 'Microservice, aggregate root đơn giản' }
]
</script>

<style scoped>
.repo-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.toggle-group { display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; }
.toggle {
  padding: 8px 18px; border: 2px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
  color: var(--vp-c-text-2); transition: all .2s;
}
.toggle:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.toggle.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.panel {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.panel.bad { border-left: 3px solid var(--vp-c-danger-1); }
.panel.good { border-left: 3px solid var(--vp-c-green-1); }

.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--vp-c-divider); }
.panel-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.panel-badge { padding: 3px 10px; border-radius: 10px; font-size: 11px; color: #fff; }
.panel.bad .panel-badge { background: var(--vp-c-danger-1); }
.panel.good .panel-badge { background: var(--vp-c-green-1); }

.code-block {
  margin: 0 0 14px; padding: 14px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 11px; line-height: 1.6;
}
.code-block code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.6; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 13px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 18px; }
.result-box li { margin: 4px 0; color: var(--vp-c-text-2); }

.compare-table {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 10px; color: #fff; background: #f59e0b; margin-top: 4px; }
.tag.blue { background: #3b82f6; }
.tag.green { background: #10b981; }

@media (max-width: 768px) {
  .toggle-group { flex-direction: column; }
  .toggle { width: 100%; }
}
</style>
