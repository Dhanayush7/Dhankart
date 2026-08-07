import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

await connectDB();

try {
  await Product.deleteMany();

  await Product.insertMany(
    products.map((product) => ({
      ...product,
      legacyId: product.id,
    }))
  );

  console.log("✅ Products inserted successfully with legacyId!");

  process.exit();
} catch (error) {
  console.error(error);

  process.exit(1);
}