import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from 'react-icons/fa';
import logo from '../asset/img/logo.jpg';

const FooterComponent = () => {
  return (
    <div className="w-full">
      {/* Newsletter Section */}
      <div className="container-80 pt-20">
        <div className="bg-[#555555] text-white p-6 flex flex-wrap justify-between items-center rounded-t-lg">
          <div className="text-lg font-semibold md:w-1/2 mb-4 md:mb-0">
            ĐĂNG KÝ NHẬN BẢN TIN
          </div>
          <form className="flex items-center w-full md:w-1/3 h-12">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-grow p-3 text-black rounded-l-md outline-none h-full"
            />
            <button type="submit" className="bg-[#4B2E2B] text-white px-6 rounded-r-md h-full font-bold hover:bg-orange-800 transition-colors">
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div id="footer" className="bg-white text-stone-600 container-80 border-t border-stone-100">
        <div className="container mx-auto flex flex-wrap justify-between py-10">
          <div className="w-full sm:w-1/2 md:w-1/4 p-4">
            <h3 className="font-bold text-[#4B2E2B] mb-4 border-b-2 border-orange-500 w-fit">DỊCH VỤ</h3>
            <ul className='text-[14px] space-y-2'>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Điều khoản sử dụng</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Chính sách bảo mật</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Giới thiệu Next Coffee</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Hệ thống trung tâm</li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-4">
            <h3 className="font-bold text-[#4B2E2B] mb-4 border-b-2 border-orange-500 w-fit">HỖ TRỢ</h3>
            <ul className='text-[14px] space-y-2'>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Chính sách đổi trả</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Chính sách khách sỉ</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Phương thức vận chuyển</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Phương thức thanh toán</li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-4">
            <h3 className="font-bold text-[#4B2E2B] mb-4 border-b-2 border-orange-500 w-fit">TÀI KHOẢN</h3>
            <ul className='text-[14px] space-y-2'>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Đăng nhập / Đăng ký</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Thay đổi địa chỉ</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Chi tiết tài khoản</li>
              <li className='hover:text-orange-600 cursor-pointer transition-colors'>Lịch sử mua hàng</li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-4">
            <h3 className="font-bold text-[#4B2E2B] mb-4 border-b-2 border-orange-500 w-fit">LIÊN HỆ</h3>
            <ul className='text-[13px] space-y-3'>
              <li className='flex items-start gap-3'>
                <FaMapMarkerAlt className="mt-1 text-orange-700 shrink-0" />
                <span>69/68 Đặng Thùy Trâm, P.13, Q.Bình Thạnh, TP.HCM</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaPhoneAlt className="text-orange-700 shrink-0" />
                <span>0823 433 917</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaEnvelope className="text-orange-700 shrink-0" />
                <span>info@nextcoffee.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-stone-100" />

        {/* Bottom Logo & Social Section */}
        <div className="flex flex-wrap items-start justify-between py-10 px-4 gap-8">
          {/* Logo & Info */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <img className="h-12 w-12 rounded-full border border-stone-200" src={logo} alt="Logo" />
              <span className="text-2xl font-bold text-stone-800">Next<span className="text-[#4B2E2B]">Coffee</span></span>
            </div>
            <p className='text-sm leading-relaxed mb-4'>
              Next Coffee nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ nhận hàng trực tiếp tại văn phòng.
            </p>
            <div className="flex gap-4">
              <FaFacebookF className="text-xl hover:text-blue-600 cursor-pointer transition-transform hover:scale-110" />
              <FaInstagram className="text-xl hover:text-pink-600 cursor-pointer transition-transform hover:scale-110" />
              <FaYoutube className="text-xl hover:text-red-600 cursor-pointer transition-transform hover:scale-110" />
            </div>
          </div>

          {/* App Stores */}
          <div className="w-full sm:w-auto flex flex-col gap-3 items-center">
            <p className="text-xs font-bold uppercase text-stone-400">Tải ứng dụng</p>
            <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/android.png" alt="Google Play" className="w-32 cursor-pointer" />
            <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/appstore.png" alt="App Store" className="w-32 cursor-pointer" />
          </div>

          {/* Shipping Partners */}
          <div className="w-full sm:w-auto flex flex-col gap-4 items-center sm:items-end">
            <p className="text-xs font-bold uppercase text-stone-400">Đối tác vận chuyển</p>
            <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/Ninja-1.png" alt="Ninja Van" className="h-8 grayscale hover:grayscale-0 transition-all" />
            <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/Speedlink-1.png" alt="Speedlink" className="h-8 grayscale hover:grayscale-0 transition-all" />
            <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/logo-Kerry-172x40.png" alt="Kerry Express" className="h-8 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#4B2E2B] py-4 text-stone-300 text-xs text-center">
        © {new Date().getFullYear()} Thiết kế và lập trình bởi <span className="text-white font-bold tracking-wider">NextCoffee Team</span>
      </div>
    </div>
  );
};

export default FooterComponent;