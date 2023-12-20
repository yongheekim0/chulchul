import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserLoginPage from './pages/UserLoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import UserRegisterPage from './pages/UserRegisterPage';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
          </Route>
        </Routes>
        <Sidebar />
        <Footer />
        <ToastContainer autoClose={2000} />
      </Router>
    </div>
  );
};

export default App;
