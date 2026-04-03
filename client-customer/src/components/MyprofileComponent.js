import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';
import { FaUserCircle, FaUser, FaLock, FaIdCard, FaPhone, FaEnvelope } from 'react-icons/fa';

class Myprofile extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    
    const inputClass = "block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-xl text-sm shadow-sm placeholder-stone-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all";
    const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 ml-1";

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#fffcf9] py-12 px-4 animate__animated animate__fadeIn">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Cột trái: Profile Decor */}
          <div className="md:w-1/3 bg-[#442c1e] p-8 text-center flex flex-col items-center justify-center text-white">
            <FaUserCircle size={80} className="text-orange-200 mb-4" />
            <h2 className="text-xl font-serif font-bold tracking-tight">Thành viên</h2>
            <p className="text-orange-200/60 text-xs mt-2 italic">Next Coffee Premium</p>
            <div className="mt-8 pt-8 border-t border-white/10 w-full text-xs space-y-2 opacity-70">
              <p>Cập nhật thông tin để nhận ưu đãi cá nhân hóa.</p>
            </div>
          </div>

          {/* Cột phải: Form */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl font-serif font-bold text-[#2d1b0f] mb-8">Thông tin cá nhân</h2>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Username */}
                <div className="relative">
                  <label className={labelClass}>Tài khoản</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                      <FaUser size={14} />
                    </span>
                    <input 
                      type="text" 
                      className={inputClass + " bg-stone-50 cursor-not-allowed"} 
                      value={this.state.txtUsername} 
                      readOnly 
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="relative">
                  <label className={labelClass}>Mật khẩu</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                      <FaLock size={14} />
                    </span>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className={inputClass} 
                      value={this.state.txtPassword} 
                      onChange={(e) => this.setState({ txtPassword: e.target.value })} 
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="relative">
                <label className={labelClass}>Họ và tên</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                    <FaIdCard size={14} />
                  </span>
                  <input 
                    type="text" 
                    className={inputClass} 
                    value={this.state.txtName} 
                    onChange={(e) => this.setState({ txtName: e.target.value })} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="relative">
                  <label className={labelClass}>Số điện thoại</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                      <FaPhone size={14} />
                    </span>
                    <input 
                      type="tel" 
                      className={inputClass} 
                      value={this.state.txtPhone} 
                      onChange={(e) => this.setState({ txtPhone: e.target.value })} 
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className={labelClass}>Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                      <FaEnvelope size={14} />
                    </span>
                    <input 
                      type="email" 
                      className={inputClass} 
                      value={this.state.txtEmail} 
                      onChange={(e) => this.setState({ txtEmail: e.target.value })} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={(e) => this.btnUpdateClick(e)}
                  className="w-full bg-[#442c1e] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#5d3f2d] shadow-lg shadow-stone-200 transition-all active:scale-95 uppercase tracking-widest"
                >
                  Cập nhật hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { 
        username: txtUsername, 
        password: txtPassword, 
        name: txtName, 
        phone: txtPhone, 
        email: txtEmail 
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng không để trống bất kỳ trường nào.',
        confirmButtonColor: '#442c1e'
      });
    }
  }

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Thông tin hồ sơ của bạn đã được cập nhật.',
          showConfirmButton: false,
          timer: 1500
        });
        this.context.setCustomer(result);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: 'Có lỗi xảy ra trong quá trình cập nhật.',
          confirmButtonColor: '#442c1e'
        });
      }
    });
  }
}

export default Myprofile;