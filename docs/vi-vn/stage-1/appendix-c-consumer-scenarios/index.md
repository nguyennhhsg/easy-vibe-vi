---
title: 'Tham khảo cảm hứng cho các kịch bản tiêu dùng đầu cuối C'
description: 'Tài liệu này tổng hợp các hướng ứng dụng sáng tạo của các mô hình LLM lớn trong các kịch bản tiêu dùng đầu cuối C, bao gồm cảm hứng về lối sống, đồng hành cảm xúc, giải trí và thư giãn, phát triển cá nhân, tương tác xã hội, v.v., để cung cấp tham khảo cho các nhà phát triển ứng dụng AI hướng tới người tiêu dùng bình thường.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'khoảng <strong>4 giờ</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Nhóm chủ đề cho mỗi kịch bản - nhấn mạnh cảm giác, bầu không khí, gợi ý tâm lý
const topicPool = {
  'lifestyle': [
    { title: 'Trợ lý thức dậy nghi thức sáng', desc: 'Tạo ra kế hoạch nghi thức sáng riêng dựa trên thời tiết, lịch trình, tâm trạng, bắt đầu mỗi ngày từ điều đẹp đẽ' },
    { title: 'Nhà thiết kế bầu không khí sinh sống đơn độc', desc: 'Thiết kế kế hoạch bầu không khí nhà cửa cho những người sống một mình, khuyến nghị ghép nối thông minh về ánh sáng, âm nhạc, hương thơm' },
    { title: 'Công cụ tạo kế hoạch chữa lành cuối tuần ở nhà', desc: 'Dựa trên tâm trạng hiện tại đề xuất kết hợp hoàn hảo: phim + đồ ăn nhẹ + bố trí bầu không khí' },
    { title: 'Đài phát sóng an ủi tâm linh trước khi ngủ', desc: 'Tạo ra các câu chuyện nhẹ nhàng, hướng dẫn thiền định, đài phát sóng riêng tư đồng hành vào giấc ngủ' },
    { title: 'Người bắt giữ cảm hứng thẩm mỹ sống', desc: 'Khám phá vẻ đẹp từ những điều nhỏ hàng ngày, tạo ra khuyến nghị thẩm mỹ sống và hướng dẫn về cảm giác nghi thức' }
  ],
  'emotion': [
    { title: 'Người lắng nghe cây lỗ ban đêm khuya', desc: 'Thùng rác cảm xúc trực tuyến 24 giờ, tiếp nhận tất cả những phiền muộn mà không phán xét' },
    { title: 'Hướng dẫn chữa lành nỗi đau chia tay', desc: 'Cung cấp sự đồng hành nhẹ nhàng, khuyến nghị chữa lành và lối thoát cảm xúc trong giai đoạn thấp của nỗi đau chia tay' },
    { title: 'Huấn luyện viên hô hấp giảm lo lắng', desc: 'Cảm nhận cảm xúc lo lắng, hướng dẫn luyện tập hô hấp và thiền định chánh niệm' },
    { title: 'Cố vấn xây dựng lại sự tự tin', desc: 'Thông qua đối thoại tích cực và gợi ý tâm lý, giúp xây dựng lại tự nhận thức và cảm giác giá trị bản thân' },
    { title: 'Giải mã thông minh nhật ký cảm xúc', desc: 'Phân tích nhật ký cảm xúc, khám phá quy luật cảm xúc, đưa ra những hiểu biết ấm áp và khuyến nghị' }
  ],
  'entertainment': [
    { title: 'Người dẫn dắt kịch본 sát nhân nhập vai', desc: 'Đóng vai người dẫn dắt kịch bản sát nhân, tạo bầu không khí huyền bí, thúc đẩy phát triển cốt truyện' },
    { title: 'Linh hồn NPC thế giới mở', desc: 'NPC có máu có thịt, nhớ lại câu chuyện của người chơi, tạo ra những liên kết cảm xúc thực sự' },
    { title: 'Tạo nội dung podcast cá nhân hóa', desc: 'Tạo ra podcast độc quyền dựa trên sở thích, tự nhiên giống như trò chuyện với bạn bè' },
    { title: 'Nhóm bầu không khí buổi hòa nhạc ảo', desc: 'Tạo cảm giác trực tiếp cho buổi hòa nhạc trực tuyến, tương tác thời gian thực, ứng dụng, rendering bầu không khí' },
    { title: 'Đối tác đồng sáng tạo tiểu thuyết tương tác', desc: 'Đồng sáng tạo câu chuyện với độc giả, mỗi lựa chọn ảnh hưởng đến hướng đi của thế giới' }
  ],
  'growth': [
    { title: 'Nhân chứng phát triển cá nhân', desc: 'Ghi lại quỹ đạo phát triển, đánh dấu ở những nút giao thoa quan trọng với khuyến khích và xem xét lại' },
    { title: 'Huấn luyện viên hình trò chơi hóa thói quen', desc: 'Biến thói quen nhàm chán thành trò chơi phiêu lưu thú vị' },
    { title: 'Khớp nối bạn học kỹ năng', desc: 'Tìm những người học tập có cùng chí hướng, tương hỗ giám sát và chia sẻ tiến bộ' },
    { title: 'Người khám phá điều nhỏ chắc chắn hàng ngày', desc: 'Giúp khám phá những điều đẹp nhỏ bé trong đời sống, nuôi dưỡng tâm trạng biết ơn và tích cực' },
    { title: 'Bộ mô phỏng trải nghiệm nhân sinh', desc: 'Mô phỏng những lựa chọn nhân sinh khác nhau, trải nghiệm khả năng khác trong những không gian thời gian song song' }
  ],
  'social': [
    { title: 'Trình tạo chủ đề phá vỡ im lặng', desc: 'Cung cấp những chủ đề thú vị ở các dịp xã hội, làm tan chảy sự ngượng ngập, gần gũi khoảng cách' },
    { title: 'Nhà thiết kế bầu không khí văn bản bài viết bạn bè', desc: 'Dựa trên ảnh và tâm trạng, tạo ra những bài viết bài viết bạn bè có phong cách' },
    { title: 'Nhà hoạch định bầu không khí hẹn hò', desc: 'Thiết kế kế hoạch bầu không khí hoàn chỉnh cho cuộc hẹn, từ địa điểm đến chủ đề đến bất ngờ' },
    { title: 'Người tạo khí thế buổi tụ họp từ xa', desc: 'Tạo sôi động khí thế ở các buổi tụ họp trực tuyến, tổ chức trò chơi, hướng dẫn tương tác' },
    { title: 'Trợ lý quản lý năng lượng xã hội', desc: 'Giúp những người nhạy cảm quản lý năng lượng xã hội, tìm tốc độ xã hội thoải mái' }
  ],
  'creative': [
    { title: 'Gói cứu trợ khẩn cấp hết cảm hứng', desc: 'Cung cấp những tia cảm hứng bất ngờ trong những khoảnh khắc cảm hứng khô cằn' },
    { title: 'Hướng dẫn khám phá phong cách cá nhân', desc: 'Giúp khám phá phong cách cá nhân độc đáo, từ trang phục đến biểu hiện' },
    { title: 'Cố vấn thẩm mỹ sổ tay và nhật ký', desc: 'Cung cấp những khuyến nghị thẩm mỹ về bố trí sổ tay, phối màu, ý tưởng nội dung' },
    { title: 'Hướng dẫn bầu không khí thành phần chụp ảnh', desc: 'Dựa trên cảnh và cảm giác mong muốn, cung cấp khuyến nghị về chụp ảnh và chỉnh sửa' },
    { title: 'Người ghép nối cảm xúc và âm nhạc', desc: 'Dựa trên tâm trạng hiện tại và tình cảnh, đề xuất kết hợp âm nhạc hoàn hảo' }
  ],
  'travel': [
    { title: 'Hướng dẫn khám phá lãng mạn thành phố', desc: 'Khám phá thành phố như người dân địa phương, khám phá những địa điểm kho báu ẩn giấu' },
    { title: 'Tạo nhật ký cảm xúc du lịch', desc: 'Chuyển đổi ảnh du lịch và tâm trạng thành nhật ký tuyệt đẹp và kỷ niệm' },
    { title: 'Trợ lý đồng hành du lịch một mình', desc: 'Cung cấp đồng hành, khuyến nghị và cảm giác an toàn cho những người du lịch một mình' },
    { title: 'Xem trước bầu không khí địa điểm đích đến', desc: 'Trải nghiệm nhập vai bầu không khí địa điểm đích đến trước khi xuất phát, bước vào tình trạng sẵn sàng' },
    { title: 'Hướng dẫn bầu không khí chụp ảnh du lịch', desc: 'Dựa trên cảnh và ánh sáng, hướng dẫn chụp những bức ảnh du lịch có câu chuyện' }
  ],
  'health': [
    { title: 'Nhà thức dậy động lực luyện tập', desc: 'Khi không muốn chuyển động, đưa ra khuyến khích và động lực thích đáng' },
    { title: 'Nhà bếp cảm hứng ăn uống lành mạnh', desc: 'Dựa trên tâm trạng và nguyên liệu, tạo ra công thức nấu ăn lành mạnh chữa lành' },
    { title: 'Nhà thiết kế bầu không khí tối ưu hóa chất lượng giấc ngủ', desc: 'Từ môi trường đến tâm lý, tạo bầu không khí giấc ngủ chất lượng cao toàn diện' },
    { title: 'Hướng dẫn nhận thức cơ thể', desc: 'Hướng dẫn chú ý đến các tín hiệu cơ thể, thiết lập kết nối thân tâm' },
    { title: 'Trợ lý nhắc nhở tự chăm sóc bản thân', desc: 'Nhắc nhở bạn dừng lại trong sự bận rộn, chăm sóc bản thân' }
  ],
  'learning': [
    { title: 'Hướng dẫn hình trò chơi hóa khám phá kiến thức', desc: 'Biến việc học kiến thức nhàm chán thành phiêu lưu khám phá thú vị' },
    { title: 'Bạn tình cảnh học ngôn ngữ', desc: 'Đóng vai các nhân vật khác nhau, tự nhiên học được ngôn ngữ trong các tình huống đối thoại' },
    { title: 'Trợ lý thỏa mãn sự tò mò', desc: 'Trả lời mọi ý tưởng kỳ quặc, thỏa mãn sự tò mò về thế giới' },
    { title: 'Kích hoạt cảm hứng ghi chú đọc sách', desc: 'Giúp tổ chức cảm xúc đọc sách, khám phá các góc độ tư duy mới' },
    { title: 'Tạo bầu không khí chia sẻ kiến thức', desc: 'Chuyển đổi kiến thức học được thành nội dung chia sẻ thú vị' }
  ],
  'relationship': [
    { title: 'Huấn luyện viên giao tiếp mối quan hệ thân mật', desc: 'Giúp diễn đạt những cảm xúc khó nói, cải thiện mối quan hệ thân mật' },
    { title: 'Trợ lý nhắc nhở quan tâm gia đình', desc: 'Nhắc nhở bạn quan tâm gia đình, cung cấp những khuyến nghị tương tác ấm áp' },
    { title: 'Nhà thiết kế bầu không khí bảo trì tình bạn', desc: 'Giúp bảo trì tình bạn khoảng cách xa, tạo chủ đề chung' },
    { title: 'Nhà hoạch định tỏ tình và bất ngờ', desc: 'Hoạch định những bất ngờ khó quên và những khoảnh khắc lãng mạn cho người quan trọng' },
    { title: 'Hướng dẫn bầu không khí hòa giải xung đột', desc: 'Khi mối quan hệ căng thẳng, cung cấp những khuyến nghị và cách nói để hòa giải bầu không khí' }
  ],
  'pet': [
    { title: 'Nhật ký nhân cách hóa thú cưng', desc: 'Tạo ra nhật ký từ góc độ thú cưng, ghi lại những ngày thường ấm áp cùng chủ nhân' },
    { title: 'Nhà giải mã hành vi thú cưng', desc: 'Giải mã ngôn ngữ hành vi thú cưng, tăng cường kết nối với thú cưng' },
    { title: 'Hoạch định thời gian đồng hành thú cưng', desc: 'Thiết kế những hoạt động tương tác sáng tạo cùng thú cưng, tăng tình cảm' },
    { title: 'Tạo câu chuyện kỷ niệm thú cưng', desc: 'Chuyển đổi ảnh và kỷ niệm thú cưng thành những câu chuyện ấm áp' },
    { title: 'Hướng dẫn an tâm cho chủ nhân thú cưng mới', desc: 'Cung cấp sự đồng hành ấm áp và hướng dẫn cho những chủ nhân thú cưng mới' }
  ],
  'finance': [
    { title: 'Trợ lý nhận thức cảm xúc chi tiêu', desc: 'Nhận thức được cảm xúc đằng sau chi tiêu xung động, thiết lập quan điểm chi tiêu lành mạnh' },
    { title: 'Kích hoạt tính cấp tiến hóa mục tiêu tiết kiệm', desc: 'Chuyển đổi mục tiêu tiết kiệm thành mơ ước tiến độ có thể hình dung' },
    { title: 'Học kiến thức tài chính dễ dàng', desc: 'Học kiến thức tài chính theo cách dễ dàng và thú vị' },
    { title: 'Nhà thuyên giảm lo lắng tài chính', desc: 'Khi đối mặt với áp lực tài chính, cung cấp hỗ trợ cảm xúc và những khuyến nghị thực tế' },
    { title: 'Trò chơi trải nghiệm đầu tư nhỏ', desc: 'Thông qua cách hình trò chơi, trải nghiệm đầu tư, giảm bớt rào cản nhập cảnh' }
  ],
  'career': [
    { title: 'Người đồng hành hoang mang nghề nghiệp', desc: 'Cung cấp lắng nghe, khám phá và lời khuyên hướng dẫn trong giai đoạn hoang mang nghề nghiệp' },
    { title: 'Nhà thức dậy cảm giác thành tựu công việc', desc: 'Giúp khám phá giá trị và ý nghĩa trong công việc, tái kích hoạt đam mê' },
    { title: 'Trợ lý bầu không khí xã hội thương mại', desc: 'Cung cấp những chủ đề xã hội nhẹ nhàng và khuyến nghị tương tác' },
    { title: 'Kích hoạt cảm hứng kinh doanh phụ', desc: 'Dựa trên sở thích và kỹ năng cá nhân, kích hoạt ý tưởng kinh doanh phụ' },
    { title: 'Trạm gia tăng tự tin trước phỏng vấn', desc: 'Cung cấp xây dựng tâm lý và khuyến khích sự tự tin trước phỏng vấn' }
  ],
  'home': [
    { title: 'Nhà thiết kế bầu không khí không gian nhà', desc: 'Dựa trên tâm trạng và mùa, thiết kế kế hoạch bầu không khí nhà' },
    { title: 'Hướng dẫn thay đổi nội thất theo bốn mùa', desc: 'Thay đổi trang trí nhà theo mùa, duy trì cảm giác mới mẻ' },
    { title: 'Phép thuật không gian nhỏ', desc: 'Để cho không gian nhỏ cũng có bầu không khí thoải mái ấm áp' },
    { title: 'Người tạo cảm giác nghi thức sinh sống', desc: 'Tạo cảm giác nghi thức cho các hoạt động sinh sống hàng ngày' },
    { title: 'Đồng hành tâm lý xả bỏ không cần thiết', desc: 'Cung cấp hỗ trợ tâm lý khi sắp xếp đồ vật, kiến nghị quyết định' }
  ],
  'food': [
    { title: 'Nấu ăn chữa lành cho một người', desc: 'Thiết kế kế hoạch nấu ăn đơn giản chữa lành cho những người sống một mình' },
    { title: 'Thiết kế bầu không khí bàn ăn ngày lễ', desc: 'Thiết kế bố trí bàn ăn có cảm giác nghi thức cho những ngày đặc biệt' },
    { title: 'Người ghép nối cảm xúc và nấu ăn', desc: 'Dựa trên tâm trạng hiện tại đề xuất thực phẩm và cách nấu thích hợp' },
    { title: 'Xây dựng sự tự tin cho tân binh nhà bếp', desc: 'Cung cấp khuyến khích ấm áp và công thức nấu ăn đơn giản cho những người nấu ăn không kinh nghiệm' },
    { title: 'Hướng dẫn bầu không khí chụp ảnh thực phẩm', desc: 'Giúp những món ăn bình thường cũng chụp được bầu không khí hấp dẫn' }
  ],
  'fashion': [
    { title: 'Bảng tâm trạng trang phục ngày hôm nay', desc: 'Tạo ra cảm hứng trang phục dựa trên thời tiết, dịp, tâm trạng' },
    { title: 'Nhà ghép nối tủ quần áo viên', desc: 'Tạo ra khả năng ghép nối vô hạn từ những lựa chọn hạn chế' },
    { title: 'Hành trình khám phá phong cách cá nhân', desc: 'Giúp khám phá và xây dựng phong cách cá nhân độc đáo' },
    { title: 'Nhà thiết kế sáng tạo mặc lại quần áo cũ', desc: 'Cung cấp ý tưởng ghép nối mới cho quần áo cũ' },
    { title: 'Cố vấn tạo hình cho dịp đặc biệt', desc: 'Thiết kế tạo hình tự tin cho những dịp quan trọng' }
  ]
}

