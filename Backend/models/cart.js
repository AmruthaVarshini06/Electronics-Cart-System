const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

  productId: {
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

  image: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 1
  }

});

module.exports = mongoose.model("Cart", cartSchema);