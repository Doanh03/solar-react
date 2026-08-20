'use client';

import Link from 'next/link';
import { useState } from 'react';

const solutions = [
  { title: 'Điện mặt trời hộ gia đình', text: 'Tối ưu chi phí điện cho nhà phố, biệt thự và hộ gia đình theo mức tiêu thụ thực tế.', href: '/lap-dat-dien-mat-troi' },
  { title: 'Hệ thống Hybrid lưu trữ', text: 'Kết hợp điện mặt trời và pin lưu trữ để tăng khả năng tự dùng và dự phòng.', href: '/giai-phap/hybrid' },
  { title: 'Điện mặt trời doanh nghiệp', text: 'Giải pháp cho văn phòng, cửa hàng và cơ sở sản xuất với trọng tâm là hiệu quả đầu tư.', href: '/giai-phap/doanh-nghiep' },
  { title: 'Điện mặt trời nhà xưởng', text: 'Thiết kế theo tải tiêu thụ, diện tích mái và mục tiêu vận hành của từng nhà xưởng.', href: '/giai-phap/nha-xuong' },
  { title: 'Pin lưu trữ', text: 'Tăng tỷ lệ sử dụng điện mặt trời và hỗ trợ nguồn điện khi cần thiết.', href: '/san-pham/pin-luu-tru' },
  { title: 'Bảo trì & nâng cấp', text: 'Kiểm tra hiệu suất, xử lý sự cố và nâng cấp hệ thống hiện hữu.', href: '/dich-vu/bao-tri' },
];

const products = [
  ['Tấm pin năng lượng mặt trời', 'Hiệu suất cao • Độ bền cao'],
  ['Inverter điện mặt trời', 'On-grid • Hybrid • Off-grid'],
  ['Pin lưu trữ', 'Lưu trữ • Dự phòng • Tự dùng'],
  ['Tủ điện & bảo vệ', 'An toàn • Giám sát • Bảo vệ hệ thống'],
  ['Khung & phụ kiện', 'Thiết kế theo mái • Thi công đồng bộ'],
  ['Giải pháp giám sát', 'Theo dõi sản lượng • Cảnh báo vận hành'],
];

const projects = [
  ['Hộ gia đình', 'Hệ thống rooftop', 'Thiết kế theo nhu cầu điện và diện tích mái.'],
  ['Nhà phố / biệt thự', 'Hybrid lưu trữ', 'Ưu tiên tự dùng, dự phòng và trải nghiệm vận hành.'],
  ['Doanh nghiệp', 'Rooftop commercial', 'Tối ưu sản lượng điện mặt trời cho tải tiêu thụ ban ngày.'],
  ['Nhà xưởng', 'Industrial rooftop', 'Thiết kế theo tải, mái và yêu cầu vận hành thực tế.'],
];

