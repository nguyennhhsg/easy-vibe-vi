# Cơ bản về Linux

::: tip Lời dẫn
**Trong thế giới máy chủ, Linux là nhân vật chính tuyệt đối.** Trên 90% máy chủ toàn cầu chạy Linux, từ WeChat mà bạn dùng hàng ngày đến Google Search, đều có Linux hỗ trợ ở đằng sau. Như một lập trình viên, nắm vững cơ bản về Linux không phải là tùy chọn mà là bài học bắt buộc.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Hệ thống tập tin**: Hiểu cấu trúc thư mục Linux và triết lý "mọi thứ đều là tập tin"
- **Lệnh thường dùng**: Nắm vững các lệnh cốt lõi như thao tác tập tin, xử lý văn bản, quản lý tiến trình
- **Mô hình quyền hạn**: Hiểu khái niệm người dùng, nhóm, quyền hạn
- **Cơ bản Shell**: Biết về đường ống, chuyển hướng, biến môi trường và các khái niệm lõi của Shell
- **Kỹ năng thực hành**: Học cách xem nhật ký, kiểm tra tiến trình, chẩn đoán mạng và kỹ năng vận hành cơ bản

| Chương | Nội dung | Khái niệm lõi |
|--------|---------|----------------|
| **Chương 1** | Hệ thống tập tin | Cấu trúc thư mục, mọi thứ đều là tập tin |
| **Chương 2** | Lệnh thường dùng | Tập tin, văn bản, tiến trình, mạng |
| **Chương 3** | Mô hình quyền hạn | Người dùng, nhóm, rwx, sudo |
| **Chương 4** | Cơ bản Shell | Đường ống, chuyển hướng, biến, kịch bản |
| **Chương 5** | Tình huống thực tế | Kiểm tra nhật ký, chẩn đoán hiệu suất |

---

## 1. Hệ thống tập tin: Mọi thứ đều là tập tin

Một trong những triết lý lõi nhất của Linux là **mọi thứ đều là tập tin**. Tập tin thông thường là tập tin, thư mục là tập tin, ổ cứng là tập tin, thậm chí kết nối mạng và thông tin tiến trình cũng là tập tin. Sự trừu tượng hóa thống nhất này cho phép bạn sử dụng cùng một bộ công cụ (đọc, viết, kiểm soát quyền hạn) để vận hành hầu hết các tài nguyên hệ thống.

<LinuxFileSystemDemo />

### Ghi nhớ nhanh cấu trúc thư mục

Hãy tưởng tượng hệ thống tập tin Linux là một cây ngược:

```
/                    ← Thư mục gốc (gốc cây)
├── home/            ← Nhà của người dùng (tập tin của bạn đều ở đây)
├── etc/             ← Tập tin cấu hình (bảng điều khiển "cài đặt" của hệ thống)
├── var/             ← Dữ liệu thay đổi (nhật ký, bộ đệm)
├── usr/             ← Chương trình do người dùng cài đặt
├── tmp/             ← Tập tin tạm thời (bị xóa khi khởi động lại)
├── proc/            ← Thông tin tiến trình (ảo, không chiếm dung lượng đĩa)
├── dev/             ← Tập tin thiết bị (ổ cứng, thiết bị đầu cuối)
├── bin/             ← Lệnh cơ bản (ls, cp, mv)
├── sbin/            ← Lệnh quản lý hệ thống (cần root)
├── opt/             ← Phần mềm của bên thứ ba
└── root/            ← Thư mục chính của người dùng root
```

### Hai cách viết đường dẫn

| Loại | Định dạng | Ví dụ | Giải thích |
|------|-----------|-------|-----------|
| Đường dẫn tuyệt đối | Bắt đầu từ `/` | `/home/alice/code/app.js` | Bắt đầu từ thư mục gốc, không có sự nhập nhằng |
| Đường dẫn tương đối | Bắt đầu từ thư mục hiện tại | `./code/app.js` hoặc `../config` | `.` là thư mục hiện tại, `..` là thư mục cha |

