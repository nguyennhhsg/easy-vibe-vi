# Git: Máy thời gian của mã

> 💡 **Hướng dẫn học tập**: Chương này được viết riêng cho những người chưa từng dùng Git. Chúng ta sẽ không bắt bạn học thuộc các lệnh, mà sẽ giải thích rõ "Git đang giúp bạn giải quyết vấn đề gì", rồi từng bước một nối các lệnh và khái niệm lại với nhau. Sau khi đọc xong, bạn sẽ có thể tự hoàn thành: commit cục bộ, tạo branch, push lên GitHub.

---

## 0. Trước tiên, hãy tự hỏi: Bạn có từng trải qua những cơn ác mộng này không?

**Tình huống một: Địa ngục phiên bản**

Bạn viết bài luận hoặc viết mã, sửa được nửa chừng thì phát hiện sửa sai rồi, muốn quay lại phiên bản của ba ngày trước——nhưng bạn không tìm thấy.

```
project_v1.zip
project_v2_modified_version.zip
project_v3_final_version.zip
project_v3_final_version_really_final.zip
project_v3_final_version_never_change_again.zip
```

Mỗi lần lưu một bản sao mới, ổ cứng ngày càng lộn xộn, mà bạn lại hoàn toàn không nhớ phiên bản nào sửa cái gì.

**Tình huống hai: Cơn ác mộng hợp tác**

Bạn và đồng nghiệp cùng sửa một tệp:
- Bạn sửa dòng 10, thêm tính năng đăng nhập
- Đồng nghiệp cũng sửa dòng 10, sửa một Bug
- Các bạn gửi mã cho nhau qua email, kết quả khi gộp thì sửa của một người bị ghi đè bởi người kia
- Không ai biết dòng mã cuối cùng nào là đúng

**Tình huống ba: Không có "cơ hội sửa sai"**

Bạn deploy mã mới lên production, kết quả bị lỗi rồi, muốn quay lại ngay phiên bản ổn định trước đó——nhưng bạn không biết phải sửa cách nào, chỉ biết tìm backup và lúng túng.

---

**Git chính là ra đời để giải quyết ba vấn đề này.**

Git là một **hệ thống quản lý phiên bản** (Version Control System). Bản chất của nó là: **ghi lại mỗi lần bạn "lưu trữ" một cách đầy đủ, hình thành một dòng thời gian lịch sử hoàn chỉnh, để bạn có thể quay lại bất cứ thời điểm nào trong lịch sử.**

Không phóng đại, Git là một trong những công cụ quan trọng nhất trong phát triển phần mềm hiện đại. Hầu như tất cả các công ty, tất cả các dự án mã nguồn mở đều sử dụng nó.

---

## 1. Git và GitHub có phải một chuyện không?

Nhiều người mới bắt đầu dễ nhầm lẫn hai khái niệm này, hãy làm rõ:

| | Git | GitHub |
| :--- | :--- | :--- |
| **Là gì** | Một công cụ quản lý phiên bản chạy trên máy tính của bạn | Một trang web lưu trữ repository Git (trên đám mây) |
| **Ở đâu** | Máy tính cục bộ của bạn | Trên Internet |
| **Có thể dùng độc lập không** | ✅ Được, chỉ quản lý lịch sử cục bộ | ❌ Cần sử dụng kèm Git |
| **So sánh** | Cuốn nhật ký cục bộ của bạn | Đám mây lưu nhật ký |

Nói đơn giản: **Git là công cụ, GitHub là dịch vụ lưu trữ.** Giống như Word là công cụ, OneDrive là đám mây, hai cái hoạt động cùng nhau, nhưng không phải một thứ.

Ngoài GitHub, còn có các dịch vụ tương tự như GitLab, Gitee (trong nước).

---

## 2. Khái niệm cốt lõi: ba vùng

Đây là thiết kế quan trọng nhất của Git, hiểu được ba vùng này, bạn sẽ hiểu được linh hồn của Git.

Git chia trạng thái tệp của bạn thành ba lớp:

