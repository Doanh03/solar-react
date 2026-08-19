import { useMemo, useState } from 'react'
import { scoreLead } from './leadScoring'

const STEPS = [
  { key: 'propertyType', title: 'Bạn đang muốn lắp điện mặt trời cho?', options: [['home', 'Nhà ở'], ['shop', 'Cửa hàng'], ['office', 'Văn phòng'], ['factory', 'Nhà xưởng'], ['farm', 'Trang trại']] },
  { key: 'monthlyBillVnd', title: 'Tiền điện trung bình mỗi tháng?', options: [[1000000, '< 2 triệu'], [3500000, '2–5 triệu'], [7500000, '5–10 triệu'], [20000000, '10–30 triệu'], [35000000, '> 30 triệu']] },
  { key: 'roofAreaM2', title: 'Diện tích mái ước tính?', options: [[20, '< 25 m²'], [35, '25–50 m²'], [70, '50–100 m²'], [120, '> 100 m²']] },
]

export default function ProgressiveLeadForm({ calculatorResult = null, onSubmit, onCancel }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ propertyType: '', monthlyBillVnd: '', roofAreaM2: '', solarType: 'undecided', name: '', phone: '' })
  const score = useMemo(() => scoreLead({ ...form, calculatorUsed: Boolean(calculatorResult), quoteRequested: true }), [form, calculatorResult])

  const choose = (value) => {
    const key = STEPS[step].key
    setForm((current) => ({ ...current, [key]: value }))
    setStep((current) => current + 1)
  }

  const submit = (event) => {
    event.preventDefault()
    onSubmit?.({ ...form, monthlyBillVnd: Number(form.monthlyBillVnd), roofAreaM2: Number(form.roofAreaM2), leadScore: score })
  }

  return (
    <div className="progressive-lead-form" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button type="button" className="modal-close" onClick={onCancel} aria-label="Đóng">×</button>
      <div className="kicker">BƯỚC {Math.min(step + 1, STEPS.length + 1)} / {STEPS.length + 1}</div>
      <div aria-hidden="true" style={{ height: 4, background: '#e6ede7', borderRadius: 99, margin: '12px 0 24px' }}><div style={{ height: '100%', width: `${((step + 1) / (STEPS.length + 1)) * 100}%`, background: '#7aa94d', borderRadius: 99 }} /></div>

      {step < STEPS.length ? (
        <>
          <h2 id="lead-title">{STEPS[step].title}</h2>
          <div style={{ display: 'grid', gap: 10, marginTop: 22 }}>
            {STEPS[step].options.map(([value, label]) => <button key={String(value)} type="button" className="button button-ghost" onClick={() => choose(value)}>{label}</button>)}
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <h2 id="lead-title">Nhận kết quả & báo giá sơ bộ</h2>
          <p style={{ color: '#617069', lineHeight: 1.6 }}>Chúng tôi dùng thông tin này để ưu tiên tư vấn đúng nhu cầu. Điểm Lead hiện tại: <strong>{score.score}/100</strong>.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Họ và tên" autoComplete="name" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Số điện thoại" type="tel" inputMode="tel" autoComplete="tel" />
            <select value={form.solarType} onChange={(e) => setForm({ ...form, solarType: e.target.value })}>
              <option value="undecided">Chưa quyết định loại hệ thống</option>
              <option value="on_grid">Hòa lưới</option>
              <option value="hybrid">Hybrid</option>
              <option value="battery">Pin lưu trữ</option>
            </select>
            <button className="button button-primary full" type="submit">Nhận tư vấn →</button>
          </div>
        </form>
      )}
    </div>
  )
}
