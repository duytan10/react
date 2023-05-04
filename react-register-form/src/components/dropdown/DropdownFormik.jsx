import { useField } from "formik";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useEffect, useState } from "react";

const DropdownFormik = ({ data, dropdownLabel, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { show, setShow, nodeRef } = useClickOutSide();
  const [label, setLabel] = useState(dropdownLabel);

  const handleClickDropdownItem = (e) => {
    helpers.setValue(e.target.dataset.value);
    setLabel(e.target.textContent);
    setShow(false);
  };

  useEffect(() => {
    if (field.value === "") setLabel(dropdownLabel);
  }, [field.value]);
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
            data-value={item.value}
            onClick={handleClickDropdownItem}
            key={item.id}
          >
            {item.text}
          </div>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DropdownFormik;
