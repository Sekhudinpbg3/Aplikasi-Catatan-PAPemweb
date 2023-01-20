const Danger = ({ children, buttonClass, buttonIcon, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;

  return (
    <button {...props} className={`btn btn-danger ${buttonClass} ${iconStyle}`}>
      {buttonIcon ? children.map((child) => child) : children}
    </button>
  );
};

export default Danger;