// Bảng ánh xạ liên kết khuyến nghị được xác định trước - dựa trên bầu không khí và cảm giác
const recommendationMap = {
  // Điểm bầu không khí: hệ thống chữa lành
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Điểm bầu không khí: hệ thống phát triển
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Điểm bầu không khí: hệ thống xã hội
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  // Điểm bầu không khí: hệ thống khám phá
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Điểm bầu không khí: hệ thống hàng ngày
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Hệ thống chữa lành', value: 'healing', desc: 'Ấm áp, an ủi, chữa lành' },
  { label: 'Hệ thống phát triển', value: 'growth', desc: 'Tiến bộ, phá vỡ, lột xác' },
  { label: 'Hệ thống xã hội', value: 'social', desc: 'Kết nối, chia sẻ, tương tác' },
  { label: 'Hệ thống khám phá', value: 'explore', desc: 'Tò mò, phiêu lưu, khám phá' },
  { label: 'Hệ thống hàng ngày', value: 'daily', desc: 'Bình thường, thực tế, hiện tại' }
]

const feelingOptions = [
  { label: 'Muốn thư giãn', value: 'relax', desc: 'Giảm bớt áp lực, thư thả bản thân' },
  { label: 'Tìm kiếm cảm hứng', value: 'inspire', desc: 'Kích hoạt sáng tạo, nhận được khởi hành' },
  { label: 'Khát vọng kết nối', value: 'connect', desc: 'Kết nối với con người, cảm xúc cộng rung' },
  { label: 'Tạm thời thoát ra', value: 'escape', desc: 'Thoát khỏi thực tế, trải nghiệm thôi miên' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Lối sống', anchor: '#_1-lối-sống' },
  { key: 'emotion', name: 'Đồng hành cảm xúc', anchor: '#_2-đồng-hành-cảm-xúc' },
  { key: 'entertainment', name: 'Giải trí và thư giãn', anchor: '#_3-giải-trí-và-thư-giãn' },
  { key: 'growth', name: 'Phát triển cá nhân', anchor: '#_4-phát-triển-cá-nhân' },
  { key: 'social', name: 'Tương tác xã hội', anchor: '#_5-tương-tác-xã-hội' },
  { key: 'creative', name: 'Biểu hiện sáng tạo', anchor: '#_6-biểu-hiện-sáng-tạo' },
  { key: 'travel', name: 'Khám phá du lịch', anchor: '#_7-khám-phá-du-lịch' },
  { key: 'health', name: 'Sức khỏe thân tâm', anchor: '#_8-sức-khỏe-thân-tâm' },
  { key: 'learning', name: 'Khám phá kiến thức', anchor: '#_9-khám-phá-kiến-thức' },
  { key: 'relationship', name: 'Kinh doanh quan hệ', anchor: '#_10-kinh-doanh-quan-hệ' },
  { key: 'pet', name: 'Đồng hành thú cưng', anchor: '#_11-đồng-hành-thú-cưng' },
  { key: 'finance', name: 'Sức khỏe tài chính', anchor: '#_12-sức-khỏe-tài-chính' },
  { key: 'career', name: 'Phát triển nghề nghiệp', anchor: '#_13-phát-triển-nghề-nghiệp' },
  { key: 'home', name: 'Không gian nhà cửa', anchor: '#_14-không-gian-nhà-cửa' },
  { key: 'food', name: 'Nấu ăn và thực phẩm', anchor: '#_15-nấu-ăn-và-thực-phẩm' },
  { key: 'fashion', name: 'Phong cách trang phục', anchor: '#_16-phong-cách-trang-phục' }
]

// Tính toán kết quả khuyến nghị - trích xuất ngẫu nhiên từ nhóm chủ đề
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []
  
  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []
  
  // Trích xuất ngẫu nhiên 1-2 chủ đề từ mỗi kịch bản được khuyến nghị
  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []
    
    if (scenario && scenarioTopics.length > 0) {
      // Trích xuất ngẫu nhiên 1-2 chủ đề
      const count = Math.floor(Math.random() * 2) + 1
      const shuffled = [...scenarioTopics].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))
      
      selected.forEach(topic => {
        topics.push({
          ...topic,
          scenarioKey: key,
          scenarioName: scenario.name,
          scenarioAnchor: scenario.anchor
        })
      })
    }
  })
  
  // Xáo trộn ngẫu nhiên và giới hạn tổng số
  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

