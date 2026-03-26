const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  slug: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    required: true
  },

  page: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);