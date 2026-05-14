# Đồng thời, Bất đồng bộ Và Đa luồng
> 💡 **Hướng dẫn học tập**: Lập trình đồng thời là "gót Achilles" của nhiều kỹ sư backend — bị hỏng trong phỏng vấn, gặp lỗi trên production, không biết cách tối ưu hóa hiệu năng. Chương này sẽ tập trung vào một câu hỏi lõi: **Khi 100,000 người dùng yêu cầu dịch vụ của bạn cùng một lúc, code của bạn có bị sập không?**

Trước khi bắt đầu, mình gợi ý bạn nên tìm hiểu trước hai phần "nền tảng":

- **CPU, bộ nhớ, I/O là gì**: Nếu chưa rõ các khái niệm cơ bản này, bạn có thể ôn lại kiến thức cơ bản về hệ điều hành trước.
- **Khái niệm về chặn/không chặn là gì**: Nếu chưa quen với khái niệm đồng bộ/bất đồng bộ, bạn có thể trải nghiệm thực tế qua lập trình trước.

---

## 0. Lời mở đầu: Tại sao dịch vụ của bạn "đóng băng" khi cao điểm?

<ProcessThreadCoroutineDemo />

Nhiều người gặp phải tình huống tương tự trong phát triển thực tế:

- Khi test cục bộ, dịch vụ phản hồi rất nhanh, nhưng lên production thì "chậm như PPT";
- Rõ ràng bạn đã mua cấu hình server cao, nhưng CPU occupation rate lại không bao giờ tăng lên;
- Vào mùa khuyến mãi cao điểm, dịch vụ "sập loạt", phải giảm tải hoặc cắt mạch.

Theo trực giác, ta sẽ cho rằng: **"Server không đủ mạnh"**.
Nhưng hầu hết thời gian, vấn đề không nằm ở "phần cứng không đủ nhanh", mà là **chúng ta không thiết kế tốt mô hình đồng thời**.

**Mâu thuẫn lõi**:
- Nếu không xử lý đồng thời: yêu cầu của người dùng xếp hàng chờ, trải nghiệm rất tệ;
- Nếu lạm dụng đa luồng: tranh chấp khóa, chi phí chuyển đổi ngữ cảnh, hiệu năng thực sự giảm.

Đối mặt với những thách thức này, chỉ dựa vào "thêm máy" đã trở nên không hiệu quả. Chúng ta cần một phương pháp thiết kế đồng thời có hệ thống, vừa đảm bảo hiệu năng trong tình huống cao concurrency, vừa đảm bảo tính ổn định. Đây chính là vấn đề mà chương này cố gắng giải quyết.

---

## 1. Khái niệm lõi: Tiến trình, luồng, coroutine, khác nhau cái gì?

### 1.1 Phép so sánh một nhà hàng

Tưởng tượng bạn mở một nhà hàng, muốn phục vụ nhiều khách cùng lúc:

| Khái niệm | So sánh nhà hàng | Ý nghĩa kỹ thuật |
| :--- | :--- | :--- |
| **Tiến trình (Process)** | **Chi nhánh nhà hàng độc lập** | Có không gian bộ nhớ độc lập, phân bổ tài nguyên, là đơn vị cơ bản của hệ điều hành để phân bổ tài nguyên. Một tiến trình bị sập không ảnh hưởng đến các tiến trình khác. |
| **Luồng (Thread)** | **Đầu bếp trong chi nhánh** | Là đơn vị cơ bản được CPU lên lịch, chia sẻ không gian bộ nhớ trong tiến trình. Các luồng trong cùng một tiến trình có thể chia sẻ dữ liệu, nhưng một luồng bị sập có thể dẫn đến sập cả tiến trình. |
| **Coroutine** | **"Kỹ thuật phân thân" của đầu bếp** | Luồng nhẹ ở chế độ người dùng, được chính chương trình lên lịch chứ không phải hệ điều hành. Chi phí chuyển đổi cực kỳ nhỏ, có thể tạo hàng triệu cái. |

### 1.2 So sánh sâu: Sự khác biệt cơ bản của ba cái

<ProcessIsolationDemo />

#### Tiến trình: "Container" cách ly tài nguyên

**Đặc điểm lõi**:
- **Cách ly mạnh**: Mỗi tiến trình có không gian địa chỉ ảo độc lập
- **Chi phí lớn**: Tạo/chuyển đổi cần sự can thiệp của hệ điều hành, mất khoảng 1-10ms
- **Giao tiếp phức tạp**: Giao tiếp giữa các tiến trình (IPC) cần cơ chế đặc biệt (pipe, message queue, shared memory, v.v.)

**Tình huống phù hợp**:
- Các dịch vụ cần cách ly mạnh (như các tab trình duyệt, chương trình sandbox)
- Triển khai hỗn hợp đa ngôn ngữ
- Các đơn vị dịch vụ cần khởi động lại/nâng cấp độc lập

