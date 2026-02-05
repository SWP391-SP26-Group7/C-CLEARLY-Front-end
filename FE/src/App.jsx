import React, { useState, useEffect } from 'react'; // Import React và hooks
import Sidebar from './components/Sidebar'; // Import component Sidebar cho menu bên trái
import Header from './components/Header'; // Import component Header cho tiêu đề và thông tin user
import ManagerDashboard from './pages/ManagerDashboard'; // Import trang Dashboard
import PreOrder from './pages/PreOrder'; // Import trang Quản lý Pre-Order
import Prescription from './pages/Prescription'; // Import trang Quản lý Prescription
import DeliveredOrders from './pages/DeliveredOrders'; // Đơn đã giao
import DeliveredOrderDetail from './pages/DeliveredOrderDetail';
import Returns from './pages/Returns';
import ReturnDetail from './pages/ReturnDetail';
import Inventory from './pages/Inventory'; // Import trang Quản lý kho
import Products from './pages/Products'; // Trang Quản lý Sản phẩm (Products)
import Shipper from './pages/Shipper'; // Import trang Quản lý giao hàng
import Support from './pages/Support'; // Import trang Hỗ trợ
import ChangePassword from './pages/ChangePassword'; // Import trang Đổi mật khẩu
import StaffManagement from './pages/StaffManagement';
import './App.css'; // Import CSS chính cho App
import seedOrders from './utils/seedOrders';
import seedProducts from './utils/seedProducts';
import seedStaff from './utils/seedStaff';

function App() { // Component chính của ứng dụng
  // Quản lý state cho trang hiện tại
  const [currentPage, setCurrentPage] = useState('dashboard'); // State lưu trang đang hiển thị, mặc định 'dashboard'

  // Seed initial data into localStorage on first load
  useEffect(() => {
    try { seedOrders(); } catch (e) { /* ignore */ }
    try { seedProducts(); } catch (e) { /* ignore */ }
    try { seedStaff(); } catch (e) { /* ignore */ }
  }, []);

  // Hàm render nội dung dựa trên currentPage: Switch case để chọn component tương ứng
  const renderPage = () => {
    // support page keys and detail pages encoded as prefix:id
    if (currentPage.startsWith('delivered-detail:')) {
      const id = currentPage.split(':')[1];
      return <DeliveredOrderDetail id={id} setCurrentPage={setCurrentPage} />;
    }
    if (currentPage.startsWith('return-detail:')) {
      const id = currentPage.split(':')[1];
      return <ReturnDetail id={id} setCurrentPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <ManagerDashboard />; // Hiển thị Dashboard
      case 'preorder':
        return <PreOrder setCurrentPage={setCurrentPage} />; // Hiển thị Pre-Order, truyền setCurrentPage để chuyển trang
      case 'prescription':
        return <Prescription setCurrentPage={setCurrentPage} />; // Hiển thị Prescription, truyền setCurrentPage
      case 'delivered':
        return <DeliveredOrders setCurrentPage={setCurrentPage} />; // Đơn đã giao
      case 'products':
        return <Products setCurrentPage={setCurrentPage} />; // Danh sách Sản phẩm
      case 'staff':
        return <StaffManagement />; // Quản lý nhân sự
      case 'returns':
        return <Returns setCurrentPage={setCurrentPage} />; // Đổi trả hàng
      case 'inventory':
        return <Inventory />; // Hiển thị Inventory
      case 'shipper':
        return <Shipper />; // Hiển thị Shipper
      case 'support':
        return <Support />; // Hiển thị Support
      case 'changepassword':
        return <ChangePassword />; // Hiển thị Change Password
      default:
        return <ManagerDashboard />; // Mặc định về Dashboard
    }
  };

  // Hàm lấy tiêu đề cho Header dựa trên currentPage
  const getPageTitle = () => {
    if (currentPage.startsWith('delivered-detail:')) return 'Chi tiết đơn đã giao';
    if (currentPage.startsWith('return-detail:')) return 'Chi tiết đổi trả';
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard'; // Tiêu đề cho Dashboard
      case 'preorder':
        return 'Quản lý đơn Pre-Order'; // Tiêu đề cho Pre-Order
      case 'prescription':
        return 'Quản lý đơn Prescription'; // Tiêu đề cho Prescription
      case 'delivered':
        return 'Đơn đã giao';
      case 'products':
        return 'Sản phẩm';
      case 'staff':
        return 'Quản lý nhân sự';
      case 'returns':
        return 'Đổi trả hàng';
      case 'inventory':
        return 'Quản lý sản phẩm'; // Tiêu đề cho Inventory
      case 'shipper':
        return 'Quản lý giao hàng'; // Tiêu đề cho Shipper
      case 'support':
        return 'Hỗ trợ'; // Tiêu đề cho Support
      case 'changepassword':
        return 'Đổi mật khẩu'; // Tiêu đề cho Change Password
      default:
        return 'Dashboard'; // Mặc định
    }
  };

  return (
    <div className="app"> {/* Container chính của app */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} /> {/* Sidebar bên trái */}
      <div className="main-content"> {/* Nội dung chính bên phải */}
        <Header title={getPageTitle()} /> {/* Header với tiêu đề động */}
        <main>
          {renderPage()} {/* Render trang hiện tại */}
        </main>
      </div>
    </div>
  );
}

export default App; // Export component App