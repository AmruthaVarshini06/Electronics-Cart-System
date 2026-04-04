const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ['mobiles', 'laptops', 'smartwatches', 'audio']
  },
  brand: { type: String, required: true },
  image: { type: String, default: '' },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  features: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ name: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.model('Product', productSchema);
