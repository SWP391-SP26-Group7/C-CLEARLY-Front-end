import React from 'react';
import { FaShoppingCart, FaTruck, FaBoxes } from 'react-icons/fa';
import './StatCard.css'; // CSS cho thẻ

const StatCard = ({ title, value, icon, compact = true }) => {
  // Component StatCard hiển thị thẻ thống kê tái sử dụng
  // title: tiêu đề thẻ
  // value: giá trị số
  // icon: tên icon

  const getIcon = () => {
    switch (icon) {
      case 'PreOrder':
        return <FaShoppingCart size={50} />;
      case 'Dashboard':
        return <FaTruck size={50} />;
      case 'Inventory':
        return <FaBoxes size={50} />;
      default:
        return <FaBoxes size={50} />;
    }
  };

  return (
    <div className={`stat-card ${compact ? 'compact' : 'large'}`}>
      <div className="stat-left">
        <div className="stat-square">{getIcon()}</div>
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;