// Nhận được mô tả lựa chọn hiện tại
const currentSelection = computed(() => {
  const vibe = vibeOptions.find(i => i.value === vibePoint.value)
  const feel = feelingOptions.find(p => p.value === feeling.value)
  return {
    vibe: vibe?.label || '',
    feeling: feel?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  // Trễ cuộn để đảm bảo cập nhật DOM hoàn tất
  setTimeout(() => {
    // Cố gắng tìm kiếm thông qua ID (hỗ trợ nhiều định dạng)
    let element = document.querySelector(anchor)
    
    // Nếu không tìm thấy, hãy thử các định dạng ID có thể
    if (!element) {
      // Thử loại bỏ tiền tố gạch dưới
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }
    
    // Nếu vẫn không tìm thấy, hãy tìm kiếm thông qua văn bản tiêu đề
    if (!element) {
      // Trích xuất tên kịch bản từ mỏ neo
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')
      
      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        // Khớp hoàn toàn hoặc khớp chứa
        const cleanHeading = headingText.replace(/^\d+\.\s*/, '')
        if (cleanHeading === anchorText || headingText.includes(anchorText)) {
          element = heading
          break
        }
      }
    }
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // Làm nổi bật hiển thị đoạn mục tiêu
      element.style.backgroundColor = '#fdf2f8'
      element.style.transition = 'background-color 0.3s'
      element.style.padding = '8px'
      element.style.borderRadius = '4px'
      setTimeout(() => {
        element.style.backgroundColor = ''
        element.style.padding = ''
      }, 2000)
    }
  }, 100)
}

