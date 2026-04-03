import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { FaBox, FaUserPlus, FaMoneyBillWave, FaCoffee } from 'react-icons/fa';

// 1. Đăng ký các thành phần - Em đã gom lại rất kỹ để tránh lỗi render
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  useEffect(() => {
    document.title = "Next Coffee - Thống kê chi tiết";
  }, []);

  // 2. Định nghĩa dữ liệu - Để riêng ra ngoài phần return cho sạch code
  const dataDoanhThu = {
    labels: ['Cà phê máy', 'Truyền thống', 'Trà', 'Đá xay', 'Bánh'],
    datasets: [
      {
        label: 'Doanh thu (Triệu)',
        data: [15, 12, 8, 10, 5],
        backgroundColor: '#6F4E37',
        borderRadius: 8,
      },
    ],
  };

  const dataDonHang = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Số đơn hàng',
        data: [45, 52, 48, 70, 85, 120, 110],
        borderColor: '#A67B5B',
        backgroundColor: 'rgba(166, 123, 91, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Cấu hình hiển thị cho biểu đồ
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Để biểu đồ co giãn theo khung
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="space-y-8 animate__animated animate__fadeIn animate__faster">
      {/* Tiêu đề trang */}
      <div className="border-b border-orange-100 pb-4">
        <h2 className="text-3xl font-bold text-[#3d2b1f] font-serif uppercase tracking-tight">Thống kê Next Coffee</h2>
      </div>

      {/* 3 Thẻ chỉ số (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-[#6F4E37] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Tổng đơn hàng</p>
            <h3 className="text-2xl font-bold text-[#3d2b1f]">530 đơn</h3>
          </div>
          <FaBox className="text-[#6F4E37] opacity-20" size={32} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-[#A67B5B] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Khách mới</p>
            <h3 className="text-2xl font-bold text-[#3d2b1f]">128 người</h3>
          </div>
          <FaUserPlus className="text-[#A67B5B] opacity-20" size={32} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-[#4B3621] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Doanh thu tháng</p>
            <h3 className="text-2xl font-bold text-[#3d2b1f]">50.2 Triệu</h3>
          </div>
          <FaMoneyBillWave className="text-green-600 opacity-20" size={32} />
        </div>
      </div>

      {/* Phần biểu đồ - Em đã bọc trong thẻ div có chiều cao cố định để tránh lỗi vỡ khung */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-50">
          <div className="flex items-center mb-6 text-[#6F4E37] font-bold">
            <FaCoffee className="mr-2" /> Doanh thu theo danh mục
          </div>
          <div className="h-64">
            <Bar data={dataDoanhThu} options={options} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-50">
          <div className="flex items-center mb-6 text-[#6F4E37] font-bold">
            <FaMoneyBillWave className="mr-2" /> Lượng đơn hàng trong tuần
          </div>
          <div className="h-64">
            <Line data={dataDonHang} options={options} />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-xs italic">
        * Dữ liệu được cập nhật tự động mỗi 5 phút
      </div>
    </div>
  );
};

export default Analytics;