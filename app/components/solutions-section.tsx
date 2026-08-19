const solutions = [
  ['01', 'Điện mặt trời hộ gia đình', 'Tối ưu chi phí điện và chủ động nguồn năng lượng cho ngôi nhà.'],
  ['02', 'Điện mặt trời doanh nghiệp', 'Thiết kế theo phụ tải, mái và mục tiêu tiết kiệm của doanh nghiệp.'],
  ['03', 'Hybrid & lưu trữ', 'Kết hợp điện mặt trời và pin lưu trữ cho nhu cầu chủ động cao hơn.'],
] as const;

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-shell section-light">
      <div className="section-heading"><span className="eyebrow">Solutions</span><h2>Một hệ thống phù hợp bắt đầu từ đúng nhu cầu.</h2></div>
      <div className="solution-grid">
        {solutions.map(([number, title, text]) => (
          <article className="solution-card" key={number}>
            <span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#calculator">Tìm cấu hình phù hợp →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
