import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { MdEmail, MdPhone } from 'react-icons/md';
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

  // --- Style Helpers ---
  const coffeeTheme = {
    primary: '#442c1e', // Nâu đậm
    accent: '#d97706',  // Cam cháy
    bg: '#fffcf9'       // Kem nhạt
  };

  const showLoginModal = () => setIsLoginModalVisible(true);
  const showSignupModal = () => setIsSignupModalVisible(true);
  const handleLoginCancel = () => setIsLoginModalVisible(false);
  const handleSignupCancel = () => setIsSignupModalVisible(false);

  const handleLogin = () => {
    if (username && password) {
      apiLogin({ username, password });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu',
        confirmButtonColor: coffeeTheme.primary
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = signupData;
    if (!txtUsername || !txtPassword || !txtName || !txtPhone || !txtEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Bạn chưa nhập đầy đủ thông tin.',
        confirmButtonColor: coffeeTheme.primary
      });
      return;
    }
    apiSignup({ username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail });
  };

  const apiLogin = (account) => {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        context.setToken(result.token);
        context.setCustomer(result.customer);
        setIsLoginModalVisible(false);
        Swal.fire({ icon: 'success', title: 'Chào mừng bạn quay lại!', showConfirmButton: false, timer: 1500 });
      } else {
        Swal.fire({ icon: 'error', title: 'Thất bại', text: result.message, confirmButtonColor: coffeeTheme.primary });
      }
    });
  };

  const apiSignup = (account) => {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      if (result.success) {
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Vui lòng kiểm tra email để kích hoạt tài khoản.',
          icon: 'success',
          confirmButtonText: 'Mở Email',
          confirmButtonColor: coffeeTheme.primary,
        }).then((res) => {
          if (res.isConfirmed) window.open('https://mail.google.com', '_blank');
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
      <Menu.Item key="0" className="hover:bg-stone-50 rounded-lg">
        <Link to="/myprofile" className="font-medium text-stone-700">Trang cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="1" className="hover:bg-stone-50 rounded-lg">
        <Link to="/myorders" className="font-medium text-stone-700">Đơn hàng của tôi</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => context.setToken('')} className="text-red-500 hover:bg-red-50 rounded-lg font-bold">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-[#442c1e] text-white"> {/* Thanh thông báo trên cùng màu nâu đậm */}
      <div className="flex justify-between items-center py-2 container-80">
        <div className="flex items-center gap-6">
          <a href="mailto:NextCoffee@gmail.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
            <MdEmail size={16} />
            <span className="text-xs tracking-wider">NextCoffee@gmail.com</span>
          </a>
          <div className="h-3 w-px bg-stone-500"></div>
          <a href="tel:0823433917" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
            <MdPhone size={16} />
            <span className="text-xs tracking-wider">0823 433 917</span>
          </a>
        </div>

        <div className="flex items-center">
          {context.token === '' ? (
            <div className='text-xs font-bold tracking-widest uppercase flex gap-4'>
              <span className='cursor-pointer hover:text-orange-400 transition-all' onClick={showLoginModal}>Đăng nhập</span>
              <span className="text-stone-500">|</span>
              <span className='cursor-pointer hover:text-orange-400 transition-all' onClick={showSignupModal}>Đăng ký</span>
            </div>
          ) : (
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all">
                <Avatar size="small" className="bg-orange-600 text-white uppercase font-bold">
                  {context.customer.name.charAt(0)}
                </Avatar>
                <span className="text-xs font-bold">Chào, {context.customer.name}</span>
              </div>
            </Dropdown>
          )}
        </div>
      </div>

      {/* --- LOGIN MODAL --- */}
      <Modal 
        title={<div className="text-center font-serif text-2xl text-[#442c1e]">Đăng Nhập</div>}
        visible={isLoginModalVisible} 
        onCancel={handleLoginCancel} 
        footer={null}
        centered
        className="coffee-modal"
      >
        <div className="p-2">
          <Input 
            prefix={<span className="text-stone-400 mr-2">@</span>}
            placeholder="Tên đăng nhập" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="rounded-full py-2 mb-4"
          />
          <Input.Password 
            placeholder="Mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="rounded-full py-2 mb-6"
          />
          <Button 
            className='bg-[#442c1e] text-white font-bold h-11 rounded-full hover:bg-orange-800 border-none' 
            onClick={handleLogin} 
            block
          >
            VÀO CỬA HÀNG
          </Button>
        </div>
      </Modal>

      {/* --- SIGNUP MODAL --- */}
      <Modal 
        title={<div className="text-center font-serif text-2xl text-[#442c1e]">Thành Viên Mới</div>}
        visible={isSignupModalVisible} 
        onCancel={handleSignupCancel} 
        footer={null}
        width={450}
        centered
      >
        <form className="space-y-4 p-2" onSubmit={handleSignup}>
          <Input placeholder="Tên tài khoản *" name="txtUsername" value={signupData.txtUsername} onChange={handleInputChange} className="rounded-lg py-2" required />
          <Input.Password placeholder="Mật khẩu *" name="txtPassword" value={signupData.txtPassword} onChange={handleInputChange} className="rounded-lg py-2" required />
          <Input placeholder="Họ và tên *" name="txtName" value={signupData.txtName} onChange={handleInputChange} className="rounded-lg py-2" required />
          <Input placeholder="Số điện thoại *" name="txtPhone" value={signupData.txtPhone} onChange={handleInputChange} className="rounded-lg py-2" required />
          <Input placeholder="Địa chỉ email *" type="email" name="txtEmail" value={signupData.txtEmail} onChange={handleInputChange} className="rounded-lg py-2" required />
          
          <Button 
            className='bg-orange-600 text-white font-bold h-11 rounded-full hover:bg-orange-700 border-none mt-4' 
            htmlType="submit" 
            block
          >
            HOÀN TẤT ĐĂNG KÝ
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Inform;