import axios from 'axios';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { FaExclamationCircle, FaCheck, FaTimes, FaHistory } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Pagination } from 'antd';
import MyContext from '../contexts/MyContext';

const Order = () => {
  const { token } = useContext(MyContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Dùng useCallback để tránh lỗi missing dependency trong useEffect
  const apiGetOrders = useCallback(() => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/orders', config).then((res) => {
      setOrders(res.data);
    });
  }, [token]);

  useEffect(() => {
    apiGetOrders();
    document.title = "Next Coffee - Quản lý đơn hàng";
  }, [apiGetOrders]);

  const apiPutOrderStatus = (id, status) => {
    const body = { status };
    const config = { headers: { 'x-access-token': token } };
    axios.put(`/api/admin/orders/status/${id}`, body, config).then((res) => {
      if (res.data) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: `Đơn hàng đã được chuyển sang trạng thái ${status}!`,
          confirmButtonColor: '#6F4E37'
        });
        apiGetOrders();
      } else {
        Swal.fire('Lỗi', 'Đã có lỗi xảy ra!', 'error');
      }
    });
  };

  const handleApproveClick = (id) => {
    Swal.fire({
      title: 'Xác nhận duyệt?',
      text: "Đơn hàng này sẽ được chuẩn bị để giao cho khách.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6F4E37', // Màu nâu cafe
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt ngay',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        apiPutOrderStatus(id, 'APPROVED');
      }
    });
  };

  const handleCancelClick = (id) => {
    Swal.fire({
      title: 'Hủy đơn hàng?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6F4E37',
      confirmButtonText: 'Đúng, hủy đơn!',
      cancelButtonText: 'Quay lại'
    }).then((result) => {
      if (result.isConfirmed) {
        apiPutOrderStatus(id, 'CANCELED');
      }
    });
  };

  const handleOrderDetail = (order) => {
    const orderDetailsHTML = order.items
      .map(
        (orderItem) => `
        <div style="display: flex; align-items: center; margin-bottom: 12px; padding: 10px; border-bottom: 1px solid #f3f4f6;">
          <img 
            src="data:image/jpg;base64,${orderItem.product.image}" 
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 15px;" 
          />
          <div style="flex-grow: 1; text-align: left;">
            <p style="font-size: 14px; margin: 0; font-weight: 600; color: #3d2b1f;">${orderItem.product.name}</p>
            <p style="font-size: 12px; margin: 2px 0; color: #6F4E37;">
              ${orderItem.product.price.toLocaleString()}đ x ${orderItem.quantity}
            </p>
          </div>
          <div style="font-weight: 700; color: #3d2b1f;">
            ${(orderItem.product.price * orderItem.quantity).toLocaleString()}đ
          </div>
        </div>`
      ).join('');

    Swal.fire({
      title: `<span style="font-family: serif; color: #3d2b1f;">Chi tiết đơn hàng #${order._id.slice(-6)}</span>`,
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><b>Khách hàng:</b> ${order.customer.name}</p>
          <p><b>SĐT:</b> ${order.customer.phone}</p>
          <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
          <div style="max-height: 250px; overflow-y: auto;">${orderDetailsHTML}</div>
          <div style="margin-top: 15px; text-align: right; font-size: 18px; font-weight: bold; color: #6F4E37;">
            Tổng cộng: ${order.total.toLocaleString()} VND
          </div>
        </div>`,
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#6F4E37',
      width: '500px'
    });
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const paginatedOrders = orders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Định nghĩa style chung để đồng bộ với trang Customer
  const thClass = "px-4 h-12 border-b-2 border-orange-100 bg-orange-50 text-left text-[11px] font-bold text-[#6F4E37] uppercase tracking-wider";
  const tdClass = "px-4 h-16 border-b border-gray-50 text-sm text-gray-700 align-middle";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm min-h-screen">
      <div className="mb-8 border-b border-orange-100 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3d2b1f]">QUẢN LÝ ĐƠN HÀNG</h2>
          <p className="text-sm text-[#8B5A2B]">Theo dõi và xử lý đơn hàng khách đặt</p>
        </div>
        <div className="bg-orange-50 p-2 rounded-lg text-[#6F4E37] flex items-center text-xs font-bold">
           <FaHistory className="mr-2" /> Tổng số: {orders.length} đơn
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className={thClass}>Mã đơn</th>
              <th className={thClass}>Ngày đặt</th>
              <th className={thClass}>Khách hàng</th>
              <th className={thClass}>Tổng tiền</th>
              <th className={thClass}>Trạng thái</th>
              <th className={`${thClass} text-center`}>Xử lý</th>
              <th className={`${thClass} text-center`}>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((item) => (
              <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                <td className={`${tdClass} font-mono text-xs text-gray-400`} title={item._id}>
                  #{item._id.slice(-8)}
                </td>
                <td className={tdClass}>
                  {new Date(item.cdate).toLocaleString('vi-VN')}
                </td>
                <td className={tdClass}>
                  <div className="font-bold text-[#3d2b1f]">{item.customer.name}</div>
                  <div className="text-[10px] text-gray-400">{item.customer.phone}</div>
                </td>
                <td className={`${tdClass} font-bold text-[#6F4E37]`}>
                  {item.total.toLocaleString()}đ
                </td>
                <td className={tdClass}>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    item.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                    item.status === 'CANCELED' ? 'bg-red-100 text-red-700' : 
                    'bg-orange-100 text-[#6F4E37]'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className={`${tdClass} text-center`}>
                  {item.status === 'PENDING' ? (
                    <div className="flex justify-center gap-2">
                      <button
                        title="Duyệt đơn"
                        className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white p-2 rounded-lg shadow-sm transition-all"
                        onClick={() => handleApproveClick(item._id)}
                      >
                        <FaCheck size={12} />
                      </button>
                      <button
                        title="Hủy đơn"
                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg shadow-sm transition-all"
                        onClick={() => handleCancelClick(item._id)}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-300 text-xs italic">Đã xử lý</span>
                  )}
                </td>
                <td className={`${tdClass} text-center`}>
                  <button 
                    onClick={() => handleOrderDetail(item)}
                    className="text-[#6F4E37] hover:bg-orange-100 p-2 rounded-full transition-all"
                  >
                    <FaExclamationCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs text-gray-400 italic">Hiển thị {paginatedOrders.length}/{orders.length} đơn hàng</p>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          showSizeChanger
          onChange={handlePageChange}
          className="next-coffee-pagination"
        />
      </div>
    </div>
  );
};

export default Order;