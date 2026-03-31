import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import Swal from 'sweetalert2';

const Product = () => {
  const { token } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [noPages, setNoPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    apiGetProducts(curPage);
  }, [curPage]);

  const apiGetProducts = (page) => {
    const config = { headers: { 'x-access-token': token } };
    axios.get(`/api/admin/products?page=${page}`, config).then((res) => {
      const result = res.data;
      setProducts(result.products);
      setNoPages(result.noPages);
      setCurPage(result.curPage);
    });
  };

  const handlePageClick = (index) => {
    setCurPage(index);
  };

  const handleItemClick = (item) => {
    setItemSelected(item);
  };

  const handleSuccess = () => {
    apiGetProducts(curPage);
    setItemSelected(null);
    Swal.fire({
      title: 'Success',
      text: 'Operation completed successfully!',
      icon: 'success',
      confirmButtonColor: '#8d6e63',
    });
  };

  const handleDelete = (id) => {
    const config = { headers: { 'x-access-token': token } };
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c62828',
      cancelButtonColor: '#a1887f',
      confirmButtonText: 'Yes, delete it!',
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
      <h2 className="text-3xl font-bold mb-8 text-[#3e2723] flex items-center justify-center gap-3">
        <span className="h-1 w-12 bg-[#8d6e63] rounded-full"></span>
        PRODUCT MANAGEMENT
        <span className="h-1 w-12 bg-[#8d6e63] rounded-full"></span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Product List Table */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-[#efebe9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#5d4037] text-[#d7ccc8]">
                  <tr>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider">Product</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Price</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Category</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-center">Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efebe9] text-[#5d4037]">
                  {products.map((item) => (
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
                            <p className="text-[10px] font-mono text-[#a1887f] uppercase">{item._id.substring(0, 10)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-sm text-[#8d6e63]">{item.price.toLocaleString()}</span>
                        <span className="text-[10px] ml-1 text-[#a1887f]">VND</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#efebe9] text-[#5d4037] text-[11px] font-bold">
                          {item.category.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                         <p className="text-[11px] text-[#a1887f]">{new Date(item.cdate).toLocaleDateString()}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
          </div>
        </div>

        {/* Right Side: Detail Component */}
        <div className="lg:w-1/3 animate__animated animate__fadeInRight">
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