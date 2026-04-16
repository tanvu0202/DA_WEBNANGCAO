const mongoose = require('mongoose');
const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  percent: { type: Number, required: true }, // % giảm giá
  isActive: { type: Boolean, default: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);