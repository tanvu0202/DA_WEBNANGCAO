import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import logo from '../asset/img/logo.jpg';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';
import Category from './Category'; // Import the Category component
import CarouselComponent from './CarouselComponent/CarouselComponent';

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

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  btnSearchClick = (e) => {
    e.preventDefault();
    if (!this.state.txtKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi',
        text: 'Vui lòng nhập tên sản phẩm cần tìm',
        confirmButtonColor: '#21499a'
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
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="py-3">
        <div className="flex items-center justify-between container-80">
          <div className="logo h-[50px] flex items-center text-gray-700 text-[22px] font-bold gap-2">
            <img className="h-full w-16" src={logo} alt="Logo" />
            <Link to='/'>
              <p className="tracking-wide">
                HHK<span className="text-[#7f13c4]">.Store/Book</span>
              </p>
              <p className="text-[13.5px] text-accent font-medium italic font-sans leading-none">Tôi bán tri thức</p>
            </Link>
          </div>

          <div className="flex justify-center items-center w-1/2">
            <form className="relative w-full" onSubmit={this.btnSearchClick}>
              <input
                type="search"
                className="w-full border-2 border-primary rounded py-4 pl-4 pr-10 focus:outline-none focus:border-primary text-accent text-xs placeholder:text-[13px]"
                placeholder="Tìm kiếm sản phẩm ..."
                value={this.state.txtKeyword}
                onChange={(e) => this.setState({ txtKeyword: e.target.value })}
              />
              <button type="submit" className="absolute right-0 top-1 mt-2 mr-3 text-gray-700">
                <FaSearch />
              </button>
            </form>
          </div>
          
          <div className="relative flex items-center">
            <Link to='/mycart' className="flex items-center text-gray-700">
              <span className="mr-1 text-sm text-primary">Giỏ hàng</span>
              <FaShoppingCart size={20} className="text-primary mr-1" />
              <span className="absolute top-[8px] -right-2 text-[#7f13c4] rounded-full h-5 w-5 flex items-center justify-center text-sm font-semibold">
                {this.context.mycart.length}
              </span>
            </Link>
          </div>  
        </div>
        <div className="bg-[#f2f2f2] h-[47px] mt-6">
          <div className="container-80 flex uppercase gap-5 text-[#404040] text-sm">
            <Category categories={categories} />
            {/* Other elements */}
            <Link to='/products' className='hover:text-primary transition-all duration-300 mt-[14px] font-medium font-sans'>Tất cả sản phẩm</Link>
            <Link to='/introduction' className='hover:text-primary transition-all duration-300 mt-[14px] font-medium font-sans'>GIỚI THIỆU</Link>
            <Link to='/contact' className='hover:text-primary transition-all duration-300 mt-[14px] font-medium font-sans'>LIÊN HỆ</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
