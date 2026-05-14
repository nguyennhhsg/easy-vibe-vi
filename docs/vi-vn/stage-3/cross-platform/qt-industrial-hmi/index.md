# Cách phát triển ứng dụng Qt desktop cấp công nghiệp——hệ thống HMI giám sát bơm nước

# Chương 1: Hệ thống HMI công nghiệp và phát triển Qt là gì

Trong hướng dẫn này, chúng ta sẽ chạy hoàn toàn một vòng kín: từ con số không bắt đầu sử dụng Qt để xây dựng một hệ thống HMI giám sát bơm nước cấp công nghiệp (giao diện người-máy), có thể đọc dữ liệu cảm biến thực tế, vẽ biểu đồ xu hướng áp suất, tự động báo động khi vượt ngưỡng, ghi nhật ký lỗi. Toàn bộ quá trình sử dụng phần mềm mô phỏng miễn phí trên PC để thay thế cho thiết bị điều khiển công nghiệp thực tế, không cần mua bất kỳ phần cứng nào.

Hướng dẫn này yêu cầu bạn có ít nhất:

- Một máy tính (Windows hoặc Mac đều được, khuyến nghị Windows, tương thích phần mềm điều khiển tốt hơn)
- Môi trường phát triển Qt 6.5 (Qt Creator + Qt Serial Bus + mô-đun Qt Charts)
- Phần mềm mô phỏng Modbus Slave (tải miễn phí, đóng vai trò "bơm nước ảo")
- Trợ lý lập trình AI của bạn (Cursor / Trae / Claude Code)

> **Không phần cứng, không chi phí**: Toàn bộ quá trình sử dụng phần mềm mô phỏng miễn phí trên PC (Modbus Slave) để mô phỏng máy dưới, không cần mua bất kỳ thiết bị điều khiển công nghiệp nào; code trực tiếp sử dụng QModbusTcpClient chính thức của Qt + mô-đun Qt Charts, không cần viết lại việc phân tích giao thức; sau khi chạy, bạn có thể thấy biểu đồ xu hướng áp suất thực tế, cảnh báo bật lên khi vượt ngưỡng, ghi nhật ký lỗi, hiệu ứng giống như thực tế ở nhà máy.

## 1.1 Máy chủ và máy chủ dưới là gì?

Trong lĩnh vực tự động hóa công nghiệp, có hai khái niệm bạn phải hiểu: **máy chủ** và **máy chủ dưới**.

**Máy chủ dưới (Lower Computer)**——"tay và chân" của hiện trường

Máy chủ dưới là bộ điều khiển trực tiếp giao tiếp với thiết bị vật lý. Ở nhà máy, nó thường là **PLC (bộ điều khiển logic lập trình được)** hoặc **cảm biến**, chịu trách nhiệm:

* Đọc dữ liệu hiện trường (nhiệt độ, áp suất, lưu lượng, mực chất lỏng……)
* Điều khiển hành động thiết bị (khởi động bơm nước, đóng van, điều chỉnh tốc độ quay……)
* Chạy tự động theo logic được đặt trước (áp suất vượt mức thì tắt bơm)

Bạn có thể hiểu máy chủ dưới là "công nhân" ở nhà máy——nó không cần suy nghĩ nhiều, nhưng phải thực hiện công việc một cách đáng tin cậy.

**Máy chủ (Upper Computer)**——"mắt và bộ não" của phòng điều khiển

Máy chủ là phần mềm giám sát chạy trên PC hoặc máy điều khiển công nghiệp, cũng chính là **HMI (Human-Machine Interface, giao diện người-máy)** mà chúng ta sắp phát triển. Nó chịu trách nhiệm:

* Hiển thị dữ liệu hiện trường thực tế (con số, biểu đồ, hoạt ảnh)
* Ghi lại dữ liệu lịch sử và nhật ký báo động
* Cho phép nhân viên vận hành điều khiển thiết bị từ xa
* Cung cấp phân tích dữ liệu và báo cáo

Bạn có thể hiểu máy chủ là "trung tâm giám sát" của nhà máy——nhân viên vận hành ngồi trước màn hình, có thể nắm bắt toàn bộ tình trạng vận hành của nhà máy.

**Chúng giao tiếp với nhau như thế nào?**

