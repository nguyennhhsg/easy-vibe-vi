# Hướng dẫn Hoàn toàn về Claude Code Skills

## Giới thiệu về Skills

**Claude Code Skills** là một chức năng đóng gói kiến thức chuyên môn, quy trình làm việc và các thực hành tốt nhất thành "gói kỹ năng có thể tái sử dụng".

Hãy tưởng tượng, Skills giống như "sổ tay kỹ năng" được trang bị cho Claude — khi bạn cần nó hoàn thành một nhiệm vụ cụ thể, nó không cần bạn lặp lại yêu cầu nữa, mà chỉ cần thực thi công việc theo các tiêu chuẩn kỹ năng được xác định trước.

### Tại sao cần Skills?

Trước khi có Skills, việc sử dụng Claude Code gặp phải một số vấn đề:

- **Lặp lại hướng dẫn**: Mỗi lần phải giải thích "code cần tuân theo kiểu phong cách gì", "tin nhắn commit phải viết như thế nào"
- **Kiến thức không được tích lũy**: Kinh nghiệm sử dụng của các thành viên trong nhóm không thể chia sẻ
- **Tiêu chuẩn không thống nhất**: Những người khác nhau dùng Claude có thể có kết quả hoàn toàn khác nhau
- **Hiệu suất thấp**: Những nhiệm vụ phổ biến phải giải thích lại từ đầu mỗi lần

Skills giải quyết những vấn đề này, biến Claude thành một "thành viên trong nhóm có kinh nghiệm" — nó biết quy chuẩn dự án, quy trình làm việc và các thực hành tốt nhất của bạn.

---

## Tại sao phải học Skills ngay bây giờ?

**Skills đang trở thành kỹ năng bắt buộc của các kỹ sư AI**:

- **Sức nóng cộng đồng cao**: Các kho lưu trữ liên quan trên GitHub có sao tăng nhanh, ví dụ dự án OpenSkills đã thu về 7.2k sao, Obsidian Skills tăng vọt 6.6k sao trong 9 ngày
- **Hỗ trợ chính thức**: Anthropic duy trì kho Skills chính thức, Vercel công bố Agent Skills và công cụ find-skills
- **Tính thực tiễn mạnh**: Từ rà soát code, thao tác Git đến tạo video, tạo PPT, bao gồm nhiều kịch bản. Nền tảng skills.sh đã có hơn 60K đăng ký các kỹ năng hot
- **Cải thiện hiệu suất**: Cấu hình một lần, sử dụng lặp đi lặp lại, biến Claude thành "nhân viên kỹ thuật số" thực sự của bạn
- **Công nhân viên công nghệ thừa nhận**: Được khuyến nghị bởi nhiều cộng đồng công nghệ, được coi rộng rãi là công cụ chính để nâng cao hiệu suất lập trình AI

---

## Bắt đầu nhanh

Sau khi hiểu được giá trị của Skills, hãy thực hành ngay! Phần này sẽ hướng dẫn bạn cài đặt Skill đầu tiên và hoàn thành một số nhiệm vụ thực tế thú vị, nhanh chóng xây dựng sự hiểu biết trực quan.

### Bước 1: Cài đặt find-skills (Khuyên dùng cài đặt bắt buộc)

Trước khi bắt đầu sử dụng Skills, khuyến cáo mạnh mẽ hãy cài đặt `find-skills` — đây là "công cụ tìm kiếm kỹ năng thần kỳ" trong lĩnh vực AI Agent, hiện có 60K+ đăng ký.

**find-skills là gì?**

Nói đơn giản, find-skills giống như "trình tìm kiếm cửa hàng ứng dụng" cho AI Agent. Khi bạn cần hoàn thành một nhiệm vụ nhất định nhưng không có Skill tương ứng cần thiết ở máy cục bộ, nó sẽ tự động giúp bạn tìm kiếm và đề xuất Skill phù hợp nhất.

**Cài đặt find-skills**:

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

Sau khi cài đặt xong, bạn có thể trực tiếp nói với Claude nhu cầu của mình, nó sẽ tự động tìm kiếm các kỹ năng liên quan thông qua find-skills.

**Ví dụ sử dụng**:

```
Tôi cần tối ưu hóa hiệu suất một thành phần React, giúp tôi tìm xem có kỹ năng nào có thể dùng được không
```

Claude sẽ tìm kiếm thông qua find-skills, sau đó cho bạn biết đã tìm thấy những kỹ năng nào, bạn có thể chọn cài đặt.

**Tại sao khuyên cài đặt find-skills trước?**

Trước khi có find-skills:
- Tìm kiếm thủ công các kỹ năng liên quan trên GitHub
- Sao chép từng cái, cài đặt, cấu hình
- Gỡ lỗi lặp đi lặp lại

Sau khi có find-skills:
- Mô tả nhu cầu bằng một câu
- AI tự động tìm kiếm kỹ năng phù hợp nhất
- Cài đặt bằng một cú nhấp, sử dụng ngay

**Lưu ý cho người dùng Windows**: Phiên bản chính thức có hỗ trợ hạn chế cho Windows, cộng đồng đã tạo phiên bản Windows được điều chỉnh, hỗ trợ CMD và PowerShell, và thêm chức năng tìm kiếm tiếng Trung.

Tải xuống phiên bản Windows: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Bước cài đặt:
1. Tải xuống phiên bản Windows của SKILL.md
2. Thay thế các tệp trong thư mục `C:/Users/tên_người_dùng_của_bạn/.agents/skills/find-skills`
3. Khởi động lại Claude Code để áp dụng

