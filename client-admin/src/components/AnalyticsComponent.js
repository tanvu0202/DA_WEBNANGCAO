import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { token } = useContext(MyContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/analytics', config).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [token]);

  if (loading) return <div className="p-10 text-center italic">Đang phân tích dữ liệu...</div>;

  // Dữ liệu cho biểu đồ tròn (Trạng thái đơn hàng)
  const orderPieData = [
    { name: 'Đã duyệt', value: data.orders.approved },
    { name: 'Chờ/Khác', value: data.orders.total - data.orders.approved },
  ];
  const COLORS = ['#8d6e63', '#d7ccc8'];

  return (
    <div className="container mx-auto p-6 bg-[#fffcf9] min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-[#3e2723] uppercase tracking-wider text-center">Báo cáo kinh doanh</h2>

      {/* 1. THẺ THÔNG SỐ NHANH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#8d6e63]">
          <p className="text-stone-500 text-sm font-bold uppercase">Tổng khách hàng</p>
          <p className="text-3xl font-black text-[#3e2723]">{data.customers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600">
          <p className="text-stone-500 text-sm font-bold uppercase">Doanh thu (Đã duyệt)</p>
          <p className="text-3xl font-black text-green-700">{data.orders.revenue.toLocaleString()} ₫</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <p className="text-stone-500 text-sm font-bold uppercase">Tổng đơn hàng</p>
          <p className="text-3xl font-black text-blue-600">{data.orders.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. BIỂU ĐỒ SẢN PHẨM BÁN CHẠY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold mb-6 text-[#5d4037]">TOP 5 SẢN PHẨM HOT</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#8d6e63" radius={[4, 4, 0, 0]} />
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
                <Pie data={orderPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {orderPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs font-bold text-stone-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#8d6e63] rounded-full"></span> Đã duyệt</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#d7ccc8] rounded-full"></span> Chờ xử lý</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;