::: tip Sức mạnh của "mọi thứ đều là tập tin"
Muốn biết thông tin CPU? Đọc tập tin: `cat /proc/cpuinfo`
Muốn biết sử dụng bộ nhớ? Đọc tập tin: `cat /proc/meminfo`
Muốn tạo số ngẫu nhiên? Đọc tập tin: `cat /dev/urandom`
Muốn hủy bỏ đầu ra? Viết tập tin: `echo "no thanks" > /dev/null`

Không cần API đặc biệt, chỉ cần đọc viết tập tin là đủ. Đây chính là sự tao nhã của triết lý Unix.
:::

---

## 2. Lệnh thường dùng

Các lệnh Linux tuân theo một định dạng thống nhất: `lệnh [tùy chọn] [tham số]`. Ví dụ trong `ls -la /home`, `ls` là lệnh, `-la` là tùy chọn, `/home` là tham số.

<LinuxCommandDemo />

### 10 lệnh thường dùng nhất

Nếu chỉ có thể ghi nhớ 10 lệnh, hãy ghi nhớ những lệnh này:

| Lệnh | Mục đích | Mẹo ghi nhớ |
|------|---------|-----------|
| `ls` | Liệt kê tập tin | list |
| `cd` | Chuyển thư mục | change directory |
| `cat` | Xem tập tin | concatenate |
| `grep` | Tìm kiếm văn bản | global regular expression print |
| `find` | Tìm tập tin | just find |
| `ps` | Xem tiến trình | process status |
| `tail -f` | Xem nhật ký thời gian thực | Xem "đuôi" của tập tin, -f là follow |
| `chmod` | Thay đổi quyền hạn | change mode |
| `curl` | Gửi yêu cầu HTTP | client URL |
| `ssh` | Đăng nhập từ xa | secure shell |

### Nghệ thuật kết hợp lệnh

Sức mạnh của Linux không nằm ở các lệnh riêng lẻ mà ở **việc kết hợp lệnh**. Kết nối nhiều lệnh đơn giản thông qua đường ống `|` để giải quyết các vấn đề phức tạp:

```bash
# Tìm 5 tiến trình sử dụng CPU nhiều nhất
ps aux --sort=-%cpu | head -6

# Đếm các loại lỗi xuất hiện nhiều nhất trong nhật ký
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# Tìm tập tin lớn hơn 100MB
find / -size +100M -type f 2>/dev/null

# Giám sát nhật ký theo thời gian thực để tìm lỗi
tail -f /var/log/app.log | grep --color "ERROR"
```

::: tip Triết lý Unix
"Làm một việc, làm tốt nó." Mỗi lệnh chỉ chịu trách nhiệm cho một chức năng, bạn kết hợp thông qua đường ống để thực hiện các thao tác phức tạp. Đó là lý do tại sao các lệnh Linux đều ngắn gọn — chúng là những viên gạch, không phải công cụ đa năng.
:::

---

## 3. Mô hình quyền hạn

Linux là hệ thống đa người dùng, mô hình quyền hạn là nền tảng của bảo mật. Mỗi tập tin đều có ba tập hợp quyền hạn, kiểm soát riêng biệt những gì **chủ sở hữu (Owner)**, **nhóm sở hữu (Group)**, **những người khác (Others)** có thể làm.

### Đọc hiểu đầu ra của `ls -l`

```bash
$ ls -l app.js
-rwxr-xr-- 1 alice developers 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │          │
│ │   │   │     │     │          └── Kích thước tập tin
│ │   │   │     │     └── Nhóm sở hữu
│ │   │   │     └── Chủ sở hữu
│ │   │   └── Quyền của những người khác: r-- (chỉ đọc)
│ │   └── Quyền của nhóm: r-x (đọc + thực thi)
│ └── Quyền của chủ sở hữu: rwx (đọc + viết + thực thi)
└── Loại tập tin: - tập tin thông thường, d thư mục, l liên kết
```

