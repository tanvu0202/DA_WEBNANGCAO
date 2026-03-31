import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTags, FaBoxOpen, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";
import MyContext from "../contexts/MyContext";

const Menu = () => {
  const { username, setToken, setUsername } = useContext(MyContext);
  const location = useLocation();

  const lnkLogoutClick = () => {
    setToken("");
    setUsername("");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="min-h-screen w-60 bg-[#3e2723] text-white shadow-2xl fixed top-0 left-0 z-50 flex flex-col border-r border-[#5d4037]">
        {/* Header Panel */}
        <div className="text-2xl font-bold mb-6 self-center text-center w-full text-[#d7ccc8] p-4 pb-0 mt-5 tracking-wide">
          ADMIN PANEL
        </div>
        
        <div className="border-b border-[#5d4037] mx-4 my-4"></div>

      <div className="flex-grow flex flex-col items-start p-4 space-y-2">
        {/* Menu Links */}
        {[
          { path: "/admin/home", icon: <FaHome />, label: "Home" },
          { path: "/admin/category", icon: <FaTags />, label: "Category" },
          { path: "/admin/product", icon: <FaBoxOpen />, label: "Product" },
          { path: "/admin/order", icon: <FaShoppingCart />, label: "Order" },
          { path: "/admin/customer", icon: <FaUsers />, label: "Customer" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all duration-300 ${
              isActive(item.path) 
                ? "bg-[#8d6e63] shadow-md scale-105" 
                : "hover:bg-[#5d4037] text-[#bcaaa4]"
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
      <div className="mt-auto w-full pb-6 px-4">
        <div className="border-t border-[#5d4037] mb-4"></div>
        <div className="flex flex-col space-y-3">
          <div className="px-2">
            <p className="text-[#a1887f] text-sm">Welcome back,</p>
            <p className="text-[#d7ccc8] font-semibold truncate">{username}</p>
          </div>
          
          <Link
            to="/admin/home"
            onClick={lnkLogoutClick}
            className="flex items-center space-x-3 text-[#ff8a65] hover:text-white hover:bg-[#c62828] transition-all px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-bold">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Menu;