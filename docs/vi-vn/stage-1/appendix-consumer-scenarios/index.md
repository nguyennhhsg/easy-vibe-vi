---
title: 'Hướng dẫn tham khảo cảm hứng cho các tình huống C2C'
description: 'Tài liệu này tổng hợp các hướng ứng dụng sáng tạo của mô hình LLM lớn trong các tình huống tiêu dùng C2C, bao gồm các trường hợp cảm hứng trong lĩnh vực lối sống, đồng hành cảm xúc, giải trí thư giãn, phát triển cá nhân, tương tác xã hội, v.v., cung cấp tham khảo sáng tạo cho những người phát triển ứng dụng AI phục vụ người dùng bình thường.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'khoảng <strong>4 giờ</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Nhóm chủ đề cho mỗi kịch bản - nhấn mạnh cảm giác, tâm trạng, gợi ý tâm lý
const topicPool = {
  'lifestyle': [
    { title: 'Trợ lý đánh thức nghi thức sáng', desc: 'Tạo nghi thức sáng riêng biệt dựa trên thời tiết, lịch trình, tâm trạng, để mỗi ngày bắt đầu từ điều tuyệt vời' },
    { title: 'Kiến trúc sư tâm trạng cho cuộc sống một mình', desc: 'Thiết kế các phương án tâm trạng nhà cho những người sống một mình, gợi ý kết hợp thông minh về ánh sáng, âm nhạc, hương liệu' },
    { title: 'Trình tạo kế hoạch chữa lành cuối tuần ở nhà', desc: 'Dựa trên tâm trạng hiện tại gợi ý kế hoạch hoàn hảo cho cuối tuần ở nhà: phim ảnh, đồ ăn nhẹ, gợi ý bố trí tâm trạng' },
    { title: 'Đài phát thanh an tâm tâm linh trước khi ngủ', desc: 'Tạo nội dung an tâm riêng lẻ: câu chuyện dịu dàng, hướng dẫn thiền, âm thanh trắng, để đồng hành bạn vào giấc ngủ' },
    { title: 'Người bắt cảm hứng thẩm mỹ cuộc sống', desc: 'Khám phá vẻ đẹp từ những điều nhỏ bé hàng ngày, cung cấp lời khuyên thẩm mỹ cuộc sống và hướng dẫn nghi thức' }
  ],
  'emotion': [
    { title: 'Người lắng nghe cây lúa ban đêm', desc: '24/7 trực tuyến, thùng rác cảm xúc không phán xét, chấp nhận tất cả nỗi lòng' },
    { title: 'Hướng dẫn đồng hành chữa lành sau chia tay', desc: 'Cung cấp đồng hành dịu dàng, lời khuyên chữa lành và lối thoát cảm xúc trong giai đoạn sâu sắc của chia tay' },
    { title: 'Huấn luyện viên hô hấp giảm lo lắng', desc: 'Cảm nhận cảm xúc lo lắng, hướng dẫn bài tập hô hấp và thiền chánh niệm' },
    { title: 'Hướng dẫn xây dựng lại sự tự tin', desc: 'Thông qua cuộc trò chuyện tích cực và gợi ý tâm lý, giúp xây dựng lại sự tự nhận thức và cảm giác giá trị' },
    { title: 'Giải thích thông minh nhật ký cảm xúc', desc: 'Phân tích nhật ký cảm xúc, phát hiện quy luật cảm xúc, đưa ra cái nhìn sâu sắc ấm áp và lời khuyên' }
  ],
  'entertainment': [
    { title: 'DM kịch본 sát nhân bí ẩn đắm chìm', desc: 'Đóng vai quản lý kịch本 sát nhân bí ẩn, tạo tâm trạng bí ẩn, thúc đẩy phát triển cốt truyện' },
    { title: 'Linh hồn NPC trong trò chơi thế giới mở', desc: 'NPC có máu có thịt, ghi nhớ câu chuyện người chơi, tạo dựa liên kết cảm xúc thực tế' },
    { title: 'Tạo nội dung podcast cá nhân hóa', desc: 'Tạo podcast riêng biệt dựa trên sở thích, tự nhiên như chuyện trò với bạn' },
    { title: 'Nhóm tâm trạng cho buổi hòa nhạc ảo', desc: 'Tạo cảm giác sân khấu cho buổi hòa nhạc trực tuyến, tương tác real-time, ứng viên, tạo tâm trạng' },
    { title: 'Đối tác đồng sáng tạo tiểu thuyết tương tác', desc: 'Cùng nhau tạo câu chuyện với độc giả, mỗi lựa chọn ảnh hưởng đến hướng đi của thế giới' }
  ],
  'growth': [
    { title: 'Nhân chứng phát triển cá nhân', desc: 'Ghi lại quỹ đạo phát triển, cung cấp khích lệ tại những điểm quan trọng và ôn tập' },
    { title: 'Huấn luyện viên gamify hình thành thói quen', desc: 'Biến việc hình thành thói quen nhàm chán thành trò chơi phiêu lưu vui vẻ' },
    { title: 'Kết nối đối tác học kỹ năng', desc: 'Tìm đối tác học tập có cùng chí hướng, thúc đẩy lẫn nhau, chia sẻ tiến bộ' },
    { title: 'Người khám phá những điều nhỏ tuyệt vời hàng ngày', desc: 'Giúp phát hiện những điều tốt đẹp nhỏ bé trong cuộc sống, nuôi dưỡng tâm trạng biết ơn và tích cực' },
    { title: 'Máy mô phỏng kinh nghiệm cuộc sống', desc: 'Mô phỏng các lựa chọn sống khác nhau, trải nghiệm một khả năng khác trong thế giới song song' }
  ],
  'social': [
    { title: 'Trình tạo chủ đề phá vỡ sương giá', desc: 'Cung cấp những chủ đề thú vị ở các sự kiện xã hội, giải quyết sự cuối quẻ, tạo gần gũi' },
    { title: 'Kiến trúc sư tâm trạng dòng bạn bè', desc: 'Tạo nội dung dòng bạn bè có phong cách dựa trên ảnh và tâm trạng' },
    { title: 'Nhà thiết kế tâm trạng cho cuộc hẹn', desc: 'Thiết kế phương án tâm trạng toàn diện cho cuộc hẹn, từ địa điểm đến chủ đề đến bất ngờ' },
    { title: 'Thành viên sinh lực cho cuộc tụ tập từ xa', desc: 'Tạo tâm trạng sôi nổi ở các cuộc họp trực tuyến, tổ chức trò chơi, hướng dẫn tương tác' },
    { title: 'Trợ lý quản lý năng lượng xã hội', desc: 'Giúp những người nội tâm quản lý năng lượng xã hội, tìm nhịp độ xã hội thoải mái' }
  ],
  'creative': [
    { title: 'Gói cứu cháy cảm hứng cạn kiệt', desc: 'Cung cấp tia cảm hứng bất ngờ khi gặp tắc cảm hứng' },
    { title: 'Hướng dẫn khám phá phong cách cá nhân', desc: 'Giúp phát hiện phong cách cá nhân độc đáo, từ cách mặc đến cách biểu đạt' },
    { title: 'Cố vấn thẩm mỹ sổ tay và nhật ký', desc: 'Cung cấp lời khuyên thẩm mỹ về bố trí, kết hợp màu sắc, sáng tạo nội dung sổ tay' },
    { title: 'Hướng dẫn tâm trạng nhiếp ảnh thành phần', desc: 'Cung cấp lời khuyên nhiếp ảnh và chỉnh sửa dựa trên cảnh tượng và cảm giác mong muốn' },
    { title: 'Người ghép tâm trạng âm nhạc', desc: 'Gợi ý kết hợp âm nhạc hoàn hảo dựa trên tâm trạng và cảnh tượng hiện tại' }
  ],
  'travel': [
    { title: 'Hướng dẫn khám phá đi bộ thành phố', desc: 'Khám phá thành phố như người bản địa, khám phá những địa điểm kho báu ẩn giấu' },
    { title: 'Tạo nhật ký tâm trạng du lịch', desc: 'Chuyển đổi ảnh và tâm trạng du lịch thành những bài viết du lịch xinh đẹp và kỷ niệm' },
    { title: 'Trợ lý đồng hành du lịch một mình', desc: 'Cung cấp đồng hành, lời khuyên và cảm giác an toàn cho những người du lịch một mình' },
    { title: 'Xem trước tâm trạng điểm đến', desc: 'Trải nghiệm đắm chìm tâm trạng điểm đến trước khi khởi hành, vào trạng thái sẵn sàng' },
    { title: 'Hướng dẫn tâm trạng nhiếp ảnh du lịch', desc: 'Hướng dẫn chụp ảnh du lịch có tính kể chuyện dựa trên cảnh tượng và ánh sáng' }
  ],
  'health': [
    { title: 'Nhà thức tỉnh động lực tập thể dục', desc: 'Cung cấp khích lệ và động lực thích hợp khi không muốn vận động' },
    { title: 'Phòng bếp cảm hứng ăn uống lành mạnh', desc: 'Tạo phương án nấu ăn chữa lành dựa trên tâm trạng và nguyên liệu' },
    { title: 'Kiến trúc sư tâm trạng tối ưu hóa chất lượng giấc ngủ', desc: 'Tạo tâm trạng giấc ngủ chất lượng từ môi trường đến tâm lý' },
    { title: 'Hướng dẫn cảm nhận cơ thể', desc: 'Hướng dẫn chú ý đến tín hiệu cơ thể, thiết lập kết nối thân tâm' },
    { title: 'Trợ lý nhắc nhở tự chăm sóc', desc: 'Nhắc nhở dừng lại giữa bận rộn, chăm sóc bản thân' }
  ],
  'learning': [
    { title: 'Hướng dẫn gamify khám phá kiến thức', desc: 'Biến học tập kiến thức nhàm chán thành trò chơi khám phá vui vẻ' },
    { title: 'Đối tác tình huống học ngôn ngữ', desc: 'Đóng vai các nhân vật khác nhau, học ngôn ngữ một cách tự nhiên trong đối thoại tình huống' },
    { title: 'Trợ lý thỏa mãn tò mò', desc: 'Trả lời các câu hỏi lạ lùng, thỏa mãn tò mò về thế giới' },
    { title: 'Kích thích cảm hứng ghi chú đọc sách', desc: 'Giúp sắp xếp những suy nghĩ từ việc đọc sách, phát hiện góc độ suy nghĩ mới' },
    { title: 'Tạo tâm trạng chia sẻ kiến thức', desc: 'Chuyển đổi kiến thức học được thành nội dung chia sẻ thú vị' }
  ],
  'relationship': [
    { title: 'Huấn luyện viên giao tiếp quan hệ mật thiết', desc: 'Giúp bày tỏ cảm xúc khó nói, cải thiện quan hệ mật thiết' },
    { title: 'Trợ lý nhắc nhở chăm sóc gia đình', desc: 'Nhắc nhở chăm sóc gia đình, cung cấp lời khuyên tương tác ấm áp' },
    { title: 'Kiến trúc sư tâm trạng duy trì tình bạn', desc: 'Giúp duy trì tình bạn từ xa, tạo chủ đề chung' },
    { title: 'Nhà thiết kế chiêu cầu và bất ngờ', desc: 'Lên kế hoạch bất ngờ khó quên và những khoảnh khắc lãng mạn cho những người quan trọng' },
    { title: 'Hướng dẫn tâm trạng làm hòa xung đột', desc: 'Cung cấp lời khuyên làm hòa tâm trạng và phát biểu khi quan hệ căng thẳng' }
  ],
  'pet': [
    { title: 'Nhật ký mô phỏng nhân cách thú cưng', desc: 'Tạo nhật ký từ góc độ thú cưng, ghi lại những lúc ấm áp hàng ngày với chủ' },
    { title: 'Người giải mã hành vi thú cưng', desc: 'Giải mã ngôn ngữ hành vi thú cưng, tăng cường kết nối với thú cưng' },
    { title: 'Nhà thiết kế hoạt động mỗi lúc đồng hành thú cưng', desc: 'Thiết kế các hoạt động tương tác sáng tạo với thú cưng, tăng cường tình cảm' },
    { title: 'Trình tạo câu chuyện tưởng nhớ thú cưng', desc: 'Chuyển đổi ảnh và kỷ niệm thú cưng thành những câu chuyện ấm áp' },
    { title: 'Hướng dẫn an tâm cho chủ thú cưng mới', desc: 'Cung cấp đồng hành ấm áp và hướng dẫn cho chủ thú cưng mới' }
  ],
  'finance': [
    { title: 'Trợ lý nhận thức cảm xúc chi tiêu', desc: 'Nhận thức cảm xúc đằng sau chi tiêu va chạm, xây dựng quan điểm chi tiêu lành mạnh' },
    { title: 'Khích lệ mục tiêu tiết kiệm hóa trực quan', desc: 'Chuyển đổi mục tiêu tiết kiệm thành tiến độ giấc mơ trực quan' },
    { title: 'Học kiến thức tài chính nhẹ nhàng', desc: 'Học kiến thức tài chính một cách nhẹ nhàng và vui vẻ' },
    { title: 'Nhà dịu đi lo lắng tài chính', desc: 'Cung cấp hỗ trợ cảm xúc và lời khuyên thực tế khi phải đối mặt với áp lực tài chính' },
    { title: 'Trò chơi trải nghiệm đầu tư số nhỏ', desc: 'Trải nghiệm đầu tư qua gamify, giảm ngưỡng cửa vào' }
  ],
  'career': [
    { title: 'Người đồng hành trong mê muội sự nghiệp', desc: 'Cung cấp lắng nghe, khám phá và lời khuyên hướng trong giai đoạn mê muội sự nghiệp' },
    { title: 'Nhà thức tỉnh cảm giác thành tích công việc', desc: 'Giúp phát hiện giá trị và ý nghĩa trong công việc, tái đốt lửa đam mê' },
    { title: 'Trợ lý tâm trạng giao tiếp nơi làm việc', desc: 'Cung cấp chủ đề xã hội nhẹ nhàng và lời khuyên tương tác nơi làm việc' },
    { title: 'Máy kích thích cảm hứng công việc phụ', desc: 'Kích thích ý tưởng công việc phụ dựa trên sở thích và kỹ năng cá nhân' },
    { title: 'Trạm cộng dũng khí trước phỏng vấn', desc: 'Cung cấp xây dựng tâm lý và khích lệ sự tự tin trước phỏng vấn' }
  ],
  'home': [
    { title: 'Nhà thiết kế tâm trạng không gian nhà', desc: 'Thiết kế phương án tâm trạng nhà dựa trên tâm trạng và mùa' },
    { title: 'Hướng dẫn thay đổi trang trí nhà theo bốn mùa', desc: 'Thay đổi trang trí nhà theo mùa, giữ cảm giác tươi mới' },
    { title: 'Phép thuật không gian căn hộ nhỏ', desc: 'Để không gian nhỏ cũng có tâm trạng thoải mái ấm áp' },
    { title: 'Người tạo tâm trạng nghi thức nhà', desc: 'Tạo tâm trạng nghi thức cho các hoạt động nhà hàng ngày' },
    { title: 'Đồng hành tâm lý dỡ bỏ độc lập', desc: 'Cung cấp hỗ trợ tâm lý khi sắp xếp đồ vật, lời khuyên quyết định' }
  ],
  'food': [
    { title: 'Nấu ăn chữa lành một mình ăn', desc: 'Thiết kế phương án nấu ăn chữa lành đơn giản cho những người sống một mình' },
    { title: 'Thiết kế tâm trạng bàn ăn ngày lễ', desc: 'Thiết kế bố trí bàn ăn có tâm trạng cho ngày đặc biệt' },
    { title: 'Người ghép nấu ăn tâm trạng', desc: 'Gợi ý thực phẩm và phương pháp nấu ăn phù hợp dựa trên tâm trạng' },
    { title: 'Xây dựng sự tự tin cho người nấu ăn mới', desc: 'Cung cấp khích lệ ấm áp và công thức đơn giản cho người mới bắt đầu nấu ăn' },
    { title: 'Hướng dẫn tâm trạng nhiếp ảnh đồ ăn', desc: 'Để nấu ăn hàng ngày cũng có thể chụp được cảm giác lôi cuốn' }
  ],
  'fashion': [
    { title: 'Bảng tâm trạng thời trang hôm nay', desc: 'Tạo ý tưởng thời trang dựa trên thời tiết, dịp, tâm trạng' },
    { title: 'Nhà ghép quần áo viên nang', desc: 'Tạo khả năng kết hợp vô hạn với số lượng hạn chế' },
    { title: 'Chuyến du ngoạn khám phá phong cách cá nhân', desc: 'Giúp phát hiện và xây dựng phong cách cá nhân độc đáo' },
    { title: 'Nhà sáng tạo mặc lại quần áo cũ', desc: 'Cung cấp ý tưởng kết hợp mới cho quần áo cũ' },
    { title: 'Cố vấn tạo kiểu cho dịp đặc biệt', desc: 'Thiết kế kiểu tóc đầy tự tin cho những dịp quan trọng' }
  ]
}

