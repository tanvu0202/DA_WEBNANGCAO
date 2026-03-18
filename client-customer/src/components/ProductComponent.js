import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import withRouter from '../utils/withRouter';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Số sản phẩm mỗi trang
  const params = useParams();

  useEffect(() => {
    if (params.cid) {
      apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      apiGetProductsByKeyword(params.keyword);
    }
  }, [params]);

  const apiGetProductsByCatID = (cid) => {
    axios.get(`/api/customer/products/category/${cid}`).then((res) => {
      const result = res.data;
      setProducts(result || []);
    }).catch(error => {
      console.error("There was an error fetching the products!", error);
      setProducts([]);
    });
  };

  const apiGetProductsByKeyword = (keyword) => {
    axios.get(`/api/customer/products/search/${keyword}`).then((res) => {
      const result = res.data;
      setProducts(result || []);
    }).catch(error => {
      console.error("There was an error fetching the products!", error);
      setProducts([]);
    });
  };

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage} className={i === currentPage ? "text-white bg-primary w-8 h-8 rounded-full mr-4" : "mr-4"}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const prods = currentProducts.map((item) => (
    <div key={item._id} className="p-2">
            <figure>
              <Link to={'/product/' + item._id}>
                <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
              </Link>
              <figcaption className="text-center">
                <p className='text-[#4e4e4e] capitalize text-sm truncate'>{item.name}</p>
                <p className='text-black font-medium mt-1'>{item.price.toLocaleString()} ₫</p>
              </figcaption>
            </figure>
    </div>
  ));

  return (
    <div className="container-80">
      <h2 className="text-center py-10 text-secondary text-2xl font-semibold">Danh sách sản phẩm</h2>
      {prods.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {prods}
        </div>
      ) : <p>Không tìm thấy sản phẩm cần tìm.</p>}
      <div className="pagination text-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default withRouter(Product);
