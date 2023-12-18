import { createContext, useState, useEffect } from 'react';
export const ProductContext = createContext();
import axios from 'axios';

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);
  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data)
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
