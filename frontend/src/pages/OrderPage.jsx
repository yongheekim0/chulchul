import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Message from '../components/Message';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError: error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  console.log(usePayOrderMutation());

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    isError: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successful');
  }
  function onError(error) {
    toast.error(error.message)
  }
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          }
        }
      ]
    }).then((orderId)=> {
      return orderId
    })
  }

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container h-screen max-w-md gap-4 pb-[80px] pt-8 mx-auto md:max-w-3xl">
        <div className="px-1 py-12 md:px-24">
          Order Page
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>Something went wrong</Message>
          ) : (
            <>
              <div>Order {order._id}</div>

              {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <button
                        onClick={onApproveTest}
                        className="w-full p-4 my-2 font-medium text-white bg-primary"
                      >
                        Test Pay Order
                      </button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