### Ba thao tác quyền hạn

| Quyền | Chữ | Số | Ý nghĩa với tập tin | Ý nghĩa với thư mục |
|-------|-----|----|--------------------|-------------------|
| Đọc | `r` | 4 | Xem nội dung tập tin | Liệt kê nội dung thư mục (ls) |
| Viết | `w` | 2 | Sửa nội dung tập tin | Tạo/xóa tập tin trong thư mục |
| Thực thi | `x` | 1 | Chạy chương trình/kịch bản | Vào thư mục (cd) |

<LinuxPermissionsDemo />

### Tính toán nhanh quyền hạn số

Ba chữ số lần lượt đại diện cho quyền hạn của Owner, Group, Others, mỗi chữ số là tổng của r(4) + w(2) + x(1):

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → Chủ sở hữu: đọc + viết + thực thi
  5 = r-x (4+0+1)  → Nhóm: đọc + thực thi
  5 = r-x (4+0+1)  → Những người khác: đọc + thực thi
```

| Quyền thông dụng | Ý nghĩa | Mục đích sử dụng |
|-----------------|---------|-----------------|
| `644` | rw-r--r-- | Tập tin thông thường (chủ sở hữu có thể viết, người khác chỉ đọc) |
| `755` | rwxr-xr-x | Tập tin/thư mục có thể thực thi |
| `600` | rw------- | Tập tin riêng tư (ví dụ: khóa SSH) |
| `777` | rwxrwxrwx | Tất cả mọi người có thể đọc, viết, thực thi (nguy hiểm, tránh sử dụng) |

### sudo: Cấp quyền cao hạn tạm thời

Người dùng thông thường có quyền hạn hạn chế, một số thao tác cần quyền của root. `sudo` cho phép bạn thực hiện lệnh tạm thời với tư cách root:

```bash
# Người dùng thông thường không thể sửa cấu hình hệ thống
$ vim /etc/nginx/nginx.conf
# Permission denied

# Dùng sudo để cấp quyền cao tạm thời
$ sudo vim /etc/nginx/nginx.conf
# Nhập mật khẩu của bạn để chỉnh sửa

# Chuyển sang người dùng root (sử dụng cẩn thận)
$ sudo su -
```

::: warning Nguyên tắc quyền hạn tối thiểu
Không bao giờ dùng `chmod 777` để giải quyết vấn đề quyền hạn, điều này tương đương với việc tháo khóa cửa. Cách làm đúng là tìm hiểu ai cần quyền gì, rồi cấp chính xác. Tương tự như vậy, không nên hoạt động lâu dài với tư cách root, chỉ dùng `sudo` khi cần thiết.
:::

---

## 4. Cơ bản Shell

Shell là "thông dịch viên" giữa bạn và nhân Linux. Bạn nhập lệnh, Shell giải thích và giao cho nhân thực thi. Shell thường dùng nhất là **Bash** (phần lớn bản phân phối Linux sử dụng mặc định) và **Zsh** (mặc định macOS).

### Đường ống và chuyển hướng

Đây là hai tính năng mạnh mẽ nhất của Shell:

| Ký hiệu | Tên | Tác dụng | Ví dụ |
|---------|-----|---------|-------|
| `|` | Đường ống | Đưa đầu ra của lệnh trước làm đầu vào của lệnh sau | `cat log | grep ERROR` |
| `>` | Chuyển hướng đầu ra | Viết đầu ra vào tập tin (ghi đè) | `echo "hello" > file.txt` |
| `>>` | Chuyển hướng nối thêm | Nối thêm đầu ra vào cuối tập tin | `echo "world" >> file.txt` |
| `<` | Chuyển hướng đầu vào | Đọc đầu vào từ tập tin | `wc -l < file.txt` |
| `2>` | Chuyển hướng lỗi | Viết thông báo lỗi vào tập tin | `cmd 2> error.log` |
| `2>&1` | Hợp nhất đầu ra | Hợp nhất thông báo lỗi và đầu ra thông thường | `cmd > all.log 2>&1` |

### Biến môi trường

Biến môi trường là "cấu hình toàn cục" trong Shell, ảnh hưởng đến hành vi của lệnh:

```bash
# Xem tất cả biến môi trường
env

