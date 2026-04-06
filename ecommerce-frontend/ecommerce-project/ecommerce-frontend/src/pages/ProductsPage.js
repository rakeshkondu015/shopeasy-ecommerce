import React, { useEffect, useState } from 'react';
import { getAllProducts, searchProducts, addToCart } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      getAllProducts().then((res) => setProducts(res.data));
      return;
    }
    const res = await searchProducts(search);
    setProducts(res.data);
  };

  const handleAddToCart = async (productId) => {
    if (!user) { setMessage('Please login to add items to cart'); return; }
    try {
      await addToCart(productId, 1);
      setMessage('✅ Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch {
      setMessage('❌ Failed to add to cart');
    }
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>

      {message && <div className="toast">{message}</div>}

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img
              src={p.imageUrl || `https://via.placeholder.com/280x180?text=${encodeURIComponent(p.name)}`}
              alt={p.name}
            />
            <div className="product-info">
              <span className="product-category">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="product-footer">
                <span className="product-price">₹{p.price.toFixed(2)}</span>
                {user && user.role === 'USER' && (
                  <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="empty">No products found.</p>}
      </div>
    </div>
  );
}
