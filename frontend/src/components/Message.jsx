const Message = ({ children, variant }) => {
  return (
    <div
      className={variant === 'danger'? "p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"}
      role="alert"
    >
      <span>{children}</span>
    </div>
  );
};

export default Message;