**Thư mục làm việc (Working Directory)**
Đó là **thư mục tệp bình thường** của bạn, tất cả tệp bạn đang nhìn thấy và chỉnh sửa đều ở đây. Bạn sửa thoải mái, Git sẽ cảm nhận bạn sửa cái gì, nhưng sẽ không ghi lại bất cứ điều gì.

**Vùng chuẩn bị (Staging Area / Index)**
Đây là một **"trạm trung chuyển chuẩn bị commit"**. Bạn có thể "đưa" các tệp từ thư mục làm việc vào vùng chuẩn bị, giống như đưa bưu kiện vào hộp bưu kiện——chưa gửi đi, nhưng đã chọn cái gì để gửi.

**Kho lưu trữ (Repository)**
Đây là **kho lưu trữ hồ sơ lịch sử vĩnh viễn**, ẩn giấu trong thư mục `.git`. Mỗi lần bạn thực thi `git commit`, nội dung trong vùng chuẩn bị sẽ bị niêm phong trong kho lưu trữ, hình thành một bản ghi lịch sử không thể thay đổi.

👇 **Nhấp vào thử xem**: Nhấp lần lượt vào các nút lệnh, quan sát tệp chuyển động giữa ba vùng.

<GitCommitFlow />

### Tại sao phải "hai bước" (add + commit)?

Nhiều người mới bắt đầu sẽ hỏi: Tại sao không thể lưu trực tiếp một bước, mà phải add trước rồi commit?

**Vì trong phát triển thực tế, bạn thường không muốn commit tất cả các sửa đổi cùng lúc.**

Ví dụ: Hôm nay bạn sửa 5 tệp:
- `login.js`: Hoàn thành tính năng đăng nhập (muốn commit)
- `style.css`: Điều chỉnh kiểu dáng trang đăng nhập (muốn commit)
- `debug.log`: Đầu ra gỡ lỗi tạm thời (**không muốn** commit)
- `experiment.js`: Tính năng mới đang thử nghiệm, chưa hoàn thành (**không muốn** commit)
- `todo.txt`: Ghi chú cá nhân của bạn (**không muốn** commit)

Nếu không có vùng chuẩn bị, bạn hoặc phải commit cả 5 tệp (lịch sử commit rất lộn xộn), hoặc không commit cái nào. 

Với vùng chuẩn bị, bạn có thể kiểm soát chính xác: `git add login.js style.css`, chỉ đưa hai tệp này vào hộp bưu kiện, rồi `commit`, commit này sẽ ghi lại rõ ràng "tính năng đăng nhập hoàn thành".

---

## 3. Lần đầu dùng Git: Khởi tạo và quy trình làm việc cơ bản

### 3.1 Cài đặt và khởi tạo

Sau khi cài Git (macOS tích hợp sẵn, Windows tải từ git-scm.com), mở terminal, vào thư mục dự án của bạn:

```bash
# Khởi tạo một repository Git trong thư mục hiện tại
git init

# Git sẽ tạo một thư mục ẩn .git, tất cả hồ sơ lịch sử nằm trong đó
# Kết quả: Initialized empty Git repository in .../your-project/.git/
```

Lần đầu dùng bạn cần bảo Git bạn là ai (thông tin này sẽ đính kèm vào mỗi bản ghi commit):

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@của_bạn"
```

### 3.2 Quy trình làm việc hàng ngày: Ba bước lưu trữ

Sau khi khởi tạo, 90% thao tác phát triển hàng ngày là lặp lại ba bước này:

**Bước một: Kiểm tra trạng thái**

```bash
git status
```

Đây là lệnh bạn dùng nhiều nhất. Nó cho bạn biết:
- Bạn đang ở branch nào
- Tệp nào đã bị sửa (màu đỏ = chưa stage)
- Tệp nào đã trong vùng chuẩn bị (màu xanh = đã stage, chờ commit)

**Bước hai: Đưa tệp vào vùng chuẩn bị**

```bash
# Thêm một tệp
git add login.js

