'use client';

import { FormEvent, useState } from 'react';

export function LeadSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="lead-form" className="lead-section section-shell">
      <div><span className="eyebrow">Get a tailored estimate</span><h2>Muốn biết hệ thống nào phù hợp với mái nhà của bạn?</h2><p>Để lại thông tin sau khi xem kết quả tính toán. Dữ liệu sẽ được dùng để Sale tư vấn chính xác hơn.</p></div>
      <form className="lead-form" onSubmit={handleSubmit}>
        <input name="name" aria-label="Họ và tên" placeholder="Họ và tên" autoComplete="name" required />
        <input name="phone" aria-label="Số điện thoại" placeholder="Số điện thoại" inputMode="tel" autoComplete="tel" required />
        <button className="button button-primary" type="submit">Nhận tư vấn</button>
        {submitted ? <small role="status">Đã ghi nhận thông tin. API Lead sẽ được kết nối ở Phase 2.</small> : <small>Form hiện chỉ là UI foundation; backend Lead API sẽ được triển khai ở Phase 2.</small>}
      </form>
    </section>
  );
}
