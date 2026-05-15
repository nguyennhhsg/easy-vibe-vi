# Docker Containerization

::: tip Lời mở đầu
**"Trên máy tôi thì nó chạy được" là cớ hay nhất của developer, và Docker đã giải quyết nó hoàn toàn.** Công nghệ containerization đóng gói ứng dụng cùng tất cả các phụ thuộc vào một đơn vị tiêu chuẩn, đảm bảo chạy nhất quán trên mọi môi trường. Nó là nền tảng của việc phân phốiphần mềm hiện đại.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Khái niệm cốt lõi**: Hiểu ba khái niệm cốt lõi - image, container, registry
- **So sánh kiến trúc**: Hiểu rõ sự khác biệt bản chất giữa container và máy ảo
- **Kỹ năng thực hành**: Nắm vững viết Dockerfile và các lệnh thường dùng
- **Cơ sở orchestration**: Học cách dùng Docker Compose để quản lý ứng dụng đa dịch vụ
- **Best practices**: Hiểu rõ tối ưu hóa image, tăng cường bảo mật và các thực hành cấp production

| Chương | Nội dung | Khái niệm cốt lõi |
|-----|------|---------|
| **Chương 1** | Tại sao cần container | Nhất quán môi trường, hiệu suất tài nguyên, phân phốitiêu chuẩn |
| **Chương 2** | Khái niệm cốt lõi | Image, container, registry, Dockerfile |
| **Chương 3** | Vòng đời Docker | Viết, xây dựng, đẩy, chạy, quản lý |
| **Chương 4** | Docker Compose | Orchestration đa dịch vụ, mạng, data volume |
| **Chương 5** | Best practices | Tối ưu image, bảo mật, multi-stage build |

---

## 1. Tại sao cần container?

Trước khi container ra đời, triển khai một ứng dụng cần cài đặt runtime thủ công trên server, cấu hình biến môi trường, giải quyết xung đột phụ thuộc. Sự khác biệt giữa các môi trường khác nhau (phát triển, kiểm thử, sản xuất) là nguồn gốc của lỗi.

<DockerArchitectureDemo />

### Container giải quyết những vấn đề nào?

| Vấn đề | Cách truyền thống | Cách dùng container |
|------|---------|---------|
| Môi trường không nhất quán | "Trên máy tôi thì chạy được" | Đóng gói tất cả phụ thuộc, nhất quán ở mọi nơi |
| Xung đột phụ thuộc | App A cần Node 14, App B cần Node 18 | Mỗi container có môi trường độc lập |
| Lãng phí tài nguyên | Mỗi VM một hệ điều hành hoàn chỉnh | Chia sẻ kernel, chi phí MB level |
| Triển khai chậm | Cài đặt thủ công, cấu hình | docker run một lệnh |
| Mở rộng khó | Tạo VM mới, cài môi trường, triển khai | Khởi động container mới trong vài giây |

::: tip Bản chất của container
Container không phải là máy ảo nhẹ. Bản chất của nó là **một tiến trình bị cách ly**. Kernel Linux thực hiện container thông qua hai cơ chế:
- **Namespace**: Cách ly tầm nhìn của tiến trình (PID, mạng, hệ thống tệp, v.v.)
- **Cgroups**: Giới hạn sử dụng tài nguyên của tiến trình (CPU, bộ nhớ, IO)

Tiến trình trong container và tiến trình thông thường trên máy chủ không có sự khác biệt bản chất, chỉ là bị "nhốt trong một căn phòng không nhìn thấy thế giới bên ngoài".
:::

---

## 2. Khái niệm cốt lõi

Thế giới Docker xoay quanh ba khái niệm cốt lõi: image, container, registry.

| Khái niệm | So sánh | Giải thích |
|------|------|------|
| Image | Class / Template | Template ứng dụng chỉ đọc, chứa code, runtime, thư viện, cấu hình |
| Container | Instance / Object | Instance chạy của image, có thể đọc-ghi, có vòng đời độc lập |
| Registry | App store | Dịch vụ lưu trữ và phân phối image (Docker Hub, ACR, ECR) |
| Dockerfile | Công thức / Blueprint | Tệp văn bản định nghĩa cách xây dựng image |
| Volume | Ổ cứng ngoài | Dữ liệu persistent, dữ liệu không mất khi xóa container |

### Cấu trúc phân lớp của image

Image Docker được tạo bởi nhiều lớp chỉ đọc (Layer) xếp chồng lên nhau, mỗi lệnh Dockerfile tạo một lớp:

```
┌─────────────────────────┐
│  CMD ["node", "app.js"] │  ← Lớp lệnh khởi động
├─────────────────────────┤
│  COPY . /app            │  ← Lớp mã ứng dụng (thay đổi thường xuyên)
├─────────────────────────┤
│  RUN npm install        │  ← Lớp cài đặt phụ thuộc (thay đổi đôi khi)
├─────────────────────────┤
│  FROM node:18-alpine    │  ← Lớp base image (ít thay đổi)
└─────────────────────────┘
```

::: tip Tại sao phân lớp lại quan trọng?
Docker lưu vào bộ nhớ đệm mỗi lớp. Nếu một lớp không thay đổi, quá trình xây dựng sẽ sử dụng trực tiếp bộ nhớ đệm. Vì vậy trong Dockerfile, bạn nên **đặt các lệnh thay đổi ít xuyên ở phía trước** (như cài đặt phụ thuộc), **các lệnh thay đổi thường xuyên ở phía sau** (như sao chép code). Bằng cách này, hầu hết các bản dựng sẽ đạt được bộ nhớ đệm, tốc độ sẽ nhanh hơn nhiều.
:::