#### Luồng: "Kỵ binh nhẹ" chia sẻ bộ nhớ

<ThreadSchedulingDemo />

**Đặc điểm lõi**:
- **Chia sẻ bộ nhớ**: Các luồng trong cùng một tiến trình chia sẻ đoạn code, đoạn dữ liệu, heap
- **Không gian stack độc lập**: Mỗi luồng có stack riêng (thường khoảng 1MB)
- **Chuyển đổi nhanh hơn**: Chuyển đổi luồng khoảng 1-10μs, nhanh hơn tiến trình 1000 lần
- **Cần đồng bộ hóa**: Dữ liệu chia sẻ cần bảo vệ bằng khóa

**Tình huống phù hợp**:
- Công việc yêu cầu CPU (tính toán, xử lý hình ảnh)
- Công việc đồng thời cần chia sẻ nhiều dữ liệu
- Công việc nền nhạy cảm với độ trễ

#### Coroutine: "Luồng xanh" ở chế độ người dùng

<CoroutineLightweightDemo />

**Đặc điểm lõi**:
- **Lên lịch ở chế độ người dùng**: Được chính chương trình/thư viện runtime lên lịch, không qua hệ điều hành
- **Cực kỳ nhẹ**: Stack coroutine thường chỉ vài KB, có thể tạo hàng triệu cái
- **Chuyển đổi cực nhanh**: Chuyển đổi coroutine khoảng 100ns, nhanh hơn luồng 100 lần
- **Không tranh chấp**: Coroutine chủ động nhường CPU (đa nhiệm hợp tác)

**Tình huống phù hợp**:
- Dịch vụ cao concurrency yêu cầu I/O (web server, gateway)
- Tình huống cần duy trì nhiều kết nối dài (IM, game server)
- Xử lý dữ liệu luồng, công việc pipeline

---

## 2. Phân tích trường hợp: "Nỗi đau đồng thời" của một nền tảng thương mại điện tử lớn

### 2.1 Bài học máu: Quá trình tiến hóa từ "máy đơn" đến "hệ thống phân tán"

Hãy xem một câu chuyện tiến hóa hệ thống thương mại điện tử thực tế:

#### Giai đoạn một: Thời đại máy đơn (người dùng hoạt động 1000)

```python
# Ứng dụng Flask đơn giản
from flask import Flask

app = Flask(__name__)

@app.route('/order')
def create_order():
    # Truy vấn kho hàng
    stock = db.query("SELECT stock FROM products WHERE id=1")
    if stock > 0:
        # Giảm kho hàng
        db.execute("UPDATE products SET stock = stock - 1 WHERE id=1")
        # Tạo đơn hàng
        db.execute("INSERT INTO orders ...")
        return "Order created!"
    return "Out of stock!"

# Khởi động: flask run
```

**Vấn đề**:
- Một tiến trình, một luồng, chỉ có thể xử lý một yêu cầu cùng một lúc
- Kho hàng không có khóa, khi đồng thời sẽ bán quá số
- Số kết nối cơ sở dữ liệu bị hạn chế, pool kết nối sẽ nhanh chóng bị cạn

#### Giai đoạn hai: Thời đại đa tiến trình (người dùng hoạt động 10,000)

```python
# Sử dụng triển khai đa tiến trình Gunicorn
gunicorn -w 4 -k sync app:app

# 4 worker tiến trình, mỗi tiến trình xử lý yêu cầu độc lập
```

**Vấn đề mới**:
- 4 tiến trình cùng truy vấn kho hàng, tất cả đều thấy stock=1, tất cả đều giảm thành công, bán quá 3 cái!
- Cần giới thiệu khóa phân tán

```python
import redis

# Sử dụng khóa phân tán Redis
lock = redis_client.lock("stock_lock", timeout=10)
if lock.acquire():
    try:
        stock = db.query("SELECT stock FROM products WHERE id=1")
        if stock > 0:
            db.execute("UPDATE products SET stock = stock - 1 WHERE id=1")
    finally:
        lock.release()
```

#### Giai đoạn ba: Thời đại coroutine (người dùng hoạt động 100,000)

```python
# Sử dụng FastAPI + asyncio
from fastapi import FastAPI
import asyncio

app = FastAPI()

async def check_stock(product_id: int) -> int:
    # Truy vấn cơ sở dữ liệu bất đồng bộ, không chặn
    result = await db.fetch_one(
        "SELECT stock FROM products WHERE id = :id",
        {"id": product_id}
    )
    return result["stock"]

@app.get("/order")
async def create_order(product_id: int):
    # Kiểm tra kho hàng và thông tin người dùng đồng thời
    stock_task = check_stock(product_id)
    user_task = get_user_info(request.user_id)

    stock, user = await asyncio.gather(stock_task, user_task)

    if stock > 0:
        # Giảm kho hàng bất đồng bộ
        await db.execute(
            "UPDATE products SET stock = stock - 1 WHERE id = :id",
            {"id": product_id}
        )
        return {"status": "success"}

    return {"status": "out_of_stock"}

# Khởi động: uvicorn main:app --workers 4
# Mỗi worker có thể xử lý hàng nghìn coroutine đồng thời
```

