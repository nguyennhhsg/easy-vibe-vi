# Kiến trúc phân tầng Backend

> **Vấn đề cốt lõi**: Khi code ngày càng phức tạp, làm sao để tổ chức cho rõ ràng dễ hiểu?

Khi dự án mở rộng từ vài chục dòng code thành hàng vạn dòng, từ một người phát triển thành nhiều người cộng tác, từ những hoạt động CRUD đơn giản thành logic kinh doanh phức tạp, cách tổ chức code trực tiếp quyết định số mệnh của dự án. Kiến trúc phân tầng không phải để khoe kỹ năng hay tuân theo giáo điều, mà để giải quyết một mâu thuẫn cơ bản trong kỹ thuật phần mềm: **sự gia tăng tự nhiên của độ phức tạp kinh doanh** với **khả năng nhận thức hạn chế của con người**.

---

## 1. Tại sao cần phân tầng?

### 1.1 Gốc rễ của vấn đề

**Phiên bản ban đầu**(100 dòng code):
```java
@PostMapping("/register")
public Result register(@RequestBody User user) {
    // 1. Kiểm tra xem tên người dùng có trùng không
    if (userRepository.findByUsername(user.getUsername()) != null) {
        return Result.error("Tên người dùng đã tồn tại");
    }
    // 2. Mã hóa mật khẩu
    user.setPassword(encrypt(user.getPassword()));
    // 3. Lưu người dùng
    userRepository.save(user);
    // 4. Gửi email chào mừng
    emailService.sendWelcome(user.getEmail());
    // 5. Ghi log
    log.info("User registered: {}", user.getUsername());
    return Result.success();
}
```

**6 tháng sau**(500 dòng code):
- Thêm xác thực số điện thoại
- Thêm xác thực danh tính
- Thêm phần thưởng mời
- Thêm kiểm tra rủi ro
- ... 

Bây giờ method này có 500 dòng, mỗi lần sửa đổi đều cảm thấy lo lắng, vì:
- Logic trộn lẫn với nhau, sửa một chỗ có thể ảnh hưởng đến tính năng khác
- Khó kiểm tra, mỗi lần kiểm tra phải mô phỏng yêu cầu HTTP hoàn chỉnh
- Người mới không hiểu, vì tất cả logic đều xếp chồng lên nhau

**Bản chất của vấn đề**: Code không có "ranh giới", tất cả trách nhiệm đều trộn lẫn.

**Hiệu ứng tích lũy nợ kỹ thuật**:
- ❌ **Độ liên kết cao**: Logic kinh doanh với truy cập dữ liệu, giao thức HTTP liên kết chặt chẽ, sửa một chỗ ảnh hưởng nhiều chỗ khác
- ❌ **Độ kết dính thấp**: Một method chịu nhiều trách nhiệm, vi phạm nguyên tắc một trách nhiệm
- ❌ **Khó kiểm tra**: Không thể kiểm tra logic kinh doanh độc lập, phải khởi động toàn bộ container HTTP
- ❌ **Khó tái sử dụng**: Logic kinh doanh bị ràng buộc trong yêu cầu HTTP, tác vụ định kỳ, hàng đợi tin nhắn không thể tái sử dụng
- ❌ **Tải nhận thức cao**: Nhà phát triển cần hiểu tất cả chi tiết của tất cả tầng, không thể tập trung

### 1.2 Ý tưởng cốt lõi của phân tầng

Kiến trúc phân tầng chính là vẽ ranh giới cho code:

```
┌─────────────────────────────────────┐
│  Nhận yêu cầu ← Controller          │  Chỉ chịu trách nhiệm "nhận đơn"
├─────────────────────────────────────┤
│  Sắp xếp kinh doanh ← Service       │  Chỉ chịu trách nhiệm "nấu ăn"
├─────────────────────────────────────┤
│  Truy cập dữ liệu ← Repository      │  Chỉ chịu trách nhiệm "lấy nguyên liệu"
├─────────────────────────────────────┤
│  Định nghĩa kinh doanh ← Domain     │  Chỉ chịu trách nhiệm "tiêu chuẩn công thức"
└─────────────────────────────────────┘
```

**Nguyên tắc chính**:
- Mỗi tầng chỉ làm việc của riêng mình
- Các tầng giao tiếp qua giao diện rõ ràng
- Logic kinh doanh tập trung ở Service và Domain
- Logic truy cập dữ liệu tập trung ở Repository

**Giá trị kỹ thuật của kiến trúc phân tầng**:

