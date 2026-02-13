import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, isOwner }) => {
  return (
    <div className={`msg-row ${isOwner? 'owner':''}`}>
      <div className="bubble">
        <div className="msg-text">{message.text}</div>
        <div className="msg-meta">{message.time} {message.seen ? '✓✓' : ''}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
