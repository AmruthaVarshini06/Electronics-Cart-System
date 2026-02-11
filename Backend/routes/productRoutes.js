const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  res.json(product);
});

module.exports = router;