Máy chủ và máy chủ dưới trao đổi dữ liệu qua **giao thức truyền thông công nghiệp**. Giao thức được sử dụng phổ biến nhất là **Modbus**——một "bậc tiền bối" ra đời năm 1979, cho đến nay vẫn là giao thức được sử dụng rộng rãi nhất trong lĩnh vực công nghiệp, vì nó đơn giản, đáng tin cậy, hầu hết tất cả các thiết bị điều khiển công nghiệp đều hỗ trợ.

```
Phòng điều khiển                        Hiện trường nhà máy
┌──────────┐    Giao thức Modbus    ┌──────────┐
│  Máy chủ  │ ◄──────────────────► │ Máy chủ dưới│
│ (Qt HMI) │   "Hãy cho tôi biết   │ (PLC/cảm biến)│
│          │   "Áp suất là 1.20MPa" │          │
│ Hiển thị │                       │ Đọc cảm biến │
│ dữ liệu  │                       │ Điều khiển  │
│ Ghi nhật │                       │ bơm nước   │
│ ký báo   │                       │ Bảo vệ tự  │
│ động     │                       │ động      │
└──────────┘                       └──────────┘
```

## 1.2 Giao thức Modbus là gì?

Modbus là "đơn vị tiền tệ chung" của truyền thông công nghiệp. Nó xác định các quy tắc "cách nói chuyện" giữa máy chủ và máy chủ dưới.

**Chỉ có hai khái niệm cốt lõi:**

* **Thanh ghi (Register)**: "ô tính" trong máy chủ dưới để lưu trữ dữ liệu. Mỗi ô có một địa chỉ (0、1、2……), bên trong lưu trữ một số. Ví dụ, địa chỉ 0 lưu trữ giá trị áp suất, địa chỉ 1 lưu trữ giá trị nhiệt độ.
* **Hoạt động đọc/ghi**: Máy chủ có thể "đọc" thanh ghi (lấy dữ liệu) hoặc "ghi" thanh ghi (gửi lệnh điều khiển).

**Modbus có hai biến thể phổ biến:**

| Biến thể | Phương thức truyền | Kịch bản áp dụng |
|------|---------|---------|
| Modbus RTU | Cổng nối tiếp (RS-485/RS-232) | Khoảng cách ngắn, kết nối trực tiếp thiết bị |
| Modbus TCP | Ethernet (TCP/IP) | Khoảng cách xa, truyền thông mạng |

Hướng dẫn này sử dụng **Modbus TCP**, vì nó dựa trên mạng, chúng ta có thể chạy đồng thời máy chủ và máy chủ dưới được mô phỏng trên cùng một máy tính, không cần bất kỳ dây kết nối vật lý nào.

## 1.3 Tại sao chọn Qt?

Qt là một trong những framework được lựa chọn hàng đầu để phát triển phần mềm công nghiệp, nhiều giao diện giám sát mà bạn thấy ở nhà máy, bệnh viện, hệ thống giao thông được phát triển bằng Qt. Lý do rất đơn giản:

| Ưu điểm | Giải thích |
|------|------|
| Đa nền tảng | Một bộ code biên dịch thành Windows, Linux, thiết bị nhúng |
| Giao thức công nghiệp tích hợp | Mô-đun Qt Serial Bus hỗ trợ sơ khai Modbus, không cần thư viện bên thứ ba |
| Biểu đồ mạnh mẽ | Mô-đun Qt Charts cung cấp biểu đồ chuyên nghiệp thực tế |
| Hiệu suất cao | Nền tảng C++, phù hợp với làm mới dữ liệu thực tế |
| Ổn định và trưởng thành | 30 năm lịch sử, xác minh đầy đủ trong lĩnh vực công nghiệp |

## 1.4 Chúng ta sẽ làm gì?

Chúng ta sẽ xây dựng một **hệ thống HMI giám sát bơm nước**, mô phỏng kịch bản giám sát áp suất bơm nước thực tế ở nhà máy:

| Chức năng | Giải thích |
|------|------|
| Đọc dữ liệu thực tế | Mỗi giây đọc giá trị áp suất từ máy chủ dưới và hiển thị |
| Biểu đồ xu hướng áp suất | Sử dụng biểu đồ đường để hiển thị thay đổi áp suất trong 60 giây qua |
| Báo động vượt ngưỡng | Khi áp suất vượt quá giá trị được đặt thì bật cảnh báo cửa sổ, giao diện chuyển đỏ |
| Nhật ký lỗi | Tất cả các sự kiện báo động được ghi vào cơ sở dữ liệu, có thể truy vấn lịch sử |
| Điều khiển thủ công | Một click để bật/tắt bơm nước (ghi vào thanh ghi máy chủ dưới) |

