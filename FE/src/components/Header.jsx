import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './Header.css'; // Tạo CSS nếu cần

const Header = ({ title }) => {
  // Component Header hiển thị trên cùng
  // title: tiêu đề của trang

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Mock data cho thông báo
  const notifications = [
    'Thông báo từ admin: Đơn hàng mới',
    'Cập nhật hệ thống',
    'Nhắc nhở: Kiểm tra kho'
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/images/Logo.png" alt="Logo" />
        <span className="title">/ MANAGER</span>
      </div>
      <div className="header-right">
        <button className="notification-btn" onClick={toggleNotifications}>
          <FaBell size={30} />
        </button>
        {showNotifications && (
          <div className="notification-dropdown">
            {notifications.map((note, index) => (
              <div key={index} className="notification-item">{note}</div>
            ))}
          </div>
        )}
        <div className="user-info" onClick={toggleUserDropdown}>
          <FaUser size={40} />
          <span>Manager</span>
        </div>
        {showUserDropdown && (
          <div className="user-dropdown">
            <div className="user-dropdown-item">Tên đăng nhập: manager01</div>
            <div className="user-dropdown-item">Vai trò: Nhân viên</div>
            <div className="user-dropdown-item">Email: manager@example.com</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;