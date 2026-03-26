const Order = require("../models/order");

exports.createOrder = async (req, res) => {

  try {

    const { items, totalAmount } = req.body;

    const order = new Order({
      items,
      totalAmount
    });

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};