const resetSelection = () => {
  vibePoint.value = ''
  feeling.value = ''
}
</script>

# Tham khảo cảm hứng cho các kịch bản tiêu dùng đầu cuối C

## Hướng dẫn chương

<ChapterIntroduction :duration="duration" :tags="['Ứng dụng đầu cuối C', 'Lối sống', 'Trải nghiệm cảm xúc', 'Bầu không khí']" coreOutput="Khám phá 15+ cảm hứng kịch bản sống" expectedOutput="Tìm thấy hướng sản phẩm chạm động người dùng">

Tài liệu này tổng hợp <strong>các hướng ứng dụng sáng tạo của các mô hình LLM lớn trong các kịch bản tiêu dùng đầu cuối C</strong>. Khác với đầu cuối B tập trung vào hiệu quả và nỗi đau, sản phẩm đầu cuối C chú ý hơn đến <strong>tạo bầu không khí, gợi ý tâm lý</strong>, giúp người dùng nhận được sự cộng rung cảm xúc và trải nghiệm đẹp đẽ.

</ChapterIntroduction>

## Lựa chọn nhanh bầu không khí kịch bản

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Tìm thấy cảm hứng kịch bản chạm động bạn</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Chọn bầu không khí bạn muốn và cảm giác lúc này, hệ thống sẽ khuyến nghị hướng kịch bản liên quan, nhấp vào nhãn để chuyển đến chương tương ứng.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="vibePoint" placeholder="Chọn loại bầu không khí" style="width: 100%;">
        <el-option
          v-for="item in vibeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="feeling" placeholder="Chọn cảm giác lúc này" style="width: 100%;">
        <el-option
          v-for="item in feelingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  
  <div v-if="recommendationTopics.length > 0" style="margin-top: 16px;">
    <div style="font-weight: 600; margin-bottom: 12px; color: #ec4899;">
      Khuyến nghị cho bạn {{ currentSelection.vibe }} × {{ currentSelection.feeling }} kịch bản:
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <el-tag
        v-for="topic in recommendationTopics"
        :key="topic.title"
        type="danger"
        effect="light"
        style="cursor: pointer; margin-bottom: 4px;"
        @click="scrollToAnchor(topic.scenarioAnchor)"
      >
        {{ topic.title }}
      </el-tag>
    </div>
    <el-button type="text" size="small" @click="resetSelection" style="margin-top: 8px;">
      Lựa chọn lại
    </el-button>
  </div>
</el-card>

---

## 1. Lối sống

