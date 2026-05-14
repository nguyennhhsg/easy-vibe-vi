# Cập nhật giao diện của bạn với thư viện thành phần hiện đại

Trong các bài học trước, bạn đã học cách sử dụng công cụ thiết kế để vẽ giao diện, dùng AI IDE để chuyển đổi thiết kế thành mã, thậm chí hoàn thành một dự án frontend đầy đủ. Nhưng bạn cũng có thể nhận ra một vấn đề: những nút bấm, biểu mẫu, cửa sổ popup do bạn viết từ đầu, mặc dù có thể sử dụng được, nhưng luôn cảm thấy kém xa "các sản phẩm chuyên nghiệp" — kiểu dáng không đủ thống nhất, chi tiết tương tác không mượt mà, thích ứng với các màn hình khác nhau cũng rất phiền.

Đó chính là vấn đề mà **thư viện thành phần** muốn giải quyết.

Thư viện thành phần là một bộ sưu tập các phần UI đã được thiết kế và phát triển sẵn. Nút bấm, hộp nhập liệu, menu thả xuống, hộp thoại, bảng... những yếu tố giao diện mà bạn sẽ sử dụng lặp lại trong bất kỳ sản phẩm nào, thư viện thành phần đã giúp bạn hoàn thành, và đã được kiểm nghiệm và chế tác bởi hàng triệu người dùng. Bạn chỉ cần ghép nó lại như xếp hình khối, bạn sẽ có thể nhanh chóng xây dựng giao diện cấp chuyên nghiệp.

## Bạn sẽ học được

1. Hiểu thư viện thành phần frontend là gì, và tại sao phát triển hiện đại gần như đều sử dụng nó
2. Làm quen với bốn thư viện thành phần đại diện nhất, hiểu cảnh dùng mà chúng xuất sắc nhất
3. Qua ba tình huống thực tế (trang đích, trang sản phẩm, quản trị), học cách dùng AI IDE + thư viện thành phần để Vibe Coding
4. Học cách đọc tài liệu thư viện thành phần, tìm thành phần phù hợp theo yêu cầu và sử dụng chúng chính xác

## 1. Tại sao lại cần thư viện thành phần?

Hãy tưởng tượng bạn đang trang trí nhà. Bạn có thể tự mình làm một chiếc ghế từ gỗ, nhưng cách phổ biến hơn là đi mua ở IKEA — thiết kế đẹp, chất lượng ổn định, hướng dẫn rõ ràng, mang về nhà lắp ráp là xong.

Thư viện thành phần chính là "IKEA" của phát triển frontend. Nó không cung cấp nội thất, mà là các phần của giao diện:

| Viết tay | Dùng thư viện thành phần |
| :--- | :--- |
| Cần tự xử lý kiểu dáng, tương tác, animation | Sử dụng ngay tức khắc, kiểu dáng và tương tác đã được chế tác kỹ |
| Nút bấm trên các trang khác nhau có thể trông khác nhau | Kiểu dáng toàn cục thống nhất, tự động duy trì nhất quán |
| Thích ứng điện thoại, máy tính bảng cần công việc thêm | Hầu hết thư viện thành phần đã tích hợp sẵn hỗ trợ responsive |
| Quyền truy cập không có chướng ngại vật (Accessibility) dễ bị bỏ sót | Thư viện thành phần chuyên nghiệp đã xử lý điều hướng bàn phím, trình đọc màn hình, v.v. |
| Tốc độ phát triển chậm | Tốc độ phát triển nhanh, tập trung vào logic kinh doanh |

Nói đơn giản: **thư viện thành phần giúp bạn dành thời gian cho "cái gì", chứ không phải "cách vẽ".**

### Thấy để tin: Cùng một nhu cầu, có và không có thư viện thành phần sai nhau như thế nào

Chỉ nói không làm thì không thuyết phục. Chúng tôi dùng Trae với các yêu cầu gần giống nhau, lần lượt không chỉ định và chỉ định thư viện thành phần, xem khoảng cách giữa kết quả sinh ra.

**Gợi ý từ 1: Không sử dụng thư viện thành phần**

```text
Vui lòng giúp tôi tạo một trang bảng điều khiển dữ liệu cho trợ lý viết AI, bao gồm:
- Thanh tiêu đề trên cùng và nút xuất
- Bốn thẻ thống kê hiển thị số người dùng, người dùng hoạt động, số tài liệu, doanh thu, và hiển thị xu hướng tăng/giảm
- Một biểu đồ đường và một biểu đồ tròn
- Bảng danh sách người dùng, có chức năng phân trang
- Thanh điều hướng bên trái
```

Sau khi chạy trực tiếp trong Trae:

