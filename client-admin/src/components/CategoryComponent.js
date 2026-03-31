import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import 'animate.css';

const Category = () => {
  const { token } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/categories', config).then((res) => {
      setCategories(res.data);
    });
  };

  const trItemClick = (item) => {
    setItemSelected(item);
  };

  const updateCategories = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#fafafa] min-h-[90vh] overflow-hidden">
      {/* Cột trái: Danh sách Category */}
      <div className="w-full md:w-7/12 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#3e2723] flex items-center gap-2">
          <span className="w-2 h-8 bg-[#8d6e63] rounded-full"></span>
          Category Management
        </h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-[#efebe9] overflow-hidden animate__animated animate__fadeIn">
          <div className="overflow-y-auto max-h-[65vh]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#5d4037] text-[#d7ccc8] sticky top-0 z-10">
                <tr>
                  <th className="py-4 px-6 font-semibold uppercase text-sm tracking-wider">ID</th>
                  <th className="py-4 px-6 font-semibold uppercase text-sm tracking-wider">Category Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efebe9]">
                {categories.map((item, index) => (
                  <tr
                    key={item._id}
                    onClick={() => trItemClick(item)}
                    className={`cursor-pointer transition-all duration-200 animate__animated animate__fadeInUp ${
                      itemSelected?._id === item._id 
                        ? "bg-[#f5f5f5] border-l-4 border-l-[#8d6e63]" 
                        : "hover:bg-[#efebe9] text-[#5d4037]"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6 font-mono text-xs text-[#a1887f]">{item._id}</td>
                    <td className="py-4 px-6 font-medium">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer bảng cho chuyên nghiệp */}
          <div className="bg-[#fcfaf9] p-3 text-right text-xs text-[#a1887f] border-t border-[#efebe9]">
            Total: {categories.length} categories
          </div>
        </div>
      </div>

      {/* Cột phải: Chi tiết/Chỉnh sửa */}
      <div className="w-full md:w-5/12 animate__animated animate__fadeInRight">
        <div className="bg-white rounded-2xl shadow-xl border border-[#efebe9] p-2 h-full min-h-[400px]">
          <div className="h-full rounded-xl bg-[#fff] p-4">
             <CategoryDetail item={itemSelected} updateCategories={updateCategories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;