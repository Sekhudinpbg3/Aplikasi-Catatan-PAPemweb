const Primary = ({ children, buttonClass, buttonIcon, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;

  return (
    <button className={`btn btn-primary ${buttonClass} ${iconStyle}`} {...props}>
      {buttonIcon ? children.map((child) => child) : children}
    </button>
  );
};

export default Primary;
