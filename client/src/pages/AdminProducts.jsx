import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manage Products</h1>

      <br />

      <Link to="/admin/add-product">
        <button>Add Product</button>
      </Link>

      <br />
      <br />

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  width="70"
                  alt={product.name}
                />
              </td>

              <td>{product.name}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <Link
                  to={`/admin/edit-product/${product._id}`}
                >
                  <button>Edit</button>
                </Link>

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;