**Ưu điểm**:
- Một luồng có thể xử lý hàng nghìn kết nối đồng thời
- Khi I/O, chủ động nhường CPU, không chặn yêu cầu khác
- Tiêu thụ bộ nhớ cực thấp, phù hợp với tình huống cao concurrency và kết nối dài

### 2.2 Bảng so sánh tiến hóa mô hình đồng thời

| Giai đoạn | Mô hình đồng thời | Người dùng hoạt động | Vấn đề cốt lõi | Giải pháp |
| :--- | :--- | :--- | :--- | :--- |
| **Đơn thể** | Tiến trình đơn luồng đơn | 1K | Không thể xử lý đồng thời | Giới thiệu đa tiến trình |
| **Đa tiến trình** | Đa tiến trình đồng bộ | 10K | Tranh chấp dữ liệu, bán quá số | Khóa phân tán |
| **Đa luồng** | Đa luồng + khóa | 50K | Chi phí chuyển đổi ngữ cảnh, deadlock | Thread pool, queue không khóa |
| **Coroutine** | Bất đồng bộ I/O | 100K+ | Độ phức tạp code, khó debug | Gói framework, theo dõi chuỗi |
| **Hỗn hợp** | Đa tiến trình + coroutine | 1000K+ | Độ phức tạp kiến trúc | Quản lý dịch vụ, co giãn elasticity |

---

## 3. Nguyên lý sâu: Cơ chế làm việc của các mô hình đồng thời

### 3.1 Mô hình tiến trình: Cách ly và giao tiếp

#### Cơ chế cách ly bộ nhớ

<ProcessIsolationDemo />

Mỗi tiến trình có không gian địa chỉ ảo độc lập:

```
Bộ nhớ ảo tiến trình A          Bộ nhớ ảo tiến trình B
+----------------+        +----------------+
|  Không gian     |        |  Không gian     |  <-- Chia sẻ (chỉ đọc)
|  kernel         |        |  kernel         |
|  (chia sẻ)      |        |  (chia sẻ)      |
+----------------+        +----------------+
|  Không gian     |        |  Không gian     |  <-- Độc lập
|  stack          |        |  stack          |
|  (tăng xuống)   |        |  (tăng xuống)   |
+----------------+        +----------------+
|  Không gian     |        |  Không gian     |  <-- Độc lập
|  heap           |        |  heap           |
|  (tăng lên)     |        |  (tăng lên)     |
+----------------+        +----------------+
|  Đoạn dữ liệu   |        |  Đoạn dữ liệu   |  <-- Độc lập
|  (.bss/.data)   |        |  (.bss/.data)   |
+----------------+        +----------------+
|  Đoạn code      |        |  Đoạn code      |  <-- Độc lập
|  (.text)        |        |  (.text)        |
+----------------+        +----------------+
```

#### Phương pháp giao tiếp giữa các tiến trình(IPC)

| Phương pháp | Nguyên lý | Tốc độ | Tình huống phù hợp |
| :--- | :--- | :--- | :--- |
| **Pipe** | Vùng đệm nhân, luồng một chiều | Trung bình | Giao tiếp tiến trình cha-con |
| **Message queue** | Danh sách tin nhắn nhân | Trung bình | Truyền tin nhắn bất đồng bộ |
| **Bộ nhớ chia sẻ** | Ánh xạ cùng một khối bộ nhớ vật lý | Nhanh nhất | Chia sẻ nhiều dữ liệu |
| **Semaphore** | Bộ đếm nhân | - | Đồng bộ và loại trừ lẫn nhau |
| **Socket** | Stack giao thức mạng | Chậm hơn | Giao tiếp qua máy |
| **Signal** | Soft interrupt | - | Thông báo sự kiện |

### 3.2 Mô hình luồng: Lên lịch và đồng bộ hóa

#### Nguyên lý lên lịch luồng

<ThreadSchedulingDemo />

Công việc cơ bản của bộ lên lịch luồng hệ điều hành:

```
Hàng đợi sẵn sàng                Đang chạy                Hàng đợi chờ
+--------+                +--------+               +--------+
| Luồng B |  <-- Hết slot | Luồng A |  <-- Yêu cầu I/O | Luồng C |
| Luồng D |                | (chạy) |               | Luồng E |
| Luồng F |                +--------+               | (chặn)  |
+--------+                                         +--------+
    |                                                  |
    v                                                  v
Bộ lên lịch chọn tiếp theo                Khi I/O hoàn thành chuyển lại hàng sẵn sàng
dựa trên ưu tiên
```

