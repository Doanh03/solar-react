import { SimpleBusinessPage } from '@/app/components/business-site';
import Link from 'next/link';

const articles = [
  ['01', 'Điện mặt trời hòa lưới là gì?', 'Những nguyên lý cơ bản và khi nào mô hình này phù hợp.'],
  ['02', 'Hybrid khác On-grid như thế nào?', 'So sánh mục tiêu sử dụng, lưu trữ và dự phòng.'],
  ['03', 'Có nên lắp pin lưu trữ?', 'Những yếu tố cần cân nhắc trước khi đầu tư hệ thống lưu trữ.'],
  ['04', 'Cách tính công suất điện mặt trời', 'Từ hóa đơn điện đến bài toán công suất tham khảo.'],
  ['05', 'Những yếu tố ảnh hưởng sản lượng', 'Hướng mái, bóng che, thời tiết, thiết bị và tải tiêu thụ.'],
  ['06', 'Bảo trì hệ thống điện mặt trời', 'Những hạng mục nên kiểm tra để hệ thống vận hành ổn định.'],
];

export default function KnowledgePage() {
  return <SimpleBusinessPage eyebrow="KIẾN THỨC" title="Hiểu đúng trước khi đầu tư điện mặt trời." intro="Kho nội dung giúp khách hàng tự tin hơn khi lựa chọn hệ thống, thiết bị và phương án lưu trữ.">
    <section className="business-section">
      <div className="site-shell article-grid">
        {articles.map(([num, title, text]) => (
          <Link className="article-card" href="/lien-he" key={title}>
            <span>{num}</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <b>Đọc bài →</b>
          </Link>
        ))}
      </div>
    </section>
  </SimpleBusinessPage>;
}
