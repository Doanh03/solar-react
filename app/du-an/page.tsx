import { SimpleBusinessPage } from '@/app/components/business-site';
import Link from 'next/link';

const projects = [
  ['01', 'Hộ gia đình', 'Rooftop residential', 'Thiết kế hệ thống theo mức tiêu thụ điện và diện tích mái.'],
  ['02', 'Nhà phố', 'Hybrid energy', 'Tăng tỷ lệ tự dùng và bổ sung khả năng lưu trữ.'],
  ['03', 'Doanh nghiệp', 'Commercial rooftop', 'Tối ưu sản lượng cho tải tiêu thụ trong giờ làm việc.'],
  ['04', 'Nhà xưởng', 'Industrial rooftop', 'Khai thác diện tích mái lớn và bám theo phụ tải sản xuất.'],
  ['05', 'Cơ sở kinh doanh', 'Energy saving', 'Giải pháp cân bằng giữa đầu tư, sản lượng và vận hành.'],
  ['06', 'Nâng cấp hệ thống', 'Upgrade', 'Kiểm tra và tối ưu hệ thống điện mặt trời hiện hữu.'],
];

export default function ProjectsPage() {
  return <SimpleBusinessPage eyebrow="DỰ ÁN THỰC TẾ" title="Những công trình được xây dựng từ bài toán điện thực tế." intro="Mỗi dự án có một cấu hình khác nhau. Trang này là nơi khách hàng có thể xem nhóm công trình và hiểu cách MT Solar tiếp cận bài toán.">
    <section className="business-section"><div className="site-shell"><div className="project-showcase-grid">{projects.map(([num, type, title, text]) => <article key={title}><span>{num} · {type}</span><div className="project-visual"><i/><i/><i/></div><h2>{title}</h2><p>{text}</p><Link href="/lien-he">Tư vấn dự án tương tự →</Link></article>)}</div></div></section>
  </SimpleBusinessPage>;
}
