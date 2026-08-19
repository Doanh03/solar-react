'use client';

import { companyStats } from '@/app/lib/company-stats';
import { trackEvent } from '@/app/lib/analytics';

export function HeroSection() {
  return (
    <section id="top" className="hero section-shell">
      <div className="hero-copy">
        <span className="eyebrow">PREMIUM ENERGY / SOLAR SOLUTIONS</span>
        <h1>Giảm chi phí điện. <em>Chủ động nguồn năng lượng.</em></h1>
        <p>Khám phá cấu hình điện mặt trời phù hợp với hóa đơn điện, công trình và nhu cầu sử dụng thực tế của bạn — không áp một cấu hình cho tất cả.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#calculator" onClick={() => trackEvent('hero_cta_clicked', { section: 'hero', cta_id: 'hero-calculator' })}>
            Tính hệ thống miễn phí
          </a>
          <a className="button button-ghost" href="#solutions" onClick={() => trackEvent('hero_cta_clicked', { section: 'hero', cta_id: 'hero-solutions' })}>
            Khám phá giải pháp
          </a>
        </div>
        <div className="hero-trust" aria-label="Điểm nổi bật">
          <span>✓ Tư vấn theo nhu cầu thực tế</span>
          <span>✓ Khảo sát mái trước khi báo giá</span>
          <span>✓ Không áp một cấu hình cho mọi công trình</span>
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
