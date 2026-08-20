import { SimpleBusinessPage } from '@/app/components/business-site';

export default function AboutPage() {
  return <SimpleBusinessPage eyebrow="VỀ MT SOLAR" title="Một đội ngũ năng lượng tập trung vào hiệu quả dài hạn." intro="Website mới được xây dựng để biến năng lực và dữ liệu kinh doanh của MT Solar thành một trải nghiệm số rõ ràng, hiện đại và có khả năng tạo khách hàng.">
    <section className="business-section"><div className="site-shell about-grid"><div className="about-number">MT<br/>SOLAR</div><div><h2>Từ tư vấn đến vận hành, mọi quyết định đều bắt đầu từ nhu cầu thực tế.</h2><p>Chúng tôi tập trung vào giải pháp điện mặt trời có tính ứng dụng: hiểu nhu cầu sử dụng, khảo sát hiện trạng, thiết kế hệ thống, thi công đồng bộ và hỗ trợ sau bàn giao.</p><p>Thông tin pháp lý, địa chỉ, hotline, chính sách bảo hành và hồ sơ năng lực sẽ được đồng bộ theo dữ liệu chính thức của MT Solar trước khi nghiệm thu Production.</p></div></div></section>
    <section className="dark-detail"><div className="site-shell about-values"><div><span>01</span><h3>Minh bạch</h3><p>Giải thích rõ cấu hình, phạm vi và điều kiện thực tế.</p></div><div><span>02</span><h3>Hiệu quả</h3><p>Ưu tiên bài toán sử dụng điện và hiệu quả đầu tư.</p></div><div><span>03</span><h3>Đồng hành</h3><p>Hỗ trợ khách hàng trong suốt vòng đời hệ thống.</p></div></div></section>
  </SimpleBusinessPage>;
}
