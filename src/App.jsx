import { useMemo, useState } from 'react'
import './App.css'

const solutions = [
  { icon: '⌂', title: 'Điện mặt trời hộ gia đình', text: 'Tối ưu hệ thống theo mức tiêu thụ điện và diện tích mái của từng gia đình.' },
  { icon: '▦', title: 'Điện mặt trời doanh nghiệp', text: 'Giảm chi phí vận hành và khai thác mái nhà xưởng hiệu quả hơn.' },
  { icon: '◈', title: 'Hybrid & lưu trữ', text: 'Kết hợp điện mặt trời và pin lưu trữ để tăng khả năng chủ động nguồn điện.' },
]

const projects = [
  { type: 'Nhà phố', size: '6.6 kWp', saving: '≈ 1.9 triệu/tháng', location: 'TP. Hồ Chí Minh' },
  { type: 'Biệt thự', size: '10.8 kWp', saving: '≈ 3.2 triệu/tháng', location: 'Đồng Nai' },
  { type: 'Nhà xưởng', size: '99 kWp', saving: 'Tối ưu giờ cao điểm', location: 'Bình Dương' },
]

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN').format(Math.round(value)) + ' đ'
}

function App() {
  const [monthlyBill, setMonthlyBill] = useState(3000000)
  const [leadOpen, setLeadOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const estimate = useMemo(() => {
    const kwp = Math.max(2.2, Math.min(30, monthlyBill / 560000))
    const annualGeneration = kwp * 1350
    const annualSaving = monthlyBill * 12 * 0.62
    const investment = kwp * 13500000
    const payback = investment / Math.max(annualSaving, 1)
    return { kwp, annualGeneration, annualSaving, investment, payback }
  }, [monthlyBill])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#top" aria-label="Solar Nova">
          <span className="brand-mark">☼</span>
          <span><strong>SOLAR</strong><small>NOVA ENERGY</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">☰</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <button onClick={() => scrollTo('solutions')}>Giải pháp</button>
          <button onClick={() => scrollTo('calculator')}>Tính toán</button>
          <button onClick={() => scrollTo('projects')}>Dự án</button>
          <button onClick={() => scrollTo('process')}>Quy trình</button>
          <button className="nav-cta" onClick={() => setLeadOpen(true)}>Nhận báo giá</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Năng lượng thông minh cho ngày mai</div>
            <h1>Biến mái nhà thành <em>tài sản năng lượng.</em></h1>
            <p className="hero-text">Thiết kế hệ thống điện mặt trời theo đúng nhu cầu sử dụng, ưu tiên hiệu quả đầu tư, độ bền và khả năng mở rộng.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('calculator')}>Tính hệ thống của tôi <span>→</span></button>
              <button className="button button-ghost" onClick={() => setLeadOpen(true)}>Tư vấn miễn phí</button>
            </div>
            <div className="trust-row">
              <div><strong>15+</strong><span>năm kinh nghiệm ngành</span></div>
              <div><strong>500+</strong><span>hệ thống đã triển khai</span></div>
              <div><strong>25 năm</strong><span>tuổi thọ tấm pin</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Minh họa hệ thống điện mặt trời">
            <div className="sun-glow" />
            <div className="energy-card top-card"><span>☀</span><div><small>Sản lượng hôm nay</small><strong>28.6 kWh</strong></div><b>+18%</b></div>
            <div className="roof">
              <div className="panel-grid">{Array.from({ length: 24 }, (_, i) => <span key={i} />)}</div>
              <div className="roof-edge" />
            </div>
            <div className="energy-card bottom-card"><span className="bolt">ϟ</span><div><small>Tiết kiệm dự kiến</small><strong>2.4 triệu/tháng</strong></div><span className="pulse" /></div>
          </div>
        </section>

        <section className="stats-strip">
          <div><span>01</span><strong>Khảo sát</strong><small>Đánh giá nhu cầu & mái</small></div>
          <div><span>02</span><strong>Thiết kế</strong><small>Mô phỏng sản lượng</small></div>
          <div><span>03</span><strong>Lắp đặt</strong><small>Thi công an toàn</small></div>
          <div><span>04</span><strong>Vận hành</strong><small>Giám sát & bảo hành</small></div>
        </section>

        <section id="solutions" className="section solutions">
          <div className="section-heading"><div><span className="kicker">GIẢI PHÁP</span><h2>Một hệ thống đúng,<br /><em>một khoản đầu tư tốt.</em></h2></div><p>Không bán công suất dư thừa. Chúng tôi bắt đầu từ hóa đơn điện, thói quen sử dụng và mục tiêu tài chính của bạn.</p></div>
          <div className="solution-grid">{solutions.map((item) => <article className="solution-card" key={item.title}><span className="solution-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p><button onClick={() => setLeadOpen(true)}>Khám phá giải pháp <span>↗</span></button></article>)}</div>
        </section>

        <section id="calculator" className="calculator-section">
          <div className="section calculator-wrap">
            <div className="calculator-copy"><span className="kicker">SOLAR CALCULATOR</span><h2>Hóa đơn điện của bạn đang nói điều gì?</h2><p>Điều chỉnh mức điện trung bình mỗi tháng. Công cụ sẽ đưa ra một ước tính sơ bộ để bạn có điểm bắt đầu trước khi khảo sát thực tế.</p><div className="calculator-note">⚡ Kết quả chỉ mang tính tham khảo. Thiết kế cuối cùng cần dựa trên khảo sát hiện trạng.</div></div>
            <div className="calculator-card">
              <label htmlFor="bill">Tiền điện trung bình / tháng</label>
              <div className="bill-input"><input id="bill" type="range" min="1000000" max="20000000" step="500000" value={monthlyBill} onChange={(e) => setMonthlyBill(Number(e.target.value))} /><strong>{formatVnd(monthlyBill)}</strong></div>
              <div className="estimate-main"><div><small>Công suất đề xuất</small><strong>{estimate.kwp.toFixed(1)} <i>kWp</i></strong></div><div><small>Sản lượng dự kiến</small><strong>{Math.round(estimate.annualGeneration).toLocaleString('vi-VN')} <i>kWh/năm</i></strong></div></div>
              <div className="estimate-grid"><div><span>Đầu tư tham khảo</span><b>{formatVnd(estimate.investment)}</b></div><div><span>Tiết kiệm/năm</span><b>{formatVnd(estimate.annualSaving)}</b></div><div><span>Hoàn vốn ước tính</span><b>{estimate.payback.toFixed(1)} năm</b></div></div>
              <button className="button button-primary full" onClick={() => setLeadOpen(true)}>Nhận báo giá theo nhu cầu →</button>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading"><div><span className="kicker">DỰ ÁN TIÊU BIỂU</span><h2>Thiết kế theo công trình,<br /><em>không theo khuôn mẫu.</em></h2></div><button className="text-button" onClick={() => setLeadOpen(true)}>Xem năng lực triển khai →</button></div>
          <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.location}><div className={`project-art art-${index + 1}`}><div className="mini-panels">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><span>{project.size}</span></div><div className="project-info"><div><span>{project.type}</span><small>{project.location}</small></div><strong>{project.saving}</strong></div></article>)}</div>
        </section>

        <section id="process" className="section process-section"><div className="process-intro"><span className="kicker">QUY TRÌNH</span><h2>Từ hóa đơn điện<br /><em>đến hệ thống hoàn chỉnh.</em></h2></div><div className="process-list">{['Khảo sát & phân tích', 'Thiết kế & mô phỏng', 'Báo giá minh bạch', 'Thi công & nghiệm thu', 'Kết nối giám sát', 'Bảo hành & đồng hành'].map((item, i) => <div className="process-item" key={item}><span>0{i + 1}</span><strong>{item}</strong><p>{['Đo đạc mái, hướng nắng và phân tích nhu cầu sử dụng.', 'Tính toán sản lượng và cấu hình thiết bị phù hợp.', 'Tách rõ thiết bị, nhân công và các hạng mục liên quan.', 'Thi công theo tiêu chuẩn an toàn và checklist nghiệm thu.', 'Theo dõi sản lượng và cảnh báo hệ thống từ xa.', 'Hỗ trợ kỹ thuật, bảo trì và tối ưu trong suốt vòng đời.'][i]}</p></div>)}</div></section>

        <section className="final-cta"><div><span className="kicker">SẴN SÀNG BẮT ĐẦU?</span><h2>Đừng đoán mức tiết kiệm.<br /><em>Hãy tính nó.</em></h2></div><button className="button button-light" onClick={() => setLeadOpen(true)}>Nhận khảo sát miễn phí <span>→</span></button></section>
      </main>

      <footer className="footer"><div className="brand"><span className="brand-mark">☼</span><span><strong>SOLAR</strong><small>NOVA ENERGY</small></span></div><div><span>© 2026 Solar Nova Energy</span><span>Thiết kế độc lập · Không liên kết với MT Solar</span></div></footer>

      {leadOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setLeadOpen(false)}><div className="lead-modal"><button className="modal-close" onClick={() => setLeadOpen(false)}>×</button><span className="kicker">NHẬN TƯ VẤN</span><h2>Để lại thông tin,<br /><em>chúng tôi sẽ liên hệ.</em></h2><form onSubmit={(e) => { e.preventDefault(); setLeadOpen(false); alert('Đã nhận yêu cầu. Đây là bản demo, bước tiếp theo sẽ kết nối API/CRM.') }}><input required placeholder="Họ và tên" /><input required placeholder="Số điện thoại" type="tel" /><select defaultValue=""><option value="" disabled>Nhu cầu của bạn</option><option>Hộ gia đình</option><option>Doanh nghiệp</option><option>Hybrid / Pin lưu trữ</option></select><button className="button button-primary full" type="submit">Gửi yêu cầu →</button></form></div></div>}
    </div>
  )
}

export default App