> 💡 **Ý tưởng cốt lõi**：Làm cho những ngày thường trở nên có cảm giác nghi thức, tạo ra những điều đẹp đẽ trong chi tiết

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Trợ lý thức dậy nghi thức sáng | Tích hợp API thời tiết, dữ liệu lịch, LLM tạo ra kế hoạch sáng cá nhân hóa; kết hợp loa thông minh phát nhạc tùy chỉnh, ánh sáng thông minh tăng dần |
| 2 | Nhà thiết kế bầu không khí sinh sống đơn độc | Kết nối thiết bị nhà thông minh (đèn, loa, máy phun hương), LLM tự động điều chỉnh tham số dựa trên thời gian/tâm trạng; tìm hiểu sở thích người dùng, liên tục tối ưu hóa |
| 3 | Công cụ tạo kế hoạch chữa lành cuối tuần ở nhà | Kết nối API nền tảng phát trực tuyến để lấy danh sách phim, kết hợp sở thích lịch sử người dùng tạo ra kế hoạch kết hợp phim + thực phẩm + bố trí |
| 4 | Đài phát sóng an ủi tâm linh trước khi ngủ | Tổng hợp TTS tạo ra câu chuyện nhẹ nhàng, thuật toán trộn tiếng ồn trắng, âm lượng thông minh giảm dần; điều chỉnh nội dung dựa trên dữ liệu giấc ngủ |
| 5 | Người bắt giữ cảm hứng thẩm mỹ sống | Nhận dạng hình ảnh phân tích ảnh môi trường người dùng, LLM tạo ra khuyến nghị thẩm mỹ; khuyến nghị nội dung Pinterest/Xiaohongshu |

---

## 2. Đồng hành cảm xúc

> 💡 **Ý tưởng cốt lõi**：Sự chấp nhận vô điều kiện và đồng hành, trở thành vùng chứa ấm áp cho cảm xúc

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Người lắng nghe cây lỗ ban đêm khuya | Mã hóa đầu cuối tương đối để đảm bảo quyền riêng tư, phân tích cảm xúc LLM hiểu cảm xúc, lưu trữ bộ nhớ dài hạn câu chuyện người dùng, đối thoại nhiều vòng đồng hành liên tục |
| 2 | Hướng dẫn chữa lành nỗi đau chia tay | Thuật toán nhận dạng giai đoạn cảm xúc, hỗ trợ từng giai đoạn khác nhau (giai đoạn tâm sự → giai đoạn xả bỏ → giai đoạn xây dựng lại); kiến thức tâm lý RAG truy tìm |
| 3 | Huấn luyện viên hô hấp giảm lo lắng | Dữ liệu cảm biến sinh học kết nối (nhịp tim/hô hấp), giám sát lo lắng thời gian thực; hướng dẫn giọng nói theo nhịp hô hấp, hướng dẫn thư giãn cơ tiến triển |
| 4 | Cố vấn xây dựng lại sự tự tin | Khung đối thoại tâm lý tích cực, ghi lại và phản hồi những thành tựu nhỏ của người dùng; kỹ thuật cấu trúc lại nhận thức giúp thay đổi đối thoại tự ta tiêu cực |
| 5 | Giải mã thông minh nhật ký cảm xúc | Mô hình NLP nhận dạng cảm xúc, phân tích chuỗi thời gian khám phá quy luật cảm xúc; bản đồ cảm xúc có thể hình dung, cảnh báo cảm xúc dự đoán |

---

## 3. Giải trí và thư giãn

> 💡 **Ý tưởng cốt lõi**：Tạo ra trải nghiệm thôi miên, để giải trí trở thành nơi ở của tâm hồn

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Người dẫn dắt kịch bản sát nhân nhập vai | LLM tạo nhánh cốt truyện thời gian thực, tổng hợp giọng nói để đóng vai NPC, điều chỉnh độ khó và nhịp động dựa trên phản ứng người chơi; rendering cảnh AR/VR |
| 2 | Linh hồn NPC thế giới mở | Cơ sở dữ liệu bộ nhớ dài hạn lưu trữ lịch sử tương tác người chơi, LLM tạo ra đối thoại cá nhân hóa; tính toán cảm xúc khiến NPC có phản ứng cảm xúc thực sự |
| 3 | Tạo nội dung podcast cá nhân hóa | Tạo ra nội dung độc quyền dựa trên biểu đồ sở thích người dùng, sao chép TTS âm thanh người dùng thích; tương tác thời gian thực trả lời câu hỏi của người nghe |
| 4 | Nhóm bầu không khí buổi hòa nhạc ảo | Rendering hình ảnh ảo, tương tác lùm xùm thời gian thực, các lựa chọn đèn tín hiệu ảo/ứng dụng; công nghệ âm thanh không gian tạo cảm giác trực tiếp |
| 5 | Đối tác đồng sáng tạo tiểu thuyết tương tác | LLM tạo ra cốt truyện thời gian thực, lựa chọn người dùng ảnh hưởng đến hướng đi của câu chuyện; thiết kế nhiều kết thúc, mối quan hệ nhân vật phát triển động |

---

## 4. Phát triển cá nhân

> 💡 **Ý tưởng cốt lõi**：Phát triển không phải là khổ hành, mà là một hành trình tự khám phá thú vị

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Nhân chứng phát triển cá nhân | Hiển thị dòng thời gian trực quan quỹ đạo phát triển, đánh dấu tự động ở các cột mốc; so sánh hình ảnh "tôi quá khứ" vs "tôi hiện tại" |
| 2 | Huấn luyện viên hình trò chơi hóa thói quen | Cơ chế hình trò chơi (điểm kinh nghiệm, cấp độ, huy hiệu), bảng xếp hạng xã hội, AI nhân vật huấn luyện viên (như "hướng dẫn phiêu lưu") |
| 3 | Khớp nối bạn học kỹ năng | Thuật toán khớp nối dựa trên sở thích và mục tiêu học tập, cộng đồng nhóm học tập, cơ chế giám sát công kích chung |
| 4 | Người khám phá điều nhỏ chắc chắn hàng ngày | Nhận dạng hình ảnh khám phá những khoảnh khắc đẹp trong cuộc sống, hướng dẫn nhật ký biết ơn, xem xét lại khoảnh khắc đẹp hàng tuần |
| 5 | Bộ mô phỏng trải nghiệm nhân sinh | Mô phỏng đa nhánh cốt truyện lựa chọn khác nhau kết quả, so sánh nhân sinh song song; trình bày hậu quả quyết định có thể hình dung |

---

## 5. Tương tác xã hội

