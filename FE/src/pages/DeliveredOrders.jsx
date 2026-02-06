import React, { useEffect, useState } from 'react';

// DeliveredOrders: danh sách các đơn đã được shipper giao, chờ xác nhận
const STORAGE_KEY = 'cc_orders_v1';

const loadOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveOrders = (orders) => localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

const DeliveredOrders = ({ setCurrentPage }) => {
  const [orders, setOrders] = useState(loadOrders());

  useEffect(() => {
    // Auto-confirm orders older than 24h
    const now = Date.now();
    const updated = orders.map(o => {
      if (o.shippingStatus === 'Đã giao' && o.status === 'Chờ xác nhận' && now - (o.deliveredAt || 0) > 1000 * 60 * 60 * 24) {
        return { ...o, status: 'Đã xác nhận' };
      }
      return o;
    });
    setOrders(updated);
    saveOrders(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => setCurrentPage(`delivered-detail:${id}`);

  const list = orders.filter(o => o.shippingStatus === 'Đã giao');

  return (
    <div className="order-table-container">
      <h2>Đơn đã giao</h2>
      <table className="order-table framed-table">
        <thead>
          <tr>
            <th>ID đơn hàng</th>
            <th>Tên sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {list.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.products.map(p => typeof p === 'string' ? p : p.name).join(', ')}</td>
              <td>{o.total.toLocaleString()} {o.currency}</td>
              <td>
                {(() => {
                  const s = (o.status || '').toLowerCase();
                  if (s.includes('xác nhận') || s.includes('hoàn tất')) return <span className="status-badge status-success">{o.status}</span>;
                  if (s.includes('đang') || s.includes('chờ')) return <span className="status-badge status-warning">{o.status}</span>;
                  return <span className="status-badge status-info">{o.status}</span>;
                })()}
              </td>
              <td>
                <button className="action-link" onClick={() => handleView(o.id)}>Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveredOrders;
