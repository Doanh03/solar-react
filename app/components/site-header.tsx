export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Solar Nova home"><span>☀</span> SOLAR<span>NOVA</span></a>
      <nav aria-label="Điều hướng chính">
        <a href="#solutions">Giải pháp</a>
        <a href="#calculator">Tính toán</a>
        <a href="#projects">Dự án</a>
        <a href="#lead-form">Tư vấn</a>
      </nav>
      <a className="header-phone" href="tel:+84000000000">Gọi tư vấn</a>
    </header>
  );
}
