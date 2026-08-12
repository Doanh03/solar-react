import { useState } from 'react'
import ProjectCard from './ProjectCard'

const danhSachDuAn = [
    { ten: "Nhà Máy Dệt May", diaDiem: "Bình Dương", congSuat: "800 kWp", nganh: "san-xuat", anh: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" },
    { ten: "Nhà Máy Chế Biến Gỗ", diaDiem: "Đồng Nai", congSuat: "600 kWp", nganh: "san-xuat", anh: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" },
    { ten: "Kho Vận Logistics ABC", diaDiem: "Long An", congSuat: "450 kWp", nganh: "kho-van", anh: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" },
    { ten: "Tòa Nhà Văn Phòng Sun Tower", diaDiem: "TP.HCM", congSuat: "300 kWp", nganh: "van-phong", anh: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" }
];

function Projects() {
    const [nganhDangChon, setNganhDangChon] = useState("tat-ca");

    let duAnHienThi = danhSachDuAn;
    if (nganhDangChon !== "tat-ca") {
        duAnHienThi = danhSachDuAn.filter(function(duAn) {
            return duAn.nganh === nganhDangChon;
        });
    }

    return (
        <section className="projects-full">
            <div className="filter-buttons">
                <button
                    className={nganhDangChon === "tat-ca" ? "filter-btn active" : "filter-btn"}
                    onClick={function() { setNganhDangChon("tat-ca");}}    
                >
                    Tất Cả
                </button>
                <button
                    className={nganhDangChon === "kho-van" ? "filter-btn active" : "filter-btn"}
                    onClick={function() { setNganhDangChon("kho-van");}}
                >
                    Kho Vận
                </button>
                <button
                     className={nganhDangChon === "san-xuat" ? "filter-btn active" : "filter-btn"}
                     onClick={function() { setNganhDangChon("san-xuat"); }}
                 >
                     Sản Xuất
                </button>
                <button
                    className={nganhDangChon === "van-phong" ? "filter-btn active" : "filter-btn"}
                    onClick={function() { setNganhDangChon("van-phong");}}
                >
                    Văn Phòng
                </button>
            </div>

            <div id="allProjectCards">
                {duAnHienThi.map(function(duAn,index) {
                    return (
                        <ProjectCard
                            key={index}
                            ten={duAn.ten}
                            diaDiem={duAn.diaDiem}
                            congSuat={duAn.congSuat}
                            anh={duAn.anh}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;