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
  }, [apiGetCategories]);

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
      setNewProds(res.data);
    });
  };

  const apiGetHotProducts = () => {
    axios.get('/api/customer/products/hot').then((res) => {
      setHotProds(res.data);
    });
  };

  const apiGetProductsByCategory = (categoryId) => {
    axios.get(`/api/customer/products/category/${categoryId}`).then((res) => {
      setCategoryProducts(prevState => ({
        ...prevState,
        [categoryId]: res.data
      }));
    });
  };

  const SectionHeader = ({ title, subTitle, link }) => (
    <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2 mb-6">
      <div>
        <h2 className='font-bold text-2xl text-[#442c1e] uppercase tracking-tight'>{title}</h2>
        <p className='text-xs text-[#8c7851] font-medium uppercase tracking-widest'>{subTitle}</p>
      </div>
      {link && (
        <Link to={link} className='text-sm font-bold text-[#92400e] hover:underline transition-all'>
          XEM TẤT CẢ
        </Link>
      )}
    </div>
  );

  return (
    <div className="bg-[#fffcf9] min-h-screen pb-20">
      {/* SECTION BANNER: Đã bỏ ml-[275px] để hình tràn hết độ dài khung */}
      <div className="w-full">
        <div className="container-80 pt-4">
          <div className="full-drop-banner overflow-hidden rounded-xl shadow-md">
            <CarouselComponent />
          </div>
          
          <div className="py-10 full-drop-image">
            <ImageComponent />
          </div>
        </div>
      </div>

      <div className="container-80">
        {/* NEW PRODUCTS */}
        <div id='newCoffee' className="pt-4">
          <SectionHeader title="Hương vị mới" subTitle="Coffee mới - Nhiều khuyến mãi" />
          <div className="product-slider-wrapper">
            <ProductSlider products={newProds} />
          </div>
        </div>

        {/* HOT PRODUCTS */}
        {hotProds.length > 0 && (
          <div className="pt-16">
            <div className="bg-[#2d1b0f] p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-stone-800">
               <div className="flex items-center justify-between border-b border-stone-700 pb-4 mb-8">
                <h2 className="text-stone-100 font-bold text-2xl uppercase tracking-wide">Sản phẩm nổi bật</h2>
                <p className='text-sm font-semibold text-orange-500 italic'>HOT SELLER</p>
              </div>
              <ProductSlider products={hotProds} />
            </div>
          </div>
        )}

        {/* DYNAMIC CATEGORIES */}
        <div className="mt-12 space-y-16">
          {categories.map(category => {
             const products = categoryProducts[category._id] || [];
             if (products.length === 0) return null;
             return (
               <div key={category._id} className="pt-4">
                 <SectionHeader 
                    title={category.name} 
                    subTitle="Thực đơn quán" 
                    link={'/product/category/' + category._id} 
                  />
                 <ProductSlider products={products} />
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;