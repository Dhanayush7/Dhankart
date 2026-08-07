import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// ======================
// PLACE ORDER
// ======================
router.post("/", async (req, res) => {
  try {
    const {
      user,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!user) {
      return res.status(400).json({
        message: "User is required",
      });
    }

    const cartItems = await Cart.find({
      user,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await Cart.deleteMany({ user });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// GET ALL ORDERS
// ======================
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// GET MY ORDERS
// ======================
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;