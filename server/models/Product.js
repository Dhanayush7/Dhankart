import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      default: null,
    },
    name: String,
    brand: String,
    price: Number,
    originalPrice: Number,
    discount: Number,
    rating: Number,
    stock: Number,
    image: String,
    category: String,
    description: String,
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;