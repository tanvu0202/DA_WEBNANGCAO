import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const FooterComponent = () => {
  return (
    <div className="w-full">
      {/* Newsletter Section - Đăng ký nhận bản tin */}
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

      {/* Main Footer Content - 4 Cột thông tin */}
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
      </div>

      {/* Copyright - Phần duy nhất còn lại ở cuối */}
      <div className="bg-[#4B2E2B] py-6 text-stone-300 text-xs text-center border-t border-white/10">
        <p>© {new Date().getFullYear()} Thiết kế và lập trình bởi <span className="text-white font-bold tracking-wider">NextCoffee Team</span></p>
      </div>
    </div>
  );
};

export default FooterComponent;