> 💡 **Ý tưởng cốt lõi**：Làm cho xã hội trở nên nhẹ nhàng tự nhiên, tìm thấy cách kết nối thoải mái

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Trình tạo chủ đề phá vỡ im lặng | Khuyến nghị chủ đề thông minh dựa trên dịp và người tham gia, phân tích đối thoại thời gian thực đề xuất tiếp tục chủ đề; gợi ý cứu vãn lúc ngượng ngập |
| 2 | Nhà thiết kế bầu không khí văn bản bài viết bạn bè | Phân tích nội dung hình ảnh, LLM tạo ra nhiều bài viết kiểu (văn chương/hài hước/sâu sắc); khuyến nghị emoji và bố trí thông minh |
| 3 | Nhà hoạch định bầu không khí hẹn hò | Tạo ra kế hoạch hẹn hò dựa trên sở thích lẫn nhau, khuyến nghị nhà hàng/hoạt động, khuyến nghị chủ đề đối thoại; nhắc nhở thời tiết và giao thông thời gian thực |
| 4 | Người tạo khí thế buổi tụ họp từ xa | Thư viện trò chơi trực tuyến, trình tạo hoạt động phá vỡ im lắng, cái bánh xe chủ đề; nền tảng ảo và bộ lọc tăng cường bầu không khí |
| 5 | Trợ lý quản lý năng lượng xã hội | Đánh giá tiêu thụ năng lượng sau hoạt động xã hội, khuyến nghị hồi phục (khuyến nghị hoạt động độc lập); lịch xã hội quy hoạch thông minh |

---

## 6. Biểu hiện sáng tạo

> 💡 **Ý tưởng cốt lõi**：Mỗi người đều có sáng tạo, chỉ cần được thức dậy

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Gói cứu trợ khẩn cấp hết cảm hứng | Thuật toán liên tưởng xuyên lĩnh vực, tạo từ kích thích ngẫu nhiên, thư viện prompt sáng tạo; công cụ phát tán cảm hứng kiểu não |
| 2 | Hướng dẫn khám phá phong cách cá nhân | Phân tích hình ảnh nhận dạng phong cách hiện tại người dùng, khuyến nghị xu hướng phong cách, thử quần áo/thử trang điểm ảo; dòng thời gian tiến hóa phong cách |
| 3 | Cố vấn thẩm mỹ sổ tay và nhật ký | Khuyến nghị mẫu bố trí, tạo ra lược đồ màu, khuyến nghị yếu tố trang trí; nhận dạng cơ thể chữ viết tay và làm đẹp nội dung |
| 4 | Hướng dẫn bầu không khí thành phần chụp ảnh | Nhận dạng cảnh và khuyến nghị thành phần, khuyến nghị phong cách bộ lọc, điều chỉnh tham số sửa chữa thông minh; con đường học kỹ năng chụp ảnh |
| 5 | Người ghép nối cảm xúc và âm nhạc | Thuật toán phân tích cảm xúc âm nhạc, nhận dạng tâm trạng người dùng, tạo ra danh sách phát cá nhân hóa; câu chuyện âm nhạc và giới thiệu nền |

---

## 7. Khám phá du lịch

> 💡 **Ý tưởng cốt lõi**：Du lịch không chỉ là ngắm cảnh, mà còn là cảm nhận những cách sống khác

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Hướng dẫn khám phá lãng mạn thành phố | Tập hợp nội dung chuyên gia địa phương, khuyến nghị địa điểm nhỏ lẻ, hướng dẫn AR; dịch thời gian thực và giải thích giọng nói |
| 2 | Tạo nhật ký cảm xúc du lịch | Phân loại và tuyển chọn ảnh tự động, LLM tạo ra nhật ký đẹp, đánh dấu vị trí địa lý dòng thời gian; tạo video du lịch một lần |
| 3 | Trợ lý đồng hành du lịch một mình | Chia sẻ vị trí thời gian thực và nhắc nhở an toàn, liên hệ khẩn cấp địa phương, hướng dẫn giọng nói AI đi kèm; cộng đồng trao đổi một mình du lịch |
| 4 | Xem trước bầu không khí địa điểm đích đến | Xem trước panorama toàn cảnh 360°, mô phỏng âm thanh và mùi địa phương, giới thiệu nền văn hóa; trải nghiệm "thử lưu trú" ảo |
| 5 | Hướng dẫn bầu không khí chụp ảnh du lịch | Nhắc nhở giờ vàng, dòng trợ giúp thành phần, khuyến nghị điểm chụp ảnh đặc sắc địa phương; đề xuất phong cách hậu xử lý |

---

## 8. Sức khỏe thân tâm

> 💡 **Ý tưởng cốt lõi**：Sức khỏe không phải mục tiêu, mà là một cách tự chăm sóc nhẹ nhàng

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Nhà thức dậy động lực luyện tập | Khuyến nghị loại luyện tập thông minh dựa trên trạng thái người dùng, tùy chọn vi luyện tập (5 phút), thách thức luyện tập hình trò chơi; công khai luyện tập xã hội |
| 2 | Nhà bếp cảm hứng ăn uống lành mạnh | Nhận dạng thực phẩm tủ lạnh, khuyến nghị công thức cá nhân hóa, phân tích ghép nối dinh dưỡng; hướng dẫn nấu ăn từng bước |
| 3 | Nhà thiết kế bầu không khí tối ưu hóa chất lượng giấc ngủ | Phân tích dữ liệu giám sát giấc ngủ, tạo ra nghi thức trước ngủ, khuyến nghị tối ưu hóa môi trường (nhiệt độ/độ ẩm/ánh sáng); thức dậy thông minh |
| 4 | Hướng dẫn nhận thức cơ thể | Hướng dẫn quét cơ thể thiền định, liên kết cảm xúc bộ phận cơ thể, luyện tập kết nối thân tâm; phản hồi sinh học có thể hình dung |
| 5 | Trợ lý nhắc nhở tự chăm sóc bản thân | Giám sát cường độ công việc, nhắc nhở định kỳ nghỉ ngơi, khuyến nghị hoạt động vi chăm sóc (uống nước/giãn cơ/hô hấp sâu); ghi chép tự chăm sóc |

---

## 9. Khám phá kiến thức

> 💡 **Ý tưởng cốt lõi**：Học tập là một cuộc phiêu lưu vô tận, sự tò mò là cô giáo tốt nhất

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Hướng dẫn hình trò chơi hóa khám phá kiến thức | Bản đồ điểm kiến thức có thể hình dung, con đường học tập kiểu vượt qua, hệ thống huy hiệu thành tựu; AI giáo viên nhân vật đóng vai |
| 2 | Bạn tình cảnh học ngôn ngữ | LLM đóng vai các nhân vật khác nhau để tiến hành đối thoại, sửa phát âm, giới thiệu nền văn hóa; mô phỏng tình huống nhập vai |
| 3 | Trợ lý thỏa mãn sự tò mò | Kết nối Wikipedia/biểu đồ kiến thức, giải thích khái niệm phức tạp theo cách dễ hiểu, khuyến nghị kiến thức liên quan; ghi chép sự tò mò |
| 4 | Kích hoạt cảm hứng ghi chú đọc sách | Phân tích nội dung sách, trích xuất góc nhìn và liên kết, khuyến nghị góc độ tư duy; mẫu ghi chú đọc sách và làm đẹp |
| 5 | Tạo bầu không khí chia sẻ kiến thức | Tự động tạo thẻ kiến thức, tối ưu hóa văn bản chia sẻ, làm đẹp trực quan; phản hồi dữ liệu chia sẻ xã hội |

