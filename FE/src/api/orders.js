import api from "./index";

// Business rules related to orders and operations
// BR-14: Xác nhận đơn và chuyển trạng thái xử lý
// BR-15: Xử lý pre-order khi hàng về và thông báo khách
// BR-16: Xử lý khiếu nại: đổi trả, bảo hành, hoàn tiền
// BR-18: Đóng gói, tạo vận đơn, cập nhật tracking
// BR-19: Gia công lắp tròng với đơn prescription
// BR-20: Nhập kho khi hàng pre-order về
// BR-21: Quản lý tồn kho theo warehouse
// BR-26: Xem báo cáo doanh thu và thống kê

export function fetchOrders(params = {}) {
  // ví dụ params: {status, page, customerId}
  return api.request(`/orders?${new URLSearchParams(params)}`);
}

export function getOrder(id) {
  return api.request(`/orders/${id}`);
}

export function updateOrderStatus(id, status) {
  // BR-14, BR-18
  return api.request(`/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export function addOrderNote(id, note) {
  return api.request(`/orders/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ note }),
  });
}

export function processPreorder(id) {
  // BR-15 & BR-20
  return api.request(`/orders/${id}/process-preorder`, {
    method: "POST",
  });
}

export function handleComplaint(id, action, data) {
  // BR-16: action could be "refund", "exchange", "warranty"
  return api.request(`/orders/${id}/complaint`, {
    method: "POST",
    body: JSON.stringify({ action, ...data }),
  });
}

export function updateTracking(id, trackingInfo) {
  // BR-18
  return api.request(`/orders/${id}/tracking`, {
    method: "PUT",
    body: JSON.stringify(trackingInfo),
  });
}

export function attachPrescriptionToOrder(id, prescriptionId) {
  // BR-19
  return api.request(`/orders/${id}/prescription`, {
    method: "PUT",
    body: JSON.stringify({ prescriptionId }),
  });
}

export function fetchRevenueReport(params = {}) {
  // BR-26
  return api.request(`/reports/revenue?${new URLSearchParams(params)}`);
}
