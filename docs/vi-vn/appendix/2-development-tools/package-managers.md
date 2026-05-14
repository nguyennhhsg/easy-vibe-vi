# Trình quản lý gói

> 💡 **Hướng dẫn học tập**: Viết code không cần tự tạo bánh xe từ đầu — 99% chức năng đã có người viết sẵn và công bố trên internet. **Trình quản lý gói** chính là công cụ giúp bạn tìm, tải và quản lý những "linh kiện có sẵn" này. Chương này xoay quanh một câu hỏi cốt lõi: **Làm thế nào để làm cho phụ thuộc code có thể tái sinh, hợp tác, và bảo trì được?**

---

## 0. Tại sao bạn chắc chắn sẽ sử dụng trình quản lý gói?

Tưởng tượng bạn cần viết một chương trình Node.js có khả năng gửi yêu cầu HTTP. Có hai cách:

- **Cách A (Thủ công)**: Tự mình thực hiện kết nối TCP, phân tích giao thức HTTP, xử lý chuyển hướng, cơ chế timeout……estimat phải viết vài nghìn dòng code, debug vài tháng.
- **Cách B (Trình quản lý gói)**: `npm install axios`, mười giây, một dòng code giải quyết.

Trình quản lý gói về bản chất là **"cửa hàng ứng dụng" cho code**. Nó giúp bạn:

1. Tìm thấy những thư viện do người khác công bố trong kho lưu trữ trung tâm (Registry)
2. Tự động tải xuống và cài đặt vào dự án của bạn
3. Xử lý các thư viện khác mà thư viện này phụ thuộc vào (phụ thuộc của phụ thuộc)
4. Ghi lại phiên bản chính xác mà bạn đang sử dụng, để hợp tác nhóm không gặp vấn đề

---

## 1. Tổng quan trình quản lý gói trong các hệ sinh thái ngôn ngữ / hệ thống

Các ngôn ngữ lập trình và hệ điều hành khác nhau có chuỗi công cụ sinh thái riêng, nhưng logic cơ bản hoàn toàn giống nhau.

👇 **Thử động tay**: Chọn hệ sinh thái bạn quen thuộc, khám phá các công cụ quản lý gói chính của nó.

<PackageManagerOverviewDemo />

### 1.1 Gói được tải từ đâu? —— Registry (Bảng đăng ký)

Đằng sau mỗi hệ sinh thái đều có một kho lưu trữ trung tâm, chứa tất cả các gói có thể tải:

