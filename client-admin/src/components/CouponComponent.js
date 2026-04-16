import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { FaPlus, FaTrashAlt, FaTicketAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CouponComponent = () => {
  const { token } = useContext(MyContext);
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({ code: '', percent: 0 });

  useEffect(() => {
    apiGetCoupons();
  }, []);

  const apiGetCoupons = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/coupons', config).then((res) => {
      setCoupons(res.data);
    });
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    if (!formData.code || formData.percent <= 0) {
      Swal.fire('Lỗi', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    const config = { headers: { 'x-access-token': token } };
    axios.post('/api/admin/coupons', formData, config).then((res) => {
      if (res.data) {
        Swal.fire('Thành công', 'Đã thêm mã giảm giá mới', 'success');
        setFormData({ code: '', percent: 0 });
        apiGetCoupons();
      }
    });
  };

  const btnDeleteClick = (id) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c62828',
      confirmButtonText: 'Xóa ngay'
    }).then((result) => {
      if (result.isConfirmed) {
        const config = { headers: { 'x-access-token': token } };
        axios.delete(`/api/admin/coupons/${id}`, config).then((res) => {
          apiGetCoupons();
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#3e2723] mb-6 flex items-center gap-2">
        <FaTicketAlt /> Quản lý Mã giảm giá
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM THÊM MỚI */}
        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
          <h3 className="font-bold text-[#5d4037] mb-4">Thêm mã mới</h3>
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Mã Code</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-stone-200 mt-1 focus:ring-2 focus:ring-orange-200 outline-none"
                placeholder="Ví dụ: GIAM20"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">% Giảm giá</label>
              <input 
                type="number" 
                className="w-full p-3 rounded-xl border border-stone-200 mt-1 focus:ring-2 focus:ring-orange-200 outline-none"
                placeholder="Ví dụ: 20"
                value={formData.percent}
                onChange={(e) => setFormData({...formData, percent: parseInt(e.target.value)})}
              />
            </div>
            <button 
              onClick={btnAddClick}
              className="w-full bg-[#6F4E37] text-white py-3 rounded-xl font-bold hover:bg-[#5d4037] transition-all flex items-center justify-center gap-2"
            >
              <FaPlus /> LƯU MÃ
            </button>
          </form>
        </div>

        {/* DANH SÁCH MÃ */}
        <div className="lg:col-span-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-orange-100 text-[#a1887f] text-xs uppercase text-left">
                <th className="py-3">Mã Code</th>
                <th className="py-3 text-center">Giảm (%)</th>
                <th className="py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((item) => (
                <tr key={item._id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="py-4 font-bold text-[#3e2723] tracking-wider">{item.code}</td>
                  <td className="py-4 text-center font-semibold text-orange-700">{item.percent}%</td>
                  <td className="py-4 text-center">
                    <button 
                      onClick={() => btnDeleteClick(item._id)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponComponent;