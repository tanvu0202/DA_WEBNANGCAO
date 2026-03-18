import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

const Customer = () => {
  const { token } = useContext(MyContext);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    apiGetCustomers();
  }, []);

  const apiGetCustomers = async () => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get('/api/admin/customers', config);
      setCustomers(res.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch customers', 'error');
    }
  };

  const apiGetOrdersByCustID = async (cid) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get(`/api/admin/orders/customer/${cid}`, config);
      setOrders(res.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch orders', 'error');
    }
  };

  const apiPutCustomerDeactive = async (id) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      await axios.put(`/api/admin/customers/deactive/${id}`, {}, config);
      Swal.fire('Success', 'Customer deactivated successfully', 'success');
      apiGetCustomers();
    } catch (error) {
      Swal.fire('Error', 'Failed to deactivate customer', 'error');
    }
  };

  const apiGetCustomerSendmail = async (id) => {
    try {
      const config = { headers: { 'x-access-token': token } };
      const res = await axios.get(`/api/admin/customers/sendmail/${id}`, config);
      Swal.fire('Success', res.data.message, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to send email', 'error');
    }
  };

  const trCustomerClick = (item) => {
    setOrders([]);
    setOrder(null);
    apiGetOrdersByCustID(item._id);
  };

  const lnkDeactiveClick = (item) => {
    apiPutCustomerDeactive(item._id);
  };

  const lnkEmailClick = (item) => {
    apiGetCustomerSendmail(item._id);
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

  return (
    <div className="container mx-auto p-6 bg-white h-[89vh]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Customer List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Active</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => trCustomerClick(item)}
              >
                <td className="py-2 px-4 border">{item._id}</td>
                <td className="py-2 px-4 border">{item.username}</td>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.phone}</td>
                <td className="py-2 px-4 border">{item.email}</td>
                <td className="py-2 px-4 border">{item.active ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">
                  {item.active ? (
                    <button
                      className="text-red-500 underline"
                      onClick={() => lnkDeactiveClick(item)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 underline"
                      onClick={() => lnkEmailClick(item)}
                    >
                      Send Email
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center">Order List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Creation Date</th>
                  <th className="py-2 px-4 border">Customer Name</th>
                  <th className="py-2 px-4 border">Customer Phone</th>
                  <th className="py-2 px-4 border">Total</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOrderDetail(item)}
                  >
                    <td className="py-2 px-4 border">{item._id}</td>
                    <td className="py-2 px-4 border">
                      {new Date(item.cdate).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">{item.customer.name}</td>
                    <td className="py-2 px-4 border">{item.customer.phone}</td>
                    <td className="py-2 px-4 border">{item.total.toLocaleString()} VND</td>
                    <td className="py-2 px-4 border">{item.status}</td>
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
