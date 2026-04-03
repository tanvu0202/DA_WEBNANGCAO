import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineZoomOutMap, MdOutlineLocalShipping, MdVerifiedUser } from "react-icons/md";

Modal.setAppElement("#root");

class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
      isModalOpen: false,
      modalImage: "",
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
    window.scrollTo(0, 0);
  }

  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      this.setState({ product: res.data });
    });
  }

  btnAdd2CartClick = (e) => {
    e.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);
    
    if (quantity > 0) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id);
      if (index === -1) {
        mycart.push({ product: product, quantity: quantity });
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart([...mycart]);
      
      Swal.fire({
        title: "Tuyệt vời!",
        text: `Đã thêm ${quantity} ${product.name} vào giỏ hàng`,
        icon: "success",
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }

  increment = () => this.setState({ txtQuantity: this.state.txtQuantity + 1 });
  decrement = () => this.setState({ txtQuantity: Math.max(1, this.state.txtQuantity - 1) });

  openModal = (image) => this.setState({ isModalOpen: true, modalImage: image });
  closeModal = () => this.setState({ isModalOpen: false, modalImage: "" });

  render() {
    const { product, txtQuantity, isModalOpen, modalImage } = this.state;
    if (!product) return (
      <div className="flex justify-center items-center h-96 text-stone-400 animate-pulse font-serif">
        Đang chuẩn bị hương vị...
      </div>
    );

    return (
      <div className="bg-[#fffcf9] min-h-screen pb-20 animate__animated animate__fadeIn">
        <div className="container-80 pt-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-8">
            <span className="hover:text-orange-600 cursor-pointer transition-colors">Trang chủ</span>
            <span className="mx-3 text-stone-300">/</span>
            <span className="hover:text-orange-600 cursor-pointer transition-colors">{product.category.name}</span>
            <span className="mx-3 text-stone-300">/</span>
            <span className="text-stone-600 font-bold">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 bg-white rounded-[3rem] p-8 lg:p-16 shadow-xl shadow-stone-200/50 border border-stone-100">
            
            {/* Cột trái: Hình ảnh */}
            <div className="lg:w-1/2 relative group">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-stone-50 border border-stone-100 shadow-inner">
                <img
                  src={"data:image/jpg;base64," + product.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={product.name}
                />
              </div>
              <button 
                onClick={() => this.openModal("data:image/jpg;base64," + product.image)}
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur shadow-lg p-4 rounded-2xl text-[#442c1e] hover:bg-[#442c1e] hover:text-white transition-all transform active:scale-90"
              >
                <MdOutlineZoomOutMap size={24} />
              </button>
            </div>

            {/* Cột phải: Thông tin */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="mb-6">
                <span className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                  Sản phẩm bán chạy
                </span>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#2d1b0f] leading-tight mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-orange-700 font-sans">
                  {product.price.toLocaleString()} <span className="text-sm">₫</span>
                </p>
              </div>

              <div className="w-16 h-1 bg-orange-400 rounded-full mb-8"></div>

              <p className="text-stone-500 leading-relaxed mb-8 text-sm italic">
                Tận hưởng hương vị tinh túy được tuyển chọn từ những hạt cà phê chất lượng nhất. 
                Công thức pha chế độc quyền của Next Coffee mang đến trải nghiệm khó quên.
              </p>

              {/* Bộ chọn số lượng & Nút đặt hàng */}
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center bg-white border border-stone-200 rounded-full p-1 shadow-sm w-fit transition-all hover:border-orange-200">
                  {/* Nút Giảm */}
                  <button 
                    onClick={this.decrement} 
                    className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-orange-600 active:scale-90 transition-all duration-200"
                  >
                    {/* Thay bằng FaMinus nhìn sẽ chuyên nghiệp hơn Chevron */}
                    <span className="font-bold">−</span> 
                  </button>

                  {/* Số lượng */}
                  <input
                    type="text"
                    readOnly
                    value={txtQuantity}
                    className="w-10 text-center bg-transparent font-bold text-[#4B2E2B] text-sm focus:outline-none select-none"
                  />

                  {/* Nút Tăng */}
                  <button 
                    onClick={this.increment} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4B2E2B] text-white hover:bg-orange-600 active:scale-90 transition-all duration-200 shadow-sm"
                  >
                    <span className="font-bold">+</span>
                  </button>
                </div>

                <button
                  onClick={this.btnAdd2CartClick}
                  className="flex-1 min-w-[200px] bg-[#2d1b0f] text-white py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#442c1e] shadow-lg shadow-stone-300 transition-all active:scale-95 uppercase text-xs tracking-widest"
                >
                  <FaCartPlus size={18} />
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-stone-100">
                <div className="flex items-center gap-3 text-stone-400 text-[11px] font-medium uppercase tracking-tighter">
                  <MdOutlineLocalShipping size={20} className="text-orange-600" />
                  Giao hàng trong 30 phút
                </div>
                <div className="flex items-center gap-3 text-stone-400 text-[11px] font-medium uppercase tracking-tighter">
                  <MdVerifiedUser size={20} className="text-orange-600" />
                  Đảm bảo vệ sinh ATTP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Zoom hiện đại */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
          overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9998]"
        >
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <button
              className="absolute top-0 right-0 text-white text-4xl p-4 hover:text-orange-500 transition-colors"
              onClick={this.closeModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate__animated animate__zoomIn"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ProductDetail);