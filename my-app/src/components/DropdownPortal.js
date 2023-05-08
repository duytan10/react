import React, { useState } from "react";
import useClickOutSide from "./hooks/useClickOutSide";
import ReactDOM from "react-dom";

const DropdownPortal = () => {
  const { nodeRef: dropdownRef, setShow, show } = useClickOutSide();
  const [coords, setCoords] = useState();
  const handleClick = (e) => {
    console.log(dropdownRef.current.getBoundingClientRect());
    setCoords(dropdownRef.current.getBoundingClientRect());
    setShow(!show);
  };
  return (
    <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
      <div
        className="w-full p-5 border border-gray-200 rounded-lg cursor-pointer"
        onClick={handleClick}
      >
        Selected
      </div>
      {show && <DropdownList coords={coords}></DropdownList>}
    </div>
  );
};

function DropdownList({ coords }) {
  if (typeof document === "undefined") return;
  return ReactDOM.createPortal(
    <div
      className="absolute left-0 w-full p-5 bg-white border border-gray-200 rounded-lg top-full"
      style={{
        left: coords.left,
        top: coords.top + coords.height + window.scrollY,
        width: coords.width,
      }}
    >
      <div className="p-5 cursor-pointer">Javascript</div>
      <div className="p-5 cursor-pointer">Reactjs</div>
      <div className="p-5 cursor-pointer">Vuejs</div>
    </div>,
    document.querySelector("body")
  );
}

export default DropdownPortal;
