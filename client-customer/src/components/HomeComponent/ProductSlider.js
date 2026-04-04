import React, { useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import WOW from 'wowjs';
import 'animate.css/animate.min.css';
import Swal from 'sweetalert2';

import MyContext from '../../contexts/MyContext'; 

const ProductSlider = ({ products }) => {
  const { mycart, setMycart } = useContext(MyContext);

  useEffect(() => {
    const wow = new WOW.WOW({ live: false });
    wow.init();
  }, []);

  const handleAddToCart = (e, item) => {
    e.preventDefault(); // Chặn Link chuyển trang
    e.stopPropagation(); // Chặn sự kiện lan lên thẻ cha

    const currentCart = [...mycart];
    const index = currentCart.findIndex((x) => x.product._id === item._id);

    if (index !== -1) {
      currentCart[index].quantity += 1;
    } else {
      currentCart.push({ product: item, quantity: 1 });
    }

    setMycart(currentCart);

    // Thông báo Toast nhỏ xinh
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: `Đã thêm ${item.name}`
    });
  };

  const settings = {
    dots: false,
    infinite: products.length > 5,
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

                {/* FIX: ẨN NÚT (+), HIỆN KHI HOVER CARD */}
                <div 
                  onClick={(e) => handleAddToCart(e, item)}
                  className="absolute bottom-4 right-4 translate-y-16 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-10"
                >
                   <div className="bg-[#442c1e] text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-orange-700 active:scale-90 transition-transform">
                      <FaPlus size={14} />
                   </div>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-4 flex flex-col items-center text-center overflow-hidden">
                <Link to={'/product/' + item._id} className="w-full">
                  {/* FIX: TÊN DÀI TỰ RÚT GỌN (Truncate) */}
                  <h3 
                    className='text-[#442c1e] font-bold text-base truncate block w-full hover:text-orange-700 transition-colors uppercase tracking-tight'
                    title={item.name}
                  >
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

// --- CÁC NÚT ĐIỀU HƯỚNG ---
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