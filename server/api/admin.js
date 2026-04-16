const express = require('express');
const router = express.Router();
// utils
const JwtUtil = require('../utils/JwtUtil');
const EmailUtil = require('../utils/EmailUtil');
// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');
const Coupon = require('../models/Coupon'); // Đã thêm để sửa lỗi ReferenceError

// login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken();
      res.json({ success: true, message: 'Authentication successful', token: token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});

// category
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const category = { name: name };
  const result = await CategoryDAO.insert(category);
  res.json(result);
});

router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id: _id, name: name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

// product
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    const categoryId = req.query.category;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sizePage = req.query.size ? parseInt(req.query.size) : 6;

    let query = {};
    if (categoryId && categoryId !== 'all' && categoryId !== '') {
      query = { 'category._id': categoryId };
    }

    const noProducts = await ProductDAO.selectByCount(query);
    const noPages = Math.ceil(noProducts / sizePage);
    const skip = (page - 1) * sizePage;

    const products = await ProductDAO.selectBySkipLimit(query, skip, sizePage);

    res.json({ 
      products: products, 
      noPages: noPages, 
      curPage: page 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    const name = req.body.name;
    const priceRaw = req.body.price ? req.body.price.toString().replace(/\./g, '') : "0";
    const price = parseInt(priceRaw);
    const cid = req.body.category;
    const image = req.body.image;
    const description = req.body.description;
    const now = new Date().getTime();
    
    if (!cid || cid === "") {
      return res.json({ success: false, message: 'Vui lòng chọn danh mục sản phẩm!' });
    }

    const category = await CategoryDAO.selectByID(cid);
    if (!category) {
      return res.json({ success: false, message: 'Danh mục không tồn tại trong hệ thống!' });
    }

    const product = { 
      name: name, 
      price: price, 
      image: image, 
      cdate: now, 
      category: category,
      description: description 
    };
    const result = await ProductDAO.insert(product);
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ success: false, message: 'Lỗi Server: ' + error.message });
  }
});

router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const name = req.body.name;
    const priceRaw = req.body.price ? req.body.price.toString().replace(/\./g, '') : "0";
    const price = parseInt(priceRaw);
    const cid = req.body.category;
    const image = req.body.image;
    const now = new Date().getTime();
    
    const category = await CategoryDAO.selectByID(cid);
    const product = { _id: _id, name: name, price: price, image: image, cdate: now, category: category };
    const result = await ProductDAO.update(product);
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ success: false, message: 'Lỗi Server khi cập nhật sản phẩm' });
  }
});

router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await ProductDAO.delete(_id);
  res.json(result);
});

// customer
router.get('/customers', JwtUtil.checkToken, async function (req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});

router.put('/customers/deactive/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});

router.get('/customers/sendmail/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectByID(_id);
  if (cust) {
    const send = await EmailUtil.send(cust.email, cust._id, cust.token);
    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});

// order
router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});

router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const newStatus = req.body.status;
  const result = await OrderDAO.update(_id, newStatus);
  res.json(result);
});

router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

// Thống kê Analytics
router.get('/analytics', JwtUtil.checkToken, async function (req, res) {
  try {
    const customers = await CustomerDAO.selectAll() || [];
    const totalCustomers = customers.length;
    const orders = await OrderDAO.selectAll() || [];
    const approvedOrders = orders.filter(o => o.status === 'APPROVED');
    
    const revenue = approvedOrders.reduce((sum, order) => {
      const orderTotal = Number(order.total) || 0;
      return sum + orderTotal;
    }, 0);

    let topProducts = [];
    try {
      topProducts = await ProductDAO.selectTopHot(5);
      if (!topProducts || topProducts.length === 0) {
        topProducts = await ProductDAO.selectTopNew(5);
      }
    } catch (e) {
      topProducts = await ProductDAO.selectTopNew(5);
    }

    res.json({
      customers: totalCustomers,
      orders: {
        total: orders.length,
        approved: approvedOrders.length,
        revenue: revenue
      },
      topProducts: topProducts || []
    });

  } catch (error) {
    console.error("LỖI ANALYTICS CỤ THỂ:", error);
    res.status(500).json({ success: false, message: "Lỗi Server: " + error.message });
  }
});

// --- PHẦN COUPON (ĐÃ SỬA LỖI ĐỂ ĐỒNG BỘ VỚI HỆ THỐNG CỦA BẠN) ---

// Lấy danh sách mã
router.get('/coupons', JwtUtil.checkToken, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Thêm mới
router.post('/coupons', JwtUtil.checkToken, async (req, res) => {
  try {
    const newCoupon = req.body;
    const result = await Coupon.create(newCoupon);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Xóa mã
router.delete('/coupons/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Coupon.findByIdAndDelete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;