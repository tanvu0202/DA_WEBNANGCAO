const MyConstants = {
  DB_SERVER: 'cluster.t70bb5o.mongodb.net',
  DB_USER: 'hacker01676678299_db_user',
  DB_PASS: 'tanvu1234567',
  DB_DATABASE: 'DAWEB',
  
  // 1. CẤU HÌNH EMAIL (Dùng để gửi mã xác thực khi đăng ký)
  // Nếu dùng Gmail, hãy điền địa chỉ Gmail của Vũ vào đây
  EMAIL_USER: 'hacker01676678299@gmail.com', 
  
  // 2. MẬT KHẨU ỨNG DỤNG (Quan trọng: Không phải mật khẩu đăng nhập Gmail)
  // Vũ phải vào Google Account -> Bảo mật -> Xác minh 2 lớp -> Mật khẩu ứng dụng để lấy mã 16 ký tự
  EMAIL_PASS: 'ejzx sqvk iabo pvcc', 

  // 3. KHÓA BẢO MẬT JWT (Dùng để tạo Token đăng nhập)
  // Vũ có thể đặt một chuỗi ký tự bất kỳ, càng dài càng bảo mật
  JWT_SECRET: 'khoacuavune', 
  
  JWT_EXPIRES: '3600000', // 1 giờ
};

module.exports = MyConstants;