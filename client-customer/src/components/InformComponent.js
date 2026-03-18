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
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    txtUsername: '',
    txtPassword: '',
    txtName: '',
    txtPhone: '',
    txtEmail: ''
  });

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const showSignupModal = () => {
    setIsSignupModalVisible(true);
  };

  const handleLoginCancel = () => {
    setIsLoginModalVisible(false);
  };

  const handleSignupCancel = () => {
    setIsSignupModalVisible(false);
  };

  const handleLogin = () => {
    if (username && password) {
      const account = { username, password };
      apiLogin(account);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Please input username and password',
        confirmButtonText: 'OK'
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
        showConfirmButton: false
      });
      return;
    }

    const account = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
    apiSignup(account);
  };

  const apiLogin = (account) => {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        context.setToken(result.token);
        context.setCustomer(result.customer);
        setIsLoginModalVisible(false);
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: result.message,
          confirmButtonText: 'OK'
        });
      }
    });
  };

  const apiSignup = (account) => {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      if (result.success) {
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Vui lòng kiểm tra email của bạn để kích hoạt tài khoản.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy bỏ',
          confirmButtonColor: '#21499a',
          cancelButtonColor: '#FF0000',
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('https://mail.google.com', '_blank');
          }
          setIsSignupModalVisible(false);
          navigate('/active')
        });
      } else {
        Swal.fire({
          title: 'Đăng ký thất bại',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Đăng ký thất bại',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/myprofile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/myorders">My Orders</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => context.setToken('')}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center py-2 container-80">
      <li className="flex">
        <ul id="header-contact" className="flex items-center gap-3">
          <li className="">
            <a href="mailto:hhk.cybersecurity@gmail.com" className="flex items-center text-accent gap-1">
              <MdEmail size={18} />
              <span className="text-[.8em]">hhk.cybersecurity@gmail.com</span>
            </a>
          </li>
          <div className="">
            <div className="h-[15px] w-px bg-gray-300"></div>
          </div>
          <li className="">
            <a href="tel:0313728397" className="flex items-center gap-1 text-accent">
              <MdPhone size={18} />
              <span className="text-[.8em]">0313728397</span>
            </a>
          </li>
        </ul>
      </li>
      <div className="">
        {context.token === '' ?
          <div className='text-[.8em] text-accent'>
            <span className='tracking-wide hover:text-secondary transition-all duration-300 cursor-pointer' onClick={showLoginModal}>Đăng nhập</span> / 
            <span className='tracking-wide hover:text-secondary transition-all duration-300 cursor-pointer' onClick={showSignupModal}>Đăng ký</span>
          </div>
          :
          <Dropdown overlay={userMenu} trigger={['click']}>
            <span className="ant-dropdown-link cursor-pointer">
              <Avatar><p className='uppercase'>{context.customer.name.charAt(0)}</p></Avatar> <b>{context.customer.name.slice(1)}</b>
            </span>
          </Dropdown>
        }
      </div>

      <Modal title="Đăng nhập" visible={isLoginModalVisible} onCancel={handleLoginCancel} footer={null}>
        <Input 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ marginBottom: '1rem' }} 
        />
        <Input.Password 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ marginBottom: '1rem' }} 
        />
        <Button className='bg-primary text-white font-medium hover:text-white text-base' onClick={handleLogin} block>
          Đăng nhập
        </Button>
      </Modal>

      <Modal title="Đăng ký" visible={isSignupModalVisible} onCancel={handleSignupCancel} footer={null}>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="txtUsername" className="block text-sm font-bold text-[#222] mb-2">
              Tên tài khoản *
            </label>
            <Input
              type="text"
              id="txtUsername"
              name="txtUsername"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={signupData.txtUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="txtPassword" className="block text-sm font-bold text-[#222] mb-2">
              Mật khẩu *
            </label>
            <Input.Password
              id="txtPassword"
              name="txtPassword"
              className="w-full px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={signupData.txtPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="txtName" className="block text-sm font-bold text-[#222] mb-2">
              Họ và tên *
            </label>
            <Input
              type="text"
              id="txtName"
              name="txtName"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={signupData.txtName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="txtPhone" className="block text-sm font-bold text-[#222] mb-2">
              Số điện thoại *
            </label>
            <Input
              type="tel"
              id="txtPhone"
              name="txtPhone"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={signupData.txtPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="txtEmail" className="block text-sm font-bold text-[#222] mb-2">
              Địa chỉ email *
            </label>
            <Input
              type="email"
              id="txtEmail"
              name="txtEmail"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={signupData.txtEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button className='bg-primary text-white font-medium hover:text-white text-base w-full' htmlType="submit">
            Đăng ký
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Inform;
