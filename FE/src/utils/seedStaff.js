const STORAGE_KEY = 'cc_staff_v1';

const defaultStaff = [
  { id: 'S001', code: 'NV001', fullName: 'Nguyễn Văn A', email: 'nv.a@example.com', role: 'Sale Staff', status: 'Active' },
  { id: 'S002', code: 'NV002', fullName: 'Trần Thị B', email: 'tt.b@example.com', role: 'Operation Staff', status: 'Active' }
];

export default function seedStaff() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStaff));
  } catch (e) { /* ignore */ }
  return defaultStaff;
}

export { STORAGE_KEY, defaultStaff };
