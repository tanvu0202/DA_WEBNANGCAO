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

  // Cập nhật màu sắc cho SweetAlert2 để đồng bộ tone nâu
  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#8d6e63', // Màu nâu trung tính
      background: '#fff',
      color: '#3e2723'
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
      confirmButtonColor: '#c62828', // Màu đỏ sậm cho nút xóa
      cancelButtonColor: '#a1887f',
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
    <div className="w-full bg-white text-[#3e2723] p-8 rounded-2xl shadow-sm border border-[#efebe9]">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-px bg-[#efebe9] flex-grow"></div>
        <h2 className="text-2xl font-bold text-[#5d4037] uppercase tracking-wider">Detail</h2>
        <div className="h-px bg-[#efebe9] flex-grow"></div>
      </div>

      <form className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="category-id" className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">Category ID</label>
          <input
            id="category-id"
            type="text"
            disabled
            value={txtID}
            className="bg-[#fafafa] border border-[#efebe9] text-[#a1887f] p-3 rounded-xl cursor-not-allowed font-mono text-sm shadow-inner"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category-name" className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">Category Name</label>
          <input
            id="category-name"
            type="text"
            placeholder="Enter category name..."
            value={txtName}
            onChange={(e) => setTxtName(e.target.value)}
            className="bg-white text-[#3e2723] border border-[#d7ccc8] p-3 rounded-xl focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent focus:outline-none transition-all duration-200 placeholder-[#d7ccc8]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            className="bg-[#5d4037] hover:bg-[#3e2723] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md active:scale-95"
            onClick={btnAddClick}
          >
            ADD NEW
          </button>
          <button
            className="bg-[#8d6e63] hover:bg-[#6d4c41] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50"
            onClick={btnUpdateClick}
            disabled={!txtID}
          >
            UPDATE
          </button>
          <button
            className="bg-[#d7ccc8] hover:bg-[#bcaaa4] text-[#5d4037] font-bold py-3 rounded-xl transition-all duration-300 active:scale-95"
            onClick={clearInputs}
          >
            CLEAR
          </button>
          <button
            className="border-2 border-[#ff8a65] text-[#c62828] hover:bg-[#ff8a65] hover:text-white font-bold py-3 rounded-xl transition-all duration-300 active:scale-95"
            onClick={btnDeleteClick}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryDetail;