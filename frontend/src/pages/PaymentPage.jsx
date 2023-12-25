import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import PayPalLogo from '../img/icons/icons8-paypal.svg';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart


  useEffect(()=> {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  },[shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <CheckoutSteps step1 step2 step3 />
      <div className="container flex flex-col items-center h-screen max-w-lg gap-4 mx-auto md:max-w-5xl">
        <div className="text-lg ">Payment Method</div>
        <form onSubmit={submitHandler}>
          <div className="flex items-center mb-4">
            <input
              id="paypal"
              type="radio"
              value={paymentMethod}
              name="paypal"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={e => setPaymentMethod(e.target.value)}
              checked
            />
            <label
              htmlFor="paypal"
              className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
            >
              <img src={PayPalLogo} alt="PayPal Logo" />
              PayPal
            </label>
          </div>
          <button type="submit" className="p-4 mt-2 font-medium text-white bg-primary">Continue</button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;
