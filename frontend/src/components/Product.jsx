import { useContext } from 'react';
// import cart context
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
// import componenets
import Rating from './Rating';
import { BsPlus, BsEyeFill } from 'react-icons/bs';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { _id, image, category, name, price, brand, rating, numReviews, countInStock } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
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
        <div className="absolute top-6 -right-11 group-hover:right-5 bg-terracotta-300/40 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, _id)} disabled={countInStock === 0}>
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
        <div className="text-sm capitalize text-gray-500 mb-1">{brand}</div>
        <Link to={`/product/${_id}`}>
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
         {countInStock===0 && <span className='absolute right-0 top-7 text-red-500 text-sm'>out of stock</span>} 
        <div className="font-semibold flex justify-between items-center">
          <div>$ {price}</div>
          <div className=' text-xs text-yellow-500 mr-2'><Rating value={rating} text={numReviews}/></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
