import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    stock: "",
    image: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", form);

      toast.success("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Add Product");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>
        ))}

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;