'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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

function StaticNumber({ value }: { value: number }) {
  return <>{value.toLocaleString('vi-VN')}</>;
}

type EnergyNodeType = 'home' | 'factory' | 'battery' | 'grid';

function EnergyIcon({ x, y, label, type }: { x: number; y: number; label: string; type: EnergyNodeType }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="25" fill="rgba(5,10,24,.96)" stroke="rgba(108,215,255,.52)" strokeWidth="1.7" />
      <circle r="31" fill="none" stroke="rgba(155,105,255,.35)" strokeWidth="1" strokeDasharray="2 8">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
      </circle>
      <circle r="20" fill="none" stroke="rgba(104,215,255,.12)" strokeWidth="1" />
      <g fill="none" stroke="url(#iconGradient)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {type === 'home' && (
          <>
            <path d="M-12 -1 L0 -11 L12 -1" />
            <path d="M-9 -2 V10 H9 V-2" />
            <path d="M-4 10 V3 H3 V10" />
            <path d="M-6 -4 H4 L8 -1 H-2 Z" opacity=".9" />
          </>
        )}
        {type === 'factory' && (
          <>
            <path d="M-13 11 V0 L-6 4 V-2 L1 2 V-5 L13 1 V11 Z" />
            <path d="M8 1 V-10 H13 V11" />
            <path d="M-8 7 H-5 M0 7 H3 M8 7 H11" />
          </>
        )}
        {type === 'battery' && (
          <>
            <rect x="-11" y="-8" width="22" height="16" rx="3" />
            <path d="M11 -3 H14 V3 H11" />
            <path d="M-6 0 H-2 M-4 -2 V2 M2 -2 V2" />
            <path d="M6 -2 V2" opacity=".55" />
          </>
        )}
        {type === 'grid' && (
          <>
            <circle cx="0" cy="0" r="3" />
            <path d="M0 -3 V-11 M-3 0 H-11 M3 0 H11 M0 3 V11" />
            <circle cx="0" cy="-13" r="2" />
            <circle cx="-13" cy="0" r="2" />
            <circle cx="13" cy="0" r="2" />
            <circle cx="0" cy="13" r="2" />
          </>
        )}
      </g>
      <text x="0" y="45" textAnchor="middle" fontSize="7" letterSpacing="1.2" fill="#a6b3c7" fontWeight="800">{label}</text>
    </g>
  );
}

function EnergyStream({ path, delay }: { path: string; delay: string }) {
  const endX = path.includes('50 82') ? 50 : path.includes('340 91') ? 340 : path.includes('72 305') ? 72 : 330;
  const endY = path.includes('50 82') ? 82 : path.includes('340 91') ? 91 : path.includes('72 305') ? 305 : 296;

  return (
    <>
      <path d={path} fill="none" stroke="rgba(108,215,255,.18)" strokeWidth="1.1" strokeDasharray="4 9" />
      <path d={path} fill="none" stroke="url(#streamGradient)" strokeWidth="2.2" strokeDasharray="18 140" strokeLinecap="round" opacity=".5">
        <animate attributeName="stroke-dashoffset" from="158" to="0" dur="3s" begin={delay} repeatCount="indefinite" />
      </path>
      <circle r="3.2" fill="#bdf6ff" opacity="0">
        <animateMotion dur="3s" begin={delay} repeatCount="indefinite" path={path} />
        <animate attributeName="opacity" values="0;.25;1;.2;0" keyTimes="0;.08;.5;.86;1" dur="3s" begin={delay} repeatCount="indefinite" />
      </circle>
      <circle r="8" fill="rgba(125,91,255,.22)" opacity="0" filter="url(#nodeGlow)">
        <animateMotion dur="3s" begin={delay} repeatCount="indefinite" path={path} />
        <animate attributeName="opacity" values="0;.05;.22;.04;0" keyTimes="0;.3;.75;.94;1" dur="3s" begin={delay} repeatCount="indefinite" />
      </circle>
      <circle cx={endX} cy={endY} r="22" fill="none" stroke="url(#iconGradient)" strokeWidth="4" opacity="0" filter="url(#nodeGlow)">
        <animate attributeName="opacity" values="0;0;0.9;0.25;0" keyTimes="0;.91;.96;.985;1" dur="3s" begin={delay} repeatCount="indefinite" />
      </circle>
    </>
  );
}

