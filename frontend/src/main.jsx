import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// sidebar provider
import SidebarProvider from './contexts/SidebarContext.jsx';
// cart provider
import { Provider } from 'react-redux';
import store from './store/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SidebarProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SidebarProvider>
  </Provider>
);
