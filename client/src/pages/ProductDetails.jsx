import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="page-message">Loading...</p>;
  }

  if (!product) {
    return <p className="page-message">Product not found.</p>;
  }

  return (
    <section className="details-section">
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-content">
        <span className="hero-tag">{product.category}</span>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{product.price.toLocaleString()}
        </p>

        <p>{product.description}</p>

        <p className="stock">
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        <button className="primary-btn">
          Add to Cart
        </button>

        <br />
        <br />

        <Link to="/products">← Back to Products</Link>
      </div>
    </section>
  );
}

export default ProductDetails;