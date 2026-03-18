import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent/HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import TawkMessenger from './TawkMessengerComponent';
import FooterComponent from './FooterComponent';
import ScrollToTop from './ScrollToTop';
import Introduction from './Introduction/Introduction';
import ContactComponent from './ContactComponent/ContactComponent';
import AllProduct from './AllProduct';
class Main extends Component {
  render() {
    return (
        <div className="body-customer">
        <ScrollToTop />
        <Inform />
        <Menu />
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
        <TawkMessenger />
      </div>
    );
  }
}
export default Main;