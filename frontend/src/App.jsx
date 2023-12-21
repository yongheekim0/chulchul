import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
      <ToastContainer autoClose={2000} />
      <Footer />
    </>
  );
};

export default App;
