# Kubernetes Sắp xếp

::: tip Lời mở đầu
**Docker giải quyết vấn đề "đóng gói", Kubernetes giải quyết vấn đề "quản lý".** Khi bạn có hàng chục hoặc hàng trăm container cần triển khai, mở rộng/thu nhỏ quy mô, phục hồi sự cố, việc quản lý thủ công là không thực tế. Kubernetes (K8s) giống như "hệ điều hành" cho các container, nó tự động hóa việc triển khai, mở rộng và vận hành các ứng dụng được containerize.
:::

**Bạn sẽ học được gì từ bài viết này?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Hiểu biết kiến trúc**: Nắm vững thành phần của control plane và worker node của K8s
- **Tài nguyên cốt lõi**: Quen thuộc với các khái niệm cốt lõi như Pod, Deployment, Service, v.v.
- **Quản lý khai báo**: Hiểu rõ ý tưởng "khai báo trạng thái mong muốn, hệ thống tự động hội tụ"
- **Khả năng vận hành**: Hiểu rõ các cơ chế như cập nhật rolling, tự động mở rộng/thu nhỏ quy mô, kiểm tra sức khỏe
- **Bước đầu thực hành**: Có thể sử dụng kubectl và YAML để triển khai một ứng dụng hoàn chỉnh

| Chương | Nội dung | Khái niệm cốt lõi |
|-----|------|---------|
| **Chương 1** | Tại sao cần K8s | Những thách thức của sắp xếp container |
| **Chương 2** | Kiến trúc K8s | Control plane, worker node, etcd |
| **Chương 3** | Tài nguyên cốt lõi | Pod, Deployment, Service, Ingress |
| **Chương 4** | Quản lý khai báo | YAML, kubectl, vòng lặp điều khiển |
| **Chương 5** | Thực hành vận hành | Cập nhật rolling, HPA, kiểm tra sức khỏe |

---

## 1. Tại sao cần Kubernetes?

Docker làm cho việc đóng gói và chạy container riêng lẻ trở nên đơn giản, nhưng khi bạn gặp phải những tình huống sau đây, quản lý thủ công sẽ không đủ:

| Thách thức | Mô tả | Giải pháp của K8s |
|------|------|---------------|
| Triển khai nhiều instance | Một dịch vụ cần chạy 10 bản sao | Deployment tự động quản lý số lượng bản sao |
| Phục hồi sự cố | Một container bị lỗi cần tự động khởi động lại | Bộ điều khiển tự động phát hiện và xây dựng lại Pod |
| Khám phá dịch vụ | IP của container thay đổi, làm sao tìm được nhau? | Service cung cấp DNS ổn định và IP |
| Cập nhật rolling | Cập nhật phiên bản mà không được ngừng dịch vụ | Thay thế từng Pod cũ, không có thời gian ngừng |
| Mở rộng quy mô elastic | Tự động mở rộng quy mô khi có lưu lượng cao | HPA tự động điều chỉnh số lượng bản sao dựa trên CPU/bộ nhớ |
| Lập lịch tài nguyên | Đặt container vào máy phù hợp nhất | Scheduler lập lịch thông minh |

::: tip Ý tưởng cốt lõi của K8s: Khai báo
Bạn không cần phải nói với K8s "khởi động 3 container" (mệnh lệnh), mà là nói với nó "tôi muốn 3 bản sao đang chạy" (khai báo). K8s sẽ liên tục giám sát để đảm bảo trạng thái thực tế khớp với trạng thái mong muốn mà bạn khai báo. Nếu một Pod bị lỗi, nó sẽ tự động tạo cái mới để bổ sung.
:::

---

## 2. Kiến trúc Kubernetes

Cluster K8s bao gồm control plane (Mặt phẳng điều khiển) và worker node (Nút công nhân).

<K8sArchitectureDemo />

### Đường dẫn hoàn chỉnh của một yêu cầu

```
Yêu cầu của người dùng → Ingress Controller → Service → kube-proxy → Pod (container)
                                                              ↑
                                                    Danh sách Endpoint (được duy trì bởi Service)
```

---

## 3. Các đối tượng tài nguyên cốt lõi

K8s mô tả trạng thái mong muốn của cluster thông qua các "đối tượng tài nguyên" khác nhau.

<K8sWorkloadsDemo />

### Phân loại đối tượng tài nguyên

| Danh mục | Tài nguyên | Mục đích |
|------|------|------|
| Khối lượng công việc | Pod, Deployment, StatefulSet, DaemonSet, Job | Chạy ứng dụng |
| Mạng | Service, Ingress, NetworkPolicy | Khám phá dịch vụ và quản lý lưu lượng |
| Cấu hình | ConfigMap, Secret | Quản lý cấu hình và dữ liệu nhạy cảm |
| Lưu trữ | PersistentVolume, PersistentVolumeClaim | Lưu trữ lâu dài |
| Lập lịch | Node, Namespace, ResourceQuota | Cô lập tài nguyên và giới hạn |

---

## 4. Quản lý khai báo và kubectl

### Vòng lặp điều khiển (Reconciliation Loop)

Cơ chế làm việc cốt lõi của K8s là vòng lặp điều khiển:

```
Quan sát (Observe) → So sánh (Diff) → Hành động (Act) → Quan sát...
     ↓                ↓              ↓
  Đọc trạng thái thực tế    So sánh với trạng thái mong muốn    Thực hiện hoạt động sửa chữa
```

