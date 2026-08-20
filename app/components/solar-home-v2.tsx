'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { BusinessFooter, BusinessHeader } from './business-site';
import styles from './solar-home-v2.module.css';

const stats = [
  { value: 639672, suffix: ' kWh', label: 'Năng lượng tạo ra hôm nay' },
  { value: 202576, suffix: ' kWp', label: 'Công suất hệ thống tham khảo' },
  { value: 1366616, suffix: ' kWh', label: 'Điện mặt trời có thể tự dùng' },
  { value: 319827, suffix: ' kWh', label: 'Điện năng tích trữ' },
  { value: 433, suffix: ' tấn', label: 'CO₂ giảm phát thải' },
];

function AnimatedNumber({ value }: { value: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{current.toLocaleString('vi-VN')}</>;
}

function Earth() {
  return (
    <div className={styles.earthStage} aria-hidden="true">
      <div className={`${styles.orbit} ${styles.orbitOne}`} />
      <div className={`${styles.orbit} ${styles.orbitTwo}`} />
      <div className={styles.earthGlow} />
      <div className={styles.earth}>
        <div className={`${styles.earthGrid} ${styles.gridA}`} />
        <div className={`${styles.earthGrid} ${styles.gridB}`} />
        <div className={styles.earthLand} />
      </div>
      <span className={`${styles.energyDot} ${styles.dotA}`} />
      <span className={`${styles.energyDot} ${styles.dotB}`} />
      <span className={`${styles.energyDot} ${styles.dotC}`} />
      <span className={`${styles.energyDot} ${styles.dotD}`} />
    </div>
  );
}

function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('home');
  const [monthlyBill, setMonthlyBill] = useState('3000000');
  const [roofAreaM2, setRoofAreaM2] = useState('60');
  const [solarType, setSolarType] = useState('hybrid');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const attribution = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
      utm_content: params.get('utm_content') ?? '',
      utm_term: params.get('utm_term') ?? '',
      landingPage: window.location.pathname,
      referrer: document.referrer,
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          propertyType,
          monthlyBill: Number(monthlyBill),
          roofAreaM2: Number(roofAreaM2),
          solarType,
          calculatorUsed: true,
          attribution,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? 'Không thể gửi thông tin');
      setStatus('success');
      setMessage('Đã nhận thông tin. Đội ngũ tư vấn sẽ liên hệ với bạn.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  }

  if (status === 'success') {
    return <div className={styles.successBox} role="status"><span>✓</span><strong>Đã gửi yêu cầu</strong><p>{message}</p><button type="button" onClick={() => setStatus('idle')}>Gửi thêm yêu cầu</button></div>;
  }

  return (
    <form className={styles.leadForm} onSubmit={submit}>
      <div className={styles.formHeading}><span>NHẬN KHẢO SÁT & TƯ VẤN</span><h3>Cho chúng tôi 60 giây để hiểu nhu cầu của bạn.</h3><p>Không cần biết trước công suất. Chỉ cần để lại thông tin cơ bản.</p></div>
      <div className={styles.formGrid}>
        <label>Họ tên<input value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" required /></label>
        <label>Số điện thoại<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="09xx xxx xxx" inputMode="tel" required /></label>
        <label>Loại công trình<select value={propertyType} onChange={e => setPropertyType(e.target.value)}><option value="home">Nhà ở</option><option value="factory">Nhà xưởng</option><option value="office">Văn phòng</option><option value="shop">Cửa hàng</option><option value="farm">Trang trại</option></select></label>
        <label>Tiền điện / tháng<input value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} inputMode="numeric" required /></label>
        <label>Diện tích mái (m²)<input value={roofAreaM2} onChange={e => setRoofAreaM2(e.target.value)} inputMode="numeric" required /></label>
        <label>Nhu cầu hệ thống<select value={solarType} onChange={e => setSolarType(e.target.value)}><option value="hybrid">Hybrid + lưu trữ</option><option value="grid-tied">Hoà lưới</option><option value="battery">Ưu tiên lưu trữ</option></select></label>
      </div>
      {status === 'error' && <p className={styles.formError}>{message}</p>}
      <button className={styles.formSubmit} disabled={status === 'loading'}>{status === 'loading' ? 'Đang gửi…' : 'Nhận phương án phù hợp →'}</button>
      <small>Thông tin chỉ dùng để tư vấn. Không hiển thị công khai.</small>
    </form>
  );
}

