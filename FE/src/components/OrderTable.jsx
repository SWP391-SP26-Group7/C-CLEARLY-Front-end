import React, { useState } from 'react';
import './OrderTable.css'; // CSS cho bảng

const OrderTable = ({ orders }) => {
  // Component OrderTable hiển thị bảng đơn hàng
  // orders: mảng dữ liệu đơn hàng mock

  const [searchTerm, setSearchTerm] = useState('');

  // Lọc orders dựa trên searchTerm
  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.includes(searchTerm)
  );

  return (
    <div className="order-table-container">
      <h2>Đơn hàng mới nhất</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo ID, tên khách hàng hoặc SĐT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.total}</td>
              <td>{order.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;