const Secondary = ({ children, buttonClass, buttonIcon, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;

  return (
    <button className={`btn btn-secondary ${buttonClass} ${iconStyle}`} {...props}>
      {buttonIcon ? children.map((child) => child) : children}
    </button>
  );
};

export default Secondary;
