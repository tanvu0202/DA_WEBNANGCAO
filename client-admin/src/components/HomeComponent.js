import React, { useEffect } from 'react';
import { FaTags, FaCoffee, FaReceipt, FaUserFriends, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'animate.css';

const Home = () => {
  // Cập nhật tiêu đề trang cho đồng bộ
  useEffect(() => {
    document.title = "Next Coffee - Bảng điều khiển";
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#fdfaf7]">
      {/* Lớp nền mờ ảo tạo chiều sâu */}
      <div className="w-full h-full absolute top-0 left-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30"></div>

      <div className="z-10 text-center bg-white rounded-2xl shadow-xl py-12 px-8 md:px-24 max-w-6xl w-full border border-orange-100">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d2b1f] mb-4 uppercase tracking-tight">
          Next Coffee Dashboard
        </h1>
        <p className="text-lg text-[#6F4E37] mb-12 italic">
          Chào mừng bạn trở lại! Hôm nay cửa hàng mình có gì mới không ạ?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quản lý danh mục */}
          <Link
            to="/admin/category"
            className="flex flex-col items-center p-8 bg-[#8B5A2B] text-white rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeIn animate__faster"
          >
            <FaTags size={44} className="mb-4" />
            <h2 className="text-xl font-bold">Danh mục Thực đơn</h2>
            <p className="mt-2 text-sm text-orange-100 text-center">Phân loại Cà phê, Trà, Bánh ngọt...</p>
          </Link>

          {/* Quản lý sản phẩm */}
          <Link
            to="/admin/product"
            className="flex flex-col items-center p-8 bg-[#6F4E37] text-white rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeIn animate__faster"
          >
            <FaCoffee size={44} className="mb-4" />
            <h2 className="text-xl font-bold">Quản lý Sản phẩm</h2>
            <p className="mt-2 text-sm text-orange-100 text-center">Cập nhật giá, hình ảnh và mô tả món.</p>
          </Link>

          {/* Quản lý đơn hàng */}
          <Link
            to="/admin/order"
            className="flex flex-col items-center p-8 bg-[#A67B5B] text-white rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeIn animate__faster"
          >
            <FaReceipt size={44} className="mb-4" />
            <h2 className="text-xl font-bold">Hóa đơn & Đơn hàng</h2>
            <p className="mt-2 text-sm text-orange-100 text-center">Theo dõi các đơn hàng đang phục vụ.</p>
          </Link>

          {/* Quản lý khách hàng */}
          <Link
            to="/admin/customer"
            className="flex flex-col items-center p-8 bg-[#C19A6B] text-white rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeIn animate__faster"
          >
            <FaUserFriends size={44} className="mb-4" />
            <h2 className="text-xl font-bold">Khách hàng thân thiết</h2>
            <p className="mt-2 text-sm text-orange-100 text-center">Quản lý thông tin thành viên Next Coffee.</p>
          </Link>

          {/* Phân tích báo cáo */}
          <Link
            to="/admin/analytics"
            className="flex flex-col items-center p-8 bg-[#4B3621] text-white rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeIn animate__faster"
          >
            <FaChartBar size={44} className="mb-4" />
            <h2 className="text-xl font-bold">Doanh thu & Thống kê</h2>
            <p className="mt-2 text-sm text-orange-100 text-center">Xem hiệu quả kinh doanh của quán.</p>
          </Link>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8">
          <p className="text-[#8B5A2B] font-medium flex items-center justify-center">
            Hệ thống quản trị 
            <span className="mx-2 px-3 py-1 bg-[#6F4E37] text-white rounded-full text-sm font-bold">
              Next Coffee
            </span> 
            - Luôn sẵn sàng phục vụ bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;