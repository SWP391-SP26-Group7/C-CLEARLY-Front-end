import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import './Header.css'; // Tạo CSS nếu cần

const Header = ({ title }) => {
  // Component Header hiển thị trên cùng
  // title: tiêu đề của trang

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, login, logout, roles } = useAuth();

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
        <div>
          <div className="title">Manager Dashboard</div>
        </div>
      </div>
      <div className="header-right">
        <button className="notification-btn" onClick={toggleNotifications}>
          <FaBell size={18} />
        </button>
        {showNotifications && (
          <div className="notification-dropdown">
            {notifications.map((note, index) => (
              <div key={index} className="notification-item">{note}</div>
            ))}
          </div>
        )}
        <div className="user-info" onClick={toggleUserDropdown}>
          <div className="user-avatar">{user.role ? user.role.charAt(0) : '?'}</div>
          <div>
            <div className="user-name">{user.name || 'Guest'}</div>
            <div className="user-role">{user.role || 'Không xác định'}</div>
          </div>
        </div>
        {showUserDropdown && (
          <div className="user-dropdown">
            {/* allow switching role for demo purposes */}
            <div className="user-dropdown-item">
              <label>Vai trò:&nbsp;</label>
              <select
                value={user.role}
                onChange={e => login(e.target.value, user.name)}
              >
                <option value="">(none)</option>
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="user-dropdown-item">
              <button onClick={() => {
                logout();
                setShowUserDropdown(false);
              }}>Đăng xuất</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;