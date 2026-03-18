const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

// 1. TĂNG GIỚI HẠN DUNG LƯỢNG (Quan trọng để fix lỗi ECONNRESET và 431 khi gửi ảnh nặng)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// 2. Cấu hình APIs (Phải đặt trước phần phục vụ file tĩnh)
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

// 3. PHỤC VỤ FILE TĨNH (DEPLOYMENT)
// Phục vụ các file trong thư mục build của admin
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// Phục vụ các file trong thư mục build của customer
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

// 4. KHỞI ĐỘNG SERVER
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});