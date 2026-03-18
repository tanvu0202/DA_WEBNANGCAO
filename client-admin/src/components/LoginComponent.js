import axios from 'axios';
import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import MyContext from '../contexts/MyContext';
import loginImage from '.././assets/imgs/login.svg';

const Login = () => {
  const { token, setToken, setUsername } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  const btnLoginClick = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      apiLogin(account);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please input both username and password',
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
          title: 'Login Successful',
          text: 'Welcome back!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: result.message,
        });
      }
    });
  };

  if (token === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
          <div className="md:w-1/2 bg-white hidden md:flex items-center justify-center">
            <img src={loginImage} alt="Login" className="object-cover w-full h-full p-3" />
          </div>

          <div className="md:w-1/2 bg-white p-8 md:py-32 md:px-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
            <form onSubmit={btnLoginClick} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="username" className="text-gray-600 font-semibold">Username</label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="text-gray-600 font-semibold">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  value={txtPassword}
                  onChange={(e) => setTxtPassword(e.target.value)}
                />
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full bg-[#21499a] hover:bg-[#213c73] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
};

export default Login;