1. **Giảm tải nhận thức**: Nhà phát triển có thể tập trung vào trách nhiệm của tầng hiện tại mà không cần hiểu chi tiết toàn bộ
2. **Tăng tính kiểm tra được**: Mỗi tầng có thể kiểm tra đơn vị độc lập, Mock các phụ thuộc
3. **Tăng khả năng bảo trì**: Khi yêu cầu thay đổi, phạm vi sửa đổi rõ ràng, giảm rủi ro
4. **Thúc đẩy tái sử dụng code**: Logic kinh doanh không phụ thuộc HTTP, có thể tái sử dụng trong tác vụ định kỳ, hàng đợi tin nhắn
5. **Hỗ trợ hợp tác nhóm**: Các nhà phát triển khác nhau có thể phát triển các tầng khác nhau song song, giảm xung đột
6. **Kéo dài tuổi thọ code**: Ranh giới rõ ràng giúp code dễ dàng tái cấu trúc và phát triển

---

## 2. Giải thích chi tiết kiến trúc bốn tầng

### 2.1 Cấu trúc tổng thể

Bản chất của kiến trúc phân tầng là **tách biệt mối quan tâm**(Separation of Concerns) và **kiểm soát hướng phụ thuộc**:

```
┌─────────────────────────────────────────────────┐
│  Yêu cầu từ frontend                             │
└────────────────────┬────────────────────────────┘
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────┐
│  Controller (Tầng điều khiển)                   │
│  - Nhận yêu cầu, xác thực tham số               │
│  - Chuyển đổi DTO                               │
│  - Gọi Service                                  │
│  - Trả về phản hồi                              │
└────────────────────┬────────────────────────────┘
                     │ Gọi kinh doanh
                     ▼
┌─────────────────────────────────────────────────┐
│  Service (Tầng logic kinh doanh)                │
│  - Sắp xếp logic kinh doanh                     │
│  - Quản lý giao dịch                            │
│  - Điều phối nhiều Repository                   │
│  - Điều phối liên mô đun                        │
└────────────────────┬────────────────────────────┘
                     │ Truy cập dữ liệu
                     ▼
┌─────────────────────────────────────────────────┐
│  Repository (Tầng truy cập dữ liệu)             │
│  - CRUD cơ sở dữ liệu                           │
│  - Đóng gói truy vấn                            │
│  - Ánh xạ ORM                                   │
└────────────────────┬────────────────────────────┘
                     │ Đối tượng miền
                     ▼
┌─────────────────────────────────────────────────┐
│  Domain (Tầng mô hình miền)                     │
│  - Entity (Thực thể)                            │
│  - Value Object (Đối tượng giá trị)             │
│  - Quy tắc kinh doanh                           │
└─────────────────────────────────────────────────┘
```

**Hướng phụ thuộc**: Code phụ thuộc phải chỉ hướng đến **ổn định hơn, trừu tượng hơn**
- Controller phụ thuộc vào giao diện Service (trừu tượng)
- Service phụ thuộc vào giao diện Repository (trừu tượng)
- Tất cả tầng đều phụ thuộc vào Domain (ổn định nhất)
- **Không cho phép phụ thuộc ngược**(Repository phụ thuộc Service chẳng hạn)

<LayeredArchitectureDemo />

### 2.2 Tầng Controller

**Trách nhiệm**: "Tiếp tân" của yêu cầu

- Nhận yêu cầu HTTP, phân tích tham số
- Xác thực tham số (định dạng, bắt buộc)
- Chuyển đổi DTO (Request → Param)
- Gọi Service thực thi kinh doanh
- Chuyển đổi DTO (Result → Response)
- Trả về phản hồi HTTP

**Không nên làm**:
- Viết logic kinh doanh trực tiếp
- Truy cập cơ sở dữ liệu trực tiếp
- Xử lý giao dịch

**Triết lý thiết kế**:
Controller là "mặt tiền" của hệ thống, chịu trách nhiệm adapter — chuyển đổi giao thức HTTP bên ngoài thành gọi kinh doanh bên trong. Nó không nên chứa bất kỳ quyết định kinh doanh nào, vì quyết định kinh doanh là sự thể hiện kiến thức miền, nên tách biệt với giao thức truyền tải.

