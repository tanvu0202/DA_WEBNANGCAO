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

  // This function will be passed to ProductDetail as onSuccess
  const handleSuccess = () => {
    apiGetProducts(curPage); // Refresh the product list
    setItemSelected(null); // Reset selection
    Swal.fire({
      title: 'Success',
      text: 'Operation completed successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleDelete = (id) => {
    const config = { headers: { 'x-access-token': token } };
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3B82F6',
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
    <div className="container mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Product List</h2>
      <div className="flex-col">
        {/* Product List */}
        <div className="w-full pr-4">
          <table className="min-w-full table-auto bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Creation Date</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Image</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <td className="py-3 px-6">{item._id}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.price.toLocaleString()} VND</td>
                  <td className="py-3 px-6">{new Date(item.cdate).toLocaleDateString()}</td>
                  <td className="py-3 px-6">{item.category.name}</td>
                  <td className="py-3 px-6">
                    <img
                      src={`data:image/jpg;base64,${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: noPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md ${
                  curPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Product Detail */}
        <div className="w-full pl-4">
          <ProductDetail
            item={itemSelected}
            curPage={curPage}
            onSuccess={handleSuccess} 
            onDelete={handleDelete}  
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
