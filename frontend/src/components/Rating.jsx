import {FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({value, text}) => {
  return (
    <div className='flex justify-center lg:justify-start items-center '>
      <span className='flex justify-around items-center text-yellow-500'>
        { value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        { value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        { value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        { value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        { value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>
      <span className='ml-1 text-gray-500 text-[10px]'>({text && text})</span>
    </div>
  )
}

export default Rating