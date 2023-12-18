import { createContext, useState, useEffect } from 'react';
import snacksData from '../data';
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);
  // fetch products
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products');
    //   const data = await response.json();
    //   setProducts(data);
    // };
    // fetchProducts();
    const data = snacksData
    console.log(data)
    setProducts(data)
  }, []);
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
