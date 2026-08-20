import { SimpleBusinessPage } from '@/app/components/business-site';
import Link from 'next/link';

const products = [
  ['Tấm pin năng lượng mặt trời', 'Module PV', 'Hiệu suất, độ bền và kích thước được lựa chọn theo thiết kế hệ thống.'],
  ['Inverter On-grid', 'Inverter', 'Chuyển đổi và quản lý nguồn điện mặt trời cho hệ thống hòa lưới.'],
  ['Inverter Hybrid', 'Inverter', 'Kết hợp PV, lưới và pin lưu trữ trong một hệ thống quản lý năng lượng.'],
  ['Pin lưu trữ', 'Battery', 'Lưu trữ điện để tăng khả năng tự dùng và hỗ trợ dự phòng.'],
  ['Tủ điện bảo vệ', 'Electrical', 'Bảo vệ, phân phối và tổ chức hệ thống điện an toàn.'],
  ['Khung & phụ kiện', 'Balance of System', 'Giải pháp cơ khí và phụ kiện theo kết cấu mái thực tế.'],
];

export default function ProductsPage() {
  return <SimpleBusinessPage eyebrow="SẢN PHẨM" title="Thiết bị và cấu hình cho một hệ thống điện mặt trời hoàn chỉnh." intro="Không chỉ chọn một thiết bị tốt. Điều quan trọng là các thiết bị phải phù hợp và phối hợp đúng trong cùng một hệ thống.">
    <section className="business-section"><div className="site-shell"><div className="product-grid large">{products.map(([name, type, text], i) => <Link href="/lien-he" className="product-card product-card-large" key={name}><span>0{i + 1} · {type}</span><div className="product-icon">☀</div><h2>{name}</h2><p>{text}</p><b>Nhận tư vấn cấu hình →</b></Link>)}</div></div></section>
  </SimpleBusinessPage>;
}