**Ví dụ**:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(
            @RequestBody @Valid UserRequest request) {
        
        // 1. Request DTO → Param DTO
        UserParam param = UserParam.builder()
                .username(request.getUsername())
                .password(encrypt(request.getPassword()))
                .email(request.getEmail())
                .build();

        // 2. Gọi Service
        User user = userService.createUser(param);

        // 3. Entity → Response DTO
        return UserResponse.from(user);
    }
}
```

**Điểm chính**:
- Dùng `@Valid` tự động xác thực tham số
- Dùng DTO để cách li cấu trúc dữ liệu frontend/backend
- Chỉ "dịch" và "điều phối", không chứa logic kinh doanh

<ControllerLayerDemo />

### 2.3 Tầng Service

**Trách nhiệm**: "Đầu bếp" của kinh doanh

- Thực hiện logic kinh doanh cốt lõi
- Sắp xếp hoạt động của nhiều Repository
- Quản lý ranh giới giao dịch
- Xử lý điều phối liên mô đun

**Không nên làm**:
- Viết SQL trực tiếp (giao cho Repository)
- Xử lý những thứ liên quan HTTP
- Trả về thực thể cơ sở dữ liệu cho Controller

**Triết lý thiết kế**:
Tầng Service là nơi chứa logic kinh doanh, nên giữ sự tinh khiết. Nó không phụ thuộc vào bất kỳ framework hoặc giao thức truyền tải nào, điều này cho phép:
- Kiểm tra đơn vị độc lập với tầng Web
- Tái sử dụng trong tác vụ định kỳ, bộ tiêu thụ hàng đợi tin nhắn
- Tránh thay đổi stack kỹ thuật ảnh hưởng đến logic kinh doanh

**Ví dụ**:
```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional
    public User createUser(UserParam param) {
        // 1. Quy tắc kinh doanh: kiểm tra xem tên người dùng có trùng không
        if (userRepository.existsByUsername(param.getUsername())) {
            throw new UserAlreadyExistsException();
        }

        // 2. Tạo thực thể người dùng
        User user = new User();
        user.setUsername(param.getUsername());
        user.setPassword(param.getPassword());
        user.setEmail(param.getEmail());

        // 3. Lưu vào cơ sở dữ liệu
        userRepository.save(user);

        // 4. Gửi email chào mừng (điều phối liên mô đun)
        emailService.sendWelcomeEmail(user);

        return user;
    }
}
```

**Điểm chính**:
- Dùng Transactional đảm bảo tính nhất quán giao dịch
- Ném ngoại lệ kinh doanh, để Controller xử lý thống nhất
- Không phụ thuộc vào khái niệm HTTP, có thể tái sử dụng

<ServiceLayerDemo />

### 2.4 Tầng Repository

**Trách nhiệm**: "Quản lý kho" dữ liệu

- Đóng gói tất cả logic truy cập dữ liệu
- Thực hiện hoạt động CRUD
- Xử lý ánh xạ ORM
- Đóng gói điều kiện truy vấn

**Không nên làm**:
- Viết logic kinh doanh
- Xử lý giao dịch (quản lý ở tầng Service)
- Phụ thuộc vào tầng trên

**Triết lý thiết kế**:
Repository là tầng trừu tượng hóa truy cập dữ liệu, nó che giấu chi tiết cơ sở dữ liệu cơ bản. Giá trị của sự trừu tượng hóa này là:
- Khi thay đổi cơ sở dữ liệu, chỉ cần sửa Repository, logic kinh doanh không thay đổi
- Tiện lợi Mock để kiểm tra đơn vị
- Logic truy vấn tập trung quản lý, tránh lặp lại code

**Ví dụ**:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA tự động thực hiện
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    // Truy vấn phức tạp tùy chỉnh
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deleted = false")
    Optional<User> findActiveByEmail(@Param("email") String email);
}
```

**Điểm chính**:
- Repository là giao diện, không chứa logic kinh doanh
- Dùng tên phương thức thể hiện ý định truy vấn
- Có thể dùng Query tùy chỉnh truy vấn phức tạp

<RepositoryLayerDemo />

### 2.5 Tầng Domain

**Trách nhiệm**: "Tiêu chuẩn công thức" kinh doanh

- Định nghĩa thực thể kinh doanh (Entity)
- Định nghĩa đối tượng giá trị (Value Object)
- Đóng gói quy tắc kinh doanh
- Là phụ thuộc chung của tất cả tầng

**Đặc điểm quan trọng**:
- Tầng Domain không phụ thuộc vào bất kỳ tầng nào khác
- Tất cả tầng đều phụ thuộc vào tầng Domain
- Là nền tảng của kiến trúc phân tầng

**Triết lý thiết kế**:
Tầng Domain là lõi kinh doanh của hệ thống, nó thể hiện kiến thức miền và quy tắc kinh doanh. Sự tinh khiết của nó rất quan trọng:
- Không phụ thuộc framework có nghĩa là logic kinh doanh không bị stack kỹ thuật ràng buộc
- Tất cả tầng đều phụ thuộc vào nó, đảm bảo sự thống nhất của quy tắc kinh doanh
- Tiện lợi cho tiến hóa dài hạn, stack kỹ thuật có thể thay thế, quy tắc kinh doanh tương đối ổn định

**Ví dụ**:
```java
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // ✅ Phương thức kinh doanh: đóng gói quy tắc kinh doanh
    public boolean isPasswordCorrect(String rawPassword) {
        return BCrypt.checkpw(rawPassword, this.password);
    }

    public void changePassword(String oldPassword, String newPassword) {
        if (!isPasswordCorrect(oldPassword)) {
            throw new IncorrectPasswordException();
        }
        this.password = BCrypt.hashpw(newPassword);
    }
}
```

