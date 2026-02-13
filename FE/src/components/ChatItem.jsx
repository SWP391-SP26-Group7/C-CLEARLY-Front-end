import React from 'react';
import './ChatItem.css';

const ChatItem = ({ data, active, onClick }) => {
  const hasUnread = (data.unread || 0) > 0;
  return (
    <div className={`chat-item ${active? 'active':''} ${hasUnread? 'unread':''}`} onClick={onClick}>
      <div className="ci-avatar">
        <div className={`dot ${data.online? 'online':''}`}></div>
        <div className="avatar">{(data.name||'?')[0]}</div>
      </div>
      <div className="ci-body">
        <div className="ci-top">
          <strong className={hasUnread? 'bold':''}>{data.name}</strong>
          <span className="ci-time">{data.time}</span>
        </div>
        <div className="ci-bottom">
          <span className={`ci-preview ${hasUnread? 'bold':''}`}>{data.last}</span>
          {hasUnread && <span className="ci-badge">{data.unread}</span>}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
