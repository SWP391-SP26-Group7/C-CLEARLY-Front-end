import React from 'react';
import './Pagination.css'; // CSS cho pagination

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Component Pagination tái sử dụng
  // currentPage: trang hiện tại
  // totalPages: tổng số trang
  // onPageChange: hàm khi đổi trang

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
    </div>
  );
};

export default Pagination;