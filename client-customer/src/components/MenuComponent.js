import axios from 'axios';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import logo from '../asset/img/logo.jpg';
import { FaSearch, FaShoppingCart, FaThList } from 'react-icons/fa';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
    };
  }
  static contextType = MyContext;

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      this.setState({ categories: res.data });
    });
  }

  btnSearchClick = (e) => {
    e.preventDefault();
    if (!this.state.txtKeyword) {
      Swal.fire({ 
        icon: 'info', 
        title: 'Tìm kiếm', 
        text: 'Bạn muốn thưởng thức món gì?', 
        confirmButtonColor: '#4B2E2B' 
      });
      return;
    }
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  };

  render() {
    const { categories } = this.state;

    return (
      <>
        {/* HEADER */}
        <header className="sticky top-0 w-full h-20 bg-white shadow-sm z-[100] flex items-center border-b border-stone-100 px-6">
          <div className="flex items-center justify-between w-full gap-8">
            {/* Logo */}
            <Link to='/' className="flex items-center gap-2 min-w-[150px]">
              <img className="h-10 w-10 rounded-full object-cover border border-stone-100" src={logo} alt="Logo" />
              <span className="text-xl font-serif font-bold text-[#2d1b0f]">NextCoffee.</span>
            </Link>

            {/* Search Bar - Ép buộc bo góc bằng dấu ! */}
            <form className="flex-1 max-w-xl relative group" onSubmit={this.btnSearchClick}>
              <input
                type="text"
                /* Sử dụng !rounded-full để ép buộc bo tròn tuyệt đối */
                className="w-full bg-stone-50 border border-stone-200 !rounded-full py-2.5 pl-6 pr-12 focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-md text-sm transition-all duration-300"
                placeholder="Tìm kiếm hương vị cà phê của bạn..."
                value={this.state.txtKeyword}
                onChange={(e) => this.setState({ txtKeyword: e.target.value })}
                style={{ borderRadius: '9999px' }} /* Thêm style inline làm "bảo hiểm" cuối cùng */
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#4B2E2B] w-9 h-9 flex items-center justify-center !rounded-full text-white hover:bg-orange-600 hover:scale-105 transition-all shadow-sm"
                style={{ borderRadius: '50%' }}
              >
                <FaSearch size={13} />
              </button>
            </form>

            {/* Cart & Links */}
            <div className="flex items-center gap-6">
              <NavLink 
                to="/products" 
                className={({isActive}) => isActive ? "text-orange-600 font-bold text-sm" : "text-stone-600 hover:text-orange-600 text-sm font-medium"}
              >
                Sản phẩm
              </NavLink>
              
              <Link to='/mycart' className="relative p-2 bg-stone-50 rounded-full border border-stone-100 hover:bg-orange-50 transition-colors">
                <FaShoppingCart size={20} className="text-[#4B2E2B]" />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {this.context.mycart ? this.context.mycart.length : 0}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* SIDEBAR */}
        <aside className="fixed left-0 top-0 pt-[120px] bottom-0 w-64 bg-white border-r border-stone-100 z-[90] overflow-y-auto px-4 hidden md:block">
          <div className="flex items-center gap-2 text-[#4B2E2B] mb-6 px-2 opacity-70">
            <FaThList size={14} />
            <span className="text-[15px] font-bold uppercase tracking-widest">Danh mục</span>
          </div>
          
          <ul className="space-y-1">
            {categories.map((item) => (
              <li key={item._id}>
                <NavLink 
                  to={'/product/category/' + item._id}
                  className={({isActive}) => `
                    flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-orange-50 text-orange-700 border-r-4 border-orange-500 shadow-sm' 
                      : 'text-stone-600 hover:bg-stone-50 hover:text-[#4B2E2B]'}
                  `}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </>
    );
  }
}

export default withRouter(Menu);