import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();


// ======================
// GET ALL CART ITEMS
// ======================
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product");

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// ADD PRODUCT TO CART
// ======================
router.post("/", async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;

    if (!user || !productId) {
      return res.status(400).json({
        message: "User and Product are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cartItem = await Cart.findOne({
      user,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user,
        product: productId,
        quantity: quantity || 1,
      });
    }

    const updatedCart = await Cart.find().populate("product");

    res.status(201).json({
      items: updatedCart,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// INCREASE QUANTITY
// ======================
router.post("/increase", async (req, res) => {
  try {

    const { cartItemId } = req.body;

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item not found",
      });
    }

    cartItem.quantity++;

    await cartItem.save();

    const updatedCart = await Cart.find().populate("product");

    res.json({
      items: updatedCart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// DECREASE QUANTITY
// ======================
router.post("/decrease", async (req, res) => {
  try {

    const { cartItemId } = req.body;

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item not found",
      });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      await cartItem.save();
    }

    const updatedCart = await Cart.find().populate("product");

    res.json({
      items: updatedCart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// REMOVE ITEM
// ======================
router.post("/remove", async (req, res) => {
  try {

    const { cartItemId } = req.body;

    await Cart.findByIdAndDelete(cartItemId);

    const updatedCart = await Cart.find().populate("product");

    res.json({
      items: updatedCart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;