import express from "express";
import Product from "../models/Product.js";
import seedProducts from "../data/products.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const productsFromDb = await Product.find();
    console.log("Products in DB:", productsFromDb.length);

    const databaseProductsByLegacyId = new Map(
      productsFromDb
        .filter((product) => product.legacyId !== null && product.legacyId !== undefined)
        .map((product) => [product.legacyId, product])
    );

    const catalogProducts = seedProducts.map((product) => {
      const databaseProduct = databaseProductsByLegacyId.get(product.id);

      return databaseProduct
        ? { ...databaseProduct.toObject(), image: product.image }
        : product;
    });

    const customProducts = productsFromDb.filter(
      (product) => product.legacyId === null || product.legacyId === undefined
    );

    return res.json([...catalogProducts, ...customProducts]);
  } catch (error) {
    console.error("Products fetch error:", error.message);
    return res.json(seedProducts);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    const fallbackProduct = seedProducts.find(
      (item) =>
        String(item.id) === String(req.params.id) ||
        String(item._id) === String(req.params.id)
    );

    if (fallbackProduct) {
      return res.json(fallbackProduct);
    }

    return res.status(404).json({
      message: "Product not found",
    });
  } catch (error) {
    const fallbackProduct = seedProducts.find(
      (item) =>
        String(item.id) === String(req.params.id) ||
        String(item._id) === String(req.params.id)
    );

    if (fallbackProduct) {
      return res.json(fallbackProduct);
    }

    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
