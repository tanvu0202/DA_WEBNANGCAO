import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
import Analytics from './AnalyticsComponent';
import Coupon from './CouponComponent';

const Main = () => {
  const { token } = useContext(MyContext);

  if (token !== '') {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#fdfaf7]"> {/* Đổi nền cho đồng bộ Next Coffee */}
        {/* Menu SideBar */}
        <Menu />

        {/* Nội dung chính (Content Area) */}
        <div className="flex-grow transition-all duration-300 
                        md:ml-64 ml-0 
                        p-4 md:p-10"> 
          {/* Giải thích cho bác:
             - md:ml-64: Trên máy tính lùi vào 64 đơn vị để nhường chỗ cho Menu.
             - ml-0: Trên điện thoại thì sát lề trái luôn (vì menu đã ẩn hoặc đè lên trên rồi).
             - p-4 md:p-10: Trên mobile padding ít thôi cho rộng chỗ, máy tính thì padding thoải mái.
          */}
          
          <div className="bg-white min-h-[85vh] rounded-2xl shadow-sm p-6 border border-orange-50/50">
            <Routes>
              <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
              <Route path='/admin/home' element={<Home />} />
              <Route path='/admin/category' element={<Category />} />
              <Route path='/admin/product' element={<Product />} />
              <Route path='/admin/coupon' element={<Coupon />} />
              <Route path='/admin/order' element={<Order />} />
              <Route path='/admin/customer' element={<Customer />} />
              <Route path='/admin/analytics' element={<Analytics />} />
              <Route path='/admin/analytics' element={<Analytics />} />
            </Routes>
          </div>

          <footer className="mt-8 text-center text-gray-400 text-sm">
            Next Coffee Admin Panel v1.0 • Hoạt động tốt trên mọi thiết bị
          </footer>
        </div>
      </div>
    );
  }
  
  return <div />;
};

export default Main;