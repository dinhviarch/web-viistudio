// Danh sách dự án. Mỗi dự án sinh ra một trang /du-an/<slug>/.
// Ảnh: nếu chưa có ảnh thật, build tự sinh ảnh minh hoạ từ `art`.
// Khi có ảnh thật, chép vào src/assets/images/du-an/ rồi khai báo, ví dụ:
//   images: ['/assets/images/du-an/nha-gach-lo-1.jpg', '/assets/images/du-an/nha-gach-lo-2.jpg']
// Ảnh đầu tiên được dùng làm ảnh đại diện.

const categories = [
  { id: 'nha-o', label: 'Nhà ở' },
  { id: 'cong-dong', label: 'Công cộng' },
  { id: 'van-phong', label: 'Văn phòng & Thương mại' },
  { id: 'noi-that', label: 'Nội thất' }
];

const projects = [
  {
    slug: 'nha-gach-lo',
    title: 'Nhà Gạch Lỗ',
    category: 'nha-o',
    location: 'Đống Đa, Hà Nội',
    year: 2024,
    area: '186 m²',
    status: 'Hoàn thành',
    featured: true,
    art: { type: 'townhouse', palette: 'clay' },
    summary: 'Nhà phố 4 tầng trên lô đất 4 × 15 m với lớp vỏ gạch lỗ thở, lọc nắng và gió cho toàn bộ mặt tiền hướng Tây.',
    body: [
      'Khu đất hẹp, mặt tiền hướng Tây và kẹp giữa hai nhà cao tầng — bài toán quen thuộc của nhà phố Hà Nội. Chúng tôi lùi khối nhà khỏi mặt đường 1,2 m và bọc bằng một lớp vỏ gạch đất nung lỗ, xếp so le để nắng chiều chỉ còn là những đốm sáng nhỏ trên sàn.',
      'Giếng trời xuyên suốt bốn tầng kết hợp cầu thang thép mảnh tạo hiệu ứng ống khói, kéo gió từ sân trước lên mái. Mỗi tầng đều có một khoảng xanh nhỏ, để người ở luôn nhìn thấy cây dù đứng ở bất cứ đâu.'
    ],
    facts: { 'Chủ đầu tư': 'Gia đình anh Tuấn', 'Diện tích đất': '60 m²', 'Số tầng': '4 tầng + tum', 'Vật liệu chính': 'Gạch lỗ đất nung, bê tông, gỗ sồi' }
  },
  {
    slug: 'biet-thu-doi-thong',
    title: 'Biệt thự Đồi Thông',
    category: 'nha-o',
    location: 'Phường 3, Đà Lạt',
    year: 2023,
    area: '420 m²',
    status: 'Hoàn thành',
    featured: true,
    art: { type: 'gable', palette: 'mist' },
    summary: 'Hai khối mái dốc nép theo sườn đồi, mở tầm nhìn về rừng thông và giữ ấm bằng tường đá ong dày.',
    body: [
      'Công trình chia thành hai khối nhà mái dốc nối với nhau bằng một hành lang kính, bám theo độ dốc tự nhiên của khu đất thay vì san phẳng. Nhờ vậy gần như toàn bộ cây thông hiện hữu được giữ lại.',
      'Tường phía Bắc dày 40 cm bằng đá ong và gạch mộc tích nhiệt ban ngày, toả ấm về đêm. Phía Nam mở các ô kính lớn đón nắng mùa đông, có mái đua sâu che nắng hè.'
    ],
    facts: { 'Chủ đầu tư': 'Bảo mật', 'Diện tích đất': '1.150 m²', 'Số tầng': '2 tầng', 'Vật liệu chính': 'Đá ong, gỗ thông, ngói đất nung' }
  },
  {
    slug: 'nha-san-vuon-thu-duc',
    title: 'Nhà Sân Vườn Thủ Đức',
    category: 'nha-o',
    location: 'TP. Thủ Đức, TP. Hồ Chí Minh',
    year: 2023,
    area: '310 m²',
    status: 'Hoàn thành',
    featured: true,
    art: { type: 'house', palette: 'sand' },
    summary: 'Khối tầng hai vươn công-xôn che bóng cho sân vườn và hồ bơi, biến khoảng sân thành phòng khách ngoài trời.',
    body: [
      'Ngôi nhà được tổ chức quanh một sân trong rợp bóng cây sấu. Khối phòng ngủ phía trên vươn dài 6 m, tạo bóng đổ lớn cho sân và hồ bơi — nơi cả gia đình sinh hoạt phần lớn thời gian trong ngày.',
      'Hệ lam gỗ dọc trên tầng hai có thể xoay, giúp điều chỉnh ánh sáng và sự riêng tư theo từng giờ.'
    ],
    facts: { 'Chủ đầu tư': 'Gia đình chị Hạnh', 'Diện tích đất': '480 m²', 'Số tầng': '2 tầng', 'Vật liệu chính': 'Bê tông trần, gỗ teak, đá granite' }
  },
  {
    slug: 'thu-vien-cong-dong-hoi-an',
    title: 'Thư viện Cộng đồng Hội An',
    category: 'cong-dong',
    location: 'Cẩm Thanh, Hội An',
    year: 2022,
    area: '650 m²',
    status: 'Hoàn thành',
    featured: true,
    art: { type: 'pavilion', palette: 'stone' },
    summary: 'Một tấm mái lớn trên hàng cột mảnh — thư viện mở, nơi trẻ em làng chài đọc sách giữa gió sông.',
    body: [
      'Thư viện được hình dung như một chiếc đình làng đương đại: một tấm mái phẳng rộng, nâng cao để thông gió, bên dưới là các kệ sách và khoảng đọc linh hoạt không vách ngăn.',
      'Nền công trình được nâng 80 cm phòng lũ. Toàn bộ kết cấu thép lắp ghép, giúp thi công nhanh trong mùa khô và dễ sửa chữa sau mỗi mùa mưa bão.'
    ],
    facts: { 'Chủ đầu tư': 'Quỹ Sách cho em', 'Kết cấu': 'Khung thép lắp ghép', 'Sức chứa': '120 chỗ đọc', 'Giải thưởng': 'Giải Bạc Kiến trúc Quốc gia 2023' }
  },
  {
    slug: 'truong-mam-non-may',
    title: 'Trường mầm non Mây',
    category: 'cong-dong',
    location: 'Từ Sơn, Bắc Ninh',
    year: 2024,
    area: '1.200 m²',
    status: 'Hoàn thành',
    featured: false,
    art: { type: 'arches', palette: 'clay' },
    summary: 'Dãy vòm thấp theo tỉ lệ trẻ em, mái xanh trồng rau và sân chơi chạy vòng quanh công trình.',
    body: [
      'Mọi kích thước của ngôi trường được thiết kế từ chiều cao của một em bé 4 tuổi: ô cửa, bậc thang, tay vịn. Dãy vòm liên tục tạo hành lang mát, đồng thời là nơi chơi khi trời mưa.',
      'Mái nhà là vườn rau và sân chơi thứ hai, giảm nhiệt cho các lớp học bên dưới tới 3 °C so với mái tôn thông thường.'
    ],
    facts: { 'Chủ đầu tư': 'Công ty Giáo dục Mây', 'Quy mô': '8 lớp · 240 trẻ', 'Số tầng': '2 tầng', 'Vật liệu chính': 'Gạch nung, bê tông, sơn khoáng' }
  },
  {
    slug: 'van-phong-la',
    title: 'Văn phòng Lá',
    category: 'van-phong',
    location: 'Hải Châu, Đà Nẵng',
    year: 2022,
    area: '2.400 m²',
    status: 'Hoàn thành',
    featured: true,
    art: { type: 'tower', palette: 'mist' },
    summary: 'Toà văn phòng 9 tầng với lớp lam ngang toàn mặt đứng và vườn treo giữa thân nhà.',
    body: [
      'Hệ lam nhôm ngang được tính toán theo góc nắng Đà Nẵng, cắt giảm 40% bức xạ trực tiếp mà vẫn giữ tầm nhìn ra sông Hàn. Tầng 5 được để trống làm vườn treo — lá phổi chung cho toàn bộ người làm việc trong toà nhà.',
      'Khối đế mở về phía phố với quán cà phê và sảnh đi bộ xuyên suốt, trả lại một phần không gian cho đô thị.'
    ],
    facts: { 'Chủ đầu tư': 'Leaf Holdings', 'Số tầng': '9 tầng + 1 hầm', 'Chứng chỉ': 'LOTUS Gold (dự kiến)', 'Vật liệu chính': 'Kính Low-E, lam nhôm, bê tông' }
  },
  {
    slug: 'cafe-suong',
    title: 'Café Sương',
    category: 'van-phong',
    location: 'Thị xã Sa Pa, Lào Cai',
    year: 2025,
    area: '140 m²',
    status: 'Đang thi công',
    featured: false,
    art: { type: 'gable', palette: 'stone' },
    summary: 'Quán cà phê nhỏ trên sườn núi, hai mái dốc hướng về thung lũng Mường Hoa.',
    body: [
      'Hai khối mái dốc nhỏ lấy cảm hứng từ nhà trình tường của người H’Mông, nhưng mở kính lớn về phía thung lũng. Tường trình đất được làm bởi chính thợ địa phương.',
      'Khối bếp và kho được đặt chìm vào sườn đồi, giữ cho hình khối công trình thấp và hoà vào địa hình.'
    ],
    facts: { 'Chủ đầu tư': 'Sương Coffee', 'Sức chứa': '40 khách', 'Số tầng': '1 tầng + gác', 'Vật liệu chính': 'Đất trình, gỗ pơ mu, kính' }
  },
  {
    slug: 'can-ho-anh-sang',
    title: 'Căn hộ Ánh Sáng',
    category: 'noi-that',
    location: 'Tây Hồ, Hà Nội',
    year: 2025,
    area: '120 m²',
    status: 'Hoàn thành',
    featured: false,
    art: { type: 'interior', palette: 'sand' },
    summary: 'Cải tạo căn hộ chung cư cũ thành một không gian mở, nơi ánh sáng hồ Tây chạm tới tận phòng trong cùng.',
    body: [
      'Chúng tôi phá bỏ ba vách ngăn, gom các chức năng phụ vào một “khối gỗ” ở giữa căn hộ: tủ, kho, phòng tắm và bậc lên gác lửng. Phần còn lại là một không gian liền mạch hướng về cửa sổ lớn.',
      'Bảng màu giới hạn ở vôi trắng, gỗ sồi và một điểm nhấn đất nung, để ánh sáng tự nhiên là vật liệu chính.'
    ],
    facts: { 'Chủ đầu tư': 'Anh Minh & chị Lan', 'Loại hình': 'Cải tạo căn hộ', 'Thời gian thi công': '10 tuần', 'Vật liệu chính': 'Gỗ sồi, sơn vôi, gạch đất nung' }
  }
];

module.exports = { categories, projects };
