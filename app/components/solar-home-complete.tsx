'use client';

import Link from 'next/link';
import { useState } from 'react';
import HeroV2 from './hero-v2';
import { LeadSection } from './lead-section';
import { BusinessFooter } from './business-site';
import { ContactConversion } from './contact-conversion';

const solutions = [
  ['Hộ gia đình', 'Điện mặt trời theo nhu cầu sử dụng thực tế.', '/lap-dat-dien-mat-troi'],
  ['Doanh nghiệp', 'Giải pháp rooftop cho tải tiêu thụ ban ngày.', '/giai-phap/doanh-nghiep'],
  ['Nhà xưởng', 'Thiết kế theo tải điện, mái và điều kiện thi công.', '/giai-phap/nha-xuong'],
  ['Battery', 'Giải pháp lưu trữ và tự dùng cần khảo sát theo nhu cầu.', '/san-pham/pin-luu-tru'],
];
const products = [
  ['Tấm pin mặt trời', 'Thiết bị phát điện của hệ thống', '/san-pham'],
  ['Inverter', 'Thiết bị chuyển đổi và quản lý năng lượng', '/san-pham'],
  ['Pin lưu trữ', 'Lưu trữ năng lượng khi cần', '/san-pham/pin-luu-tru'],
  ['Tủ điện & bảo vệ', 'Bảo vệ và phân phối trong hệ thống', '/san-pham'],
];
const projects = [
  ['Hộ gia đình', 'Rooftop residential', 'Xem các công trình thực tế và cấu hình đã triển khai.'],
  ['Doanh nghiệp', 'Commercial rooftop', 'Xem nhóm giải pháp cho tải tiêu thụ ban ngày.'],
  ['Nhà xưởng', 'Industrial rooftop', 'Xem các dự án theo điều kiện mái và tải thực tế.'],
];

function Header() {
  return <header className="business-header"><div className="site-shell nav-wrap">
    <Link className="business-brand" href="/">MT<span>SOLAR</span></Link>
    <nav><Link href="/">Trang chủ</Link><Link href="/giai-phap">Giải pháp</Link><Link href="/san-pham">Sản phẩm</Link><Link href="/du-an">Công trình</Link><Link href="/dich-vu">Dịch vụ</Link><Link href="/kien-thuc">Kiến thức</Link><Link href="/gioi-thieu">Về chúng tôi</Link></nav>
    <details className="mobile-nav"><summary>Menu</summary><div className="mobile-nav-panel"><Link href="/">Trang chủ</Link><Link href="/giai-phap">Giải pháp</Link><Link href="/san-pham">Sản phẩm</Link><Link href="/du-an">Công trình</Link><Link href="/dich-vu">Dịch vụ</Link><Link href="/kien-thuc">Kiến thức</Link><Link href="/gioi-thieu">Về chúng tôi</Link><Link href="/lien-he">Nhận tư vấn</Link></div></details>
    <Link className="nav-cta" href="/lien-he">Nhận tư vấn</Link>
  </div></header>;
}

function Calculator() {
  const [bill, setBill] = useState(3000000);
  return <section id="calculator" className="calculator-business"><div className="site-shell calculator-business-grid">
    <div><span className="eyebrow">SOLAR CALCULATOR</span><h2>Ước tính nhu cầu hệ thống</h2><p>Nhập hóa đơn điện trung bình để nhận một khoảng tham khảo. Đây không phải báo giá hay cam kết sản lượng; cấu hình cuối cùng cần khảo sát thực tế.</p><div className="bill-value">{bill.toLocaleString('vi-VN')} <span>đ/tháng</span></div><input aria-label="Hóa đơn điện trung bình mỗi tháng" type="range" min="1000000" max="30000000" step="500000" value={bill} onChange={e => setBill(Number(e.target.value))}/><div className="range-labels"><span>1 triệu</span><span>30 triệu</span></div><Link className="button button-light" href="/lien-he">Nhận tư vấn cấu hình →</Link></div>
    <div className="calculator-output"><span>MỨC THAM KHẢO</span><strong>{bill >= 15000000 ? 'Cần khảo sát chuyên sâu' : 'Có thể bắt đầu từ khảo sát rooftop'}</strong><div className="output-stats"><div><b>{bill.toLocaleString('vi-VN')} đ</b><span>Hóa đơn đầu vào</span></div><div><b>Khảo sát thực tế</b><span>Bước xác định công suất</span></div><div><b>On-grid / Hybrid</b><span>Cấu hình phụ thuộc nhu cầu</span></div><div><b>Không báo giá tự động</b><span>Tránh bịa dữ liệu thương mại</span></div></div></div>
  </div></section>;
}