**Điểm chính**:
- Entity có định danh duy nhất
- Quy tắc kinh doanh được đóng gói trong đối tượng Domain
- Tầng Domain là logic kinh doanh tinh khiết, không phụ thuộc framework

<DomainModelDemo />

---

## 3. DTO: "Người phiên dịch" giữa các tầng

### 3.1 Tại sao cần DTO?

**Vấn đề**: Nếu trực tiếp trả về thực thể cơ sở dữ liệu cho frontend:

```java
// ❌ Sai: Trả về Entity trực tiếp
@Entity
public class User {
    private Long id;
    private String username;
    private String password;        // Thông tin nhạy cảm!
    private Boolean isDeleted;      // Trường nội bộ!
}
```

Frontend sẽ nhận được các trường không nên tiết lộ, tồn tại rủi ro bảo mật.

**Giải pháp**: Dùng DTO để "dịch"

```
Thực thể cơ sở dữ liệu → Param/Result Service → Request/Response Controller → Frontend
```

### 3.2 Các loại DTO

| Loại | Mục đích | Ví dụ |
|------|---------|-------|
| Request DTO | Controller nhận tham số | UserCreateRequest |
| Response DTO | Controller trả về dữ liệu | UserResponse |
| Param DTO | Tham số phương thức Service | UserParam |
| Result DTO | Kết quả trả về Service | UserResult |
| Entity | Ánh xạ cơ sở dữ liệu | User |

**Nguyên tắc chính**:
Mỗi tầng dùng DTO của riêng mình, không trực tiếp truyền Entity. DTO chỉ chứa các trường cần thiết, điều này tránh tiết lộ chi tiết thực hiện nội bộ, đảm bảo tính độc lập của các tầng.

<DtoFlowDemo />

---

## 4. Hướng phụ thuộc: Luật sắt của kiến trúc phân tầng

### 4.1 Nguyên tắc đảo ngược phụ thuộc

**Cách sai**:
```
Controller → UserServiceImpl → UserDaoImpl → UserEntity
```

**Cách đúng**:
```
Controller → UserService(giao diện) → UserRepository(giao diện) → UserEntity
```

**Hướng phụ thuộc**:

Hướng phụ thuộc đúng là tất cả tầng đều phụ thuộc vào tầng trừu tượng hơn, ổn định hơn. Cụ thể, Controller phụ thuộc vào giao diện Service, Service phụ thuộc vào giao diện Repository, tất cả tầng đều phụ thuộc vào tầng Domain, còn tầng Domain không phụ thuộc vào bất kỳ tầng nào. Hướng phụ thuộc này đảm bảo tính độc lập của logic kinh doanh và khả năng kiểm tra.

Cách sai bao gồm Service phụ thuộc trực tiếp vào lớp thực hiện Repository, Controller truy cập cơ sở dữ liệu trực tiếp, hoặc tầng Domain phụ thuộc vào tầng khác, những điều này dẫn đến độ liên kết cao, giảm khả năng bảo trì hệ thống.

### 4.2 Ví dụ code

```java
// ✅ Đúng: Phụ thuộc vào giao diện
@Service
public class OrderService {
    private final OrderRepository orderRepository;  // giao diện
    private final PaymentService paymentService;    // giao diện
}

// ✅ Lớp thực hiện được tự động inject bởi Spring
@Repository
public class OrderRepositoryImpl implements OrderRepository {
    // Chi tiết thực hiện
}
```

<DependencyDirectionDemo />

---

## 5. Trường hợp thực tế: Hệ thống đơn hàng thương mại điện tử

### 5.1 Yêu cầu

Tạo đơn hàng:
1. Người dùng chọn sản phẩm
2. Kiểm tra kho hàng
3. Tính toán tổng tiền
4. Tạo đơn hàng
5. Giảm kho hàng

### 5.2 Thực hiện code

**Tầng Domain**:
```java
@Entity
public class Order {
    @Id
    private Long id;
    private Long userId;
    private List<OrderItem> items;
    private Money totalAmount;
    private OrderStatus status;

    public void calculateTotal() {
        Money total = Money.zero();
        for (OrderItem item : items) {
            total = total.add(item.getSubTotal());
        }
        this.totalAmount = total;
    }

    public void cancel() {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("Chỉ có đơn hàng chờ thanh toán mới có thể hủy");
        }
        this.status = OrderStatus.CANCELLED;
    }
}
```

**Tầng Repository**:
```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
}
```

**Tầng Service**:
```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;

    @Transactional
    public OrderDTO createOrder(OrderParam param) {
        // 1. Xác thực sản phẩm và giảm kho hàng
        for (OrderItemParam item : param.getItems()) {
            inventoryService.reserveStock(item.getProductId(), item.getQuantity());
        }

        // 2. Tạo đơn hàng
        Order order = new Order();
        order.setUserId(param.getUserId());
        order.calculateTotal();

        // 3. Lưu đơn hàng
        orderRepository.save(order);

        return OrderDTO.from(order);
    }
}
```

