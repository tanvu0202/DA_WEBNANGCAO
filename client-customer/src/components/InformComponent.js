import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaUnlockAlt } from 'react-icons/fa'; 
import { Modal, Input, Button, Dropdown, Menu, Avatar } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const Inform = () => {
  const context = useContext(MyContext);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    txtUsername: '',
    txtPassword: '',
    txtName: '',
    txtPhone: '',
    txtEmail: ''
  });

  const coffeeTheme = {
    primary: '#442c1e',
    accent: '#d97706',
    bg: '#fffcf9'
  };

  // --- Điều hướng & Đóng Modal ---
  const goToActive = () => {
    setIsLoginModalVisible(false);
    setIsSignupModalVisible(false);
    navigate('/active');
  };

  // --- Xử lý Đăng nhập ---
  const handleLogin = () => {
    if (username && password) {
      const account = { username: username, password: password };
      axios.post('/api/customer/login', account).then((res) => {
        const result = res.data;
        if (result.success) {
          context.setToken(result.token);
          context.setCustomer(result.customer);
          setIsLoginModalVisible(false);
          Swal.fire({ icon: 'success', title: 'Chào mừng quay lại!', showConfirmButton: false, timer: 1500 });
        } else {
          Swal.fire({ 
            icon: 'error', 
            title: 'Thất bại', 
            text: result.message, 
            showCancelButton: true,
            confirmButtonText: 'Thử lại',
            cancelButtonText: 'Kích hoạt ngay',
            confirmButtonColor: coffeeTheme.primary,
            cancelButtonColor: coffeeTheme.accent
          }).then((res) => {
              if (res.isDismissed && res.dismiss === Swal.DismissReason.cancel) {
                  goToActive();
              }
          });
        }
      });
    } else {
      Swal.fire({ icon: 'warning', title: 'Thông báo', text: 'Vui lòng nhập đầy đủ thông tin', confirmButtonColor: coffeeTheme.primary });
    }
  };

  // --- Xử lý Đăng ký (Đã sửa lỗi undefined) ---
  const handleSignup = (e) => {
    e.preventDefault(); // Ngăn load lại trang
    const account = {
      username: signupData.txtUsername,
      password: signupData.txtPassword,
      name: signupData.txtName,
      phone: signupData.txtPhone,
      email: signupData.txtEmail
    };
    
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      if (result.success) {
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Vui lòng kiểm tra email để nhận mã kích hoạt.',
          icon: 'success',
          confirmButtonText: 'Đến trang Kích hoạt',
          confirmButtonColor: coffeeTheme.primary,
        }).then(() => {
          setIsSignupModalVisible(false);
          navigate('/active');
        });
      } else {
        Swal.fire({ title: 'Thất bại', text: result.message, icon: 'error' });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const userMenu = (
    <Menu className="rounded-xl shadow-xl border border-stone-100 p-2">
      <Menu.Item key="0"><Link to="/myprofile">Trang cá nhân</Link></Menu.Item>
      <Menu.Item key="1"><Link to="/myorders">Đơn hàng</Link></Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => context.setToken('')} className="text-red-500 font-bold">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    /* fixed top-0 để dính lên đầu trang, z-[110] để nằm trên Sidebar */
    <div className="fixed top-0 left-0 right-0 bg-[#442c1e] text-white shadow-md z-[110] h-10 flex items-center">
      <div className="flex justify-between items-center container mx-auto px-6 w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MdEmail size={14} className="text-stone-400" />
            <span className="text-[11px] font-light tracking-wider">NextCoffee@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 border-l border-stone-600 pl-6">
            <MdPhone size={14} className="text-stone-400" />
            <span className="text-[11px] font-light tracking-wider">0823 433 917</span>
          </div>
        </div>

        <div className="flex items-center">
          {context.token === '' ? (
            <div className='text-[10px] font-bold tracking-widest uppercase flex gap-4'>
              <span className='cursor-pointer hover:text-orange-400 transition-all' onClick={() => setIsLoginModalVisible(true)}>Đăng nhập</span>
              <span className="text-stone-600">|</span>
              <span className='cursor-pointer hover:text-orange-400 transition-all' onClick={() => setIsSignupModalVisible(true)}>Đăng ký</span>
            </div>
          ) : (
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer bg-white/10 px-3 py-1 rounded-full border border-white/5">
                <Avatar size="small" className="bg-orange-600 text-[10px] uppercase font-bold">
                  {context.customer.name.charAt(0)}
                </Avatar>
                <span className="text-[10px] font-bold uppercase">Chào, {context.customer.name}</span>
              </div>
            </Dropdown>
          )}
        </div>
      </div>

      {/* --- LOGIN MODAL --- */}
      <Modal title="Thành Viên Đăng Nhập" open={isLoginModalVisible} onCancel={() => setIsLoginModalVisible(false)} footer={null} centered width={380}>
        <div className="space-y-4 pt-4">
          <Input prefix="@" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl py-2" />
          <Input.Password placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl py-2" />
          <Button block className='bg-[#442c1e] text-white h-11 rounded-xl font-bold' onClick={handleLogin}>ĐĂNG NHẬP</Button>
          <div className="text-center pt-2">
            <button onClick={goToActive} className="text-orange-700 font-bold text-[11px] uppercase flex items-center justify-center gap-2 mx-auto italic">
               Kích hoạt ngay <FaUnlockAlt size={10} />
            </button>
          </div>
        </div>
      </Modal>

      {/* --- SIGNUP MODAL --- */}
      <Modal title="Thành Viên Mới" open={isSignupModalVisible} onCancel={() => setIsSignupModalVisible(false)} footer={null} width={400} centered>
        <form className="space-y-3 pt-4" onSubmit={handleSignup}>
          <Input placeholder="Tên tài khoản *" name="txtUsername" onChange={handleInputChange} className="rounded-xl" required />
          <Input.Password placeholder="Mật khẩu *" name="txtPassword" onChange={handleInputChange} className="rounded-xl" required />
          <Input placeholder="Họ và tên *" name="txtName" onChange={handleInputChange} className="rounded-xl" required />
          <Input placeholder="Số điện thoại *" name="txtPhone" onChange={handleInputChange} className="rounded-xl" required />
          <Input placeholder="Địa chỉ email *" type="email" name="txtEmail" onChange={handleInputChange} className="rounded-xl" required />
          <Button block className='bg-orange-600 text-white h-11 rounded-xl font-bold border-none mt-2' htmlType="submit">HOÀN TẤT ĐĂNG KÝ</Button>
          <div className="text-center text-[10px] pt-2">
            <span className="text-stone-400">Đã có mã xác thực? </span>
            <span onClick={goToActive} className="font-bold text-[#442c1e] cursor-pointer hover:underline uppercase">Kích hoạt tại đây</span>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inform;