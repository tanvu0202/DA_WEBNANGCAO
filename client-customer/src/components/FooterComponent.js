import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube, FaFlickr, FaGooglePlay, FaApple } from 'react-icons/fa';
import { SiNinja, SiSpeedlink, SiKerry } from 'react-icons/si'
import logo from '../asset/img/logo.jpg';

const FooterComponent = () => {
  return (
    <div className="">
      <div className="container-80 pt-20">
        <div className="bg-[#555555] text-white p-4 flex justify-evenly items-center">
          <div className="text-base font-semibold w-1/2">
            ĐĂNG KÝ NHẬN BẢN TIN
          </div>
          <form className="flex items-center w-1/3 h-14">
            <input
              type="email"
              placeholder="Email ..."
              className="p-2 text-accent placeholder:text-sm h-[3em]"
            />
            <button type="submit" className="bg-primary text-white p-2 w-1/2">
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>

      <div id="footer" className="bg-white text-accent container-80">
        <div className="container mx-auto flex flex-wrap justify-evenly">
          <div className="w-full md:w-1/4 p-4">
            <h3 className="font-bold text-primary mb-2">DỊCH VỤ</h3>
            <ul className='text-[14px]'>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Điều khoản sử dụng</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Chính sách bảo mật</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Giới thiệu Steamark</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Hệ thống trung tâm - nhà sách</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 p-4">
            <h3 className="font-bold text-primary mb-2">HỖ TRỢ</h3>
            <ul className='text-[14px]'>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Chính sách đổi - trả - hoàn tiền</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Chính sách khách sỉ</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Phương thức vận chuyển</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Phương thức thanh toán</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 p-4">
            <h3 className="font-bold text-primary mb-2">TÀI KHOẢN CỦA TÔI</h3>
            <ul className='text-[14px]'>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Đăng nhập / Tạo tài khoản mới</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Thay đổi địa chỉ nhận hàng</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Chi tiết tài khoản</li>
              <li className='tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>Lịch sử mua hàng</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 p-4">
            <h3 className="font-bold text-primary mb-2">LIÊN HỆ</h3>
            <ul className='text-[14px]'>
              <li className='flex items-center tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>
                <div className="w-8 h-8 border-2 border-accent leading-8 flex items-stretch justify-center pt-2 px-2">
                  <FaMapMarkerAlt  />  
                </div> 
                <p className='ml-2'>1073/23 Cách Mạng Tháng 8, P.7, Q.Tân Bình, TP.HCM</p>
              </li>
              <li className='flex items-center tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>
                <div className="w-8 h-8 border-2 border-accent leading-8 flex items-stretch justify-center pt-2">
                  <FaPhoneAlt />  
                </div>
                <p className='ml-2'>0981045632</p>
              </li>
              <li className='flex items-center tracking-wide border-b border-[#666666] py-2 transition-all duration-300 hover:text-[#F7941E] cursor-pointer'>
                <div className="w-8 h-8 border-2 border-accent leading-8 flex items-stretch justify-center pt-2">
                <FaEnvelope />  
                </div> <p className='ml-2'>info@themona.global</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex p-4 justify-between">
          <div div className="logo text-gray-700 text-[22px] font-bold">
            <div className="flex items-center h-[30px] gap-2">
              <img className="h-full w-12" src={logo} alt="Logo" />
              <div>
                <p className="tracking-wide">
                  HHK<span className="text-[#7f13c4]">.Store</span>
                </p>
              </div>
          </div>
            <div className="text-accent text-sm font-normal">
            <p className='py-3'>1073/23 Cách Mạng Tháng 8, P.7, Q.Tân Bình, TP.HCM</p>
            <p>HHK Store nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống HHK Store trên toàn quốc.</p>  
            </div>
          </div>
          <div className="container mx-auto flex flex-wrap justify-center items-center">
            <div className="flex gap-4 items-center justify-center">
              <FaFacebookF className="text-3xl mx-2 cursor-pointer hover:text-blue-600" />
              <FaInstagram className="text-3xl mx-2 cursor-pointer hover:text-pink-600" />
              <FaTwitter className="text-3xl mx-2 cursor-pointer hover:text-blue-400" />
              <FaPinterestP className="text-3xl mx-2 cursor-pointer hover:text-red-600" />
              <FaYoutube className="text-3xl mx-2 cursor-pointer hover:text-red-600" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/android.png" alt="Google Play" className="w-32" />
              <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/appstore.png" alt="App Store" className="w-32" />
            </div>
            
          </div>
          <div className="flex-col gap-4 items-center w-[50%] flex justify-end">
              <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/Ninja-1.png" alt="Ninja Van" className="w-[200px]" />
              <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/Speedlink-1.png" alt="Speedlink" className="w-[200px]" />
              <img src="http://steamark.monamedia.net/wp-content/uploads/2019/04/logo-Kerry-172x40.png" alt="Kerry Express" className="w-[200px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 bg-primary py-3 text-gray-400 text-sm">
        © Thiết kế và lập trình bởi <div className="flex items-center h-[18px] gap-1">
              <div className='text-white font-semibold'>
                <p className="tracking-wide">
                  HHK<span className="text-white">.Store</span>
                </p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default FooterComponent;
