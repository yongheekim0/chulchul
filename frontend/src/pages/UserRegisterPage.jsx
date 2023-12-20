import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const UserRegisterPage = () => {
  const [signupInput, setSignupInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = signupInput;

  console.log({ name, email, password, confirmPassword })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  // Bring the userInfo state
  const { userInfo } = useSelector(state => state.auth);

  //  -------------------------------------
  // When user login, redirect to shipping page, or homepage
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
    setSignupInput(prevInput => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const response = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...response }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <section className="flex items-center justify-center h-screen pt-32 pb-12 lg:py-32">
      <FormContainer>
        {isLoading && <Loader />}
        <div className="p-8 md:w-1/2 md:px-16">
          <h2 className="text-2xl font-bold uppercase">Sign up</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 border rounded-sm"
              type="text"
              name="name"
              placeholder="Name"
              onChange={changeHandler}
              value={signupInput.name}
            />
            <input
              className="p-2 border rounded-sm"
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeHandler}
              value={signupInput.email}
            />
            <div className="relative">
              <input
                className="w-full p-2 border rounded-sm"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                value={signupInput.password}
              />
              <input
                className="w-full p-2 mt-4 border rounded-sm"
                type="password"
                name="confirmPassword"
                placeholder="Confirm"
                onChange={changeHandler}
                value={signupInput.confirmPassword}
              />
            </div>
            <button
              type="submit"
              className="py-2 text-white uppercase duration-300 rounded-sm bg-terracotta-500 hover:scale-105"
              disabled={isLoading}
            >
              Sign up
            </button>
          </form>

          <div className="flex items-center justify-between mt-3 text-xs">
            <p>Already have an account?</p>
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="px-4 py-2 ml-2 duration-300 bg-white border rounded-sm hover:scale-110"
            >
              Login
            </Link>
          </div>
        </div>
      </FormContainer>
    </section>
  );
};

export default UserRegisterPage;
