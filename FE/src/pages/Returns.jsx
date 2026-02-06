import React, { useEffect, useState } from 'react';

const loadReturns = () => {
  try {
    const raw = localStorage.getItem('cc_returns_v1');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const Returns = ({ setCurrentPage }) => {
  const [returnsList, setReturnsList] = useState(loadReturns());

  useEffect(() => {
    setReturnsList(loadReturns());
  }, []);

  const handleView = (id) => setCurrentPage(`return-detail:${id}`);

  return (
    <div className="order-table-container">
      <h2>Đổi trả hàng</h2>
      <table className="order-table framed-table">
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Mã đơn / Mã sản phẩm</th>
            <th>Tên khách hàng</th>
            <th>Tên sản phẩm</th>
            <th>Trạng thái đổi trả</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {returnsList.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.orderId}</td>
              <td>{r.customerName}</td>
              <td>{(r.productNames || []).join(', ')}</td>
              <td>{(() => {
                const s = (r.status || '').toLowerCase();
                if (s.includes('xác nhận') || s.includes('hoàn')) return <span className="status-badge status-success">{r.status}</span>;
                if (s.includes('đang') || s.includes('chờ')) return <span className="status-badge status-warning">{r.status}</span>;
                return <span className="status-badge status-info">{r.status}</span>;
              })()}</td>
              <td><button className="action-link" onClick={() => handleView(r.id)}>Xem chi tiết</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Returns;