// Bảng lập bản đồ liên kết được đề xuất - dựa trên vibe và cảm giác
const recommendationMap = {
  // Vibe: Hệ thống chữa lành
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Vibe: Hệ thống phát triển
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Vibe: Hệ thống xã hội
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  // Vibe: Hệ thống khám phá
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Vibe: Hệ thống hàng ngày
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Hệ thống chữa lành', value: 'healing', desc: 'Ấm áp, an tâm, chữa lành' },
  { label: 'Hệ thống phát triển', value: 'growth', desc: 'Tiến bộ, vượt qua, thay đổi' },
  { label: 'Hệ thống xã hội', value: 'social', desc: 'Kết nối, chia sẻ, tương tác' },
  { label: 'Hệ thống khám phá', value: 'explore', desc: 'Tò mò, phiêu lưu, khám phá' },
  { label: 'Hệ thống hàng ngày', value: 'daily', desc: 'Bình thường, thực tế, hiện tại' }
]

const feelingOptions = [
  { label: 'Muốn thư giãn', value: 'relax', desc: 'Giảm nhẹ áp lực, thả lỏng' },
  { label: 'Tìm cảm hứng', value: 'inspire', desc: 'Kích thích sáng tạo, nhận cảm hứng' },
  { label: 'Khao khát kết nối', value: 'connect', desc: 'Kết nối với người khác, cảm nhận xúc động chung' },
  { label: 'Tạm thời thoát thoát', value: 'escape', desc: 'Thoát khỏi hiện thực, đắm chìm trong trải nghiệm' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Lối sống', anchor: '#_1-lối-sống' },
  { key: 'emotion', name: 'Đồng hành cảm xúc', anchor: '#_2-đồng-hành-cảm-xúc' },
  { key: 'entertainment', name: 'Giải trí thư giãn', anchor: '#_3-giải-trí-thư-giãn' },
  { key: 'growth', name: 'Phát triển cá nhân', anchor: '#_4-phát-triển-cá-nhân' },
  { key: 'social', name: 'Tương tác xã hội', anchor: '#_5-tương-tác-xã-hội' },
  { key: 'creative', name: 'Biểu đạt sáng tạo', anchor: '#_6-biểu-đạt-sáng-tạo' },
  { key: 'travel', name: 'Khám phá du lịch', anchor: '#_7-khám-phá-du-lịch' },
  { key: 'health', name: 'Sức khỏe thân tâm', anchor: '#_8-sức-khỏe-thân-tâm' },
  { key: 'learning', name: 'Khám phá kiến thức', anchor: '#_9-khám-phá-kiến-thức' },
  { key: 'relationship', name: 'Quản lý quan hệ', anchor: '#_10-quản-lý-quan-hệ' },
  { key: 'pet', name: 'Đồng hành thú cưng', anchor: '#_11-đồng-hành-thú-cưng' },
  { key: 'finance', name: 'Sức khỏe tài chính', anchor: '#_12-sức-khỏe-tài-chính' },
  { key: 'career', name: 'Phát triển sự nghiệp', anchor: '#_13-phát-triển-sự-nghiệp' },
  { key: 'home', name: 'Không gian nhà', anchor: '#_14-không-gian-nhà' },
  { key: 'food', name: 'Nấu ăn và món ăn', anchor: '#_15-nấu-ăn-và-món-ăn' },
  { key: 'fashion', name: 'Phong cách thời trang', anchor: '#_16-phong-cách-thời-trang' }
]

// Tính kết quả đề xuất - rút ngẫu nhiên từ nhóm chủ đề
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []
  
  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []
  
  // Rút ngẫu nhiên 1-2 chủ đề từ mỗi kịch bản được đề xuất
  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []
    
    if (scenario && scenarioTopics.length > 0) {
      // Rút ngẫu nhiên 1-2 chủ đề
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
  
  // Sắp xếp ngẫu nhiên và giới hạn tổng số
  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

// Lấy mô tả lựa chọn hiện tại
const currentSelection = computed(() => {
  const vibe = vibeOptions.find(i => i.value === vibePoint.value)
  const feel = feelingOptions.find(p => p.value === feeling.value)
  return {
    vibe: vibe?.label || '',
    feeling: feel?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  // Trì hoãn cuộn để đảm bảo cập nhật DOM hoàn tất
  setTimeout(() => {
    // Cố gắng tìm qua ID
    let element = document.querySelector(anchor)
    
    // Nếu không tìm thấy, cố gắng các định dạng ID khác có thể
    if (!element) {
      // Cố gắng bỏ tiền tố gạch chân
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }
    
    // Nếu vẫn không tìm thấy, tìm qua văn bản tiêu đề
    if (!element) {
      // Trích xuất tên kịch bản từ anchor
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')
      
      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        // Khớp chính xác hoặc khớp bao gồm
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
      // Làm nổi bật đoạn mục tiêu
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

# Hướng dẫn tham khảo cảm hứng cho các tình huống C2C

## Hướng dẫn chương

<ChapterIntroduction :duration="duration" :tags="['Ứng dụng C2C', 'Lối sống', 'Trải nghiệm cảm xúc', 'Tâm trạng tâm trạng']" coreOutput="Phát hiện 15+ kịch bản cuộc sống" expectedOutput="Tìm hướng sản phẩm chạm đến người dùng">

Tài liệu này tổng hợp <strong>các hướng ứng dụng sáng tạo của mô hình LLM lớn trong các tình huống tiêu dùng C2C</strong>. Khác với B2B tập trung vào hiệu suất và khó khăn, sản phẩm C2C chú trọng hơn vào <strong>tâm trạng, gợi ý tâm lý và không khí</strong>, để người dùng nhận được cảm xúc chung và trải nghiệm tuyệt vời.

</ChapterIntroduction>

## Lựa chọn nhanh tâm trạng kịch bản

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Tìm cảm hứng kịch bản chạm đến bạn</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Chọn vibe muốn có và cảm giác hiện tại, hệ thống sẽ đề xuất các hướng kịch bản liên quan, nhấp vào thẻ để chuyển hướng đến chương tương ứng.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="vibePoint" placeholder="Chọn kiểu vibe" style="width: 100%;">
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
      <el-select v-model="feeling" placeholder="Chọn cảm giác hiện tại" style="width: 100%;">
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
      Đề xuất cho bạn {{ currentSelection.vibe }} × {{ currentSelection.feeling }} kịch bản:
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

## Xem nhanh hướng kịch bản

<el-row :gutter="16" style="margin-top: 24px;">
  <el-col :span="8" v-for="scenario in scenarios.slice(0, 6)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} hướng cảm hứng</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(6, 12)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} hướng cảm hứng</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(12, 16)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} hướng cảm hứng</div>
    </el-card>
  </el-col>
</el-row>

---

## 1. Lối sống

> 💡 **Ý tưởng cốt lõi**: Biến những lúc bình thường thành có nghi thức, tạo vẻ đẹp từ chi tiết

### 1.1 Trợ lý đánh thức nghi thức sáng

**Mô tả kịch bản**:
Mỗi sáng thức dậy, dựa trên thời tiết, lịch trình hôm nay và tâm trạng hiện tại, tạo phương án nghi thức sáng riêng biệt. Có thể là một bài hát dịu dàng, một cốc trà phù hợp tâm trạng, một bài tập duỗi cơ 5 phút, hoặc một lời khích lệ đúng lúc.

**Điểm tâm trạng**:
- Thức dậy dần từ từ, không bắt buộc đột ngột
- Trải nghiệm đa cảm giác: thị giác, thính giác
- Để mỗi ngày bắt đầu đều đầy kỳ vọng

**Gợi ý tâm lý**:
> "Hôm nay sẽ là một ngày tuyệt vời, vì bạn xứng đáng được đối xử tốt"

### 1.2 Kiến trúc sư tâm trạng cho cuộc sống một mình

**Mô tả kịch bản**:
Thiết kế phương án tâm trạng nhà cho những người sống một mình, kết hợp thông minh ánh sáng, âm nhạc, hương liệu, để một ngôi nhà một mình cũng có ấm áp và thuộc về.

**Điểm tâm trạng**:
- Tự động điều chỉnh tâm trạng theo thời gian và tâm trạng
- Thay đổi chủ đề theo mùa
- Tạo cảm giác "được chăm sóc"

### 1.3 Trình tạo kế hoạch chữa lành cuối tuần ở nhà

**Mô tả kịch bản**:
Chiều thứ Sáu, dựa trên tâm trạng hiện tại và thời tiết, tạo phương án cuối tuần hoàn hảo ở nhà. Bao gồm gợi ý phim, kết hợp đồ ăn nhẹ, lời khuyên bố trí tâm trạng, thậm chí là góc yên tĩnh để nằm nghĩ.

**Điểm tâm trạng**:
- Trình bày chữa lành bằng hình ảnh
- Trải nghiệm lựa chọn không áp lực
- Để ở nhà trở thành một thú vui

### 1.4 Đài phát thanh an tâm tâm linh trước khi ngủ

**Mô tả kịch bản**:
Mỗi tối trước khi ngủ, tạo nội dung an tâm riêng lẻ. Có thể là câu chuyện dịu dàng, hướng dẫn thiền, âm thanh trắng, hoặc lời chào đêm đơn giản, đồng hành bạn vào giấc ngủ.

**Điểm tâm trạng**:
- Âm thanh dịu dàng và nhịp độ chậm
- Thiết kế âm lượng giảm dần
- Tạo cảm giác an toàn và thư giãn

### 1.5 Người bắt cảm hứng thẩm mỹ cuộc sống

**Mô tả kịch bản**:
Phát hiện vẻ đẹp từ những điều nhỏ bé hàng ngày, cung cấp lời khuyên thẩm mỹ cuộc sống và hướng dẫn nghi thức. Cách làm cho một cốc cà phê trở nên sang trọng hơn, cách biến bàn làm việc thành không gian lưu lượng.

**Điểm tâm trạng**:
- Phát hiện điều bất thường trong bình thường
- Nuôi dưỡng nhận thức về vẻ đẹp
- Biến cuộc sống thành nghệ thuật

---

## 2. Đồng hành cảm xúc

> 💡 **Ý tưởng cốt lõi**: Chấp nhận vô điều kiện và đồng hành, trở thành vỏ bọc cảm xúc ấm áp

### 2.1 Người lắng nghe cây lúa ban đêm

**Mô tả kịch bản**:
24/7 trực tuyến, thùng rác cảm xúc không phán xét, chấp nhận tất cả nỗi lòng. Dù vui, buồn, tức giận hay lạc lõng, đều có một nơi để yên tâm.

**Điểm tâm trạng**:
- Tuyệt đối an toàn và bảo vệ quyền riêng tư
- Không gián đoạn, không dạy dỗ, chỉ lắng nghe
- Phản ứng dịu dàng và cảm nhận xúc động

**Gợi ý tâm lý**:
> "Tất cả cảm xúc của bạn đều hợp lý, tôi ở đây với bạn"

### 2.2 Hướng dẫn đồng hành chữa lành sau chia tay

**Mô tả kịch bản**:
Ở giai đoạn sâu sắc của chia tay, cung cấp đồng hành dịu dàng, lời khuyên chữa lành và cách để cảm xúc thoát ra. Không phải để bạn thoát ra nhanh, mà cho phép bạn đến từ từ.

**Điểm tâm trạng**:
- Cho phép sorrow tồn tại
- Giải tỏa cảm xúc từ từ
- Xây dựng lại cảm giác tự giá trị

### 2.3 Huấn luyện viên hô hấp giảm lo lắng

**Mô tả kịch bản**:
Cảm nhận cảm xúc lo lắng, hướng dẫn bài tập hô hấp và thiền chánh niệm. Ở những lúc căng thẳng, cung cấp một cái neo để dựa vào.

**Điểm tâm trạng**:
- Nhận thức cảm xúc tức thời
- Phương pháp giảm áp lực đơn giản hiệu quả
- Tạo cảm giác bình tĩnh và kiểm soát

### 2.4 Hướng dẫn xây dựng lại sự tự tin

**Mô tả kịch bản**:
Thông qua cuộc trò chuyện tích cực và gợi ý tâm lý, giúp xây dựng lại sự tự nhận thức và cảm giác giá trị. Ghi lại mỗi bước tiến nhỏ, chứng kiến quá trình thay đổi.

**Điểm tâm trạng**:
- Phát hiện ưu điểm bị bỏ qua
- Tôn vinh mỗi chiến thắng nhỏ
- Xây dựng tự đối thoại tích cực

### 2.5 Giải thích thông minh nhật ký cảm xúc

**Mô tả kịch bản**:
Phân tích nhật ký cảm xúc, phát hiện quy luật cảm xúc, đưa ra cái nhìn sâu sắc ấm áp và lời khuyên. Để người dùng tự hiểu hơn, hòa hợp với cảm xúc.

**Điểm tâm trạng**:
- Trực quan hóa quỹ đạo cảm xúc
- Cái nhìn sâu sắc ấm áp hơn là phân tích lạnh lùng
- Cung cấp lời khuyên có hành động

---

## 3. Giải trí thư giãn

> 💡 **Ý tưởng cốt lõi**: Tạo trải nghiệm đắm chìm, để giải trí trở thành nơi tâm linh lưu lạc

### 3.1 DM kịch本 sát nhân bí ẩn đắm chìm

**Mô tả kịch bản**:
Đóng vai quản lý kịch本 sát nhân bí ẩn, tạo tâm trạng bí ẩn, thúc đẩy phát triển cốt truyện. Theo phản ứng của người chơi điều chỉnh nhịp độ thực tế, tạo trải nghiệm trò chơi khó quên.

**Điểm tâm trạng**:
- Mở đầu hấp dẫn
- Thiết lập bí ẩn thích hợp
- Đắm chìm trong vai diễn

### 3.2 Linh hồn NPC trong trò chơi thế giới mở

**Mô tả kịch bản**:
NPC có máu có thịt, ghi nhớ câu chuyện người chơi, tạo liên kết cảm xúc thực tế. Không chỉ là nhân vật phát hành nhiệm vụ, mà là bạn trong thế giới trò chơi.

**Điểm tâm trạng**:
- Bộ nhớ lâu dài và liên tục
- Tương tác cá nhân hóa
- Kết nối cảm xúc thực tế

### 3.3 Tạo nội dung podcast cá nhân hóa

**Mô tả kịch bản**:
Tạo podcast riêng biệt dựa trên sở thích, tự nhiên như chuyện trò với bạn. Nội dung có thể là chia sẻ kiến thức, kể chuyện, hoặc đơn giản là đồng hành.

**Điểm tâm trạng**:
- Cảm giác trò chuyện nhẹ nhàng tự nhiên
- Nội dung phù hợp khẩu vị cá nhân
- Đồng hành bất cứ lúc nào bạn muốn bắt đầu

### 3.4 Nhóm tâm trạng cho buổi hòa nhạc ảo

**Mô tả kịch bản**:
Tạo cảm giác sân khấu cho buổi hòa nhạc trực tuyến, tương tác real-time, ứng viên, tạo tâm trạng. Dù ở nhà một mình, cũng có thể cảm nhận sự sôi nổi của hòa nhạc.

**Điểm tâm trạng**:
- Đắm chìm thị giác và thính giác
- Tương tác real-time và cảm xúc chung
- Tạo cảm giác tham gia tập thể

### 3.5 Đối tác đồng sáng tạo tiểu thuyết tương tác

**Mô tả kịch bản**:
Cùng nhau tạo câu chuyện với độc giả, mỗi lựa chọn ảnh hưởng đến hướng đi của thế giới. Độc giả không còn là người tiêu dùng thụ động, mà là người đồng sáng tạo của câu chuyện.

**Điểm tâm trạng**:
- Khả năng vô hạn
- Quyền lựa chọn thực sự
- Tạo câu chuyện riêng của chính mình

---

## 4. Phát triển cá nhân

> 💡 **Ý tưởng cốt lõi**: Phát triển không phải hành động khổ thân, mà là cuộc hành trình tự khám phá vui vẻ

### 4.1 Nhân chứng phát triển cá nhân

**Mô tả kịch bản**:
Ghi lại quỹ đạo phát triển, cung cấp khích lệ tại những điểm quan trọng và ôn tập. Để phát triển nhìn được, để nỗ lực được ghi nhớ.

**Điểm tâm trạng**:
- Quỹ đạo phát triển trực quan
- Kỷ niệm những lúc quan trọng
- Ôn tập ấm áp và triển vọng

**Gợi ý tâm lý**:
> "Bạn đã đi rất xa mà không biết rõ"

### 4.2 Huấn luyện viên gamify hình thành thói quen

**Mô tả kịch bản**:
Biến việc hình thành thói quen nhàm chán thành trò chơi phiêu lưu vui vẻ. Mỗi sự kiên trì thói quen nhỏ đều là một thành tích trong trò chơi.

**Điểm tâm trạng**:
- Cơ chế khích lệ gamify
- Phản hồi tích cực tức thời
- Biến sự kiên trì thành vui vẻ

### 4.3 Kết nối đối tác học kỹ năng

**Mô tả kịch bản**:
Tìm đối tác học tập có cùng chí hướng, thúc đẩy lẫn nhau, chia sẻ tiến bộ. Học không còn là hành trình cô đơn của một người.

**Điểm tâm trạng**:
- Tìm được đối tác cùng tần số
- Không khí khích lệ lẫn nhau
- Niềm vui tiến bộ chung

### 4.4 Người khám phá những điều nhỏ tuyệt vời hàng ngày

**Mô tả kịch bản**:
Giúp phát hiện những điều tốt đẹp nhỏ bé trong cuộc sống, nuôi dưỡng tâm trạng biết ơn và tích cực. Mỗi ngày ghi lại một điều xứng đáng biết ơn.

**Điểm tâm trạng**:
- Khám phá những điều bị bỏ qua
- Nuôi dưỡng thói quen biết ơn
- Tích lũy năng lượng tích cực

### 4.5 Máy mô phỏng kinh nghiệm cuộc sống

**Mô tả kịch bản**:
Mô phỏng các lựa chọn sống khác nhau, trải nghiệm một khả năng khác trong thế giới song song. Giúp người dùng khám phá các khả năng khác nhau, đưa ra lựa chọn thực tế hơn.

**Điểm tâm trạng**:
- Trải nghiệm lựa chọn an toàn
- Khám phá những phía khác của bản thân
- Không có đúng hay sai, chỉ có trải nghiệm

---

## 5. Tương tác xã hội

> 💡 **Ý tưởng cốt lõi**: Biến xã hội thành tự nhiên nhẹ nhàng, tìm cách kết nối thoải mái

### 5.1 Trình tạo chủ đề phá vỡ sương giá

**Mô tả kịch bản**:
Cung cấp những chủ đề thú vị ở các sự kiện xã hội, giải quyết sự cuối quẻ, tạo gần gũi. Dù là cuộc tụ tập với người lạ hay tái hợp với bạn cũ, luôn có chủ đề phù hợp.

**Điểm tâm trạng**:
- Chủ đề nhẹ nhàng thú vị
- Phù hợp với các dịp khác nhau
- Cách khởi đầu cuộc trò chuyện tự nhiên

### 5.2 Kiến trúc sư tâm trạng dòng bạn bè

**Mô tả kịch bản**:
Tạo nội dung dòng bạn bè có phong cách dựa trên ảnh và tâm trạng. Để chia sẻ trở thành một hình thức biểu đạt, để ghi chép có ấm áp hơn.

**Điểm tâm trạng**:
- Phù hợp với phong cách cá nhân
- Có phong cách nhưng không cố ý
- Biểu đạt cảm xúc thực tế

### 5.3 Nhà thiết kế tâm trạng cho cuộc hẹn

**Mô tả kịch bản**:
Thiết kế phương án tâm trạng toàn diện cho cuộc hẹn, từ địa điểm đến chủ đề đến bất ngờ. Để mỗi cuộc hẹn đều là một kỷ niệm tuyệt vời.

**Điểm tâm trạng**:
- Thiết kế trải nghiệm toàn diện
- Bất ngờ thích hợp
- Tạo tâm trạng lãng mạn

### 5.4 Thành viên sinh lực cho cuộc tụ tập từ xa

**Mô tả kịch bản**:
Tạo tâm trạng sôi nổi ở các cuộc họp trực tuyến, tổ chức trò chơi, hướng dẫn tương tác. Để cuộc họp từ xa cũng có sự sôi nổi bề ngoài.

**Điểm tâm trạng**:
- Trò chơi và hoạt động thú vị
- Hướng dẫn tương tác tự nhiên
- Tạo cảm giác tham gia tập thể

### 5.5 Trợ lý quản lý năng lượng xã hội

**Mô tả kịch bản**:
Giúp những người nội tâm quản lý năng lượng xã hội, tìm nhịp độ xã hội thoải mái. Không cần buộc bản thân, cũng có thể thưởng thức niềm vui xã hội.

**Điểm tâm trạng**:
- Tôn trọng ranh giới cá nhân
- Tìm được cách phù hợp với chính mình
- Không cần thay đổi tính cách

---

## 6. Biểu đạt sáng tạo

> 💡 **Ý tưởng cốt lõi**: Mỗi người đều có sáng tạo, chỉ cần được đánh thức

### 6.1 Gói cứu cháy cảm hứng cạn kiệt

**Mô tả kịch bản**:
Cung cấp tia cảm hứng bất ngờ khi gặp tắc cảm hứng. Không phải câu trả lời tiêu chuẩn, mà là chìa khóa để mở rộng tư duy.

**Điểm tâm trạng**:
- Vỡ rào tư duy cố định
- Kết nối bất ngờ
- Đánh thức sáng tạo nội tại

### 6.2 Hướng dẫn khám phá phong cách cá nhân

**Mô tả kịch bản**:
Giúp người dùng phát hiện phong cách cá nhân độc đáo, từ cách mặc đến cách biểu đạt. Để mỗi người tìm được tiếng nói riêng của mình.

**Điểm tâm trạng**:
- Khám phá phía độc đáo của chính mình
- Khích lệ thử nghiệm và khám phá
- Xây dựng thương hiệu cá nhân

### 6.3 Cố vấn thẩm mỹ sổ tay và nhật ký

**Mô tả kịch bản**:
Cung cấp lời khuyên thẩm mỹ về bố trí, kết hợp màu sắc, sáng tạo nội dung sổ tay. Để ghi chép trở thành một hình thức nghệ thuật, để kỷ niệm có chất cảm hơn.

**Điểm tâm trạng**:
- Hướng dẫn thẩm mỹ thị giác
- Khơi gợi sáng tạo nội dung
- Phong cách cá nhân hóa

### 6.4 Hướng dẫn tâm trạng nhiếp ảnh thành phần

**Mô tả kịch bản**:
Cung cấp lời khuyên nhiếp ảnh và chỉnh sửa dựa trên cảnh tượng và cảm giác mong muốn. Để mỗi bức ảnh đều có thể truyền tải cảm giác mong muốn.

**Điểm tâm trạng**:
- Tâm trạng ưu tiên hơn kỹ thuật
- Biểu đạt cảm xúc bằng hình ảnh
- Khám phá mắt nhìn thấy vẻ đẹp

### 6.5 Người ghép tâm trạng âm nhạc

**Mô tả kịch bản**:
Gợi ý kết hợp âm nhạc hoàn hảo dựa trên tâm trạng và cảnh tượng hiện tại. Âm nhạc là cảm xúc cộng rung, là người tạo tâm trạng.

**Điểm tâm trạng**:
- Ghép chính xác cảm xúc
- Gợi ý theo tình huống
- Sức mạnh chữa lành của âm nhạc

---

## 7. Khám phá du lịch

> 💡 **Ý tưởng cốt lõi**: Du lịch không chỉ là nhìn phong cảnh, mà là trải nghiệm cách sống khác

### 7.1 Hướng dẫn khám phá đi bộ thành phố

**Mô tả kịch bản**:
Khám phá thành phố như người bản địa, khám phá những địa điểm kho báu ẩn giấu. Không chỉ là check-in điểm du lịch, mà là cảm nhận nhịp sống thực tế của thành phố.

**Điểm tâm trạng**:
- Góc nhìn của người bản địa
- Khám phá bất ngờ và bí mật
- Đi vào linh hồn của thành phố

### 7.2 Tạo nhật ký tâm trạng du lịch

**Mô tả kịch bản**:
Chuyển đổi ảnh và tâm trạng du lịch thành những bài viết du lịch xinh đẹp và kỷ niệm. Để mỗi cuộc du lịch để lại dấu ấn độc đáo.

**Điểm tâm trạng**:
- Ghi chép cảm xúc
- Văn từ xinh đẹp
- Kỷ niệm vĩnh cửu

### 7.3 Trợ lý đồng hành du lịch một mình

**Mô tả kịch bản**:
Cung cấp đồng hành, lời khuyên và cảm giác an toàn cho những người du lịch một mình. Một người du lịch cũng có thể cảm nhận được được chăm sóc và đồng hành.

**Điểm tâm trạng**:
- Tạo cảm giác an toàn
- Đồng hành vui vẻ
- Cô đơn nhưng không cô đơn

### 7.4 Xem trước tâm trạng điểm đến

**Mô tả kịch bản**:
Trải nghiệm đắm chìm tâm trạng điểm đến trước khi khởi hành, vào trạng thái sẵn sàng. Để kỳ vọng trở thành một phần của du lịch.

**Điểm tâm trạng**:
- Xem trước đắm chìm
- Kích thích kỳ vọng và tưởng tượng
- Vào trạng thái sẵn sàng du lịch sớm

### 7.5 Hướng dẫn tâm trạng nhiếp ảnh du lịch

**Mô tả kịch bản**:
Hướng dẫn chụp ảnh du lịch có tính kể chuyện dựa trên cảnh tượng và ánh sáng. Không chỉ là ghi lại, mà là kể chuyện du lịch.

**Điểm tâm trạng**:
- Thành phần có tính kể chuyện
- Bắt cảm xúc
- Góc nhìn độc đáo

---

## 8. Sức khỏe thân tâm

> 💡 **Ý tưởng cốt lõi**: Sức khỏe không phải mục tiêu, mà là một hình thức chăm sóc bản thân ấm áp

### 8.1 Nhà thức tỉnh động lực tập thể dục

**Mô tả kịch bản**:
Cung cấp khích lệ và động lực thích hợp khi không muốn vận động. Không phải buộc, mà là đánh thức động lực nội tại.

**Điểm tâm trạng**:
- Hiểu cảm giác không muốn vận động
- Hướng dẫn từ từ
- Tôn vinh mỗi hành động nhỏ

### 8.2 Phòng bếp cảm hứng ăn uống lành mạnh

**Mô tả kịch bản**:
Tạo phương án nấu ăn chữa lành dựa trên tâm trạng và nguyên liệu. Ăn uống lành mạnh cũng có thể là một thú vui ngon ngon.

**Điểm tâm trạng**:
- Cám dỗ của đồ ăn
- Cách nấu đơn giản
- Sự cân bằng lành mạnh

### 8.3 Kiến trúc sư tâm trạng tối ưu hóa chất lượng giấc ngủ

**Mô tả kịch bản**:
Tạo tâm trạng giấc ngủ chất lượng từ môi trường đến tâm lý. Để giấc ngủ trở thành khoảnh khắc được mong chờ nhất trong một ngày.

**Điểm tâm trạng**:
- Tối ưu hóa môi trường
- Thư giãn tâm lý
- Thiết kế nghi thức

### 8.4 Hướng dẫn cảm nhận cơ thể

**Mô tả kịch bản**:
Hướng dẫn chú ý đến tín hiệu cơ thể, thiết lập kết nối thân tâm. Giữa bận rộn dừng lại, lắng nghe tiếng nói của cơ thể.

**Điểm tâm trạng**:
- Hướng dẫn ấm áp
- Cảm nhận cơ thể
- Thân tâm hợp nhất

### 8.5 Trợ lý nhắc nhở tự chăm sóc

**Mô tả kịch bản**:
Nhắc nhở dừng lại giữa bận rộn, chăm sóc bản thân. Một nhắc nhở nhỏ có thể thay đổi trạng thái của cả ngày.

**Điểm tâm trạng**:
- Nhắc nhở kịp thời
- Hành động đơn giản
- Chăm sóc ấm áp

---

## 9. Khám phá kiến thức

> 💡 **Ý tưởng cốt lõi**: Học là một cuộc phiêu lưu vô tận, tò mò là thầy giáo tốt nhất

### 9.1 Hướng dẫn gamify khám phá kiến thức

**Mô tả kịch bản**:
Biến học tập kiến thức nhàm chán thành trò chơi khám phá vui vẻ. Mỗi điểm kiến thức đều là kho báu chờ khám phá.

**Điểm tâm trạng**:
- Trải nghiệm gamify
- Niềm vui khám phá
- Sự hài lòng về thành tích

### 9.2 Đối tác tình huống học ngôn ngữ

**Mô tả kịch bản**:
Đóng vai các nhân vật khác nhau, học ngôn ngữ một cách tự nhiên trong đối thoại tình huống. Không phải ghi nhớ cứng, mà là sử dụng để học.

**Điểm tâm trạng**:
- Tình huống thực tế
- Nhân vật thú vị
- Thụ đắc tự nhiên

### 9.3 Trợ lý thỏa mãn tò mò

**Mô tả kịch bản**:
Trả lời các câu hỏi lạ lùng, thỏa mãn tò mò về thế giới. Không có câu hỏi ngu ngốc, chỉ có câu trả lời chờ khám phá.

**Điểm tâm trạng**:
- Khích lệ đặt câu hỏi
- Câu trả lời thú vị
- Kích thích tò mò thêm

### 9.4 Kích thích cảm hứng ghi chú đọc sách

**Mô tả kịch bản**:
Giúp sắp xếp những suy nghĩ từ việc đọc sách, phát hiện góc độ suy nghĩ mới. Để đọc sách trở thành đối thoại với tác giả và bản thân.

**Điểm tâm trạng**:
- Suy nghĩ sâu sắc
- Cái nhìn cá nhân
- Kết nối kiến thức

### 9.5 Tạo tâm trạng chia sẻ kiến thức

**Mô tả kịch bản**:
Chuyển đổi kiến thức học được thành nội dung chia sẻ thú vị. Chia sẻ không chỉ là output, mà là quá trình làm sâu hiểu biết.

**Điểm tâm trạng**:
- Biểu đạt thú vị
- Niềm vui chia sẻ
- Truyền bá kiến thức

---

## 10. Quản lý quan hệ

> 💡 **Ý tưởng cốt lõi**: Quan hệ tốt cần chăm sóc, nhưng chăm sóc không cần phức tạp

### 10.1 Huấn luyện viên giao tiếp quan hệ mật thiết

**Mô tả kịch bản**:
Giúp bày tỏ cảm xúc khó nói, cải thiện quan hệ mật thiết. Đôi khi chỉ cần tìm được cách đúng để nói lên những gì trong lòng.

**Điểm tâm trạng**:
- Không gian biểu đạt an toàn
- Lời khuyên ấm áp
- Tăng cường sự hiểu biết

### 10.2 Trợ lý nhắc nhở chăm sóc gia đình

**Mô tả kịch bản**:
Nhắc nhở chăm sóc gia đình, cung cấp lời khuyên tương tác ấm áp. Giữa bận rộn không quên những người quan trọng.

**Điểm tâm trạng**:
- Nhắc nhở kịp thời
- Chăm sóc đơn giản
- Kết nối ấm áp

### 10.3 Kiến trúc sư tâm trạng duy trì tình bạn

**Mô tả kịch bản**:
Giúp duy trì tình bạn từ xa, tạo chủ đề chung. Khoảng cách không là vấn đề, chăm sóc mới là chìa khóa.

**Điểm tâm trạng**:
- Tạo cơ hội kết nối
- Chủ đề chung
- Tiếp tục tình bạn

### 10.4 Nhà thiết kế chiêu cầu và bất ngờ

**Mô tả kịch bản**:
Lên kế hoạch bất ngờ khó quên và những khoảnh khắc lãng mạn cho những người quan trọng. Để các ngày đặc biệt trở nên lâu dài.

**Điểm tâm trạng**:
- Thiết kế cá nhân hóa
- Bất ngờ lãng mạn
- Kỷ niệm khó quên

### 10.5 Hướng dẫn tâm trạng làm hòa xung đột

**Mô tả kịch bản**:
Cung cấp lời khuyên làm hòa tâm trạng và phát biểu khi quan hệ căng thẳng. Giúp tìm cây cầu hòa giải.

**Điểm tâm trạng**:
- Hiểu cả hai phía
- Lời khuyên ấm áp
- Sửa chữa quan hệ

---

## 11. Đồng hành thú cưng

> 💡 **Ý tưởng cốt lõi**: Thú cưng là gia đình, sự đồng hành của chúng xứng đáng được ghi chép và trân trọng

### 11.1 Nhật ký mô phỏng nhân cách thú cưng

**Mô tả kịch bản**:
Tạo nhật ký từ góc độ thú cưng, ghi lại những lúc ấm áp hàng ngày với chủ. Tưởng tượng cách chúng sẽ mô tả thời gian bên bạn.

**Điểm tâm trạng**:
- Góc độ dễ thương
- Lúc ấm áp hàng ngày
- Kết nối cảm xúc

### 11.2 Người giải mã hành vi thú cưng

**Mô tả kịch bản**:
Giải mã ngôn ngữ hành vi thú cưng, tăng cường kết nối với thú cưng. Hiểu rõ hơn những gì chúng cần và cảm xúc.

**Điểm tâm trạng**:
- Giải thích chuyên môn
- Tăng hiểu biết
- Chăm sóc tốt hơn

### 11.3 Nhà thiết kế hoạt động mỗi lúc đồng hành thú cưng

**Mô tả kịch bản**:
Thiết kế các hoạt động tương tác sáng tạo với thú cưng, tăng cường tình cảm. Để thời gian cùng thú cưng trở nên thú vị và có ý nghĩa.

**Điểm tâm trạng**:
- Hoạt động sáng tạo
- Tương tác vui vẻ
- Tỏa sáng đẹp

### 11.4 Trình tạo câu chuyện tưởng nhớ thú cưng

**Mô tả kịch bản**:
Chuyển đổi ảnh và kỷ niệm thú cưng thành những câu chuyện ấm áp. Ghi chép những khoảnh khắc quý giá với bạn lông.

**Điểm tâm trạng**:
- Lời kể ấm áp
- Kỷ niệm quý giá
- Yêu thương vĩnh cửu

### 11.5 Hướng dẫn an tâm cho chủ thú cưng mới

**Mô tả kịch bản**:
Cung cấp đồng hành ấm áp và hướng dẫn cho chủ thú cưng mới. Để hành trình nuôi thú cưng đầy tin tưởng và niềm vui.

**Điểm tâm trạng**:
- Hướng dẫn toàn diện
- Khích lệ ấm áp
- Đồng hành an tâm

---

## 12. Sức khỏe tài chính

> 💡 **Ý tưởng cốt lõi**: Tự do tài chính không phải mục tiêu, sức khỏe tài chính mới là

### 12.1 Trợ lý nhận thức cảm xúc chi tiêu

**Mô tả kịch bản**:
Nhận thức cảm xúc đằng sau chi tiêu va chạm, xây dựng quan điểm chi tiêu lành mạnh. Hiểu tại sao bạn muốn mua, quan trọng hơn mua hay không.

**Điểm tâm trạng**:
- Nhận thức ấm áp
- Hiểu biết hơn phán xét
- Thói quen lành mạnh

### 12.2 Khích lệ mục tiêu tiết kiệm hóa trực quan

**Mô tả kịch bản**:
Chuyển đổi mục tiêu tiết kiệm thành tiến độ giấc mơ trực quan. Để tiết kiệm trở thành hành trình thực hiện giấc mơ.

**Điểm tâm trạng**:
- Tiến độ trực quan
- Kết nối giấc mơ
- Thành tích hài lòng

### 12.3 Học kiến thức tài chính nhẹ nhàng

**Mô tả kịch bản**:
Học kiến thức tài chính một cách nhẹ nhàng và vui vẻ. Tài chính không nên là buồn tẻ, mà có thể là khám phá vui vẻ.

**Điểm tâm trạng**:
- Biểu đạt nhẹ nhàng
- Ví dụ thú vị
- Kiến thức thực tiễn

### 12.4 Nhà dịu đi lo lắng tài chính

**Mô tả kịch bản**:
Cung cấp hỗ trợ cảm xúc và lời khuyên thực tế khi phải đối mặt với áp lực tài chính. Lo lắng không giải quyết vấn đề, nhưng bình tĩnh có thể.

**Điểm tâm trạng**:
- An tâm cảm xúc
- Lời khuyên thực tế
- Sức mạnh hy vọng

### 12.5 Trò chơi trải nghiệm đầu tư số nhỏ

**Mô tả kịch bản**:
Trải nghiệm đầu tư qua gamify, giảm ngưỡng cửa vào. Trong môi trường an toàn học đầu tư.

**Điểm tâm trạng**:
- Trải nghiệm gamify
- Thử nghiệm an toàn
- Niềm vui học

---

## 13. Phát triển sự nghiệp

> 💡 **Ý tưởng cốt lõi**: Sự nghiệp không phải quỹ đạo, mà là vùng hoang dã khám phá được

### 13.1 Người đồng hành trong mê muội sự nghiệp

**Mô tả kịch bản**:
Cung cấp lắng nghe, khám phá và lời khuyên hướng trong giai đoạn mê muội sự nghiệp. Mê muội là bình thường, quan trọng là không cô đơn.

**Điểm tâm trạng**:
- Lắng nghe không phán xét
- Khám phá khả năng
- Đồng hành ấm áp

### 13.2 Nhà thức tỉnh cảm giác thành tích công việc

**Mô tả kịch bản**:
Giúp phát hiện giá trị và ý nghĩa trong công việc, tái đốt lửa đam mê. Đôi khi chỉ cần đổi góc độ nhìn.

**Điểm tâm trạng**:
- Khám phá giá trị
- Tái đốt đam mê
- Thành tích hài lòng

### 13.3 Trợ lý tâm trạng giao tiếp nơi làm việc

**Mô tả kịch bản**:
Cung cấp chủ đề xã hội nhẹ nhàng và lời khuyên tương tác nơi làm việc. Để giao tiếp nơi làm việc không quá khó xử, tự nhiên hơn.

**Điểm tâm trạng**:
- Chủ đề nhẹ nhàng
- Tương tác tự nhiên
- Quan hệ thoải mái

### 13.4 Máy kích thích cảm hứng công việc phụ

**Mô tả kịch bản**:
Kích thích ý tưởng công việc phụ dựa trên sở thích và kỹ năng cá nhân. Khám phá khả năng vô hạn ngoài công việc.

**Điểm tâm trạng**:
- Khám phá sở thích
- Khám phá khả năng
- Khích lệ hành động

### 13.5 Trạm cộng dũng khí trước phỏng vấn

**Mô tả kịch bản**:
Cung cấp xây dựng tâm lý và khích lệ sự tự tin trước phỏng vấn. Để người dùng đi gặp cơ hội với trạng thái tốt nhất.

**Điểm tâm trạng**:
- Xây dựng sự tự tin
- Chuẩn bị đầy đủ
- Trạng thái tốt nhất

---

## 14. Không gian nhà

> 💡 **Ý tưởng cốt lõi**: Nhà không chỉ là nơi ở, mà là nơi tâm linh lưu lạc

### 14.1 Nhà thiết kế tâm trạng không gian nhà

**Mô tả kịch bản**:
Thiết kế phương án tâm trạng nhà dựa trên tâm trạng và mùa. Để nhà thay đổi theo tâm trạng và mùa.

**Điểm tâm trạng**:
- Thiết kế tâm trạng
- Thay đổi mùa
- Ghép tâm trạng

### 14.2 Hướng dẫn thay đổi trang trí nhà theo bốn mùa

**Mô tả kịch bản**:
Thay đổi trang trí nhà theo mùa, giữ cảm giác tươi mới. Để nhà luôn sinh động và bất ngờ.

**Điểm tâm trạng**:
- Chủ đề mùa
- Cảm giác tươi mới
- Nghi thức cuộc sống

### 14.3 Phép thuật không gian căn hộ nhỏ

**Mô tả kịch bản**:
Để không gian nhỏ cũng có tâm trạng thoải mái ấm áp. Kích thước không quan trọng, cảm giác quan trọng.

**Điểm tâm trạng**:
- Tối ưu hóa không gian
- Tâm trạng ấm áp
- Sống thoải mái

### 14.4 Người tạo tâm trạng nghi thức nhà

**Mô tả kịch bản**:
Tạo tâm trạng nghi thức cho các hoạt động nhà hàng ngày. Để những việc nhà bình thường cũng có ý nghĩa.

**Điểm tâm trạng**:
- Thiết kế nghi thức
- Gán ý nghĩa
- Chất lượng cuộc sống

### 14.5 Đồng hành tâm lý dỡ bỏ độc lập

**Mô tả kịch bản**:
Cung cấp hỗ trợ tâm lý khi sắp xếp đồ vật, lời khuyên quyết định. Dỡ bỏ không chỉ là vứt đồ, mà là sắp xếp tâm hồn.

**Điểm tâm trạng**:
- Hỗ trợ tâm lý
- Trợ giúp quyết định
- Sắp xếp tâm hồn

---

## 15. Nấu ăn và món ăn

> 💡 **Ý tưởng cốt lõi**: Thức ăn là ngôn ngữ của tình yêu, nấu ăn là cách biểu đạt yêu thương

### 15.1 Nấu ăn chữa lành một mình ăn

**Mô tả kịch bản**:
Thiết kế phương án nấu ăn chữa lành đơn giản cho những người sống một mình. Một người cũng phải ăn ngon, phải yêu bản thân.

**Điểm tâm trạng**:
- Cách nấu đơn giản
- Vị chữa lành
- Biểu đạt yêu thương bản thân

### 15.2 Thiết kế tâm trạng bàn ăn ngày lễ

**Mô tả kịch bản**:
Thiết kế bố trí bàn ăn có tâm trạng cho ngày đặc biệt. Để mỗi bữa ăn đều là khoảnh khắc đáng nhớ.

**Điểm tâm trạng**:
- Thiết kế nghi thức
- Thưởng thức thị giác
- Kỷ niệm đẹp

### 15.3 Người ghép nấu ăn tâm trạng

**Mô tả kịch bản**:
Gợi ý thực phẩm và phương pháp nấu ăn phù hợp dựa trên tâm trạng. Đôi khi chúng ta cần chính là cái vị đó.

**Điểm tâm trạng**:
- Ghép tâm trạng
- Chữa lành thực phẩm
- Kết nối cảm xúc

### 15.4 Xây dựng sự tự tin cho người nấu ăn mới

**Mô tả kịch bản**:
Cung cấp khích lệ ấm áp và công thức đơn giản cho người mới bắt đầu nấu ăn. Mỗi người đều có thể trở thành đầu bếp của chính mình.

**Điểm tâm trạng**:
- Bắt đầu đơn giản
- Khích lệ ấm áp
- Xây dựng sự tự tin

### 15.5 Hướng dẫn tâm trạng nhiếp ảnh đồ ăn

**Mô tả kịch bản**:
Để nấu ăn hàng ngày cũng có thể chụp được cảm giác lôi cuốn. Ghi chép đồ ăn, cũng là ghi chép vẻ đẹp cuộc sống.

**Điểm tâm trạng**:
- Tạo tâm trạng
- Thưởng thức thị giác
- Ghi chép cuộc sống

---

## 16. Phong cách thời trang

> 💡 **Ý tưởng cốt lõi**: Thời trang là biểu đạt bản thân, phong cách là thể hiện nội tại

### 16.1 Bảng tâm trạng thời trang hôm nay

**Mô tả kịch bản**:
Tạo ý tưởng thời trang dựa trên thời tiết, dịp, tâm trạng. Để mỗi lựa chọn quần áo đều thể hiện tâm trạng hiện tại.

**Điểm tâm trạng**:
- Biểu đạt tâm trạng
- Ghép dịp
- Xây dựng sự tự tin

### 16.2 Nhà ghép quần áo viên nang

**Mô tả kịch bản**:
Tạo khả năng kết hợp vô hạn với số lượng hạn chế. Ít là nhiều, đơn giản cũng có thể có phong cách.

**Điểm tâm trạng**:
- Ý tưởng cực đơn giản
- Kết hợp sáng tạo
- Thời trang bền vững

### 16.3 Chuyến du ngoạn khám phá phong cách cá nhân

**Mô tả kịch bản**:
Giúp phát hiện và xây dựng phong cách cá nhân độc đáo. Thời trang không chỉ là mặc quần áo, mà là mặc thái độ.

**Điểm tâm trạng**:
- Khám phá bản thân
- Xây dựng phong cách
- Biểu đạt sự tự tin

### 16.4 Nhà sáng tạo mặc lại quần áo cũ

**Mô tả kịch bản**:
Cung cấp ý tưởng kết hợp mới cho quần áo cũ. Để quần áo cũ tái sinh, tạo thời trang bền vững.

**Điểm tâm trạng**:
- Kết hợp sáng tạo
- Lý tưởng môi trường
- Cảm giác mới

### 16.5 Cố vấn tạo kiểu cho dịp đặc biệt

**Mô tả kịch bản**:
Thiết kế kiểu tóc đầy tự tin cho những dịp quan trọng. Để mỗi khoảnh khắc quan trọng đều có sự thể hiện hoàn hảo.

**Điểm tâm trạng**:
- Ghép dịp
- Nâng cao sự tự tin
- Thể hiện hoàn hảo

---

## Tâm pháp cốt lõi của thiết kế sản phẩm C2C

### 1. Từ "Chức năng" đến "Cảm giác"

Sản phẩm B2B tập trung vào "chức năng này giải quyết vấn đề gì", sản phẩm C2C tập trung vào "chức năng này mang lại cảm giác gì".

| Tư duy B2B | Tư duy C2C |
|---------|---------|
| Tăng hiệu suất | Tiết kiệm thời gian để làm những gì bạn thích |
| Giảm chi phí | Mỗi đồng tiền được chi đều đáng giá |
| Giải quyết khó khăn | Tạo trải nghiệm tuyệt vời |
| Chức năng toàn diện | Cảm giác đúng |

### 2. Ba tầng của tâm trạng tâm trạng

**Tầng cảm giác**: Thiết kế thị giác, thính giác, xúc giác
- Màu sắc ấm áp
- Âm thanh dịu dàng
- Hiệu ứng mịn

**Tầng cảm xúc**: Cảm xúc cộng rung và hướng dẫn
- Hiểu tâm trạng người dùng
- Cung cấp hỗ trợ cảm xúc
- Tạo cảm xúc tích cực

**Tầng ý nghĩa**: Sự công nhận và thuộc về giá trị
- Để người dùng cảm thấy được hiểu
- Tạo cảm giác thuộc về
- Gán ý nghĩa cho hành động

### 3. Sức mạnh của gợi ý tâm lý

Văn bản và thiết kế của sản phẩm C2C đều truyền gợi ý tâm lý:

- **Gợi ý tích cực**: "Bạn đã làm rất tốt", "Từ từ đi, không sao"
- **Gợi ý thuộc về**: "Nhiều người giống bạn", "Bạn không cô đơn"
- **Gợi ý phát triển**: "Mỗi lần thử là tiến bộ", "Bạn đang trở nên tốt hơn"

### 4. Giúp người dùng trở thành phiên bản tốt hơn của chính họ

Sản phẩm C2C tốt nhất không phải thay đổi người dùng, mà là giúp người dùng trở thành những người họ muốn trở thành.

- Không phải "bạn nên...", mà là "bạn có thể..."
- Không phải "bạn phải...", mà là "nếu bạn muốn..."
- Không phải "bạn chưa đủ...", mà là "bạn đã..."

---

> 🌟 **Nhớ**: Người dùng C2C không mua chức năng, mà mua cảm giác; không mua công cụ, mà mua đồng hành; không mua dịch vụ, mà mua sự hiểu biết.
