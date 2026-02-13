import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import MessageBubble from './MessageBubble';
import { FaPhoneAlt, FaInfoCircle, FaPaperclip, FaSmile, FaImage } from 'react-icons/fa';

const ChatWindow = ({ conversation, onOpenCustomer }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // update messages when conversation changes; do not use hardcoded messages
  useEffect(() => {
    if (conversation && Array.isArray(conversation.messages)) {
      setMessages(conversation.messages);
    } else {
      setMessages([]);
    }
  }, [conversation]);

  const send = () => {
    if (!text.trim() || !conversation) return;
    const newMsg = { id: Date.now(), text, time: 'Now', owner: true, seen: false };
    setMessages(prev => [...prev, newMsg]);
    setText('');
  };

  if (!conversation) {
    return (
      <div className="chat-window empty">
        <div className="cw-empty">
          <div className="cw-empty-icon">💬</div>
          <div className="cw-empty-text">Chưa có cuộc hội thoại nào được chọn</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="cw-header">
        <div className="cw-left">
          <div className="cw-avatar">{conversation.name ? conversation.name[0] : '?'}</div>
          <div>
            <div className="cw-name">{conversation.name}</div>
            <div className="cw-status">{conversation.online ? 'Đang hoạt động' : 'Offline'}</div>
          </div>
        </div>
        <div className="cw-actions">
          <button title="Gọi"><FaPhoneAlt/></button>
          <button title="Thông tin" onClick={onOpenCustomer}><FaInfoCircle/></button>
        </div>
      </div>

      <div className="cw-body">
        {messages.map(m => (
          <MessageBubble key={m.id} message={m} isOwner={m.owner} />
        ))}
      </div>

      <div className="cw-input">
        <div className="cw-input-left">
          <button><FaImage/></button>
          <button><FaPaperclip/></button>
          <button><FaSmile/></button>
        </div>
        <input placeholder="Nhập tin nhắn..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} />
        <div className="cw-send">
          <button onClick={send}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
