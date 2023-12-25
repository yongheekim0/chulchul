import { useContext, useState, useEffect } from 'react';
// sidebar context
import { SidebarContext } from '../contexts/SidebarContext';
// import Logo
import Logo from '../img/logo-no-background.svg';
import Dropdown from './Dropdown';
// import icons
import { AiOutlineUser } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
// import Link
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  // bring states
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  // event listener
  const itemAmount = cartItems.reduce((a, c) => a + c.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? 'bg-white shadow-md py-3' : 'bg-none pt-3'
      } fixed w-full z-10 transition-all`}
    >
      <div className="container flex items-center justify-between h-full mx-auto">
        {/* Logo */}
        <Link to={'/'}>
          <div className="transition hover:scale-110">
            <img className="w-[65px]" src={Logo} alt="Main logo" />
          </div>
        </Link>
        {/* cart */}

        <div className="flex items-center justify-center gap-4">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex cursor-pointer"
          >
            <BsBag className="text-2xl transition hover:scale-110" />
            {itemAmount > 0 && (
              <div className=" bg-red-500/50 absolute right-[2px] -bottom-[0.02px] text-[14px] w-[19px] h-[16.5px] font-medium flex justify-center items-center">
                {itemAmount}
              </div>
            )}
          </div>
          {userInfo ? (
            <div>
              <Dropdown logoutHandler={logoutHandler} name={userInfo.name} />
              {/* <button onClick={logoutHandler}>Logout</button> */}
            </div>
          ) : (
            <Link to="/login">
              <div>
                <AiOutlineUser className="text-2xl transition hover:scale-110" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
