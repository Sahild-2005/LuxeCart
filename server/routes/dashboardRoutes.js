const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (total, product) => total + product.stock,
      0
    );

    const totalValue = products.reduce(
      (total, product) => total + product.price * product.stock,
      0
    );

    const categories = {};

    products.forEach((product) => {
      categories[product.category] =
        (categories[product.category] || 0) + 1;
    });

    res.json({
      totalProducts,
      totalStock,
      totalValue,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
});

module.exports = router;