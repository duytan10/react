import React, { useState } from "react";
import useHover from "../hooks/useHover";
import ReactDOM from "react-dom";

const Tooltip = ({ children, ...props }) => {
  const [coords, setCoords] = useState({});
  const { hovered, nodeRef } = useHover();
  const handleHover = (e) => {
    setCoords(e.target.getBoundingClientRect());
  };
  return (
    <div ref={nodeRef} onMouseOver={handleHover}>
      {hovered && (
        <TooltipContent text={props.text} coords={coords}></TooltipContent>
      )}
      {children}
    </div>
  );
};

function TooltipContent({ text, coords }) {
  return ReactDOM.createPortal(
    <p
      className="absolute inline-block p-2 text-white -translate-x-1/2 bg-black rounded-lg"
      style={{
        left: coords.left + coords.width / 2,
        top: coords.top - coords.height + window.scrollY,
      }}
    >
      {text}
    </p>,
    document.querySelector("body")
  );
}

export default Tooltip;
