import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io';
// import cart context
import { addToCart, decreaseQty, removeFromCart } from '../slices/cartSlice';

const CartItem = ({ item }) => {
 // destructure item
  const { _id, name, image, price, qty, brand } = item;
  const dispatch = useDispatch()
  const addToCartHandler = async () => {
    dispatch(addToCart({ ...item }))
  }

  const decreaseAmountHandler = async () => {
    dispatch(decreaseQty({...item}))
  }
  
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="flex w-full py-2 font-light text-gray-500 border-b border-gray-200 gap-x-4 lg:px-6">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link to={`/product/${_id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="flex flex-col w-full">
          {/* name & remove icon */}
          <div className="flex justify-between mb-2">
            {/* name */}
            <Link
              to={`/product/${_id}`}
              
            >
              <p className=' text-gray-600 text-[12px]'>{brand}</p>
              <p className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">{name}</p>
            </Link>
            {/* remove icon */}
            <div
              onClick={()=> removeFromCartHandler(_id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 transition hover:text-red-500" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* qty */}
            <div className="flex flex-1 max-w-[100px] bg-transparent items-center h-full border text-primary font-medium">
              {/* minus icon */}
              <div
                onClick={decreaseAmountHandler}
                className="flex items-center justify-center flex-1 h-full cursor-pointer"
              >
                <IoMdRemove />
              </div>
              {/* qty */}
              <div className="flex items-center justify-center h-full px-2">
                {qty}
              </div>
              <div
                onClick={addToCartHandler}
                className="flex items-center justify-center flex-1 h-full cursor-pointer"
              >
                {/* plus icon */}
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex items-center justify-around flex-1 ">
              $ {price}
            </div>
            {/* final price */}
            {/* make the price at 2 decimals */}
            <div className="flex items-center justify-end flex-1 font-medium text-primary">$ {parseFloat(price * qty).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
