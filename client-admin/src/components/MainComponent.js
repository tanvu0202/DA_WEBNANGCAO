import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
import { Desktop, Tablet } from '../responsive/responsive';
import IsTablet from './IsTablet/Index';

const Main = () => {
  const { token } = useContext(MyContext);

  if (token !== '') {
    return (
      <div className="">
        <Desktop >
        <Menu />
        <div className="flex-grow ml-60 p-10 bg-gray-100">
          <Routes>
            <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
            <Route path='/admin/home' element={<Home />} />
            <Route path='/admin/category' element={<Category />} />
            <Route path='/admin/product' element={<Product />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/customer' element={<Customer />} />
          </Routes>
        </div>
        </Desktop>
        <Tablet>
          <IsTablet />
        </Tablet>
      </div>
    );
  }
  
  return <div />;
};

export default Main;
