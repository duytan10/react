import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useEffect, useState } from "react";

const DropdownHook = ({ control, setValue, name, data, dropdownLabel }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);

  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);

  return (
    <div className="relative" ref={nodeRef}>
      <div
        onClick={() => setShow(!show)}
        className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full bg-white rounded-lg ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            className="p-5 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={handleClickDropdownItem}
            data-value={item.value}
            key={item.id}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownHook;
