import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageComponent() {
  const banners = [
    {
      id: 1,
      src: "https://file.hstatic.net/1000075078/article/1_d20823a852a544d49b44cc0e99d4c5a2.jpg",
      title: "Chuyện Cà Phê",
      desc: "Tìm hiểu về nguồn gốc hạt Arabica",
      link: "/blog"
    },
    {
      id: 2,
      src: "https://file.hstatic.net/1000075078/article/_downloader.la_-61e2dbe1d15cb_f703352d67824cd298ff927cdba56aa9.jpg",
      title: "Pha Chế Tại Nhà",
      desc: "Ưu đãi 20% dụng cụ pha chế",
      link: "/shop/tools"
    },
    {
      id: 3,
      src: "https://file.hstatic.net/1000075078/article/thecoffeehouse_caphe_2_aacf152c62064c40ab804a66ffc706d1.jpg",
      title: "Thưởng Thức",
      desc: "Menu đặc trưng từ The Coffee",
      link: "/menu"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 py-4">
      {banners.map((banner) => (
        <Link 
          key={banner.id} 
          to={banner.link} 
          className="group relative flex-1 overflow-hidden rounded-[2rem] shadow-lg bg-stone-200"
        >
          {/* Hình ảnh với hiệu ứng Zoom khi Hover */}
          <img
            src={banner.src}
            alt={banner.title}
            className="w-full h-[300px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />

          {/* Lớp phủ Gradient mờ dần từ dưới lên để làm nổi bật chữ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

          {/* Nội dung text trên ảnh */}
          <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
            <h3 className="text-white font-serif text-2xl font-bold mb-1">
              {banner.title}
            </h3>
            <p className="text-stone-200 text-sm italic mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {banner.desc}
            </p>
            <div className="w-10 h-[2px] bg-orange-500 transition-all duration-500 group-hover:w-20" />
          </div>
        </Link>
      ))}
    </div>
  );
}