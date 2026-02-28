import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { canEdit } from '../permissions';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import './PreOrder.css'; // CSS cho trang

const STORAGE_KEY = 'cc_preorders_v1';

const loadPreOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const PreOrder = ({ setCurrentPage: setAppCurrentPage }) => {
  // Trang Quản lý đơn hàng Pre-Order
  // Hiển thị table với cột: ID | Tên sản phẩm | Số lượng đặt | Trạng thái | Xem chi tiết

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [orders, setOrders] = useState(loadPreOrders());

  const { user } = useAuth();
  const editable = canEdit(user.role, 'preorder');

  // Tính toán items hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      setSelectedOrder(null);
    }
  };

  const handleStatusChange = (newStatus) => {
    if (!editable) { alert('Bạn không có quyền chỉnh sửa đơn Pre-Order'); return; }
    if (selectedOrder.status === 'Chờ xác nhận' && newStatus !== 'Chờ xác nhận') {
      const requiredPayment = selectedOrder.totalPrice * 0.3;
      if (selectedOrder.paymentAmount < requiredPayment) {
        alert(`Cần thanh toán tối thiểu ${requiredPayment.toLocaleString()} VND (30% giá trị đơn hàng) để chuyển trạng thái.`);
        return;
      }
    }
    if (newStatus === 'Chuẩn bị đóng gói') {
      setShowConfirmDialog(true);
    } else {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      setHasUnsavedChanges(true);
    }
  };

  const handleConfirmComplete = () => {
    // Chuyển sang quản lý giao hàng
    alert('Đơn hàng chuyển sang quản lý giao hàng');
    setOrders(orders.filter(o => o.id !== selectedOrder.id));
    setSelectedOrder(null);
    setShowConfirmDialog(false);
    setAppCurrentPage('shipper');
  };

  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
    setSelectedOrder(null);
    setShowUnsavedModal(false);
  };

  const handleSaveAndQuit = () => {
    // Lưu và quit
    setOrders(orders.map(o => o.id === selectedOrder.id ? selectedOrder : o));
    setHasUnsavedChanges(false);
    setSelectedOrder(null);
    setShowUnsavedModal(false);
  };

  const handleSave = () => {
    if (selectedOrder.status === 'Chuẩn bị đóng gói') {
      setShowConfirmDialog(true);
    } else {
      // Lưu thay đổi
      setOrders(orders.map(o => o.id === selectedOrder.id ? selectedOrder : o));
      setSelectedOrder(null);
      setHasUnsavedChanges(false);
    }
  };

  if (selectedOrder) {
    return (
      <div className="order-detail">
        <div className="detail-header">
          <button onClick={handleBack}>Quay lại danh sách</button>
          <span>Mã đơn hàng: {selectedOrder.id}</span>
          <select value={selectedOrder.status} onChange={(e) => handleStatusChange(e.target.value)} disabled={!editable}>
            <option>Chờ xác nhận</option>
            <option>Chờ làm kính</option>
            <option>Chuẩn bị đóng gói</option>
          </select>
        </div>
        <div className="detail-content">
          <div className="info-card">
            <h3 className="card-title">👤 Thông tin khách hàng</h3>
            <p>Tên: Nguyễn Văn A</p>
            <p>SĐT: 0123456789</p>
            <p>Địa chỉ: Hà Nội</p>
          </div>
          <div className="info-card">
            <h3 className="card-title">📦 Thông tin sản phẩm</h3>
            <p>Tên sản phẩm: {selectedOrder.productName}</p>
            <p>Số lượng: {selectedOrder.quantity}</p>
          </div>
          <div className="info-card">
            <h3 className="card-title">💳 Thông tin thanh toán</h3>
            <p>Tổng tiền: {selectedOrder.totalPrice.toLocaleString()} VND</p>
            <p>Đã thanh toán: {selectedOrder.paymentAmount.toLocaleString()} VND</p>
            <p>Trạng thái: {selectedOrder.paymentAmount >= selectedOrder.totalPrice ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
          </div>
        </div>
        <button className="save-button" onClick={handleSave} disabled={!editable}>Lưu thay đổi</button>
        {showConfirmDialog && (
          <div className="confirm-dialog">
            <h3>Xác nhận hoàn thành đơn</h3>
            <p>Bạn có chắc chắn muốn hoàn thành đơn hàng này không?</p>
            <button onClick={handleConfirmComplete}>Xác nhận</button>
            <button onClick={handleCancelConfirm}>Hủy bỏ</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="preorder-page">
      <h1>Quản lý đơn hàng Pre-Order</h1>
      <table className="preorder-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng đặt</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td className={`status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</td>
              <td><button onClick={() => handleViewDetail(order)}>Xem chi tiết</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Modal isOpen={showConfirmDialog} onClose={handleCancelConfirm} title="Xác nhận hoàn thành đơn">
        <p>Bạn có muốn hoàn thành đơn hàng này không?</p>
        <button onClick={handleConfirmComplete} disabled={!editable}>Xác nhận</button>
        <button onClick={handleCancelConfirm}>Hủy bỏ</button>
      </Modal>
      <Modal isOpen={showUnsavedModal} onClose={() => setShowUnsavedModal(false)} title="⚠️ Thay đổi chưa lưu">
        <p>Thay đổi bạn đã thực hiện có thể không được lưu.</p>
        <button onClick={handleDiscard}>Discard</button>
        <button onClick={handleSaveAndQuit} disabled={!editable}>Save & Quit</button>
      </Modal>
    </div>
  );
};

export default PreOrder;