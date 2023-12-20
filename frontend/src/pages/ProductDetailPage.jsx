import { useParams, useNavigate, Link } from 'react-router-dom';
// import cart context
import { useDispatch } from 'react-redux';
//import slices
import { useGetProductDetailQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
//import components
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail = () => {
  //get the product id from the url
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product }));
  };
  if (!product) {
    return (
      <section className="flex items-center justify-center h-screen">
        <Loader />
      </section>
    );
  }

  // destructive product
  const {
    name,
    price,
    description,
    image,
    brand,
    rating,
    numReviews,
    countInStock,
  } = product;

  return (
    <>
   
    <section className="flex items-center justify-center h-screen pt-32 pb-12 lg:py-32">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="container mx-auto">
           <div className='inline-block ml-[60px] text-xl hover:scale-125 '><Link to='/'><FaArrowLeft /></Link></div>
          {/* image & text wrapper */}
          <div className="flex flex-col items-center lg:flex-row">
            {/* image */}
            <div className="flex items-center justify-center flex-1 mb-8 lg:mb-0 ">
              <img
                className="max-w-[200px] lg:max-w-[300px]"
                src={image}
                alt={`Image of ${name}`}
              />
            </div>
            {/* text */}
            <div className="items-center flex-1 text-center lg:text-left">
              <div className="text-[18px] text-gray-600">{brand}</div>
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {name}
              </h1>

              <div className="items-center mb-3 text-xl font-medium text-red-500">
                $ {price}
              </div>
              <div className="mb-3">
                <Rating value={rating} text={numReviews} />
              </div>
              <p className="mb-8">{description}</p>

              <button
                onClick={addToCartHandler}
                className={`${
                  countInStock === 0
                    ? 'bg-red-600 text-primary'
                    : 'bg-primary text-white'
                } py-4 px-8 `}
                disabled={countInStock === 0}
              >
                {countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default ProductDetail;
