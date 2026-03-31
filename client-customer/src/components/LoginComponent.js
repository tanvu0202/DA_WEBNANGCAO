import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import Swal from 'sweetalert2';

class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      rememberMe: false,
      emailError: '',
      passwordError: '',
      formError: '',
    };
  }

  validateEmail = (email) => email.length > 0;
  validatePassword = (password) => password.length > 0;

  handleEmailChange = (e) => {
    this.setState({ 
      txtUsername: e.target.value,
      formError: '', 
      emailError: this.validateEmail(e.target.value) ? '' : 'Tài khoản không được để trống.' 
    });
  };

  handlePasswordChange = (e) => {
    this.setState({ 
      txtPassword: e.target.value,
      formError: '', 
      passwordError: this.validatePassword(e.target.value) ? '' : 'Mật khẩu không được để trống.' 
    });
  };

  handleRememberMeChange = (e) => {
    this.setState({ rememberMe: e.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, emailError, passwordError } = this.state;

    if (emailError || passwordError || !txtUsername || !txtPassword) {
      this.setState({ formError: 'Vui lòng điền đầy đủ thông tin đăng nhập.' });
      return;
    }

    const account = { username: txtUsername, password: txtPassword };
    this.apiLogin(account);
  };

  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        Swal.fire({
          icon: "success",
          title: "Chào mừng bạn trở lại!",
          text: "Chúc bạn một ngày tràn đầy năng lượng với Next Coffee",
          showConfirmButton: false,
          timer: 2000,
          iconColor: '#442c1e'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: result.message,
          confirmButtonColor: '#442c1e'
        });
      }
    });
  }

  render() {
    const { txtUsername, txtPassword, rememberMe, emailError, passwordError, formError } = this.state;

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#fffcf9] py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-[#442c1e] tracking-tight">
              ĐĂNG NHẬP
            </h2>
            <p className="mt-2 text-sm text-stone-500 italic">
              Hương vị cà phê đang chờ đợi bạn
            </p>
            <div className="w-12 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#442c1e] mb-2 ml-1">
                  Tài khoản hoặc Email
                </label>
                <input
                  type="text"
                  id="email"
                  className={`block w-full px-4 py-3 border rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                    emailError ? 'border-red-300 bg-red-50' : 'border-stone-200 bg-stone-50 focus:border-orange-400'
                  }`}
                  placeholder="Nhập tài khoản của bạn"
                  value={txtUsername}
                  onChange={this.handleEmailChange}
                />
                {emailError && <p className="mt-1 text-xs text-red-500 ml-2 italic">{emailError}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-[#442c1e] mb-2 ml-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className={`block w-full px-4 py-3 border rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-100 ${
                    passwordError ? 'border-red-300 bg-red-50' : 'border-stone-200 bg-stone-50 focus:border-orange-400'
                  }`}
                  placeholder="••••••••"
                  value={txtPassword}
                  onChange={this.handlePasswordChange}
                />
                {passwordError && <p className="mt-1 text-xs text-red-500 ml-2 italic">{passwordError}</p>}
              </div>
            </div>

            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center font-medium border border-red-100 animate-pulse">
                {formError}
              </div>
            )}

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 text-orange-600 border-stone-300 rounded focus:ring-orange-500 accent-orange-600"
                  checked={rememberMe}
                  onChange={this.handleRememberMeChange}
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-stone-600 cursor-pointer select-none">
                  Ghi nhớ tôi
                </label>
              </div>
              <a href="/quen-mat-khau" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                Quên mật khẩu?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-[#442c1e] hover:bg-[#5d3f2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#442c1e] transition-all duration-300 active:scale-95"
              >
                ĐĂNG NHẬP NGAY
              </button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-stone-500">
              Chưa có tài khoản?{' '}
              <a href="/dang-ky" className="font-bold text-[#442c1e] hover:underline decoration-orange-400 decoration-2 underline-offset-4">
                Đăng ký miễn phí
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);