---

## 10. Kinh doanh quan hệ

> 💡 **Ý tưởng cốt lõi**：Những mối quan hệ tốt cần được chăm sóc, chăm sóc không cần phức tạp

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Huấn luyện viên giao tiếp mối quan hệ thân mật | Tạo ra mẫu biểu hiện cảm xúc, hướng dẫn kỹ thuật giao tiếp không bạo lực, cách nói hòa giải xung đột; đánh giá sức khỏe mối quan hệ |
| 2 | Trợ lý nhắc nhở quan tâm gia đình | Nhắc nhở ngày quan trọng (sinh nhật/ngày kỷ niệm), khuyến nghị từ ngữ chăm sóc, khuyến nghị hoạt động gia đình; tạo ra bộ sưu tập ảnh gia đình |
| 3 | Nhà thiết kế bầu không khí bảo trì tình bạn | Ghi chép tương tác bạn bè, khuyến nghị chủ đề chung, tổ chức tụ họp từ xa; tạo dòng thời gian tình bạn và tạo kỷ niệm |
| 4 | Nhà hoạch định tỏ tình và bất ngờ | Tạo ra kế hoạch bất ngờ cá nhân hóa, khuyến nghị quà tặng, khuyến nghị cách nói lãng mạn; biểu đạt thời gian biểu và nhắc nhở |
| 5 | Hướng dẫn bầu không khí hòa giải xung đột | Từ ngữ hạ nhiệt cảm xúc, hướng dẫn suy nghĩ thay thế, khuyến nghị bước hòa giải; theo dõi sửa chữa quan hệ |

---

## 11. Đồng hành thú cưng

> 💡 **Ý tưởng cốt lõi**：Thú cưng là gia đình, sự đồng hành của chúng xứng đáng được ghi lại và trân quý

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Nhật ký nhân cách hóa thú cưng | Phân tích hành vi thú cưng, tạo ra nhật ký ngôi thứ nhất, ảnh tự động ghép nối; "bài viết bạn bè" thú cưng |
| 2 | Nhà giải mã hành vi thú cưng | Phân tích video hành vi thú cưng, cảnh báo sức khỏe, khuyến nghị huấn luyện; cơ sở dữ liệu kiến thức đặc điểm giống |
| 3 | Hoạch định thời gian đồng hành thú cưng | Khuyến nghị hoạt động thú cưng, hướng dẫn DIY đồ chơi, khuyến nghị địa điểm thân thiện thú cưng; khớp nối xã hội thú cưng |
| 4 | Tạo câu chuyện kỷ niệm thú cưng | Tuyển chọn ảnh và video, tạo ra câu chuyện dòng thời gian, ghép nối âm nhạc; tự động tạo bộ sưu tập/video kỷ niệm |
| 5 | Hướng dẫn an tâm cho chủ nhân thú cưng mới | Hướng dẫn chăm sóc từng giai đoạn, giải đáp các câu hỏi thường gặp, xử lý tình huống khẩn cấp; hỗ trợ cộng đồng người mới |

---

## 12. Sức khỏe tài chính

> 💡 **Ý tưởng cốt lõi**：Tự do tài chính không phải mục tiêu, sức khỏe tài chính mới là

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Trợ lý nhận thức cảm xúc chi tiêu | Phân tích ghi chép chi tiêu, phân tích liên kết cảm xúc-chi tiêu, cảnh báo chi tiêu xung động; khuyến nghị thỏa mãn thay thế |
| 2 | Kích hoạt tính cấp tiến hóa mục tiêu tiết kiệm | Có thể hình dung tiến độ mục tiêu, rendering cảnh mơ ước, kỷ niệm cột mốc; trò chơi hình thói quen tiết kiệm |
| 3 | Học kiến thức tài chính dễ dàng | Đẩy kiến thức vỡ mảnh, giảng dạy trường hợp tình huống hóa, tương tác hỏi đáp; kiểm tra kiến thức và chứng chỉ |
| 4 | Nhà thuyên giảm lo lắng tài chính | Đánh giá sức khỏe tình trạng tài chính, kỹ thuật quản lý áp lực, kế hoạch hành động nhỏ; tư vấn tâm lý tài chính |
| 5 | Trò chơi trải nghiệm đầu tư nhỏ | Mô phỏng đầu tư ảo, giáo dục rủi ro, trò chơi danh mục đầu tư; dẫn vào đầu tư nhỏ thực sự |

---

## 13. Phát triển nghề nghiệp

> 💡 **Ý tưởng cốt lõi**：Nghề nghiệp không phải quỹ đạo, mà là vùng đất hoang có thể khám phá

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Người đồng hành hoang mang nghề nghiệp | Đánh giá sở thích nghề nghiệp, cân bằng kỹ năng, khuyến nghị thông tin ngành; đối thoại cố vấn nghề nghiệp |
| 2 | Nhà thức dậy cảm giác thành tựu công việc | Ghi chép kết quả công việc, chiết xuất giá trị, có thể hình dung thành tựu; thu thập phản hồi tích cực từ đồng nghiệp/khách hàng |
| 3 | Trợ lý bầu không khí xã hội thương mại | Khuyến nghị chủ đề xã hội thương mại, kỹ thuật networking, khuyến nghị hoạt động ngành; tối ưu hóa nội dung LinkedIn |
| 4 | Kích hoạt cảm hứng kinh doanh phụ | Khớp nối kỹ năng-sở thích-nhu cầu thị trường, thư viện trường hợp kinh doanh phụ, hướng dẫn khởi động; trao đổi cộng đồng kinh doanh phụ |
| 5 | Trạm gia tăng tự tin trước phỏng vấn | Mô phỏng phỏng vấn, chuẩn bị câu hỏi thường gặp, kỹ thuật tăng sự tự tin; khuyến nghị hình ảnh |

---

## 14. Không gian nhà cửa

