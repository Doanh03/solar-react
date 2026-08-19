import { SolarCalculator } from '@/app/components/solar-calculator';
import { companyStats } from '@/app/lib/company-stats';

const solutions = [
  ['01', 'Điện mặt trời hộ gia đình', 'Tối ưu chi phí điện và chủ động nguồn năng lượng cho ngôi nhà.'],
  ['02', 'Điện mặt trời doanh nghiệp', 'Thiết kế theo phụ tải, mái và mục tiêu tiết kiệm của doanh nghiệp.'],
  ['03', 'Hybrid & lưu trữ', 'Kết hợp điện mặt trời và pin lưu trữ cho nhu cầu chủ động cao hơn.'],
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Solar Energy home"><span>☀</span> SOLAR<span>NOVA</span></a>
        <nav>
          <a href="#solutions">Giải pháp</a>
          <a href="#calculator">Tính toán</a>
          <a href="#projects">Dự án</a>
          <a href="#lead-form">Tư vấn</a>
        </nav>
        <a className="header-phone" href="tel:+84000000000">Gọi tư vấn</a>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <span className="eyebrow">PREMIUM ENERGY / SOLAR SOLUTIONS</span>
          <h1>Biến mái nhà thành <em>nguồn năng lượng</em> chủ động.</h1>
          <p>Giải pháp điện mặt trời được tư vấn theo hóa đơn điện, công trình và nhu cầu sử dụng thực tế — không phải một cấu hình áp cho tất cả.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#calculator">Tính hệ thống của tôi</a>
            <a className="button button-ghost" href="#solutions">Khám phá giải pháp</a>
          </div>
          <div className="stats">
            {companyStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-orb" />
          <div className="roof-card"><span>ENERGY</span><strong>01</strong><small>SMART SOLAR SYSTEM</small></div>
        </div>
      </section>

      <section id="solutions" className="section-shell section-light">
        <div className="section-heading"><span className="eyebrow">Solutions</span><h2>Một hệ thống phù hợp bắt đầu từ đúng nhu cầu.</h2></div>
        <div className="solution-grid">
          {solutions.map(([number, title, text]) => <article className="solution-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#calculator">Tìm cấu hình phù hợp →</a></article>)}
        </div>
      </section>

      <SolarCalculator />

      <section id="projects" className="section-shell projects-section">
        <div className="section-heading"><span className="eyebrow">Project intelligence</span><h2>Thiết kế dựa trên dữ liệu công trình.</h2><p>Danh mục dự án sẽ được kết nối với dữ liệu thật của doanh nghiệp ở giai đoạn Content/CRM.</p></div>
        <div className="project-grid"><article><span>RESIDENTIAL</span><h3>Hộ gia đình</h3><p>Khảo sát mái → phân tích phụ tải → đề xuất công suất → nghiệm thu.</p></article><article><span>COMMERCIAL</span><h3>Doanh nghiệp</h3><p>Đánh giá profile tiêu thụ và bài toán hiệu quả đầu tư trước khi báo giá.</p></article><article><span>STORAGE</span><h3>Hybrid & Battery</h3><p>Thiết kế phương án lưu trữ theo mục tiêu dự phòng và mức độ tự chủ.</p></article></div>
      </section>

      <section id="lead-form" className="lead-section section-shell">
        <div><span className="eyebrow">Get a tailored estimate</span><h2>Muốn biết hệ thống nào phù hợp với mái nhà của bạn?</h2><p>Để lại thông tin sau khi xem kết quả tính toán. Dữ liệu sẽ được dùng để Sale tư vấn chính xác hơn.</p></div>
        <form className="lead-form" action="#lead-form"><input aria-label="Họ và tên" placeholder="Họ và tên" required /><input aria-label="Số điện thoại" placeholder="Số điện thoại" inputMode="tel" required /><button className="button button-primary" type="submit">Nhận tư vấn</button><small>Chưa kết nối API ở Phase 1. Form backend sẽ được triển khai ở Phase 2.</small></form>
      </section>

      <footer className="site-footer section-shell"><div className="brand"><span>☀</span> SOLAR<span>NOVA</span></div><p>Solar Conversion & Marketing Platform</p></footer>
    </main>
  );
}
