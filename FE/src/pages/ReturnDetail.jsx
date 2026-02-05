import React, { useEffect, useState } from 'react';

const loadReturns = () => {
  try {
    const raw = localStorage.getItem('cc_returns_v1');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const ReturnDetail = ({ id, setCurrentPage }) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const list = loadReturns();
    setRecord(list.find(r => r.id === id) || null);
  }, [id]);

  if (!record) return <div>Phiếu đổi trả không tồn tại.</div>;

  const handleChat = () => {
    // placeholder: open mailto with basic template
    const subject = encodeURIComponent(`Trả lời yêu cầu đổi/trả ${record.id}`);
    const body = encodeURIComponent(`Xin chào ${record.customerName},%0D%0A
Về yêu cầu đổi/trả mã ${record.id}...`);
    window.open(`mailto:${record.customerEmail || ''}?subject=${subject}&body=${body}`);
  };

  const handlePrint = () => {
    const printable = `Phiếu đổi trả\nMã: ${record.id}\nĐơn: ${record.orderId}\nKhách: ${record.customerName}\nSản phẩm: ${(record.productNames||[]).join(', ')}\nTrạng thái: ${record.status}`;
    const w = window.open('', '_blank');
    w.document.write('<pre>' + printable + '</pre>');
    w.document.close();
    w.print();
  };

  return (
    <div className="page">
      <h1>Chi tiết đổi trả {record.id}</h1>
      <section>
        <h3>Thông tin khách hàng</h3>
        <div>Tên: {record.customerName}</div>
        <div>Email: {record.customerEmail || '—'}</div>
      </section>
      <section>
        <h3>Thông tin sản phẩm</h3>
        <div>{(record.productNames || []).join(', ')}</div>
        <div>Lý do: {record.reason || '—'}</div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button onClick={() => setCurrentPage('returns')}>Quay lại</button>
        <div>
          <button onClick={handleChat} style={{ marginRight: 8 }}>Nhắn tin với khách hàng</button>
          <button onClick={handlePrint}>In phiếu đổi trả</button>
        </div>
      </div>
    </div>
  );
};

export default ReturnDetail;
