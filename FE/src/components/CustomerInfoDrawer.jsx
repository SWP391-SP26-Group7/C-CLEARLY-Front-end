import React from 'react';
import './CustomerInfoDrawer.css';

const CustomerInfoDrawer = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="cid-backdrop" onClick={onClose}>
      <div className="cid-drawer" onClick={e=>e.stopPropagation()}>
        <div className="cid-header">
          <h3>Thông tin khách hàng</h3>
          <button onClick={onClose}>Đóng</button>
        </div>
        <div className="cid-body">
          <p><strong>Tên:</strong> Nguyễn A</p>
          <p><strong>SĐT:</strong> 0909123456</p>
          <p><strong>Email:</strong> a.nguyen@example.com</p>
          <p><strong>Trạng thái:</strong> VIP</p>
          <h4>Lịch sử đơn hàng</h4>
          <ul>
            <li>#ORD12345 - Đã giao</li>
            <li>#ORD12222 - Hoàn trả</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoDrawer;