## 1.5 Lộ trình hướng dẫn này

Chúng ta sẽ hoàn thành toàn bộ quy trình theo các bước sau:

1. **Chuẩn bị môi trường và máy chủ dưới được mô phỏng**(2 phút): Cài đặt Qt 6.5 và mô phỏng Modbus Slave
2. **Tạo dự án Qt và kết nối Modbus**(3 phút): Thiết lập truyền thông giữa máy chủ và máy chủ dưới được mô phỏng
3. **Thực hiện đọc và hiển thị dữ liệu thực tế**(3 phút): Đọc định kỳ giá trị áp suất và cập nhật giao diện
4. **Vẽ biểu đồ xu hướng áp suất thực tế**(3 phút): Sử dụng Qt Charts để vẽ biểu đồ đường động
5. **Thực hiện hệ thống báo động và nhật ký lỗi**(3 phút): Báo động vượt ngưỡng + ghi nhật ký lỗi SQLite
6. **Đóng gói và triển khai**(tùy chọn): Đóng gói ứng dụng thành tệp thực thi độc lập

# Chương 2: Chuẩn bị môi trường và máy chủ dưới được mô phỏng (2 phút)

## 2.1 Cài đặt Qt 6.5

Qt cung cấp phiên bản mã nguồn mở miễn phí, đủ để chúng ta sử dụng.

