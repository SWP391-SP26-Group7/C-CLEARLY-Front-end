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
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Mã đơn / Mã sản phẩm</th>
            <th>Tên khách hàng</th>
            <th>Tên sản phẩm</th>
            <th>Trạng thái đổi trả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {returnsList.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.orderId}</td>
              <td>{r.customerName}</td>
              <td>{(r.productNames || []).join(', ')}</td>
              <td>{r.status}</td>
              <td><button onClick={() => handleView(r.id)}>Xem chi tiết</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Returns;