# Thêm nhiều tệp
git add login.js style.css

# Thêm tất cả tệp đã sửa trong thư mục hiện tại (dùng . để chỉ "tất cả")
git add .
```

> ⚠️ Sai lầm thường gặp ở người mới: `git add .` rất tiện, nhưng sẽ thêm tất cả sửa đổi, kể cả tệp tạm thời bạn không muốn commit. Hãy tập thói quen add chính xác, hoặc dùng `.gitignore` để loại trừ tệp không muốn theo dõi (sẽ nói sau).

**Bước ba: Commit, viết lời giải thích**

```bash
git commit -m "feat: Thêm tính năng đăng nhập người dùng"
```

Nội dung trong dấu ngoặc kép sau `-m` được gọi là **commit message** (lời giải thích commit). Đây là cách viết cho bản thân trong tương lai và đồng nghiệp, phải viết sao cho có ý nghĩa.

### 3.3 Cách viết Commit Message chuyên nghiệp?

```bash
# ❌ Cách viết không tốt——nhìn không biết làm gì
git commit -m "update"
git commit -m "fix"
git commit -m "sửa một vài thứ"

# ✅ Cách viết tốt: loại + dấu hai chấm + một dòng mô tả
git commit -m "feat: Thêm tính năng đăng nhập người dùng"
git commit -m "fix: Sửa lỗi màn hình trắng trên iOS Safari"
git commit -m "docs: Cập nhật hướng dẫn deploy trong README"
git commit -m "refactor: Tách UserService thành mô-đun độc lập"
git commit -m "style: Thống nhất thụt lề mã thành 2 khoảng cách"
```

**Ý nghĩa các tiền tố thường dùng:**

| Tiền tố | Ý nghĩa |
| :--- | :--- |
| `feat:` | Tính năng mới (feature) |
| `fix:` | Sửa Bug |
| `docs:` | Thay đổi tài liệu |
| `style:` | Điều chỉnh định dạng mã (không ảnh hưởng tính năng) |
| `refactor:` | Tái cấu trúc mã (tính năng không đổi, cấu trúc tối ưu) |
| `chore:` | Liên quan đến xây dựng, công cụ, phụ thuộc |
| `test:` | Liên quan đến kiểm thử |

Tập thói quen này, vài tháng sau khi nhìn lại lịch sử, bạn sẽ biết ngay mỗi commit làm cái gì. Điều này đặc biệt quan trọng trong hợp tác nhóm.

### 3.4 Xem lịch sử commit

```bash
# Định dạng chi tiết (thông tin đầy đủ của mỗi commit)
git log

# Định dạng ngắn gọn (mỗi dòng một commit, khuyên dùng hàng ngày)
git log --oneline

# Ví dụ kết quả:
# a1b2c3d (HEAD -> main) feat: Thêm tính năng đăng nhập người dùng
# 9f3e1b2 init: Khởi tạo dự án
```

---

## 4. Vũ trụ song song: Branch (Nhánh)

**Branch** là tính năng mạnh mẽ nhất, cũng là cái làm người mới bối rối nhất của Git. Nhưng khi hiểu được, bạn sẽ thấy thiết kế này rất trang nhã.

### 4.1 Branch là gì? Dùng "vũ trụ song song" để hiểu

Hãy tưởng tượng bạn đang chơi một trò chơi nhập vai, trong trò chơi có một lựa chọn chủ yếu:
- Lựa chọn A: Thách đấu Boss lớn (phát triển tính năng mới)
- Lựa chọn B: Tiếp tục ổn định tình hình hiện tại (mainline không động)

Nếu bạn thực hiện trực tiếp lựa chọn A trên file lưu chính, nếu thua, tiến độ toàn bộ trò chơi sẽ bị hỏng.

Nhưng nếu bạn **sao chép một file lưu**, thách đấu Boss trên bản sao:
- Thắng rồi? Gộp thành tích của bản sao vào file lưu chính
- Thua rồi? File lưu chính hoàn toàn không bị ảnh hưởng, xóa bản sao rồi chơi lại

**Git branch chính là cơ chế "file lưu sao lưu" này.**

Trong Git, branch `main` (hoặc `master`) là "file lưu chính" của bạn, luôn giữ ổn định có thể dùng. Khi bạn phát triển tính năng mới, bạn tạo một nhánh mới từ main, phát triển ở đó, kiểm thử, hoàn thành rồi gộp lại main.

### 4.2 Trình diễn trực quan của branch

👇 **Nhấp vào thử xem**: Nhấp lần lượt vào các nút lệnh, quan sát biểu đồ branch bên dưới cách nhánh chia tách, kéo dài, cuối cùng gộp lại. Chú ý thay đổi vị trí của nhãn HEAD——nó luôn chỉ "bạn đang ở đâu".

<GitBranchVisual />

### 4.3 Giải thích chi tiết thao tác branch

**Tạo và chuyển sang nhánh mới:**

```bash
# Cách một: Tạo trước, rồi chuyển (hai bước)
git branch feature-login      # Tạo nhánh
git checkout feature-login    # Chuyển sang nó