1. Truy cập [trang web Qt chính thức](https://www.qt.io/download-qt-installer), tải Qt Online Installer
2. Chạy trình cài đặt, đăng nhập hoặc đăng ký tài khoản Qt (miễn phí)
3. Trên trang chọn thành phần, hãy chọn các mục sau:
   - **Qt 6.5.x**(hoặc phiên bản cao hơn)
   - Trong **Additional Libraries** chọn **Qt Serial Bus**(hỗ trợ giao thức Modbus)
   - Trong **Additional Libraries** chọn **Qt Charts**(vẽ biểu đồ)
   - **Qt Creator**(IDE, thường được chọn theo mặc định)
4. Nhấp vào cài đặt, chờ hoàn tất

> **Gợi ý**: Nếu bạn đã cài đặt Qt nhưng không có mô-đun Serial Bus hoặc Charts, bạn có thể chạy lại Qt Maintenance Tool, chọn "Thêm hoặc xóa thành phần" để bổ sung.

## 2.2 Cài đặt Modbus Slave——"bơm nước ảo" của bạn

Modbus Slave là phần mềm mô phỏng từ trạm Modbus miễn phí, nó có thể mô phỏng một thiết bị công nghiệp (PLC/cảm biến) trên máy tính của bạn, để cho chương trình máy chủ của bạn có thứ "nói chuyện".

1. Truy cập [modbustools.com](https://www.modbustools.com/modbus_slave.html), tải Modbus Slave
2. Cài đặt và mở phần mềm
3. Cấu hình kết nối:
   - Nhấp vào menu **Connection → Connect**
   - Chọn **Modbus TCP/IP**
   - Địa chỉ IP điền `127.0.0.1`(máy cục bộ)
   - Cổng điền `502`(cổng mặc định Modbus TCP)
   - Nhấp vào **OK** để bắt đầu lắng nghe

4. Cài đặt dữ liệu mô phỏng:
   - Bạn sẽ thấy một bảng thanh ghi, mỗi hàng là một địa chỉ thanh ghi (0、1、2……)
   - Nhấp đôi vào giá trị địa chỉ **0**, thay đổi thành **120**(đại diện cho áp suất 1.20 MPa, chương trình sẽ chia cho 100 để chuyển đổi)
   - Nhấp đôi vào giá trị địa chỉ **1**, thay đổi thành **350**(đại diện cho nhiệt độ 35.0°C)
   - Nhấp đôi vào giá trị địa chỉ **2**, thay đổi thành **1**(đại diện cho trạng thái bơm nước: 1=chạy, 0=dừng)

Bây giờ Modbus Slave là "bơm nước ảo chạy 24 giờ"——giữ cửa sổ mở, nó sẽ tiếp tục phản hồi các yêu cầu đọc/ghi từ máy chủ.

> **Mẹo mô phỏng động**: Modbus Slave hỗ trợ tự động tăng/thay đổi ngẫu nhiên. Nhấp chuột phải vào giá trị thanh ghi, chọn "Auto increment" hoặc "Random", bạn có thể mô phỏng sự biến động dữ liệu của cảm biến thực tế, làm cho biểu đồ xu hướng của bạn sinh động hơn.

# Chương 3: Tạo dự án Qt và kết nối Modbus (3 phút)

## 3.1 Tạo dự án Qt mới

Mở Qt Creator, tạo dự án mới:

1. Nhấp vào **File → New Project**
2. Chọn **Application (Qt) → Qt Widgets Application**
3. Điền tên dự án **PumpHMI**
4. Chọn Kit Qt 6.5 bạn đã cài đặt
5. Hoàn thành tạo

Mở tệp `PumpHMI.pro` (nếu sử dụng CMake thì là `CMakeLists.txt`), thêm hai mô-đun chính:

```pro
QT += core gui widgets serialbus charts sql
```

| Mô-đun | Tác dụng |
|------|------|
| `serialbus` | Cung cấp QModbusTcpClient, dùng cho truyền thông Modbus TCP |
| `charts` | Cung cấp QChart、QLineSeries, dùng để vẽ biểu đồ xu hướng thực tế |
| `sql` | Cung cấp QSqlDatabase, dùng để lưu trữ nhật ký lỗi SQLite |

Nếu sử dụng CMake, cấu hình tương ứng là:

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 Khai báo các thành viên cốt lõi

Hãy để AI giúp bạn viết tệp tiêu đề:

```
Hãy giúp tôi viết mainwindow.h, khai báo các thành viên cốt lõi của HMI giám sát bơm nước:
1. QModbusTcpClient dùng cho truyền thông Modbus TCP
2. QTimer dùng cho đọc dữ liệu định kỳ
3. QChart + QLineSeries dùng cho biểu đồ xu hướng thực tế
4. QSqlDatabase dùng cho lưu trữ nhật ký lỗi
5. Các thành phần giao diện: nhãn hiển thị áp suất, đèn chỉ báo trạng thái, nút bật/tắt, bảng nhật ký
```

Tệp tiêu đề cốt lõi:

```cpp
// mainwindow.h
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QModbusTcpClient>
#include <QModbusDataUnit>
#include <QTimer>
#include <QtCharts>
#include <QSqlDatabase>
#include <QLabel>
#include <QPushButton>
#include <QTableWidget>

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void connectModbus();        // Kết nối máy chủ dưới
    void readPressure();         // Đọc dữ liệu áp suất định kỳ
    void onReadReady();          // Gọi lại hoàn thành đọc
    void triggerAlarm(float v);  // Kích hoạt báo động
    void togglePump();           // Bật/tắt bơm nước

private:
    // Truyền thông Modbus
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // Biểu đồ thực tế
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // Cơ sở dữ liệu
    QSqlDatabase m_db;

    // Các thành phần giao diện
    QLabel *m_pressureLabel = nullptr;    // Hiển thị giá trị áp suất
    QLabel *m_statusLight = nullptr;      // Đèn chỉ báo trạng thái
    QPushButton *m_pumpButton = nullptr;  // Nút bật/tắt
    QTableWidget *m_logTable = nullptr;   // Bảng nhật ký

    // Ngưỡng báo động
    float m_alarmThreshold = 1.50f;  // Báo động khi áp suất vượt 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

## 3.3 Thiết lập kết nối Modbus TCP

Thực hiện logic kết nối trong `mainwindow.cpp`:

```cpp
// mainwindow.cpp — phần kết nối
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Kết nối đến mô phỏng Modbus Slave
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // Hết thời gian 1 giây
    m_modbusClient->setNumberOfRetries(3);  // Thử lại 3 lần

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("Kết nối máy chủ dưới thất bại!", 3000);
        return;
    }

    statusBar()->showMessage("Đã kết nối đến máy chủ dưới (127.0.0.1:502)", 3000);

    // Khởi động bộ hẹn giờ, đọc dữ liệu mỗi giây một lần
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1 giây
}
```

**Giải thích code:**

| Code | Ý nghĩa |
|------|------|
| `QModbusTcpClient` | Máy khách Modbus TCP tích hợp sẵn của Qt, chịu trách nhiệm truyền thông với máy chủ dưới |
| `NetworkPortParameter, 502` | Kết nối đến cổng 502 (giống với cài đặt trong Modbus Slave) |
| `NetworkAddressParameter, "127.0.0.1"` | Kết nối máy cục bộ (vì mô phỏng đang chạy trên máy cục bộ) |
| `m_pollTimer->start(1000)` | Cứ 1 giây tự động gọi `readPressure()` để đọc dữ liệu |

## 3.4 Đọc dữ liệu áp suất

```cpp
// mainwindow.cpp — phần đọc
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // Xây dựng yêu cầu đọc: từ địa chỉ 0 bắt đầu, đọc 3 thanh ghi dữ trữ
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // Kiểu thanh ghi
        0,                                   // Địa chỉ bắt đầu
        3                                    // Số lượng đọc
    );

    // Gửi yêu cầu đọc (không đồng bộ)
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // Yêu cầu quảng bá, xóa trực tiếp
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // Phân tích dữ liệu (giá trị thanh ghi chia cho 100 để lấy giá trị thực tế)
        float pressure = unit.value(0) / 100.0f;   // Địa chỉ 0: áp suất (MPa)
        float temperature = unit.value(1) / 10.0f;  // Địa chỉ 1: nhiệt độ (°C)
        int pumpStatus = unit.value(2);              // Địa chỉ 2: trạng thái bơm nước

        // Cập nhật hiển thị giao diện
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // Kiểm tra xem có cần báo động hay không
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // Cập nhật biểu đồ xu hướng (thực hiện trong chương tiếp theo)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("Đọc thất bại: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Giải thích quy trình đọc Modbus:**

