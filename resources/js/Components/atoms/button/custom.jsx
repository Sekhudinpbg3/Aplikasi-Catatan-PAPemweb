const Custom = ({ children, buttonClass, buttonIcon, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;

  return (
    <button {...props} className={`btn ${buttonClass} ${iconStyle}`}>
      {buttonIcon && children.length > 1 ? children.map((child) => child) : children}
    </button>
  );
};

export default Custom;