**Tầng Controller**:
```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody @Valid OrderRequest request) {
        OrderParam param = OrderParam.builder()
                .userId(request.getUserId())
                .items(request.getItems())
                .build();

        OrderDTO order = orderService.createOrder(param);

        return OrderResponse.from(order);
    }
}
```

---

## 6. Các câu hỏi thường gặp

### 6.1 Controller có thể viết logic kinh doanh không?

Controller không nên viết logic kinh doanh, nó chỉ chịu trách nhiệm nhận yêu cầu và trả về phản hồi. Logic kinh doanh nên được đóng gói trong tầng Service, lợi ích là code có thể tái sử dụng, ví dụ như tác vụ định kỳ hoặc bộ tiêu thụ hàng đợi tin nhắn có thể gọi trực tiếp Service mà không cần qua yêu cầu HTTP. Đồng thời, logic kinh doanh tập trung ở một nơi, dễ kiểm tra và bảo trì, tránh logic bị phân tán gây ra tình trạng không nhất quán.

### 6.2 Mô hình ít máu và mô hình nhiều máu là gì?

Mô hình ít máu là khi lớp thực thể chỉ chứa thuộc tính và các phương thức getter/setter tương ứng, không chứa bất kỳ logic kinh doanh nào, tất cả quy tắc kinh doanh được đặt ở tầng Service. Mô hình này cấu trúc đơn giản, dễ hiểu, là cách được hầu hết dự án sử dụng.

Mô hình nhiều máu là khi lớp thực thể không chỉ chứa thuộc tính mà còn chứa các phương thức kinh doanh liên quan đến thực thể đó, đóng gói quy tắc kinh doanh bên trong. Cách tiếp cận này phù hợp hơn với tư duy hướng đối tượng, để dữ liệu và hành vi ở cùng nhau, tăng tính kết dính của code.

Khuyến nghị chọn mô hình phù hợp dựa trên nền tảng kỹ thuật của nhóm và độ phức tạp của dự án, nhưng dù chọn loại nào cũng nên giữ tính nhất quán, và tầng Domain ít nhất nên chứa các phương thức hành vi cơ bản, thay vì hoàn toàn rỗng.

### 6.3 Làm sao xử lý giao dịch khi vượt qua nhiều Service?

Khi một hoạt động kinh doanh cần vượt qua nhiều Service, nên dùng chú thích giao dịch trong Service ở tầng trên, gọi lần lượt các Service dưới trong phương thức này. Cách này đảm bảo tất cả hoạt động được thực hiện trong cùng một bối cảnh giao dịch, hoặc thành công tất cả hoặc thất bại tất cả, đảm bảo tính nhất quán của dữ liệu. Cần lưu ý rằng ranh giới giao dịch nên càng nhỏ càng tốt, chỉ chứa các hoạt động cần thiết, tránh giữ khóa cơ sở dữ liệu lâu ảnh hưởng đến hiệu suất đồng thời.

---

## 7. Tóm tắt

| Tầng | Trách nhiệm | Từ khóa |
|------|------------|--------|
| Controller | Nhận yêu cầu, xác thực tham số, gọi Service, trả về phản hồi | Tiếp tân |
| Service | Sắp xếp logic kinh doanh, quản lý giao dịch, điều phối Repository | Đầu bếp |
| Repository | Truy cập dữ liệu, ánh xạ ORM, đóng gói truy vấn | Quản lý kho |
| Domain | Định nghĩa thực thể, quy tắc kinh doanh, đối tượng giá trị | Tiêu chuẩn công thức |

**Nguyên tắc cốt lõi**:
1. Mỗi tầng chỉ làm việc của riêng mình
2. Các tầng giao tiếp qua giao diện
3. Logic kinh doanh tập trung ở Service và Domain
4. Logic truy cập dữ liệu tập trung ở Repository
5. Dùng DTO để cách li cấu trúc dữ liệu giữa các tầng

---

## 8. Các mô hình kiến trúc khác

Bài viết này giới thiệu **kiến trúc phân tầng**(Layered Architecture), đây là mô hình kiến trúc backend phổ biến nhất, dễ tiếp cận nhất. Nhưng kiến trúc backend không chỉ có một loại, tùy theo tình huống kinh doanh khác nhau, còn có những mô hình kiến trúc khác đáng được tìm hiểu:

### 8.1 Các mô hình kiến trúc phổ biến khác

