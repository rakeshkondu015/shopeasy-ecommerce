import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem, clearCart } from '../services/api';
import './CartPage.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const res = await getCart();
    setCartItems(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const handleQuantity = async (itemId, qty) => {
    if (qty < 1) return;
    await updateCartItem(itemId, qty);
    fetchCart();
  };

  const handleRemove = async (itemId) => {
    await removeCartItem(itemId);
    fetchCart();
  };

  const handleClear = async () => {
    await clearCart();
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <div className="cart-loading">Loading cart...</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty!</p>
          <a href="/">Browse Products</a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.product.imageUrl || `https://via.placeholder.com/80x80?text=${encodeURIComponent(item.product.name)}`}
                  alt={item.product.name}
                />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <span className="cart-item-price">₹{item.product.price.toFixed(2)} each</span>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => handleQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>🗑</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              Total: <strong>₹{total.toFixed(2)}</strong>
            </div>
            <div className="cart-actions">
              <button className="clear-btn" onClick={handleClear}>Clear Cart</button>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