---

## 3. Vòng đời Docker

Từ viết Dockerfile đến chạy container, quy trình làm việc của Docker là một đường ống rõ ràng.

<DockerLifecycleDemo />

### Cheat sheet các lệnh Dockerfile thường dùng

| Lệnh | Tác dụng | Ví dụ |
|------|------|------|
| `FROM` | Chỉ định base image | `FROM node:18-alpine` |
| `WORKDIR` | Đặt working directory | `WORKDIR /app` |
| `COPY` | Sao chép tệp vào image | `COPY package.json ./` |
| `RUN` | Thực thi lệnh lúc xây dựng | `RUN npm install` |
| `ENV` | Đặt biến môi trường | `ENV NODE_ENV=production` |
| `EXPOSE` | Khai báo cổng (chỉ dùng cho tài liệu) | `EXPOSE 3000` |
| `CMD` | Lệnh khởi động container | `CMD ["node", "app.js"]` |
| `ENTRYPOINT` | Điểm vào container (khó bị ghi đè) | `ENTRYPOINT ["nginx"]` |

---

## 4. Docker Compose: Orchestration đa dịch vụ

Các dự án thực tế thường có nhiều hơn một container. Một ứng dụng Web có thể cần: app server + database + Redis + Nginx. Docker Compose sử dụng một tệp YAML để định nghĩa và quản lý nhiều container.

### Ví dụ docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

  redis:
    image: redis:7-alpine

volumes:
  db-data:
```

### Các khái niệm cốt lõi của Compose

| Khái niệm | Giải thích | Ví dụ |
|------|------|------|
| services | Định nghĩa các dịch vụ container | app, db, redis |
| volumes | Data volume persistent | db-data lưu các tệp cơ sở dữ liệu |
| networks | Mạng tùy chỉnh (tự động tạo theo mặc định) | Các dịch vụ truy cập lẫn nhau qua tên dịch vụ |
| depends_on | Phụ thuộc thứ tự khởi động | app phụ thuộc vào db và redis |
| environment | Biến môi trường | Mật khẩu cơ sở dữ liệu, địa chỉ kết nối |

::: tip Service discovery
Trong Docker Compose, tên dịch vụ chính là tên máy chủ. Container app có thể trực tiếp sử dụng `db:5432` để truy cập cơ sở dữ liệu, `redis:6379` để truy cập Redis, không cần biết địa chỉ IP. Đó là nhờ DNS tích hợp sẵn của Docker.
:::

---

## 5. Best practices

### 5.1 Multi-stage build

Multi-stage build là công cụ để tối ưu hóa kích thước image. Giai đoạn xây dựng cài đặt tất cả công cụ và phụ thuộc, giai đoạn cuối cùng chỉ giữ lại các tệp cần cho runtime.

```dockerfile
# Giai đoạn xây dựng
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Giai đoạn chạy
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 5.2 Checklist tối ưu image

| Tối ưu | Cách làm | Kết quả |
|--------|------|------|
| Chọn base image nhỏ | Dùng `alpine` thay vì `ubuntu` | Image từ ~200MB giảm xuống ~50MB |
| Gộp lệnh RUN | Kết nối nhiều lệnh bằng `&&` | Giảm số lớp image |
| Dùng .dockerignore | Loại trừ node_modules, .git, v.v. | Tăng tốc độ xây dựng, giảm context |
| Multi-stage build | Tách biệt môi trường xây dựng và chạy | Image cuối cùng không chứa công cụ xây dựng |
| Cố định số phiên bản | `node:18.17-alpine` thay vì `node:latest` | Build có thể lặp lại |

### 5.3 Thực hành bảo mật

| Thực hành | Giải thích |
|------|------|
| Không chạy với tư cách root | `USER node` chỉ định người dùng không phải root |
| Quét lỗ hổng | `docker scout` hoặc Trivy quét image |
| Đặc quyền tối thiểu | Chỉ cài đặt các package cần thiết, không cài công cụ gỡ lỗi |
| Không hard code secret | Sử dụng biến môi trường hoặc Docker Secrets |
| Cập nhật base image thường xuyên | Vá các lỗ hổng bảo mật kịp thời |

---

## Kết luận

Docker containerization là cơ sở hạ tầng của việc phân phốiphần mềm hiện đại, hiểu rõ nó là điều quan trọng với bất kỳ developer nào.

Nhìn lại các điểm chính của chương này:

1. **Container vs máy ảo**: Container chia sẻ kernel máy chủ, nhẹ và nhanh hơn, nhưng cách ly yếu hơn VM
2. **Ba thứ cốt lõi**: Image (template), container (instance), registry (phân phối)
3. **Dockerfile**: Xây dựng phân lớp, tận dụng bộ nhớ đệm, đặt lệnh thay đổi ít xuyên ở phía trước
4. **Docker Compose**: Dùng YAML để định nghĩa ứng dụng đa dịch vụ, tên dịch vụ là tên máy chủ
5. **Thực hành production**: Multi-stage build để giảm image, alpine base image, chạy không phải root

## Tài liệu mở rộng

- [Tài liệu Docker chính thức](https://docs.docker.com/) - Tài liệu tham khảo quyền lực nhất
- [Docker Getting Started](https://docs.docker.com/get-started/) - Hướng dẫn bắt đầu chính thức
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) - Hướng dẫn best practices chính thức
- [Docker Compose Documentation](https://docs.docker.com/compose/) - Tài liệu tham khảo đầy đủ của Compose
