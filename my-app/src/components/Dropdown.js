import React from "react";
import useClickOutSide from "./hooks/useClickOutSide";

const Dropdown = () => {
  const { nodeRef: dropdownRef, setShow, show } = useClickOutSide();
  return (
    <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
      <div
        className="w-full p-5 border border-gray-200 rounded-lg cursor-pointer"
        onClick={() => setShow(!show)}
      >
        Selected
      </div>
      {show && (
        <div className="absolute left-0 w-full p-5 bg-white border border-gray-200 rounded-lg top-full">
          <div className="p-5 cursor-pointer">Javascript</div>
          <div className="p-5 cursor-pointer">Reactjs</div>
          <div className="p-5 cursor-pointer">Vuejs</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