Bạn khai báo `replicas: 3`, bộ điều khiển phát hiện chỉ có 2 Pod đang chạy, nó sẽ tạo 1 Pod mới. Vòng lặp này được thực hiện cứ sau vài giây, đảm bảo hệ thống luôn hội tụ về trạng thái mong muốn.

### Các lệnh thường dùng của kubectl

| Lệnh | Tác dụng | Ví dụ |
|------|------|------|
| `kubectl apply -f` | Áp dụng cấu hình YAML | `kubectl apply -f deployment.yaml` |
| `kubectl get` | Xem danh sách tài nguyên | `kubectl get pods -o wide` |
| `kubectl describe` | Xem chi tiết tài nguyên | `kubectl describe pod my-app-xxx` |
| `kubectl logs` | Xem nhật ký Pod | `kubectl logs -f my-app-xxx` |
| `kubectl exec` | Vào terminal Pod | `kubectl exec -it my-app-xxx -- sh` |
| `kubectl delete` | Xóa tài nguyên | `kubectl delete -f deployment.yaml` |
| `kubectl scale` | Mở rộng/thu nhỏ thủ công | `kubectl scale deploy my-app --replicas=5` |

::: tip apply so với create
`kubectl create` là mệnh lệnh—"tạo tài nguyên này", nếu đã tồn tại sẽ báo lỗi. `kubectl apply` là khai báo—"đảm bảo tài nguyên ở trạng thái này", không tồn tại thì tạo, đã tồn tại thì cập nhật. Trong môi trường sản xuất, bạn phải luôn sử dụng `apply`.
:::

---

## 5. Thực hành vận hành

### 5.1 Cập nhật rolling và rollback

Deployment sử dụng chiến lược cập nhật rolling theo mặc định: tạo từng bước Pod phiên bản mới, đồng thời dừng từng bước Pod phiên bản cũ.

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Tối đa tạo thêm 1 Pod
      maxUnavailable: 0   # Không cho phép Pod nào không khả dụng
```

| Hoạt động | Lệnh |
|------|------|
| Cập nhật image | `kubectl set image deploy/my-app app=my-app:2.0` |
| Xem trạng thái cập nhật | `kubectl rollout status deploy/my-app` |
| Xem lịch sử phiên bản | `kubectl rollout history deploy/my-app` |
| Rollback về phiên bản trước | `kubectl rollout undo deploy/my-app` |

### 5.2 Tự động mở rộng/thu nhỏ quy mô (HPA)

HPA (Horizontal Pod Autoscaler) tự động điều chỉnh số lượng bản sao Pod dựa trên CPU, bộ nhớ hoặc các chỉ số tùy chỉnh.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 5.3 Kiểm tra sức khỏe (Probe)

K8s giám sát sức khỏe của Pod thông qua ba loại probe:

| Probe | Tác dụng | Hậu quả khi thất bại |
|------|------|---------|
| livenessProbe | Kiểm tra container có còn sống không | Khởi động lại container |
| readinessProbe | Kiểm tra container đã sẵn sàng chưa | Loại khỏi Service, không nhận lưu lượng |
| startupProbe | Kiểm tra container đã hoàn thành khởi động chưa | Không thực hiện các probe khác trong giai đoạn khởi động |

::: tip Tầm quan trọng của probe
Nếu Pod không cấu hình kiểm tra sức khỏe, K8s chỉ có thể xác định sức khỏe thông qua việc tiến trình có tồn tại hay không. Nhưng nhiều lúc tiến trình vẫn chạy nhưng dịch vụ không phản hồi nữa (ví dụ như deadlock, OOM ở mức cạnh). Cấu hình livenessProbe có thể giúp K8s tự động khởi động lại những container "chết giả" này.
:::

---

## Tóm tắt

Kubernetes là tiêu chuẩn thực tế của sắp xếp container, hiểu rõ các khái niệm cốt lõi của nó là nền tảng cho phát triển cloud-native.

Hãy nhìn lại các điểm chính của chương:

1. **Quản lý khai báo**: Nói với K8s "bạn muốn gì", chứ không phải "làm thế nào", vòng lặp điều khiển tự động hội tụ
2. **Kiến trúc phân tầng**: Control plane chịu trách nhiệm quyết định, worker node chịu trách nhiệm thực hiện, etcd lưu trữ trạng thái
3. **Tài nguyên cốt lõi**: Pod (đơn vị nhỏ nhất), Deployment (quản lý bản sao), Service (khám phá dịch vụ), Ingress (điểm vào bên ngoài)
4. **Tự động hóa vận hành**: Cập nhật rolling không có thời gian ngừng, HPA mở rộng quy mô elastic, probe phục hồi sự cố tự động
5. **Tách biệt cấu hình**: ConfigMap và Secret cho phép cấu hình tách biệt khỏi image

## Đọc thêm

- [Tài liệu chính thức Kubernetes](https://kubernetes.io/vi-vn/docs/) - Tài liệu tham khảo tiếng Việt đáng tin cậy nhất
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) - Xây dựng cluster K8s từ đầu
- [The Illustrated Children's Guide to Kubernetes](https://www.cncf.io/phippy/) - Hướng dẫn giới thiệu thú vị do CNCF sản xuất
- [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns-2nd/9781098131678/) - Mẫu thiết kế K8s
