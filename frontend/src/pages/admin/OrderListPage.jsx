import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListPage = () => {
  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container flex flex-col-reverse justify-around h-screen max-w-lg gap-4 mx-auto md:flex-row md:max-w-5xl">
        <div className="flex-1">div</div>
        <div className="flex-1">div 2</div>
      </div>
    </section>
  );
};

export default OrderListPage;
