const Message = ({children}) => {
  return (
    <div className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500" role="alert">
    <p>{children}</p>
  </div>
  )
}

export default Message