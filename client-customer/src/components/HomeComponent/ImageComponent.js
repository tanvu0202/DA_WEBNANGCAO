import React, { useState } from 'react';
import { FaArrowLeft, FaChevronLeft } from 'react-icons/fa';

const banners = [
  {
    id: 1,
    src: "https://file.hstatic.net/1000075078/article/1_d20823a852a544d49b44cc0e99d4c5a2.jpg",
    title: "Chuyện Cà Phê",
    desc: "Tìm hiểu về nguồn gốc hạt Arabica",
    story: "Hạt Arabica được mệnh danh là nữ hoàng của các loại cà phê. Với hương vị thanh tao, chua nhẹ và hậu vị ngọt ngào, Arabica đã chinh phục những người sành sỏi nhất. Tại Next Coffee, chúng tôi tuyển chọn những hạt cà phê từ vùng cao nguyên đất đỏ để đảm bảo hương vị nguyên bản nhất."
  },
  {
    id: 2,
    src: "https://file.hstatic.net/1000075078/article/_downloader.la_-61e2dbe1d15cb_f703352d67824cd298ff927cdba56aa9.jpg",
    title: "Pha Chế Tại Nhà",
    desc: "Ưu đãi 20% dụng cụ pha chế",
    story: "Nghệ thuật pha chế không chỉ dành cho các Barista chuyên nghiệp. Với bộ dụng cụ chuẩn, bạn có thể tự tạo ra ly cà phê hoàn hảo ngay tại gian bếp của mình. Hãy để Next Coffee đồng hành cùng đam mê của bạn bằng chương trình ưu đãi đặc biệt dành riêng cho tháng này."
  },
  {
    id: 3,
    src: "https://file.hstatic.net/1000075078/article/thecoffeehouse_caphe_2_aacf152c62064c40ab804a66ffc706d1.jpg",
    title: "Thưởng Thức",
    desc: "Menu đặc trưng từ Next Coffee",
    story: "Mỗi ly cà phê tại cửa hàng là một tác phẩm nghệ thuật. Từ Espresso đậm đà đến Latte mềm mại, chúng tôi kết hợp kỹ thuật truyền thống và sự sáng tạo hiện đại để mang đến trải nghiệm hương vị khó quên cho mỗi vị khách ghé thăm."
  }
];

export default function ImageComponent() {
  const [selectedId, setSelectedId] = useState(null);
  const currentItem = banners.find(item => item.id === selectedId);

  return (
    <>
      {/* --- THÊM CSS TRỰC TIẾP TẠI ĐÂY --- */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}
      </style>

      {selectedId && currentItem ? (
        // Giao diện 1: Trang Chi Tiết
        <div className="max-w-4xl mx-auto p-4 md:p-10 bg-white min-h-screen animate-fadeIn">
          <button 
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-1 text-stone-400 hover:text-orange-600 transition-colors text-sm mb-6 group"
          >
            <FaChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
            Trở về danh sách
          </button>

          <div className="w-full h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
            <img src={currentItem.src} alt={currentItem.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 px-2">
            <h1 className="text-4xl font-serif font-bold text-[#4B2E2B]">{currentItem.title}</h1>
            <p className="text-xl text-orange-600 font-medium italic">{currentItem.desc}</p>
            <div className="w-24 h-1 bg-orange-500"></div>
            
            <div className="text-stone-700 leading-relaxed text-lg whitespace-pre-line border-l-4 border-stone-100 pl-6 italic">
              {currentItem.story}
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-stone-50 flex justify-center">
            <button 
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-3 bg-[#4B2E2B] text-white px-12 py-4 rounded-full font-bold hover:bg-orange-900 transition-all shadow-xl active:scale-95"
            >
              <FaArrowLeft /> QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </div>
      ) : (
        // Giao diện 2: Danh sách Banner ban đầu
        <div className="flex flex-col md:flex-row gap-6 py-8 px-4 animate-fadeIn">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              onClick={() => setSelectedId(banner.id)} 
              className="group relative flex-1 h-[350px] overflow-hidden rounded-[2.5rem] shadow-xl bg-stone-100 cursor-pointer"
            >
              <img
                src={banner.src}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b0f]/90 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-white font-serif text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {banner.title}
                </h3>
                <p className="text-stone-300 text-sm italic opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {banner.desc}
                </p>
                <div className="mt-4 w-12 h-[2px] bg-orange-500 group-hover:w-24 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}