import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search query changes
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search filter
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Catalog</h1>
        <p>Browse our collection of products</p>
      </header>

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="content">
        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error">
            <h2>⚠️ Failed to load products</h2>
            <p>Please check your internet connection and try again.</p>
            <button className="retry-btn" onClick={fetchProducts}>
              Retry
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try adjusting your search term</p>
          </div>
        )}

        {/* Product List */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-description">
                    {product.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Counter */}
      {!loading && !error && (
        <div className="results-info">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
}

export default App;