# Xem một biến cụ thể
echo $PATH
echo $HOME

# Đặt tạm thời (chỉ có hiệu lực trong Shell hiện tại)
export API_KEY="abc123"

# Đặt vĩnh viễn (viết vào tập tin cấu hình)
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # Làm cho cấu hình có hiệu lực ngay lập tức
```

| Biến thông dụng | Ý nghĩa | Giá trị ví dụ |
|-----------------|---------|----------------|
| `$PATH` | Đường dẫn tìm kiếm lệnh | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | Thư mục chính của người dùng | `/home/alice` |
| `$USER` | Tên người dùng hiện tại | `alice` |
| `$PWD` | Thư mục làm việc hiện tại | `/var/log` |
| `$SHELL` | Shell đang sử dụng | `/bin/bash` |

### Bắt đầu với kịch bản Shell

Viết nhiều lệnh vào một tập tin chính là một kịch bản Shell. Đây là điểm bắt đầu của tự động hóa vận hành:

```bash
#!/bin/bash
# deploy.sh - Kịch bản triển khai đơn giản

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - Bắt đầu triển khai..." >> $LOG_FILE

# Kéo mã nguồn mới nhất
cd $APP_DIR && git pull origin main

# Cài đặt phụ thuộc
npm install --production

# Khởi động lại dịch vụ
pm2 restart myapp

echo "$(date) - Triển khai hoàn tất" >> $LOG_FILE
```

```bash
# Cấp quyền thực thi cho kịch bản và chạy nó
chmod +x deploy.sh
./deploy.sh
```

::: tip Mẹo gỡ lỗi kịch bản
Thêm `set -ex` vào đầu kịch bản: `-e` khiến kịch bản thoát ngay khi gặp lỗi (thay vì tiếp tục thực thi), `-x` sẽ in ra mỗi lệnh được thực thi (giúp khắc phục sự cố dễ dàng hơn). Hai tùy chọn này gần như là tiêu chuẩn trong các kịch bản sản xuất.
:::

---

## 5. Tình huống thực tế

Học xong lý thuyết, hãy xem một vài tình huống thực tế mà bạn sẽ gặp trong quá trình phát triển.

### 5.1 Kiểm tra nhật ký

Dịch vụ gặp sự cố, phản ứng đầu tiên là xem nhật ký. Đây là những quy trình thông dụng để kiểm tra nhật ký:

```bash
# 1. Theo dõi nhật ký theo thời gian thực (thường dùng nhất)
tail -f /var/log/app/error.log

# 2. Tìm kiếm các lỗi trong một khoảng thời gian cụ thể
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. Đếm số lỗi mỗi giờ
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. Xem 100 dòng nhật ký gần đây nhất
tail -100 app.log

# 5. Tìm kiếm trong nhiều tập tin nhật ký
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 Kiểm tra tiến trình

Ứng dụng đóng băng, CPU cao, rò rỉ bộ nhớ — những vấn đề này đều cần bắt đầu từ tiến trình:

