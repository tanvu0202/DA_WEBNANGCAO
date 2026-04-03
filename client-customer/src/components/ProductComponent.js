import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); 
  const params = useParams();

  useEffect(() => {
    // Reset về trang 1 khi đổi danh mục hoặc từ khóa tìm kiếm
    setCurrentPage(1);
    if (params.cid) {
      apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      apiGetProductsByKeyword(params.keyword);
    }
  }, [params]);

  const apiGetProductsByCatID = (cid) => {
    axios.get(`/api/customer/products/category/${cid}`).then((res) => {
      setProducts(res.data || []);
    }).catch(error => {
      console.error("Lỗi khi tải sản phẩm!", error);
      setProducts([]);
    });
  };

  const apiGetProductsByKeyword = (keyword) => {
    axios.get(`/api/customer/products/search/${keyword}`).then((res) => {
      setProducts(res.data || []);
    }).catch(error => {
      console.error("Lỗi khi tìm kiếm!", error);
      setProducts([]);
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)} 
          className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${
            i === currentPage 
            ? "bg-[#442c1e] text-white shadow-lg scale-110" 
            : "text-stone-400 hover:text-[#442c1e] hover:bg-stone-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const prods = currentProducts.map((item) => (
    <div key={item._id} className="group animate__animated animate__fadeIn">
      <Link to={'/product/' + item._id} className="block bg-white rounded-[2rem] p-4 shadow-sm border border-stone-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Hình ảnh sản phẩm */}
        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-stone-50">
          <img 
            src={"data:image/jpg;base64," + item.image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={item.name} 
          />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-orange-700">
            NEXT COFFEE
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="mt-5 text-center px-2">
          <h3 className="text-[#2d1b0f] font-serif font-bold text-base line-clamp-1 group-hover:text-orange-700 transition-colors capitalize">
            {item.name}
          </h3>
          <p className="text-stone-400 text-[11px] uppercase tracking-widest mt-1">Barista's Choice</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-lg font-bold text-[#442c1e]">
              {item.price.toLocaleString()} <span className="text-xs">₫</span>
            </span>
          </div>
          
          <button className="mt-4 w-full py-2.5 rounded-xl border border-stone-100 text-[#442c1e] font-bold text-xs uppercase tracking-tighter transition-all group-hover:bg-[#442c1e] group-hover:text-white">
            Xem chi tiết
          </button>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="bg-[#fffcf9] min-h-screen pb-20">
      <div className="container-80">
        {/* Tiêu đề danh mục */}
        <div className="py-16 text-center">
          <p className="text-orange-600 font-bold text-xs uppercase tracking-[0.3em] mb-2 italic">Discovery</p>
          <h2 className="text-4xl font-serif font-bold text-[#2d1b0f] relative inline-block">
            {params.keyword ? `Kết quả cho: "${params.keyword}"` : "Thực Đơn Của Chúng Tôi"}
            <div className="w-12 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
          </h2>
        </div>

        {/* Lưới sản phẩm */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {prods}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-stone-300 mb-4 flex justify-center">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            </div>
            <p className="text-stone-400 italic">Rất tiếc, Next Coffee chưa tìm thấy sản phẩm phù hợp...</p>
          </div>
        )}

        {/* Hệ thống phân trang */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-20">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-stone-200 text-stone-400 hover:bg-white hover:text-orange-600 disabled:opacity-0 transition-all shadow-sm"
            >
              <FaArrowLeft />
            </button>
            
            <div className="flex gap-2">
              {renderPagination()}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-stone-200 text-stone-400 hover:bg-white hover:text-orange-600 disabled:opacity-0 transition-all shadow-sm"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Product);