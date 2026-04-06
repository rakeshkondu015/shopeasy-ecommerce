import React, { useEffect, useState } from 'react';
import {
  getAllProducts, createProduct, updateProduct, deleteProduct,
  getAllUsers, deleteUser
} from '../services/api';
import './AdminPage.css';

const EMPTY_FORM = { name: '', description: '', price: '', imageUrl: '', stock: '', category: '' };

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers]       = useState([]);
  const [tab, setTab]           = useState('products');
  const [form, setForm]         = useState(EMPTY_FORM);
  const [editId, setEditId]     = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg]           = useState('');

  const fetchData = async () => {
    const [pr, ur] = await Promise.all([getAllProducts(), getAllUsers()]);
    setProducts(pr.data);
    setUsers(ur.data);
  };

  useEffect(() => { fetchData(); }, []);

  const notify = (text) => { setMsg(text); setTimeout(() => setMsg(''), 2500); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };

  const openEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price,
              imageUrl: p.imageUrl || '', stock: p.stock, category: p.category || '' });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editId) { await updateProduct(editId, payload); notify('✅ Product updated!'); }
      else         { await createProduct(payload);         notify('✅ Product created!'); }
      setShowForm(false);
      fetchData();
    } catch { notify('❌ Operation failed'); }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    notify('🗑 Product deleted');
    fetchData();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await deleteUser(id);
    notify('🗑 User deleted');
    fetchData();
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {msg && <div className="admin-toast">{msg}</div>}

      <div className="admin-tabs">
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users</button>
      </div>

      {/* ── Products Tab ── */}
      {tab === 'products' && (
        <div>
          <div className="admin-toolbar">
            <h2>All Products ({products.length})</h2>
            <button className="add-btn" onClick={openCreate}>+ Add Product</button>
          </div>

          {showForm && (
            <div className="product-form-card">
              <h3>{editId ? 'Edit Product' : 'New Product'}</h3>
              <form onSubmit={handleSubmit} className="product-form">
                <input name="name"        placeholder="Name"        value={form.name}        onChange={handleChange} required />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <input name="price"       placeholder="Price"       type="number" step="0.01" value={form.price}    onChange={handleChange} required />
                <input name="imageUrl"    placeholder="Image URL"   value={form.imageUrl}    onChange={handleChange} />
                <input name="stock"       placeholder="Stock"       type="number" value={form.stock}       onChange={handleChange} required />
                <input name="category"    placeholder="Category"    value={form.category}    onChange={handleChange} />
                <div className="form-actions">
                  <button type="submit" className="save-btn">{editId ? 'Update' : 'Create'}</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEdit(p)}>Edit</button>
                    <button className="del-btn" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Users Tab ── */}
      {tab === 'users' && (
        <div>
          <h2>All Users ({users.length})</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span></td>
                  <td>
                    <button className="del-btn" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
