import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import MyContext from '../contexts/MyContext';
// Bác nên thay ảnh login.svg bằng một ảnh quán cafe để đẹp hơn nhé
import loginImage from '.././assets/imgs/login.png'; 

const Login = () => {
  const { token, setToken, setUsername } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  // Thay đổi tiêu đề trang (Tab Title)
  useEffect(() => {
    document.title = "Next Coffee - Hệ thống Quản lý";
  }, []);

  const btnLoginClick = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      apiLogin(account);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Bác vui lòng nhập đầy đủ tên đăng nhập và mật khẩu nhé!',
        confirmButtonColor: '#6F4E37', // Màu nâu cafe
      });
    }
  };

  const apiLogin = (account) => {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        setToken(result.token);
        setUsername(account.username);
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: 'Chào mừng bạn trở lại với Next Coffee!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: result.message,
          confirmButtonColor: '#6F4E37',
        });
      }
    });
  };

  if (token === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfaf7]"> {/* Nền màu kem nhạt */}
        <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl border border-gray-100">
          
          {/* Cột bên trái: Hình ảnh */}
          <div className="md:w-1/2 bg-[#6F4E37] hidden md:flex items-center justify-center">
            <div className="text-center p-10">
              <img src={loginImage} alt="Coffee Login" className="w-64 h-64 mb-6 mx-auto opacity-90" />
              <h1 className="text-white text-3xl font-serif font-bold">Next Coffee</h1>
              <p className="text-orange-100 mt-2 italic">Hương vị đậm đà, quản lý chuyên nghiệp</p>
            </div>
          </div>

          {/* Cột bên phải: Form đăng nhập */}
          <div className="md:w-1/2 bg-white p-8 md:py-24 md:px-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#3d2b1f] uppercase tracking-wider">Quản trị viên</h2>
              <div className="w-16 h-1 bg-[#6F4E37] mx-auto mt-2"></div>
            </div>

            <form onSubmit={btnLoginClick} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="username" className="text-gray-700 font-semibold flex items-center">
                   Tên đăng nhập
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nhập tài khoản..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent focus:outline-none transition-all"
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-gray-700 font-semibold">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent focus:outline-none transition-all"
                  value={txtPassword}
                  onChange={(e) => setTxtPassword(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#6F4E37] hover:bg-[#5a3e2b] text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
                >
                  ĐĂNG NHẬP HỆ THỐNG
                </button>
              </div>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-500">
              © 2026 Next Coffee Management System
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
};

export default Login;