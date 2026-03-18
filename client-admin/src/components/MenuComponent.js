import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTags, FaBoxOpen, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";
import MyContext from "../contexts/MyContext";

const Menu = () => {
  const { username, setToken, setUsername } = useContext(MyContext);
  const location = useLocation(); // Get current URL path to highlight the active link

  const lnkLogoutClick = () => {
    setToken("");
    setUsername("");
  };

  // Define a function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="min-h-screen w-60 bg-[#0e1d39] text-white shadow-lg fixed top-0 left-0 z-50 flex flex-col">
        <div className="text-2xl font-bold mb-6 self-center text-center w-full text-gray-200 p-4 pb-0 mt-5">
         <span className="text-4xl tracking-widest font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">HBV</span>
        <br /> Admin Panel
        </div>
        <div className="border-b border-gray-600 my-4"></div>
      <div className="flex-grow flex flex-col items-start p-4 space-y-4">
        {/* Menu Links */}

        <Link
          to="/admin/home"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
            isActive("/admin/home") ? "bg-[#cccccc58]" : "hover:bg-gray-700"
          }`}
        >
          <FaHome className="text-lg" />
          <span className={`font-medium ${isActive("/admin/home") ? "text-white" : "text-gray-400"}`}>
            Home
          </span>
        </Link>

        <Link
          to="/admin/category"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
            isActive("/admin/category") ? "bg-[#cccccc58]" : "hover:bg-gray-700"
          }`}
        >
          <FaTags className="text-lg" />
          <span className={`font-medium ${isActive("/admin/category") ? "text-white" : "text-gray-400"}`}>
            Category
          </span>
        </Link>

        <Link
          to="/admin/product"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
            isActive("/admin/product") ? "bg-[#cccccc58]" : "hover:bg-gray-700"
          }`}
        >
          <FaBoxOpen className="text-lg" />
          <span className={`font-medium ${isActive("/admin/product") ? "text-white" : "text-gray-400"}`}>
            Product
          </span>
        </Link>

        <Link
          to="/admin/order"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
            isActive("/admin/order") ? "bg-[#cccccc58]" : "hover:bg-gray-700"
          }`}
        >
          <FaShoppingCart className="text-lg" />
          <span className={`font-medium ${isActive("/admin/order") ? "text-white" : "text-gray-400"}`}>
            Order
          </span>
        </Link>

        <Link
          to="/admin/customer"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full transition-all duration-300 ${
            isActive("/admin/customer") ? "bg-[#cccccc58]" : "hover:bg-gray-700"
          }`}
        >
          <FaUsers className="text-lg" />
          <span className={`font-medium ${isActive("/admin/customer") ? "text-white" : "text-gray-400"}`}>
            Customer
          </span>
        </Link>

      </div>

      {/* Logout */}
      <div className="mt-auto w-full pb-5">
        <div className="border-t border-gray-600 my-4"></div>
        <div className="flex-col items-center space-y-2 cursor-pointer w-full px-3 py-2">
          <span className="text-gray-400 px-3 py-2">Hello, <b>{username}</b></span>
          <Link
            to="/admin/home"
            onClick={lnkLogoutClick}
            className="flex items-center space-x-2 text-red-400 hover:text-red-500 transition-all hover:bg-gray-700 px-3 py-2 rounded-lg"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