```
readPressure() được bộ hẹn giờ kích hoạt
    → Xây dựng QModbusDataUnit (cho biết máy chủ dưới "tôi muốn đọc dữ liệu từ địa chỉ 0-2")
    → sendReadRequest() gửi yêu cầu (không đồng bộ, không chặn giao diện)
    → Máy chủ dưới trả về dữ liệu
    → onReadReady() được kích hoạt
    → Phân tích giá trị thanh ghi, cập nhật giao diện
```

# Chương 4: Vẽ biểu đồ xu hướng áp suất thực tế (3 phút)

## 4.1 Khởi tạo biểu đồ

Qt Charts cung cấp các thành phần biểu đồ chuyên nghiệp. Hãy để AI giúp bạn khởi tạo trong hàm tạo:

```
Hãy giúp tôi khởi tạo biểu đồ đường thực tế Qt Charts trong hàm tạo MainWindow:
1. Tạo QChart và QLineSeries
2. Trục X là trục thời gian (QDateTimeAxis), hiển thị 60 giây gần đây
3. Trục Y là trục giá trị (QValueAxis), khoảng 0-3.0 MPa
4. Màu đường là xanh lam, độ rộng đường 2px
5. Đặt biểu đồ vào QChartView và thêm vào bố cục giao diện
```

Code cốt lõi:

```cpp
// mainwindow.cpp — khởi tạo biểu đồ
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Áp suất (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Biểu đồ xu hướng áp suất thực tế");
    m_chart->setAnimationOptions(QChart::NoAnimation); // Dữ liệu thực tế không cần hoạt ảnh

    // Trục X: thời gian
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Thời gian");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Trục Y: giá trị áp suất
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Áp suất (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // Tạo chế độ xem biểu đồ
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // Thêm vào bố cục (giả sử đã có centralLayout)
    centralLayout->addWidget(chartView);
}
```

## 4.2 Cập nhật dữ liệu biểu đồ thực tế

Mỗi lần đọc được giá trị áp suất mới, hãy thêm một điểm dữ liệu vào biểu đồ đường và giữ cho nó chỉ hiển thị dữ liệu trong 60 giây gần đây:

```cpp
// mainwindow.cpp — cập nhật biểu đồ
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // Thêm điểm dữ liệu mới
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // Chỉ giữ dữ liệu của 60 giây gần đây (tránh tăng bộ nhớ vô hạn)
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // Cập nhật phạm vi trục X: luôn hiển thị 60 giây gần đây
    m_axisX->setRange(cutoff, now);
}
```

Sau đó trong `onReadReady()`, hãy gọi nó:

```cpp
// Trong onReadReady(), sau khi phân tích giá trị áp suất:
updateChart(pressure);
```

