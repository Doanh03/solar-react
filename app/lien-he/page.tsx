import { LeadSection } from '@/app/components/lead-section';
import { SimpleBusinessPage } from '@/app/components/business-site';

export default function ContactPage() {
  return <SimpleBusinessPage eyebrow="LIÊN HỆ" title="Bắt đầu từ một cuộc khảo sát." intro="Gửi thông tin nhu cầu. Hệ thống lead hiện tại sẽ tiếp tục xử lý và lưu dữ liệu PostgreSQL như flow Production đang sử dụng.">
    <section className="business-section"><div className="site-shell contact-layout"><div><h2>Nhận tư vấn cấu hình</h2><p>Cho chúng tôi biết mức tiêu thụ điện, loại công trình và nhu cầu lưu trữ. Đội ngũ tư vấn sẽ tiếp nhận và phản hồi.</p><div className="contact-points"><div><span>01</span><b>Tư vấn nhu cầu</b></div><div><span>02</span><b>Khảo sát thực tế</b></div><div><span>03</span><b>Đề xuất cấu hình</b></div></div></div><div className="lead-form-wrap"><LeadSection /></div></div></section>
  </SimpleBusinessPage>;
}