# Cách hai: Một bước (khuyên dùng)
git checkout -b feature-login

# Kết quả: Switched to a new branch 'feature-login'
```

Sau khi tạo nhánh, dòng lời nhắc lệnh terminal sẽ hiển thị tên nhánh hiện tại, ví dụ:
```
user@mac ~/project (feature-login) $
```

**Xem tất cả nhánh:**

```bash
git branch

# Kết quả (* chỉ nhánh đang ở):
# * feature-login
#   main
```

**Phát triển bình thường trên nhánh:**

```bash
# Trên nhánh feature-login, sửa mã, add, commit, hoàn toàn giống bình thường
git add login.js
git commit -m "feat: Thêm cấu trúc HTML biểu mẫu đăng nhập"

git add login.js api.js
git commit -m "feat: Hoàn thành kết nối giao diện đăng nhập"
```

Những commit này chỉ có trên nhánh `feature-login`, nhánh `main` hoàn toàn không biết bạn làm gì.

**Quay lại nhánh chính, gộp:**

```bash
# Quay lại main
git checkout main

# Gộp tất cả sửa đổi từ feature-login vào
git merge feature-login

# Sau khi gộp, có thể xóa nhánh này (tùy chọn)
git branch -d feature-login
```

### 4.4 Khi nào nên tạo nhánh?

| Tình huống | Khuyên dùng | Lý do |
| :--- | :--- | :--- |
| Phát triển tính năng mới | ✅ Tạo nhánh | Tính năng hoàn thành trước không ảnh hưởng mainline, bất cứ lúc nào có thể từ bỏ |
| Sửa Bug khẩn cấp trên production | ✅ Tạo nhánh `hotfix-xxx` từ main | Sửa xong gộp trực tiếp lên production, không đưa tính năng chưa hoàn thành |
| Phát triển song song với đồng nghiệp | ✅ Mỗi người tạo nhánh riêng | Không xáo trộn nhau, hoàn thành rồi thống nhất gộp qua Pull Request |
| Chỉ sửa một lỗi chính tả | ❌ Sửa trực tiếp trên main | Rủi ro rất thấp, không cần nhánh riêng |

### 4.5 Chiến lược nhánh thường dùng trong nhóm

Trong dự án thực tế, nhóm thường sẽ quy định tên và mục đích của nhánh:

| Tên nhánh | Mục đích | Đặc điểm |
| :--- | :--- | :--- |
| `main` / `master` | Mã ổn định của môi trường production | Chỉ có mã được kiểm thử qua mới được vào, không thể push trực tiếp |
| `dev` / `develop` | Nhánh tích hợp hàng ngày | Tất cả nhánh tính năng gộp vào đây trước, kiểm thử qua rồi lên main |
| `feature/xxx` | Phát triển tính năng cụ thể | Ví dụ `feature/user-login`, hoàn thành rồi gộp vào dev |
| `hotfix/xxx` | Sửa khẩn cấp | Tạo từ main, sửa xong gộp trực tiếp vào main và dev |

---

## 5. Hợp tác với đồng nghiệp: Kho lưu trữ từ xa

Cho đến bây giờ, những gì bạn học đều là thao tác Git **cục bộ**——tất cả bản ghi lịch sử đều lưu trên máy tính của bạn. Để chia sẻ mã với đồng nghiệp, bạn cần một **kho lưu trữ từ xa**, tức là GitHub, GitLab này loại trang web lưu trữ trên đám mây.

### 5.1 Cách hoạt động của kho lưu trữ từ xa

Có thể hiểu kho lưu trữ từ xa là **"file lưu công cộng của nhóm"**:

- Mỗi người phát triển trên máy cục bộ, commit
- Sau khi viết xong `push` (upload) lên kho lưu trữ từ xa
- Đồng nghiệp `pull` (download) nội dung mới nhất của kho lưu trữ từ xa xuống máy cục bộ của mình
- Như vậy mã của mọi người sẽ luôn đồng bộ

👇 **Nhấp vào thử xem**: Nhấp lần lượt vào các nút lệnh, trải nghiệm quy trình hoàn chỉnh từ liên kết kho lưu trữ từ xa, push, cho đến pull cập nhật của đồng nghiệp.

<GitSyncDemo />

### 5.2 Lần đầu push dự án lên GitHub

**Bước một**: Tạo một repository mới trên GitHub (nhấp vào + ở góc phải, chọn New repository), không bạn hãy tích chọn tùy chọn khởi tạo.

**Bước hai**: Quay lại terminal cục bộ, liên kết kho lưu trữ từ xa:

```bash
# Liên kết repository cục bộ với repository trên GitHub
# "origin" là bí danh của kho lưu trữ từ xa, là tên quy ước (có thể thay đổi, nhưng không cần thiết)
git remote add origin https://github.com/username/repository.git

