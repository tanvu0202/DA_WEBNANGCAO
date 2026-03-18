import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import ImageComponent from './ImageComponent';
import ProductSlider from './ProductSlider';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newProds, setNewProds] = useState([]);
  const [hotProds, setHotProds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    apiGetNewProducts();
    apiGetHotProducts();
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      setCategories(result);
      result.forEach(category => {
        apiGetProductsByCategory(category._id);
      });
    });
  };

  const apiGetNewProducts = () => {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      setNewProds(result);
    });
  };

  const apiGetHotProducts = () => {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      setHotProds(result);
    });
  };

  const apiGetProductsByCategory = (categoryId) => {
    axios.get(`/api/customer/products/category/${categoryId}`).then((res) => {
      const result = res.data;
      setCategoryProducts(prevState => ({
        ...prevState,
        [categoryId]: result
      }));
    });
  };

  const renderCategoryProducts = (categoryId, categoryName) => {
    const products = categoryProducts[categoryId] || [];
    if (products.length === 0) return null;
    return (
      <div key={categoryId} className="container-80 pt-16">
        <div className="border-b border-[ddd] pb-1 flex items-center justify-between">
          <h2 className='font-semibold text-xl text-primary uppercase'>{categoryName}</h2>
          <Link to={'/product/category/' + categoryId} className='text-sm font-semibold text-primary'>Xem thêm</Link>
        </div>
        <ProductSlider products={products} />
      </div>
    );
  };

  return (
    <div>
      <div className="container-80 pt-2">
        <div className="ml-[275px]">
          <CarouselComponent />
        </div>
        <div className="py-6">
          <ImageComponent />
        </div>
      </div>
      <div className="container-80 pt-4">
        <div id='newBook'>
          <div className="border-b border-[ddd] pb-1 flex items-center justify-between">
            <h2 className='font-semibold text-xl text-primary uppercase'>SÁCH MỚI</h2>
            <p className='text-sm font-semibold text-primary'>Sách mới - Nhiều khuyến mãi</p>
          </div>
          <ProductSlider products={newProds} />
        </div>
        {hotProds.length > 0 ? (
          <div className="container-80 pt-4">
            <div className="border-b border-[ddd] flex items-center pb-1 justify-between">
              <h2 className="text-center uppercase">NỔI BẬT</h2>
              <p className='text-sm font-semibold text-primary'>Sách HOT - Giảm Sốc</p>
            </div>
            <ProductSlider products={hotProds} />
          </div>
        ) : (
          <div />
        )}
        {categories.map(category =>
          renderCategoryProducts(category._id, category.name)
        )}
      </div>
    </div>
  );
};

export default Home;
