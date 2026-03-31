import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Menu from './MenuComponent';
import Inform from './InformComponent';
import FooterComponent from './FooterComponent';
import TawkMessenger from './TawkMessengerComponent';
import ScrollToTop from './ScrollToTop';

// Page Components
import Home from './HomeComponent/HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Introduction from './Introduction/Introduction';
import ContactComponent from './ContactComponent/ContactComponent';
import AllProduct from './AllProduct';

class Main extends Component {
  render() {
    return (
      /* body-customer: Đổi font chữ sang phong cách hiện đại và màu nền kem sữa cho toàn trang */
      <div className="body-customer font-sans bg-[#fffcf9] min-h-screen flex flex-col selection:bg-orange-200 selection:text-orange-900">
        
        {/* Thanh thông báo & Hotline (Đã sửa ở bước trước) */}
        <Inform />
        
        {/* Thanh điều hướng chính - Header */}
        <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
          <Menu />
        </header>

        {/* Khu vực nội dung chính */}
        <main className="flex-grow">
          {/* Tự động cuộn lên đầu khi chuyển trang */}
          <ScrollToTop />
          
          <div className="animate__animated animate__fadeIn">
            <Routes>
              <Route path='/' element={<Navigate replace to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/introduction' element={<Introduction />} />
              <Route path='/contact' element={<ContactComponent />} />
              <Route path='/products' element={<AllProduct />} />
              <Route path='/product/category/:cid' element={<Product />} />
              <Route path='/product/search/:keyword' element={<Product />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/active' element={<Active />} />
              <Route path='/login' element={<Login />} />
              <Route path='/myprofile' element={<Myprofile />} />
              <Route path='/mycart' element={<Mycart />} />
              <Route path='/myorders' element={<Myorders />} />
            </Routes>
          </div>
        </main>

        {/* Chân trang */}
        <footer className="mt-auto border-t border-stone-200 bg-[#2d1b0f] text-white">
          <FooterComponent />
        </footer>

        {/* Chat Widget */}
        <TawkMessenger />
      </div>
    );
  }
}

export default Main;