const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

exports.addProduct = async (req, res) => {
  try {

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

exports.deleteProduct = async (req, res) => {
  try {

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};