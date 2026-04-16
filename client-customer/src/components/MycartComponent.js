import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { MdLocalOffer, MdDeleteSweep } from 'react-icons/md';
import { HiMinusSm, HiPlusSm, HiOutlineArrowNarrowLeft } from 'react-icons/hi'; // Thêm icon quay lại
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Mycart extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtCoupon: '',
      discount: 0
    };
  }

  txtCouponChange = (e) => {
    this.setState({ txtCoupon: e.target.value });
  }

  btnApplyCouponClick = () => {
    const code = this.state.txtCoupon.trim();
    if (!code) {
      Swal.fire('Thông báo', 'Vui lòng nhập mã giảm giá!', 'warning');
      return;
    }

    axios.post('/api/customer/check-coupon', { code: code }).then((res) => {
      const result = res.data;
      if (result.success) {
        this.setState({ discount: result.percent });
        Swal.fire('Thành công', `Đã áp dụng mã giảm giá ${result.percent}%`, 'success');
      } else {
        this.setState({ discount: 0 });
        Swal.fire('Thất bại', result.message, 'error');
      }
    });
  }

  lnkChangeQuantity(id, newQuantity) {
    if (newQuantity < 1) return;
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart[index].quantity = newQuantity;
      this.context.setMycart([...mycart]);
    }
  }

  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]);
    }
  }

  render() {
    const subtotal = CartUtil.getTotal(this.context.mycart);
    const discountAmount = (subtotal * this.state.discount) / 100;
    const finalTotal = subtotal - discountAmount;

    const mycart = this.context.mycart.map((item) => {
      return (
        <tr className="border-b border-stone-100 group transition-colors hover:bg-stone-50/50" key={item.product._id}>
          <td className="py-6 flex items-center">
            <button onClick={() => this.lnkRemoveClick(item.product._id)} className="text-stone-300 hover:text-red-500 transition-colors mr-4">
              <MdDeleteSweep size={22} />
            </button>
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-white">
                <img src={"data:image/jpg;base64," + item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-4">
                <h2 className="font-bold text-[#2d1b0f] text-base">{item.product.name}</h2>
                <p className="text-xs text-stone-400 italic">Next Coffee Selection</p>
            </div>
          </td>
          <td className="text-stone-600 font-medium">{item.product.price.toLocaleString()} ₫</td>
          <td className="py-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => this.lnkChangeQuantity(item.product._id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 disabled:opacity-30 text-[#442c1e]" disabled={item.quantity <= 1}>
                <HiMinusSm />
              </button>
              <span className="font-semibold text-[#2d1b0f]">{item.quantity}</span>
              <button onClick={() => this.lnkChangeQuantity(item.product._id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 text-[#442c1e]">
                <HiPlusSm />
              </button>
            </div>
          </td>
          <td className="text-right font-bold text-orange-700">{(item.product.price * item.quantity).toLocaleString()} ₫</td>
        </tr>
      );
    });

    return (
      <div className="container-80 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-[2]">
            <h1 className="text-2xl font-serif font-bold text-[#2d1b0f] mb-8">
                Giỏ hàng của bạn <span className="text-sm font-normal text-stone-400">({this.context.mycart.length} món)</span>
            </h1>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#2d1b0f] text-stone-400 uppercase text-[11px] font-bold">
                  <th className="pb-4 text-start">Sản phẩm</th>
                  <th className="pb-4 text-start">Giá</th>
                  <th className="pb-4">Số lượng</th>
                  <th className="pb-4 text-end">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>{this.context.mycart.length > 0 ? mycart : (
                <tr><td colSpan="4" className="py-20 text-center text-stone-400 italic">Giỏ hàng trống...</td></tr>
              )}</tbody>
            </table>

            {/* Nút QUAY LẠI hiện rõ ràng */}
            <div className="mt-10">
              <Link to='/products' className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-100 transition-all shadow-sm">
                <HiOutlineArrowNarrowLeft size={20}/> TIẾP TỤC THƯỞNG THỨC
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-stone-100 sticky top-28">
                <h2 className="text-xl font-serif font-bold text-[#2d1b0f] mb-6 pb-4 border-b border-stone-100">Tóm tắt đơn hàng</h2>
                <div className="space-y-4">
                    <div className="flex justify-between text-stone-500">
                        <span>Tổng tiền hàng</span>
                        <span className="font-semibold text-stone-800">{subtotal.toLocaleString()} ₫</span>
                    </div>

                    {this.state.discount > 0 && (
                      <div className="flex justify-between text-orange-600 font-bold animate__animated animate__fadeInDown">
                          <span>Giảm giá ({this.state.discount}%)</span>
                          <span>-{discountAmount.toLocaleString()} ₫</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-stone-500">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600 font-medium text-xs">MIỄN PHÍ</span>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 my-6">
                        <div className="flex items-center gap-2 mb-3 text-orange-800 font-bold text-sm">
                            <MdLocalOffer className="rotate-90" /> Mã ưu đãi (Coupon)
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 bg-white border border-orange-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-300 outline-none" 
                                placeholder="Nhập mã..." 
                                value={this.state.txtCoupon}
                                onChange={this.txtCouponChange}
                            />
                            <button onClick={this.btnApplyCouponClick} className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm">ÁP DỤNG</button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex justify-between items-end">
                        <span className="text-[#2d1b0f] font-bold">Tổng thanh toán</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-orange-700">{finalTotal.toLocaleString()} ₫</p>
                            <p className="text-[10px] text-stone-400 mt-1 uppercase">Đã bao gồm VAT</p>
                        </div>
                    </div>

                    {/* Nút ĐẶT HÀNG hiện rõ rệt */}
                    <button onClick={() => this.lnkCheckoutClick(finalTotal)} className="w-full mt-8 bg-[#2d1b0f] text-white py-4 rounded-full font-bold shadow-lg hover:bg-[#442c1e] transition-all active:scale-95">
                        TIẾN HÀNH ĐẶT HÀNG
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  lnkCheckoutClick(total) {
    if (this.context.mycart.length > 0) {
      if (this.context.customer) {
        Swal.fire({
          title: 'Xác nhận đơn hàng',
          text: `Tổng thanh toán: ${total.toLocaleString()} ₫. Bạn muốn đặt hàng ngay?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#2d1b0f', // Nâu Next Coffee
          cancelButtonColor: '#d33',     // Đỏ để hiện rõ nút Hủy
          confirmButtonText: 'Đặt hàng ngay!',
          cancelButtonText: 'Kiểm tra lại',
          reverseButtons: true // Đưa nút xác nhận sang phải cho thuận tay
        }).then((result) => {
          if (result.isConfirmed) {
            this.apiCheckout(total, this.context.mycart, this.context.customer);
          }
        });
      } else {
        this.props.navigate('/login');
      }
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
            text: "Cảm ơn bạn đã ủng hộ Next Coffee!",
            showConfirmButton: false,
            timer: 2000 
        });
        this.props.navigate('/home');
      }
    });
  }
}

export default withRouter(Mycart);