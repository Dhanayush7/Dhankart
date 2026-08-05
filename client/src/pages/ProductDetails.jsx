import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setProduct(null);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} width="350" />

      <div>
        <h1>{product.name}</h1>

        <h3>{product.brand}</h3>

        <h2>₹ {product.price}</h2>

        <p>
          <strong>Original Price:</strong> ₹ {product.originalPrice}
        </p>

        <p>
          <strong>Discount:</strong> {product.discount}%
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {product.rating}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <p>{product.description}</p>

        <button>Add to Cart</button>

        <button>Add to Wishlist</button>
      </div>
    </div>
  );
}

export default ProductDetails;