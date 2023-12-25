import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderPage = () => {
  const cart = useSelector(state => state.cart);
  const { address, city, postalCode, country } = cart.shippingAddress;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <section className="pt-32 pb-12 lg:py-32">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="container h-screen max-w-md gap-4 pb-[80px] pt-8 mx-auto md:max-w-3xl">
        <div className="px-1 py-12 md:px-24">
          <div className="flex flex-col items-start py-2 text-lg justify-startpx-16">
            <h2 className="mb-2 text-2xl uppercase">Address</h2>
            <p>
              {address} {city} {postalCode} {country}
            </p>
          </div>
          <p className="mb-2 text-2xl uppercase">Order Summary</p>
          <div className="p-2 border-b-2 bg-gray-50/50 mb-2 min-h-[140px]">
            {cart.cartItems.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              <div>
                {cart.cartItems.map(item => (
                  <p key={item._id} className="pb-1 text-sm">
                    {item.qty} x {item.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center py-4 justify-evenly">
            <div className='flex-1'>paymonet method: {cart.paymentMethod}</div>
            <div className='flex-1'>
              <p className="flex justify-between mb-1 border-b-2 bg-gray-200/50">
                <span>Subtotal:</span> <span>$ {cart.itemsPrice}</span>
              </p>
              <p className="flex justify-between mb-1 border-b-2">
                <span>Shipping Price:</span> <span>$ {cart.shippingPrice}</span>
              </p>
              <p className="flex justify-between mb-1 border-b-2 bg-gray-200/50">
                <span>Tax:</span> <span>$ {cart.taxPrice}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>Total:</span> <span className='font-bold '>$ {cart.totalPrice}</span>
              </p>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
            className="flex items-center justify-center w-full p-4 mt-2 font-medium text-white bg-primary hover:text-gray-400"
          >
            Place Order
          </button>
          {isLoading && <Loader/>}
        </div>
      </div>
    </section>
  );
};

export default PlaceOrderPage;
