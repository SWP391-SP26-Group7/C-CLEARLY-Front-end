import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import './Shipper.css'; // CSS cho trang

const Shipper = () => {
  // Trang Quản lý giao hàng
  // Hiển thị table với mock data và pagination

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedShipper, setSelectedShipper] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [shippers, setShippers] = useState([
    { id: 1, name: 'Shipper A', status: 'Đang giao', orders: [
      { id: 101, productName: 'Kính Lily (Lily Frame)', customer: 'Nguyễn Văn A', address: 'Hà Nội', status: 'Đang giao' },
      { id: 102, productName: 'Kính Aviator', customer: 'Trần Thị B', address: 'TP.HCM', status: 'Đang giao' }
    ]},
    { id: 2, name: 'Shipper B', status: 'Sẵn sàng', orders: [] },
    // Mock data, sau này backend sẽ cung cấp
  ]);

  // Tính toán items hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShippers = shippers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(shippers.length / itemsPerPage);

  const handleViewDetail = (shipper) => {
    setSelectedShipper(shipper);
    setUploadedImage(null);
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      setSelectedShipper(null);
    }
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'Hoàn thành' && !uploadedImage) {
      alert('Buộc phải chụp và upload ảnh đơn hàng trước khi xác nhận hoàn thành.');
      return;
    }
    setSelectedShipper({ ...selectedShipper, status: newStatus });
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (selectedShipper.status === 'Hoàn thành' && !uploadedImage) {
      alert('Buộc phải chụp và upload ảnh đơn hàng trước khi xác nhận hoàn thành.');
      return;
    }
    setShippers(shippers.map(s => s.id === selectedShipper.id ? selectedShipper : s));
    setSelectedShipper(null);
    setHasUnsavedChanges(false);
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
    setSelectedShipper(null);
    setShowUnsavedModal(false);
  };

  const handleSaveAndQuit = () => {
    if (selectedShipper.status === 'Hoàn thành' && !uploadedImage) {
      alert('Buộc phải chụp và upload ảnh đơn hàng trước khi xác nhận hoàn thành.');
      return;
    }
    setShippers(shippers.map(s => s.id === selectedShipper.id ? selectedShipper : s));
    setHasUnsavedChanges(false);
    setSelectedShipper(null);
    setShowUnsavedModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  if (selectedShipper) {
    return (
      <div className="shipper-detail">
        <div className="detail-header">
          <button onClick={handleBack}>Quay lại danh sách</button>
          <span>Shipper: {selectedShipper.name}</span>
          <select value={selectedShipper.status} onChange={(e) => handleStatusChange(e.target.value)}>
            <option>Chờ nhận shipper</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
          </select>
        </div>
        <div className="detail-content">
          <h3>Danh sách đơn hàng</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID Đơn</th>
                <th>Sản phẩm</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {selectedShipper.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.customer}</td>
                  <td>{order.address}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedShipper.status === 'Hoàn thành' && (
            <div>
              <h3>Ảnh đơn hàng</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploadedImage && <img src={uploadedImage} alt="Đơn hàng" style={{ maxWidth: '200px' }} />}
            </div>
          )}
          <h3>Vị trí Shipper</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969!2d105.8542!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9b8c5b8c5b%3A0x5b5b5b5b5b5b5b5b!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1638360000000!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Shipper Location"
          ></iframe>
        </div>
        <button onClick={handleSave}>Lưu thay đổi</button>
      </div>
    );
  }

  return (
    <div className="shipper-page">
      <h1>Quản lý giao hàng</h1>
      <table className="shipper-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Shipper</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {currentShippers.map(shipper => (
            <tr key={shipper.id}>
              <td>{shipper.id}</td>
              <td>{shipper.name}</td>
              <td className={`status-${shipper.status.replace(/\s+/g, '-').toLowerCase()}`}>{shipper.status}</td>
              <td><button onClick={() => handleViewDetail(shipper)}>Xem chi tiết</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Modal isOpen={showUnsavedModal} onClose={() => setShowUnsavedModal(false)} title="⚠️ Thay đổi chưa lưu">
        <p>Thay đổi bạn đã thực hiện có thể không được lưu.</p>
        <button onClick={handleDiscard}>Discard</button>
        <button onClick={handleSaveAndQuit}>Save & Quit</button>
      </Modal>
    </div>
  );
};

export default Shipper;