import { XmarkIcon } from "@/Assets";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAlert } from "react-alert";

const genPanelPosition = (pos) => {
  if (pos === "bottom-left") return "right-0";
  if (pos === "bottom-right") return "left-0";
  if (pos === "top-left") return "bottom-7 right-0";
  if (pos === "top-right") return "bottom-7 left-0";
};

const exItems = [
  {
    title: "Success",
    descript: "Bagian yang memuat deskripsi",
    icon: <XmarkIcon />,
    link: "#",
    onClick: async () => true,
    success: "task berhasil",
    failed: "task gagal",
  },
  {
    title: "Failed",
    descript: "Bagian yang memuat deskripsi",
    icon: <XmarkIcon />,
    link: "#",
    onClick: async () => false,
    success: "task berhasil",
    failed: "task gagal",
  },
];
const Custom = ({
  children = "popover",
  items = exItems,
  panelClass = "w-64 bg-white",
  panelPosition = "bottom-right",
  itemClass,
  type = "link",
}) => {
  const Alert = useAlert();

  const panelPos = genPanelPosition(panelPosition);

  return (
    <Popover className="relative w-fit">
      {({ open }) => (
        <>
          <Popover.Button className="transition-colors">{children}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={`${panelClass} ${panelPos} absolute z-10 rounded-lg`}>
              {({ close }) => (
                <div className="rounded-lg shadow-md ring-1 ring-black ring-opacity-5 relative p-2 space-y-1">
                  {items.map((item, idx) =>
                    type === "link" ? (
                      <a
                        href={item.link || "#"}
                        key={idx}
                        className={`${itemClass} flex items-center space-x-5 rounded-[5px] p-1`}
                      >
                        {item.icon ? item.icon : null}
                        <div>
                          {item.title ? <h1>{item.title}</h1> : null}
                          {item.descript ? <p>{item.descript}</p> : null}
                        </div>
                      </a>
                    ) : // button
                    type === "button" ? (
                      <button
                        key={idx}
                        className={`${itemClass} flex items-center space-x-5 w-full rounded-[5px] transition-colors duration-500 p-1`}
                        onClick={async (e) => {
                          const passed = await item.onClick();
                          if (passed) {
                            close();
                            Alert.success({ msg: item.success || "berhasil" });
                            return;
                          }
                          Alert.error({ msg: item.failed || "gagal" });
                          return;
                        }}
                      >
                        {item.icon ? item.icon : null}
                        {item.title ? <h1>{item.title}</h1> : null}
                      </button>
                    ) : null
                  )}
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Custom;
