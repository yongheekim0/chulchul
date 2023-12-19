import Product from '../components/Product';
import Hero from '../components/Hero';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const loadProducts = isLoading ? (
    <Loader />
  ) : error ? (
    <div>{error?.data?.message || error.error}</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
      {products.map(product => {
        return <Product product={product} key={product._id} />;
      })}
    </div>
  );

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">{loadProducts}</div>
      </section>
    </div>
  );
};

export default Home;
