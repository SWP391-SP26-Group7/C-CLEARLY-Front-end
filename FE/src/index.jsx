import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* wrap whole app with authentication context so any component can read current user/role */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);