#### Cơ chế đồng bộ hóa luồng thường gặp

| Cơ chế | Nguyên lý | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- | :--- |
| **Khóa loại trừ (Mutex)** | Trạng thái nhị phân, truy cập độc quyền | Đơn giản | Hiệu năng kém khi tranh chấp nhiều |
| **Khóa đọc-ghi (RWLock)** | Đọc chia sẻ, ghi độc quyền | Hiệu suất cao khi đọc nhiều | Phức tạp, có rủi ro starvation ghi |
| **Khóa quay (Spinlock)** | Chờ bằng cách chiếm CPU | Hiệu suất cao khi chờ ngắn | Lãng phí CPU khi chờ lâu |
| **Biến điều kiện** | Chờ điều kiện cụ thể thỏa mãn | Tránh chờ bận | Cần sử dụng với khóa |
| **Semaphore** | Bộ đếm kiểm soát số lượng truy cập | Kiểm soát concurrency | Dễ lỗi nếu dùng sai |
| **Hoạt động nguyên tử** | Mức lệnh CPU nguyên tử | Không khóa, hiệu năng cao nhất | Chỉ hoạt động trên kiểu dữ liệu đơn giản |
| **Queue không khóa** | Hoạt động CAS | Hiệu năng xuất sắc ở cao concurrency | Phức tạp, có vấn đề ABA |

### 3.3 Mô hình Coroutine: Lên lịch ở chế độ người dùng

<CoroutineLightweightDemo />

#### Ưu điểm lõi của Coroutine

```
Đa luồng truyền thống                vs              Mô hình Coroutine

+------------+                       +------------+
|  Luồng 1   |                       |  Vòng lặp  |
| (1MB stack)|                       |  sự kiện   |
+------------+                       |  (bộ lên   |
     |                                |  lịch)     |
     v                                +------------+
+------------+                            |
|  Luồng 2   |                            v
| (1MB stack)|                       +------------+
+------------+                       | Coroutine A |
     |                                | (vài KB)    |
     v                                +------------+
+------------+                            |
|  Luồng 3   |                            v
| (1MB stack)|                       +------------+
+------------+                       | Coroutine B |
                                      | (vài KB)    |
Chi phí: N MB                         +------------+

Tạo: ~10μs                            Chi phí: N KB
Chuyển đổi: ~1μs                      Tạo: ~100ns
                                      Chuyển đổi: ~100ns
```

#### Cơ chế làm việc của async/await

<AsyncAwaitDemo />

```python
import asyncio

async def fetch_data(url):
    # Gặp await, coroutine tạm dừng, nhường CPU
    response = await aiohttp.get(url)
    # Sau khi I/O hoàn thành, vòng lặp sự kiện đánh thức coroutine, tiếp tục thực thi từ đây
    return response.json()

async def main():
    # Tạo 3 tác vụ coroutine
    tasks = [
        fetch_data("https://api1.example.com"),
        fetch_data("https://api2.example.com"),
        fetch_data("https://api3.example.com")
    ]
    # Thực thi đồng thời, tổng thời gian ≈ yêu cầu chậm nhất
    results = await asyncio.gather(*tasks)
    return results

# Khởi động vòng lặp sự kiện
asyncio.run(main())
```

**Quy trình thực thi**:

```
Dòng thời gian -------------------------------------------------------------------->

Coroutine A: [Chuẩn bị yêu cầu]--[await tạm dừng]=======[Nhận phản hồi]--[Xử lý dữ liệu]
                     |
Coroutine B:              [Chuẩn bị yêu cầu]--[await tạm dừng]=======[Nhận phản hồi]--[Xử lý dữ liệu]
                                  |
Coroutine C:                           [Chuẩn bị yêu cầu]--[await tạm dừng]=======[Nhận phản hồi]
                                               |
                                               ↓
                                         Tất cả I/O hoàn thành

Ghi chú: [ ] là CPU thực thi, === là chờ I/O, | là chuyển đổi coroutine
```

### 3.4 Vòng lặp sự kiện: "Trái tim" của Coroutine

<EventLoopDemo />

Vòng lặp sự kiện là cơ chế lõi để lên lịch coroutine:

```python
import selectors
import heapq

class EventLoop:
    def __init__(self):
        self.selector = selectors.DefaultSelector()
        self.ready = []  # Hàng đợi sẵn sàng
        self.scheduled = []  # Hàng đợi tác vụ định thời
        self.current = None

    def run(self):
        while True:
            # 1. Xử lý tác vụ định thời
            now = time.time()
            while self.scheduled and self.scheduled[0][0] <= now:
                _, callback = heapq.heappop(self.scheduled)
                self.ready.append(callback)

            # 2. Chờ sự kiện I/O
            timeout = 0 if self.ready else 0.1
            events = self.selector.select(timeout)

            for key, mask in events:
                callback = key.data
                self.ready.append(callback)

            # 3. Thực thi callback sẵn sàng
            while self.ready:
                callback = self.ready.popleft()
                callback()
```