export function SolarBusinessHomeV2() {
  return (
    <>
      <BusinessHeader />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroNoise} />
          <div className="site-shell">
            <div className={styles.heroTopline}><span>MT SOLAR • SMART ENERGY</span><span>THIẾT KẾ • THI CÔNG • ĐỒNG HÀNH</span></div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.kicker}>GIẢI PHÁP ĐIỆN MẶT TRỜI THEO NHU CẦU</span>
                <h1>Biến mái nhà thành <em>tài sản năng lượng.</em></h1>
                <p>Thiết kế hệ thống điện mặt trời dựa trên mức tiêu thụ thực tế, diện tích mái và mục tiêu tiết kiệm của từng gia đình, doanh nghiệp và nhà xưởng.</p>
                <div className={styles.heroActions}><a href="#tu-van" className={styles.primary}>Nhận khảo sát miễn phí <span>↗</span></a><a href="#nang-luong" className={styles.secondary}>Xem hệ thống hoạt động <span>↓</span></a></div>
                <div className={styles.proof}><span>✓ Tư vấn theo nhu cầu</span><span>✓ Thiết kế đồng bộ</span><span>✓ Hỗ trợ sau lắp đặt</span></div>
              </div>
              <div className={styles.commandCard} id="nang-luong">
                <div className={styles.commandHeader}><div><span>ENERGY COMMAND CENTER</span><strong>Hệ thống năng lượng của bạn, nhìn thấy được.</strong></div><i>LIVE</i></div>
                <Earth />
                <div className={`${styles.stat} ${styles.statMain}`}><span>{stats[0].label}</span><strong><AnimatedNumber value={stats[0].value} /><small>{stats[0].suffix}</small></strong><b>MÔ PHỎNG CHỈ SỐ</b></div>
                <div className={`${styles.stat} ${styles.statTL}`}><span>{stats[1].label}</span><strong><AnimatedNumber value={stats[1].value} /><small>{stats[1].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statTR}`}><span>{stats[2].label}</span><strong><AnimatedNumber value={stats[2].value} /><small>{stats[2].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statBL}`}><span>{stats[3].label}</span><strong><AnimatedNumber value={stats[3].value} /><small>{stats[3].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statBR}`}><span>{stats[4].label}</span><strong><AnimatedNumber value={stats[4].value} /><small>{stats[4].suffix}</small></strong></div>
                <div className={styles.commandFooter}><span>● Chỉ số minh hoạ • Không phải số liệu thương mại</span><Link href="/lien-he">Nhận cấu hình thực tế →</Link></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.quickProof}><div className="site-shell"><div><strong>01</strong><span>Khảo sát</span><small>Nhu cầu & mái</small></div><div><strong>02</strong><span>Thiết kế</span><small>Cấu hình tối ưu</small></div><div><strong>03</strong><span>Thi công</span><small>Đồng bộ hệ thống</small></div><div><strong>04</strong><span>Đồng hành</span><small>Vận hành & nâng cấp</small></div></div></section>

        <section className={styles.conversionSection} id="tu-van"><div className="site-shell"><div className={styles.conversionGrid}><div className={styles.conversionCopy}><span className={styles.kicker}>TƯ VẤN 1:1</span><h2>Đừng tự đoán công suất. Hãy để chúng tôi tính cùng bạn.</h2><p>Khách từ Facebook thường chưa có đủ thông tin để quyết định ngay. Vì vậy, bước đầu tiên không phải là mua hàng — mà là xác định hệ thống nào thực sự phù hợp.</p><div className={styles.benefitList}><div><b>01</b><span><strong>Ước tính nhanh</strong><small>Từ hóa đơn điện và diện tích mái.</small></span></div><div><b>02</b><span><strong>So sánh cấu hình</strong><small>Hoà lưới, Hybrid hoặc lưu trữ.</small></span></div><div><b>03</b><span><strong>Nhận phương án</strong><small>Trao đổi trực tiếp trước khi quyết định.</small></span></div></div></div><LeadForm /></div></div></section>

        <section className={styles.reasons}><div className="site-shell"><div className={styles.reasonHeading}><span className={styles.kicker}>KHÔNG CHỈ LÀ TẤM PIN</span><h2>Một hệ thống tốt phải tạo ra giá trị lâu dài.</h2></div><div className={styles.reasonGrid}><article><span>01</span><h3>Tối ưu theo tải điện</h3><p>Thiết kế xoay quanh thời gian sử dụng điện, thay vì chỉ chạy theo công suất lắp đặt.</p></article><article><span>02</span><h3>Chủ động nguồn điện</h3><p>Hybrid và lưu trữ giúp tăng khả năng tự dùng và chuẩn bị cho nhu cầu dự phòng.</p></article><article><span>03</span><h3>Dễ theo dõi</h3><p>Thông tin sản lượng và hiệu quả được trình bày để khách hàng dễ hiểu, dễ kiểm tra.</p></article></div></div></section>

        <section className={styles.fbSection}><div className="site-shell"><div><span className={styles.kicker}>DÀNH CHO KHÁCH HÀNG TỪ FACEBOOK</span><h2>Vào đúng vấn đề. Hiểu nhanh. Có lý do để ở lại.</h2></div><div className={styles.fbGrid}><div><b>01</b><strong>Không ép báo giá ngay</strong><p>Giải thích nhu cầu trước, giúp khách hiểu mình đang cần gì.</p></div><div><b>02</b><strong>Nội dung theo từng nhu cầu</strong><p>Nhà ở, nhà xưởng, doanh nghiệp và lưu trữ có hành trình tư vấn khác nhau.</p></div><div><b>03</b><strong>CTA xuất hiện đúng lúc</strong><p>Cho khách lựa chọn xem hệ thống, tính nhanh hoặc để lại thông tin.</p></div></div></div></section>
      </main>
      <BusinessFooter />
      <div className={styles.mobileBar}><Link href="/lien-he">Zalo / Liên hệ</Link><Link href="/lien-he">Tư vấn</Link><a href="#tu-van">Nhận báo giá</a></div>
    </>
  );
}
