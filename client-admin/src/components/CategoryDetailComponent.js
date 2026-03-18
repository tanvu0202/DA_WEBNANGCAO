import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';
import 'animate.css'; 

const CategoryDetail = ({ item, updateCategories }) => {
  const { token } = useContext(MyContext);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');

  useEffect(() => {
    if (item) {
      setTxtID(item._id || '');
      setTxtName(item.name || '');
    }
  }, [item]);

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#1D4ED8',
    });
  };

  const clearInputs = () => {
    setTxtID('');
    setTxtName('');
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    if (txtName) {
      const cate = { name: txtName };
      apiPostCategory(cate);
    } else {
      showAlert('Error', 'Please input name', 'error');
    }
  };

  const apiPostCategory = (cate) => {
    const config = { headers: { 'x-access-token': token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        showAlert('Success', 'Category added successfully!', 'success');
        apiGetCategories();
        clearInputs(); 
      } else {
        showAlert('Error', 'Something went wrong!', 'error');
      }
    });
  };

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      updateCategories(result);
    });
  };

  const btnUpdateClick = (e) => {
    e.preventDefault();
    if (txtID && txtName) {
      const cate = { name: txtName };
      apiPutCategory(txtID, cate);
    } else {
      showAlert('Error', 'Please input id and name', 'error');
    }
  };

  const apiPutCategory = (id, cate) => {
    const config = { headers: { 'x-access-token': token } };
    axios.put(`/api/admin/categories/${id}`, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        showAlert('Success', 'Category updated successfully!', 'success');
        apiGetCategories();
        clearInputs(); 
      } else {
        showAlert('Error', 'Something went wrong!', 'error');
      }
    });
  };

  const btnDeleteClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3B82F6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed && txtID) {
        apiDeleteCategory(txtID);
      }
    });
  };

  const apiDeleteCategory = (id) => {
    const config = { headers: { 'x-access-token': token } };
    axios.delete(`/api/admin/categories/${id}`, config).then((res) => {
      const result = res.data;
      if (result) {
        showAlert('Success', 'Category deleted successfully!', 'success');
        apiGetCategories();
        clearInputs(); 
      } else {
        showAlert('Error', 'Something went wrong!', 'error');
      }
    });
  };

  return (
    <div className="w-full  h-96 bg-white text-gray-700 p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">Category Detail</h2>
      <form className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="category-id" className="text-gray-500">ID</label>
          <input
            id="category-id"
            type="text"
            disabled
            value={txtID}
            className="bg-gray-100 border border-gray-300 text-gray-500 p-2 rounded-md cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category-name" className="text-gray-500">Name</label>
          <input
            id="category-name"
            type="text"
            value={txtName}
            onChange={(e) => setTxtName(e.target.value)}
            className="bg-white text-gray-700 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex justify-end space-x-4 flex-wrap">
          <button
            className="bg-[#21499a] hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 mt-2"
            onClick={btnAddClick}
          >
            Add New
          </button>
          <button
            className="bg-[#3a8897] hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300 mt-2"
            onClick={btnUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-[#ce7539] hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 mt-2"
            onClick={btnDeleteClick}
          >
            Delete
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-300 mt-2"
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryDetail;
