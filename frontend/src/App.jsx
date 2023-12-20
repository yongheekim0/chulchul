import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetails';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Sidebar/>
        <Footer />
        <ToastContainer autoClose={2000}/>
      </Router>
    </div>
  );
};

export default App;
