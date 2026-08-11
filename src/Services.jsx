import ServiceCards from './ServiceCards';

const danhSachDichVu = [
    {
    icon: "☀️",
    ten: "Điện Mặt Trời Áp Mái",
    moTa: "Lắp đặt hệ thống điện mặt trời trên mái nhà xưởng, văn phòng, giúp tiết kiệm chi phí điện."
  },
  {
    icon: "💰",
    ten: "Giải Pháp Tài Chính",
    moTa: "Hỗ trợ tài chính linh hoạt, không cần vốn đầu tư ban đầu (Zero-CAPEX)."
  },
  {
    icon: "🔧",
    ten: "Vận Hành & Bảo Trì",
    moTa: "Giám sát, bảo dưỡng định kỳ, đảm bảo hệ thống vận hành hiệu quả lâu dài."
  }
];

function Services() {
    return (
        <section className="services">
            <h2 className="section-title">Dịch Vụ Của Chúng Tôi</h2>
            <div className="service-cards">
                {danhSachDichVu.map(function(dichVu, index) {
                    return (
                        <ServiceCards 
                            key={index}
                            icon={dichVu.icon}
                            ten={dichVu.ten}
                            moTa={dichVu.moTa}
                        /> 
                    );
                })}
            </div>
        </section>
    );
}

export default Services;