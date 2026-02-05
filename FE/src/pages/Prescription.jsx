import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import './Prescription.css'; // CSS cho trang

const Prescription = ({ setCurrentPage: setAppCurrentPage }) => {
  // Trang Quản lý đơn hàng Prescription
  // Hiển thị table với cột: ID | Tên sản phẩm | Số lượng đặt | Trạng thái | Xem chi tiết

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [refractionData, setRefractionData] = useState({
    OD: { sphere: '', cylinder: '', axis: '', pd: '' },
    OS: { sphere: '', cylinder: '', axis: '', pd: '' }
  });

  const [orders, setOrders] = useState([
    { id: 1, productName: 'Kính Lily (Lily Frame)', quantity: 3, status: 'Xác nhận đơn hàng' },
    { id: 2, productName: 'Kính Aviator', quantity: 1, status: 'Gia công', refractionData: {
      OD: { sphere: '-2.00', cylinder: '-1.00', axis: '90', pd: '62' },
      OS: { sphere: '-1.50', cylinder: '-0.50', axis: '180', pd: '61' }
    }},
    // Mock data, sau này backend sẽ cung cấp
  ]);

  // Tính toán items hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setRefractionData(order.refractionData || {
      OD: { sphere: '', cylinder: '', axis: '', pd: '' },
      OS: { sphere: '', cylinder: '', axis: '', pd: '' }
    });
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      setSelectedOrder(null);
    }
  };

  const validateRefraction = () => {
    const { OD, OS } = refractionData;
    return OD.sphere && OD.cylinder && OD.axis && OD.pd && OS.sphere && OS.cylinder && OS.axis && OS.pd;
  };

  const handleStatusChange = (newStatus) => {
    if (selectedOrder.status !== 'Xác nhận đơn hàng' && !validateRefraction()) {
      alert('Bắt buộc phải có đầy đủ thông số: Độ cận (SPH), Độ loạn (CYL), Trục (Axis) và Khoảng cách đồng tử (PD) cho cả OD và OS.');
      return;
    }
    if (newStatus === 'Đóng gói') {
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

  const handleSave = () => {
    if (selectedOrder.status !== 'Xác nhận đơn hàng' && !validateRefraction()) {
      alert('Bắt buộc phải có đầy đủ thông số: Độ cận (SPH), Độ loạn (CYL), Trục (Axis) và Khoảng cách đồng tử (PD) cho cả OD và OS.');
      return;
    }
    if (selectedOrder.status === 'Đóng gói') {
      setShowConfirmDialog(true);
    } else {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...selectedOrder, refractionData } : o));
      setSelectedOrder(null);
      setHasUnsavedChanges(false);
    }
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
    setSelectedOrder(null);
    setShowUnsavedModal(false);
  };

  const handleSaveAndQuit = () => {
    if (selectedOrder.status !== 'Xác nhận đơn hàng' && !validateRefraction()) {
      alert('Bắt buộc phải có đầy đủ thông số: Độ cận (SPH), Độ loạn (CYL), Trục (Axis) và Khoảng cách đồng tử (PD) cho cả OD và OS.');
      return;
    }
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...selectedOrder, refractionData } : o));
    setHasUnsavedChanges(false);
    setSelectedOrder(null);
    setShowUnsavedModal(false);
  };

  if (selectedOrder) {
    return (
      <div className="order-detail">
        <div className="detail-header">
          <button onClick={handleBack}>Quay lại danh sách</button>
          <span>Mã đơn hàng: {selectedOrder.id}</span>
          <select value={selectedOrder.status} onChange={(e) => handleStatusChange(e.target.value)}>
            <option>Xác nhận đơn hàng</option>
            <option>Gia công</option>
            <option>Đóng gói</option>
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
          {selectedOrder.status === 'Xác nhận đơn hàng' && (
            <div className="info-card">
              <h3 className="card-title">📋 Yêu cầu khách hàng</h3>
              <p>Hình ảnh đơn thuốc: [Mock image]</p>
            </div>
          )}
          {selectedOrder.status !== 'Xác nhận đơn hàng' && (
            <div className="info-card">
              <h3 className="card-title">📝 Ghi chú kỹ thuật</h3>
              <table className="refraction-table">
                <thead>
                  <tr>
                    <th>Eye</th>
                    <th>Sphere (SPH)</th>
                    <th>Cylinder (CYL)</th>
                    <th>Axis</th>
                    <th>Pupillary Distance (PD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OD</td>
                    <td><input type="text" value={refractionData.OD.sphere} onChange={(e) => setRefractionData({...refractionData, OD: {...refractionData.OD, sphere: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OD.cylinder} onChange={(e) => setRefractionData({...refractionData, OD: {...refractionData.OD, cylinder: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OD.axis} onChange={(e) => setRefractionData({...refractionData, OD: {...refractionData.OD, axis: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OD.pd} onChange={(e) => setRefractionData({...refractionData, OD: {...refractionData.OD, pd: e.target.value}})} /></td>
                  </tr>
                  <tr>
                    <td>OS</td>
                    <td><input type="text" value={refractionData.OS.sphere} onChange={(e) => setRefractionData({...refractionData, OS: {...refractionData.OS, sphere: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OS.cylinder} onChange={(e) => setRefractionData({...refractionData, OS: {...refractionData.OS, cylinder: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OS.axis} onChange={(e) => setRefractionData({...refractionData, OS: {...refractionData.OS, axis: e.target.value}})} /></td>
                    <td><input type="text" value={refractionData.OS.pd} onChange={(e) => setRefractionData({...refractionData, OS: {...refractionData.OS, pd: e.target.value}})} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="info-card">
            <h3 className="card-title">💳 Thông tin thanh toán</h3>
            <p>Tổng tiền: 500.000 VND</p>
            <p>Trạng thái: Đã thanh toán</p>
          </div>
        </div>
        <button className="save-button" onClick={handleSave}>Lưu thay đổi</button>
      </div>
    );
  }

  return (
    <div className="prescription-page">
      <h1>Quản lý đơn hàng Prescription</h1>
      <table className="prescription-table">
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
        <button onClick={handleConfirmComplete}>Xác nhận</button>
        <button onClick={handleCancelConfirm}>Hủy bỏ</button>
      </Modal>
      <Modal isOpen={showUnsavedModal} onClose={() => setShowUnsavedModal(false)} title="⚠️ Thay đổi chưa lưu">
        <p>Thay đổi bạn đã thực hiện có thể không được lưu.</p>
        <button onClick={handleDiscard}>Discard</button>
        <button onClick={handleSaveAndQuit}>Save & Quit</button>
      </Modal>
    </div>
  );
};

export default Prescription;