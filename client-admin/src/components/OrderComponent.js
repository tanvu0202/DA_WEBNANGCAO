import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Pagination } from 'antd';
import MyContext from '../contexts/MyContext';

const Order = () => {
  const { token } = useContext(MyContext);
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(5); 

  useEffect(() => {
    apiGetOrders();
  }, []);

  const apiGetOrders = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/orders', config).then((res) => {
      setOrders(res.data);
    });
  };

  const apiPutOrderStatus = (id, status) => {
    const body = { status };
    const config = { headers: { 'x-access-token': token } };
    axios.put(`/api/admin/orders/status/${id}`, body, config).then((res) => {
      if (res.data) {
        Swal.fire('Success', `Order ${status}!`, 'success');
        apiGetOrders();
      } else {
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    });
  };

  const handleApproveClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to approve this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        apiPutOrderStatus(id, 'APPROVED');
      }
    });
  };

  const handleCancelClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
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
        <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
          <img 
            src="data:image/jpg;base64,${orderItem.product.image}" 
            alt="${orderItem.product.name}" 
            style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); margin-right: 15px;" 
          />
          <div style="flex-grow: 1;">
            <p style="font-size: 16px; margin: 0; font-weight: 600;">${orderItem.product.name}</p>
            <p style="font-size: 14px; margin: 5px 0;">Price: <strong>${orderItem.product.price.toLocaleString()} VND</strong></p>
            <p style="font-size: 14px; margin: 5px 0;">Quantity: <strong>${orderItem.quantity}</strong></p>
            <p style="font-size: 14px; margin: 5px 0;">Total: <strong>${(orderItem.product.price * orderItem.quantity).toLocaleString()} VND</strong></p>
          </div>
        </div>
      `
      )
      .join('');

    Swal.fire({
      icon: 'info',
      title: `<h2 style="font-size: 22px; font-weight: 700; margin-bottom: 10px;">Order ID: ${order._id}</h2>`,
      html: `
        <div style="text-align: left; font-size: 15px; line-height: 1.6;">
          <p><strong>Customer Name:</strong> ${order.customer.name}</p>
          <p><strong>Customer Phone:</strong> ${order.customer.phone}</p>
          <p><strong>Order Date:</strong> ${new Date(order.cdate).toLocaleString()}</p>
          <h3 style="margin-top: 15px; font-size: 18px; font-weight: 600;">Order Items:</h3>
          <div style="max-height: 300px; overflow-y: auto; padding-right: 10px;">
            ${orderDetailsHTML}
          </div>
          <hr style="margin: 15px 0;">
          <p style="font-size: 16px; font-weight: 600;">Total Amount: <span style="font-size: 18px; color: #c89979;">${order.total.toLocaleString()} VND</span></p>
        </div>
      `,
      confirmButtonText: 'OK',
      width: '600px',
      padding: '20px',
      background: '#f9f9f9',
      customClass: {
        popup: 'shadow-lg rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded-lg',
      },
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    Swal.fire('Page changed!', `You are now on page ${page}`, 'info');
  };

  const paginatedOrders = orders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mx-auto p-4 h-[89vh] bg-white rounded-sm">
      <h2 className="text-3xl font-bold text-center mb-6">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Creation Date</th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Customer Phone</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{item._id}</td>
                <td className="px-4 py-2">{new Date(item.cdate).toLocaleString()}</td>
                <td className="px-4 py-2">{item.customer.name}</td>
                <td className="px-4 py-2">{item.customer.phone}</td>
                <td className="px-4 py-2">{item.total.toLocaleString()} VND</td>
                <td className={`px-4 py-2 ${item.status === 'APPROVED' ? 'text-[#21499a]' :'text-[#ce7539]'}`}>{item.status}</td> 
                <td className="px-4 py-2 text-center">
                  {item.status === 'PENDING' && (
                    <div className="mt-2 flex gap-2">
                      <button
                        className="text-white bg-[#21499a] px-3 py-1 rounded-sm"
                        onClick={() => handleApproveClick(item._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="text-white bg-[#ce7539] px-3 py-1 rounded-sm"
                        onClick={() => handleCancelClick(item._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
                <td className='px-4 py-2 text-center'>
                  <FaExclamationCircle
                    onClick={() => handleOrderDetail(item)}
                    className="cursor-pointer text-xl text-blue-500 hover:text-blue-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          showSizeChanger
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Order;
