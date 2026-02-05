import React, { useState, useEffect } from 'react';
import './StaffDrawer.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StaffDrawer = ({ open, staff, onClose, onSave }) => {
  const [model, setModel] = useState(staff || {});
  const [errors, setErrors] = useState({});

  useEffect(() => { setModel(staff || {}); setErrors({}); }, [staff]);
  if (!open) return null;

  const change = (field) => (e) => setModel(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    const errs = {};
    if (!model.email || !emailRegex.test(model.email)) errs.email = 'Email không hợp lệ';
    if (!model.fullName || model.fullName.trim() === '') errs.fullName = 'Họ và tên là bắt buộc';
    if (!model.id) { // creating -> validate password
      if (!model.password || model.password.length < 6) errs.password = 'Mật khẩu tối thiểu 6 ký tự';
      if (model.password !== model.confirmPassword) errs.confirmPassword = 'Mật khẩu không khớp';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const out = { ...model };
    if (!out.id) out.id = `S${Date.now()}`;
    if (!out.code) out.code = `NV${String(Date.now()).slice(-4)}`;
    if (!out.status) out.status = 'Active';
    delete out.password; delete out.confirmPassword;
    onSave && onSave(out);
  };

  return (
    <div className="staff-modal-backdrop">
      <div className="staff-modal">
        <div className="staff-header">
          <h3>{model.fullName ? `Chỉnh sửa: ${model.fullName}` : 'Tạo nhân viên mới'}</h3>
          <button className="close" onClick={onClose}>Đóng</button>
        </div>
        <div className="staff-body">
          <div className="form-grid">
            <div className="field">
              <label>Email</label>
              <input value={model.email||''} onChange={change('email')} />
              {errors.email && <div className="err">{errors.email}</div>}
            </div>

            {!model.id && (
              <>
                <div className="field">
                  <label>Mật khẩu</label>
                  <input type="password" value={model.password||''} onChange={change('password')} />
                  {errors.password && <div className="err">{errors.password}</div>}
                </div>
                <div className="field">
                  <label>Xác nhận mật khẩu</label>
                  <input type="password" value={model.confirmPassword||''} onChange={change('confirmPassword')} />
                  {errors.confirmPassword && <div className="err">{errors.confirmPassword}</div>}
                </div>
              </>
            )}

            <div className="field">
              <label>Họ và tên</label>
              <input value={model.fullName||''} onChange={change('fullName')} />
              {errors.fullName && <div className="err">{errors.fullName}</div>}
            </div>

            <div className="field">
              <label>Chức vụ</label>
              <select value={model.role||'Sale Staff'} onChange={change('role')}>
                <option>Sale Staff</option>
                <option>Operation Staff</option>
              </select>
            </div>

            <div className="field">
              <label>Trạng thái</label>
              <select value={model.status||'Active'} onChange={change('status')}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="staff-footer">
          <button className="btn-cancel" onClick={onClose}>Huỷ</button>
          <button className="btn-save" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default StaffDrawer;