Bây giờ chạy chương trình, bạn sẽ thấy một đường cong xanh lam cuộn thực tế——mỗi giây thêm một điểm dữ liệu mới, luôn hiển thị thay đổi áp suất trong 60 giây gần đây. Nếu bạn thay đổi giá trị thanh ghi thủ công trong Modbus Slave, đường cong sẽ phản ánh ngay lập tức.

> **Gợi ý hiệu suất**: `QChart::NoAnimation` rất quan trọng——dữ liệu thực tế làm mới mỗi giây, nếu bật hoạt ảnh sẽ khiến giao diện bị đơ. Đây là kinh nghiệm chung trong phát triển HMI công nghiệp.

# Chương 5: Hệ thống báo động và nhật ký lỗi (3 phút)

## 5.1 Báo động vượt ngưỡng

Khi áp suất vượt ngưỡng được đặt, chúng ta cần: giao diện chuyển đỏ cảnh báo + cảnh báo cửa sổ bật lên + ghi vào nhật ký.

```cpp
// mainwindow.cpp — logic báo động
void MainWindow::triggerAlarm(float pressure)
{
    // Giao diện chuyển đỏ
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // Đèn chỉ báo trạng thái chuyển đỏ
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // Cảnh báo cửa sổ (chỉ bật lên khi lần đầu vượt ngưỡng, tránh cảnh báo lặp lại)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Cảnh báo áp suất",
            QString("Áp suất hiện tại %1 MPa vượt quá ngưỡng %2 MPa!\nVui lòng kiểm tra trạng thái vận hành bơm nước ngay.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // Ghi vào cơ sở dữ liệu
    logAlarm(pressure,
        QString("Áp suất vượt ngưỡng: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // Khi áp suất trở về bình thường thì đặt lại
    if (pressure <= m_alarmThreshold) {
        alarmActive = false;
        m_pressureLabel->setStyleSheet(
            "color: #2196F3; font-size: 32px; padding: 10px;");
        m_statusLight->setStyleSheet(
            "background-color: #4CAF50; border-radius: 12px;"
            "min-width: 24px; min-height: 24px;");
    }
}
```

## 5.2 Nhật ký lỗi SQLite

Hệ thống công nghiệp phải ghi lại tất cả các sự kiện báo động, để thuận tiện cho việc truy tìm hậu kỳ. Chúng ta sử dụng cơ sở dữ liệu SQLite để lưu trữ:

```cpp
// mainwindow.cpp — khởi tạo cơ sở dữ liệu
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "Không thể mở cơ sở dữ liệu:" << m_db.lastError().text();
        return;
    }

    // Tạo bảng nhật ký báo động
    QSqlQuery query;
    query.exec(
        "CREATE TABLE IF NOT EXISTS alarm_log ("
        "  id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,"
        "  pressure REAL,"
        "  message TEXT"
        ")"
    );
}
```

## 5.3 Ghi và hiển thị nhật ký

```cpp
// mainwindow.cpp — ghi nhật ký
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // Ghi vào cơ sở dữ liệu
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // Cùng lúc cập nhật bảng nhật ký trên giao diện
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // Tự động cuộn đến bản ghi mới nhất
    m_logTable->scrollToBottom();
}
```

Bảng nhật ký hiển thị ba cột: thời gian, giá trị áp suất, thông báo báo động. Mỗi lần báo động sẽ tự động thêm một hàng mới, đồng thời ghi vào cơ sở dữ liệu SQLite để lưu trữ bền vững.

## 5.4 Bật/tắt bơm nước thủ công

Ngoài việc đọc dữ liệu, máy chủ cũng cần có khả năng điều khiển máy chủ dưới. Chúng ta thực hiện việc khởi động/dừng bơm nước bằng cách "ghi vào thanh ghi":

