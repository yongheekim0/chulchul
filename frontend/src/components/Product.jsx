import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import componenets
import Rating from './Rating';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import {addToCart} from '../slices/cartSlice'

const Product = ({ product }) => {
  const { _id, image, category, name, price, brand, rating, numReviews, countInStock } = product;
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product }))
  }
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="flex items-center justify-center w-full h-full">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[180px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute flex flex-col items-center justify-center p-2 transition-all duration-300 opacity-0 top-6 -right-11 group-hover:right-5 bg-terracotta-300/40 gap-y-2 group-hover:opacity-100">
          <button 
          onClick={addToCartHandler} 
          disabled={countInStock === 0}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-terracotta-600 hover:scale-105 hover:-translate-y-[1px] active:translate-y-[1px] transition">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${_id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl hover:scale-105 hover:-translate-y-[1px] active:translate-y-[1px] transition"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category & name & price */}
      <div className='relative'>
        <div className="mb-1 text-sm text-gray-500 capitalize">{brand}</div>
        <Link to={`/product/${_id}`}>
          <h2 className="mb-1 font-semibold">{name}</h2>
        </Link>
         {countInStock===0 && <span className='absolute right-0 text-sm text-red-500 top-7'>out of stock</span>} 
        <div className="flex items-center justify-between font-semibold">
          <div>$ {price}</div>
          <div className='mr-2 text-xs text-yellow-500 '><Rating value={rating} text={numReviews}/></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
