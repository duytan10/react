import React, { useState } from "react";

const Dropdown = ({
  options,
  placeholder = "Please select an option",
  inputPlaceHolder,
  onChange = () => {},
}) => {
  const [show, setShow] = useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  return (
    <div className="relative inline-block w-full max-w-[300px]">
      <div
        className="placeholder flex items-center justify-between p-4 border border-gray-300 rounded cursor-pointer"
        onClick={handleToggleDropdown}
      >
        {placeholder}
      </div>
      {show && <div className="options border border-gray-300 rounded"></div>}
    </div>
  );
};

export default Dropdown;