<!-- TODO: Thay thế bằng ảnh chụp bảng điều khiển do Trae sinh ra (không sử dụng thư viện thành phần) -->
<!-- ![Bảng điều khiển do Trae sinh ra (không sử dụng thư viện thành phần)](images/compare-without-lib.png) -->

**Gợi ý từ 2: Sử dụng thư viện thành phần shadcn/ui**

```text
Vui lòng giúp tôi tạo một trang bảng điều khiển dữ liệu cho trợ lý viết AI, dùng thư viện thành phần shadcn/ui, bao gồm:
- Thanh tiêu đề trên cùng và nút xuất
- Bốn thẻ thống kê hiển thị số người dùng, người dùng hoạt động, số tài liệu, doanh thu, và hiển thị xu hướng tăng/giảm
- Một biểu đồ đường và một biểu đồ tròn
- Bảng danh sách người dùng, có chức năng phân trang
- Thanh điều hướng bên trái
```

Cũng chạy trực tiếp trong Trae:

<!-- TODO: Thay thế bằng ảnh chụp bảng điều khiển do Trae sinh ra (sử dụng shadcn/ui) -->
<!-- ![Bảng điều khiển do Trae sinh ra (sử dụng shadcn/ui)](images/compare-with-lib.png) -->

Cùng một nhu cầu, điểm khác biệt duy nhất chỉ là thêm `shadcn/ui + Tailwind CSS` vào đầu gợi ý từ, kết quả do Trae sinh ra trong tính nhất quán về mặt hình ảnh, chi tiết tương tác, mức độ chế tác tổng thể hoàn toàn không ở cùng một lớp. Đây chính là "nâng cấp miễn phí" mà thư viện thành phần mang lại — bạn chỉ cần viết thêm tên thư viện thành phần trong gợi ý từ.

## 2. Làm quen với bốn thư viện thành phần cốt lõi

