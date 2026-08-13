function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
      />

      <div className="product-info">
        <h2>{product.title}</h2>

        <p className="category">
          {product.category}
        </p>

        <p className="price">
          ${product.price}
        </p>

        <p className="description">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;