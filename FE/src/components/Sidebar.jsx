import React, { useState } from 'react'; // Import React và useState hook để quản lý state
import { FaTachometerAlt, FaGlasses, FaShoppingCart, FaFileMedical, FaWarehouse, FaTruck, FaQuestionCircle, FaKey, FaSignOutAlt, FaChevronDown, FaChevronUp, FaCheckCircle, FaUndoAlt, FaUsers } from 'react-icons/fa'; // Import các icon từ react-icons cho menu
import './Sidebar.css'; // Import CSS cho styling Sidebar

const Sidebar = ({ currentPage, setCurrentPage }) => {
  // Component Sidebar: Hiển thị thanh menu bên trái với cấu trúc phân cấp
  // Props:
  // - currentPage: string, trang hiện tại đang active
  // - setCurrentPage: function, hàm để thay đổi trang

  const [openSubMenu, setOpenSubMenu] = useState(null); // State để theo dõi sub-menu nào đang mở (key của menu cha)

  // Dữ liệu menu chính: Dashboard, Quản lý sản phẩm (với sub-menu), Quản lý kho, Quản lý giao hàng
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt }, // Menu Dashboard: Trang tổng quan
    { key: 'orders', label: 'Quản lý đơn hàng', icon: FaShoppingCart, sub: [ // Menu cha "Quản lý đơn hàng" với sub-menu
      { key: 'preorder', label: 'Quản lý Pre-Order', icon: FaShoppingCart }, // Sub-menu: Quản lý đơn đặt hàng trước
      { key: 'prescription', label: 'Quản lý Prescription', icon: FaFileMedical }, // Sub-menu: Quản lý đơn thuốc
      { key: 'delivered', label: 'Đơn đã giao', icon: FaCheckCircle }, // Sub-menu: Đơn đã giao
      { key: 'returns', label: 'Đổi trả hàng', icon: FaUndoAlt } // Sub-menu: Đổi trả hàng
    ]},
    { key: 'inventory', label: 'Quản lý kho', icon: FaWarehouse, sub: [
      { key: 'products', label: 'Sản phẩm', icon: FaGlasses }
    ] }, // Menu: Quản lý tồn kho sản phẩm
    { key: 'staff', label: 'Quản lý nhân sự', icon: FaUsers },
    { key: 'shipper', label: 'Quản lý giao hàng', icon: FaTruck } // Menu: Quản lý shipper và giao hàng
  ];

  // Dữ liệu menu bottom: Hỗ trợ, Đổi mật khẩu, Đăng xuất (tách biệt với nghiệp vụ)
  const bottomItems = [
    { key: 'support', label: 'Hỗ trợ', icon: FaQuestionCircle }, // Menu: Trang hỗ trợ khách hàng
    { key: 'changepassword', label: 'Đổi mật khẩu', icon: FaKey }, // Menu: Trang đổi mật khẩu
    { key: 'logout', label: 'Đăng xuất', icon: FaSignOutAlt } // Menu: Đăng xuất tài khoản
  ];

  // Hàm xử lý click vào menu item: Nếu có sub-menu thì toggle mở/đóng, ngược lại chuyển trang
  const handleMenuClick = (item) => {
    if (item.sub) {
      setOpenSubMenu(openSubMenu === item.key ? null : item.key); // Toggle sub-menu
    } else {
      setCurrentPage(item.key); // Chuyển trang
    }
  };

  // Hàm xử lý click vào sub-menu item: Chuyển trực tiếp đến trang con
  const handleSubClick = (subKey) => {
    setCurrentPage(subKey);
  };

  return (
    <div className="sidebar"> {/* Container chính của Sidebar */}
      <div className="logo"> {/* Phần logo ở đầu Sidebar */}
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <ul className="menu"> {/* Danh sách menu chính */}
        {menuItems.map(item => (
          <li key={item.key} className={`menu-item ${currentPage === item.key ? 'active' : ''}`}> {/* Item menu với class active nếu đang chọn */}
            <div className="menu-card" onClick={() => handleMenuClick(item)}> {/* Card chứa icon, label, và chevron nếu có sub */}
              <item.icon className="menu-icon" /> {/* Icon đại diện cho menu */}
              <span>{item.label}</span> {/* Nhãn menu */}
              {item.sub && ( /* Nếu có sub-menu, hiển thị chevron */
                openSubMenu === item.key ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />
              )}
            </div>
            {item.sub && openSubMenu === item.key && (
              <ul className="sub-menu">
                {item.sub.map(sub => (
                  <li
                    key={sub.key}
                    className={`sub-item ${currentPage === sub.key ? 'active' : ''}`}
                    onClick={() => handleSubClick(sub.key)}
                  >
                    <sub.icon className="sub-icon" /> {/* Icon cho sub-menu */}
                    <span>{sub.label}</span> {/* Nhãn sub-menu */}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className="bottom-menu"> {/* Danh sách menu bottom */}
        {bottomItems.map(item => (
          <li
            key={item.key}
            className={`menu-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.key)}
          >
            <div className="menu-card"> {/* Card cho bottom menu */}
              <item.icon className="menu-icon" />
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;