function EnergyPlanet() {
  return (
    <div className={styles.earthStage} aria-hidden="true">
      <div className={`${styles.orbit} ${styles.orbitOne}`} />
      <div className={`${styles.orbit} ${styles.orbitTwo}`} />
      <svg viewBox="0 0 390 390" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="planetCore" cx="43%" cy="38%">
            <stop offset="0%" stopColor="#e9faff" />
            <stop offset="13%" stopColor="#6ee8ff" />
            <stop offset="38%" stopColor="#426bff" />
            <stop offset="72%" stopColor="#20184f" />
            <stop offset="100%" stopColor="#050817" />
          </radialGradient>
          <linearGradient id="planetAtmosphere" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#73edff" stopOpacity=".9" />
            <stop offset=".48" stopColor="#8b6cff" stopOpacity=".6" />
            <stop offset="1" stopColor="#ff5eea" stopOpacity=".75" />
          </linearGradient>
          <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8cf7ff" />
            <stop offset=".48" stopColor="#54c8ff" />
            <stop offset="1" stopColor="#b06cff" />
          </linearGradient>
          <linearGradient id="streamGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8cf7ff" />
            <stop offset=".5" stopColor="#5b8dff" />
            <stop offset="1" stopColor="#d26cff" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset=".3" stopColor="#72eaff" stopOpacity=".45" />
            <stop offset="1" stopColor="#7b5cff" stopOpacity="0" />
          </radialGradient>
          <filter id="planetBlur"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="nodeGlow"><feGaussianBlur stdDeviation="4" /></filter>
          <clipPath id="planetClip"><circle cx="195" cy="195" r="104" /></clipPath>
        </defs>

        <circle cx="195" cy="195" r="132" fill="url(#coreGlow)" opacity=".14" filter="url(#planetBlur)" />
        <circle cx="195" cy="195" r="112" fill="none" stroke="url(#planetAtmosphere)" strokeWidth="3" opacity=".34" />
        <circle cx="195" cy="195" r="108" fill="none" stroke="rgba(110,232,255,.28)" strokeWidth="1" />
        <circle cx="195" cy="195" r="104" fill="url(#planetCore)" stroke="url(#planetAtmosphere)" strokeWidth="2" />

        <g clipPath="url(#planetClip)" fill="none" stroke="rgba(138,213,255,.2)" strokeWidth="1">
          <ellipse cx="195" cy="195" rx="104" ry="30" />
          <ellipse cx="195" cy="195" rx="104" ry="58" />
          <ellipse cx="195" cy="195" rx="104" ry="82" />
          <ellipse cx="195" cy="195" rx="38" ry="104" />
          <ellipse cx="195" cy="195" rx="68" ry="104" />
          <path d="M92 160 C138 142 252 142 298 160" stroke="rgba(197,117,255,.24)" />
          <path d="M88 230 C140 249 250 249 302 230" stroke="rgba(86,231,255,.2)" />
          <path d="M120 106 C146 158 146 232 120 284" stroke="rgba(86,231,255,.14)" />
        </g>

        <ellipse cx="195" cy="195" rx="108" ry="38" fill="none" stroke="url(#planetAtmosphere)" strokeWidth="2" opacity=".7" transform="rotate(-17 195 195)" />
        <ellipse cx="195" cy="195" rx="126" ry="52" fill="none" stroke="rgba(116,227,255,.18)" strokeWidth="1" transform="rotate(62 195 195)" />

        <circle cx="163" cy="163" r="43" fill="url(#coreGlow)" opacity=".45" filter="url(#planetBlur)" />
        <circle cx="163" cy="163" r="10" fill="#effcff" opacity=".9" />
        <circle cx="163" cy="163" r="28" fill="none" stroke="rgba(126,237,255,.36)" strokeWidth="1" strokeDasharray="2 5">
          <animateTransform attributeName="transform" type="rotate" from="0 163 163" to="360 163 163" dur="9s" repeatCount="indefinite" />
        </circle>

        <EnergyStream path="M195 195 C145 150 91 112 50 82" delay="0s" />
        <EnergyStream path="M195 195 C246 150 299 115 340 91" delay=".7s" />
        <EnergyStream path="M195 195 C150 244 105 276 72 305" delay="1.3s" />
        <EnergyStream path="M195 195 C245 239 291 269 330 296" delay="1.9s" />

        <EnergyIcon x={50} y={82} label="NHÀ Ở" type="home" />
        <EnergyIcon x={340} y={91} label="NHÀ XƯỞNG" type="factory" />
        <EnergyIcon x={72} y={305} label="LƯU TRỮ" type="battery" />
        <EnergyIcon x={330} y={296} label="GRID" type="grid" />

        <circle cx="195" cy="195" r="10" fill="url(#coreGlow)" opacity=".65" filter="url(#nodeGlow)">
          <animate attributeName="r" values="8;14;8" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".3;.75;.3" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </svg>
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
                <EnergyPlanet />
                <div className={`${styles.stat} ${styles.statMain}`}><span>{stats[0].label}</span><strong><StaticNumber value={stats[0].value} /><small>{stats[0].suffix}</small></strong><b>CHỈ SỐ MÔ PHỎNG</b></div>
                <div className={`${styles.stat} ${styles.statTL}`}><span>{stats[1].label}</span><strong><StaticNumber value={stats[1].value} /><small>{stats[1].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statTR}`}><span>{stats[2].label}</span><strong><StaticNumber value={stats[2].value} /><small>{stats[2].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statBL}`}><span>{stats[3].label}</span><strong><StaticNumber value={stats[3].value} /><small>{stats[3].suffix}</small></strong></div>
                <div className={`${styles.stat} ${styles.statBR}`}><span>{stats[4].label}</span><strong><StaticNumber value={stats[4].value} /><small>{stats[4].suffix}</small></strong></div>
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
