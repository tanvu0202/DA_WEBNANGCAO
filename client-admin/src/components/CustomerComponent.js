import axios from 'axios';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

const Customer = () => {
  const { token } = useContext(MyContext);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  // Dùng useCallback để tránh lỗi missing dependency mà bác gặp lúc nãy
  const apiGetCustomers = useCallback(async () => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get('/api/admin/customers', config);
      setCustomers(res.data);
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể lấy danh sách khách hàng', 'error');
    }
  }, [token]);

  useEffect(() => {
    apiGetCustomers();
  }, [apiGetCustomers]);

  const apiGetOrdersByCustID = async (cid) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get(`/api/admin/orders/customer/${cid}`, config);
      setOrders(res.data);
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể lấy danh sách đơn hàng', 'error');
    }
  };

  const apiPutCustomerDeactive = async (id) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      await axios.put(`/api/admin/customers/deactive/${id}`, {}, config);
      Swal.fire('Thành công', 'Đã hủy kích hoạt khách hàng', 'success');
      apiGetCustomers();
    } catch (error) {
      Swal.fire('Lỗi', 'Thao tác thất bại', 'error');
    }
  };

  const apiGetCustomerSendmail = async (id) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get(`/api/admin/customers/sendmail/${id}`, config);
      Swal.fire('Thành công', res.data.message, 'success');
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể gửi email', 'error');
    }
  };

  const trCustomerClick = (item) => {
    setOrders([]);
    setOrder(null);
    apiGetOrdersByCustID(item._id);
  };

  const handleOrderDetail = (orderItem) => {
    // Logic Swal giữ nguyên như của bác nhưng em tinh chỉnh nhẹ UI cho đẹp
    const orderDetailsHTML = orderItem.items
      .map(
        (item) => `
        <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
          <img src="data:image/jpg;base64,${item.product.image}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 15px;"/>
          <div style="text-align: left;">
            <p><b>${item.product.name}</b> x ${item.quantity}</p>
            <p style="color: #6F4E37;">${item.product.price.toLocaleString()} VND</p>
          </div>
        </div>`
      ).join('');

    Swal.fire({
      title: 'Chi tiết đơn hàng',
      html: `<div style="text-align: left;">${orderDetailsHTML}<p><b>Tổng cộng: ${orderItem.total.toLocaleString()} VND</b></p></div>`,
      confirmButtonColor: '#6F4E37'
    });
  };

  // Class dùng chung để các hàng có độ cao bằng nhau và chữ nằm giữa
  const tdClass = "px-4 h-16 border-b border-gray-100 text-sm text-gray-700 align-middle truncate max-w-[150px]";
  const thClass = "px-4 h-12 border-b-2 border-orange-100 bg-orange-50 text-left text-xs font-bold text-[#6F4E37] uppercase tracking-wider";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm min-h-screen overflow-y-auto">
      <div className="mb-8 border-b border-orange-100 pb-4">
        <h2 className="text-2xl font-serif font-bold text-[#3d2b1f]">QUẢN LÝ KHÁCH HÀNG</h2>
        <p className="text-sm text-[#8B5A2B]">Danh sách thành viên của Next Coffee</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm mb-10">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th className={`${thClass} w-24`}>ID</th>
              <th className={thClass}>Tài khoản</th>
              <th className={thClass}>Họ tên</th>
              <th className={thClass}>Số điện thoại</th>
              <th className={thClass}>Email</th>
              <th className={`${thClass} w-24`}>Trạng thái</th>
              <th className={`${thClass} w-32`}>Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {customers.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-orange-50/30 cursor-pointer transition-colors"
                onClick={() => trCustomerClick(item)}
              >
                <td className={tdClass} title={item._id}>{item._id}</td>
                <td className={tdClass}>{item.username}</td>
                <td className={tdClass}>{item.name}</td>
                <td className={tdClass}>{item.phone}</td>
                <td className={tdClass} title={item.email}>{item.email}</td>
                <td className={tdClass}>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className={tdClass} onClick={(e) => e.stopPropagation()}>
                  {item.active ? (
                    <button onClick={() => apiPutCustomerDeactive(item._id)} className="text-red-600 hover:text-red-800 font-bold text-xs underline">
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => apiGetCustomerSendmail(item._id)} className="text-blue-600 hover:text-blue-800 font-bold text-xs underline">
                      Send Mail
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <div className="animate__animated animate__fadeInUp animate__faster">
          <div className="mb-4 flex items-center">
             <div className="h-1 w-8 bg-[#6F4E37] mr-3"></div>
             <h2 className="text-xl font-bold text-[#3d2b1f]">LỊCH SỬ ĐƠN HÀNG</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <table className="min-w-full table-fixed">
              <thead>
                <tr className="bg-gray-50">
                  <th className={thClass}>Mã đơn</th>
                  <th className={thClass}>Ngày đặt</th>
                  <th className={thClass}>Tổng tiền</th>
                  <th className={thClass}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item._id} className="hover:bg-orange-50/30 cursor-pointer h-16" onClick={() => handleOrderDetail(item)}>
                    <td className={tdClass}>{item._id}</td>
                    <td className={tdClass}>{new Date(item.cdate).toLocaleString()}</td>
                    <td className={`${tdClass} font-bold text-[#6F4E37]`}>{item.total.toLocaleString()} VND</td>
                    <td className={tdClass}>
                        <span className="bg-orange-100 text-[#6F4E37] px-2 py-1 rounded text-xs font-medium">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;