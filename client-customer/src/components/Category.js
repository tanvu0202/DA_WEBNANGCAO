import React, { Component } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: true,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { categories } = this.props;

    return (
      <div className="w-64 bg-primary cursor-pointer">
        <div className="flex flex-col justify-between flex-1">
          <nav>
            <div
              className="py-3 px-4 text-[15px] uppercase text-[#f1f1f1] font-semiboldcursor-pointer flex items-center justify-between"
              onClick={this.toggleDropdown}
            >
              <FaBars /> Danh mục sản phẩm
              <span
                className={`inline-block ml-2 transform transition-transform ${
                  this.state.dropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <MdExpandMore className="text-base" />
              </span>
            </div>
            {this.state.dropdownOpen && (
              <div className="duration-500 transition-all bg-white shadow-lg text-accent text-[13px]">
                {categories.map((item) => (
                  <Link
                    key={item._id}
                    className="block py-[9px] transition-all px-4 duration-300 hover:text-secondary border-b border-[#e4e4e4] text-sm"
                    to={'/product/category/' + item._id}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

export default Category;
