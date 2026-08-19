import { companyStats } from '@/app/lib/company-stats';

export function HeroSection() {
  return (
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
  );
}
