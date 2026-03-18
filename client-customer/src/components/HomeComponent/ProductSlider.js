import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import WOW from 'wowjs';
import 'animate.css/animate.min.css';

const ProductSlider = ({ products }) => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="relative group">
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item._id} className="p-2">
            <figure>
              <Link to={'/product/' + item._id}>
                <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
              </Link>
              <figcaption className="text-center">
                <p className='text-[#4e4e4e] capitalize text-sm truncate'>{item.name}</p>
                <p className='text-black font-medium mt-1'>{item.price.toLocaleString()} ₫</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="text-2xl absolute right-0 top-[40%] transform -translate-y-1/2 z-10 text-black cursor-pointer hidden group-hover:block wow animate__animated animate__fadeIn"
      onClick={onClick}
    >
      <FaArrowRight size={24} className="text-accent" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="text-2xl absolute left-0 top-[40%] transform -translate-y-1/2 z-10 text-black cursor-pointer hidden group-hover:block wow animate__animated animate__fadeIn"
      onClick={onClick}
    >
      <FaArrowLeft size={24} className="text-accent" />
    </div>
  );
};

export default ProductSlider;