# Xác nhận liên kết thành công
git remote -v
# Kết quả:
# origin  https://github.com/username/repository.git (fetch)
# origin  https://github.com/username/repository.git (push)
```

**Bước ba**: Push nội dung cục bộ lên từ xa:

```bash
# Lần push đầu tiên, -u có nghĩa là "từ nay git push, hãy push mặc định vào nhánh main của origin"
git push -u origin main

# Từ nay mỗi lần push chỉ cần:
git push
```

### 5.3 Các lệnh hợp tác hàng ngày

**Push (bạn sửa rồi, muốn đồng nghiệp thấy):**
```bash
git push
```

**Pull (đồng nghiệp sửa rồi, bạn muốn cập nhật):**
```bash
git pull
```

`git pull` thực tế là hai lệnh hợp nhất:
1. `git fetch`: Trước tiên tải những commit mới nhất từ kho lưu trữ từ xa
2. `git merge`: Gộp nội dung đã tải vào nhánh hiện tại của bạn

**Lần đầu lấy dự án của người khác từ GitHub:**
```bash
# Sao chép toàn bộ kho lưu trữ từ xa vào cục bộ (chỉ cần làm một lần)
git clone https://github.com/someone/project.git

# clone sẽ tự động thiết lập liên kết với từ xa, sau này chỉ cần push/pull
```

### 5.4 Hướng của push và pull

```
Máy tính của bạn (cục bộ)  ←→  GitHub (từ xa)

