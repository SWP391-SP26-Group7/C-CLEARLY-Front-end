import React, { useEffect, useState } from 'react';
import ProductDrawer from '../components/ProductDrawer';
import './Products.css';

const STORAGE_KEY = 'cc_products_v1';

const loadProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const saveProducts = (arr) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
};

const Products = ({ setCurrentPage }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => { setProducts(loadProducts()); }, []);

  const handleOpen = (p) => { setActive(p); setDrawerOpen(true); };
  const handleClose = () => { setDrawerOpen(false); setActive(null); };

  const handleSave = (updated) => {
    const list = products.slice();
    const idx = list.findIndex(x => x.id === updated.id);
    if (idx >= 0) list[idx] = updated; else list.unshift(updated);
    setProducts(list);
    saveProducts(list);
    handleClose();
  };

  const filtered = products.filter(p => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (p.name || '').toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q);
  });

  return (
    <div className="products-page">
      <div className="products-toolbar">
        <h2>Danh sách Sản phẩm</h2>
        <div>
          <input placeholder="Tìm tên hoặc SKU..." value={query} onChange={e => setQuery(e.target.value)} />
          <button onClick={() => { setActive({ id: `P${Date.now()}`, name: '', sku: '', price:0, stock:0 }); setDrawerOpen(true); }}>Tạo mới</button>
        </div>
      </div>

      <table className="products-table">
        <thead>
          <tr><th>ID</th><th>SKU</th><th>Tên</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{(p.price||0).toLocaleString('vi-VN')} đ</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleOpen(p)}>Xem / Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductDrawer open={drawerOpen} product={active} onClose={handleClose} onSave={handleSave} />
    </div>
  );
};

export default Products;