| Mô hình kiến trúc | Tình huống áp dụng | Đặc điểm |
|-------------------|-------------------|---------|
| **Kiến trúc đơn khối** | Dự án nhỏ, MVP | Tất cả tính năng trong một ứng dụng, triển khai đơn giản |
| **Kiến trúc vi dịch vụ** | Hệ thống phức tạp lớn | Chia thành nhiều dịch vụ độc lập, mỗi dịch vụ có thể triển khai độc lập |
| **Kiến trúc hướng sự kiện** | Xử lý bất đồng bộ, cao tính đồng thời | Qua sự kiện kích hoạt quy trình xử lý, độ tách biệt cao |
| **Kiến trúc sạch** | Hệ thống kinh doanh phức tạp | Logic kinh doanh ở giữa, phụ thuộc chỉ hướng vào, framework ở ngoài cùng |
| **Kiến trúc lục giác** | Cần nhiều cách thích ứng ngoài | Qua cổng và adapter cách li lõi và hệ thống bên ngoài |
| **Kiến trúc hành tây** | Thiết kế hướng miền | Phân tầng đồng tâm, mô hình miền ở lõi nhất, cơ sở hạ tầng ở ngoài cùng |

Dưới đây sẽ lần lượt giới thiệu chi tiết:

#### Kiến trúc đơn khối (Monolithic)

Tất cả tính năng được đóng gói trong một ứng dụng, chia sẻ cùng một cơ sở dữ liệu và quy trình.

```
┌──────────────────────────────┐
│    Ứng dụng đơn khối         │
│  ┌────┐ ┌────┐ ┌────┐       │
│  │User│ │Order│ │Payment│... │
│  └──┬─┘ └──┬─┘ └──┬─┘       │
│     └──────┼──────┘          │
│       Cơ sở dữ liệu chung     │
└──────────────────────────────┘
```

- **Ưu điểm**: Phát triển đơn giản, triển khai tiện, gỡ lỗi cục bộ dễ
- **Nhược điểm**: Độ liên kết code cao, mở rộng khó, một mô đun có vấn đề có thể kéo sập toàn bộ hệ thống
- **Áp dụng**: Dự án khởi nghiệp giai đoạn đầu, phát triển bởi một nhóm, xác thực nguyên mẫu nhanh

#### Kiến trúc vi dịch vụ (Microservices)

Chia hệ thống thành nhiều dịch vụ độc lập, mỗi dịch vụ có dữ liệu và logic kinh doanh của riêng mình, có thể triển khai độc lập và mở rộng.

```
┌────────┐  ┌────────┐  ┌────────┐
│User    │  │Order   │  │Payment │
│Service │  │Service │  │Service │
│  DB-1  │  │  DB-2  │  │  DB-3  │
└───┬────┘  └───┬────┘  └───┬────┘
    └───────────┼───────────┘
          API Gateway
```

- **Ưu điểm**: Triển khai độc lập và mở rộng, stack kỹ thuật linh hoạt, cô lập lỗi
- **Nhược điểm**: Giao tiếp giữa các dịch vụ phức tạp, tính nhất quán dữ liệu phân tán khó, cần khả năng DevOps trưởng thành
- **Áp dụng**: Hệ thống phức tạp lớn, hợp tác nhiều nhóm, cần mở rộng độc lập từng bộ phận

#### Kiến trúc hướng sự kiện (Event-Driven)

Giao tiếp bất đồng bộ qua sự kiện, nhà sản xuất phát hành sự kiện, người tiêu thụ phản hồi sự kiện, các thành phần tách biệt cao.

```
Nhà sản xuất ──→ [Bus sự kiện/Hàng đợi tin nhắn] ──→ Người tiêu thụ A
                                               ──→ Người tiêu thụ B
                                               ──→ Người tiêu thụ C
```

- **Ưu điểm**: Tách biệt cao, hỗ trợ tự nhiên mở rộng, thích hợp xử lý thời gian thực
- **Nhược điểm**: Gỡ lỗi khó, thứ tự sự kiện và tính lũy đẳng cần xử lý thêm
- **Áp dụng**: Phân tích dữ liệu thời gian thực, hệ thống IoT, giao tiếp bất đồng bộ giữa các vi dịch vụ

#### Kiến trúc sạch (Clean Architecture)

Robert C. Martin đề xuất, chia hệ thống thành bốn tầng đồng tâm, phụ thuộc chỉ có thể hướng từ ngoài vào trong:

```
┌─────────────────────────────────────┐
│  Frameworks & Drivers (Framework)   │
│  ┌─────────────────────────────┐    │
│  │  Interface Adapters (Adapter)│   │
│  │  ┌─────────────────────┐    │    │
│  │  │  Use Cases (Trường hợp) │    │
│  │  │  ┌─────────────┐    │    │    │
│  │  │  │  Entities   │    │    │    │
│  │  │  │  (Miền)     │    │    │    │
│  │  │  └─────────────┘    │    │    │
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
      Hướng phụ thuộc: ngoài → trong
```

