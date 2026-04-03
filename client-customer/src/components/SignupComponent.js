import axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaIdCard, FaPhone, FaEnvelope, FaCoffee, FaExternalLinkAlt } from 'react-icons/fa';
import withRouter from '../utils/withRouter'; // Quan trọng để điều hướng

class Signup extends Component {
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

  render() {
    const inputClass = "block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-xl text-sm shadow-sm placeholder-stone-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all duration-300";
    const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 ml-1";

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffcf9] py-12 px-4 animate__animated animate__fadeIn">
        <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Cột trái: Giới thiệu */}
          <div className="md:w-5/12 bg-[#2d1b0f] p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-12">
                <FaCoffee size={24} className="-rotate-12" />
              </div>
              <h2 className="text-3xl font-serif font-bold leading-tight">Gia nhập cộng đồng Next Coffee</h2>
              <p className="text-orange-200/70 text-sm mt-4 font-light leading-relaxed">
                Đăng ký thành viên để nhận ưu đãi đặc quyền, tích điểm đổi quà và trải nghiệm không gian cà phê tinh tế mỗi ngày.
              </p>
            </div>

            <div className="relative z-10 pt-10">
              <p className="text-xs text-stone-400 italic">Đã có tài khoản?</p>
              <Link to="/login" className="mt-2 inline-block text-orange-400 font-bold hover:text-orange-300 transition-colors underline underline-offset-4">
                Đăng nhập ngay
              </Link>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Cột phải: Form đăng ký */}
          <div className="md:w-7/12 p-8 md:p-12">
            <h2 className="text-2xl font-serif font-bold text-[#2d1b0f] mb-8">Tạo tài khoản mới</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className={labelClass}>Tên đăng nhập</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                      <FaUser size={14} />
                    </span>
                    <input 
                      type="text" 
                      placeholder="username123"
                      className={inputClass}
                      value={this.state.txtUsername} 
                      onChange={(e) => this.setState({ txtUsername: e.target.value })} 
                    />
                  </div>
                </div>

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

              {/* ... Các trường Name, Phone, Email giữ nguyên như code trước của bạn ... */}
              <div className="relative">
                <label className={labelClass}>Họ và tên</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                    <FaIdCard size={14} />
                  </span>
                  <input type="text" placeholder="Nguyễn Văn A" className={inputClass} value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} />
                </div>
              </div>

              <div className="relative">
                <label className={labelClass}>Số điện thoại</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                    <FaPhone size={14} />
                  </span>
                  <input type="tel" placeholder="0901 234 567" className={inputClass} value={this.state.txtPhone} onChange={(e) => this.setState({ txtPhone: e.target.value })} />
                </div>
              </div>

              <div className="relative">
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                    <FaEnvelope size={14} />
                  </span>
                  <input type="email" placeholder="coffee@example.com" className={inputClass} value={this.state.txtEmail} onChange={(e) => this.setState({ txtEmail: e.target.value })} />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={(e) => this.btnSignupClick(e)}
                  className="w-full bg-[#442c1e] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#5d3f2d] shadow-lg shadow-stone-200 transition-all active:scale-[0.98] uppercase tracking-widest"
                >
                  Bắt đầu thưởng thức
                </button>
              </div>
              
              {/* NÚT CHUYỂN ĐẾN TRANG ACTIVE (THÊM MỚI) */}
              <div className="text-center pt-4 border-t border-stone-100 mt-6">
                <p className="text-xs text-stone-400 italic mb-2">Đã nhận được mã xác thực qua Email?</p>
                <Link to="/active" className="text-[#442c1e] font-bold text-xs uppercase tracking-tighter hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                   Kích hoạt tài khoản ngay <FaExternalLinkAlt size={10} />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  btnSignupClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiSignup(account);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thông tin chưa đầy đủ',
        text: 'Vui lòng điền tất cả các trường để hoàn tất đăng ký.',
        confirmButtonColor: '#442c1e'
      });
    }
  }

  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      if (result.success || result.message.toLowerCase().includes("success")) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Vui lòng kiểm tra email để lấy mã xác thực.',
          showCancelButton: true,
          confirmButtonText: 'Đến trang Kích hoạt',
          cancelButtonText: 'Để sau',
          confirmButtonColor: '#442c1e',
          cancelButtonColor: '#d33',
        }).then((res) => {
          // NẾU NGƯỜI DÙNG BẤM "ĐẾN TRANG KÍCH HOẠT"
          if (res.isConfirmed) {
            this.props.navigate('/active');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại',
          text: result.message,
          confirmButtonColor: '#442c1e'
        });
      }
    });
  }
}

export default withRouter(Signup);