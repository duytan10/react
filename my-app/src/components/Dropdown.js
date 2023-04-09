import React, { useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutDropdown(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutDropdown);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
      <div
        className="p-5 border border-gray-200 rounded-lg w-full cursor-pointer"
        onClick={() => setshowDropdown(!showDropdown)}
      >
        Selected
      </div>
      {showDropdown && (
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