```cpp
// mainwindow.cpp — điều khiển bơm nước
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // Xây dựng yêu cầu ghi: ghi địa chỉ 2 với giá trị 1 (bật) hoặc 0 (tắt)
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "Dừng bơm nước" : "Khởi động bơm nước");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "Bơm nước đã khởi động" : "Bơm nước đã dừng", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

Trong Modbus Slave, bạn sẽ thấy giá trị địa chỉ 2 chuyển đổi giữa 0 và 1 mỗi khi bạn nhấp nút——đây chính là quá trình máy chủ "điều khiển" máy chủ dưới.

# Chương 6: Đóng gói và triển khai (tùy chọn)

## 6.1 Sử dụng windeployqt / macdeployqt để đóng gói

Qt cung cấp các công cụ triển khai chính thức, tự động thu thập tất cả các thư viện động cần thiết cho ứng dụng:

**Windows:**

```bash
# Trước tiên xây dựng phiên bản Release, sau đó thực hiện trong thư mục xây dựng:
windeployqt PumpHMI.exe
```

`windeployqt` sẽ tự động sao chép các DLL của Qt, plugin, tệp dịch sang thư mục nơi exe nằm, thư mục được đóng gói có thể được gửi trực tiếp cho người khác sử dụng.

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

Điều này sẽ tạo ra một hình ảnh cài đặt `.dmg`, nhấp đúp để cài đặt.

## 6.2 Sử dụng Qt Installer Framework để tạo gói cài đặt

Nếu bạn muốn tạo một hướng dẫn cài đặt chuyên nghiệp (giống như "Tiếp theo, Tiếp theo, Hoàn thành" trên Windows), bạn có thể sử dụng Qt Installer Framework:

```
Hãy giúp tôi tạo gói cài đặt cho PumpHMI sử dụng Qt Installer Framework:
1. Tạo cấu trúc thư mục installer (config, packages)
2. Cấu hình config.xml (tên gói cài đặt, phiên bản, thư mục đích)
3. Đặt tệp từ đầu ra windeployqt vào packages/com.example.pumphmi/data/
4. Chạy binarycreator để tạo gói cài đặt
```

# Chương 7: Lời kết

Xin chúc mừng! Bạn đã xây dựng thành công một hệ thống HMI giám sát bơm nước cấp công nghiệp từ con số không. Hãy xem lại những gì chúng ta đã làm:

1. Hiểu được các khái niệm cốt lõi về máy chủ, máy chủ dưới và giao thức Modbus
2. Sử dụng Modbus Slave để mô phỏng một "bơm nước ảo", không cần bất kỳ phần cứng thực tế nào
3. Sử dụng QModbusTcpClient của Qt để thiết lập truyền thông giữa máy chủ và máy chủ dưới
4. Sử dụng Qt Charts để vẽ biểu đồ áp suất cuộn thực tế
5. Thực hiện cảnh báo cửa sổ vượt ngưỡng và ghi nhật ký lỗi SQLite
6. Thực hiện chức năng điều khiển khởi động/dừng bơm nước từ xa

Toàn bộ quá trình không sử dụng bất kỳ thiết bị điều khiển công nghiệp thực tế nào, nhưng chương trình được phát triển có cấu trúc và chức năng hoàn toàn giống với hệ thống HMI được sử dụng tại nhà máy thực tế. Khi bạn thay Modbus Slave bằng PLC thực, chương trình này có thể được sử dụng trực tiếp trong môi trường sản xuất.

**Hướng phát triển nâng cao:**

* **Giám sát nhiều thiết bị**: Kết nối đồng thời với nhiều máy chủ dưới, sử dụng tab hoặc chia màn hình để hiển thị dữ liệu của các thiết bị khác nhau
* **Phát lại dữ liệu lịch sử**: Đọc dữ liệu lịch sử từ SQLite, sử dụng thanh trượt thời gian để phát lại biểu đồ xu hướng của bất kỳ khoảng thời gian nào
* **Giao thức OPC UA**: Modbus phù hợp với các tình huống đơn giản, các hệ thống công nghiệp phức tạp hơn thường sử dụng giao thức OPC UA, Qt cũng có hỗ trợ chính thức (mô-đun Qt OPC UA)
* **Giám sát từ xa qua web**: Sử dụng mô-đun Qt WebSocket để đẩy dữ liệu thực tế đến trình duyệt, thực hiện xem từ xa qua điện thoại di động
* **Bảo trì dự phòng dựa trên AI**: Đưa dữ liệu áp suất lịch sử vào mô hình học máy, dự đoán khi nào thiết bị có thể gặp sự cố, bảo trì trước thời hạn

***Sử dụng code để bảo vệ mỗi thiết bị tại hiện trường công nghiệp.***

# Tài liệu tham khảo

* [Tài liệu chính thức Qt Serial Bus](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Ví dụ Qt Modbus TCP Client](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Tài liệu chính thức Qt Charts](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Thông số giao thức Modbus](https://modbus.org/specs.php)
* [Công cụ mô phỏng Modbus Slave](https://www.modbustools.com/modbus_slave.html)
* [Tài liệu Qt Installer Framework](https://doc.qt.io/qtinstallerframework/)
