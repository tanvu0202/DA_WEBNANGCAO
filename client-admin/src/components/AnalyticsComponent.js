import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { token } = useContext(MyContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const config = { headers: { 'x-access-token': token } };
      axios.get('/api/admin/analytics', config)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi lấy dữ liệu thống kê:", err);
          setError("Không thể tải dữ liệu thống kê. Vui lòng kiểm tra lại Server.");
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8d6e63] border-r-transparent"></div>
      <p className="mt-4 text-[#8d6e63] italic font-medium">Đang phân tích dữ liệu kinh doanh...</p>
    </div>
  );

  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  if (!data) return <div className="p-10 text-center">Không có dữ liệu hiển thị.</div>;

  // Chuẩn bị dữ liệu cho biểu đồ tròn (An toàn hơn với toán tử || 0)
  const approved = data.orders?.approved || 0;
  const total = data.orders?.total || 0;
  
  const orderPieData = [
    { name: 'Đã duyệt', value: approved },
    { name: 'Chờ/Khác', value: Math.max(0, total - approved) },
  ];
  
  const COLORS = ['#8d6e63', '#d7ccc8'];

  return (
    <div className="container mx-auto p-6 bg-[#fffcf9] min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-[#3e2723] uppercase tracking-wider text-center">
        Báo cáo kinh doanh
      </h2>

      {/* 1. THẺ THÔNG SỐ NHANH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#8d6e63] hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-sm font-bold uppercase mb-2">Tổng khách hàng</p>
          <p className="text-3xl font-black text-[#3e2723]">{data.customers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-sm font-bold uppercase mb-2">Doanh thu (Đã duyệt)</p>
          <p className="text-3xl font-black text-green-700">
            {(data.orders?.revenue || 0).toLocaleString()} ₫
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-sm font-bold uppercase mb-2">Tổng đơn hàng</p>
          <p className="text-3xl font-black text-blue-600">{total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. BIỂU ĐỒ SẢN PHẨM BÁN CHẠY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold mb-6 text-[#5d4037]">TOP 5 SẢN PHẨM HOT</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="name" 
                  tick={{fontSize: 10, fill: '#8c7851'}} 
                  axisLine={{stroke: '#efebe9'}}
                />
                <YAxis axisLine={{stroke: '#efebe9'}} tick={{fill: '#8c7851'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="price" fill="#8d6e63" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. TỶ LỆ ĐƠN HÀNG */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-6 text-[#5d4037] self-start">TỶ LỆ DUYỆT ĐƠN</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={orderPieData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  stroke="none"
                >
                  {orderPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 text-xs font-bold text-stone-500 mt-4">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#8d6e63] rounded-full"></span> ĐÃ DUYỆT ({approved})
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#d7ccc8] rounded-full"></span> CHỜ XỬ LÝ ({Math.max(0, total - approved)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;