### 3.5 Đồng thời vs Đồng thời thực: Không phải một chuyện

<ConcurrentVsParallelDemo />

| Khái niệm | Tiếng Anh | Ý nghĩa | So sánh | Điều kiện cần |
| :--- | :--- | :--- | :--- | :--- |
| **Đồng thời** | Concurrency | Nhiều tác vụ thực thi xen kẽ, vĩ mô thì tiến hành cùng lúc | Một người nấu nhiều món xen kẽ | CPU đơn nhân cũng được |
| **Đồng thời thực** | Parallelism | Nhiều tác vụ thực sự thực thi cùng lúc | Nhiều người cùng nấu các món khác nhau | Cần CPU đa nhân hoặc đa máy |

**Hình ảnh minh họa**:

```
CPU đơn nhân - Đồng thời (Concurrent)
Thời gian →  1    2    3    4    5    6    7    8
Tác vụ A: [Thực thi][Thực thi]      [Thực thi][Thực thi]
Tác vụ B:      [Thực thi][Thực thi]      [Thực thi][Thực thi]

Hai tác vụ thực thi xen kẽ, vĩ mô thì "cùng lúc"

========================================

CPU đa nhân - Đồng thời thực (Parallel)
Thời gian →  1    2    3    4    5    6    7    8
Nhân 1: [Tác vụ A][Tác vụ A][Tác vụ A][Tác vụ A]
Nhân 2: [Tác vụ B][Tác vụ B][Tác vụ B][Tác vụ B]

Hai tác vụ thực sự "cùng lúc" thực thi

========================================

Thực tế thường là: Đồng thời + Đồng thời thực
Thời gian →  1    2    3    4    5    6    7    8
Nhân 1: [A1][A1][B1][B1][C1][C1][D1][D1]
Nhân 2: [A2][A2][B2][B2][C2][C2][D2][D2]

Nhiều tác vụ được lên lịch đồng thời đến các nhân khác nhau, rồi thực thi đồng thời trên nhân
```

---

## 4. Thực hành: Goroutine của Go Và luồng xanh

### 4.1 Triết lý đồng thời của Go

<GoroutineGreenThreadDemo />

Triết lý thiết kế đồng thời của Go: **Không truyền thông qua chia sẻ bộ nhớ, mà truyền thông qua truyền thông để chia sẻ bộ nhớ**.

```go
package main

import (
    "fmt"
    "time"
)

// Nhà sản xuất
func producer(ch chan<- int, id int) {
    for i := 0; i < 5; i++ {
        fmt.Printf("Producer %d sending: %d\n", id, i)
        ch <- i  // Gửi dữ liệu đến channel
        time.Sleep(100 * time.Millisecond)
    }
}

// Nhà tiêu thụ
func consumer(ch <-chan int, id int) {
    for val := range ch {  // Nhận dữ liệu từ channel
        fmt.Printf("Consumer %d received: %d\n", id, val)
    }
}

func main() {
    // Tạo channel có buffer
    ch := make(chan int, 10)

    // Khởi động 2 goroutine nhà sản xuất
    for i := 0; i < 2; i++ {
        go producer(ch, i)
    }

    // Khởi động 2 goroutine nhà tiêu thụ
    for i := 0; i < 2; i++ {
        go consumer(ch, i)
    }

    // Chờ một thời gian
    time.Sleep(3 * time.Second)
    close(ch)
}
```

### 4.2 Bộ lên lịch Goroutine: Mô hình GMP

Bộ lên lịch của Go sử dụng mô hình GMP:

| Thành phần | Ý nghĩa | Chức năng |
| :--- | :--- | :--- |
| **G (Goroutine)** | Coroutine | Tác vụ chờ thực thi, nhẹ (stack 2KB, có thể co giãn động) |
| **M (Machine)** | Luồng hệ thống | Thực thể thực thi G, tương ứng 1:1 với luồng nhân |
| **P (Processor)** | Bộ xử lý logic | Ngữ cảnh lên lịch, chứa hàng đợi G có thể chạy, số lượng mặc định bằng số nhân CPU |

**Quy trình lên lịch**:

```
Hàng đợi toàn cục
+----------------+
|  G1  |  G2  |  G3  |
+----------------+

Hàng đợi cục bộ P0       Hàng đợi cục bộ P1       Hàng đợi cục bộ P2       Hàng đợi cục bộ P3
+----------+       +----------+       +----------+       +----------+
| G4 | G5  |       | G6 | G7  |       | G8 | G9  |       | G10| G11 |
+----------+       +----------+       +----------+       +----------+
    |                     |                     |                     |
    v                     v                     v                     v
+----------+       +----------+       +----------+       +----------+
|    M0    |       |    M1    |       |    M2    |       |    M3    |
| (Luồng OS)|       | (Luồng OS)|       | (Luồng OS)|       | (Luồng OS)|
+----------+       +----------+       +----------+       +----------+

Chiến lược lên lịch:
1. Mỗi P duy trì hàng đợi cục bộ G, giảm tranh chấp khóa
2. P lấy G từ hàng đợi cục bộ giao cho M thực thi
3. Khi hàng đợi cục bộ trống, "ăn cắp" nửa G từ P khác (Work Stealing)
4. Hàng đợi toàn cục là dự phòng, kiểm tra định kỳ
```

