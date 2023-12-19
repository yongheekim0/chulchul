import { useContext, useState, useEffect } from 'react';
// sidebar context
import { SidebarContext } from '../contexts/SidebarContext';
// import Logo
import Logo from '../img/logo-no-background.svg';
// import icons
import { AiOutlineUser } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
// import Link
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { cartItems } = useSelector(state => state.cart);
  // event listener
  const itemAmount = cartItems.reduce((a, c) => a + c.qty, 0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? 'bg-white py-6 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className="container flex items-center justify-between h-full mx-auto">
        {/* Logo */}
        <Link to={'/'}>
          <div>
            <img className="w-[90px]" src={Logo} alt="Main logo" />
          </div>
        </Link>
        {/* cart */}

        <div className="flex items-center justify-center gap-4">
          <Link to="/user">
            <div>
              <AiOutlineUser className="text-2xl transition hover:scale-110" />
            </div>
          </Link>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex cursor-pointer"
          >
            <BsBag className="text-2xl transition hover:scale-110" />
            {itemAmount > 0 && (
              <div className=" bg-red-500 absolute -right-2 -bottom-2 text-[14px] w-[18px] h-[18px] rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
