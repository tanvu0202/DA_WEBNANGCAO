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
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-white h-[89vh] overflow-hidden">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Category List</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate__animated animate__zoomIn">
          <table className="w-full text-left text-gray-600">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">ID</th>
                <th className="py-3 px-4 border-b border-gray-200">Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => trItemClick(item)}
                  className="cursor-pointer hover:bg-blue-100 transition-all duration-200 animate__animated animate__fadeInUp"
                >
                  <td className="py-3 px-4 border-b border-gray-200">{item._id}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="animate__animated animate__bounceIn w-1/2">
        <CategoryDetail item={itemSelected} updateCategories={updateCategories} />
      </div>
    </div>
  );
};

export default Category;
