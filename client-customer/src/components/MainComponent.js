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
  // MainComponent.js
  render() {
    return (
      <div className="min-h-screen flex pt-[120px]">
        {/* 1. Thanh thông báo (Inform) đã được sửa fixed ở trên */}
        <Inform />

        {/* 2. Menu Header (Sticky hoặc Fixed) */}
        <header className="fixed top-[40px] left-0 right-0 z-[100] h-20 bg-white shadow-sm flex items-center">
          <Menu />
        </header>

        {/* 3. Khối nội dung chính */}
        <div> {/* 40px Inform + 80px Header = 120px */}
          
          {/* Sidebar Nav dọc bên trái */}
          <aside className="fixed left-0 top-[100px] bottom-0 w-55 bg-white border-r z-[90] hidden md:block">
            {/* Categories list */}
          </aside>

          {/* Toàn bộ nội dung trang bên phải Sidebar */}
          <main className="flex-grow md:ml-64 p-6">
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
            <FooterComponent />
          </main>
        </div>
      </div>
    );
  }
}
export default Main;