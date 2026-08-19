'use client';

import { FormEvent, useMemo, useState } from 'react';
import { getAttributionFromSearch } from '@/app/lib/attribution';
import { scoreLead } from '@/app/lib/lead-scoring';

type PropertyType = 'home' | 'factory' | 'office' | 'shop' | 'farm';
type SolarType = 'grid-tied' | 'hybrid' | 'battery';

const propertyOptions: Array<{ value: PropertyType; label: string }> = [
  { value: 'home', label: 'Nhà ở' },
  { value: 'factory', label: 'Nhà xưởng' },
  { value: 'office', label: 'Văn phòng' },
  { value: 'shop', label: 'Cửa hàng' },
  { value: 'farm', label: 'Trang trại' },
];

const billOptions = [
  { value: 1_500_000, label: 'Dưới 2 triệu' },
  { value: 3_500_000, label: '2–5 triệu' },
  { value: 7_500_000, label: '5–10 triệu' },
  { value: 20_000_000, label: '10–30 triệu' },
  { value: 40_000_000, label: 'Trên 30 triệu' },
];

export function LeadSection() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>('home');
  const [monthlyBill, setMonthlyBill] = useState(3_500_000);
  const [roofAreaM2, setRoofAreaM2] = useState(40);
  const [solarType, setSolarType] = useState<SolarType>('grid-tied');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => scoreLead({
      monthlyBill,
      propertyType,
      roofAreaM2,
      solarType,
      calculatorUsed: true,
      phoneProvided: phone.trim().length > 0,
    }),
    [monthlyBill, propertyType, roofAreaM2, solarType, phone],
  );

  function next() {
    setStep((current) => Math.min(4, current + 1));
  }

  function back() {
    setStep((current) => Math.max(1, current - 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const attribution = getAttributionFromSearch(
      typeof window !== 'undefined' ? window.location.search : '',
      typeof window !== 'undefined' ? window.location.pathname : '/',
      typeof document !== 'undefined' ? document.referrer : '',
    );

    // Phase 2 will persist this payload through the Lead API/database.
    console.info('lead_capture', {
      name: name.trim(),
      phone: phone.trim(),
      propertyType,
      monthlyBill,
      roofAreaM2,
      solarType,
      leadScore: score,
      attribution,
    });
    setSubmitted(true);
  }

  return (
    <section id="lead-form" className="lead-section section-shell">
      <div>
        <span className="eyebrow">Tư vấn cá nhân hóa</span>
        <h2>Cho chúng tôi biết một chút về công trình của bạn</h2>
        <p>Trả lời nhanh vài câu hỏi để Sale hiểu nhu cầu trước khi gọi. Kết quả chỉ dùng để ưu tiên tư vấn, không thay thế khảo sát thực tế.</p>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="form-progress" aria-label={`Bước ${step} trên 4`}>
          <strong>Bước {step}/4</strong>
          <span>{Math.round((step / 4) * 100)}%</span>
        </div>

        {step === 1 && (
          <fieldset>
            <legend>Bạn muốn lắp điện mặt trời cho?</legend>
            <div className="option-grid">
              {propertyOptions.map((option) => (
                <label key={option.value}>
                  <input type="radio" name="propertyType" value={option.value} checked={propertyType === option.value} onChange={() => setPropertyType(option.value)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Tiền điện trung bình mỗi tháng?</legend>
            <div className="option-grid">
              {billOptions.map((option) => (
                <label key={option.value}>
                  <input type="radio" name="monthlyBill" value={option.value} checked={monthlyBill === option.value} onChange={() => setMonthlyBill(option.value)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend>Diện tích mái và nhu cầu lưu trữ</legend>
            <label htmlFor="roof-area">Diện tích mái ước tính: <strong>{roofAreaM2} m²</strong></label>
            <input id="roof-area" type="range" min="10" max="500" step="5" value={roofAreaM2} onChange={(event) => setRoofAreaM2(Number(event.target.value))} />
            <div className="option-grid">
              <label><input type="radio" name="solarType" value="grid-tied" checked={solarType === 'grid-tied'} onChange={() => setSolarType('grid-tied')} /><span>Hòa lưới</span></label>
              <label><input type="radio" name="solarType" value="hybrid" checked={solarType === 'hybrid'} onChange={() => setSolarType('hybrid')} /><span>Hybrid</span></label>
              <label><input type="radio" name="solarType" value="battery" checked={solarType === 'battery'} onChange={() => setSolarType('battery')} /><span>Pin lưu trữ</span></label>
            </div>
          </fieldset>
        )}

        {step === 4 && !submitted && (
          <fieldset>
            <legend>Nhận kết quả và tư vấn chi tiết</legend>
            <input name="name" aria-label="Họ và tên" placeholder="Họ và tên" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
            <input name="phone" aria-label="Số điện thoại" placeholder="Số điện thoại" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
            <div className="lead-score-preview" aria-live="polite">
              <strong>Ưu tiên tư vấn: {score.temperature === 'hot' ? 'HOT' : score.temperature === 'warm' ? 'WARM' : 'COLD'}</strong>
              <span>Score nội bộ: {score.score}/100</span>
            </div>
            <button className="button button-primary full-width" type="submit">Nhận tư vấn</button>
          </fieldset>
        )}

        {submitted && (
          <div role="status">
            <strong>Đã ghi nhận thông tin.</strong>
            <p>Hệ thống đã tạo dữ liệu Lead và attribution ở phía trình duyệt. Lead API/database sẽ được kết nối ở Phase 2.</p>
          </div>
        )}

        {!submitted && step > 1 && <button className="button button-secondary" type="button" onClick={back}>Quay lại</button>}
        {!submitted && step < 4 && <button className="button button-primary" type="button" onClick={next}>Tiếp tục</button>}
      </form>
    </section>
  );
}
