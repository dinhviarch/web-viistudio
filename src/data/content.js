// Nội dung các trang: dịch vụ, quy trình, đội ngũ, số liệu, đánh giá, câu hỏi thường gặp.

module.exports = {
  stats: [
    { value: '12', label: 'năm hành nghề' },
    { value: '140+', label: 'công trình hoàn thành' },
    { value: '18', label: 'kiến trúc sư & kỹ sư' },
    { value: '9', label: 'giải thưởng kiến trúc' }
  ],

  services: [
    {
      id: 'kien-truc',
      title: 'Thiết kế kiến trúc',
      summary: 'Nhà phố, biệt thự, nhà vườn, công trình công cộng và văn phòng — từ ý tưởng tới hồ sơ thi công.',
      items: ['Khảo sát hiện trạng & phân tích khí hậu', 'Ý tưởng, phương án mặt bằng & hình khối', 'Hồ sơ xin phép xây dựng', 'Hồ sơ kỹ thuật thi công đầy đủ']
    },
    {
      id: 'noi-that',
      title: 'Thiết kế nội thất',
      summary: 'Không gian sống và làm việc được thiết kế đồng bộ với kiến trúc, đến từng chi tiết đồ gỗ và ánh sáng.',
      items: ['Bố trí công năng & luồng di chuyển', 'Vật liệu, màu sắc, chiếu sáng', 'Thiết kế đồ nội thất riêng', 'Phối cảnh 3D & bản vẽ chế tạo']
    },
    {
      id: 'cai-tao',
      title: 'Cải tạo & tái sử dụng',
      summary: 'Làm mới nhà cũ, căn hộ, nhà xưởng — giữ lại những gì đáng giá và tối ưu chi phí.',
      items: ['Đánh giá kết cấu hiện trạng', 'Giải pháp cải tạo theo giai đoạn', 'Tái sử dụng vật liệu cũ', 'Kiểm soát chi phí cải tạo']
    },
    {
      id: 'giam-sat',
      title: 'Giám sát tác giả',
      summary: 'Kiến trúc sư đồng hành tại công trường để bản vẽ được hiện thực đúng tinh thần thiết kế.',
      items: ['Lựa chọn nhà thầu & vật liệu', 'Kiểm tra định kỳ tại công trường', 'Xử lý phát sinh kỹ thuật', 'Nghiệm thu & bàn giao']
    }
  ],

  process: [
    { title: 'Gặp gỡ & lắng nghe', text: 'Tìm hiểu nếp sống, mong muốn, ngân sách và khảo sát khu đất. Buổi tư vấn đầu tiên luôn miễn phí.' },
    { title: 'Ý tưởng', text: 'Phân tích nắng, gió, cảnh quan; đề xuất 2 – 3 hướng tiếp cận bằng phác thảo và mô hình khối.' },
    { title: 'Phát triển thiết kế', text: 'Hoàn thiện mặt bằng, mặt đứng, vật liệu và phối cảnh. Phối hợp kết cấu, điện nước, cảnh quan.' },
    { title: 'Hồ sơ kỹ thuật', text: 'Bộ bản vẽ thi công chi tiết, dự toán và hồ sơ xin phép xây dựng.' },
    { title: 'Đồng hành thi công', text: 'Giám sát tác giả, chọn vật liệu mẫu, cùng chủ nhà nghiệm thu đến ngày dọn vào ở.' }
  ],

  principles: [
    { title: 'Khí hậu là điểm xuất phát', text: 'Mỗi công trình bắt đầu từ hướng nắng, hướng gió và mùa mưa — không phải từ một phong cách.' },
    { title: 'Ít nhưng đủ', text: 'Bớt đi những gì không cần thiết để không gian, ánh sáng và vật liệu tự nói lên giá trị.' },
    { title: 'Vật liệu địa phương', text: 'Ưu tiên gạch, gỗ, đá, đất từ nơi xây dựng và những người thợ hiểu chúng nhất.' }
  ],

  team: [
    { name: 'KTS. Nguyễn Viết Viin', role: 'Kiến trúc sư trưởng · Sáng lập', initials: 'NV' },
    { name: 'KTS. Trần Thu Hà', role: 'Giám đốc thiết kế', initials: 'TH' },
    { name: 'KTS. Lê Minh Quân', role: 'Chủ trì kiến trúc', initials: 'MQ' },
    { name: 'KS. Phạm Hoài An', role: 'Kỹ sư kết cấu', initials: 'HA' },
    { name: 'NTK. Đỗ Khánh Linh', role: 'Chủ trì nội thất', initials: 'KL' },
    { name: 'KTS. Vũ Đức Long', role: 'Quản lý dự án', initials: 'ĐL' }
  ],

  timeline: [
    { year: '2014', text: 'Thành lập studio 3 người tại một căn gác phố cổ Hà Nội.' },
    { year: '2017', text: 'Hoàn thành công trình công cộng đầu tiên — nhà văn hoá thôn Đông Lỗ.' },
    { year: '2020', text: 'Mở văn phòng đại diện tại TP. Hồ Chí Minh.' },
    { year: '2023', text: 'Giải Bạc Giải thưởng Kiến trúc Quốc gia cho Thư viện Cộng đồng Hội An.' },
    { year: '2025', text: 'Đội ngũ 18 người, hơn 140 công trình trên khắp Việt Nam.' }
  ],

  awards: [
    { year: '2023', name: 'Giải thưởng Kiến trúc Quốc gia — Giải Bạc', project: 'Thư viện Cộng đồng Hội An' },
    { year: '2023', name: 'Ashui Awards — Công trình nhà ở của năm', project: 'Nhà Sân Vườn Thủ Đức' },
    { year: '2022', name: 'Green Building Vietnam — Đề cử', project: 'Văn phòng Lá' },
    { year: '2021', name: 'Ashui Awards — Nhà phố tiêu biểu', project: 'Nhà ống Kim Mã' }
  ],

  testimonials: [
    { quote: 'Viin không vẽ cho chúng tôi một ngôi nhà đẹp, họ vẽ ra cách cả nhà muốn sống. Ba năm rồi, chiều nào cũng thấy nắng đổ qua lớp gạch mà vẫn mát.', name: 'Anh Tuấn', role: 'Chủ nhà — Nhà Gạch Lỗ' },
    { quote: 'Đội ngũ lắng nghe rất kỹ, giải thích rõ từng quyết định và luôn có mặt ở công trường khi cần. Chi phí được kiểm soát đúng như cam kết ban đầu.', name: 'Chị Hạnh', role: 'Chủ nhà — Nhà Sân Vườn Thủ Đức' }
  ],

  faq: [
    { q: 'Chi phí thiết kế được tính như thế nào?', a: 'Phí thiết kế tính theo m² sàn và mức độ phức tạp của công trình, thường từ 250.000 – 450.000 đ/m² cho kiến trúc và 300.000 – 500.000 đ/m² cho nội thất. Chúng tôi gửi báo giá chi tiết sau buổi khảo sát.' },
    { q: 'Thời gian thiết kế mất bao lâu?', a: 'Một ngôi nhà phố thường cần 6 – 10 tuần từ ý tưởng đến hồ sơ thi công; biệt thự và công trình công cộng 3 – 6 tháng tuỳ quy mô.' },
    { q: 'Viin có nhận thi công không?', a: 'Viin tập trung vào thiết kế và giám sát tác giả. Chúng tôi giới thiệu và cùng chủ nhà lựa chọn các nhà thầu đã hợp tác lâu năm, đồng thời giám sát chất lượng trong suốt quá trình thi công.' },
    { q: 'Tôi ở tỉnh khác, có làm việc được không?', a: 'Được. Chúng tôi đã thực hiện công trình tại hơn 20 tỉnh thành. Các buổi trao đổi có thể làm trực tuyến, kiến trúc sư sẽ đến khảo sát và giám sát theo các mốc quan trọng.' }
  ]
};
