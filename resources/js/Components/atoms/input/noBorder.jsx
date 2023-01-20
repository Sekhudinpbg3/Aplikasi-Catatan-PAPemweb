const Noborder = ({ inputClass, ...props }) => {
  return <input className={`input input-noborder ${inputClass ? inputClass : "p-0"}`} {...props} />;
};

export default Noborder;