**Liên kết liên quan**:
- [Trang chủ Skills](https://skills.sh/) - Duyệt tất cả các kỹ năng có sẵn
- [Kho lưu trữ find-skills](https://github.com/vercel-labs/agent-skills) - Mã nguồn chính thức

### Cài đặt và trải nghiệm Skill đầu tiên

Sau khi cài đặt find-skills, hãy sử dụng nó để tìm kiếm và cài đặt Skill đầu tiên thú vị — công cụ tạo video Remotion.

#### Bước 1: Sử dụng find-skills để tìm kiếm Remotion

Nhập vào Claude Code:

```
Giúp tôi tìm kỹ năng liên quan đến Remotion, tôi muốn làm video
```

Claude sẽ tìm kiếm thông qua find-skills, đề xuất `remotion-dev/skills`.

#### Bước 2: Cài đặt Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### Bước 3: Dùng nó để làm cái gì đó thú vị!

Remotion là một framework dùng code React để tạo video, sau khi cài đặt Skill này, bạn có thể dùng ngôn ngữ tự nhiên yêu cầu Claude viết code video cho bạn.

**Nhiệm vụ 1: Tạo video hoạt ảnh chữ lộng lẫy**

```
Dùng Remotion tạo một video:
- 1920x1080, 5 giây
- Một dòng chữ "Hello World" bay vào từ bên trái
- Cùng lúc có hiệu ứng xoay và phóng to
- Nền là màu gradient
```

Claude sẽ tạo ra mã Remotion hoàn chỉnh, bạn có thể chạy nó để xem hiệu ứng hoạt ảnh.

**Nhiệm vụ 2: Tạo video trực quan hóa dữ liệu**

```
Tạo một video 10 giây, thể hiện sự tăng trưởng dữ liệu:
- Ban đầu là một biểu đồ cột
- Các cột tăng dần (với hoạt ảnh)
- Số lượng cuộn tăng
- Cuối cùng hiển thị "Tăng 300%" bằng chữ to
```

**Nhiệm vụ 3: Tạo video thuyết trình với nhiều cảnh chuyển đổi**

```
Tạo một video thuyết trình sản phẩm, ba cảnh:
Cảnh 1: Logo mờ dần hiển thị, 2 giây
Cảnh 2: Danh sách đặc điểm sản phẩm xuất hiện lần lượt, 3 giây
Cảnh 3: Nút CTA bật lên, 2 giây
Mỗi cảnh có chuyển đổi mượt mà
```

**Chạy code**:

Code mà Claude tạo ra là một dự án Remotion hoàn chỉnh, bạn có thể:

1. Tạo dự án mới: `npx create-video my-video`
2. Sao chép code mà Claude tạo vào
3. Chạy xem trước: `npm start`
4. Render video: `npm run build`

---

### Skill thứ hai: Dùng find-skills để giải quyết "giao diện xấu lại còn chậy"

#### Bước 1: Mô tả vấn đề của bạn bằng ngôn ngữ tự nhiên

Trực tiếp nói với Claude nhu cầu trừu tượng của bạn:

```
Trang web của tôi trông rất tầm thường, mà lại chậm, giúp tôi tìm xem có kỹ năng nào có thể dùng được không
```

Hoặc cụ thể hơn một chút:

```
Tôi muốn làm cho giao diện đẹp hơn, rồi không chậy nữa
```

#### Bước 2: Claude sẽ sử dụng find-skills để tìm kiếm

Claude sẽ tìm kiếm thông qua find-skills trong cơ sở dữ liệu skills.sh, đề xuất các kỹ năng liên quan. Đối với nhu cầu "đẹp hơn + không chậy", nó sẽ đề xuất:

**anthropics/skills/frontend-design** (kỹ năng chính thức)

Kỹ năng này chuyên giải quyết vấn đề giao diện do AI tạo ra "trông rất tầm thường", để Claude thiết kế:

- Phong cách hình ảnh độc đáo (tránh "cảm giác mẫu AI" lặp đi lặp lại)
- Màu sắc và phông chữ chuyên nghiệp
- Hiệu ứng hoạt ảnh mượt mà
- Chất lượng code cấp sản xuất (code sạch, hiệu suất tự nhiên tốt)

#### Bước 3: Cài đặt và sử dụng

**Cài đặt**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Các nhiệm vụ bạn có thể hoàn thành**:

```
Giúp tôi thiết kế lại trang này, phải trông rất chuyên nghiệp, không giống như do AI tạo
```

```
Giao diện này quá xấu, viết lại bằng phong cách thiết kế hiện đại hơn
```

```
Tạo một Dashboard chủ đề tối, phải có cảm giác công nghệ
```

Claude sẽ theo tiêu chuẩn của kỹ năng này, giúp bạn thiết kế:
- Hướng nhìn hình ảnh độc đáo (chủ nghĩa tối giản, tương lai hoài cổ, brutalism, v.v.)
- Các cặp màu sắc và phông chữ được chọn lọc kỹ càng
- Khoảng cách và bố cục hợp lý
- Hoạt ảnh tương tác mượt mà

---

### So sánh hai Skills

| Skills | Giải quyết vấn đề gì | Mức độ thú vị |
|--------|-------------|---------|
| **remotion-dev/skills** | Tạo video bằng code | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Làm giao diện đẹp hơn | ⭐⭐⭐⭐ |

---

### Skill thứ ba: Dùng frontend-slides để tạo PPT đẹp nhanh chóng

#### Giới thiệu

**frontend-slides** là một Skill cho phép bạn tạo tài liệu trình bày HTML đẹp bằng ngôn ngữ tự nhiên — thậm chí bạn không cần biết bất kỳ CSS hoặc JavaScript nào!

Đặc điểm chính của nó là "**hiển thị thay vì nói**": Khi bạn không thể mô tả phong cách thiết kế muốn có, nó sẽ tạo 3 bản xem trước hình ảnh để bạn chọn, thay vì yêu cầu bạn mô tả bằng lời nói "nền xanh, chữ to" như vậy những nhu cầu trừu tượng.

#### Cài đặt frontend-slides

**Cách 1: Cài đặt thủ công**

```bash
# Tạo thư mục skill
mkdir -p ~/.claude/skills/frontend-slides

# Tải xuống tệp (hoặc sao chép từ GitHub)
# 1. Truy cập https://github.com/zarazhangrui/frontend-slides
# 2. Tải xuống SKILL.md và STYLE_PRESETS.md
# 3. Đặt vào thư mục ~/.claude/skills/frontend-slides/
```

**Cách 2: Sử dụng find-skills để cài đặt**

```
Giúp tôi tìm kỹ năng liên quan đến tạo tài liệu trình bày PPT
```

Claude sẽ tìm kiếm thông qua find-skills và đề xuất frontend-slides.

#### Kịch bản sử dụng

**Kịch bản 1: Tạo tài liệu trình bày từ không**

```
/frontend-slides

Tôi muốn tạo một bài trình bày khởi động AI để huy động vốn, khoảng 10 trang
```

Claude sẽ hướng dẫn bạn:
1. Hỏi nội dung từng trang (tiêu đề, điểm chính, hình ảnh)
2. Hỏi bạn muốn cảm giác như thế nào (kinh ngạc? chuyên nghiệp? ấm áp?)
3. Tạo 3 bản xem trước phong cách hình ảnh để bạn chọn
4. Tạo tài liệu trình bày HTML hoàn chỉnh
5. Mở xem trước trong trình duyệt

**Kịch bản 2: Chuyển đổi tệp PowerPoint**

```
/frontend-slides

Chuyển bản trình bày presentation.pptx của tôi thành phiên bản web
```

Claude sẽ:
1. Trích xuất tất cả văn bản, hình ảnh và ghi chú từ PPT
2. Hiển thị nội dung được trích xuất để bạn xác nhận
3. Cho bạn chọn phong cách hình ảnh
4. Tạo tài liệu trình bày HTML giữ lại tất cả nội dung gốc

**Kịch bản 3: Tạo nhanh bản xem trước phong cách**

```
/frontend-slides

Tôi muốn tạo một PPT chia sẻ kỹ thuật, trước tiên hãy cho tôi xem những phong cách hình ảnh có thể chọn
```

Claude sẽ trực tiếp tạo 3 trang xem trước với những phong cách khác nhau:
- **Chủ đề tối**: Neon Cyber, Terminal Green, Deep Space
- **Chủ đề sáng**: Paper & Ink, Swiss Modern, Soft Pastel
- **Phong cách đặc biệt**: Brutalist, Gradient Wave

#### Phong cách hình ảnh được tích hợp sẵn

| Tên phong cách | Đặc điểm | Kịch bản phù hợp |
|---------|------|---------|
| **Neon Cyber** | Cảm giác công nghệ tương lai, hiệu ứng hạt | Chia sẻ kỹ thuật, sản phẩm AI |
| **Midnight Executive** | Thương mại cao cấp, đáng tin cậy | Báo cáo kinh doanh, huy động vốn |
| **Paper & Ink** | Phong cách biên tập, hơi văn học | Chia sẻ nội dung, chia sẻ giáo dục |
| **Swiss Modern** | Hình học tối giản, phong cách Bauhaus | Tác phẩm thiết kế, chủ nghĩa tối giản |
| **Brutalist** | Gốc gác táo bạo, hấp dẫn mắt | Trưng bày nghệ thuật, biểu hiện cá nhân |

#### Kết quả đầu ra

Tài liệu trình bày được tạo là một **HTML tệp đơn**, bao gồm:

- Toàn bộ mã phong cách và tương tác
- Điều hướng bàn phím (phím mũi tên, khoảng trắng)
- Hỗ trợ cảm ứng/trượt
- Cuộn bánh xe chuột trang
- Thanh tiến độ và điểm điều hướng
- Hoạt ảnh kích hoạt cuộn
- Thiết kế đáp ứng

```html
<!DOCTYPE html>
<html lang="vi-VN">
<head>
    <!-- Toàn bộ phong cách nội tuyến, không có phụ thuộc -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Tiêu đề của bạn</h1>
    </section>
    <!-- Thêm nhiều slide... -->
</body>
</html>
```

#### Tại sao khuyên dùng?

1. **Không có phụ thuộc**: Tệp HTML duy nhất, 10 năm nữa vẫn có thể mở
2. **Khám phá hình ảnh**: Không cần mô tả thiết kế, chỉ cần chọn thích
3. **Chuyển đổi PPT**: Giữ lại nội dung hiện tại, thay đổi giao diện tốt hơn
4. **Code cấp sản xuất**: Tính truy cập tốt, chú thích rõ ràng, dễ tùy chỉnh

**Liên kết liên quan**:
- [Kho lưu trữ GitHub frontend-slides](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ Star
- [Ví dụ xem trước trực tuyến](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### So sánh ba Skills

| Skills | Giải quyết vấn đề gì | Mức độ thú vị | Mức độ thực tiễn |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | Tạo video bằng code | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Làm giao diện đẹp hơn | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Tạo PPT đẹp nhanh chóng | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### Cách sử dụng sau khi cài đặt

Sau khi cài đặt xong, bạn không cần thực hiện bất kỳ cấu hình bổ sung nào. Khi bạn nêu một nhiệm vụ liên quan cho Claude, nó sẽ tự động gọi Skill tương ứng.

Xem những Skills đã cài đặt:

```bash
npx skills list
```

---

## Skills là gì?

### Khái niệm cốt lõi

**Skills là "gói kỹ năng" được lưu trữ trong hệ thống tệp**, bao gồm:

- **SKILL.md**: Tệp định nghĩa kỹ năng (bắt buộc)
- **scripts/**: Tập lệnh hỗ trợ (tùy chọn)
- **templates/**: Mẫu đầu ra (tùy chọn)
- **references/**: Tài liệu tham khảo (tùy chọn)

### Skills vs Prompt

Bạn có thể có câu hỏi: Skills và gửi trực tiếp một prompt cho Claude có gì khác?

| Prompt | Skills |
|--------|--------|
| Tính tạm thời, phải nói lặp lại mỗi lần | Bền vững, viết một lần sử dụng lặp lại |
| Tồn tại trong lịch sử đoạn hội thoại, chiếm Token | Tải khi cần, tiết kiệm Token |
| Không thể chia sẻ giữa các phiên | Có thể chia sẻ trong nhóm |
| Khó kiểm soát phiên bản | Có thể quản lý bằng Git |

### Hai loại Skills

**Skills toàn cục (cá nhân)**:
- Vị trí lưu trữ: `~/.claude/skills/`
- Phạm vi hoạt động: Tất cả các dự án
- Kịch bản phù hợp: Kỹ năng chung của cá nhân

**Skills dự án (nhóm)**:
- Vị trí lưu trữ: `thư_mục_dự_án/.claude/skills/`
- Phạm vi hoạt động: Dự án hiện tại
- Kịch bản phù hợp: Quy chuẩn được chia sẻ trong nhóm, quy chuẩn dự án cụ thể

### Skills hoạt động như thế nào

Khi Claude Code khởi động, nó sẽ:

1. Quét thư mục Skills
2. Phân tích từng tệp SKILL.md
3. Trích xuất siêu dữ liệu frontmatter YAML
4. Thêm nội dung kỹ năng vào "cơ sở kiến thức"
5. Kích hoạt tự động dựa trên description

---

## Cấu trúc tệp SKILL.md

### Cấu trúc cơ bản

Một thư mục Skill hoàn chỉnh trông như thế này:

```
my-skill/
├── SKILL.md          # Bắt buộc: tệp định nghĩa kỹ năng
├── scripts/          # Tùy chọn: tập lệnh hỗ trợ
├── templates/        # Tùy chọn: mẫu đầu ra
├── references/       # Tùy chọn: tài liệu tham khảo
└── examples/         # Tùy chọn: tệp ví dụ
```

### Mẫu SKILL.md

Tệp SKILL.md chia thành hai phần:

**Phần 1: YAML Frontmatter (siêu dữ liệu)**

```yaml
---
name: skill-name              # Tên kỹ năng, sẽ trở thành lệnh /skill-name
description: Mô tả ngắn         # Dùng để Claude khớp tự động kích hoạt
category: development         # Phân loại
tags:                           # Thẻ
  - code
  - automation
---
```

**Phần 2: Nội dung Markdown (hướng dẫn)**

```markdown
# Tiêu đề kỹ năng

## Kịch bản sử dụng
Khi nào dùng kỹ năng này

## Bước thực hiện
1. Bước thứ nhất
2. Bước thứ hai

## Lưu ý
- Điểm lưu ý 1
- Điểm lưu ý 2
```

### Giải thích trường chính

| Trường | Bắt buộc | Giải thích |
|--------|----------|-----------|
| `name` | Có | Tên kỹ năng, chỉ có thể dùng chữ cái viết thường, số, dấu gạch ngang |
| `description` | Có | Mô tả kỹ năng, càng cụ thể càng dễ Claude khớp tự động |
| `category` | Không | Thẻ phân loại |
| `tags` | Không | Thêm các thẻ phân loại khác |
| `allowed-tools` | Không | Công cụ được phép sử dụng, không cần quyền |

---

## Skills vs MCP: Có gì khác?

Nhiều người mới bắt đầu sẽ nhầm lẫn Skills và MCP, chúng hoàn toàn khác nhau.

### Sự khác biệt cốt lõi

| Khía cạnh | Skills | MCP |
|------|--------|-----|
| **Bản chất** | Kiến thức và quy trình | Công cụ và giao diện |
| **Cung cấp gì** | Nói cho AI "làm thế nào" | Cho AI "có thể dùng gì" |
| **Vị trí lưu trữ** | Thư mục `skills/` | Máy chủ MCP |
| **Cách cấu hình** | Tệp Markdown | Tệp cấu hình JSON |
| **Cách kích hoạt** | `/skill-name` hoặc nhận dạng tự động | Tải tự động thông qua cấu hình |

### So sánh hình ảnh

Nếu coi Claude là một "nhân viên":

- **MCP** là "công cụ" trang bị cho nhân viên này (cái búa, máy tính, quyền truy cập)
- **Skills** là "sổ hướng dẫn vận hành" cho nhân viên (cách thực hiện rà soát code, cách commit code)

### Mối quan hệ của chúng

Skills và MCP không phải quan hệ cạnh tranh, mà là quan hệ bổ sung:

```
Nhiệm vụ người dùng → Claude nhận dạng nhu cầu
               ↓
        Tải Skill liên quan (biết cách làm)
               ↓
        Gọi công cụ thông qua MCP (có công cụ có thể dùng)
               ↓
        Hoàn thành nhiệm vụ
```

### Ví dụ minh họa

**Kịch bản: Rà soát code**

- **Skills định nghĩa**: Bước rà soát, danh sách kiểm tra, định dạng đầu ra
- **MCP cung cấp**: Khả năng truy cập GitHub PR, lấy code diff

Hai bên phối hợp: Skills nói cho Claude "cách rà soát", MCP cho Claude "khả năng truy cập code".

### Lời khuyên lựa chọn

| Nhu cầu của bạn | Giải pháp khuyến nghị |
|----------|----------|
| Cần định nghĩa quy trình làm việc | Dùng Skills |
| Cần truy cập dữ liệu bên ngoài | Dùng MCP |
| Cả hai đều cần | Kết hợp sử dụng |

---

## Tài nguyên lấy Skills thường dùng

### Tài nguyên chính thức

- [Kho Skills chính thức của Anthropic](https://github.com/anthropics/skills) - Bộ kỹ năng được duy trì chính thức
- [Tài liệu chính thức Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - Tài liệu chính thức

### Tài nguyên cộng đồng GitHub

| Kho lưu trữ | Mô tả |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Được duy trì bởi Boris Cherny (Người chịu trách nhiệm Claude Code), bao gồm Skills, Agents, Hooks, v.v. |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Bộ công cụ toàn diện, bao gồm Skills được cấu hình trước |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Danh sách tài nguyên Skills được chọn lọc |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 kỹ năng chuyên nghiệp, 300+ tài liệu tham khảo |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Mã nguồn mở được chọn lọc |

### Cách cài đặt Skills cộng đồng

Sử dụng find-skills, chỉ cần nói với Claude bạn cần gì, nó sẽ tự động tìm kiếm và đề xuất:

```
Giúp tôi tìm kỹ năng liên quan đến tối ưu hóa hiệu suất React
```

Claude sẽ tìm kiếm thông qua find-skills trong cơ sở dữ liệu skills.sh, sau đó liệt kê các kỹ năng phù hợp nhất, bạn chọn cài đặt.

**Mẹo tìm kiếm**:

- Dùng từ khóa cụ thể: "react testing" tốt hơn "testing"
- Kết hợp "lĩnh vực + hành động": "nextjs deploy", "typescript lint"
- Ưu tiên chọn kỹ năng có lượng cài đặt cao (10K+ chứng tỏ đã qua thử nghiệm)
- Chú ý danh sách Trending để khám phá kỹ năng mới nổi

---

## Cách tạo Skills của riêng bạn

Tạo Skills có hai cách: một là yêu cầu Claude giúp tạo trực tiếp, cách kia dùng công cụ skill-creator chuyên dụng.

### Cách 1: Yêu cầu Claude tạo trực tiếp

Đây là cách đơn giản nhất, nói trực tiếp với Claude bằng ngôn ngữ tự nhiên nhu cầu của bạn.

**Ví dụ**:

```
Vui lòng giúp tôi tạo một skill tên là "format-code", chức năng là tự động định dạng code.

Yêu cầu:
1. Tự động phát hiện kiểu ngôn ngữ lập trình
2. Áp dụng các quy tắc định dạng tương ứng
3. Trả về diff trước và sau khi định dạng
```

Claude sẽ tự động:
1. Tạo cấu trúc thư mục
2. Tạo tệp SKILL.md
3. Điền frontmatter YAML
4. Viết nội dung kỹ năng

**Kịch bản phù hợp**:
- Tạo nhanh kỹ năng đơn giản
- Bạn biết cần gì, nhưng không quen định dạng SKILL.md
- Muốn lặp lại và sửa đổi nhanh

### Cách 2: Sử dụng skill-creator

skill-creator là một công cụ chuyên dụng để tạo Skills, sẽ hướng dẫn bạn từng bước hoàn thành.

**Cài đặt**:

```bash
npx skills add anthropics/skills@skill-creator -g
```

Hoặc cài đặt toàn bộ kho skills chính thức:

```bash
npx skills add anthropics/skills -g
```

**Sử dụng**:

```
/skill-creator
```

Rồi thực hiện theo hướng dẫn:
- Tên kỹ năng
- Mô tả chức năng
- Kịch bản sử dụng
- Bước thực hiện

skill-creator sẽ:
1. Hướng dẫn bạn làm rõ mục đích kỹ năng
2. Tạo bản nháp SKILL.md
3. Tạo trường hợp kiểm thử
4. Chạy đánh giá và tối ưu hóa

**Kịch bản phù hợp**:
- Tạo kỹ năng phức tạp
- Cần quy trình chuẩn hóa
- Muốn kiểm thử và xác thực kỹ năng

### So sánh hai cách

| Cách 1: Tạo trực tiếp | Cách 2: skill-creator |
|-----------------|---------------------|
| Nhanh đơn giản | Hướng dẫn từng bước |
| Phù hợp kỹ năng đơn giản | Phù hợp kỹ năng phức tạp |
| Hoàn thành trực tiếp đoạn hội thoại | Quy trình chuẩn hóa |
| Sửa đổi linh hoạt | Có kiểm thử xác thực |

### Mẹo: Cách viết nhu cầu tốt

**Mô tả nhu cầu tốt**:

```
Tạo một skill "git-commit", chức năng là tự động commit code.

Bước thực hiện:
1. Kiểm tra có những tệp nào bị sửa đổi
2. Tạo tin nhắn commit tuân theo quy chuẩn Conventional Commits
3. Thực thi git commit
4. Hỏi có cần push không

Lưu ý:
- Kiểm tra thông tin nhạy cảm trước khi commit
- Không commit thư mục dist/node_modules/ v.v.
```

**Mô tả nhu cầu không tốt**:

```
Giúp tôi viết một skill commit code
```

Quá mơ hồ, Claude không biết cần làm gì cụ thể.

---

## Ví dụ Skills thường dùng

### Ví dụ 1: Skill Rà soát Code

Tạo thư mục và tệp:

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Rà soát chất lượng code, bảo mật và độ bao phủ kiểm thử của Pull Request
---

Bạn là một người rà soát code dày kinh nghiệm.

## Quy trình rà soát

1. **Kiểm tra phong cách code**
   - Code có tuân theo quy chuẩn nhóm không
   - Tên có rõ ràng không
   - Chú thích có đầy đủ không

2. **Kiểm tra bảo mật**
   - Có lỗ hổng bảo mật không
   - Thông tin nhạy cảm có bị lộ không
   - Xác thực đầu vào có hoàn chỉnh không

3. **Kiểm tra kiểm thử**
   - Có kiểm thử đủ không
   - Trường hợp kiểm thử có bao gồm điều kiện biên không
   - Kiểm thử có chạy được không

4. **Đánh giá tổng quát**
   - Điểm mạnh là gì
   - Cần cải thiện ở đâu
   - Có nên phê duyệt hợp nhất không

## Định dạng đầu ra

Vui lòng xuất kết quả rà soát dưới cấu trúc rõ ràng, sử dụng danh sách.
EOF
```

Cách sử dụng:

```
/review-pr
Vui lòng rà soát PR của nhánh hiện tại
```

### Ví dụ 2: Skill Commit Git Tự động

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Tự động phát hiện sửa đổi, tạo tin nhắn commit và commit code
---

Bạn là một người dùng Git lành nghề.

## Quy trình thực hiện

1. **Kiểm tra sửa đổi**
   Chạy `git status` để xem tệp được sửa đổi
   Chạy `git diff` để xem sửa đổi cụ thể

2. **Tạo tin nhắn commit**
   Phân tích tính chất của sửa đổi
   Tạo tin nhắn commit tuân theo định dạng Conventional Commits
   Định dạng: `type(scope): description`

3. **Kiểm tra bảo mật**
   Kiểm tra có thông tin nhạy cảm không (khóa, mật khẩu, token)
   Kiểm tra có bao gồm thư mục không nên commit không

4. **Xác nhận rồi thực thi**
   Hiển thị tin nhắn commit để xác nhận
   Thực thi `git add` và `git commit`
   Hỏi có cần push không

## Lưu ý

- Không commit node_modules/, dist/, .next/ v.v.
- Chạy kiểm thử trước khi commit để đảm bảo code có thể dùng
- Tin nhắn commit phải nói rõ nội dung sửa đổi
EOF
```

Cách sử dụng:

```
/git-commit
```

### Ví dụ 3: Skill Tạo Kiểm thử

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Tự động tạo kiểm thử đơn vị cho code, đảm bảo tính đúng đắn của chức năng
---

Bạn là một kỹ sư phát triển kiểm thử.

## Quy trình làm việc

1. **Phân tích code**
   - Hiểu chức năng của hàm/lớp
   - Xác định đầu vào và đầu ra
   - Tìm điều kiện biên

2. **Tạo kiểm thử**
   - Dùng framework kiểm thử phù hợp
   - Bao gồm trường hợp bình thường
   - Bao gồm trường hợp biên
   - Bao gồm trường hợp ngoại lệ

3. **Xác thực kiểm thử**
   - Đảm bảo kiểm thử có thể chạy
   - Đảm bảo kiểm thử có thể phát hiện vấn đề
   - Không nên giả lập quá mức

## Framework Kiểm thử

- JavaScript/TypeScript: Jest hoặc Vitest
- Python: pytest
- Go: gói testing

## Định dạng đầu ra

Trước hết xuất code kiểm thử, sau đó giải thích cách chạy kiểm thử.
EOF
```

Cách sử dụng:

```
/gen-test
Tạo kiểm thử đơn vị cho src/utils.ts
```

### Ví dụ 4: Skill Tạo Tài liệu

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Tự động tạo tài liệu README cho dự án
---

Bạn là một chuyên gia tài liệu kỹ thuật.

## Quy trình làm việc

1. **Phân tích dự án**
   - Quét cấu trúc thư mục dự án
   - Xem tệp package.json hoặc tệp cấu hình khác
   - Đọc code hiện tại

2. **Tạo nội dung**
   - Giới thiệu dự án
   - Cách cài đặt
   - Cách sử dụng
   - Tài liệu API
   - Hướng dẫn phát triển

3. **Định dạng**
   - Dùng cấu trúc chương rõ ràng
   - Thêm ví dụ code
   - Thêm huy hiệu phù hợp
   - Thêm thông tin giấy phép

## Cấu trúc README tiêu chuẩn

- Tiêu đề và giới thiệu dự án
- Đặc điểm chức năng
- Cách cài đặt
- Bắt đầu nhanh
- Cách sử dụng
- Tài liệu API
- Hướng dẫn phát triển
- Hướng dẫn đóng góp
- Giấy phép
EOF
```

Cách sử dụng:

```
/gen-readme
Tạo tài liệu README cho dự án hiện tại
```

---

## Kỹ thuật nâng cao

### Kết hợp Skills với Hooks

Hooks có thể thực hiện các hành động tự động khi có sự kiện cụ thể, kết hợp với Skills có thể tạo ra tự động hóa mạnh mẽ hơn.

Ví dụ: Tự động định dạng code sau khi lưu

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // Gọi skill format-code
      }
    }]
  }
}
```

### Kết hợp Skills với Commands

Commands là các lệnh tắt đơn giản, Skills là quy trình làm việc phức tạp. Hai bên có thể kết hợp sử dụng.

### Hợp tác nhóm

**Chia sẻ Skills dự án**:

1. Đặt Skills vào thư mục `.claude/skills/`
2. Commit lên kho Git
3. Các thành viên nhóm sao chép dự án có thể dùng ngay

**Kiểm soát phiên bản**:

- Skills có thể kiểm soát phiên bản như code
- Mỗi commit có thể ghi lại thay đổi Skills
- Có thể revert về phiên bản cũ

---

## Câu hỏi thường gặp

### Q1: Skill không được kích hoạt?

Các nguyên nhân có thể:
- Định dạng YAML frontmatter sai
- description không đủ cụ thể
- Claude Code chưa khởi động lại

Giải pháp:
- Kiểm tra định dạng YAML
- Cải thiện description, bao gồm kịch bản sử dụng cụ thể
- Khởi động lại Claude Code

### Q2: Cách viết description chính xác?

Description tốt bao gồm:
- Chức năng cụ thể của kỹ năng
- Kịch bản sử dụng ("khi người dùng nói...")
- Từ khóa kích hoạt

**Ví dụ không tốt**:
```
description: Rà soát code
```

**Ví dụ tốt**:
```
description: Rà soát Pull Request về chất lượng code. Kích hoạt khi người dùng nói PR, review, rà soát code.
```

### Q3: Sự khác nhau giữa Skills và Commands?

| Commands | Skills |
|----------|--------|
| Lệnh tắt đơn giản | Quy trình làm việc hoàn chỉnh |
| Tệp `.md` đơn lẻ | Cấu trúc thư mục (SKILL.md + các tệp tùy chọn) |
| Kích hoạt thủ công | Có thể kích hoạt tự động |
| Phù hợp thao tác đơn giản | Phù hợp quy trình phức tạp |

### Q4: Cách gỡ lỗi Skill?

1. Dùng `/skills` để xem kỹ năng có được nhận dạng không
2. Nhập tên kỹ năng trực tiếp để kích hoạt thủ công
3. Kiểm tra nội dung tệp SKILL.md
4. Xem nhật ký Claude Code

---

## Tài liệu tham khảo

### Tài nguyên chính thức

- [Tài liệu chính thức Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Tiêu chuẩn Agent Skills](https://agentskills.io/)
- [Bài viết kỹ thuật chính thức Anthropic (Triết lý thực hành Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Kho GitHub Skills chính thức của Anthropic](https://github.com/anthropics/skills)
- [Tài liệu Agent Skills của VS Code Copilot](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Cửa vào tài nguyên

- [skills.sh](https://skills.sh/) - Cửa hàng ứng dụng Agent Skills do Vercel tạo, thư viện 48000+ kỹ năng
- [find-skills](https://github.com/vercel-labs/agent-skills) - Công cụ tìm kiếm kỹ năng thông minh, 60K+ đăng ký
- [Thị trường Skills (giao diện tiếng Việt)](https://skillsmp.com/zh) - Khám phá và cài đặt Skills cộng đồng

### Dự án cộng đồng GitHub

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Bộ sưu tập Agent Skills chính thức của Vercel Labs (bao gồm find-skills)
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Thực hành tốt nhất chính thức được duy trì bởi Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Bộ công cụ toàn diện, bao gồm Skills được cấu hình trước
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Danh sách tài nguyên Skills được chọn lọc
- [superpowers](https://github.com/obra/superpowers) - Bộ sưu tập Skills quy trình làm việc tự động hóa phát triển phần mềm
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 kỹ năng chuyên nghiệp, 300+ tài liệu tham khảo
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - Danh sách tài nguyên được chọn lọc

### Ví dụ Skills chính thức

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - Kỹ năng để tạo kỹ năng mới
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - Kỹ năng để xây dựng máy chủ MCP
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - Kỹ năng để tạo GIF Slack

### Hướng dẫn tiếng Việt

- [Hướng dẫn cấu hình và sử dụng nâng cao Claude Code hoàn toàn](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - Hướng dẫn thực hành toàn bộ CLAUDE.md, Skills, Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Hướng dẫn tùy chỉnh Claude Code Skills từng bước](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Đọc sâu: Cơ chế nội bộ của Claude Skills

Tiếp theo chúng ta sẽ hiểu sâu về nguyên lý hoạt động của Claude Skills, để bạn không chỉ biết dùng, mà còn hiểu tại sao lại thiết kế như vậy.

### Nguyên lý cơ bản: Tiêm ngữ cảnh động dựa trên prompt

Trước hết, phải hiểu một sự thật quan trọng: **Skills không phải code có thể thực thi**.

Bản chất Skills là hướng dẫn cấp cao (Prompt), được "cấy vào" ngữ cảnh của Claude khi cần. Thiết kế này được gọi là "**Tiêm ngữ cảnh động dựa trên prompt và kiến trúc siêu công cụ**" (Prompt-based Dynamic Context Injection & Meta-Tool Architecture).

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ Nhu cầu người dùng │ ───> │ LLM khớp  │ ───> │ Kích hoạt  │
│                   │      │ Skill     │      │ Skill      │
└─────────────┘      │                │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Cấy vào      │
                                          │ nội dung hướng│
                                          │ dẫn hoàn chỉnh│
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Thực hiện    │
                                          │ nhiệm vụ     │
                                          └──────────────┘
```

### Kiến trúc tải theo ba lớp (Tối ưu Token)

Để xử lý nhiều Skills mà không tiêu tốn quá nhiều Token, Claude sử dụng một cơ chế tải thông minh gồm ba lớp:

| Lớp | Nội dung | Thời điểm tải | Tiêu tốn Token |
|-----|---------|---------|-----------|
| **Lớp 1: Siêu dữ liệu** | YAML frontmatter (tên + mô tả) | Khởi động Claude | ~30-50 tokens/skill |
| **Lớp 2: Hướng dẫn** | Nội dung SKILL.md hoàn chỉnh | Khi Skill được kích hoạt | ~5,000 tokens |
| **Lớp 3: Tài nguyên** | Tập lệnh, mẫu, tài liệu tham khảo | Truy cập theo nhu cầu qua hệ thống tệp | Không chiếm ngữ cảnh |

**Ưu điểm của thiết kế này**:

- Giả sử bạn có 100 Skills, khởi động chỉ tiêu tốn khoảng 3,000-5,000 tokens (siêu dữ liệu)
- Chỉ Skill được kích hoạt mới tải nội dung hoàn chỉnh
- Tài liệu tham khảo v.v. không bao giờ được tải đầy đủ vào ngữ cảnh

**So sánh khi không có Skills**:

```
Không có Skills: Mỗi lần hội thoại cần 50,000+ tokens để mô tả tất cả khả năng
Có Skills: Khởi động ~100 tokens/skill + 5,000 tokens tải theo nhu cầu
Tiết kiệm: Trung bình tiết kiệm 40,000+ tokens mỗi vòng hội thoại
```

### Cơ chế tiêm ngữ cảnh kép

Khi Skill được kích hoạt, hệ thống sẽ thực hiện hai lần sửa đổi:

**1. Tiêm ngữ cảnh hội thoại**

```javascript
// Tin nhắn người dùng thấy (hình ảnh khả thấy)
<command-message>Skill "pdf" đang tải</command-message>

// AI thực tế nhận được (tin nhắn ẩn)
{
  isMeta: true,  // Đánh dấu là tin nhắn siêu dữ liệu, giao diện không hiển thị
  content: `
    # Hướng dẫn chuyên gia phân tích PDF

    Bạn là một chuyên gia phân tích PDF chuyên nghiệp. Quy trình làm việc:
    1. Dùng pdftotext để trích xuất văn bản
    2. Phân tích cấu trúc tài liệu
    3. Tạo báo cáo tóm tắt
    ...
  `  // Nội dung SKILL.md hoàn chỉnh, có thể hàng nghìn ký tự
}
```

**2. Sửa đổi ngữ cảnh thực hiện**

Ngoài tiêm hướng dẫn, Skill còn có thể sửa đổi động môi trường của Claude:

| Loại sửa đổi | Ví dụ | Giải thích |
|---------|------|------|
| **Quyền truy cập công cụ** | `allowed-tools: "Bash(pdftotext:*)"` | Cấp tạm quyền truy cập công cụ cụ thể |
| **Chuyển đổi mô hình** | Từ Sonnet sang Opus | Một số nhiệm vụ phức tạp cần khả năng suy luận mạnh hơn |
| **Cách ly ngữ cảnh** | Tạo không gian phiên con | Tránh ô nhiễm ngữ cảnh hội thoại chính |

### Cơ chế định tuyến suy luận LLM thuần túy

Đây là quyết định thiết kế rất quan trọng: **Claude Skills không có định tuyến được mã hóa cứng**.

| Phương pháp truyền thống | Phương pháp Claude Skills |
|---------|--------------|
| ❌ Khớp vector nhúng | ✅ Suy luận LLM thuần túy |
| ❌ Bộ phân loại | ✅ Truyền phía trước Transformer |
| ❌ Khớp regex/từ khóa | ✅ Hiểu ngôn ngữ tự nhiên |
| ❌ Thuật toán định tuyến riêng | ✅ Quyết định mô hình thống nhất |

**Quy trình làm việc**:

```
1. Tên và mô tả tất cả Skills được định dạng vào mô tả công cụ Skill

2. Claude nhận được:
   - Tin nhắn người dùng
   - Danh sách công cụ có sẵn (bao gồm meta-tool Skill)
   - Danh sách Skills (tên + mô tả)

3. Khả năng hiểu ngôn ngữ tự nhiên của Claude khớp ý định người dùng với mô tả Skill

4. Khi khớp thành công, gọi: command: "skill-name"
```

**Tại sao thiết kế như vậy?**

**Định tuyến được mã hóa cứng cần**:
- Chi phí bảo trì thêm
- Không thể hiểu quan hệ ngữ nghĩa phức tạp
- Khó xử lý đa ngôn ngữ
- Không hỗ trợ khớp mờ

**Suy luận LLM thuần túy**:
- Tận dụng khả năng hiểu ngôn ngữ của Claude
- Tự động xử lý đa ngôn ngữ, từ đồng nghĩa, mô tả mờ
- Không cần bảo trì thêm
- Quyết định định tuyến thông minh hơn

### Cơ chế phân tích tệp

**Cấu trúc tệp SKILL.md**:

```bash
my-custom-skill/
├── SKILL.md              # Bắt buộc: tệp định nghĩa cốt lõi
├── config.json           # Tùy chọn: cấu hình siêu dữ liệu
├── README.md             # Khuyến cáo: tài liệu sử dụng
├── scripts/              # Tùy chọn: tập lệnh có thể thực thi
├── templates/            # Tùy chọn: thư mục mẫu
└── references/           # Tùy chọn: tài liệu tham khảo
```

**Quy trình phân tích**:

```
┌─────────────────────────────────────────────────────────────┐
│               Khởi động Claude Code                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Quét thư mục ~/.claude/skills/ và .claude/skills/           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Dùng thư viện gray-matter phân tích YAML frontmatter        │
│ của mỗi SKILL.md                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Xác thực các trường bắt buộc (tên và mô tả)                │
│ - name: Tối đa 64 ký tự, chỉ dùng chữ cái viết thường,    │
│   số, dấu gạch ngang                                         │
│ - description: Dùng cho LLM khớp tự động                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Trích xuất siêu dữ liệu, xây dựng danh sách Skills         │
│ (chỉ tải tên + mô tả, không tải nội dung chính)           │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ quy trình thực hiện hoàn chỉnh

Hãy xem quy trình toàn bộ qua một ví dụ cụ thể:

```
Người dùng: "Giúp tôi phân tích tệp PDF này"

═══════════════════════════════════════════════════════════════

Bước 1: Quyết định của LLM
────────────────────────
Claude tìm thấy mô tả Skill "pdf" trong danh sách:
  description: "Phân tích nội dung tài liệu PDF, trích xuất văn bản, tạo tóm tắt"

═══════════════════════════════════════════════════════════════

Bước 2: Hệ thống can thiệp
────────────────────────
Claude Code thực hiện:
  1. Đọc ~/.claude/skills/pdf/SKILL.md
  2. Tạo tin nhắn khả thấy: "Skill pdf đang tải"
  3. Tạo tin nhắn ẩn: Nội dung SKILL.md hoàn chỉnh
  4. Sửa đổi quyền phiên: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Bước 3: Thực hiện của LLM
────────────────────────
Bây giờ ngữ cảnh của Claude bao gồm:
  - Yêu cầu người dùng gốc
  - Hướng dẫn chuyên gia phân tích PDF
  - Quyền truy cập công cụ pdftotext

Claude thực hiện:
  1. Dùng pdftotext trích xuất văn bản PDF
  2. Phân tích cấu trúc nội dung
  3. Tạo báo cáo tóm tắt
  4. Hiển thị kết quả cho người dùng

═══════════════════════════════════════════════════════════════

Bước 4: Loại bỏ khi sử dụng xong
────────────────────────
Sau khi hoàn thành nhiệm vụ, nội dung hoàn chỉnh của Skill được loại bỏ khỏi ngữ cảnh
(chỉ giữ lịch sử hội thoại, không giữ hướng dẫn hoàn chỉnh của Skill)
```

### Các đổi mới thiết kế cốt lõi

| Điểm đổi mới | Phương pháp truyền thống | Phương pháp Skills | Lợi ích |
|--------|---------|------------|------|
| **Nguồn khả năng** | Cố định trong trọng số mô hình | Prompt được tải động | Có thể mở rộng, có thể cập nhật |
| **Hiệu suất Token** | Tất cả khả năng cư trú bộ nhớ | Tải theo nhu cầu | Tiết kiệm 80%+ tokens |
| **Quản lý kiến thức** | Phân tán trong lịch sử hội thoại | Tệp mô-đun trong hệ thống tệp | Có thể kiểm soát phiên bản, có thể chia sẻ |
| **Vòng đời** | Chiếm dụng liên tục | Sử dụng xong là loại bỏ | Ngữ cảnh sạch hơn |

### Cơ sở học thuật

Thiết kế của Claude Skills bắt nguồn từ các nghiên cứu sau:

| Lĩnh vực nghiên cứu | Công trình đại diện | Cách áp dụng |
|---------|---------|---------|
| **Học tăng cường** | Voyager (2023) | Khái niệm tích lũy thư viện kỹ năng |
| **Kiến trúc nhận thức** | ACT-R, Soar | Tách biệt bộ nhớ kỹ năng và bộ nhớ khai báo |
| **Chiến lược phân lớp** | Options Framework | Tải theo ba lớp tăng dần |

**Sự thay đổi suy nghĩ cốt lõi**:

```
Truyền thống: AI cần nhớ tất cả
      ↓
Skills: AI biết "đi đâu tìm kiến thức chuyên môn"
      ↓
Kết quả: Giống cách suy nghĩ của chuyên gia con người hơn
```

### Mối quan hệ với tiêu chuẩn Agent Skills

Claude Skills tuân theo [tiêu chuẩn mở Agent Skills](https://agentskills.io/), có nghĩa là:

- ✅ Tương thích đa nền tảng: Cursor, Windsurf, Aider v.v. đều hỗ trợ
- ✅ Định dạng tệp thống nhất: Cấu trúc SKILL.md tiêu chuẩn
- ✅ Có thể tương tác: Có thể chia sẻ Skills giữa các công cụ khác nhau

```
Tiêu chuẩn Agent Skills định nghĩa:
├── Bắt buộc: Tệp SKILL.md (metadata + instructions)
├── Tùy chọn: scripts/ (code có thể thực thi)
├── Tùy chọn: references/ (tài liệu cơ sở kiến thức)
└── Tùy chọn: assets/ (mẫu và tài nguyên)
```

### Tóm tắt: Tại sao thiết kế này là thiên tài?

1. **Tách biệt khả năng với mô hình**: Kiến thức chuyên môn không còn phụ thuộc vào đào tạo mô hình, có thể cập nhật bất kỳ lúc nào thông qua tệp Markdown

2. **Hiệu suất Token cực tối**: Cơ chế tải ba lớp đảm bảo chỉ tải nội dung cần thiết

3. **Tận dụng khả năng của LLM**: Khớp định tuyến hoàn toàn dựa vào hiểu ngôn ngữ của Claude, không cần thuật toán thêm

4. **Thân thiện với nhà phát triển**: Tạo Skill chỉ cần viết Markdown, không cần lập trình

5. **Khả năng tổng hợp**: Skills có thể tham chiếu lẫn nhau, kết hợp, tạo quy trình làm việc phức tạp

6. **Sử dụng xong là loại bỏ**: Tự động làm sạch sau khi hoàn thành, giữ ngữ cảnh sạch sẽ

---

### Tóm tắt

Skills là công cụ chính để biến Claude Code từ "trợ lý chung" thành "chuyên gia nhóm".

Thông qua Skills, bạn có thể:
- Tiêu chuẩn hóa quy trình làm việc
- Tái sử dụng kiến thức nhóm
- Nâng cao hiệu suất hợp tác
- Giảm bớt lặp lại giải thích

Hãy nhớ: **Nếu bạn thấy mình lặp lại cùng một hướng dẫn hai lần, bạn nên cân nhắc tạo một Skill**.

Hãy bắt đầu tạo Skill đầu tiên của bạn ngay bây giờ!