> 💡 **Ý tưởng cốt lõi**：Nhà không chỉ là nơi sống, mà còn là nơi ở của tâm hồn

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Nhà thiết kế bầu không khí không gian nhà | Phân tích ảnh không gian, khuyến nghị phong cách, khuyến nghị nội thất/trang trí; xem trước AR hiệu quả |
| 2 | Hướng dẫn thay đổi nội thất theo bốn mùa | Khuyến nghị chủ đề mùa, khuyến nghị sắp xếp và trưng bày, kế hoạch trang trí lễ hội; tạo danh sách mua sắm |
| 3 | Phép thuật không gian nhỏ | Thuật toán tối ưu hóa không gian, khuyến nghị nội thất đa chức năng, kỹ thuật lưu trữ; kỹ thuật mở rộng trực quan |
| 4 | Người tạo cảm giác nghi thức sinh sống | Thiết kế nghi thức hàng ngày (sáng/tối/cuối tuần), nhắc nhở thực hiện nghi thức; phản hồi hiệu ứng nghi thức |
| 5 | Đồng hành tâm lý xả bỏ không cần thiết | Đánh giá giá trị cảm xúc vật phẩm, hướng dẫn bước xả bỏ, hỗ trợ tâm lý; khuyến nghị kênh quyên góp/tái chế |

---

## 15. Nấu ăn và thực phẩm

> 💡 **Ý tưởng cốt lõi**：Thực phẩm là ngôn ngữ của yêu thương, nấu ăn là cách biểu hiện tình yêu

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Nấu ăn chữa lành cho một người | Nhận dạng thực phẩm tủ lạnh, khuyến nghị công thức đơn giản, hướng dẫn từng bước; thẩm mỹ bố trí ăn một mình |
| 2 | Thiết kế bầu không khí bàn ăn ngày lễ | Menu chủ đề ngày lễ, kế hoạch bố trí bàn ăn, kỹ thuật tạo bầu không khí; tối ưu hóa trải nghiệm khách |
| 3 | Người ghép nối cảm xúc và nấu ăn | Thuật toán liên kết cảm xúc-thực phẩm, công thức điều chỉnh cảm xúc, khuyến nghị thực phẩm thoải mái; hướng dẫn chữa lành nấu ăn |
| 4 | Xây dựng sự tự tin cho tân binh nhà bếp | Công thức siêu đơn giản, kỹ thuật cứu trợ thất bại, từ ngữ xây dựng sự tự tin; nâng cao độ khó tiến triển |
| 5 | Hướng dẫn bầu không khí chụp ảnh thực phẩm | Khuyến nghị bố trí thực phẩm, sử dụng ánh sáng tự nhiên, hướng dẫn góc chụp; khuyến nghị bộ lọc và hậu xử lý |

---

## 16. Phong cách trang phục

> 💡 **Ý tưởng cốt lõi**：Trang phục là biểu hiện bản thân, phong cách là biểu hiện ngoài của nội tâm

| Thứ tự | Tên kịch bản ứng dụng | Chức năng kịch bản ứng dụng |
| :--: | ------------ | ------------ |
| 1 | Bảng tâm trạng trang phục ngày hôm nay | Khuyến nghị tổng hợp thời tiết/dịp/tâm trạng, thử quần áo ảo, cảm hứng ghép nối; quản lý tủ quần áo |
| 2 | Nhà ghép nối tủ quần áo viên | Cân bằng tủ quần áo, kết hợp lựa chọn lẻ, kế hoạch mặc một lần; khuyến nghị mua sắm (lấp khoảng trống) |
| 3 | Hành trình khám phá phong cách cá nhân | Kiểm tra phong cách, khuyến nghị biểu tượng tham khảo, con đường tiến hóa phong cách; xây dựng sự tự tin |
| 4 | Nhà thiết kế sáng tạo mặc lại quần áo cũ | Cảm hứng cải tạo quần áo cũ, cách ghép nối mới, kỹ thuật phối phụ kiện; ý tưởng thời trang bền vững |
| 5 | Cố vấn tạo hình cho dịp đặc biệt | Giải mã dress code dịp, tạo ra kế hoạch tạo hình, khuyến nghị makeup và tóc; phối hợp tạo hình toàn diện |

---

## Tâm pháp cốt lõi để thiết kế sản phẩm đầu cuối C

### 1. Từ "chức năng" đến "cảm giác"

Sản phẩm đầu cuối B tập trung vào "chức năng này có thể giải quyết vấn đề gì", sản phẩm đầu cuối C tập trung vào "chức năng này có thể mang lại cảm giác gì".

| Tư duy đầu cuối B | Tư duy đầu cuối C |
|---------|---------|
| Tăng hiệu quả | Tiết kiệm thời gian để làm những thứ bạn thích |
| Giảm chi phí | Khiến mỗi đồng tiền đều xứng đáng |
| Giải quyết nỗi đau | Tạo ra trải nghiệm đẹp đẽ |
| Chức năng hoàn chỉnh | Cảm giác đúng chỗ |

### 2. Ba cấp độ tạo bầu không khí

**Tầng cảm giác**: Thiết kế thị giác, thính giác, xúc giác
- Màu sắc ấm áp
- Âm thanh dịu dàng
- Hoạt ảnh mượt mà

**Tầng cảm xúc**: Cộng rung và hướng dẫn cảm xúc
- Hiểu tâm trạng người dùng
- Cung cấp hỗ trợ cảm xúc
- Tạo cảm xúc tích cực

**Tầng ý nghĩa**: Công nhận và thuộc giá trị
- Khiến người dùng cảm thấy được hiểu
- Tạo cảm giác thuộc
- Gán ý nghĩa hành động

### 3. Sức mạnh của gợi ý tâm lý

Văn bản và thiết kế sản phẩm đầu cuối C đều truyền tải gợi ý tâm lý:

- **Gợi ý tích cực**: "Bạn đã làm rất tốt rồi", "Từ từ, không sao"
- **Gợi ý thuộc**: "Nhiều người giống bạn", "Bạn không cô đơn"
- **Gợi ý phát triển**: "Mỗi cố gắng đều là tiến bộ", "Bạn đang trở nên tốt hơn"

### 4. Giúp người dùng trở thành phiên bản tốt hơn của chính họ

Sản phẩm đầu cuối C tốt nhất không phải thay đổi người dùng, mà là giúp họ trở thành người mà họ muốn là.

- Không phải "bạn nên...", mà là "bạn có thể..."
- Không phải "bạn phải...", mà là "nếu bạn muốn..."
- Không phải "bạn chưa đủ...", mà là "bạn đã..."

---

> 🌟 **Hãy nhớ**：Người dùng đầu cuối C mua không phải chức năng, mà là cảm giác; không phải công cụ, mà là đồng hành; không phải dịch vụ, mà là sự hiểu biết.
