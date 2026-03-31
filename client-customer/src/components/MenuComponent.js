import axios from 'axios';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import logo from '../asset/img/logo.jpg';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';
import Category from './Category'; 

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      dropdownOpen: true
    };
  }
  static contextType = MyContext;

  btnSearchClick = (e) => {
    e.preventDefault();
    if (!this.state.txtKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Tìm kiếm',
        text: 'Bạn muốn thưởng thức món gì hôm nay?',
        confirmButtonColor: '#4B2E2B'
      });
      return;
    }
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      this.setState({ categories: res.data });
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="bg-white">
        {/* Upper Menu: Logo, Search, Cart */}
        <div className="py-5 flex items-center justify-between container-80">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to='/' className="flex items-center gap-3 group">
              <img className="h-12 w-12 rounded-full object-cover border-2 border-orange-100 group-hover:border-orange-400 transition-all shadow-sm" src={logo} alt="Logo" />
              <div>
                <p className="text-2xl font-serif font-bold text-[#2d1b0f] leading-none tracking-tight">
                  NextCoffee<span className="text-orange-600">.</span>
                </p>
                <p className="text-[11px] text-stone-400 font-medium uppercase tracking-[0.2em] mt-1">Premium Bean</p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Phong cách bo tròn hiện đại */}
          <div className="flex-1 max-w-xl mx-10">
            <form className="relative group" onSubmit={this.btnSearchClick}>
              <input
                type="search"
                className="w-full bg-stone-50 border border-stone-200 rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all text-sm placeholder:text-stone-400"
                placeholder="Tìm tên cà phê, bánh ngọt..."
                value={this.state.txtKeyword}
                onChange={(e) => this.setState({ txtKeyword: e.target.value })}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4B2E2B] p-2 rounded-full text-white hover:bg-orange-600 transition-colors shadow-md">
                <FaSearch size={14} />
              </button>
            </form>
          </div>
          
          {/* Cart Section */}
          <div className="flex items-center">
            <Link to='/mycart' className="group relative flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full hover:bg-orange-50 transition-all border border-stone-100">
              <div className="relative">
                <FaShoppingCart size={20} className="text-[#4B2E2B] group-hover:text-orange-600 transition-colors" />
                <span className="absolute -top-3 -right-3 bg-orange-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-bold shadow-lg ring-2 ring-white">
                  {this.context.mycart.length}
                </span>
              </div>
              <span className="text-sm font-bold text-[#4B2E2B] hidden md:block">Giỏ hàng</span>
            </Link>
          </div>   
        </div>

        {/* Lower Menu: Navigation & Categories */}
        <div className="border-t border-stone-100 shadow-sm overflow-x-auto">
          <div className="container-80 flex items-center h-14 space-x-8 whitespace-nowrap">
            <div className="border-r border-stone-200 pr-4 h-full flex items-center">
               <Category categories={categories} />
            </div>
            
            <nav className="flex items-center space-x-8 text-[13px] font-bold text-stone-600 tracking-widest">
              <NavLink to='/home' className={({isActive}) => `hover:text-orange-600 transition-all uppercase ${isActive ? 'text-orange-600' : ''}`}>Trang chủ</NavLink>
              <NavLink to='/products' className={({isActive}) => `hover:text-orange-600 transition-all uppercase ${isActive ? 'text-orange-600' : ''}`}>Sản phẩm</NavLink>
              <NavLink to='/introduction' className={({isActive}) => `hover:text-orange-600 transition-all uppercase ${isActive ? 'text-orange-600' : ''}`}>Giới thiệu</NavLink>
              <NavLink to='/contact' className={({isActive}) => `hover:text-orange-600 transition-all uppercase ${isActive ? 'text-orange-600' : ''}`}>Liên hệ</NavLink>
            </nav>

            <div className="flex-grow text-right hidden lg:block">
              <span className="text-[11px] italic text-stone-400 tracking-tighter">"Cà phê sạch cho ngày mới năng động"</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);