- **Quy tắc cốt lõi**: Tầng trong không biết tầng ngoài tồn tại, logic kinh doanh hoàn toàn độc lập với framework và cơ sở dữ liệu
- **Ưu điểm**: Tính kiểm tra cao, stack kỹ thuật có thể thay thế, logic kinh doanh rõ ràng
- **Nhược điểm**: Chi phí phát triển đầu tiên cao, code ánh xạ giữa các tầng nhiều, dự án nhỏ dễ quá thiết kế
- **Áp dụng**: Hệ thống kinh doanh phức tạp, cần bảo trì dài hạn

<CleanArchitectureDemo />

#### Kiến trúc lục giác (Hexagonal / Ports & Adapters)

Qua "cổng" định nghĩa giao diện vào/ra của lõi kinh doanh, qua "adapter" kết nối hệ thống bên ngoài:

```
        ┌─────────────┐
  HTTP ──→ Port      │
  CLI  ──→ (Cổng vào)│  Logic kinh doanh lõi │  (Cổng ra) ──→ Cơ sở dữ liệu
  MQ   ──→           │                       │  Port      ──→ API bên ngoài
        └─────────────┘
```

- **Ý tưởng cốt lõi**: Logic kinh doanh không phụ thuộc bất kỳ công nghệ bên ngoài nào, hệ thống bên ngoài kết nối qua adapter
- **Ưu điểm**: Hệ thống bên ngoài có thể thay thế tự do, khi kiểm tra dùng adapter Mock
- **Áp dụng**: Tình huống cần kết nối nhiều hệ thống bên ngoài khác nhau

#### Kiến trúc hành tây (Onion Architecture)

Giống kiến trúc sạch, nhấn mạnh mô hình miền ở lõi nhất, cơ sở hạ tầng ở ngoài cùng, phụ thuộc chỉ hướng vào trong:

```
┌──────────────────────────────┐
│  Infrastructure (Cơ sở hạ tầng)│
│  ┌────────────────────────┐  │
│  │  Application Services  │  │
│  │  ┌──────────────────┐  │  │
│  │  │  Domain Services│  │  │
│  │  │  ┌────────────┐   │  │  │
│  │  │  │Domain Model│   │  │  │
│  │  │  └────────────┘   │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

- **Ý tưởng cốt lõi**: Mô hình miền là lõi của hệ thống, tất cả phụ thuộc chỉ vào nó
- **Khác với kiến trúc sạch**: Kiến trúc hành tây nhấn mạnh tầng dịch vụ miền, kiến trúc sạch nhấn mạnh tầng trường hợp sử dụng
- **Áp dụng**: Dự án áp dụng thiết kế hướng miền (DDD)

### 8.2 Con đường tiến hóa kiến trúc

Những kiến trúc này không phải quan hệ thay thế, mà là tiến hóa từng bước:

```text
Kiến trúc phân tầng truyền thống (N-Layered)
  │  Vấn đề: Độ liên kết giữa các tầng, khó thay thế các phụ thuộc bên ngoài
  ▼
Kiến trúc lục giác (Ports & Adapters)
  │  Cải thiện: Dùng cổng và adapter cách li hệ thống bên ngoài
  ▼
Kiến trúc hành tây (Onion)
  │  Cải thiện: Phân tầng đồng tâm rõ ràng, mô hình miền ở giữa
  ▼
Kiến trúc sạch (Clean Architecture)
  │  Cải thiện: Thống nhất quy tắc phụ thuộc, rõ ràng trách nhiệm từng tầng
  ▼
Chọn kiến trúc phù hợp dựa trên nhu cầu kinh doanh
```

### 8.3 Hướng dẫn lựa chọn mô hình kiến trúc

```text
Số lượng người dùng < 1000, kích thước code < 5000 dòng
    ↓
Kiến trúc đơn khối + phân tầng đơn giản
    ↓
Số lượng người dùng 1000-100k, cần nhiều nhóm hợp tác
    ↓
Kiến trúc phân tầng (bài viết này giới thiệu)
    ↓
Số lượng người dùng > 100k, độ phức tạp kinh doanh cao
    ↓
