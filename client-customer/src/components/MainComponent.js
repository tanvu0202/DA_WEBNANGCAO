import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Menu from './MenuComponent';
import Inform from './InformComponent';
import FooterComponent from './FooterComponent';

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
      // 1. Thêm overflow-x-hidden để triệt tiêu thanh cuộn ngang vĩnh viễn
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        
        {/* Thanh thông báo fixed phía trên cùng */}
        <Inform />

        {/* Menu Header Fixed */}
        <header className="fixed top-[40px] left-0 right-0 z-[100] h-20 bg-white shadow-sm flex items-center">
          <Menu />
        </header>

        {/* 2. Container chính: Sử dụng flex-row để chia Sidebar và Main content */}
        <div className="flex flex-row pt-[120px] w-full"> 
          
          {/* Sidebar Nav dọc bên trái (Width cố định: 256px ~ ml-64) */}
          <aside className="fixed left-0 top-[120px] bottom-0 w-55 bg-white border-r z-[90] hidden md:block overflow-y-auto">
            {/* Categories list bác đặt ở đây */}
          </aside>

          {/* 3. Toàn bộ nội dung trang bên phải Sidebar */}
          {/* Cực kỳ quan trọng: w-full kết hợp md:pl-64 để nội dung không bị tràn */}
          <main className="bg-[#fffcf9] flex-grow w-full md:pl-64 p-6 flex flex-col">
            <div className="flex-grow px-4">
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
            
            {/* Footer nằm trong main để canh lề theo content */}
            <FooterComponent />
          </main>
        </div>
      </div>
    );
  }
}

export default Main;