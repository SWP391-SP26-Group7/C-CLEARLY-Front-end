import React, { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const STORAGE_KEY = 'cc_orders_v1';

const loadOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const DeliveredOrderDetail = ({ id, setCurrentPage }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = loadOrders();
    const found = orders.find(o => o.id === id);
    setOrder(found || null);
  }, [id]);

  if (!order) return <div>Đơn hàng không tồn tại.</div>;

  const badgeText = () => {
    if (order.status && order.status.toLowerCase().includes('đổi')) return 'Đang xử lý đổi/trả';
    if (order.status === 'Đã xác nhận') return 'Đã hoàn tất';
    if (order.shippingStatus === 'Đã giao' && order.status === 'Chờ xác nhận') return 'Đã giao – Chờ khách hàng xác nhận';
    return order.status || 'Trạng thái không rõ';
  };

  const badgeClass = () => {
    if (order.status && order.status.toLowerCase().includes('đổi')) return 'badge returning';
    if (order.status === 'Đã xác nhận') return 'badge confirmed';
    if (order.shippingStatus === 'Đã giao' && order.status === 'Chờ xác nhận') return 'badge pending';
    return 'badge';
  };

  const normalizeProducts = (items) => items.map(p => (typeof p === 'string' ? { name: p, qty: 1 } : p));

  return (
    <div className="delivered-detail-page">
      <div className="delivered-detail-card">
        <header className="detail-header">
          <div>
            <div className="order-id">Mã đơn hàng: <strong>{order.id}</strong></div>
            <div className={badgeClass()}>{badgeText()}</div>
            <div className="badge-desc">Đơn hàng đang chờ khách hàng xác nhận nhận hàng. Hệ thống sẽ tự động xác nhận sau 24 giờ kể từ thời điểm giao.</div>
          </div>
        </header>

        <section className="info-block">
          <h3>Thông tin đơn hàng</h3>
          <div className="info-grid">
            <div className="info-row"><strong>Mã đơn:</strong> {order.id}</div>
            <div className="info-row">
              <strong>Danh sách sản phẩm:</strong>
              <ul>
                {normalizeProducts(order.products).map((p, i) => (
                  <li key={i}>{p.name} × {p.qty}</li>
                ))}
              </ul>
            </div>
            <div className="info-row"><strong>Tổng tiền:</strong> {order.total.toLocaleString()} {order.currency}</div>
            <div className="info-row"><strong>Thời gian giao hàng:</strong> {order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : '—'}</div>
            <div className="info-row"><strong>Hình thức thanh toán:</strong> {order.paymentMethod || '—'}</div>
          </div>
        </section>

        <section className="info-block">
          <h3>Thông tin khách hàng</h3>
          <div className="customer-grid">
            <div className="customer-item"><FaUser className="icon"/> <div><strong>{order.customerName || '—'}</strong></div></div>
            <div className="customer-item"><FaPhone className="icon"/> <div>{order.phone || '—'}</div></div>
            <div className="customer-item"><FaEnvelope className="icon"/> <div>{order.email || '—'}</div></div>
            <div className="customer-item"><FaMapMarkerAlt className="icon"/> <div>{order.address || '—'}</div></div>
          </div>
        </section>

        <section className="info-block">
          <h3>Ghi chú & hệ thống xác nhận</h3>
          <div className="status-block">
            {order.status === 'Chờ xác nhận' && (
              <div>Chưa xác nhận từ khách hàng. Hệ thống sẽ tự động xác nhận sau 24 giờ kể từ thời điểm giao.</div>
            )}
            {order.status === 'Đã xác nhận' && (
              <div>Khách hàng đã xác nhận{order.confirmedAt ? ` lúc ${new Date(order.confirmedAt).toLocaleString()}` : ''}.</div>
            )}
            {order.status && order.status.toLowerCase().includes('đổi') && (
              <div>Đang xử lý yêu cầu đổi/trả.</div>
            )}
          </div>

          {order.feedback && (
            <div className="feedback-block">
              <h4>Feedback khách hàng</h4>
              <div>{order.feedback}</div>
            </div>
          )}
        </section>

        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <button onClick={() => setCurrentPage('delivered')} className="secondary">Quay lại</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrderDetail;