Kiến trúc vi dịch vụ / Kiến trúc hướng sự kiện
```

Các yếu tố lựa chọn chi tiết hơn:

| Yếu tố cân nhắc | Phân tầng đơn giản | Kiến trúc sạch/lục giác | Vi dịch vụ |
|----------------|--------------------|----------------------|-----------|
| Kích thước nhóm | 1-5 người | 5-20 người | 20+ người |
| Độ phức tạp kinh doanh | Thấp | Trung bình đến cao | Cao |
| Tần suất triển khai | Thấp | Trung bình | Cao (triển khai độc lập) |
| Đa dạng stack kỹ thuật | Đơn lẻ | Đơn lẻ | Có thể đa dạng |
| Chi phí vận hành | Thấp | Trung bình | Cao |

### 8.4 Tài liệu đọc thêm được khuyến nghị

- **Kiến trúc đơn khối**: Xem bài cùng chủ đề [`backend-project-architecture.md`](./backend-project-architecture.md), tìm hiểu tiến hóa từ script tới đơn khối
- **Kiến trúc vi dịch vụ**: Xem [Tiến hóa từ đơn khối tới vi dịch vụ](/vi-vn/appendix/6-architecture-and-system-design/monolith-to-microservices)
- **Kiến trúc sạch**: Cuốn sách "Clean Architecture" của Robert C. Martin — công trình kinh điển đề xuất mô hình đồng tâm bốn tầng và quy tắc phụ thuộc
- **Mô hình kiến trúc doanh nghiệp**: Cuốn "Patterns of Enterprise Application Architecture" của Martin Fowler — tài liệu tham khảo có quyền lực về tổ chức logic kiến trúc phân tầng, miền

### 8.5 Cách chọn lựa?

**Nhớ nguyên tắc này**: **Kiến trúc phục vụ kinh doanh, không phải kiến trúc vì kiến trúc**.

- Dự án nhỏ dùng kiến trúc đơn giản, xác thực nhanh ra thị trường
- Dự án lớn rồi mới cân nhắc kiến trúc phức tạp, tránh thiết kế quá mức
- Mức độ quen thuộc của nhóm cũng rất quan trọng, chọn phương án mà mọi người có thể hiểu được

---

## 9. Tóm tắt

| Tầng | Trách nhiệm | Từ khóa |
|------|------------|--------|
| Controller | Nhận yêu cầu, xác thực tham số, gọi Service, trả về phản hồi | Tiếp tân |
| Service | Sắp xếp logic kinh doanh, quản lý giao dịch, điều phối Repository | Đầu bếp |
| Repository | Truy cập dữ liệu, ánh xạ ORM, đóng gói truy vấn | Quản lý kho |
| Domain | Định nghĩa thực thể, quy tắc kinh doanh, đối tượng giá trị | Tiêu chuẩn công thức |

**Nguyên tắc cốt lõi**:

Cốt lõi của kiến trúc phân tầng nằm ở việc phân chia trách nhiệm rõ ràng và kiểm soát hướng phụ thuộc. Mỗi tầng chỉ tập trung vào trách nhiệm của riêng mình, giao tiếp với các tầng liền kề qua giao diện, logic kinh doanh tập trung ở các tầng Service và Domain, logic truy cập dữ liệu tập trung ở tầng Repository, các tầng giao tiếp qua DTO để cách li cấu trúc dữ liệu, tránh tiết lộ thực hiện nội bộ. Thiết kế như vậy giúp hệ thống dễ dàng hiểu, kiểm tra và bảo trì, có khả năng ứng phó với tiến hóa liên tục của kinh doanh.

---

## Tài liệu tham khảo

1. [Catalog of Patterns of Enterprise Application Architecture - Martin Fowler](https://www.martinfowler.com/eaaCatalog/) — Danh mục mô hình kiến trúc ứng dụng doanh nghiệp của Martin Fowler, tài liệu tham khảo kinh điển của kiến trúc phân tầng
2. [Backend Side Architecture Evolution (N-layered, DDD, Hexagon, Onion, Clean Architecture)](https://medium.com/@iamprovidence/backend-side-architecture-evolution-n-layered-ddd-hexagon-onion-clean-architecture-643d72444ce4) — Quá trình tiến hóa từ kiến trúc N tầng tới kiến trúc sạch, tìm hiểu lý do ra đời của từng loại kiến trúc
3. [Complete Guide to Clean Architecture - GeeksforGeeks](https://www.geeksforgeeks.org/complete-guide-to-clean-architecture/) — Hướng dẫn hoàn chỉnh kiến trúc sạch, giải thích chi tiết phân tầng, quy tắc phụ thuộc và tách biệt mối quan tâm
4. [Understanding Hexagonal, Clean, Onion, and Traditional Layered Architectures: A Deep Dive](https://romanglushach.medium.com/understanding-hexagonal-clean-onion-and-traditional-layered-architectures-a-deep-dive-c0f93b8a1b96) — So sánh sâu giữa kiến trúc lục giác, sạch, hành tây và kiến trúc phân tầng truyền thống
5. [Building Clean Architectures in Modern Backend Frameworks](https://leapcell.io/blog/building-clean-architectures-in-modern-backend-frameworks) — Hướng dẫn thực tế áp dụng kiến trúc sạch trong các framework backend hiện đại
6. [Backend Architecture Patterns: From Monoliths to Microservices](https://nerdleveltech.com/backend-architecture-patterns-from-monoliths-to-microservices) — Tổng quan toàn diện các mô hình kiến trúc backend từ đơn khối tới vi dịch vụ
7. [MVC 三层架构案例详细讲解](https://www.cnblogs.com/TheMagicalRainbowSea/p/17409206.html) — Giải thích chi tiết quan hệ giữa MVC và kiến trúc ba tầng kèm trường hợp thực tế, phù hợp cho người bắt đầu
