import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// sidebar provider
import SidebarProvider from './contexts/SidebarContext.jsx';
// cart provider
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import UserRegisterPage from './pages/UserRegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import UserProfilePage from './pages/UserProfilePage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserLoginPage from './pages/UserLoginPage';
import PrivateRoute from './components/PrivateRoute.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
      </Route>
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
