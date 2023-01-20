import { ChevronUpIcon } from "@/Assets";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const defaultData = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const Base = ({
  comboBoxClass = "relative",
  inputClass = "bg-gray-200",
  optionContainerClass = "absolute z-10 bg-white w-full mt-2",
  optionClass = "overflow-y-scroll shadow-md",
  itemClass = "hover:bg-slate-300",
  data = defaultData,
  keyValue = "name",
  onSelected = () => {},
  ...newProps
}) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((dt) =>
          dt[keyValue]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox
      as="div"
      onChange={(item) => onSelected(item)}
      className={`${comboBoxClass}`}
      {...newProps}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <Combobox.Input
              className={`${inputClass} input-noborder input-combobox`}
              onChange={(e) => setQuery(e.target.value)}
              displayValue={(picked) => (picked ? picked[keyValue] : "")}
            />
            <Combobox.Button
              className={`${
                open ? "rotate-180" : ""
              } absolute inset-y-0 right-2 duration-300 transition-transform`}
            >
              <ChevronUpIcon />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className={`${optionContainerClass}`}>
              <div className={`${optionClass}`}>
                {filteredData.length !== 0
                  ? filteredData.map((dt, idx) => (
                      <Combobox.Option key={idx} value={dt} className={`${itemClass}`}>
                        {dt[keyValue]}
                      </Combobox.Option>
                    ))
                  : null}
              </div>
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
};

export default Base;
