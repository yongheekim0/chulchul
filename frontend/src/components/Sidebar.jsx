import { useContext } from 'react';
// import link
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import icons
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
// import componenets
import CartItem from '../components/CartItem';
// import sidebar context
import { SidebarContext } from '../contexts/SidebarContext';
import { emptyCart } from '../slices/cartSlice';

const Sidebar = () => {
  // sidebar context
  const { isOpen, handleClose } = useContext(SidebarContext);
  // fetch the cart state
  const { cartItems: cart, itemsPrice, totalPrice, shippingPrice, taxPrice } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // set item amount
  const itemAmount = cart.reduce((a ,c) => a + c.qty, 0)
  const plural = itemAmount >=2 ? 'items': 'item'

  const emptyCartHandler = async () => {
   
    dispatch(emptyCart())
  }

  const checkoutHandler = () => {
    handleClose()
    navigate('/login?redirect=/shipping')
  }
  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-[400ms] z-20 px-4 lg:px-[35px] overflow-auto`}
    >
      {' '}
      <div className="flex items-center justify-between py-5 border-b">
        <div className="text-sm font-semibold uppercase">
          Shopping Bag ({itemAmount}) {plural}
          </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className="flex items-center justify-center w-8 h-8 transition cursor-pointer hover:translate-x-2"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] md:h-[520px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map(item => {
          return <CartItem item={item} key={item._id} />;
        })}
      </div>
      <div className="flex-col py-2 mt-2 gap-y-3">
        <div className="flex justify-between w-full text-sm odd:items-center">
          {/* total */}
          <div>

          <div className="text-gray-400 ">
            <span className="mr-2 text-primary">Subtotal:</span><span>$ {itemsPrice || 0.00} {itemsPrice < 100.00 && (<span className='ml-3 text-blue-600'>-${parseFloat(100.00-itemsPrice).toFixed(2)} free shipping</span>)}</span>
          </div>
          <div className="text-gray-400 ">
            <span className="mr-2 text-primary">Shipping Price:</span> {shippingPrice == 0 ? <span><span className='line-through'>$10.0</span><span className='ml-2 text-red-600'>Free</span></span> : `$${shippingPrice}`}
          </div>
          </div>
          {/* clear cart icon */}
          <div
            onClick={emptyCartHandler}
            className="flex items-center justify-center w-12 h-12 py-4 text-xl text-white bg-red-500 cursor-pointer"
          >
            <FiTrash2 />
          </div>
        </div>
        <div className='w-full p-4 mt-2 font-medium bg-gray-100 text-primary'>

          <div className="font-semibold uppercase">
            {itemsPrice == 0 ? (<span className='mr-1'>Total: 0.00</span>) : (<span><span className="mr-1">Total:</span>$ {totalPrice || 0.00} <span className='text-sm lowercase '>(15% tax incl. $ {taxPrice || 0.00})</span></span>)}
            
          </div>
        </div>
       
        <button className={`${cart.length === 0 && 'text-gray-500 bg-primary/50'} flex items-center justify-center w-full p-4 mt-2 font-medium text-white bg-primary`} disabled={cart.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Sidebar;
