import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  trItemClick = (item) => {
    this.setState({ order: item });
    // Cuộn nhẹ xuống phần chi tiết khi chọn đơn hàng
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }

  apiGetOrdersByCustID = (cid) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  // Helper để hiển thị màu sắc cho trạng thái
  getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'APPROVED': return 'bg-blue-100 text-blue-700';
      case 'CANCELED': return 'bg-red-100 text-red-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    const orders = this.state.orders.map((item) => (
      <tr 
        key={item._id} 
        className={`border-b border-stone-100 cursor-pointer transition-all hover:bg-orange-50/50 ${this.state.order?._id === item._id ? 'bg-orange-50' : ''}`} 
        onClick={() => this.trItemClick(item)}
      >
        <td className="p-4 font-mono text-xs text-stone-400">#{item._id.slice(-8).toUpperCase()}</td>
        <td className="p-4 text-stone-600">{new Date(item.cdate).toLocaleDateString('vi-VN')}</td>
        <td className="p-4 font-bold text-[#2d1b0f]">{item.total.toLocaleString()} ₫</td>
        <td className="p-4 text-center">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${this.getStatusStyle(item.status)}`}>
            {item.status}
          </span>
        </td>
      </tr>
    ));

    const orderDetails = this.state.order ? this.state.order.items.map((item, index) => (
      <tr key={index} className="border-b border-stone-50 border-dashed">
        <td className="py-4 flex items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200">
            <img 
              src={"data:image/jpg;base64," + item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="ml-3 font-medium text-[#442c1e] text-sm">{item.product.name}</span>
        </td>
        <td className="py-4 text-stone-500 text-sm">{item.product.price.toLocaleString()}</td>
        <td className="py-4 text-center text-stone-600 italic">x{item.quantity}</td>
        <td className="py-4 text-end font-bold text-[#2d1b0f]">{(item.product.price * item.quantity).toLocaleString()}</td>
      </tr>
    )) : null;

    return (
      <div className="container-80 py-16 animate__animated animate__fadeIn">
        <div className="max-w-4xl mx-auto">
          {/* TIÊU ĐỀ */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#2d1b0f]">Lịch Sử Đặt Hàng</h2>
            <div className="w-16 h-1 bg-orange-400 mx-auto mt-3 rounded-full"></div>
            <p className="text-stone-400 text-sm mt-4 italic font-sans">Xem lại những hương vị bạn đã từng thưởng thức</p>
          </div>

          {/* BẢNG DANH SÁCH TỔNG QUÁT */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                  <th className="p-4">Mã đơn</th>
                  <th className="p-4">Ngày đặt</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-stone-400 italic">Bạn chưa có đơn hàng nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CHI TIẾT ĐƠN HÀNG - Giao diện Receipt */}
          {this.state.order && (
            <div className="mt-16 bg-[#fffcf5] border border-orange-100 rounded-3xl p-8 shadow-inner relative overflow-hidden">
              {/* Trang trí hình răng cưa hoặc line kép */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-orange-200 pb-6 border-dashed">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#442c1e]">Chi Tiết Hóa Đơn</h3>
                  <p className="text-xs text-stone-400 mt-1 uppercase font-mono">ID: {this.state.order._id}</p>
                </div>
                <div className="text-right text-stone-500 text-xs">
                    <p>Khách hàng: <strong>{this.state.order.customer.name}</strong></p>
                    <p>SĐT: {this.state.order.customer.phone}</p>
                </div>
              </div>

              <table className="w-full mb-6">
                <thead>
                  <tr className="text-[10px] text-orange-800/60 uppercase tracking-widest font-bold">
                    <th className="pb-4 text-start">Món đã chọn</th>
                    <th className="pb-4 text-start">Đơn giá</th>
                    <th className="pb-4">SL</th>
                    <th className="pb-4 text-end">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails}
                </tbody>
              </table>

              <div className="flex flex-col items-end gap-2 pt-4">
                <div className="flex justify-between w-full max-w-[250px] text-stone-500 text-sm">
                    <span>Tổng cộng:</span>
                    <span>{this.state.order.total.toLocaleString()} ₫</span>
                </div>
                <div className="flex justify-between w-full max-w-[250px] text-[#2d1b0f] font-bold text-lg border-t border-orange-200 pt-2">
                    <span>Thành tiền:</span>
                    <span className="text-orange-700">{this.state.order.total.toLocaleString()} ₫</span>
                </div>
                <p className="text-[10px] text-stone-400 italic mt-4 italic">* Next Coffee cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Myorders;