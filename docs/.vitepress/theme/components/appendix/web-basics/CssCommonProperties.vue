<template>
  <div class="css-props-ref">
    <div class="intro">
      Thuộc tính CSS giống như "chỉ thị thi công" của đội thi công. Thường dùng thực ra chỉ có vài chục cái, đây là một "menu trang trí" cho bạn tham khảo:
    </div>

    <div class="categories">
      <div
        v-for="(cat, index) in categories"
        :key="index"
        class="category"
      >
        <div class="cat-title">
          {{ cat.title }}
        </div>
        <div class="props-grid">
          <div
            v-for="prop in cat.props"
            :key="prop.name"
            class="prop-item"
            :class="{ active: activeProp && activeProp.name === prop.name }"
            @click="activeProp = prop"
          >
            <div class="prop-name">
              {{ prop.name }}
            </div>
            <div class="prop-desc">
              {{ prop.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="activeProp"
      class="prop-detail"
    >
      <div class="detail-header">
        <span class="detail-name">{{ activeProp.name }}</span>
        <span class="detail-cat-badge">{{ activeProp.categoryLabel }}</span>
      </div>
      <div class="detail-desc">
        {{ activeProp.fullDesc }}
      </div>
      <div class="detail-code">
        <div class="code-label">
          Mã ví dụ:
        </div>
        <pre><code>{{ activeProp.example }}</code></pre>
      </div>
    </div>
    <div
      v-else
      class="prop-detail empty"
    >
      Nhấp vào thuộc tính phía trên để xem nó có thể làm gì 👆
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeProp = ref(null)

const categories = [
  {
    title: '📝 Chữ và bố cục',
    props: [
      {
        name: 'color',
        desc: 'Màu chữ',
        categoryLabel: 'Chữ',
        fullDesc:
          'Thay đổi màu chữ. Có thể dùng tên tiếng Anh (red), hệ thập lục phân (#ff0000) hoặc giá trị RGB.',
        example: 'color: #333333;'
      },
      {
        name: 'font-size',
        desc: 'Cỡ chữ',
        categoryLabel: 'Chữ',
        fullDesc: 'Đặt cỡ chữ. Đơn vị thường dùng là px (pixel) hoặc rem.',
        example: 'font-size: 16px;'
      },
      {
        name: 'font-weight',
        desc: 'Độ đậm chữ',
        categoryLabel: 'Chữ',
        fullDesc: 'Đặt độ đậm chữ. bold là in đậm, normal là bình thường.',
        example: 'font-weight: bold;'
      },
      {
        name: 'text-align',
        desc: 'Cách căn lề',
        categoryLabel: 'Bố cục',
        fullDesc:
          'Đặt cách căn ngang của chữ: căn trái (left), căn giữa (center), căn phải (right).',
        example: 'text-align: center;'
      },
      {
        name: 'line-height',
        desc: 'Chiều cao dòng',
        categoryLabel: 'Bố cục',
        fullDesc: 'Đặt khoảng cách giữa các dòng. Thường đặt khoảng 1.5 để đọc thoải mái hơn.',
        example: 'line-height: 1.5;'
      }
    ]
  },
  {
    title: '📦 Hộp và kích thước',
    props: [
      {
        name: 'width / height',
        desc: 'Rộng / Cao',
        categoryLabel: 'Kích thước',
        fullDesc: 'Đặt chiều rộng và chiều cao của phần tử.',
        example: 'width: 100px;\nheight: 50px;'
      },
      {
        name: 'padding',
        desc: 'Lề trong',
        categoryLabel: 'Khoảng cách',
        fullDesc:
          'Không gian bên trong hộp (khoảng cách từ nội dung đến viền). Giống như chèn xốp để làm phình hộp ra.',
        example: 'padding: 20px;'
      },
      {
        name: 'margin',
        desc: 'Lề ngoài',
        categoryLabel: 'Khoảng cách',
        fullDesc: 'Không gian bên ngoài hộp (khoảng cách giữa hộp và các phần tử khác).',
        example: 'margin: 20px;'
      },
      {
        name: 'background',
        desc: 'Nền',
        categoryLabel: 'Vẻ ngoài',
        fullDesc: 'Đặt màu nền hoặc ảnh nền.',
        example: 'background: #f0f0f0;'
      }
    ]
  },
  {
    title: '🎨 Viền và trang trí',
    props: [
      {
        name: 'border',
        desc: 'Viền',
        categoryLabel: 'Viền',
        fullDesc: 'Đặt độ dày, kiểu và màu sắc của viền.',
        example: 'border: 1px solid #ccc;'
      },
      {
        name: 'border-radius',
        desc: 'Bo góc',
        categoryLabel: 'Viền',
        fullDesc: 'Làm cho các góc của hộp tròn lại. Các nút bây giờ thường đều có chút bo góc.',
        example: 'border-radius: 6px;'
      },
      {
        name: 'box-shadow',
        desc: 'Bóng đổ',
        categoryLabel: 'Trang trí',
        fullDesc: 'Thêm hiệu ứng bóng đổ cho hộp, tăng cảm giác lập thể và độ sâu.',
        example: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);'
      },
      {
        name: 'opacity',
        desc: 'Độ mờ',
        categoryLabel: 'Trang trí',
        fullDesc: 'Đặt độ mờ của phần tử, 0 là trong suốt hoàn toàn (không nhìn thấy nhưng vẫn còn), 1 là không trong suốt.',
        example: 'opacity: 0.8;'
      }
    ]
  },
  {
    title: '📐 Bố trí và định vị',
    props: [
      {
        name: 'display',
        desc: 'Chế độ hiển thị',
        categoryLabel: 'Bố trí',
        fullDesc:
          'Quyết định cách hộp được đặt. block (chiếm trọn một hàng), flex (bố cục linh hoạt), none (ẩn).',
        example: 'display: flex;'
      },
      {
        name: 'position',
        desc: 'Cách định vị',
        categoryLabel: 'Định vị',
        fullDesc:
          'Quyết định cách định vị hộp. relative (tương đối), absolute (tuyệt đối), fixed (cố định trên màn hình).',
        example: 'position: absolute;\ntop: 0;\nleft: 0;'
      },
      {
        name: 'z-index',
        desc: 'Lớp xếp chồng',
        categoryLabel: 'Định vị',
        fullDesc: 'Quyết định ai chồng lên ai. Số càng lớn càng ở trên.',
        example: 'z-index: 100;'
      },
      {
        name: 'cursor',
        desc: 'Con trỏ chuột',
        categoryLabel: 'Tương tác',
        fullDesc: 'Khi rê chuột lên sẽ biến thành hình gì. pointer (bàn tay nhỏ), text (con trỏ nhập).',
        example: 'cursor: pointer;'
      }
    ]
  }
]
</script>

<style scoped>
.css-props-ref {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
}

.intro {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cat-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  border-left: 3px solid var(--vp-c-brand);
  padding-left: 8px;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.prop-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.prop-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.prop-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.prop-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 2px;
}

.prop-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.prop-detail {
  margin-top: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 16px;
  animation: fadeIn 0.3s ease;
}

.prop-detail.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
  border-style: dashed;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.detail-name {
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.detail-cat-badge {
  font-size: 11px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.detail-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 12px;
}

.detail-code {
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.code-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
  font-weight: 600;
}

pre {
  margin: 0;
  background: transparent !important;
  padding: 0 !important;
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
