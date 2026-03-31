import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa'; // Thêm icon Plus cho chất Coffee
import WOW from 'wowjs';
import 'animate.css/animate.min.css';

const ProductSlider = ({ products }) => {
  useEffect(() => {
    const wow = new WOW.WOW({ live: false });
    wow.init();
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > 5, // Chỉ chạy vô hạn nếu đủ sản phẩm
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="relative group px-4">
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item._id} className="p-3">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group/card border border-stone-100 flex flex-col h-full">
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <Link to={'/product/' + item._id}>
                  <img 
                    src={"data:image/jpg;base64," + item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                </Link>
                {/* Nút thêm nhanh khi hover */}
                <div className="absolute bottom-4 right-4 translate-y-12 group-hover/card:translate-y-0 transition-transform duration-300">
                   <div className="bg-[#442c1e] text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-orange-700">
                      <FaPlus size={14} />
                   </div>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-4 flex flex-col items-center text-center">
                <Link to={'/product/' + item._id}>
                  <h3 className='text-[#442c1e] font-bold text-base truncate w-full hover:text-orange-700 transition-colors uppercase tracking-tight'>
                    {item.name}
                  </h3>
                </Link>
                <div className="w-8 h-[2px] bg-orange-200 my-2 group-hover/card:w-16 transition-all duration-500"></div>
                <p className='text-[#92400e] font-extrabold text-lg'>
                  {item.price.toLocaleString()} ₫
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <button
    className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-800 hover:bg-[#442c1e] hover:text-white transition-all opacity-0 group-hover:opacity-100"
    onClick={onClick}
  >
    <FaArrowRight size={16} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-800 hover:bg-[#442c1e] hover:text-white transition-all opacity-0 group-hover:opacity-100"
    onClick={onClick}
  >
    <FaArrowLeft size={16} />
  </button>
);

export default ProductSlider;