export default function SolarHomeComplete() {
  return <>
    <Header />
    <main>
      <HeroV2 />
      <section className="trust-strip"><div className="site-shell trust-grid"><div><strong>01</strong><span>Khảo sát nhu cầu</span></div><div><strong>02</strong><span>Thiết kế theo thực tế</span></div><div><strong>03</strong><span>Thi công đồng bộ</span></div><div><strong>04</strong><span>Đồng hành sau lắp đặt</span></div></div></section>
      <section className="business-section"><div className="site-shell"><div className="section-intro"><div><span className="eyebrow">GIẢI PHÁP</span><h2>Chọn hướng đi phù hợp với công trình.</h2></div><p>Mỗi phương án cần được xác định từ nhu cầu điện, diện tích mái, thời gian sử dụng và mục tiêu lưu trữ.</p></div><div className="solution-grid-business">{solutions.map(([title, text, href], i) => <Link className="business-card" href={href} key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><b>Khám phá →</b></Link>)}</div></div></section>
      <Calculator />
      <section className="business-section products-home"><div className="site-shell"><div className="section-intro"><div><span className="eyebrow">SẢN PHẨM</span><h2>Hệ thống được cấu thành từ những thiết bị phù hợp.</h2></div><p>Trang sản phẩm là nơi đối chiếu model, thông số, giá và bảo hành từ dữ liệu thương mại đã xác thực.</p></div><div className="product-grid">{products.map(([name, text, href], i) => <Link className="product-card" href={href} key={name}><span>0{i + 1}</span><div className="product-icon">☀</div><h3>{name}</h3><p>{text}</p><b>Xem sản phẩm →</b></Link>)}</div></div></section>
      <section className="project-home"><div className="site-shell"><div className="section-intro section-intro-light"><div><span className="eyebrow">CÔNG TRÌNH</span><h2>Khám phá các nhóm công trình.</h2></div><p>Không tự thêm công suất, giá trị hay sản lượng khi chưa có dữ liệu xác thực.</p></div><div className="project-grid-business">{projects.map(([type, title, text]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{text}</p><Link href="/du-an">Xem công trình →</Link></article>)}</div></div></section>
      <section className="business-section"><div className="site-shell why-grid"><div><span className="eyebrow">QUY TRÌNH</span><h2>Từ khảo sát đến vận hành.</h2></div><div className="why-list"><div><strong>01</strong><p><b>Khảo sát</b><br/>Đánh giá nhu cầu điện, mái và điều kiện thực tế.</p></div><div><strong>02</strong><p><b>Thiết kế</b><br/>Đề xuất cấu hình dựa trên dữ liệu khảo sát.</p></div><div><strong>03</strong><p><b>Thi công</b><br/>Lắp đặt, kiểm tra và bàn giao theo quy trình.</p></div><div><strong>04</strong><p><b>Đồng hành</b><br/>Hỗ trợ vận hành, bảo trì và nâng cấp khi cần.</p></div></div></div></section>
      <section id="lead-form" className="business-section"><div className="site-shell contact-layout"><div><span className="eyebrow">TƯ VẤN MIỄN PHÍ</span><h2>Nhận phương án phù hợp với công trình của bạn.</h2><p>Form sử dụng Lead API hiện tại. Chỉ yêu cầu thông tin cần thiết để đội ngũ tư vấn liên hệ.</p></div><div className="lead-form-wrap"><LeadSection /></div></div></section>
      <section className="lead-cta"><div className="site-shell lead-cta-inner"><div><span className="eyebrow">KIẾN THỨC</span><h2>Hiểu đúng trước khi đầu tư.</h2><p>Xem bài viết, hướng dẫn và thông tin chuyên sâu về điện mặt trời.</p></div><Link className="button button-light" href="/kien-thuc">Xem kiến thức →</Link></div></section>
    </main>
    <BusinessFooter />
    <Link className="floating-cta" href="/lien-he">Tư vấn ngay ↗</Link>
    <ContactConversion />
  </>;
}
