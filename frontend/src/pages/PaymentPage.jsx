import { Link } from 'react-router-dom';

const PaymentPage = () => {
  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container flex flex-col justify-around h-screen max-w-lg gap-4 mx-auto md:flex-row md:max-w-5xl">
        <Link to="/">Go back</Link>
        <div>Payment Page is coming up</div>
      </div>
    </section>
  );
};

export default PaymentPage;
