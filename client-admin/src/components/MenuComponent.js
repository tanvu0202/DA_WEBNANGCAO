import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTags, FaCoffee, FaReceipt, FaUserFriends, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import MyContext from "../contexts/MyContext";

const Menu = () => {
  const { username, setToken, setUsername } = useContext(MyContext);
  const { pathname } = useLocation();
  
  // State để quản lý đóng mở menu trên mobile
  const [isOpen, setIsOpen] = useState(false);

  // Mỗi khi chuyển trang (pathname thay đổi), tự động đóng menu trên mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const lnkLogoutClick = () => {
    setToken("");
    setUsername("");
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* 1. Nút bấm mở Menu (Chỉ hiện trên Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] bg-[#3e2723] text-white p-2 rounded-lg shadow-lg"
      >
        <FaBars size={20} />
      </button>

      {/* 2. Lớp nền mờ (Overlay) khi mở menu trên mobile - Bấm vào đây để đóng */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. Thanh Nav chính */}
      <nav className={`
        min-h-screen w-64 bg-[#3e2723] text-white shadow-2xl fixed top-0 z-[58] flex flex-col border-r border-[#5d4037]
        transition-all duration-300 ease-in-out
        ${isOpen ? "left-0" : "-left-full"} 
        md:left-0 
      `}>
        
        {/* Nút đóng (Chỉ hiện trên Mobile) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-[#a1887f]"
        >
          <FaTimes size={24} />
        </button>

        {/* Header Panel */}
        <div className="text-2xl font-bold mb-6 self-center text-center w-full text-[#d7ccc8] p-4 pb-0 mt-8 tracking-wide font-serif">
          NEXT COFFEE
          <div className="text-[10px] font-sans font-light tracking-[0.2em] text-[#a1887f]">ADMIN SYSTEM</div>
        </div>
        
        <div className="border-b border-[#5d4037] mx-4 my-4"></div>

        <div className="flex-grow flex flex-col items-start p-4 space-y-2">
          {/* Menu Links */}
          {[
            { path: "/admin/home", icon: <FaHome />, label: "Trang chủ" },
            { path: "/admin/category", icon: <FaTags />, label: "Danh mục" },
            { path: "/admin/product", icon: <FaCoffee />, label: "Sản phẩm" },
            { path: "/admin/order", icon: <FaReceipt />, label: "Đơn hàng" },
            { path: "/admin/customer", icon: <FaUserFriends />, label: "Khách hàng" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
                isActive(item.path) 
                  ? "bg-[#6F4E37] shadow-md translate-x-2" 
                  : "hover:bg-[#5d4037] text-[#bcaaa4] hover:text-white"
              }`}
            >
              <span className={`text-lg ${isActive(item.path) ? "text-[#fff]" : "text-[#a1887f]"}`}>
                {item.icon}
              </span>
              <span className={`font-medium ${isActive(item.path) ? "text-white" : ""}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Logout Section */}
        <div className="mt-auto w-full pb-8 px-4">
          <div className="border-t border-[#5d4037] mb-4"></div>
          <div className="flex flex-col space-y-4">
            <div className="px-2 bg-[#2d1b18] py-3 rounded-lg border border-[#5d4037]">
              <p className="text-[#a1887f] text-xs uppercase tracking-tighter">Đang đăng nhập:</p>
              <p className="text-[#d7ccc8] font-semibold truncate">{username || "Admin"}</p>
            </div>
            
            <Link
              to="/admin/home"
              onClick={lnkLogoutClick}
              className="flex items-center justify-center space-x-2 bg-[#c62828] hover:bg-[#b71c1c] text-white transition-all px-4 py-3 rounded-xl shadow-lg"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-bold">Đăng xuất</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;