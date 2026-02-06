import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import OrderTable from '../components/OrderTable';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  // Trang Dashboard chính cho Manager
  // Hiển thị tiêu đề, thẻ thống kê, và bảng đơn hàng

  const [stats, setStats] = useState([
    { title: 'Đơn hàng Prescription', value: 0, icon: 'Prescription' },
    { title: 'Đơn hàng Pre-Order', value: 0, icon: 'PreOrder' },
    { title: 'Đang vận chuyển', value: 0, icon: 'Dashboard' },
    { title: 'Hàng tồn kho', value: 0, icon: 'Inventory' }
  ]);

  const [orders, setOrders] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const prescriptions = JSON.parse(localStorage.getItem('cc_prescriptions_v1') || '[]');
    const preorders = JSON.parse(localStorage.getItem('cc_preorders_v1') || '[]');
    const shippers = JSON.parse(localStorage.getItem('cc_shippers_v1') || '[]');
    const products = JSON.parse(localStorage.getItem('cc_products_v1') || '[]');

    // Calculate inventory count
    const totalInventory = products.reduce((sum, p) => sum + (p.stock || 0), 0);

    setStats([
      { title: 'Đơn hàng Prescription', value: prescriptions.length, icon: 'Prescription' },
      { title: 'Đơn hàng Pre-Order', value: preorders.length, icon: 'PreOrder' },
      { title: 'Đang vận chuyển', value: shippers.length, icon: 'Dashboard' },
      { title: 'Hàng tồn kho', value: totalInventory, icon: 'Inventory' }
    ]);

    // Combine prescriptions and preorders for OrderTable
    const combinedOrders = [
      ...prescriptions.map(p => ({
        id: p.id,
        customerName: p.customerName || 'N/A',
        phone: p.phone || '',
        address: p.address || '',
        total: p.total ? `${p.total.toLocaleString()} VND` : '0 VND',
        paymentStatus: p.paymentStatus || 'Chưa thanh toán',
        type: 'Prescription',
        shippingStatus: p.shippingStatus || 'Chờ xử lý'
      })),
      ...preorders.map(po => ({
        id: po.id,
        customerName: po.customerName || 'N/A',
        phone: po.phone || '',
        address: po.address || '',
        total: po.totalPrice ? `${po.totalPrice.toLocaleString()} VND` : '0 VND',
        paymentStatus: po.paymentStatus || 'Chưa thanh toán',
        type: 'Pre-Order',
        shippingStatus: po.shippingStatus || 'Chờ xử lý'
      }))
    ];

    setOrders(combinedOrders);
  }, []);

  const [now, setNow] = useState(new Date());
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate weekly revenue from delivered orders
  useEffect(() => {
    const deliveredOrders = JSON.parse(localStorage.getItem('cc_orders_v1') || '[]');
    
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Create 4 weeks data
    const weeks = [
      { week: 'Tuần 1', start: new Date(firstDay), end: new Date(firstDay.getTime() + 6 * 24 * 60 * 60 * 1000) },
      { week: 'Tuần 2', start: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000), end: new Date(firstDay.getTime() + 13 * 24 * 60 * 60 * 1000) },
      { week: 'Tuần 3', start: new Date(firstDay.getTime() + 14 * 24 * 60 * 60 * 1000), end: new Date(firstDay.getTime() + 20 * 24 * 60 * 60 * 1000) },
      { week: 'Tuần 4', start: new Date(firstDay.getTime() + 21 * 24 * 60 * 60 * 1000), end: lastDay }
    ];

    const chartData = weeks.map(w => {
      let revenue = 0;
      deliveredOrders.forEach(order => {
        if (order.shippingStatus === 'Đã giao' && order.status === 'Đã xác nhận') {
          const deliveredDate = new Date(order.deliveredAt || Date.now());
          if (deliveredDate >= w.start && deliveredDate <= w.end) {
            revenue += order.total || 0;
          }
        }
      });
      return {
        week: w.week,
        revenue
      };
    });

    setWeeklyRevenue(chartData);
  }, []);

  const formatDateTime = (date) => {
    const datePart = date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timePart = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="dashboard-page">
      <div className="profile-header">
        <div className="profile-avatar">M</div>
        <div className="profile-info">
          <h2>Welcome to WPH Dashboard</h2>
          <div className="meta">@manager • {formatDateTime(now)}</div>
        </div>
      </div>

      <div className="stats-row">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            compact={false}
          />
        ))}
      </div>

      <div className="main-area">
        <div className="chart-box">
          <div className="chart-header">
            <h3>Doanh thu cửa hàng - Tháng này</h3>
          </div>
          <div className="chart-content">
            {weeklyRevenue.length > 0 ? (
              <div className="column-chart">
                <div className="chart-info">
                  <div className="total-revenue">
                    Tổng doanh thu tháng: <strong>{weeklyRevenue.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('vi-VN')} đ</strong>
                  </div>
                </div>
                <div className="chart-container">
                  <div className="bars-wrapper">
                    {weeklyRevenue.map((item, idx) => {
                      const maxRevenue = Math.max(...weeklyRevenue.map(r => r.revenue), 1000000);
                      const barHeight = (item.revenue / maxRevenue) * 300;
                      return (
                        <div key={idx} className="bar-column">
                          <div className="bar-value">
                            {item.revenue > 0 ? (item.revenue / 1000000).toFixed(1) + 'M' : '0'}
                          </div>
                          <div className="bar" style={{ height: `${barHeight}px` }}></div>
                          <div className="bar-label">{item.week}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="chart-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chart-placeholder">Chưa có dữ liệu doanh thu</div>
            )}
          </div>
        </div>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default ManagerDashboard;