---

## 5. Template code thực hành

### 5.1 Template asyncio Python cho cao concurrency

```python
import asyncio
import aiohttp
from typing import List, Dict
import time

class AsyncHTTPClient:
    """Client HTTP hiệu năng cao dựa trên asyncio"""

    def __init__(self, max_connections: int = 100, timeout: int = 30):
        self.timeout = aiohttp.ClientTimeout(total=timeout)
        # Giới hạn số kết nối đồng thời, tránh làm hỏng dịch vụ đối tác
        connector = aiohttp.TCPConnector(
            limit=max_connections,
            limit_per_host=10,  # Giới hạn kết nối cho một miền đơn lẻ
            enable_cleanup_closed=True,
            force_close=True,
        )
        self.session = aiohttp.ClientSession(
            connector=connector,
            timeout=self.timeout,
        )

    async def fetch(self, url: str, method: str = 'GET', **kwargs) -> Dict:
        """Gửi một yêu cầu đơn"""
        try:
            async with self.session.request(method, url, **kwargs) as response:
                return {
                    'url': url,
                    'status': response.status,
                    'data': await response.text(),
                    'error': None
                }
        except asyncio.TimeoutError:
            return {'url': url, 'status': None, 'data': None, 'error': 'Timeout'}
        except Exception as e:
            return {'url': url, 'status': None, 'data': None, 'error': str(e)}

    async def fetch_many(self, urls: List[str], concurrency: int = 10) -> List[Dict]:
        """Lấy nhiều URL đồng thời, giới hạn concurrency"""
        semaphore = asyncio.Semaphore(concurrency)

        async def fetch_with_limit(url):
            async with semaphore:
                return await self.fetch(url)

        # Thực thi tất cả yêu cầu đồng thời
        tasks = [fetch_with_limit(url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

    async def close(self):
        await self.session.close()


# Ví dụ sử dụng
async def main():
    client = AsyncHTTPClient(max_connections=50)

    # Danh sách URL cần lấy
    urls = [
        "https://api.github.com/users/github",
        "https://api.github.com/users/google",
        "https://api.github.com/users/microsoft",
        # ... thêm URL
    ] * 10  # Mô phỏng 300 yêu cầu

    start = time.time()
    results = await client.fetch_many(urls, concurrency=20)
    elapsed = time.time() - start

    # Thống kê kết quả
    success = sum(1 for r in results if r.get('status') == 200)
    failed = len(results) - success

    print(f"Tổng yêu cầu: {len(results)}")
    print(f"Thành công: {success}, Thất bại: {failed}")
    print(f"Tổng thời gian: {elapsed:.2f}s")
    print(f"QPS: {len(results)/elapsed:.1f}")

    await client.close()

if __name__ == "__main__":
    asyncio.run(main())
```

### 5.2 Template dịch vụ cao concurrency của Go

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"runtime"
	"time"

	"golang.org/x/sync/errgroup"
)

