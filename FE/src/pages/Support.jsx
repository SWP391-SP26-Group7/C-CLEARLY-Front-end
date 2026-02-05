import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'kỹ thuật',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, type, description } = formData;
    const subject = encodeURIComponent(`Khẩn cấp: ${title}`);
    const body = encodeURIComponent(`Loại: ${type}\nMô tả: ${description}`);
    const mailto = `mailto:support@example.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <div className="support-page">
      <h1>Hỗ trợ</h1>
      <div className="support-content">
        <div className="hotline">
          <h2>Hotline: 1900 123 456</h2>
        </div>
        <div className="emergency-mail">
          <h2>Gửi mail khẩn cấp</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Tiêu đề:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Loại kỹ thuật:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="kỹ thuật">Kỹ thuật</option>
                <option value="dữ liệu">Dữ liệu</option>
                <option value="khác">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô tả chi tiết:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;