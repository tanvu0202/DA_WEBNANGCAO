require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const ProductDAO = {
  // Sửa: Thêm tham số query để có thể lọc theo CategoryId
  async selectByCount(query = {}) {
    const noProducts = await Models.Product.find(query).countDocuments().exec();
    return noProducts;
  },

  // Sửa: Thêm tham số query để lấy sản phẩm theo trang của Category tương ứng
  async selectBySkipLimit(query = {}, skip, limit) {
    const products = await Models.Product.find(query).skip(skip).limit(limit).exec();
    return products;
  },

  async selectAll() {
    const products = await Models.Product.find().exec();
    return products;
  },

  async insert(product) {
    product._id = new mongoose.Types.ObjectId();
    const result = await Models.Product.create(product);
    return result;
  },

  async selectByID(_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    const product = await Models.Product.findById(_id).exec();
    return product;
  },

  async update(product) {
    const newvalues = { 
      name: product.name, 
      price: product.price, 
      image: product.image, 
      category: product.category 
    };
    const result = await Models.Product.findByIdAndUpdate(product._id, newvalues, { new: true });
    return result;
  },

  async delete(_id) {
    const result = await Models.Product.findByIdAndRemove(_id);
    return result;
  },

  async selectTopNew(top) {
    const mysort = { cdate: -1 }; 
    const products = await Models.Product.find({}).sort(mysort).limit(top).exec();
    return products;
  },

  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } },
      { $limit: top }
    ]).exec();
    
    let products = [];
    for (const item of items) {
      const product = await ProductDAO.selectByID(item._id);
      if (product) products.push(product);
    }
    return products;
  },

  // Hàm lọc sản phẩm theo Category (Dùng cho trang khách hàng)
  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },

  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product.find(query).exec();
    return products;
  }
};

module.exports = ProductDAO;