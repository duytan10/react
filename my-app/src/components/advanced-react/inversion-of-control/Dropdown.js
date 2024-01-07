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
      {show && (
        <div className="options border border-gray-300 rounded">
          <div className="p-2">
            <input
              type="text"
              placeholder={inputPlaceHolder}
              className="p-3 outline-none w-full border border-gray-200 rounded"
              onChange={onChange}
            />
          </div>
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <div
                className="option-item p-4 cursor-pointer flex items-center justify-between"
                key={option.title}
                onClick={option.onClick}
              >
                {option.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
