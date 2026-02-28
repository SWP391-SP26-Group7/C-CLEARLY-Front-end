// permissions.js
// Quy định các trang/chức năng được phép truy cập theo vai trò

// Các key phải tương ứng với giá trị dùng trong currentPage

export const roles = ['Manager', 'Sale Staff', 'Operation Staff'];

// trang -> danh sách vai trò có thể truy cập
const accessMap = {
  dashboard: ['Manager', 'Sale Staff', 'Operation Staff'],
  preorder: ['Manager', 'Sale Staff', 'Operation Staff'],
  prescription: ['Manager', 'Sale Staff'],
  delivered: ['Manager', 'Sale Staff', 'Operation Staff'],
  returns: ['Manager', 'Sale Staff', 'Operation Staff'],

  products: ['Manager'],
  staff: ['Manager'],
  inventory: ['Manager', 'Operation Staff'],
  shipper: ['Manager', 'Operation Staff'],
  customersupport: ['Manager', 'Sale Staff'],
  support: ['Manager', 'Sale Staff', 'Operation Staff'],
  changepassword: ['Manager', 'Sale Staff', 'Operation Staff'],
};

// Những key ảo như 'orders' chỉ để hiển thị menu cha, chúng hợp lệ nếu một subpage được phép

export function canAccess(pageKey, role) {
  if (!pageKey || !role) return false;
  // nếu có dấu ':' (detail pages), lấy phần trước
  const base = pageKey.split(':')[0];
  return accessMap[base] ? accessMap[base].includes(role) : false;
}

// kiểm tra UI (button, form) - giả định chỉ Manager có CRUD đầy đủ
export function canEdit(role) {
  return role === 'Manager';
}
