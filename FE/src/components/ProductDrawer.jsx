import React, { useState, useEffect, useRef } from 'react';
import { FaInfoCircle, FaTags, FaImage, FaBoxes, FaTimes } from 'react-icons/fa';
import './ProductDrawer.css';

const STORAGE_KEY = 'cc_products_v1';

const ProductDrawer = ({ open, product, onClose, onSave }) => {
  const [model, setModel] = useState(product || {});
  const [tab, setTab] = useState('general');
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState('');
  const fileRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setModel(product ? { ...product } : {});
    setTab('general');
    setAdjustAmount(0);
    setAdjustReason('');
  }, [product]);

  if (!open) return null;

  const updateField = (field) => (e) => {
    const raw = e && e.target ? e.target.value : e;
    const value = (field === 'price' || field === 'cost' || field === 'stock') ? Number(raw || 0) : raw;
    setModel(prev => ({ ...prev, [field]: value }));
  };

  // Variants management (simple)
  const addVariant = () => {
    const v = { id: `V${Date.now()}`, sku: '', name: '', price: 0, stock: 0 };
    setModel(prev => ({ ...prev, variants: [ ...(prev.variants||[]), v ] }));
  };
  const updateVariant = (i, field) => (e) => {
    setModel(prev => {
      const vs = [...(prev.variants||[])];
      vs[i] = { ...vs[i], [field]: (field==='price'||field==='stock')? Number(e.target.value) : e.target.value };
      return { ...prev, variants: vs };
    });
  };
  const removeVariant = (i) => {
    // confirm before delete
    if (!window.confirm('Xác nhận xóa biến thể này?')) return;
    setModel(prev => ({ ...prev, variants: (prev.variants||[]).filter((_,idx)=>idx!==i) }));
  };

  // Images
  const addImage = (url) => {
    if (!url) return;
    setModel(prev => ({ ...prev, images: [ ...(prev.images||[]), url ] }));
  };
  const removeImage = (i) => {
    if (!window.confirm('Xác nhận xóa ảnh này?')) return;
    setModel(prev => ({ ...prev, images: (prev.images||[]).filter((_,idx)=>idx!==i) }));
  };

  // handle file uploads (convert to data URL)
  const readFileAsDataURL = (file) => new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
  const handleFiles = async (files) => {
    const arr = Array.from(files || []);
    const results = await Promise.all(arr.map(f => readFileAsDataURL(f)));
    setModel(prev => ({ ...prev, images: [ ...(prev.images||[]), ...results ] }));
  };

  // Inventory adjustments
  const applyAdjustment = () => {
    const delta = Number(adjustAmount || 0);
    if (!delta) return;
    setModel(prev => {
      const now = new Date().toISOString();
      const history = [ ...(prev.stockHistory||[]) , { date: now, delta, reason: adjustReason } ];
      const newStock = (Number(prev.stock || 0) + delta);
      return { ...prev, stock: newStock, stockHistory: history };
    });
    setAdjustAmount(0); setAdjustReason('');
  };

  const handleSave = () => {
    // validation: SKU and Name required
    const newErrors = {};
    if (!model.sku || String(model.sku).trim() === '') newErrors.sku = 'SKU là bắt buộc';
    if (!model.name || String(model.name).trim() === '') newErrors.name = 'Tên sản phẩm là bắt buộc';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const out = { ...model };
    if (!out.id) out.id = `P${Date.now()}`;
    if (!out.stockHistory) out.stockHistory = out.stockHistory || [];

    // update localStorage immediately (frontend-only persistence)
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex(p => p.id === out.id || p.sku === out.sku);
      if (idx >= 0) { list[idx] = out; } else { list.unshift(out); }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      // ignore storage errors
    }

    onSave && onSave(out);
  };

  return (
    <div className="modal-backdrop">
      <div className="product-modal">
        <div className="modal-header">
          <div className="modal-title">{model?.name || 'Sản phẩm mới'}</div>
          <div>
            <button className="modal-close" onClick={onClose} aria-label="Đóng"><FaTimes /></button>
          </div>
        </div>

        <div className="drawer-tabs">
          <button className={tab==='general'?'active':''} onClick={()=>setTab('general')}><FaInfoCircle/> General</button>
          <button className={tab==='variants'?'active':''} onClick={()=>setTab('variants')}><FaTags/> Variants</button>
          <button className={tab==='images'?'active':''} onClick={()=>setTab('images')}><FaImage/> Images</button>
          <button className={tab==='inventory'?'active':''} onClick={()=>setTab('inventory')}><FaBoxes/> Inventory</button>
        </div>

        <div className="drawer-body">
          {tab==='general' && (
            <div>
              <div className="form-grid">
                <div className="group-card">
                  <h4>Thông tin Cơ bản</h4>
                  <div className="group-row">
                    <label>SKU</label>
                    <input value={model.sku||''} onChange={updateField('sku')} />
                    {errors.sku && <div className="field-error">{errors.sku}</div>}
                  </div>
                  <div className="group-row">
                    <label>Tên sản phẩm</label>
                    <input value={model.name||''} onChange={updateField('name')} />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>
                </div>

                <div className="group-card">
                  <h4>Phân loại & Giá</h4>
                  <div className="group-row">
                    <label>Loại</label>
                    <select value={model.type||'Frame'} onChange={updateField('type')}>
                      <option>Frame</option>
                      <option>Lens</option>
                      <option>Accessory</option>
                    </select>
                  </div>
                  <div className="group-row">
                    <label>Giá bán</label>
                    <input type="number" value={model.price||0} onChange={updateField('price')} />
                  </div>
                </div>
              </div>

              <div className="group-card" style={{marginTop:12}}>
                <h4>Mô tả Chi tiết</h4>
                <div className="group-row">
                  <textarea value={model.description||''} onChange={updateField('description')} />
                </div>
              </div>
            </div>
          )}

          {tab==='variants' && (
            <div>
              {(model.variants||[]).length === 0 ? (
                <div className="variants-empty">
                  <p>Chưa có biến thể nào được tạo</p>
                  <button onClick={addVariant}>Thêm biến thể</button>
                </div>
              ) : (
                <div className="group-card">
                  {(model.variants||[]).map((v,i)=> (
                    <div key={v.id} className="variant-row" style={{marginBottom:8}}>
                      <input placeholder="SKU" value={v.sku||''} onChange={updateVariant(i,'sku')} />
                      <input placeholder="Tên" value={v.name||''} onChange={updateVariant(i,'name')} />
                      <input placeholder="Giá" type="number" value={v.price||0} onChange={updateVariant(i,'price')} />
                      <input placeholder="Tồn" type="number" value={v.stock||0} onChange={updateVariant(i,'stock')} />
                      <button onClick={()=>removeVariant(i)}>Xóa</button>
                    </div>
                  ))}
                  <button style={{marginTop:8}} onClick={addVariant}>Thêm biến thể</button>
                </div>
              )}
            </div>
          )}

          {tab==='images' && (
            <div>
              <div className="upload-zone" onDrop={e=>{ e.preventDefault(); handleFiles(e.dataTransfer.files); }} onDragOver={e=>e.preventDefault()}>
                <p>Kéo thả ảnh vào đây hoặc</p>
                <button onClick={()=>fileRef.current && fileRef.current.click()}>Chọn ảnh</button>
                <input ref={fileRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={e=>handleFiles(e.target.files)} />
              </div>

              <div className="images-grid">
                {(model.images||[]).map((src,i) => (
                  <div className="image-card" key={i}>
                    <div className="img-wrap"><img src={src} alt={`img-${i}`} /></div>
                    <div className="img-ops">
                      <button className="btn-delete" onClick={()=>removeImage(i)}>Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='inventory' && (
            <div>
              <div className="inventory-card">
                <div><strong>Tồn hiện tại: </strong> {model.stock || 0}</div>
                <div style={{marginTop:8}}>
                  <label>Điều chỉnh số lượng (âm để giảm)</label>
                  <input type="number" value={adjustAmount} onChange={e=>setAdjustAmount(Number(e.target.value))} />
                </div>
                <div style={{marginTop:8}}>
                  <label>Lý do</label>
                  <input value={adjustReason} onChange={e=>setAdjustReason(e.target.value)} />
                </div>
                <div style={{marginTop:8}}>
                  <button onClick={applyAdjustment}>Áp dụng</button>
                </div>

                <div className="stock-history">
                  <h4 style={{marginTop:12}}>Lịch sử điều chỉnh</h4>
                  <table>
                    <thead><tr><th>Thời gian</th><th>Delta</th><th>Lý do</th></tr></thead>
                    <tbody>
                      {(model.stockHistory||[]).slice().reverse().map((h,idx)=> (
                        <tr key={idx}><td>{new Date(h.date).toLocaleString()}</td><td>{h.delta>0?`+${h.delta}`:h.delta}</td><td>{h.reason}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Hủy</button>
          <button className="btn-primary" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDrawer;
