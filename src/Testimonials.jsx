import TestimonialCard from './TestimonialCard';

const danhSachDanhGia = [
   {
    noiDung: "Hệ thống vận hành ổn định, tiết kiệm hơn 30% chi phí điện mỗi tháng. Đội ngũ hỗ trợ rất chuyên nghiệp.",
    ten: "Anh Nguyễn Văn Hùng",
    chucVu: "Giám đốc Nhà Máy Dệt May"
  },
  {
    noiDung: "Quy trình lắp đặt nhanh gọn, không ảnh hưởng đến hoạt động sản xuất. Rất hài lòng với dịch vụ.",
    ten: "Chị Trần Thị Mai",
    chucVu: "Quản lý Nhà Máy Chế Biến Gỗ"
  },
  {
    noiDung: "Giải pháp tài chính linh hoạt giúp công ty đầu tư mà không cần vốn lớn ban đầu. Đáng tin cậy.",
    ten: "Anh Lê Minh Đức",
    chucVu: "CEO Nhà Máy Thực Phẩm"
  }
];

function Testimonials() {
    return (
        <section className="testimonials">
            <h2 className="section-title">Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <div className="testimonial-grid">
                {danhSachDanhGia.map(function(danhGia, index) {
                    return (
                        <TestimonialCard
                        key={index}
                        noiDung={danhGia.noiDung}
                        ten={danhGia.chucVu}
                        chucVu={danhGia.chucVu}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Testimonials;