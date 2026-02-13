import React, { useState, useMemo, useEffect } from 'react';
import './ChatList.css';
import ChatItem from './ChatItem';

const ChatList = ({ conversations = [], selected, setSelected }) => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [list, setList] = useState(() => Array.isArray(conversations) ? conversations : []);

  useEffect(() => {
    setList(Array.isArray(conversations) ? conversations : []);
  }, [conversations]);

  // Listen for external new message events to increment unread count
  useEffect(() => {
    const handler = (e) => {
      const { id, text } = e.detail || {};
      if (!id) return;
      setList(prev => {
        const found = prev.find(p => p.id === id);
        if (found) {
          return prev.map(p => p.id === id ? { ...p, last: text || p.last, unread: (p.unread||0) + 1 } : p);
        }
        // if not found, prepend new conversation
        return [{ id, name: 'Khách mới', last: text||'', time: 'Now', unread: 1, online: true }, ...prev];
      });
    };
    window.addEventListener('cs:newMessage', handler);
    return () => window.removeEventListener('cs:newMessage', handler);
  }, []);

  const filtered = useMemo(() => {
    return list.filter(c => {
      const q = query.toLowerCase();
      if (q && !( (c.name||'').toLowerCase().includes(q) || (c.last||'').toLowerCase().includes(q) || (c.id||'').includes(q))) return false;
      if (tab === 'unread') return (c.unread||0) > 0;
      if (tab === 'processed') return (c.unread||0) === 0;
      return true;
    });
  }, [query, tab, list]);

  const handleSelect = (c) => {
    // mark read locally
    setList(prev => prev.map(p => p.id === c.id ? { ...p, unread: 0 } : p));
    setSelected && setSelected({ ...c, unread: 0 });
  };

  return (
    <div className="chatlist">
      <div className="cl-header">
        <h3>Chăm sóc khách hàng</h3>
        <input placeholder="Tìm tên / SĐT / #mã đơn" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>
      <div className="cl-tabs cl-tabs-3">
        <button className={tab==='all'?'active':''} onClick={()=>setTab('all')}>Tất cả</button>
        <button className={tab==='unread'?'active':''} onClick={()=>setTab('unread')}>Chưa đọc</button>
        <button className={tab==='processed'?'active':''} onClick={()=>setTab('processed')}>Đã xử lý</button>
      </div>
      <div className="cl-list">
        {filtered.length === 0 ? (
          <div className="cl-empty">
            <div className="cl-empty-icon">💬</div>
            <div className="cl-empty-text">Chưa có cuộc hội thoại nào</div>
          </div>
        ) : (
          filtered.map(c=> (
            <ChatItem key={c.id} data={c} active={selected && selected.id===c.id} onClick={()=>handleSelect(c)} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
