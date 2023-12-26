import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Message from '../components/Message';
import { FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const UserProfilePage = () => {
  const [updateInput, setUpdateInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [updateProfile, { isLoading: loadingUpdatePfofile }] =
    useProfileMutation();
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  const changeHandler = e => {
    setUpdateInput(prevInput => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (userInfo) {
      setUpdateInput({
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async e => {
    e.preventDefault();
    if (updateInput.password !== updateInput.confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name: updateInput.name,
          email: updateInput.email,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile Updated');
      } catch (error) {
        toast.error(error?.data.message || error?.error);
      }
    }
  };

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container flex flex-col-reverse justify-around h-full max-w-lg gap-4 mx-auto md:flex-row md:gap-[100px] md:max-w-5xl">
        <div className="flex-auto md:w-1/3">
          <h2 className="mb-4 text-2xl font-bold uppercase">Profile</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 border rounded-sm"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={changeHandler}
              value={updateInput.name}
            />
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border rounded-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={changeHandler}
              value={updateInput.email}
            />
            <label htmlFor="password">Password</label>

            <input
              className="w-full p-2 border rounded-sm"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              value={updateInput.password}
            />
            <label htmlFor="confirmPassward">Confirm Password</label>
            <input
              className="w-full p-2 border rounded-sm"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm"
              onChange={changeHandler}
              value={updateInput.confirmPassword}
            />

            <button
              type="submit"
              className="py-2 text-white uppercase duration-300 rounded-sm bg-terracotta-500 hover:bg-terracotta-600"
            >
              Update
            </button>
          </form>
        </div>
        <div className="flex-auto md:w-2/3">
          <h2 className="mb-4 text-2xl font-bold uppercase ">Order History</h2>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant="success">
              {isError?.data?.message || isError?.error}
            </Message>
          ) : (
            <table className="table-auto">
              <thead>
                <tr className='border-b-2 border-gray-400'>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {orders.map(order => (
                  <tr key={order._id} className='h-[30px] hover:bg-slate-100'>
                    <td className="text-xs max-w-[80px] md:text-sm md:max-w-fit  overflow-hidden">
                      {order._id}
                    </td>
                    <td className="px-3">{order.createdAt.substring(2, 10)}</td>
                    <td className="px-3">$ {order.totalPrice}</td>
                    <td className="px-3">
                      {order.isPaid ? (
                        <span>
                          {order.paidAt.substring(5, 10)}
                        </span>
                      ) : (
                        <FaTimes style={{ color: 'red' }} className='mx-auto'/>
                      )}
                    </td>
                    <td className="px-3">
                      {order.isDelivered ? (
                        <span>{order.deliveredAt}</span>
                      ) : (
                        <FaTimes style={{ color: 'red'}} className='mx-auto'/>
                      )}
                    </td>
                    <td> <Link to={`/order/${order._id}`} className='px-2 py-1 text-xs text-white bg-gray-500 rounded-md hover:bg-black'>Detail</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
