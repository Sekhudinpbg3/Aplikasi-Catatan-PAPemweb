import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAlert } from "react-alert";

const genPanelPosition = (pos) => {
  if (pos === "bottom-left") return "right-0";
  if (pos === "bottom-right") return "left-0";
  if (pos === "top-left") return "bottom-7 right-0";
  if (pos === "top-right") return "bottom-7 left-0";
};

const exItems = [<p>pop menu</p>, <p>menu 1</p>, <p>menu 2</p>];

const Menu = ({
  children = exItems,
  panelClass = "w-64 bg-white",
  panelPosition = "bottom-left",
}) => {
  const Alert = useAlert();

  const panelPos = genPanelPosition(panelPosition);
  const [trigger, ...items] = children;

  return (
    <Popover className="relative w-fit">
      {({ open }) => (
        <>
          <Popover.Button>{trigger}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`${panelClass} ${panelPos} absolute z-10 rounded-lg`}
            >
              {({ close }) => (
                <div className="rounded-lg shadow-md ring-1 ring-black ring-opacity-5 relative p-2 space-y-1">
                  {items.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Menu;
