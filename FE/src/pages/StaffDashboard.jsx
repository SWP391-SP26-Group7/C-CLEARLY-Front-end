import React from 'react';
import StatCard from '../components/StatCard';
import OrderTable from '../components/OrderTable';

const ManagerDashboard = () => {
  // Trang Dashboard chính cho Manager
  // Hiển thị tiêu đề, thẻ thống kê, và bảng đơn hàng

  // Mock data cho đơn hàng
  const orders = [
    { id: 1, customerName: 'Nguyễn Văn A', phone: '0123456789', address: 'Hà Nội', total: '500.000 VND', paymentStatus: 'Đã thanh toán', type: 'Prescription', shippingStatus: 'Đang xử lý' },
    { id: 2, customerName: 'Trần Thị B', phone: '0987654321', address: 'TP.HCM', total: '300.000 VND', paymentStatus: 'Chưa thanh toán', type: 'Pre-Order', shippingStatus: 'Đang vận chuyển' },
    { id: 3, customerName: 'Lê Văn C', phone: '0111111111', address: 'Đà Nẵng', total: '400.000 VND', paymentStatus: 'Đã thanh toán', type: 'Prescription', shippingStatus: 'Đã giao' },
    { id: 4, customerName: 'Phạm Thị D', phone: '0222222222', address: 'Cần Thơ', total: '600.000 VND', paymentStatus: 'Chưa thanh toán', type: 'Pre-Order', shippingStatus: 'Đang xử lý' },
    // Thêm mock data khác
  ];

  // Tính toán stats từ orders
  const prescriptionOrders = orders.filter(order => order.type === 'Prescription').length;
  const preOrderOrders = orders.filter(order => order.type === 'Pre-Order').length;
  const shippingOrders = orders.filter(order => order.shippingStatus === 'Đang vận chuyển').length;
  const inventoryItems = 1234; // Mock cho hàng tồn kho, sau này có thể tính từ data khác

  const stats = [
    { title: 'Đơn hàng Prescription', value: prescriptionOrders, icon: 'Prescription' },
    { title: 'Đơn hàng Pre-Order', value: preOrderOrders, icon: 'PreOrder' },
    { title: 'Đang vận chuyển', value: shippingOrders, icon: 'Dashboard' },
    { title: 'Hàng tồn kho', value: inventoryItems, icon: 'Inventory' }
  ];

  return (
    <div className="dashboard">
      <h1>XIN CHÀO MANAGER!</h1>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default ManagerDashboard;