git push:  cục bộ → từ xa   (bạn sửa rồi, upload cho đồng nghiệp)
git pull:  từ xa → cục bộ   (đồng nghiệp sửa rồi, download về)
git clone: từ xa → cục bộ   (lần đầu sao chép toàn bộ repository)
```

> **Cách làm tốt nhất**: Mỗi sáng bắt đầu làm việc, trước tiên `git pull` để lấy mã mới nhất; tối hay hoàn thành một tính năng, `git push` để sao lưu và để đồng nghiệp thấy tiến độ.

---

## 6. Nâng cao: Xử lý xung đột

Xung đột là không thể tránh trong hợp tác, nhưng cũng không đáng sợ đâu.

### 6.1 Xung đột xảy ra như thế nào?

Khi bạn và đồng nghiệp **cùng sửa cùng một tệp, cùng một dòng**, khi gộp Git không biết nên dùng phiên bản nào, sẽ xảy ra xung đột.

Ví dụ:
- Bạn viết dòng 5: `const timeout = 3000`
- Đồng nghiệp cùng dòng 5 viết: `const timeout = 5000`
- Khi bạn `git pull` hoặc `git merge`, Git phát hiện mâu thuẫn, sẽ "tạm dừng" và bảo bạn: tôi không biết nên dùng cái nào, bạn tự quyết định.

### 6.2 Tệp xung đột trông như thế nào?

Git sẽ chèn các ký hiệu đặc biệt vào chỗ xung đột:

```javascript
function login() {
  const url = '/api/login'

<<<<<<< HEAD
  const timeout = 3000   // Phiên bản của bạn
=======
  const timeout = 5000   // Phiên bản của đồng nghiệp
>>>>>>> feature/update-timeout

  return fetch(url, { timeout })
}
```

- Từ `<<<<<<< HEAD` đến `=======`: Nội dung của nhánh hiện tại của bạn
- Từ `=======` đến `>>>>>>> xxx`: Nội dung của phần gộp

### 6.3 Cách giải quyết xung đột?

**Bước một**: Mở tệp xung đột, tìm tất cả ký hiệu `<<<<<<<` (thường các trình soạn thảo như VS Code sẽ tô sáng tự động)

**Bước hai**: Quyết định giữ đoạn mã nào, rồi sửa tệp bằng tay, xóa tất cả ký hiệu (các dấu `<<<<<<<`, `=======`, `>>>>>>>` ).

Ví dụ, quyết định dùng 5000 (phiên bản của đồng nghiệp):
```javascript
function login() {
  const url = '/api/login'
  const timeout = 5000   // Chấp nhận sửa của đồng nghiệp
  return fetch(url, { timeout })
}
```

**Bước ba**: Commit lại

```bash
# Đánh dấu xung đột đã giải quyết
git add login.js

# Hoàn thành commit gộp (Git sẽ tự động tạo lời giải thích gộp)
git commit
```

### 6.4 Thói quen tốt để giảm xung đột

- **Pull thường xuyên**: Bắt đầu làm việc trước, cập nhật mã mới nhất, giảm tình trạng "bạn lạc hậu quá nhiều"
- **Commit từng bước nhỏ**: Không viết mã một tuần rồi commit một lần, mà commit thường xuyên từng bước nhỏ, dễ phát hiện và giải quyết xung đột
- **Tách nhánh**: Tính năng khác nhau dùng nhánh khác nhau, giảm cạnh tranh sửa cùng một dòng mã
- **Giao tiếp**: Trước khi sửa tệp công cộng (ví dụ `config.js`), hãy báo đồng nghiệp trước

---

## 7. Lệnh thường dùng - Bảng tra cứu nhanh

<GitCommandCheatsheet />

---

## 8. Thực hành: Quy trình hoàn chỉnh gia nhập dự án nhóm

Đây là quy trình tiêu chuẩn khi bạn gia nhập nhóm hoặc dự án mới, có thể sao chép trực tiếp:

```bash
# ① Ngày đầu: Clone dự án về máy cục bộ (chỉ làm một lần)
git clone https://github.com/team/project.git
cd project

# ② Mỗi sáng bắt đầu làm việc: Trước tiên pull mã mới nhất, đảm bảo bạn dùng mã mới nhất
git pull origin main

# ③ Tạo nhánh tính năng của riêng bạn (không sửa trực tiếp trên main)
git checkout -b feature/user-profile

# ④ Phát triển bình thường...viết mã...

# ⑤ Hoàn thành một tính năng nhỏ, lập tức commit (không tích lũy)
git add src/UserProfile.vue
git commit -m "feat: Hoàn thành tính năng upload ảnh đại diện"

