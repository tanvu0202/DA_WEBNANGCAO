import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { MdLocalOffer, MdDeleteSweep } from 'react-icons/md';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const mycart = this.context.mycart.map((item) => {
      return (
        <tr className="border-b border-stone-100 group transition-colors hover:bg-stone-50/50" key={item.product._id}>
          <td className="py-6 flex items-center">
            <button 
              onClick={() => this.lnkRemoveClick(item.product._id)}
              className="text-stone-300 hover:text-red-500 transition-colors mr-4"
              title="Xóa sản phẩm"
            >
              <MdDeleteSweep size={22} />
            </button>
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-white">
                <img 
                  src={"data:image/jpg;base64," + item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
            </div>
            <div className="ml-4">
                <h2 className="font-bold text-[#2d1b0f] text-base">{item.product.name}</h2>
                <p className="text-xs text-stone-400 italic">Next Coffee Selection</p>
            </div>
          </td>
          <td className="text-stone-600 font-medium">{item.product.price.toLocaleString()} ₫</td>
          <td className="text-center font-semibold text-[#2d1b0f]">{item.quantity}</td>
          <td className="text-right font-bold text-orange-700">{(item.product.price * item.quantity).toLocaleString()} ₫</td>
        </tr>
      );
    });

    return (
      <div className="container-80 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* BẢNG SẢN PHẨM */}
          <div className="flex-[2]">
            <h1 className="text-2xl font-serif font-bold text-[#2d1b0f] mb-8 flex items-center gap-3">
                Giỏ hàng của bạn <span className="text-sm font-sans font-normal text-stone-400">({this.context.mycart.length} món)</span>
            </h1>
            
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#2d1b0f] text-stone-400 uppercase tracking-widest text-[11px] font-bold">
                  <th className="pb-4 text-start">Sản phẩm</th>
                  <th className="pb-4 text-start">Giá</th>
                  <th className="pb-4">Số lượng</th>
                  <th className="pb-4 text-end">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {this.context.mycart.length > 0 ? mycart : (
                    <tr>
                        <td colSpan="4" className="py-20 text-center text-stone-400 italic">
                            Giỏ hàng của bạn đang trống...
                        </td>
                    </tr>
                )}
              </tbody>
            </table>

            <div className="mt-10">
              <Link to='/products' className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-100 hover:border-stone-300 transition-all">
                <HiOutlineArrowNarrowLeft size={20}/> TIẾP TỤC THƯỞNG THỨC
              </Link>
            </div>
          </div>

          {/* TỔNG KẾT ĐƠN HÀNG */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-28">
                <h2 className="text-xl font-serif font-bold text-[#2d1b0f] mb-6 pb-4 border-b border-stone-100">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-stone-500">
                        <span>Tổng tiền hàng</span>
                        <span className="font-semibold text-stone-800">{CartUtil.getTotal(this.context.mycart).toLocaleString()} ₫</span>
                    </div>
                    
                    <div className="flex justify-between text-stone-500">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600 font-medium uppercase text-xs">Miễn phí</span>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 my-6">
                        <div className="flex items-center gap-2 mb-3 text-orange-800 font-bold text-sm">
                            <MdLocalOffer className="rotate-90" />
                            Mã ưu đãi (Coupon)
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 bg-white border border-orange-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" 
                                placeholder="Nhập mã..." 
                            />
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">ÁP DỤNG</button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex justify-between items-end">
                        <span className="text-[#2d1b0f] font-bold">Tổng thanh toán</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-orange-700 leading-none">
                                {CartUtil.getTotal(this.context.mycart).toLocaleString()} ₫
                            </p>
                            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">Đã bao gồm VAT</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => this.lnkCheckoutClick()} 
                        className="w-full mt-8 bg-[#2d1b0f] text-white py-4 rounded-full font-bold text-base hover:bg-[#442c1e] shadow-lg shadow-stone-300 transition-all active:scale-95"
                    >
                        TIẾN HÀNH ĐẶT HÀNG
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]); // Tạo reference mới để React trigger re-render
    }
  }

  lnkCheckoutClick() {
    if (this.context.mycart.length > 0) {
      const total = CartUtil.getTotal(this.context.mycart);
      const items = this.context.mycart;
      const customer = this.context.customer;
      if (customer) {
        Swal.fire({
          title: 'Xác nhận đơn hàng',
          text: "Bạn đã sẵn sàng để Next Coffee chuẩn bị thức uống?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#2d1b0f',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đặt hàng ngay!',
          cancelButtonText: 'Kiểm tra lại'
        }).then((result) => {
          if (result.isConfirmed) {
            this.apiCheckout(total, items, customer);
          }
        });
      } else {
        this.props.navigate('/login');
      }
    } else {
      Swal.fire('Giỏ hàng trống', 'Hãy chọn cho mình một ly cà phê trước nhé!', 'info');
    }
  }

  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      if (res.data) {
        this.context.setMycart([]);
        Swal.fire({
          icon: "success",
          title: "Đã nhận đơn hàng!",
          text: "Barista của Next Coffee đang bắt đầu pha chế cho bạn.",
          showConfirmButton: false,
          timer: 2000
        });
        this.props.navigate('/home');
      }
    });
  }
}

export default withRouter(Mycart);