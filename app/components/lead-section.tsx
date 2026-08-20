'use client';

import { FormEvent, useEffect, useState } from 'react';
import { getAttributionFromSearch } from '@/app/lib/attribution';
import { trackEvent } from '@/app/lib/analytics';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  function markFormStarted(source = 'form_focus') {
    if (formStarted) return;
    setFormStarted(true);
    trackEvent('lead_form_started', { section: 'lead_form', form_version: 'v2', source });
  }

  useEffect(() => {
    if (!formStarted || submitted) return;
    const onPageExit = () => {
      trackEvent('lead_form_abandoned', { section: 'lead_form', form_version: 'v2', last_step: step });
    };
    window.addEventListener('pagehide', onPageExit);
    return () => window.removeEventListener('pagehide', onPageExit);
  }, [formStarted, submitted, step]);

  function next() {
    markFormStarted('continue');
    trackEvent('lead_form_step_completed', { section: 'lead_form', step, form_version: 'v2' });
    const nextStep = Math.min(3, step + 1);
    setStep(nextStep);
    if (nextStep === 3) {
      trackEvent('lead_phone_reached', { section: 'lead_form', step: 3, form_version: 'v2' });
    }
  }

  function back() {
    setStep((current) => Math.max(1, current - 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markFormStarted('submit');
    setSubmitting(true);
    setError('');

    const normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length < 9 || normalizedPhone.length > 11) {
      setError('Vui lòng nhập số điện thoại hợp lệ để đội ngũ có thể liên hệ.');
      setSubmitting(false);
      trackEvent('lead_submit_error', { section: 'lead_form', form_version: 'v2', reason: 'invalid_phone' });
      return;
    }

    const attribution = getAttributionFromSearch(
      typeof window !== 'undefined' ? window.location.search : '',
      typeof window !== 'undefined' ? window.location.pathname : '/',
      typeof document !== 'undefined' ? document.referrer : '',
    );

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
          propertyType,
          monthlyBill,
          roofAreaM2,
          solarType,
          calculatorUsed: true,
          attribution,
        }),
      });

      const result = (await response.json()) as { error?: string; lead?: { id?: string } };
      if (!response.ok) throw new Error(result.error ?? 'Không thể gửi thông tin');

      trackEvent('lead_submitted', {
        section: 'lead_form',
        form_version: 'v2',
        lead_id: result.lead?.id,
        property_type: propertyType,
        solar_type: solarType,
        monthly_bill: monthlyBill,
        roof_area_m2: roofAreaM2,
        calculator_used: true,
      });
      setSubmitted(true);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Không thể gửi thông tin. Vui lòng thử lại.';
      setError(message);
      trackEvent('lead_submit_error', { section: 'lead_form', form_version: 'v2', reason: 'api_error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="lead-form" className="lead-section section-shell">
      <div>
        <span className="eyebrow">Tư vấn miễn phí</span>
        <h2>Nhận cấu hình điện mặt trời phù hợp cho công trình của bạn</h2>
        <p>Chỉ 3 bước, mất khoảng 30 giây. Đội ngũ tư vấn sẽ dựa trên nhu cầu và mức tiền điện của bạn để đề xuất cấu hình tham khảo.</p>
        <div className="form-value-promise">
          <span>✓ Công suất tham khảo</span>
          <span>✓ Ước tính tiết kiệm</span>
          <span>✓ Gợi ý hệ thống phù hợp</span>
          <span>✓ Tư vấn không tính phí</span>
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit} onFocus={() => markFormStarted()}>
        <div className="form-progress" aria-label={`Bước ${step} trên 3`}>
          <strong>Bước {step}/3</strong>
          <span>{Math.round((step / 3) * 100)}%</span>
        </div>
        <p className="form-time-note">Không cần email. Chỉ cần số điện thoại để nhận tư vấn.</p>

        {step === 1 && (
          <fieldset>
            <legend>Công trình của bạn là loại nào?</legend>
            <div className="option-grid">
              {propertyOptions.map((option) => (
                <label key={option.value}>
                  <input type="radio" name="propertyType" value={option.value} checked={propertyType === option.value} onChange={() => setPropertyType(option.value)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
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

        {step === 2 && (
          <fieldset>
            <legend>Thông tin hệ thống dự kiến</legend>
            <label htmlFor="roof-area">Diện tích mái ước tính: <strong>{roofAreaM2} m²</strong></label>
            <input id="roof-area" type="range" min="10" max="500" step="5" value={roofAreaM2} onChange={(event) => setRoofAreaM2(Number(event.target.value))} />
            <div className="option-grid">
              <label><input type="radio" name="solarType" value="grid-tied" checked={solarType === 'grid-tied'} onChange={() => setSolarType('grid-tied')} /><span>Hòa lưới</span></label>
              <label><input type="radio" name="solarType" value="hybrid" checked={solarType === 'hybrid'} onChange={() => setSolarType('hybrid')} /><span>Hybrid</span></label>
              <label><input type="radio" name="solarType" value="battery" checked={solarType === 'battery'} onChange={() => setSolarType('battery')} /><span>Pin lưu trữ</span></label>
            </div>
          </fieldset>
        )}

        {step === 3 && !submitted && (
          <fieldset>
            <legend>Để lại thông tin để nhận tư vấn</legend>
            <input name="name" aria-label="Họ và tên" placeholder="Họ và tên" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
            <input name="phone" aria-label="Số điện thoại" placeholder="Số điện thoại *" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
            <p className="lead-form-note">Chúng tôi chỉ dùng số điện thoại để liên hệ về yêu cầu này.</p>
            {error && <p role="alert">{error}</p>}
            <button className="button button-primary full-width" type="submit" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Nhận tư vấn miễn phí'}
            </button>
          </fieldset>
        )}

        {submitted && (
          <div role="status">
            <strong>Đã nhận yêu cầu của bạn ✓</strong>
            <p>Đội ngũ tư vấn sẽ tiếp nhận thông tin và liên hệ theo nhu cầu bạn đã chọn.</p>
          </div>
        )}

        {!submitted && step > 1 && <button className="button button-secondary" type="button" onClick={back} disabled={submitting}>Quay lại</button>}
        {!submitted && step < 3 && <button className="button button-primary" type="button" onClick={next}>Tiếp tục →</button>}
      </form>
    </section>
  );
}
