import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

const ProductDetail = (props) => {
  const context = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPrice, setTxtPrice] = useState('0');
  const [cmbCategory, setCmbCategory] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  
  // MỚI: Trạng thái đang xử lý để chống click nhiều lần
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGetCategories();
  }, []);

  useEffect(() => {
    if (props.item) {
      setTxtID(props.item._id);
      setTxtName(props.item.name);
      setTxtPrice(props.item.price ? props.item.price.toLocaleString() : '0');
      setCmbCategory(props.item.category?._id || '');
      setImgProduct('data:image/jpg;base64,' + props.item.image);
      setTxtDescription(props.item.description || '');
    } else {
      clearAllInputs();
    }
  }, [props.item]);

  useEffect(() => {
    if (!txtID && categories.length > 0 && !cmbCategory) {
      setCmbCategory(categories[0]._id);
    }
  }, [categories, txtID, cmbCategory]);

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      setCategories(res.data);
    });
  };

  const clearAllInputs = () => {
    setTxtID('');
    setTxtName('');
    setTxtPrice('0');
    setCmbCategory(categories.length > 0 ? categories[0]._id : '');
    setImgProduct('');
    setTxtDescription('');
    setLoading(false);
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setImgProduct(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = value ? Number(value).toLocaleString() : '0';
    setTxtPrice(formattedValue);
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    if (loading) return; // Nếu đang xử lý thì không cho bấm nữa

    // SỬA LỖI GIÁ: Xóa cả dấu chấm lẫn dấu phẩy trước khi chuyển thành số
    const price = Number(txtPrice.toString().replace(/\./g, '').replace(/,/g, ''));
    
    if (!txtName || !cmbCategory || !imgProduct) {
      Swal.fire('Cảnh báo', 'Vui lòng nhập đủ thông tin và ảnh!', 'warning');
      return;
    }

    const prod = {
      name: txtName,
      price: price,
      category: cmbCategory,
      image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''),
      description: txtDescription,
    };

    setLoading(true); // Bắt đầu xử lý

    if (txtID) {
      apiUpdateProduct(prod);
    } else {
      apiPostProduct(prod);
    }
  };

  const apiPostProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      setLoading(false);
      if (res.data && res.data.success !== false) {
        Swal.fire('Thành công', 'Đã thêm sản phẩm!', 'success');
        props.onSuccess(); 
        clearAllInputs();
      } else {
        Swal.fire('Lỗi', res.data.message || 'Thêm thất bại', 'error');
      }
    }).catch(() => {
      setLoading(false);
      Swal.fire('Lỗi', 'Kết nối server thất bại', 'error');
    });
  };

  const apiUpdateProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.put(`/api/admin/products/${txtID}`, prod, config).then((res) => {
      setLoading(false);
      if (res.data && res.data.success !== false) {
        Swal.fire('Thành công', 'Đã cập nhật!', 'success');
        props.onSuccess(); 
        clearAllInputs();
      }
    }).catch(() => setLoading(false));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-5">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Chi tiết sản phẩm</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ... (Các phần Input giữ nguyên) ... */}
        <div className="col-span-3">
          <label className="block text-gray-500 mb-2 font-medium">Tên sản phẩm</label>
          <input type="text" value={txtName} onChange={(e) => setTxtName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nhập tên xe..." />
        </div>

        <div>
          <label className="block text-gray-500 mb-2 font-medium">Giá (VNĐ)</label>
          <input type="text" value={txtPrice} onChange={handlePriceChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-gray-500 mb-2 font-medium">Danh mục</label>
          <select value={cmbCategory} onChange={(e) => setCmbCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
            {categories.map((cate) => (
              <option key={cate._id} value={cate._id}>{cate.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-3">
          <label className="block text-gray-500 mb-2 font-medium">Mô tả</label>
          <textarea value={txtDescription} onChange={(e) => setTxtDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" rows="3" />
        </div>

        <div className="col-span-3 flex flex-col md:flex-row md:space-x-4 items-center">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-500 mb-2 font-medium">Hình ảnh</label>
            <input type="file" accept="image/*" onChange={previewImage} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          {imgProduct && (
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <img src={imgProduct} alt="Preview" className="max-h-40 object-contain border border-gray-200 rounded-lg" />
            </div>
          )}
        </div>

        <div className="col-span-3 flex justify-end space-x-4 pt-4 border-t">
          {/* Nút bấm có hiệu ứng Loading */}
          <button 
            className={`${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white px-8 py-2 rounded-md font-bold transition duration-200`}
            onClick={btnAddClick}
            disabled={loading}
          >
            {loading ? 'ĐANG XỬ LÝ...' : (txtID ? 'CẬP NHẬT' : 'THÊM MỚI')}
          </button>
          
          {txtID && (
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600" onClick={(e) => { e.preventDefault(); props.onDelete(txtID); }}>
              XÓA
            </button>
          )}
          <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500" onClick={(e) => { e.preventDefault(); clearAllInputs(); }}>
            LÀM MỚI
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;