// Cấu trúc Request/Response
type OrderRequest struct {
	UserID    int64   `json:"user_id"`
	ProductID int64   `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type OrderResponse struct {
	OrderID   int64   `json:"order_id"`
	Status    string  `json:"status"`
	Total     float64 `json:"total"`
	CreatedAt string  `json:"created_at"`
}

// Mô phỏng hoạt động cơ sở dữ liệu
type Database struct {
	orders map[int64]*OrderResponse
	mutex  chan struct{}
}

func NewDatabase() *Database {
	db := &Database{
		orders: make(map[int64]*OrderResponse),
		mutex:  make(chan struct{}, 1), // Mô phỏng khóa loại trừ
	}
	return db
}

func (db *Database) CreateOrder(ctx context.Context, req *OrderRequest) (*OrderResponse, error) {
	// Lấy khóa
	select {
	case db.mutex <- struct{}{}:
		defer func() { <-db.mutex }()
	case <-ctx.Done():
		return nil, ctx.Err()
	}

	// Mô phỏng độ trễ hoạt động cơ sở dữ liệu
	select {
	case <-time.After(50 * time.Millisecond):
	case <-ctx.Done():
		return nil, ctx.Err()
	}

	order := &OrderResponse{
		OrderID:   time.Now().UnixNano(),
		Status:    "created",
		Total:     req.Price * float64(req.Quantity),
		CreatedAt: time.Now().Format(time.RFC3339),
	}
	db.orders[order.OrderID] = order
	return order, nil
}

// Trình xử lý HTTP
type Handler struct {
	db *Database
}

func NewHandler(db *Database) *Handler {
	return &Handler{db: db}
}

func (h *Handler) CreateOrder(w http.ResponseWriter, r *http.Request) {
	// Đặt timeout yêu cầu
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()

	var req OrderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	order, err := h.db.CreateOrder(ctx, &req)
	if err != nil {
		if err == context.DeadlineExceeded {
			http.Error(w, "Request timeout", http.StatusGatewayTimeout)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(order)
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	info := map[string]interface{}{
		"status":    "ok",
		"goroutine": runtime.NumGoroutine(),
		"cpu":       runtime.NumCPU(),
		"version":   runtime.Version(),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(info)
}

// Ví dụ xử lý hàng loạt
func BatchProcess(ctx context.Context, items []int) ([]int, error) {
	g, ctx := errgroup.WithContext(ctx)
	g.SetLimit(10) // Giới hạn concurrency là 10

	results := make([]int, len(items))

	for i, item := range items {
		i, item := i, item // Tránh bẫy closure
		g.Go(func() error {
			select {
			case <-ctx.Done():
				return ctx.Err()
			default:
				// Mô phỏng xử lý
				time.Sleep(100 * time.Millisecond)
				results[i] = item * 2
				return nil
			}
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}
	return results, nil
}

func main() {
	// Khởi tạo cơ sở dữ liệu
	db := NewDatabase()

	// Tạo trình xử lý
	handler := NewHandler(db)

	// Thiết lập định tuyến
	mux := http.NewServeMux()
	mux.HandleFunc("/order", handler.CreateOrder)
	mux.HandleFunc("/health", handler.Health)

	// Tạo server
	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	fmt.Println("Server starting on :8080")
	fmt.Printf("Go version: %s\n", runtime.Version())
	fmt.Printf("CPU cores: %d\n", runtime.NumCPU())

	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
```

---

## 6. Bảng tóm tắt đối chiếu

### 6.1 So sánh khái niệm lõi

| Đặc tính | Tiến trình | Luồng | Coroutine |
| :--- | :--- | :--- | :--- |
| **Người lên lịch** | Hệ điều hành | Hệ điều hành | Chương trình/runtime |
| **Chi phí chuyển đổi** | ~1-10ms | ~1-10μs | ~100ns |
| **Tiêu thụ bộ nhớ** | ~10MB+ | ~1MB | ~2KB |
| **Phương pháp giao tiếp** | IPC | Chia sẻ bộ nhớ | Chia sẻ bộ nhớ/Channel |
| **Cần đồng bộ** | Không cần | Cần khóa | Cần khóa/hợp tác |
| **Tác động sập** | Chỉ tiến trình | Cả tiến trình | Có thể kiểm soát |
| **Tình huống phù hợp** | Cách ly mạnh, đa tenant | CPU intensive | I/O intensive |
| **Ngôn ngữ điển hình** | Tất cả ngôn ngữ | Tất cả ngôn ngữ | Go, Python, JS, Rust |

### 6.2 Hướng dẫn chọn mô hình đồng thời

| Tình huống | Mô hình khuyến cáo | Lý do |
| :--- | :--- | :--- |
| Gateway web | Coroutine + async I/O | Cao concurrency, tiêu thụ bộ nhớ thấp |
| Dịch vụ giao tiếp thời gian thực | Coroutine + kết nối dài | Duy trì nhiều kết nối WebSocket |
| Pipeline xử lý dữ liệu | Đa tiến trình + coroutine | Tận dụng đa nhân, I/O không chặn |
| Tính toán khoa học | Đa luồng/đa tiến trình | CPU intensive, cần tính toán song song |
| Kiến trúc microservice | Đa tiến trình + coroutine | Cách ly dịch vụ, cao concurrency bên trong |
| Hệ thống nhúng | Coroutine/đơn luồng | Tài nguyên hạn chế, lên lịch xác định |

### 6.3 Bảng đối chiếu thuật ngữ

| Thuật ngữ tiếng Anh | Dịch sang tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **Process** | Tiến trình | Đơn vị cơ bản phân bổ tài nguyên của hệ điều hành, sở hữu không gian bộ nhớ độc lập |
| **Thread** | Luồng | Đơn vị cơ bản được CPU lên lịch, chia sẻ không gian bộ nhớ tiến trình |
| **Coroutine** | Coroutine | Luồng nhẹ ở chế độ người dùng, được chính chương trình lên lịch |
| **Concurrency** | Đồng thời | Nhiều tác vụ thực thi xen kẽ, vĩ mô thì cùng tiến hành |
| **Parallelism** | Đồng thời thực | Nhiều tác vụ thực sự thực thi cùng lúc, cần hỗ trợ đa nhân |
| **Context Switch** | Chuyển đổi ngữ cảnh | Quá trình CPU chuyển từ một tác vụ sang tác vụ khác |
| **Blocking I/O** | I/O chặn | Phát hành yêu cầu I/O rồi chờ hoàn thành, luồng tạm dừng |
| **Non-blocking I/O** | I/O không chặn | Phát hành yêu cầu I/O rồi trả về ngay, không chờ kết quả |
| **Async I/O** | I/O bất đồng bộ | Khi I/O hoàn thành, thông báo cho gọi hàm qua callback hoặc thông báo |
| **Event Loop** | Vòng lặp sự kiện | Cơ chế lên lịch coroutine, liên tục lắng nghe sự kiện và phân phát xử lý |
| **Goroutine** | Goroutine | Cách triển khai luồng nhẹ của ngôn ngữ Go |
| **Channel** | Channel | Cơ chế giao tiếp giữa các goroutine trong Go |
| **Mutex** | Khóa loại trừ | Nguyên tắc đồng bộ bảo vệ tài nguyên chia sẻ |
| **Semaphore** | Semaphore | Kiểm soát số lượng luồng truy cập đồng thời vào tài nguyên |
| **Deadlock** | Deadlock | Nhiều luồng chờ lẫn nhau giải phóng tài nguyên, dẫn đến chặn vĩnh viễn |
| **Race Condition** | Điều kiện tranh chấp | Nhiều luồng truy cập dữ liệu chia sẻ cùng lúc, kết quả không xác định |
| **Thread Pool** | Nhóm luồng | Tạo trước một nhóm luồng, tái sử dụng để giảm chi phí tạo hủy |
| **Work Stealing** | Ăn cắp công việc | Luồng rỗi "ăn cắp" tác vụ từ hàng đợi của luồng bận |
| **Zero-copy** | Sao chép không | Dữ liệu truyền giữa chế độ nhân và người dùng không qua sao chép CPU |
| **C10K Problem** | Vấn đề C10K | Thách thức xử lý 10,000 kết nối đồng thời trên một máy |
| **C10M Problem** | Vấn đề C10M | Thách thức cuối cùng xử lý 10 triệu kết nối đồng thời trên một máy |

---

## 7. Lời kết

### 7.1 Quy tắc vàng của lập trình đồng thời

1. **Không tối ưu hóa sớm**: Trước hết hãy làm code chạy đúng, sau đó mới tối ưu hiệu năng
2. **Tránh chia sẻ trạng thái**: "Không truyền thông qua chia sẻ bộ nhớ, mà truyền thông qua truyền thông để chia sẻ bộ nhớ"
3. **Để lỗi lộ diện sớm**: Bug đồng thời thường khó tái hiện, phải làm cho lỗi lộ diện trong giai đoạn test
4. **Giới hạn concurrency**: Không concurrency vô hạn tương đương không có bảo vệ, phải giới hạn bằng semaphore hoặc connection pool
5. **Giám sát và có khả năng quan sát**: Hệ thống đồng thời phải có giám sát hoàn chỉnh, mới có thể nhanh chóng xác định vấn đề

### 7.2 Bản đồ đường học tập

```
Giai đoạn 1: Hiểu biết cơ bản
    ├── Hiểu khái niệm cơ bản về tiến trình/luồng
    ├── Học các nguyên tắc đồng bộ (khóa, semaphore, biến điều kiện)
    └── Viết các chương trình đa luồng đơn giản

Giai đoạn 2: Đi sâu vào nguyên lý
    ├── Hiểu mô hình bộ nhớ và tính nhìn thấy
    ├── Học lập trình không khóa và hoạt động nguyên tử
    ├── Hiểu nhóm luồng và ăn cắp công việc
    └── Phân tích deadlock và điều kiện tranh chấp

Giai đoạn 3: Ứng dụng nâng cao
    ├── Nắm rõ coroutine và lập trình bất đồng bộ
    ├── Học mô hình đồng thời của Go/Python/Rust
    ├── Hiểu đồng thời trong hệ thống phân tán
    └── Tối ưu hiệu năng và lập kế hoạch công suất

Giai đoạn 4: Trình độ chuyên gia
    ├── Thiết kế kiến trúc hệ thống cao concurrency
    ├── Giải quyết bug đồng thời phức tạp
    ├── Phát triển framework lập trình đồng thời
    └── Chia sẻ và nâng cao kiến thức đồng thời
```

Hy vọng hướng dẫn này giúp bạn xây dựng nên hiểu biết có hệ thống về lập trình đồng thời. Hãy nhớ, **đồng thời không phải là mục đích, mà là phương tiện** — mục tiêu thực sự là xây dựng dịch vụ hiệu năng cao, sẵn sàng. Hiểu rõ nguyên lý, chọn đúng mô hình, viết tốt code, bạn sẽ đi ngày càng xa hơn trên con đường đồng thời.