```bash
# Xem tiến trình sử dụng CPU nhiều nhất
ps aux --sort=-%cpu | head -10

# Xem tiến trình sử dụng bộ nhớ nhiều nhất
ps aux --sort=-%mem | head -10

# Tìm tiến trình cụ thể
ps aux | grep "node"

# Xem thông tin chi tiết của tiến trình (bao gồm cả luồng)
top -Hp <PID>

# Xem tập tin mà tiến trình đã mở
lsof -p <PID>

# Dừng tiến trình một cách ưu tiên (SIGTERM)
kill <PID>

# Dừng tiến trình bắt buộc (SIGKILL, cách cuối cùng)
kill -9 <PID>
```

### 5.3 Chẩn đoán mạng

Không thể kết nối dịch vụ? Trước tiên, tìm hiểu xem đó là vấn đề mạng hay vấn đề ứng dụng:

```bash
# Kiểm tra xem đích tiêu có thể truy cập được không
ping -c 4 google.com

# Kiểm tra xem cổng có mở không
telnet db-server 3306
# Hoặc dùng nc
nc -zv db-server 3306

# Xem các cổng mà máy chủ này đang lắng nghe
ss -tlnp
# Hoặc
netstat -tlnp

# Kiểm tra phân giải DNS
dig api.example.com
nslookup api.example.com

# Kiểm tra giao diện HTTP
curl -v http://localhost:3000/health

# Xem thống kê trạng thái kết nối mạng
ss -s
```

### 5.4 Kiểm tra dung lượng đĩa

Đĩa đầy là một trong những sự cố trực tuyến phổ biến nhất:

```bash
# Xem cách sử dụng từng phân vùng
df -h

# Tìm thư mục chiếm dung lượng lớn nhất
du -sh /* 2>/dev/null | sort -rh | head -10

# Xác định thêm thư mục lớn
du -sh /var/log/* | sort -rh | head -10

# Tìm tập tin lớn (>100MB)
find / -type f -size +100M 2>/dev/null | head -20

# Dọn sạch dung lượng chiếm dụng thông dụng
# Dọn sạch nhật ký cũ
sudo journalctl --vacuum-size=500M
# Dọn sạch các hình ảnh Docker không sử dụng
docker system prune -a
```

::: tip Quy tắc kiểm tra trực tuyến
**"Xem nhật ký trước, kiểm tra tiến trình thứ hai, kiểm tra mạng thứ ba, kiểm tra đĩa thứ tư"**. 90% vấn đề trực tuyến đều có thể được xác định bằng bốn bước này. Sau khi hình thành thói quen, hiệu suất kiểm tra sẽ cải thiện đáng kể.
:::

---

## Tóm tắt

Linux là một kỹ năng bắt buộc của lập trình viên, nắm vững cơ bản có thể ứng phó với hầu hết các tình huống phát triển và vận hành hàng ngày.

Ôn lại các điểm chính của chương:

1. **Mọi thứ đều là tập tin**: Linux dùng tập tin để trừu tượng hóa một cách thống nhất cách truy cập các tài nguyên như phần cứng, tiến trình, mạng
2. **Kết hợp lệnh**: Lệnh riêng lẻ có chức năng đơn giản, chỉ khi kết hợp thông qua đường ống `|` mới phát huy ra sức mạnh thực sự
3. **Mô hình quyền hạn**: Owner/Group/Others × Đọc/Viết/Thực thi, dùng số (ví dụ: 755) để đặt nhanh chóng
4. **Cơ bản Shell**: Đường ống, chuyển hướng, biến môi trường, kịch bản là nền tảng của tự động hóa
5. **Kiểm tra thực tế**: Nhật ký → Tiến trình → Mạng → Đĩa, bốn bước để xác định hầu hết các vấn đề trực tuyến

## Đọc thêm

- [Linux Command Reference](https://man7.org/linux/man-pages/) - Tài liệu man pages chính thức của Linux
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) - Sách bắt đầu học dòng lệnh Linux miễn phí
- [Linux Journey](https://linuxjourney.com/) - Trang web học Linux tương tác
- [explainshell.com](https://explainshell.com/) - Nhập lệnh để tự động giải thích ý nghĩa của mỗi tham số
