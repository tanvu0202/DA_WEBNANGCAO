import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import Swal from 'sweetalert2';

const Product = () => {
  const { token } = useContext(MyContext);
  
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [noPages, setNoPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [itemSelected, setItemSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  // 1. Lấy danh sách Categories
  useEffect(() => {
    if (token) {
      const config = { headers: { 'x-access-token': token } };
      axios.get('/api/admin/categories', config)
        .then((res) => {
          setCategories(Array.isArray(res.data) ? res.data : []);
        })
        .catch(err => console.error("Lỗi lấy danh mục:", err));
    }
  }, [token]);

  // 2. Lấy danh sách Products
  useEffect(() => {
    if (token) {
      apiGetProducts(curPage, selectedCategory);
    }
  }, [curPage, selectedCategory, token]);

  const apiGetProducts = (page, categoryId) => {
    setIsLoading(true); // Bắt đầu load thì ẩn sản phẩm cũ
    const config = { headers: { 'x-access-token': token } };
    
    let url = `/api/admin/products?page=${page}&size=6`;
    if (categoryId) url += `&category=${categoryId}`;
    
    axios.get(url, config)
      .then((res) => {
        const result = res.data;
        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
          setNoPages(result.noPages || 0);
          setCurPage(result.curPage || 1);
        } else {
          setProducts([]);
        }
        setIsLoading(false); // Load xong
      })
      .catch((err) => {
        console.error("Lỗi API Product:", err);
        setProducts([]);
        setIsLoading(false);
        if (err.response?.status === 431) {
          Swal.fire('Lỗi 431', 'Vui lòng xóa Cache/Cookie và đăng nhập lại!', 'error');
        }
      });
  };

  const handlePageClick = (index) => {
    setCurPage(index);
  };

  const handleItemClick = (item) => {
    setItemSelected(item);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurPage(1); 
  };

  const handleSuccess = () => {
    apiGetProducts(curPage, selectedCategory);
    setItemSelected(null);
    Swal.fire({
      title: 'Thành công',
      text: 'Dữ liệu đã được cập nhật!',
      icon: 'success',
      confirmButtonColor: '#8d6e63',
    });
  };

  const handleDelete = (id) => {
    const config = { headers: { 'x-access-token': token } };
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này sẽ xóa vĩnh viễn sản phẩm!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c62828',
      cancelButtonColor: '#a1887f',
      confirmButtonText: 'Đồng ý xóa',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/products/${id}`, config).then(() => {
          handleSuccess();
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-[#fafafa] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#3e2723] flex items-center gap-2">
        <span className="w-2 h-8 bg-[#8d6e63] rounded-full"></span>
        Product Management
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 flex flex-col">
          
          <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#efebe9]">
            <label className="text-sm font-bold text-[#5d4037] whitespace-nowrap">LỌC THEO LOẠI:</label>
            <select 
              className="flex-grow bg-[#fcfaf9] border border-[#d7ccc8] text-[#5d4037] text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#8d6e63]"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#efebe9] overflow-hidden min-h-[400px] relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#5d4037] text-[#d7ccc8]">
                  <tr>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider">Sản phẩm</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Giá</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Danh mục</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efebe9] text-[#5d4037]">
                  {isLoading ? (
                    // Hiển thị trạng thái Loading khi đang gọi API
                    <tr>
                      <td colSpan="4" className="py-24 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8d6e63] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        <p className="mt-4 text-[#8d6e63] font-bold animate-pulse">Đang tải dữ liệu...</p>
                      </td>
                    </tr>
                  ) : (
                    Array.isArray(products) && products.length > 0 ? (
                      products.map((item) => (
                        <tr
                          key={item._id}
                          className={`hover:bg-[#fdfaf9] cursor-pointer transition-colors duration-150 ${
                            itemSelected?._id === item._id ? "bg-[#efebe9] border-l-4 border-[#8d6e63]" : ""
                          }`}
                          onClick={() => handleItemClick(item)}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={`data:image/jpg;base64,${item.image}`}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-xl shadow-sm border border-[#efebe9]"
                              />
                              <div>
                                <p className="font-bold text-sm leading-tight mb-1">{item.name}</p>
                                <p className="text-[10px] font-mono text-[#a1887f] uppercase">{item._id.substring(18)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-bold text-sm text-[#8d6e63]">{item.price?.toLocaleString()} ₫</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#efebe9] text-[#5d4037] text-[11px] font-bold">
                              {item.category?.name}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                             <p className="text-[11px] text-[#a1887f]">{new Date(item.cdate).toLocaleDateString()}</p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-20 text-center text-stone-400 italic">
                          Không tìm thấy sản phẩm nào phù hợp...
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {noPages > 0 && !isLoading && (
              <div className="p-4 bg-[#fcfaf9] border-t border-[#efebe9] flex justify-center items-center gap-2">
                {Array.from({ length: noPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`min-w-[40px] h-10 rounded-xl font-bold transition-all duration-300 shadow-sm ${
                      curPage === index + 1
                        ? 'bg-[#5d4037] text-white scale-110'
                        : 'bg-white text-[#8d6e63] border border-[#d7ccc8] hover:bg-[#efebe9]'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-6">
            <ProductDetail
              item={itemSelected}
              curPage={curPage}
              onSuccess={handleSuccess} 
              onDelete={handleDelete}  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;