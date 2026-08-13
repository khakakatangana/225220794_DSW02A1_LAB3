import ProductCard from "./ProductCard";
// this component is responsible for rendering a list of products. It receives an array of products as a prop and maps over them to create a ProductCard for each product.
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;