const motionStyles = `
@keyframes solarFloat{0%,100%{transform:translate3d(0,0,0) rotate(-8deg) skewY(-18deg)}50%{transform:translate3d(0,-14px,0) rotate(-7deg) skewY(-18deg)}}
@keyframes solarFloatB{0%,100%{transform:translate3d(0,0,0) rotate(-8deg) skewY(-18deg)}50%{transform:translate3d(-12px,-10px,0) rotate(-10deg) skewY(-18deg)}}
@keyframes sunPulse{0%,100%{transform:scale(1);opacity:.94}50%{transform:scale(1.06);opacity:1}}
@keyframes glowDrift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-28px,24px,0) scale(1.08)}}
@keyframes cardIn{from{opacity:0;transform:translate3d(0,24px,0) scale(.985)}to{opacity:1;transform:none}}
@keyframes heroIn{from{opacity:0;transform:translate3d(0,20px,0)}to{opacity:1;transform:none}}
@keyframes shimmer{0%{background-position:-160% 0}100%{background-position:160% 0}}
@keyframes ctaPulse{0%,100%{box-shadow:0 14px 40px rgba(8,19,26,.25)}50%{box-shadow:0 18px 48px rgba(8,19,26,.38),0 0 0 8px rgba(201,242,93,.12)}}
.business-hero:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.28;background-image:linear-gradient(rgba(8,19,26,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(8,19,26,.035) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,black,transparent 82%)}
.hero-glow{animation:glowDrift 9s ease-in-out infinite}
.sun{animation:sunPulse 5s ease-in-out infinite}
.panel-a{animation:solarFloat 6s ease-in-out infinite}
.panel-b{animation:solarFloatB 7s ease-in-out infinite}
.energy-card{animation:heroIn .9s cubic-bezier(.2,.8,.2,1) .45s both}
.hero-copy-business .eyebrow,.hero-copy-business h1,.hero-copy-business>p,.hero-buttons,.hero-proof{animation:heroIn .8s cubic-bezier(.2,.8,.2,1) both}
.hero-copy-business h1{animation-delay:.08s}.hero-copy-business>p{animation-delay:.16s}.hero-buttons{animation-delay:.24s}.hero-proof{animation-delay:.32s}
.business-card,.product-card,.project-grid-business article,.project-showcase-grid article,.article-card,.detail-card{animation:cardIn .7s cubic-bezier(.2,.8,.2,1) both}
.solution-grid-business .business-card:nth-child(2),.product-grid .product-card:nth-child(2),.project-grid-business article:nth-child(2),.article-grid .article-card:nth-child(2){animation-delay:.08s}
.solution-grid-business .business-card:nth-child(3),.product-grid .product-card:nth-child(3),.project-grid-business article:nth-child(3),.article-grid .article-card:nth-child(3){animation-delay:.16s}
.solution-grid-business .business-card:nth-child(4),.product-grid .product-card:nth-child(4){animation-delay:.24s}
.solution-grid-business .business-card:nth-child(5),.product-grid .product-card:nth-child(5){animation-delay:.32s}
.solution-grid-business .business-card:nth-child(6),.product-grid .product-card:nth-child(6){animation-delay:.40s}
.business-card:hover,.product-card:hover,.article-card:hover,.detail-card:hover{transform:translateY(-9px) scale(1.012);box-shadow:0 30px 90px rgba(8,19,26,.13);transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s ease,border-color .35s ease}
.business-card b,.product-card b,.article-card b,.project-grid-business a{transition:transform .3s ease,color .3s ease}.business-card:hover b,.product-card:hover b,.article-card:hover b,.project-grid-business article:hover a{transform:translateX(5px);color:#789e15}
.button,.nav-cta,.footer-button{position:relative;overflow:hidden}.button:after,.nav-cta:after,.footer-button:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.28) 48%,transparent 66%);transform:translateX(-140%);transition:transform .7s ease}.button:hover:after,.nav-cta:hover:after,.footer-button:hover:after{transform:translateX(140%)}
.eyebrow{background:linear-gradient(90deg,#789e15 20%,#c9f25d 50%,#789e15 80%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 4s linear infinite}
.floating-cta{animation:ctaPulse 3.5s ease-in-out infinite}
.mobile-nav{display:none}
@media(max-width:950px){.mobile-nav{display:block;margin-left:auto;position:relative}.mobile-nav>summary{list-style:none;cursor:pointer;border:1px solid rgba(8,19,26,.12);background:rgba(255,255,255,.65);border-radius:999px;padding:10px 13px;font-size:12px;font-weight:850}.mobile-nav>summary::-webkit-details-marker{display:none}.mobile-nav-panel{position:absolute;right:0;top:48px;width:240px;padding:10px;border:1px solid rgba(8,19,26,.10);border-radius:20px;background:rgba(245,247,242,.96);backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(8,19,26,.18)}.mobile-nav-panel a{display:block;padding:12px 13px;border-radius:12px;font-size:13px;font-weight:700}.mobile-nav-panel a:hover{background:#e9efe9}.business-header .nav-cta{margin-left:0}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

export function BusinessHeader() {
  return <header className="business-header">
    <div className="site-shell nav-wrap">
      <Link className="business-brand" href="/">MT<span>SOLAR</span></Link>
      <nav>
        <Link href="/">Trang chủ</Link>
        <Link href="/lap-dat-dien-mat-troi">Lắp đặt</Link>
        <Link href="/san-pham">Sản phẩm</Link>
        <Link href="/du-an">Dự án</Link>
        <Link href="/kien-thuc">Kiến thức</Link>
        <Link href="/gioi-thieu">Về chúng tôi</Link>
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <div className="mobile-nav-panel">
          <Link href="/">Trang chủ</Link>
          <Link href="/lap-dat-dien-mat-troi">Lắp đặt</Link>
          <Link href="/san-pham">Sản phẩm</Link>
          <Link href="/du-an">Dự án</Link>
          <Link href="/kien-thuc">Kiến thức</Link>
          <Link href="/gioi-thieu">Về chúng tôi</Link>
          <Link href="/lien-he">Nhận tư vấn</Link>
        </div>
      </details>
      <Link className="nav-cta" href="/lien-he">Nhận tư vấn</Link>
    </div>
    <style jsx global>{motionStyles}</style>
  </header>;
}

export function BusinessFooter() {
  return <footer className="business-footer">
    <div className="site-shell footer-grid">
      <div><div className="business-brand">MT<span>SOLAR</span></div><p>Giải pháp điện mặt trời được thiết kế theo nhu cầu sử dụng thực tế.</p></div>
      <div><strong>Khám phá</strong><Link href="/lap-dat-dien-mat-troi">Lắp đặt điện mặt trời</Link><Link href="/san-pham">Sản phẩm</Link><Link href="/du-an">Dự án</Link></div>
      <div><strong>Hỗ trợ</strong><Link href="/kien-thuc">Kiến thức</Link><Link href="/lien-he">Liên hệ</Link><Link href="/#calculator">Tính toán hệ thống</Link></div>
      <div><strong>Tư vấn</strong><p>Hotline / Zalo: theo thông tin kinh doanh hiện tại của MT Solar</p><Link className="footer-button" href="/lien-he">Nhận báo giá</Link></div>
    </div>
    <div className="site-shell footer-bottom">© {new Date().getFullYear()} MT Solar. All rights reserved.</div>
  </footer>;
}

export function LeadCta({ title = 'Nhận tư vấn cấu hình phù hợp' }: { title?: string }) {
  return <section className="lead-cta"><div className="site-shell lead-cta-inner"><div><span className="eyebrow">TƯ VẤN MIỄN PHÍ</span><h2>{title}</h2><p>Để lại thông tin. Đội ngũ tư vấn sẽ dựa trên nhu cầu sử dụng, mái nhà và mục tiêu đầu tư để đề xuất phương án phù hợp.</p></div><Link className="button button-light" href="/lien-he">Đăng ký tư vấn <span>→</span></Link></div></section>;
}

export function SolarBusinessHome() {
  return <>
    <BusinessHeader />
    <main>
      <section className="business-hero"><div className="hero-glow"/><div className="site-shell hero-grid"><div className="hero-copy-business"><span className="eyebrow">SOLAR ENERGY • SMART ENERGY</span><h1>Biến mái nhà thành <em>nguồn năng lượng</em> của bạn.</h1><p>Thiết kế và lắp đặt hệ thống điện mặt trời cho gia đình, doanh nghiệp và nhà xưởng — tập trung vào hiệu quả sử dụng và đầu tư dài hạn.</p><div className="hero-buttons"><Link className="button button-dark" href="/lien-he">Nhận khảo sát <span>→</span></Link><Link className="button button-outline" href="#calculator">Tính công suất</Link></div><div className="hero-proof"><span>✓ Tư vấn theo nhu cầu thực tế</span><span>✓ Thiết kế & thi công đồng bộ</span><span>✓ Hỗ trợ sau lắp đặt</span></div></div><div className="hero-visual"><div className="sun"/><div className="solar-panel panel-a"/><div className="solar-panel panel-b"/><div className="energy-card"><span>SMART ENERGY</span><strong>01</strong><small>Thiết kế • Thi công • Giám sát</small></div></div></div></section>

      <section className="trust-strip"><div className="site-shell trust-grid"><div><strong>01</strong><span>Khảo sát nhu cầu</span></div><div><strong>02</strong><span>Thiết kế hệ thống</span></div><div><strong>03</strong><span>Thi công chuyên nghiệp</span></div><div><strong>04</strong><span>Bàn giao & đồng hành</span></div></div></section>

      <section className="business-section"><div className="site-shell"><div className="section-intro"><div><span className="eyebrow">GIẢI PHÁP</span><h2>Một hệ thống. Đúng với nhu cầu của bạn.</h2></div><p>Không chọn cấu hình theo kiểu “một công thức cho tất cả”. Mỗi hệ thống được định hướng từ mức tiêu thụ điện, diện tích mái, thời gian sử dụng và mục tiêu đầu tư.</p></div><div className="solution-grid-business">{solutions.map((s, i) => <Link className="business-card" href={s.href} key={s.title}><span>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p><b>Khám phá →</b></Link>)}</div></div></section>

      <Calculator />

      <section className="business-section products-home"><div className="site-shell"><div className="section-intro"><div><span className="eyebrow">THIẾT BỊ</span><h2>Thiết bị tạo nên một hệ thống tốt.</h2></div><p>Danh mục được tổ chức theo vai trò trong hệ thống để khách hàng dễ hiểu và dễ lựa chọn cấu hình.</p></div><div className="product-grid">{products.map(([name, sub], i) => <Link className="product-card" href="/san-pham" key={name}><span>0{i + 1}</span><div className="product-icon">☀</div><h3>{name}</h3><p>{sub}</p><b>Thông tin sản phẩm →</b></Link>)}</div></div></section>

      <section className="project-home"><div className="site-shell"><div className="section-intro section-intro-light"><div><span className="eyebrow">DỰ ÁN</span><h2>Thi công từ mái nhà đến nhà xưởng.</h2></div><p>Xem các nhóm công trình và giải pháp phù hợp với từng nhu cầu.</p></div><div className="project-grid-business">{projects.map(([type, title, text]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{text}</p><Link href="/du-an">Xem dự án →</Link></article>)}</div></div></section>

      <section className="business-section"><div className="site-shell why-grid"><div><span className="eyebrow">VÌ SAO MT SOLAR</span><h2>Không chỉ bán thiết bị. Chúng tôi xây cả một hệ thống.</h2></div><div className="why-list"><div><strong>01</strong><p><b>Tư vấn theo dữ liệu sử dụng</b><br/>Ước tính dựa trên nhu cầu thực tế thay vì chỉ dựa vào diện tích mái.</p></div><div><strong>02</strong><p><b>Thiết kế đồng bộ</b><br/>Các thành phần được lựa chọn để hoạt động như một hệ thống.</p></div><div><strong>03</strong><p><b>Đồng hành sau lắp đặt</b><br/>Theo dõi vận hành, bảo trì và hỗ trợ khi cần nâng cấp.</p></div></div></div></section>

      <LeadCta />
    </main>
    <BusinessFooter />
    <Link className="floating-cta" href="/lien-he">Tư vấn ngay ↗</Link>
  </>;
}

function Calculator() {
  const [bill, setBill] = useState(3000000);
  const capacity = Math.max(2, Math.min(30, Math.round((bill / 1000000) * 1.35 * 2) / 2));
  const savings = Math.round(bill * 12 * 0.68);
  return <section id="calculator" className="calculator-business"><div className="site-shell calculator-business-grid"><div><span className="eyebrow">SOLAR CALCULATOR</span><h2>Ước tính hệ thống từ hóa đơn điện.</h2><p>Điều chỉnh mức tiền điện trung bình mỗi tháng để xem một cấu hình tham khảo. Kết quả chỉ mang tính định hướng và cần khảo sát thực tế trước khi chốt hệ thống.</p><div className="bill-value">{bill.toLocaleString('vi-VN')} <span>đ/tháng</span></div><input type="range" min="1000000" max="30000000" step="500000" value={bill} onChange={e => setBill(Number(e.target.value))}/><div className="range-labels"><span>1 triệu</span><span>30 triệu</span></div><Link className="button button-light" href="/lien-he">Nhận cấu hình chi tiết →</Link></div><div className="calculator-output"><span>HỆ THỐNG THAM KHẢO</span><strong>{capacity} kWp</strong><div className="output-stats"><div><b>{Math.round(capacity * 120).toLocaleString('vi-VN')}</b><span>Sản lượng / tháng (kWh)</span></div><div><b>{savings.toLocaleString('vi-VN')} đ</b><span>Tiết kiệm / năm (ước tính)</span></div><div><b>Hybrid / On-grid</b><span>Cấu hình cần khảo sát</span></div><div><b>Rooftop</b><span>Hình thức lắp đặt</span></div></div><small>Thông số thực tế phụ thuộc vị trí, hướng mái, bóng che, tải điện, thiết bị và điều kiện thi công.</small></div></div></section>;
}

export function SimpleBusinessPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <><BusinessHeader/><main><section className="inner-hero"><div className="site-shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></section>{children}<LeadCta/><BusinessFooter/></main></>;
}
