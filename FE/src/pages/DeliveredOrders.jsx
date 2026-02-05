import React, { useEffect, useState } from 'react';
import seedOrders, { defaultOrders } from '../utils/seedOrders';

// DeliveredOrders: danh sách các đơn đã được shipper giao, chờ xác nhận
const STORAGE_KEY = 'cc_orders_v1';

const loadOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultOrders;
    return JSON.parse(raw);
  } catch (e) {
    return defaultOrders;
  }
};

const saveOrders = (orders) => localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

const DeliveredOrders = ({ setCurrentPage }) => {
  // ensure seed on component mount in case App didn't run seed
  useEffect(() => { try { seedOrders(); } catch (e) {} }, []);
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
      <table className="order-table">
        <thead>
          <tr>
            <th>ID đơn hàng</th>
            <th>Tên sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.products.map(p => typeof p === 'string' ? p : p.name).join(', ')}</td>
              <td>{o.total.toLocaleString()} {o.currency}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => handleView(o.id)}>Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveredOrders;
