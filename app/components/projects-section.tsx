export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell projects-section">
      <div className="section-heading"><span className="eyebrow">Project intelligence</span><h2>Thiết kế dựa trên dữ liệu công trình.</h2><p>Danh mục dự án sẽ được kết nối với dữ liệu thật của doanh nghiệp ở giai đoạn Content/CRM.</p></div>
      <div className="project-grid">
        <article><span>RESIDENTIAL</span><h3>Hộ gia đình</h3><p>Khảo sát mái → phân tích phụ tải → đề xuất công suất → nghiệm thu.</p></article>
        <article><span>COMMERCIAL</span><h3>Doanh nghiệp</h3><p>Đánh giá profile tiêu thụ và bài toán hiệu quả đầu tư trước khi báo giá.</p></article>
        <article><span>STORAGE</span><h3>Hybrid & Battery</h3><p>Thiết kế phương án lưu trữ theo mục tiêu dự phòng và mức độ tự chủ.</p></article>
      </div>
    </section>
  );
}
