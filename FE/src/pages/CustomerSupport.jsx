import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import CustomerInfoDrawer from '../components/CustomerInfoDrawer';
import './CustomerSupport.css';

const CustomerSupport = () => {
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="cs-page">
      <div className="cs-container">
        <aside className="cs-sidebar">
          <ChatList selected={selected} setSelected={setSelected} />
        </aside>
        <section className="cs-main">
          <ChatWindow
            conversation={selected}
            onOpenCustomer={() => setDrawerOpen(true)}
          />
        </section>
        <CustomerInfoDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </div>
  );
};

export default CustomerSupport;
