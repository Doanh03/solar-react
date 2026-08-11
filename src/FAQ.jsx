import { useState } from 'react';
import FaqItem from './FaqItem';

const danhSachFaq = [
    {
      cauHoi: "Chi phí lắp đặt điện mặt trời áp mái là bao nhiêu?",
      cauTraLoi: "Chi phí phụ thuộc vào công suất hệ thống, diện tích mái và loại tấm pin sử dụng. Chúng tôi cung cấp khảo sát và báo giá miễn phí sau khi tư vấn."
    },
    {
      cauHoi: "Thời gian hoàn vốn trung bình là bao lâu?",
      cauTraLoi: "Thông thường từ 4-6 năm tùy vào mức tiêu thụ điện và quy mô hệ thống lắp đặt."
    },
    {
      cauHoi: "Hệ thống có cần bảo trì thường xuyên không?",
      cauTraLoi: "Hệ thống được bảo trì định kỳ 6 tháng/lần. Đội ngũ kỹ thuật sẽ giám sát từ xa 24/7 để đảm bảo vận hành ổn định."
    }
];

function FAQ() {
    const [chiSoDangMo, setChiSoDangMo] = useState(null);

    function xuLyBamCauHoi(index) {
        if (chiSoDangMo === index) {
            setChiSoDangMo(null);
        } else {
            setChiSoDangMo(index);
        }
    }

    return (
        <section className="faq">
            <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
            <div className="faq-list">
                {danhSachFaq.map(function(faq, index) {
                    return (
                        <FaqItem
                            key={index}
                            cauHoi={faq.cauHoi}
                            cauTraLoi={faq.cauTraLoi}
                            dangMo={chiSoDangMo === index}
                            onBamCauHoi={function() {xuLyBamCauHoi(index)}}
                            />
                    );
                })}
            </div>
        </section>
    )
}

export default FAQ;