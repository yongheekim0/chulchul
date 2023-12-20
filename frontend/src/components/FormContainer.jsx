import loginImage from '../img/login-image.jpg'

const FormContainer = ({ children }) => {
  return (
    <div className="flex items-center max-w-3xl shadow-md bg-terracotta-100 rounded-xl">
      {children}
      <div className="hidden w-1/2 md:block">
        <img className="rounded-br-lg rounded-tr-xl" src={loginImage} />
      </div>
    </div>
  );
};

export default FormContainer;
