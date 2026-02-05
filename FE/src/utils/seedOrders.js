// Utility to provide initial orders and seed localStorage
const STORAGE_KEY = 'cc_orders_v1';

export const defaultOrders = [
  { id: 'ORD001', products: [{ name: 'Kính Lily (Lily Frame)', qty: 1 }], total: 500000, currency: 'VND', paymentMethod: 'Thanh toán khi nhận hàng (COD)', status: 'Chờ xác nhận', shippingStatus: 'Đã giao', deliveredAt: Date.now() - 1000 * 60 * 60 * 25, feedback: '', customerName: 'Nguyễn Văn A', phone: '0123456789', email: 'a@example.com', address: 'Hà Nội' },
  { id: 'ORD002', products: [{ name: 'Kính Tròn (Round)', qty: 1 }], total: 300000, currency: 'VND', paymentMethod: 'Thanh toán online', status: 'Chờ xác nhận', shippingStatus: 'Đã giao', deliveredAt: Date.now() - 1000 * 60 * 60 * 2, feedback: '', customerName: 'Trần Thị B', phone: '0987654321', email: 'b@example.com', address: 'TP.HCM' },
  { id: 'ORD003', products: [{ name: 'Kính Cat-Eye', qty: 1 }], total: 400000, currency: 'VND', paymentMethod: 'Thanh toán online', status: 'Đã xác nhận', shippingStatus: 'Đã giao', deliveredAt: Date.now() - 1000 * 60 * 60 * 48, feedback: 'Giao hàng nhanh, sản phẩm OK', customerName: 'Lê Văn C', phone: '0111111111', email: 'c@example.com', address: 'Đà Nẵng', confirmedAt: Date.now() - 1000 * 60 * 60 * 47 }
];

export function seedInitialOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOrders));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default seedInitialOrders;
