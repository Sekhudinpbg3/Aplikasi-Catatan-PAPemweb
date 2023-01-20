import { HideIcon, UnHideIcon } from "../../../assets";
import { useState } from "react";
import Gap from "../gap";

const Border = ({ inputClass, divClass, inputPassword, ...props }) => {
  const [inputType, setInputType] = useState("password");
  const [border, setBorder] = useState(`border-gray-300 dark:border-slate-700 ${divClass}`);

  const showHandler = () => {
    if (inputType === "text") setInputType("password");
    if (inputType === "password") setInputType("text");
  };

  if (!inputPassword) return <input className={`input input-border ${inputClass ? inputClass : "p-0"}`} {...props} />;
  if (inputPassword)
    return (
      <div className={`input flex-center-y space-x-1 px-1 border-2 transition-all duration-700 ${border}`}>
        <button className="bg-transparent fixed" onClick={showHandler}>
          {inputType === "text" ? <UnHideIcon iconClass="btn-input-show h-7 w-7" /> : null}
          {inputType === "password" ? <HideIcon iconClass="btn-input-show h-7 w-7" /> : null}
        </button>
        <Gap width="w-3" />
        <input
          type={inputType}
          autoComplete="off"
          className={`input-password ${inputClass}`}
          onFocus={() => {
            setBorder(`border-blue-300 dark:border-blue-700 ${divClass}`);
          }}
          onBlur={() => setBorder(`border-gray-300 dark:border-slate-700 ${divClass}`)}
          {...props}
        />
      </div>
    );
};

export default Border;
