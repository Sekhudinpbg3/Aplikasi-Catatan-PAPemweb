const Area = ({ inputClass, divClass, type = "border", ...props }) => {
  if (type == "border") {
    return (
      <textarea
        spellCheck="false"
        className={`input input-border transition-colors ${
          inputClass ? inputClass : "p-0"
        }`}
        {...props}
      />
    );
  }

  if (type == "no-border") {
    return (
      <textarea
        spellCheck="false"
        className={`input input-noborder ${inputClass ? inputClass : "p-0"}`}
        {...props}
      />
    );
  }
};

export default Area;
