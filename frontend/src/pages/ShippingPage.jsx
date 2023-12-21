// import link
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import icons
import { FiTrash2 } from 'react-icons/fi';
// import componenets
import ShippingItem from '../components/ShippingItem';
import AddressForm from '../components/AddressForm';
// import sidebar context
import { emptyCart, saveShippingAddress } from '../slices/cartSlice';

const ShippingPage = () => {
  const {
    cartItems,
    itemsPrice,
    totalPrice,
    shippingPrice,
    taxPrice,
    shippingAddress,
  } = useSelector(state => state.cart);

  const [addressInput, setAddressInput] = useState({
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.county || '',
  });
  const { address, city, postalCode, country } = addressInput;
  const changeHandler = e => {
    setAddressInput(prevInput => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemAmount = cartItems.reduce((a, c) => a + c.qty, 0);
  const plural = itemAmount >= 2 ? 'items' : 'item';

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  const emptyCartHandler = async () => {
    dispatch(emptyCart());
  };
  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container flex flex-col-reverse justify-around h-full max-w-lg gap-4 mx-auto md:flex-row md:max-w-5xl">
        <div className="flex-1">
          <form onSubmit={submitHandler}>
            <AddressForm changeHandler={changeHandler} {...addressInput} />
            <button type="submit" className="flex items-center justify-center w-full p-4 mt-2 font-medium text-white bg-primary">Continue</button>
          </form>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-y-2 h-[480px] lg:h-[640p] overflow-y-auto overflow-x-hidden border-b">
            {cartItems.map(item => {
              return <ShippingItem item={item} key={item._id} />;
            })}
          </div>
          <div className="flex-col py-2 mt-2 gap-y-3">
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 ">
                    <span className="mr-2">Subtotal:</span>$ {itemsPrice}
                  </div>
                  <div className='ml-4'>
                    <span className="mr-2 text-primary">Shipping Price:</span>{' '}
                    {shippingPrice == 0 ? (
                      <span>
                        <span className="line-through">$10.0</span>
                        <span className="ml-2 text-red-600">Free</span>
                      </span>
                    ) : (
                      `$${shippingPrice}`
                    )}
                  </div>
                </div>
                <div className="font-semibold uppercase">
                  {itemsPrice == 0 ? (
                    <span className="mr-1">Total: 0.00</span>
                  ) : (
                    <span>
                      <span className="mr-1">Total:</span>$ {totalPrice}{' '}
                      <span className="text-sm lowercase ">
                        (15% tax incl. $ {taxPrice})
                      </span>
                    </span>
                  )}
                </div>
                {/* total */}
              </div>
              {/* clear cart icon */}
              <div
                onClick={emptyCartHandler}
                className="flex items-center justify-center w-12 h-12 py-4 text-xl text-white bg-red-500 cursor-pointer"
              >
                <FiTrash2 />
              </div>
            </div>

            {/* <button
              className="flex items-center justify-center w-full p-4 mt-2 font-medium text-white bg-primary"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingPage;
