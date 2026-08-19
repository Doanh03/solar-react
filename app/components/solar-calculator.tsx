'use client';

import { useMemo, useState } from 'react';
import { estimateSolar } from '@/app/lib/solar-calculator';

const money = new Intl.NumberFormat('vi-VN');

export function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(3_000_000);
  const [propertyType, setPropertyType] = useState<'home' | 'factory' | 'office' | 'shop' | 'farm'>('home');

  const result = useMemo(
    () => estimateSolar({ monthlyBill, propertyType }),
    [monthlyBill, propertyType],
  );

  return (
    <section id="calculator" className="calculator section-shell">
      <div className="section-heading">
        <span className="eyebrow">Solar Calculator</span>
        <h2>Ước tính hệ thống từ hóa đơn điện của bạn</h2>
        <p>Nhập vài thông tin cơ bản. Kết quả chỉ mang tính tham khảo để định hướng trước khi khảo sát thực tế.</p>
      </div>

      <div className="calculator-grid">
        <div className="calculator-card calculator-inputs">
          <label htmlFor="monthly-bill">Tiền điện trung bình / tháng</label>
          <div className="range-value">{money.format(monthlyBill)} đ</div>
          <input
            id="monthly-bill"
            type="range"
            min="500000"
            max="30000000"
            step="500000"
            value={monthlyBill}
            onChange={(event) => setMonthlyBill(Number(event.target.value))}
          />

          <label htmlFor="property-type">Loại công trình</label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value as typeof propertyType)}
          >
            <option value="home">Nhà ở</option>
            <option value="factory">Nhà xưởng</option>
            <option value="office">Văn phòng</option>
            <option value="shop">Cửa hàng</option>
            <option value="farm">Trang trại</option>
          </select>

          <a className="button button-primary full-width" href="#lead-form">
            Nhận báo giá chi tiết
          </a>
        </div>

        <div className="calculator-result">
          <div className="result-label">Hệ thống đề xuất</div>
          <div className="result-capacity">{result.capacityKwp} kWp</div>
          <div className="result-grid">
            <div><strong>{result.panels}</strong><span>Tấm pin</span></div>
            <div><strong>~{result.roofAreaM2} m²</strong><span>Diện tích mái</span></div>
            <div><strong>{money.format(result.monthlySavings)} đ</strong><span>Tiết kiệm / tháng</span></div>
            <div><strong>{result.paybackYears} năm</strong><span>Hoàn vốn dự kiến</span></div>
          </div>
          <p className="result-disclaimer">{result.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
