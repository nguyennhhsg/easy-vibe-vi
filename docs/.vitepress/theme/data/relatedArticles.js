/**
 * Bảng ánh xạ "Bài viết liên quan" của tài liệu hướng dẫn:
 * - key: đường dẫn tương đối của tài liệu (không bao gồm /index.md)
 * - value: mảng các thẻ bài viết liên quan hiển thị ở cuối tài liệu
 * Trang chỉ đọc theo key và render, không lặp lại dữ liệu ánh xạ trong trang.
 */
export const relatedArticlesMap = {
  'vi-vn/stage-1/learning-map': [
    {
      href: '/vi-vn/stage-1/ai-capabilities-through-games/',
      title: '0.2 Hiểu giới hạn năng lực AI qua game nhỏ',
      description: 'Dùng cách game hoá để làm quen trước, nhanh chóng hiểu được vấn đề nào nên giao cho AI.',
      icon: '🎮'
    },
    {
      href: '/vi-vn/stage-1/finding-great-idea/',
      title: '1.0 Tìm được ý tưởng đáng làm',
      description: 'Biến ý tưởng mơ hồ thành hướng sản phẩm có thể kiểm chứng được.',
      icon: '💡'
    },
    {
      href: '/vi-vn/stage-1/building-prototype/',
      title: '1.2 Biến ý tưởng thành prototype tương tác được',
      description: 'Từ phân tích yêu cầu tới triển khai giao diện, hoàn thành Demo phiên bản đầu thật nhanh.',
      icon: '🧩'
    },
    {
      href: '/vi-vn/stage-2/frontend/lovart-assets/',
      title: '2.0 Xây dựng Agent tạo tài nguyên với NanoBanana',
      description: 'Bước vào giai đoạn thực chiến, học cách xây dựng quy trình sản xuất tài nguyên ổn định và tái sử dụng được.',
      icon: '🖼️'
    }
  ],
  'vi-vn/stage-1/ai-capabilities-through-games': [
    {
      href: '/vi-vn/stage-1/introduction-to-ai-ide/',
      title: 'Sơ cấp 2: Làm chủ công cụ lập trình AI',
      description: 'Nâng cấp từ chơi thử trên web lên AI IDE chạy local, thiết lập môi trường phát triển hoàn chỉnh.',
      icon: '💻'
    },
    {
      href: '/vi-vn/stage-1/finding-great-idea/',
      title: 'Sơ cấp: Tìm được ý tưởng hay',
      description: 'Từ biết dùng công cụ tiến tới chọn đúng hướng đi, xác định rõ vấn đề thực sự của người dùng.',
      icon: '💡'
    },
    {
      href: '/vi-vn/stage-1/learning-map/',
      title: 'Quay lại bản đồ học tập',
      description: 'Xem mục tiêu từng giai đoạn và thứ tự học được đề xuất theo lộ trình đầy đủ.',
      icon: '🗺️'
    }
  ],
  'vi-vn/stage-1/introduction-to-ai-ide': [
    {
      href: '/vi-vn/stage-1/building-prototype/',
      title: 'Sơ cấp 3: Bắt tay làm ra prototype',
      description: 'Từ biết dùng AI IDE tiến lên thực sự triển khai prototype nghiệp vụ.',
      icon: '🧩'
    },
    {
      href: '/vi-vn/stage-1/integrating-ai-capabilities/',
      title: 'Sơ cấp 4: Thêm năng lực AI cho prototype',
      description: 'Tích hợp API thật để biến trang web từ chỉ xem được thành dùng được.',
      icon: '🤖'
    },
    {
      href: '/vi-vn/stage-1/appendix-b-common-errors/',
      title: 'Phụ lục: Các lỗi thường gặp và cách xử lý',
      description: 'Khi gặp lỗi môi trường, dependency hay lúc chạy chương trình, nhanh chóng tìm ra nguyên nhân và sửa.',
      icon: '🛠️'
    }
  ],
  'vi-vn/stage-1/building-prototype': [
    {
      href: '/vi-vn/stage-1/integrating-ai-capabilities/',
      title: 'Sơ cấp 4: Thêm năng lực AI cho prototype',
      description: 'Nâng cấp prototype tĩnh thành ứng dụng có thể gọi tới mô hình AI thật.',
      icon: '🤖'
    },
    {
      href: '/vi-vn/stage-1/complete-project-practice/',
      title: 'Sơ cấp 5: Thực chiến dự án hoàn chỉnh',
      description: 'Bổ sung dữ liệu, tương tác và xử lý lỗi để hoàn thiện một dự án có thể demo được.',
      icon: '🚀'
    },
    {
      href: '/vi-vn/stage-2/frontend/figma-mastergo/',
      title: 'Nâng cao: Nhập môn Figma và MasterGo',
      description: 'Tiếp tục củng cố quy trình phối hợp từ thiết kế tới phát triển, đặt nền cho việc làm dự án bài bản.',
      icon: '🎨'
    }
  ],
  'vi-vn/stage-1/integrating-ai-capabilities': [
    {
      href: '/vi-vn/stage-1/complete-project-practice/',
      title: 'Sơ cấp 5: Thực chiến dự án hoàn chỉnh',
      description: 'Ghép các năng lực rời rạc thành luồng nghiệp vụ trọn vẹn, làm ra sản phẩm có thể trình diễn.',
      icon: '🧱'
    },
    {
      href: '/vi-vn/stage-2/frontend/lovart-assets/',
      title: 'Sơ trung cấp: Agent sản xuất tài nguyên',
      description: 'Bước vào quy trình phối hợp nhiều mô hình thực tế hơn, xây dựng hệ thống sinh tài nguyên có thể tái sử dụng.',
      icon: '🖼️'
    },
    {
      href: '/vi-vn/stage-2/backend/ai-interface-code/',
      title: 'Sơ trung cấp: Thiết kế và phát triển API backend',
      description: 'Tích hợp năng lực AI vào API backend một cách bài bản, nâng cao khả năng bảo trì của dự án.',
      icon: '🔌'
    }
  ],
  'vi-vn/stage-1/complete-project-practice': [
    {
      href: '/vi-vn/stage-2/frontend/lovart-assets/',
      title: 'Frontend sơ trung cấp: Agent sản xuất tài nguyên',
      description: 'Học quy trình sản xuất tài nguyên phức tạp với nhiều mô hình, nâng cao hiệu suất tạo tài sản hình ảnh.',
      icon: '🎯'
    },
    {
      href: '/vi-vn/stage-2/assignments/fullstack-app/',
      title: 'Stage 2 đồ án lớn: Thực chiến ứng dụng full-stack',
      description: 'Nâng cấp prototype thành ứng dụng frontend-backend hoàn chỉnh, sẵn sàng đưa lên production.',
      icon: '💻'
    },
    {
      href: '/vi-vn/stage-2/backend/database-supabase/',
      title: 'Backend sơ trung cấp: Từ database đến Supabase',
      description: 'Bổ sung khả năng mô hình hoá dữ liệu, lưu trữ và phân quyền, tiến tới phát triển bài bản.',
      icon: '🗄️'
    }
  ],
  'vi-vn/stage-2/frontend/lovart-assets': [
    {
      href: '/vi-vn/stage-2/frontend/figma-mastergo/',
      title: '2.1 Nhập môn Figma và MasterGo',
      description: 'Đưa tài nguyên vào file thiết kế, xây dựng cách biểu đạt có cấu trúc từ visual tới bố cục.',
      icon: '🎨'
    },
    {
      href: '/vi-vn/stage-2/frontend/ui-design/',
      title: '2.2 Xây dựng ứng dụng hiện đại đầu tiên - Thiết kế UI',
      description: 'Hoàn thành phân cấp trang, component và bố cục theo bộ quy chuẩn visual thống nhất.',
      icon: '🧱'
    },
    {
      href: '/vi-vn/stage-2/frontend/design-to-code/',
      title: '2.6 Từ thiết kế prototype tới code dự án',
      description: 'Chuyển file thiết kế thành code frontend và cấu trúc component chuẩn xác, dễ bảo trì.',
      icon: '💻'
    },
    {
      href: '/vi-vn/stage-2/frontend/modern-component-library/',
      title: '2.7 Dùng thư viện component hiện đại để nâng cấp giao diện',
      description: 'Tận dụng thư viện component để tăng hiệu suất và giữ tính nhất quán của giao diện ổn định hơn.',
      icon: '🧩'
    }
  ],
  'vi-vn/stage-2/frontend/figma-mastergo': [
    {
      href: '/vi-vn/stage-2/frontend/ui-design/',
      title: '2.2 Xây dựng ứng dụng hiện đại đầu tiên - Thiết kế UI',
      description: 'Tiếp tục hoàn thiện cấu trúc giao diện, phân cấp visual và các chi tiết tương tác.',
      icon: '🧱'
    },
    {
      href: '/vi-vn/stage-2/frontend/design-to-code/',
      title: '2.6 Từ thiết kế prototype tới code dự án',
      description: 'Chuyển file thiết kế thành code frontend dễ bảo trì một cách có hệ thống.',
      icon: '💻'
    },
    {
      href: '/vi-vn/stage-2/frontend/modern-component-library/',
      title: '2.7 Dùng thư viện component hiện đại để nâng cấp giao diện',
      description: 'Dùng thư viện component để thống nhất chuẩn UI và tăng hiệu suất phát triển trang.',
      icon: '🧩'
    }
  ]
}
