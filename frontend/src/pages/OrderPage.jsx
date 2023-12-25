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
    toast.error(error.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then(orderId => {
        return orderId;
      });
  }

  return (
    <section className="pt-32 pb-12 lg:py-32">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>Something went wrong</Message>
      ) : (
        <div className="container flex flex-col justify-around h-full max-w-lg gap-4 mx-auto md:flex-row md:max-w-5xl">
          <div className="flex flex-col flex-1 px-1 py-12 md:px-8">
            <div className="flex flex-col px-4 py-3 bg-gray-100">
              <div className="mb-3 text-lg font-bold uppercase border-b-2 border-gray-300">Shipping Info</div>
              <div>Order ID: {order._id}</div>
              <div>
                <p>
                  <span className="font-semibold">Name: </span>{' '}
                  {order.user.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  {order.user.email}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{' '}
                  {order.shippingAddress.address}
                  {''} {order.shippingAddress.city}
                  {''}
                  {order.shippingAddress.postalCode}{' '}
                  {order.shippingAddress.country}{' '}
                </p>
              </div>
              {order.isDelivered ? (
                <Message variant>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </div>
            <div className="p-2 my-2 ">
              <p className='text-lg font-semibold uppercase border-b-2 border-gray-300'>Payment Status</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <div className="my-2">
                {' '}
                {!order.isPaid ? (
                  <Message variant="danger">Not Paid</Message>
                ) : (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                )}
              </div>
            </div>
            <div className='flex flex-col pl-4'>
              {order.orderItems.map(item => (
                <div
                  key={item._id}
                  className="flex items-center justify-start"
                >
                  <div className="w-[30px] mr-3">
                    {' '}
                    <img src={item.image} alt="item image" />
                  </div>
                  <p className="pb-1 text-sm font-semibold">
                    {item.qty} x {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 px-1 py-12 md:px-12">
            <div>
              <div className='text-lg font-semibold uppercase border-b-2 border-gray-300'>Order Summary</div>
              <div className="flex items-center py-4 justify-evenly">
                <div className="flex-1">
                  <p className="flex justify-between mb-1 border-b-2 bg-gray-200/50">
                    <span>Subtotal:</span> <span>$ {order.itemsPrice}</span>
                  </p>
                  <p className="flex justify-between mb-1">
                    <span>Shipping Price:</span>{' '}
                    <span>$ {order.shippingPrice}</span>
                  </p>
                  <p className="flex justify-between mb-1 border-b-2 bg-gray-200/50">
                    <span>Tax:</span> <span>$ {order.taxPrice}</span>
                  </p>
                  <p className="flex justify-between text-lg">
                    <span>Total:</span>{' '}
                    <span className="font-bold ">$ {order.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    {/* <button
                      onClick={onApproveTest}
                      className="w-full p-4 my-2 font-medium text-white bg-primary"
                    >
                      Test Pay Order
                    </button> */}
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
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
