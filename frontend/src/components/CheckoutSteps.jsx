import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowDropright } from "react-icons/io";


const CheckoutSteps = ({step1, step2, step3, step4}) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate('/login')
  }
  return (
    <div className='flex items-center justify-center gap-2 mb-4'>
      <button onClick={()=> navigate('/login')} className={!step1 ? 'text-gray-400' : ''} disabled={!step1 && true}>Sign In <IoMdArrowDropright className='inline' />
</button>
      <button onClick={()=> navigate('/shipping')} className={!step2 ? 'text-gray-400' : ''} disabled={!step2 && true}>Shipping <IoMdArrowDropright className='inline' /></button>
      <button onClick={()=> navigate('/payment')} className={!step3 ? 'text-gray-400' : ''} disabled={!step3 && true}>Payment <IoMdArrowDropright className='inline' /></button>
      <button onClick={()=> navigate('/placeorder')}className={!step4 ? 'text-gray-400' : ''} disabled={!step4 && true}>Place Order</button>
    </div>
  )
}

export default CheckoutSteps