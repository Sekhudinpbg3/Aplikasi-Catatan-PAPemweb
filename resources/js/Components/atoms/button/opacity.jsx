const generateStyle = (opacity) => {
  if (opacity === "primary") return "opacity-primary";
  if (opacity === "secondary") return "opacity-secondary";
  if (opacity === "danger") return "opacity-danger";
  if (opacity === "success") return "opacity-success";
};

const Opacity = ({ children, buttonClass, buttonIcon, opacity, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;
  const opacityStyle = generateStyle(opacity);

  return (
    <button {...props} className={`btn-opacity ${opacityStyle} ${buttonClass} ${iconStyle}`}>
      {buttonIcon ? children.map((child) => child) : children}
    </button>
  );
};

export default Opacity;
