import { SimpleBusinessPage } from '@/app/components/business-site';
import Link from 'next/link';

const items = [
  ['Hộ gia đình', '2–10 kWp', 'Tối ưu tự dùng cho nhà phố, biệt thự và hộ gia đình.'],
  ['Cửa hàng / văn phòng', '5–30 kWp', 'Tập trung vào tải ban ngày và hiệu quả vận hành.'],
  ['Doanh nghiệp', '30–500+ kWp', 'Thiết kế theo phụ tải, mái và mục tiêu đầu tư.'],
  ['Nhà xưởng', 'Theo khảo sát', 'Giải pháp rooftop cho diện tích mái lớn và tải sản xuất.'],
];

export default function InstallationPage() {
  return <SimpleBusinessPage eyebrow="LẮP ĐẶT ĐIỆN MẶT TRỜI" title="Giải pháp điện mặt trời được thiết kế cho chính công trình của bạn." intro="Từ khảo sát mái và nhu cầu điện đến thiết kế, thi công, nghiệm thu và đồng hành vận hành.">
    <section className="business-section"><div className="site-shell"><div className="solution-detail-grid">{items.map(([name, capacity, text]) => <article className="detail-card" key={name}><span>{capacity}</span><h2>{name}</h2><p>{text}</p><Link href="/lien-he">Yêu cầu khảo sát →</Link></article>)}</div></div></section>
    <section className="dark-detail"><div className="site-shell two-col-detail"><div><span className="eyebrow">QUY TRÌNH</span><h2>6 bước từ nhu cầu đến hệ thống vận hành.</h2></div><div className="steps"><div><b>01</b><span>Tiếp nhận nhu cầu</span></div><div><b>02</b><span>Khảo sát hiện trạng</span></div><div><b>03</b><span>Thiết kế & báo giá</span></div><div><b>04</b><span>Ký kết & chuẩn bị thi công</span></div><div><b>05</b><span>Lắp đặt & nghiệm thu</span></div><div><b>06</b><span>Bàn giao & hỗ trợ</span></div></div></div></section>
  </SimpleBusinessPage>;
}
