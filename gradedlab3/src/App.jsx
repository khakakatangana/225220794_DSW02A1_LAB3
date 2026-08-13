import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'

function App() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('https://fakestoreapi.com/products')

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        if (isMounted) {
          setProducts(data)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load products. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  return (
    <div className="app">
      <header className="header">
        <h1>Product Catalog</h1>
        <p>Browse our products and search for what you need.</p>
      </header>

      <main className="container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {loading && (
          <div className="message">
            <h2>Loading...</h2>
            <p>Please wait while products are being loaded.</p>
          </div>
        )}

        {!loading && error && (
          <div className="message error">
            <h2>{error}</h2>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="message">
            <h2>No products found</h2>
            <p>Try searching for a different product.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductList products={filteredProducts} />
        )}
      </main>
    </div>
  )
}

export default App

