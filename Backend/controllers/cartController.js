const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {

    const { productId, name, price, image } = req.body;

    if (!productId || !name || !price || !image) {
      return res.status(400).json({ message: "Missing product data" });
    }

    let existingProduct = await Cart.findOne({ productId: productId });

    if (existingProduct) {
      existingProduct.quantity += 1;
      await existingProduct.save();
      return res.json(existingProduct);
    }

    const newItem = new Cart({
      productId,
      name,
      price,
      image,
      quantity: 1
    });

    await newItem.save();

    res.json(newItem);

  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {

    const item = await Cart.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.increaseQty = async (req, res) => {
  try {

    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity += 1;

    await item.save();

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.decreaseQty = async (req, res) => {
  try {

    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {

    await Cart.deleteMany();  // removes all items

    res.json({ message: "Cart cleared successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};