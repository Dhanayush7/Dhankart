import express from "express";
import Product from "../models/Product.js";
import seedProducts from "../data/products.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const productsFromDb = await Product.find();

    if (productsFromDb && productsFromDb.length > 0) {
      return res.json(productsFromDb);
    }

    return res.json(seedProducts);
  } catch (error) {
    console.error("Products fetch error:", error.message);
    return res.json(seedProducts);
  }
});

export default router;