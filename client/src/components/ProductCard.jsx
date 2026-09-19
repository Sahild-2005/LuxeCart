import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <span className="category">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString()}</strong>

          <Link
            to={`/products/${product._id}`}
            className="view-btn"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;