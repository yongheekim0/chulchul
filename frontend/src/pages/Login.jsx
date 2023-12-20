import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const { email, password } = loginInput;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // Bring the userInfo state
  const { userInfo } = useSelector(state => state.auth);

  //  -------------------------------------
  // When user login redirect to shipping page, or homepage
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  // --------------------------------------

  const changeHandler = e => {
    setLoginInput(prevInput => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen pt-32 pb-12 lg:py-32">
      <FormContainer>
      {isLoading && <Loader />}
        <div className="p-8 md:w-1/2 md:px-16">
          <h2 className="text-2xl font-bold uppercase">Login</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 border rounded-sm"
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeHandler}
              value={loginInput.email}
            />
            <div className="relative">
              <input
                className="w-full p-2 border rounded-sm"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                value={loginInput.password}
              />
            </div>
            <button
              type="submit"
              className="py-2 text-white uppercase duration-300 rounded-sm bg-terracotta-500 hover:scale-105"
              disabled={ isLoading }
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-between mt-3 text-xs">
            <p>Don&apos;t have an account?</p>
            <Link
              to={ redirect ? `/register?redirect=${redirect}` : '/register'}
              className="px-4 py-2 ml-2 duration-300 bg-white border rounded-sm hover:scale-110"
            >
              Register
            </Link>
          </div>
        </div>
      </FormContainer>
     
    </section>
  );
};

export default Login;
