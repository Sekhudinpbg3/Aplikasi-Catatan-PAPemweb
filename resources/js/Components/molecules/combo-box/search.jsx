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

const Search = ({
  comboBoxClass = "relative",
  inputClass = "bg-gray-200",
  optionContainerClass = "absolute z-10 bg-white w-full mt-2",
  optionClass = "overflow-y-scroll shadow-md",
  itemClass = "hover:bg-slate-300",
  data = defaultData,
  keyValue = "name",
  placeholder,
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
      <Combobox.Input
        className={`${inputClass} input-noborder`}
        placeholder={placeholder || ""}
        onChange={(e) => setQuery(e.target.value)}
        displayValue={(picked) => (picked ? picked[keyValue] : "")}
      />
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options className={`${query ? optionContainerClass : 'transition-colors'}`}>
          <div className={`${query ? optionClass : 'hidden'}`}>
            {query ? (
              filteredData.length !== 0 ? (
                filteredData.map((dt, idx) => (
                  <Combobox.Option key={idx} value={dt} className={`${query ? itemClass : 'hidden'}`}>
                    {dt[keyValue]}
                  </Combobox.Option>
                ))
              ) : (
                <p className="text-center text-sm lg:text-base">Tidak ada</p>
              )
            ) : null}
          </div>
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default Search;
