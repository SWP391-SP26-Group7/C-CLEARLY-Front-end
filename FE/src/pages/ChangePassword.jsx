import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu mới và xác nhận không khớp.');
      return;
    }

    // Giả lập thay đổi mật khẩu
    // Trong thực tế, gửi request đến server
    setMessage('Mật khẩu đã được thay đổi thành công.');
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="change-password-page">
      <h1>Đổi mật khẩu</h1>
      <div className="change-password-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Mật khẩu cũ:</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Mật khẩu mới:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu mới:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-btn">Lưu thay đổi</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;