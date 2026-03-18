import React from 'react';
import { FaTags, FaBoxOpen, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'animate.css';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-full absolute top-0 left-0 z-0 bg-gray-200 opacity-50"></div>

      <div className="z-50 text-center bg-white rounded-lg py-4 px-36">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to the Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-10">
          Manage your application with ease and efficiency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            to="/admin/category"
            className="flex flex-col items-center p-6 bg-indigo-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__bounceIn"
          >
            <FaTags size={40} />
            <h2 className="text-xl font-bold mt-4">Manage Categories</h2>
            <p className="mt-2">Add, update, and delete categories.</p>
          </Link>

          <Link
            to="/admin/product"
            className="flex flex-col items-center p-6 bg-green-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__bounceIn"
          >
            <FaBoxOpen size={40} />
            <h2 className="text-xl font-bold mt-4">Manage Products</h2>
            <p className="mt-2">Control your product listings.</p>
          </Link>

          <Link
            to="/admin/order"
            className="flex flex-col items-center p-6 bg-orange-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__bounceIn"
          >
            <FaShoppingCart size={40} />
            <h2 className="text-xl font-bold mt-4">Manage Orders</h2>
            <p className="mt-2">View and update customer orders.</p>
          </Link>

          <Link
            to="/admin/customer"
            className="flex flex-col items-center p-6 bg-purple-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__bounceIn"
          >
            <FaUsers size={40} />
            <h2 className="text-xl font-bold mt-4">Manage Customers</h2>
            <p className="mt-2">View and manage customer profiles.</p>
          </Link>

          <Link
            to="/admin/analytics"
            className="flex flex-col items-center p-6 bg-blue-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__bounceIn"
          >
            <FaChartLine size={40} />
            <h2 className="text-xl font-bold mt-4">Analytics</h2>
            <p className="mt-2">Track your application performance.</p>
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-gray-500">
            <span className="text-xl font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">HBV - Admin</span> Dashboard. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