| Hệ sinh thái | Bảng đăng ký | Số lượng gói |
| :--- | :--- | :--- |
| JavaScript | [npmjs.com](https://npmjs.com) | 2 triệu+ |
| Python | [pypi.org](https://pypi.org) | 500 nghìn+ |
| Rust | [crates.io](https://crates.io) | 150 nghìn+ |
| Go | [pkg.go.dev](https://pkg.go.dev) | 500 nghìn+ |
| Công cụ macOS/Linux | [formulae.brew.sh](https://formulae.brew.sh) | 7000+ |
| Phần mềm Windows | [winget.run](https://winget.run) / [chocolatey.org](https://chocolatey.org) | Hàng chục nghìn |

### 1.2 Ba nhân tố JavaScript: npm vs yarn vs pnpm

Chức năng tương tự, sự khác biệt chủ yếu nằm ở **tốc độ và dung lượng đĩa**:

```text
Dung lượng đĩa: pnpm (liên kết cứng chia sẻ) < yarn PnP (không node_modules) < npm (sao chép toàn bộ)
Tốc độ cài đặt: pnpm ≈ yarn > npm
Thói quen sử dụng: npm (phổ biến nhất) > pnpm (khuyến nghị dự án mới) > yarn (một số nhóm)
```

**Khuyến nghị**: Dự án mới dùng `pnpm`, dự án đã có giữ nguyên công cụ hiện tại, không nên chuyển đổi tùy tiện.

### 1.3 Ba nhân tố Windows: winget vs Chocolatey vs Scoop

| | winget | Chocolatey | Scoop |
| :--- | :--- | :--- | :--- |
| **Sự hỗ trợ chính thức** | Microsoft chính thức | Bên thứ ba | Bên thứ ba |
| **Cần quyền admin** | Một phần | Có | **Không cần** |
| **Tình huống phù hợp** | Cài đặt phần mềm thường ngày | Triển khai hàng loạt doanh nghiệp | Quản lý công cụ phát triển |
| **Số lượng gói** | Nhiều và tăng nhanh | Nhiều nhất (10000+) | Tập trung vào công cụ phát triển |

**Khuyến nghị**: Dùng `winget` hàng ngày, `scoop` cho công cụ phát triển, `Chocolatey` cho tự động hóa doanh nghiệp.

---

## 2. Cài đặt gói —— Chuyện gì xảy ra phía sau?

Sau khi nhập `npm install axios`, dòng lệnh yên tĩnh vài giây, rồi xong. Vài giây đó xảy ra điều gì?

👇 **Thử động tay**: Chọn một gói, nhấp "Chạy", quan sát toàn bộ quá trình cài đặt.

<PackageInstallDemo />

### 2.1 Giải thích bốn giai đoạn

**① Phân giải phụ thuộc (Resolve)**

Trình quản lý gói trước tiên "hiểu" bạn muốn cài đặt cái gì. Lấy `axios` làm ví dụ, nó tự nó phụ thuộc vào `follow-redirects`, `form-data` và các gói khác, tất cả đều cần cài đặt. Quá trình này được gọi là **xây dựng cây phụ thuộc**.

**② Tải xuống (Fetch)**

Tải tất cả các gói cần thiết từ Registry (định dạng nén `.tgz`). Trình quản lý gói thông minh sẽ:
- Tải song song nhiều gói thay vì đợi từng cái một
- Kiểm tra bộ nhớ cache cục bộ trước, nếu trúng sẽ không qua mạng

**③ Liên kết (Link)**

Giải nén các gói đã tải và đặt vào thư mục `node_modules/`, đồng thời xử lý tốt quan hệ tham chiếu.

**④ Ghi tệp khóa (Lockfile)**

Ghi **số phiên bản chính xác** của lần cài đặt này vào `package-lock.json` (hoặc `yarn.lock` / `pnpm-lock.yaml`).

### 2.2 Tra cứu nhanh lệnh thường dùng nhất

```bash
# ── JavaScript (npm) ──────────────────────────────────
npm install              # Cài đặt tất cả phụ thuộc theo package.json
npm install axios        # Cài đặt gói mới (phụ thuộc sản xuất)
npm install -D jest      # Cài đặt phụ thuộc phát triển (chỉ sử dụng khi phát triển)
npm install -g tsx       # Cài đặt toàn cầu (có thể sử dụng từ bất kỳ thư mục nào)
npm uninstall axios      # Gỡ cài đặt gói
npm update               # Nâng cấp tất cả gói lên phiên bản mới tương thích
npm run build            # Chạy script trong package.json scripts
npx create-react-app .   # Chạy tạm thời mà không cài đặt vào dự án

# ── Python (pip) ──────────────────────────────────────
pip install requests           # Cài đặt gói
pip install requests==2.28.0   # Cài đặt phiên bản cụ thể
pip freeze > requirements.txt  # Xuất danh sách phụ thuộc hiện tại
pip install -r requirements.txt # Cài đặt theo danh sách

# ── Rust (cargo) ──────────────────────────────────────
cargo add serde    # Thêm phụ thuộc (sẽ tự động cập nhật Cargo.toml)
cargo build        # Xây dựng dự án
cargo test         # Chạy bài kiểm tra
cargo run          # Chạy dự án

# ── Go (go mod) ───────────────────────────────────────
go get github.com/gin-gonic/gin  # Thêm phụ thuộc
go mod tidy                      # Sắp xếp phụ thuộc (xóa thừa, bổ sung thiếu)
go build ./...                   # Xây dựng

# ── Windows (winget) ──────────────────────────────────
winget install Git.Git           # Cài đặt phần mềm
winget upgrade --all             # Cập nhật tất cả phần mềm đã cài
```

### 2.3 npm scripts là gì?

Có một trường `scripts` trong `package.json`, đây là **trình chạy tác vụ** tích hợp của npm:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

Cách chạy: `npm run dev`, `npm run build`. Lợi ích của cách này là:
- **Điểm vào thống nhất**: Các thành viên nhóm không cần nhớ các lệnh cụ thể của công cụ cơ bản
- **Cấu hình môi trường tự động**: Khi chạy, sẽ tự động thêm `node_modules/.bin` vào PATH, có thể sử dụng trực tiếp công cụ được cài đặt cục bộ

---

## 3. Cài đặt toàn cầu vs cài đặt cục bộ

Đây là một trong những khái niệm dễ gây nhầm lẫn nhất cho người mới bắt đầu.

### 3.1 Sự khác biệt giữa hai cách

```bash
npm install axios        # Cài đặt cục bộ: cài vào ./node_modules/, chỉ dự án hiện tại có thể dùng
npm install -g typescript  # Cài đặt toàn cầu: cài vào thư mục hệ thống, bất kỳ dự án/thư mục nào cũng có thể dùng
```

| | Cài đặt cục bộ | Cài đặt toàn cầu |
| :--- | :--- | :--- |
| **Vị trí lưu trữ** | `./node_modules/` | Thư mục cấp hệ thống (ví dụ: `/usr/local/lib/`) |
| **Phù hợp với** | Thư viện phụ thuộc dự án (axios, vue, react) | Công cụ dòng lệnh (tsc, eslint, create-react-app) |
| **Cách ly phiên bản** | Mỗi dự án phiên bản độc lập ✅ | Toàn bộ máy dùng chung một phiên bản ⚠️ |
| **Tính nhất quán nhóm** | Tệp khóa đảm bảo nhất quán ✅ | Phiên bản của mỗi người có thể khác nhau ⚠️ |

### 3.2 Quy tắc vàng

> **Thư viện (axios, lodash, vue) luôn cài đặt cục bộ;  
> Công cụ dòng lệnh (tsc, eslint) ưu tiên cài đặt cục bộ, gọi bằng `npx`.**

**Tại sao công cụ dòng lệnh cũng nên cài đặt cục bộ?**

Giả sử bạn cài đặt toàn cầu `eslint@8`, nhưng dự án A cần `eslint@9` theo quy tắc mới, bạn sẽ phải chuyển đổi liên tục giữa toàn cầu và dự án. Cài đặt `eslint` cục bộ, gọi bằng `npx eslint .`, mỗi dự án có thể cấu hình độc lập phiên bản của riêng mình.

### 3.3 npx —— Chạy tạm thời mà không ô nhiễm môi trường

`npx` là trình chạy công cụ tích hợp của npm, cho phép bạn **chạy trực tiếp mà không cài đặt** một gói:

```bash
# Không cài đặt create-vue, chạy trực tiếp nó để khởi tạo dự án
npx create-vue my-project

# Không cài đặt prettier, định dạng trực tiếp file
npx prettier --write src/

# Bắt buộc sử dụng phiên bản cụ thể (bỏ qua những gì đã cài)
npx typescript@5.4 tsc --version
```

`uvx` của Python, `cargo run` của Rust cũng cung cấp khả năng "chạy tạm thời" tương tự:

```bash
uvx ruff check .       # Python: chạy tạm thời trình kiểm tra ruff
cargo install ripgrep  # Rust: cài đặt toàn cầu, thành lệnh hệ thống rg
```

---

## 4. Bí mật của số phiên bản —— Phiên bản ngữ nghĩa hóa

Bạn sẽ thấy nội dung như thế này trong `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.8",
    "typescript": "~5.4.0"
  }
}
```

Ký hiệu `^` và `~` ở đây có ý nghĩa gì?

👇 **Thử động tay**: Di chuột qua các phần số phiên bản, hiểu ý nghĩa; nhấp vào ký hiệu phạm vi, xem phiên bản nào sẽ được chấp nhận.

<DependencyTreeDemo />

### 4.1 Tại sao không khóa cứng phiên bản?

| Cách làm | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- |
| `"axios": "1.6.8"` (khóa chính xác) | Hoàn toàn có thể dự đoán | Không thể tự động cập nhật bản sửa lỗi bảo mật |
| `"axios": "^1.6.8"` (phạm vi tương thích, khuyến nghị) | Tự động nhận được sửa lỗi và tính năng mới | Rất hiếm có thể gây ra không tương thích nhỏ |
| `"axios": "*"` (bất kỳ phiên bản nào) | Luôn là mới nhất | Nâng cấp phiên bản chính sẽ phá vỡ code hoàn toàn |

**Thực hành tốt nhất**: Sử dụng `^` để khai báo phạm vi + tệp khóa để cố định phiên bản thực tế, cách kết hợp này.

### 4.2 Địa ngục phụ thuộc là gì?

Khi bạn phụ thuộc 50 gói, mỗi gói lại phụ thuộc vào vài gói khác, "cây phụ thuộc" có thể có vài trăm nút. Nếu hai gói mà bạn phụ thuộc cần **các phiên bản không tương thích của cùng một thư viện**, sẽ xảy ra "xung đột phụ thuộc".

Giải pháp của các hệ sinh thái:
- **npm v3+**: Nâng cao cùng phiên bản chính lên tầng cao nhất để chia sẻ, các phiên bản chính khác nhau mỗi cái cài riêng
- **pnpm**: Liên kết cứng + cách ly nghiêm ngặt, từ gốc ngăn chặn "phụ thuộc ma" (gói không được khai báo nhưng có thể sử dụng)
- **cargo (Rust)**: Ở cấp độ ngôn ngữ, bắt buộc mỗi gói chỉ phụ thuộc vào một phiên bản, hoàn toàn tránh xung đột
- **go mod (Go)**: Chiến lược chọn phiên bản tối thiểu (MVS), chọn phiên bản thấp nhất có thể thỏa mãn tất cả ràng buộc

---

## 5. Tệp khóa —— Nền tảng hợp tác nhóm

### 5.1 Tại sao cần tệp khóa?

Giả sử `package.json` viết `"axios": "^1.6.0"`:

- Bạn hôm nay cài đặt → cài `1.6.8`
- Đồng nghiệp ngày mai cài đặt → có thể cài `1.7.0` (vừa phát hành tối qua)
- Máy chủ CI tuần tới → có thể cài `1.7.1`

Cùng một code, ba người chạy kết quả khác nhau. **Tệp khóa** ghi lại số phiên bản chính xác của mỗi gói, mọi người cài theo nó, kết quả hoàn toàn nhất quán.

| Tình huống | Lệnh | Hành động |
| :--- | :--- | :--- |
| Đồng bộ môi trường phát triển | `npm install` | Tham chiếu tệp khóa để cài, không nâng cấp phiên bản |
| CI / triển khai sản xuất | `npm ci` | Cài **nghiêm ngặt** theo tệp khóa, có khác biệt sẽ báo lỗi |
| Chủ động nâng cấp phiên bản | `npm update` | Nâng cấp trong phạm vi cho phép, cập nhật tệp khóa |

### 5.2 Tệp khóa có nên commit vào Git không?

**Ứng dụng phải commit, thư viện công bố lên npm có thể không.**

- ✅ **Web application, dịch vụ backend**: Phải commit, đảm bảo môi trường triển khai và môi trường phát triển hoàn toàn nhất quán
- ❌ **Thư viện được công bố lên npm**: Thường không commit, người sử dụng thư viện có tệp khóa riêng
- ✅ **Dự án Python**: `requirements.txt` tự nó đóng vai trò tệp khóa, nên commit
- ✅ **Dự án Go**: `go.sum` phải commit, dùng để kiểm tra tính toàn vẹn

---

## 6. Môi trường ảo Python

Python có một khái niệm đặc biệt cần chú ý: **môi trường ảo (venv)**.

**Tại sao cần?**

Python theo mặc định **cài đặt toàn cầu** gói. Dự án A của bạn cần `requests==2.28`, dự án B cần `requests==2.31`, hai cái sẽ xung đột với nhau.

**Giải pháp**: Tạo môi trường ảo độc lập cho mỗi dự án, không can nhiễu lẫn nhau.

```bash
# 1. Tạo môi trường ảo (chạy ở thư mục gốc dự án)
python -m venv .venv

# 2. Kích hoạt môi trường ảo
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows (Dòng lệnh CMD)
.venv\Scripts\Activate.ps1       # Windows (PowerShell)

# 3. Sau khi kích hoạt, pip install chỉ ảnh hưởng đến môi trường ảo hiện tại, không ô nhiễm toàn cầu
pip install requests

# 4. Thoát khỏi môi trường ảo
deactivate
```

> ⚠️ **Vấn đề thường gặp trên Windows**: PowerShell theo mặc định cấm chạy script, cần thực hiện trước:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**Phương án thay thế hiện đại**:
- `conda create -n myproject python=3.11` —— quản lý luôn cả phiên bản Python
- `uv venv && source .venv/bin/activate` —— viết bằng Rust, tốc độ tạo siêu nhanh

**`.venv` có nên commit vào Git không?**

Không! `.venv` được tạo ra trên máy này, nên thêm vào `.gitignore`. Dùng `requirements.txt` hoặc `pyproject.toml` để mô tả phụ thuộc.

---

## 7. Tra cứu nhanh các câu hỏi thường gặp

**Q: `node_modules` có nên commit vào Git không?**

Không! Thường có vài trăm MB, nên thêm vào `.gitignore`. Có `package-lock.json`, bất cứ ai cũng có thể `npm install` nhanh chóng xây dựng lại.

**Q: Cài đặt thất bại / báo lỗi lạ lùng sao?**

```bash
# Xóa cache, xóa cài cũ, cài lại
npm cache clean --force
rm -rf node_modules package-lock.json   # macOS/Linux
rmdir /s /q node_modules && del package-lock.json  # Windows CMD
npm install
```

**Q: Tốc độ cài đặt quá chậm?**

```bash
# Chuyển sang mirror nội địa (khuyến nghị ghi vào tệp .npmrc, không ô nhiễm toàn cầu)
echo "registry=https://registry.npmmirror.com" > .npmrc

# pip cũng có thể cấu hình mirror
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**Q: Gói có lỗ hổng bảo mật sao?**

```bash
npm audit          # Quét lỗ hổng đã biết
npm audit fix      # Tự động sửa lỗ hổng tương thích
npm audit fix --force  # Bắt buộc nâng cấp (có thể phá vỡ, cẩn thận)
```

**Q: Làm sao biết một gói có đáng tin cậy không?**

Xem tại [npmjs.com](https://npmjs.com) hoặc [bundlephobia.com](https://bundlephobia.com):
- Số lượng tải xuống hàng tuần (càng cao càng đáng tin)
- Thời gian cập nhật lần cuối (không cập nhật quá 2 năm phải cẩn thận)
- Số lượng phụ thuộc (càng nhiều phụ thuộc, khả năng gặp vấn đề càng lớn)
- GitHub Stars và hoạt động Issues

**Q: Trên Windows, phần mềm cài bằng winget ở đâu?**

winget theo mặc định cài vào thư mục hệ thống (cần quyền admin) hoặc `%LOCALAPPDATA%\Microsoft\WindowsApps`. Phần mềm cài bằng Scoop được hợp nhất ở `%USERPROFILE%\scoop\apps\`, dễ quản lý và di chuyển.

---

## 8. Bảng tương ứng thuật ngữ

| Thuật ngữ tiếng Anh | Tương ứng tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **Package** | Gói / Thư viện | Mô-đun code do người khác viết và công bố |
| **Registry** | Bảng đăng ký / Kho lưu trữ | Máy chủ lưu trữ trung tâm của tất cả gói (ví dụ: npmjs.com) |
| **Dependency** | Phụ thuộc | Các gói khác mà dự án của bạn cần để chạy |
| **devDependency** | Phụ thuộc phát triển | Gói chỉ cần trong giai đoạn phát triển (framework kiểm tra, công cụ xây dựng, v.v.) |
| **Lockfile** | Tệp khóa | Ghi lại số phiên bản chính xác, đảm bảo tính nhất quán môi trường |
| **SemVer** | Phiên bản ngữ nghĩa hóa | Quy chuẩn đặt tên phiên bản MAJOR.MINOR.PATCH |
| **node_modules** | Thư mục mô-đun | Thư mục nơi gói được npm cài đặt |
| **venv** | Môi trường ảo | Hộp cách ly gói độc lập cho dự án Python |
| **tarball** | Gói nén | Định dạng phân phối gói, thường là file `.tgz` |
| **Hoisting** | Nâng cao | npm nâng cao phụ thuộc phụ lên tầng cao nhất để tránh cài đặt trùng lặp |
| **Phantom Dependency** | Phụ thuộc ma | Gói có thể sử dụng nhưng không được khai báo trong tệp cấu hình (pnpm có thể ngăn chặn) |
| **npx** | — | Trình chạy gói tích hợp npm, chạy tạm thời gói mà không cần cài |
| **go.sum** | — | Tệp kiểm tra hash của mô-đun Go, ngăn chặn phụ thuộc bị giả mạo |
| **Crate** | — | Đơn vị "gói" trong hệ sinh thái Rust |
| **winget** | — | Trình quản lý gói chính thức Windows (tích hợp sẵn trong Windows 10/11) |

---

## Tóm tắt: Bản chất của trình quản lý gói

Bốn câu để nhớ lõi:

1. **Trình quản lý gói = Cửa hàng ứng dụng**: Giúp bạn tìm, cài đặt, quản lý linh kiện code, không cần tự tạo bánh xe.
2. **Tệp khóa = Hợp đồng nhóm**: Cố định phiên bản chính xác, làm cho "chạy tốt trên máy tôi" trở thành quá khứ.
3. **Phiên bản ngữ nghĩa hóa = Ngôn ngữ giao tiếp**: `^` an toàn lấy cập nhật, khi MAJOR thay đổi phải cẩn thận.
4. **Cục bộ > Toàn cầu**: Phụ thuộc dự án cố gắng cài cục bộ, `npx` / `uvx` chạy tạm thời công cụ, giữ môi trường sạch sẽ.
