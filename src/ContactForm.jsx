import { useState } from 'react';

function ContactForm() {
  const [ten, setTen] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [thongBao, setThongBao] = useState("");
  const [mauChu, setMauChu] = useState("red");

  function xuLyGuiForm(event) {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

    if (ten.trim().length < 2) {
      setMauChu("red");
      setThongBao("Vui lòng nhập họ tên đầy đủ (ít nhất 2 ký tự)");
      return;
    } else if (!emailRegex.test(email)) {
      setMauChu("red");
      setThongBao("Email không đúng định dạng");
      return;
    } else if (!phoneRegex.test(phone)) {
      setMauChu("red");
      setThongBao("Số điện thoại không hợp lệ");
      return;
    } else if (noiDung.trim().length < 10) {
      setMauChu("red");
      setThongBao("Vui lòng nhập nội dung chi tiết hơn");
      return;
    }

    setMauChu("green");
    setThongBao("Gửi thành công! Cảm ơn bạn đã liên hệ.");
  }

  return (
    <form className="contact-form" onSubmit={xuLyGuiForm}>
      <input
        type="text"
        placeholder="Họ và tên"
        value={ten}
        onChange={function(event) { setTen(event.target.value); }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={function(event) { setEmail(event.target.value); }}
      />
      <input
        type="tel"
        placeholder="Số điện thoại"
        value={phone}
        onChange={function(event) { setPhone(event.target.value); }}
      />
      <textarea
        placeholder="Nội dung cần tư vấn"
        rows="4"
        value={noiDung}
        onChange={function(event) { setNoiDung(event.target.value); }}
      ></textarea>
      <button type="submit">Gửi Yêu Cầu</button>
      <p style={{ color: mauChu }}>{thongBao}</p>
    </form>
  );
}

export default ContactForm;