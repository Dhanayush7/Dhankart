import express from "express";
import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

const router = express.Router();

// Get Wishlist
router.get("/", async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate("product");
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Add to Wishlist
router.post("/", async (req, res) => {
  try {
    const { user, productId } = req.body;

    if (!user || !productId) {
      return res.status(400).json({
        message: "User and Product are required",
      });
    }

    const query = [];
    if (mongoose.Types.ObjectId.isValid(productId)) {
      query.push({ _id: productId });
    }

    const numericProductId = Number(productId);
    if (!Number.isNaN(numericProductId)) {
      query.push({ legacyId: numericProductId });
    }

    if (query.length === 0) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findOne({ $or: query });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const exists = await Wishlist.findOne({
      user,
      product: product._id,
    });

    if (exists) {
      const updatedWishlist = await Wishlist.find().populate("product");
      return res.json(updatedWishlist);
    }

    await Wishlist.create({
      user,
      product: product._id,
    });

    const updatedWishlist = await Wishlist.find().populate("product");

    res.status(201).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Remove from Wishlist
router.post("/remove", async (req, res) => {
  try {
    const { wishlistItemId } = req.body;

    await Wishlist.findByIdAndDelete(wishlistItemId);

    const updatedWishlist = await Wishlist.find().populate("product");

    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;