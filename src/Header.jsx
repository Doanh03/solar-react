import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuDangMo, setMenuDangMo] = useState(false);

  function xuLyBamMenu() {
    setMenuDangMo(!menuDangMo);
  }

  return (
    <header className="header">
      <div className="logo">☀️ SunPower Việt</div>
      <button className="menu-toggle" onClick={xuLyBamMenu}>☰</button>
      <nav className={menuDangMo ? "navbar active" : "navbar"}>
        <Link to="/" onClick={function() { setMenuDangMo(false); }}>Trang chủ</Link>
        <Link to="/dich-vu" onClick={function() { setMenuDangMo(false); }}>Dịch vụ</Link>
        <Link to="/du-an" onClick={function() { setMenuDangMo(false); }}>Dự án</Link>
        <Link to="/ve-chung-toi" onClick={function() { setMenuDangMo(false); }}>Về chúng tôi</Link>
        <Link to="/lien-he" onClick={function() { setMenuDangMo(false); }}>Liên hệ</Link>
      </nav>
    </header>
  );
}

export default Header;