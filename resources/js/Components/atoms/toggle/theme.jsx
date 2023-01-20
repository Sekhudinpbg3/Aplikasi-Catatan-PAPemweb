import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useState } from "react";

const Theme = ({ styleChecked = "bg-blue-500", styleUnchecked = "bg-gray-500", ...props }) => {
  const { theme, setTheme } = useTheme();

  const [dark, setDark] = useState(() => {
    return theme === "dark";
  });

  const toggleHandler = () => {
    setDark(!dark);
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    if (theme === "light") {
      setTheme("dark");
      return;
    }
  };

  return (
    <Switch
      checked={dark}
      className={dark ? "toggle bg-slate-500 bg-opacity-50" : "toggle bg-gray-400"}
      onChange={toggleHandler}
      {...props}
    >
      <span aria-hidden="true" className={dark ? `toggle-on ${styleChecked}` : `toggle-off ${styleUnchecked}`} />
    </Switch>
  );
};

export default Theme;
