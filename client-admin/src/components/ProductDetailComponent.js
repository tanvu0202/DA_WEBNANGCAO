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
    if (loading) return;

    const price = Number(txtPrice.toString().replace(/\./g, '').replace(/,/g, ''));
    
    if (!txtName || !cmbCategory || !imgProduct) {
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Vui lòng nhập đủ thông tin và ảnh!',
        icon: 'warning',
        confirmButtonColor: '#8d6e63'
      });
      return;
    }

    const prod = {
      name: txtName,
      price: price,
      category: cmbCategory,
      image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''),
      description: txtDescription,
    };

    setLoading(true);

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
        props.onSuccess(); 
        clearAllInputs();
      }
    }).catch(() => setLoading(false));
  };

  const apiUpdateProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.put(`/api/admin/products/${txtID}`, prod, config).then((res) => {
      setLoading(false);
      if (res.data && res.data.success !== false) {
        props.onSuccess(); 
        clearAllInputs();
      }
    }).catch(() => setLoading(false));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#efebe9] animate__animated animate__fadeIn">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-px bg-[#efebe9] flex-grow"></div>
        <h2 className="text-xl font-bold text-[#5d4037] uppercase tracking-widest text-center">
          {txtID ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className="h-px bg-[#efebe9] flex-grow"></div>
      </div>

      <form className="space-y-5">
        {/* Row 1: Name */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">Product Name</label>
          <input 
            type="text" 
            value={txtName} 
            onChange={(e) => setTxtName(e.target.value)} 
            className="w-full p-3 border border-[#d7ccc8] rounded-xl focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent focus:outline-none transition-all placeholder-[#d7ccc8]" 
            placeholder="Coffee, tea, etc..." 
          />
        </div>

        {/* Row 2: Price & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">Price (VNĐ)</label>
            <input 
              type="text" 
              value={txtPrice} 
              onChange={handlePriceChange} 
              className="w-full p-3 border border-[#d7ccc8] rounded-xl focus:ring-2 focus:ring-[#8d6e63] font-mono text-[#8d6e63] font-bold" 
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">
              Category
            </label>
            <div className="relative">
              <select 
                value={cmbCategory} 
                onChange={(e) => setCmbCategory(e.target.value)} 
                className="w-full p-3 bg-white border border-[#d7ccc8] rounded-xl focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent outline-none appearance-none cursor-pointer transition-all text-[#5d4037] font-medium shadow-sm pr-10"
              >
                <option value="" disabled>-- Select Category --</option>
                {categories.map((cate) => (
                  <option key={cate._id} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              
              {/* Icon mũi tên xuống được custom bằng CSS/SVG */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8d6e63]">
                <svg 
                  className="fill-current h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Description */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-[#a1887f] mb-1 ml-1">Description</label>
          <textarea 
            value={txtDescription} 
            onChange={(e) => setTxtDescription(e.target.value)} 
            className="w-full p-3 border border-[#d7ccc8] rounded-xl focus:ring-2 focus:ring-[#8d6e63] h-24 resize-none" 
            placeholder="Tell us about this product..."
          />
        </div>

        {/* Row 4: Image Upload & Preview */}
        <div className="p-4 border-2 border-dashed border-[#efebe9] rounded-2xl bg-[#fafafa]">
          <label className="text-xs font-bold uppercase text-[#a1887f] block mb-3 text-center">Product Image</label>
          <div className="flex flex-col items-center gap-4">
            {imgProduct && (
              <img src={imgProduct} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-white" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={previewImage} 
              className="text-xs text-[#a1887f] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#efebe9] file:text-[#5d4037] hover:file:bg-[#d7ccc8] cursor-pointer" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button 
            className={`col-span-2 py-4 rounded-xl font-bold tracking-widest transition-all duration-300 shadow-lg ${
              loading ? 'bg-[#d7ccc8] cursor-wait' : 'bg-[#5d4037] hover:bg-[#3e2723] text-white active:scale-95'
            }`}
            onClick={btnAddClick}
            disabled={loading}
          >
            {loading ? 'PROCESSING...' : (txtID ? 'UPDATE PRODUCT' : 'CREATE PRODUCT')}
          </button>
          
          <button 
            className="bg-[#d7ccc8] text-[#5d4037] font-bold py-3 rounded-xl hover:bg-[#bcaaa4] transition-all active:scale-95" 
            onClick={(e) => { e.preventDefault(); clearAllInputs(); }}
          >
            CLEAR
          </button>

          {txtID && (
            <button 
              className="border-2 border-[#ff8a65] text-[#c62828] font-bold py-3 rounded-xl hover:bg-[#ff8a65] hover:text-white transition-all active:scale-95" 
              onClick={(e) => { e.preventDefault(); props.onDelete(txtID); }}
            >
              DELETE
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;