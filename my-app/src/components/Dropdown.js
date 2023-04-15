import React from "react";
import useClickOutSide from "./hooks/useClickOutSide";

const Dropdown = () => {
  const { nodeRef: dropdownRef, setShow, show } = useClickOutSide();
  return (
    <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
      <div
        className="p-5 border border-gray-200 rounded-lg w-full cursor-pointer"
        onClick={() => setShow(!show)}
      >
        Selected
      </div>
      {show && (
        <div className="p-5 border border-gray-200 rounded-lg absolute bg-white top-full left-0 w-full">
          <div className="p-5 cursor-pointer">Javascript</div>
          <div className="p-5 cursor-pointer">Reactjs</div>
          <div className="p-5 cursor-pointer">Vuejs</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
