import { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../slices/productsApiSlice';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
  // item amount state
  const { id: productId} = useParams()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const addToCart = () => {
    dispatch(addToCart())
  }

  // total price state
  const [total, setTotal] = useState(0)
  useEffect(()=> {
    const total = cart.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.amount;
    },0)
    setTotal(total)
  })
  // update item amount
  useEffect(()=> {
    if(cart) {
      const amount = cart.reduce((acc, currentItem) => {
        return acc + currentItem.amount;
      }, 0)
      setItemAmount(amount)
    }
  },[cart])

  // add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if the item is already in the cart
    const cartItem = cart.find(item => {
      return item._id === id;
    });
    // if cart item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item._id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  // remove from the cart
  const removeFromCart = id => {
    const newCart = cart.filter(item => {
      return item._id !== id;
    });
    setCart(newCart);
  };
  // clear the cart
  const clearCart = () => {
    setCart([]);
  };
  // increase amount
  const increaseAmount = id => {
    const cartItem = cart.find(item => item._id === id);
    addToCart(cartItem, id);
  };

  // decrease amount
  const decreaseAmount = id => {
    const cartItem = cart.find(item => {
      return item._id === id;
    });
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item._id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
