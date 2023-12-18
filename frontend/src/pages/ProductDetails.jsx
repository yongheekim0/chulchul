import { useContext } from 'react';

import { useParams } from 'react-router-dom';
// import cart context
import { CartContext } from '../contexts/CartContext';
// import product context
import { ProductContext } from '../contexts/ProductContext';
import Rating from '../components/Rating';

const ProductDetails = () => {
  //get the product id from the url
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  // get the single product based on the id
  const product = products.find(item => {
    return item._id == id;
  });
  // if product is not found
  console.log(product);
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
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
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image & text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0 ">
            <img
              className="max-w-[200px] lg:max-w-[300px]"
              src={image}
              alt={`Image of ${name}`}
            />
          </div>
          {/* text */}
          <div className="flex-1 items-center text-center lg:text-left">
            <div className="text-[18px] text-gray-600">{brand}</div>
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {name}
            </h1>

            <div className="text-xl text-red-500 font-medium mb-3 items-center">
              $ {price}
            </div>
            <div className="mb-3">
              <Rating value={rating} text={numReviews} />
            </div>
            <p className="mb-8">{description}</p>

            <button
              onClick={() => addToCart(product, product._id)}
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
    </section>
  );
};

export default ProductDetails;