Có rất nhiều thư viện thành phần (danh sách đầy đủ xem [Phụ lục](#phụ-lục-danh-sách-nhiều-thư-viện-thành-phần-hơn)), nhưng bạn chỉ cần làm quen với bốn thư viện đại diện nhất:

| Thư viện thành phần | Framework | Định vị một câu | Trang web |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Do công ty Ant Group phát hành, tiêu chuẩn thực tế cho các hệ thống kinh doanh cấp doanh nghiệp, phạm vi thành phần cực rộng | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | Không cài đặt gói npm, sao chép mã trực tiếp vào dự án của bạn, dựa trên Tailwind CSS, mức độ tự do tùy chỉnh cao nhất | ui.shadcn.com |
| [HeroUI](https://heroui.com)（trước đây là NextUI） | React | Kiểu dáng mặc định đẹp mắt, animation mượt mà, phù hợp cho các trang đích và trình bày sản phẩm yêu cầu chất lượng hình ảnh | heroui.com |
| [Material UI](https://mui.com) | React | Thư viện thành phần React lâu đời nhất, thực hiện tiêu chuẩn Google Material Design, hệ sinh thái trưởng thành nhất | mui.com |

> Người dùng Vue cũng có nhiều lựa chọn: [Element Plus](https://element-plus.org)（phổ biến nhất ở nước trong）、[Ant Design Vue](https://antdv.com)、[Naive UI](https://www.naiveui.com) và những thư viện khác, xem chi tiết tại [Phụ lục](#phụ-lục-danh-sách-nhiều-thư-viện-thành-phần-hơn)。

Các thư viện thành phần khác nhau xuất sắc ở các tình huống khác nhau. Tiếp theo, chúng tôi sẽ hướng bạn qua ba tình huống phát triển thực tế, giúp bạn trải nghiệm cách sử dụng AI IDE + thư viện thành phần để Vibe Coding.

Để thể hiện phong cách và đặc điểm của các thư viện thành phần khác nhau, chúng tôi cố ý chọn các thư viện khác nhau cho mỗi tình huống. Nhưng xin lưu ý: **đây chỉ là để bạn thấy được nhiều giải pháp hơn**, trong phát triển thực tế, bạn hoàn toàn có thể chỉ sử dụng cái mà bạn thấy thuận tiện nhất. Ví dụ, nếu bạn thích kiểu dáng shadcn/ui, hãy dùng nó để làm trang đích, trang sản phẩm, quản trị dù sao cũng được. Lựa chọn cái bạn cảm thấy đẹp mắt, sử dụng thoải mái, quan trọng hơn mọi thứ.

## 3. Thực tế 1: Dùng HeroUI để xây dựng trang đích sản phẩm

**Tình huống**: Bạn đã phát hành một sản phẩm trợ lý viết AI, cần một trang đích đẹp để thể hiện đặc điểm sản phẩm, thu hút người dùng đăng ký. Trang đích cần có tác động hình ảnh mạnh mẽ, animation mượt mà, cũng đẹp trên điện thoại.

**Tại sao chọn HeroUI**: Kiểu dáng mặc định của HeroUI đã rất đẹp mắt, tích hợp sẵn animation chuyển tiếp mượt mà, rất phù hợp cho các trang trình bày hướng tới người dùng.

### 3.1 Tạo dự án

```bash
# Dùng CLI chính thức của HeroUI để tạo dự án
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: Thay thế bằng ảnh chụp trang chủ HeroUI hoặc ảnh chụp thành phần -->
<!-- ![Trang web thư viện thành phần HeroUI](images/heroui-homepage.png) -->

### 3.2 Dùng AI IDE để sinh trang đích

Mở AI IDE（Cursor, Trae, v.v.）, nhập vào hộp thoại:

```text
Vui lòng giúp tôi tạo một trang đích cho trợ lý viết AI, dùng thư viện thành phần HeroUI:

**Cấu trúc trang:**
1. Thanh điều hướng trên cùng: bên trái đặt Logo và tên sản phẩm, bên phải đặt ba liên kết "Tính năng", "Định giá", "Giới thiệu", thêm một nút "Bắt đầu sử dụng"
2. Vùng màn hình đầu tiên: tiêu đề lớn viết "Hãy để AI trở thành bạn cộng tác viết của bạn", phụ đề giới thiệu giá trị sản phẩm, hai nút "Dùng thử miễn phí" và "Xem bản demo", dưới đó đặt một ảnh chụp sản phẩm
3. Trình bày tính năng: ba thẻ cột, lần lượt giới thiệu ba tính năng "Tiếp tục viết thông minh", "Điều chỉnh phong cách", "Dịch đa ngôn ngữ", mỗi thẻ cần có biểu tượng, tiêu đề, mô tả
4. Vùng định giá: ba thẻ định giá (phiên bản miễn phí, phiên bản chuyên nghiệp, phiên bản đội), phiên bản chuyên nghiệp cần nổi bật
5. Lời kêu gọi cuối cùng: một câu lời lời lội dẫn hấp dẫn, kèm nút đăng ký
6. Chân trang: thông tin bản quyền và liên kết mạng xã hội

**Yêu cầu thiết kế:**
- Trông phải hiện đại, chuyên nghiệp
- Hỗ trợ chế độ tối
- Trên điện thoại cũng phải trông đẹp
```

<!-- TODO: Thay thế bằng ảnh chụp quá trình AI tạo trang đích hoặc kết quả cuối cùng -->
<!-- ![Hiệu ứng trang đích HeroUI do AI tạo](images/heroui-landing-result.png) -->

### 3.3 Các thành phần chính mà AI sẽ dùng

Trong mã được sinh ra bởi AI, bạn sẽ thấy các thành phần HeroUI này:

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

Tác dụng của mỗi thành phần:

| Thành phần | Tác dụng | Vị trí trên trang đích |
| :--- | :--- | :--- |
| `Navbar` | Thanh điều hướng trên cùng | Trên cùng trang, cố định không di chuyển |
| `Button` | Nút, hỗ trợ nhiều biến thể và màu | Nút CTA, nút điều hướng |
| `Card` | Container thẻ | Trình bày tính năng, thẻ định giá |
| `Chip` | Nhãn nhỏ | Đánh dấu "Đề xuất", "Phổ biến nhất" |
| `Divider` | Đường phân chia | Phân chia trực quan giữa các vùng |

### 3.4 Lặp lại để tối ưu hóa

Mã được sinh ra lần đầu có thể không hoàn toàn hài lòng, tiếp tục trò chuyện với AI để điều chỉnh:

```text
Vui lòng giúp tôi tối ưu hóa trang đích:

1. Thêm màu gradient cho tiêu đề lớn, từ xanh dương chuyển sang tím
2. Thẻ tính năng khi rê chuột lên phải có hiệu ứng nổi lên
3. Thẻ định giá phiên bản chuyên nghiệp cần nổi bật, thêm đường viền và nhãn "Phổ biến nhất"
4. Trên điện thoại thanh điều hướng đổi thành menu hamburger（ba đường ngang）
```

<!-- TODO: Thay thế bằng ảnh chụp kết quả tối ưu hóa trang đích -->
<!-- ![Trang đích sau khi lặp lại và tối ưu hóa](images/heroui-landing-iterated.png) -->

> **Cốt lõi của Vibe Coding**: Bạn không cần nhớ API của mỗi thành phần, chỉ cần dùng ngôn ngữ tự nhiên để mô tả hiệu ứng mà bạn muốn, AI sẽ giúp bạn tìm thành phần phù hợp và cách viết. Khi gặp cái nào không hài lòng, tiếp tục trò chuyện lặp lại là được.

## 4. Thực tế 2: Dùng shadcn/ui để xây dựng trang sản phẩm

**Tình huống**: Trợ lý viết AI của bạn cần một giao diện chính cho người dùng đăng nhập — bên trái là danh sách tài liệu, bên phải là trình chỉnh sửa, trên cùng là thanh công cụ. Đây là trang sản phẩm loại chức năng, cần giao diện tùy chỉnh sâu.

**Tại sao chọn shadcn/ui**: shadcn/ui đặt mã thành phần trực tiếp vào dự án của bạn, bạn có thể sửa đổi bất kỳ chi tiết nào. Đối với giao diện sản phẩm cần tùy chỉnh sâu, phương thức "sở hữu mã" này linh hoạt nhất.

<!-- TODO: Thay thế bằng ảnh chụp trang web hoặc trình bày thành phần shadcn/ui -->
<!-- ![Trang web thư viện thành phần shadcn/ui](images/shadcn-homepage.png) -->

### 4.1 Tạo dự án

```bash
# Tạo dự án Next.js
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# Khởi tạo shadcn/ui
npx shadcn@latest init

# Thêm thành phần theo yêu cầu（không phải cài đặt tất cả thành phần một lần）
npx shadcn@latest add button card input sidebar sheet dialog
```

Điều độc đáo của shadcn/ui: mỗi lần `add` một thành phần, nó sẽ sao chép mã nguồn vào thư mục `components/ui/` của dự án bạn. Bạn có thể trực tiếp mở các tệp này để sửa đổi kiểu dáng và hành vi.

### 4.2 Dùng AI IDE để sinh giao diện sản phẩm

```text
Vui lòng giúp tôi tạo giao diện chính cho trợ lý viết AI, dùng thư viện thành phần shadcn/ui:

**Bố cục tổng thể:**
- Bên trái là thanh bên có thể gập lại, chiều rộng khoảng 280px:
  - Trên cùng đặt nút "Tài liệu mới"
  - Dưới đó là danh sách tài liệu, mỗi tài liệu hiển thị tiêu đề và thời gian chỉnh sửa lần cuối
  - Nhấp chuột phải vào tài liệu có thể đổi tên hoặc xóa
- Bên phải là vùng chỉnh sửa chính, chia thành hai phần trên dưới:
  - Phía trên là thanh công cụ: có thể chỉnh sửa tiêu đề tài liệu, hiển thị thống kê số ký tự, nút "Tiếp tục viết AI", menu thả xuống "Xuất"
  - Phía dưới là vùng chỉnh sửa: một hộp nhập liệu lớn, chiếm toàn bộ không gian còn lại

**Chi tiết tương tác:**
- Sau khi nhấp "Tiếp tục viết AI", nút hiển thị trạng thái tải, phía dưới trình chỉnh sửa xuất hiện văn bản do AI sinh ra（hiển thị từng ký tự như gõ máy）
- Trên điện thoại thanh bên trở thành ngăn kéo, trượt từ bên trái
- Tài liệu được chọn hiện tại cần được tô sáng
```

<!-- TODO: Thay thế bằng ảnh chụp giao diện sản phẩm shadcn/ui do AI tạo -->
<!-- ![Hiệu ứng trang sản phẩm shadcn/ui do AI tạo](images/shadcn-product-result.png) -->

### 4.3 Các thành phần chính mà AI sẽ dùng

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| Thành phần | Tác dụng | Vị trí trên trang sản phẩm |
| :--- | :--- | :--- |
| `Sidebar` | Thanh bên có thể gập lại | Danh sách tài liệu bên trái |
| `Sheet` | Ngăn kéo di động | Thay thế thanh bên trên di động |
| `DropdownMenu` | Menu thả xuống | Nút "Xuất", menu nhấp chuột phải |
| `Dialog` | Hộp thoại | Đổi tên, xác nhận xóa |
| `Button` | Nút, hỗ trợ variant và trạng thái tải | Các nút hoạt động khác nhau |
| `Input` | Hộp nhập liệu | Chỉnh sửa tiêu đề tài liệu |

### 4.4 Tùy chỉnh kiểu dáng thành phần

Ưu thế của shadcn/ui là bạn có thể sửa đổi trực tiếp mã nguồn thành phần. Ví dụ, bạn muốn các nút có góc bo tròn lớn hơn:

```text
Vui lòng giúp tôi sửa đổi components/ui/button.tsx,
thay đổi góc bo tròn mặc định của tất cả nút từ rounded-md thành rounded-xl,
và thêm hiệu ứng bóng mờ nhẹ cho biến thể primary
```

AI sẽ sửa đổi trực tiếp tệp thành phần trong dự án của bạn, thay vì ghi đè kiểu dáng của gói npm — đây chính là lợi ích "sở hữu mã" của shadcn/ui.

<!-- TODO: Thay thế bằng ảnh chụp mã thành phần shadcn/ui trong dự án, thể hiện có thể sửa đổi trực tiếp -->
<!-- ![Mã thành phần shadcn/ui trong dự án có thể sửa đổi trực tiếp](images/shadcn-code-ownership.png) -->

## 5. Thực tế 3: Dùng Ant Design để xây dựng giao diện quản trị

**Tình huống**: Sau khi trợ lý viết AI của bạn lên sàn, cần một quản trị viên để xem dữ liệu người dùng, quản lý nội dung tài liệu, xử lý đơn đặt hàng trả phí. Hệ thống quản trị cốt lõi là trình bày dữ liệu và hiệu suất hoạt động.

**Tại sao chọn Ant Design**: Ant Design có tích lũy sâu nhất trong lĩnh vực kinh doanh giữa, bảng, biểu mẫu, biểu đồ và các thành phần kinh doanh khác đều sử dụng ngay tức khắc, tích hợp sẵn rất nhiều mô hình tương tác cấp doanh nghiệp（hoạt động hàng loạt, bộ lọc nâng cao, xuất dữ liệu, v.v.）。

<!-- TODO: Thay thế bằng ảnh chụp trang web Ant Design hoặc trình bày Pro Components -->
<!-- ![Trang web thư viện thành phần Ant Design](images/antd-homepage.png) -->

### 5.1 Tạo dự án

```bash
# Dùng giàn giáo Ant Design Pro（tích hợp sẵn bố cục, định tuyến, quyền hạn）
npx create-umi@latest ai-writer-admin
# Chọn mẫu Ant Design Pro
cd ai-writer-admin
npm install
```

Hoặc bắt đầu từ đầu:

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 Dùng AI IDE để sinh quản trị viên

```text
Vui lòng giúp tôi tạo quản trị viên cho trợ lý viết AI, dùng thư viện thành phần Ant Design:

**Bố cục tổng thể:**
- Bên trái là thanh menu: Bảng điều khiển, Quản lý người dùng, Quản lý tài liệu, Quản lý đơn đặt hàng, Cài đặt hệ thống
- Trên cùng hiển thị breadcrumb

**Trang quản lý người dùng:**
- Trên cùng đặt bốn thẻ thống kê: tổng số người dùng, người dùng mới hôm nay, số người dùng hoạt động, số người dùng trả phí
- Vùng tìm kiếm lọc: có thể tìm kiếm theo tên người dùng, chọn khoảng thời gian đăng ký, lọc theo trạng thái người dùng, kèm nút "Tìm kiếm" và "Đặt lại"
- Bảng người dùng:
  - Hiển thị avatar, tên người dùng, email, thời gian đăng ký, gói đăng ký（phân biệt bằng nhãn màu khác nhau）, trạng thái, thao tác
  - Mỗi trang hiển thị 20 hàng, hỗ trợ phân trang
  - Có thể chọn hàng loạt người dùng, vô hiệu hóa hàng loạt hoặc xuất
  - Cột thao tác: xem chi tiết, chỉnh sửa, vô hiệu hóa（phải xác nhận lần thứ hai trước khi vô hiệu hóa）
- Nhấp vào "Xem chi tiết" để trượt ngăn kéo từ bên phải, hiển thị thông tin chi tiết người dùng và danh sách tài liệu gần đây
```

<!-- TODO: Thay thế bằng ảnh chụp giao diện quản trị do AI tạo với Ant Design -->
<!-- ![Giao diện quản trị Ant Design do AI tạo](images/antd-admin-result.png) -->

### 5.3 Các thành phần chính mà AI sẽ dùng

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| Thành phần | Tác dụng | Vị trí trong quản trị |
| :--- | :--- | :--- |
| `ProLayout` | Khuôn khổ bố cục quản trị tổng thể | Xương sườn trang（menu + vùng nội dung） |
| `ProTable` | Bảng nâng cao, tích hợp sẵn tìm kiếm, phân trang, cài đặt cột | Danh sách người dùng, danh sách tài liệu, danh sách đơn đặt hàng |
| `StatisticCard` | Thẻ thống kê dữ liệu | Bảng điều khiển, tổng quan trên cùng trang |
| `Tag` / `Badge` | Nhãn trạng thái | Gói đăng ký, trạng thái người dùng |
| `Drawer` | Ngăn kéo bên cạnh | Chi tiết người dùng, biểu mẫu chỉnh sửa |
| `Popconfirm` | Hộp xác nhận bong bóng | Xóa, vô hiệu hóa và các thao tác nguy hiểm khác |

### 5.4 Tiếp tục lặp lại: Thêm bảng điều khiển

```text
Vui lòng giúp tôi tạo trang bảng điều khiển:

1. Trên cùng bốn thẻ thống kê: tổng số người dùng, tổng số tài liệu, số lần gọi API hôm nay, doanh thu tháng, mỗi thẻ hiển thị giá trị và thay đổi hôm nay（tăng hay giảm）
2. Ở giữa đặt hai biểu đồ:
   - Bên trái: biểu đồ đường gia tăng người dùng 7 ngày qua
   - Bên phải: biểu đồ tròn phân phối gói đăng ký
3. Dưới cùng: bảng nhật ký thao tác gần đây, hiển thị thời gian, người dùng, loại thao tác, chi tiết

Dùng các thành phần của Ant Design để bố cục, biểu đồ có thể dùng Ant Design Charts
```

<!-- TODO: Thay thế bằng ảnh chụp hiệu ứng trang bảng điều khiển -->
<!-- ![Hiệu ứng trang bảng điều khiển Ant Design](images/antd-dashboard-result.png) -->

> **Mẹo Vibe Coding cho quản trị**: Cấu trúc trang quản trị tương đối cố định（bảng + tìm kiếm + hộp thoại）, rất thích hợp để AI sinh hàng loạt. Bạn có thể trước tiên để AI sinh trang "Quản lý người dùng" làm mẫu, sau đó nói "Tham khảo cấu trúc trang quản lý người dùng, giúp tôi sinh trang quản lý tài liệu", AI sẽ tái sử dụng mô hình bố cục tương tự.

## 6. Học cách xem tài liệu: "Hướng dẫn sử dụng" của thư viện thành phần

Trong Vibe Coding, AI sẽ giúp bạn viết phần lớn mã, nhưng khi kết quả do AI sinh ra không đúng, hoặc bạn muốn điều chỉnh tinh tế hành vi của một thành phần nào đó, **xem tài liệu** là cách giải quyết nhanh nhất.

Lấy Ant Design làm ví dụ, địa chỉ tài liệu của nó là: `https://ant.design/components/overview-cn`

Quy trình tiêu chuẩn để xem tài liệu:

1. **Làm rõ nhu cầu**: ví dụ, "Tôi cần bảng hỗ trợ chọn hàng"
2. **Tìm kiếm trong tài liệu**: tìm kiếm "Table" để vào trang thành phần bảng
3. **Xem ví dụ**: mỗi thành phần trong tài liệu có nhiều ví dụ trực tuyến, tìm ví dụ "Có thể chọn"
4. **Sao chép mã**: sao chép mã ví dụ vào dự án của bạn
5. **Xem bảng API**: ở cuối trang, tìm thuộc tính `rowSelection` để xem danh sách cấu hình đầy đủ

> Bạn cũng có thể gửi liên kết tài liệu trực tiếp cho AI IDE: "Vui lòng tham khảo rowSelection API tại https://ant.design/components/table-cn, giúp tôi thêm chức năng chọn hàng loạt cho bảng người dùng". Cung cấp liên kết tài liệu cho AI, mã được sinh ra sẽ chính xác hơn.

Tham chiếu nhanh địa chỉ tài liệu của các thư viện thành phần:

| Thư viện thành phần | Địa chỉ tài liệu |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. Tóm tắt lại

Ba tình huống thực tế bao gồm nhu cầu phát triển frontend phổ biến nhất:

| Tình huống | Thư viện thành phần đề xuất | Đặc điểm cốt lõi |
| :--- | :--- | :--- |
| Trang đích / Trang trình bày | HeroUI | Kiểu dáng mặc định đẹp mắt, animation mượt mà, tác động hình ảnh mạnh mẽ |
| Trang chức năng sản phẩm | shadcn/ui | Mã hoàn toàn có thể kiểm soát, tùy chỉnh sâu linh hoạt |
| Hệ thống quản trị | Ant Design | Thành phần kinh doanh phong phú, bảng biểu mẫu sử dụng ngay tức khắc |

Quy trình làm việc Vibe Coding tóm tắt:

1. Chọn thư viện thành phần phù hợp dựa trên tình huống
2. Dùng AI IDE mô tả cấu trúc trang và tương tác mà bạn muốn
3. AI sinh mã lần đầu, bạn xem trước hiệu ứng
4. Dùng ngôn ngữ tự nhiên tiếp tục lặp lại để điều chỉnh
5. Khi gặp vấn đề chi tiết, tham khảo tài liệu thư viện thành phần

### Bài tập

Chọn một trong các tình huống sau, dùng AI IDE + thư viện thành phần hoàn thành từ đầu:

1. Dùng HeroUI để tạo trang đích trình bày cho dự án trước của bạn（ví dụ, Hogwarts Portrait）
2. Dùng shadcn/ui để xây dựng giao diện chính của ứng dụng ghi chú（thanh bên + trình chỉnh sửa）
3. Dùng Ant Design để xây dựng quản trị nội dung đơn giản（danh sách bài viết + biểu mẫu tạo bài viết mới）

---

## Phụ lục: Danh sách nhiều thư viện thành phần hơn

Ngoài bốn thư viện cốt lõi được giới thiệu trong nội dung chính, hệ sinh thái frontend có vô số thư viện thành phần xuất sắc. Dưới đây liệt kê theo framework, để bạn dễ dàng chọn lựa dựa trên nhu cầu dự án.

### Hệ sinh thái Vue

| Thư viện thành phần | Số sao | Giới thiệu | Tình huống phù hợp |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Do đội Ele.me tạo ra, thư viện thành phần cấp doanh nghiệp Vue 3, sử dụng rộng rãi nhất ở nước trong, hệ sinh thái tiếng Trung cực tốt | Hệ thống quản trị kinh doanh giữa |
| [Vuetify](https://vuetifyjs.com) | ~41k | Thư viện thành phần Vue Material Design phổ biến nhất, hơn 80 thành phần, tài liệu hoàn chỉnh | Dự án theo phong cách thiết kế Google |
| [Ant Design Vue](https://antdv.com) | ~21k | Thư viện thành phần Vue 3 dựa trên hệ thống thiết kế Ant, tiêu chuẩn thiết kế thống nhất | Kinh doanh cấp doanh nghiệp giữa |
| [Naive UI](https://www.naiveui.com) | ~18k | Viết bằng TypeScript, khả năng tùy chỉnh chủ đề cực mạnh, không phụ thuộc bộ tiền xử lý CSS | Dự án có yêu cầu thiết kế độc đáo |
| [Quasar](https://quasar.dev) | ~27k | Một bộ mã xây dựng ứng dụng SPA, SSR, PWA, di động và máy tính để bàn | Dự án đa nền tảng |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Thư viện thành phần di động nhẹ do đội Youzan phát triển, bao gồm nhu cầu thương mại điện tử thông dụng | Trang H5 di động |
| [PrimeVue](https://primevue.org) | ~14k | Hơn 90 thành phần, hỗ trợ nhiều chủ đề（Material, Bootstrap, v.v.） | Cần thành phần phong phú và chủ đề đa dạng |
| [Arco Design Vue](https://arco.design/vue) | ~3k | Do ByteDance phát hành, chất lượng thành phần cao, tích hợp sẵn chế độ tối | Sản phẩm quản trị kinh doanh giữa |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | Do Tencent phát hành, ngôn ngữ thiết kế thống nhất, bao gồm tình huống máy tính để bàn thông dụng | Hệ sinh thái Tencent hoặc dự án cấp doanh nghiệp |

### Hệ sinh thái React

| Thư viện thành phần | Số sao | Giới thiệu | Tình huống phù hợp |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Tiêu chuẩn thiết kế Material của Google được triển khai lâu đời, thành phần đầy đủ nhất, hệ sinh thái trưởng thành nhất | Xây dựng nhanh chóng ứng dụng cấp doanh nghiệp |
| [Ant Design](https://ant.design) | ~94k | Do công ty Ant Group phát hành, tích hợp sẵn rất nhiều thành phần kinh doanh chất lượng cao, cộng đồng nhà phát triển nước trong chiếm vị trí dẫn đầu | Kinh doanh cấp doanh nghiệp giữa |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | Sao chép mã vào dự án thay vì cài đặt npm, dựa trên Radix UI + Tailwind CSS, hoàn toàn có thể kiểm soát | Dự án cần tùy chỉnh cao |
| [Chakra UI](https://chakra-ui.com) | ~39k | Tập trung vào trải nghiệm nhà phát triển, API đơn giản, tích hợp sẵn hỗ trợ quyền truy cập mà không có chướng ngại vật | Phát triển nguyên mẫu nhanh chóng |
| [Mantine](https://mantine.dev) | ~28k | Hơn 100 thành phần và hơn 50 hooks, bao gồm bộ chọn ngày, trình chỉnh sửa văn bản phong phú, v.v. | Cần giải pháp đầy đủ sử dụng ngay tức khắc |
| [Headless UI](https://headlessui.com) | ~27k | Do Tailwind Labs chính thức phát hành, thư viện thành phần không có kiểu dáng, hỗ trợ React và Vue cùng lúc | Sử dụng kết hợp với Tailwind CSS |
| [HeroUI](https://heroui.com) | ~24k | Dựa trên Tailwind CSS + React Aria, kiểu dáng mặc định đẹp mắt, animation mượt mà | Dự án đòi hỏi chất lượng hình ảnh |
| [Radix UI](https://www.radix-ui.com) | ~17k | Thư viện nguyên liệu thành phần không có kiểu dáng, tập trung vào quyền truy cập mà không có chướng ngại vật và hành vi thành phần, là nền tảng cơ sở của shadcn/ui | Xây dựng hệ thống thiết kế tùy chỉnh |

#### Hệ sinh thái mở rộng shadcn/ui

Ngoài các thư viện thành phần chung được đề cập ở trên, hệ sinh thái shadcn/ui đã dẫn đến một loạt thư viện mở rộng, cung cấp các lựa chọn sai biệt cho các tình huống cụ thể. Những thư viện mở rộng này cũng áp dụng chế độ "sao chép mã vào dự án", cho phép nhà phát triển có quyền kiểm soát mã nguồn hoàn toàn.

| Thư viện thành phần | Giới thiệu | Tình huống phù hợp |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | Hơn 200 thành phần cấp sản xuất, chuyên về thẻ phát sáng, gradient chữ, thành phần hình ảnh 3D và các đặc điểm hình ảnh khác | Trang đích chất lượng cao, sản phẩm SaaS |
| [Tailark UI](https://tailark.com) | Bộ sưu tập khối thành phần trang web tiếp thị, trình bày sản phẩm, chứng chỉ khách hàng, nút CTA và các mô-đun tần suất cao tiếp thị | Trang đích tiếp thị, trang web chính thức sản phẩm |
| [UI Tripled](https://ui.tripled.work) | Thành phần tương tác động dựa trên Framer Motion, cửa sổ popup, điều hướng, animation thẻ | Công cụ sáng tạo, bộ sưu tập công việc cá nhân |
| [Neobrutalism UI](https://neobrutalism.dev) | Phong cách chủ nghĩa tân thô sơ, đường thô, tương phản cao, màu sắc sôi nổi | Trang web chính thức thương hiệu cá nhân, dự án sáng tạo |
| [REUI](https://reui.io) | 967+ mẫu kết hợp thành phần tình huống kinh doanh thực | Quản trị cấp doanh nghiệp, biểu mẫu phức tạp |
| [Cult UI](https://cult-ui.com) | Tinh chỉnh tương tác/hình ảnh bằng tay, bảng dữ liệu, bảng lọc và các thành phần kết hợp khác | Dự án thương mại chất lượng cao |
| [Kibo UI](https://kibo-ui.com) | Thành phần kinh doanh nâng cao, bộ chọn màu, trình chỉnh sửa văn bản phong phú, tải tệp, v.v. | Quản trị, sản phẩm công cụ |
| [Kokonut UI](https://kokonutui.com) | Hơn 100 thành phần + 7+ mẫu hoàn chỉnh, phong cách tươi sáng đơn giản | Trang web chính thức SaaS, blog, thương mại điện tử |
| [Commerce UI](https://ui.stackzero.co) | Chuyên dụng cho tình huống thương mại điện tử, thẻ sản phẩm, giỏ hàng, biểu mẫu thanh toán | Nền tảng thương mại điện tử |
| [shadcnblocks](https://shadcnblocks.com) | 1373 khối UI + 13 mẫu hoàn chỉnh, tài nguyên toàn diện nhất | Tất cả các tình huống |
| [Shoogle](https://shoogle.dev) | Nền tảng tổng hợp và truy tìm hệ sinh thái shadcn/ui | Tìm kiếm tài nguyên nhanh chóng |
| [Discover All Shadcn](https://allshadcn.com) | Điều hướng tài nguyên loại tổng hợp | Tìm kiếm tài nguyên nhanh chóng |

> **Tại sao chọn phần mở rộng shadcn/ui?** Những phần mở rộng này kế thừa triết lý "quyền sở hữu mã" của shadcn/ui, đồng thời tùy chỉnh sâu cho các tình huống cụ thể. Trong thời đại Vibe Coding, chúng giúp bạn nhanh chóng tìm thấy thành phần phù hợp với nhu cầu thiết kế, vượt ra ngoài sự đồng nhất của thư viện UI chính, làm ra sản phẩm có sự khác biệt lớn hơn.
