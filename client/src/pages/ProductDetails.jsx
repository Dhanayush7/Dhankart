import { useParams } from "react-router-dom";
import products from "../data/products";
import "../css/ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return <h2>Product Not Found</h2>;
    }

    return (
        <div className="product-details">
            <img
                src={product.image}
                alt={product.name}
            />

            <div>
                <h1>{product.name}</h1>
                <h2>₹{product.price}</h2>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <button>Add To Cart</button>
            </div>
        </div>
    );
}

export default ProductDetails;