import React, { useEffect, useState } from 'react';
import StaffDrawer from '../components/StaffDrawer';
import { useAuth } from '../AuthContext';
import { canEdit } from '../permissions';
import './StaffManagement.css';

const STORAGE_KEY = 'cc_staff_v1';

const loadStaff = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const saveStaff = (arr) => { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); };

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { user } = useAuth();
  const editable = canEdit(user.role);

  useEffect(() => { setStaff(loadStaff()); }, []);

  const handleCreate = () => {
    if (!editable) { alert('Chỉ Manager được tạo nhân viên'); return; }
    setActive(null); setDrawerOpen(true);
  };
  const handleEdit = (s) => {
    if (!editable) { alert('Chỉ Manager được chỉnh sửa'); return; }
    setActive(s); setDrawerOpen(true);
  };

  const handleSave = (s) => {
    const list = staff.slice();
    const idx = list.findIndex(x => x.id === s.id);
    if (idx >= 0) list[idx] = s; else list.unshift(s);
    setStaff(list); saveStaff(list);
    setDrawerOpen(false);
  };

  const handleToggle = (id) => {
    const list = staff.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s);
    setStaff(list); saveStaff(list);
  };

  const filtered = staff.filter(s => {
    const q = query.trim().toLowerCase();
    if (roleFilter !== 'All' && s.role !== roleFilter) return false;
    if (!q) return true;
    return s.fullName.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
  });

  return (
    <div className="staff-page">
      <div className="staff-toolbar">
        <div>
          <input placeholder="Tìm theo tên, mã hoặc email" value={query} onChange={e=>setQuery(e.target.value)} />
          <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
            <option value="All">Tất cả chức vụ</option>
            <option>Sale Staff</option>
            <option>Operation Staff</option>
          </select>
        </div>
        <div>
          <button className="btn-primary" onClick={handleCreate} disabled={!editable}>+ Thêm nhân viên</button>
        </div>
      </div>

      <table className="staff-table">
        <thead>
          <tr><th>Mã nhân viên</th><th>Họ và tên</th><th>Email</th><th>Chức vụ</th><th>Trạng thái</th><th>Thao tác</th></tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.code}</td>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.role}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={()=>handleEdit(s)} disabled={!editable}>Chỉnh sửa</button>
                <button onClick={()=>handleToggle(s.id)}>{s.status==='Active'?'Xóa tài khoản':'Kích hoạt'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <StaffDrawer open={drawerOpen} staff={active} onClose={()=>setDrawerOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default StaffManagement;