git add src/UserProfile.vue src/api/user.js
git commit -m "feat: Hoàn thành giao diện chỉnh sửa thông tin người dùng"

# ⑥ Push nhánh của bạn lên từ xa, để đồng nghiệp thấy
git push origin feature/user-profile

# ⑦ Trên GitHub tạo Pull Request (PR), yêu cầu gộp vào main
# (Bước này thực hiện trên trang web GitHub)

# ⑧ Chờ đồng nghiệp Code Review, theo phản hồi sửa, tiếp tục commit + push

# ⑨ PR được gộp, quay lại main, cập nhật cục bộ, xóa nhánh tính năng
git checkout main
git pull
git branch -d feature/user-profile
```

---

## 9. .gitignore: Tệp nào không nên được theo dõi?

Có một số tệp bạn **không muốn** commit vào Git repository, ví dụ:
- `node_modules/`: Gói phụ thuộc, dung lượng rất lớn, có thể tái tạo bằng `npm install`
- `.env`: Tệp biến môi trường, bên trong có thể có mật khẩu cơ sở dữ liệu, API Key, **tuyệt đối không thể upload vào repository công cộng**
- `*.log`: Tệp nhật ký
- `.DS_Store`: Tệp ẩn tự động tạo bởi macOS
- `dist/`, `build/`: Sản phẩm biên dịch, có thể tái xây dựng

Tạo tệp `.gitignore` trong thư mục gốc dự án, viết các quy tắc tệp không muốn theo dõi:

```gitignore
# Gói phụ thuộc
node_modules/

# Biến môi trường (quan trọng! Không được commit mật khẩu)
.env
.env.local

# Sản phẩm xây dựng
dist/
build/

# Tệp hệ thống
.DS_Store
Thumbs.db

# Tệp nhật ký
*.log
```

GitHub có các mẫu .gitignore cho các ngôn ngữ và framework khác nhau: [github.com/github/gitignore](https://github.com/github/gitignore)

---

## Bảng tra cứu thuật ngữ

| Thuật ngữ | Tiếng Anh | Giải thích |
| :--- | :--- | :--- |
| **Kho lưu trữ** | Repository (Repo) | Cơ sở dữ liệu lưu tất cả lịch sử phiên bản của dự án, nằm trong thư mục `.git` |
| **Commit** | Commit | Một bản ghi phiên bản hoàn chỉnh, giống như điểm lưu trong game, kèm theo lời giải thích và dấu thời gian |
| **Nhánh** | Branch | Dòng phát triển độc lập, giống như dòng thời gian song song, không ảnh hưởng nhau |
| **Gộp** | Merge | Tích hợp sửa đổi của một nhánh vào nhánh khác |
| **Xung đột** | Conflict | Cùng một dòng mã bị sửa bởi nhiều người, Git không biết nên dùng cái nào, cần giải quyết bằng tay |
| **Chuẩn bị** | Stage / Index | Thao tác đưa sửa đổi vào danh sách "chuẩn bị commit" |
| **Từ xa** | Remote | Bản sao repository trên đám mây (GitHub / GitLab / Gitee) |
| **Sao chép** | Clone | Sao chép toàn bộ kho lưu trữ từ xa vào cục bộ |
| **Push** | Push | Upload commit cục bộ lên kho lưu trữ từ xa |
| **Pull** | Pull | Tải nội dung mới nhất từ từ xa và gộp vào cục bộ |
| **HEAD** | HEAD | Con trỏ chỉ vị trí nhánh/commit hiện tại, biểu thị "bạn đang ở đâu" |
| **Origin** | origin | Bí danh mặc định của kho lưu trữ từ xa (tên quy ước) |
| **Stash** | Stash | Lưu tạm thời sửa đổi chưa commit, dùng khi cần chuyển việc |
| **PR / MR** | Pull Request / Merge Request | Yêu cầu gộp nhánh của bạn vào nhánh chính, thường cần đồng nghiệp review |
